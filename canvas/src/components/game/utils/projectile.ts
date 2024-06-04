class Projectile {
  x: number;
  y: number;
  public isFree = true;

  public width: number;
  public height: number;
  public speed: number;

  constructor() {
    this.speed = 20;
    this.width = 40;
    this.height = 20;
    this.x = 0;
    this.y = 0;
    console.log("projectile constructor called...");
  }

  draw(canvas2d: CanvasRenderingContext2D | null) {
    console.log("wepon draw.....", this.x, this.height, this.width);
    if (!canvas2d) return;
    canvas2d.fillStyle = "blue";
    canvas2d.fillRect(this.x, this.y, this.width, this.height);
  }

  fire() {
    if (!this.isFree) {
      this.y -= this.speed;
      console.log(this.y);
    }
    if (this.y < 0) this.reset();
  }

  start({ x, y }: { x: number; y: number }) {
    this.x = x - this.width /2 ;
    this.y = y;
    this.isFree = false;
  }

  reset() {
    this.isFree = true;
  }
}

export default Projectile;
