"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/senderosur/ui/button"
import { Input } from "@/components/senderosur/ui/input"
import { MapPin, Star, Users, Search } from "lucide-react"
import type { Accommodation } from "@/lib/senderosur/data"
import { useLanguage } from "@/contexts/senderosur/language-context"

interface AccommodationsGridProps {
  accommodations: Accommodation[]
}

export function AccommodationsGrid({ accommodations }: AccommodationsGridProps) {
  const { t, translateAccommodation, translateCity } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const types = [...new Set(accommodations.map((a) => a.type))]

  const filtered = accommodations
    .filter((acc) => {
      const matchesSearch =
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.city.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = !selectedType || acc.type === selectedType
      return matchesSearch && matchesType
    })
    .map(translateAccommodation)

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("accommodations.search") || "Buscar por nombre o ciudad..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              {t("accommodations.all") || "Todos"}
            </Button>
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((accommodation) => (
            <Link key={accommodation.id} href={`/senderosur/hospedajes/${accommodation.id}`} className="group">
              <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={accommodation.images[0] || "/placeholder.svg?height=300&width=400"}
                    alt={accommodation.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium capitalize">
                    {accommodation.type}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{accommodation.city}</span>
                  </div>

                  <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {accommodation.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{accommodation.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{accommodation.rating}</span>
                        <span className="text-muted-foreground">({accommodation.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{accommodation.maxGuests}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-accent font-serif text-lg">USD {accommodation.pricePerNight}</p>
                      <p className="text-muted-foreground text-xs">{t("accommodations.per_night") || "por noche"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("accommodations.not_found") || "No se encontraron hospedajes con esos criterios."}</p>
          </div>
        )}
      </div>
    </section>
  )
}
