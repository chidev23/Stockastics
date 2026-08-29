import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hasTestSession } from '../src/session';

export default function SplashScreen() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.82)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;

    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 450, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 55, useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(250),
        Animated.timing(textOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();

    const checkSession = async () => {
      const authenticated = await hasTestSession();
      await new Promise((resolve) => setTimeout(resolve, 1100));
      if (!mounted) return;
      router.replace(authenticated ? '/(main)/' : '/auth/login');
    };

    checkSession();
    return () => { mounted = false; };
  }, [opacity, scale, textOpacity]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
        <Animated.View style={{ opacity, transform: [{ scale }], alignItems: 'center' }}>
          <View style={{ width: 150, height: 150, borderRadius: 32, overflow: 'hidden', backgroundColor: '#000000' }}>
            <Image
              source={require('../assets/icon.jpg')}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Animated.View style={{ opacity: textOpacity, alignItems: 'center' }}>
            <Text style={{ marginTop: 22, color: '#FFF7DF', fontSize: 42, fontWeight: '700', letterSpacing: 1 }}>
              Stockastics
            </Text>
            <Text style={{ marginTop: 8, color: '#D1D5DB', fontSize: 14 }}>
              Intelligent stock market signals
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
