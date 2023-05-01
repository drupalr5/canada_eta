import ApiService from "./ApiService";
import config from "../config.json";
const api_url = `${config?.API_URL}/order`;

export default class OrderServices {
  static getOrderTiles = (order) =>
    ApiService.get(`${api_url}/ordertiles`, order);

  static getOrderSidebarCount = (param) =>
    ApiService.get(`${api_url}/ordercounts`, param);

  static getOrdersList = (order) => ApiService.get(`${api_url}/get`, order);

  static getOrderDetailsByOrderId = (orderId) =>
    ApiService.get(`${api_url}/orderdetails/${orderId}`);

  static updateOrdersData = ({ order_id, data }) =>
    ApiService.put(`${api_url}/update/${order_id}`, data);


  static updateMultipleOrderData = (deleteData) =>
    ApiService.put(`${api_url}/update-multiple`, deleteData);

  static permanentDeleteOrdersData = (orderId) =>
    ApiService.delete(`${api_url}/delete/${orderId}`);

  static uploadOrderDocument = (data) =>
    ApiService.post(`${api_url}/doc-upload/create`, data);

  static getDocUploadByOrderId = (orderId) =>
    ApiService.get(`${api_url}/doc-upload/get/${orderId}`);

  static moveUploadedFile = (formData) =>
    ApiService.upload(`${api_url}/doc-upload/pdf-upload`, formData);

  static createEmailHistoryByOrderId = (data) =>
    ApiService.post(`${api_url}/email-history/create`, data);

  static getEmailHistoryByOrderId = (orderId) =>
    ApiService.get(`${api_url}/email-history/get/${orderId}`);

  static createDownloadHistoryByOrderId = (data) =>
    ApiService.post(`${api_url}/download-history/create`, data);

  static getDownloadHistoryByOrderId = (orderId) =>
    ApiService.get(`${api_url}/download-history/get/${orderId}`);
}
