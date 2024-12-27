import type { Location } from "./locations";
import type { User } from "./user";

export type BaseGame = {
  id: string;
  players: User[];
  locations: Location[];
  hostId: string;
};

export type LobbyGame = BaseGame & {
  state: "lobby";
};

export type PlayingGame = BaseGame & {
  state: "playing";
  location: Location;
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
