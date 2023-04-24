import ApiService from "./ApiService";
import config from "../config.json";

export default class ManageService {
  static updateUserData = (id, data) =>
    ApiService.put(`${config.API_URL}/admin/update/${id}`, data);

  static getUserData = (id) =>
    ApiService.get(`${config.API_URL}/admin/user/${id}`);
}
