"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Droplet, ArrowLeft, Plus, Minus, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { getHabits, updateHabit } from "@/utils/data-utils"

export default function WaterHabit() {
  const router = useRouter()
  const [waterConsumed, setWaterConsumed] = useState(0)
  const [goal, setGoal] = useState(2000) // 2000 ml (2L) como objetivo diario
  const [customAmount, setCustomAmount] = useState("")
  const [habit, setHabit] = useState({
    id: "",
    type: "water",
    progress: 0,
    goal: 2000,
    streak: 0,
    name: "Beber Agua",
    unit: "ml",
    icon: "droplet",
    color: "blue",
  })

  useEffect(() => {
    const habits = getHabits()
    const waterHabit = habits.find((h) => h.type === "water")
    if (waterHabit) {
      setHabit(waterHabit)
      setWaterConsumed(waterHabit.progress)
      setGoal(waterHabit.goal)
    }
  }, [])

  const addWater = (amount: number) => {
    const newProgress = Math.min((habit?.progress || 0) + amount, habit?.goal || 2000)
    const updatedHabit = {
      ...habit,
      progress: newProgress,
      streak: newProgress >= (habit?.goal || 2000) ? (habit?.streak || 0) + 1 : habit?.streak || 0,
    }
    updateHabit(habit?.id || "", updatedHabit)
    setHabit(updatedHabit)
    setWaterConsumed(newProgress)
  }

  const removeWater = (amount: number) => {
    const newProgress = Math.max((habit?.progress || 0) - amount, 0)
    const updatedHabit = {
      ...habit,
      progress: newProgress,
    }
    updateHabit(habit?.id || "", updatedHabit)
    setHabit(updatedHabit)
    setWaterConsumed(newProgress)
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
  }

  const addCustomAmount = () => {
    const amount = Number.parseInt(customAmount)
    if (!isNaN(amount) && amount > 0) {
      addWater(amount)
      setCustomAmount("")
    }
  }

  const progress = Math.round(((habit?.progress || 0) / (habit?.goal || 2000)) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-cyan-100 p-4 space-y-6"
    >
      <Button variant="ghost" className="self-start mb-4 shadow-neumorph rounded-full" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full max-w-md shadow-lg rounded-2xl border-2 border-blue-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold text-blue-800">Beber Agua.</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto shadow-neumorph rounded-full"
            onClick={() => router.push("/habit/water/customize")}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Droplet className="h-8 w-8 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-4xl font-bold text-blue-700">{habit?.progress || 0} ml</span>
              <span className="text-xl text-blue-600 ml-2">/ {habit?.goal || 2000} ml</span>
            </div>
            <Progress value={progress} className="w-full h-4 bg-blue-200 rounded-full overflow-hidden" />
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                className="shadow-md rounded-full bg-white hover:bg-blue-100"
                onClick={() => removeWater(250)}
              >
                <Minus className="mr-2 h-4 w-4" /> 250 ml
              </Button>
              <Button
                variant="outline"
                className="shadow-md rounded-full bg-white hover:bg-blue-100"
                onClick={() => addWater(250)}
              >
                <Plus className="mr-2 h-4 w-4" /> 250 ml
              </Button>
            </div>
            <div className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="custom-amount" className="sr-only">
                  Cantidad personalizada
                </Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Cantidad en ml"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="shadow-inner rounded-full bg-white"
                />
              </div>
              <Button
                onClick={addCustomAmount}
                className="shadow-md rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Añadir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mt-4 shadow-lg rounded-2xl border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-800">Consejos para mantenerte hidratado</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Bebe un vaso de agua al despertar</li>
            <li>Lleva siempre una botella de agua contigo</li>
            <li>Establece recordatorios en tu teléfono</li>
            <li>Consume alimentos ricos en agua como frutas y verduras</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

