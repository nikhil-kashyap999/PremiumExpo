import axios, { InternalAxiosRequestConfig } from "axios";
import { SOCKET_URL } from "@/config/socket";
import { TokenStorage } from "@/utils/secure-storage";

const baseURL = SOCKET_URL;
type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

export const axiosApi = axios.create({
  baseURL,
  headers: {
    "X-Client-Type": "mobile-app",
  },
});

axiosApi.interceptors.request.use(async (config) => {
  if (!config.headers.Authorization) {
    const token = await TokenStorage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
};

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosApi(originalRequest);
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = await TokenStorage.getRefreshToken();
        const { data } = await axios.post(
          `${baseURL}/api/auth/refresh`,
          { refreshToken },
          { headers: { "X-Client-Type": "mobile" } },
        );
        await TokenStorage.setTokens(data.accessToken, data.refreshToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await TokenStorage.clearTokens();
        // onAuthFailure?.();
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
