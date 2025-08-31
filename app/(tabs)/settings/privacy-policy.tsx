import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { privacySections, quickActions } from "@/data/privacy-policy";
import privacyPolicyStyles from "@/styles/settings/privacy-policy";

export default function PrivacyPolicy() {
  const [expandedSections, setExpandedSections] = useState<any>({});

  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 1, 2025";

  const toggleSection = (sectionId: any) => {
    setExpandedSections((prev: any) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <ScrollView style={privacyPolicyStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={privacyPolicyStyles.header}>
        <View style={privacyPolicyStyles.headerIconContainer}>
          <Ionicons name="shield-checkmark" size={36} color="#3B82F6" />
        </View>
        <Text style={privacyPolicyStyles.title}>Privacy Policy</Text>
        <Text style={privacyPolicyStyles.subtitle}>Your privacy matters to us</Text>
        <View style={privacyPolicyStyles.dateContainer}>
          <Text style={privacyPolicyStyles.dateText}>Last updated: {lastUpdated}</Text>
          <Text style={privacyPolicyStyles.dateText}>Effective: {effectiveDate}</Text>
        </View>
      </View>

      {/* Key Highlights */}
      <View style={privacyPolicyStyles.highlightsContainer}>
        <Text style={privacyPolicyStyles.highlightsTitle}>Key Privacy Highlights</Text>
        <View style={privacyPolicyStyles.highlightsList}>
          <View style={privacyPolicyStyles.highlightItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={privacyPolicyStyles.highlightText}>
              We never sell your personal data
            </Text>
          </View>
          <View style={privacyPolicyStyles.highlightItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={privacyPolicyStyles.highlightText}>
              You control your data and privacy settings
            </Text>
          </View>
          <View style={privacyPolicyStyles.highlightItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={privacyPolicyStyles.highlightText}>
              Bank-level encryption protects your information
            </Text>
          </View>
          <View style={privacyPolicyStyles.highlightItem}>
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
            <Text style={privacyPolicyStyles.highlightText}>
              Transparent about data collection and usage
            </Text>
          </View>
        </View>
      </View>

      {/* Privacy Sections */}
      <View style={privacyPolicyStyles.sectionsContainer}>
        {privacySections?.map((section) => {
          const isExpanded = expandedSections[section.id];

          return (
            <View key={section.id} style={privacyPolicyStyles.sectionCard}>
              <TouchableOpacity
                style={privacyPolicyStyles.sectionHeader}
                onPress={() =>
                  section.isExpandable && toggleSection(section.id)
                }
                disabled={!section.isExpandable}
              >
                <View style={privacyPolicyStyles.sectionHeaderLeft}>
                  <View
                    style={[
                      privacyPolicyStyles.sectionIcon,
                      { backgroundColor: `${section.color}15` },
                    ]}
                  >
                    <Ionicons
                      name={section.icon as any}
                      size={22}
                      color={section.color}
                    />
                  </View>
                  <Text style={privacyPolicyStyles.sectionTitle}>{section.title}</Text>
                </View>
                {section.isExpandable && (
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#6B7280"
                  />
                )}
              </TouchableOpacity>

              {(!section.isExpandable || isExpanded) && (
                <View style={privacyPolicyStyles.sectionContent}>
                  <Text style={privacyPolicyStyles.sectionText}>{section.content}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={privacyPolicyStyles.actionsContainer}>
        <Text style={privacyPolicyStyles.actionsTitle}>Privacy Actions</Text>
        <Text style={privacyPolicyStyles.actionsSubtitle}>Manage your privacy and data</Text>

        {quickActions?.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={privacyPolicyStyles.actionItem}
            onPress={action.action}
          >
            <View style={privacyPolicyStyles.actionIconContainer}>
              <Ionicons name={action.icon as any} size={22} color="#3B82F6" />
            </View>
            <View style={privacyPolicyStyles.actionTextContainer}>
              <Text style={privacyPolicyStyles.actionTitle}>{action.title}</Text>
              <Text style={privacyPolicyStyles.actionSubtitle}>{action.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Information */}
      <View style={privacyPolicyStyles.contactContainer}>
        <View style={privacyPolicyStyles.contactHeader}>
          <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
          <Text style={privacyPolicyStyles.contactTitle}>Questions about Privacy?</Text>
        </View>
        <Text style={privacyPolicyStyles.contactText}>
          If you have any questions about this Privacy Policy or our data
          practices, please don't hesitate to contact our privacy team.
        </Text>
        <View style={privacyPolicyStyles.contactMethods}>
          <View style={privacyPolicyStyles.contactMethod}>
            <Ionicons name="mail-outline" size={18} color="#3B82F6" />
            <Text style={privacyPolicyStyles.contactMethodText}>privacy@yourapp.com</Text>
          </View>
          <View style={privacyPolicyStyles.contactMethod}>
            <Ionicons name="call-outline" size={18} color="#3B82F6" />
            <Text style={privacyPolicyStyles.contactMethodText}>+1 (555) 123-4567</Text>
          </View>
          <View style={privacyPolicyStyles.contactMethod}>
            <Ionicons name="location-outline" size={18} color="#3B82F6" />
            <Text style={privacyPolicyStyles.contactMethodText}>
              123 Privacy St, Security City, SC 12345
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={privacyPolicyStyles.footer}>
        <Text style={privacyPolicyStyles.footerText}>
          This Privacy Policy is part of our Terms of Service and governs your
          use of our application. For the most current version, please check
          this page regularly.
        </Text>
      </View>
    </ScrollView>
  );
}
