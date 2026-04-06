"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/senderosur/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Clock, Plane } from "lucide-react"
import { routes } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"

const routeImages: Record<string, string> = {
  "costera-atlantica": "https://ik.imagekit.io/ankxi835d/rutasimg/ballena-paisaje-hotel-peninsula-valdes-puerto-madryn-chubut-argentina.jpeg?updatedAt=1763067101439",
  "andina-norte": "https://ik.imagekit.io/ankxi835d/rutasimg/cerroSieteColores.jpg?updatedAt=1763065075237",
  litoral: "https://ik.imagekit.io/ankxi835d/rutasimg/esterosibera.jpg?updatedAt=1763093784020",
  patagonica: "https://ik.imagekit.io/ankxi835d/rutasimg/glaciares.jpg?updatedAt=1763065075199",
  vinedos: "https://ik.imagekit.io/ankxi835d/rutasimg/vacaciones-invierno-que-hacer-mendoza-vinedos-y-montana.webp?updatedAt=1763067641238",
}

export function RoutesCarousel() {
  const { translateRoute } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const translatedRoutes = routes.map(translateRoute)

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, translatedRoutes.length - 1))
    setActiveIndex(newIndex)

    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / translatedRoutes.length
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">Nuestras Rutas</h2>
            <p className="text-muted-foreground">5 experiencias únicas para descubrir Argentina</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === routes.length - 1}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {translatedRoutes.map((route, index) => (
            <div key={route.id} className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] snap-start">
              <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[480px]">
                <div className="absolute inset-0">
                  <Image
                    src={routeImages[route.slug] || "/placeholder.svg?height=600&width=400"}
                    alt={route.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Plane className="h-4 w-4" />
                      <span className="text-sm font-medium">Aeropuerto disponible</span>
                    </div>

                    <h3 className="font-serif text-2xl text-background">{route.name}</h3>

                    <p className="text-background/80 text-sm line-clamp-2">{route.description}</p>

                    <div className="flex flex-wrap gap-4 text-background/70 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{route.stops.length} destinos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{route.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-background/60 text-sm">Pack desde</span>
                        <p className="text-accent font-serif text-2xl">USD {route.packPrice}</p>
                      </div>
                      <Link href={`/senderosur/rutas/${route.slug}`}>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Explorar</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {translatedRoutes.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
