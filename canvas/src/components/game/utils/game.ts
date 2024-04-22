import Player from "./player";

class Game{
    public player: Player;
    public canvas2d: CanvasRenderingContext2D | null | undefined;
    playerSpeed = 100;
    playerHeight = 30;
    playerWIdth = 50;
    constructor(
        public canvasRef:  React.RefObject<HTMLCanvasElement> | null,
    ){
        this.canvasRef = canvasRef;
        if(canvasRef){
            this.canvas2d = canvasRef.current?.getContext("2d")
        }
        this.canvas2d
        this.player = new Player(this.canvas2d, this.playerSpeed, this.playerHeight, this.playerWIdth);
    }
    movePlayer(direction : "left" | "right"){
        this.player.move(direction)
    }

}

export default Game;