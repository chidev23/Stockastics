import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type InfoPageProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  intro: string;
  sections: Array<{ heading: string; body: string }>;
};

export default function InfoPage({ title, icon, intro, sections }: InfoPageProps) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100">
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-slate-900">{title}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-5">
        <View className="rounded-2xl bg-white p-5">
          <View className="h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <Ionicons name={icon} size={25} color="#16A34A" />
          </View>
          <Text className="mt-4 text-base leading-6 text-slate-600">{intro}</Text>
        </View>
        {sections.map((section) => (
          <View key={section.heading} className="mt-4 rounded-2xl bg-white p-5">
            <Text className="text-lg font-extrabold text-slate-900">{section.heading}</Text>
            <Text className="mt-2 text-sm leading-6 text-slate-600">{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
