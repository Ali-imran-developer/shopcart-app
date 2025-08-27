import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image } from "react-native";

export default function CourierSettings() {
  const [couriers, setCouriers] = useState([
    { id: 1, name: "Leopard", image: require("@/assets/images/leopards-logo.png"), enabled: true },
    { id: 2, name: "Trax", image: require("@/assets/images/trax-logo.png"), enabled: false },
    { id: 3, name: "PostEx", image: require("@/assets/images/postex-logo.png"), enabled: false },
    { id: 4, name: "TCS", image: require("@/assets/images/tcs-logo.png"), enabled: true },
  ]);

  const toggleCourier = (id: number) => {
    setCouriers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Couriers</Text>
      <View style={styles.grid}>
        {couriers.map((courier) => (
          <View key={courier.id} style={styles.card}>
            <Image source={courier.image} style={styles.logo} />
            <Text style={styles.name}>{courier.name}</Text>
            <Switch
              value={courier.enabled}
              onValueChange={() => toggleCourier(courier.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
  },
  logo: { width: 100, height: 60, marginBottom: 10, resizeMode: "contain" },
  name: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
});
