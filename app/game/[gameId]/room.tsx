"use client";

import usePartySocket from "partysocket/react";
import type { Game, GameMessage } from "@/server/lib/messages";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RoomProps = {
  defaultGame: Game;
  host: string;
  token: string;
};

export function Room({ defaultGame, host, token }: RoomProps) {
  const [game, setGame] = useState<Game>(defaultGame);

  const router = useRouter();

  const socket = usePartySocket({
    host,
    party: "main",
    room: game.id,
    query: { token },
    onOpen(e) {
      console.log("open", e);
    },
    onMessage(event: MessageEvent<string>) {
      const message = JSON.parse(event.data) as GameMessage;

      if (message.type === "sync") {
        setGame(message.game);
      }

      if (message.type === "close") {
        router.push("/");
      }

      console.log("message", event.data);
    },
  });

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
