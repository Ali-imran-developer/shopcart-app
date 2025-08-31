import apiRequest from "../apiRequest";

class ShipperInfoController {
  static addShipperInfo(data: any) {
    return apiRequest("post", "/api/shipperinfo/create", data);
  }
  static removeShipperInfo(id: String) {
    return apiRequest("delete", `/api/shipperinfo/delete/${id}`);
  }
  static editShipperInfo(payload: any, id: String) {
    return apiRequest("put", `/api/shipperinfo/update/${id}`, payload);
  }
  static getAllShipperInfo(queryParams: any) {
    return apiRequest("get", `/api/shipperinfo/get?page=${queryParams?.page}&limit=${queryParams?.limit}`);
  }
}

export default ShipperInfoController;