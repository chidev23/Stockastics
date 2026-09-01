import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface SideMenuProps { visible: boolean; onClose: () => void; }

const items = [
  { label: 'Profile', icon: 'person-outline' as const, route: '/profile' },
  { label: 'Subscription', icon: 'card-outline' as const, route: '/subscription' },
  { label: 'Affiliate', icon: 'people-outline' as const, route: '/affiliate' },
  { label: 'Customer support', icon: 'headset-outline' as const, route: '/customer-support' },
  { label: 'Legal', icon: 'shield-checkmark-outline' as const, route: '/legal' },
  { label: 'Blog and Article', icon: 'document-text-outline' as const, route: '/blog-articles' },
  { label: 'Education and Courses', icon: 'school-outline' as const, route: '/education' },
  { label: 'Settings', icon: 'settings-outline' as const, route: '/settings' },
];

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  if (!visible) return null;
  const navigate = (route: string) => { onClose(); router.push(route as never); };
  return (
    <View className="absolute left-0 right-0 top-0 bottom-0 z-50 flex-row">
      <View className="h-full w-[82%] max-w-[340px] bg-white shadow-2xl">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="px-5 pb-8 pt-14">
          <View className="mb-6 flex-row items-center justify-between">
            <View><Text className="text-xs font-extrabold uppercase tracking-[2px] text-emerald-600">STOCKASTICS</Text><Text className="mt-1 text-xl font-extrabold text-slate-900">Menu</Text></View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close menu" onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200"><Ionicons name="close" size={22} color="#0f172a" /></Pressable>
          </View>
          {items.map((item) => <Pressable key={item.label} accessibilityRole="button" accessibilityLabel={item.label} onPress={() => navigate(item.route)} className="mb-1 flex-row items-center rounded-2xl px-4 py-3.5 active:bg-slate-100"><View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-emerald-50"><Ionicons name={item.icon} size={22} color="#16A34A" /></View><Text className="flex-1 text-base font-bold text-slate-800">{item.label}</Text><Ionicons name="chevron-forward" size={18} color="#94a3b8" /></Pressable>)}
          <View className="mt-3 border-t border-slate-100 pt-3"><Pressable accessibilityRole="button" accessibilityLabel="Delete Account" onPress={() => navigate('/delete-account')} className="flex-row items-center rounded-2xl px-4 py-3.5 active:bg-red-50"><View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-red-50"><Ionicons name="trash-outline" size={22} color="#DC2626" /></View><Text className="flex-1 text-base font-bold text-red-600">Delete Account</Text><Ionicons name="chevron-forward" size={18} color="#F87171" /></Pressable></View>
          <View className="mt-5 rounded-2xl bg-slate-50 p-4"><Text className="text-xs font-bold text-slate-500">STOCKASTICS</Text><Text className="mt-1 text-xs leading-5 text-slate-400">Market intelligence and independent BUY signals.</Text></View>
        </ScrollView>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Close menu" className="flex-1 bg-black/40" onPress={onClose} />
    </View>
  );
}
