import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearTestSession } from '../../src/session';

export default function DeleteAccountScreen() {
  const handleDelete = () => {
    Alert.alert('Delete account', 'This will remove your testing session from this device. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete Account', style: 'destructive', onPress: async () => { await clearTestSession(); router.replace('/auth/login'); } },
    ]);
  };

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4"><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-slate-50"><Ionicons name="arrow-back" size={22} color="#0F172A" /></Pressable><Text className="ml-3 text-xl font-extrabold text-slate-900">Delete Account</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-6">
      <View className="items-center rounded-2xl bg-white p-6"><View className="h-14 w-14 items-center justify-center rounded-full bg-red-50"><Ionicons name="trash-outline" size={28} color="#DC2626" /></View><Text className="mt-4 text-xl font-extrabold text-slate-900">Delete your account</Text><Text className="mt-2 text-center text-sm leading-6 text-slate-500">Deleting an account is permanent. Your saved account data and access will be removed when account deletion is connected to the production backend.</Text><Pressable accessibilityRole="button" onPress={handleDelete} className="mt-6 h-12 w-full items-center justify-center rounded-xl bg-red-600 active:opacity-80"><Text className="font-bold text-white">Delete Account</Text></Pressable></View>
    </ScrollView>
  </SafeAreaView>;
}
