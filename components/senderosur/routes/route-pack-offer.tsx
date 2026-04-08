"use client"

import { useState } from "react"
import { Button } from "@/components/senderosur/ui/button"
import { Check, Package, Users, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/senderosur/auth-context"
import { AuthModal } from "@/components/senderosur/auth-modal"
import { PackBookingModal } from "@/components/senderosur/routes/pack-booking-modal"
import type { Route } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"

interface RoutePackOfferProps {
  route: Route
}

export function RoutePackOffer({ route }: RoutePackOfferProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [packModalOpen, setPackModalOpen] = useState(false)
  const { user } = useAuth()
  const { t, translateRoute } = useLanguage()
  
  const translatedRoute = translateRoute(route)

  const handleBookPack = () => {
    if (!user) {
      setAuthModalOpen(true)
      return
    }
    setPackModalOpen(true)
  }

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Package className="h-6 w-6" />
                <span className="font-medium text-lg uppercase tracking-wider">{t("booking.confirm")}</span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{t("booking.pack.reserve_title")}</h2>

              <p className="text-muted-foreground mb-6">
                Obtené un precio especial reservando todas las noches de hospedaje de esta ruta. Incluye{" "}
                {translatedRoute.stops.length} noches en domos ecológicos exclusivos. {/* Can translate this later if desired */}
              </p>

              <ul className="space-y-3 mb-8">
                {translatedRoute.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-foreground">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
                <li className="flex items-center gap-3 text-foreground">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Aeropuerto en inicio y fin de ruta</span>
                </li>
              </ul>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>2-4 personas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{translatedRoute.duration}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-8 md:p-10 flex flex-col justify-center">
              <div className="text-center">
                <span className="text-muted-foreground text-sm">Precio total del pack</span>
                <p className="font-serif text-5xl text-accent my-2">USD {translatedRoute.packPrice}</p>
                <p className="text-muted-foreground text-sm mb-6">
                  por persona · {translatedRoute.stops.length} noches incluidas
                </p>

                <Button
                  size="lg"
                  onClick={handleBookPack}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-medium"
                >
                  {t("booking.pack.confirm")}
                </Button>

                <p className="text-xs text-muted-foreground mt-4">
                  * También podés reservar cada hospedaje por separado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      <PackBookingModal open={packModalOpen} onOpenChange={setPackModalOpen} route={translatedRoute} />
    </section>
  )
}
