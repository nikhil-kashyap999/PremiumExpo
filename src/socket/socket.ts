import { TokenStorage } from "@/utils/secure-storage";
import { io, Socket } from "socket.io-client";


const SOCKET_URL = process.env.EXPO_PUBLIC_BACKEND_URL;


export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  auth: async (cb) => {
    const token = await TokenStorage.getAccessToken();
    cb({ token });
  },
});
