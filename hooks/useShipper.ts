import { useCallback, useEffect, useState } from "react";
import ShipperInfoController from "@/app/api/controllers/shipperController";
import Toast from "react-native-toast-message";

interface ShipperInfoType {
  _id?: string;
  storeName: string;
  phoneNumber: string;
  locationName: string;
  city: string;
  returnAddress: string;
  address: string;
  storeId?: string;
}

export const useShipperData = () => {
  const [shippers, setShippers] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchShippers = async (queryParams?: any) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.getAllShipperInfo(queryParams);
      setShippers(response);
    } catch (error: {message: string} | any) {
      console.error("Error fetching shippers:", error);
      Toast.show({ text1: error?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const addShipper = async (values: ShipperInfoType) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.addShipperInfo(values);
      // setShippers((prev: any) => [...prev, response]);
      Toast.show({ type: "success", text1: response?.message });
    } catch (error: {message: string} | any) {
      console.error("Error adding shipper:", error);
      Toast.show({ text1: error?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateShipper = useCallback(async (values: ShipperInfoType, id: String, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.editShipperInfo(values, id);
      setShippers((prev: any) => prev?.map((item: any) => (item._id === values._id ? response : item)));
      callback?.("success", response);
      Toast.show({ type: "success", text1: response?.message });
    } catch (error: {message: string} | any) {
      console.error("Error updating shipper:", error);
      Toast.show({ text1: error?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteShipper = useCallback(async (shipperId: string, callback?: (status: string, value?: any) => void) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.removeShipperInfo(shipperId);
      setShippers((prev: any) => prev.filter((item: any) => item._id !== shipperId));
      Toast.show({ type: "success", text1: response?.message });
    } catch (error: {message: string} | any) {
      console.error("Error deleting shipper:", error);
      Toast.show({ text1: error?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    shippers,
    isLoading,
    fetchShippers,
    addShipper,
    updateShipper,
    deleteShipper,
  };
};
