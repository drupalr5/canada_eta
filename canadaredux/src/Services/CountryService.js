import ApiService from "./ApiService";
import config from "../config.json";

export default class CountryService {
  static updateCountry = (id, data) =>
    ApiService.put(`${config.API_URL}/country/update/${id}`, data);

  static getCountryList = () =>
    ApiService.get(`${config.API_URL}/country/get`);

}
