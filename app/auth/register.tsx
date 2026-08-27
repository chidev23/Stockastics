import { Link, router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BLUE = '#2563EB';

export default function RegisterScreen() {
  const handleRegister = () => {
    // Authentication is intentionally disabled during the frontend test phase.
    // Continue to the app so the registration flow can be tested without Firebase.
    router.replace('/(main)');
  };

  const handleGoogleSignup = () => {
    // Google/Firebase authentication will be connected later.
    router.replace('/(main)');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        <View className="flex-1 justify-center">
          <View className="mx-auto w-full max-w-[520px]">
            <View className="items-center">
              <View className="h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                <Text className="text-3xl font-extrabold" style={{ color: BLUE }}>S</Text>
              </View>
              <Text className="mt-5 text-3xl font-bold tracking-tight text-slate-900">Create account</Text>
              <Text className="mt-2 text-center text-base text-slate-500">Create your STOCKASTICS account</Text>
            </View>

            <Pressable onPress={handleGoogleSignup} className="mt-8 h-14 flex-row items-center justify-center rounded-xl border border-slate-200 bg-slate-100 active:opacity-70">
              <MaterialCommunityIcons name="google" size={23} color="#4285F4" />
              <Text className="ml-3 text-base font-semibold text-slate-800">Sign up with Google</Text>
            </Pressable>

            <View className="my-6 flex-row items-center">
              <View className="h-px flex-1 bg-slate-200" />
              <Text className="mx-4 text-base font-medium text-slate-500">or</Text>
              <View className="h-px flex-1 bg-slate-200" />
            </View>

            <View className="gap-4">
              <TextInput placeholder="Full name" placeholderTextColor="#A1A1AA" autoComplete="name" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" />
              <TextInput placeholder="Email address" placeholderTextColor="#A1A1AA" autoCapitalize="none" autoComplete="email" keyboardType="email-address" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" />
              <TextInput placeholder="Password" placeholderTextColor="#A1A1AA" secureTextEntry autoComplete="new-password" className="h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" />
            </View>

            <Pressable onPress={handleRegister} className="mt-5 h-14 items-center justify-center rounded-xl bg-stockastics-blue active:opacity-80">
              <Text className="text-base font-bold text-white">Create account</Text>
            </Pressable>

            <View className="mt-6 items-center">
              <View className="flex-row items-center">
                <Text className="text-base text-slate-800">Already have an account? </Text>
                <Link href="/auth/login" className="text-base font-semibold" style={{ color: BLUE }}>Log in</Link>
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
