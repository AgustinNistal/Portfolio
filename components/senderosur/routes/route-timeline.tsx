"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/senderosur/ui/button"
import { MapPin, Clock, Car, Plane, Home, ArrowRight } from "lucide-react"
import type { Route, RouteStop, City, Accommodation } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"

interface StopWithDetails extends RouteStop {
  cityDetails?: City
  accommodationDetails?: Accommodation
}

interface RouteTimelineProps {
  route: Route
  stops: StopWithDetails[]
}

export function RouteTimeline({ route, stops }: RouteTimelineProps) {
  const { translateCity, translateAccommodation } = useLanguage()
  const [visibleStops, setVisibleStops] = useState<Set<number>>(new Set())
  const stopRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleStops((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 },
    )

    stopRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">Recorrido de la Ruta</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Desde {stops[0].city} hasta {stops[stops.length - 1].city}, cada parada tiene un domo esperándote
        </p>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {stops.map((stopItem, index) => {
            const stop = { ...stopItem }
            if (stop.cityDetails) stop.cityDetails = translateCity(stop.cityDetails)
            if (stop.accommodationDetails) stop.accommodationDetails = translateAccommodation(stop.accommodationDetails)
            
            const isFirst = index === 0
            const isLast = index === stops.length - 1
            const isLeft = index % 2 === 0

            return (
              <div
                key={stop.cityId}
                ref={(el) => {
                  stopRefs.current[index] = el
                }}
                data-index={index}
                className={`relative mb-12 transition-all duration-700 ${
                  visibleStops.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`flex items-start gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div
                      className={`bg-card rounded-xl shadow-md overflow-hidden border border-border ${isLeft ? "md:ml-auto" : ""} max-w-md`}
                    >
                      {stop.accommodationDetails && (
                        <div className="relative h-40">
                          <Image
                            src={stop.accommodationDetails.images[0] || "/placeholder.svg?height=200&width=400"}
                            alt={stop.cityDetails?.name || stop.city}
                            fill
                            className="object-cover"
                          />
                          {(isFirst || isLast) && (
                            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                              <Plane className="h-3 w-3" />
                              Aeropuerto
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{stop.province}</span>
                        </div>

                        <h3 className="font-serif text-xl text-foreground mb-2">{stop.cityDetails?.name || stop.city}</h3>

                        {stop.cityDetails && (
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {stop.cityDetails.description}
                          </p>
                        )}

                        {!isFirst && (
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Car className="h-4 w-4" />
                              <span>{stop.distanceFromPrevious}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{stop.timeFromPrevious}</span>
                            </div>
                          </div>
                        )}

                        {stop.accommodationDetails && (
                          <div className="border-t border-border pt-4">
                            <div className="flex items-center gap-2 text-sm text-foreground mb-2">
                              <Home className="h-4 w-4 text-primary" />
                              <span className="font-medium">{stop.accommodationDetails.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-accent font-serif text-lg">
                                USD {stop.accommodationDetails.pricePerNight}
                              </span>
                              <Link href={`/senderosur/hospedajes/${stop.accommodationDetails.id}`}>
                                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                                  Ver
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline dot - hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full border-4 border-background ${
                        isFirst || isLast ? "bg-primary" : "bg-accent"
                      }`}
                    />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>

                {/* Mobile timeline dot */}
                <div className="absolute left-8 top-6 -translate-x-1/2 md:hidden">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-background ${
                      isFirst || isLast ? "bg-primary" : "bg-accent"
                    }`}
                  />
                </div>

                {/* Stop number */}
                <div
                  className={`absolute left-0 top-4 md:left-1/2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium ${
                    isLeft ? "md:-translate-x-[calc(100%+2rem)]" : "md:translate-x-8"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
