import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@stockastics/test-session-v2';
const TRIAL_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

export type TestSubscription = {
  authenticated: boolean;
  createdAt: number;
  plan: '14-day-free-trial' | 'monthly';
  trialEndsAt: number;
  subscriptionEndsAt?: number;
};

/**
 * Testing-only sign-in/session creation.
 * A brand-new account receives its 14-day trial automatically.
 * Existing sessions are preserved so signing in again cannot reset the trial clock.
 */
export async function setTestSession(): Promise<void> {
  const existingRaw = await AsyncStorage.getItem(SESSION_KEY);

  if (existingRaw) {
    try {
      const existing = JSON.parse(existingRaw) as TestSubscription;
      if (existing.authenticated && existing.createdAt && existing.trialEndsAt) {
        return;
      }
    } catch {
      // Replace an invalid/corrupt testing session below.
    }
  }

  const createdAt = Date.now();
  const session: TestSubscription = {
    authenticated: true,
    createdAt,
    plan: '14-day-free-trial',
    trialEndsAt: createdAt + TRIAL_DAYS * DAY_MS,
  };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function hasTestSession(): Promise<boolean> {
  return (await AsyncStorage.getItem(SESSION_KEY)) !== null;
}

export async function getTestSubscription(): Promise<TestSubscription | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as TestSubscription;
    if (!session.trialEndsAt) {
      session.trialEndsAt = session.createdAt + TRIAL_DAYS * DAY_MS;
      session.plan = '14-day-free-trial';
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return session;
  } catch {
    return null;
  }
}

export async function hasActiveSignalAccess(): Promise<boolean> {
  const session = await getTestSubscription();
  if (!session?.authenticated) return false;
  if (session.plan === 'monthly') {
    return !!session.subscriptionEndsAt && Date.now() < session.subscriptionEndsAt;
  }
  return Date.now() < session.trialEndsAt;
}

/** Testing-only renewal. Production billing will replace this with the subscription backend. */
export async function activateTestMonthlySubscription(): Promise<void> {
  const session = await getTestSubscription();
  if (!session) return;
  session.plan = 'monthly';
  session.subscriptionEndsAt = Date.now() + 30 * DAY_MS;
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export async function clearTestSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export const TEST_TRIAL_DAYS = TRIAL_DAYS;
