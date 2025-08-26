import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";

export default function Settings() {
  const [couriers, setCouriers] = useState([
    { id: 1, name: "Leopard", image: require("@/assets/images/leopards-logo.png"), enabled: true },
    { id: 2, name: "Trax", image: require("@/assets/images/trax-logo.png"), enabled: false },
    { id: 3, name: "PostEx", image: require("@/assets/images/postex-logo.png"), enabled: false },
    { id: 4, name: "TCS", image: require("@/assets/images/tcs-logo.png"), enabled: true },
  ]);

  const [shipperInfos, setShipperInfos] = useState([
    {
      id: 1,
      store: "Main Store",
      location: "Karachi",
      address: "Street 123, Block A",
      returnAddress: "Return St. 45",
      city: "Karachi",
      phoneNumber: "+92 300 1234567",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newShipper, setNewShipper] = useState({
    store: "",
    location: "",
    address: "",
    returnAddress: "",
    city: "",
    phoneNumber: "",
  });

  const toggleCourier = (id: number) => {
    setCouriers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const addShipperInfo = () => {
    if (
      newShipper.store &&
      newShipper.location &&
      newShipper.address &&
      newShipper.returnAddress &&
      newShipper.city &&
      newShipper.phoneNumber
    ) {
      setShipperInfos((prev) => [
        ...prev,
        { id: Date.now(), ...newShipper },
      ]);
      setNewShipper({
        store: "",
        location: "",
        address: "",
        returnAddress: "",
        city: "",
        phoneNumber: "",
      });
      setModalVisible(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {/* Manage Couriers */}
      <Text style={styles.sectionTitle}>Manage Couriers</Text>
      <View style={styles.grid}>
        {couriers.map((courier) => (
          <View key={courier.id} style={styles.courierCard}>
            <Image
              source={courier.image}
              style={styles.courierImage}
            />
            <Text style={styles.courierName}>{courier.name}</Text>
            <Switch
              value={courier.enabled}
              onValueChange={() => toggleCourier(courier.id)}
            />
          </View>
        ))}
      </View>

      {/* Shipper Info */}
      <View style={{ marginTop: 30 }}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Shipper Info</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addBtnText}>+ Add Shipper Info</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shipperGrid}>
          {shipperInfos.map((info) => (
            <View key={info.id} style={styles.shipperCard}>
              <Text style={styles.shipperLabel}>Store</Text>
              <Text style={styles.shipperValue}>{info.store}</Text>

              <Text style={styles.shipperLabel}>Location</Text>
              <Text style={styles.shipperValue}>{info.location}</Text>

              <Text style={styles.shipperLabel}>Address</Text>
              <Text style={styles.shipperValue}>{info.address}</Text>

              <Text style={styles.shipperLabel}>Return Address</Text>
              <Text style={styles.shipperValue}>{info.returnAddress}</Text>

              <Text style={styles.shipperLabel}>City</Text>
              <Text style={styles.shipperValue}>{info.city}</Text>

              <Text style={styles.shipperLabel}>Phone</Text>
              <Text style={styles.shipperValue}>{info.phoneNumber}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Modal for Adding Shipper Info */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Shipper Info</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={styles.input}
                placeholder="Store"
                value={newShipper.store}
                onChangeText={(text) => setNewShipper({ ...newShipper, store: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={newShipper.location}
                onChangeText={(text) => setNewShipper({ ...newShipper, location: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={newShipper.address}
                onChangeText={(text) => setNewShipper({ ...newShipper, address: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Return Address"
                value={newShipper.returnAddress}
                onChangeText={(text) =>
                  setNewShipper({ ...newShipper, returnAddress: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={newShipper.city}
                onChangeText={(text) => setNewShipper({ ...newShipper, city: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={newShipper.phoneNumber}
                onChangeText={(text) =>
                  setNewShipper({ ...newShipper, phoneNumber: text })
                }
              />
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={addShipperInfo}
              >
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10, color: "#111827" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  courierCard: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 14,
  },
  courierImage: { width: 100, height: 60, marginBottom: 10, objectFit: "contain" },
  courierName: { fontSize: 15, fontWeight: "600", marginBottom: 6 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  addBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },
  shipperGrid: {},
  shipperCard: {
    backgroundColor: "#f9fafb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
  },
  shipperLabel: { fontSize: 12, color: "#6b7280" },
  shipperValue: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  modalBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancelBtn: { backgroundColor: "#f3f4f6" },
  saveBtn: { backgroundColor: "#2563eb" },
  modalBtnText: { fontWeight: "600", color: "#111827" },
});
