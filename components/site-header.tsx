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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" 
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
              className="h-10 w-auto transition-transform duration-200 hover:scale-105"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link 
              href="/a-propos" 
              className={`${scrolled ? 'text-primary' : 'text-white/90'} hover:text-primary-light transition-colors duration-200 font-semibold backdrop-blur-sm px-3 py-1.5 rounded-full ${!scrolled && 'bg-primary-dark/30'}`}
            >
              À Propos
            </Link>
            <Link href="/commencer">
              <Button 
                variant="default" 
                className={`${
                  scrolled 
                    ? "bg-primary text-white hover:bg-primary-dark" 
                    : "bg-white text-primary hover:bg-white/90"
                } font-semibold transition-all duration-200 rounded-full px-6`}
              >
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
              className={`${scrolled ? 'text-primary' : 'text-primary-dark'} hover:bg-transparent`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 animate-fade-in">
          <div className="py-6 px-4 bg-white shadow-lg border-t border-gray-100">
            <nav className="flex flex-col space-y-5">
              <Link 
                href="/a-propos" 
                className="text-primary hover:text-primary-dark font-semibold transition-colors px-2 py-2 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link 
                href="/commencer" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="default" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold rounded-full">
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

