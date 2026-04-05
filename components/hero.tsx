"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, ArrowRight } from "lucide-react"
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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/galaxy-bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Animated Stars - Using deterministic positions to avoid hydration mismatch */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {STARS.map((star, i) => (
          <div
            key={i}
            className="star absolute w-1 h-1 bg-foreground/80 rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider animate-fade-in">
            {t("hero.greeting")}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground text-balance">
            Agustín Nistal
            <span className="block text-primary mt-2">Igarzabal</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-2">
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
            <Button
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/10"
              asChild
            >
              <a href="/cv-agustin-nistal.pdf" download>
                <Download className="mr-2 w-4 h-4" />
                {t("hero.download")}
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  )
}
