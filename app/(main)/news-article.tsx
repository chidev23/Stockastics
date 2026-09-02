import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modeColor, modeLabel, resolveReligiousMode } from '../../src/services/stockScope';

export default function NewsArticleScreen() {
  const { title = 'Market News', religious: rawReligious } = useLocalSearchParams<{ title?: string; religious?: string }>();
  const religious = resolveReligiousMode(rawReligious);
  const label = modeLabel(religious);
  const accent = modeColor(religious);
  return <SafeAreaView className="flex-1 bg-white" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 px-5 py-4"><Pressable onPress={()=>router.back()} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-slate-50"><Ionicons name="arrow-back" size={20} color="#0F172A"/></Pressable><Text className="text-lg font-extrabold text-slate-900">{label ? `${label} News` : 'News'}</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-6"><Text style={{color:accent}} className="text-xs font-bold uppercase tracking-wider">{label ? `${label} Stock News` : 'Market News'}</Text><Text className="mt-3 text-3xl font-extrabold leading-9 text-slate-900">{title}</Text><Text className="mt-3 text-xs text-slate-500">STOCKASTICS {label ? `${label} ` : ''}News · Just now</Text><View className="mt-6 h-44 items-center justify-center rounded-3xl bg-slate-100"><Ionicons name="newspaper-outline" size={48} color="#64748B"/></View><Text className="mt-6 text-base leading-7 text-slate-700">This article view is scoped to the selected stock universe. The production news API should supply the headline, source, timestamp, related stock, screening classification and full article content for this exact scope.</Text><View style={{backgroundColor:`${accent}10`,borderColor:`${accent}30`}} className="mt-6 rounded-2xl border p-4"><Text style={{color:accent}} className="font-bold">{label ? `${label} market context` : 'Market context'}</Text><Text className="mt-1 text-sm leading-5 text-slate-700">{label ? `Only ${label}-classified company and stock metadata should be attached to this article. General and ${label==='Halal'?'Haram':'Halal'} records must remain outside this view.` : 'Related ticker, country, sector and sentiment metadata can be displayed here when supplied by the news API.'}</Text></View></ScrollView>
  </SafeAreaView>
}
