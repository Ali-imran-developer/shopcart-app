import apiRequest from "../apiRequest";

class ProductsControllers {
  static getProducts(queryParams: any) {
    return apiRequest("get", `/api/products/get?page=${queryParams?.page}&limit=${queryParams?.limit}&status=${queryParams?.status}`);
  }
  static createProducts(data: any) {
    return apiRequest("post", "/api/products/create", data);
  }
}

export default ProductsControllers;