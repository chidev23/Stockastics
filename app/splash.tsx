import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hasTestSession } from '../src/session';

const GREEN = '#16A34A';

export default function SplashScreen() {
  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      const authenticated = await hasTestSession();
      if (!mounted) return;
      router.replace(authenticated ? '/(main)/' : '/auth/login');
    };
    checkSession();
    return () => { mounted = false; };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-green-50">
          <Text className="text-4xl font-black" style={{ color: GREEN }}>S</Text>
        </View>
        <Text className="mt-6 text-3xl font-black tracking-[2px]" style={{ color: GREEN }}>STOCKASTICS</Text>
        <Text className="mt-2 text-center text-sm text-slate-500">Intelligent stock market signals</Text>
      </View>
    </SafeAreaView>
  );
}
