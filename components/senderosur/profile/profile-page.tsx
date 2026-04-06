"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { User, Calendar, MessageSquare, MapPin, Star, Edit2, Save, X, Clock, CreditCard, Users } from "lucide-react"
import { useAuth } from "@/contexts/senderosur/auth-context"
import { Button } from "@/components/senderosur/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/senderosur/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/senderosur/ui/tabs"
import { Input } from "@/components/senderosur/ui/input"
import { Label } from "@/components/senderosur/ui/label"
import { Badge } from "@/components/senderosur/ui/badge"
import { useLanguage } from "@/contexts/senderosur/language-context"
import { enUS } from "date-fns/locale"

export function ProfilePage() {
  const { t, language } = useLanguage()
  const dateLocale = language === "en" ? enUS : es
  
  const router = useRouter()
  const { user, isLoading, updateProfile, cancelReservation } = useAuth()
  const [activeTab, setActiveTab] = useState("reservas")
  const [isCancelling, setIsCancelling] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setEditName(user.name)
      setEditPhone(user.phone || "")
    }
  }, [user])

  // Handle hash navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash === "reservas" || hash === "datos" || hash === "comentarios") {
        setActiveTab(hash)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  const handleSaveProfile = () => {
    updateProfile({ name: editName, phone: editPhone })
    setIsEditing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">{t("profile.reservations.status.confirmed") || "Confirmada"}</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">{t("profile.reservations.status.pending") || "Pendiente"}</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">{t("profile.reservations.status.cancelled") || "Cancelada"}</Badge>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-flex">
            <TabsTrigger value="reservas" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.tabs.reservations") || "Mis Reservas"}</span>
              <span className="sm:hidden">{t("profile.tabs.reservations_short") || "Reservas"}</span>
            </TabsTrigger>
            <TabsTrigger value="datos" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.tabs.personal_data") || "Datos Personales"}</span>
              <span className="sm:hidden">{t("profile.tabs.personal_data_short") || "Datos"}</span>
            </TabsTrigger>
            <TabsTrigger value="comentarios" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{t("profile.tabs.comments") || "Mis Comentarios"}</span>
              <span className="sm:hidden">{t("profile.tabs.comments_short") || "Comentarios"}</span>
            </TabsTrigger>
          </TabsList>

          {/* Reservas Tab */}
          <TabsContent value="reservas" className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground">{t("profile.reservations.title") || "Mis Reservas"}</h2>
            {user.reservations.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-2">{t("profile.reservations.empty.title") || "No tienes reservas aún"}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t("profile.reservations.empty.desc") || "Explora nuestros hospedajes y reserva tu próxima aventura"}
                  </p>
                  <Button onClick={() => router.push("/hospedajes")} className="bg-primary hover:bg-primary/90">
                    {t("profile.reservations.empty.action") || "Ver Hospedajes"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {user.reservations
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((reservation) => (
                    <Card key={reservation.id} className="bg-card border-border overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 h-32 md:h-auto bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-12 h-12 text-primary/50" />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                              <div>
                                <h3 className="font-serif text-xl text-foreground">{reservation.accommodationName}</h3>
                                <p className="text-muted-foreground flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {reservation.cityName}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                {reservation.status === "confirmed" && new Date(reservation.checkIn) > new Date() && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={async () => {
                                      if (confirm(t("profile.reservations.cancel_confirm") || "¿Estás seguro de que deseas cancelar esta reserva?")) {
                                        setIsCancelling(reservation.id)
                                        await cancelReservation(reservation.id)
                                        setIsCancelling(null)
                                      }
                                    }}
                                    disabled={isCancelling === reservation.id}
                                    className="text-destructive hover:bg-destructive/10 border-destructive/20"
                                  >
                                    {isCancelling === reservation.id ? (t("profile.reservations.cancelling") || "Cancelando...") : (t("profile.reservations.cancel") || "Cancelar")}
                                  </Button>
                                )}
                                {getStatusBadge(reservation.status)}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">Check-in</p>
                                  <p className="font-medium text-foreground">
                                    {format(new Date(reservation.checkIn), "d MMM yyyy", { locale: dateLocale })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">Check-out</p>
                                  <p className="font-medium text-foreground">
                                    {format(new Date(reservation.checkOut), "d MMM yyyy", { locale: dateLocale })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">{t("profile.reservations.guests") || "Huéspedes"}</p>
                                  <p className="font-medium text-foreground">{reservation.guests}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">Total</p>
                                  <p className="font-medium text-foreground">
                                    ${reservation.totalPrice.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {t("profile.reservations.booked_on") || "Reservado el"}
                              {" "}
                              {format(new Date(reservation.createdAt), "d 'de' MMMM, yyyy", { locale: dateLocale })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="datos" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-foreground">{t("profile.personal_data.title") || "Datos Personales"}</h2>
              {!isEditing && (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  {t("profile.personal_data.edit") || "Editar"}
                </Button>
              )}
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>{t("profile.personal_data.account_info") || "Información de la cuenta"}</CardTitle>
                <CardDescription>{t("profile.personal_data.manage_info") || "Gestiona tu información personal"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("profile.personal_data.full_name") || "Nombre completo"}</Label>
                      <Input
                        id="name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} disabled className="bg-muted border-border" />
                      <p className="text-xs text-muted-foreground">{t("profile.personal_data.email_cannot_change") || "El email no puede ser modificado"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("profile.personal_data.phone") || "Teléfono"}</Label>
                      <Input
                        id="phone"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        placeholder="+54 11 1234-5678"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="gap-2 bg-primary hover:bg-primary/90">
                        <Save className="w-4 h-4" />
                        {t("profile.personal_data.save") || "Guardar"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setEditName(user.name)
                          setEditPhone(user.phone || "")
                        }}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        {t("profile.personal_data.cancel") || "Cancelar"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{t("profile.personal_data.name") || "Nombre"}</span>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{t("profile.personal_data.phone") || "Teléfono"}</span>
                      <span className="font-medium text-foreground">{user.phone || (t("profile.personal_data.not_specified") || "No especificado")}</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-muted-foreground">{t("profile.personal_data.member_since") || "Miembro desde"}</span>
                      <span className="font-medium text-foreground">
                        {format(new Date(), "MMMM yyyy", { locale: dateLocale })}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>{t("profile.stats.title") || "Estadísticas"}</CardTitle>
                <CardDescription>{t("profile.stats.desc") || "Tu actividad en Sendero Sur"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <p className="text-3xl font-serif text-primary">{user.reservations.length}</p>
                    <p className="text-sm text-muted-foreground">{t("profile.stats.reservations") || "Reservas"}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/10">
                    <p className="text-3xl font-serif text-accent">{user.comments.length}</p>
                    <p className="text-sm text-muted-foreground">{t("profile.stats.comments") || "Comentarios"}</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted col-span-2 md:col-span-1">
                    <p className="text-3xl font-serif text-foreground">
                      {user.reservations.filter((r) => r.status === "confirmed").length}
                    </p>
                    <p className="text-sm text-muted-foreground">{t("profile.stats.trips_completed") || "Viajes completados"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comentarios" className="space-y-4">
            <h2 className="font-serif text-2xl text-foreground">{t("profile.comments.title") || "Mis Comentarios"}</h2>
            {user.comments.length === 0 ? (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="font-serif text-xl text-foreground mb-2">{t("profile.comments.empty.title") || "No has dejado comentarios aún"}</h3>
                  <p className="text-muted-foreground mb-4">{t("profile.comments.empty.desc") || "Después de tu estadía, podrás compartir tu experiencia"}</p>
                  <Button onClick={() => router.push("/hospedajes")} variant="outline">
                    {t("profile.comments.empty.action") || "Explorar Hospedajes"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {user.comments
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((comment) => (
                    <Card key={comment.id} className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-serif text-lg text-foreground">{comment.accommodationName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(comment.createdAt), "d 'de' MMMM, yyyy", { locale: dateLocale })}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < comment.rating ? "fill-accent text-accent" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground">{comment.text}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
