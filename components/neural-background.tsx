"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
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

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
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

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Draw connections
      connections.forEach(connection => {
        const from = nodes[connection.from]
        const to = nodes[connection.to]
        
        // Calculate distance from mouse
        const mouseDistance = Math.min(
          Math.sqrt(Math.pow(mousePos.x - from.x, 2) + Math.pow(mousePos.y - from.y, 2)),
          Math.sqrt(Math.pow(mousePos.x - to.x, 2) + Math.pow(mousePos.y - to.y, 2))
        )

        // Glow effect near mouse
        const glow = isHovering && mouseDistance < 100 ? 0.8 : 0.2
        const alpha = connection.strength * (0.1 + glow)

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
        ctx.lineWidth = connection.strength * 2
        ctx.stroke()

        // Add subtle glow
        if (glow > 0.5) {
          ctx.shadowColor = "rgba(16, 185, 129, 0.5)"
          ctx.shadowBlur = 10
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      })

      // Draw nodes
      nodes.forEach(node => {
        const mouseDistance = Math.sqrt(
          Math.pow(mousePos.x - node.x, 2) + Math.pow(mousePos.y - node.y, 2)
        )
        const glow = isHovering && mouseDistance < 100 ? 1 : 0.3

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(16, 185, 129, ${glow})`
        ctx.fill()

        if (glow > 0.5) {
          ctx.shadowColor = "rgba(16, 185, 129, 0.8)"
          ctx.shadowBlur = 15
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

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
      className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20"
    />
  )
} 