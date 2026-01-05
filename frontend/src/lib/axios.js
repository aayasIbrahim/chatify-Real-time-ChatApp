import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api/"
      : "/api",
  withCredentials: true,
});
// ? "https://chatify-real-time-chatapp.onrender.com/api/"
