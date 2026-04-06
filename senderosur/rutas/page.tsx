import { Navigation } from "@/components/navigation"
import { RoutesHero } from "@/components/routes-hero"
import { RouteCardFullWidth } from "@/components/route-card-fullwidth"

const routes = [
  {
    id: "costera",
    name: "Ruta Costera",
    description: "Recorrido por las costas atlánticas argentinas, desde Buenos Aires hasta Mar del Plata y más allá",
    highlights: [
      "Playas vírgenes de la costa bonaerense",
      "Avistaje de ballenas en Península Valdés",
      "Gastronomía marítima de Puerto Madryn",
      "Lobos marinos en Punta Tombo",
    ],
    images: [
      "https://ik.imagekit.io/ankxi835d/rutasimg/playas-doradas-rio-negro.jpg?updatedAt=1763065075128",
      "https://ik.imagekit.io/ankxi835d/rutasimg/ballena-paisaje-hotel-peninsula-valdes-puerto-madryn-chubut-argentina.jpeg?updatedAt=1763067101439",
      "/puerto-madryn-coastal-town-argentina.jpg",
      "/punta-tombo-sea-lions-argentina.jpg",
    ],
    duration: "7-10 días",
    difficulty: "Fácil",
    season: "Primavera-Verano",
  },
  {
    id: "andina",
    name: "Ruta Andina",
    description: "Atravesá la majestuosa Cordillera de los Andes descubriendo montañas, lagos y cultura andina",
    highlights: [
      "Cerro Aconcagua, techo de América",
      "Circuito de los 7 Lagos en Neuquén",
      "Bariloche y su arquitectura alpina",
      "Termas naturales de Copahue",
    ],
    images: [
      "https://ik.imagekit.io/ankxi835d/rutasimg/cerroSieteColores.jpg?updatedAt=1763065075237",
      "/7-lakes-route-neuquen-argentina.jpg",
      "/bariloche-alpine-architecture-argentina.jpg",
      "/copahue-hot-springs-argentina-andes.jpg",
    ],
    duration: "10-14 días",
    difficulty: "Moderada",
    season: "Todo el año",
  },
  {
    id: "patagonica",
    name: "Ruta Patagónica",
    description: "Explorá la inmensidad de la Patagonia: glaciares, montañas épicas y paisajes de fin del mundo",
    highlights: [
      "Glaciar Perito Moreno en El Calafate",
      "Cerro Fitz Roy en El Chaltén",
      "Ushuaia, la ciudad más austral",
      "Parque Nacional Tierra del Fuego",
    ],
    images: [
      "https://ik.imagekit.io/ankxi835d/rutasimg/glaciares.jpg?updatedAt=1763065075199",
      "/fitz-roy-mountain-el-chalten-patagonia.jpg",
      "/ushuaia-city-tierra-del-fuego-argentina.jpg",
      "/tierra-del-fuego-national-park-argentina.jpg",
    ],
    duration: "12-16 días",
    difficulty: "Moderada-Difícil",
    season: "Verano-Otoño",
  },
  {
    id: "vinedos",
    name: "Ruta de Viñedos",
    description: "Disfrutá del sabor argentino recorriendo las regiones vitivinícolas más prestigiosas del país",
    highlights: [
      "Bodegas de Mendoza al pie de los Andes",
      "Valles Calchaquíes en Salta",
      "Cata de Malbec en viñedos boutique",
      "Gastronomía gourmet regional",
    ],
    images: [
      "https://ik.imagekit.io/ankxi835d/rutasimg/vacaciones-invierno-que-hacer-mendoza-vinedos-y-montana.webp?updatedAt=1763067641238",
      "/calchaquies-valleys-salta-vineyards-argentina.jpg",
      "/malbec-wine-tasting-argentina-vineyard.jpg",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "5-7 días",
    difficulty: "Fácil",
    season: "Otoño-Primavera",
  },
    {
    id: "litoral",
    name: "Ruta del Litoral",
    description: "Embárcate en una travesía única por el litoral argentino, donde la selva, los esteros y la biodiversidad más asombrosa del país",
    highlights: [
      " Cataratas del Iguazú",
      "Esteros del Iberá",
      " Río Pilcomayo",
      " Costanera sobre el río Paraguay",
    ],
    images: [
      "https://ik.imagekit.io/ankxi835d/rutasimg/cataratas1.jpg?updatedAt=1763065074428",
      "/calchaquies-valleys-salta-vineyards-argentina.jpg",
      "/malbec-wine-tasting-argentina-vineyard.jpg",
      "/placeholder.svg?height=600&width=800",
    ],
    duration: "5-7 días",
    difficulty: "Fácil",
    season: "Otoño-Primavera",
  },
]

export default function RutasPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <RoutesHero />

      <section className="py-8 md:py-12 overflow-x-hidden">
        <div className="space-y-8 md:space-y-12">
          {routes.map((route) => (
            <RouteCardFullWidth key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">¿Listo para tu aventura?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
            Reservá tu hospedaje en domos y comenzá a planificar tu recorrido por Argentina.
          </p>
        </div>
      </section>
    </main>
  )
}
