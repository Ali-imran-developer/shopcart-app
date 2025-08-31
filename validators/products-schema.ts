import * as Yup from "yup";

export const CreateProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  price: Yup.number().required("Price is required").positive(),
  stock: Yup.number().required("Stock is required").min(1),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Subcategory is required"),
});
