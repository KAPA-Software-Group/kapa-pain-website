import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { DM_Sans, Spectral, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { RouteTransition } from "@/components/route-transition"
import { ScrollHint } from "@/components/scroll-hint"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
  title: "Precision Care Centre - Multidisciplinary Specialist Clinic",
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
  verification: {
    google: "PN5GaB-_F5HfFncqxSUgUuAcwIl5EZ8mQQePjNRM4Ys",
  },
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
      <Script
        async
        strategy="beforeInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-RSJ8V9EVF7"
      />
      <Script id="google-tag" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RSJ8V9EVF7');
        `}
      </Script>
      <body className="antialiased">
        <RouteTransition />
        {children}
        <ScrollHint />
      </body>
    </html>
  )
}
