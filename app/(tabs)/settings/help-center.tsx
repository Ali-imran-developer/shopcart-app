import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import helpCenterStyles from "@/styles/settings/help-center";
import { contactOptions, helpCategories } from "@/data/help-center";

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<any>({});

  const toggleExpanded = (categoryId: any, itemIndex: number) => {
    const key = `${categoryId}-${itemIndex}`;
    setExpandedItems((prev: any) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = helpCategories?.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <ScrollView style={helpCenterStyles.container} showsVerticalScrollIndicator={false}>
      <View style={helpCenterStyles.header}>
        <View style={helpCenterStyles.headerIcon}>
          <Ionicons name="help-circle" size={32} color="#3B82F6" />
        </View>
        <Text style={helpCenterStyles.title}>Help Center</Text>
        <Text style={helpCenterStyles.subtitle}>Find answers to common questions</Text>
      </View>

      {/* Search Bar */}
      <View style={helpCenterStyles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={helpCenterStyles.searchIcon} />
        <TextInput
          style={helpCenterStyles.searchInput}
          placeholder="Search for help..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* FAQ Categories */}
      <View style={helpCenterStyles.categoriesContainer}>
        {(searchQuery ? filteredCategories : helpCategories).map((category) => (
          <View key={category.id} style={helpCenterStyles.categoryCard}>
            <View style={helpCenterStyles.categoryHeader}>
              <View style={[helpCenterStyles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
                <Ionicons name={category.icon as any} size={24} color={category.color} />
              </View>
              <Text style={helpCenterStyles.categoryTitle}>{category.title}</Text>
            </View>

            {category.items.map((item, index) => {
              const key = `${category.id}-${index}`;
              const isExpanded = expandedItems[key];

              return (
                <TouchableOpacity
                  key={index}
                  style={helpCenterStyles.faqItem}
                  onPress={() => toggleExpanded(category.id, index)}
                >
                  <View style={helpCenterStyles.questionContainer}>
                    <Text style={helpCenterStyles.question}>{item.question}</Text>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#6B7280"
                    />
                  </View>
                  {isExpanded && (
                    <View style={helpCenterStyles.answerContainer}>
                      <Text style={helpCenterStyles.answer}>{item.answer}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      <View style={helpCenterStyles.contactSection}>
        <Text style={helpCenterStyles.contactTitle}>Still need help?</Text>
        <Text style={helpCenterStyles.contactSubtitle}>Our support team is here to assist you</Text>
        
        <View style={helpCenterStyles.contactOptions}>
          {contactOptions?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={helpCenterStyles.contactOption}
              onPress={option.action}
            >
              <View style={helpCenterStyles.contactIconContainer}>
                <Ionicons name={option.icon as any} size={24} color="#3B82F6" />
              </View>
              <View style={helpCenterStyles.contactTextContainer}>
                <Text style={helpCenterStyles.contactOptionTitle}>{option.title}</Text>
                <Text style={helpCenterStyles.contactOptionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={helpCenterStyles.footer}>
        <Text style={helpCenterStyles.footerText}>
          Need immediate assistance? Check our status page or contact emergency support.
        </Text>
      </View>
    </ScrollView>
  );
}
