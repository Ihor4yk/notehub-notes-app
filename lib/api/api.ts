import axios from "axios";

export const nextServerApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

nextServerApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  },
);
