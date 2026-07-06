"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

interface SpaceCubeProps {
  activeSection: number
}

export function SpaceCube({ activeSection }: SpaceCubeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<THREE.Mesh | null>(null)
  const targetRotation = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })

  // Function to dynamically generate a cosmic face texture
  const createCosmicTexture = (label: string, number: string) => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")
    if (!ctx) return new THREE.Texture()

    // 1. Dark cosmic space gradient
    const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 360)
    grad.addColorStop(0, "#08101a")
    grad.addColorStop(0.5, "#040810")
    grad.addColorStop(1, "#010205")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    // 2. Stars
    ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const size = Math.random() * 2
      ctx.globalAlpha = 0.2 + Math.random() * 0.8
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }

    // 3. Nebula glowing dust
    ctx.globalAlpha = 0.15
    ctx.globalCompositeOperation = "screen"
    const nebulas = [
      { x: 180, y: 200, r: 160, color: "#00ffcc" },
      { x: 340, y: 300, r: 180, color: "#00ff66" },
      { x: 256, y: 256, r: 120, color: "#0099ff" },
    ]
    nebulas.forEach((n) => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
      g.addColorStop(0, n.color)
      g.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx.fill()
    }
    )
    ctx.globalCompositeOperation = "source-over"
    ctx.globalAlpha = 1.0

    // 4. Futuristic HUD Panel Overlay
    ctx.strokeStyle = "rgba(0, 255, 102, 0.4)"
    ctx.lineWidth = 4
    ctx.strokeRect(20, 20, 472, 472)

    // Inner corner accents
    ctx.strokeStyle = "#00ff66"
    ctx.lineWidth = 6
    const len = 40
    // Top-Left
    ctx.beginPath()
    ctx.moveTo(20, 20 + len)
    ctx.lineTo(20, 20)
    ctx.lineTo(20 + len, 20)
    ctx.stroke()
    // Top-Right
    ctx.beginPath()
    ctx.moveTo(492, 20 + len)
    ctx.lineTo(492, 20)
    ctx.lineTo(492 - len, 20)
    ctx.stroke()
    // Bottom-Left
    ctx.beginPath()
    ctx.moveTo(20, 492 - len)
    ctx.lineTo(20, 492)
    ctx.lineTo(20 + len, 492)
    ctx.stroke()
    // Bottom-Right
    ctx.beginPath()
    ctx.moveTo(492, 492 - len)
    ctx.lineTo(492, 492)
    ctx.lineTo(492 - len, 492)
    ctx.stroke()

    // 5. Tech details / Text
    ctx.fillStyle = "rgba(0, 255, 102, 0.8)"
    ctx.font = "bold 56px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(number, 256, 120)

    ctx.font = "bold 28px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(label, 256, 380)

    // Tech circular graphics
    ctx.strokeStyle = "rgba(0, 255, 102, 0.25)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(256, 256, 70, 0, Math.PI * 2)
    ctx.stroke()

    ctx.strokeStyle = "#00ff66"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(256, 256, 50, -Math.PI / 4, (Math.PI * 3) / 4)
    ctx.stroke()

    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 7.5

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x00ff66, 1.5)
    dirLight.position.set(5, 5, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0x00ffcc, 2, 50)
    pointLight.position.set(-5, -5, 5)
    scene.add(pointLight)

    // Textures corresponding to sections
    // BoxGeometry mapping order: Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)
    // Section Mapping:
    // 0: Presentación -> Front (+Z)
    // 1: About + Contact -> Right (+X)
    // 2: Proyectos -> Back (-Z)
    // 3: Experience -> Left (-X)
    // 4: Education & Languages -> Top (+Y)
    // 5: Skills -> Bottom (-Y)

    const labels = [
      "ABOUT ME & CONTACT",  // +X (Index 0) -> Section 1
      "MY EXPERIENCE",       // -X (Index 1) -> Section 3
      "LANGUAGES & EDUCATION",// +Y (Index 2) -> Section 4
      "TECHNICAL SKILLS",    // -Y (Index 3) -> Section 5
      "HELLO WORLD",         // +Z (Index 4) -> Section 0
      "MY PROJECTS",         // -Z (Index 5) -> Section 2
    ]

    const numbers = ["02", "04", "05", "06", "01", "03"]

    const materials = labels.map((label, i) => {
      const texture = createCosmicTexture(label, numbers[i])
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide,
      })
    })

    // Cube Mesh
    // Adjust cube size based on screen width
    const isMobile = window.innerWidth < 768
    const cubeSize = isMobile ? 2.0 : 2.5
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cube = new THREE.Mesh(geometry, materials)
    scene.add(cube)
    cubeRef.current = cube

    // Mouse movement parallax handler
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      mouse.current.x = e.clientX / window.innerWidth - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)

      const mobile = window.innerWidth < 768
      const size = mobile ? 2.0 : 2.5
      cube.scale.setScalar(size / 2.5) // Adjust size scale dynamically
    }
    window.addEventListener("resize", handleResize)

    // Render loop
    let animationFrameId: number
    const startTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = (performance.now() - startTime) * 0.001

      // Idle float & subtle rotation effect
      const idleX = Math.sin(elapsedTime * 0.4) * 0.08
      const idleY = Math.cos(elapsedTime * 0.3) * 0.08

      // Add mouse interactive tilt
      const mouseTiltX = mouse.current.y * 0.25
      const mouseTiltY = mouse.current.x * 0.25

      // Interpolate mesh rotation towards target + idle + mouse tilts
      cube.rotation.x = THREE.MathUtils.lerp(
        cube.rotation.x,
        targetRotation.current.x + idleX + mouseTiltX,
        0.08
      )
      cube.rotation.y = THREE.MathUtils.lerp(
        cube.rotation.y,
        targetRotation.current.y + idleY + mouseTiltY,
        0.08
      )

      renderer.render(scene, camera)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      materials.forEach((m) => {
        if (m.map) m.map.dispose()
        m.dispose()
      })
      renderer.dispose()
    }
  }, [])

  // Animate cube rotation target values when active section changes
  useEffect(() => {
    // Rotation Map corresponding to each section facing the camera (+Z)
    // Section Mapping:
    // 0: Presentación -> Front (+Z) -> x = 0, y = 0
    // 1: About + Contact -> Right (+X) -> x = 0, y = -Math.PI / 2
    // 2: Proyectos -> Back (-Z) -> x = 0, y = Math.PI
    // 3: Experience -> Left (-X) -> x = 0, y = Math.PI / 2
    // 4: Education & Languages -> Top (+Y) -> x = Math.PI / 2, y = 0
    // 5: Skills -> Bottom (-Y) -> x = -Math.PI / 2, y = 0

    let rx = 0
    let ry = 0

    switch (activeSection) {
      case 0:
        rx = 0
        ry = 0
        break
      case 1:
        rx = 0
        ry = -Math.PI / 2
        break
      case 2:
        rx = 0
        // Use GSAP to rotate in a single direction to prevent reverse spinning jumps
        ry = Math.PI
        break
      case 3:
        rx = 0
        ry = Math.PI / 2
        break
      case 4:
        rx = Math.PI / 2
        ry = 0
        break
      case 5:
        rx = -Math.PI / 2
        ry = 0
        break
      default:
        rx = 0
        ry = 0
    }

    // Animate target rotation variables using GSAP
    gsap.to(targetRotation.current, {
      x: rx,
      y: ry,
      duration: 1.2,
      ease: "power2.out",
    })
  }, [activeSection])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
