import { useCallback, useEffect, useRef } from 'react';
import { getSocket } from '../lib/socket';

export const useSocket = () => {
	const socket = getSocket();
	const listenersRef = useRef(
		new Map<string, (...args: unknown[]) => void>(),
	);

	useEffect(() => {
		if (!socket) return;

		const onConnect = () => {
			console.log(`WebSocket Connected :${socket.id}`);
		};

		const onDisconnect = () => {
			console.log(`WebSocket Disconnected :${socket.id}`);
		};

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		return () => {
			listenersRef.current.forEach((handler, event) => {
				socket.off(event, handler);
			});
			socket.removeAllListeners();
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			// Do not disconnect the singleton socket here
		};
	}, [socket]);

	const on = useCallback(
		(event: string, handler: (...args: unknown[]) => void) => {
			if (!socket) return;
			// Remove old listener if it exists
			if (listenersRef.current.has(event)) {
				socket.off(event, listenersRef.current.get(event)!);
			}
			// Add new listener
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

	return { socket, on, emit };
};
