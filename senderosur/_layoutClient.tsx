"use client"

import type React from "react"

import { Lexend, Shrikhand, Barrio } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
})

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shrikhand",
})
const barrio = Barrio({
   weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barrio",
})


export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${lexend.className} antialiased`}>
        <style jsx global>{`
          :root {
            --font-display: ${shrikhand.style.fontFamily};
            --font-barrio: ${barrio.style.fontFamily};
            --font-lexend: ${lexend.style.fontFamily};
          }
        `}</style>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
