import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { getStockStatus } from "@/hooks/useFormater";
import productDetailStyles from "@/styles/products/product-detail";

const ProductDetail = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct = product ? JSON.parse(product as string) : null;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const stockInfo = getStockStatus(parsedProduct?.stock);

  return (
    <SafeAreaView style={productDetailStyles.safeArea}>
      <ScrollView  style={productDetailStyles.container} showsVerticalScrollIndicator={false} scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}>
        <View style={productDetailStyles.imageContainer}>
          <Image
            source={parsedProduct?.image ? { uri: parsedProduct?.image } : require("@/assets/images/placeholder.jpg")}
            style={productDetailStyles.productImage}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <View style={productDetailStyles.imagePlaceholder}>
              <MaterialIcons name="image" size={48} color="#d1d5db" />
            </View>
          )}
          
          <View style={productDetailStyles.imageGradient} />
          <TouchableOpacity style={productDetailStyles.floatingBackBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={productDetailStyles.favoriteBtn}>
            <Feather name="heart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={productDetailStyles.contentContainer}>
          <View style={productDetailStyles.titleSection}>
            <Text style={productDetailStyles.productName}>{parsedProduct?.name}</Text>
            <View style={productDetailStyles.priceContainer}>
              <Text style={productDetailStyles.productPrice}>Rs. {parsedProduct?.price?.toLocaleString()}</Text>
              <Text style={productDetailStyles.originalPrice}>Rs. {(parsedProduct?.price * 1.2)?.toLocaleString()}</Text>
            </View>
          </View>

          <View style={productDetailStyles.ratingSection}>
            <View style={productDetailStyles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Feather 
                  key={star} 
                  name="star" 
                  size={16} 
                  color={star <= 4 ? "#fbbf24" : "#e5e7eb"} 
                  fill={star <= 4 ? "#fbbf24" : "transparent"}
                />
              ))}
            </View>
            <Text style={productDetailStyles.ratingText}>4.2 (128 reviews)</Text>
          </View>

          <View style={[productDetailStyles.stockBadge, { backgroundColor: stockInfo.bgColor }]}>
            <MaterialIcons 
              name={parsedProduct?.stock > 0 ? "check-circle" : "error"} 
              size={16} 
              color={stockInfo.color} 
            />
            <Text style={[productDetailStyles.stockText, { color: stockInfo.color }]}>
              {stockInfo.status}
            </Text>
          </View>

          <View style={productDetailStyles.detailsSection}>
            <View style={productDetailStyles.detailCard}>
              <MaterialIcons name="inventory" size={20} color="#6366f1" />
              <View style={productDetailStyles.detailContent}>
                <Text style={productDetailStyles.detailLabel}>Available Stock</Text>
                <Text style={productDetailStyles.detailValue}>{parsedProduct?.available} units</Text>
              </View>
            </View>

            <View style={productDetailStyles.detailCard}>
              <MaterialIcons name="category" size={20} color="#10b981" />
              <View style={productDetailStyles.detailContent}>
                <Text style={productDetailStyles.detailLabel}>Category</Text>
                <Text style={productDetailStyles.detailValue}>{parsedProduct?.category}</Text>
              </View>
            </View>

            <View style={productDetailStyles.detailCard}>
              <MaterialIcons name="label" size={20} color="#f59e0b" />
              <View style={productDetailStyles.detailContent}>
                <Text style={productDetailStyles.detailLabel}>Sub-Category</Text>
                <Text style={productDetailStyles.detailValue}>{parsedProduct?.subCategory}</Text>
              </View>
            </View>
          </View>

          <View style={productDetailStyles.descriptionSection}>
            <Text style={productDetailStyles.sectionTitle}>Product Description</Text>
            <Text style={productDetailStyles.productDescription}>
              {parsedProduct?.description ?? 
                "Experience premium quality with this carefully crafted product. Made with attention to detail and designed to exceed your expectations. Perfect for daily use and built to last."}
            </Text>
          </View>

          <View style={productDetailStyles.featuresSection}>
            <Text style={productDetailStyles.sectionTitle}>Key Features</Text>
            {['Premium Quality Materials', 'Durable Construction', 'Stylish Design', 'Great Value'].map((feature, index) => (
              <View key={index} style={productDetailStyles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#10b981" />
                <Text style={productDetailStyles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={productDetailStyles.bottomBar}>
        <View style={productDetailStyles.actionRow}>
          <TouchableOpacity style={productDetailStyles.addToCartBtn}>
            <Feather name="shopping-cart" size={20} color="#6366f1" />
            <Text style={productDetailStyles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={productDetailStyles.buyNowBtn} 
            onPress={() => router.push({ 
              pathname: "/orders/create", 
              params: { 
                productId: parsedProduct?._id, 
                price: parsedProduct?.price, 
                name: parsedProduct?.name, 
                logo: parsedProduct?.image 
              }
            })}
          >
            <Text style={productDetailStyles.buyNowText}>Buy Now</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;