import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import changePasswordStyles from "@/styles/settings/change-password";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleVerifyEmail = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      Alert.alert(
        "Verification Email Sent", 
        "Please check your email for password reset instructions"
      );
    }, 2000);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleVerifyEmail();
  };

  return (
    <SafeAreaView style={changePasswordStyles.safeArea}>
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={changePasswordStyles.keyboardView}>
        <View style={changePasswordStyles.container}>
          <View style={changePasswordStyles.header}>
            <View style={changePasswordStyles.iconContainer}>
              <Ionicons name="shield-checkmark" size={32} color="#6366F1" />
            </View>
            <Text style={changePasswordStyles.title}>Change Password</Text>
            <Text style={changePasswordStyles.subtitle}>
              Enter your email address and we'll send you instructions to change your password
            </Text>
          </View>

          <View style={changePasswordStyles.formContainer}>
            {!emailSent ? (
              <>
                <View style={changePasswordStyles.inputContainer}>
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color="#9CA3AF" 
                    style={changePasswordStyles.inputIcon} 
                  />
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor="#9CA3AF"
                    style={changePasswordStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>

                <TouchableOpacity 
                  style={[
                    changePasswordStyles.button, 
                    (!email.trim() || isLoading) && changePasswordStyles.buttonDisabled
                  ]} 
                  onPress={handleVerifyEmail}
                  disabled={!email.trim() || isLoading}
                  activeOpacity={0.8}
                >
                  {isLoading ? (
                    <View style={changePasswordStyles.loadingContainer}>
                      <Text style={changePasswordStyles.buttonText}>Sending...</Text>
                    </View>
                  ) : (
                    <>
                      <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
                      <Text style={changePasswordStyles.buttonText}>Verify Email</Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            ) : (
              <View style={changePasswordStyles.successContainer}>
                <View style={changePasswordStyles.successIconContainer}>
                  <Ionicons name="checkmark-circle" size={64} color="#10B981" />
                </View>
                <Text style={changePasswordStyles.successTitle}>Email Sent!</Text>
                <Text style={changePasswordStyles.successMessage}>
                  We've sent password reset instructions to{'\n'}
                  <Text style={changePasswordStyles.emailText}>{email}</Text>
                </Text>
                
                <TouchableOpacity  style={changePasswordStyles.resendButton}  onPress={handleResendEmail} activeOpacity={0.7}>
                  <Ionicons name="refresh-outline" size={16} color="#6366F1" />
                  <Text style={changePasswordStyles.resendButtonText}>Resend Email</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

            <View style={changePasswordStyles.footer}>
                <Text style={changePasswordStyles.footerText}>
                    Remember your password?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={changePasswordStyles.linkText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
