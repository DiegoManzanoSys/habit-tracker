"use client"

import { useState, useEffect } from "react"
import { Toast } from "@/components/ui/toast"
import { Bell } from "lucide-react"

export function Notification() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  useEffect(() => {
    const checkMealReminders = () => {
      const now = new Date()
      const currentTime =
        now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0")

      const savedMeals = localStorage.getItem("plannedMeals")
      if (savedMeals) {
        const meals = JSON.parse(savedMeals)
        const upcomingMeal = meals.find(
          (meal: { time: string; reminder: boolean }) => meal.time === currentTime && meal.reminder,
        )

        if (upcomingMeal) {
          setNotificationMessage(`¡Llegó la hora de tu ${upcomingMeal.name}!`)
          setShowNotification(true)
          setTimeout(() => setShowNotification(false), 5000)
        }
      }
    }

    const intervalId = setInterval(checkMealReminders, 60000) // Revisar cada minuto

    return () => clearInterval(intervalId)
  }, [])

  if (!showNotification) return null

  return (
    <Toast>
      <div className="flex items-center">
        <Bell className="h-4 w-4 mr-2" />
        <span>{notificationMessage}</span>
      </div>
    </Toast>
  )
}

