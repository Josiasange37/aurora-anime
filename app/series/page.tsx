import { Navigation } from "@/components/aurora/navigation"
import { PageHero } from "@/components/aurora/page-hero"
import { FilterBar } from "@/components/aurora/filter-bar"
import { AnimeGrid } from "@/components/aurora/anime-grid"
import { FeaturedBanner } from "@/components/aurora/featured-banner"
import { Footer } from "@/components/aurora/footer"
import { ParticleField } from "@/components/aurora/particles"

const seriesData = [
  {
    id: 1,
    title: "Demon Slayer",
    image: "/demon-slayer-anime-poster.png",
    rating: 4.9,
    episodes: 44,
    type: "series" as const,
    year: "2024",
    isNew: true,
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    image: "/jujutsu-kaisen-poster.png",
    rating: 4.8,
    episodes: 47,
    type: "series" as const,
    year: "2024",
    isNew: true,
  },
  {
    id: 3,
    title: "My Hero Academia",
    image: "/my-hero-academia-poster.png",
    rating: 4.7,
    episodes: 138,
    type: "series" as const,
    year: "2023",
  },
  {
    id: 4,
    title: "Spy x Family",
    image: "/spy-x-family-poster.png",
    rating: 4.8,
    episodes: 37,
    type: "series" as const,
    year: "2024",
  },
  {
    id: 5,
    title: "Chainsaw Man",
    image: "/chainsaw-man-anime-poster.png",
    rating: 4.7,
    episodes: 12,
    type: "series" as const,
    year: "2023",
    isNew: true,
  },
  {
    id: 6,
    title: "Blue Lock",
    image: "/blue-lock-anime.jpg",
    rating: 4.6,
    episodes: 24,
    type: "series" as const,
    year: "2024",
  },
  {
    id: 7,
    title: "Frieren",
    image: "/frieren-anime.jpg",
    rating: 4.9,
    episodes: 28,
    type: "series" as const,
    year: "2024",
    isNew: true,
  },
  {
    id: 8,
    title: "Solo Leveling",
    image: "/solo-leveling-anime.jpg",
    rating: 4.8,
    episodes: 12,
    type: "series" as const,
    year: "2024",
    isNew: true,
  },
  {
    id: 9,
    title: "One Piece",
    image: "/one-piece-egghead-arc.jpg",
    rating: 4.9,
    episodes: 1100,
    type: "series" as const,
    year: "2024",
  },
  {
    id: 10,
    title: "Kaiju No. 8",
    image: "/kaiju-no-8-anime.jpg",
    rating: 4.5,
    episodes: 12,
    type: "series" as const,
    year: "2024",
    isNew: true,
  },
  {
    id: 11,
    title: "Wind Breaker",
    image: "/wind-breaker-anime.jpg",
    rating: 4.4,
    episodes: 13,
    type: "series" as const,
    year: "2024",
  },
  {
    id: 12,
    title: "Oshi no Ko",
    image: "/oshi-no-ko-season-2.jpg",
    rating: 4.8,
    episodes: 24,
    type: "series" as const,
    year: "2024",
  },
]

export default function SeriesPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleField />
      <Navigation />

      <PageHero
        title="Anime Series"
        subtitle="Discover epic storylines and unforgettable characters in our extensive collection"
        accentWord="Series"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FeaturedBanner
          title="Frieren: Beyond Journey's End"
          description="After the demon king's defeat, the immortal elf Frieren begins a new journey to understand the meaning of life and the friends she outlives."
          image="/frieren-anime.jpg"
          rating={4.9}
          year="2024"
          episodes={28}
        />

        <FilterBar />
        <AnimeGrid items={seriesData} title="All Series" />
      </div>

      <Footer />
    </main>
  )
}
