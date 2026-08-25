import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/auth/login'), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">
        <View className="h-24 w-24 items-center justify-center rounded-[28px] bg-stockastics-blue">
          <Text className="text-4xl font-black text-white">S</Text>
        </View>
        <Text className="mt-6 text-3xl font-black tracking-[2px] text-stockastics-blue">STOCKASTICS</Text>
        <Text className="mt-2 text-center text-sm text-stockastics-muted">Intelligent stock market signals</Text>
      </View>
    </SafeAreaView>
  );
}
