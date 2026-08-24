import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

export const metadata: Metadata = {
  title: {
    default: "Rowgle — Designer for Defense Companies",
    template: "%s | Rowgle",
  },
  description:
    "From brand identity to full-stack development, Rowgle crafts complete digital experiences. Strategy, design, and code working together to bring your vision to life.",
  generator: "v0.app",
  applicationName: "Rowgle",
  keywords: ["web design", "branding", "graphic design", "web development", "digital studio", "creative agency", "UI/UX design", "e-commerce"],
  authors: [{ name: "Rowgle" }],
  creator: "Rowgle",
  publisher: "Rowgle",
  metadataBase: new URL("https://rowgle.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rowgle",
    title: "Rowgle — Designer for Defense Companies",
    description: "From brand identity to full-stack development, Rowgle crafts complete digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rowgle — Designer for Defense Companies",
    description: "From brand identity to full-stack development, Rowgle crafts complete digital experiences.",
  },
  icons: {
  icon: [
    {
      url: "/r-brand-favicon.png",
      type: "image/png",
    },
  ],
  apple: "/r-brand-favicon.png",
  shortcut: "/r-brand-favicon.png",
},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
