import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@stockastics/test-session-v1';

export async function setTestSession(): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ authenticated: true, createdAt: Date.now() }));
}

export async function hasTestSession(): Promise<boolean> {
  return (await AsyncStorage.getItem(SESSION_KEY)) !== null;
}

export async function clearTestSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}
