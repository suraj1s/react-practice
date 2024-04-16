import { useEffect, useRef } from "react";
import Circle from "../../utils/canvas/circle";

const Circles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth *  0.8;
    canvasRef.current.height = window.innerHeight *  0.8;
  }, []);

  const circles: Circle[] = [];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;

    const animateCircle = () => {
      canvas2d.clearRect(0, 0, innerWidth *  0.8, innerHeight *  0.8);
      circles.forEach((circle) => {
        circle.updateCircle({});
      });
    };
    animateCircle();
    const interval = setInterval(() => {
      requestAnimationFrame(animateCircle);
    }, 10);

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
    const radius = Math.random() * 10 + 100;
    const randomColor = "#" + Math.floor(Math.random() * 9999).toString(16);
    const circle = new Circle(canvas2d, x, y, radius, randomColor);
    circles.push(circle);
  };

  const handelCircleAnimation = (e : React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!e.currentTarget) return;
    const mouseMoveX = e.clientX - e.currentTarget.offsetLeft;
    const mouseMoveY = e.clientY - e.currentTarget.offsetTop;
    // console.log(mouseMoveX, mouseMoveY , "mouseMoveX, mouseMoveY")
      circles.forEach((circle) => {
        circle.updateCircle({mouseMoveX, mouseMoveY});
      }
    );
  }

  return (
    <div>
      <canvas
        onClick={(e) => {
          handelCircle(e);
        }}
        onMouseMove={(e) => {
          handelCircleAnimation(e);
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </div>
  );
};
export default Circles;
