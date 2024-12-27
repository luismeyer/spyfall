"use client";

import { useGame } from "./provider";

export function Room() {
  const game = useGame();

  return (
    <div className="flex gap-8">
      <div>
        <h3 className="text-xl">Locations</h3>

        <ul className="list-disc">
          {[...game.locations].map((location) => (
            <li key={location.id}>{location.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xl">Players</h3>
        <ul className="list-disc">
          {game.players.map((player) => (
            <li
              key={player.id}
              className={player.id === game.hostId ? "underline" : ""}
            >
              {player.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
