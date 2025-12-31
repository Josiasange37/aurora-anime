import { Navigation } from "@/components/aurora/navigation"
import { PageHero } from "@/components/aurora/page-hero"
import { FilterBar } from "@/components/aurora/filter-bar"
import { AnimeGrid } from "@/components/aurora/anime-grid"
import { FeaturedBanner } from "@/components/aurora/featured-banner"
import { Footer } from "@/components/aurora/footer"
import { ParticleField } from "@/components/aurora/particles"

const moviesData = [
  { id: 1, title: "Your Name", image: "/your-name-anime-movie-poster.jpg", rating: 4.9, type: "movie" as const, year: "2016" },
  {
    id: 2,
    title: "Spirited Away",
    image: "/spirited-away-anime-movie-poster.jpg",
    rating: 4.9,
    type: "movie" as const,
    year: "2001",
  },
  {
    id: 3,
    title: "Demon Slayer: Mugen Train",
    image: "/demon-slayer-anime-poster.png",
    rating: 4.8,
    type: "movie" as const,
    year: "2020",
    isNew: true,
  },
  {
    id: 4,
    title: "Suzume",
    image: "/suzume-anime-movie-poster.jpg",
    rating: 4.7,
    type: "movie" as const,
    year: "2022",
    isNew: true,
  },
  {
    id: 5,
    title: "Weathering With You",
    image: "/weathering-with-you-anime-movie-poster.jpg",
    rating: 4.6,
    type: "movie" as const,
    year: "2019",
  },
  {
    id: 6,
    title: "A Silent Voice",
    image: "/a-silent-voice-anime-movie-poster.jpg",
    rating: 4.8,
    type: "movie" as const,
    year: "2016",
  },
  {
    id: 7,
    title: "Princess Mononoke",
    image: "/princess-mononoke-anime-movie-poster.jpg",
    rating: 4.9,
    type: "movie" as const,
    year: "1997",
  },
  { id: 8, title: "Akira", image: "/akira-anime-movie-poster.jpg", rating: 4.7, type: "movie" as const, year: "1988" },
  {
    id: 9,
    title: "Howl's Moving Castle",
    image: "/howl-s-moving-castle-anime-movie-poster.jpg",
    rating: 4.8,
    type: "movie" as const,
    year: "2004",
  },
  {
    id: 10,
    title: "The Boy and the Heron",
    image: "/the-boy-and-the-heron-anime-movie-poster.jpg",
    rating: 4.6,
    type: "movie" as const,
    year: "2023",
    isNew: true,
  },
  {
    id: 11,
    title: "Jujutsu Kaisen 0",
    image: "/jujutsu-kaisen-poster.png",
    rating: 4.7,
    type: "movie" as const,
    year: "2021",
  },
  {
    id: 12,
    title: "Dragon Ball Super: Broly",
    image: "/dragon-ball-super-broly-anime-movie-poster.jpg",
    rating: 4.5,
    type: "movie" as const,
    year: "2018",
  },
]

export default function MoviesPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleField />
      <Navigation />

      <PageHero
        title="Anime Movies"
        subtitle="Experience breathtaking cinematic masterpieces from legendary studios"
        accentWord="Movies"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <FeaturedBanner
          title="Suzume"
          description="A young girl embarks on a journey across Japan to close mysterious doors that are unleashing disasters, accompanied by a chair-turned-boy."
          image="/suzume-anime-movie-scene-beautiful-landscape.jpg"
          rating={4.7}
          year="2022"
        />

        <FilterBar />
        <AnimeGrid items={moviesData} title="All Movies" />
      </div>

      <Footer />
    </main>
  )
}
