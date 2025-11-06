import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.15.9:5263/api",// "http://localhost:5263/api","http://192.168.15.9:5263/api"
});

let authToken: string | null = null;

export const setAuthToken = async (token: string | null) => {
  authToken = token;
  if (token) {
    await AsyncStorage.setItem("accessToken", token);
  } else {
    await AsyncStorage.removeItem("accessToken");
  }
};

api.interceptors.request.use(async (config) => {
  const token = authToken || (await AsyncStorage.getItem("accessToken"));
  if (token) {
    const finalToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;

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
