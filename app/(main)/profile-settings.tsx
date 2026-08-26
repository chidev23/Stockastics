import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Row = ({ icon, title, subtitle, onPress }: { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle?: string; onPress?: () => void }) => (
  <Pressable onPress={onPress} className="flex-row items-center border-b border-slate-100 px-5 py-4 active:bg-slate-50">
    <View className="h-10 w-10 items-center justify-center rounded-xl bg-blue-50"><Ionicons name={icon} size={20} color="#2563EB" /></View>
    <View className="ml-3 flex-1"><Text className="font-bold text-slate-900">{title}</Text>{subtitle && <Text className="mt-1 text-xs text-slate-500">{subtitle}</Text>}</View>
    <Ionicons name="chevron-forward" size={19} color="#94A3B8" />
  </Pressable>
);

export default function ProfileSettingsScreen() {
  const [notifications, setNotifications] = Switch.useState?.(true) ?? [true, () => {}];
  return <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
    <View className="flex-row items-center border-b border-slate-100 bg-white px-5 py-4"><Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#0F172A" /></Pressable><Text className="ml-4 text-xl font-extrabold text-slate-900">Profile & Settings</Text></View>
    <ScrollView contentContainerClassName="pb-10">
      <View className="items-center bg-white px-5 py-7"><View className="h-20 w-20 items-center justify-center rounded-full bg-blue-700"><Text className="text-2xl font-extrabold text-white">U</Text></View><Text className="mt-3 text-xl font-extrabold text-slate-900">User</Text><Text className="mt-1 text-sm text-slate-500">Manage your STOCKASTICS account</Text><Pressable onPress={() => Alert.alert('Edit Profile','Profile editing will be connected to your Firebase account.')} className="mt-4 rounded-xl border border-blue-700 px-5 py-2.5"><Text className="font-bold text-blue-700">Edit Profile</Text></Pressable></View>
      <Text className="px-5 pb-2 pt-6 text-xs font-extrabold uppercase tracking-wider text-slate-500">Account</Text>
      <View className="bg-white"><Row icon="person-outline" title="Personal Information" subtitle="Name, email and account details" onPress={() => Alert.alert('Personal Information','Your Firebase account details will appear here.')} /><Row icon="card-outline" title="Subscription" subtitle="$50/month · 14-day free trial" onPress={() => router.push('/subscription')} /></View>
      <Text className="px-5 pb-2 pt-6 text-xs font-extrabold uppercase tracking-wider text-slate-500">Preferences</Text>
      <View className="bg-white"><View className="flex-row items-center border-b border-slate-100 px-5 py-4"><View className="h-10 w-10 items-center justify-center rounded-xl bg-blue-50"><Ionicons name="notifications-outline" size={20} color="#2563EB" /></View><View className="ml-3 flex-1"><Text className="font-bold text-slate-900">Signal Notifications</Text><Text className="mt-1 text-xs text-slate-500">Receive new STOCKASTICS signal alerts</Text></View><Switch value={notifications} onValueChange={setNotifications} /></View><Row icon="globe-outline" title="Market & Country" subtitle="Choose your preferred market" onPress={() => Alert.alert('Market & Country','Market preference will be saved to your profile.')} /><Row icon="language-outline" title="Language" subtitle="English" onPress={() => Alert.alert('Language','Language selection will be available here.')} /></View>
      <Text className="px-5 pb-2 pt-6 text-xs font-extrabold uppercase tracking-wider text-slate-500">Security & Privacy</Text>
      <View className="bg-white"><Row icon="lock-closed-outline" title="Change Password" onPress={() => Alert.alert('Change Password','Password management is handled securely through Firebase Authentication.')} /><Row icon="shield-checkmark-outline" title="Privacy & Security" onPress={() => Alert.alert('Privacy & Security','Review your account privacy and security options.')} /><Row icon="document-text-outline" title="Legal & Terms" onPress={() => Alert.alert('Legal & Terms','Terms, Privacy Policy and other legal documents will appear here.')} /></View>
      <Pressable onPress={() => Alert.alert('Sign Out','Are you sure you want to sign out?')} className="mx-5 mt-6 rounded-xl border border-red-200 bg-white px-4 py-3"><Text className="text-center font-bold text-red-600">Sign Out</Text></Pressable>
    </ScrollView>
  </SafeAreaView>;
}
