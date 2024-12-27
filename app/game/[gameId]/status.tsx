"use client";

import { useGame } from "../provider";

export function Status() {
  const game = useGame();

  return (
    <div className="flex gap-4">
      <span>Status {game.state}</span>

      <button type="button" onClick={console.log}>
        neue runde
      </button>
    </div>
  );
}
