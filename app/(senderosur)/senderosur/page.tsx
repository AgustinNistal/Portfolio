import { HeroSection } from "@/components/senderosur/home/hero-section"
import { RoutesCarousel } from "@/components/senderosur/home/routes-carousel"
import { FeaturesSection } from "@/components/senderosur/home/features-section"
import { TestimonialsSection } from "@/components/senderosur/home/testimonials-section"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <RoutesCarousel />
      <TestimonialsSection />
    </div>
  )
}
