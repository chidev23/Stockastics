import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
}

const items = [
  { label: 'Profile', icon: 'person-outline' as const, route: '/profile' },
  { label: 'Subscription', icon: 'card-outline' as const, route: '/subscription' },
  { label: 'Affiliate', icon: 'people-outline' as const, route: '/affiliate' },
  { label: 'Settings', icon: 'settings-outline' as const, route: '/settings' },
];

export default function SideMenu({ visible, onClose }: SideMenuProps) {
  if (!visible) return null;

  const navigate = (route: string) => {
    onClose();
    router.push(route as never);
  };

  return (
    <View className="absolute inset-0 z-50 flex-row">
      <Pressable accessibilityLabel="Close menu" className="flex-1 bg-black/40" onPress={onClose} />
      <View className="h-full w-[82%] max-w-[340px] bg-white px-5 pb-8 pt-14 shadow-2xl">
        <View className="mb-8 flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-extrabold uppercase tracking-[2px] text-blue-700">STOCKASTICS</Text>
            <Text className="mt-1 text-xl font-extrabold text-slate-900">Menu</Text>
          </View>
          <Pressable accessibilityLabel="Close menu" onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-slate-100">
            <Ionicons name="close" size={22} color="#0f172a" />
          </Pressable>
        </View>

        {items.map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => navigate(item.route)}
            className="mb-2 flex-row items-center rounded-2xl px-4 py-4 active:bg-slate-100"
          >
            <View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Ionicons name={item.icon} size={22} color="#1E3A8A" />
            </View>
            <Text className="flex-1 text-base font-bold text-slate-800">{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </Pressable>
        ))}

        <View className="mt-auto rounded-2xl bg-slate-50 p-4">
          <Text className="text-xs font-bold text-slate-500">STOCKASTICS</Text>
          <Text className="mt-1 text-xs leading-5 text-slate-400">Market intelligence and independent BUY signals.</Text>
        </View>
      </View>
    </View>
  );
}
