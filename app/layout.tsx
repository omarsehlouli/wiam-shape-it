import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Shape It - no limits.",
  description: "Un studio privé dédié à votre évolution physique et mentale. Une expérience sur-mesure, dans un cadre intime, exclusif et motivant.",
  generator: 'oseh',
  icons: {
    icon: '/logo3.png',
    apple: '/logo3.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/logo3.png" />
        <link rel="apple-touch-icon" href="/logo3.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

