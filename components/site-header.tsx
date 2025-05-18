"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/a-propos" className="text-primary hover:text-primary-light transition-colors">
              À Propos
            </Link>
            <Link href="/commencer">
              <Button variant="default" className="bg-primary hover:bg-primary-light text-white">
                Commencer
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-primary" />
              ) : (
                <Menu className="h-6 w-6 text-primary" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 bg-background border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/a-propos" 
                className="text-primary hover:text-primary-light transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                href="/commencer" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="default" className="w-full bg-primary hover:bg-primary-light text-white">
                  Commencer
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

