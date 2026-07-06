"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { LanguageProvider } from "@/lib/language-context"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience, EducationAndLanguages } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Footer } from "@/components/footer"
import { MatrixVortex } from "@/components/matrix-vortex"

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState(0)
  const cubeRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  // Storing target rotations for each section
  // Section index to 3D rotation mapping:
  // 0: Presentación (Hero) -> Front face -> rotX = 0, rotY = 0
  // 1: About + Contact -> Right face -> rotX = 0, rotY = -90
  // 2: Proyectos -> Back face -> rotX = 0, rotY = -180
  // 3: Experiencia -> Left face -> rotX = 0, rotY = -270 (or 90)
  // 4: Idiomas y educación -> Top face -> rotX = -90, rotY = 0
  // 5: Habilidades -> Bottom face -> rotX = 90, rotY = 0
  const rotations = [
    { x: 0, y: 0 },       // Section 0
    { x: 0, y: -90 },     // Section 1
    { x: 0, y: -180 },    // Section 2
    { x: 0, y: -270 },    // Section 3
    { x: -90, y: 0 },     // Section 4
    { x: 90, y: 0 },      // Section 5
  ]

  // Track mouse coordinates for subtle parallax tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 15 // max 15deg tilt
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -15 // max 15deg tilt
      updateCubeRotation()
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [activeSection])

  // Track viewport intersection to update activeSection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setActiveSection(index)
          }
        })
      },
      { threshold: 0.4 }
    )

    const elements = document.querySelectorAll(".scroll-section")
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Animate cube rotation when activeSection or mouse changes
  const updateCubeRotation = () => {
    if (!cubeRef.current) return
    const targetRot = rotations[activeSection]

    // Target rotation + interactive mouse tilt offset
    const targetX = targetRot.x + mouse.current.y
    const targetY = targetRot.y + mouse.current.x

    gsap.to(cubeRef.current, {
      rotateX: targetX,
      rotateY: targetY,
      duration: 1.0,
      ease: "power2.out",
      overwrite: "auto",
    })
  }

  // Update cube whenever activeSection changes
  useEffect(() => {
    updateCubeRotation()
  }, [activeSection])

  // Shared face class helper
  const faceBase = "absolute inset-0 backface-hidden rounded-2xl border border-primary/25 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,255,136,0.12)] flex flex-col transition-[opacity,transform] duration-500"

  return (
    <LanguageProvider>
      <div className="relative min-h-screen text-foreground overflow-hidden">
        {/* Deep-space starfield + subtle matrix rain */}
        <MatrixVortex />

        <Header />

        {/* 3D Viewport Wrapper for CSS 3D Cube */}
        <div
          className="fixed inset-0 w-full h-full flex items-center justify-center pointer-events-none z-30"
          style={{ perspective: "1600px" }}
        >
          {/* 3D Cube Container */}
          <div
            ref={cubeRef}
            className="w-[var(--cube-size)] h-[var(--cube-size)] preserve-3d relative"
            style={{ transform: "rotateX(0deg) rotateY(0deg)" }}
          >
            {/* ── Face 0: Hero / Presentación (Front +Z) ── */}
            <div
              className={`${faceBase} p-6 md:p-10 items-center justify-center ${
                activeSection === 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateY(0deg) translateZ(var(--cube-half-size))" }}
            >
              <Hero />
            </div>

            {/* ── Face 1: About me + Contact (Right +X) ── */}
            <div
              className={`${faceBase} p-5 md:p-8 ${
                activeSection === 1 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateY(90deg) translateZ(var(--cube-half-size))" }}
            >
              <div className="overflow-y-auto h-full face-scroll">
                <About />
              </div>
            </div>

            {/* ── Face 2: Proyectos (Back -Z) ── */}
            <div
              className={`${faceBase} p-4 md:p-5 ${
                activeSection === 2 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateY(180deg) translateZ(var(--cube-half-size))" }}
            >
              <Projects />
            </div>

            {/* ── Face 3: Experiencia (Left -X) ── */}
            <div
              className={`${faceBase} p-5 md:p-7 ${
                activeSection === 3 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateY(270deg) translateZ(var(--cube-half-size))" }}
            >
              <div className="overflow-y-auto h-full face-scroll">
                <Experience />
              </div>
            </div>

            {/* ── Face 4: Idiomas y Educación (Top +Y) ── */}
            <div
              className={`${faceBase} p-5 md:p-7 ${
                activeSection === 4 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateX(90deg) translateZ(var(--cube-half-size))" }}
            >
              <div className="overflow-y-auto h-full face-scroll">
                <EducationAndLanguages />
              </div>
            </div>

            {/* ── Face 5: Habilidades (Bottom -Y) ── */}
            <div
              className={`${faceBase} p-5 md:p-7 ${
                activeSection === 5 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-90"
              }`}
              style={{ transform: "rotateX(-90deg) translateZ(var(--cube-half-size))" }}
            >
              <div className="overflow-y-auto h-full face-scroll">
                <Skills />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Snapping Triggers — pointer-events-none so clicks reach cube faces */}
        <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth relative z-20 scrollbar-none">
          <div id="hero" data-index="0" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />
          <div id="about" data-index="1" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />
          <div id="projects" data-index="2" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />
          <div id="experience" data-index="3" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />
          <div id="education" data-index="4" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />
          <div id="skills" data-index="5" className="scroll-section h-screen w-full snap-start snap-always pointer-events-none" />

          {/* Footer */}
          <div className="w-full snap-start flex justify-center py-6 bg-black/60 border-t border-white/5 relative z-30">
            <Footer />
          </div>
        </main>
      </div>
    </LanguageProvider>
  )
}
