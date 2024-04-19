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
import { IMessageType, ISocketContext, SocketProviderProps } from "./type";


const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`Socket context is not available`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<IMessageType | undefined>();
  const [roomMembers, setRoomMembers] = useState<string[]>([]);

  const sendMessage = useCallback(
    (msg: IMessageType) => {
      if (socket) {
        socket.emit("client:message", { message: msg });
      }
    },
    [socket]
  );

  const createRoom = useCallback(
    ({ room, user }: { room: string; user: string }) => {
      if (socket) {
        socket.emit("room:join", { room, user });
      }
    },
    [socket]
  );
  
  const onRoomJoined = useCallback((user: { users: string[] }) => {
    setRoomMembers(user.users);
  }, []);

  const onMessageReceived = useCallback((msg: IMessageType) => {
    setMessages(msg);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("server:message", onMessageReceived);
    _socket.on("room:userJoined", onRoomJoined)

    setSocket(_socket);

    return () => {
      _socket.off("server:message", onMessageReceived);
      _socket.off("room:userJoined", onRoomJoined);
      _socket.disconnect();
    };
  }, []);

  const socketValue = useMemo(
    () => ({
      sendMessage,
      createRoom,
      messages,
      roomMembers,
    }),
    [
      sendMessage,
      createRoom,
      messages,
      roomMembers,
    ]
  );

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
};
