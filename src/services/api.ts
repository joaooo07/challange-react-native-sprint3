import axios from "axios";


const api = axios.create({
  //baseURL: "http://10.0.2.2:5263/api", // em Android emulator
  baseURL: "http://localhost:5263/api", // se rodar no iOS ou web
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default api;
