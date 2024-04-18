import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

class Rectangle {
  x: number;
  y: number;
  canvas2d: CanvasRenderingContext2D;
  width: number;
  height: number;
  closeEnough = 5;
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
    this.canvas2d.clearRect(
      0,
      0,
       window.innerWidth * CANVAS_WIDTH,
       window.innerHeight * CANVAS_HEIGHT,
    );
    this.canvas2d.strokeStyle = "white";
    this.canvas2d.strokeRect(this.x, this.y, this.width, this.height);
    this.drawHandles();
  }

  drawHandles() {
    // for four corners
    this.drawCircle(this.x, this.y, this.closeEnough);
    this.drawCircle(this.x + this.width, this.y, this.closeEnough);
    this.drawCircle(
      this.x + this.width,
      this.y + this.height,
      this.closeEnough
    );
    this.drawCircle(this.x, this.y + this.height, this.closeEnough);
    
    // for four sides
    this.drawCircle(this.x + this.width / 2, this.y, this.closeEnough);
    this.drawCircle(this.x + this.width / 2, this.y + this.height, this.closeEnough);
    this.drawCircle(this.x, this.y + this.height / 2, this.closeEnough);
    this.drawCircle(this.x + this.width, this.y + this.height / 2, this.closeEnough);
  }

  drawCircle(x: number, y: number, radius: number) {
    this.canvas2d.fillStyle = "gray";
    this.canvas2d.beginPath();
    this.canvas2d.arc(x, y, radius, 0, 2 * Math.PI);
    this.canvas2d.fill();
  }


  update(x?: number, y?: number) {
    if (x) this.width = x - this.x;
    if (y) this.height = y - this.y;
    this.draw();
  }



  isIntersecting(x: number, y: number) {
    const isIntersectingLeft = x > this.x - 5 && x < this.x + 5;
    const isIntersectingRight =
      x > this.x + this.width - 5 && x < this.x + this.width + 5;
    return {
      isIntersectingLeft,
      isIntersectingRight,
    };
  }
}

export default Rectangle;
