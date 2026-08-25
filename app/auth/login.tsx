import { Link } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to STOCKASTICS</Text>
      <Text style={styles.subtitle}>Sign in to access your stock signals.</Text>

      <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/auth/register" style={styles.link}>Create an account</Link>
      <Link href="/auth/forgot-password" style={styles.link}>Forgot password?</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#FFFFFF' },
  title: { fontSize: 28, fontWeight: '800', color: '#123B75' },
  subtitle: { marginTop: 8, marginBottom: 28, color: '#64748B' },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14 },
  button: { backgroundColor: '#1266F1', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 6 },
  buttonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  link: { textAlign: 'center', marginTop: 18, color: '#1266F1', fontWeight: '600' },
});
