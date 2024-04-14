import { useEffect, useRef } from "react";
import Circle from "./utils/canvas/circle";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  const circles: Circle[] = [];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const animateCircle = () => {
      canvas2d.clearRect(0, 0, innerWidth, innerHeight);
      circles.forEach((circle) => {
        circle.updateCircle();
      });
    };

    const interval = setInterval(() => {
      animateCircle();
      requestAnimationFrame(animateCircle);
    }, 2);

    return () => {
      clearInterval(interval);
    };
  }, [circles]);

  const handelCircle = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!e.currentTarget) return;
    const canvas2d = e.currentTarget.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    const radius = 30;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const circle = new Circle(canvas2d, x, y, radius, randomColor);
    circles.push(circle);
    console.log(circles, "circles");

    // const animateCircle = () => {
    //   requestAnimationFrame(animateCircle);
    //   canvas2d.clearRect(0, 0, innerWidth, innerHeight);
    //   circles.forEach((circle) => {
    //     circle.updateCircle();
    //   });
    // };
    // animateCircle();
  };

  return (
    <body className="min-h-screen min-w-screen  bg-slate-100 ">
      <canvas
        onClick={(e) => {
          handelCircle(e);
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </body>
  );
};
export default App;
