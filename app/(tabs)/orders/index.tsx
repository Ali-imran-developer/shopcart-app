import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { ensureArray, formatDate, getPaymentStatusColor, getStatusColor, getSummaryCards } from "@/hooks/useFormater";
import { useOrders } from "@/hooks/useOrders";
import { RootState } from "@/store";
import orderStyles from "@/styles/orders";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

export default function Orders() {
  const [page, setPage] = useState(1);
  const { isLoading, handleGetOrders } = useOrders();
  const { orders, totalPages, totalOrders } = useSelector((state: RootState) => state.Orders);

  useEffect(() => {
    handleGetOrders({ status: "", page, limit: 10, payment: "" });

  }, [page]);

  const renderSummaryCard = ({ item }: any) => (
    <View style={orderStyles.summaryCard}>
      <View style={orderStyles.summaryIconContainer}>
        <Feather name={item.icon} size={24} color={item.color} />
      </View>
      <Text style={orderStyles.summaryTitle}>{item.title}</Text>
      <Text style={[orderStyles.summaryValue, { color: item.color }]}>{item.value}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <Text style={orderStyles.screenTitle}>Orders Management</Text>

      <FlatList
        data={getSummaryCards({ orders, totalOrders })}
        renderItem={renderSummaryCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={orderStyles.summaryRow}
        style={orderStyles.summaryContainer}
      />
      
      <Text style={orderStyles.sectionTitle}>Recent Orders</Text>
    </View>
  );

  const renderItem = ({ item }: any) => {
    const statusColors = getStatusColor(item?.status);
    const paymentColors = getPaymentStatusColor(item?.payment);
    
    return (
      <TouchableOpacity style={orderStyles.orderCard} activeOpacity={0.7} onPress={() => router.push({ pathname: `/orders/${item?._id}`as any, params: { order: JSON.stringify(item) }})}>
        <View style={orderStyles.orderHeader}>
          <View style={orderStyles.orderIdContainer}>
            <Text style={orderStyles.orderId}>{item?.name || item?._id?.slice(-8)}</Text>
            <Text style={orderStyles.orderIdSubtext}>ID: {item?._id?.slice(-8)}</Text>
          </View>
          <View style={orderStyles.statusContainer}>
            <Text
              style={[
                orderStyles.orderStatus,
                { backgroundColor: statusColors.bg, color: statusColors.text }
              ]}
            >
              {item?.status?.toUpperCase() || 'UNKNOWN'}
            </Text>
          </View>
        </View>

        <View style={orderStyles.orderDetails}>
          <View style={orderStyles.detailRow}>
            <Feather name="calendar" size={14} color="#6b7280" />
            <Text style={orderStyles.orderDetailText}>
              {formatDate(item?.createdAt)}
            </Text>
          </View>
          
          <View style={orderStyles.detailRow}>
            <Feather name="credit-card" size={14} color="#6b7280" />
            <Text style={orderStyles.orderDetailText}>
              {item?.paymentMethod?.toUpperCase() || 'N/A'}
            </Text>
            <Text
              style={[
                orderStyles.paymentStatus,
                { backgroundColor: paymentColors.bg, color: paymentColors.text }
              ]}
            >
              {item?.payment?.toUpperCase() || 'UNKNOWN'}
            </Text>
          </View>
          
          <View style={orderStyles.detailRow}>
            <Feather name="map-pin" size={14} color="#6b7280" />
            <Text style={orderStyles.orderDetailText}>
              {item?.shipperCity || 'Location not specified'}
            </Text>
          </View>

          {item?.promoCode && (
            <View style={orderStyles.detailRow}>
              <Feather name="tag" size={14} color="#10b981" />
              <Text style={[orderStyles.orderDetailText, { color: '#10b981', fontWeight: '600' }]}>
                Promo: {item.promoCode}
              </Text>
            </View>
          )}
        </View>

        <View style={orderStyles.orderFooter}>
          <TouchableOpacity style={orderStyles.viewDetailsBtn} onPress={() => router.push({ pathname: `/orders/${item?._id}`as any, params: { order: JSON.stringify(item) }})}>
            <Text style={orderStyles.viewDetailsBtnText}>View Details</Text>
            <Feather name="arrow-right" size={16} color="#2563eb" />
          </TouchableOpacity>
          
          {item?.trackingId && (
            <TouchableOpacity style={orderStyles.trackOrderBtn}>
              <Feather name="navigation" size={16} color="#10b981" />
              <Text style={orderStyles.trackOrderBtnText}>Track</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={orderStyles.emptyState}>
      <Feather name="shopping-bag" size={48} color="#9ca3af" />
      <Text style={orderStyles.emptyTitle}>No Orders Found</Text>
      <Text style={orderStyles.emptySubtitle}>Orders will appear here once customers start placing them.</Text>
    </View>
  );

  return (
    <>
      {isLoading && <Loader />}
      <FlatList
        data={ensureArray(orders)}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!isLoading ? renderEmptyState : null}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={[ orderStyles.listContent, (!orders?.length && !isLoading) && orderStyles.emptyListContent ]}
        ListFooterComponent={<View style={{ height: 28 }} />}
        showsVerticalScrollIndicator={false}
      />
      
      {orders?.length > 0 && (<Pagination page={page} setPage={setPage} totalPages={totalPages} />)}
    </>
  );
}
