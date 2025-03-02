import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api", // TODO: update to backend URL,
  withCredentials: true,
});

export default apiClient;
