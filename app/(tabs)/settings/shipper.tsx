import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useShipperData } from "@/hooks/useShipper";

const ShipperSchema = Yup.object().shape({
  storeName: Yup.string().required("Store is required"),
  locationName: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  returnAddress: Yup.string().required("Return Address is required"),
  city: Yup.string().required("City is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone Number must contain only numbers")
    .min(11, "Phone Number must be at least 11 digits")
    .max(13, "Phone Number cannot be more than 13 digits")
    .required("Phone Number is required"),
});

export default function ShipperSettings() {
  const { fetchShippers, isLoading, shippers, addShipper } = useShipperData();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShippers();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Shipper Info</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.addBtnText}>+ Add Shipper</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderWrapper}>
          <Loader text="Fetching Shippers..." />
        </View>
      ) : ensureArray(shippers?.shipper)?.length === 0 ? (
        <Text style={styles.emptyText}>No shipper info added</Text>
      ) : (
        ensureArray(shippers?.shipper)?.map((info: any) => (
          <View key={info?._id ?? ""} style={styles.card}>
            <Text style={styles.label}>Store :</Text>
            <Text style={styles.value}>{info?.storeName ?? ""}</Text>
            <Text style={styles.label}>Location :</Text>
            <Text style={styles.value}>{info?.locationName ?? ""}</Text>
            <Text style={styles.label}>City :</Text>
            <Text style={styles.value}>{info?.city ?? ""}</Text>
            <Text style={styles.label}>Phone :</Text>
            <Text style={styles.value}>{info?.phoneNumber ?? ""}</Text>
            <Text style={styles.label}>Address :</Text>
            <Text style={styles.value}>{info?.address ?? ""}</Text>
            <Text style={styles.label}>Return Address :</Text>
            <Text style={styles.value}>{info?.returnAddress ?? ""}</Text>
          </View>
        ))
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add Shipper Info</Text>
            <Formik
              initialValues={{
                storeName: "",
                phoneNumber: "",
                locationName: "",
                city: "",
                returnAddress: "",
                address: "",
              }}
              validationSchema={ShipperSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  setLoading(true);
                  await addShipper(values);
                  resetForm();
                  setModalVisible(false);
                  fetchShippers();
                } catch (error) {
                  console.error("Error saving shipper:", error);
                } finally{
                  setLoading(false);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView>
                  {Object.keys(values).map((field) => (
                    <View key={field} style={{ marginBottom: 10 }}>
                      <TextInput
                        style={[ styles.input, touched[field as keyof typeof values] && errors[field as keyof typeof errors] ? { borderColor: "#ef4444" } : {} ]}
                        placeholder={field}
                        onChangeText={handleChange(field)}
                        onBlur={handleBlur(field)}
                        value={values[field as keyof typeof values]}
                      />
                      {touched[field as keyof typeof values] && errors[field as keyof typeof errors] && (
                        <Text style={styles.errorText}>{errors[field as keyof typeof errors]}</Text>
                      )}
                    </View>
                  ))}

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[styles.btn, styles.cancel]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btn, styles.save]}
                      onPress={() => handleSubmit()}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={{ color: "#fff" }}>Submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 14 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  addBtn: { backgroundColor: "#2563eb", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  addBtnText: { color: "#fff", fontWeight: "600" },
  card: { backgroundColor: "#f9fafb", padding: 12, borderRadius: 8, marginBottom: 10 },
  label: { fontSize: 12, color: "#6b7280" },
  value: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  emptyText: { textAlign: "center", color: "#6b7280", marginTop: 20 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalBox: { backgroundColor: "#fff", padding: 20, borderRadius: 12, width: "90%", maxHeight: "90%" },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 6, padding: 10, marginBottom: 4 },
  errorText: { fontSize: 12, color: "#ef4444", marginTop: 2 },
  loaderWrapper: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 50 },
  actions: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
  btn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, marginHorizontal: 6, minWidth: 90, alignItems: "center" },
  cancel: { backgroundColor: "#f3f4f6" },
  save: { backgroundColor: "#2563eb" },
});
