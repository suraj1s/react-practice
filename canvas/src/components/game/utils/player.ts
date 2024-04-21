class Player {
  constructor(
    public canvas2d : CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public speed: number,
  ) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

}