import { NextResponse } from "next/server"
import { locations, type GameState } from "../../data/locations"

const games: Record<string, GameState> = {}

export async function POST(request: Request) {
  const { action, gameId, playerName } = await request.json()

  if (action === "create") {
    const id = Math.random().toString(36).substring(7)
    games[id] = {
      id,
      players: [playerName],
      location: locations[Math.floor(Math.random() * locations.length)],
      spy: playerName,
      timeRemaining: 540, // 9 minutes in seconds
    }
    return NextResponse.json({ gameId: id })
  }

  if (action === "join") {
    if (games[gameId]) {
      if (!games[gameId].players.includes(playerName)) {
        games[gameId].players.push(playerName)
        if (games[gameId].players.length === 2) {
          // Randomly choose the spy when the second player joins
          const spyIndex = Math.floor(Math.random() * 2)
          games[gameId].spy = games[gameId].players[spyIndex]
        }
      }
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Game not found" }, { status: 404 })
  }

  if (action === "state") {
    if (games[gameId]) {
      return NextResponse.json(games[gameId])
    }
    return NextResponse.json({ error: "Game not found" }, { status: 404 })
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 })
}

export async function PUT(request: Request) {
  const { gameId, timeRemaining } = await request.json()

  if (games[gameId]) {
    games[gameId].timeRemaining = timeRemaining
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: "Game not found" }, { status: 404 })
}

