import OrdersController from "@/app/api/controllers/ordersController";
import { setOrders } from "@/store/slices/orders-slice";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

export const useOrders = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [ordersData, setOrdersData] = useState<any>({});

  const handleGetOrders = async (queryParams: any) => {
    try {
      setIsLoading(true);
      const response = await OrdersController.getAllOrders(queryParams);
      dispatch(setOrders({
        orders: response?.orders ?? [],
        totalOrders: response?.totalOrders ?? 0,
        totalPages: response?.totalPages ?? 0,
      }));
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
