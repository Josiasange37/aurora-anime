"use client"

import { motion } from "framer-motion"

export function AuroraLogo({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        className="animate-glow-pulse"
        whileHover={{ scale: 1.1, rotate: 180 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer glow */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Triangle shape */}
        <motion.path
          d="M18 4L32 30H4L18 4Z"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Inner elements */}
        <motion.circle
          cx="18"
          cy="18"
          r="4"
          fill="url(#logoGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.svg>

      <motion.span className="text-xl font-bold tracking-wider" style={{ fontFamily: "var(--font-orbitron)" }}>
        <span className="text-[#00d4ff]">AURORA</span>
        <span className="text-foreground ml-1">ANIME</span>
      </motion.span>
    </motion.div>
  )
}
