import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MoreBackButton from '../../src/components/MoreBackButton';
import { modeColor, modeLabel, resolveReligiousMode, scopeByReligiousMode, type StockClassification } from '../../src/services/stockScope';

type Post={author:string;time:string;body:string;shares:string;replies:string;religious?:StockClassification};
const posts:Post[]=[
  {author:'John_Doe',time:'5 min ago',body:'Just got a BUY signal on TSLA.',shares:'12',replies:'3'},
  {author:'Analyst_Kelechi',time:'1 hour ago',body:'Anyone else seeing the Nigeria market turning bullish?',shares:'45',replies:'18'},
  {author:'SYSTEM',time:'2 hours ago',body:'BUY signal on AAPL.',shares:'89',replies:'24'},
  {author:'TechTrader',time:'3 hours ago',body:'Anyone watching NVDA? Strong volume today',shares:'23',replies:'7'},
];

export default function CommunityChat(){
  const params=useLocalSearchParams<{religious?:string}>();
  const religious=resolveReligiousMode(params.religious);
  const label=modeLabel(religious);
  const accent=modeColor(religious);
  const visiblePosts=scopeByReligiousMode(posts,religious);
  const insets=useSafeAreaInsets();
  const bottomSafePadding=Math.max(insets.bottom,12);
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top','bottom']}>
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS==='ios'?'padding':'height'} keyboardVerticalOffset={Platform.OS==='ios'?0:24}>
      <View className="flex-row items-center justify-between border-b border-slate-100 bg-white px-5 py-4"><MoreBackButton/><Text style={label?{color:accent}:undefined} className="text-xl font-extrabold text-slate-900">{label?`${label} Community Chat`:'Community Chat'}</Text><Pressable><Ionicons name="search" size={21} color="#0F172A"/></Pressable></View>
      <View className="flex-row gap-2 px-5 py-3"><View style={{backgroundColor:accent}} className="rounded-full px-5 py-2"><Text className="text-xs font-bold text-white">{label||'Global'}</Text></View><View className="rounded-full bg-white px-5 py-2"><Text className="text-xs font-bold text-slate-700">Following</Text></View><View className="rounded-full bg-white px-5 py-2"><Text className="text-xs font-bold text-slate-700">Trending</Text></View></View>
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" keyboardDismissMode={Platform.OS==='ios'?'interactive':'on-drag'} contentContainerClassName="px-5 pb-5 pt-2">
        {visiblePosts.length===0?<View className="items-center rounded-2xl bg-white px-6 py-12"><Ionicons name="chatbubbles-outline" size={36} color="#94A3B8"/><Text className="mt-3 text-center font-extrabold text-slate-800">{label?`No ${label} community posts available`:'No community posts available'}</Text><Text className="mt-1 text-center text-sm leading-5 text-slate-500">{label?`Only posts attached to ${label}-classified stock data can appear in this community. General and ${label==='Halal'?'Haram':'Halal'} posts are excluded.`:'Community posts will appear here when the production service is connected.'}</Text></View>:visiblePosts.map(p=><View key={p.author+p.time} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"><View className="flex-row items-center"><View className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"><Ionicons name={p.author==='SYSTEM'?'megaphone':'person'} size={17} color="#64748B"/></View><Text className="ml-3 font-bold text-slate-900">{p.author} <Text className="font-normal text-slate-400">· {p.time}</Text></Text></View><Text className="mt-3 text-sm leading-5 text-slate-700">{p.body}</Text><View className="mt-3 flex-row"><Text className="text-xs text-slate-500">↻ {p.shares} shares · 💬 {p.replies} replies</Text><Text className="ml-auto text-xs text-slate-500">♡ Like</Text></View></View>)}
      </ScrollView>
      <View className="border-t border-slate-200 bg-white px-4 pt-3" style={{paddingBottom:bottomSafePadding}}><View className="flex-row items-center"><Pressable className="mr-2 h-11 w-9 items-center justify-center"><Ionicons name="attach" size={22} color="#64748B"/></Pressable><TextInput placeholder={label?`Message the ${label} community...`:'Type a message...'} placeholderTextColor="#94A3B8" returnKeyType="send" className="mr-2 min-h-11 flex-1 rounded-xl bg-slate-100 px-4 py-2 text-base text-slate-900"/><Pressable style={{backgroundColor:accent}} className="min-h-11 items-center justify-center rounded-xl px-5"><Text className="font-bold text-white">Send</Text></Pressable></View></View>
    </KeyboardAvoidingView>
  </SafeAreaView>
}
