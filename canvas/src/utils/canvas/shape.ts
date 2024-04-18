import { CANVAS_COLOR_NUMBER, CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";

class Shape {
  canvas2d: CanvasRenderingContext2D;
  x: number;
  y: number;
  randomColor: string;
  private colorCount = 30;
  private angle = 0;
  constructor(canvas2d: CanvasRenderingContext2D, x: number, y: number) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.randomColor = this.getRandHexColor();
    // this.drawShape();
  }
  getRandHexColor = () => {
    return "#" + Math.floor(Math.random() * CANVAS_COLOR_NUMBER).toString(16);
  };

  drawShape = ({noOfSides, radius, degree, inset} : {
    noOfSides: number;
    radius: number;
    degree: number;
    inset: number;
  }) => {
    this.canvas2d.strokeStyle = `black`;
    this.canvas2d.fill();
    this.canvas2d.lineWidth = 2;
    // this.canvas2d.shadowBlur = 10;
    // this.canvas2d.shadowOffsetX = 10;
    // this.canvas2d.shadowOffsetY = 10;
    // this.canvas2d.shadowColor = `hsl(${this.colorCount}, 100%, 50%)`;
    this.colorCount += 5;
    // this.canvas2d.globalCompositeOperation = "source-over";

    this.canvas2d.beginPath();
    this.canvas2d.save();
    // experiment with this values...
    // const noOfSides = 6;
    // const degree = Math.PI / noOfSides;
    // const radius = 40;
    // const inset = 0.5;

    this.canvas2d.translate(this.x, this.y);

    this.canvas2d.moveTo(0, radius); // start
    for (let i = 0; i < noOfSides; i++) {
      this.canvas2d.rotate(degree); // rotate canvas by 90 degrees
      this.canvas2d.lineTo(0, radius * inset); // goto inner
      this.canvas2d.rotate(degree); // rotate canvas by 90 degrees
      this.canvas2d.lineTo(0, radius); // got to
    }


    this.canvas2d.closePath();
    this.canvas2d.restore();
    this.canvas2d.stroke();
  };

  updateShape = ({ x, y }: { x?: number; y?: number }) => {
    if (x && y) {
      // for rotating the shape
      this.canvas2d.save();

      this.canvas2d.translate(x, y);
      // as the x,y  is the center of the shape and on point 0,0 of canvas
      this.x = 10;
      this.y = 20;

      this.canvas2d.rotate(this.angle * 3);
      this.canvas2d.fillStyle = `white`;
      this.drawShape({noOfSides: 6, radius: 50, degree: Math.PI / 6, inset: 0.5});

      this.x = 70;
      this.y = 60;
      this.canvas2d.rotate(this.angle);
      this.canvas2d.fillStyle = `green`;
      this.drawShape({noOfSides: 2, radius: 20, degree: Math.PI / 2, inset: 0.8});
      
      this.angle += 0.1;
      this.canvas2d.restore();

      // for moving the shape
      // this.x = x;
      // this.y = y;
      // this.drawShape();
    }
  };

  clearShape = () => {
    this.canvas2d.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };
}

export default Shape;
