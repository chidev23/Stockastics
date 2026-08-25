import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-5 pt-4" edges={['top']}>
      <Text className="text-2xl font-extrabold text-slate-900">Notifications</Text>
      <View className="mt-6 rounded-2xl bg-white p-5">
        <Text className="font-bold text-slate-900">No notifications yet</Text>
        <Text className="mt-2 text-slate-500">New BUY signals and important account updates will appear here.</Text>
      </View>
    </SafeAreaView>
  );
}
