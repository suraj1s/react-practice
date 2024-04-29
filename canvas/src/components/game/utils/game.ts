import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";
import Player from "./player";
import Projectile from "./projectile";

class Game {
  public player: Player;
  playerSpeed = 20;
  playerHeight = 30;
  playerWidth = 50;
  public projectilesPool: Projectile[] = [];
  noOfProjectiles: number = 15;
  keys: string[] = [];
  constructor(public canvas2d: CanvasRenderingContext2D | null) {
    this.canvas2d = canvas2d;
    this.player = new Player(
      this,
      this.playerSpeed,
      this.playerWidth,
      this.playerHeight,
    );
    this.createProjectiles();
    console.log(this.projectilesPool);

    // event listners
    addEventListener("keydown", (e) => {
      if (this.keys.indexOf(e.key) === -1) {
        this.keys.push(e.key);
        if (e.key === "f") this.player.shoot();
      }
    });
    addEventListener("keyup", (e) => {
      const index = this.keys.indexOf(e.key);
      if (index > -1) {
        this.keys.splice(index, 1);
      }
    });
  }

  render() {
    if (!this.canvas2d) return;
    console.log("rendered");

    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.player.draw(this.canvas2d);
    this.player.update();

    this.projectilesPool.forEach((projectile) => {
      if (!projectile.isFree) {
        projectile.fire();
        projectile.draw(this.canvas2d);
      }
    });
  }
  movePlayer() {}

  // creacting object pool to address memory performance issue
  createProjectiles() {
    for (let i = 0; i < this.noOfProjectiles; i++) {
      const p = new Projectile();
      this.projectilesPool.push(p);
    }
  }
  // get the free projectile from the pool
  getFreeProjectile() {
    for (let i = 0; i < this.noOfProjectiles; i++) {
      if (this.projectilesPool[i].isFree) {
        return this.projectilesPool[i];
      }
    }
  }
}

export default Game;
