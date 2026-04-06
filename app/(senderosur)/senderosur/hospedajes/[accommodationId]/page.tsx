import { notFound } from "next/navigation"
import { getCity, getAccommodation, type Accommodation } from "@/lib/senderosur/data"
import { AccommodationDetail } from "@/components/senderosur/accommodations/accommodation-detail"

interface AccommodationPageProps {
  params: Promise<{ accommodationId: string }>
}

export async function generateStaticParams() {
  const { accommodations } = await import("@/lib/senderosur/data")
  return accommodations.map((accommodation) => ({
    accommodationId: accommodation.id,
  }))
}

export async function generateMetadata({ params }: AccommodationPageProps) {
  const { accommodationId } = await params
  const accommodation = await fetchAccommodation(accommodationId)

  if (!accommodation) return { title: "Hospedaje no encontrado" }

  return {
    title: `${accommodation.name} | Sendero Sur`,
    description: accommodation.description,
  }
}

async function fetchAccommodation(id: string): Promise<Accommodation | null> {
  return getAccommodation(id) || null;
}

export default async function AccommodationPage({ params }: AccommodationPageProps) {
  const { accommodationId } = await params
  const accommodation = await fetchAccommodation(accommodationId)

  if (!accommodation) {
    notFound()
  }

  const city = getCity(accommodation.cityId)

  return <AccommodationDetail accommodation={accommodation} city={city} />
}
