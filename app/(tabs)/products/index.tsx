import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { handleGetProducts, isLoading, productsData } = useProducts();
  const totalPages = productsData?.totalPages ?? 1;

  useEffect(() => {
    handleGetProducts({ page, limit, status: "active" }); 

  }, [page, limit]);

  return (
    <View style={styles.container}>
      {isLoading && <Loader text="Fetching products..." />}
      <View style={styles.header}>
        <Text style={styles.heading}>Products</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push("/products/create")}
        >
          <Text style={styles.btnText}>Create Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ensureArray(productsData?.products)}
        keyExtractor={(item) => item?._id ?? item?.id}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: "space-between", gap: 5, marginRight: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => router.push({ pathname: `/products/${item?._id}`as any, params: { product: JSON.stringify(item) }})}>
            <Image
              source={ item?.image && item.image.trim() !== "" ? { uri: item.image } : require("@/assets/images/placeholder.jpg")}
              style={styles.productImage}
              resizeMode="cover"
            />

            <Text style={styles.productName} numberOfLines={2}>
              {item?.name ?? ""}
            </Text>
            <Text style={styles.productPrice}>Rs. {item?.price ?? 0}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={page === 1}
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          <Feather
            name="arrow-left"
            size={24}
            color={page === 1 ? "#9ca3af" : "#2563eb"}
          />
        </TouchableOpacity>

        <Text style={styles.pageInfo}>
          Page {page} of {totalPages}
        </Text>

        <TouchableOpacity
          disabled={page >= totalPages}
          onPress={() => setPage((prev) => prev + 1)}
        >
          <Feather
            name="arrow-right"
            size={24}
            color={page >= totalPages ? "#9ca3af" : "#2563eb"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  createBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 15,
    marginHorizontal: 5,
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
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderColor: "#ccccccff",
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 140,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "600",
    color: "#575757ff",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 20,
    paddingLeft: 10,
    paddingBottom: 6,
    fontWeight: "700",
    color: "black",
  },
  pageInfo: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  limitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    // marginBottom: 12,
  },
  limitLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
  },
  picker: {
    height: 60,
    width: 100,
    paddingBottom: 10,
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 40,
  },
  pageBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  disabledBtn: {
    backgroundColor: "#9ca3af",
  },
  pageBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
