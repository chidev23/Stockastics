import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignalCategoryNav from '../../src/components/SignalCategoryNav';

const labels: Record<string, string> = { retail: 'Retail', ipo: 'IPO', buyback: 'Buyback', sentiment: 'Sentiment', 'ex-dividend': 'Ex-Div', income: 'Income' };

export default function ReligiousSignalsScreen() {
  const params = useLocalSearchParams<{ religious?: string; category?: string }>();
  const religious = params.religious === 'halal' || params.religious === 'haram' ? params.religious : 'halal';
  const modeLabel = religious === 'halal' ? 'Halal' : 'Haram';
  const accent = religious === 'halal' ? '#16A34A' : '#DC2626';
  const category = labels[params.category ?? 'retail'] ? (params.category ?? 'retail') : 'retail';
  const categoryLabel = labels[category];
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center px-5 pt-4"><Pressable onPress={() => router.replace(`/(main)/${religious}` as never)} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white"><Ionicons name="arrow-back" size={20} color="#0F172A" /></Pressable><View className="flex-1"><Text style={{ color: accent }} className="text-xs font-extrabold uppercase tracking-widest">{modeLabel} Signals</Text><Text className="mt-1 text-2xl font-extrabold text-slate-900">{categoryLabel} Signals</Text></View></View>
    <SignalCategoryNav selected={category as any} religious={religious}/>
    <ScrollView contentContainerClassName="px-5 pb-8 pt-2"><View style={{ backgroundColor: accent }} className="mb-5 rounded-3xl p-5"><Text className="text-xs font-extrabold tracking-widest text-white/80">{modeLabel.toUpperCase()} STOCK SCREENING</Text><Text className="mt-2 text-2xl font-extrabold text-white">{categoryLabel} BUY Signals</Text><Text className="mt-2 text-sm leading-5 text-white/90">Only {modeLabel}-classified stocks belonging to the {categoryLabel} signal category should appear in this feed.</Text></View><View className="items-center rounded-3xl bg-white px-6 py-14"><View style={{ backgroundColor: `${accent}14` }} className="h-16 w-16 items-center justify-center rounded-2xl"><Ionicons name="shield-checkmark-outline" size={34} color={accent} /></View><Text className="mt-5 text-center text-lg font-extrabold text-slate-900">No {modeLabel} {categoryLabel.toLowerCase()} signals available yet</Text><Text className="mt-2 text-center text-sm leading-6 text-slate-500">The signal engine will display a stock here only after the configured screening data source explicitly classifies it as {modeLabel} and the {categoryLabel} strategy produces a valid BUY signal.</Text></View><View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4"><Text className="font-extrabold text-slate-800">Screening rule</Text><Text className="mt-2 text-xs leading-5 text-slate-500">Unclassified securities are intentionally excluded from religious-mode signal feeds. This prevents ordinary market signals from appearing inside Halal or Haram mode.</Text></View></ScrollView>
  </SafeAreaView>;
}
