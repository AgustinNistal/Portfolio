"use client"

import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/senderosur/ui/dialog"
import { Button } from "@/components/senderosur/ui/button"
import { Label } from "@/components/senderosur/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/senderosur/ui/select"
import { Calendar } from "@/components/senderosur/ui/calendar"
import { useAuth } from "@/contexts/senderosur/auth-context"
import { AuthModal } from "@/components/senderosur/auth-modal"
import { CalendarDays, Users, Loader2, Check, Package, AlertCircle } from "lucide-react"
import type { Route } from "@/lib/senderosur/data"
import { accommodations } from "@/lib/senderosur/data"
import { format, startOfDay } from "date-fns"
import { es, enUS } from "date-fns/locale"
import { apiRequest } from "@/hooks/senderosur/api-helper"
import { useLanguage } from "@/contexts/senderosur/language-context"

interface PackBookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  route: Route
}

// Helper to add days
function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function PackBookingModal({ open, onOpenChange, route }: PackBookingModalProps) {
  const { t, language } = useLanguage()
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [guests, setGuests] = useState("2")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { user, addPackReservations } = useAuth()

  // Build the reservation sequence
  const itinerary = useMemo(() => {
    if (!startDate) return []
    
    return route.stops.map((stop, index) => {
      // 1 night per stop
      const checkIn = addDays(startDate, index)
      const checkOut = addDays(checkIn, 1)
      const accommodation = accommodations.find((a) => a.id === stop.accommodationId)
      
      return {
        stop,
        accommodation,
        checkIn,
        checkOut,
      }
    })
  }, [startDate, route.stops])

  // Get minimum guests possible for the pack (the min of the max guests of all accommodations)
  const maxAllowableGuests = useMemo(() => {
    let max = 10
    itinerary.forEach((item) => {
      if (item.accommodation && item.accommodation.maxGuests < max) {
        max = item.accommodation.maxGuests
      }
    })
    return max
  }, [itinerary])

  // If user selects more guests than allowed, reset
  useEffect(() => {
    if (Number(guests) > maxAllowableGuests) {
      setGuests(maxAllowableGuests.toString())
    }
  }, [maxAllowableGuests, guests])

  const handleBookPack = async () => {
    if (!user) {
      setAuthModalOpen(true)
      return
    }

    if (!startDate || itinerary.length === 0) return

    setLoading(true)
    setError(null)

    try {
      // 1. Check availability for all stops first
      const availabilityChecks = itinerary.map(async (item) => {
        if (!item.accommodation) throw new Error("Alojamiento no encontrado")
        return { available: true, name: item.accommodation.name }
      })

      const results = await Promise.all(availabilityChecks)
      const conflicts = results.filter((r) => !r.available)

      if (conflicts.length > 0) {
        setError(`No hay disponibilidad en: ${conflicts.map((c) => c.name).join(", ")}. Por favor elegí otra fecha de inicio.`)
        setLoading(false)
        return
      }

      // 2. Book all
      const reservationsToMake = itinerary.map((item) => {
        if (!item.accommodation) throw new Error("Alojamiento no encontrado")
        // We calculate proportionate price for each property based on the pack price
        // For simplicity, we can divide the pack price equally among the stops
        const pricePerStop = route.packPrice / route.stops.length

        return {
          accommodationId: item.accommodation.id,
          accommodationName: item.accommodation.name,
          cityName: item.stop.city,
          checkIn: item.checkIn,
          checkOut: item.checkOut,
          guests: Number.parseInt(guests),
          totalPrice: pricePerStop,
          status: "confirmed" as const,
        }
      })

      await addPackReservations(reservationsToMake)

    } catch (e) {
      console.error(e)
      setError("No pudimos procesar la reserva del pack. Probá de nuevo.")
      setLoading(false)
      return
    }

    setLoading(false)
    setSuccess(true)

    setTimeout(() => {
      onOpenChange(false)
      setSuccess(false)
      setStartDate(undefined)
    }, 3000)
  }

  const disabledDays = { before: startOfDay(new Date()) }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl flex items-center gap-2">
              <Package className="h-6 w-6 text-accent" />
              {t("booking.pack.reserve_title") || "Reservar Pack"}: {route.name}
            </DialogTitle>
          </DialogHeader>

          {success ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{t("booking.pack.success.title") || "¡Pack Reservado Exitosamente!"}</h3>
              <p className="text-muted-foreground">
                {t("booking.pack.success.desc") || "Tus reservas para toda la ruta han sido generadas. Podés ver los detalles en tu perfil."}
              </p>
            </div>
          ) : (
            <div className="space-y-6 mt-4">
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <CalendarDays className="h-4 w-4" />
                    {t("booking.pack.start_date") || "Fecha de inicio (Check-in)"}
                  </Label>
                  <div className="border border-border rounded-lg p-2 bg-card">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={disabledDays}
                      className="mx-auto"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="guests" className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4" />
                      {t("booking.pack.guests_max") || "Huéspedes (Max:"} {maxAllowableGuests})
                    </Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger id="guests">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: maxAllowableGuests }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? (t("booking.guest") || "huésped") : (t("booking.guests") || "huéspedes")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {startDate && itinerary.length > 0 && (
                    <div className="bg-muted rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-sm text-foreground">{t("booking.pack.itinerary") || "Tu itinerario"}</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        {itinerary.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs pb-2 border-b border-border/50 last:border-0 last:pb-0">
                            <div>
                              <p className="font-medium text-foreground">{item.stop.city}</p>
                              <p className="text-muted-foreground">{item.accommodation?.name}</p>
                            </div>
                            <div className="text-right">
                              <p>{format(item.checkIn, "d MMM", { locale: language === "en" ? enUS : es })}</p>
                              <p className="text-muted-foreground">1 {t("booking.night") || "noche"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between font-medium border-t border-border pt-3 mt-3">
                        <span className="text-foreground">{t("booking.pack.final_total") || "Total Final"}</span>
                        <span className="text-accent font-serif text-xl">USD {route.packPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleBookPack}
                disabled={!startDate || loading}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("booking.pack.processing") || "Procesando Pack..."}
                  </>
                ) : user ? (
                  t("booking.pack.confirm") || "Confirmar Reserva del Pack"
                ) : (
                  t("booking.login_to_book") || "Iniciar sesión para reservar"
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t("booking.pack.terms") || "Al reservar aceptás nuestros términos y condiciones. Cancelación gratuita hasta 48hs antes del primer check-in."}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
