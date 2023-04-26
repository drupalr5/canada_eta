import ApiService from "./ApiService";
import config from "../config.json";

export default class RemarkServices {
  static createOrderRemarksByOrderId = (data) =>
    ApiService.post(`${config.API_URL}/remark/create`, data);

  static getOrderRemarksByOrderId = (order_id) =>
    ApiService.get(`${config.API_URL}/remark/get/${order_id}`);
}
