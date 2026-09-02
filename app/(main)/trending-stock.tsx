import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoreBackButton from '../../src/components/MoreBackButton';
import { modeColor, modeLabel, resolveReligiousMode, scopeByReligiousMode, type StockClassification } from '../../src/services/stockScope';

type Trending = { ticker:string; company:string; mentions:string; signal:string; change:string; religious?:StockClassification };
const data:Trending[]=[
  {ticker:'TSLA',company:'Tesla Inc.',mentions:'1,247',signal:'BUY 87%',change:'+12%'},
  {ticker:'SEPLAT',company:'Seplat Energy',mentions:'892',signal:'BUY 72%',change:'+5%'},
  {ticker:'AAPL',company:'Apple Inc.',mentions:'756',signal:'BUY 92%',change:'-3%'},
  {ticker:'NVDA',company:'NVIDIA Corporation',mentions:'701',signal:'BUY 94%',change:'+8%'},
  {ticker:'GOOGL',company:'Alphabet Inc.',mentions:'645',signal:'BUY 55%',change:'-2%'},
];

export default function TrendingStock(){
  const { religious:rawReligious }=useLocalSearchParams<{religious?:string}>();
  const religious=resolveReligiousMode(rawReligious);
  const label=modeLabel(religious);
  const accent=modeColor(religious);
  const visible=scopeByReligiousMode(data,religious);
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-4"><MoreBackButton/><Text style={label?{color:accent}:undefined} className="text-xl font-extrabold text-slate-900">{label?`${label} Trending Stock`:'Trending Stock'}</Text><Pressable><Text className="text-xs font-bold text-blue-700">24h ▾</Text></Pressable></View>
    <ScrollView contentContainerClassName="px-5 pb-8 pt-5"><Text className="mb-4 text-sm text-slate-500">{label?`Trending data is isolated to ${label}-classified stocks. General and ${label==='Halal'?'Haram':'Halal'} stocks are excluded.`:'Stocks attracting the most attention across social and search sources.'}</Text>{visible.length===0?<View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="trending-up-outline" size={36} color="#94A3B8"/><Text className="mt-3 text-center font-extrabold text-slate-800">{label?`No ${label} trending stocks available`:'No trending stocks available'}</Text><Text className="mt-1 text-center text-sm leading-5 text-slate-500">{label?`This ${label} More feed waits for stock API records explicitly classified as ${label}.`:'Trending stock data will appear when the production API is connected.'}</Text></View>:visible.map((s,i)=><Pressable key={s.ticker} onPress={()=>router.push({pathname:'/stock-detail',params:{...(religious?{religious}: {})}} as never)} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"><View className="flex-row justify-between"><View><Text className="text-lg font-extrabold text-slate-900">{i+1}. {s.ticker}</Text><Text className="text-xs text-slate-500">{s.company}</Text></View><Ionicons name="chevron-forward" size={18} color="#94A3B8"/></View><Text className="mt-3 text-sm text-slate-600">🔥 {s.mentions} mentions · <Text className="font-extrabold text-blue-700">{s.signal}</Text></Text><Text className={`mt-2 text-xs font-bold ${s.change.startsWith('+')?'text-emerald-600':'text-red-600'}`}>{s.change} from previous period</Text></Pressable>)}</ScrollView>
  </SafeAreaView>
}
