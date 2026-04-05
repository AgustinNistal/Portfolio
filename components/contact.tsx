"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail, Phone, Download, Send, MapPin } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Contact() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after showing success
    setTimeout(() => setIsSubmitted(false), 3000)
  }

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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            <span className="text-primary">{`// `}</span>
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground text-center mb-16 text-lg">
            {t("contact.subtitle")}
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-card/50 border-border backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      {t("contact.name")}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="bg-input border-border focus:border-primary"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      {t("contact.email")}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-input border-border focus:border-primary"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="bg-input border-border focus:border-primary resize-none"
                      placeholder="Tu mensaje..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                    disabled={isSubmitting || isSubmitted}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t("contact.sending")}
                      </>
                    ) : isSubmitted ? (
                      <>
                        <span className="mr-2">✓</span>
                        {t("contact.success")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t("contact.send")}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
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
              <Card className="bg-card/50 border-border backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-foreground font-semibold mb-4">Social</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link, index) => {
                      const Icon = link.icon
                      return (
                        <a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary hover:text-primary transition-all hover:scale-110"
                        >
                          <Icon className="w-6 h-6" />
                        </a>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Download CV */}
              <Button
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-accent"
                size="lg"
                asChild
              >
                <a href="/cv-agustin-nistal.pdf" download>
                  <Download className="w-5 h-5 mr-2" />
                  {t("hero.download")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
