"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Droplet, Dumbbell, Apple } from "lucide-react"
import { updatePet } from "@/utils/data-utils"

interface HabitStreak {
  water: number
  exercise: number
  food: number
}

interface VirtualPetProps {
  pet?: {
    id: string
    name: string
    mood: string
    health: number
  }
  streaks: HabitStreak
  customMood?: string
  customMessage?: string
  className?: string
}

export function VirtualPet({ pet, streaks, customMood, customMessage, className }: VirtualPetProps) {
  const [mood, setMood] = useState(customMood || pet?.mood || "neutral")
  const [message, setMessage] = useState(customMessage || "")

  useEffect(() => {
    if (customMood) {
      setMood(customMood)
    } else {
      let newMood = "happy"
      let badHabits = 0

      if (streaks.water === 0) badHabits++
      if (streaks.exercise === 0) badHabits++
      if (streaks.food === 0) badHabits++

      if (badHabits === 3) {
        newMood = "dead"
        setMessage("¡Oh no! He muerto. Necesitas atención urgente en todos tus hábitos.")
      } else if (badHabits > 0) {
        newMood = "severely_sick"
        setMessage("Estoy severamente enfermo y encamado. Necesitamos mejorar urgentemente tus hábitos.")
      } else if (streaks.water < 2) {
        newMood = "thirsty"
        setMessage("Estoy muy sediento. ¿Podemos beber más agua?")
      } else if (streaks.exercise < 2) {
        newMood = "lazy"
        setMessage("Me siento muy holgazán. ¿Qué tal si hacemos algo de ejercicio?")
      } else if (streaks.food < 2) {
        newMood = "hungry"
        setMessage("Tengo mucha hambre. ¿Podemos comer algo saludable?")
      } else {
        setMessage("¡Me siento genial! Sigamos con el buen trabajo en todos los hábitos.")
      }

      setMood(newMood)
      if (pet?.id) {
        updatePet(pet.id, { mood: newMood })
      }
    }

    if (customMessage) {
      setMessage(customMessage)
    }
  }, [pet?.id, streaks, customMood, customMessage])

  const petVariants = {
    happy: { scale: 1.2, y: -10, rotate: [0, -10, 10, -10, 10, 0], color: "#8B5CF6" },
    thirsty: { scale: 0.9, y: 5, color: "#3B82F6" },
    lazy: { scale: 1.1, y: 0, rotate: [-5, 5, -5], color: "#EF4444" },
    hungry: { scale: 0.95, y: 5, color: "#10B981" },
    severely_sick: { scale: 0.8, y: 10, color: "#DC2626" },
    dead: { scale: 0.7, y: 15, color: "#1F2937" },
    neutral: { scale: 1, y: 0, color: "#6B7280" },
  }

  const currentMood = petVariants[mood as keyof typeof petVariants] || petVariants.neutral

  const getHabitIcon = (habit: keyof HabitStreak, streak: number) => {
    const color = streak === 0 ? "text-red-500" : streak < 2 ? "text-yellow-500" : "text-green-500"
    switch (habit) {
      case "water":
        return <Droplet className={`w-6 h-6 ${color}`} />
      case "exercise":
        return <Dumbbell className={`w-6 h-6 ${color}`} />
      case "food":
        return <Apple className={`w-6 h-6 ${color}`} />
    }
  }

  return (
    <div
      className={`flex flex-col items-center mt-4 p-6 bg-gray-100 rounded-xl shadow-neumorph cursor-pointer transition-transform hover:scale-105 ${className}`}
    >
      <motion.div animate={mood} variants={petVariants} transition={{ duration: 0.5 }} className="text-6xl mb-4">
        {mood === "happy" && "😄"}
        {mood === "thirsty" && "🥵"}
        {mood === "lazy" && "😴"}
        {mood === "hungry" && "😋"}
        {mood === "severely_sick" && "🤒"}
        {mood === "dead" && "💀"}
        {mood === "neutral" && "😐"}
      </motion.div>
      <p className="text-center text-sm mb-4 px-4" style={{ color: currentMood.color }}>
        {message}
      </p>
      <div className="flex space-x-4">
        {getHabitIcon("water", streaks.water)}
        {getHabitIcon("exercise", streaks.exercise)}
        {getHabitIcon("food", streaks.food)}
      </div>
    </div>
  )
}

