import type * as Party from "partykit/server";

import { error, json, notFound, ok } from "./lib/response";
import { verifyToken, type User } from "./lib/user";
import {
  gameMessage,
  type CloseGameMessage,
  type Game,
  type SyncGameMessage,
} from "./lib/messages";
import { DefaultLocations } from "./lib/locations";

type ChatConnectionState = { user?: User };

type GameConnection = Party.Connection<ChatConnectionState>;

export default class Server implements Party.Server {
  state?: Game;

  constructor(public room: Party.Room) {}

  async persistGame() {
    if (!this.state) {
      await this.room.storage.delete("state");
      return;
    }

    await this.room.storage.put("state", this.state);
  }

  async loadPersistedGame() {
    if (!this.state) {
      this.state = await this.room.storage.get<Game>("state");
    }

    return this.state;
  }

  async user(request: Party.Request) {
    const token = new URL(request.url).searchParams.get("token");
    if (!token) {
      return;
    }

    const user = await verifyToken(token);
    if (!user) {
      return;
    }

    return user;
  }

  async onRequest(request: Party.Request) {
    await this.loadPersistedGame();

    const user = await this.user(request);
    if (!user) {
      return error("Not logged in");
    }

    if (request.method === "POST") {
      if (this.state) {
        return error("Game already started");
      }

      this.state = {
        id: this.room.id,
        players: [],
        locations: DefaultLocations,
        state: "lobby",
        hostId: user.id,
      };

      await this.persistGame();

      return ok();
    }

    if (request.method === "GET") {
      if (!this.state) {
        return notFound();
      }

      return json<SyncGameMessage>({ type: "sync", game: this.state });
    }

    if (request.method === "DELETE") {
      if (this.state?.hostId !== user.id) {
        return error("Not host");
      }

      this.room.broadcast(gameMessage({ type: "close" }));

      for (const connection of this.room.getConnections()) {
        connection.close();
      }

      this.state = undefined;
      await this.persistGame();

      return ok();
    }

    if (request.method === "OPTIONS") {
      return ok();
    }

    return notFound();
  }

  async onConnect(
    connection: GameConnection,
    { request }: Party.ConnectionContext
  ) {
    await this.loadPersistedGame();
    if (!this.state) {
      return;
    }

    const token = new URL(request.url).searchParams.get("token");
    if (!token) {
      return;
    }

    const user = await verifyToken(token);
    if (!user) {
      return;
    }

    connection.setState({ user });

    const alreadyJoined = this.state.players.some((p) => p.id === user.id);
    if (!alreadyJoined) {
      this.state.players.push(user);
    }

    this.room.broadcast(gameMessage({ type: "sync", game: this.state }));
  }

  async onClose(connection: GameConnection) {
    if (!this.state) {
      return;
    }

    const user = connection.state?.user;
    if (!user) {
      return;
    }

    this.state.players = this.state.players.filter((p) => p.id !== user.id);

    this.room.broadcast(gameMessage({ type: "sync", game: this.state }));
  }
}

Server satisfies Party.Worker;
