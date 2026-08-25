import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const items = [
  ['Trending Stock', 'trending-up'],
  ['Economic Calendar', 'calendar-outline'],
  ['Community Sentiment', 'people-outline'],
  ['Community Chat', 'chatbubbles-outline'],
  ['Portfolio Register', 'briefcase-outline'],
  ['Sticks AI', 'sparkles-outline'],
  ['AI Troubleshoot', 'construct-outline'],
] as const;

export default function MoreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView contentContainerClassName="px-5 pb-8 pt-4">
        <Text className="text-2xl font-extrabold text-slate-900">More</Text>
        <View className="mt-5 overflow-hidden rounded-2xl bg-white">
          {items.map(([label, icon], index) => (
            <Pressable key={label} onPress={() => undefined} className={`flex-row items-center px-4 py-5 active:bg-slate-50 ${index > 0 ? 'border-t border-slate-100' : ''}`}>
              <View className="h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color="#2563EB" />
              </View>
              <Text className="ml-4 flex-1 font-semibold text-slate-800">{label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
