import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Image,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "@/hooks/useProducts";
import { CreateProductSchema } from "@/validators/products-schema";
import { categories, subCategories } from "@/data/categories";
import pickImage from "@/hooks/use-image-picker";
import createProductStyles from "@/styles/products/create-products";

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

  return (
    <ScrollView style={createProductStyles.container}>
      <Text style={createProductStyles.title}>Create Product</Text>

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
          <View style={createProductStyles.form}>
            {/* Name */}
            <Text style={createProductStyles.label}>Title</Text>
            <TextInput
              style={createProductStyles.input}
              placeholder="Product Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && touched.name && (
              <Text style={createProductStyles.error}>{errors.name}</Text>
            )}

            <Text style={createProductStyles.label}>Category</Text>
            <View style={createProductStyles.category}>
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
              <Text style={createProductStyles.error}>{errors.category}</Text>
            )}

            <Text style={createProductStyles.label}>SubCategory</Text>
            <View style={createProductStyles.category}>
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
              <Text style={createProductStyles.error}>{errors.subCategory}</Text>
            )}

            {/* Description */}
            <Text style={createProductStyles.label}>Description</Text>
            <TextInput
              style={[createProductStyles.input, createProductStyles.textarea]}
              placeholder="Description"
              multiline
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />

            {/* Price */}
            <Text style={createProductStyles.label}>Price</Text>
            <TextInput
              style={createProductStyles.input}
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={String(values.price)}
            />
            {errors.price && touched.price && (
              <Text style={createProductStyles.error}>{errors.price}</Text>
            )}

            {/* Stock */}
            <Text style={createProductStyles.label}>Stock</Text>
            <TextInput
              style={createProductStyles.input}
              placeholder="Stock"
              keyboardType="numeric"
              onChangeText={handleChange("stock")}
              onBlur={handleBlur("stock")}
              value={String(values.stock)}
            />
            {errors.stock && touched.stock && (
              <Text style={createProductStyles.error}>{errors.stock}</Text>
            )}

            <View style={createProductStyles.switchRow}>
              <Text style={createProductStyles.status}>
                Status: {values.status === "active" ? "Active" : "Inactive"}
              </Text>
              <Switch
                value={values.status === "active"}
                onValueChange={(val) => {
                  setFieldValue("status", val ? "active" : "inactive");
                }}
              />
            </View>

            <Text style={createProductStyles.label}>Upload Image</Text>
            <TouchableOpacity style={createProductStyles.uploadBox} onPress={() => pickImage(setFieldValue)}>
              {values.image ? (
                <View style={createProductStyles.imagePreviewRow}>
                  <Image source={{ uri: values.image }} style={createProductStyles.imagePreview} />
                  <TouchableOpacity onPress={() => setFieldValue("image", "")} style={createProductStyles.removeBtn}>
                    <Text style={{ color: "red" }}>X</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={createProductStyles.uploadText}>Tap to select an image</Text>
              )}
            </TouchableOpacity>
            {errors.image && touched.image && (
              <Text style={createProductStyles.error}>{errors.image}</Text>
            )}

            <View style={createProductStyles.actions}>
              <TouchableOpacity style={[createProductStyles.button, createProductStyles.cancel]} onPress={() => navigation.goBack()}>
                <Text style={createProductStyles.btnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[createProductStyles.submitButton, createProductStyles.submit]} onPress={handleSubmit as any} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={createProductStyles.btnText}>Create Product</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
