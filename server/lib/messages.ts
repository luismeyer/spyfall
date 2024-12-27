import type { Location } from "./locations";
import type { User } from "./user";

export type BaseGame = {
  id: string;
  players: User[];
  hostId: string;
  locations: Location[];
};

export type LobbyGame = BaseGame & {
  state: "lobby";
};

export type PlayingGame = BaseGame & {
  state: "playing";
  location: Location;
  round: {
    current: number;
    startedAt: number;
  };
};

export type Game = LobbyGame | PlayingGame;

export type SyncGameMessage = {
  type: "sync";
  game: Game;
};

export type CloseGameMessage = {
  type: "close";
};

export type GameMessage = SyncGameMessage | CloseGameMessage;

export const gameMessage = (msg: GameMessage) => JSON.stringify(msg);

export type UserMessageClose = {
  type: "close";
};

export type UserMessageStart = {
  type: "startRound";
};

export type UserMessage = UserMessageClose | UserMessageStart;
