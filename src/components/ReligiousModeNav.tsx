import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ReligiousMode = 'halal' | 'haram';
type Props = { mode: ReligiousMode };

const items = [
  { key: 'home', label: 'Home', icon: 'home-outline' as const, color: '#16A34A' },
  { key: 'signals', label: 'Signals', icon: 'pulse-outline' as const, color: '#2563EB' },
  { key: 'markets', label: 'Markets', icon: 'stats-chart-outline' as const, color: '#0F766E' },
  { key: 'news', label: 'News', icon: 'newspaper-outline' as const, color: '#7C3AED' },
  { key: 'more', label: 'More', icon: 'menu-outline' as const, color: '#475569' },
];

/** Religious home navigation uses the same full-width five-column layout as the General Home tab bar. */
export default function ReligiousModeNav({ mode }: Props) {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, 8);

  const navigate = (key: string) => {
    if (key === 'home') {
      router.replace(`/(main)/${mode}` as never);
      return;
    }
    router.push({ pathname: `/(main)/${key}`, params: { religious: mode } } as never);
  };

  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'stretch',
        flexShrink: 0,
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
          alignSelf: 'stretch',
          height: 82,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-around',
          paddingHorizontal: 0,
        }}
      >
        {items.map((item, index) => {
          const focused = item.key === 'home';
          const color = focused ? item.color : `${item.color}B3`;
          return (
            <Pressable
              key={item.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={item.label}
              onPress={() => navigate(item.key)}
              style={({ pressed }) => ({
                flex: 1,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0,
                width: '20%',
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
                  backgroundColor: focused ? `${item.color}18` : 'transparent',
                }}
              >
                <Ionicons name={item.icon} size={25} color={color} />
              </View>
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  lineHeight: 16,
                  fontWeight: focused ? '800' : '600',
                  color,
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
