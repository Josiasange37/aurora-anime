"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronDown, Grid, List } from "lucide-react"

const genres = [
  "All",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
]
const years = ["All Years", "2025", "2024", "2023", "2022", "2021", "2020"]
const sortOptions = ["Trending", "Latest", "Popular", "Rating", "A-Z"]

export function FilterBar() {
  const [activeGenre, setActiveGenre] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="py-6 border-b border-border/30">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Genre filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          {genres.map((genre) => (
            <motion.button
              key={genre}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                activeGenre === genre
                  ? "bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/50"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-transparent"
              }`}
              onClick={() => setActiveGenre(genre)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {genre}
            </motion.button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Year dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
              <span>2025</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm">
              <span>Trending</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg glass">
            <button
              className={`p-2 rounded ${viewMode === "grid" ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "text-muted-foreground"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded ${viewMode === "list" ? "bg-[#00d4ff]/20 text-[#00d4ff]" : "text-muted-foreground"}`}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
