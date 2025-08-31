import * as Yup from "yup";

export const ShipperSchema = Yup.object().shape({
  storeName: Yup.string().required("Store is required"),
  locationName: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  returnAddress: Yup.string().required("Return Address is required"),
  city: Yup.string().required("City is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Phone Number must contain only numbers")
    .min(11, "Phone Number must be at least 11 digits")
    .max(13, "Phone Number cannot be more than 13 digits")
    .required("Phone Number is required"),
});
