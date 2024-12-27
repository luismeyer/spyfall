"use client";

import type { Game, GameMessage } from "@/server/lib/messages";
import { useRouter } from "next/navigation";
import usePartySocket from "partysocket/react";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

type Props = PropsWithChildren & {
  defaultGame: Game;
  host: string;
  token: string;
};

const GameContext = createContext<Game>({
  hostId: "",
  id: "",
  players: [],
  locations: [],
  state: "lobby",
});

export function GameProvider({ children, defaultGame, host, token }: Props) {
  const router = useRouter();

  const [game, setGame] = useState<Game>(defaultGame);

  usePartySocket({
    host,
    party: "main",
    room: game.id,
    query: { token },
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

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGame() {
  return useContext(GameContext);
}
