"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Github, ZoomIn } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Project {
  id: string
  titleEs: string
  titleEn: string
  roleEs: string
  roleEn: string
  period: string
  descriptionEs: string
  descriptionEn: string
  detailsEs: string[]
  detailsEn: string[]
  technologies: string[]
  images: string[]
  liveUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: "home-hero",
    titleEs: "Home Hero",
    titleEn: "Home Hero",
    roleEs: "Full Stack Web Developer",
    roleEn: "Full Stack Web Developer",
    period: "Ago. 2025 - Sep. 2025",
    descriptionEs:
      "Aplicación Full Stack que conecta profesionales del hogar con sus clientes. La plataforma se basa en un sistema transparente de calificaciones y comentarios, permitiendo a los usuarios elegir con confianza a la hora de solicitar su turno.",
    descriptionEn:
      "Full Stack application that connects home professionals with their clients. The platform is based on a transparent rating and review system, allowing users to choose with confidence when requesting their appointment.",
    detailsEs: [
      "Creación del Mapa de Entidades",
      "Elección de diseño, colores, tipografías, imágenes, botones y componentes",
      "Creación de las vistas: home, login, booking schedule, search, Admin Profile, membership sale",
      "Diseño Responsive",
      "Gestión de versiones con Vercel",
    ],
    detailsEn: [
      "Entity Map Creation",
      "Design, colors, typography, images, buttons and components selection",
      "Views creation: home, login, booking schedule, search, Admin Profile, membership sale",
      "Responsive Design",
      "Version management with Vercel",
    ],
    technologies: ["TypeScript", "Next.js", "React", "Tailwind", "Vercel", "Yup", "Formik", "Shadcn", "Axios"],
    images: ["https://ik.imagekit.io/ankxi835d/cv/homehero1.png?updatedAt=1775353281506", "https://ik.imagekit.io/ankxi835d/cv/homehero2.png?updatedAt=1775353281494", "https://ik.imagekit.io/ankxi835d/cv/homehero3.png?updatedAt=1775353281684"],
    liveUrl: "https://home-hero-front2-beta.vercel.app/",
  },
  {
    id: "sendero-sur",
    titleEs: "Sendero Sur",
    titleEn: "Sendero Sur",
    roleEs: "Founder & Frontend Developer",
    roleEn: "Founder & Frontend Developer",
    period: "En desarrollo",
    descriptionEs:
      "Plataforma digital que ofrece rutas pre-armadas para descubrir Argentina, integrando puntos de partida y llegada en aeropuertos con la posibilidad de alquilar un vehículo y recorrer cada tramo con libertad.",
    descriptionEn:
      "Digital platform offering pre-built routes to discover Argentina, integrating departure and arrival points at airports with the option to rent a vehicle and travel each segment freely.",
    detailsEs: [
      "Responsabilidad completa del proyecto: desde la conceptualización hasta la implementación técnica",
      "Diseño de experiencia de usuario con enfoque mobile-first",
      "Construcción del sistema con vistas modernas y accesibles",
      "Proyecto personal para mantenerme activo mientras busco nuevas oportunidades laborales",
      "Interfaces robustas y escalables con validación de formularios",
    ],
    detailsEn: [
      "Complete project responsibility: from conceptualization to technical implementation",
      "User experience design with mobile-first approach",
      "System construction with modern and accessible views",
      "Personal project to stay active while looking for new job opportunities",
      "Robust and scalable interfaces with form validation",
    ],
    technologies: ["Next.js", "React", "TailwindCSS", "Yup", "TypeScript"],
    images: ["https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-04-04%20223735.png?updatedAt=1775353282032", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-04-04%20223900.png?updatedAt=1775353281935", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-04-04%20223828.png?updatedAt=1775353281560"],
    liveUrl: "/senderosur"
  },
  {
    id: "meditrack",
    titleEs: "MediTrack",
    titleEn: "MediTrack",
    roleEs: "Mobile Developer",
    roleEn: "Mobile Developer",
    period: "En desarrollo",
    descriptionEs:
      "Aplicación móvil de pastillero inteligente para administrar medicamentos de uso prolongado. Diseñada para personas mayores o con tratamientos crónicos, recordándoles con notificaciones personalizadas la hora exacta de cada toma.",
    descriptionEn:
      "Smart pill organizer mobile app for managing long-term medications. Designed for elderly people or those with chronic treatments, reminding them with personalized notifications at the exact time of each dose.",
    detailsEs: [
      "Notificaciones personalizadas con horarios exactos y advertencias especiales",
      "Sistema de stock y alertas de reposición cuando el medicamento está por agotarse",
      "Seguridad para evitar confusiones con nombres similares",
      "Muestra claramente dosis y forma de administración",
      "Conexión con backend en Nest.js y base de datos PostgreSQL",
    ],
    detailsEn: [
      "Personalized notifications with exact times and special warnings",
      "Stock system and refill alerts when medication is running low",
      "Security to avoid confusion with similar names",
      "Clearly shows dosage and administration method",
      "Connection with Nest.js backend and PostgreSQL database",
    ],
    technologies: ["React Native", "Nest.js", "PostgreSQL", "TypeScript"],
    images: ["https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20121424.png", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20121550.png", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20121624.png", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20121903.png", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20122033.png", "https://ik.imagekit.io/ankxi835d/cv/Screenshot%202026-05-27%20122053.png"],
  },
]

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group">
      <Dialog>
        <DialogTrigger asChild>
          <div className="h-20 md:aspect-video md:h-auto relative overflow-hidden rounded-lg cursor-zoom-in">
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="bg-black/60 backdrop-blur-sm p-2 rounded-full shadow-lg border border-primary/30">
                <ZoomIn className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] border-none bg-black/90 p-0 shadow-none sm:rounded-none h-[95vh]">
          <DialogTitle className="sr-only">Project Images - {title}</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            <Carousel className="w-full h-full" opts={{ startIndex: currentIndex }}>
              <CarouselContent className="h-full items-center">
                {images.map((img, index) => (
                  <CarouselItem key={index} className="h-full flex items-center justify-center p-0">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={img}
                        alt={`${title} - Full Image ${index + 1}`}
                        fill
                        className="object-contain p-2"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 size-10 bg-black/40 hover:bg-black/60 border-primary/30 text-white" />
              <CarouselNext className="right-4 size-10 bg-black/40 hover:bg-black/60 border-primary/30 text-white" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 z-10"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-200 border border-white/20 z-10"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-primary w-4" : "bg-white/40 w-1.5 hover:bg-white/70"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Projects() {
  const { t, language } = useLanguage()
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left")
  const [visible, setVisible] = useState(true)

  const changeProject = (newIndex: number, direction: "left" | "right") => {
    if (isAnimating) return
    setIsAnimating(true)
    setSlideDirection(direction)
    setVisible(false)

    setTimeout(() => {
      setActiveProjectIndex(newIndex)
      setVisible(true)
      setTimeout(() => setIsAnimating(false), 350)
    }, 280)
  }

  const handlePrev = () => {
    const newIndex = activeProjectIndex === 0 ? projects.length - 1 : activeProjectIndex - 1
    changeProject(newIndex, "right")
  }

  const handleNext = () => {
    const newIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1
    changeProject(newIndex, "left")
  }

  const handleDot = (i: number) => {
    if (i === activeProjectIndex) return
    changeProject(i, i > activeProjectIndex ? "left" : "right")
  }

  const project = projects[activeProjectIndex]

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-foreground font-title shrink-0">
        <span className="text-primary">{`// `}</span>
        {t("projects.title")}
      </h2>

      {/* Counter */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeProjectIndex ? "bg-primary w-5" : "bg-white/25 w-1.5 hover:bg-white/50"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {String(activeProjectIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slide area */}
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {/* Prev / Next arrows */}
        <button
          className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary/80 border border-primary/30 hover:border-primary text-white rounded-full w-9 h-9 md:w-7 md:h-7 flex items-center justify-center transition-all duration-200 disabled:opacity-40 md:-translate-x-2"
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-primary/80 border border-primary/30 hover:border-primary text-white rounded-full w-9 h-9 md:w-7 md:h-7 flex items-center justify-center transition-all duration-200 disabled:opacity-40 md:translate-x-2"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Project card with slide animation */}
        <div
          className="h-full transition-all duration-280 ease-in-out px-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : slideDirection === "left"
              ? "translateX(-30px)"
              : "translateX(30px)",
          }}
        >
          <Card className="bg-card/40 border-primary/20 backdrop-blur-sm h-full overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Image section */}
                <div className="p-3 flex flex-col justify-center shrink-0">
                  <ImageCarousel
                    images={project.images}
                    title={language === "es" ? project.titleEs : project.titleEn}
                  />
                </div>

                {/* Content section */}
                <div className="p-3 flex flex-col justify-start gap-2 overflow-y-auto face-scroll">
                  {/* Role & period */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-primary/60 text-primary text-[10px] px-2 py-0.5">
                      {language === "es" ? project.roleEs : project.roleEn}
                    </Badge>
                    <span className="text-muted-foreground text-[10px]">{project.period}</span>
                  </div>

                  {/* Title + Actions (mobile inline) */}
                  <div className="flex items-center justify-between gap-2 md:block">
                    <h3 className="text-base md:text-lg font-bold text-foreground font-title leading-tight">
                      {language === "es" ? project.titleEs : project.titleEn}
                    </h3>
                    <div className="flex gap-1.5 shrink-0 md:hidden">
                      {project.liveUrl && (
                        <Button
                          className="bg-primary text-primary-foreground hover:bg-primary/80 text-[10px] h-7 px-2.5"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {t("projects.viewProject")}
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          className="border-primary/40 hover:border-primary text-[10px] h-7 px-2.5"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3 h-3 mr-1" />
                            {t("projects.viewCode")}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-[11px] leading-relaxed line-clamp-3">
                    {language === "es" ? project.descriptionEs : project.descriptionEn}
                  </p>

                  {/* Details - hidden on small mobile to save space */}
                  <ul className="space-y-0.5 hidden sm:block">
                    {(language === "es" ? project.detailsEs : project.detailsEn).slice(0, 4).map((detail, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                        <span className="text-primary shrink-0 mt-0.5">▹</span>
                        <span className="leading-tight">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions - only on desktop */}
                  <div className="hidden md:flex gap-2 pt-1">
                    {project.liveUrl && (
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/80 text-[10px] h-7 px-3"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {t("projects.viewProject")}
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        className="border-primary/40 hover:border-primary text-[10px] h-7 px-3"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-3 h-3 mr-1" />
                          {t("projects.viewCode")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
