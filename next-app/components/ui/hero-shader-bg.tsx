"use client"

import { MeshGradient } from "@paper-design/shaders-react"

interface HeroShaderBgProps {
  speed?: number
  className?: string
}

export function HeroShaderBg({ speed = 0.25, className }: HeroShaderBgProps) {
  return (
    <div className={className} style={{ opacity: 0.2 }}>
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#F1EADA", "#E8DDD0", "#CEC1A8", "#b59e7d"]}
        speed={speed}
      />
    </div>
  )
}
