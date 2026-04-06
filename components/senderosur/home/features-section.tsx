import { Plane, Home, Car, Clock, MapPin, Star } from "lucide-react"

const features = [
  {
    icon: Plane,
    title: "Aeropuerto de Inicio y Fin",
    description: "Cada ruta comienza y termina en ciudades con aeropuerto, facilitando tu llegada y salida.",
    color: "text-primary",
  },
  {
    icon: Car,
    title: "Alquiler de Auto",
    description: "Alquilá tu vehículo en el aeropuerto y recorré a tu ritmo las rutas más espectaculares.",
    color: "text-accent",
  },
  {
    icon: Home,
    title: "Domos Ecológicos",
    description: "Hospedaje sustentable en cada parada con vistas únicas y amenidades de primera.",
    color: "text-primary",
  },
  {
    icon: Clock,
    title: "Viajes Cortos",
    description: "Distancias calculadas para que no viajes más de 5 horas entre destinos.",
    color: "text-accent",
  },
  {
    icon: MapPin,
    title: "Rutas Temáticas",
    description: "Desde glaciares hasta viñedos, elegí la aventura que más te inspire.",
    color: "text-primary",
  },
  {
    icon: Star,
    title: "Packs Completos",
    description: "Reservá toda la ruta como un combo y obtené descuentos exclusivos.",
    color: "text-accent",
  },
]

export function FeaturesSection() {
  return (
    <section id="como-funciona" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Cómo Funciona Sendero Sur</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Diseñamos rutas turísticas pensadas para que solo te preocupes por disfrutar. Todo está planificado:
            transporte, hospedaje y distancias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
              <h3 className="font-serif text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
