"use client"

import Image from "next/image"
import { Plane, MapPin, Clock, Car } from "lucide-react"
import type { Route } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"

const routeImages: Record<string, string> = {
  "costera-atlantica": "https://ik.imagekit.io/ankxi835d/rutasimg/ballena-paisaje-hotel-peninsula-valdes-puerto-madryn-chubut-argentina.jpeg?updatedAt=1763067101439",
  "andina-norte": "https://ik.imagekit.io/ankxi835d/rutasimg/cerroSieteColores.jpg?updatedAt=1763065075237",
  litoral: "https://ik.imagekit.io/ankxi835d/rutasimg/esterosibera.jpg?updatedAt=1763093784020",
  patagonica: "https://ik.imagekit.io/ankxi835d/rutasimg/glaciares.jpg?updatedAt=1763065075199",
  vinedos: "https://ik.imagekit.io/ankxi835d/rutasimg/vacaciones-invierno-que-hacer-mendoza-vinedos-y-montana.webp?updatedAt=1763067641238",
}

interface RouteHeroProps {
  route: Route
}

export function RouteHero({ route }: RouteHeroProps) {
  const { translateRoute, translateCity } = useLanguage()
  const translatedRoute = translateRoute(route)

  const firstStop = translateCity(translatedRoute.stops[0] as any) // Type hack or we just map it, actually stops don't have descriptions in hero. They just have `city` string. But `cityId` exists. Let's just use `translatedRoute`, and manually call `translateCity` for the names if we had translated city names (which we didn't). So I'll just use `translatedRoute`.
  const lastStop = translateCity(translatedRoute.stops[translatedRoute.stops.length - 1] as any)

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
      <Image
        src={routeImages[translatedRoute.slug] || "/placeholder.svg?height=800&width=1200"}
        alt={translatedRoute.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/20" />

      <div className="container mx-auto px-4 pb-12 relative z-10">
        <div className="flex items-center gap-2 text-primary mb-3">
          <span className="px-3 py-1 bg-primary/20 rounded-full text-sm font-medium">{translatedRoute.theme}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl text-background mb-4">{translatedRoute.name}</h1>

        <p className="text-background/80 text-lg max-w-2xl mb-6">{translatedRoute.description}</p>

        <div className="flex flex-wrap gap-6 text-background">
          <div className="flex items-center gap-2 bg-background/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Plane className="h-5 w-5 text-primary" />
            <span className="text-sm">
              {route.stops[0].city} — {route.stops[route.stops.length - 1].city}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-background/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-sm">{translatedRoute.stops.length} destinos</span>
          </div>
          <div className="flex items-center gap-2 bg-background/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm">{translatedRoute.duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-background/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <Car className="h-5 w-5 text-accent" />
            <span className="text-sm">{translatedRoute.totalDistance}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
