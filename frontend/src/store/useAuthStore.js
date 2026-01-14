import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      console.log(res, "res from check auth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("auth/login", data);
      set({ authUser: res.data });

      toast.success("Log In successfully!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("auth/update-profile", data);

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },
 connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io("https://chatify-real-time-chatapp.onrender.com", {
      withCredentials: true,
    });

    set({ socket: newSocket });

    // Online users listener
    const handleOnlineUsers = (userIds) => {
      set({ onlineUsers: userIds });
    };

    newSocket.on("getOnlineUsers", handleOnlineUsers);

    // Cleanup on disconnect
    newSocket.on("disconnect", () => {
      set({ onlineUsers: [] });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ onlineUsers: [] });
    }
  },}));
