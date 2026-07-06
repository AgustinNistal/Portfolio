"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ChevronDown, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

// Pre-computed star positions to avoid hydration mismatch
const STARS = Array.from({ length: 50 }, (_, i) => ({
  left: ((i * 17 + 23) % 97) + (i % 3),
  top: ((i * 31 + 11) % 93) + (i % 7),
  delay: (i * 0.06) % 3,
  opacity: 0.3 + ((i * 13) % 50) / 100,
}))

export function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative z-20 text-center py-2">
      <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider animate-fade-in">
        {t("hero.greeting")}
      </p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground text-balance font-title">
        Agustín Nistal
        <span className="block text-primary mt-2">Igarzabal</span>
      </h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-2 font-title">
        {t("hero.role")}
      </h2>
      <p className="text-sm md:text-base text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
        {t("hero.subtitle")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary group"
          asChild
        >
          <a href="#projects">
            {t("hero.cta")}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  )
}

