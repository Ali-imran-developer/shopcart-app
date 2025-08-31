import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useAsyncStorage } from "@/hooks/useSecureStorage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { ProfileSchema } from "@/validators/profile-schema";

export default function Profile() {
  const { handleUpdateUser, loading } = useAuth();
  const { getValue, setValue } = useAsyncStorage();
  const [modalVisible, setModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", phoneNumber: "", address: "", image: "" },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const user = await getValue("user");
        const response = await handleUpdateUser(values);
        await setValue("user", { ...user, ...values });
        setModalVisible(false);
        Toast.show({ type: "success", text1: response.message });
      } catch (error: any) {
        Toast.show({ type: "error", text1: error.message });
      }
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getValue("user");
      if (user) {
        formik.setValues({
          name: user.userName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          address: user.address || "",
          image: user.image || "",
        });
      }
    };
    fetchUser();
  }, []);

  const pickImage = async (setFieldValue: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const mimeType = asset.mimeType || "image/jpeg";
      const base64Img = `data:${mimeType};base64,${asset.base64}`;
      setFieldValue("image", base64Img);
    }
  };

  const isChanged = JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.updateButtonText}> Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.avatarWrapper}>
          <Image source={formik.values.image ? { uri: formik.values.image } : undefined} style={styles.avatar} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Name</Text>
          <Text style={styles.cardValue}>{formik.values.name}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{formik.values.email}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Phone</Text>
          <Text style={styles.cardValue}>{formik.values.phoneNumber}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Address</Text>
          <Text style={styles.cardValue}>{formik.values.address}</Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Profile</Text>

            <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(formik.setFieldValue)}>
              {formik?.values?.image ? (
                <View style={styles.imagePreviewRow}>
                  <Image source={{ uri: formik?.values?.image }} style={styles.imagePreview} />
                  <TouchableOpacity onPress={() => formik?.setFieldValue("image", "")} style={styles.removeBtn}>
                    <Text style={{ color: "red" }}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.uploadText}>Tap to select an image</Text>
              )}
            </TouchableOpacity>
            {formik?.errors?.image && formik?.touched?.image && (
              <Text style={styles.error}>{formik?.errors.image}</Text>
            )}

            {["name", "email", "phoneNumber", "address"].map((field, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <Text style={styles.inputLabel}>{field === "phoneNumber" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${field}`}
                  value={formik.values[field as keyof typeof formik.values]}
                  onChangeText={formik.handleChange(field)}
                  onBlur={formik.handleBlur(field)}
                />
                {formik.touched[field as keyof typeof formik.values] &&
                  formik.errors[field as keyof typeof formik.values] && (
                    <Text style={styles.error}>{formik.errors[field as keyof typeof formik.values]}</Text>
                  )}
              </View>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalBtn, styles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={formik.handleSubmit as any} disabled={loading || !isChanged}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.modalBtnTextWhite}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#111827" },
  updateButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#2563eb", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  updateButtonText: { color: "#fff", fontWeight: "600", marginLeft: 4 },
  avatarWrapper: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#e5e7eb" },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardLabel: { fontSize: 13, color: "#6b7280" },
  cardValue: { fontSize: 16, fontWeight: "600", color: "#111827", marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContainer: { width: "100%", backgroundColor: "#fff", borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#111827" },
  imagePickerWrapper: { alignItems: "center", marginBottom: 20 },
  avatarEditWrapper: { position: "relative" },
  avatarEdit: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: "#e5e7eb" },
  editIconWrapper: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#2563eb", padding: 6, borderRadius: 20, borderWidth: 2, borderColor: "#fff" },
  inputLabel: { fontSize: 14, color: "#374151", marginBottom: 6, fontWeight: "500" },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 12, fontSize: 14, backgroundColor: "#f9fafb" },
  error: { color: "red", fontSize: 12, marginTop: 4 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, marginLeft: 10 },
  cancelBtn: { backgroundColor: "#f3f4f6" },
  saveBtn: { backgroundColor: "#2563eb" },
  modalBtnText: { fontWeight: "600", color: "#111827" },
  modalBtnTextWhite: { fontWeight: "600", color: "#fff" },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#9ca3af",
    borderRadius: 12,
    height: 150,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    marginBottom: 10,
  },
  imagePreviewRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  imagePreview: { 
    width: 80, 
    height: 80, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: "#e5e7eb" 
  },
  removeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ef4444",
    backgroundColor: "#fee2e2",
  },
  uploadText: { 
    color: "#6b7280", 
    fontSize: 14, 
    fontWeight: "500" 
  },
});
