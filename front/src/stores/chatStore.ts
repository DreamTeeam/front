// RUTA: src/stores/chatStore.ts
import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "./authStore";


export type { ChatStore };

// --- Tipos de Datos ---
type ChatMessage = {
  user: string;
  message: string;
  createdAt: string;
  room: string;
};

type ChatStore = {
  socket: Socket | null;
  messages: Record<string, ChatMessage[]>;
  unreadMessagesCount: number;
  connect: (tenantSlug: string) => void;
  disconnect: () => void;
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  sendMessage: (message: string, room: string) => void;
  resetMessages: (roomToReset?: string) => void;
  resetUnreadCount: () => void;
};

// --- Instancia única del Socket ---
let socket: Socket | null = null;

// --- Creación del Store ---
export const useChatStore = create<ChatStore>((set) => ({

  // --- Estado inicial del store ---
  socket: null,
  messages: {},
  unreadMessagesCount: 0, // Se inicializa el contador aquí, correctamente.

  // --- Métodos del store ---
  connect: (tenantSlug) => {
    if (socket?.connected) {
      console.log("🔌 Socket ya estaba conectado.");
      return;
    }
    
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    socket = io("https://nivo-app.onrender.com", {
      withCredentials: true,
      auth: { tenantSlug },
      transports: ["websocket", "polling"],
    });
    
    socket.on("connect", () => {
      console.log("🟢 Conectado al socket:", socket?.id);
      set({ socket });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Desconectado del socket.");
      socket = null; 
      set({ socket: null });
    });

    socket.on("new_message", (msg: ChatMessage) => {
      set((state) => ({
        messages: {
          ...state.messages,
          [msg.room]: [...(state.messages[msg.room] || []), msg],
        },
        unreadMessagesCount: state.unreadMessagesCount + 1,
      }));
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      set({ socket: null, messages: {} });
    }
  },

  joinRoom: (room) => {
    socket?.emit("event_join", room);
    console.log(`✅ Cliente uniéndose a la sala: ${room}`);
  },

  leaveRoom: (room) => {
    socket?.emit("event_leave", room);
    console.log(`👋 Cliente abandonando la sala: ${room}`);
  },

  sendMessage: (message, room) => {
    if (!socket || !message.trim()) return;

    const user = useAuthStore.getState().user;
    const newMessage: ChatMessage = {
      user: user?.name || "yo",
      message,
      createdAt: new Date().toISOString(),
      room,
    };
    
    socket.emit("event_message", { room, message });
    
    set((state) => ({
      messages: {
        ...state.messages,
        [room]: [...(state.messages[room] || []), newMessage],
      },
    }));
  },

  resetMessages: (roomToReset?: string) => {
    if (!roomToReset) {
      set({ messages: {} });
    } else {
      set((state) => {
        const newMessages = { ...state.messages };
        delete newMessages[roomToReset];
        return { messages: newMessages };
      });
    }
  }, // <--- La coma aquí separa los métodos

  resetUnreadCount: () => { // <-- Este método va aquí, al mismo nivel que los otros
    set({ unreadMessagesCount: 0 });
  },

}));