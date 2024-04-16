import { useEffect, useRef, useState } from "react";
import Rectangle from "../../utils/canvas/rectangle";

const Rectangles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth * 0.8;
    canvasRef.current.height = window.innerHeight * 0.8;
  }, []);
  let dragTL = false;
  let dragBL = false;
  let dragTR = false;
  let dragBR = false;

  const closeEnough = 10;
  function checkCloseEnough({ p1, p2 }: { p1: number; p2: number }) {
    return Math.abs(p1 - p2) < closeEnough;
  }

  const handelRectanglestart = () => {
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    const rect = new Rectangle(canvas2d, x, y, 100, 100);
    setRectangle(rect);
  };

  const handelRectangleIsResize = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current || !rectangle) return;

    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    // check Top Left
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y })
    ) {
      dragTL = true;
    }

    // check Bottom Left
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y + rectangle.height })
    ) {
      dragBL = true;
    }

    // check Top Right
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x + rectangle.width }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y })
    ) {
      dragTR = true;
    }

    // check Bottom Right
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x + rectangle.width }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y + rectangle.height })
    ) {
      dragBR = true;
    }
  };

  const handelRectangleResize = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current || !rectangle) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    if (dragTL) {
      rectangle.width += rectangle.x - x;
      rectangle.height += rectangle.y - y;
      rectangle.x = x;
      rectangle.y = y;
    } else if (dragTR) {
      rectangle.width = Math.abs(rectangle.x - x);
      rectangle.height += rectangle.y - y;
      rectangle.y = y;
    } else if (dragBL) {
      rectangle.width += rectangle.x - x;
      rectangle.height = Math.abs(rectangle.y - y);
      rectangle.x = x;
    } else if (dragBR) {
      rectangle.width = Math.abs(rectangle.x - x);
      rectangle.height = Math.abs(rectangle.y - y);
    }
    rectangle.draw();
  };

  return (
    <div>
      <canvas
        onMouseDown={handelRectangleIsResize}
        onMouseMoveCapture={handelRectangleResize}
        onMouseUp={() => {
          dragTL = false;
          dragBL = false;
          dragTR = false;
          dragBR = false;
        }}
        ref={canvasRef}
        className={` border-2  border-slate-300 rounded-md `}
      />
      <button onClick={handelRectanglestart}>Create Rect</button>
    </div>
  );
};

export default Rectangles;