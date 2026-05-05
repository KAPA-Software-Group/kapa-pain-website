import type { Metadata, Viewport } from "next"
import { DM_Sans, Spectral, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Precision Pain Centre — Multidisciplinary Specialist Clinic",
  description:
    "Evidence-based pain management delivered by a team of specialists across Brampton and Hamilton. Covered by OHIP when referred by your family physician.",
  keywords: [
    "pain clinic",
    "chronic pain",
    "OHIP",
    "Brampton",
    "Hamilton",
    "pain management",
    "multidisciplinary",
  ],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spectral.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
