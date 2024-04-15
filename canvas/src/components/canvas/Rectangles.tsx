import { useEffect, useRef } from "react";

const Rectangles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);



  const handelRectanglestart = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // console.log("mouse down");
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    canvas2d.fillRect(x, y, 100, 100);
  };

  return (
    <div>
      <canvas
        onClick={handelRectanglestart}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </div>
  );
};
export default Rectangles;
 