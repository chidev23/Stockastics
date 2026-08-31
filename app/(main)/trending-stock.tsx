import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoreBackButton from '../../src/components/MoreBackButton';

const data = [
  ['TSLA', 'Tesla Inc.', '1,247', 'BUY 87%', '+12%'],
  ['SEPLAT', 'Seplat Energy', '892', 'BUY 72%', '+5%'],
  ['AAPL', 'Apple Inc.', '756', 'BUY 92%', '-3%'],
  ['NVDA', 'NVIDIA Corporation', '701', 'BUY 94%', '+8%'],
  ['GOOGL', 'Alphabet Inc.', '645', 'BUY 55%', '-2%'],
];

export default function TrendingStock() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
        <MoreBackButton />
        <Text className="text-xl font-extrabold text-slate-900">Trending Stock</Text>
        <Pressable accessibilityLabel="Change period"><Text className="text-xs font-bold text-blue-700">24h ▾</Text></Pressable>
      </View>
      <ScrollView contentContainerClassName="px-5 pb-8 pt-5">
        <Text className="mb-4 text-sm leading-5 text-slate-500">Stocks attracting the most attention across social and search sources.</Text>
        {data.map((s, i) => (
          <Pressable key={s[0]} onPress={() => router.push('/stock-detail' as never)} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
            <View className="flex-row justify-between">
              <View><Text className="text-lg font-extrabold text-slate-900">{i + 1}. {s[0]}</Text><Text className="text-xs text-slate-500">{s[1]}</Text></View>
              <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
            </View>
            <Text className="mt-3 text-sm text-slate-600">🔥 {s[2]} mentions · <Text className="font-extrabold text-blue-700">{s[3]}</Text></Text>
            <Text className={`mt-2 text-xs font-bold ${s[4].startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{s[4]} from previous period</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
