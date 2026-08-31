import { Tabs, useGlobalSearchParams, usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hasActiveSignalAccess } from '../../src/session';

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = { index: 'home-outline', signals: 'pulse-outline', markets: 'stats-chart-outline', news: 'newspaper-outline', more: 'menu-outline' };
const LABELS: Record<string, string> = { index: 'Home', signals: 'Signals', markets: 'Markets', news: 'News', more: 'More' };
const NAV_COLORS: Record<string, string> = { index: '#16A34A', signals: '#2563EB', markets: '#0F766E', news: '#7C3AED', more: '#475569' };
const PRIMARY_TABS = ['index', 'signals', 'markets', 'news', 'more'] as const;
const PRIMARY_TAB_SET = new Set<string>(PRIMARY_TABS);
const SIGNAL_ROUTES = new Set(['/signals','/religious-signals','/retail-signals','/ipo-signals','/buyback-signals','/sentiment-signals','/ex-dividend-signals','/income-signals']);

function StockasticsTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();
  const params = useGlobalSearchParams<{ religious?: string }>();
  const activeName = state.routes[state.index]?.name;
  if (!PRIMARY_TAB_SET.has(activeName)) return null;
  const religiousMode = params.religious === 'halal' || params.religious === 'haram' ? params.religious : undefined;
  const bottomInset = Math.max(insets.bottom, 8);
  return (
    <View style={{ width: '100%', alignSelf: 'stretch', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#DDE5E1', paddingBottom: bottomInset, shadowColor: '#000000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 10 }}>
      <View style={{ width: '100%', height: 82, flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around' }}>
        {PRIMARY_TABS.map((name, index) => {
          const route = state.routes.find((item: any) => item.name === name); if (!route) return null;
          const focused = activeName === name; const baseColor = NAV_COLORS[name]; const color = focused ? baseColor : `${baseColor}B3`;
          const options = descriptors[route.key]?.options ?? {}; const label = options.tabBarLabel ?? options.title ?? LABELS[name];
          return <Pressable key={route.key} accessibilityRole="tab" accessibilityState={{ selected: focused }} accessibilityLabel={String(label)} onPress={() => { const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true }); if (event.defaultPrevented) return; if (name === 'index' || name === 'more' || !religiousMode) navigation.navigate(route.name); else navigation.navigate(route.name, { religious: religiousMode }); }} style={({ pressed }) => ({ flex: 1, flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 7, paddingBottom: 5, paddingHorizontal: 2, opacity: pressed ? 0.65 : 1, borderLeftWidth: index === 0 ? 0 : 1, borderLeftColor: '#EEF2F0' })}>
            <View style={{ width: 48, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: focused ? `${baseColor}18` : 'transparent' }}><Ionicons name={ICONS[name]} size={25} color={color} /></View>
            <Text numberOfLines={1} allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, lineHeight: 16, fontWeight: focused ? '800' : '600', color, textAlign: 'center' }}>{label}</Text>
          </Pressable>;
        })}
      </View>
    </View>
  );
}

function MainTabs() {
  const pathname = usePathname(); const router = useRouter(); const [checkingAccess, setCheckingAccess] = useState(true); const isSignalRoute = SIGNAL_ROUTES.has(pathname);
  useEffect(() => { let mounted = true; async function checkAccess() { if (!isSignalRoute) { if (mounted) setCheckingAccess(false); return; } if (mounted) setCheckingAccess(true); const active = await hasActiveSignalAccess(); if (!mounted) return; if (!active) { router.replace('/(main)/subscription'); return; } setCheckingAccess(false); } checkAccess(); return () => { mounted = false; }; }, [isSignalRoute, pathname, router]);
  if (isSignalRoute && checkingAccess) return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator size="large" color="#16A34A" /></View>;
  return <Tabs tabBar={(props) => <StockasticsTabBar {...props} />} screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true, tabBarActiveTintColor: '#16A34A', tabBarInactiveTintColor: '#64748B' }}><Tabs.Screen name="index" options={{ title: 'Home' }} /><Tabs.Screen name="signals" options={{ title: 'Signals' }} /><Tabs.Screen name="markets" options={{ title: 'Markets' }} /><Tabs.Screen name="news" options={{ title: 'News' }} /><Tabs.Screen name="more" options={{ title: 'More' }} /></Tabs>;
}

export default function MainLayout() { return <MainTabs />; }
