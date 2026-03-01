import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      // headers type is AxiosRequestHeaders which is not satisfied by {} so cast
      config.headers = {} as any;
    }
    // axios headers type can be readonly, so cast to any to set Authorization
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
