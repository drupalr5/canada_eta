import ApiService from "./ApiService";
import config from "../config.json";

export default class ManageService {
  static updateUserData = (id, data) =>
    ApiService.post(`${config.API_URL}/admin/updateuser/${id}`, data);

  static getUserData = (id) =>
    ApiService.get(`${config.API_URL}/admin/user/${id}`);
}
