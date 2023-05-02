import ApiService from "./ApiService";
import config from "../config.json";

export default class CountryService {
  static updateCountry = (id, data) =>
    ApiService.post(`${config.API_URL}/admin/updateuser/${id}`, data);

  static getUsersList = (params) =>
    ApiService.get(`${config.API_URL}/admin/all`, params);

}
