import OrdersController from "@/app/api/controllers/ordersController";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const useOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<any>({});

  const handleGetOrders = async (queryParams: any) => {
    try {
      setIsLoading(true);
      const response = await OrdersController.getAllOrders(queryParams);
      setOrdersData(response);
      return response;
    } catch (error: { message: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error?.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrders = async (values: any) => {
    try {
      setIsLoading(true);
      const response: any = await OrdersController.createOrder(values);
      console.log(response);
      Toast.show({ type: "success", text1: response?.message });
      return response;
    } catch (error: { message: string } | any) {
      Toast.show({ type: "error", text1: error.message });
    } finally{
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    ordersData,
    handleGetOrders,
    handleAddOrders,
  };
};
