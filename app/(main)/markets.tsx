import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const countries = ['All', 'USA', 'Nigeria', 'UK', 'Canada', 'Germany', 'Japan'];
type Stock = { ticker: string; company: string; price: string; change: string; country: string; exchange: string; currency: string };
const stocks: Stock[] = [
  { ticker: 'META', company: 'Meta Platforms, Inc.', price: '450.00', change: '+2.84%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
  { ticker: 'AMZN', company: 'Amazon.com, Inc.', price: '225.40', change: '+1.62%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
  { ticker: 'AAPL', company: 'Apple Inc.', price: '198.22', change: '-0.48%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
  { ticker: 'NVDA', company: 'NVIDIA Corporation', price: '128.74', change: '+3.21%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
  { ticker: 'SEPLAT', company: 'Seplat Energy', price: '5,820', change: '+1.14%', country: 'Nigeria', exchange: 'NGX', currency: '₦' },
  { ticker: 'GTCO', company: 'Guaranty Trust Holding', price: '68.40', change: '-0.72%', country: 'Nigeria', exchange: 'NGX', currency: '₦' },
  { ticker: 'TSLA', company: 'Tesla, Inc.', price: '342.10', change: '+4.08%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
  { ticker: 'MSFT', company: 'Microsoft Corporation', price: '512.30', change: '+0.91%', country: 'USA', exchange: 'NASDAQ', currency: '$' },
];

export default function MarketsScreen() {
  const params = useLocalSearchParams<{ religious?: string }>();
  const religious = params.religious === 'halal' || params.religious === 'haram' ? params.religious : undefined;
  const modeLabel = religious ? religious === 'halal' ? 'Halal' : 'Haram' : undefined;
  const [country, setCountry] = useState('All');
  const [query, setQuery] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const filtered = useMemo(() => religious ? [] : stocks.filter(s => (country === 'All' || s.country === country) && `${s.ticker} ${s.company}`.toLowerCase().includes(query.trim().toLowerCase())), [country, query, religious]);
  const open = (s: Stock) => router.push({ pathname: '/stock-market-view', params: { ...s } });
  const toggleWatch = (ticker: string) => setWatchlist(w => w.includes(ticker) ? w.filter(x => x !== ticker) : [...w, ticker]);

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="px-5 pt-4"><Text className="text-2xl font-extrabold text-slate-900">{modeLabel ? `${modeLabel} Markets` : 'Markets'}</Text><Text className="mt-1 text-sm text-slate-500">{modeLabel ? `Only ${modeLabel}-classified stocks should appear in this mode.` : 'Explore stocks and market data by country.'}</Text>
      <View className="mt-4 flex-row items-center rounded-2xl border border-slate-200 bg-white px-4"><Ionicons name="search-outline" size={20} color="#64748B" /><TextInput value={query} onChangeText={setQuery} placeholder="Search company or ticker" placeholderTextColor="#94A3B8" className="ml-2 h-12 flex-1 text-slate-900" /></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 max-h-12" contentContainerClassName="gap-2 px-5">{countries.map(c => <Pressable key={c} onPress={() => setCountry(c)} className={`rounded-full px-4 py-2.5 ${country === c ? 'bg-blue-700' : 'border border-slate-200 bg-white'}`}><Text className={`text-xs font-bold ${country === c ? 'text-white' : 'text-slate-700'}`}>{c}</Text></Pressable>)}</ScrollView>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-5"><View className="mb-4 flex-row items-center justify-between"><Text className="text-lg font-extrabold text-slate-900">{modeLabel ? `${modeLabel} Stocks` : 'Stocks'}</Text><Text className="text-xs font-semibold text-slate-500">{filtered.length} available</Text></View>
      {filtered.length === 0 ? <View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="search-outline" size={34} color="#94A3B8" /><Text className="mt-3 text-center font-bold text-slate-800">{modeLabel ? `No ${modeLabel} stocks available yet` : 'No stocks found'}</Text><Text className="mt-1 text-center text-xs leading-5 text-slate-500">{modeLabel ? `Only stocks classified as ${modeLabel} by the configured screening source will appear here.` : 'Try another ticker, company name, or country.'}</Text></View> : filtered.map(s => <Pressable key={s.ticker} onPress={() => open(s)} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 active:opacity-80"><View className="flex-row items-center"><View className="flex-1"><Text className="text-base font-extrabold text-slate-900">{s.ticker}</Text><Text className="mt-1 text-xs text-slate-500">{s.company}</Text><Text className="mt-1 text-[11px] text-slate-400">{s.country} · {s.exchange}</Text></View><View className="items-end"><Text className="font-extrabold text-slate-900">{s.currency}{s.price}</Text><Text className={`mt-1 text-xs font-bold ${s.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{s.change}</Text></View><Pressable onPress={(e) => { e.stopPropagation(); toggleWatch(s.ticker); }} hitSlop={10} className="ml-3 h-9 w-9 items-center justify-center rounded-full bg-slate-50"><Ionicons name={watchlist.includes(s.ticker) ? 'star' : 'star-outline'} size={19} color={watchlist.includes(s.ticker) ? '#2563EB' : '#64748B'} /></Pressable><Ionicons name="chevron-forward" size={18} color="#94A3B8" className="ml-2" /></View></Pressable>)}
      {!modeLabel && <View className="mt-2 rounded-2xl border border-blue-100 bg-blue-50 p-4"><Text className="font-bold text-blue-900">Market data</Text><Text className="mt-1 text-xs leading-5 text-blue-800">Prices, volume and company statistics come from the configured market-data provider. Data may be delayed.</Text></View>}
    </ScrollView>
  </SafeAreaView>;
}
