import Loader from "@/components/Loader";
import { ensureArray } from "@/hooks/useFormater";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import productStyles from "@/styles/products";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Products = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { handleGetProducts, isLoading } = useProducts();
  const { products, totalPages } = useSelector((state: RootState) => state.Products);

  useEffect(() => {
    handleGetProducts({ page, limit, status: "active" }); 

  }, [page, limit]);

  return (
    <View style={productStyles.container}>
      {isLoading && <Loader />}
      <View style={productStyles.header}>
        <Text style={productStyles.heading}>Products</Text>
        <TouchableOpacity style={productStyles.createBtn} onPress={() => router.push("/products/create")}>
          <Text style={productStyles.btnText}>Create Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ensureArray(products)}
        keyExtractor={(item) => item?._id}
        numColumns={2} 
        columnWrapperStyle={{ justifyContent: "space-between", gap: 5, marginRight: 15 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={productStyles.productCard} onPress={() => router.push({ pathname: `/products/${item?._id}`as any, params: { product: JSON.stringify(item) }})}>
            <Image style={productStyles.productImage} resizeMode="cover"
              source={ item?.image && item.image.trim() !== "" ? { uri: item.image } : require("@/assets/images/placeholder.jpg")}
            />
            <Text style={productStyles.productName} numberOfLines={2}>
              {item?.name ?? ""}
            </Text>
            <Text style={productStyles.productPrice}>Rs. {item?.price ?? 0}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {products?.length > 0 && (<Pagination page={page} setPage={setPage} totalPages={totalPages} />)}
    </View>
  );
};

export default Products;