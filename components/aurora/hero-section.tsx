"use client"

import { motion } from "framer-motion"
import { Globe3D } from "./globe-3d"

export function HeroSection() {
  return (
    <section className="relative flex flex-col overflow-hidden pt-20 pb-8 md:pb-0 md:min-h-screen md:flex-row md:items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[#0a1628]" />

      {/* Aurora effect overlay - smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[150px] animate-aurora-wave"
          style={{ background: "radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] animate-aurora-wave"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent 70%)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
          <motion.div
            className="relative w-full order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <Globe3D />

            {/* Glow effect under globe */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] sm:w-[80%] h-[60px] sm:h-[120px] blur-[50px] sm:blur-[80px] rounded-full"
              style={{ background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.4), transparent 70%)" }}
            />
          </motion.div>

          <motion.div
            className="text-center lg:text-left order-2 lg:order-1 mt-2 sm:mt-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-foreground">WHERE STORIES</span>
              <br />
              <span className="aurora-text animate-text-glow">COME TO LIGHT</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover the universe of anime. Stream your favorite series, movies, and shows in stunning quality.
            </motion.p>

            <motion.button
              className="group relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 neon-border rounded-full" />
              <div className="absolute inset-[1px] rounded-full bg-background/80 backdrop-blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent animate-shimmer" />
              <span className="relative z-10 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] text-[#00d4ff] font-medium flex items-center gap-2 sm:gap-3">
                EXPLORE THE UNIVERSE
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
