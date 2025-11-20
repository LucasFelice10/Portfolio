import React, { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let stars = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = count => {
      stars = []
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.3
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${star.opacity})`
        ctx.fill()

        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.radius * 3
        )
        gradient.addColorStop(
          0,
          `rgba(168, 85, 247, ${star.opacity * 0.4})`
        )
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
      })
    }

    const updateStars = () => {
      stars.forEach(star => {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        star.opacity += (Math.random() - 0.5) * 0.03
        star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))
      })
    }

    const animate = () => {
      drawStars()
      updateStars()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      createStars(150)
    }

    resizeCanvas()
    createStars(150)
    animate()

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
