import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";

class Player {
  x: number;
  constructor(
    public canvas2d: CanvasRenderingContext2D | null | undefined,
    public speed: number,
    public width: number,
    public height: number
  ) {
    this.canvas2d = canvas2d;
    this.speed = speed;
    this.x = CANVAS_WIDTH / 2 - this.width / 2 - 100;
    this.width = width;
    this.height = height;
    this.draw();
  }

  draw() {
    console.log("player draw");
    if (!this.canvas2d) return;
    this.canvas2d.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    console.log("player draw.....");
    this.canvas2d.fillStyle = "red";
    this.canvas2d.fillRect(
      this.x,
      CANVAS_HEIGHT - this.height,
      this.width,
      this.height
    );
  }

  move(direction: "left" | "right") {
 if (direction === "left" && !(this.x  <= 0) ) {
      this.x -= this.speed;
      console.log("player...", this.x);
    } else if (direction === "right" && !(this.x  >= CANVAS_WIDTH - this.width)) {
      this.x += this.speed;
      console.log("player...", this.x);
    }
    this.draw();
  }
}

export default Player;