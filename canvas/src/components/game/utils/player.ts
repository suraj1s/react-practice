import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";
import Game from "./game";

class Player {
  x: number;
  y: number;
  constructor(
    public game: Game,
    public speed: number,
    public width: number,
    public height: number
  ) {
    this.game = game;
    this.speed = speed;
    this.x = CANVAS_WIDTH / 2 - this.width / 2 - 100;
    this.y = CANVAS_HEIGHT - this.height;
    this.width = width;
    this.height = height;
  }

  draw(canvas2d: CanvasRenderingContext2D | null) {
    // console.log("player draw.....", canvas2d, this.x, this.height,this.width);
    if (!canvas2d) return;
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(
      this.x,
      CANVAS_HEIGHT - this.height,
      this.width,
      this.height
    );
  }

  update() {
    if (this.game.keys.indexOf("ArrowLeft") > -1 && !(this.x <= 0)) {
      this.x -= this.speed;
    } else if (
      this.game.keys.indexOf("ArrowRight") > -1 &&
      !(this.x >= CANVAS_WIDTH - this.width)
    ) {
      this.x += this.speed;
    }
  }

  shoot() {
    const projectile = this.game.getFreeProjectile();
    if (projectile) {
      projectile.start({ x: this.x, y: this.y });
    }
  }
}

export default Player;
