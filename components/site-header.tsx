"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-primary-100" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 relative z-10">
            <Image
              src="/logo1.png"
              alt="Shape It"
              width={120}
              height={40}
              className={`h-9 w-auto transition-all duration-300 ${scrolled ? 'opacity-90' : 'brightness-0 invert opacity-80 hover:opacity-100'}`}
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm">
            <Link 
              href="/a-propos" 
              className={`transition-colors duration-300 tracking-[0.12em] uppercase text-[11px] font-medium ${
                scrolled ? 'text-primary hover:text-primary-dark' : 'text-white/70 hover:text-white'
              }`}
            >
              À Propos
            </Link>
            <Link href="/commencer">
              <Button 
                className={`font-medium tracking-[0.1em] uppercase text-[11px] rounded-full px-7 py-5 transition-all duration-300 ${
                  scrolled 
                    ? "bg-primary text-white hover:bg-primary-dark" 
                    : "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
                }`}
              >
                Commencer
              </Button>
            </Link>
          </nav>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={scrolled ? 'text-primary' : 'text-white/80 hover:text-white'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0">
          <div className="py-6 px-4 bg-white/95 backdrop-blur-xl shadow-lg border-t border-primary-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/a-propos" 
                className="text-primary hover:text-primary-dark font-medium tracking-[0.1em] uppercase text-[11px] px-2 py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link href="/commencer" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-white hover:bg-primary-dark font-medium tracking-[0.1em] uppercase text-[11px] rounded-full">
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
