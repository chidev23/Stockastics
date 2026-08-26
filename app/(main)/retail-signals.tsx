import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  ['Retail', '/retail-signals'], ['IPO', '/ipo-signals'], ['Buyback', '/buyback-signals'],
  ['Sentiment', '/sentiment-signals'], ['Ex-Div', '/ex-dividend-signals'], ['Income', '/income-signals'],
] as const;

// UI fixtures only. Production signals will be supplied by the Google Cloud/Firebase signal service.
const demoSignals = [
  { ticker: 'META', name: 'Meta Platforms, Inc.', confidence: 91, price: '$450.00', time: 'Today, 09:12 AM', session: 'Day Trade' },
  { ticker: 'AAPL', name: 'Apple Inc.', confidence: 92, price: '$189.42', time: 'Today, 08:42 AM', session: 'Day Trade' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation', confidence: 88, price: '$124.18', time: 'Today, 08:31 AM', session: 'Day Trade' },
  { ticker: 'TSLA', name: 'Tesla Inc.', confidence: 87, price: '$341.06', time: 'Today, 08:17 AM', session: 'Day Trade' },
];

export default function RetailSignalsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center px-5 pt-4">
        <Pressable onPress={() => router.back()} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white">
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-2xl font-extrabold text-slate-900">Retail Signals</Text>
          <Text className="text-xs text-slate-500">Intraday BUY opportunities</Text>
        </View>
        <View className="rounded-full bg-emerald-50 px-3 py-2"><Text className="text-xs font-extrabold text-emerald-600">LIVE</Text></View>
      </View>

      {/* Keep all signal categories in one horizontal navigation row. */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5 max-h-20" contentContainerClassName="gap-2 px-5">
        {categories.map(([label, route], i) => (
          <Pressable key={route} onPress={() => router.push(route as never)} className={`min-w-[82px] items-center rounded-2xl px-3 py-3 ${i === 0 ? 'bg-blue-700' : 'border border-slate-200 bg-white'}`}>
            <Text className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-5">
        <View className="mb-4 rounded-2xl bg-blue-700 p-5">
          <View className="flex-row items-center"><Ionicons name="flash" size={19} color="#86EFAC" /><Text className="ml-2 text-xs font-extrabold tracking-wider text-emerald-200">DAY TRADING</Text></View>
          <Text className="mt-2 text-xl font-extrabold text-white">Retail BUY Signals</Text>
          <Text className="mt-1 text-sm leading-5 text-blue-100">Our retail strategy scans eligible stocks for intraday opportunities. A BUY signal identifies a stock the strategy expects to move upward during the trading day.</Text>
        </View>

        <View className="mb-4 flex-row items-center justify-between"><View><Text className="text-lg font-extrabold text-slate-900">Latest BUY Signals</Text><Text className="mt-1 text-xs text-slate-500">Signal price is the strategy's reference entry price.</Text></View></View>

        {demoSignals.map((signal) => (
          <Pressable key={signal.ticker} onPress={() => router.push({ pathname: '/stock-detail', params: { ticker: signal.ticker, signalType: 'retail' } })} className="mb-3 rounded-2xl bg-white p-5 active:bg-slate-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-blue-50"><Text className="text-xs font-extrabold text-blue-700">{signal.ticker}</Text></View>
                <View className="ml-3"><Text className="font-extrabold text-slate-900">{signal.name}</Text><Text className="mt-1 text-xs text-slate-400">{signal.time} · {signal.session}</Text></View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </View>
            <View className="mt-4 flex-row items-end justify-between border-t border-slate-100 pt-4">
              <View><Text className="text-xs font-bold text-slate-400">ACTION</Text><Text className="mt-1 text-xl font-extrabold text-emerald-600">BUY {signal.ticker}</Text></View>
              <View className="items-end"><Text className="text-xs font-bold text-slate-400">REFERENCE PRICE</Text><Text className="mt-1 text-lg font-extrabold text-slate-900">@ {signal.price}</Text></View>
            </View>
            <View className="mt-3 flex-row items-center justify-between"><Text className="text-xs text-slate-400">Strategy confidence</Text><Text className="text-xs font-extrabold text-blue-700">{signal.confidence}%</Text></View>
          </Pressable>
        ))}

        <View className="mt-1 rounded-2xl border border-slate-200 bg-white p-4"><Text className="text-xs leading-5 text-slate-500">Retail Signals are designed for day trading. Example: <Text className="font-bold text-slate-700">BUY META @ $450.00</Text>. The displayed price is a reference price at signal generation and may differ from the live market price. Signals are not financial advice.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}
