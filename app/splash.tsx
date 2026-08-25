import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/auth/login'), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>STOCKASTICS</Text>
      <Text style={styles.tagline}>Intelligent stock market signals</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  logo: { fontSize: 32, fontWeight: '800', letterSpacing: 1.5, color: '#1266F1' },
  tagline: { marginTop: 10, fontSize: 14, color: '#4B5563' },
});
