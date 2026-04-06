"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { format } from "date-fns"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  reservations: Reservation[]
  comments: UserComment[]
}

export interface Reservation {
  id: string
  accommodationId: string
  accommodationName: string
  cityName: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: Date
}

export interface UserComment {
  id: string
  accommodationId: string
  accommodationName: string
  rating: number
  text: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  addReservation: (reservation: Omit<Reservation, "id" | "createdAt">) => Promise<void>
  addComment: (comment: Omit<UserComment, "id" | "createdAt">) => Promise<void>
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>
  cancelReservation: (reservationId: string) => Promise<void>
  addPackReservations: (reservations: Omit<Reservation, "id" | "createdAt">[]) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function toISODateOnly(value: Date | string) {
  const d = typeof value === "string" ? new Date(value) : value
  return format(d, "yyyy-MM-dd")
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "mock-user-1",
    name: "Usuario de Prueba",
    email: "test@senderosur.com",
    reservations: [],
    comments: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrap = async () => {
      const savedUser = localStorage.getItem("sendero-sur-user")
      if (savedUser) {
        try {
            const parsed = JSON.parse(savedUser)
            parsed.reservations = parsed.reservations?.map((r: Reservation) => ({
                ...r,
                checkIn: new Date(r.checkIn),
                checkOut: new Date(r.checkOut),
                createdAt: new Date(r.createdAt),
            })) || []
            parsed.comments = parsed.comments?.map((c: UserComment) => ({
                ...c,
                createdAt: new Date(c.createdAt),
            })) || []
            setUser(parsed)
        } catch {}
      }
      setIsLoading(false)
    }
    void bootstrap()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => { return true }
  const register = async (name: string, email: string, password: string): Promise<boolean> => { return true }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sendero-sur-user")
  }

  const addReservation = async (reservation: Omit<Reservation, "id" | "createdAt">) => {
    if (!user) return
    const newReservation: Reservation = {
      ...reservation,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    const updated = { ...user, reservations: [...user.reservations, newReservation] }
    setUser(updated)
    localStorage.setItem("sendero-sur-user", JSON.stringify(updated))
  }

  const addPackReservations = async (reservations: Omit<Reservation, "id" | "createdAt">[]) => {
    if (!user) return
    const newReservations: Reservation[] = reservations.map(res => ({
      ...res,
      id: crypto.randomUUID(),
      createdAt: new Date()
    }));
    const updated = { ...user, reservations: [...user.reservations, ...newReservations] }
    setUser(updated)
    localStorage.setItem("sendero-sur-user", JSON.stringify(updated))
  }

  const addComment = async (comment: Omit<UserComment, "id" | "createdAt">) => {
    if (!user) return
    const newComment: UserComment = {
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    const updated = { ...user, comments: [...user.comments, newComment] }
    setUser(updated)
    localStorage.setItem("sendero-sur-user", JSON.stringify(updated))
  }

  const updateProfile = async (data: { name?: string; phone?: string }) => {
    if (!user) return
    const updatedUser = { ...user, ...data };
    setUser(updatedUser)
    localStorage.setItem("sendero-sur-user", JSON.stringify(updatedUser))
  }

  const cancelReservation = async (reservationId: string) => {
    if (!user) return
    const updated = {
      ...user,
      reservations: user.reservations.map((r) =>
        r.id === reservationId ? { ...r, status: "cancelled" as const } : r
      ),
    }
    setUser(updated)
    localStorage.setItem("sendero-sur-user", JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, addReservation, addComment, updateProfile, cancelReservation, addPackReservations }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
