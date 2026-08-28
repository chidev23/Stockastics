import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTestSubscription, TEST_TRIAL_DAYS, type TestSubscription } from '../../src/session';

const GREEN = '#16A34A';
const DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function SubscriptionScreen() {
  const [subscription, setSubscription] = useState<TestSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestSubscription().then(setSubscription).finally(() => setLoading(false));
  }, []);

  const trialEndsAt = subscription?.trialEndsAt ?? Date.now();
  const daysRemaining = Math.max(0, Math.ceil((trialEndsAt - Date.now()) / DAY_MS));
  const trialActive = daysRemaining > 0;

  if (loading) {
    return <SafeAreaView className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator size="large" color={GREEN} /></SafeAreaView>;
  }

  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="border-b border-slate-100 bg-white px-5 py-4">
      <Text className="text-2xl font-extrabold text-slate-900">Subscription</Text>
      <Text className="mt-1 text-sm text-slate-500">Your STOCKASTICS plan and access status</Text>
    </View>
    <ScrollView contentContainerClassName="px-5 pb-10 pt-5">
      <View className="rounded-3xl bg-emerald-600 p-6">
        <View className="flex-row items-center justify-between">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-white/20"><Ionicons name="sparkles" size={24} color="white" /></View>
          <View className="rounded-full bg-white/20 px-3 py-2"><Text className="text-xs font-extrabold text-white">{trialActive ? 'ACTIVE' : 'EXPIRED'}</Text></View>
        </View>
        <Text className="mt-5 text-2xl font-extrabold text-white">{trialActive ? '14-Day Free Trial' : 'Trial Expired'}</Text>
        <Text className="mt-2 text-sm leading-5 text-emerald-50">
          {trialActive ? `Your free trial is active. ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} remaining.` : 'Your free trial has ended. A monthly subscription is required to access Signals.'}
        </Text>
      </View>

      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <Text className="text-lg font-extrabold text-slate-900">Current plan</Text>
        <View className="mt-4 flex-row items-center justify-between"><Text className="text-sm text-slate-500">Plan</Text><Text className="font-bold text-slate-900">14-Day Free Trial</Text></View>
        <View className="mt-3 flex-row items-center justify-between"><Text className="text-sm text-slate-500">Trial ends</Text><Text className="font-bold text-slate-900">{formatDate(trialEndsAt)}</Text></View>
        <View className="mt-3 flex-row items-center justify-between"><Text className="text-sm text-slate-500">Monthly plan</Text><Text className="font-bold text-slate-900">$50 / month</Text></View>
      </View>

      <View className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
        <Text className="text-lg font-extrabold text-slate-900">No activation required</Text>
        <Text className="mt-2 text-sm leading-5 text-slate-600">
          Every new STOCKASTICS account is automatically enrolled in the {TEST_TRIAL_DAYS}-day free trial. You do not need to opt in again from this page.
        </Text>
      </View>

      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <Text className="text-lg font-extrabold text-slate-900">Signal access</Text>
        <Text className="mt-2 text-sm leading-5 text-slate-500">
          {trialActive ? 'All Signal pages are available during your active trial.' : 'Signal pages are locked until a monthly subscription is active.'}
        </Text>
        {!trialActive && <Pressable onPress={() => router.push('/subscription' as never)} className="mt-4 rounded-xl bg-emerald-600 px-4 py-3"><Text className="text-center font-bold text-white">Subscribe Monthly — $50</Text></Pressable>}
      </View>

      <View className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <Text className="text-lg font-extrabold text-slate-900">What you get</Text>
        {['Retail Buy Signals','IPO Signals','Buyback Signals','Sentiment Investor Signals','Ex-Dividend Signals','Income Investing Signals','Market News','Community and Sticks AI'].map((item)=><View key={item} className="mt-3 flex-row items-center"><Ionicons name="checkmark-circle" size={19} color={GREEN} /><Text className="ml-3 flex-1 text-sm text-slate-700">{item}</Text></View>)}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
