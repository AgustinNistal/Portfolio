"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Route, City, Accommodation } from "@/lib/senderosur/data"

type Language = "es" | "en"

// Static UI Translations
const translations = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.routes": "Rutas",
    "nav.accommodations": "Hospedajes",
    "nav.login": "Ingresar",
    "nav.profile": "Mi Perfil",
    "nav.reservations": "Mis Reservas",
    "nav.logout": "Cerrar Sesión",
    // Home
    "home.hero.title": "Descubrí Argentina",
    "home.hero.subtitle": "Viví experiencias únicas en domos ecológicos a través de las rutas más impresionantes del país.",
    "home.hero.cta": "Explorar Rutas",
    // Footer
    "footer.slogan": "Descubrí las mejores rutas turísticas de Argentina con alojamiento en domos ecológicos.",
    "footer.routes.title": "Rutas",
    "footer.contact.title": "Contacto",
    "footer.rights": "Todos los derechos reservados.",
    // Modals
    "booking.modal.title": "Reservar",
    "booking.modal.book": "Confirmar Reserva",
    "booking.modal.success": "Reserva Confirmada",
    "booking.modal.processing": "Procesando...",
    "booking.modal.login": "Iniciar sesión para reservar",
    "booking.pack.title": "Reservar Pack Completo",
    // Default Fallback
    "default": ""
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.routes": "Routes",
    "nav.accommodations": "Lodging",
    "nav.login": "Log In",
    "nav.profile": "My Profile",
    "nav.reservations": "My Bookings",
    "nav.logout": "Log Out",
    // Home
    "home.hero.title": "Discover Argentina",
    "home.hero.subtitle": "Live unique experiences in eco-domes across the most stunning routes of the country.",
    "home.hero.cta": "Explore Routes",
    // Footer
    "footer.slogan": "Discover the best tourist routes in Argentina staying in ecological domes.",
    "footer.routes.title": "Routes",
    "footer.contact.title": "Contact",
    "footer.rights": "All rights reserved.",
    // Modals
    "booking.modal.title": "Book",
    "booking.modal.book": "Confirm Booking",
    "booking.modal.success": "Booking Confirmed",
    "booking.modal.processing": "Processing...",
    "booking.modal.login": "Log in to book",
    "booking.pack.title": "Book Full Pack",
    // Default Fallback
    "default": ""
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  // For dynamic data (i.e. from data.ts)
  translateRoute: (route: Route) => Route
  translateCity: (city: City) => City
  translateAccommodation: (acc: Accommodation) => Accommodation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

import { enDataTranslations } from "@/lib/senderosur/en-data"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("sendero-sur-lang") as Language
    if (saved === "es" || saved === "en") {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("sendero-sur-lang", lang)
  }

  const t = (key: string) => {
    // @ts-ignore
    return translations[language][key] || key
  }

  const translateRoute = (route: Route): Route => {
    if (language === "es") return route
    // @ts-ignore
    const eng = enDataTranslations.routes[route.id]
    if (!eng) return route
    return { ...route, ...eng }
  }

  const translateCity = (city: City): City => {
    if (language === "es") return city
    // @ts-ignore
    const eng = enDataTranslations.cities[city.id]
    if (!eng) return city
    return { ...city, ...eng }
  }

  const translateAccommodation = (acc: Accommodation): Accommodation => {
    if (language === "es") return acc
    // @ts-ignore
    const eng = enDataTranslations.accommodations[acc.id]
    if (!eng) return acc
    return { ...acc, ...eng }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateRoute, translateCity, translateAccommodation }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
