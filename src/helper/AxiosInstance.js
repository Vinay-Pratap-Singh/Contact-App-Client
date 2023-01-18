import axios from "axios";
const { BASEURL } = require("../config");

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  // headers: { authorization: localStorage.getItem("token") },
});
AxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token") || "";

  config.headers.Authorization =  token;
   
  return config;
});
export default AxiosInstance;
