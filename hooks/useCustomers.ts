import CustomerControllers from "@/app/api/controllers/customerController";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export const useCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState<any>({});

  const handleGetCustomer = async (queryParams: any) => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.fetchAllCustomers(queryParams);
      setCustomerData(data);
    } catch (error: { message: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error?.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCustomer = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const data = await CustomerControllers.addNewCustomer(values);
      console.log(data);
      Toast.show({ type: "success", text1: data?.message });
      return data;
    } catch (error: { message: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error?.message });
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditCustomer = useCallback(async (id: String, values: any) => {
    try {
      setIsLoading(true);
      const data = await CustomerControllers.editCustomers(id, values);
      Toast.show({ type: "success", text1: data?.message });
      return data;
    } catch (error: { message: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error?.message });
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteCustomer = useCallback(async (id: String) => {
    try {
      setIsLoading(true);
      const data: any = await CustomerControllers.deleteCustomers(id);
      Toast.show({ type: "success", text1: data?.message });
    } catch (error: { message: string } | any) {
      console.log("@Error", error);
      Toast.show({ type: "error", text1: error?.message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    handleGetCustomer,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    customerData,
    isLoading,
  };
};
