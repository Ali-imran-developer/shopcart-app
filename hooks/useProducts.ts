import { useCallback, useState } from "react";
import ProductController from "@/app/api/controllers/productsController";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState<any>({});

  const handleGetProducts = async (queryParams: any) => {
    try {
      setIsLoading(true);
      const data = await ProductController.getProducts(queryParams);
      setProductsData(data);
      return data;
    } catch (error: { message?: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (values: any) => {
    try {
      setIsLoading(true);
      const response: any = await ProductController.createProducts(values);
      console.log("Product created in Hook:", response);
      Toast.show({ type: "success", text1: response.message });
      router.push("/products");
    } catch (error: { message?: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    productsData,
    handleGetProducts,
    handleAddProduct,
  };
};
