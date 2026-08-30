import '../global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Updates from 'expo-updates';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hasActiveSignalAccess, hasTestSession } from '../src/session';

const SIGNAL_ROUTES = new Set([
  'signals',
  'retail-signals',
  'ipo-signals',
  'buyback-signals',
  'sentiment-signals',
  'ex-dividend-signals',
  'income-signals',
]);

function AccessGuard() {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const inMain = segments[0] === '(main)';
      const current = segments[1] as string | undefined;
      if (!inMain || !current || !SIGNAL_ROUTES.has(current)) return;

      const authenticated = await hasTestSession();
      const allowed = authenticated && await hasActiveSignalAccess();
      if (!cancelled && !allowed) router.replace('/(main)/subscription');
    };
    check();
    return () => { cancelled = true; };
  }, [segments, router]);

  return null;
}

function OTAUpdateManager() {
  useEffect(() => {
    let cancelled = false;

    const checkForPublishedUpdate = async () => {
      // expo-updates is disabled in Expo Go/development mode, so this is
      // intentionally best-effort and must never prevent the app from opening.
      if (__DEV__ || !Updates.isEnabled) return;

      try {
        const result = await Updates.checkForUpdateAsync();
        if (cancelled || !result.isAvailable) return;

        await Updates.fetchUpdateAsync();
        if (!cancelled) {
          await Updates.reloadAsync();
        }
      } catch {
        // OTA failure must never close or block the application. The current
        // embedded/cached bundle remains the fallback.
      }
    };

    checkForPublishedUpdate();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <OTAUpdateManager />
      <AccessGuard />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
