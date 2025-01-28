import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlayerCardProps {
  playerName: string
  isSpy: boolean
  location: string
  showRole: boolean
}

export default function PlayerCard({ playerName, isSpy, location, showRole }: PlayerCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{playerName}</CardTitle>
      </CardHeader>
      <CardContent>
        {showRole ? <p>{isSpy ? "You are the Spy!" : `Location: ${location}`}</p> : <p>Role hidden</p>}
      </CardContent>
    </Card>
  )
}

