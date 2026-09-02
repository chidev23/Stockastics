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

/**
 * Religious home navigation intentionally mirrors the exact layout strategy
 * used by the General Home tab bar: full-width container, five equal flex
 * columns, zero fixed item widths, and the same icon/label spacing.
 */
export default function ReligiousModeNav({ mode }: Props) {
  const insets = useSafeAreaInsets();
  const tint = mode === 'halal' ? '#16A34A' : '#DC2626';
  const bottomInset = Math.max(insets.bottom, 8);

  const navigate = (key: string) => {
    if (key === 'home') {
      router.push(`/(main)/${mode}` as never);
      return;
    }
    router.push({ pathname: `/(main)/${key}`, params: { religious: mode } } as never);
  };

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDE5E1',
        paddingBottom: bottomInset,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 10,
      }}
    >
      <View
        style={{
          width: '100%',
          height: 82,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-around',
        }}
      >
        {items.map((item, index) => (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            onPress={() => navigate(item.key)}
            style={({ pressed }) => ({
              flex: 1,
              flexGrow: 1,
              flexBasis: 0,
              minWidth: 0,
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 7,
              paddingBottom: 5,
              paddingHorizontal: 2,
              opacity: pressed ? 0.65 : 1,
              borderLeftWidth: index === 0 ? 0 : 1,
              borderLeftColor: '#EEF2F0',
            })}
          >
            <View
              style={{
                width: 48,
                height: 42,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 13,
                backgroundColor: `${tint}18`,
              }}
            >
              <Ionicons name={item.icon} size={25} color={tint} />
            </View>
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={{
                marginTop: 4,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: '700',
                color: tint,
                textAlign: 'center',
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
