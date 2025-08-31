import { useState } from "react";
import ProductController from "@/app/api/controllers/productsController";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { setProducts } from "@/store/slices/products-slice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProducts = async (queryParams: any) => {
    try {
      setIsLoading(true);
      const data = await ProductController.getProducts(queryParams);
      dispatch(setProducts({
        products: data?.products ?? [],
        totalProducts: data?.totalProducts ?? 0,
        totalPages: data?.totalPages ?? 0,
      }));
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
    handleGetProducts,
    handleAddProduct,
  };
};
