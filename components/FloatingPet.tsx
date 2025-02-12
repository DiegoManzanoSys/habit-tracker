"use client"

// Importamos las dependencias necesarias
import type React from "react" // React y sus hooks
import { useState, useEffect } from "react"
import { motion } from "framer-motion" // Para animaciones
import { getHabits, getPet } from "@/utils/data-utils" // Funciones para obtener datos

// Definimos la interfaz para las propiedades del componente
interface FloatingPetProps {
  className?: string // Clase CSS opcional
}

// Definimos el componente FloatingPet
export const FloatingPet: React.FC<FloatingPetProps> = ({ className }) => {
  // Estado para almacenar los datos de la mascota
  const [pet, setPet] = useState(getPet())
  // Estado para almacenar las rachas de hábitos
  const [habitStreaks, setHabitStreaks] = useState({
    water: 0,
    exercise: 0,
    food: 0,
  })

  // Efecto que se ejecuta al montar el componente y cada 60 segundos
  useEffect(() => {
    // Función para actualizar los datos de la mascota y las rachas
    const updatePetAndStreaks = () => {
      setPet(getPet()) // Actualizamos los datos de la mascota
      const habits = getHabits() // Obtenemos los hábitos actualizados
      // Calculamos las rachas de hábitos
      const streaks = habits.reduce(
        (acc, habit) => {
          acc[habit.type] = habit.streak || 0
          return acc
        },
        {} as Record<string, number>,
      )
      setHabitStreaks(streaks) // Actualizamos el estado de las rachas
    }

    // Llamamos a la función inmediatamente
    updatePetAndStreaks()
    // Configuramos un intervalo para actualizar cada 60 segundos
    const intervalId = setInterval(updatePetAndStreaks, 60000)

    // Función de limpieza que se ejecuta al desmontar el componente
    return () => clearInterval(intervalId)
  }, []) // El array vacío significa que este efecto solo se ejecuta al montar y desmontar el componente

  // Función para determinar el estado de ánimo de la mascota
  const determineMood = () => {
    let mood = "happy" // Estado de ánimo por defecto
    let badHabits = 0 // Contador de hábitos malos

    // Contamos cuántos hábitos tienen una racha de 0
    if (habitStreaks.water === 0) badHabits++
    if (habitStreaks.exercise === 0) badHabits++
    if (habitStreaks.food === 0) badHabits++

    // Determinamos el estado de ánimo basado en los hábitos
    if (badHabits === 3) {
      mood = "dead"
    } else if (badHabits > 0) {
      mood = "sick"
    } else if (habitStreaks.water < 2) {
      mood = "thirsty"
    } else if (habitStreaks.exercise < 2) {
      mood = "lazy"
    } else if (habitStreaks.food < 2) {
      mood = "hungry"
    }

    return mood // Devolvemos el estado de ánimo determinado
  }

  // Obtenemos el estado de ánimo actual
  const currentMood = determineMood()

  // Definimos las variantes de animación para diferentes estados de ánimo
  const moodVariants = {
    happy: { y: [0, -10, 0], transition: { yoyo: Number.POSITIVE_INFINITY, duration: 1 } },
    thirsty: { rotate: [0, 10, -10, 0], transition: { yoyo: Number.POSITIVE_INFINITY, duration: 1 } },
    lazy: { scale: [1, 1.1, 1], transition: { yoyo: Number.POSITIVE_INFINITY, duration: 1.5 } },
    hungry: { x: [0, 10, -10, 0], transition: { yoyo: Number.POSITIVE_INFINITY, duration: 0.5 } },
    sick: { y: [0, 5, 0], transition: { yoyo: Number.POSITIVE_INFINITY, duration: 2 } },
    dead: { rotate: 180, transition: { duration: 0.5 } },
  }

  // Renderizamos el componente
  return (
    <motion.div
      className={`fixed bottom-20 right-4 z-50 ${className}`} // Posicionamiento y z-index
      animate={currentMood} // Animación basada en el estado de ánimo
      variants={moodVariants} // Variantes de animación
    >
      {/* Renderizamos el emoji correspondiente al estado de ánimo */}
      <span role="img" aria-label={`Mascota ${currentMood}`} className="text-4xl">
        {currentMood === "happy" && "😄"}
        {currentMood === "thirsty" && "🥵"}
        {currentMood === "lazy" && "😴"}
        {currentMood === "hungry" && "😋"}
        {currentMood === "sick" && "🤒"}
        {currentMood === "dead" && "💀"}
      </span>
    </motion.div>
  )
}

