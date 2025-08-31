import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  Image,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "@/hooks/useProducts";
import * as ImagePicker from "expo-image-picker";
import { CreateProductSchema } from "@/validators/products-schema";
import { categories, subCategories } from "@/data/categories";

export default function CreateProductScreen() {
  const navigation = useNavigation();
  const { handleAddProduct, isLoading } = useProducts();

  const initialValues = {
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    subCategory: "",
    stock: 0,
    status: "active",
    available: 0,
  };

  const handleSubmit = async (values: any) => {
    try {
      await handleAddProduct(values);
    } catch (error: { message?: string } | any) {
      console.log("Error submitting form:", error);
    }
  };

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Product</Text>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={CreateProductSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={styles.form}>
            {/* Name */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

            <Text style={styles.label}>Category</Text>
            <View style={styles.category}>
              <Picker
                selectedValue={values.category}
                onValueChange={(val) => {
                  setFieldValue("category", val);
                  setFieldValue("subCategory", "");
                }}
              >
                <Picker.Item label="Select Category" value="" />
                {categories?.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
            {errors.category && touched.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            <Text style={styles.label}>SubCategory</Text>
            <View style={styles.category}>
              <Picker
                selectedValue={values.subCategory}
                enabled={!!values.category}
                onValueChange={(val) => setFieldValue("subCategory", val)}
              >
                <Picker.Item label="Select SubCategory" value="" />
                {values.category &&
                  subCategories[values?.category]?.map((sub: any) => (
                    <Picker.Item key={sub} label={sub} value={sub} />
                  ))}
              </Picker>
            </View>
            {errors.subCategory && touched.subCategory && (
              <Text style={styles.error}>{errors.subCategory}</Text>
            )}

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              placeholder="Description"
              multiline
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />

            {/* Price */}
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={String(values.price)}
            />
            {errors.price && touched.price && (
              <Text style={styles.error}>{errors.price}</Text>
            )}

            {/* Stock */}
            <Text style={styles.label}>Stock</Text>
            <TextInput
              style={styles.input}
              placeholder="Stock"
              keyboardType="numeric"
              onChangeText={handleChange("stock")}
              onBlur={handleBlur("stock")}
              value={String(values.stock)}
            />
            {errors.stock && touched.stock && (
              <Text style={styles.error}>{errors.stock}</Text>
            )}

            <View style={styles.switchRow}>
              <Text style={styles.status}>
                Status: {values.status === "active" ? "Active" : "Inactive"}
              </Text>
              <Switch
                value={values.status === "active"}
                onValueChange={(val) => {
                  setFieldValue("status", val ? "active" : "inactive");
                }}
              />
            </View>

            <Text style={styles.label}>Upload Image</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setFieldValue)}>
              {values.image ? (
                <View style={styles.imagePreviewRow}>
                  <Image source={{ uri: values.image }} style={styles.imagePreview} />
                  <TouchableOpacity onPress={() => setFieldValue("image", "")} style={styles.removeBtn}>
                    <Text style={{ color: "red" }}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.uploadText}>Tap to select an image</Text>
              )}
            </TouchableOpacity>
            {errors.image && touched.image && (
              <Text style={styles.error}>{errors.image}</Text>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitButton, styles.submit]}
                onPress={handleSubmit as any}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Create Product</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f9fafb", 
    padding: 20 
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1f2937",
    textAlign: "center",
  },
  form: { gap: 20 },
  label: { 
    fontWeight: "600", 
    fontSize: 15, 
    // marginBottom: 6,
    color: "#374151" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  textarea: { 
    height: 100, 
    textAlignVertical: "top" 
  },
  error: { 
    fontSize: 13, 
    color: "#dc2626", 
    marginTop: -10,
  },
  category: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  status: { 
    fontWeight: "600", 
    fontSize: 16, 
    color: "#374151" 
  },
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
  },
  uploadText: { 
    color: "#6b7280", 
    fontSize: 14, 
    fontWeight: "500" 
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
    gap: 14,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    flex: 1.2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cancel: { backgroundColor: "#6b7280" },
  submit: { backgroundColor: "#2563eb" },
  btnText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 15 
  },
});

