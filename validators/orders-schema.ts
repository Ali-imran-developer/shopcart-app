import * as Yup from "yup";

const orderSchema = Yup.object().shape({
  shipmentDetails: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    shipperCity: Yup.string().required("Shipper city is required"),
  }),
  orderTax: Yup.number().min(0, "Invalid tax"),
  shipping: Yup.number().min(0, "Invalid shipping"),
  promoCode: Yup.string(),
  quantity: Yup.number().min(1, "Quantity must be at least 1"),
  selectedShipper: Yup.string().required("Select a shipper"),
});

export default orderSchema;