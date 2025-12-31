"use client"

import { motion } from "framer-motion"
import { Play, Star, Clock } from "lucide-react"

interface AnimeCardProps {
  title: string
  image: string
  rating?: number
  episodes?: number
  type?: "series" | "movie"
  year?: string
  isNew?: boolean
  className?: string
}

export function AnimeCard({
  title,
  image,
  rating = 4.5,
  episodes,
  type = "series",
  year = "2024",
  isNew = false,
  className = "",
}: AnimeCardProps) {
  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden cursor-pointer ${className}`}
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Card glow effect */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#00d4ff]/50 via-[#a855f7]/50 to-[#ec4899]/50 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

      {/* Card content */}
      <div className="relative glass-card rounded-xl overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Play button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={false}
          >
            <motion.div
              className="w-14 h-14 rounded-full bg-[#00d4ff]/20 backdrop-blur-sm border border-[#00d4ff]/50 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-6 h-6 text-[#00d4ff] fill-current" />
            </motion.div>
          </motion.div>

          {/* New badge */}
          {isNew && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#00d4ff] text-[10px] font-bold text-background tracking-wider">
              NEW
            </div>
          )}

          {/* Type badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-[#a855f7]/80 backdrop-blur-sm text-[10px] font-medium text-foreground tracking-wider uppercase">
            {type}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground truncate mb-2 group-hover:text-[#00d4ff] transition-colors">
            {title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>

            {episodes && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{episodes} EP</span>
              </div>
            )}

            <span>{year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
