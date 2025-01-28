"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Game from "./Game";

export default function GameSetup() {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");
  const [currentGameId, setCurrentGameId] = useState("");

  const createGame = async () => {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", playerName }),
    });
    const data = await response.json();
    setCurrentGameId(data.gameId);
  };

  const joinGame = async () => {
    const response = await fetch("/api/game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "join", gameId, playerName }),
    });
    if (response.ok) {
      setCurrentGameId(gameId);
    } else {
      alert("Failed to join game");
    }
  };

  if (currentGameId) {
    return <Game gameId={currentGameId} playerName={playerName} />;
  }

  return (
    <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join the Mission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your codename"
          className="bg-white/50"
        />
        <Button
          onClick={createGame}
          disabled={!playerName}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Start New Mission
        </Button>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter mission ID"
            className="bg-white/50"
          />
          <Button
            onClick={joinGame}
            disabled={!playerName || !gameId}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Join Mission
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
