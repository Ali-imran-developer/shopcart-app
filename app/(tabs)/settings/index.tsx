import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { logout } from "@/utils/auth";

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
    // {
    //   key: "change-password",
    //   title: "Change Password",
    //   subtitle: "Update your account password",
    //   icon: "key-outline",
    //   onPress: () => router.push("/settings/change-password"),
    // },
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Settings</Text>
      </View>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.row, item.danger && styles.dangerRow]}
          onPress={item.onPress}
        >
          <Ionicons
            name={item.icon as any}
            size={22}
            color={item.danger ? "#ef4444" : "#111827"}
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.title, item.danger && styles.dangerText]}>
              {item.title}
            </Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  dangerRow: {
    backgroundColor: "#fef2f2",
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  dangerText: {
    color: "#ef4444",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
});
