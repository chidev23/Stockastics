import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const items = [
  ['Trending Stock', 'trending-up', '/trending-stock'],
  ['Economic Calendar', 'calendar-outline', '/economic-calendar'],
  ['Community Sentiment', 'people-outline', '/community-sentiment'],
  ['Community Chat', 'chatbubbles-outline', '/community-chat'],
  ['Portfolio Register', 'briefcase-outline', '/portfolio-register'],
  ['Sticks AI', 'sparkles-outline', '/sticks-ai'],
  ['Company Report', 'business-outline', '/company-report'],
  ['News Analytics and Speculation', 'analytics-outline', '/news-analytics'],
  ['Behavioural Report', 'brain-outline', '/behavioural-report'],
] as const;

export default function MoreScreen() {
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="border-b border-slate-100 bg-white px-5 py-4"><Text className="text-2xl font-extrabold text-slate-900">MORE</Text></View>
    <ScrollView contentContainerClassName="pb-8 pt-2">
      <View className="overflow-hidden rounded-2xl bg-white">
        <Text className="px-5 pb-2 pt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Tools & Community</Text>
        {items.map(([label, icon, route], index) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} onPress={() => router.push(route as never)} className={`flex-row items-center px-5 py-4 active:bg-slate-50 ${index ? 'border-t border-slate-100' : ''}`}>
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-emerald-50"><Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color="#16A34A" /></View>
          <Text className="ml-4 flex-1 font-semibold text-slate-800">{label}</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </Pressable>)}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
