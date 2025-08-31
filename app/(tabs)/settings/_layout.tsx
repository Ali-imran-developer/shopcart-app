import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="shipper" />
      {/* <Stack.Screen name="change-password" /> */}
      <Stack.Screen name="about-app" />
      <Stack.Screen name="help-center" />
      <Stack.Screen name="privacy-policy" />
      <Stack.Screen name="terms-conditions" />
    </Stack>
  );
}
