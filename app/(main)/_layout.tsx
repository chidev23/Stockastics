import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  signals: 'pulse-outline',
  markets: 'stats-chart-outline',
  news: 'newspaper-outline',
  more: 'menu-outline',
};

function MainTabs() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 6 : 0);
  const baseHeight = Platform.OS === 'ios' ? 58 : 58;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#16A34A',
        tabBarInactiveTintColor: '#64748B',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: -1 },
        tabBarItemStyle: { paddingTop: 2 },
        tabBarIconStyle: { marginBottom: -1 },
        tabBarStyle: {
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
      })}
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
