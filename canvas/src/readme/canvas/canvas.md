## Canvas Animation and Shapes Drawing

### Function to Handle Animation on Canvas

```typescript
// Function to handle animation on canvas
const handelAnimation = ({
  e,
  randomHexColor,
}: {
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
  randomHexColor: string;
}) => {
  const canvas2d = e.currentTarget.getContext("2d");
  const radius = 30;
  if (!canvas2d) return;

  let x = e.clientX - e.currentTarget.offsetLeft;
  let y = e.clientY - e.currentTarget.offsetTop;

  // Speed of the circle in x and y direction
  let dx = 10;
  let dy = 10;

  const animate = () => {
    canvas2d.clearRect(x - radius, y - radius, x + radius, y + radius);

    // Rectangle
    canvas2d.fillRect(x - radius / 2, y - radius / 2, radius, radius);
    canvas2d.fillStyle = randomHexColor;

    // Circle
    canvas2d.beginPath();
    canvas2d.arc(x, y, radius, 0, Math.PI * 2);
    canvas2d.strokeStyle = randomHexColor;
    canvas2d.stroke();

    // Boundary conditions for bouncing
    if (x + radius > innerWidth || x - radius < 0) {
      dx = -dx;
    }
    if (y + radius > innerHeight || y - radius < 0) {
      dy = -dy;
    }
    x += dx;
    y += dy;
  };
  animate();
};
```

```ts
// useEffect to draw shapes on canvas
useEffect(() => {
  const canvas2d = canvasRef.current?.getContext("2d");
  if (!canvas2d) return;

  // Rectangle
  canvas2d.fillStyle = "blue";
  canvas2d.fillRect(100, 20, 20, 40);

  // Line
  canvas2d.beginPath();
  canvas2d.moveTo(20, 20);
  canvas2d.lineTo(20, 100);
  canvas2d.lineTo(70, 100);
  canvas2d.lineTo(70, 10);
  canvas2d.strokeStyle = "red";
  canvas2d.stroke();

  // Arc / Circle
  canvas2d.beginPath();
  canvas2d.arc(60, 60, 30, 0, 7);
  canvas2d.strokeStyle = "green";
  canvas2d.stroke();
}, []);
```

This Markdown file provides code snippets for handling canvas animation and drawing shapes on a canvas element using React. The first section defines a function to handle animation on the canvas, while the second section utilizes `useEffect` to draw various shapes such as rectangles, lines, and circles on the canvas.
