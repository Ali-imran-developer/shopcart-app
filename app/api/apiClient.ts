import axios from "axios";
import { logout } from "@/utils/auth";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { API_BASE_URL } = Constants.expoConfig?.extra ?? {};
console.log(API_BASE_URL);
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((response) => response, async (error) => {
  if (error.response?.status === 401) {
    await logout();
  }
  return Promise.reject(error);
});

export default apiClient;