import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useOrders } from "@/hooks/useOrders";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function Orders() {
  const [page, setPage] = useState(1);
  const { isLoading, handleGetOrders, ordersData } = useOrders();
  const totalPages = ordersData?.totalPages;

  useEffect(() => {
    handleGetOrders({ status: "", page, limit: 10, payment: "" });
  }, [page]);

  const getSummaryCards = () => {
    const orders = ensureArray(ordersData?.orders) || [];
    const totalOrders = ordersData?.totalOrders || 0;
    
    const statusCounts = orders.reduce((acc, order) => {
      const status = order.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const paymentCounts = orders.reduce((acc, order) => {
      const payment = order.payment || 'unknown';
      acc[payment] = (acc[payment] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: "1", title: "Total Orders", value: totalOrders.toString(), icon: "shopping-bag", color: "#3b82f6" },
      { id: "2", title: "Open Orders", value: (statusCounts.open || 0).toString(), icon: "clock", color: "#f59e0b" },
      { id: "3", title: "Completed", value: (statusCounts.completed || 0).toString(), icon: "check-circle", color: "#10b981" },
      { id: "4", title: "Pending Payment", value: (paymentCounts.pending || 0).toString(), icon: "credit-card", color: "#ef4444" },
    ];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return { bg: '#dcfce7', text: '#16a34a' };
      case 'pending':
      case 'open':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'shipped':
      case 'processing':
        return { bg: '#dbeafe', text: '#2563eb' };
      case 'cancelled':
        return { bg: '#fee2e2', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const getPaymentStatusColor = (payment: string) => {
    switch (payment?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return { bg: '#dcfce7', text: '#16a34a' };
      case 'pending':
        return { bg: '#fef3c7', text: '#d97706' };
      case 'failed':
        return { bg: '#fee2e2', text: '#dc2626' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const renderSummaryCard = ({ item }: any) => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIconContainer}>
        <Feather name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={styles.summaryTitle}>{item.title}</Text>
      <Text style={[styles.summaryValue, { color: item.color }]}>{item.value}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <Text style={styles.screenTitle}>Orders Management</Text>
      {/* <Text style={styles.screenSubtitle}>
        {ordersData?.totalOrders || 0} total orders found
      </Text> */}
      
      <FlatList
        data={getSummaryCards()}
        renderItem={renderSummaryCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.summaryRow}
        style={styles.summaryContainer}
      />
      
      <Text style={styles.sectionTitle}>Recent Orders</Text>
    </View>
  );

  const renderItem = ({ item }: any) => {
    const statusColors = getStatusColor(item?.status);
    const paymentColors = getPaymentStatusColor(item?.payment);
    
    return (
      <TouchableOpacity style={styles.orderCard} activeOpacity={0.7} onPress={() => router.push({ pathname: `/orders/${item?._id}`as any, params: { order: JSON.stringify(item) }})}>
        <View style={styles.orderHeader}>
          <View style={styles.orderIdContainer}>
            <Text style={styles.orderId}>{item?.name || item?._id?.slice(-8)}</Text>
            <Text style={styles.orderIdSubtext}>ID: {item?._id?.slice(-8)}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.orderStatus,
                { backgroundColor: statusColors.bg, color: statusColors.text }
              ]}
            >
              {item?.status?.toUpperCase() || 'UNKNOWN'}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View style={styles.detailRow}>
            <Feather name="calendar" size={14} color="#6b7280" />
            <Text style={styles.orderDetailText}>
              {formatDate(item?.createdAt)}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Feather name="credit-card" size={14} color="#6b7280" />
            <Text style={styles.orderDetailText}>
              {item?.paymentMethod?.toUpperCase() || 'N/A'}
            </Text>
            <Text
              style={[
                styles.paymentStatus,
                { backgroundColor: paymentColors.bg, color: paymentColors.text }
              ]}
            >
              {item?.payment?.toUpperCase() || 'UNKNOWN'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Feather name="map-pin" size={14} color="#6b7280" />
            <Text style={styles.orderDetailText}>
              {item?.shipperCity || 'Location not specified'}
            </Text>
          </View>

          {item?.promoCode && (
            <View style={styles.detailRow}>
              <Feather name="tag" size={14} color="#10b981" />
              <Text style={[styles.orderDetailText, { color: '#10b981', fontWeight: '600' }]}>
                Promo: {item.promoCode}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.orderFooter}>
          <TouchableOpacity style={styles.viewDetailsBtn} onPress={() => router.push({ pathname: `/orders/${item?._id}`as any, params: { order: JSON.stringify(item) }})}>
            <Text style={styles.viewDetailsBtnText}>View Details</Text>
            <Feather name="arrow-right" size={16} color="#2563eb" />
          </TouchableOpacity>
          
          {item?.trackingId && (
            <TouchableOpacity style={styles.trackOrderBtn}>
              <Feather name="navigation" size={16} color="#10b981" />
              <Text style={styles.trackOrderBtnText}>Track</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Feather name="shopping-bag" size={48} color="#9ca3af" />
      <Text style={styles.emptyTitle}>No Orders Found</Text>
      <Text style={styles.emptySubtitle}>Orders will appear here once customers start placing them.</Text>
    </View>
  );

  return (
    <>
      {isLoading && <Loader text="Fetching Orders..." />}
      <FlatList
        data={ensureArray(ordersData?.orders)}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={[ styles.listContent, (!ordersData?.orders?.length && !isLoading) && styles.emptyListContent ]}
        ListFooterComponent={<View style={{ height: 28 }} />}
        showsVerticalScrollIndicator={false}
      />
      
      {ordersData?.orders?.length > 0 && (
        <View style={styles.paginationContainer}>
          <TouchableOpacity 
            disabled={page === 1} 
            onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={[styles.paginationBtn, page === 1 && styles.paginationBtnDisabled]}
          >
            <Feather name="arrow-left" size={20} color={page === 1 ? "#9ca3af" : "#2563eb"} />
          </TouchableOpacity>

          <View style={styles.pageInfoContainer}>
            <Text style={styles.pageInfo}>
              Page {page} of {totalPages}
            </Text>
          </View>

          <TouchableOpacity 
            disabled={page >= totalPages} 
            onPress={() => setPage((prev) => prev + 1)}
            style={[styles.paginationBtn, page >= totalPages && styles.paginationBtnDisabled]}
          >
            <Feather name="arrow-right" size={20} color={page >= totalPages ? "#9ca3af" : "#2563eb"} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },
  screenSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 24,
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryCard: {
    width: '48%',
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  summaryIconContainer: {
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: 'center',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  orderIdSubtext: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: "700",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  orderDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  orderDetailText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    flex: 1,
  },
  paymentStatus: {
    fontSize: 11,
    fontWeight: "600",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 8,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  viewDetailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  viewDetailsBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
    marginRight: 4,
  },
  trackOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trackOrderBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#10b981",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  paginationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  paginationBtnDisabled: {
    opacity: 0.5,
  },
  paginationBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
    marginHorizontal: 4,
  },
  paginationBtnTextDisabled: {
    color: "#9ca3af",
  },
  pageInfoContainer: {
    alignItems: 'center',
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  totalInfo: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
});
