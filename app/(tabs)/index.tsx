import { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useAuth } from '@/hooks/useAuth';
import { ensureArray, ensureObject } from '@/hooks/useFormater';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import dashboardStyles from '@/styles/dashboard';

const { width } = Dimensions.get('window');
const Dashboard = () => {
  const { handledashboardData, loading } = useAuth();
  const { dashboardData } = useSelector((state: RootState) => state.Dashboard);

  useEffect(() => {
    handledashboardData();

  }, [])

  const StatCard = ({ iconName, title, value, percentage, colors }: any) => (
    <View style={[dashboardStyles.statCard, { backgroundColor: colors.bg }]}>
      <View style={dashboardStyles.statCardHeader}>
        <View style={[dashboardStyles.iconContainer, { backgroundColor: colors.icon }]}>
          <Feather name={iconName} size={20} color="white" />
        </View>
        <View style={[
          dashboardStyles.percentageContainer,
          { backgroundColor: percentage >= 0 ? '#dcfce7' : '#fee2e2' }
        ]}>
          <Feather 
            name={percentage >= 0 ? 'arrow-up' : 'arrow-down'} 
            size={10} 
            color={percentage >= 0 ? '#16a34a' : '#dc2626'} 
          />
          <Text style={[
            dashboardStyles.percentageText,
            { color: percentage >= 0 ? '#16a34a' : '#dc2626' }
          ]}>
            {Math.abs(percentage)}%
          </Text>
        </View>
      </View>
      
      <View style={dashboardStyles.statCardContent}>
        <Text style={dashboardStyles.statValue}>{value.toLocaleString()}</Text>
        <Text style={dashboardStyles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const ProductCard = ({ product, totalSold }: any) => (
    <View style={dashboardStyles.productCard}>
        <View style={dashboardStyles.productContent}>
          <View style={dashboardStyles.productImageContainer}>
            <Image 
              source={{ uri: product.image }} 
              style={dashboardStyles.productImage}
              resizeMode="cover"
            />
            <View style={dashboardStyles.productBadge}>
              <Feather name="star" size={8} color="white" />
            </View>
          </View>
          
          <View style={dashboardStyles.productInfo}>
            <View style={dashboardStyles.productHeader}>
              <Text style={dashboardStyles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={dashboardStyles.productCategory}>{product.category}</Text>
            </View>
            
            <View style={dashboardStyles.productFooter}>
              <View style={dashboardStyles.productDetails}>
                <Text style={dashboardStyles.productPrice}>${product.price}</Text>
                <View style={dashboardStyles.stockContainer}>
                  <Feather name="package" size={10} color="#6b7280" />
                  <Text style={dashboardStyles.stockText}>{product.stock}</Text>
                </View>
              </View>
              <View style={dashboardStyles.soldBadge}>
                <Text style={dashboardStyles.soldText}>{totalSold} sold</Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  );

  const LoadingCard = () => (
    <View style={dashboardStyles.loadingCard}>
      <View style={dashboardStyles.loadingHeader}>
        <View style={dashboardStyles.loadingIcon} />
        <View style={dashboardStyles.loadingPercentage} />
      </View>
      <View style={dashboardStyles.loadingContent}>
        <View style={dashboardStyles.loadingValue} />
        <View style={dashboardStyles.loadingTitle} />
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
      <ScrollView style={dashboardStyles.container}>
        <View style={dashboardStyles.content}>
          {/* Header */}
          <View style={dashboardStyles.header}>
            <View>
              <View style={dashboardStyles.loadingTitle} />
              <View style={dashboardStyles.loadingSubtitle} />
            </View>
            <View style={dashboardStyles.loadingHeaderIcon} />
          </View>

          {/* Stats Cards */}
          <View style={dashboardStyles.statsContainer}>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </View>

          {/* Loading indicator */}
          <ActivityIndicator size="large" color="#8b5cf6" style={dashboardStyles.loader} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={dashboardStyles.container} showsVerticalScrollIndicator={false}>
      <View style={dashboardStyles.content}>
        {/* Header */}
        <View style={dashboardStyles.header}>
          <View>
            <Text style={dashboardStyles.headerTitle}>Dashboard</Text>
            <View style={dashboardStyles.dateContainer}>
              <Feather name="calendar" size={12} color="#6b7280" />
              <Text style={dashboardStyles.dateText}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
          </View>
          <View style={dashboardStyles.headerIcon}>
            <Feather name="bar-chart-2" size={16} color="white" />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={dashboardStyles.statsContainer}>
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
        <View style={dashboardStyles.chartsSection}>
          <Text style={dashboardStyles.sectionTitle}>Analytics Overview</Text>
          
          {/* Bar Chart */}
          <View style={dashboardStyles.chartContainer}>
            <Text style={dashboardStyles.chartTitle}>Current Stats</Text>
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
              style={dashboardStyles.chart}
            />
          </View>

          <View style={dashboardStyles.chartContainer}>
            <Text style={dashboardStyles.chartTitle}>Monthly Trend</Text>
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
              style={dashboardStyles.chart}
            />
          </View>
        </View>

        <View style={dashboardStyles.topProductsSection}>
          <View style={dashboardStyles.sectionHeader}>
            <Text style={dashboardStyles.sectionTitle}>Top Products</Text>
            <TouchableOpacity style={dashboardStyles.viewAllButton} onPress={() => router.push("/(tabs)/products")}>
              <Text style={dashboardStyles.viewAllText}>View All</Text>
              <Feather name="eye" size={12} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          
          <View style={dashboardStyles.productsContainer}>
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
}

export default Dashboard;