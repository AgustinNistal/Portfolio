"use client"

import { Button } from "@/components/senderosur/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/senderosur/ui/dropdown-menu"
import { useLanguage } from "@/contexts/senderosur/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          {language === "es" ? (
            <span className="text-xl leading-none">🇦🇷</span>
          ) : (
            <span className="text-xl leading-none">🇺🇸</span>
          )}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("es")} className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl leading-none">🇦🇷</span>
          <span>Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl leading-none">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
