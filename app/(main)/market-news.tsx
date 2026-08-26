import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = ['All', 'Markets', 'Stocks', 'Economy', 'Dividends', 'IPO'];
const NEWS = [
  { id: '1', category: 'Stocks', title: 'Global stocks in focus as investors assess fresh market data', source: 'Market Desk', time: '12 min ago', ticker: 'META', summary: 'Latest developments affecting major listed companies and market activity.' },
  { id: '2', category: 'Economy', title: 'Investors watch upcoming economic releases across major markets', source: 'Market Desk', time: '38 min ago', ticker: 'US', summary: 'Key macroeconomic developments may influence market sentiment and volatility.' },
  { id: '3', category: 'IPO', title: 'New listings draw attention as investors track upcoming offerings', source: 'Market Desk', time: '1 hr ago', ticker: 'IPO', summary: 'A look at notable companies preparing to enter public markets.' },
  { id: '4', category: 'Dividends', title: 'Dividend-paying companies remain on investor watchlists', source: 'Market Desk', time: '2 hrs ago', ticker: 'DIV', summary: 'Investors continue monitoring upcoming dividend announcements and dates.' },
  { id: '5', category: 'Markets', title: 'Markets remain active as traders monitor corporate updates', source: 'Market Desk', time: '3 hrs ago', ticker: 'GLOBAL', summary: 'Company news and market developments continue to shape investor attention.' },
];

export default function MarketNewsScreen() {
  const [category, setCategory] = React.useState('All');
  const [query, setQuery] = React.useState('');
  const filtered = NEWS.filter(n => (category === 'All' || n.category === category) && `${n.title} ${n.ticker}`.toLowerCase().includes(query.toLowerCase()));
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="border-b border-slate-100 bg-white px-5 pb-4 pt-4"><View className="flex-row items-center justify-between"><View><Text className="text-2xl font-extrabold text-slate-900">Market News</Text><Text className="mt-1 text-sm text-slate-500">Stay informed about the markets</Text></View><Pressable onPress={() => Alert.alert('Refresh','Latest market news will be refreshed from the news service.')} className="h-10 w-10 items-center justify-center rounded-full bg-blue-50"><Ionicons name="refresh" size={20} color="#2563EB" /></Pressable></View><View className="mt-4 flex-row items-center rounded-xl bg-slate-100 px-4"><Ionicons name="search" size={19} color="#64748B" /><TextInput value={query} onChangeText={setQuery} placeholder="Search news or stock ticker" placeholderTextColor="#94A3B8" className="ml-2 flex-1 py-3 text-slate-900" /></View></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="max-h-16 bg-white" contentContainerClassName="items-center px-5"><View className="flex-row gap-2">{CATEGORIES.map(c => <Pressable key={c} onPress={() => setCategory(c)} className={`rounded-full px-4 py-2 ${category === c ? 'bg-blue-700' : 'bg-slate-100'}`}><Text className={`text-sm font-bold ${category === c ? 'text-white' : 'text-slate-600'}`}>{c}</Text></Pressable>)}</View></ScrollView>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-4">
      {filtered.length === 0 ? <View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="newspaper-outline" size={42} color="#94A3B8" /><Text className="mt-4 text-lg font-extrabold text-slate-900">No news found</Text><Text className="mt-2 text-center text-sm text-slate-500">Try another search or category.</Text></View> : filtered.map(n => <Pressable key={n.id} onPress={() => Alert.alert(n.title, `${n.summary}\n\n${n.source} · ${n.time}`)} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"><View className="flex-row items-center"><View className="h-10 w-10 items-center justify-center rounded-xl bg-blue-50"><Ionicons name="newspaper-outline" size={20} color="#2563EB" /></View><View className="ml-3 flex-1"><Text className="text-xs font-bold uppercase text-blue-700">{n.category} · {n.ticker}</Text><Text className="mt-1 text-xs text-slate-500">{n.source} · {n.time}</Text></View></View><Text className="mt-3 text-base font-extrabold leading-6 text-slate-900">{n.title}</Text><Text className="mt-2 text-sm leading-5 text-slate-500">{n.summary}</Text><View className="mt-3 flex-row items-center"><Text className="text-sm font-bold text-blue-700">Read article</Text><Ionicons name="chevron-forward" size={16} color="#2563EB" /></View></Pressable>)}
      <View className="mt-2 rounded-2xl bg-blue-50 p-4"><Text className="text-xs leading-5 text-slate-600">Market news is provided for informational purposes. News availability and publication times may vary by source. Not financial advice. Do your own research.</Text></View>
    </ScrollView>
  </SafeAreaView>;
}
