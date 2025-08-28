import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useSecureStorage } from "@/hooks/useSecureStorage";

export default function RootLayout() {
  const { getValue } = useSecureStorage();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getValue("token");
      setToken(storedToken || null);
    };
    fetchToken();
  }, []);

  if (token === null) {
    return <View>Token Does not Exists!</View>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="dark" backgroundColor="#fff" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: "#fff" },
              headerTintColor: "#000",
              headerShown: false,
              headerTitleStyle: { fontWeight: "600" },
              contentStyle: { backgroundColor: "#fff" },
            }}
          >
            {token ? (
              <Stack.Screen name="(tabs)" />
            ) : (
              <Stack.Screen name="(auth)" />
            )}
          </Stack>
          <Toast />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 25,
  },
});
