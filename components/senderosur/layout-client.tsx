"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, User, LogOut, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/senderosur/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/senderosur/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/senderosur/ui/dropdown-menu"
import { useAuth } from "@/contexts/senderosur/auth-context"
import { AuthModal } from "@/components/senderosur/auth-modal"
import { LanguageSwitcher } from "@/components/senderosur/language-switcher"
import { useLanguage } from "@/contexts/senderosur/language-context"

// We remove the static navLinks and create them dynamically inside the component

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  const navLinks = [
    { href: "/senderosur", label: t("nav.home") },
    { href: "/senderosur/rutas", label: t("nav.routes") },
    { href: "/senderosur/hospedajes", label: t("nav.accommodations") },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/senderosur" className="font-[family-name:var(--font-barrio)] text-2xl text-primary">
              Sendero Sur
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/senderosur/perfil" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("nav.profile")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/senderosur/perfil#reservas" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {t("nav.reservations")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                      <LogOut className="h-4 w-4" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("nav.login")}
                </Button>
              )}

              <LanguageSwitcher />

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          pathname === link.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                        }`}
                      >
                        <MapPin className="h-5 w-5" />
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-foreground text-background py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-[family-name:var(--font-barrio)] text-2xl text-primary mb-4">Sendero Sur</h3>
              <p className="text-background/70 text-sm">
                {t("footer.slogan")}
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">{t("footer.routes.title")}</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <Link href="/senderosur/rutas/costera-atlantica" className="hover:text-primary transition-colors">
                    Costera Atlántica
                  </Link>
                </li>
                <li>
                  <Link href="/senderosur/rutas/andina-norte" className="hover:text-primary transition-colors">
                    Andina Norte
                  </Link>
                </li>
                <li>
                  <Link href="/senderosur/rutas/litoral" className="hover:text-primary transition-colors">
                    Litoral
                  </Link>
                </li>
                <li>
                  <Link href="/senderosur/rutas/patagonica" className="hover:text-primary transition-colors">
                    Patagónica
                  </Link>
                </li>
                <li>
                  <Link href="/senderosur/rutas/vinedos" className="hover:text-primary transition-colors">
                    Viñedos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">{t("footer.contact.title")}</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>info@senderosur.com</li>
                <li>+54 11 1234-5678</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/50">
            © {new Date().getFullYear()} Sendero Sur. {t("footer.rights")}
          </div>
        </div>
      </footer>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  )
}
