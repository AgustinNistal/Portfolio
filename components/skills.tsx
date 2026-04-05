"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Wrench, Users } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const skillCategories = [
  {
    id: "tech",
    titleKeyEs: "Tecnologías y Lenguajes de Programación",
    titleKeyEn: "Technologies & Programming Languages",
    icon: Code,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React.js",
      "React Native",
      "Next.js",
      "SQL",
      "MongoDB",
      "Nest.js",
      "PostgreSQL",
      "PgAdmin",
      "Insomnia",
    ],
  },
  {
    id: "design",
    titleKeyEs: "Diseño y Edición",
    titleKeyEn: "Design & Editing",
    icon: Palette,
    skills: ["Adobe Photoshop", "Adobe Illustrator", "CapCut Pro", "Fotografía"],
  },
  {
    id: "tools",
    titleKeyEs: "Herramientas y Oficina",
    titleKeyEn: "Tools & Office",
    icon: Wrench,
    skills: ["Microsoft Word", "Excel", "Outlook", "Instagram", "Facebook"],
  },
  {
    id: "soft",
    titleKeyEs: "Habilidades Blandas",
    titleKeyEn: "Soft Skills",
    icon: Users,
    skills: [
      "Trabajo en equipo",
      "Manejo de grupos",
      "Aprendizaje rápido",
      "Atención al detalle",
      "Resolución de problemas",
    ],
    skillsEn: [
      "Teamwork",
      "Group management",
      "Quick learner",
      "Attention to detail",
      "Problem solving",
    ],
  },
]

export function Skills() {
  const { t, language } = useLanguage()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-20 md:py-32 relative bg-card/30">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            <span className="text-primary">{`// `}</span>
            {t("skills.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className="bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-foreground">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-lg">
                        {language === "es" ? category.titleKeyEs : category.titleKeyEn}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {(category.skillsEn && language === "en"
                        ? category.skillsEn
                        : category.skills
                      ).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-border hover:border-primary hover:text-primary transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
