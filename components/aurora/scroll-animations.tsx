"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

// Fade up animation on scroll
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade in from left
export function FadeLeft({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Fade in from right
export function FadeRight({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale up animation
export function ScaleUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children animation
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: ReactNode
  staggerDelay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax scroll effect
export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

// Reveal on scroll with clip path
export function RevealOnScroll({
  children,
  direction = "up",
  className = "",
}: {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const clipPaths = {
    up: { hidden: "inset(100% 0 0 0)", visible: "inset(0 0 0 0)" },
    down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0 0)" },
    left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0 0 0)" },
    right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0)" },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={isInView ? { clipPath: clipPaths[direction].visible } : { clipPath: clipPaths[direction].hidden }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Blur in animation
export function BlurIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(20px)" }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating animation (continuous)
export function Float({
  children,
  duration = 3,
  distance = 10,
  className = "",
}: {
  children: ReactNode
  duration?: number
  distance?: number
  className?: string
}) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Glow pulse animation
export function GlowPulse({
  children,
  color = "#00d4ff",
  className = "",
}: {
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <motion.div
      animate={{
        boxShadow: [`0 0 20px ${color}40`, `0 0 40px ${color}60`, `0 0 20px ${color}40`],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text reveal character by character
export function TextReveal({
  text,
  className = "",
  charClassName = "",
}: {
  text: string
  className?: string
  charClassName?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const characters = text.split("")

  return (
    <motion.span ref={ref} className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          className={charClassName}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Counter animation
export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useSpring(0, { duration: duration * 1000 })

  if (isInView) {
    count.set(end)
  }

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{Math.round(count.get())}</motion.span>
      {suffix}
    </motion.span>
  )
}
