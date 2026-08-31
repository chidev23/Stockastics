import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type SignalKey = 'retail' | 'ipo' | 'buyback' | 'sentiment' | 'ex-dividend' | 'income';
type Props = { selected?: SignalKey; religious?: 'halal' | 'haram' };

const items: Array<{ key: SignalKey; label: string; route: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = [
  { key: 'retail', label: 'Retail', route: '/retail-signals', icon: 'trending-up-outline', color: '#16A34A' },
  { key: 'ipo', label: 'IPO', route: '/ipo-signals', icon: 'rocket-outline', color: '#2563EB' },
  { key: 'buyback', label: 'Buyback', route: '/buyback-signals', icon: 'repeat-outline', color: '#0F766E' },
  { key: 'sentiment', label: 'Sentiment', route: '/sentiment-signals', icon: 'people-outline', color: '#7C3AED' },
  { key: 'ex-dividend', label: 'Ex-Div', route: '/ex-dividend-signals', icon: 'cash-outline', color: '#D97706' },
  { key: 'income', label: 'Income', route: '/income-signals', icon: 'wallet-outline', color: '#0891B2' },
];

export default function SignalCategoryNav({ selected, religious }: Props) {
  const open = (item: (typeof items)[number]) => {
    if (religious) {
      router.push({ pathname: '/religious-signals', params: { religious, category: item.key } } as never);
      return;
    }
    router.push(item.route as never);
  };

  return (
    <View className="mx-5 mt-5 flex-row flex-wrap justify-between">
      {items.map((item) => {
        const active = selected === item.key;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={`${item.label} signals`}
            onPress={() => open(item)}
            style={({ pressed }) => ({
              width: '31.5%',
              height: 62,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
              borderRadius: 16,
              backgroundColor: active ? item.color : '#FFFFFF',
              borderWidth: active ? 0 : 1,
              borderColor: '#E2E8F0',
              opacity: pressed ? 0.72 : 1,
            })}
          >
            <Ionicons name={item.icon} size={19} color={active ? '#FFFFFF' : item.color} />
            <Text numberOfLines={1} allowFontScaling={false} style={{ marginTop: 4, fontSize: 11, lineHeight: 14, fontWeight: '800', color: active ? '#FFFFFF' : '#334155', textAlign: 'center' }}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
