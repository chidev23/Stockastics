import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../src/services/firebase/config';
import SideMenu from '../../src/components/SideMenu';
import { useState } from 'react';

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = auth.currentUser?.displayName?.split(' ')[0] || 'Investor';

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView contentContainerClassName="px-5 pb-8 pt-4">
        <View className="flex-row items-center justify-between">
          <Pressable accessibilityRole="button" accessibilityLabel="Open menu" onPress={() => setMenuOpen(true)} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
            <Ionicons name="menu-outline" size={25} color="#1E3A8A" />
          </Pressable>
          <View className="flex-1 px-4">
            <Text className="text-center text-sm font-extrabold tracking-wider text-blue-700">STOCKASTICS</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/notifications')} className="h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
            <Ionicons name="notifications-outline" size={22} color="#1E3A8A" />
          </Pressable>
        </View>

        <View className="mt-5">
          <Text className="text-sm font-medium text-slate-500">Welcome back</Text>
          <Text className="mt-1 text-2xl font-extrabold text-slate-900">{firstName}</Text>
        </View>

        <View className="mt-6 rounded-3xl bg-blue-700 p-5">
          <Text className="text-sm font-bold uppercase tracking-wider text-blue-100">STOCKASTICS</Text>
          <Text className="mt-2 text-2xl font-extrabold text-white">Market intelligence</Text>
          <Text className="mt-2 leading-5 text-blue-50">Independent BUY signals, market data, news and sentiment in one place.</Text>
          <Pressable onPress={() => router.push('/(main)/signals')} className="mt-5 self-start rounded-xl bg-white px-5 py-3">
            <Text className="font-bold text-blue-700">View Signals</Text>
          </Pressable>
        </View>

        <Text className="mb-3 mt-7 text-lg font-extrabold text-slate-900">Today's intelligence</Text>
        <View className="rounded-2xl bg-white p-5">
          <Text className="font-bold text-emerald-600">BUY signals only</Text>
          <Text className="mt-2 leading-5 text-slate-500">Your live signal feed will appear here when the signal service is connected.</Text>
        </View>
      </ScrollView>
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
    </SafeAreaView>
  );
}
