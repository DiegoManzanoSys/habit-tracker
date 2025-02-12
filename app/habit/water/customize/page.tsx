"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Droplet } from "lucide-react"

const predefinedGlasses = [
  { name: "Vaso pequeño", amount: 200 },
  { name: "Vaso mediano", amount: 300 },
  { name: "Vaso grande", amount: 400 },
  { name: "Botella pequeña", amount: 500 },
  { name: "Botella grande", amount: 1000 },
]

export default function CustomizeWaterPortions() {
  const router = useRouter()
  const [customAmount, setCustomAmount] = useState("")

  const addCustomGlass = () => {
    const amount = Number.parseInt(customAmount)
    if (!isNaN(amount) && amount > 0) {
      // Aquí podrías guardar el vaso personalizado en localStorage o en un estado global
      console.log(`Vaso personalizado añadido: ${amount} ml`)
      setCustomAmount("")
    }
  }

  const selectGlass = (amount: number) => {
    // Aquí podrías guardar la selección en localStorage o en un estado global
    console.log(`Vaso seleccionado: ${amount} ml`)
    router.push("/habit/water")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/water")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold">Personalizar Porciones</CardTitle>
          <Droplet className="h-8 w-8 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {predefinedGlasses.map((glass, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => selectGlass(glass.amount)}
              >
                <Droplet className="h-8 w-8 mb-2" />
                <span>{glass.name}</span>
                <span className="text-sm text-gray-500">{glass.amount} ml</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Añadir Vaso Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
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
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
            <Button onClick={addCustomGlass}>
              <Plus className="mr-2 h-4 w-4" /> Añadir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

