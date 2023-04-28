import ApiService from "./ApiService";
import config from "../config.json";

export default class ManageService {
  static updateUserData = (id, data) =>
    ApiService.post(`${config.API_URL}/admin/updateuser/${id}`, data);

  static getUserData = (id) =>
    ApiService.get(`${config.API_URL}/admin/user/${id}`);

  static getUsersList = (params) =>
    ApiService.get(`${config.API_URL}/admin/all`, params);

  static deleteUserData = (id) =>
    ApiService.delete(`${config.API_URL}/admin/deleteUser/${id}`);

  static uploadUserImage = (formData) =>
    ApiService.upload(`${config.API_URL}/admin/userfile-upload`, formData);

  static getTeamMembers = (param) =>
    ApiService.get(`${config.API_URL}/admin/team-members`, param);
}
