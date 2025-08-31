import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { ensureArray, formatCurrency, formatDate, getOrderStatusColor, getPaymentStatusColor } from '@/hooks/useFormater';
import ordersDetailStyles from '@/styles/orders/orders-detail';

const OrderDetailsPage = () => {
  const { order } = useLocalSearchParams();
  const orderData = order ? JSON.parse(order as string) : null;

  if (!orderData) {
    return (
      <SafeAreaView style={ordersDetailStyles.container}>
        <View style={ordersDetailStyles.errorContainer}>
          <Feather name="alert-circle" size={48} color="#EF4444" />
          <Text style={ordersDetailStyles.errorText}>Order data not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getOrderStatusColor(orderData?.status);
  const paymentColor = getPaymentStatusColor(orderData?.payment);

  return (
    <SafeAreaView style={ordersDetailStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView 
        style={ordersDetailStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ordersDetailStyles.scrollContent}
      >
        {/* Header Card */}
        <View style={ordersDetailStyles.headerCard}>
          <View style={ordersDetailStyles.headerContent}>
            <View style={ordersDetailStyles.orderInfo}>
              <Text style={ordersDetailStyles.orderTitle}>Order {orderData?.name ?? ""}</Text>
              <Text style={ordersDetailStyles.orderDate}>
                Placed on {formatDate(orderData?.createdAt ?? "")}
              </Text>
            </View>
            <View style={ordersDetailStyles.statusContainer}>
              <View style={[ordersDetailStyles.statusBadge, { backgroundColor: statusColor.bg }]}>
                <Text style={[ordersDetailStyles.statusText, { color: statusColor.text }]}>
                  {orderData?.status?.charAt(0)?.toUpperCase() + orderData?.status?.slice(1)}
                </Text>
              </View>
              <View style={[ordersDetailStyles.statusBadge, { backgroundColor: paymentColor.bg }]}>
                <Text style={[ordersDetailStyles.statusText, { color: paymentColor.text }]}>
                  Payment {orderData?.payment?.charAt(0)?.toUpperCase() + orderData?.payment?.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Products Section */}
        <View style={ordersDetailStyles.card}>
          <View style={ordersDetailStyles.cardHeader}>
            <View style={ordersDetailStyles.sectionTitle}>
              <Feather name="package" size={20} color="#374151" />
              <Text style={ordersDetailStyles.sectionTitleText}>Order Items</Text>
            </View>
          </View>
          <View style={ordersDetailStyles.cardContent}>
            {ensureArray(orderData?.products)?.map((product: any, index: number) => (
              <View key={index} style={ordersDetailStyles.productItem}>
                <Image
                  source={{ uri: product?.image ?? "" }}
                  style={ordersDetailStyles.productImage}
                  resizeMode="cover"
                />
                <View style={ordersDetailStyles.productInfo}>
                  <Text style={ordersDetailStyles.productName}>{product.name}</Text>
                  <View style={ordersDetailStyles.productDetails}>
                    <Text style={ordersDetailStyles.productPrice}>
                      Rs. {formatCurrency(product.price)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={ordersDetailStyles.card}>
          <View style={ordersDetailStyles.cardHeader}>
            <View style={ordersDetailStyles.sectionTitle}>
              <Feather name="dollar-sign" size={20} color="#374151" />
              <Text style={ordersDetailStyles.sectionTitleText}>Order Summary</Text>
            </View>
          </View>
          <View style={ordersDetailStyles.cardContent}>
            <View style={ordersDetailStyles.summaryRow}>
              <Text style={ordersDetailStyles.summaryLabel}>Subtotal</Text>
              <Text style={ordersDetailStyles.summaryValue}>
                Rs. {formatCurrency(orderData?.pricing?.subTotal ?? 0)}
              </Text>
            </View>
            <View style={ordersDetailStyles.summaryRow}>
              <Text style={ordersDetailStyles.summaryLabel}>Shipping</Text>
              <Text style={ordersDetailStyles.summaryValue}>
                Rs. {formatCurrency(orderData?.pricing?.shipping ?? 0)}
              </Text>
            </View>
            <View style={ordersDetailStyles.summaryRow}>
              <Text style={ordersDetailStyles.summaryLabel}>Tax</Text>
              <Text style={ordersDetailStyles.summaryValue}>
                {formatCurrency(orderData?.pricing?.orderTax ?? 0)} %
              </Text>
            </View>
            <View style={ordersDetailStyles.totalRow}>
              <Text style={ordersDetailStyles.totalLabel}>Total</Text>
              <Text style={ordersDetailStyles.totalValue}>
                Rs. {formatCurrency(orderData?.pricing?.totalPrice ?? 0)}
              </Text>
            </View>
            <View style={ordersDetailStyles.paymentMethodContainer}>
              <Text style={ordersDetailStyles.paymentMethodLabel}>Payment Method</Text>
              <Text style={ordersDetailStyles.paymentMethodValue}>
                {orderData?.paymentMethod?.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Shipping Details */}
        <View style={ordersDetailStyles.card}>
          <View style={ordersDetailStyles.cardHeader}>
            <View style={ordersDetailStyles.sectionTitle}>
              <Feather name="truck" size={20} color="#374151" />
              <Text style={ordersDetailStyles.sectionTitleText}>Shipping Details</Text>
            </View>
          </View>
          <View style={ordersDetailStyles.cardContent}>
            <View style={ordersDetailStyles.shippingRow}>
              <Feather name="map-pin" size={16} color="#9CA3AF" />
              <View style={ordersDetailStyles.shippingInfo}>
                <Text style={ordersDetailStyles.customerName}>
                  {orderData?.shipmentDetails?.name}
                </Text>
                <Text style={ordersDetailStyles.shippingAddress}>
                  {orderData?.shipmentDetails?.address}
                </Text>
                <Text style={ordersDetailStyles.shippingAddress}>
                  {orderData?.shipmentDetails?.city}
                </Text>
              </View>
            </View>
            
            <View style={ordersDetailStyles.contactRow}>
              <Feather name="phone" size={16} color="#9CA3AF" />
              <Text style={ordersDetailStyles.contactText}>
                {orderData?.shipmentDetails?.phone}
              </Text>
            </View>
            
            <View style={ordersDetailStyles.contactRow}>
              <Feather name="mail" size={16} color="#9CA3AF" />
              <Text style={ordersDetailStyles.contactText}>
                {orderData?.shipmentDetails?.email}
              </Text>
            </View>

            {orderData?.trackingId && (
              <View style={ordersDetailStyles.trackingContainer}>
                <Text style={ordersDetailStyles.trackingLabel}>Tracking ID</Text>
                <Text style={ordersDetailStyles.trackingValue}>{orderData.trackingId}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Order Information */}
        <View style={ordersDetailStyles.card}>
          <View style={ordersDetailStyles.cardHeader}>
            <View style={ordersDetailStyles.sectionTitle}>
              <Feather name="info" size={20} color="#374151" />
              <Text style={ordersDetailStyles.sectionTitleText}>Order Information</Text>
            </View>
          </View>
          <View style={ordersDetailStyles.cardContent}>
            <View style={ordersDetailStyles.infoRow}>
              <Text style={ordersDetailStyles.infoLabel}>Order ID</Text>
              <Text style={ordersDetailStyles.infoValue}>
                {orderData?.name ?? ""}
              </Text>
            </View>
            <View style={ordersDetailStyles.infoRow}>
              <Text style={ordersDetailStyles.infoLabel}>Created</Text>
              <Text style={ordersDetailStyles.infoValue}>
                {formatDate(orderData?.createdAt ?? "")}
              </Text>
            </View>
            <View style={ordersDetailStyles.infoRow}>
              <Text style={ordersDetailStyles.infoLabel}>Last Updated</Text>
              <Text style={ordersDetailStyles.infoValue}>
                {formatDate(orderData?.updatedAt ?? "")}
              </Text>
            </View>
            <View style={ordersDetailStyles.infoRow}>
              <Text style={ordersDetailStyles.infoLabel}>Shipping City</Text>
              <Text style={ordersDetailStyles.infoValue}>
                {orderData?.shipperCity}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsPage;