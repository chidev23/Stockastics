import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoreBackButton from '../../src/components/MoreBackButton';
import { modeColor, modeLabel, resolveReligiousMode, scopeByReligiousMode, type StockClassification } from '../../src/services/stockScope';

type SentimentStock = {ticker:string; bullish:string; trend:string; source:string; religious?:StockClassification};
const stocks:SentimentStock[]=[
  {ticker:'TSLA',bullish:'78%',trend:'+5%',source:'Twitter + Reddit'},
  {ticker:'SEPLAT',bullish:'35%',trend:'-2%',source:'Twitter + Reddit + News'},
  {ticker:'AAPL',bullish:'65%',trend:'+3%',source:'Twitter + StockTwits'},
  {ticker:'NVDA',bullish:'82%',trend:'+12%',source:'Reddit + Twitter'},
];

export default function CommunitySentiment(){
  const {religious:rawReligious}=useLocalSearchParams<{religious?:string}>();
  const religious=resolveReligiousMode(rawReligious);
  const label=modeLabel(religious);
  const accent=modeColor(religious);
  const visible=scopeByReligiousMode(stocks,religious);
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-4"><MoreBackButton/><Text style={label?{color:accent}:undefined} className="text-xl font-extrabold text-slate-900">{label?`${label} Community Sentiment`:'Community Sentiment'}</Text><Pressable><Ionicons name="refresh" size={21} color="#2563EB"/></Pressable></View>
    <ScrollView contentContainerClassName="px-5 pb-8 pt-5">
      {label && visible.length===0 ? <View style={{backgroundColor:`${accent}10`,borderColor:`${accent}30`}} className="mb-5 rounded-2xl border p-4"><Text style={{color:accent}} className="font-extrabold">{label} sentiment scope active</Text><Text className="mt-1 text-sm leading-5 text-slate-600">General sentiment metrics are not shared with this feed. The {label} sentiment API must provide classified stock records before aggregate sentiment is displayed.</Text></View> : <><Text className="text-lg font-extrabold text-slate-900">{label?`${label} Stock Sentiment`:'Overall Market Sentiment'}</Text><View className="mt-3 rounded-2xl bg-white p-5"><View className="flex-row justify-between"><Text className="font-bold text-emerald-600">Bullish</Text><Text className="font-extrabold text-emerald-600">62%</Text></View><View className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><View className="h-full w-[62%] rounded-full bg-emerald-500"/></View><View className="mt-3 flex-row justify-between"><Text className="font-bold text-red-500">Bearish</Text><Text className="font-extrabold text-red-500">38%</Text></View></View></>}
      <Text className="mb-3 mt-6 text-lg font-extrabold text-slate-900">Top {label||'Market'} Stocks by Sentiment</Text>
      {visible.length===0?<View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="people-outline" size={36} color="#94A3B8"/><Text className="mt-3 text-center font-extrabold text-slate-800">{label?`No ${label} stock sentiment available`:'No stock sentiment available'}</Text><Text className="mt-1 text-center text-sm leading-5 text-slate-500">{label?`Only sentiment records explicitly classified as ${label} by their stock API can appear here.`:'Sentiment data will appear when the production API is connected.'}</Text></View>:visible.map(s=><Pressable key={s.ticker} onPress={()=>router.push({pathname:'/stock-detail',params:{religious,stockReligious:s.religious}} as never)} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"><View className="flex-row justify-between"><Text className="font-extrabold text-slate-900">{s.ticker}</Text><Text className="font-bold text-emerald-600">{s.bullish} Bullish</Text></View><View className="mt-3 h-2 rounded-full bg-slate-100"><View className="h-2 rounded-full bg-emerald-500" style={{width:s.bullish}}/></View><Text className="mt-2 text-xs text-slate-500">Source: {s.source}</Text><Text className={`mt-1 text-xs font-bold ${s.trend.startsWith('+')?'text-emerald-600':'text-red-600'}`}>Trend: {s.trend} last hour</Text></Pressable>)}
    </ScrollView>
  </SafeAreaView>
}
