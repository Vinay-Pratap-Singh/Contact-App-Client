import axios from "axios";
const { BASEURL } = require("../config");

const AxiosInstance = axios.create({ baseURL: BASEURL, withCredentials: true })


export default AxiosInstance;