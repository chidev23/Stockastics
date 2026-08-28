import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { hasActiveSignalAccess } from '../session';

const GREEN = '#16A34A';

export default function SignalGate({ children }: { children: React.ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    hasActiveSignalAccess().then(setAllowed);
  }, []);

  if (allowed === null) {
    return <View className="flex-1 items-center justify-center bg-slate-50"><ActivityIndicator size="large" color={GREEN} /></View>;
  }

  if (!allowed) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 px-6">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-50"><Text className="text-2xl">🔒</Text></View>
        <Text className="mt-5 text-center text-2xl font-extrabold text-slate-900">Signal access is locked</Text>
        <Text className="mt-2 text-center leading-5 text-slate-500">Your 14-day free trial has ended. Renew with the $50/month plan to continue accessing STOCKASTICS Signals.</Text>
        <Pressable onPress={() => router.push('/subscription' as never)} className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 active:opacity-80"><Text className="font-bold text-white">View Subscription</Text></Pressable>
      </View>
    );
  }

  return <>{children}</>;
}
