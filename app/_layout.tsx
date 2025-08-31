import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAsyncStorage } from '@/hooks/useSecureStorage';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const { getValue } = useAsyncStorage<string>();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await getValue("token");
      setToken(storedToken);
      setLoading(false);
    };

    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="dark" translucent />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#fff" },
              headerTintColor: "#000",
              headerShown: false,
              headerTitleStyle: { fontWeight: "600" },
              contentStyle: { backgroundColor: "#fff" },
            }}
          >
            {!token || token === null ? (
              <Stack.Screen name="(auth)" />
            ) : (
              <Stack.Screen name="(tabs)" />
            )}
          </Stack>
          <Toast />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", marginTop: 25 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
