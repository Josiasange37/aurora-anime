"use client"
import { AnimeCard } from "./anime-card"
import { FadeLeft, StaggerContainer, StaggerItem } from "./scroll-animations"

interface AnimeItem {
  id: number
  title: string
  image: string
  rating: number
  episodes?: number
  type: "series" | "movie"
  year: string
  isNew?: boolean
}

interface AnimeGridProps {
  items: AnimeItem[]
  title?: string
}

export function AnimeGrid({ items, title }: AnimeGridProps) {
  return (
    <section className="py-8 sm:py-10 md:py-12">
      {title && (
        <FadeLeft>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
            <span className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#00d4ff] to-[#a855f7] rounded-full" />
            {title}
          </h2>
        </FadeLeft>
      )}

      <StaggerContainer
        staggerDelay={0.05}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6"
      >
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <AnimeCard
              title={item.title}
              image={item.image}
              rating={item.rating}
              episodes={item.episodes}
              type={item.type}
              year={item.year}
              isNew={item.isNew}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
