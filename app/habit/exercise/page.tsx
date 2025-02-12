"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, ArrowLeft, BarChart, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { TransitionWrapper } from "@/components/transition-wrapper"
import exerciseTypesData from "../../data/exercise_types.json"
import { getHabits, updateHabit } from "@/utils/data-utils"

// Interfaces para los tipos de datos utilizados
interface ExerciseType {
  id: string
  name: string
  caloriesPerMinute: number
  icon: string
}

interface Habit {
  id: string
  type: string
  goal: number
  progress: number
  streak: number
  calories: number
}

// Componente principal para el hábito de ejercicio
export default function ExerciseHabit() {
  const router = useRouter()
  const [habit, setHabit] = useState<Habit>({ id: "", type: "exercise", goal: 30, progress: 0, streak: 0, calories: 0 })
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>(exerciseTypesData[0])
  const [customAmount, setCustomAmount] = useState("")

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    const habits = getHabits()
    const exerciseHabit = habits.find((h) => h.type === "exercise")
    if (exerciseHabit) {
      setHabit(exerciseHabit)
    }
  }, [])

  // Función para añadir ejercicio
  const addExercise = (amount: number) => {
    const newProgress = Math.min(habit.progress + amount, habit.goal)
    const newCalories = Math.round(habit.calories + amount * selectedExercise.caloriesPerMinute)
    const updatedHabit = {
      ...habit,
      progress: newProgress,
      calories: newCalories,
      streak: newProgress >= habit.goal ? habit.streak + 1 : habit.streak,
    }
    updateHabit(habit.id, updatedHabit)
    setHabit(updatedHabit)
  }

  // Manejador para el cambio en la entrada de cantidad personalizada
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || (Number(value) >= 0 && Number(value) <= 1000)) {
      setCustomAmount(value)
    }
  }

  // Función para añadir una cantidad personalizada de ejercicio
  const addCustomAmount = () => {
    const amount = Number(customAmount)
    if (!isNaN(amount) && amount > 0) {
      addExercise(amount)
      setCustomAmount("")
    }
  }

  const progress = Math.round((habit.progress / habit.goal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-100 to-orange-100 p-4 space-y-6"
    >
      <Button variant="ghost" className="self-start mb-4 shadow-neumorph rounded-full" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full max-w-md shadow-lg rounded-2xl border-2 border-red-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold text-red-800">Hacer Ejercicio</CardTitle>
          <Dumbbell className="h-8 w-8 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold text-red-700">{habit.progress} min</span>
              <span className="text-xl text-red-600 ml-2">/ {habit.goal} min</span>
            </div>
            <Progress value={progress} className="w-full h-4 bg-red-200 rounded-full overflow-hidden" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Calorías quemadas: {habit.calories}</span>
            </div>
            <Select
              value={selectedExercise.name}
              onValueChange={(value) => {
                const exercise = exerciseTypesData.find((e) => e.name === value)
                if (exercise) setSelectedExercise(exercise)
              }}
            >
              <SelectTrigger className="shadow-inner rounded-full bg-white">
                <SelectValue placeholder="Selecciona un tipo de ejercicio" />
              </SelectTrigger>
              <SelectContent>
                {exerciseTypesData.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="custom-amount" className="sr-only">
                  Minutos de ejercicio
                </Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Minutos de ejercicio"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="shadow-inner rounded-full bg-white"
                  min="0"
                  max="1000"
                />
              </div>
              <Button
                onClick={addCustomAmount}
                className="shadow-md rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                Añadir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <TransitionWrapper href="/habit/exercise/history">
          <Button variant="outline" className="w-full shadow-md rounded-full bg-white hover:bg-red-100">
            <BarChart className="mr-2 h-4 w-4" /> Historial
          </Button>
        </TransitionWrapper>
        <TransitionWrapper href="/habit/exercise/reminders">
          <Button variant="outline" className="w-full shadow-md rounded-full bg-white hover:bg-red-100">
            <Bell className="mr-2 h-4 w-4" /> Recordatorios
          </Button>
        </TransitionWrapper>
      </div>

      <Card className="w-full max-w-md shadow-lg rounded-2xl border-2 border-red-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-red-800">Consejos para mantenerte activo</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Empieza el día con estiramientos</li>
            <li>Toma descansos activos durante el trabajo</li>
            <li>Usa las escaleras en lugar del ascensor</li>
            <li>Programa sesiones cortas de ejercicio durante el día</li>
            <li>Encuentra un compañero de ejercicio para mantenerte motivado</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

