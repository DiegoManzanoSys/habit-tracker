"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface TransitionWrapperProps {
  children: ReactNode
  href: string
}

export function TransitionWrapper({ children, href }: TransitionWrapperProps) {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        router.push(href)
      }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  )
}

