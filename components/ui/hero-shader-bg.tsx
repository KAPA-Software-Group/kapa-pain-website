"use client"

import { MeshGradient } from "@paper-design/shaders-react"

interface HeroShaderBgProps {
  speed?: number
  className?: string
}

export function HeroShaderBg({ speed = 0.25, className }: HeroShaderBgProps) {
  return (
    <MeshGradient
      className={className}
      // Clinic palette: vanilla, sand, tobacco, mountain — warm and calm
      colors={["#F1EADA", "#E8DDD0", "#CEC1A8", "#b59e7d"]}
      speed={speed}
      backgroundColor="#F1EADA"
    />
  )
}
