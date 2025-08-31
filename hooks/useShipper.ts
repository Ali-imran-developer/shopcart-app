import { useCallback, useEffect, useState } from "react";
import ShipperInfoController from "@/app/api/controllers/shipperController";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setShippers } from "@/store/slices/shipper-slice";

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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchShippers = async (queryParams?: any) => {
    try {
      setIsLoading(true);
      const response = await ShipperInfoController.getAllShipperInfo(queryParams);
      dispatch(setShippers({
        shipper: response?.shipper ?? [],
        totalShippers: response?.totalShippers ?? 0,
        totalPages: response?.totalPages ?? 0,
      }));
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
      Toast.show({ type: "success", text1: response?.message });
    } catch (error: {message: string} | any) {
      console.error("Error deleting shipper:", error);
      Toast.show({ text1: error?.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    fetchShippers,
    addShipper,
    updateShipper,
    deleteShipper,
  };
};
