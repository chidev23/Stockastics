import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MarketsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-5 pt-4" edges={['top']}>
      <Text className="text-2xl font-extrabold text-slate-900">Markets</Text>
      <Text className="mt-1 text-sm text-slate-500">Explore stocks by country and market.</Text>
      <View className="mt-6 rounded-2xl bg-white p-5">
        <Text className="font-bold text-slate-900">Market data</Text>
        <Text className="mt-2 text-slate-500">Stock discovery, country filters, price movement and detailed charts will be added in the Markets build.</Text>
      </View>
    </SafeAreaView>
  );
}
