import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export async function logout() {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    router.push("/(auth)/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
