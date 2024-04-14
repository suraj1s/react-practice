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
    canvasRef.current.width = window.innerWidth * 0.8;
    canvasRef.current.height = window.innerHeight * 0.8;
  }, []);

  return (
    <body className="min-h-screen min-w-screen  bg-slate-100  flex justify-center items-center gap-5">
      <canvas
        onClick={(e) => {
          const canvas2d = e.currentTarget.getContext("2d");
          if (!canvas2d) return;
          // console.log("clientX", e.clientX, "offsetLeft", e.currentTarget.offsetLeft);
          // console.log("clientY", e.clientY, "offsetTop", e.currentTarget.offsetTop);

          const x = e.clientX - e.currentTarget.offsetLeft;
          const y = e.clientY - e.currentTarget.offsetTop;

          const rendomHexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
          
          canvas2d.fillRect(x, y, 50, 50);
          canvas2d.fillStyle = rendomHexColor;
          // circle
          canvas2d.beginPath();
          canvas2d.arc(x, y, 30, 0, 7);
          canvas2d.strokeStyle = rendomHexColor
          canvas2d.stroke();
        }}
        ref={canvasRef}
        className="border-2  border-slate-300 rounded-md"
      />
      {/* <button onClick={()=> {
        const randomX = Math.floor(Math.random() * 200);
        const randomY = Math.floor(Math.random() * 200);
        canvas2d?.fillRect(randomX, randomY, 20, 40);
      }}
      className="p-20"
      >Fill rect</button> */}
    </body>
  );
};
export default App;
