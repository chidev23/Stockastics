import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GREEN = '#16A34A';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleReset() {
    setMessage('');
    setError('');
    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }
    // Frontend testing mode: Firebase authentication is intentionally disabled.
    setMessage('Password reset flow is ready. Email delivery will be enabled when Firebase is connected.');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <View className="mx-auto w-full max-w-[520px]">
          <Text className="text-3xl font-extrabold text-slate-900">Reset password</Text>
          <Text className="mt-2 text-base text-slate-500">Enter the email linked to your STOCKASTICS account.</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" className="mt-8 h-14 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900" />
          {!!error && <Text className="mt-3 text-center text-sm text-red-600">{error}</Text>}
          {!!message && <Text className="mt-3 text-center text-sm text-green-700">{message}</Text>}
          <Pressable onPress={handleReset} className="mt-5 h-14 items-center justify-center rounded-xl active:opacity-80" style={{ backgroundColor: GREEN }}>
            <Text className="text-base font-bold text-white">Send reset email</Text>
          </Pressable>
          <Link href="/auth/login" className="mt-4 text-center font-semibold" style={{ color: GREEN }}>Back to sign in</Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
