import { Link, router } from 'expo-router';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { setTestSession } from '../../src/session';

const GREEN = '#16A34A';

function GoogleLogo() {
  return (
    <Svg width={22} height={22} viewBox="0 0 48 48" accessibilityLabel="Google logo">
      <Path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20c10 0 19.2-7.2 19.2-20 0-1.2-.1-2.3-.4-3.5z" />
      <Path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z" />
      <Path fill="#4CAF50" d="M24 44c5.1 0 9.7-2 13.1-5.2l-6.1-5.2C29.1 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.4 39.7 16.1 44 24 44z" />
      <Path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.9 5.4-7.4 6.3l6.1 5.2C33.6 40.4 44 34 44 24c0-1.2-.1-2.3-.4-3.5z" />
    </Svg>
  );
}

export default function RegisterScreen() {
  const handleRegister = async () => {
    await setTestSession();
    router.replace('/(main)/');
  };

  const handleGoogleSignup = async () => {
    await setTestSession();
    router.replace('/(main)/');
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      <KeyboardAvoidingView className="flex-1" behavior="padding" keyboardVerticalOffset={0}>
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'} contentContainerClassName="flex-grow px-6 py-8" automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}>
          <View className="flex-1 justify-center">
            <View className="mx-auto w-full max-w-[520px]">
              <View className="items-center">
                <View className="h-20 w-20 overflow-hidden rounded-2xl bg-black">
                  <Image source={require('../../assets/icon.jpg')} className="h-full w-full" resizeMode="contain" accessibilityLabel="STOCKASTICS logo" />
                </View>
                <Text className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Create account</Text>
                <Text className="mt-2 text-center text-base text-slate-500">Create your STOCKASTICS account</Text>
              </View>
              <Pressable onPress={handleGoogleSignup} className="mt-8 h-14 flex-row items-center justify-center rounded-xl border border-slate-200 bg-white active:opacity-70"><GoogleLogo /><Text className="ml-3 text-base font-semibold text-slate-800">Sign up with Google</Text></Pressable>
              <View className="my-6 flex-row items-center"><View className="h-px flex-1 bg-slate-200" /><Text className="mx-4 text-base font-medium text-slate-500">or</Text><View className="h-px flex-1 bg-slate-200" /></View>
              <View className="gap-4"><TextInput placeholder="Full name" placeholderTextColor="#A1A1AA" autoComplete="name" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" /><TextInput placeholder="Email address" placeholderTextColor="#A1A1AA" autoCapitalize="none" autoComplete="email" keyboardType="email-address" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" /><TextInput placeholder="Password" placeholderTextColor="#A1A1AA" secureTextEntry autoComplete="new-password" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" /></View>
              <Pressable onPress={handleRegister} className="mt-5 h-14 items-center justify-center rounded-xl active:opacity-80" style={{ backgroundColor: GREEN }}><Text className="text-base font-bold text-white">Create account</Text></Pressable>
              <View className="mt-6 items-center"><View className="flex-row items-center"><Text className="text-base text-slate-800">Already have an account? </Text><Link href="/auth/login" className="text-base font-semibold" style={{ color: GREEN }}>Log in</Link></View></View>
              <View className="mt-12 flex-row items-center justify-center"><Link href="/legal/privacy" className="text-sm font-semibold" style={{ color: GREEN }}>Privacy Policy</Link><Text className="mx-5 text-slate-300">|</Text><Link href="/legal/terms" className="text-sm font-semibold" style={{ color: GREEN }}>Terms & Conditions</Link></View>
              <Text className="mt-4 text-center text-sm text-slate-400">© {new Date().getFullYear()} STOCKASTICS. All rights reserved.</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
