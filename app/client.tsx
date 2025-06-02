"use client"

import type React from "react"
import { Poppins, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ChatBot from "@/components/chat-bot"
import BackgroundAnimation from "@/components/background-animation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style jsx global>{`
          :root {
            --font-poppins: ${poppins.style.fontFamily};
            --font-space-grotesk: ${spaceGrotesk.style.fontFamily};
          }
          body {
            font-family: var(--font-poppins);
          }
          h1, h2, h3, h4, h5, h6, button, a {
            font-family: var(--font-space-grotesk);
          }
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen">
            <BackgroundAnimation />
            {children}
            <ChatBot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
