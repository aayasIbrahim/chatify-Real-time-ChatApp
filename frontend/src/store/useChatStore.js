import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`messages/${userId}`);
        console.log(res,"res from get user id")
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // sendMessage: async (messageData) => {
  //   const { selectedUser, messages } = get();
  //   const { authUser } = useAuthStore.getState();

  //   const tempId = `temp-${Date.now()}`;

  //   const optimisticMessage = {
  //     _id: tempId,
  //     senderId: authUser._id,
  //     receiverId: selectedUser._id,
  //     text: messageData.text,
  //     image: messageData.image,
  //     createdAt: new Date().toISOString(),
  //     isOptimistic: true, // flag to identify optimistic messages (optional)
  //   };
  //   // immidetaly update the ui by adding the message
  //   set({ messages: [...messages, optimisticMessage] });

  //   try {
  //     const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
  //     set({ messages: messages.concat(res.data) });
  //   } catch (error) {
  //     // remove optimistic message on failure
  //     set({ messages: messages });
  //     toast.error(error.response?.data?.message || "Something went wrong");
  //   }
  // },

  // subscribeToMessages: () => {
  //   const { selectedUser, isSoundEnabled } = get();
  //   if (!selectedUser) return;

  //   const socket = useAuthStore.getState().socket;

  //   socket.on("newMessage", (newMessage) => {
  //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
  //     console.log(newMessage,"new message from socket");
  //     if (!isMessageSentFromSelectedUser) return;

  //     const currentMessages = get().messages;
  //     set({ messages: [...currentMessages, newMessage] });

  //     if (isSoundEnabled) {
  //       const notificationSound = new Audio("/sounds/notification.mp3");

  //       notificationSound.currentTime = 0; // reset to start
  //       notificationSound.play().catch((e) => console.log("Audio play failed:", e));
  //     }
  //   });
  // },

  // unsubscribeFromMessages: () => {
  //   const socket = useAuthStore.getState().socket;
  //   socket.off("newMessage");
  // },
  sendMessage: async (messageData) => {
  const { selectedUser } = get();
  const { authUser } = useAuthStore.getState();

  const tempId = `temp-${Date.now()}`;

  const optimisticMessage = {
    _id: tempId,
    senderId: authUser._id,
    receiverId: selectedUser._id,
    text: messageData.text,
    image: messageData.image,
    createdAt: new Date().toISOString(),
    isOptimistic: true,
  };

  // Optimistic update
  set((state) => ({
    messages: [...state.messages, optimisticMessage],
  }));

  try {
    await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData);
    // ❌ DO NOT update state here
    // Socket will deliver real message
  } catch (error) {
    // Rollback optimistic message
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== tempId),
    }));
    toast.error(error.response?.data?.message || "Something went wrong");
  }
},

subscribeToMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  // Prevent duplicate listeners
  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    const { selectedUser, isSoundEnabled } = get();

    // 1️⃣ Always play sound if enabled
    if (isSoundEnabled) {
      const sound = new Audio("/sounds/notification.mp3");
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }

    // 2️⃣ Only update messages if the chat tab is open
    if (!selectedUser) return;
    if (newMessage.senderId !== selectedUser._id) return;

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  });
},


unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;
  socket.off("newMessage");
},

}));