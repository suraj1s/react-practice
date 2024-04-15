import { useEffect, useRef } from "react";
import Line from "../../utils/canvas/line";

const Lines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  let line: Line | null = null;
  const handelLineStart = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // console.log("mouse down");
    if (!e.currentTarget) return;
    const canvas2d = e.currentTarget.getContext("2d");
    if (!canvas2d) return;
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    line = new Line(canvas2d, randomColor);
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    line?.drawLine({ x, y });
  };

  const handelLineMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // console.log("mouse move");
    if (!line) return;
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    line.updateLine({ mouseMoveX: x, mouseMoveY: y });
  };

  return (
    <div>
      <canvas
        onMouseDown={handelLineStart}
        onPointerMove={handelLineMove}
        onMouseUp={() => {
          // console.log("mouse up");
          line = null;
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </div>
  );
};
export default Lines;
