import {useCallback, useEffect, useRef} from "react";
import {io, Socket} from "socket.io-client";

export const useSocket = () => {
	const socketRef = useRef<Socket | null>(null);

	const getSocketInstance = useCallback(() => {
		if (typeof window === "undefined") return null;

		if (!socketRef.current) {
			socketRef.current = io("http://localhost:3001", {
				transports: ["websocket"],
				withCredentials: true,
				autoConnect: false,
				reconnectionAttempts: 3,
				reconnectionDelay: 1000,
			});
		}

		socketRef.current.on("connect", () => {
			console.log(`WebSocket Connected :${socketRef.current?.id}`);
		});

		socketRef.current.on("disconnect", () => {
			console.log(`WebSocket Disconnected :${socketRef.current?.id}`);
		});

		return socketRef.current;
	}, []);

	useEffect(() => {
		const socket = getSocketInstance();
		if (!socket) return;

		if (!socket.connected) {
			socket.connect();
		}

		return () => {
			if (socket.connected) {
				socket.disconnect();
				socketRef.current = null;
			}
		};
	}, [getSocketInstance]);

	return {socket: socketRef.current};
};
