"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroTextProps {
  text?: string
  className?: string
  contentClassName?: string
  lineClassName?: string
  textClassName?: string
  showControls?: boolean
  onAnimationComplete?: () => void
}

export default function HeroText({
  text = "IMMERSE",
  className = "",
  contentClassName,
  lineClassName,
  textClassName,
  showControls = true,
  onAnimationComplete,
}: HeroTextProps) {
  const [count, setCount] = useState(0)
  const [animationDone, setAnimationDone] = useState(false)
  const characters = text.split("")
  const words = text.trim().split(/\s+/).filter(Boolean)

  useEffect(() => {
    const durationMs = (characters.length * 0.04 + 1.25) * 1000
    const timer = window.setTimeout(() => {
      setAnimationDone(true)
      onAnimationComplete?.()
    }, durationMs)

    return () => window.clearTimeout(timer)
  }, [characters.length, count, onAnimationComplete])

  const characterClassName = cn(
    "text-[clamp(44px,9vw,118px)] leading-none font-black tracking-normal",
    textClassName
  )

  let characterIndex = 0
  const replayAnimation = () => {
    setAnimationDone(false)
    setCount((c) => c + 1)
  }

  const renderCharacter = (char: string, i: number) => (
    <div key={`${char}-${i}`} className="group relative overflow-hidden px-[0.1vw]">
      {animationDone ? (
        <span
          className={cn("text-zinc-900 dark:text-white", characterClassName)}
        >
          {char}
        </span>
      ) : (
        <motion.span
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
          className={cn("text-zinc-900 dark:text-white", characterClassName)}
        >
          {char}
        </motion.span>
      )}

      <motion.span
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 0] }}
        transition={{
          duration: 0.7,
          delay: i * 0.04,
          ease: "easeInOut",
        }}
        className={cn(
          characterClassName,
          "pointer-events-none absolute inset-0 z-10 text-clay dark:text-emerald-400"
        )}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
        }}
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "-100%", opacity: [0, 1, 0] }}
        transition={{
          duration: 0.7,
          delay: i * 0.04 + 0.1,
          ease: "easeInOut",
        }}
        className={cn(
          characterClassName,
          "pointer-events-none absolute inset-0 z-10 text-zinc-800 dark:text-zinc-200"
        )}
        style={{
          clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
        }}
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 0] }}
        transition={{
          duration: 0.7,
          delay: i * 0.04 + 0.2,
          ease: "easeInOut",
        }}
        className={cn(
          characterClassName,
          "pointer-events-none absolute inset-0 z-10 text-clay dark:text-emerald-400"
        )}
        style={{
          clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
        }}
      >
        {char}
      </motion.span>
    </div>
  )

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center bg-white transition-colors duration-700 dark:bg-zinc-950",
        className
      )}
    >
      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-center px-4",
          contentClassName
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            className={cn(
              "flex w-full flex-wrap items-center justify-center",
              lineClassName
            )}
          >
            {words.map((word, wordIndex) => {
              return (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-flex shrink-0 whitespace-nowrap"
                  style={{
                    marginRight: wordIndex < words.length - 1 ? "0.55em" : 0,
                  }}
                >
                  {Array.from(word).map((char) => {
                    const index = characterIndex
                    characterIndex += 1
                    return renderCharacter(char, index)
                  })}
                </span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {showControls ? (
        <div className="absolute bottom-12 z-20 flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={replayAnimation}
            className="rounded-full bg-zinc-900 p-4 text-white shadow-2xl transition-colors duration-300 dark:bg-white dark:text-black"
            aria-label="Replay shutter animation"
          >
            <RefreshCw size={24} />
          </motion.button>

          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500">
            Click to re-shutter
          </p>
        </div>
      ) : null}

    </div>
  )
}
