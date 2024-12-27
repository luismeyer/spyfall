"use client";

import { createOrJoinGame } from "@/server/actions/create-game";
import type { User } from "@/server/lib/user";
import { useState } from "react";

type FormProps = {
  user?: User;
};

export function Form({ user }: FormProps) {
  const [gameId, setGameId] = useState("");

  return (
    <form action={createOrJoinGame} className="grid gap-2">
      {!user && (
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="text-black p-2"
        />
      )}

      <input
        type="text"
        name="gameId"
        placeholder="GameId"
        className="text-black p-2"
        onChange={(e) => setGameId(e.target.value)}
        value={gameId}
      />

      <div className="flex gap-2">
        <button className="p-2" type="submit">
          {gameId ? "Join Game" : "Create Game"}
        </button>
      </div>
    </form>
  );
}
