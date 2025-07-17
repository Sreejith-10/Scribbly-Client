import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket && typeof window !== "undefined") {
    socket = io("http://localhost:3001", {
      transports: ["websocket"],
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}; 