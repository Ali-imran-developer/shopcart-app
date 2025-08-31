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
import { ensureArray } from '@/hooks/useFormater';

const OrderDetailsPage = () => {
  const { order } = useLocalSearchParams();
  const orderData = order ? JSON.parse(order as string) : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount?.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'pending': { bg: '#FEF3C7', text: '#92400E' },
      'open': { bg: '#DBEAFE', text: '#1E40AF' },
      'processing': { bg: '#FED7AA', text: '#C2410C' },
      'shipped': { bg: '#E9D5FF', text: '#7C3AED' },
      'delivered': { bg: '#D1FAE5', text: '#065F46' },
      'cancelled': { bg: '#FEE2E2', text: '#DC2626' }
    };
    return colors[status] || { bg: '#F3F4F6', text: '#374151' };
  };

  const getPaymentStatusColor = (status: string) => {
    const colors: any = {
      'pending': { bg: '#FEF3C7', text: '#92400E' },
      'paid': { bg: '#D1FAE5', text: '#065F46' },
      'failed': { bg: '#FEE2E2', text: '#DC2626' }
    };
    return colors[status] || { bg: '#F3F4F6', text: '#374151' };
  };

  if (!orderData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Feather name="alert-circle" size={48} color="#EF4444" />
          <Text style={styles.errorText}>Order data not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const statusColor = getStatusColor(orderData?.status);
  const paymentColor = getPaymentStatusColor(orderData?.payment);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>Order {orderData?.name ?? ""}</Text>
              <Text style={styles.orderDate}>
                Placed on {formatDate(orderData?.createdAt ?? "")}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
                <Text style={[styles.statusText, { color: statusColor.text }]}>
                  {orderData?.status?.charAt(0)?.toUpperCase() + orderData?.status?.slice(1)}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: paymentColor.bg }]}>
                <Text style={[styles.statusText, { color: paymentColor.text }]}>
                  Payment {orderData?.payment?.charAt(0)?.toUpperCase() + orderData?.payment?.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.sectionTitle}>
              <Feather name="package" size={20} color="#374151" />
              <Text style={styles.sectionTitleText}>Order Items</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            {ensureArray(orderData?.products)?.map((product: any, index: number) => (
              <View key={index} style={styles.productItem}>
                <Image
                  source={{ uri: product?.image ?? "" }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  {/* <Text style={styles.productCategory}>
                    {product.category} • {product.subCategory}
                  </Text> */}
                  <View style={styles.productDetails}>
                    {/* <Text style={styles.productQty}>Qty: {product.productQty}</Text> */}
                    <Text style={styles.productPrice}>
                      Rs. {formatCurrency(product.price)}
                    </Text>
                  </View>
                  {/* <View style={styles.productMeta}>
                    <View style={[
                      styles.productStatus,
                      { backgroundColor: product.status === 'active' ? '#D1FAE5' : '#F3F4F6' }
                    ]}>
                      <Text style={[
                        styles.productStatusText,
                        { color: product.status === 'active' ? '#065F46' : '#374151' }
                      ]}>
                        {product.status}
                      </Text>
                    </View>
                    <Text style={styles.stockText}>
                      Stock: {product.stock} available
                    </Text>
                  </View> */}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.sectionTitle}>
              <Feather name="dollar-sign" size={20} color="#374151" />
              <Text style={styles.sectionTitleText}>Order Summary</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                Rs. {formatCurrency(orderData?.pricing?.subTotal ?? 0)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                Rs. {formatCurrency(orderData?.pricing?.shipping ?? 0)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(orderData?.pricing?.orderTax ?? 0)} %
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                Rs. {formatCurrency(orderData?.pricing?.totalPrice ?? 0)}
              </Text>
            </View>
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentMethodLabel}>Payment Method</Text>
              <Text style={styles.paymentMethodValue}>
                {orderData?.paymentMethod?.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Shipping Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.sectionTitle}>
              <Feather name="truck" size={20} color="#374151" />
              <Text style={styles.sectionTitleText}>Shipping Details</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.shippingRow}>
              <Feather name="map-pin" size={16} color="#9CA3AF" />
              <View style={styles.shippingInfo}>
                <Text style={styles.customerName}>
                  {orderData?.shipmentDetails?.name}
                </Text>
                <Text style={styles.shippingAddress}>
                  {orderData?.shipmentDetails?.address}
                </Text>
                <Text style={styles.shippingAddress}>
                  {orderData?.shipmentDetails?.city}
                </Text>
              </View>
            </View>
            
            <View style={styles.contactRow}>
              <Feather name="phone" size={16} color="#9CA3AF" />
              <Text style={styles.contactText}>
                {orderData?.shipmentDetails?.phone}
              </Text>
            </View>
            
            <View style={styles.contactRow}>
              <Feather name="mail" size={16} color="#9CA3AF" />
              <Text style={styles.contactText}>
                {orderData?.shipmentDetails?.email}
              </Text>
            </View>

            {orderData?.trackingId && (
              <View style={styles.trackingContainer}>
                <Text style={styles.trackingLabel}>Tracking ID</Text>
                <Text style={styles.trackingValue}>{orderData.trackingId}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Order Information */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.sectionTitle}>
              <Feather name="info" size={20} color="#374151" />
              <Text style={styles.sectionTitleText}>Order Information</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order ID</Text>
              <Text style={styles.infoValue}>
                {orderData?.name ?? ""}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.infoValue}>
                {formatDate(orderData?.createdAt ?? "")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>
                {formatDate(orderData?.updatedAt ?? "")}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Shipping City</Text>
              <Text style={styles.infoValue}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'column',
  },
  orderInfo: {
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  cardContent: {
    padding: 20,
  },
  productItem: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6e6e6eff',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productQty: {
    fontSize: 14,
    color: '#6B7280',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  productStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  stockText: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  paymentMethodContainer: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodLabel: {
    fontSize: 14,
    color: '#1D4ED8',
  },
  paymentMethodValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  shippingInfo: {
    marginLeft: 12,
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  shippingAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  trackingContainer: {
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  trackingLabel: {
    fontSize: 14,
    color: '#065F46',
  },
  trackingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
});
