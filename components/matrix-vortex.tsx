"use client"

import { useEffect, useRef } from "react"

export function MatrixVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // --- Starfield ---
    const NUM_STARS = 180
    type Star = { x: number; y: number; radius: number; alpha: number; twinkleSpeed: number; twinkleOffset: number }
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.3 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.7,
      twinkleSpeed: 0.003 + Math.random() * 0.006,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))

    // --- Matrix rain (subtle, sparse, edge-only) ---
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ"
    const charArr = chars.split("")
    const COL_W = 22
    const cols = Math.floor(width / COL_W)

    type Column = {
      x: number
      y: number
      speed: number
      charSize: number
      char: string
      opacity: number
      active: boolean
      delay: number
    }

    const columns: Column[] = Array.from({ length: cols }, (_, i) => ({
      x: i * COL_W + COL_W / 2,
      y: -Math.random() * height,
      speed: 0.8 + Math.random() * 1.4,
      charSize: 11 + Math.random() * 5,
      char: charArr[Math.floor(Math.random() * charArr.length)],
      opacity: 0.05 + Math.random() * 0.18,
      // Only ~40% of columns are active at a time for subtle look
      active: Math.random() < 0.40,
      delay: Math.random() * 200,
    }))

    let frame = 0

    const draw = () => {
      frame++
      ctx.globalAlpha = 1.0

      // Deep space background — very slight fade trail instead of hard clear
      ctx.fillStyle = "rgba(5, 5, 18, 0.18)"
      ctx.fillRect(0, 0, width, height)

      // --- Draw stars ---
      const t = Date.now() * 0.001
      stars.forEach((star) => {
        const twinkle = star.alpha * (0.5 + 0.5 * Math.sin(t * star.twinkleSpeed * 100 + star.twinkleOffset))
        ctx.globalAlpha = twinkle
        ctx.fillStyle = "#e8f4ff"
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Draw matrix columns ---
      columns.forEach((col) => {
        if (!col.active) {
          // Random chance to activate
          if (Math.random() < 0.0008) {
            col.active = true
            col.y = -20
            col.opacity = 0.06 + Math.random() * 0.18
          }
          return
        }

        col.y += col.speed

        // Randomly change char
        if (Math.random() > 0.92) {
          col.char = charArr[Math.floor(Math.random() * charArr.length)]
        }

        // Head char — slightly brighter
        ctx.globalAlpha = col.opacity * 1.8
        ctx.fillStyle = "#00ff88"
        ctx.font = `${col.charSize}px monospace`
        ctx.fillText(col.char, col.x, col.y)

        // Trail ghost — slightly above
        ctx.globalAlpha = col.opacity * 0.6
        ctx.fillStyle = "#00cc66"
        ctx.fillText(col.char, col.x, col.y - col.charSize * 1.2)

        // Reset when off screen
        if (col.y > height + 30) {
          col.active = Math.random() < 0.5 // 50% chance to deactivate on reset
          col.y = -20
          col.opacity = 0.06 + Math.random() * 0.18
        }
      })

      ctx.globalAlpha = 1.0
      animationFrameId = requestAnimationFrame(draw)
    }

    // Initial full clear
    ctx.fillStyle = "#05050e"
    ctx.fillRect(0, 0, width, height)

    draw()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 block pointer-events-none"
    />
  )
}
