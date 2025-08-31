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
import createOrderStyles from "@/styles/orders/create-orders";

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
    <SafeAreaView style={createOrderStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={createOrderStyles.header}>
        <TouchableOpacity
          onPress={() => router.push("/orders")}
          style={createOrderStyles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={createOrderStyles.headerTitle}>Create Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={createOrderStyles.scrollContainer}
        contentContainerStyle={createOrderStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={createOrderStyles.productCard}>
          <Image
            source={
              logo ? { uri: logo } : require("@/assets/images/placeholder.jpg")
            }
            style={createOrderStyles.productImage}
            resizeMode="cover"
          />
          <View style={createOrderStyles.productInfo}>
            <Text style={createOrderStyles.productName}>{name}</Text>
            <Text style={createOrderStyles.productPrice}>
              Rs. {Number(price).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Quantity */}
        <View style={createOrderStyles.section}>
          <View style={createOrderStyles.sectionHeader}>
            <Feather name="package" size={20} color="#6b7280" />
            <Text style={createOrderStyles.sectionTitle}>Quantity</Text>
          </View>
          <View style={createOrderStyles.quantityContainer}>
            <TouchableOpacity
              onPress={() =>
                setFieldValue("quantity", Math.max(1, values.quantity - 1))
              }
              style={createOrderStyles.quantityButton}
            >
              <Feather name="minus" size={18} color="#374151" />
            </TouchableOpacity>
            <View style={createOrderStyles.quantityDisplay}>
              <Text style={createOrderStyles.quantityText}>{values.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setFieldValue("quantity", values.quantity + 1)}
              style={createOrderStyles.quantityButton}
            >
              <Feather name="plus" size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipper Selection */}
        <View style={createOrderStyles.section}>
          <View style={createOrderStyles.sectionHeader}>
            <Feather name="truck" size={20} color="#6b7280" />
            <Text style={createOrderStyles.sectionTitle}>Shipping Method</Text>
          </View>
          <View style={createOrderStyles.pickerContainer}>
            <Picker
              selectedValue={values.selectedShipper}
              onValueChange={(value) => {
                setFieldValue("selectedShipper", value);
                setFieldValue("shipmentDetails.shipperCity", value);
              }}
              style={createOrderStyles.picker}
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
            <Text style={createOrderStyles.errorText}>
              {errors?.selectedShipper as any}
            </Text>
          )}
        </View>

        {/* Delivery Details */}
        <View style={createOrderStyles.section}>
          <View style={createOrderStyles.sectionHeader}>
            <Feather name="map-pin" size={20} color="#6b7280" />
            <Text style={createOrderStyles.sectionTitle}>Delivery Details</Text>
          </View>

          {/* Name */}
          <Text style={createOrderStyles.inputLabel}>Name</Text>
          <TextInput
            style={[ createOrderStyles.textInput, touched?.shipmentDetails?.name && errors.shipmentDetails?.name && createOrderStyles.inputError ]}
            placeholder="name"
            value={values.shipmentDetails.name}
            onChangeText={(text) => setFieldValue("shipmentDetails.name", text)}
          />
          {touched?.shipmentDetails?.name && errors.shipmentDetails?.name && (
            <Text style={createOrderStyles.errorText}>{errors.shipmentDetails?.name}</Text>
          )}

          {/* Email */}
          <Text style={createOrderStyles.inputLabel}>Email</Text>
          <TextInput
            style={[
              createOrderStyles.textInput,
              touched?.shipmentDetails?.email && errors.shipmentDetails?.email && createOrderStyles.inputError,
            ]}
            keyboardType="email-address"
            placeholder="email"
            value={values.shipmentDetails.email}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.email", text)
            }
          />
          {touched?.shipmentDetails?.email && errors?.shipmentDetails?.email && (
            <Text style={createOrderStyles.errorText}>{errors.shipmentDetails?.email}</Text>
          )}

          {/* Phone */}
          <Text style={createOrderStyles.inputLabel}>Phone</Text>
          <TextInput
            style={[ createOrderStyles.textInput, touched?.shipmentDetails?.phone && errors.shipmentDetails?.phone && createOrderStyles.inputError ]}
            keyboardType="phone-pad"
            placeholder="phone"
            value={values.shipmentDetails.phone}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.phone", text)
            }
          />
          {touched?.shipmentDetails?.phone && errors.shipmentDetails?.phone && (
            <Text style={createOrderStyles.errorText}>{errors.shipmentDetails?.phone}</Text>
          )}

          {/* City */}
          <Text style={createOrderStyles.inputLabel}>City</Text>
          <TextInput
            style={[
              createOrderStyles.textInput,
              touched?.shipmentDetails?.city && errors.shipmentDetails?.city && createOrderStyles.inputError,
            ]}
            placeholder="city"
            value={values.shipmentDetails.city}
            onChangeText={(text) => setFieldValue("shipmentDetails.city", text)}
          />
          {touched?.shipmentDetails?.city && errors.shipmentDetails?.city && (
            <Text style={createOrderStyles.errorText}>{errors.shipmentDetails?.city}</Text>
          )}

          {/* Address */}
          <Text style={createOrderStyles.inputLabel}>Address</Text>
          <TextInput
            style={[
              createOrderStyles.textInput,
              touched?.shipmentDetails?.address && errors.shipmentDetails?.address && createOrderStyles.inputError,
            ]}
            placeholder="address"
            value={values.shipmentDetails.address}
            onChangeText={(text) =>
              setFieldValue("shipmentDetails.address", text)
            }
          />
          {touched?.shipmentDetails?.address && errors.shipmentDetails?.address && (
            <Text style={createOrderStyles.errorText}>{errors.shipmentDetails?.address}</Text>
          )}
        </View>

        {/* Pricing */}
        <View style={createOrderStyles.section}>
          <View style={createOrderStyles.sectionHeader}>
            <Feather name="dollar-sign" size={20} color="#6b7280" />
            <Text style={createOrderStyles.sectionTitle}>Order Summary</Text>
          </View>

          <View style={createOrderStyles.pricingRow}>
            <Text style={createOrderStyles.pricingLabel}>Subtotal</Text>
            <Text style={createOrderStyles.pricingValue}>Rs. {subTotal.toFixed(2)}</Text>
          </View>

          <View style={createOrderStyles.inputContainer}>
            <Text style={createOrderStyles.inputLabel}>Order Tax</Text>
            <TextInput
              style={[createOrderStyles.textInput, touched?.orderTax && errors.orderTax && createOrderStyles.inputError]}
              keyboardType="numeric"
              placeholder="0.00"
              value={values.orderTax.toString()}
              onChangeText={(text) =>
                setFieldValue("orderTax", Number(text) || 0)
              }
            />
            {touched?.orderTax && errors.orderTax && (
              <Text style={createOrderStyles.errorText}>{errors.orderTax}</Text>
            )}
          </View>

          <View style={createOrderStyles.inputContainer}>
            <Text style={createOrderStyles.inputLabel}>Shipping Fee</Text>
            <TextInput
              style={[createOrderStyles.textInput, touched?.shipping && errors.shipping && createOrderStyles.inputError]}
              keyboardType="numeric"
              placeholder="0.00"
              value={values.shipping.toString()}
              onChangeText={(text) =>
                setFieldValue("shipping", Number(text) || 0)
              }
            />
            {touched?.shipping && errors.shipping && (
              <Text style={createOrderStyles.errorText}>{errors.shipping}</Text>
            )}
          </View>

          <View style={createOrderStyles.inputContainer}>
            <Text style={createOrderStyles.inputLabel}>Promo Code</Text>
            <View style={createOrderStyles.promoContainer}>
              <TextInput
                style={[createOrderStyles.textInput, createOrderStyles.promoInput]}
                placeholder="Enter promo code"
                value={values.promoCode}
                onChangeText={handleChange("promoCode")}
              />
              <TouchableOpacity
                style={createOrderStyles.applyButton}
                onPress={() =>
                  Toast.show({
                    type: "success",
                    text1: "Promo code applied successfully!",
                  })
                }
              >
                <Text style={createOrderStyles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={createOrderStyles.divider} />

          <View style={createOrderStyles.totalRow}>
            <Text style={createOrderStyles.totalLabel}>Total Amount</Text>
            <Text style={createOrderStyles.totalValue}>Rs. {totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={createOrderStyles.bottomContainer}>
        <TouchableOpacity
          style={createOrderStyles.createOrderButton}
          onPress={handleSubmit as any}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Feather name="shopping-cart" size={22} color="#fff" />
              <Text style={createOrderStyles.createOrderText}>Create Order</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateOrder;