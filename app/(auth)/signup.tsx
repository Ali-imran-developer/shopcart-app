import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";
import { SignupSchema } from "@/validators/signup-schema";
import signupStyles from "@/styles/auth/singup";

export default function Signup() {
  const { handleSignup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={signupStyles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require("@/assets/images/logo.png")} style={signupStyles.logo} resizeMode="contain" />

        <View style={signupStyles.card}>
          <Text style={signupStyles.heading}>Signup</Text>

          <Formik
            initialValues={{ userName: "", email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { confirmPassword, ...signupData } = values;
                await handleSignup(signupData);
                router.replace("/");
              } catch (error: any) {
                console.error("Signup Error:", error.response?.data || error.message);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#888"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  style={[signupStyles.input, touched.userName && errors.userName && { borderColor: "red" },]}
                />
                {touched.userName && errors.userName && (
                  <Text style={signupStyles.error}>{errors.userName}</Text>
                )}

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={[signupStyles.input, touched.email && errors.email && { borderColor: "red" },]}
                />
                {touched.email && errors.email && (
                  <Text style={signupStyles.error}>{errors.email}</Text>
                )}

                <View
                style={[
                    signupStyles.passwordContainer,
                    touched.password && errors.password && { borderColor: "red" },
                ]}
                >
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    style={signupStyles.passwordInput}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={signupStyles.eyeButton}
                >
                    <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                    />
                </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                <Text style={signupStyles.error}>{errors.password}</Text>
                )}

                <View
                style={[
                    signupStyles.passwordContainer,
                    touched.confirmPassword && errors.confirmPassword && { borderColor: "red" },
                ]}
                >
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showConfirm}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    style={signupStyles.passwordInput}
                />
                <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                    style={signupStyles.eyeButton}
                >
                    <Ionicons
                    name={showConfirm ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                    />
                </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                <Text style={signupStyles.error}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity style={[signupStyles.loginBtn, loading && { opacity: 0.7 }]}
                  onPress={handleSubmit as any} disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={signupStyles.loginBtnText}>Signup</Text>
                  )}
                </TouchableOpacity>

                <View style={signupStyles.signupContainer}>
                  <Text style={signupStyles.signupText}>Already have an account? </Text>
                  <Link href="/login" style={signupStyles.signupLink}>
                    Login
                  </Link>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

