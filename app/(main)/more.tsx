import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ReligiousMode = 'halal' | 'haram';

const items = [
  ['Trending Stock', 'trending-up', '/trending-stock'],
  ['Economic Calendar', 'calendar-outline', '/economic-calendar'],
  ['Community Sentiment', 'people-outline', '/community-sentiment'],
  ['Community Chat', 'chatbubbles-outline', '/community-chat'],
  ['Portfolio Register', 'briefcase-outline', '/portfolio-register'],
  ['Customer Support', 'headset-outline', '/customer-support'],
  ['Legal', 'shield-checkmark-outline', '/legal'],
  ['Blog & Articles', 'document-text-outline', '/blog-articles'],
  ['Delete Account', 'trash-outline', '/delete-account'],
  ['Company Report', 'business-outline', '/company-report'],
  ['News Analytics and Speculation', 'analytics-outline', '/news-analytics'],
  ['Behavioural Report', 'pulse-outline', '/behavioural-report'],
  ['Education and Courses', 'school-outline', '/education'],
] as const;

export default function MoreScreen() {
  const params = useLocalSearchParams<{ religious?: string }>();
  const religious: ReligiousMode | undefined = params.religious === 'halal' || params.religious === 'haram' ? params.religious : undefined;
  const accent = religious === 'haram' ? '#DC2626' : '#16A34A';
  const title = religious ? `${religious === 'halal' ? 'Halal' : 'Haram'} More` : 'MORE';

  const openItem = (route: string) => {
    if (religious) {
      router.push({ pathname: `/(main)${route}`, params: { religious } } as never);
      return;
    }
    router.push(`/(main)${route}` as never);
  };

  const goBackToReligiousHome = () => {
    if (!religious) return;
    router.replace(`/(main)/${religious}` as never);
  };

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
      {religious ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Back to ${religious} stocks`} onPress={goBackToReligiousHome} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100" hitSlop={8}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
      ) : null}
      <Text style={religious ? { color: accent } : undefined} className={`${religious ? 'ml-3' : ''} text-2xl font-extrabold text-slate-900`}>{title}</Text>
    </View>
    <ScrollView contentContainerClassName="pb-8 pt-2">
      <View className="overflow-hidden rounded-2xl bg-white">
        <Text className="px-5 pb-2 pt-5 text-xs font-bold uppercase tracking-wider text-slate-400">{religious ? `${religious === 'halal' ? 'Halal' : 'Haram'} tools & community` : 'Tools & Community'}</Text>
        {items.map(([label, icon, route], index) => <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} onPress={() => openItem(route)} className={`flex-row items-center px-5 py-4 active:bg-slate-50 ${index ? 'border-t border-slate-100' : ''}`}>
          <View style={{ backgroundColor: `${accent}14` }} className="h-10 w-10 items-center justify-center rounded-xl"><Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={accent} /></View>
          <Text className="ml-4 flex-1 font-semibold text-slate-800">{label}</Text>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </Pressable>)}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
