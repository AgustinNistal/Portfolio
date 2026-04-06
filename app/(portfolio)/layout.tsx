import type { Metadata, Viewport } from 'next'
import { Audiowide, Handjet, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-audiowide'
});

const handjet = Handjet({
  subsets: ["latin"],
  variable: '--font-handjet'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Agustín Nistal | Frontend Developer',
  description: 'Frontend Developer con enfoque en diseño responsive y experiencia mobile first. Especializado en React, Next.js y Tailwind CSS.',
  generator: 'v0.app',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Web Developer'],
  authors: [{ name: 'Agustín Nistal Igarzabal' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${audiowide.variable} ${handjet.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen`}>
      {children}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </div>
  )
}
