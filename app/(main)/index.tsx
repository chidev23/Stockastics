import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SideMenu from '../../src/components/SideMenu';

const quickActions = [
  { label: 'Retail', icon: 'trending-up-outline' as const, route: '/(main)/retail-signals', color: '#16A34A' },
  { label: 'Sticks AI', icon: 'sparkles-outline' as const, route: '/(main)/sticks-ai', color: '#7C3AED' },
  { label: 'Religious beliefs', icon: 'book-outline' as const, route: '/(main)/religious-beliefs', color: '#2563EB' },
  { label: 'Fear and Greed Index', icon: 'speedometer-outline' as const, route: '/(main)/fear-greed-index', color: '#EA580C' },
];

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = 'Investor';

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-8 pt-4">
        <View className="flex-row items-center justify-between">
          <Pressable accessibilityRole="button" accessibilityLabel="Open menu" onPress={() => setMenuOpen(true)} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"><Ionicons name="menu-outline" size={25} color="#16A34A" /></Pressable>
          <View className="flex-1 px-4"><Text className="text-center text-sm font-extrabold tracking-[2px] text-emerald-600">STOCKASTICS</Text></View>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/notifications')} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"><Ionicons name="notifications-outline" size={22} color="#16A34A" /><View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" /></Pressable>
        </View>

        <View className="mt-6"><Text className="text-sm font-medium text-slate-500">Good morning</Text><Text className="mt-1 text-2xl font-extrabold text-slate-900">{firstName}</Text><Text className="mt-1 text-sm text-slate-500">Here is your market intelligence for today.</Text></View>
        <View className="mt-6 overflow-hidden rounded-3xl bg-emerald-600 p-5"><View className="flex-row items-center justify-between"><View className="rounded-full bg-white/20 px-3 py-1"><Text className="text-xs font-bold text-emerald-50">MARKET INTELLIGENCE</Text></View><Ionicons name="pulse" size={22} color="#FFFFFF" /></View><Text className="mt-4 text-2xl font-extrabold text-white">Discover market opportunities</Text><Text className="mt-2 leading-5 text-emerald-50">Monitor independent BUY signals, market movements, news and investor sentiment.</Text><Pressable accessibilityRole="button" onPress={() => router.push('/(main)/signals')} className="mt-5 self-start rounded-xl bg-white px-5 py-3 active:opacity-80"><Text className="font-bold text-emerald-700">View Signals</Text></Pressable></View>

        <View className="mt-7 flex-row items-center justify-between"><Text className="text-lg font-extrabold text-slate-900">Quick access</Text><Text className="text-xs font-medium text-slate-400">Explore</Text></View>
        <View className="mt-3 flex-row flex-wrap justify-between">
          {quickActions.map((action) => <Pressable key={action.label} accessibilityRole="button" accessibilityLabel={action.label} onPress={() => router.push(action.route as never)} className="mb-3 w-[48%] rounded-2xl bg-white p-4 active:bg-slate-100"><View style={{ backgroundColor: `${action.color}14` }} className="h-10 w-10 items-center justify-center rounded-xl"><Ionicons name={action.icon} size={21} color={action.color} /></View><Text className="mt-3 font-bold text-slate-800">{action.label}</Text></Pressable>)}
        </View>
      </ScrollView>
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}
