import { Navigation } from "@/components/aurora/navigation"
import { PageHero } from "@/components/aurora/page-hero"
import { FilterBar } from "@/components/aurora/filter-bar"
import { AnimeGrid } from "@/components/aurora/anime-grid"
import { Footer } from "@/components/aurora/footer"
import { ParticleField } from "@/components/aurora/particles"

const showsData = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/anime-poster.png",
    rating: 4.9,
    episodes: 87,
    type: "series" as const,
    year: "2023",
  },
  {
    id: 2,
    title: "Death Note",
    image: "/death-note-poster.png",
    rating: 4.9,
    episodes: 37,
    type: "series" as const,
    year: "2006",
  },
  {
    id: 3,
    title: "Fullmetal Alchemist",
    image: "/fma-brotherhood-poster.png",
    rating: 4.9,
    episodes: 64,
    type: "series" as const,
    year: "2009",
  },
  {
    id: 4,
    title: "Steins;Gate",
    image: "/steins-gate-anime-poster.jpg",
    rating: 4.8,
    episodes: 24,
    type: "series" as const,
    year: "2011",
  },
  {
    id: 5,
    title: "Vinland Saga",
    image: "/vinland-saga-anime-poster.jpg",
    rating: 4.7,
    episodes: 48,
    type: "series" as const,
    year: "2023",
  },
  {
    id: 6,
    title: "Hunter x Hunter",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    episodes: 148,
    type: "series" as const,
    year: "2014",
  },
  {
    id: 7,
    title: "Mob Psycho 100",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    episodes: 37,
    type: "series" as const,
    year: "2022",
  },
  {
    id: 8,
    title: "Code Geass",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    episodes: 50,
    type: "series" as const,
    year: "2008",
  },
  {
    id: 9,
    title: "Bleach",
    image: "/bleach-anime-poster.jpg",
    rating: 4.6,
    episodes: 366,
    type: "series" as const,
    year: "2023",
  },
  {
    id: 10,
    title: "Naruto Shippuden",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    episodes: 500,
    type: "series" as const,
    year: "2017",
  },
  {
    id: 11,
    title: "Cowboy Bebop",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    episodes: 26,
    type: "series" as const,
    year: "1998",
  },
  {
    id: 12,
    title: "Neon Genesis Evangelion",
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    episodes: 26,
    type: "series" as const,
    year: "1995",
  },
]

export default function ShowsPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleField />
      <Navigation />

      <PageHero
        title="Popular Shows"
        subtitle="Classic and modern anime shows that defined generations"
        accentWord="Shows"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FilterBar />
        <AnimeGrid items={showsData} title="All Shows" />
      </div>

      <Footer />
    </main>
  )
}
