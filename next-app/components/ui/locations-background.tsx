"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function LocationsBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.18 }}
      aria-hidden="true"
    >
      <MeshGradient
        style={{ width: "100%", height: "100%" }}
        colors={["#f6efe3", "#ecdfd0", "#d8cbbb", "#c4ab8e"]}
        speed={0.2}
      />
    </div>
  )
}
