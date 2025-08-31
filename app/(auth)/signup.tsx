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

export default function Signup() {
  const { handleSignup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />

        <View style={styles.card}>
          <Text style={styles.heading}>Signup</Text>

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
                  style={[styles.input, touched.userName && errors.userName && { borderColor: "red" },]}
                />
                {touched.userName && errors.userName && (
                  <Text style={styles.error}>{errors.userName}</Text>
                )}

                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={[styles.input, touched.email && errors.email && { borderColor: "red" },]}
                />
                {touched.email && errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}

                <View
                style={[
                    styles.passwordContainer,
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
                    style={styles.passwordInput}
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                >
                    <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                    />
                </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
                )}

                <View
                style={[
                    styles.passwordContainer,
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
                    style={styles.passwordInput}
                />
                <TouchableOpacity
                    onPress={() => setShowConfirm(!showConfirm)}
                    style={styles.eyeButton}
                >
                    <Ionicons
                    name={showConfirm ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                    />
                </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity style={[styles.loginBtn, loading && { opacity: 0.7 }]}
                  onPress={handleSubmit as any} disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.loginBtnText}>Signup</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Already have an account? </Text>
                  <Link href="/login" style={styles.signupLink}>
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
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 120,
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#1e40af",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingRight: 10,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  eyeButton: {
    paddingHorizontal: 5,
  },
  loginBtn: {
    backgroundColor: "#2563eb", // blue-600
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563eb",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
});
