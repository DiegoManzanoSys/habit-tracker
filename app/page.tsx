"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplet, Dumbbell, Apple } from "lucide-react"
import { VirtualPet } from "@/components/virtual-pet"
import { TransitionWrapper } from "@/components/transition-wrapper"
import { motion } from "framer-motion"
import Link from "next/link"
import { getHabits, getPet } from "@/utils/data-utils"
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import { useLocalStorageContext } from '@/app/components/LocalStorageProvider'

// Componente principal de la página de inicio
export default function Home() {
  // Estados para los hábitos y la mascota virtual
  const [habits, setHabits] = useState(getHabits())
  const [pet, setPet] = useState(getPet())

  // Usando el hook
  const [value, setValue] = useLocalStorage('key', 'default')
  
  // O usando el contexto
  const localStorage = useLocalStorageContext()

  // Efecto para actualizar los hábitos y la mascota cada segundo
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHabits(getHabits())
      setPet(getPet())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Función para obtener el icono correspondiente a cada hábito
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "droplet":
        return Droplet
      case "dumbbell":
        return Dumbbell
      case "apple":
        return Apple
      default:
        return Droplet
    }
  }

  // Calcula las rachas de hábitos para la mascota virtual
  const habitStreaks = habits.reduce(
    (acc, habit) => {
      acc[habit.type] = habit.streak || 0
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4 space-y-6"
    >
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">HealthyHabits</h1>
        <p className="text-sm text-purple-600">¡Cuida tus hábitos, cuida tu vida!</p>
      </div>

      <Link href="/pet" className="w-full max-w-md">
        <VirtualPet pet={pet} streaks={habitStreaks} />
      </Link>

      <div className="w-full max-w-md space-y-4 pb-16">
        {habits.map((habit) => {
          const Icon = getIcon(habit.icon)
          const progress = Math.round((habit.progress / habit.goal) * 100)
          return (
            <TransitionWrapper key={habit.id} href={`/habit/${habit.type}`}>
              <Card
                className={`bg-white hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden border-2 border-${habit.color}-300`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-gray-800">{habit.name}</h2>
                    <Icon className={`w-8 h-8 text-${habit.color}-500`} />
                  </div>
                  <Progress value={progress} className="w-full h-3 bg-gray-200 rounded-full overflow-hidden" />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-gray-600">Progreso: {progress}%</span>
                    <span className="text-sm font-medium text-gray-600">Racha: {habit.streak || 0} días</span>
                  </div>
                </CardContent>
              </Card>
            </TransitionWrapper>
          )
        })}
      </div>
    </motion.main>
  )
}

