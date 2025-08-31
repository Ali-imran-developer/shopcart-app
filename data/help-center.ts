import { Linking } from "react-native";

export const helpCategories = [
  {
    id: "orders",
    title: "Orders & Shipping",
    icon: "cube-outline",
    color: "#3B82F6",
    items: [
      {
        question: "How do I track my order?",
        answer:
          "Go to 'Orders' in the app to track your package in real-time. You'll receive updates at every stage of delivery including pickup, transit, and delivery confirmation.",
      },
      {
        question: "How do I change my shipping address?",
        answer:
          "Navigate to 'Profile' → 'Shipping Info' and update your address. Note: You can only change the address before the order is dispatched.",
      },
      {
        question: "What are your shipping times?",
        answer:
          "Standard delivery: 3-5 business days. Express delivery: 1-2 business days. Same-day delivery available in select cities.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be cancelled within 1 hour of placement. After that, please contact our support team for assistance.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    icon: "person-outline",
    color: "#10B981",
    items: [
      {
        question: "How do I reset my password?",
        answer:
          "Tap 'Forgot Password' on the login screen, enter your email, and follow the reset instructions sent to your inbox.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          "Go to 'Profile' in the app menu, tap 'Edit Profile', and update your personal information, contact details, or preferences.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, go to 'Profile' → 'Account Settings' → 'Delete Account'. Note: This action is irreversible and will remove all your data.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Navigate to 'Profile' → 'Security Settings' → 'Two-Factor Authentication' and follow the setup instructions.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Billing",
    icon: "card-outline",
    color: "#F59E0B",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers.",
      },
      {
        question: "How do I add or remove payment methods?",
        answer:
          "Go to 'Profile' → 'Payment Methods' to add new cards or remove existing ones. Your default payment method can also be changed here.",
      },
      {
        question: "When will I be charged?",
        answer:
          "Payment is processed immediately after order confirmation. For pre-orders, payment is charged when the item ships.",
      },
      {
        question: "How do refunds work?",
        answer:
          "Refunds are processed within 5-7 business days to your original payment method. You'll receive an email confirmation once processed.",
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Support",
    icon: "settings-outline",
    color: "#8B5CF6",
    items: [
      {
        question: "The app keeps crashing, what should I do?",
        answer:
          "Try force-closing and reopening the app. If the issue persists, restart your device or update to the latest app version from the app store.",
      },
      {
        question: "I'm not receiving notifications",
        answer:
          "Check your device settings to ensure notifications are enabled for our app. Also verify notification preferences in 'Profile' → 'Notification Settings'.",
      },
      {
        question: "The app is running slowly",
        answer:
          "Clear the app cache, ensure you have enough storage space, and check your internet connection. Consider updating to the latest version.",
      },
      {
        question: "I can't log in to my account",
        answer:
          "Verify your email and password are correct. If you've forgotten your password, use the 'Reset Password' option. Clear app cache if issues persist.",
      },
    ],
  },
  {
    id: "policies",
    title: "Policies & Terms",
    icon: "document-text-outline",
    color: "#EF4444",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "Items can be returned within 30 days of delivery in original condition. Some restrictions apply to certain product categories.",
      },
      {
        question: "How do you handle my personal data?",
        answer:
          "We follow strict privacy guidelines and never share your personal information with third parties without consent. Read our full Privacy Policy for details.",
      },
      {
        question: "What are your terms of service?",
        answer:
          "Our terms outline user responsibilities, service limitations, and legal agreements. Please review them in 'Profile' → 'Legal' → 'Terms of Service'.",
      },
    ],
  },
];

export const contactOptions = [
  {
    title: "Email Support",
    subtitle: "support@yourapp.com",
    icon: "mail-outline",
    action: () => Linking.openURL("mailto:aliimrann744@gmail.com"),
  },
  {
    title: "Phone Support",
    subtitle: "+1 (555) 123-4567",
    icon: "call-outline",
    action: () => Linking.openURL("tel:+15551234567"),
  },
  {
    title: "Live Chat",
    subtitle: "Available 24/7",
    icon: "chatbubble-outline",
    action: () => console.log("Open live chat"),
  },
];
