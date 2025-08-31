import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { logout } from "@/utils/auth";
import settingStyles from "@/styles/settings";

export default function SettingsIndex() {

  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  const menuItems = [
    {
      key: "profile",
      title: "Profile",
      subtitle: "View your Profile",
      icon: "cube-outline",
      onPress: () => router.push("/settings/profile"),
    },
    {
      key: "shipper",
      title: "Shipper Info",
      subtitle: "Your shipper information",
      icon: "people-outline",
      onPress: () => router.push("/settings/shipper"),
    },
    {
      key: "about-app",
      title: "About the App",
      subtitle: "App details & version info",
      icon: "information-circle-outline",
      onPress: () => router.push("/settings/about-app"),
    },
    {
      key: "help-center",
      title: "Help Center / FAQ",
      subtitle: "Get help & find answers",
      icon: "help-circle-outline",
      onPress: () => router.push("/settings/help-center"),
    },
    {
      key: "privacy-policy",
      title: "Privacy Policy",
      subtitle: "Read our privacy practices",
      icon: "shield-checkmark-outline",
      onPress: () => router.push("/settings/privacy-policy"),
    },
    {
      key: "terms-conditions",
      title: "Terms & Conditions",
      subtitle: "Review our terms of service",
      icon: "document-text-outline",
      onPress: () => router.push("/settings/terms-conditions"),
    },
    {
      key: "logout",
      title: "Logout",
      subtitle: "Logout from app",
      icon: "log-out-outline",
      onPress: handleLogout,
      danger: true,
    },
  ];

  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.header}>
        <Text style={settingStyles.heading}>Settings</Text>
      </View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[settingStyles.row, item.danger && settingStyles.dangerRow]}
          onPress={item.onPress}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color={item.danger ? "#ef4444" : "#111827"}
            style={settingStyles.icon}
          />
          <View style={settingStyles.textContainer}>
            <Text style={[settingStyles.title, item.danger && settingStyles.dangerText]}>
              {item.title}
            </Text>
            <Text style={settingStyles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
