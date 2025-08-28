import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useFormik } from "formik";
import { useShipperData } from "@/hooks/useShipper";
import { ensureArray } from "@/hooks/useFormater";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import orderSchema from "@/validators/orders-schema";
import { useOrders } from "@/hooks/useOrders";

const CreateOrder = () => {
  const { productId, price, name, logo } = useLocalSearchParams();
  const { shippers, fetchShippers } = useShipperData();
  const { handleAddOrders, isLoading } = useOrders();

  useEffect(() => {
    fetchShippers();

  }, []);

  const initialValues = {
    quantity: 1,
    orderTax: 0,
    shipping: 0,
    promoCode: "",
    selectedShipper: shippers?.shipper?.[0]?.city ?? "",
    shipmentDetails: {
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      shipperCity: shippers?.shipper?.[0]?.city ?? "",
    },
  };

  const handleCreateOrder = async (values: any, { resetForm }: any) => {
    const subTotal = Number(price) * values.quantity;
    const totalPrice = subTotal + values.orderTax + values.shipping;
    const payload = {
      clientSecret: "",
      paymentMethod: "cod",
      status: "open",
      tags: [],
      products: [
        {
          productId,
          productQty: values.quantity,
        },
      ],
      promoCode: values.promoCode,
      shipmentDetails: values.shipmentDetails,
      shipperCity: values.selectedShipper,
      pricing: {
        subTotal,
        orderTax: values.orderTax,
        shipping: values.shipping,
        paid: 0,
        totalPrice,
      },
    };
    try {
      await handleAddOrders(payload);
      resetForm();
      router.push("/orders");
    } catch (error: any) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit: (values, helpers) => handleCreateOrder(values, helpers),
    enableReinitialize: true,
  });

  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } = formik;
  const subTotal = Number(price) * values.quantity;
  const totalPrice = subTotal + values.orderTax + values.shipping;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/orders")}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.productCard}>
          <Image
            source={
              logo ? { uri: logo } : require("@/assets/images/placeholder.jpg")
            }
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productPrice}>
              Rs. {Number(price).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="package" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>Quantity</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                setFieldValue("quantity", Math.max(1, values.quantity - 1))
              }
              style={styles.quantityButton}
            >
              <Feather name="minus" size={18} color="#374151" />
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityText}>{values.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setFieldValue("quantity", values.quantity + 1)}
              style={styles.quantityButton}
            >
              <Feather name="plus" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipper Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="truck" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>Shipping Method</Text>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={values.selectedShipper}
              onValueChange={(value) => {
                setFieldValue("selectedShipper", value);
                setFieldValue("shipmentDetails.shipperCity", value);
              }}
              style={styles.picker}
            >
              {ensureArray(shippers?.shipper)?.map((shipper: any) => (
                <Picker.Item
                  key={shipper?._id}
                  label={shipper?.city}
                  value={shipper?.city}
                />
              ))}
            </Picker>
          </View>
          {errors.selectedShipper && touched.selectedShipper && (
            <Text style={styles.errorText}>
              {errors?.selectedShipper as any}
            </Text>
          )}
        </View>

        {/* Delivery Details */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="map-pin" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>Delivery Details</Text>
          </View>

          {/* Name */}
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={[ styles.textInput, touched?.shipmentDetails?.name && errors.shipmentDetails?.name && styles.inputError ]}
            placeholder="name"
            value={values.shipmentDetails.name}
            onChangeText={(text) => setFieldValue("shipmentDetails.name", text)}
          />
          {touched?.shipmentDetails?.name && errors.shipmentDetails?.name && (
            <Text style={styles.errorText}>{errors.shipmentDetails?.name}</Text>
          )}

          {/* Email */}
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[
              styles.textInput,
              touched?.shipmentDetails?.email && errors.shipmentDetails?.email && styles.inputError,
            ]}
            keyboardType="email-address"
            placeholder="email"
            value={values.shipmentDetails.email}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.email", text)
            }
          />
          {touched?.shipmentDetails?.email && errors?.shipmentDetails?.email && (
            <Text style={styles.errorText}>{errors.shipmentDetails?.email}</Text>
          )}

          {/* Phone */}
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={[ styles.textInput, touched?.shipmentDetails?.phone && errors.shipmentDetails?.phone && styles.inputError ]}
            keyboardType="phone-pad"
            placeholder="phone"
            value={values.shipmentDetails.phone}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.phone", text)
            }
          />
          {touched?.shipmentDetails?.phone && errors.shipmentDetails?.phone && (
            <Text style={styles.errorText}>{errors.shipmentDetails?.phone}</Text>
          )}

          {/* City */}
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={[
              styles.textInput,
              touched?.shipmentDetails?.city && errors.shipmentDetails?.city && styles.inputError,
            ]}
            placeholder="city"
            value={values.shipmentDetails.city}
            onChangeText={(text) => setFieldValue("shipmentDetails.city", text)}
          />
          {touched?.shipmentDetails?.city && errors.shipmentDetails?.city && (
            <Text style={styles.errorText}>{errors.shipmentDetails?.city}</Text>
          )}

          {/* Address */}
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={[
              styles.textInput,
              touched?.shipmentDetails?.address && errors.shipmentDetails?.address && styles.inputError,
            ]}
            placeholder="address"
            value={values.shipmentDetails.address}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.address", text)
            }
          />
          {touched?.shipmentDetails?.address && errors.shipmentDetails?.address && (
            <Text style={styles.errorText}>{errors.shipmentDetails?.address}</Text>
          )}
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="dollar-sign" size={20} color="#6b7280" />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Subtotal</Text>
            <Text style={styles.pricingValue}>Rs. {subTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Order Tax</Text>
            <TextInput
              style={[styles.textInput, touched?.orderTax && errors.orderTax && styles.inputError]}
              keyboardType="numeric"
              placeholder="0.00"
              value={values.orderTax.toString()}
              onChangeText={(text) =>
                setFieldValue("orderTax", Number(text) || 0)
              }
            />
            {touched?.orderTax && errors.orderTax && (
              <Text style={styles.errorText}>{errors.orderTax}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Shipping Fee</Text>
            <TextInput
              style={[styles.textInput, touched?.shipping && errors.shipping && styles.inputError]}
              keyboardType="numeric"
              placeholder="0.00"
              value={values.shipping.toString()}
              onChangeText={(text) =>
                setFieldValue("shipping", Number(text) || 0)
              }
            />
            {touched?.shipping && errors.shipping && (
              <Text style={styles.errorText}>{errors.shipping}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Promo Code</Text>
            <View style={styles.promoContainer}>
              <TextInput
                style={[styles.textInput, styles.promoInput]}
                placeholder="Enter promo code"
                value={values.promoCode}
                onChangeText={handleChange("promoCode")}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() =>
                  Toast.show({
                    type: "success",
                    text1: "Promo code applied successfully!",
                  })
                }
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>Rs. {totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.createOrderButton}
          onPress={handleSubmit as any}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Feather name="shopping-cart" size={22} color="#fff" />
              <Text style={styles.createOrderText}>Create Order</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#059669",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 8,
  },
  quantityButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityDisplay: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  pricingLabel: {
    fontSize: 16,
    color: "#6b7280",
  },
  pricingValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  promoContainer: {
    flexDirection: "row",
    gap: 12,
  },
  promoInput: {
    flex: 1,
  },
  applyButton: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3b82f6",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#059669",
  },
  bottomContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  createOrderButton: {
    backgroundColor: "#059669",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 370,
  },
  createOrderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
