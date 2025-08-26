// app/(tabs)/orders.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const summaryCards = [
  { id: "1", title: "Total Orders", value: "120" },
  { id: "2", title: "Pending", value: "8" },
  { id: "3", title: "Shipped", value: "24" },
  { id: "4", title: "Delivered", value: "88" },
];

const orders = [
  {
    id: "ORD-1001",
    status: "Delivered",
    date: "2025-08-10",
    amount: "$250",
    items: ["Nike Air Max", "Adidas T-Shirt"],
  },
  {
    id: "ORD-1002",
    status: "Pending",
    date: "2025-08-18",
    amount: "$399",
    items: ["Apple Watch Series 8"],
  },
  {
    id: "ORD-1003",
    status: "Shipped",
    date: "2025-08-20",
    amount: "$299",
    items: ["Sony WH-1000XM5"],
  },
  {
    id: "ORD-1004",
    status: "Delivered",
    date: "2025-08-21",
    amount: "$80",
    items: ["Puma Sneakers", "Sports Shorts"],
  },
];

export default function Orders() {
  const renderHeader = () => (
    <View>
      <Text style={styles.screenTitle}>Orders</Text>

      {/* 4 summary cards in a 2-column grid */}
      <View style={styles.summaryContainer}>
        {summaryCards.map((card) => (
          <View key={card.id} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>{card.title}</Text>
            <Text style={styles.summaryValue}>{card.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Orders</Text>
    </View>
  );

  const renderItem = ({ item }: { item: (typeof orders)[number] }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <Text
          style={[
            styles.orderStatus,
            item.status === "Delivered"
              ? styles.statusDelivered
              : item.status === "Pending"
              ? styles.statusPending
              : styles.statusShipped,
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.orderDate}>Date: {item.date}</Text>
      <Text style={styles.orderAmount}>Total: {item.amount}</Text>
      <Text style={styles.orderItems}>Items: {item.items.join(", ")}</Text>
    </View>
  );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={<View style={{ height: 28 }} />} // bottom space
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30, // extra bottom padding so last card isn't stuck to the bottom
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
  },
  orderStatus: {
    fontSize: 13,
    fontWeight: "600",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  statusDelivered: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  },
  statusShipped: {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
  },
  orderDate: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: 6,
  },
  orderItems: {
    fontSize: 13,
    color: "#374151",
  },
});
