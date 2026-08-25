import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '../src/services/firebase/auth';
import { auth } from '../src/services/firebase/config';

export default function HomeScreen() {
  const name = auth.currentUser?.displayName?.split(' ')[0] || 'Investor';

  async function handleLogout() {
    await logout();
    router.replace('/auth/login');
  }

  return (
    <SafeAreaView className="flex-1 bg-stockastics-surface">
      <ScrollView contentContainerClassName="px-5 pb-10 pt-5">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-medium text-stockastics-muted">Welcome back</Text>
            <Text className="mt-1 text-2xl font-extrabold text-stockastics-ink">{name}</Text>
          </View>
          <Pressable onPress={handleLogout} className="rounded-full border border-slate-200 bg-white px-4 py-2">
            <Text className="font-semibold text-stockastics-blue">Log out</Text>
          </Pressable>
        </View>

        <View className="mt-6 rounded-3xl bg-stockastics-blue p-5">
          <Text className="text-sm font-semibold text-blue-100">STOCKASTICS</Text>
          <Text className="mt-2 text-2xl font-extrabold text-white">14-day free trial</Text>
          <Text className="mt-2 leading-5 text-blue-50">Explore BUY-only stock intelligence. Subscription is $50/month after the trial.</Text>
        </View>

        <Text className="mb-3 mt-7 text-lg font-bold text-stockastics-ink">Your market intelligence</Text>
        <View className="rounded-3xl bg-white p-5">
          <Text className="font-bold text-stockastics-green">BUY signals only</Text>
          <Text className="mt-2 leading-5 text-stockastics-muted">Your personalized Signals, Markets, News and Sentiment experience will appear here.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
