import * as ImagePicker from "expo-image-picker";

const pickImage = async (setFieldValue: any) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    base64: true,
    quality: 0.7,
  });
  if (!result.canceled && result.assets && result.assets.length > 0) {
    const asset = result.assets[0];
    const mimeType = asset.mimeType || "image/jpeg";
    const base64Img = `data:${mimeType};base64,${asset.base64}`;
    setFieldValue("image", base64Img);
  }
};

export default pickImage;