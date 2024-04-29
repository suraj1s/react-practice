import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";

class Projectile {
  x: number;
  y: number;
  public isFree = true;

  constructor(
    public canvas2d: CanvasRenderingContext2D | null | undefined,
    public speed: number,
    public width: number,
    public height: number,
    isFree: boolean
  ) {
    this.canvas2d = canvas2d;
    this.speed = speed;
    this.x = CANVAS_WIDTH / 2 - this.width / 2 - 100;
    this.y = CANVAS_HEIGHT / 2;
    this.width = width;
    this.height = height;
    this.isFree = isFree;
    console.log("projectile constructor called...");
  }

  draw() {
    console.log(
      "wepon draw.....",
      this.canvas2d,
      this.x,
      this.height,
      this.width
    );
    if (!this.canvas2d) return;
    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.canvas2d.fillStyle = "red";
    this.canvas2d.fillRect(
      this.x,
      CANVAS_HEIGHT - this.height,
      this.width,
      this.height
    );
  }

  fire() {
    if (!this.isFree) {
      this.y -= this.speed;
      this.draw();
    }
    if (this.y < 0) this.isFree = true;
  }

  start({ x, y }: { x: number; y: number }) {
    this.isFree = false;
    this.x = x;
    this.y = y;
  }

  stop() {
    this.isFree = true;
  }
}

export default Projectile;
