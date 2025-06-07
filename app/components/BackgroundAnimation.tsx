'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import SplashCursor from '../../lib/SplashCursor'

type AnimationType = 'circles' | 'fireworks' | 'squares'

const BackgroundAnimation = ({ animationType }: { animationType: AnimationType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [spacePressed, setSpacePressed] = useState(false)
  const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: window.innerWidth/2, y: window.innerHeight/2})
  const [splashVisible, setSplashVisible] = useState(false)
  const [splashFade, setSplashFade] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Particle[] = []
    const particleCount = 150

    // Particle is intentionally a class for animation logic
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      life: number
      fireworkStage: 'rising' | 'exploding' = 'rising';

      constructor(x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
        this.x = x
        this.y = y
        this.size = animationType === 'squares' ? Math.random() * 20 + 10 : Math.random() * 6 + 3
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(80, 80, 80, 0.4)'
        this.life = animationType === 'squares' ? 200 : 100
      }

      update() {
        if (animationType === 'circles') {
          this.x += this.speedX
          this.y += this.speedY

          if (this.x > canvas.width) this.x = 0
          else if (this.x < 0) this.x = canvas.width

          if (this.y > canvas.height) this.y = 0
          else if (this.y < 0) this.y = canvas.height
        } else if (animationType === 'fireworks') {
          if (this.fireworkStage === 'rising') {
            this.y -= 3;
            if (this.y <= canvas.height * 0.3) {
              this.fireworkStage = 'exploding';
              createFireworkExplosion(this.x, this.y);
            }
          } else {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += 0.03; // Add gravity effect
            this.life -= 1;
          }
        } else if (animationType === 'squares') {
          this.life -= 1
        }
      }

      draw() {
        const textProximityFactor = this.getTextProximityFactor();
        const baseAlpha = animationType === 'squares' ? this.life / 200 : 1;
        ctx.globalAlpha = baseAlpha * textProximityFactor;
        ctx.fillStyle = this.color
        ctx.beginPath()
        if (animationType === 'circles' || animationType === 'fireworks') {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        } else if (animationType === 'squares') {
          ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size)
        }
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1;
      }

      getTextProximityFactor() {
        const textElements = document.querySelectorAll('p, a');
        let closestDistance = Infinity;

        textElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distance = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2);
          closestDistance = Math.min(closestDistance, distance);
        });

        const proximityThreshold = 800; // Adjust this value to change the fade effect range
        return Math.min(closestDistance / proximityThreshold, 1);
      }
    }

    const createFirework = (x: number, y: number) => {
      const particle = new Particle(x, y);
      particle.speedY = 0;
      particle.fireworkStage = 'rising';
      particles.push(particle);
    }

    const createFireworkExplosion = (x: number, y: number) => {
      for (let i = 0; i < 30; i++) {
        const particle = new Particle(x, y);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        particle.speedX = Math.cos(angle) * speed;
        particle.speedY = Math.sin(angle) * speed;
        particle.fireworkStage = 'exploding';
        particle.life = 50;
        particles.push(particle);
      }
    }

    const createParticles = () => {
      if (animationType === 'circles' || animationType === 'squares') {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle())
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (animationType === 'fireworks' && Math.random() < 0.02) {
        createFirework(Math.random() * canvas.width, canvas.height)
      }

      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()

        if (animationType !== 'circles' && particle.life <= 0) {
          particles.splice(index, 1)
        }
      })

      if ((animationType === 'squares' || animationType === 'fireworks') && particles.length < particleCount) {
        particles.push(new Particle())
      }

      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [animationType, resolvedTheme])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setSpacePressed(true)
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setSpacePressed(false)
      }
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('keyup', handleKeyUp, { passive: false })
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (spacePressed) {
      setSplashVisible(true)
      setSplashFade(false)
    } else if (splashVisible) {
      setSplashFade(true)
      const timeout = setTimeout(() => {
        setSplashVisible(false)
        setSplashFade(false)
      }, 700) // fade duration in ms
      return () => clearTimeout(timeout)
    }
  }, [spacePressed, splashVisible])

  const baseColor = resolvedTheme === 'dark' ? '#60a5fa' : '#1e293b'

  return (
    <>
      {(splashVisible || splashFade) && (
        <div style={{
          opacity: splashFade ? 0 : 1,
          transition: 'opacity 0.7s',
          pointerEvents: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 50,
        }}>
          <SplashCursor />
        </div>
      )}
      <canvas ref={canvasRef} className="fixed inset-0 -z-20 w-full h-full" />
    </>
  )
}

export default BackgroundAnimation

