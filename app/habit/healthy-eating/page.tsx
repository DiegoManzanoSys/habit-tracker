"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Apple, ArrowLeft, Plus, BarChart2, Utensils, Calendar } from "lucide-react"
import { TransitionWrapper } from "@/components/transition-wrapper"
import foodCategoriesData from "../../data/food_categories.json"
import { getHabits, updateHabit } from "@/utils/data-utils"

// Interfaces para los tipos de datos utilizados
interface Meal {
  category: string
  portions: number
}

interface Habit {
  id: string
  type: string
  goal: number
  progress: number
  streak: number
}

// Componente principal para el hábito de comer saludable
export default function HealthyEatingHabit() {
  const router = useRouter()
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedCategory, setSelectedCategory] = useState(foodCategoriesData[0].name)
  const [portions, setPortions] = useState("1")
  const [habit, setHabit] = useState<Habit>({ id: "", type: "food", goal: 5, progress: 0, streak: 0 })

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    const habits = getHabits()
    const healthyEatingHabit = habits.find((h) => h.type === "food")
    if (healthyEatingHabit) {
      setHabit(healthyEatingHabit)
      const savedMeals = localStorage.getItem("healthyMeals")
      if (savedMeals) {
        setMeals(JSON.parse(savedMeals))
      }
    }
  }, [])

  // Efecto para guardar las comidas en localStorage
  useEffect(() => {
    localStorage.setItem("healthyMeals", JSON.stringify(meals))
  }, [meals])

  // Función para añadir una nueva comida
  const addMeal = () => {
    const newMeal: Meal = {
      category: selectedCategory,
      portions: Number(portions),
    }
    const newMeals = [...meals, newMeal]
    setMeals(newMeals)

    const totalPortions = newMeals.reduce((sum, meal) => sum + meal.portions, 0)
    const updatedHabit = {
      ...habit,
      progress: totalPortions,
      streak: totalPortions >= habit.goal ? habit.streak + 1 : habit.streak,
    }
    updateHabit(habit.id, updatedHabit)
    setHabit(updatedHabit)
    setPortions("1")
  }

  // Cálculos para el progreso y los nutrientes
  const totalPortions = meals.reduce((sum, meal) => sum + meal.portions, 0)
  const progress = Math.min((totalPortions / habit.goal) * 100, 100)

  const calculateNutrients = () => {
    return meals.reduce(
      (total, meal) => {
        const category = foodCategoriesData.find((cat) => cat.name === meal.category)
        if (category) {
          total.calories += category.calories * meal.portions
          total.protein += category.protein * meal.portions
          total.carbs += category.carbs * meal.portions
          total.fat += category.fat * meal.portions
        }
        return total
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  const nutrients = calculateNutrients()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4">
      <Button variant="ghost" className="self-start mb-4 shadow-neumorph rounded-full" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4 shadow-lg rounded-2xl border-2 border-green-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold text-green-800">Comer Saludable</CardTitle>
          <Apple className="h-8 w-8 text-green-500" />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="registro" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="registro" className="text-green-700">
                Registro
              </TabsTrigger>
              <TabsTrigger value="resumen" className="text-green-700">
                Resumen
              </TabsTrigger>
            </TabsList>
            <TabsContent value="registro">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px] shadow-inner rounded-full bg-white">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategoriesData.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={portions}
                    onChange={(e) => setPortions(e.target.value)}
                    placeholder="Porciones"
                    className="w-24 shadow-inner rounded-full bg-white"
                  />
                  <Button onClick={addMeal} className="shadow-md rounded-full bg-green-500 hover:bg-green-600">
                    <Plus className="mr-2 h-4 w-4" /> Añadir
                  </Button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {meals.map((meal, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-2 rounded-lg shadow">
                      <span className="font-medium text-gray-700">{meal.category}</span>
                      <span className="text-gray-600">
                        {meal.portions} {meal.portions === 1 ? "porción" : "porciones"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="resumen">
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-4xl font-bold text-green-700">{totalPortions}</span>
                  <span className="text-xl text-green-600 ml-2">/ {habit.goal} porciones</span>
                </div>
                <Progress value={progress} className="w-full h-4 bg-green-200" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-white p-2 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Calorías</p>
                    <p className="text-xl font-bold text-green-700">{nutrients.calories}</p>
                  </div>
                  <div className="text-center bg-white p-2 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Proteínas</p>
                    <p className="text-xl font-bold text-green-700">{nutrients.protein}g</p>
                  </div>
                  <div className="text-center bg-white p-2 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Carbohidratos</p>
                    <p className="text-xl font-bold text-green-700">{nutrients.carbs}g</p>
                  </div>
                  <div className="text-center bg-white p-2 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Grasas</p>
                    <p className="text-xl font-bold text-green-700">{nutrients.fat}g</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <TransitionWrapper href="/habit/healthy-eating/suggestions">
          <Button variant="outline" className="w-full shadow-md rounded-full bg-white hover:bg-green-100">
            <Utensils className="mr-2 h-4 w-4" /> Sugerencias
          </Button>
        </TransitionWrapper>
        <TransitionWrapper href="/habit/healthy-eating/progress">
          <Button variant="outline" className="w-full shadow-md rounded-full bg-white hover:bg-green-100">
            <BarChart2 className="mr-2 h-4 w-4" /> Progreso
          </Button>
        </TransitionWrapper>
        <TransitionWrapper href="/habit/healthy-eating/meal-planner" className="col-span-2">
          <Button variant="outline" className="w-full shadow-md rounded-full bg-white hover:bg-green-100">
            <Calendar className="mr-2 h-4 w-4" /> Planificador
          </Button>
        </TransitionWrapper>
      </div>

      <Card className="w-full shadow-lg rounded-2xl border-2 border-green-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-green-800">
            Consejos para una alimentación saludable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Incluye una variedad de frutas y verduras en cada comida</li>
            <li>Opta por granos integrales en lugar de refinados</li>
            <li>Elige proteínas magras como pescado, pollo o legumbres</li>
            <li>Limita el consumo de alimentos procesados y azúcares añadidos</li>
            <li>Mantén una buena hidratación durante el día</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

