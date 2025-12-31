"use client"

import { motion } from "framer-motion"
import { FloatingParticles } from "./particles"

interface PageHeroProps {
  title: string
  subtitle?: string
  accentWord?: string
}

export function PageHero({ title, subtitle, accentWord }: PageHeroProps) {
  const words = title.split(" ")
  const accentIndex = accentWord ? words.findIndex((w) => w.toLowerCase() === accentWord.toLowerCase()) : -1

  return (
    <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a1628]/50 to-background" />

      {/* Aurora effects - smaller on mobile */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px] bg-[#00d4ff]/10 animate-aurora-wave" />
      <div
        className="absolute top-1/3 right-1/4 w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px] rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] bg-[#a855f7]/10 animate-aurora-wave"
        style={{ animationDelay: "2s" }}
      />

      <FloatingParticles />

      <div className="relative z-10 text-center px-4 sm:px-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {words.map((word, index) => (
            <span key={index} className={index === accentIndex ? "aurora-text animate-text-glow" : "text-foreground"}>
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          className="mt-6 sm:mt-8 mx-auto w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
    </section>
  )
}
