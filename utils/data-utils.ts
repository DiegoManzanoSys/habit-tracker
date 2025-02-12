import habitsData from "../app/data/habits.json"
import virtualPetsData from "../app/data/virtual_pets.json"

export const updateHabit = (habitId: string, updates: Partial<(typeof habitsData)[0]>) => {
  const updatedHabits = habitsData.map((habit) => (habit.id === habitId ? { ...habit, ...updates } : habit))
  localStorage.setItem("habits", JSON.stringify(updatedHabits))
  return updatedHabits
}

export const updatePet = (petId: string, updates: Partial<(typeof virtualPetsData)[0]>) => {
  const updatedPets = virtualPetsData.map((pet) => (pet.id === petId ? { ...pet, ...updates } : pet))
  localStorage.setItem("virtualPets", JSON.stringify(updatedPets))
  return updatedPets
}

export const getHabits = () => {
  const storedHabits = localStorage.getItem("habits")
  return storedHabits ? JSON.parse(storedHabits) : habitsData
}

export const getPet = () => {
  const storedPets = localStorage.getItem("virtualPets")
  return storedPets ? JSON.parse(storedPets)[0] : virtualPetsData[0]
}

