"use client"

import { motion } from "framer-motion"
import { Play, ChevronRight } from "lucide-react"

interface ReleaseItem {
  title: string
  image: string
  episode?: string
}

interface ReleaseCardProps {
  title: string
  items: ReleaseItem[]
  variant?: "left" | "center" | "right"
}

export function ReleaseCard({ title, items, variant = "center" }: ReleaseCardProps) {
  const rotations = {
    left: -8,
    center: 0,
    right: 8,
  }

  return (
    <motion.div
      className="relative w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0"
      style={{
        transform: `rotate(${rotations[variant]}deg)`,
        transformOrigin: variant === "left" ? "bottom right" : variant === "right" ? "bottom left" : "center",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
    >
      {/* Card glow */}
      <div className="absolute -inset-[2px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#00d4ff]/30 via-[#a855f7]/30 to-[#00d4ff]/30 blur-md animate-border-glow" />

      {/* Card content */}
      <div className="relative glass-card rounded-xl sm:rounded-2xl overflow-hidden p-3 sm:p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {title}
            </span>
          </div>
          <motion.button className="text-[#00d4ff] hover:text-[#a855f7] transition-colors" whileHover={{ x: 3 }}>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.button>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {items.map((item, index) => (
            <motion.div key={index} className="relative group cursor-pointer" whileHover={{ scale: 1.05, zIndex: 10 }}>
              <div className="aspect-[3/4] rounded-md sm:rounded-lg overflow-hidden border border-[#00d4ff]/20">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-4 h-4 sm:w-6 sm:h-6 text-[#00d4ff]" />
                </div>
              </div>
              {item.episode && (
                <p className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] text-muted-foreground truncate">
                  {item.episode}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />
      </div>

      {/* Reflection effect */}
      <div
        className="absolute -bottom-16 sm:-bottom-20 left-0 right-0 h-16 sm:h-20 rounded-xl sm:rounded-2xl blur-xl opacity-30"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 212, 255, 0.3), transparent)",
          transform: "scaleY(-1)",
        }}
      />
    </motion.div>
  )
}
