import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import termsConditionStyles from "@/styles/settings/terms-condition";
import { termsData } from "@/data/terms-conditions";

export default function TermsConditions() {

  return (
    <SafeAreaView style={termsConditionStyles.safeArea}>
      <ScrollView style={termsConditionStyles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={termsConditionStyles.header}>
          <View style={termsConditionStyles.iconContainer}>
            <Ionicons name="shield-checkmark" size={32} color="#3B82F6" />
          </View>
          <Text style={termsConditionStyles.title}>Terms & Conditions</Text>
          <Text style={termsConditionStyles.subtitle}>
            Please read these terms carefully before using our services
          </Text>
        </View>

        {/* Last Updated */}
        <View style={termsConditionStyles.lastUpdated}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={termsConditionStyles.lastUpdatedText}>
            Last updated: August 31, 2025
          </Text>
        </View>

        <View style={termsConditionStyles.introSection}>
          <Text style={termsConditionStyles.introText}>
            Welcome to our mobile application. These Terms and Conditions ("Terms") 
            govern your use of our app and services. By downloading, installing, or 
            using our app, you agree to comply with and be bound by these Terms.
          </Text>
        </View>

        {termsData?.map((section, index) => (
          <View key={index} style={termsConditionStyles.section}>
            <View style={termsConditionStyles.sectionHeader}>
              <View style={termsConditionStyles.numberBadge}>
                <Text style={termsConditionStyles.numberText}>{index + 1}</Text>
              </View>
              <Text style={termsConditionStyles.sectionTitle}>{section.title.substring(3)}</Text>
            </View>
            <Text style={termsConditionStyles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={termsConditionStyles.footer}>
          <View style={termsConditionStyles.footerDivider} />
          <View style={termsConditionStyles.footerContent}>
            <Ionicons name="information-circle" size={20} color="#3B82F6" />
            <Text style={termsConditionStyles.footerText}>
              These terms are effective as of the last updated date above and will 
              remain in effect except with respect to any changes in their provisions 
              in the future.
            </Text>
          </View>
          <Text style={termsConditionStyles.companyText}>
            © 2025 Your Company Name. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
