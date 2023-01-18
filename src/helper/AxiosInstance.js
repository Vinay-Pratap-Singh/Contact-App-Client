import axios from "axios";
const { BASEURL } = require("../config");

const AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: { authorization: localStorage.getItem("token") },
});
export default AxiosInstance;
