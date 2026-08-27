import { Link } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BLUE = '#2563EB';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleReset() {
    setMessage(''); setError('');
    if (!email.trim()) { setError('Enter your email address.'); return; }
    try {
      setBusy(true);
      const { sendResetEmail } = await import('../../src/services/firebase/auth');
      await sendResetEmail(email);
      setMessage('Password reset instructions have been sent to your email.');
    } catch (e) {
      setError(e instanceof Error ? e.message.replace('Firebase: ', '') : 'Unable to send reset email.');
    } finally { setBusy(false); }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-stockastics-ink">Reset password</Text>
        <Text className="mt-2 text-base text-stockastics-muted">Enter the email linked to your STOCKASTICS account.</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base" />
        {!!error && <Text className="mt-3 text-center text-sm text-stockastics-red">{error}</Text>}
        {!!message && <Text className="mt-3 text-center text-sm text-stockastics-green">{message}</Text>}
        <Pressable onPress={handleReset} disabled={busy} className="mt-5 items-center rounded-2xl bg-stockastics-blue py-4 active:opacity-80">
          {busy ? <ActivityIndicator color="#FFFFFF" /> : <Text className="text-base font-bold text-white">Send reset email</Text>}
        </Pressable>
        <Link href="/auth/login" className="mt-4 text-center font-semibold" style={{ color: BLUE }}>Back to sign in</Link>
      </View>
    </SafeAreaView>
  );
}
