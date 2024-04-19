import { Server, Socket } from "socket.io";

class SocketService {
  private _io: Server;
  private usersInRooms: { [room: string]: string[] };
  private userToSocket: UserToSocketMap;
  private socketToUser: SocketToUserMap;
  private static userCount: number = 1;
  private room: string = "playground";
  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "http://localhost:3000",
      },
    });
    this.usersInRooms = {};
    this.userToSocket = {};
    this.socketToUser = {};
  }

  public initListeners() {
    const io = this._io;

    io.on("connect", (socket: Socket) => {
      console.log("a new socket connected", socket.id);
      this.handleUserJoin(socket);

      socket.on("client:mouseMove", ({ coordinates }: { coordinates: any }) => {
        this.handleClientMouseMove(socket, coordinates);
      });

      socket.on("disconnect", () => {
        this.handleDisconnect(socket);
      });
    });
  }

  private handleUserJoin(socket: Socket) {
    const user = `user-${SocketService.userCount++}`;
    console.log(`User ${socket.id} joined ${this.room}`);
    // Join room
    socket.join(this.room);

    // Store user-room mapping
    if (!this.usersInRooms[this.room]) {
      this.usersInRooms[this.room] = [];
    }
    this.usersInRooms[this.room].push(user);
    this.userToSocket[user] = socket.id;
    this.socketToUser[socket.id] = user;

    // Emit event to inform other users in the room about the new user
    const roomUsers = this.usersInRooms[this.room];
    console.log(roomUsers, "roomUsers");
    // socket.to(room).emit("room:userJoined", { users: roomUsers });
    this._io.in(this.room).emit("room:userJoined", { users: roomUsers });
  }

  private handleClientMouseMove(socket: Socket, coordinates: any) {
    console.log("Received mouse move:", coordinates);
    // Broadcast coordinates to everyone in the room except the sender
    socket.to(this.room).emit("server:mouseMove", coordinates);
  }
  private handleDisconnect(socket: Socket) {
    const disconnectedUser = this.socketToUser[socket.id];
    console.log(`User ${disconnectedUser} disconnected`);
    delete this.socketToUser[socket.id];
    this.usersInRooms[this.room] = this.usersInRooms[this.room].filter(
      (user) => user !== disconnectedUser
    );
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
