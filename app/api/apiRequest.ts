import apiClient from "./apiClient";

const apiRequest = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any,
  config: any = {}
) => {
  try {
    let response;
    if (["get", "delete"].includes(method)) {
      response = await apiClient[method](url, { ...config, params: data });
    } else {
      response = await apiClient[method](url, data, config);
    }

    if (response?.status === 200 || response?.status === 201) {
      return response.data;
    }
  } catch (error: any) {
    throw error?.response
      ? { status: error.response.status, message: error.response.data?.message || "Request failed" }
      : { status: 500, message: "Server Error" };
  }
};

export default apiRequest;