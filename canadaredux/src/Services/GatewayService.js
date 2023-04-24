import ApiService from "./ApiService";
import config from "../config.json";

export default class GatewayService {
  static updateGatewaySetting = (user) =>
    ApiService.post(`${config.API_URL}/admin/update-gateway-setting`, user);

  static gatewaySetting = () =>
    ApiService.get(`${config.API_URL}/admin/gateway-setting`);
}
