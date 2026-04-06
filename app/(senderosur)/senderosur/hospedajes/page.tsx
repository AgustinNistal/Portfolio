import { AccommodationsGrid } from "@/components/senderosur/accommodations/accommodations-grid"

export const metadata = {
  title: "Hospedajes | Sendero Sur",
  description: "Descubrí nuestros domos ecológicos en los destinos más espectaculares de Argentina.",
}

import { accommodations } from "@/lib/senderosur/data"

async function fetchAccommodations() {
  return accommodations;
}

export default async function HospedajesPage() {
  const accommodations = await fetchAccommodations()
  return (
    <div className="min-h-screen">
      <section className="bg-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-background mb-4">Nuestros Hospedajes</h1>
          <p className="text-background/70 max-w-2xl text-lg">
            Domos ecológicos únicos en cada destino. Sustentabilidad, comodidad y vistas espectaculares para una
            experiencia inolvidable.
          </p>
        </div>
      </section>

      <AccommodationsGrid accommodations={accommodations} />
    </div>
  )
}
