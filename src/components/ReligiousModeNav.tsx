import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ReligiousMode = 'halal' | 'haram';
type Props = { mode: ReligiousMode };

const items = [
  { key: 'home', label: 'Home', icon: 'home-outline' as const },
  { key: 'signals', label: 'Signals', icon: 'pulse-outline' as const },
  { key: 'markets', label: 'Markets', icon: 'stats-chart-outline' as const },
  { key: 'news', label: 'News', icon: 'newspaper-outline' as const },
  { key: 'more', label: 'More', icon: 'menu-outline' as const },
];

export default function ReligiousModeNav({ mode }: Props) {
  const insets = useSafeAreaInsets();
  const tint = mode === 'halal' ? '#16A34A' : '#DC2626';

  const navigate = (key: string) => {
    if (key === 'home') return router.replace('/(main)/index');
    if (key === 'more') return router.replace('/(main)/more');
    router.replace({ pathname: `/(main)/${key}`, params: { religious: mode } });
  };

  return (
    <View style={{ paddingBottom: Math.max(insets.bottom, 8) }} className="border-t border-slate-200 bg-white shadow-sm">
      <View className="h-[76px] w-full flex-row items-stretch">
        {items.map((item) => (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => navigate(item.key)}
            style={({ pressed }) => ({
              width: '20%',
              flexGrow: 0,
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.65 : 1,
              borderLeftWidth: item.key === 'home' ? 0 : 1,
              borderLeftColor: '#EEF2F0',
            })}
          >
            <View style={{ backgroundColor: `${tint}14` }} className="h-10 w-12 items-center justify-center rounded-xl">
              <Ionicons name={item.icon} size={23} color={tint} />
            </View>
            <Text style={{ color: tint }} className="mt-1 text-[11px] font-bold">{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
