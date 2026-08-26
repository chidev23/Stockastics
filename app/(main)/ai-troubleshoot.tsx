import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AITroubleshoot() {
  const report = () => Alert.alert('Report a Problem', 'Your report has been prepared for Customer Support.');
  const contact = () => Alert.alert('Customer Support', 'Customer Support portal will open here.');
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4"><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#0F172A" /></Pressable><Text className="ml-4 text-xl font-extrabold text-slate-900">AI Troubleshoot</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-5">
      <View className="rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Check a Signal</Text><Text className="mt-1 text-sm text-slate-500">Check whether a stock has current signal data.</Text><View className="mt-4 flex-row"><TextInput autoCapitalize="characters" placeholder="Stock ticker e.g. META" placeholderTextColor="#94A3B8" className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-slate-900"/><Pressable onPress={() => Alert.alert('Signal Check', 'Signal availability will be checked securely.')} className="ml-2 rounded-xl bg-blue-700 px-5 py-3"><Text className="font-bold text-white">Check</Text></Pressable></View></View>
      <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Having a problem?</Text><Text className="mt-2 text-sm leading-5 text-slate-500">If a signal is missing, outdated, or appears incorrect, report it to Customer Support for investigation.</Text><Pressable onPress={report} className="mt-4 rounded-xl border border-slate-200 px-4 py-3"><Text className="text-center font-bold text-slate-700">Report a Problem</Text></Pressable></View>
      <View className="mt-4 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Quick Troubleshooting</Text>{['Refresh your signal feed.','Check your internet connection.','Check that the relevant market is open.','Contact Customer Support if the issue continues.'].map((x,i)=><View key={x} className="mt-3 flex-row"><Text className="mr-2 font-bold text-blue-700">{i+1}.</Text><Text className="flex-1 text-sm leading-5 text-slate-600">{x}</Text></View>)}</View>
      <View className="mt-4 rounded-2xl bg-blue-50 p-5"><Text className="text-lg font-extrabold text-slate-900">Need more help?</Text><Text className="mt-2 text-sm leading-5 text-slate-600">Our Customer Support team can help with account, subscription, signal and app issues.</Text><Pressable onPress={contact} className="mt-4 rounded-xl bg-blue-700 px-4 py-3"><Text className="text-center font-bold text-white">Contact Customer Support</Text></Pressable></View>
    </ScrollView>
  </SafeAreaView>;
}
