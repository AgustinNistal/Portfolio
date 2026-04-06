import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lexend, Shrikhand, Barrio } from "next/font/google"
import "./senderosur/globals.css"
import { LayoutClient } from "@/components/senderosur/layout-client"
import { AuthProvider } from "@/contexts/senderosur/auth-context"
import { LanguageProvider } from "@/contexts/senderosur/language-context"

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
  variable: "--font-barrio",
})

export const metadata: Metadata = {
  title: "Sendero Sur | Rutas Turísticas de Argentina",
  description:
    "Descubrí las mejores rutas turísticas de Argentina con alojamiento en domos ecológicos. Desde la Patagonia hasta el Litoral, viví experiencias únicas.",
  keywords: ["turismo argentina", "rutas turísticas", "domos", "patagonia", "viajes"],
}

export const viewport: Viewport = {
  themeColor: "#2bb1de",
  width: "device-width",
  initialScale: 1,
}

export default function SenderoSurLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${lexend.variable} ${shrikhand.variable} ${barrio.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
      <AuthProvider>
        <LanguageProvider>
          <LayoutClient>{children}</LayoutClient>
        </LanguageProvider>
      </AuthProvider>
    </div>
  )
}
