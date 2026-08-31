import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';

/**
 * All screens opened from More use an explicit More destination instead of
 * relying on router.back(). This prevents tab history from sending users to
 * an unrelated tab such as Signals.
 */
export default function MoreBackButton() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to More"
      onPress={() => router.replace('/(main)/more')}
      className="h-10 w-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100"
      hitSlop={8}
    >
      <Ionicons name="arrow-back" size={22} color="#0F172A" />
    </Pressable>
  );
}
