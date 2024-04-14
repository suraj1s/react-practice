import { useEffect, useRef } from "react";

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // to create a rectangle
  // canvas2d?.fillRect(20, 20, 20, 40); x,y,width,height

  // useEffect(() => {
  //   const canvas2d = canvasRef.current?.getContext("2d");
  //   if (!canvas2d) return;
  //   // rectangle
  //   canvas2d.fillStyle = "blue";
  //   canvas2d.fillRect(100, 20, 20, 40);
  //   // line
  //   canvas2d.beginPath();
  //   canvas2d.moveTo(20, 20);
  //   canvas2d.lineTo(20, 100);
  //   canvas2d.lineTo(70, 100);
  //   canvas2d.lineTo(70, 10);
  //   canvas2d.strokeStyle = "red";
  //   canvas2d.stroke();

  //   // Arc / Circle
  //   canvas2d.beginPath();
  //   // (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined)
  // canvas2d.arc(60, 60, 30, 0 , 7);
  // canvas2d.strokeStyle = "green";
  // canvas2d.stroke();

  // }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth ;
    canvasRef.current.height = window.innerHeight;
  }, []);

  const handelAnimation = ({
    e,
    randomHexColor,
  }: {
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>;
    randomHexColor: string;
  }) => {
    const canvas2d = e.currentTarget.getContext("2d");
    const radius = 30;
    if (!canvas2d) return;

    // console.log("clientX", e.clientX, "offsetLeft", e.currentTarget.offsetLeft);
    // console.log("clientY", e.clientY, "offsetTop", e.currentTarget.offsetTop);

    let x = e.clientX - e.currentTarget.offsetLeft;
    let y = e.clientY - e.currentTarget.offsetTop;

    let dx =10; // this is the speed of the circle in x direction
    let dy =10; // this is the speed of the circle in y direction

    const animate = () => {
      canvas2d.clearRect(0, 0, innerWidth, innerHeight);
      // rectangle
      canvas2d.fillRect(x, y, 50, 50);
      canvas2d.fillStyle = randomHexColor;

      // circle
      canvas2d.beginPath();
      canvas2d.arc(x, y, radius, 0, Math.PI * 2);
      canvas2d.strokeStyle = randomHexColor;
      canvas2d.stroke();
      // console.log("animating...", x, y);
      if(x + radius > innerWidth || x - radius < 0){
        dx = -dx;
      }
      if(y + radius > innerHeight || y - radius < 0){
        dy = -dy;
      }
      x += dx;  
      y += dy;    
      // requestAnimationFrame(animate); 
    };
    animate();
  };
  return (
    <body className="min-h-screen min-w-screen  bg-slate-100  flex justify-center items-center gap-5">
      <canvas
        onClick={(e) => {
          const randomHexColor = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          handelAnimation({ e, randomHexColor });
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
    </body>
  );
};
export default App;

// const canvas2d = e.currentTarget.getContext("2d");
// if (!canvas2d) return;
// console.log(
//   "clientX",
//   e.clientX,
//   "offsetLeft",
//   e.currentTarget.offsetLeft
// );
// console.log(
//   "clientY",
//   e.clientY,
//   "offsetTop",
//   e.currentTarget.offsetTop
// );
// let x = e.clientX - e.currentTarget.offsetLeft;
// let y = e.clientY - e.currentTarget.offsetTop;

// // handelAnimation({ event: e, randomHexColor });

// const animate = () => {
//   canvas2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
//   // rectangle
//   canvas2d.fillRect(x, y, 50, 50);
//   canvas2d.fillStyle = randomHexColor;

//   // circle
//   canvas2d.beginPath();
//   canvas2d.arc(x, y, 30, 0, Math.PI * 2);
//   canvas2d.strokeStyle = randomHexColor;
//   canvas2d.stroke();
//   console.log("animating...", x, y);
//   // requestAnimationFrame(animate);
//   if (!canvasRef.current) return;
//   console.log(
//     "clientX",
//     e.clientX,
//     "offsetLeft",
//     canvasRef.current.offsetLeft
//   );
//   console.log(
//     "clientY",
//     e.clientY,
//     "offsetTop",
//     canvasRef.current.offsetTop
//   );
//   if (x < e.clientX + canvasRef.current.offsetLeft) x += 1;
//   if (y < e.clientY + canvasRef.current.offsetTop) y += 1;
//   if (x > e.clientX + canvasRef.current.offsetWidth) x -= 1;
//   if (y > e.clientY + canvasRef.current.offsetHeight) y -= 1;
// };
// animate();
