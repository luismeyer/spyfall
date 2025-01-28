"use client";

import { createOrJoinGame } from "@/server/actions/create-game";
import type { User } from "@/server/lib/user";
import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormProps = {
  user?: User;
};

export function Form({ user }: FormProps) {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");

  return (
    <form action={createOrJoinGame} className="grid gap-2">
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          {!user && (
            <Input
              type="text"
              value={playerName}
              name="name"
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your codename"
              className="bg-white/50"
            />
          )}

          <Button
            type="submit"
            disabled={!playerName}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Start New Mission
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={gameId}
            name="gameId"
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter mission ID"
            className="bg-white/50"
          />

          <Button
            type="submit"
            disabled={!playerName || !gameId}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Join Mission
          </Button>
        </div>
      </CardContent>
    </form>
  );
}
