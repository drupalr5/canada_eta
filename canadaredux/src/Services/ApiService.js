import axios from "axios";

const defaultConfig = {
  baseURL: process.env.REACT_APP_API_URL,
  contentType: "application/json",
};

export default class ApiService {
  static baseUrl = `${process.env.REACT_APP_API_URL}`;

  static getConfigs = (additionalConfig = {}) => {
    const config = {
      ...defaultConfig,
      ...additionalConfig,
    };

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken !== null) {
      config.headers = { ...config.headers, Authorization: user.accessToken };
    }
    return config;
  };

  static get = async (url, params) => {
    return await axios.get(url, { params });
  };

  static post = async function post(url, data) {
    return axios.post(url, data);
  };

  static put = async (url, data) => axios.put(url, data);
  static patch = async (url, data) => axios.patch(url, data);

  static delete = async (url) => axios.delete(url);

  static download = async (url) => axios.get(url);

  static upload = async (url, data) => {
    return axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "cache-control": "no-cache"
      },
    });
  };
}
