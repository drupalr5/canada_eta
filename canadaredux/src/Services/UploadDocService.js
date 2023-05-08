import ApiService from "./ApiService";
import config from "../config.json";

export default class uploadDocService {
  static createUploadDocByOrderId = (data) =>
    ApiService.post(`${config.API_URL}/doc-upload/create`, data);

  static getUploadDocByOrderId = (order_id) =>
    ApiService.get(`${config.API_URL}/doc-upload/get/${order_id}`);

}
