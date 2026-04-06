"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/senderosur/ui/button"
import { MapPin, Clock, Plane, ArrowRight } from "lucide-react"
import type { Route } from "@/lib/senderosur/data"

const routeImages: Record<string, string> = {
  "costera-atlantica": "https://ik.imagekit.io/ankxi835d/rutasimg/ballena-paisaje-hotel-peninsula-valdes-puerto-madryn-chubut-argentina.jpeg?updatedAt=1763067101439",
  "andina-norte": "https://ik.imagekit.io/ankxi835d/rutasimg/cerroSieteColores.jpg?updatedAt=1763065075237",
  litoral: "https://ik.imagekit.io/ankxi835d/rutasimg/esterosibera.jpg?updatedAt=1763093784020",
  patagonica: "https://ik.imagekit.io/ankxi835d/rutasimg/glaciares.jpg?updatedAt=1763065075199",
  vinedos: "https://ik.imagekit.io/ankxi835d/rutasimg/vacaciones-invierno-que-hacer-mendoza-vinedos-y-montana.webp?updatedAt=1763067641238",
}

interface RoutesListingProps {
  routes: Route[]
}

export function RoutesListing({ routes }: RoutesListingProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px" },
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12">
      <div className="space-y-0">
        {routes.map((route, index) => (
          <div
            key={route.id}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            data-index={index}
            className={`transition-all duration-700 ease-out ${visibleCards.has(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24"
              }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link href={`/senderosur/rutas/${route.slug}`} className="block group">
              <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
                <Image
                  src={routeImages[route.slug] || "/placeholder.svg?height=800&width=1200"}
                  alt={route.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

                <div className="absolute inset-0 flex items-end">
                  <div className="container mx-auto px-4 pb-12">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 text-primary mb-3">
                        <Plane className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {route.stops[0].city} — {route.stops[route.stops.length - 1].city}
                        </span>
                      </div>

                      <h2 className="font-serif text-3xl md:text-5xl text-background mb-4">{route.name}</h2>

                      <p className="text-background/80 text-lg mb-6 line-clamp-2">{route.description}</p>

                      <div className="flex flex-wrap gap-6 text-background/70 mb-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-accent" />
                          <span>{route.stops.length} destinos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-accent" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-background/50">Total:</span>
                          <span>{route.totalDistance}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-background/60 text-sm">Pack completo desde</span>
                          <p className="text-accent font-serif text-3xl">USD {route.packPrice}</p>
                        </div>
                        <Button
                          size="lg"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group-hover:gap-4 transition-all"
                        >
                          Ver Ruta
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
