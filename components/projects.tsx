"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink, Github, ZoomIn, X } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
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
    images: ["/images/projects/meditrack-1.jpg", "/images/projects/meditrack-2.jpg"],
  },
]

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative group">
      <Dialog>
        <DialogTrigger asChild>
          <div className="aspect-video relative overflow-hidden rounded-lg cursor-zoom-in">
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
                <ZoomIn className="w-6 h-6 text-primary" />
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
              <CarouselPrevious className="left-4 size-10 bg-background/20 hover:bg-background/40 border-none text-white" />
              <CarouselNext className="right-4 size-10 bg-background/20 hover:bg-background/40 border-none text-white" />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-16 h-10 rounded overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-4" : "bg-foreground/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Projects() {
  const { t, language } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground font-title">
            <span className="text-primary">{`// `}</span>
            {t("projects.title")}
          </h2>

          <div className="space-y-16 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="bg-card/50 border-border backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                    {/* Image Carousel */}
                    <div className={`p-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                      <ImageCarousel images={project.images} title={language === "es" ? project.titleEs : project.titleEn} />
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="border-primary text-primary">
                          {language === "es" ? project.roleEs : project.roleEn}
                        </Badge>
                        <span className="text-muted-foreground text-sm">{project.period}</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-title">
                        {language === "es" ? project.titleEs : project.titleEn}
                      </h3>

                      <p className="text-muted-foreground mb-6">
                        {language === "es" ? project.descriptionEs : project.descriptionEn}
                      </p>

                      <ul className="text-muted-foreground text-sm space-y-2 mb-6">
                        {(language === "es" ? project.detailsEs : project.detailsEn).map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">▹</span>
                            {detail}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-secondary/50">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        {project.liveUrl && (
                          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              {t("projects.viewProject")}
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" className="border-border hover:border-primary" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              {t("projects.viewCode")}
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
