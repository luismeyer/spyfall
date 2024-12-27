"use client";

import type { Game, GameMessage, UserMessage } from "@/server/lib/messages";
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

type GameContextType = Game & { dispatch: (msg: UserMessage) => void };

const GameContext = createContext<GameContextType>({
  hostId: "",
  id: "",
  players: [],
  locations: [],
  state: "lobby",
  dispatch: () => {},
});

export function GameProvider({ children, defaultGame, host, token }: Props) {
  const router = useRouter();

  const [game, setGame] = useState<Game>(defaultGame);

  const socket = usePartySocket({
    party: "main",
    host,
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

  function dispatch(msg: UserMessage) {
    socket.send(JSON.stringify(msg));
  }

  return (
    <GameContext.Provider value={{ ...game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
