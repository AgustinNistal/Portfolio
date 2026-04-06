import { notFound } from "next/navigation"
import { getRoute, getAccommodation, getCity, routes } from "@/lib/senderosur/data"
import { RouteHero } from "@/components/senderosur/routes/route-hero"
import { RouteTimeline } from "@/components/senderosur/routes/route-timeline"
import { RoutePackOffer } from "@/components/senderosur/routes/route-pack-offer"

interface RoutePageProps {
  params: Promise<{ routeId: string }>
}

export async function generateStaticParams() {
  return routes.map((route) => ({
    routeId: route.slug,
  }))
}

export async function generateMetadata({ params }: RoutePageProps) {
  const { routeId } = await params
  const route = getRoute(routeId)

  if (!route) return { title: "Ruta no encontrada" }

  return {
    title: `${route.name} | Sendero Sur`,
    description: route.description,
  }
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { routeId } = await params
  const route = getRoute(routeId)

  if (!route) {
    notFound()
  }

  const stopsWithDetails = route.stops.map((stop) => ({
    ...stop,
    cityDetails: getCity(stop.cityId),
    accommodationDetails: getAccommodation(stop.accommodationId),
  }))

  return (
    <div className="min-h-screen">
      <RouteHero route={route} />
      <RoutePackOffer route={route} />
      <RouteTimeline route={route} stops={stopsWithDetails} />
    </div>
  )
}
