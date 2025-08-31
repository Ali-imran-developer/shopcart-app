import React from "react";
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Application from "expo-application";
import aboutAppStyles from "@/styles/settings/about-app";

export default function AboutApp() {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@yourapp.com');
  };

  const handleRateApp = () => {
    console.log("Rate app pressed");
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://yourapp.com/privacy');
  };

  const handleTermsOfService = () => {
    Linking.openURL('https://yourapp.com/terms');
  };

  return (
    <SafeAreaView style={aboutAppStyles.safeArea}>
      <ScrollView style={aboutAppStyles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={aboutAppStyles.container}>
          <View style={aboutAppStyles.header}>
            <View style={aboutAppStyles.logoContainer}>
              <Ionicons name="storefront" size={48} color="#6366F1" />
            </View>
            <Text style={aboutAppStyles.appName}>
              {Application.applicationName || "Ecommerce SaaS"}
            </Text>
            <Text style={aboutAppStyles.tagline}>
              Your Ultimate Shopping Companion
            </Text>
          </View>

          <View style={aboutAppStyles.descriptionCard}>
            <Text style={aboutAppStyles.descriptionTitle}>About This App</Text>
            <Text style={aboutAppStyles.description}>
              Experience seamless shopping with our cutting-edge ecommerce platform. 
              Designed for both customers and shippers, we provide powerful features 
              that make online shopping effortless and secure.
            </Text>
          </View>

          {/* App Information Cards */}
          <View style={aboutAppStyles.infoSection}>
            <Text style={aboutAppStyles.sectionTitle}>App Information</Text>
            
            <View style={aboutAppStyles.infoCard}>
              <View style={aboutAppStyles.infoRow}>
                <View style={aboutAppStyles.infoLabel}>
                  <Ionicons name="apps-outline" size={18} color="#6366F1" />
                  <Text style={aboutAppStyles.labelText}>Version</Text>
                </View>
                <Text style={aboutAppStyles.valueText}>
                  {Application.nativeApplicationVersion || "1.0.0"}
                </Text>
              </View>

              <View style={aboutAppStyles.divider} />

              <View style={aboutAppStyles.infoRow}>
                <View style={aboutAppStyles.infoLabel}>
                  <Ionicons name="build-outline" size={18} color="#6366F1" />
                  <Text style={aboutAppStyles.labelText}>Build</Text>
                </View>
                <Text style={aboutAppStyles.valueText}>
                  {Application.nativeBuildVersion || "1"}
                </Text>
              </View>

              <View style={aboutAppStyles.divider} />

              <View style={aboutAppStyles.infoRow}>
                <View style={aboutAppStyles.infoLabel}>
                  <Ionicons name="business-outline" size={18} color="#6366F1" />
                  <Text style={aboutAppStyles.labelText}>Developer</Text>
                </View>
                <Text style={aboutAppStyles.valueText}>Your Company Name</Text>
              </View>

              <View style={aboutAppStyles.divider} />

              <View style={aboutAppStyles.infoRow}>
                <View style={aboutAppStyles.infoLabel}>
                  <Ionicons name="calendar-outline" size={18} color="#6366F1" />
                  <Text style={aboutAppStyles.labelText}>Last Updated</Text>
                </View>
                <Text style={aboutAppStyles.valueText}>August 2025</Text>
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View style={aboutAppStyles.featuresSection}>
            <Text style={aboutAppStyles.sectionTitle}>Key Features</Text>
            
            <View style={aboutAppStyles.featuresList}>
              <View style={aboutAppStyles.featureItem}>
                <View style={aboutAppStyles.featureIcon}>
                  <Ionicons name="shield-checkmark" size={20} color="#10B981" />
                </View>
                <Text style={aboutAppStyles.featureText}>Secure Payment Processing</Text>
              </View>
              
              <View style={aboutAppStyles.featureItem}>
                <View style={aboutAppStyles.featureIcon}>
                  <Ionicons name="flash" size={20} color="#F59E0B" />
                </View>
                <Text style={aboutAppStyles.featureText}>Fast Order Processing</Text>
              </View>
              
              <View style={aboutAppStyles.featureItem}>
                <View style={aboutAppStyles.featureIcon}>
                  <Ionicons name="location" size={20} color="#EF4444" />
                </View>
                <Text style={aboutAppStyles.featureText}>Real-time Order Tracking</Text>
              </View>
              
              <View style={aboutAppStyles.featureItem}>
                <View style={aboutAppStyles.featureIcon}>
                  <Ionicons name="people" size={20} color="#8B5CF6" />
                </View>
                <Text style={aboutAppStyles.featureText}>Customer Support 24/7</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={aboutAppStyles.actionsSection}>
            <TouchableOpacity style={aboutAppStyles.actionButton} onPress={handleRateApp}>
              <Ionicons name="star" size={20} color="#F59E0B" />
              <Text style={aboutAppStyles.actionButtonText}>Rate This App</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={aboutAppStyles.actionButton} onPress={handleContactSupport}>
              <Ionicons name="headset" size={20} color="#6366F1" />
              <Text style={aboutAppStyles.actionButtonText}>Contact Support</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={aboutAppStyles.actionButton} onPress={handlePrivacyPolicy}>
              <Ionicons name="document-text" size={20} color="#10B981" />
              <Text style={aboutAppStyles.actionButtonText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={aboutAppStyles.actionButton} onPress={handleTermsOfService}>
              <Ionicons name="contract" size={20} color="#8B5CF6" />
              <Text style={aboutAppStyles.actionButtonText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={aboutAppStyles.footer}>
            <Text style={aboutAppStyles.footerText}>
              Made with ❤️ for seamless shopping experiences
            </Text>
            <Text style={aboutAppStyles.copyrightText}>
              © 2025 Your Company Name. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
