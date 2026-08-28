import { Tabs, usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hasActiveSignalAccess } from '../../src/session';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  signals: 'pulse-outline',
  markets: 'stats-chart-outline',
  news: 'newspaper-outline',
  more: 'menu-outline',
};

// These are the only root sections that should own the persistent bottom navigation.
const PRIMARY_TABS = new Set(['index', 'signals', 'markets', 'news', 'more']);

// All signal-category pages are protected by the user's active trial/monthly plan.
const SIGNAL_ROUTES = new Set([
  '/signals',
  '/retail-signals',
  '/ipo-signals',
  '/buyback-signals',
  '/sentiment-signals',
  '/ex-dividend-signals',
  '/income-signals',
]);

function MainTabs() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);

  const isSignalRoute = SIGNAL_ROUTES.has(pathname);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      if (!isSignalRoute) {
        if (mounted) setCheckingAccess(false);
        return;
      }

      if (mounted) setCheckingAccess(true);
      const active = await hasActiveSignalAccess();
      if (!mounted) return;

      if (!active) {
        router.replace('/(main)/subscription');
        return;
      }

      setCheckingAccess(false);
    }

    checkAccess();
    return () => { mounted = false; };
  }, [isSignalRoute, pathname, router]);

  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 6 : 0);
  const baseHeight = 58;

  if (isSignalRoute && checkingAccess) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={({ route }) => {
        const isPrimaryTab = PRIMARY_TABS.has(route.name);

        return {
          headerShown: false,
          tabBarActiveTintColor: '#16A34A',
          tabBarInactiveTintColor: '#64748B',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: -1 },
          tabBarItemStyle: { paddingTop: 2 },
          tabBarIconStyle: { marginBottom: -1 },
          tabBarStyle: {
            display: isPrimaryTab ? 'flex' : 'none',
            height: baseHeight + bottomInset,
            paddingTop: 5,
            paddingBottom: bottomInset + 4,
            borderTopWidth: 1,
            borderTopColor: '#E2E8F0',
            backgroundColor: '#FFFFFF',
            elevation: 8,
            shadowOpacity: 0.08,
          },
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={icons[route.name] ?? 'ellipse-outline'} size={size} color={color} />
          ),
        };
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="signals" options={{ title: 'Signals' }} />
      <Tabs.Screen name="markets" options={{ title: 'Markets' }} />
      <Tabs.Screen name="news" options={{ title: 'News' }} />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
    </Tabs>
  );
}

export default function MainLayout() {
  return <MainTabs />;
}
