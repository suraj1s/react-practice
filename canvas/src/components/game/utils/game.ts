import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";
import Player from "./player";
import Projectile from "./projectile";

// interface renderParams {
//   direction: "left" | "right"
// }

class Game {
  public player: Player;
  playerSpeed = 100;
  playerHeight = 30;
  playerWIdth = 50;
  public projectiles: Projectile[] = [];
  noOfProjectiles: number = 15;

  constructor(public canvas2d: CanvasRenderingContext2D | null) {
    this.canvas2d = canvas2d;
    this.player = new Player(
      this,
      this.playerSpeed,
      this.playerHeight,
      this.playerWIdth
    );
    this.createProjectiles();
    console.log(this.projectiles);

    // event listners
    addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  // TODO: render should be called insite animate function and reanimate it using  requestanimationframe
  handleKeyDown(e: KeyboardEvent) {
    console.log(e.key);
    if (e.key === "ArrowLeft") {
      console.log(this.player);
      this.player.move("left");
      this.render()
    }
    if (e.key === "ArrowRight") {
      this.player.move("right");
      this.render()
    }

    if(e.key === "f"){
      
    }
  }

  render() {
    if (!this.canvas2d) return;
    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.player.draw(this.canvas2d);
  }
  movePlayer() {}

  // creacting object pool to address memory performance issue
  createProjectiles() {
    for (let i = 0; i < this.noOfProjectiles; i++) {
      const p = new Projectile(
        this.canvas2d,
        this.playerSpeed,
        this.playerHeight + 200,
        this.playerWIdth + 200,
        true
      );
      this.projectiles.push(p);
    }
  }
  // get the free projectile from the pool
  getFreeProjectile() {
    for (let i = 0; i < this.noOfProjectiles; i++) {
      if (this.projectiles[i].isFree) {
        return this.projectiles[i];
      }
    }
  }
}

export default Game;
