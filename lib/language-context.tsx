"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    
    // Hero
    "hero.greeting": "Hola, soy",
    "hero.role": "Full Stack Developer",
    "hero.subtitle": "Experiencia en Next.js, React, Nest.js y PostgreSQL",
    "hero.cta": "Ver Proyectos",
    "hero.download": "Descargar CV",
    
    // About
    "about.title": "Sobre Mí",
    "about.description": "Full Stack Developer con enfoque en diseño responsive y experiencia mobile first. Apasionado por crear interfaces limpias, funcionales y visualmente atractivas usando React, Next.js y Tailwind CSS. Integro validaciones con Formik, Yup y TypeScript para asegurar un código robusto, legible y con control de errores. Cuento con habilidades sociales sólidas, adquiridas en entornos de atención al cliente y liderazgo de grupos, lo que facilita la colaboración y la comunicación efectiva en equipos de desarrollo.",
    "about.location": "San Isidro, Buenos Aires, Argentina",
    
    // Experience
    "experience.title": "Experiencia",
    "experience.education": "Educación",
    
    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.viewProject": "Ver Proyecto",
    "projects.viewCode": "Ver Código",
    "projects.homeHero.title": "Home Hero",
    "projects.homeHero.description": "Aplicación Full Stack que conecta profesionales del hogar con sus clientes. Sistema transparente de calificaciones y comentarios para elegir con confianza.",
    "projects.homeHero.role": "Full Stack Web Developer",
    "projects.homeHero.period": "Ago. 2025 - Sep. 2025",
    "projects.homeHero.details": "Creación del Mapa de Entidades, diseño de UI/UX, vistas de home, login, booking, search, Admin Profile y membership. Diseño responsive y gestión de versiones con Vercel.",
    
    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.technologies": "Tecnologías y Lenguajes",
    "skills.design": "Diseño y Edición",
    "skills.tools": "Herramientas",
    "skills.soft": "Habilidades Blandas",
    
    // Contact
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente? ¡Hablemos!",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado!",
    
    // Languages
    "languages.title": "Idiomas",
    "languages.english": "Inglés Avanzado",
    "languages.spanish": "Español Nativo",
    "languages.portuguese": "Portugués Básico",
    
    // Footer
    "footer.rights": "Todos los derechos reservados",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.role": "Full Stack Developer",
    "hero.subtitle": "Experience in Next.js, React, Nest.js and PostgreSQL",
    "hero.cta": "View Projects",
    "hero.download": "Download CV",
    
    // About
    "about.title": "About Me",
    "about.description": "Full Stack Developer focused on responsive design and mobile-first experience. Passionate about creating clean, functional, and visually attractive interfaces using React, Next.js, and Tailwind CSS. I integrate validations with Formik, Yup, and TypeScript to ensure robust, readable code with error control. I have solid social skills acquired in customer service environments and group leadership, which facilitates collaboration and effective communication in development teams.",
    "about.location": "San Isidro, Buenos Aires, Argentina",
    
    // Experience
    "experience.title": "Experience",
    "experience.education": "Education",
    
    // Projects
    "projects.title": "Featured Projects",
    "projects.viewProject": "View Project",
    "projects.viewCode": "View Code",
    "projects.homeHero.title": "Home Hero",
    "projects.homeHero.description": "Full Stack application that connects home professionals with their clients. Transparent rating and review system to choose with confidence.",
    "projects.homeHero.role": "Full Stack Web Developer",
    "projects.homeHero.period": "Aug. 2025 - Sep. 2025",
    "projects.homeHero.details": "Entity Map creation, UI/UX design, home, login, booking, search, Admin Profile and membership views. Responsive design and version management with Vercel.",
    
    // Skills
    "skills.title": "Technical Skills",
    "skills.technologies": "Technologies & Languages",
    "skills.design": "Design & Editing",
    "skills.tools": "Tools",
    "skills.soft": "Soft Skills",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Have a project in mind? Let's talk!",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent!",
    
    // Languages
    "languages.title": "Languages",
    "languages.english": "Advanced English",
    "languages.spanish": "Native Spanish",
    "languages.portuguese": "Basic Portuguese",
    
    // Footer
    "footer.rights": "All rights reserved",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
