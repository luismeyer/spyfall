"use client"

import { useState, useEffect } from "react"
import { locations, type GameState } from "../data/locations"
import Timer from "./Timer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GameProps {
  gameId: string
  playerName: string
}

export default function Game({ gameId, playerName }: GameProps) {
  const [gameState, setGameState] = useState<GameState | null>(null)

  useEffect(() => {
    const fetchGameState = async () => {
      const response = await fetch("/api/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "state", gameId }),
      })
      if (response.ok) {
        const state = await response.json()
        setGameState(state)
      }
    }

    fetchGameState()
    const interval = setInterval(fetchGameState, 5000) // Polling every 5 seconds

    return () => clearInterval(interval)
  }, [gameId])

  const updateTime = async (newTime: number) => {
    await fetch("/api/game", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, timeRemaining: newTime }),
    })
  }

  if (!gameState) {
    return <div className="text-white text-center">Preparing mission...</div>
  }

  const isSpy = gameState.spy === playerName

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Mission #{gameId}</CardTitle>
        </CardHeader>
        <CardContent>
          <Timer initialTime={gameState.timeRemaining} onTimeChange={updateTime} />
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Your Role:</h3>
            <p className="text-lg font-bold text-red-500">
              {isSpy ? "You are the Spy!" : `Agent at: ${gameState.location}`}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Agents:</h3>
            <div className="flex flex-wrap gap-2">
              {gameState.players.map((player, index) => (
                <Badge key={index} variant={player === playerName ? "default" : "secondary"}>
                  {player}
                  {player === playerName ? " (You)" : ""}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Possible Locations:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {locations.map((loc, index) => (
              <Badge
                key={index}
                variant={loc === gameState.location && !isSpy ? "default" : "outline"}
                className="text-sm p-2 flex items-center justify-center h-12"
              >
                {loc}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

