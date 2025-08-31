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
import { ensureArray, formatCurrency, formatDate } from "@/hooks/useFormater";
import { useCustomer } from "@/hooks/useCustomers";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import customerStyles from "@/styles/customer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CustomerPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("cards");
  const { isLoading, handleGetCustomer } = useCustomer();
  const { customer, totalCustomers } = useSelector((state: RootState) => state.Customer);
  const totalPages = Math.ceil(totalCustomers / limit);

  useEffect(() => {
    handleGetCustomer({ page, limit });

  }, [page, limit]);

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = ensureArray(customer)?.filter((customer) =>
      customer.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toString().includes(searchQuery)
    );

    return filtered;
  }, [customer, searchQuery]);

  const CustomerCard = ({ customer }: any) => (
    <View style={customerStyles.customerCard}>
      <View style={customerStyles.cardHeader}>
        <View style={customerStyles.customerInfo}>
          <Text style={customerStyles.customerName}>{customer.customerName}</Text>
          <Text style={customerStyles.customerCity}>{customer.city}</Text>
        </View>
      </View>

      <View style={customerStyles.cardStats}>
        <View style={customerStyles.statItem}>
          <Ionicons name="call-outline" size={16} color="#666" />
          <Text style={customerStyles.statValue}>{customer.phone}</Text>
        </View>

        <View style={customerStyles.statItem}>
          <Ionicons name="bag-outline" size={16} color="#666" />
          <Text style={customerStyles.statValue}>{customer.totalOrders} Orders</Text>
        </View>

        <View style={customerStyles.statItem}>
          <Ionicons name="card-outline" size={16} color="#666" />
          <Text style={customerStyles.statValue}>
            {formatCurrency(customer.totalSpent)}
          </Text>
        </View>
      </View>

      <View style={customerStyles.cardFooter}>
        <Text style={customerStyles.joinedDate}>
          Joined: {formatDate(customer.createdAt)}
        </Text>
      </View>
    </View>
  );

  const TableRow = ({ customer, isHeader = false }: any) => (
    <View style={[customerStyles.tableRow, isHeader && customerStyles.tableHeader]}>
      <Text
        style={[
          customerStyles.tableCell,
          customerStyles.nameCell,
          isHeader && customerStyles.headerText,
        ]}
      >
        {isHeader ? "Name" : customer.customerName}
      </Text>
      <Text
        style={[
          customerStyles.tableCell,
          customerStyles.phoneCell,
          isHeader && customerStyles.headerText,
        ]}
      >
        {isHeader ? "Phone" : customer.phone}
      </Text>
      <Text
        style={[
          customerStyles.tableCell,
          customerStyles.cityCell,
          isHeader && customerStyles.headerText,
        ]}
      >
        {isHeader ? "City" : customer.city}
      </Text>
      <Text
        style={[
          customerStyles.tableCell,
          customerStyles.ordersCell,
          isHeader && customerStyles.headerText,
        ]}
      >
        {isHeader ? "Orders" : customer.totalOrders}
      </Text>
      <Text
        style={[
          customerStyles.tableCell,
          customerStyles.spentCell,
          isHeader && customerStyles.headerText,
        ]}
      >
        {isHeader ? "Spent" : formatCurrency(customer.totalSpent)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={customerStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={customerStyles.header}>
        <Text style={customerStyles.headerTitle}>Customers</Text>
      </View>
      {isLoading && <Loader />}
      <View style={customerStyles.controlsContainer}>
        <View style={customerStyles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={customerStyles.searchIcon}
          />
          <TextInput
            style={customerStyles.searchInput}
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

        <View style={customerStyles.viewToggle}>
          <TouchableOpacity style={[ customerStyles.toggleButton, viewMode === "cards" && customerStyles.activeToggle ]} onPress={() => setViewMode("cards")}>
            <Ionicons name="grid-outline" size={20} color={viewMode === "cards" ? "#007AFF" : "#666"} />
          </TouchableOpacity>
          <TouchableOpacity style={[ customerStyles.toggleButton, viewMode === "table" && customerStyles.activeToggle ]} onPress={() => setViewMode("table")}>
            <Ionicons name="list-outline" size={20} color={viewMode === "table" ? "#007AFF" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>

      {viewMode === "cards" ? (
        <FlatList
          data={filteredAndSortedCustomers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CustomerCard customer={item} />}
          contentContainerStyle={customerStyles.cardsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView style={customerStyles.tableContainer}>
          <TableRow isHeader />
          {ensureArray(filteredAndSortedCustomers)?.map((customer: any) => (
            <TableRow key={customer?._id} customer={customer} />
          ))}
        </ScrollView>
      )}

      {customer?.length > 0 && (<Pagination page={page} setPage={setPage} totalPages={totalPages} />)}
    </SafeAreaView>
  );
};

export default CustomerPage;