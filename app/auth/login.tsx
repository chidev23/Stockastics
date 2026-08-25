import { Link, router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginWithEmail } from '../../src/services/firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    try {
      setBusy(true);
      await loginWithEmail(email, password);
      router.replace('/');
    } catch (e) {
      setError(e instanceof Error ? e.message.replace('Firebase: ', '') : 'Unable to sign in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold tracking-tight text-stockastics-ink">Welcome back</Text>
        <Text className="mt-2 text-base text-stockastics-muted">Sign in to access STOCKASTICS BUY signals.</Text>

        <View className="mt-8 gap-4">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-stockastics-ink"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            autoComplete="password"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-stockastics-ink"
          />
        </View>

        {!!error && <Text className="mt-3 text-sm text-stockastics-red">{error}</Text>}

        <Pressable onPress={handleLogin} disabled={busy} className="mt-5 items-center rounded-2xl bg-stockastics-blue py-4 active:opacity-80">
          {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text className="text-base font-bold text-white">Sign In</Text>}
        </Pressable>

        <Link href="/auth/forgot-password" className="mt-5 text-center font-semibold text-stockastics-blue">Forgot password?</Link>
        <Link href="/auth/register" className="mt-4 text-center font-semibold text-stockastics-green">Create an account</Link>
      </View>
    </SafeAreaView>
  );
}
