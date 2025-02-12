"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus } from "lucide-react"

interface Meal {
  id: string
  name: string
  time: string
  reminder: boolean
}

export default function MealPlanner() {
  const router = useRouter()
  const [meals, setMeals] = useState<Meal[]>([])
  const [newMeal, setNewMeal] = useState<Meal>({ id: "", name: "", time: "", reminder: true })

  useEffect(() => {
    const savedMeals = localStorage.getItem("plannedMeals")
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("plannedMeals", JSON.stringify(meals))
  }, [meals])

  const addMeal = () => {
    if (newMeal.name && newMeal.time) {
      setMeals([...meals, { ...newMeal, id: Date.now().toString() }])
      setNewMeal({ id: "", name: "", time: "", reminder: true })
    }
  }

  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const toggleReminder = (id: string) => {
    setMeals(meals.map((meal) => (meal.id === id ? { ...meal, reminder: !meal.reminder } : meal)))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/healthy-eating")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Planificador de Comidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="meal-name">Nombre de la comida</Label>
              <Input
                id="meal-name"
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                placeholder="Ej: Desayuno, Almuerzo, Cena"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="meal-time">Hora de la comida</Label>
              <Input
                id="meal-time"
                type="time"
                value={newMeal.time}
                onChange={(e) => setNewMeal({ ...newMeal, time: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="reminder"
                checked={newMeal.reminder}
                onCheckedChange={(checked) => setNewMeal({ ...newMeal, reminder: checked })}
              />
              <Label htmlFor="reminder">Activar recordatorio</Label>
            </div>
            <Button onClick={addMeal} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Añadir Comida
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Comidas Planificadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meals.map((meal) => (
              <div key={meal.id} className="flex items-center justify-between p-2 bg-white rounded-lg shadow">
                <div>
                  <p className="font-semibold">{meal.name}</p>
                  <p className="text-sm text-gray-500">{meal.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={meal.reminder} onCheckedChange={() => toggleReminder(meal.id)} />
                  <Button variant="destructive" size="sm" onClick={() => removeMeal(meal.id)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

