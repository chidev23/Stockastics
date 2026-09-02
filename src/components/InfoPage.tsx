import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoreBackButton from './MoreBackButton';
import { modeColor, modeLabel, resolveReligiousMode } from '../services/stockScope';

type InfoPageProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

/** Shared More information page. The religious query is deliberately read at
 * page level so Company Report, News Analytics and other InfoPage screens keep
 * their Halal/Haram universe instead of silently becoming General pages. */
export default function InfoPage({ title, icon, intro, sections }: InfoPageProps) {
  const params = useLocalSearchParams<{ religious?: string }>();
  const religious = resolveReligiousMode(params.religious);
  const label = modeLabel(religious);
  const accent = modeColor(religious);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <MoreBackButton />
        <Text style={label ? { color: accent } : undefined} className="ml-3 flex-1 text-xl font-extrabold text-slate-900">{label ? `${label} ${title}` : title}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-5">
        {label ? <View style={{ backgroundColor: `${accent}10`, borderColor: `${accent}30` }} className="mb-4 rounded-2xl border p-4"><Text style={{ color: accent }} className="font-extrabold">{label} stock universe active</Text><Text className="mt-1 text-xs leading-5 text-slate-600">This More feature is scoped to {label}-classified stock data. General and {label === 'Halal' ? 'Haram' : 'Halal'} stock records must not be mixed into this view.</Text></View> : null}
        <View className="rounded-2xl bg-white p-5">
          <View style={label ? { backgroundColor: `${accent}14` } : undefined} className="h-12 w-12 items-center justify-center rounded-xl bg-emerald-50"><Ionicons name={icon} size={25} color={label ? accent : '#16A34A'} /></View>
          <Text className="mt-4 text-base leading-6 text-slate-600">{label ? `${intro} Production data for this page should come only from the ${label} stock/news universe.` : intro}</Text>
        </View>
        {sections.map((section) => <View key={section.heading} className="mt-4 rounded-2xl bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">{section.heading}</Text><Text className="mt-2 text-sm leading-6 text-slate-600">{label ? `${section.body} In ${label} mode, this information is restricted to ${label}-classified securities.` : section.body}</Text></View>)}
      </ScrollView>
    </SafeAreaView>
  );
}
