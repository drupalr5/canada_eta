import ApiService from "./ApiService";
import config from "../config.json";
const api_url = `${config?.API_URL}/order`;

export default class OrderServices {
  static getOrderTiles = (order) =>
    ApiService.get(`${api_url}/ordertiles`, order);

  static getOrderSidebarCount = () =>
    ApiService.get(`${api_url}/ordercounts`);

  static getOrdersList = (order) => ApiService.get(`${api_url}/get`, order);

  static getOrderDetailsByOrderId = (orderId) =>
    ApiService.get(`${api_url}/${orderId}`);

  static deleteOrdersData = ({ order_id, data }) =>
    ApiService.put(`${api_url}/update/${order_id}`, data);


  static updateMultipleOrderData = (deleteData) =>
    ApiService.put(`${api_url}/update-multiple`, deleteData);

  static permanentDeleteOrdersData = (orderId) =>
    ApiService.delete(`${api_url}/delete/${orderId}`);

  // static uploadVisaDocument = (data) =>
  //   ApiService.post("/admin/upload-visa-document", data);

  // static resendMail = (data) => ApiService.post("/admin/resend-mail", data);

  // static ChangeOrderStatus = (data) =>
  //   ApiService.put(`/admin/change-order-status`, data);

  // static defencePack = (orderId) =>
  //   ApiService.post("/admin/defence-pack-details", orderId);

  // static GetDefencePackPdf = (data) =>
  //   ApiService.post("/admin/get-defence-pack-pdf", data, {
  //     responseType: "blob",
  //   });

  // static printOrderInfo = (orderId) =>
  //   ApiService.post("/admin/print-order-info", orderId);

  // static viewProcessOrder = (tmId) =>
  //   ApiService.get(`/admin/view-process-order/${tmId}`);

  // static trackCustomerOrder = (orderData) =>
  //   ApiService.post(`/front/track-order`, orderData);

  // static getDownloadHistory = (orderId) =>
  //   ApiService.post(`/front/get-download-history`, orderId);

  // static searchOrder = (data) => ApiService.post(`/admin/search-order`, data);
}
