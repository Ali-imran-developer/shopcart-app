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
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { useAuth } from "@/hooks/useAuth";
import { useSecureStorage } from "@/hooks/useSecureStorage";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  city: Yup.string().required("City is required"),
});

export default function Profile() {
  const { handleUpdateUser } = useAuth();
  const { getValue, setValue } = useSecureStorage();
  const [modalVisible, setModalVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      city: "",
    },
    validationSchema: ProfileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const user = await getValue("user");
        const response = await handleUpdateUser(user?._id, values);
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
          city: user.city || "",
        });
      }
    };
    fetchUser();
  }, []);

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

      {/* Display user info */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.logoContainer}>
          <Image source={require("@/assets/images/profile.jpg")} style={styles.logo} />
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
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>{formik.values.city}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Profile</Text>

            {/* ✅ using formik directly */}
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
              value={formik.values.city}
              onChangeText={formik.handleChange("city")}
              onBlur={formik.handleBlur("city")}
            />
            {formik.touched.city && formik.errors.city && (
              <Text style={styles.error}>{formik.errors.city}</Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={formik.handleSubmit as any}
              >
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>Save</Text>
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
});
