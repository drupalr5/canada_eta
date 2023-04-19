import ApiService from "./ApiService";
import config from "../config.json";

export default class AuthService {
  // static login = (user) => ApiService.post("/admin/admin-login", user);
  static login = (user) => ApiService.post(`${config.API_URL}/admin/login`,user);

  static userInfo = () => ApiService.get("/user_info");

  static changePassword = (userId, newPassword) => 
    ApiService.put(`${config.API_URL}/admin/update/${userId}`, newPassword);

  /**
   *
   * @param {string} userId
   * @param {string} token
   * @returns
   */
  static validateInviteToken = (userId, token) =>
    ApiService.get(`/auth/validate-invite-token/${userId}/${token}`);

  /**
   *
   * @param {string} userId
   * @param {{
   *  token: string;
   *  firstName: string;
   *  lastName: string;
   *  password: string;
   *  passwordConfirm: string;
   * }} data
   * @returns
   */
  static acceptInvitation = async (userId, data) =>
    ApiService.post(`/auth/${userId}/accept-invite`, data);
}
