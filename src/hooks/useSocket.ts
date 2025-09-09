import { useCallback, useEffect, useRef } from 'react';
import { getSocket } from '../lib/socket';

export const useSocket = () => {
	const socket = getSocket();
	const listenersRef = useRef(
		new Map<string, (...args: unknown[]) => void>(),
	);
	const isConnectedRef = useRef<boolean>(false);

	useEffect(() => {
		if (!socket) return;

		const onConnect = () => {
			console.log(`WebSocket Connected :${socket.id}`);
			isConnectedRef.current = true;
		};

		const onDisconnect = () => {
			console.log(`WebSocket Disconnected :${socket.id}`);
			isConnectedRef.current = false;
		};

		if (!isConnectedRef.current) {
			socket.on('connect', onConnect);
			socket.on('disconnect', onDisconnect);

			if (!socket.connected) {
				socket.connect();
			}
		}

		return () => {
			listenersRef.current.forEach((handler, event) => {
				socket.off(event, handler);
			});
			socket.removeAllListeners();
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.disconnect();
		};
	}, [socket]);

	const on = useCallback(
		(event: string, handler: (...args: unknown[]) => void) => {
			if (!socket) return;
			if (listenersRef.current.has(event)) {
				socket.off(event, listenersRef.current.get(event)!);
			}
			socket.on(event, handler);
			listenersRef.current.set(event, handler);
		},
		[socket],
	);

	const emit = useCallback(
		(event: string, ...args: unknown[]) => {
			if (!socket) return;
			socket.emit(event, ...args);
		},
		[socket],
	);

	const socketDisconnect = useCallback(() => {
		if (!socket) return;

		socket?.disconnect();
		isConnectedRef.current = false;
	}, [socket]);

	return { socket, on, emit, socketDisconnect };
};
