import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modeColor, modeLabel, resolveReligiousMode, scopeByReligiousMode, type StockClassification } from '../../src/services/stockScope';

const categories = ['Top Stories','Latest','Stocks','Economy','Nigeria','USA','UK','Europe','Asia'];
type Story = { category:string; title:string; source:string; time:string; tag:string; religious?: StockClassification };

// The production news API must attach the classification of the related stock.
// These demo headlines are intentionally unclassified and therefore never leak
// into Halal/Haram news feeds.
const stories: Story[] = [
  { category:'Markets', title:'Global stocks watch central-bank signals as investors assess the next move', source:'Reuters', time:'12 min ago', tag:'GLOBAL' },
  { category:'Stocks', title:'Technology shares lead the market as investors reassess growth outlook', source:'Market Desk', time:'28 min ago', tag:'TECH' },
  { category:'Nigeria', title:'Nigerian equities remain in focus as investors track corporate results', source:'Business News', time:'41 min ago', tag:'NG' },
  { category:'Economy', title:'Investors monitor inflation and employment data for fresh market direction', source:'Economic Desk', time:'1 hr ago', tag:'ECONOMY' },
  { category:'Stocks', title:'Large-cap companies attract renewed attention across major exchanges', source:'Market Desk', time:'2 hrs ago', tag:'US' },
  { category:'Energy', title:'Energy shares move into focus as commodity markets react to new data', source:'Market Desk', time:'3 hrs ago', tag:'ENERGY' },
];

export default function NewsScreen(){
  const params=useLocalSearchParams<{religious?:string}>();
  const religious=resolveReligiousMode(params.religious);
  const label=modeLabel(religious);
  const accent=modeColor(religious);
  const visibleStories=scopeByReligiousMode(stories,religious);

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="px-5 pt-4">
      <View className="flex-row items-center justify-between"><View><Text style={label?{color:accent}:undefined} className="text-2xl font-extrabold text-slate-900">{label?`${label} News`:'Market News'}</Text><Text className="mt-1 text-sm text-slate-500">{label?`This is an isolated ${label} stock-news feed. General headlines are never used as a fallback.`:'Stay informed with relevant market developments.'}</Text></View><View className="h-10 w-10 items-center justify-center rounded-full bg-white"><Ionicons name="notifications-outline" size={20} color="#0F172A"/></View></View>
      <View className="mt-4 flex-row items-center rounded-2xl bg-white px-4 py-3"><Ionicons name="search" size={19} color="#64748B"/><TextInput placeholder="Search news, stocks or topics" placeholderTextColor="#94A3B8" className="ml-3 flex-1 text-sm text-slate-900"/></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:62,flexGrow:0}} contentContainerStyle={{alignItems:'center',paddingHorizontal:20,paddingVertical:5,gap:8}}>{categories.map((c,i)=><Pressable key={c} style={{minHeight:46,minWidth:c.length>8?94:70,flexShrink:0,justifyContent:'center',alignItems:'center',paddingHorizontal:14,borderRadius:999,backgroundColor:i===0?'#2563EB':'#FFFFFF',borderWidth:i===0?0:1,borderColor:'#E2E8F0'}}><Text numberOfLines={1} allowFontScaling={false} style={{fontSize:12,lineHeight:16,fontWeight:'800',color:i===0?'#FFFFFF':'#334155'}}>{c}</Text></Pressable>)}</ScrollView>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-4">
      <View style={{backgroundColor:`${accent}10`}} className="mb-5 rounded-2xl border border-slate-200 p-4"><Text style={{color:accent}} className="font-extrabold">{label?`${label} screening mode active`:'News feed'}</Text><Text className="mt-1 text-xs leading-5 text-slate-600">{label?`Only news records whose related stock is explicitly classified as ${label} by its screening/API source may be rendered in this mode.`:'Live headlines, sources, timestamps, related tickers and summaries will be supplied by the configured production news API.'}</Text></View>
      <Text className="mb-3 text-lg font-extrabold text-slate-900">Top Stories</Text>
      {visibleStories.length===0?<View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="newspaper-outline" size={36} color="#94A3B8"/><Text className="mt-3 text-center font-extrabold text-slate-800">{label?`No ${label} stock news available`:'No news found'}</Text><Text className="mt-1 text-center text-sm leading-5 text-slate-500">{label?`The ${label} feed is isolated from General and ${label==='halal'?'Haram':'Halal'} content. It will populate only from explicitly classified API records.`:'Live production news will appear here when the news API is connected.'}</Text></View>:visibleStories.map((s,i)=><Pressable key={s.title} onPress={()=>router.push({pathname:'/news-article',params:{title:s.title,...(religious?{religious}: {})}} as never)} className="mb-3 overflow-hidden rounded-2xl border border-slate-200 bg-white"><View className={`h-2 ${['bg-blue-600','bg-emerald-500','bg-red-500','bg-violet-500','bg-amber-500','bg-cyan-500'][i]}`}/><View className="p-4"><View className="flex-row items-center justify-between"><Text className="text-xs font-extrabold uppercase tracking-wider text-blue-700">{s.tag}</Text><Text className="text-xs text-slate-400">{s.time}</Text></View><Text className="mt-2 text-base font-extrabold leading-6 text-slate-900">{s.title}</Text><Text className="mt-2 text-xs text-slate-500">{s.source} · Market News</Text></View></Pressable>)}
    </ScrollView>
  </SafeAreaView>
}
