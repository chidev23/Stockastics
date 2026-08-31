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
    ? 'STOCKASTICS Halal mode organizes the stock experience around securities classified as Halal by the configured screening framework.'
    : 'STOCKASTICS Haram mode organizes the stock experience around securities classified as Haram by the configured screening framework.';

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'bottom']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable accessibilityRole="button" accessibilityLabel="Back to Religious beliefs" onPress={() => router.replace('/(main)/religious-beliefs')} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100" hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-slate-900">{title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-8 pt-7">
        <View style={{ backgroundColor: accent }} className="rounded-3xl p-5">
          <View className="flex-row items-center justify-between">
            <View className="rounded-full bg-white/20 px-3 py-1"><Text className="text-xs font-extrabold text-white">{classification.toUpperCase()} MODE</Text></View>
            <Ionicons name={isHalal ? 'checkmark-circle-outline' : 'close-circle-outline'} size={27} color="#FFFFFF" />
          </View>
          <Text className="mt-5 text-2xl font-extrabold text-white">{title}</Text>
          <Text className="mt-2 text-sm leading-6 text-white/90">{description}</Text>
        </View>

        <View className="mt-5 rounded-3xl bg-white p-5">
          <Text className="text-lg font-extrabold text-slate-900">How {classification} stock screening works</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            Stocks shown in this mode should be classified using the configured religious screening data. Screening can consider the company’s business activities and relevant financial criteria under the selected framework.
          </Text>
        </View>

        <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-5">
          <Text className="text-base font-extrabold text-slate-900">Your {classification} experience</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-500">
            Use the navigation below to move between {classification} Signals, {classification} Markets and {classification} News. The selected mode is passed with those destinations so the experience remains focused on {classification} stocks.
          </Text>
        </View>
      </ScrollView>

      <ReligiousModeNav mode={mode} />
    </SafeAreaView>
  );
}
