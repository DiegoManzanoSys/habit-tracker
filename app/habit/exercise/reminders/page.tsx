"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell } from "lucide-react"

export default function ExerciseReminders() {
  const router = useRouter()
  const [dailyReminder, setDailyReminder] = useState(true)
  const [reminderTime, setReminderTime] = useState("08:00")

  const saveReminders = () => {
    // Aquí guardarías la configuración de recordatorios
    // Por ejemplo, en localStorage o enviándola a un servidor
    localStorage.setItem("exerciseReminderEnabled", dailyReminder.toString())
    localStorage.setItem("exerciseReminderTime", reminderTime)
    alert("Recordatorios guardados")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <Button variant="ghost" className="self-start mb-4" onClick={() => router.push("/habit/exercise")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>

      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Recordatorios de Ejercicio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reminder">Recordatorio diario</Label>
              <Switch id="daily-reminder" checked={dailyReminder} onCheckedChange={setDailyReminder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminder-time">Hora del recordatorio</Label>
              <Input
                id="reminder-time"
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            <Button onClick={saveReminders} className="w-full">
              <Bell className="mr-2 h-4 w-4" /> Guardar Recordatorios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

