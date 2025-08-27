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
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useSecureStorage } from "@/hooks/useSecureStorage";
import { launchImageLibrary } from "react-native-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

export default function Profile() {
  const { handleUpdateUser, loading } = useAuth();
  const { getValue, setValue } = useSecureStorage();
  const [modalVisible, setModalVisible] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      image: "",
    },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const user = await getValue("user");
        // const payload = { ...values, image: base64Image };
        console.log("Submitting values:", values);
        const response = await handleUpdateUser(values);
        console.log("Update Response:", response);
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

  const pickImage = async () => {
    const options = {
      mediaType: "photo" as const,
      includeBase64: true,
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.7,
    };

    launchImageLibrary(options as any, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        Toast.show({ type: "error", text1: response.errorMessage });
      } else if (response.assets && response.assets.length > 0) {
        const picked = response.assets[0];
        formik.setFieldValue("image", picked.uri);
        // setBase64Image(picked.base64 || null);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.logoContainer}>
          <Image source={{uri: formik.values.image}} style={styles.logo} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{formik.values.name}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{formik.values.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{formik.values.phoneNumber}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{formik.values.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Profile</Text>
            <View style={styles.imagePickerWrapper}>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={styles.imagePicker}
              >
                {formik.values.image ? (
                  <View>
                    <Image
                      source={{ uri: formik.values.image }}
                      style={styles.imagePreview}
                    />
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>Update</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.emptyCircle}>
                    <Ionicons name="cloud-upload-outline" size={28} color="#6b7280" />
                    <Text style={styles.browseText}>Browse</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.downloadBtn}>
                <Ionicons name="download-outline" size={28} color="#2563eb" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.error}>{formik.errors.name}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.error}>{formik.errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange("phoneNumber")}
              onBlur={formik.handleBlur("phoneNumber")}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="City"
              value={formik.values.address}
              onChangeText={formik.handleChange("address")}
              onBlur={formik.handleBlur("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <Text style={styles.error}>{formik.errors.address}</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={formik.handleSubmit as any} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[styles.modalBtnText, { color: "#fff" }]}>Update Profile</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  updateButton: { backgroundColor: "#2563eb", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  updateButtonText: { color: "#fff", fontWeight: "600" },
  logoContainer: { alignItems: "center", marginBottom: 20 },
  logo: { width: 120, height: 120, borderRadius: 100, backgroundColor: "#e5e7eb" },
  infoContainer: { marginTop: 10 },
  infoRow: { width: "100%", flexDirection: "column", gap: 16, justifyContent: "space-between", marginBottom: 16 },
  infoBox: { width: "100%", backgroundColor: "#f3f4f6", padding: 12, borderRadius: 10 },
  label: { fontSize: 13, color: "#6b7280" },
  value: { fontSize: 15, fontWeight: "600", color: "#111827", marginTop: 4 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center", padding: 20 },
  modalContainer: { width: "100%", backgroundColor: "#fff", borderRadius: 12, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, padding: 10, marginBottom: 8 },
  error: { color: "red", fontSize: 12, marginBottom: 4 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  modalBtn: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, marginLeft: 10 },
  cancelBtn: { backgroundColor: "#f3f4f6" },
  saveBtn: { backgroundColor: "#2563eb" },
  modalBtnText: { fontWeight: "600", color: "#111827" },
  // imagePicker: { alignItems: "center", marginBottom: 12 },
  imagePickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 12,
  },
  // imagePickerWrapper: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 20,
  // },
  // imagePicker: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 60,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 16,
  // },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0, // initially hidden
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  browseText: {
    marginTop: 6,
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  downloadBtn: {
    padding: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 50,
  },

});
