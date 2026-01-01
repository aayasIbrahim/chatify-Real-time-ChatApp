import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "https://chatify-real-time-chatapp.onrender.com/api"
      : "/api",
  withCredentials: true,
});
