import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const suggestions = ['What is the signal for TSLA?','Compare NVDA and AMD signals','What is the sentiment for Nigeria?','Show me my portfolio performance','What events are happening today?','What stocks are trending right now?'];

export default function SticksAI() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{role:'user'|'ai';text:string}[]>([]);
  const send = () => {
    const q = question.trim();
    if (!q) return;
    setMessages((current) => [...current, {role:'user', text:q}, {role:'ai', text:'I can help you understand STOCKASTICS signals, market sentiment, portfolio information and market events using available market data and proprietary analysis.'}]);
    setQuestion('');
  };
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="border-b border-slate-100 bg-white px-5 py-4"><Text className="text-2xl font-extrabold text-slate-900">Sticks AI</Text><Text className="mt-1 text-sm text-slate-500">Your STOCKASTICS market assistant</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-6 pt-5">
      <View className="rounded-3xl bg-blue-700 p-5"><View className="h-11 w-11 items-center justify-center rounded-2xl bg-white/20"><Ionicons name="sparkles" size={23} color="white"/></View><Text className="mt-4 text-xl font-extrabold text-white">How can I help you today?</Text><Text className="mt-2 text-sm leading-5 text-blue-100">Ask about stocks, signals, sentiment, market news or your portfolio.</Text></View>
      <Text className="mb-3 mt-6 text-base font-extrabold text-slate-900">Suggested Questions</Text>
      {suggestions.map((item)=><Pressable key={item} onPress={()=>setQuestion(item)} className="mb-2 rounded-xl border border-slate-200 bg-white px-4 py-3"><Text className="text-sm font-medium text-slate-700">{item}</Text></Pressable>)}
      {messages.map((message,index)=><View key={`${message.role}-${index}`} className={`mt-3 rounded-2xl p-4 ${message.role==='user'?'ml-8 bg-slate-200':'mr-4 border border-slate-200 bg-white'}`}><Text className="text-xs font-bold text-slate-500">{message.role==='user'?'You':'Sticks AI'}</Text><Text className="mt-2 text-sm leading-6 text-slate-800">{message.text}</Text></View>)}
      <Text className="mt-5 text-center text-xs leading-5 text-slate-400">Not financial advice. Do your own research.</Text>
    </ScrollView>
    <View className="border-t border-slate-200 bg-white px-5 py-3"><View className="flex-row items-center rounded-2xl bg-slate-100 px-4 py-2"><TextInput value={question} onChangeText={setQuestion} onSubmitEditing={send} placeholder="Ask Sticks AI..." placeholderTextColor="#94A3B8" className="flex-1 text-sm text-slate-900" returnKeyType="send"/><Pressable onPress={send} className="ml-2 h-10 w-10 items-center justify-center rounded-xl bg-blue-700"><Ionicons name="arrow-up" size={19} color="white"/></Pressable></View></View>
  </SafeAreaView>;
}
