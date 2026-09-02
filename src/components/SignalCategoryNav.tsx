import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type SignalKey = 'retail' | 'ipo' | 'buyback' | 'sentiment' | 'ex-dividend' | 'income';
type Props = { selected?: SignalKey; religious?: 'halal' | 'haram' };

const items: Array<{ key: SignalKey; label: string; route: string; icon: keyof typeof Ionicons.glyphMap; color: string }> = [
  { key: 'retail', label: 'Retail', route: '/retail-signals', icon: 'trending-up-outline', color: '#16A34A' },
  { key: 'ipo', label: 'IPO', route: '/ipo-signals', icon: 'rocket-outline', color: '#2563EB' },
  { key: 'buyback', label: 'Buyback', route: '/buyback-signals', icon: 'repeat-outline', color: '#0F766E' },
  { key: 'sentiment', label: 'Sent.', route: '/sentiment-signals', icon: 'people-outline', color: '#7C3AED' },
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
    <View
      className="mx-5 mt-5 w-auto rounded-2xl border border-slate-200 bg-white"
      style={{ paddingHorizontal: 6, paddingVertical: 6 }}
    >
      <View
        className="w-full flex-row items-stretch"
        style={{ columnGap: 4 }}
      >
        {items.map((item) => {
          const active = selected === item.key;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`${item.label} signals`}
              onPress={() => open(item)}
              style={({ pressed }) => ({
                flex: 1,
                flexBasis: 0,
                minWidth: 0,
                height: 68,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 13,
                backgroundColor: active ? item.color : '#FFFFFF',
                borderWidth: active ? 0 : 1,
                borderColor: '#EEF2F0',
                opacity: pressed ? 0.72 : 1,
                paddingHorizontal: 2,
              })}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9,
                  backgroundColor: active ? 'rgba(255,255,255,0.16)' : `${item.color}12`,
                }}
              >
                <Ionicons name={item.icon} size={18} color={active ? '#FFFFFF' : item.color} />
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
                style={{
                  marginTop: 4,
                  width: '100%',
                  fontSize: 9,
                  lineHeight: 12,
                  fontWeight: '800',
                  color: active ? '#FFFFFF' : '#334155',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
