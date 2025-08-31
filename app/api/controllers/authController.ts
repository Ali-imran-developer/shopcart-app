import apiRequest from "../apiRequest";

class AuthControllers {
  static loginApi = (data: { email: string; password: string }) => {
    return apiRequest("post", "/api/login", data);
  };

  static signupApi = (data: {
    userName: string;
    email: string;
    password: string;
  }) => {
    return apiRequest("post", "/api/register", data);
  };

  static forgetPasswordApi = (data: { email: string }) => {
    return apiRequest("post", "/auth/forget-password", data);
  };

  static updateProfile = (data: {
    address?: string;
    email?: string;
    image: string | null;
    name?: string;
    phoneNumber?: string;
  }) => {
    return apiRequest("put", "/api/update", data);
  };

  static dashboardApi = () => {
    return apiRequest("get", "/api/orders/dashboard-stats");
  };
}

export default AuthControllers;