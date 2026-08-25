import { router } from 'expo-router';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  ['Retail', 'retail'],
  ['IPO', 'ipo'],
  ['Buyback', 'buyback'],
  ['Sentiment', 'sentiment'],
  ['Ex-Div', 'ex-dividend'],
  ['Income', 'income'],
] as const;

export default function SignalsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="px-5 pt-4">
        <Text className="text-2xl font-extrabold text-slate-900">Signals</Text>
        <Text className="mt-1 text-sm text-slate-500">BUY opportunities from our market intelligence.</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5 max-h-14" contentContainerClassName="px-5 gap-2">
        {categories.map(([label, route], index) => (
          <Pressable key={route} onPress={() => index === 0 ? undefined : undefined} className={`rounded-full px-4 py-3 ${index === 0 ? 'bg-blue-700' : 'bg-white border border-slate-200'}`}>
            <Text className={`text-xs font-bold ${index === 0 ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <ScrollView contentContainerClassName="px-5 pb-8 pt-5">
        <View className="rounded-2xl bg-white p-5">
          <Text className="font-bold text-emerald-600">Retail BUY Signals</Text>
          <Text className="mt-2 leading-5 text-slate-500">Live retail signals will appear here. No SELL signals are generated or displayed by STOCKASTICS.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
