"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Languages } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ExperienceItem {
  id: string
  type: "work" | "education"
  titleEs: string
  titleEn: string
  organizationEs: string
  organizationEn: string
  period: string
  descriptionEs: string[]
  descriptionEn: string[]
  technologies?: string[]
}

const experienceData: ExperienceItem[] = [
  {
    id: "henry",
    type: "work",
    titleEs: "Full Stack Web Developer",
    titleEn: "Full Stack Web Developer",
    organizationEs: "Home Hero - Henry Bootcamp",
    organizationEn: "Home Hero - Henry Bootcamp",
    period: "Ago. 2025 - Sep. 2025",
    descriptionEs: [
      "Aplicación que conecta profesionales del hogar con clientes",
      "Creación del Mapa de Entidades",
      "Diseño de UI/UX y elección de colores, tipografías",
      "Creación de vistas: home, login, booking, search, Admin Profile",
      "Diseño Responsive y gestión de versiones con Vercel",
    ],
    descriptionEn: [
      "Application connecting home professionals with clients",
      "Entity Map creation",
      "UI/UX design and color, typography selection",
      "Views creation: home, login, booking, search, Admin Profile",
      "Responsive design and version management with Vercel",
    ],
    technologies: ["TypeScript", "Next.js", "React", "Tailwind", "Yup", "Formik", "Shadcn", "Axios"],
  },
  {
    id: "guadalajara",
    type: "work",
    titleEs: "Dueño / Gestor de Negocio",
    titleEn: "Owner / Business Manager",
    organizationEs: "Guadalajara Comida Mexicana",
    organizationEn: "Guadalajara Mexican Food",
    period: "Mar. 2011 - Jul. 2017",
    descriptionEs: [
      "Coordinación de operaciones diarias, planificación de turnos y gestión de inventario",
      "Atención directa a clientes y optimización de experiencia de compra",
      "Implementación de estrategias de marketing",
      "Supervisión del equipo de trabajo",
    ],
    descriptionEn: [
      "Daily operations coordination, shift planning and inventory management",
      "Direct customer service and shopping experience optimization",
      "Marketing strategies implementation",
      "Team supervision",
    ],
  },
  {
    id: "luccianos",
    type: "work",
    titleEs: "Atención al cliente / Gestión de inventario",
    titleEn: "Customer Service / Inventory Management",
    organizationEs: "Helados Luccianos",
    organizationEn: "Luccianos Ice Cream",
    period: "Sep. 2017",
    descriptionEs: [
      "Atención a clientes, gestión de pedidos",
      "Organización del local y apoyo en gestión de inventario",
    ],
    descriptionEn: [
      "Customer service, order management",
      "Store organization and inventory management support",
    ],
  },
  {
    id: "futbol",
    type: "work",
    titleEs: "Entrenador de Fútbol",
    titleEn: "Football Coach",
    organizationEs: "Defensores de Belgrano",
    organizationEn: "Defensores de Belgrano",
    period: "Mar. 2020 - Feb. 2024",
    descriptionEs: [
      "Director técnico de categorías Novena y Octava",
      "Representante del club en reuniones de la liga",
    ],
    descriptionEn: [
      "Head coach for U15 and U16 categories",
      "Club representative at league meetings",
    ],
  },
]

const educationData: ExperienceItem[] = [
  {
    id: "henry-edu",
    type: "education",
    titleEs: "Full Stack (Frontend)",
    titleEn: "Full Stack (Frontend)",
    organizationEs: "Soy Henry",
    organizationEn: "Soy Henry",
    period: "2025",
    descriptionEs: ["Bootcamp intensivo de desarrollo web Full Stack"],
    descriptionEn: ["Intensive Full Stack web development bootcamp"],
    technologies: ["JavaScript", "React", "Node.js", "SQL", "MongoDB"],
  },
  {
    id: "atfa",
    type: "education",
    titleEs: "Entrenador de Fútbol",
    titleEn: "Football Coach",
    organizationEs: "ATFA / AFA",
    organizationEn: "ATFA / AFA",
    period: "2017 - 2018",
    descriptionEs: ["Certificación oficial de entrenador de fútbol"],
    descriptionEn: ["Official football coach certification"],
  },
  {
    id: "foto",
    type: "education",
    titleEs: "Fotografía",
    titleEn: "Photography",
    organizationEs: "Escuela Raggio",
    organizationEn: "Raggio School",
    period: "2007",
    descriptionEs: ["Formación en fotografía profesional"],
    descriptionEn: ["Professional photography training"],
  },
]

const languages = [
  { nameEs: "Inglés Avanzado", nameEn: "Advanced English", levelEs: "Avanzado", levelEn: "Advanced" },
  { nameEs: "Español Nativo", nameEn: "Native Spanish", levelEs: "Nativo", levelEn: "Native" },
  { nameEs: "Portugués Básico", nameEn: "Basic Portuguese", levelEs: "Básico", levelEn: "Basic" },
]

function ExperienceCard({ item, index, language }: { item: ExperienceItem; index: number; language: "es" | "en" }) {
  const { ref, isVisible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 backdrop-blur-sm h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
              {item.type === "work" ? (
                <Briefcase className="w-5 h-5" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg font-title">
                {language === "es" ? item.titleEs : item.titleEn}
              </h3>
              <p className="text-primary font-medium">
                {language === "es" ? item.organizationEs : item.organizationEn}
              </p>
              <p className="text-muted-foreground text-sm mb-3">{item.period}</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                {(language === "es" ? item.descriptionEs : item.descriptionEn).map((desc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">▹</span>
                    {desc}
                  </li>
                ))}
              </ul>
              {item.technologies && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Experience() {
  const { t, language } = useLanguage()
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-card/30">
      <div className="container mx-auto px-4">
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? "visible" : ""}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground font-title">
            <span className="text-primary">{`// `}</span>
            {t("experience.title")}
          </h2>

          {/* Work Experience Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {experienceData.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} language={language} />
            ))}
          </div>

          {/* Education Section */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-12 text-foreground font-title">
            <span className="text-accent">{`// `}</span>
            {t("experience.education")}
          </h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {educationData.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} language={language} />
            ))}
          </div>

          {/* Languages Section */}
          <h3 className="text-2xl md:text-3xl font-bold text-center mt-20 mb-12 text-foreground font-title">
            <span className="text-primary">{`// `}</span>
            {t("languages.title")}
          </h3>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {languages.map((lang, i) => (
              <Card key={i} className="bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4 flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-foreground font-medium block">
                      {language === "es" ? lang.nameEs.split(" ")[0] : lang.nameEn.split(" ")[0]}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {language === "es" ? lang.levelEs : lang.levelEn}
                    </span>
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
