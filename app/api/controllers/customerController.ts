import apiRequest from "../apiRequest";

class CustomerControllers {
  static fetchAllCustomers(queryParams?: any) {
    return apiRequest("get", `/api/customer/get?page=${queryParams?.page}&limit=${queryParams?.limit}`);
  }
  static addNewCustomer(data: any) {
    return apiRequest("post", "/api/customer/create", data);
  }
  static editCustomers(id: String, data: any) {
    return apiRequest("put", `/api/customer/update/${id}`, data);
  }
  static deleteCustomers(id: String) {
    return apiRequest("delete", `/api/customer/delete/${id}`);
  }
}

export default CustomerControllers;