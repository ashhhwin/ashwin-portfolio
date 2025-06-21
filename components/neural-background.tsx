"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
  color: string
  pulsePhase: number
  pulseSpeed: number
}

interface Connection {
  from: number
  to: number
  strength: number
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Helper to convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create nodes
    const nodes: Node[] = []
    const connections: Connection[] = []
    const nodeCount = 50
    const colors = [
      "#00FFFF", // Cyan
      "#FF00FF", // Magenta
      "#FFFF00", // Yellow
      "#00FF00", // Lime
      "#FF0080", // Pink
      "#0080FF", // Blue
      "#FF8000", // Orange
      "#8000FF"  // Purple
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03
      })
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2)
        )
        if (distance < 150) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - distance / 150
          })
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
        }
      }
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions
      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        node.pulsePhase += node.pulseSpeed

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      for (const connection of connections) {
        const from = nodes[connection.from]
        const to = nodes[connection.to]

        // Calculate distance from mouse
        const mouseDistance = Math.min(
          Math.sqrt(
            Math.pow(mousePos.x - from.x, 2) + Math.pow(mousePos.y - from.y, 2)
          ),
          Math.sqrt(
            Math.pow(mousePos.x - to.x, 2) + Math.pow(mousePos.y - to.y, 2)
          )
        )

        // Glow effect near mouse
        const glow = isHovering && mouseDistance < 100 ? 0.8 : 0.2
        const alpha = connection.strength * (0.05 + glow * 0.3)

        const fromRgb = hexToRgb(from.color)
        const toRgb = hexToRgb(to.color)
        if (!fromRgb || !toRgb) continue

        const lineGradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
        lineGradient.addColorStop(
          0,
          `rgba(${fromRgb.r}, ${fromRgb.g}, ${fromRgb.b}, ${alpha})`
        )
        lineGradient.addColorStop(
          1,
          `rgba(${toRgb.r}, ${toRgb.g}, ${toRgb.b}, ${alpha})`
        )

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = lineGradient
        ctx.lineWidth = connection.strength * 0.5
        ctx.stroke()

        // Add subtle glow
        if (glow > 0.5) {
          const glowRgb = hexToRgb(from.color)
          if (glowRgb) {
            ctx.shadowColor = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0.3)`
            ctx.shadowBlur = 8
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const mouseDistance = Math.sqrt(
          Math.pow(mousePos.x - node.x, 2) + Math.pow(mousePos.y - node.y, 2)
        )
        const hoverGlow = isHovering && mouseDistance < 100 ? 1.5 : 1
        
        // Create pulsing effect
        const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7
        const baseGlow = 0.4 + pulse * 0.6
        const finalGlow = baseGlow * hoverGlow

        const rgbColor = hexToRgb(node.color)
        if (!rgbColor) continue

        // Create star-like gradient with multiple layers
        const nodeGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          6
        )
        nodeGradient.addColorStop(
          0,
          `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalGlow})`
        )
        nodeGradient.addColorStop(
          0.3,
          `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalGlow * 0.7})`
        )
        nodeGradient.addColorStop(
          0.7,
          `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalGlow * 0.3})`
        )
        nodeGradient.addColorStop(
          1,
          `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`
        )

        // Draw the main star
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = nodeGradient
        ctx.fill()

        // Add bright center
        const centerGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          1.5
        )
        centerGradient.addColorStop(
          0,
          `rgba(255, 255, 255, ${finalGlow * 0.8})`
        )
        centerGradient.addColorStop(
          1,
          `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${finalGlow * 0.6})`
        )

        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = centerGradient
        ctx.fill()

        // Add glow effect
        if (finalGlow > 0.8) {
          ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.6)`
          ctx.shadowBlur = 12
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseenter", handleMouseEnter)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseenter", handleMouseEnter)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [mousePos, isHovering])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-2] opacity-30 dark:opacity-20"
    />
  )
} 