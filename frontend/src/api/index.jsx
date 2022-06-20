import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.43.55:5000/api",
  // baseURL: "http://localhost:5000/api",
});
export default api;
