import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../src/services/firebase/config';
import { sendEmailVerification, signOut } from 'firebase/auth';

export default function VerifyEmailScreen() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function resend() {
    if (!auth.currentUser) return;
    setBusy(true); setMessage('');
    try { await sendEmailVerification(auth.currentUser); setMessage('Verification email sent.'); }
    finally { setBusy(false); }
  }

  async function continueToApp() {
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) router.replace('/home');
    else setMessage('Please verify your email before continuing.');
  }

  async function backToLogin() { await signOut(auth); router.replace('/auth/login'); }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-extrabold text-stockastics-ink">Verify your email</Text>
        <Text className="mt-3 text-base leading-6 text-stockastics-muted">We sent a verification link to your email. Verify it, then return here to continue.</Text>
        {!!message && <Text className="mt-4 text-sm text-stockastics-blue">{message}</Text>}
        <Pressable onPress={continueToApp} className="mt-7 items-center rounded-2xl bg-stockastics-green py-4">
          <Text className="font-bold text-white">I verified my email</Text>
        </Pressable>
        <Pressable onPress={resend} disabled={busy} className="mt-3 items-center rounded-2xl border border-slate-200 py-4">
          {busy ? <ActivityIndicator /> : <Text className="font-bold text-stockastics-blue">Resend email</Text>}
        </Pressable>
        <Pressable onPress={backToLogin} className="mt-5 items-center"><Text className="font-semibold text-stockastics-muted">Use another account</Text></Pressable>
      </View>
    </SafeAreaView>
  );
}
