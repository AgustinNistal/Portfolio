"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { MapPin, Github, Linkedin, Mail, Phone } from "lucide-react"
import Image from "next/image"
export function About() {
  const { t } = useLanguage()

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground font-title">
        <span className="text-primary">{`// `}</span>
        {t("about.title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full blur-xl" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 glow-primary">
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
        <div className="space-y-3">
          <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
            {t("about.description")}
          </p>

          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t("about.location")}</span>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-primary hover:text-primary text-xs"
              asChild
            >
              <a href="mailto:agustin.nistal@hotmail.com">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                Email
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-border hover:border-primary hover:text-primary text-xs"
              asChild
            >
              <a href="tel:+5491154979285">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                +54 911 5497 9285
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/AgustinNistal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
            >
              <Github className="w-4.5 h-4.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/agustin-nistal-fullstack/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
