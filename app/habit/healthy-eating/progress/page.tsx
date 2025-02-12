"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface DailyProgress {
  date: string
  portions: number
  calories: number
  protein: number
  carbs: number
  fat: number
}

export default function HealthyEatingProgress() {
  const router = useRouter()
  const [weeklyProgress, setWeeklyProgress] = useState<DailyProgress[]>([])

  useEffect(() => {
    // Simular carga de progreso semanal
    // En una aplicación real, esto vendría de una base de datos o API
    const simulatedProgress: DailyProgress[] = [
      { date: "2023-05-01", portions: 4, calories: 1200, protein: 60, carbs: 150, fat: 40 },
      { date: "2023-05-02", portions: 5, calories: 1300, protein: 65, carbs: 160, fat: 45 },
      { date: "2023-05-03", portions: 6, calories: 1400, protein: 70, carbs: 170, fat: 50 },
      { date: "2023-05-04", portions: 5, calories: 1250, protein: 62, carbs: 155, fat: 42 },
      { date: "2023-05-05", portions: 7, calories: 1500, protein: 75, carbs: 180, fat: 55 },
      { date: "2023-05-06", portions: 6, calories: 1350, protein: 68, carbs: 165, fat: 48 },
      { date: "2023-05-07", portions: 5, calories: 1280, protein: 64, carbs: 158, fat: 43 },
    ]
    setWeeklyProgress(simulatedProgress)
  }, [])

  const averagePortions = Math.round(weeklyProgress.reduce((sum, day) => sum + day.portions, 0) / weeklyProgress.length)
  const averageCalories = Math.round(weeklyProgress.reduce((sum, day) => sum + day.calories, 0) / weeklyProgress.length)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/healthy-eating")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Progreso Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Promedio de porciones</p>
                <p className="text-2xl font-bold">{averagePortions}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Promedio de calorías</p>
                <p className="text-2xl font-bold">{averageCalories}</p>
              </div>
            </div>
            <div className="space-y-2">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{day.date}</span>
                  <span>{day.portions} porciones</span>
                  <span>{day.calories} cal</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Consejos para mejorar</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Intenta mantener un consumo constante de porciones saludables cada día</li>
            <li>Ajusta tu ingesta de calorías según tu nivel de actividad diaria</li>
            <li>Asegúrate de incluir una variedad de alimentos de todas las categorías</li>
            <li>Si notas días con menos porciones, planifica mejor tus comidas para el futuro</li>
            <li>Celebra tus logros y no te desanimes por días menos perfectos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

