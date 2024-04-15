class Line {
  canvas2d: CanvasRenderingContext2D;
  randomColor: string;
  constructor(
    canvas2d: CanvasRenderingContext2D,

    randomColor: string
  ) {
    this.canvas2d = canvas2d;
    this.randomColor = randomColor;
  }

  drawLine = ({ x, y }: { x: number; y: number }) => {
    this.canvas2d.beginPath();
    this.canvas2d.moveTo(x, y);
    this.canvas2d.strokeStyle = "red";
    this.canvas2d.stroke();
  };

  updateLine = ({
    mouseMoveX,
    mouseMoveY,
  }: {
    mouseMoveX?: number;
    mouseMoveY?: number;
  }) => {
    if (mouseMoveX && mouseMoveY) {
      this.canvas2d.lineTo(mouseMoveX, mouseMoveY);
      this.canvas2d.strokeStyle = this.randomColor;
      this.canvas2d.stroke();
    }
  };

  clearLine = () => {
    this.canvas2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };
}

export default Line;
