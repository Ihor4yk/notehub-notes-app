import axios from "axios";

export const nextServerApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
