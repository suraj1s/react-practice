import { useEffect, useRef } from "react";
import Template from "../../utils/canvas/template";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../utils/constants";

const Lines = () => {
  let isDrawing = false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height =  CANVAS_HEIGHT;
  }, []);

  let template: Template | null = null;

  const handelMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    console.log("mouse down");
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    template = new Template(canvas2d,x,y);
    template.drawTemplate();
  };

  const handelMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!isDrawing) return;
    if (!canvasRef.current) return;
    if(!template) return;
    console.log('mouse move')
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    template.updateTemplate({ x,y });
  };

  return (
    <div className="space-y-2">
      <button className="border rounded-md px-3 py-1 ">Clear All</button>
      <canvas
        onMouseDown={(e) => {
          isDrawing = true;
          handelMouseDown(e);
        }}
        onMouseMoveCapture={(e) => {
          handelMouseMove(e);
        
        }}
        onMouseUp={() => {
          isDrawing = false;
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </div>
  );
};
export default Lines;
