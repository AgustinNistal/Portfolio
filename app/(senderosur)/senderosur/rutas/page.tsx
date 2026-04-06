import { RoutesListing } from "@/components/senderosur/routes/routes-listing"
import { routes } from "@/lib/senderosur/data"

export const metadata = {
  title: "Rutas Turísticas | Sendero Sur",
  description:
    "Explorá nuestras 5 rutas turísticas por Argentina con domos ecológicos y aeropuertos en cada punto de inicio y fin.",
}

export default function RutasPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-background mb-4">Rutas Turísticas</h1>
          <p className="text-background/70 max-w-2xl text-lg">
            Cada ruta está diseñada para que viajes sin preocupaciones. Aeropuerto al inicio y fin, domos ecológicos en
            cada parada, y distancias cortas entre destinos.
          </p>
        </div>
      </section>

      <RoutesListing routes={routes} />
    </div>
  )
}
