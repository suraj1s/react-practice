import { CANVAS_COLOR_NUMBER, CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

class Whiteboard {
  canvas2d: CanvasRenderingContext2D;
  x: number;
  y: number;
  randomColor: string;
  constructor(canvas2d: CanvasRenderingContext2D, x: number, y: number, randomColor: string) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.randomColor = randomColor;
    this.drawWhiteboard();
  }
  getRandHexColor = () => {
    return "#" + Math.floor(Math.random() * CANVAS_COLOR_NUMBER).toString(16);
  };

  drawWhiteboard = () => {
    this.canvas2d.beginPath();
    this.canvas2d.moveTo(this.x, this.y);
    this.canvas2d.strokeStyle = this.randomColor;
    this.canvas2d.stroke();
  };

  updateWhiteboard = ({ x, y }: { x?: number; y?: number }) => {
    if (x && y) {
      this.canvas2d.lineTo(x, y);
      this.canvas2d.strokeStyle = this.randomColor;
      this.canvas2d.stroke();
    }
  };

  clearWhiteboard = () => {
    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

export default Whiteboard;
