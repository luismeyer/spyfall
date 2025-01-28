"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import PlayerCard from "./PlayerCard"
import Timer from "./Timer"

interface GameBoardProps {
  players: string[]
  locations: string[]
  resetGame: () => void
}

export default function GameBoard({ players, locations, resetGame }: GameBoardProps) {
  const [spyIndex, setSpyIndex] = useState(-1)
  const [location, setLocation] = useState("")
  const [showRoles, setShowRoles] = useState(false)

  useEffect(() => {
    setSpyIndex(Math.floor(Math.random() * players.length))
    setLocation(locations[Math.floor(Math.random() * locations.length)])
  }, [players, locations])

  const toggleRoles = () => {
    setShowRoles(!showRoles)
  }

  return (
    <div>
      <Timer duration={540} onTimeUp={() => alert("Time's up!")} />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            playerName={player}
            isSpy={index === spyIndex}
            location={location}
            showRole={showRoles}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={toggleRoles}>{showRoles ? "Hide Roles" : "Show Roles"}</Button>
        <Button onClick={resetGame}>End Game</Button>
      </div>
    </div>
  )
}

