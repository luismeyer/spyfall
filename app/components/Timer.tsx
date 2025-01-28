"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface TimerProps {
  initialTime: number
  onTimeChange: (newTime: number) => void
}

export default function Timer({ initialTime, onTimeChange }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    if (timeLeft === 0) {
      alert("Mission time expired!")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1
        onTimeChange(newTime)
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeChange])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <Card className="bg-yellow-300 mb-4">
      <CardContent className="p-2">
        <div className="text-2xl font-bold text-center text-gray-800">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
      </CardContent>
    </Card>
  )
}

