import type { Metadata } from "next"
// import { Poppins } from "next/font/google"
import "./globals.css"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"

// Font Awesome CSS and config
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// const poppins = Poppins({ 
//   subsets: ["latin"],
//   weight: ['300', '400', '500', '600', '700'],
//   variable: '--font-poppins',
// })

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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo3.png" />
        <link rel="apple-touch-icon" href="/logo3.png" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

