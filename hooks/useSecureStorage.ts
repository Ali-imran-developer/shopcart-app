import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T = any>() {
  const setValue = async (key: string, value: T) => {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  };

  const getValue = async (key: string): Promise<T | null> => {
    const result = await AsyncStorage.getItem(key);
    if (!result) return null;
    try {
      return JSON.parse(result) as T;
    } catch {
      return result as unknown as T;
    }
  };

  const deleteValue = async (key: string) => {
    await AsyncStorage.removeItem(key);
  };

  return { setValue, getValue, deleteValue };
}
