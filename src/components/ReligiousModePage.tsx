import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReligiousModeNav from './ReligiousModeNav';

type Props = { mode: 'halal' | 'haram' };

export default function ReligiousModePage({ mode }: Props) {
  const isHalal = mode === 'halal';
  const accent = isHalal ? '#16A34A' : '#DC2626';
  const title = isHalal ? 'Halal stocks' : 'Haram stocks';
  const classification = isHalal ? 'Halal' : 'Haram';
  const other = isHalal ? 'Haram' : 'Halal';
  const description = isHalal
    ? 'Halal stocks are securities that meet the configured Islamic stock-screening criteria. In this mode, STOCKASTICS uses an isolated Halal stock universe across Signals, Markets, News and More.'
    : 'Haram stocks are securities classified as not permissible by the configured Islamic stock-screening criteria. In this mode, STOCKASTICS uses an isolated Haram stock universe across Signals, Markets, News and More.';

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4"><Pressable accessibilityRole="button" accessibilityLabel="Back to Religious beliefs" onPress={() => router.replace('/(main)/religious-beliefs' as never)} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100" hitSlop={8}><Ionicons name="arrow-back" size={22} color="#0F172A" /></Pressable><View className="flex-1 px-3"><Text className="text-center text-sm font-extrabold tracking-[2px] text-slate-900">STOCKASTICS</Text><Text style={{ color: accent }} className="mt-1 text-center text-xs font-extrabold uppercase tracking-widest">{classification} stocks</Text></View><View className="h-10 w-10" /></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-5 pt-7"><View style={{ backgroundColor: accent }} className="rounded-3xl p-6"><View className="flex-row items-center justify-between"><View className="rounded-full bg-white/20 px-3 py-1"><Text className="text-xs font-extrabold text-white">{classification.toUpperCase()}</Text></View><Ionicons name={isHalal ? 'checkmark-circle-outline' : 'close-circle-outline'} size={28} color="#FFFFFF" /></View><Text className="mt-5 text-3xl font-extrabold text-white">{title}</Text><Text className="mt-3 text-base leading-7 text-white/95">{description}</Text></View><View className="mt-5 rounded-3xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">How {classification} stocks work</Text><Text className="mt-2 text-sm leading-6 text-slate-500">Every stock, signal, news item, market record and stock-related More feature must carry an explicit {classification} classification from its configured API/screening source. Unclassified records and {other} records are excluded and are never replaced with General data.</Text></View></ScrollView>
      <ReligiousModeNav mode={mode} />
    </SafeAreaView>
  );
}
