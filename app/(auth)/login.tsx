import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { LoginSchema } from "@/validators/login-schema";
import loginStyles from "@/styles/auth/login";

export default function Login() {
  const { handleLogin, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={loginStyles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require("@/assets/images/logo.png")} style={loginStyles.logo} resizeMode="contain" />

        <View style={loginStyles.card}>
          <Text style={loginStyles.heading}>Login</Text>

          <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} 
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleLogin(values);
                router.replace("/");
              } catch (error: any) {
                console.error("Login Error:", error.response?.data || error.message);
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
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  style={[loginStyles.input, touched.email && errors.email && { borderColor: "red" },]}
                />
                {touched.email && errors.email && (
                  <Text style={loginStyles.errorText}>{errors.email}</Text>
                )}

                <View
                  style={[
                    loginStyles.passwordContainer,
                    touched.password && errors.password && { borderColor: "red" },
                  ]}
                >
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    style={[loginStyles.input, { flex: 1, marginBottom: 0, borderWidth: 0 }]}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={loginStyles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={22}
                      color="#555"
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={loginStyles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity style={[loginStyles.loginBtn, loading && { opacity: 0.7 }]}
                  onPress={handleSubmit as any} disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={loginStyles.loginBtnText}>Login</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>

          <View style={loginStyles.signupContainer}>
            <Text style={loginStyles.signupText}>Don’t have an account? </Text>
            <Link href="/signup" style={loginStyles.signupLink}>
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
