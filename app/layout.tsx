import { Home, PlusCircle, User } from "lucide-react" // Iconos de Lucide
import Link from "next/link" // Componente de enlace de Next.js
import type React from "react" // Tipo React
import { Notification } from "./components/notification" // Componente de notificación
import { FloatingPet } from "@/components/FloatingPet" // Nuestro nuevo componente de mascota
import { LocalStorageProvider } from '@/components/LocalStorageProvider';

// Definimos el componente de diseño principal
export default function RootLayout({
  children, // Contenido de la página actual
}: {
  children: React.ReactNode // Tipado para las propiedades del componente
}) {
  return (
    // Elemento raíz HTML con idioma español
    <html lang="es">
      <body className="bg-gray-100">
        <LocalStorageProvider>
          {/* Contenedor principal con ancho máximo y centrado */}
          <div className="max-w-md mx-auto bg-gray-100 min-h-screen flex flex-col relative z-0">
            {/* Contenido principal de la página */}
            <main className="flex-grow overflow-y-auto pb-16">{children}</main>

            {/* Barra de navegación fija en la parte inferior */}
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 z-10 shadow-neumorph">
              <div className="max-w-md mx-auto flex justify-around items-center h-16">
                {/* Enlace a la página de inicio */}
                <Link href="/" className="flex flex-col items-center p-2 rounded-lg shadow-neumorph">
                  <Home className="w-6 h-6" />
                  <span className="text-xs mt-1">Inicio</span>
                </Link>
                {/* Enlace para añadir un nuevo hábito */}
                <Link href="/add-habit" className="flex flex-col items-center p-2 rounded-lg shadow-neumorph">
                  <PlusCircle className="w-6 h-6" />
                  <span className="text-xs mt-1">Añadir</span>
                </Link>
                {/* Enlace al perfil del usuario */}
                <Link href="/profile" className="flex flex-col items-center p-2 rounded-lg shadow-neumorph">
                  <User className="w-6 h-6" />
                  <span className="text-xs mt-1">Perfil</span>
                </Link>
              </div>
            </nav>

            {/* Componente de mascota flotante */}
            <FloatingPet />
          </div>
        </LocalStorageProvider>

        {/* Componente de notificación */}
        <Notification />
      </body>
    </html>
  )
}

import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
