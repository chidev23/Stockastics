import { Link } from 'expo-router';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BLUE = '#2563EB';

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="flex-1 justify-center">
          <View className="mx-auto w-full max-w-[520px]">
            <View className="items-center">
              <View className="h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <Text className="text-3xl font-extrabold" style={{ color: BLUE }}>S</Text>
              </View>
              <Text className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Welcome back</Text>
              <Text className="mt-2 text-center text-base text-slate-500">Sign in to your STOCKASTICS account</Text>
            </View>

            <Pressable className="mt-8 h-14 flex-row items-center justify-center rounded-xl border border-slate-200 bg-slate-100 active:opacity-70">
              <Text className="mr-3 text-xl font-bold" style={{ color: '#4285F4' }}>G</Text>
              <Text className="text-base font-semibold text-slate-800">Log in with Google</Text>
            </Pressable>

            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-slate-200" />
              <Text className="mx-4 text-base font-medium text-slate-500">or</Text>
              <View className="h-px flex-1 bg-slate-200" />
            </View>

            <View className="gap-4">
              <TextInput
                placeholder="Email address"
                placeholderTextColor="#A1A1AA"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#A1A1AA"
                secureTextEntry
                autoComplete="password"
                className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900"
              />
            </View>

            <Pressable className="mt-5 h-14 items-center justify-center rounded-xl bg-stockastics-blue active:opacity-80">
              <Text className="text-base font-bold text-white">Log in</Text>
            </Pressable>

            <View className="mt-6 items-center">
              <Link href="/auth/forgot-password" className="text-base font-semibold" style={{ color: BLUE }}>I forgot my password.</Link>
              <View className="mt-2 flex-row items-center">
                <Text className="text-base text-slate-800">New user? </Text>
                <Link href="/auth/register" className="text-base font-semibold" style={{ color: BLUE }}>Create account</Link>
              </View>
            </View>

            <View className="mt-16 flex-row items-center justify-center">
              <Link href="/legal/privacy" className="text-sm font-semibold" style={{ color: BLUE }}>Privacy Policy</Link>
              <Text className="mx-5 text-slate-300">|</Text>
              <Link href="/legal/terms" className="text-sm font-semibold" style={{ color: BLUE }}>Terms & Conditions</Link>
            </View>
            <Text className="mt-4 text-center text-sm text-slate-400">© {new Date().getFullYear()} STOCKASTICS. All rights reserved.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
