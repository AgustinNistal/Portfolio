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
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0">
              {item.type === "work" ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <GraduationCap className="w-4 h-4" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm font-title leading-tight">
                {language === "es" ? item.titleEs : item.titleEn}
              </h3>
              <p className="text-primary font-medium text-xs mt-0.5">
                {language === "es" ? item.organizationEs : item.organizationEn}
              </p>
              <p className="text-muted-foreground text-[10px] mb-2">{item.period}</p>
              <ul className="text-muted-foreground text-[10px] space-y-0.5">
                {(language === "es" ? item.descriptionEs : item.descriptionEn).map((desc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-primary shrink-0">▹</span>
                    <span className="leading-snug">{desc}</span>
                  </li>
                ))}
              </ul>
              {item.technologies && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-none text-[9px] px-1.5 py-0">
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

  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-bold text-center mb-3 text-foreground font-title">
        <span className="text-primary">{`// `}</span>
        {t("experience.title")}
      </h2>

      {/* Work Experience Cards */}
      <div className="grid md:grid-cols-2 gap-2">
        {experienceData.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} language={language} />
        ))}
      </div>
    </div>
  )
}

export function EducationAndLanguages() {
  const { t, language } = useLanguage()

  return (
    <div className="w-full space-y-3">
      {/* Languages Section */}
      <div>
        <h3 className="text-base md:text-lg font-bold text-center mb-2 text-foreground font-title">
          <span className="text-primary">{`// `}</span>
          {t("languages.title")}
        </h3>

        <div className="flex flex-wrap justify-center gap-1.5">
          {languages.map((lang, i) => (
            <Card key={i} className="bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 min-w-[120px]">
              <CardContent className="p-2 flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="text-foreground font-medium block text-xs">
                    {language === "es" ? lang.nameEs.split(" ")[0] : lang.nameEn.split(" ")[0]}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {language === "es" ? lang.levelEs : lang.levelEn}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-base md:text-lg font-bold text-center mb-2 text-foreground font-title">
          <span className="text-accent">{`// `}</span>
          {t("experience.education")}
        </h3>

        <div className="grid md:grid-cols-3 gap-2">
          {educationData.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} language={language} />
          ))}
        </div>
      </div>
    </div>
  )
}

