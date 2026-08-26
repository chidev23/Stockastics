import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister() {
    setError('');
    if (!name.trim() || !email.trim() || password.length < 8) {
      setError('Enter your name, a valid email, and a password of at least 8 characters.');
      return;
    }
    try {
      setBusy(true);
      const { registerWithEmail } = await import('../../src/services/firebase/auth');
      await registerWithEmail(email, password, name);
      router.replace('/auth/verify-email');
    } catch (e) {
      setError(e instanceof Error ? e.message.replace('Firebase: ', '') : 'Unable to create account.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-stockastics-ink">Create account</Text>
        <Text className="mt-2 text-base text-stockastics-muted">Start your 14-day STOCKASTICS free trial.</Text>
        <View className="mt-8 gap-4">
          <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor="#94A3B8" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base" />
          <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base" />
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#94A3B8" secureTextEntry className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base" />
        </View>
        {!!error && <Text className="mt-3 text-sm text-stockastics-red">{error}</Text>}
        <Pressable onPress={handleRegister} disabled={busy} className="mt-5 items-center rounded-2xl bg-stockastics-green py-4 active:opacity-80">
          {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text className="font-bold text-white">Create account</Text>}
        </Pressable>
        <Link href="/auth/login" className="mt-5 text-center font-semibold text-stockastics-blue">Already have an account? Sign in</Link>
      </View>
    </SafeAreaView>
  );
}
