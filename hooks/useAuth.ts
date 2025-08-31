import { useState } from "react";
import Toast from "react-native-toast-message";
import AuthControllers from "@/app/api/controllers/authController";
import { useAsyncStorage } from "./useSecureStorage";

type LoginData = { email: string; password: string };
type SignupData = { userName: string; email: string; password: string };
type ForgetPasswordData = { email: string };
type UpdateProfileData = {
  address?: string;
  email?: string;
  image: string | null;
  name?: string;
  phoneNumber?: string;
};

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>({});
  const { setValue, getValue } = useAsyncStorage();

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthControllers.loginApi(data);
      if (res?.token) {
        await setValue("token", res.token);
        await setValue("user", res.user);
      }
      Toast.show({ type: "success", text1: res.message });
      return res;
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthControllers.signupApi(data);
      if (res?.token) {
        await setValue("token", res.token);
        await setValue("user", res.user);
      }
      Toast.show({ type: "success", text1: res.message });
      return res;
    } catch (err: any) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async (data: ForgetPasswordData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthControllers.forgetPasswordApi(data);
      Toast.show({ type: "success", text1: res.message });
      return res;
    } catch (err: any) {
      setError(err.message || "Request failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthControllers.updateProfile(data);
      console.log(res);
      Toast.show({ type: "success", text1: res.message });
      return res;
    } catch (err: any) {
      console.log(err);
      Toast.show({ type: "error", text1: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getStoredUser = async () => {
    const token = await getValue("token");
    const user = await getValue("user");
    return { token, user };
  };

  const handledashboardData = async () => {
    try {
      setLoading(true);
      const response = await AuthControllers.dashboardApi();
      setDashboardData(response);
      return response;
    } catch (err: any) {
      console.log(err);
      Toast.show({ type: "error", text1: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleSignup,
    getStoredUser,
    handleUpdateUser,
    handledashboardData,
    handleForgetPassword,
    dashboardData,
    loading,
    error,
  };
}
