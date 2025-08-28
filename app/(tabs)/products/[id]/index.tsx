import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useProducts } from "@/hooks/useProducts";
import Loader from "@/components/Loader";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const { handleGetProducts, isLoading, productsData } = useProducts();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      await handleGetProducts({ page: 1, limit: 100, status: "active" });
      const found = productsData?.products?.find((p: any) => p?._id === id);
      setProduct(found)
    };

    fetchProduct();
  }, [id]);

  if (isLoading || !product) return <Loader text="Loading product details..." />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#2563eb" />
        </TouchableOpacity>

        <Image
          source={product?.image ? { uri: product?.image } : require("@/assets/images/placeholder.jpg")}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.detailContainer}>
          <Text style={styles.productName}>{product?.name}</Text>
          <Text style={styles.productPrice}>Rs. {product?.price}</Text>
          
          <View style={styles.stockRow}>
            <Text style={styles.productStock}>Stock: {product?.stock}</Text>
            <Text style={styles.productAvailable}>Available: {product?.available}</Text>
          </View>

          <View style={styles.categoryRow}>
            <Text style={styles.category}>Category: {product?.category}</Text>
            <Text style={styles.subCategory}>SubCategory: {product?.subCategory}</Text>
          </View>

          <Text style={styles.productDescription}>
            {product?.description ?? "No description available."}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.buyBtn} onPress={() => router.push({ pathname: "/orders/create", params: { productId: product._id, price: product.price, name: product.name, logo: product?.image }})}>
        <Text style={styles.buyBtnText}>Buy Now</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  scrollContainer: { flex: 1 },
  backBtn: {
    margin: 15,
    padding: 6,
    borderRadius: 50,
    backgroundColor: "#f3f4f6",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: { width: width, height: width },
  detailContainer: { padding: 20 },
  productName: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 8 },
  productPrice: { fontSize: 24, fontWeight: "600", color: "#2563eb", marginBottom: 12 },
  stockRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  productStock: { fontSize: 16, color: "#111827" },
  productAvailable: { fontSize: 16, color: "#16a34a", fontWeight: "500" },
  categoryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  category: { fontSize: 16, color: "#6b7280" },
  subCategory: { fontSize: 16, color: "#6b7280" },
  productDescription: { fontSize: 16, color: "#4b5563", lineHeight: 22, marginBottom: 100 },
  buyBtn: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 5,
  },
  buyBtnText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});

