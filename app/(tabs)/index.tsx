// app/(tabs)/index.tsx
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { useAuth } from "@/hooks/useAuth";

const screenWidth = Dimensions.get("window").width;
const Dashboard = () => {

  return (
    <ScrollView style={styles.container}>

      {/* Page Title */}
      <Text style={styles.title}>Dashboard</Text>

      {/* Top Cards */}
      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Orders</Text>
          <Text style={styles.cardValue}>1,245</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sales</Text>
          <Text style={styles.cardValue}>$23,400</Text>
        </View>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Customers</Text>
          <Text style={styles.cardValue}>530</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue</Text>
          <Text style={styles.cardValue}>$12,800</Text>
        </View>
      </View>

      {/* Today Orders Graph */}
      <Text style={styles.sectionTitle}>Today's Orders</Text>
      <LineChart
        data={{
          labels: ["9AM", "12PM", "3PM", "6PM", "9PM"],
          datasets: [
            {
              data: [20, 45, 28, 80, 99],
            },
          ],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      {/* Top Products Table */}
      <Text style={styles.sectionTitle}>Top Products</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Product</Text>
          <Text style={styles.tableHeader}>Sales</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>iPhone 15</Text>
          <Text style={styles.tableCell}>320</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Macbook Pro</Text>
          <Text style={styles.tableCell}>210</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>AirPods</Text>
          <Text style={styles.tableCell}>180</Text>
        </View>
      </View>

      {/* Top Cities Graph */}
      <Text style={styles.sectionTitle}>Top Cities</Text>
      <BarChart
        data={{
          labels: ["NY", "LA", "Chicago", "Houston", "Miami"],
          datasets: [
            {
              data: [300, 250, 200, 180, 150],
            },
          ],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={styles.chart} yAxisLabel={""} yAxisSuffix={""}      />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 15,
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    color: "#000",
  },
  chart: {
    borderRadius: 12,
    marginVertical: 8,
  },
  table: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  tableCell: {
    fontSize: 15,
    color: "#333",
  },
});
