"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

const mealSuggestions = {
  Frutas: ["Manzana", "Plátano", "Naranja", "Fresas", "Arándanos"],
  Verduras: ["Brócoli", "Zanahorias", "Espinacas", "Pimientos", "Tomates"],
  Proteínas: ["Pechuga de pollo", "Salmón", "Huevos", "Lentejas", "Tofu"],
  Granos: ["Quinoa", "Avena", "Arroz integral", "Pan integral", "Pasta integral"],
  Lácteos: ["Yogur griego", "Leche de almendras", "Queso cottage", "Kéfir", "Leche desnatada"],
  "Grasas saludables": ["Aguacate", "Nueces", "Almendras", "Aceite de oliva", "Semillas de chía"],
}

export default function HealthyEatingSuggestions() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(mealSuggestions)[0])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/healthy-eating")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Sugerencias de Comidas Saludables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(mealSuggestions).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ul className="list-disc list-inside space-y-2">
              {mealSuggestions[selectedCategory as keyof typeof mealSuggestions].map((meal, index) => (
                <li key={index}>{meal}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Consejos para preparar comidas saludables</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Planifica tus comidas con anticipación</li>
            <li>Usa métodos de cocción saludables como hornear, asar o cocinar al vapor</li>
            <li>Experimenta con hierbas y especias para dar sabor sin añadir calorías</li>
            <li>Prepara porciones adecuadas para evitar comer en exceso</li>
            <li>Incluye una variedad de colores en tu plato para asegurar una diversidad de nutrientes</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

