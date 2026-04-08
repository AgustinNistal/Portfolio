"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/senderosur/ui/button"
import { MapPin, Star, Users, Wifi, Car, Coffee, Waves, Mountain, Telescope, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { BookingModal } from "@/components/senderosur/accommodations/booking-modal"
import { ReviewsSection } from "@/components/senderosur/accommodations/reviews-section"
import type { Accommodation, City } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/senderosur/ui/carousel"

interface AccommodationDetailProps {
  accommodation: Accommodation
  city?: City
}

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Estacionamiento: Car,
  Desayuno: Coffee,
  "Vista al mar": Waves,
  "Vista a montañas": Mountain,
  "Vista al cerro": Mountain,
  "Vista al lago": Waves,
  Telescopio: Telescope,
}

export function AccommodationDetail({ accommodation, city }: AccommodationDetailProps) {
  const { t, translateAccommodation, translateCity } = useLanguage()
  const translatedAccommodation = translateAccommodation(accommodation)
  const translatedCity = city ? translateCity(city) : undefined

  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setSelectedImage(api.selectedScrollSnap())
    })
  }, [api])

  const images = [
    accommodation.images[0] || "/placeholder.svg?height=600&width=800",
    "https://ik.imagekit.io/ankxi835d/rutasimg/domo-interior-cozy-bedroom.jpg?updatedAt=1775442901211",
    "https://ik.imagekit.io/ankxi835d/rutasimg/domo-bathroom-modern.jpg?updatedAt=1775442901111",
    "https://ik.imagekit.io/ankxi835d/rutasimg/tipos-de-desayuno-en-hotel.jpg?updatedAt=1775442901099",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Image Gallery */}
      <section className="relative">
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative h-[50vh]">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${accommodation.name} - ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 z-10">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === selectedImage ? "bg-background" : "bg-background/50"
                    }`}
                />
              ))}
            </div>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-2 max-h-[70vh]">
          <div className="relative h-[70vh]">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={accommodation.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {images.slice(1, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx + 1)}
                className={`relative h-[calc(35vh-0.25rem)] overflow-hidden ${selectedImage === idx + 1 ? "ring-2 ring-primary" : ""
                  }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${accommodation.name} - ${idx + 2}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin className="h-4 w-4" />
                <span>{translatedAccommodation.city}</span>
                <span className="text-border">•</span>
                <span className="capitalize">{t(`accommodation.type.${translatedAccommodation.type}`) || translatedAccommodation.type}</span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{translatedAccommodation.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-medium text-lg">{translatedAccommodation.rating}</span>
                  <span className="text-muted-foreground">({translatedAccommodation.reviewCount} {t("accommodations.reviews") || "reseñas"})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{t("accommodations.up_to") || "Hasta"} {translatedAccommodation.maxGuests} {t("accommodations.guests") || "huéspedes"}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">{t("accommodations.about") || "Sobre este domo"}</h2>
              <p className="text-muted-foreground leading-relaxed">{translatedAccommodation.description}</p>
              {translatedCity && (
                <p className="text-muted-foreground leading-relaxed mt-4">
                  {t("accommodations.located_in") || "Ubicado en"} {translatedCity.name}, {translatedCity.province}. {translatedCity.description}
                </p>
              )}
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="font-serif text-2xl text-foreground mb-6">{t("accommodations.amenities") || "Amenidades"}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {translatedAccommodation.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Check
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {translatedCity && (
              <div className="border-t border-border pt-8">
                <h2 className="font-serif text-2xl text-foreground mb-6">{t("accommodations.todo") || "Qué hacer en"} {translatedCity.name}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {translatedCity.activities.map((activity) => (
                    <div key={activity} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="h-4 w-4 text-accent" />
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ReviewsSection accommodation={accommodation} />
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card rounded-xl shadow-lg border border-border p-6">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="font-serif text-3xl text-accent">USD {translatedAccommodation.pricePerNight}</span>
                <span className="text-muted-foreground">/ {t("accommodations.night") || "noche"}</span>
              </div>

              <Button
                size="lg"
                onClick={() => setBookingOpen(true)}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-4"
              >
                {t("accommodations.book_now") || "Reservar ahora"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">{t("accommodations.free_cancellation") || "Cancelación gratuita hasta 48hs antes"}</p>

              <div className="border-t border-border mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="text-foreground">15:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="text-foreground">11:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("accommodations.max_capacity") || "Capacidad máxima"}</span>
                  <span className="text-foreground">{translatedAccommodation.maxGuests} {t("accommodations.people") || "personas"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} accommodation={translatedAccommodation} />
    </div>
  )
}
