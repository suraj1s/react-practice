import { useEffect, useMemo, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../utils/constants";
import Game from "../utils/game";
const Games = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = CANVAS_WIDTH;
    canvasRef.current.height = CANVAS_HEIGHT;
  }, []);

  const game = useMemo(() => {
    if (canvasRef) return new Game(canvasRef);
  }, []);

  useEffect(() => {
    console.log("inside useEffect", game?.player.x);
  }, [game?.player.x]);

  // console.log(game?.plasyer.x)

  const handelKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!game) return;
    if (e.key === "ArrowLeft") {
      game.movePlayer("left");
      setCount(count - 1);
    }
    if (e.key === "ArrowRight") {
      setCount(count + 1);
      game.movePlayer("right");
    }
  };

  return (
    <div className=" pt-10">
      <p>{count}</p>
      <canvas
        onKeyDown={handelKeyDown}
        ref={canvasRef}
        tabIndex={0}
        autoFocus={true}
        className="border-2  border-slate-300 rounded-md"
      />
    </div>
  );
};
export default Games;
