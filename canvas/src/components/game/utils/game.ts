import Player from "./player";

class Game{
    public player: Player;
    public canvas2d: CanvasRenderingContext2D | null | undefined;

    constructor(
        public canvasRef:  React.RefObject<HTMLCanvasElement> | null,
    ){
        this.canvasRef = canvasRef;
        if(canvasRef){
            this.canvas2d = canvasRef.current?.getContext("2d")
        }
        this.canvas2d
        this.player = new Player(this.canvas2d, 50, 100, 200);
    }
    movePlayer(direction : "left" | "right"){
        this.player.move(direction)
    }

}

export default Game;