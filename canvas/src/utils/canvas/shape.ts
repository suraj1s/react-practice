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
    this.canvas2d.strokeStyle = "gray";
    this.canvas2d.beginPath();
    this.canvas2d.save();
    const noOfSides = 9;
    const degree = Math.PI / noOfSides;
    const radius = 100;
    const inset = 0.5;

    this.canvas2d.translate(this.x, this.y);
    // this.canvas2d.moveTo(0, 0); // start

    for (let i = 0; i < noOfSides; i++) {
      this.canvas2d.rotate(degree); // rotate canvas by 90 degrees
      this.canvas2d.lineTo(0, radius); // got to
      this.canvas2d.rotate(degree); // rotate canvas by 90 degrees
      this.canvas2d.lineTo(0, radius * inset); // goto inner
    }

    this.canvas2d.closePath();
    this.canvas2d.restore();
    this.canvas2d.stroke();
  };

  updateShape = ({ x, y }: { x?: number; y?: number }) => {
    if (x && y) {
      this.x = x;
      this.y = y;
    }
  };

  clearShape = () => {
    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

export default Shape;
