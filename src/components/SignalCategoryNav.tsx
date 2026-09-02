import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

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
  const { width: screenWidth } = useWindowDimensions();

  const open = (item: (typeof items)[number]) => {
    if (religious) {
      router.push({ pathname: '/religious-signals', params: { religious, category: item.key } } as never);
      return;
    }
    router.push(item.route as never);
  };

  // Use an explicit full-width layout instead of content-sized flex children.
  // This prevents the six categories from clustering on the left while leaving
  // unused space on the right. No horizontal scrolling is used.
  const horizontalMargin = 20;
  const outerWidth = Math.max(0, screenWidth - horizontalMargin * 2);
  const horizontalPadding = 6;
  const gap = 3;
  const innerWidth = Math.max(0, outerWidth - horizontalPadding * 2);
  const itemWidth = Math.max(0, (innerWidth - gap * (items.length - 1)) / items.length);

  return (
    <View
      style={{
        width: outerWidth,
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: horizontalPadding,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          columnGap: gap,
        }}
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
                width: itemWidth,
                height: 68,
                flexGrow: 0,
                flexShrink: 0,
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
