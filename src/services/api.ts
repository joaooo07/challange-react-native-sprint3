import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5263/api",
});

let authToken: string | null = localStorage.getItem("accessToken");

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
};


api.interceptors.request.use((config) => {
  const token = authToken || localStorage.getItem("accessToken");
  if (token) {

    const finalToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    if (config.headers?.set) {
      config.headers.set("Authorization", finalToken);
    } else if (config.headers) {
      (config.headers as any)["Authorization"] = finalToken;
    } else {
      (config as any).headers = { Authorization: finalToken };
    }
  }
  return config;
});

export default api;
