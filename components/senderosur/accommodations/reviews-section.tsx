"use client"

import { useState } from "react"
import { Star, ThumbsUp, Send } from "lucide-react"
import { Button } from "@/components/senderosur/ui/button"
import { Textarea } from "@/components/senderosur/ui/textarea"
import { useAuth } from "@/contexts/senderosur/auth-context"
import type { Accommodation } from "@/lib/senderosur/data"

interface ReviewsSectionProps {
  accommodation: Accommodation
}

const sampleReviews = [
  {
    id: "1",
    author: "María L.",
    rating: 5,
    date: "2024-10-15",
    text: "Una experiencia increíble. El domo era exactamente como en las fotos, con una vista espectacular. El anfitrión muy atento y la ubicación perfecta para explorar la zona.",
    helpful: 12,
  },
  {
    id: "2",
    author: "Carlos M.",
    rating: 5,
    date: "2024-09-28",
    text: "Lugar mágico para desconectar. Las noches estrelladas desde el domo son inolvidables. Muy limpio y con todas las comodidades necesarias.",
    helpful: 8,
  },
  {
    id: "3",
    author: "Ana G.",
    rating: 4,
    date: "2024-09-10",
    text: "Muy buena experiencia en general. El lugar es hermoso y tranquilo. Solo sugeriría mejorar la señal de wifi, pero para desconectar está perfecto.",
    helpful: 5,
  },
]

export function ReviewsSection({ accommodation }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const { user, addComment } = useAuth()

  const [newRating, setNewRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const displayedReviews = showAll ? sampleReviews : sampleReviews.slice(0, 2)

  // Check if user has a confirmed reservation for this accommodation
  const hasReservation = user?.reservations.some(
    (r) => r.accommodationId === accommodation.id && r.status === "confirmed",
  )

  // Check if user already commented on this accommodation
  const hasCommented = user?.comments.some((c) => c.accommodationId === accommodation.id)

  const handleSubmitReview = async () => {
    if (!user || newRating === 0 || !newComment.trim()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    addComment({
      accommodationId: accommodation.id,
      accommodationName: accommodation.name,
      rating: newRating,
      text: newComment.trim(),
    })

    setIsSubmitting(false)
    setSubmitted(true)
    setNewRating(0)
    setNewComment("")
  }

  return (
    <div className="border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-foreground">Reseñas</h2>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-accent text-accent" />
          <span className="font-medium text-lg">{accommodation.rating}</span>
          <span className="text-muted-foreground">({accommodation.reviewCount} reseñas)</span>
        </div>
      </div>

      {user && hasReservation && !hasCommented && !submitted && (
        <div className="bg-muted rounded-lg p-6 mb-6">
          <h3 className="font-medium text-foreground mb-4">Dejá tu comentario</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground mr-2">Tu calificación:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setNewRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${
                    i < (hoverRating || newRating) ? "fill-accent text-accent" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Contanos sobre tu experiencia..."
            className="mb-4 bg-background border-border"
            rows={4}
          />
          <Button
            onClick={handleSubmitReview}
            disabled={newRating === 0 || !newComment.trim() || isSubmitting}
            className="gap-2 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Enviando..." : "Enviar comentario"}
          </Button>
        </div>
      )}

      {submitted && (
        <div className="bg-primary/10 rounded-lg p-6 mb-6 text-center">
          <p className="text-primary font-medium">¡Gracias por tu comentario!</p>
          <p className="text-sm text-muted-foreground">Tu reseña ayudará a otros viajeros.</p>
        </div>
      )}

      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{review.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("es-AR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
            </div>

            <p className="text-muted-foreground mb-3">{review.text}</p>

            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>Útil ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      {sampleReviews.length > 2 && (
        <Button variant="outline" onClick={() => setShowAll(!showAll)} className="mt-6">
          {showAll ? "Ver menos reseñas" : `Ver las ${sampleReviews.length} reseñas`}
        </Button>
      )}
    </div>
  )
}
