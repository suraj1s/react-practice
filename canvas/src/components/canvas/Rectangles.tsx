import { useEffect, useRef, useState } from "react";
import Rectangle from "../../utils/canvas/rectangle";

interface isIntersecting {
  isIntersectingLeft: boolean;
  isIntersectingRight: boolean;
}

const Rectangles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState<isIntersecting>({
    isIntersectingLeft: false,
    isIntersectingRight: false,
  });
  const [rectangle, setRectangle] = useState<Rectangle | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  }, []);

  const handelRectanglestart = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current) return;
    if (isIntersecting.isIntersectingLeft || isIntersecting.isIntersectingRight) return;

    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    setStartX(x);
    setStartY(y);
    const rect = new Rectangle(canvas2d, x, y, 100, 100);
    setRectangle(rect);
  };

  const handelRectangleResize = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasRef.current || !rectangle) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;
    console.log(
      x - startX,
      y - startY,
      "width and height",
      rectangle?.isIntersecting(x, y),
      "isIntersecting"
    );
    const intersectingState = rectangle?.isIntersecting(x, y);
    setIsIntersecting(prevState => ({
      ...prevState,
      isIntersectingLeft: intersectingState?.isIntersectingLeft || false,
      isIntersectingRight: intersectingState?.isIntersectingRight || false
    }));
    // if (isIntersecting.isIntersectingLeft) {
    //   rectangle?.update(x);
    // }
    if (isIntersecting.isIntersectingRight) {
      rectangle?.update(x);
    }
  };

  return (
    <div>
      <canvas
        onMouseDown={handelRectanglestart}
        onMouseMoveCapture={handelRectangleResize}
        ref={canvasRef}
        className={` border-2  border-slate-300 rounded-md  ${
          isIntersecting.isIntersectingLeft && "cursor-ew-resize"
        } ${isIntersecting.isIntersectingRight && "cursor-ew-resize"}`}
      />
    </div>
  );
};

export default Rectangles;





// import { useEffect, useRef, useState } from "react";
// import Rectangle from "../../utils/canvas/rectangle";

// interface isIntersecting {
//   isIntersectingLeft: boolean;
//   isIntersectingRight: boolean;
// }
// const Rectangles = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [isIntersecting, setIsIntersecting] = useState<isIntersecting>({
//     isIntersectingLeft: false,
//     isIntersectingRight: false,
//   });
//   const [rectangle, setRectangle] = useState<Rectangle | null>(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;
//     canvasRef.current.width = window.innerWidth;
//     canvasRef.current.height = window.innerHeight;
//   }, []);

//   const handelRectanglestart = (
//     e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
//   ) => {
//     if (!canvasRef.current) return;
//     if(isIntersecting.isIntersectingLeft || isIntersecting.isIntersectingRight) return;

//     const canvas2d = canvasRef.current.getContext("2d");
//     if (!canvas2d) return;
//     const x = e.clientX - canvasRef.current.offsetLeft;
//     const y = e.clientY - canvasRef.current.offsetTop;
//     setStartX(x);
//     setStartY(y);
//     const rect = new Rectangle(canvas2d, x, y, 100, 100);
//     setRectangle(rect);
//   };

//   const handelRectangleResize = (
//     e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
//   ) => {
//     if (!canvasRef.current) return;
//     const canvas2d = canvasRef.current.getContext("2d");
//     if (!canvas2d) return;
//     const x = e.clientX - canvasRef.current.offsetLeft;
//     const y = e.clientY - canvasRef.current.offsetTop;
//     console.log(
//       x - startX,
//       y - startY,
//       "width and height",
//       rectangle?.isIntersecting(x, y),
//       "isIntersecting"
//     );
//     if (rectangle?.isIntersecting(x, y)) {
//       setIsIntersecting(rectangle?.isIntersecting(x, y));
//     }
//     if (isIntersecting.isIntersectingLeft) {
//       rectangle?.update(x);
//     }
//     if (isIntersecting.isIntersectingRight) {
//       rectangle?.update(undefined, x);
//     }
//   };
//   return (
//     <div>
//       <canvas
//         onMouseDown={handelRectanglestart}
//         onMouseMoveCapture={handelRectangleResize}
//         // onMouseUp={() => setIsResizing(!isResizing)}
//         ref={canvasRef}
//         className={` border-2  border-slate-300 rounded-md  ${
//           isIntersecting.isIntersectingLeft && "cursor-ew-resize"
//         } ${isIntersecting.isIntersectingRight && "cursor-ew-resize"}`}
//       />
//     </div>
//   );
// };
// export default Rectangles
