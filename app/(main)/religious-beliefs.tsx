import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReligiousBeliefsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </Pressable>
        <Text className="ml-3 flex-1 text-xl font-extrabold text-slate-900">Religious beliefs</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-10 pt-5">
        <View className="rounded-3xl bg-emerald-600 p-5">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Ionicons name="book-outline" size={25} color="#FFFFFF" />
          </View>
          <Text className="mt-4 text-2xl font-extrabold text-white">Religious beliefs</Text>
          <Text className="mt-2 leading-5 text-emerald-50">
            Explore information and perspectives on religious beliefs, traditions and their place in society.
          </Text>
        </View>

        <View className="mt-5 rounded-3xl bg-white p-5">
          <Text className="text-lg font-extrabold text-slate-900">Explore beliefs and traditions</Text>
          <Text className="mt-2 leading-6 text-slate-500">
            This section will provide educational articles and neutral explanations of major religious beliefs, traditions and cultural practices.
          </Text>
        </View>

        <View className="mt-4 rounded-3xl border border-slate-200 bg-white p-5">
          <View className="flex-row items-center">
            <Ionicons name="information-circle-outline" size={22} color="#16A34A" />
            <Text className="ml-3 text-base font-bold text-slate-900">Educational content</Text>
          </View>
          <Text className="mt-2 leading-6 text-slate-500">
            Content is intended for information and education. Different communities may hold different interpretations and practices.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
