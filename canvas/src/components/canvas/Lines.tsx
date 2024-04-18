import { useEffect, useRef } from "react";
import Line from "../../utils/canvas/line";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../utils/constants";

const Lines = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth *  CANVAS_WIDTH;
    canvasRef.current.height = window.innerHeight *  CANVAS_HEIGHT;
  }, []);

  let line: Line | null = null;
  const handelLineStart = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // console.log("mouse down");
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const randomColor = "#" + Math.floor(Math.random() * 999).toString(16);
    line = new Line(canvas2d, randomColor);
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    line?.drawLine({ x, y });
  };

  const handelLineMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!line) return;
    if (!canvasRef.current) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
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
