"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Droplet, Dumbbell, Apple } from "lucide-react"
import { useRouter } from "next/navigation"
import { VirtualPet } from "@/components/virtual-pet"

export default function PetPage() {
  const router = useRouter()
  const [petName, setPetName] = useState("Amigo")
  const [mood, setMood] = useState("happy")
  const [message, setMessage] = useState("¡Hola! Estoy feliz de verte.")
  const [streaks, setStreaks] = useState({ water: 2, exercise: 2, food: 2 })

  useEffect(() => {
    const savedName = localStorage.getItem("petName")
    if (savedName) {
      setPetName(savedName)
    }
  }, [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetName(e.target.value)
    localStorage.setItem("petName", e.target.value)
  }

  const interact = (action: string) => {
    switch (action) {
      case "pet":
        setMood("happy")
        setMessage("¡Me encanta cuando me acaricias!")
        break
      case "feed":
        setMood("hungry")
        setMessage("¡Gracias por la comida! Estaba deliciosa.")
        break
      case "play":
        setMood("lazy")
        setMessage("¡Jugar contigo es muy divertido!")
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center min-h-screen bg-gray-100 p-4 space-y-6"
    >
      <Button variant="ghost" className="self-start mb-4 shadow-neumorph rounded-full" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full max-w-md shadow-neumorph rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Tu Mascota Virtual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <VirtualPet streaks={streaks} customMood={mood} customMessage={message} />
          </div>
          <Input
            type="text"
            placeholder="Nombre de tu mascota"
            value={petName}
            onChange={handleNameChange}
            className="shadow-neumorph-inset rounded-full text-center"
          />
          <div className="flex justify-center space-x-4">
            <Button onClick={() => interact("pet")} className="shadow-neumorph rounded-full">
              <Heart className="mr-2 h-4 w-4" /> Acariciar
            </Button>
            <Button onClick={() => interact("feed")} className="shadow-neumorph rounded-full">
              <Apple className="mr-2 h-4 w-4" /> Alimentar
            </Button>
            <Button onClick={() => interact("play")} className="shadow-neumorph rounded-full">
              <Dumbbell className="mr-2 h-4 w-4" /> Jugar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md shadow-neumorph rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Estado de los hábitos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center">
            <Droplet className="w-6 h-6 text-blue-500 mr-2" />
            <span>Racha de agua: {streaks.water} días</span>
          </div>
          <div className="flex items-center">
            <Dumbbell className="w-6 h-6 text-red-500 mr-2" />
            <span>Racha de ejercicio: {streaks.exercise} días</span>
          </div>
          <div className="flex items-center">
            <Apple className="w-6 h-6 text-green-500 mr-2" />
            <span>Racha de alimentación saludable: {streaks.food} días</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

