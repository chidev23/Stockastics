import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const tabs = ['Global', 'Following', 'Trending'];
const posts = [
  ['John_Doe', '5 min ago', 'Just got a BUY signal on TSLA.', '12', '3'],
  ['Analyst_Kelechi', '1 hour ago', 'Anyone else watching the Nigeria market today?', '45', '18'],
  ['TechTrader', '3 hours ago', 'Anyone watching NVDA? Volume is getting interesting.', '23', '7'],
];

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const bottomSafePadding = Math.max(insets.bottom, 12);

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'bottom']}>
      <KeyboardAvoidingView className="flex-1" behavior="padding" keyboardVerticalOffset={0}>
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <View><Text className="text-2xl font-extrabold text-slate-900">Community</Text><Text className="mt-1 text-sm text-slate-500">Connect with other STOCKASTICS users.</Text></View>
            <Pressable className="h-10 w-10 items-center justify-center rounded-full bg-white"><Ionicons name="search" size={20} color="#0F172A" /></Pressable>
          </View>
          <View className="mt-4 flex-row rounded-2xl bg-white p-1">
            {tabs.map((t, i) => <Pressable key={t} className={`flex-1 items-center rounded-xl py-3 ${i === 0 ? 'bg-blue-700' : ''}`}><Text className={`text-xs font-bold ${i === 0 ? 'text-white' : 'text-slate-600'}`}>{t}</Text></Pressable>)}
          </View>
        </View>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} contentContainerClassName="px-5 pb-5 pt-5">
          {posts.map((p) => <View key={p[0] + p[1]} className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"><View className="flex-row items-center"><View className="h-10 w-10 items-center justify-center rounded-full bg-blue-100"><Text className="font-extrabold text-blue-700">{p[0][0]}</Text></View><View className="ml-3"><Text className="font-bold text-slate-900">{p[0]}</Text><Text className="text-xs text-slate-400">{p[1]}</Text></View></View><Text className="mt-4 text-sm leading-6 text-slate-800">{p[2]}</Text><View className="mt-4 flex-row border-t border-slate-100 pt-3"><Text className="mr-5 text-xs text-slate-500">↗ {p[3]} shares</Text><Text className="text-xs text-slate-500">💬 {p[4]} replies</Text><Text className="ml-auto text-xs text-slate-500">♡ Like</Text></View></View>)}
        </ScrollView>
        <View className="border-t border-slate-200 bg-white px-5 pt-3" style={{ paddingBottom: bottomSafePadding }}>
          <Text className="font-bold text-slate-900">Join the conversation</Text>
          <View className="mt-3 flex-row items-center rounded-xl bg-slate-50 px-3 py-2">
            <TextInput placeholder="Write a community post..." placeholderTextColor="#94A3B8" className="flex-1 text-sm" />
            <Pressable className="rounded-lg bg-blue-700 px-3 py-2"><Text className="text-xs font-bold text-white">Post</Text></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
