export const privacySections = [
  {
    id: "overview",
    title: "Privacy Overview",
    icon: "eye-outline",
    color: "#3B82F6",
    content:
      "We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services. By using our app, you agree to the collection and use of information in accordance with this policy.",
    isExpandable: false,
  },
  {
    id: "collection",
    title: "Information We Collect",
    icon: "download-outline",
    color: "#10B981",
    content: `We collect several types of information to provide and improve our services:

Personal Information:
• Name, email address, phone number
• Shipping and billing addresses
• Payment information (processed securely)
• Profile preferences and settings

Usage Information:
• App interaction data and navigation patterns
• Device information (OS, device type, unique identifiers)
• Location data (with your permission)
• Purchase history and preferences

Technical Information:
• IP address and network information
• Log files and crash reports
• Cookies and similar tracking technologies
• Performance and analytics data`,
    isExpandable: true,
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: "settings-outline",
    color: "#8B5CF6",
    content: `We use your information for legitimate business purposes:

Service Delivery:
• Process and fulfill your orders
• Provide customer support
• Send important service notifications
• Manage your account and preferences

Improvement & Personalization:
• Analyze usage patterns to improve our app
• Personalize your experience and recommendations
• Conduct research and analytics
• Develop new features and services

Communication:
• Send promotional offers (with your consent)
• Provide customer support
• Send security alerts and updates
• Respond to your inquiries

Legal & Security:
• Comply with legal obligations
• Prevent fraud and abuse
• Protect our rights and property
• Ensure platform security`,
    isExpandable: true,
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: "share-outline",
    color: "#F59E0B",
    content: `We do not sell your personal information. We may share your information only in these circumstances:

Service Providers:
• Payment processors for transaction handling
• Shipping companies for order delivery
• Cloud hosting and data storage services
• Analytics and marketing platforms

Legal Requirements:
• When required by law or court order
• To respond to government requests
• To protect our rights and safety
• In connection with legal proceedings

Business Transfers:
• During mergers, acquisitions, or asset sales
• With your consent or as legally permitted
• To protect the rights of all parties involved

With Your Consent:
• When you explicitly authorize sharing
• For specific promotional partnerships
• To provide requested services`,
    isExpandable: true,
  },
  {
    id: "security",
    title: "Data Security",
    icon: "shield-checkmark-outline",
    color: "#EF4444",
    content: `We implement comprehensive security measures to protect your information:

Technical Safeguards:
• End-to-end encryption for sensitive data
• Secure Socket Layer (SSL) technology
• Regular security audits and penetration testing
• Multi-factor authentication systems

Administrative Controls:
• Limited access to personal information
• Employee training on data protection
• Regular security policy updates
• Incident response procedures

Physical Security:
• Secure data centers with restricted access
• Environmental controls and monitoring
• Backup and disaster recovery systems
• Regular maintenance and updates

Data Retention:
• We retain information only as long as necessary
• Automatic deletion of expired data
• Secure disposal of physical records
• Regular review of retention periods`,
    isExpandable: true,
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    icon: "person-outline",
    color: "#06B6D4",
    content: `You have important rights regarding your personal information:

Access & Control:
• View and download your personal data
• Update or correct inaccurate information
• Delete your account and associated data
• Export your data in a portable format

Communication Preferences:
• Opt-out of marketing communications
• Manage notification settings
• Control cookie preferences
• Adjust personalization settings

Legal Rights (varies by jurisdiction):
• Right to be forgotten (data erasure)
• Right to data portability
• Right to object to processing
• Right to restrict processing
• Right to file complaints with authorities

To exercise these rights, contact us at privacy@yourapp.com or through the app settings.`,
    isExpandable: true,
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    icon: "analytics-outline",
    color: "#8B5CF6",
    content: `We use cookies and similar technologies to enhance your experience:

Types of Cookies:
• Essential cookies for app functionality
• Performance cookies for analytics
• Functional cookies for preferences
• Marketing cookies for personalization

Third-Party Services:
• Google Analytics for usage insights
• Social media integration
• Advertising networks (with consent)
• Customer support tools

Your Choices:
• Manage cookie preferences in app settings
• Opt-out of non-essential cookies
• Use browser settings to control cookies
• Contact us for assistance with preferences`,
    isExpandable: true,
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: "heart-outline",
    color: "#EC4899",
    content: `We are committed to protecting children's privacy:

Age Restrictions:
• Our service is not intended for users under 13
• We do not knowingly collect data from children under 13
• Parental consent required for users 13-17
• Special protections for minors' data

If We Learn of Child Data:
• We will promptly delete the information
• We will notify parents/guardians if possible
• We will review our collection practices
• We will strengthen age verification

Parents can contact us at privacy@yourapp.com to review, update, or delete their child's information.`,
    isExpandable: true,
  },
  {
    id: "international",
    title: "International Transfers",
    icon: "globe-outline",
    color: "#059669",
    content: `Your information may be transferred across borders:

Data Transfers:
• Information may be processed in other countries
• We ensure adequate protection through legal mechanisms
• We comply with applicable international laws
• We use standard contractual clauses where required

Safeguards:
• Adequacy decisions from relevant authorities
• Binding corporate rules for data transfers
• Certification programs and codes of conduct
• Your explicit consent where required`,
    isExpandable: true,
  },
  {
    id: "changes",
    title: "Policy Updates",
    icon: "refresh-outline",
    color: "#DC2626",
    content: `We may update this Privacy Policy periodically:

Notification Process:
• We will notify you of significant changes
• Updates will be posted in the app
• Email notifications for material changes
• Continued use constitutes acceptance

What Constitutes Material Changes:
• Changes to data collection practices
• New uses of personal information
• Changes to data sharing policies
• Modifications to your rights

We encourage you to review this policy regularly to stay informed about how we protect your information.`,
    isExpandable: true,
  },
];

export const quickActions = [
  {
    title: "Download My Data",
    subtitle: "Get a copy of your information",
    icon: "download-outline",
    action: () => console.log("Download data requested"),
  },
  {
    title: "Delete My Account",
    subtitle: "Permanently remove your account",
    icon: "trash-outline",
    action: () => console.log("Account deletion requested"),
  },
  {
    title: "Privacy Settings",
    subtitle: "Manage your privacy preferences",
    icon: "settings-outline",
    action: () => console.log("Privacy settings opened"),
  },
  {
    title: "Contact Privacy Team",
    subtitle: "privacy@yourapp.com",
    icon: "mail-outline",
    action: () => console.log("Contact privacy team"),
  },
];
