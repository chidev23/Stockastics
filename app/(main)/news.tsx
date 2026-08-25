import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-5 pt-4" edges={['top']}>
      <Text className="text-2xl font-extrabold text-slate-900">Market News</Text>
      <Text className="mt-1 text-sm text-slate-500">Stay informed with relevant market developments.</Text>
      <View className="mt-6 rounded-2xl bg-white p-5">
        <Text className="font-bold text-slate-900">Latest news</Text>
        <Text className="mt-2 text-slate-500">The live news feed and article details will be added in the News build.</Text>
      </View>
    </SafeAreaView>
  );
}
