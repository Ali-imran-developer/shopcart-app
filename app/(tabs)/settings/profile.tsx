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
import { Ionicons } from "@expo/vector-icons";
import { ProfileSchema } from "@/validators/profile-schema";
import pickImage from "@/hooks/use-image-picker";
import profileStyles from "@/styles/settings/profile";

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
  }, [])

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.header}>
        <Text style={profileStyles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={profileStyles.updateButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={profileStyles.updateButtonText}> Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={profileStyles.avatarWrapper}>
          <Image source={formik.values.image ? { uri: formik.values.image } : undefined} style={profileStyles.avatar} />
        </View>

        <View style={profileStyles.card}>
          <Text style={profileStyles.cardLabel}>Name</Text>
          <Text style={profileStyles.cardValue}>{formik.values.name}</Text>
        </View>
        <View style={profileStyles.card}>
          <Text style={profileStyles.cardLabel}>Email</Text>
          <Text style={profileStyles.cardValue}>{formik.values.email}</Text>
        </View>
        <View style={profileStyles.card}>
          <Text style={profileStyles.cardLabel}>Phone</Text>
          <Text style={profileStyles.cardValue}>{formik.values.phoneNumber}</Text>
        </View>
        <View style={profileStyles.card}>
          <Text style={profileStyles.cardLabel}>Address</Text>
          <Text style={profileStyles.cardValue}>{formik.values.address}</Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <View style={profileStyles.modalOverlay}>
          <View style={profileStyles.modalContainer}>
            <Text style={profileStyles.modalTitle}>Update Profile</Text>

            <TouchableOpacity style={profileStyles.uploadBox} onPress={() => pickImage(formik.setFieldValue)}>
              {formik?.values?.image ? (
                <View style={profileStyles.imagePreviewRow}>
                  <Image source={{ uri: formik?.values?.image }} style={profileStyles.imagePreview} />
                  <TouchableOpacity onPress={() => formik?.setFieldValue("image", "")} style={profileStyles.removeBtn}>
                    <Text style={{ color: "red" }}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={profileStyles.uploadText}>Tap to select an image</Text>
              )}
            </TouchableOpacity>
            {formik?.errors?.image && formik?.touched?.image && (
              <Text style={profileStyles.error}>{formik?.errors.image}</Text>
            )}

            {["name", "email", "phoneNumber", "address"].map((field, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <Text style={profileStyles.inputLabel}>{field === "phoneNumber" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
                <TextInput
                  style={profileStyles.input}
                  placeholder={`Enter ${field}`}
                  value={formik.values[field as keyof typeof formik.values]}
                  onChangeText={formik.handleChange(field)}
                  onBlur={formik.handleBlur(field)}
                />
                {formik.touched[field as keyof typeof formik.values] &&
                  formik.errors[field as keyof typeof formik.values] && (
                    <Text style={profileStyles.error}>{formik.errors[field as keyof typeof formik.values]}</Text>
                  )}
              </View>
            ))}

            <View style={profileStyles.modalButtons}>
              <TouchableOpacity style={[profileStyles.modalBtn, profileStyles.cancelBtn]} onPress={() => setModalVisible(false)}>
                <Text style={profileStyles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[profileStyles.modalBtn, profileStyles.saveBtn]} onPress={formik.handleSubmit as any} disabled={loading}>
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={profileStyles.modalBtnTextWhite}>Save</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
