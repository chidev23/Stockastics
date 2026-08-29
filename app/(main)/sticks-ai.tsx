import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const suggestions = [
  'What is the signal for TSLA?',
  'Compare NVDA and AMD signals',
  'What is the sentiment for Nigeria?',
  'What events are happening today?',
  'What stocks are trending right now?',
];

export default function SticksAI() {
  const [q, setQ] = useState('');
  const [msgs, setMsgs] = useState<{ r: string; t: string }[]>([]);
  const insets = useSafeAreaInsets();
  const bottomSafePadding = Math.max(insets.bottom, 12);

  const send = () => {
    if (!q.trim()) return;
    setMsgs((m) => [
      ...m,
      { r: 'You', t: q.trim() },
      {
        r: 'Sticks AI',
        t: 'I can help explain STOCKASTICS signals, market sentiment, news, events and portfolio information using available market data and proprietary analysis. Not financial advice. Do your own research.',
      },
    ]);
    setQ('');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="ml-4 text-xl font-extrabold text-slate-900">Sticks AI</Text>
      </View>

      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="px-5 pb-6 pt-5"
      >
        <View className="rounded-3xl bg-blue-700 p-5">
          <Ionicons name="sparkles" size={25} color="white" />
          <Text className="mt-4 text-xl font-extrabold text-white">How can I help you today?</Text>
          <Text className="mt-2 text-sm leading-5 text-blue-100">
            Ask about stocks, signals, sentiment, news or market events.
          </Text>
        </View>

        <Text className="mb-3 mt-6 font-extrabold text-slate-900">Suggested Questions</Text>
        {suggestions.map((x) => (
          <Pressable
            key={x}
            onPress={() => setQ(x)}
            className="mb-2 rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <Text className="text-sm text-slate-700">{x}</Text>
          </Pressable>
        ))}

        {msgs.map((m, i) => (
          <View
            key={i}
            className={`mt-3 rounded-2xl p-4 ${
              m.r === 'You' ? 'ml-8 bg-slate-200' : 'mr-4 border border-slate-200 bg-white'
            }`}
          >
            <Text className="text-xs font-bold text-slate-500">{m.r}</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-800">{m.t}</Text>
          </View>
        ))}
      </ScrollView>

      <View
        className="border-t border-slate-200 bg-white px-5 pt-3"
        style={{ paddingBottom: bottomSafePadding }}
      >
        <View className="flex-row rounded-2xl bg-slate-100 px-4 py-2">
          <TextInput
            value={q}
            onChangeText={setQ}
            onSubmitEditing={send}
            returnKeyType="send"
            placeholder="Ask Sticks AI..."
            placeholderTextColor="#94A3B8"
            className="min-h-10 flex-1 text-base text-slate-900"
          />
          <Pressable
            onPress={send}
            className="ml-2 h-10 w-10 items-center justify-center rounded-xl bg-blue-700"
          >
            <Ionicons name="arrow-up" size={19} color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
