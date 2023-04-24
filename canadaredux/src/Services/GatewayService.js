import ApiService from "./ApiService";
import config from "../config.json";

export default class GatewayService {
  static updateGatewaySetting = (data) =>
    ApiService.put(`${config.API_URL}/admin/update-gateway-setting`, data);

  static gatewaySetting = () =>
    ApiService.get(`${config.API_URL}/admin/gateway-setting`);
}
