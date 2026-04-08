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
    "booking.title": "Reservar",
    "booking.confirm": "Confirmar Reserva",
    "booking.success.title": "Reserva Confirmada",
    "booking.success.desc": "Tu reserva ha sido procesada exitosamente. Podés verla en tu perfil.",
    "booking.dates": "Fechas de estadía",
    "booking.night": "noche",
    "booking.nights": "noches",
    "booking.selected": "seleccionadas",
    "booking.guests": "Huéspedes",
    "booking.guest": "huésped",
    "booking.total": "Total",
    "booking.processing": "Procesando...",
    "booking.login_to_book": "Iniciar sesión para reservar",
    "booking.terms": "Al reservar aceptás nuestros términos y condiciones. Cancelación gratuita hasta 48hs antes del check-in.",
    "booking.pack.reserve_title": "Reservar Pack",
    "booking.pack.success.title": "¡Pack Reservado Exitosamente!",
    "booking.pack.success.desc": "Tus reservas para toda la ruta han sido generadas. Podés ver los detalles en tu perfil.",
    "booking.pack.start_date": "Fecha de inicio (Check-in)",
    "booking.pack.guests_max": "Huéspedes (Max: ",
    "booking.pack.itinerary": "Tu itinerario",
    "booking.pack.final_total": "Total Final",
    "booking.pack.processing": "Procesando Pack...",
    "booking.pack.confirm": "Confirmar Reserva del Pack",
    "booking.pack.terms": "Al reservar aceptás nuestros términos y condiciones. Cancelación gratuita hasta 48hs antes del primer check-in.",
    "accommodations.book_now": "Reservar ahora",
    "accommodations.reviews": "reseñas",
    "accommodations.up_to": "Hasta",
    "accommodations.about": "Sobre este domo",
    "accommodations.located_in": "Ubicado en",
    "accommodations.amenities": "Amenidades",
    "accommodations.todo": "Qué hacer en",
    "accommodations.night": "noche",
    "accommodations.free_cancellation": "Cancelación gratuita hasta 48hs antes",
    "accommodations.max_capacity": "Capacidad máxima",
    "accommodations.people": "personas",
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
    "booking.title": "Book",
    "booking.confirm": "Confirm Booking",
    "booking.success.title": "Booking Confirmed",
    "booking.success.desc": "Your booking has been successfully processed. You can view it in your profile.",
    "booking.dates": "Stay dates",
    "booking.night": "night",
    "booking.nights": "nights",
    "booking.selected": "selected",
    "booking.guests": "Guests",
    "booking.guest": "guest",
    "booking.total": "Total",
    "booking.processing": "Processing...",
    "booking.login_to_book": "Log in to book",
    "booking.terms": "By booking you accept our terms and conditions. Free cancellation up to 48 hours before check-in.",
    "booking.pack.reserve_title": "Book Pack",
    "booking.pack.success.title": "Pack Successfully Booked!",
    "booking.pack.success.desc": "Your bookings for the entire route have been generated. You can see the details in your profile.",
    "booking.pack.start_date": "Start date (Check-in)",
    "booking.pack.guests_max": "Guests (Max: ",
    "booking.pack.itinerary": "Your itinerary",
    "booking.pack.final_total": "Final Total",
    "booking.pack.processing": "Processing Pack...",
    "booking.pack.confirm": "Confirm Pack Booking",
    "booking.pack.terms": "By booking you accept our terms and conditions. Free cancellation up to 48 hours before the first check-in.",
    "accommodations.book_now": "Book now",
    "accommodations.reviews": "reviews",
    "accommodations.up_to": "Up to",
    "accommodations.about": "About this dome",
    "accommodations.located_in": "Located in",
    "accommodations.amenities": "Amenities",
    "accommodations.todo": "Things to do in",
    "accommodations.night": "night",
    "accommodations.free_cancellation": "Free cancellation up to 48h before",
    "accommodations.max_capacity": "Max capacity",
    "accommodations.people": "people",
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
    return translations[language][key]
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
