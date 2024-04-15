class Rectangle {
  x: number;
  y: number;
  canvas2d: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(
    canvas2d: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw();
  }

  draw() {
    this.canvas2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.canvas2d.strokeRect(this.x, this.y, this.width, this.height)
  }

  update(x?: number, y?: number) {
    if(x) this.width = x - this.x;
    if(y) this.height = y - this.y;
    this.draw();
  }

  isIntersecting(x: number, y: number) {
    const isIntersectingLeft = x > this.x - 5 && x < this.x + 5;
    const isIntersectingRight = x > this.x + this.width - 5 && x < this.x + this.width + 5;
    return {
      isIntersectingLeft,
      isIntersectingRight
    }
  }
}

export default Rectangle;
