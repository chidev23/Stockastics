import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable } from 'react-native';

/**
 * Screens opened from More always return to More. In a religious-mode
 * session, the More page itself retains the Halal/Haram context so the next
 * back action can return to the correct religious home page.
 */
export default function MoreBackButton() {
  const params = useLocalSearchParams<{ religious?: string }>();
  const religious = params.religious === 'halal' || params.religious === 'haram' ? params.religious : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to More"
      onPress={() => {
        if (religious) {
          router.replace({ pathname: '/(main)/more', params: { religious } });
          return;
        }
        router.replace('/(main)/more');
      }}
      className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100"
      hitSlop={8}
    >
      <Ionicons name="arrow-back" size={22} color="#0F172A" />
    </Pressable>
  );
}
