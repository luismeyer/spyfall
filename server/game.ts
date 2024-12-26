import type * as Party from "partykit/server";
import { nanoid } from "nanoid";

import { error, json, notFound, ok } from "./lib/response";
import type { User } from "./lib/user";

type ChatConnectionState = { user?: User };

type ChatConnection = Party.Connection<ChatConnectionState>;

export const GAME_PARTY_ID = "game";

/**
 * This party manages the state and behaviour of an individual chat room
 */
export default class ChatRoomServer implements Party.Server {
  //   players?: Message[];
  constructor(public party: Party.Party) {}

  /** Retrieve messages from room storage and store them on room instance */
  async ensureLoadMessages() {
    // if (!this.messages) {
    //   this.messages =
    //     (await this.party.storage.get<Message[]>("messages")) ?? [];
    // }
    // return this.messages;
  }

  /** Clear room storage */
  async removeRoomMessages() {
    // await this.party.storage.delete("messages");
    // this.messages = [];
  }

  /** Remove this room from the room listing party */
  async removeRoomFromRoomList(id: string) {
    // return this.party.context.parties.chatrooms.get(SINGLETON_ROOM_ID).fetch({
    //   method: "POST",
    //   body: JSON.stringify({
    //     id,
    //     action: "delete",
    //   }),
    // });
  }

  /** Request the AI bot party to connect to this room, if not already connected */
  async ensureAIParticipant() {
    // if (!this.botId) {
    //   this.botId = nanoid();
    //   this.party.context.parties.ai.get(this.party.id).fetch({
    //     method: "POST",
    //     body: JSON.stringify({
    //       action: "connect",
    //       roomId: this.party.id,
    //       botId: this.botId,
    //     }),
    //   });
    // }
  }

  /** Send room presence to the room listing party */
  async updateRoomList(action: "enter" | "leave", connection: ChatConnection) {
    // return this.party.context.parties.chatrooms.get(SINGLETON_ROOM_ID).fetch({
    //   method: "POST",
    //   body: JSON.stringify({
    //     id: this.party.id,
    //     connections: [...this.party.getConnections()].length,
    //     user: connection.state?.user,
    //     action,
    //   }),
    // });
  }

  /**
   * Responds to HTTP requests to /parties/chatroom/:roomId endpoint
   */
  async onRequest(request: Party.Request) {
    console.log({ request });

    // const messages = await this.ensureLoadMessages();
    // // mark room as created by storing its id in object storage
    // if (request.method === "POST") {
    //   // respond to authentication requests proxied through the app's
    //   // rewrite rules. See next.config.js in project root.
    //   if (new URL(request.url).pathname.endsWith("/auth")) {
    //     await this.authenticateUser(request);
    //     return ok();
    //   }
    //   await this.party.storage.put("id", this.party.id);
    //   return ok();
    // }
    // // return list of messages for server rendering pages
    // if (request.method === "GET") {
    //   if (await this.party.storage.get("id")) {
    //     return json<SyncMessage>({ type: "sync", messages });
    //   }
    //   return notFound();
    // }
    // // clear room history
    // if (request.method === "DELETE") {
    //   await this.removeRoomMessages();
    //   this.party.broadcast(JSON.stringify(<ClearRoomMessage>{ type: "clear" }));
    //   this.party.broadcast(
    //     newMessage({
    //       from: { id: "system" },
    //       text: `Room history cleared`,
    //     })
    //   );
    //   return ok();
    // }
    // // respond to cors preflight requests
    // if (request.method === "OPTIONS") {
    //   return ok();
    // }
    return notFound();
  }

  /**
   * Executes when a new WebSocket connection is made to the room
   */
  async onConnect(connection: ChatConnection) {
    // await this.ensureLoadMessages();
    // await this.ensureAIParticipant();
    // // if user is the bot we invited, mark them as an AI user
    // if (connection.id === this.botId) {
    //   connection.setState({ user: AI_USER });
    // }
    // // send the whole list of messages to user when they connect
    // connection.send(syncMessage(this.messages ?? []));
    // // keep track of connections
    // this.updateRoomList("enter", connection);
  }

  async onMessage(
    messageString: string,
    connection: Party.Connection<{ user: User | null }>
  ) {
    // const message = JSON.parse(messageString) as UserMessage;
    // // handle user messages
    // if (message.type === "new" || message.type === "edit") {
    //   const user = connection.state?.user;
    //   if (!isSessionValid(user)) {
    //     return connection.send(
    //       systemMessage("You must sign in to send messages to this room")
    //     );
    //   }
    //   if (message.text.length > 1000) {
    //     return connection.send(systemMessage("Message too long"));
    //   }
    //   const payload = <Message>{
    //     id: message.id ?? nanoid(),
    //     from: { id: user.username, image: user.image },
    //     text: message.text,
    //     at: Date.now(),
    //   };
    //   // send new message to all connections
    //   if (message.type === "new") {
    //     this.party.broadcast(newMessage(payload));
    //     this.messages!.push(payload);
    //   }
    //   // send edited message to all connections
    //   if (message.type === "edit") {
    //     this.party.broadcast(editMessage(payload), []);
    //     this.messages = this.messages!.map((m) =>
    //       m.id == message.id ? payload : m
    //     );
    //   }
    //   // persist the messages to storage
    //   await this.party.storage.put("messages", this.messages);
    //   // automatically clear the room storage after period of inactivity
    //   await this.party.storage.deleteAlarm();
    //   await this.party.storage.setAlarm(
    //     new Date().getTime() + DELETE_MESSAGES_AFTER_INACTIVITY_PERIOD
    //   );
    // }
  }

  async onClose(connection: Party.Connection) {
    // this.updateRoomList("leave", connection);
  }

  /**
   * A scheduled job that executes when the room storage alarm is triggered
   */
  async onAlarm() {
    // // alarms don't have access to room id, so retrieve it from storage
    // const id = await this.party.storage.get<string>("id");
    // if (id) {
    //   await this.removeRoomMessages();
    //   await this.removeRoomFromRoomList(id);
    // }
  }
}

ChatRoomServer satisfies Party.Worker;
