import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { tabs } from "@/data/tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#555",
        headerShown: false,
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerTitleStyle: { fontWeight: "600" },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute", backgroundColor: "#fff" },
          default: { backgroundColor: "black" },
        }),
      }}
    >
      {tabs?.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ title: tab.title, 
        tabBarIcon: ({ color, size }) => (<Ionicons name={tab.icon as any} size={size} color={color} />)}} />
      ))}
    </Tabs>
  );
}
