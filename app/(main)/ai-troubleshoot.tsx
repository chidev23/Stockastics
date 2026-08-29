import { Ionicons } from '@expo/vector-icons';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const statuses = [
  ['AI Engine', 'Running', 'checkmark-circle'],
  ['Signal Feed', 'Connected', 'checkmark-circle'],
  ['Market Data', 'Connected', 'checkmark-circle'],
  ['News Feed', 'Operational', 'checkmark-circle'],
  ['Notifications', 'Active', 'checkmark-circle'],
];

export default function AITroubleshoot() {
  const report = () => Alert.alert('Report a Problem', 'Your report has been prepared for Customer Support.');

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0}>
        <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4">
          <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#0F172A" /></Pressable>
          <Text className="ml-4 text-xl font-extrabold text-slate-900">AI Troubleshoot</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-5 pb-10 pt-5">
          <View className="rounded-2xl border border-slate-200 bg-white p-5">
            <Text className="text-lg font-extrabold text-slate-900">System Status</Text>
            {statuses.map((s) => <View key={s[0]} className="mt-4 flex-row items-center"><Ionicons name={s[2] as keyof typeof Ionicons.glyphMap} size={18} color="#16A34A" /><Text className="ml-3 flex-1 text-sm text-slate-700">{s[0]}</Text><Text className="text-xs font-bold text-emerald-600">{s[1]}</Text></View>)}
          </View>
          <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
            <Text className="text-lg font-extrabold text-slate-900">Check Specific Stock</Text>
            <View className="mt-4 flex-row"><TextInput autoCapitalize="characters" placeholder="Stock ticker e.g. META" className="flex-1 rounded-xl bg-slate-100 px-4 py-3" /><Pressable onPress={() => Alert.alert('Signal Check', 'Current signal availability will be checked.')} className="ml-2 rounded-xl bg-blue-700 px-5 py-3"><Text className="font-bold text-white">Check</Text></Pressable></View>
            <Text className="mt-4 text-sm text-slate-600">The checker only displays user-safe signal availability. Internal AI diagnostics are restricted to authorized support/admin personnel.</Text>
          </View>
          <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Report Missing Signal</Text><Text className="mt-2 text-sm leading-5 text-slate-500">Report a missing, outdated or incorrect signal for investigation.</Text><Pressable onPress={report} className="mt-4 rounded-xl border border-slate-200 px-4 py-3"><Text className="text-center font-bold text-slate-700">Report Missing Signal</Text></Pressable></View>
          <View className="mt-4 rounded-2xl bg-blue-50 p-5"><Text className="font-extrabold text-slate-900">Need help?</Text><Text className="mt-2 text-sm leading-5 text-slate-600">Contact Customer Support for account, subscription, signal or app issues.</Text><Pressable onPress={() => Alert.alert('Customer Support', 'Customer Support portal will open here.')} className="mt-4 rounded-xl bg-blue-700 px-4 py-3"><Text className="text-center font-bold text-white">Contact Support</Text></Pressable></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
