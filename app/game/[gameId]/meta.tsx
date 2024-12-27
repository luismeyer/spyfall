"use client";

import { useEffect, useState } from "react";
import { useGame } from "./provider";
import Link from "next/link";

type MetaProps = {
  isHost: boolean;
};

export function Meta({ isHost }: MetaProps) {
  const game = useGame();

  const duration = 9;

  const [remaining, setRemaining] = useState("00:00");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (game.state !== "playing") {
      return;
    }

    const calculateRemaining = () => {
      const now = new Date().getTime();
      const start = new Date(game.round.startedAt).getTime();
      const durationMs = duration * 60 * 1000; // Convert minutes to milliseconds
      const endTime = start + durationMs;
      const remainingMs = endTime - now;

      // Handle invalid dates or completed timer
      if (Number.isNaN(remainingMs) || remainingMs <= 0) {
        setRemaining("00:00");
        setIsFinished(true);
        return true; // Return true if timer is finished
      }

      const minutes = Math.floor(remainingMs / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      setRemaining(`${formattedMinutes}:${formattedSeconds}`);
      return false; // Timer not finished
    };

    // Initial calculation
    const isTimerFinished = calculateRemaining();

    // Only set interval if timer isn't finished
    let intervalId: number | undefined;
    if (!isTimerFinished) {
      intervalId = window.setInterval(() => {
        const finished = calculateRemaining();
        if (finished && intervalId) {
          clearInterval(intervalId);
        }
      }, 1000);
    }

    // Cleanup interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [game]);

  return (
    <div className="flex gap-8">
      <div className="grid">
        <span>Status: {game.state}</span>

        {game.state === "playing" && (
          <>
            <span>Runde: {game.round.current}</span>
            <span>Started At: {remaining}</span>
            <span>Location: {game.location.name}</span>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="outline-dashed rounded p-2 cursor-pointer"
          type="button"
          onClick={() => game.dispatch({ type: "startRound" })}
        >
          neue runde
        </button>

        {isHost ? (
          <button
            className="outline-dashed rounded p-2 cursor-pointer"
            type="button"
            onClick={() => game.dispatch({ type: "close" })}
          >
            close game
          </button>
        ) : (
          <Link href="/" className="outline-dashed rounded p-2 cursor-pointer">
            leave
          </Link>
        )}
      </div>
    </div>
  );
}
