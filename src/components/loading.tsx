"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function LoadingOverlay({
  progress,
  language,
}: {
  progress: number
  language: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <div className="max-w-md w-full px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
            <div className="flex justify-center items-center">
                <Image src="/logo_sm.png" alt="Manara Water Consulting" height={50} width={50} />
                <p className="font-medium text-primary">
                Manara Water <span className="text-gray-700 dark:text-gray-300">Consulting</span>
                </p>
            </div>
            <p className="text-muted-foreground">Please wait while we translate the content</p>
        </motion.div>

        {/* Progress bar container */}
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated circles */}
        <div className="relative h-32 mt-8">
          <AnimatedCircles />
        </div>
      </div>
    </motion.div>
  )
}

function AnimatedCircles() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/30"
          initial={{
            width: 40,
            height: 40,
            opacity: 0,
          }}
          animate={{
            width: [40, 120 + i * 30],
            height: [40, 120 + i * 30],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <Globe className="size-6 text-primary" />
      </motion.div>
    </div>
  )
}