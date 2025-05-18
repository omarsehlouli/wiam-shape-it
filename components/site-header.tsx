import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo1.png"
              alt="Shape It"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/commencer">
              <Button variant="default" className="bg-primary hover:bg-primary-light text-white">
                Commencer
              </Button>
            </Link>
            <Link href="/a-propos" className="text-primary hover:text-primary-light transition-colors">
              À Propos
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-primary hover:text-primary-light transition-colors">
                <span>Nos Centres</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/centres/paris">Paris</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/centres/lyon">Lyon</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/centres/bordeaux">Bordeaux</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

