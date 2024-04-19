import { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../utils/constants";
import { useSocket } from "../../context/socketProvider";
import Whiteboard from "../../utils/canvas/socket-canvas";

const Main = () => {
  let isDrawing = false;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { sendMouseMove, mouseMove, roomMembers } = useSocket();

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
  }, []);

  const [remoteTemplate, setRemoteTemplate] = useState<Whiteboard | null>(null);
  let template: Whiteboard | null = null;

  const handelMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    template = new Whiteboard(canvas2d, x, y, "white");
    template.drawWhiteboard();
  };

  const handelMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!template) return;
    if (!isDrawing) return;
    if (!canvasRef.current) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    template.updateWhiteboard({ x, y });
    sendMouseMove({ x, y });
  };

  // remote mouse move event

  useEffect(() => {
    if (!mouseMove) return;
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    if (!remoteTemplate) {
      const remoteTemplateTemp = new Whiteboard(
        canvas2d,
        mouseMove.x,
        mouseMove.y,
        "red"
      );
      setRemoteTemplate(remoteTemplateTemp);
    } else {
      remoteTemplate.updateWhiteboard(mouseMove);
    }
  }, [mouseMove]);

  return (
    <div className="space-y-2 p-10">
        <h1 className="text-2xl">{JSON.stringify(roomMembers)}</h1>
      <button
        className="border rounded-md px-3 py-1 "
        onClick={() => {
          if (template) template.clearWhiteboard();
        }}
      >
        Clear All
      </button>
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
export default Main;
