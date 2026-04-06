"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { MapPin, Github, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function About() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`animate-on-scroll ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground font-title">
            <span className="text-primary">{`// `}</span>
            {t("about.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl" />
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/50 glow-primary">
                  <Image
                    src="https://ik.imagekit.io/ankxi835d/professional%20LinkedI.png?updatedAt=1775352234567"
                    alt="Agustín Nistal"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-6">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t("about.description")}
              </p>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{t("about.location")}</span>
              </div>

              {/* Contact Links */}
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:border-primary hover:text-primary"
                  asChild
                >
                  <a href="mailto:agustin.nistal@hotmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:border-primary hover:text-primary"
                  asChild
                >
                  <a href="tel:+5491154979285">
                    <Phone className="w-4 h-4 mr-2" />
                    +54 911 5497 9285
                  </a>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/AgustinNistal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/agustin-nistal-fullstack/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
