import { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";
import Game from "../utils/game";

const Games = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const newGame = new Game(canvasRef.current.getContext("2d"));
      setGame(newGame);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }, [game]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas2d = canvasRef.current.getContext("2d");
    if (!canvas2d) return;
    if(!game) return;

    const animateGame = () => {
      canvas2d.clearRect(0, 0, innerWidth *  0.8, innerHeight *  0.8);
       game?.render();
    };
    animateGame();
    // const interval = setInterval(() => {
    //   requestAnimationFrame(animateGame);
    // }, 10);

    // return () => {
    //   clearInterval(interval);
    // };
  }, [game]);



  return (
    <div className="pt-10">
      <canvas
        ref={canvasRef}
        tabIndex={0}
        autoFocus={true}
        className="border-2 border-slate-300 rounded-md"
      />
    </div>
  );
};

export default Games;
