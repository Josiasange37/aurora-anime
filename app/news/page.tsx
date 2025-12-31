import { Navigation } from "@/components/aurora/navigation"
import { PageHero } from "@/components/aurora/page-hero"
import { NewsCard } from "@/components/aurora/news-card"
import { Footer } from "@/components/aurora/footer"
import { ParticleField } from "@/components/aurora/particles"

const newsData = [
  {
    id: 1,
    title: "Jujutsu Kaisen Season 3 Officially Announced for 2025",
    excerpt:
      "MAPPA Studios confirms the highly anticipated third season with a stunning teaser trailer revealing new character designs and animation quality.",
    image: "/jujutsu-kaisen-poster.png",
    category: "Announcements",
    date: "2 hours ago",
    comments: 342,
    featured: true,
  },
  {
    id: 2,
    title: "Solo Leveling Breaks Streaming Records",
    excerpt: "The anime adaptation has become the most-watched premiere of the season across all major platforms.",
    image: "/solo-leveling-anime.jpg",
    category: "Industry",
    date: "5 hours ago",
    comments: 128,
  },
  {
    id: 3,
    title: "Demon Slayer Final Arc Release Date Revealed",
    excerpt: "Ufotable announces the epic conclusion to the beloved series will arrive in Fall 2025.",
    image: "/demon-slayer-anime-poster.png",
    category: "Announcements",
    date: "8 hours ago",
    comments: 256,
  },
  {
    id: 4,
    title: "One Piece Live Action Season 2 Casting News",
    excerpt: "Netflix reveals the actors joining the crew for the highly anticipated second season.",
    image: "/one-piece-egghead-arc.jpg",
    category: "Live Action",
    date: "1 day ago",
    comments: 89,
  },
  {
    id: 5,
    title: "Frieren Wins Anime of the Year Award",
    excerpt: "The critically acclaimed series takes home the top honor at the annual Anime Awards ceremony.",
    image: "/frieren-anime.jpg",
    category: "Awards",
    date: "1 day ago",
    comments: 412,
  },
  {
    id: 6,
    title: "New Chainsaw Man Movie Announced",
    excerpt: "MAPPA confirms a theatrical film continuing the story after the anime's first season.",
    image: "/chainsaw-man-anime-poster.png",
    category: "Movies",
    date: "2 days ago",
    comments: 198,
  },
  {
    id: 7,
    title: "My Hero Academia Manga Ending This Year",
    excerpt: "Creator Kohei Horikoshi reveals the final arc is approaching its climax.",
    image: "/my-hero-academia-poster.png",
    category: "Manga",
    date: "2 days ago",
    comments: 567,
  },
]

export default function NewsPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleField />
      <Navigation />

      <PageHero
        title="Anime News"
        subtitle="Stay updated with the latest announcements, reviews, and industry updates"
        accentWord="News"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news, index) => (
            <NewsCard
              key={news.id}
              title={news.title}
              excerpt={news.excerpt}
              image={news.image}
              category={news.category}
              date={news.date}
              comments={news.comments}
              featured={news.featured}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
