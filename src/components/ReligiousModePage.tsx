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
  const description = isHalal
    ? 'Halal stocks are securities classified as permissible under the configured Islamic stock-screening framework. STOCKASTICS keeps the Signals, Markets and News experience focused on stocks carrying a Halal classification from the screening source.'
    : 'Haram stocks are securities classified as not permissible under the configured Islamic stock-screening framework. STOCKASTICS keeps the Signals, Markets and News experience focused on stocks carrying a Haram classification from the screening source.';

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'bottom']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable accessibilityRole="button" accessibilityLabel="Back to Religious beliefs" onPress={() => router.replace('/(main)/religious-beliefs')} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100" hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <View className="flex-1 px-3">
          <Text className="text-center text-sm font-extrabold tracking-[2px] text-emerald-600">STOCKASTICS</Text>
          <Text style={{ color: accent }} className="mt-1 text-center text-xs font-extrabold uppercase tracking-widest">{classification} stocks</Text>
        </View>
        <View className="h-10 w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-8 pt-6">
        <View style={{ backgroundColor: accent }} className="overflow-hidden rounded-3xl p-5">
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-white/20 px-3 py-1"><Text className="text-xs font-extrabold text-white">{classification.toUpperCase()} MODE</Text></View>
            <Ionicons name={isHalal ? 'checkmark-circle-outline' : 'close-circle-outline'} size={27} color="#FFFFFF" />
          </View>
          <Text className="mt-5 text-2xl font-extrabold text-white">{title}</Text>
          <Text className="mt-2 text-sm leading-6 text-white/90">{description}</Text>
        </View>

        <View className="mt-6 rounded-3xl bg-white p-5">
          <Text className="text-lg font-extrabold text-slate-900">What are {classification} stocks?</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            {isHalal
              ? 'A Halal classification means the security has passed the configured screening criteria for this app. The screening framework may consider the company’s business activities as well as relevant financial ratios and other applicable rules.'
              : 'A Haram classification means the security has been identified as not meeting the configured screening criteria for this app. The classification should be driven by the selected screening framework and its underlying data.'}
          </Text>
        </View>

        <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-5">
          <Text className="text-lg font-extrabold text-slate-900">How {classification} stock information works</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            {classification} mode is a filter across the stock experience. Signals should contain only {classification}-classified stocks, Markets should show only {classification}-classified securities, and News should contain only news connected to {classification}-classified stocks.
          </Text>
        </View>

        <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <View className="flex-row items-center"><Ionicons name="information-circle-outline" size={21} color={accent} /><Text style={{ color: accent }} className="ml-2 font-extrabold">Screening source</Text></View>
          <Text className="mt-2 text-xs leading-5 text-slate-500">STOCKASTICS should display a classification only when the configured screening data source provides it. Classifications can change when company activities or financial information change.</Text>
        </View>
      </ScrollView>

      <ReligiousModeNav mode={mode} />
    </SafeAreaView>
  );
}
