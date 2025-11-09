import { useCallback, useEffect, useRef } from 'react';
import { getSocket } from '../lib/socket';

export const useSocket = () => {
  const socket = getSocket();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listenersRef = useRef(new Map<string, (...args: any[]) => void>());
  const isConnectedRef = useRef<boolean>(false);

  const on = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: string, handler: (...args: any[]) => void) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: string, ...args: any[]) => {
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

  return { socket, on, emit, socketDisconnect };
};
