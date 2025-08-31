import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Animated,
  Platform
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const ProductDetail = () => {
  const { product } = useLocalSearchParams();
  const parsedProduct = product ? JSON.parse(product as string) : null;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const getStockStatus = (stock: number) => {
    if (stock > 50) return { status: 'In Stock', color: '#10b981', bgColor: '#d1fae5' };
    if (stock > 10) return { status: 'Limited Stock', color: '#f59e0b', bgColor: '#fef3c7' };
    if (stock > 0) return { status: 'Low Stock', color: '#ef4444', bgColor: '#fee2e2' };
    return { status: 'Out of Stock', color: '#6b7280', bgColor: '#f3f4f6' };
  };

  const stockInfo = getStockStatus(parsedProduct?.stock);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView  style={styles.container} showsVerticalScrollIndicator={false} scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}>
        <View style={styles.imageContainer}>
          <Image
            source={parsedProduct?.image ? { uri: parsedProduct?.image } : require("@/assets/images/placeholder.jpg")}
            style={styles.productImage}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="image" size={48} color="#d1d5db" />
            </View>
          )}
          
          <View style={styles.imageGradient} />
          <TouchableOpacity style={styles.floatingBackBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favoriteBtn}>
            <Feather name="heart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.productName}>{parsedProduct?.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>Rs. {parsedProduct?.price?.toLocaleString()}</Text>
              <Text style={styles.originalPrice}>Rs. {(parsedProduct?.price * 1.2)?.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.ratingSection}>
            <View style={styles.stars}>
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
            <Text style={styles.ratingText}>4.2 (128 reviews)</Text>
          </View>

          <View style={[styles.stockBadge, { backgroundColor: stockInfo.bgColor }]}>
            <MaterialIcons 
              name={parsedProduct?.stock > 0 ? "check-circle" : "error"} 
              size={16} 
              color={stockInfo.color} 
            />
            <Text style={[styles.stockText, { color: stockInfo.color }]}>
              {stockInfo.status}
            </Text>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailCard}>
              <MaterialIcons name="inventory" size={20} color="#6366f1" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Available Stock</Text>
                <Text style={styles.detailValue}>{parsedProduct?.available} units</Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="category" size={20} color="#10b981" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{parsedProduct?.category}</Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <MaterialIcons name="label" size={20} color="#f59e0b" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Sub-Category</Text>
                <Text style={styles.detailValue}>{parsedProduct?.subCategory}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Product Description</Text>
            <Text style={styles.productDescription}>
              {parsedProduct?.description ?? 
                "Experience premium quality with this carefully crafted product. Made with attention to detail and designed to exceed your expectations. Perfect for daily use and built to last."}
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {['Premium Quality Materials', 'Durable Construction', 'Stylish Design', 'Great Value'].map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <MaterialIcons name="check-circle" size={20} color="#10b981" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.addToCartBtn}>
            <Feather name="shopping-cart" size={20} color="#6366f1" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buyNowBtn} 
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
            <Text style={styles.buyNowText}>Buy Now</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  floatingBackBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + 10,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: width * 0.8,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  favoriteBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : (StatusBar.currentHeight || 0) + 10,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 32,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6366f1',
  },
  originalPrice: {
    fontSize: 18,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },

  // Rating Section
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Stock Badge
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
    gap: 6,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailsSection: {
    marginBottom: 25,
    gap: 12,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e2e8f0',
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    marginTop: 2,
  },

  // Description Section
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },

  // Features Section
  featuresSection: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },

  // Bottom Bar
  bottomBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  buyNowBtn: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
