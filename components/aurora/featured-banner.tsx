"use client"

import { motion } from "framer-motion"
import { Play, Plus, Info } from "lucide-react"

interface FeaturedBannerProps {
  title: string
  description: string
  image: string
  rating?: number
  year?: string
  episodes?: number
}

export function FeaturedBanner({
  title,
  description,
  image,
  rating = 4.8,
  year = "2025",
  episodes = 24,
}: FeaturedBannerProps) {
  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Glow effects */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#00d4ff]/20 via-transparent to-[#a855f7]/20 blur-md" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Featured badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-xs font-medium text-[#00d4ff] tracking-wider">FEATURED</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{title}</h2>

          {/* Meta info */}
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              {rating}
            </span>
            <span>{year}</span>
            <span>{episodes} Episodes</span>
          </div>

          <p className="text-muted-foreground mb-6 line-clamp-2">{description}</p>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-background font-semibold hover:bg-[#00d4ff]/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Now
            </motion.button>

            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-full glass neon-border text-foreground font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add to List
            </motion.button>

            <motion.button
              className="p-3 rounded-full glass text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
