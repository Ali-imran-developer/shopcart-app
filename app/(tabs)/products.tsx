// app/(tabs)/products.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const products = [
  {
    id: "1",
    name: "Nike Air Max",
    price: 120,
    discount: "10%",
    description: "Comfortable running shoes with stylish design.",
    tags: ["Shoes", "Running", "Men"],
    colors: ["Red", "Black", "White"],
    variants: ["US 8", "US 9", "US 10"],
    images: [
      require("@/assets/images/product-images/shoes-image1.jpeg"),
      require("@/assets/images/product-images/shoes-image2.jpeg"),
      require("@/assets/images/product-images/shoes-image3.jpeg"),
    ],
  },
  {
    id: "2",
    name: "Apple Watch Series 8",
    price: 399,
    discount: "5%",
    description: "Smartwatch with health and fitness tracking.",
    tags: ["Watch", "Smart", "Apple"],
    colors: ["Black", "Silver", "Gold"],
    variants: ["41mm", "45mm"],
    images: [require("@/assets/images/product-images/apple-watch.jpeg")],
  },
  {
    id: "3",
    name: "Adidas T-Shirt",
    price: 35,
    discount: "20%",
    description: "Breathable sports T-shirt for everyday use.",
    tags: ["Clothing", "Sports"],
    colors: ["Blue", "White", "Grey"],
    variants: ["S", "M", "L", "XL"],
    images: [require("@/assets/images/product-images/adidas-shirt.jpg")],
  },
  {
    id: "4",
    name: "Sony WH-1000XM5",
    price: 299,
    discount: "15%",
    description: "Noise-cancelling wireless headphones.",
    tags: ["Headphones", "Sony"],
    colors: ["Black", "Silver"],
    variants: ["Standard"],
    images: [require("@/assets/images/product-images/headphones.jpeg")],
  },
];

const summaryCards = [
  { id: "1", title: "Total Products", value: "120+" },
  { id: "2", title: "Low Stock", value: "15" },
];

const Products = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <View style={styles.summaryContainer}>
        {summaryCards.map((card) => (
          <View key={card.id} style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>{card.title}</Text>
            <Text style={styles.summaryValue}>{card.value}</Text>
          </View>
        ))}
      </View>

      {/* Product List - one product per row */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            {/* Product Image or Slider */}
            {item.images.length > 1 ? (
              <FlatList
                data={item.images}
                keyExtractor={(img, idx) => idx.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: img }) => (
                  <Image source={img} style={styles.productImage} />
                )}
              />
            ) : (
              <Image source={item.images[0]} style={styles.productImage} />
            )}

            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productDiscount}>Discount: {item.discount}</Text>
            <Text style={styles.productDesc}>{item.description}</Text>

            <Text style={styles.subTitle}>Tags:</Text>
            <Text style={styles.detailText}>{item.tags.join(", ")}</Text>

            <Text style={styles.subTitle}>Colors:</Text>
            <Text style={styles.detailText}>{item.colors.join(", ")}</Text>

            <Text style={styles.subTitle}>Variants:</Text>
            <Text style={styles.detailText}>{item.variants.join(", ")}</Text>
          </View>
        )}
      />
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 15,
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
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: width * 0.9,
    height: 180,
    objectFit: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563eb",
  },
  productDiscount: {
    fontSize: 13,
    color: "#16a34a",
    marginBottom: 5,
  },
  productDesc: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  detailText: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
});
