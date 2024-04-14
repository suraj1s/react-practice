class Circle {
  canvas2d: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  randomColor: string;
  dx?: number;
  dy?: number;
  constructor(
    canvas2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    randomColor: string,
    dx: number = 1 * (Math.random() > 0.5 ? 1 : -1),
    dy: number = 1 * (Math.random() > 0.5 ? 1 : -1)
  ) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.randomColor = randomColor;
    this.dx = dx;
    this.dy = dy;
  }

  drawCircle = () => {
    this.canvas2d.beginPath();
    this.canvas2d.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.canvas2d.strokeStyle = this.randomColor;
    this.canvas2d.stroke();
  };

  //   getRandHexColor = () => {
  //     return "#" + Math.floor(Math.random() * 16777215).toString(16);
  //   };

  updateCircle = () => {
    // drawing
    this.canvas2d.fillStyle = this.randomColor;
    this.canvas2d.fillRect(
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );
    this.drawCircle();

    // updating position
    if (
      this.dx &&
      (this.x + this.radius > innerWidth || this.x - this.radius < 0)
    ) {
      this.dx = -this.dx;
    }
    if (
      this.dy &&
      (this.y + this.radius > innerHeight || this.y - this.radius < 0)
    ) {
      this.dy = -this.dy;
    }
    if (this.dx) this.x += this.dx;
    if (this.dy) this.y += this.dy;

    // interactivity
   
  };
}

export default Circle;
