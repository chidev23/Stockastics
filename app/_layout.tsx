import '../global.css';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
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

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AccessGuard />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
