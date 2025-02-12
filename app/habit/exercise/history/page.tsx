"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ExerciseHistory() {
  const router = useRouter()
  const [history, setHistory] = useState<{ date: string; minutes: number; calories: number }[]>([])

  useEffect(() => {
    // Simular carga de historial
    // En una aplicación real, esto vendría de una base de datos o API
    setHistory([
      { date: "2023-05-01", minutes: 30, calories: 150 },
      { date: "2023-05-02", minutes: 45, calories: 225 },
      { date: "2023-05-03", minutes: 20, calories: 100 },
      { date: "2023-05-04", minutes: 60, calories: 300 },
      { date: "2023-05-05", minutes: 40, calories: 200 },
    ])
  }, [])

  const totalMinutes = history.reduce((sum, day) => sum + day.minutes, 0)
  const totalCalories = history.reduce((sum, day) => sum + day.calories, 0)
  const averageMinutes = Math.round(totalMinutes / history.length)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/exercise")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Historial de Ejercicio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Total de minutos</p>
                <p className="text-2xl font-bold">{totalMinutes}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Total de calorías</p>
                <p className="text-2xl font-bold">{totalCalories}</p>
              </div>
              <div className="text-center col-span-2">
                <p className="text-sm text-gray-500">Promedio diario</p>
                <p className="text-2xl font-bold">{averageMinutes} min</p>
              </div>
            </div>
            <div className="space-y-2">
              {history.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{day.date}</span>
                  <span>{day.minutes} min</span>
                  <span>{day.calories} cal</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

