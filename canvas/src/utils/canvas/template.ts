import { CANVAS_COLOR_NUMBER, CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

class Template {
  canvas2d: CanvasRenderingContext2D;
  x: number;
  y: number;
  randomColor: string;
  constructor(canvas2d: CanvasRenderingContext2D, x: number, y: number) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.randomColor = this.getRandHexColor();
    this.drawTemplate();
  }
  getRandHexColor = () => {
    return "#" + Math.floor(Math.random() * CANVAS_COLOR_NUMBER).toString(16);
  };

  drawTemplate = () => {
    this.canvas2d.beginPath();
    this.canvas2d.moveTo(this.x, this.y);
    this.canvas2d.strokeStyle = this.randomColor;
    this.canvas2d.stroke();
  };

  updateTemplate = ({ x, y }: { x?: number; y?: number }) => {
    if (x && y) {
      this.canvas2d.lineTo(x, y);
      this.canvas2d.strokeStyle = this.randomColor;
      this.canvas2d.stroke();
    }
  };

  clearTemplate = () => {
    this.canvas2d.clearRect(
      0,
      0,
     CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  };
}

export default Template;
