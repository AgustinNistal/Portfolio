import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    location: "Buenos Aires",
    route: "Ruta Patagónica",
    rating: 5,
    text: "Una experiencia increíble. Los domos con vista al Fitz Roy fueron un sueño. Todo perfectamente organizado.",
  },
  {
    name: "Carlos Mendoza",
    location: "Córdoba",
    route: "Ruta de los Viñedos",
    rating: 5,
    text: "Manejamos por paisajes espectaculares y en cada parada nos esperaba un domo con todas las comodidades.",
  },
  {
    name: "Laura Fernández",
    location: "Rosario",
    route: "Ruta Litoral",
    rating: 5,
    text: "Las Cataratas del Iguazú y los Esteros del Iberá en un solo viaje. Sendero Sur lo hizo posible.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Lo Que Dicen Nuestros Viajeros</h2>
          <p className="text-muted-foreground">Historias reales de quienes ya vivieron la experiencia Sendero Sur</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-card rounded-xl p-6 shadow-sm border border-border relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>

              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-sm text-primary mt-1">{testimonial.route}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
