import type React from "react"
import type { Metadata } from "next"
import LayoutClient from "./_layoutClient"
import "./globals.css"

export const metadata: Metadata = {
  title: "Conoce Argentina - Rutas Turísticas en Domos",
  description:
    "Explora Argentina con alojamiento boutique en domos sustentables. Descubre rutas turísticas únicas por costas, montañas, viñedos y la Patagonia.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutClient>{children}</LayoutClient>
}
