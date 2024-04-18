import { CANVAS_COLOR_NUMBER, CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

class Shape {
  canvas2d: CanvasRenderingContext2D;
  x: number;
  y: number;
  randomColor: string;
  constructor(canvas2d: CanvasRenderingContext2D, x: number, y: number) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.randomColor = this.getRandHexColor();
    this.drawShape();
  }
  getRandHexColor = () => {
    return "#" + Math.floor(Math.random() * CANVAS_COLOR_NUMBER).toString(16);
  };

  drawShape = () => {
    this.canvas2d.beginPath();
    this.canvas2d.moveTo(this.x, this.y);
    this.canvas2d.strokeStyle = this.randomColor;
    this.canvas2d.stroke();
  };

  updateShape = ({ x, y }: { x?: number; y?: number }) => {
    if (x && y) {
      this.canvas2d.lineTo(x, y);
      this.canvas2d.strokeStyle = this.randomColor;
      this.canvas2d.stroke();
    }
  };

  clearShape = () => {
    this.canvas2d.clearRect(
      0,
      0,
      window.innerWidth * CANVAS_WIDTH,
      window.innerHeight * CANVAS_HEIGHT
    );
  };
}

export default Shape;
