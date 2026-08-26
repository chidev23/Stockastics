import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubscriptionScreen() {
  const trial = () => Alert.alert('14-Day Free Trial', 'Your trial activation will be connected to secure checkout.');
  const manage = () => Alert.alert('Manage Subscription', 'Billing, renewal and cancellation controls will be connected to the subscription backend.');
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="border-b border-slate-100 bg-white px-5 py-4"><Text className="text-2xl font-extrabold text-slate-900">Subscription</Text><Text className="mt-1 text-sm text-slate-500">Manage your STOCKASTICS membership</Text></View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-5">
      <View className="rounded-3xl bg-blue-700 p-6"><View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20"><Ionicons name="sparkles" size={24} color="white" /></View><Text className="mt-5 text-2xl font-extrabold text-white">STOCKASTICS Premium</Text><Text className="mt-2 text-sm leading-5 text-blue-100">Access STOCKASTICS signals, market intelligence and premium features.</Text><View className="mt-6 flex-row items-end"><Text className="text-4xl font-extrabold text-white">$50</Text><Text className="mb-1 ml-2 text-sm text-blue-100">/ month</Text></View></View>
      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">14-Day Free Trial</Text><Text className="mt-2 text-sm leading-5 text-slate-500">Try STOCKASTICS for 14 days before your paid subscription begins.</Text><Pressable onPress={trial} className="mt-4 rounded-xl bg-blue-700 px-4 py-3"><Text className="text-center font-bold text-white">Start 14-Day Free Trial</Text></Pressable></View>
      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">What you get</Text>{['Retail Buy Signals','IPO Signals','Buyback Signals','Sentiment Investor Signals','Ex-Dividend Signals','Income Investing Signals','Market news','Community and Sticks AI'].map((item)=><View key={item} className="mt-3 flex-row items-center"><Ionicons name="checkmark-circle" size={19} color="#16A34A" /><Text className="ml-3 flex-1 text-sm text-slate-700">{item}</Text></View>)}</View>
      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5"><Text className="text-lg font-extrabold text-slate-900">Manage your plan</Text><Text className="mt-2 text-sm leading-5 text-slate-500">View subscription status, billing and cancellation options from this section.</Text><Pressable onPress={manage} className="mt-4 rounded-xl border border-blue-700 px-4 py-3"><Text className="text-center font-bold text-blue-700">Manage Subscription</Text></Pressable></View>
      <Text className="mt-5 text-center text-xs leading-5 text-slate-400">Subscription terms, payment processing and access control will be enforced by the production backend.</Text>
    </ScrollView>
  </SafeAreaView>;
}
