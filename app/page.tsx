import { Navigation } from "@/components/aurora/navigation"
import { HeroSection } from "@/components/aurora/hero-section"
import { TrendingSection } from "@/components/aurora/trending-section"
import { Footer } from "@/components/aurora/footer"
import { ParticleField, FloatingParticles } from "@/components/aurora/particles"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <ParticleField />
      <FloatingParticles />

      {/* Navigation */}
      <Navigation />

      {/* Hero section with 3D Globe */}
      <HeroSection />

      {/* Trending section with release cards */}
      <TrendingSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
