import { useEffect, useRef, useState } from "react";
import Rectangle from "../../utils/canvas/rectangle";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../utils/constants";

const Rectangles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
  }, []);
  let dragTL = false;
  let dragBL = false;
  let dragTR = false;
  let dragBR = false;
  let dragT = false;
  let dragL = false;
  let dragB = false;
  let dragR = false;

  const closeEnough = 5;
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

    // check Top
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x + rectangle.width / 2 }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y })
    ) {
      dragT = true;
    }

    // check Left
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y + rectangle.height / 2 })
    ) {
      dragL = true;
    }

    // check Bottom
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x + rectangle.width / 2 }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y + rectangle.height })
    ) {
      dragB = true;
    }

    // check Right
    if (
      checkCloseEnough({ p1: x, p2: rectangle.x + rectangle.width }) &&
      checkCloseEnough({ p1: y, p2: rectangle.y + rectangle.height / 2 })
    ) {
      dragR = true;
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
    // for four corners
    if (dragTL) {
      rectangle.width += rectangle.x - x;
      rectangle.height += rectangle.y - y;
      rectangle.x = x;
      rectangle.y = y;
    } else if (dragTR) {
      rectangle.width = -(rectangle.x - x);
      rectangle.height += rectangle.y - y;
      rectangle.y = y;
    } else if (dragBL) {
      rectangle.width += rectangle.x - x;
      rectangle.height = -(rectangle.y - y);
      rectangle.x = x;
    } else if (dragBR) {
      rectangle.width = -(rectangle.x - x);
      rectangle.height = -(rectangle.y - y);
    } else if (dragT) {
      rectangle.height += rectangle.y - y;
      rectangle.y = y;
    } else if (dragL) {
      rectangle.width += rectangle.x - x;
      rectangle.x = x;
    } else if (dragB) {
      rectangle.height = -(rectangle.y - y);
    } else if (dragR) {
      rectangle.width = -(rectangle.x - x);
    }
    rectangle.draw();
  };

  return (
    <div className="space-y-4">
      <button
        className="border rounded-md px-3 py-1 "
        onClick={handelRectanglestart}
      >
        Create Rect
      </button>

      <canvas
        onMouseDown={handelRectangleIsResize}
        onMouseMoveCapture={handelRectangleResize}
        onMouseUp={() => {
          dragTL = false;
          dragBL = false;
          dragTR = false;
          dragBR = false;
          dragT = false;
          dragL = false;
          dragB = false;
          dragR = false;
        }}
        ref={canvasRef}
        className={` border-2  border-slate-300 rounded-md `}
      />
    </div>
  );
};

export default Rectangles;
