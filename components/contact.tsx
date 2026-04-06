"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Contact() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()


  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "agustin.nistal@hotmail.com",
      href: "mailto:agustin.nistal@hotmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+54 911 5497 9285",
      href: "tel:+5491154979285",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Isidro, Buenos Aires, Argentina",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/AgustinNistal",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/agustin-nistal-fullstack/",
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground font-title">
            <span className="text-primary">{`// `}</span>
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg">
            {t("contact.subtitle")}
          </p>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 space-y-6">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-foreground hover:text-primary transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-card/50 border-border backdrop-blur-sm h-full flex flex-col justify-center">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-foreground font-semibold mb-6 font-title text-xl text-center">Social</h3>
                  <div className="flex gap-6 justify-center">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon
                      return (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
                        >
                          <Icon className="w-8 h-8" />
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
