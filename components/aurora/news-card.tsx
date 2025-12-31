"use client"

import { motion } from "framer-motion"
import { Clock, MessageCircle, Share2 } from "lucide-react"

interface NewsCardProps {
  title: string
  excerpt: string
  image: string
  category: string
  date: string
  comments: number
  featured?: boolean
}

export function NewsCard({ title, excerpt, image, category, date, comments, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <motion.article
        className="relative col-span-full lg:col-span-2 h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Glow border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#00d4ff]/30 to-[#a855f7]/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/30 mb-4 w-fit">
            <span className="text-xs font-medium text-[#00d4ff] tracking-wider uppercase">{category}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-[#00d4ff] transition-colors">
            {title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {comments}
            </span>
            <button className="ml-auto p-2 rounded-full hover:bg-foreground/10 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      className="glass-card rounded-xl overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#a855f7]/80 backdrop-blur-sm text-[10px] font-medium text-foreground tracking-wider uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#00d4ff] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{excerpt}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3" />
            {comments}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
