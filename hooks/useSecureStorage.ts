import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export function useSecureStorage<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setValue = async (key: string, value: T) => {
    setLoading(true);
    setError(null);
    try {
      const stringValue = typeof value === "string" ? value : JSON.stringify(value);
      await SecureStore.setItemAsync(key, stringValue);
    } catch (err: any) {
      setError(err.message || "Failed to store value");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getValue = async (key: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await SecureStore.getItemAsync(key);
      if (!result) return null;
      try {
        return JSON.parse(result) as T;
      } catch {
        return result as unknown as T;
      }
    } catch (err: any) {
      setError(err.message || "Failed to get value");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteValue = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (err: any) {
      setError(err.message || "Failed to delete value");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    setValue,
    getValue,
    deleteValue,
    loading,
    error,
  };
}
