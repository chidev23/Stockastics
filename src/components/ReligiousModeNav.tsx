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
    // Push keeps the religious home page in the native navigation history.
    // Therefore Android/system back from Signals, Markets, News or More can
    // return to the correct Halal/Haram home instead of the general Home tab.
    if (key === 'home') return router.push(`/(main)/${mode}` as never);
    router.push({ pathname: `/(main)/${key}`, params: { religious: mode } } as never);
  };

  return (
    <View style={{ paddingBottom: Math.max(insets.bottom, 8) }} className="border-t border-slate-200 bg-white shadow-sm">
      <View className="h-[82px] w-full flex-row items-stretch">
        {items.map((item, index) => <Pressable key={item.key} accessibilityRole="button" accessibilityLabel={item.label} onPress={() => navigate(item.key)} style={({ pressed }) => ({ flex: 1, flexBasis: 0, minWidth: 0, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 7, paddingBottom: 5, paddingHorizontal: 0, opacity: pressed ? 0.65 : 1, borderLeftWidth: index === 0 ? 0 : 1, borderLeftColor: '#EEF2F0' })}>
          <View style={{ backgroundColor: `${tint}14` }} className="h-11 w-12 items-center justify-center rounded-xl"><Ionicons name={item.icon} size={24} color={tint} /></View>
          <Text numberOfLines={1} allowFontScaling={false} style={{ marginTop: 4, fontSize: 12, lineHeight: 16, fontWeight: '700', color: tint, textAlign: 'center' }}>{item.label}</Text>
        </Pressable>)}
      </View>
    </View>
  );
}
