import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Home, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { RoutesCarousel } from "@/components/routes-carousel"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ik.imagekit.io/ankxi835d/rutasimg/fitzroy2.jpg?updatedAt=1763065075250"
            alt="Paisajes de Argentina"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 animate-fade-up text-balance">
            Descubrí Argentina
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up animation-delay-200">
            Viajá por rutas únicas alojándote en domos sustentables. Experiencias auténticas en los lugares más hermosos
            del país.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-400">
            <Button size="lg" className="text-lg text-white" asChild>
              <Link href="/rutas">
                Explorar Rutas <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/hospedajes">Ver Hospedajes</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div> */}
      </section>

      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4 text-primary">Explorá Nuestras Rutas</h2>
          <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Cada ruta está diseñada para descubrir lo mejor de Argentina con experiencias únicas.
          </p>
        </div>

        <RoutesCarousel />
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-4 text-primary">
            ¿Por qué elegir Conoce Argentina?
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            Combinamos alojamiento eco-luxury con asesoramiento turístico personalizado para que vivas Argentina de
            manera única.
          </p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-4 text-foreground">Rutas Curadas</h3>
              <p className="text-muted-foreground leading-relaxed">
                Descubrí itinerarios diseñados para explorar lo mejor de cada región: costas, montañas, viñedos y la
                Patagonia.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Home className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display text-2xl mb-4 text-foreground">Domos Sustentables</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alojate en domos boutique integrados al paisaje, con todas las comodidades y un mínimo impacto
                ambiental.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display text-2xl mb-4 text-foreground">Experiencias Locales</h3>
              <p className="text-muted-foreground leading-relaxed">
                Conectá con guías locales, artesanos y comunidades para vivir experiencias auténticas en cada destino.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Comenzá tu aventura hoy</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
            Armá tu ruta ideal, elegí tus hospedajes y prepárate para descubrir Argentina como nunca antes.
          </p>
          <Button size="lg" variant="secondary" className="text-lg" asChild>
            <Link href="/rutas">
              Ver Todas las Rutas <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-xl mb-4 text-primary">Conoce Argentina</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Turismo sustentable y experiencias auténticas en Argentina.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Rutas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/rutas/costera" className="hover:text-primary transition-colors">
                    Ruta Costera
                  </Link>
                </li>
                <li>
                  <Link href="/rutas/andina" className="hover:text-primary transition-colors">
                    Ruta Andina
                  </Link>
                </li>
                <li>
                  <Link href="/rutas/patagonica" className="hover:text-primary transition-colors">
                    Ruta Patagónica
                  </Link>
                </li>
                <li>
                  <Link href="/rutas/vinedos" className="hover:text-primary transition-colors">
                    Ruta de Viñedos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/sobre-nosotros" className="hover:text-primary transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/preguntas-frecuentes" className="hover:text-primary transition-colors">
                    Preguntas Frecuentes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terminos" className="hover:text-primary transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="hover:text-primary transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Conoce Argentina. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
