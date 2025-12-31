"use client"
import { ReleaseCard } from "./release-card"
import { TrendingUp } from "lucide-react"
import { FadeLeft, StaggerContainer, StaggerItem } from "./scroll-animations"

const newReleasesData = [
  {
    title: "NEW RELEASES",
    items: [
      { title: "Blue Lock", image: "/blue-lock-anime.jpg", episode: "EP 24" },
      { title: "Frieren", image: "/frieren-anime.jpg", episode: "EP 28" },
      { title: "Solo Leveling", image: "/solo-leveling-anime.jpg", episode: "EP 12" },
    ],
  },
  {
    title: "NEW RELEASES",
    items: [
      { title: "Demon Slayer", image: "/demon-slayer-hashira-training.jpg", episode: "EP 8" },
      { title: "Jujutsu Kaisen", image: "/jujutsu-kaisen-season-2.jpg", episode: "EP 23" },
      { title: "One Piece", image: "/one-piece-egghead-arc.jpg", episode: "EP 1100" },
    ],
  },
  {
    title: "NEW RELEASES",
    items: [
      { title: "Kaiju No. 8", image: "/kaiju-no-8-anime.jpg", episode: "EP 6" },
      { title: "Wind Breaker", image: "/wind-breaker-anime.jpg", episode: "EP 10" },
      { title: "Oshi no Ko", image: "/oshi-no-ko-season-2.jpg", episode: "EP 13" },
    ],
  },
]

export function TrendingSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a1628] to-background" />

      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full blur-[120px] md:blur-[150px] bg-[#00d4ff]/10" />
      <div className="absolute bottom-1/4 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full blur-[100px] md:blur-[120px] bg-[#a855f7]/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header - with scroll animation */}
        <FadeLeft>
          <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#00d4ff]" />
            <h2 className="text-lg sm:text-xl font-bold tracking-wider">
              <span className="text-foreground">TRENDING</span>
              <span className="text-[#00d4ff] ml-2">NOW</span>
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-[#00d4ff]/50 to-transparent ml-3 sm:ml-4" />
          </div>
        </FadeLeft>

        {/* Cards container - with stagger animation */}
        <StaggerContainer staggerDelay={0.15} className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-4">
          <StaggerItem>
            <ReleaseCard title={newReleasesData[0].title} items={newReleasesData[0].items} variant="left" />
          </StaggerItem>
          <StaggerItem>
            <ReleaseCard title={newReleasesData[1].title} items={newReleasesData[1].items} variant="center" />
          </StaggerItem>
          <StaggerItem>
            <ReleaseCard title={newReleasesData[2].title} items={newReleasesData[2].items} variant="right" />
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]">
        <div className="max-w-4xl mx-auto h-full bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
      </div>
    </section>
  )
}
