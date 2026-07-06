"use client"

import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Wrench, Users } from "lucide-react"

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

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground font-title">
        <span className="text-primary">{`// `}</span>
        {t("skills.title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-3">
        {skillCategories.map((category, index) => {
          const Icon = category.icon
          return (
            <Card
              key={category.id}
              className="bg-card/50 border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-4 pb-2">
                <CardTitle className="flex items-center gap-2 text-foreground text-sm">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-title">
                    {language === "es" ? category.titleKeyEs : category.titleKeyEn}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                  {(category.skillsEn && language === "en"
                    ? category.skillsEn
                    : category.skills
                  ).map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-border hover:border-primary hover:text-primary transition-colors text-xs px-2 py-0.5"
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
  )
}
