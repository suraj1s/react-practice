"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { IMouseMove, ISocketContext, SocketProviderProps } from "./type";

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`Socket context is not available`);
  return state;
};
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [mouseMove, setMouseMove] = useState<IMouseMove | undefined>();
  const [roomMembers, setRoomMembers] = useState<string[]>([]);

  const sendMouseMove = useCallback(
    (coordinates: IMouseMove) => {
      if (socket) {
        console.log("mouse moved");
        socket.emit("client:mouseMove", { coordinates });
      }
    },
    [socket]
  );

  const onRoomJoined = useCallback((user: { users: string[] }) => {
    setRoomMembers(user.users);
  }, []);

  const onMouseMoveReceived = useCallback((coordinates: IMouseMove) => {
    setMouseMove(coordinates);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("server:mouseMove", onMouseMoveReceived);
    _socket.on("room:userJoined", onRoomJoined);

    setSocket(_socket);

    return () => {
      _socket.off("server:mouseMove", onMouseMoveReceived);
      _socket.off("room:userJoined", onRoomJoined);
      _socket.disconnect();
    };
  }, []);

  const socketValue = useMemo(
    () => ({
      sendMouseMove,
      mouseMove,
      roomMembers,
    }),
    [sendMouseMove, mouseMove, roomMembers]
  );

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};
