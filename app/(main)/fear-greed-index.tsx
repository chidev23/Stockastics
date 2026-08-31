import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FearAndGreedIndexScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50" hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-slate-900">Fear and Greed Index</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-7">
        <View className="rounded-3xl bg-white p-6">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
            <Ionicons name="speedometer-outline" size={30} color="#EA580C" />
          </View>
          <Text className="mt-5 text-2xl font-extrabold text-slate-900">Fear and Greed Index</Text>
          <Text className="mt-3 text-sm leading-6 text-slate-500">
            Understand whether market participants are showing fear or greed. This page will bring together market indicators into a simple sentiment reading.
          </Text>
        </View>
        <View className="mt-5 rounded-3xl border border-slate-200 bg-white p-6">
          <Text className="text-lg font-extrabold text-slate-900">Index coming next</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            The full Fear and Greed dashboard, score, historical trend and supporting market signals will be designed here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
