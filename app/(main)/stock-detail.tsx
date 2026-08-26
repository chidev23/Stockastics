import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StockDetailScreen() {
  const { ticker = 'META', signalType = 'retail' } = useLocalSearchParams<{ ticker?: string; signalType?: string }>();
  const symbol = String(ticker).toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center px-5 pt-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white"><Ionicons name="arrow-back" size={20} color="#0F172A" /></Pressable>
        <View className="ml-3"><Text className="text-xl font-extrabold text-slate-900">{symbol}</Text><Text className="text-xs text-slate-500">Retail Day Trade Signal</Text></View>
      </View>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-5">
        <View className="rounded-3xl bg-blue-700 p-6">
          <Text className="text-xs font-extrabold tracking-widest text-emerald-200">BUY SIGNAL</Text>
          <Text className="mt-2 text-3xl font-extrabold text-white">BUY {symbol}</Text>
          <Text className="mt-1 text-blue-100">Retail strategy · Intraday opportunity</Text>
          <View className="mt-6 flex-row items-end justify-between"><View><Text className="text-xs text-blue-200">REFERENCE ENTRY</Text><Text className="mt-1 text-2xl font-extrabold text-white">@ $450.00</Text></View><View className="items-end"><Text className="text-xs text-blue-200">CONFIDENCE</Text><Text className="mt-1 text-xl font-extrabold text-emerald-300">91%</Text></View></View>
        </View>
        <View className="mt-4 rounded-2xl bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Signal details</Text><View className="mt-4 flex-row justify-between border-b border-slate-100 pb-3"><Text className="text-slate-500">Signal type</Text><Text className="font-bold text-slate-800">Day Trade BUY</Text></View><View className="mt-3 flex-row justify-between border-b border-slate-100 pb-3"><Text className="text-slate-500">Generated</Text><Text className="font-bold text-slate-800">Today · 09:12 AM</Text></View><View className="mt-3 flex-row justify-between"><Text className="text-slate-500">Strategy</Text><Text className="font-bold text-slate-800">Retail Strategy</Text></View></View>
        <View className="mt-4 rounded-2xl bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Price movement</Text><View className="mt-4 h-48 items-center justify-center rounded-xl bg-slate-50"><Ionicons name="analytics-outline" size={34} color="#2563EB" /><Text className="mt-2 text-sm font-bold text-slate-600">Live chart integration</Text><Text className="mt-1 text-xs text-slate-400">Market API data will populate this chart.</Text></View></View>
        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4"><Text className="text-xs leading-5 text-slate-500">This is a strategy-generated market signal, not a guarantee of profit. The reference price can differ from the live execution price. Not financial advice. Do your own research.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
