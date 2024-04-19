
export interface IMouseMove {
    x: number;
    y: number;
  }

  export interface ISocketContext {
    sendMouseMove: (coordinates: IMouseMove) => void;
    mouseMove: IMouseMove | undefined;
    roomMembers: string[];
  }
  
  export interface SocketProviderProps {
    children?: any;
  }
  