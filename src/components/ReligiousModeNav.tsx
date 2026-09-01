import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';
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
  const { width: screenWidth } = useWindowDimensions();
  const tint = mode === 'halal' ? '#16A34A' : '#DC2626';
  const itemWidth = screenWidth / items.length;

  const navigate = (key: string) => {
    // Keep the religious-mode journey in the native/web history so Back returns
    // to the correct Halal/Haram home instead of falling through to general Home.
    if (key === 'home') return router.push(`/(main)/${mode}` as never);
    router.push({ pathname: `/(main)/${key}`, params: { religious: mode } } as never);
  };

  return (
    <View
      style={{
        width: screenWidth,
        alignSelf: 'center',
        paddingBottom: Math.max(insets.bottom, 8),
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#DDE5E1',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 10,
      }}
    >
      <View
        style={{
          width: screenWidth,
          height: 82,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        {items.map((item, index) => (
          <Pressable
            key={item.key}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => navigate(item.key)}
            style={({ pressed }) => ({
              width: itemWidth,
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: itemWidth,
              minWidth: itemWidth,
              maxWidth: itemWidth,
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
                width: itemWidth - 8,
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
