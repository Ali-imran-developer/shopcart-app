import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ensureArray } from "@/hooks/useFormater";
import { useCustomer } from "@/hooks/useCustomers";
import Loader from "@/components/Loader";

const CustomerPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  const { customerData, isLoading, handleGetCustomer } = useCustomer();
  const totalPages = Math.ceil(customerData?.totalCustomers / limit);

  useEffect(() => {
    handleGetCustomer({ page, limit });

  }, [page, limit]);

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = ensureArray(customerData?.customer)?.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toString().includes(searchQuery)
    );

    return filtered;
  }, [customerData, searchQuery]);

  const formatCurrency = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const CustomerCard = ({ customer }: any) => (
    <View style={styles.customerCard}>
      <View style={styles.cardHeader}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customer.customerName}</Text>
          <Text style={styles.customerCity}>{customer.city}</Text>
        </View>
        {/* <View style={styles.customerBadge}>
          <Text style={styles.badgeText}>VIP</Text>
        </View> */}
      </View>

      <View style={styles.cardStats}>
        <View style={styles.statItem}>
          <Ionicons name="call-outline" size={16} color="#666" />
          <Text style={styles.statValue}>{customer.phone}</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="bag-outline" size={16} color="#666" />
          <Text style={styles.statValue}>{customer.totalOrders} Orders</Text>
        </View>

        <View style={styles.statItem}>
          <Ionicons name="card-outline" size={16} color="#666" />
          <Text style={styles.statValue}>
            {formatCurrency(customer.totalSpent)}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.joinedDate}>
          Joined: {formatDate(customer.createdAt)}
        </Text>
        {/* <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const TableRow = ({ customer, isHeader = false }: any) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeader]}>
      <Text
        style={[
          styles.tableCell,
          styles.nameCell,
          isHeader && styles.headerText,
        ]}
      >
        {isHeader ? "Name" : customer.customerName}
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.phoneCell,
          isHeader && styles.headerText,
        ]}
      >
        {isHeader ? "Phone" : customer.phone}
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.cityCell,
          isHeader && styles.headerText,
        ]}
      >
        {isHeader ? "City" : customer.city}
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.ordersCell,
          isHeader && styles.headerText,
        ]}
      >
        {isHeader ? "Orders" : customer.totalOrders}
      </Text>
      <Text
        style={[
          styles.tableCell,
          styles.spentCell,
          isHeader && styles.headerText,
        ]}
      >
        {isHeader ? "Spent" : formatCurrency(customer.totalSpent)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customers</Text>
      </View>

      {isLoading && <Loader />}

      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search customers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery?.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.viewToggle}>
          <TouchableOpacity style={[ styles.toggleButton, viewMode === "cards" && styles.activeToggle ]} onPress={() => setViewMode("cards")}>
            <Ionicons name="grid-outline" size={20} color={viewMode === "cards" ? "#007AFF" : "#666"} />
          </TouchableOpacity>
          <TouchableOpacity style={[ styles.toggleButton, viewMode === "table" && styles.activeToggle ]} onPress={() => setViewMode("table")}>
            <Ionicons name="list-outline" size={20} color={viewMode === "table" ? "#007AFF" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === "cards" ? (
        <FlatList
          data={filteredAndSortedCustomers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CustomerCard customer={item} />}
          contentContainerStyle={styles.cardsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView style={styles.tableContainer}>
          <TableRow isHeader />
          {ensureArray(filteredAndSortedCustomers)?.map((customer: any) => (
            <TableRow key={customer?._id} customer={customer} />
          ))}
        </ScrollView>
      )}

            {customerData?.customer?.length > 0 && (
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
    </SafeAreaView>
  );
};

export default CustomerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  summaryContainers: {
    marginBottom: 24,
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
  pageInfoContainer: {
    alignItems: 'center',
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  summaryRow: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  controlsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    alignItems: "center",
    gap: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingHorizontal: 15,
    // paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  searchIcon: {
    marginRight: 10,
  },
  summaryCard: {
    width: "48%",
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
    textAlign: "center",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#212529",
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sortContainer: {
    paddingHorizontal: 20,
    height: 10,
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    // height: 40,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  activeSortButton: {
    backgroundColor: "#e3f2fd",
    borderColor: "#007AFF",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#495057",
    marginRight: 4,
  },
  activeSortText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  cardsList: {
    padding: 20,
    paddingBottom: 100,
  },
  customerCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f3f4",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  customerCity: {
    fontSize: 16,
    color: "#6c757d",
  },
  customerBadge: {
    backgroundColor: "#28a745",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  cardStats: {
    marginBottom: 15,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 8,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f1f3f4",
    paddingTop: 15,
  },
  joinedDate: {
    fontSize: 14,
    color: "#6c757d",
  },
  viewButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  tableContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f4",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableCell: {
    fontSize: 14,
    color: "#495057",
  },
  headerText: {
    fontWeight: "bold",
    color: "#212529",
  },
  nameCell: {
    flex: 2,
  },
  phoneCell: {
    flex: 2,
  },
  cityCell: {
    flex: 1.5,
  },
  ordersCell: {
    flex: 1,
    textAlign: "center",
  },
  spentCell: {
    flex: 1.5,
    textAlign: "right",
  },
  summaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
  },
});
