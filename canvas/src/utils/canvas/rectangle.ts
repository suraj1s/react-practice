class Rectangle {
  x: number;
  y: number;
  canvas2d: CanvasRenderingContext2D
  width: number;
  height: number;

  constructor(canvas2d: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    this.canvas2d = canvas2d;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw();
  }

  draw() {
   this.canvas2d.fillRect(this.x, this.y, this.width, this.height);
  }

  // for editing the rectangle i.e resizing from all sides and corners
  updateSideRight = (mouseMoveX: number) => {
    this.width = mouseMoveX - this.x;
  };
//   updateSideLeft = (mouseMoveX: number) => {
//     this.width = this.x - mouseMoveX;
//     this.x = mouseMoveX;
//   };
updateSideBottom = (mouseMoveY: number) => {
    this.height = mouseMoveY - this.y;
  }
}

export default Rectangle;