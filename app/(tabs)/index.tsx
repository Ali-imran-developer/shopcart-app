import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAuth } from '@/hooks/useAuth';
import { ensureArray, ensureObject } from '@/hooks/useFormater';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const Dashboard = () => {
  const { dashboardData, handledashboardData, loading } = useAuth();

  useEffect(() => {
    handledashboardData();

  }, [])

  const StatCard = ({ iconName, title, value, percentage, colors }: any) => (
    <View style={[styles.statCard, { backgroundColor: colors.bg }]}>
      <View style={styles.statCardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.icon }]}>
          <Feather name={iconName} size={20} color="white" />
        </View>
        <View style={[
          styles.percentageContainer,
          { backgroundColor: percentage >= 0 ? '#dcfce7' : '#fee2e2' }
        ]}>
          <Feather 
            name={percentage >= 0 ? 'arrow-up' : 'arrow-down'} 
            size={10} 
            color={percentage >= 0 ? '#16a34a' : '#dc2626'} 
          />
          <Text style={[
            styles.percentageText,
            { color: percentage >= 0 ? '#16a34a' : '#dc2626' }
          ]}>
            {Math.abs(percentage)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.statCardContent}>
        <Text style={styles.statValue}>{value.toLocaleString()}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const ProductCard = ({ product, totalSold }: any) => (
    <View style={styles.productCard}>
        <View style={styles.productContent}>
          <View style={styles.productImageContainer}>
            <Image 
              source={{ uri: product.image }} 
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productBadge}>
              <Feather name="star" size={8} color="white" />
            </View>
          </View>
          
          <View style={styles.productInfo}>
            <View style={styles.productHeader}>
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </View>
            
            <View style={styles.productFooter}>
              <View style={styles.productDetails}>
                <Text style={styles.productPrice}>${product.price}</Text>
                <View style={styles.stockContainer}>
                  <Feather name="package" size={10} color="#6b7280" />
                  <Text style={styles.stockText}>{product.stock}</Text>
                </View>
              </View>
              <View style={styles.soldBadge}>
                <Text style={styles.soldText}>{totalSold} sold</Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  );

  const LoadingCard = () => (
    <View style={styles.loadingCard}>
      <View style={styles.loadingHeader}>
        <View style={styles.loadingIcon} />
        <View style={styles.loadingPercentage} />
      </View>
      <View style={styles.loadingContent}>
        <View style={styles.loadingValue} />
        <View style={styles.loadingTitle} />
      </View>
    </View>
  );

  const chartData = {
    labels: ["Orders", "Sales", "Revenue"],
    datasets: [
      {
        data: ensureObject(dashboardData) ? [
          dashboardData?.newOrders?.todayOrders ?? 0,
          dashboardData?.totalSales?.totalSales / 1000,
          dashboardData?.totalRevenue?.totalRevenue / 1000
        ] : [0, 0, 0]
      }
    ]
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.loadingTitle} />
              <View style={styles.loadingSubtitle} />
            </View>
            <View style={styles.loadingHeaderIcon} />
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </View>

          {/* Loading indicator */}
          <ActivityIndicator size="large" color="#8b5cf6" style={styles.loader} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <View style={styles.dateContainer}>
              <Feather name="calendar" size={12} color="#6b7280" />
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="bar-chart-2" size={16} color="white" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            iconName="shopping-cart"
            title="New Orders Today"
            value={dashboardData?.newOrders?.todayOrders ?? {}}
            percentage={dashboardData?.newOrders?.totalPercentage ?? {}}
            colors={{
              bg: '#dbeafe',
              icon: '#3b82f6'
            }}
          />
          
          <StatCard
            iconName="trending-up"
            title="Total Sales"
            value={dashboardData?.totalSales?.totalSales ?? 0}
            percentage={dashboardData?.totalSales?.totalPercentage ?? 0}
            colors={{
              bg: '#dcfce7',
              icon: '#22c55e'
            }}
          />
          
          <StatCard
            iconName="dollar-sign"
            title="Total Revenue"
            value={dashboardData?.totalRevenue?.totalRevenue ?? 0}
            percentage={dashboardData?.totalRevenue?.totalPercentage ?? 0}
            colors={{
              bg: '#f3e8ff',
              icon: '#8b5cf6'
            }}
          />
        </View>

        {/* Charts Section */}
        <View style={styles.chartsSection}>
          <Text style={styles.sectionTitle}>Analytics Overview</Text>
          
          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Current Stats</Text>
            <BarChart
              data={chartData}
              width={width - 48}
              height={180}
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: '#f3f4f6',
                },
              }}
              yAxisLabel=""
              yAxisSuffix=""
              style={styles.chart}
            />
          </View>

          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Monthly Trend</Text>
            <LineChart
              data={lineChartData}
              width={width - 48}
              height={180}
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#8b5cf6"
                }
              }}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        <View style={styles.topProductsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Products</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={() => router.push("/(tabs)/products")}>
              <Text style={styles.viewAllText}>View All</Text>
              <Feather name="eye" size={12} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsContainer}>
            {ensureArray(dashboardData?.topProducts)?.map((item: any, index: number) => (
              <ProductCard
                key={item.product?._id ?? index}
                product={item?.product}
                totalSold={item?.totalSold}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#8b5cf6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  statCardContent: {
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  chartsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 16,
  },
  topProductsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3b82f6',
    marginRight: 4,
  },
  productsContainer: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f3f4f6',
  },
  productBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    backgroundColor: '#8b5cf6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    gap: 8,
  },
  productHeader: {
    gap: 4,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 16,
  },
  productCategory: {
    fontSize: 10,
    color: '#6b7280',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stockText: {
    fontSize: 10,
    color: '#6b7280',
  },
  soldBadge: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  soldText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  // Loading styles
  loadingCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 20,
  },
  loadingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  loadingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5db',
    borderRadius: 12,
  },
  loadingPercentage: {
    width: 48,
    height: 20,
    backgroundColor: '#d1d5db',
    borderRadius: 10,
  },
  loadingContent: {
    gap: 8,
  },
  loadingValue: {
    width: 60,
    height: 24,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  loadingTitle: {
    width: 80,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
  },
  loadingSubtitle: {
    width: 120,
    height: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 4,
    marginTop: 4,
  },
  loadingHeaderIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5db',
    borderRadius: 20,
  },
  loader: {
    marginTop: 32,
  },
});

export default Dashboard;