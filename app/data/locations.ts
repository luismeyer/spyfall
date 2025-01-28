export const locations = [
  "Airplane",
  "Bank",
  "Beach",
  "Casino",
  "Hospital",
  "Hotel",
  "Movie Studio",
  "Restaurant",
  "School",
  "Space Station",
  "Submarine",
  "Supermarket",
  "Theater",
  "University",
  "Zoo",
]

export interface GameState {
  id: string
  players: string[]
  location: string
  spy: string
  timeRemaining: number
}

