"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const clients = [
  {
    number: "01",
    highlight: "AIR CENTER",
    rest: " HELICOPTERS",
    href: "https://flyaircenter.com",
    note: "GLOBAL AIRLIFT SUPPORT PROVIDER · Worldwide",
    status: "LIVE",
  },
  {
    number: "02",
    highlight: "HARPY",
    rest: " INDUSTRIES",
    href: "https://harpyindustries.com",
    note: "FSO / PERSEC / FCL SUPPORT · Texas",
    status: "LIVE",
  },
  {
    number: "03",
    highlight: "THE",
    rest: " LIT ELF",
    href: "https://rowgle.com",
    note: "SEASONAL LIGHTING COMPANY · Colorado",
    status: "IN PRODUCTION",
  },
  {
    number: "04",
    highlight: "REDACTED",
    rest: " FACE",
    href: "https://redactedface.com",
    note: "OPERATIONAL SECURITY · Unknown",
    status: "QUEUED",
  },
  {
    number: "05",
    highlight: "BRIGADE",
    rest: " FENCE",
    href: "https://brigadefence.com",
    note: "AFFORDABLE FENCE COMPANY · Texas",
    status: "QUEUED",
  },
  {
    number: "06",
    highlight: "REST",
    rest: " TIGHT",
    href: "https://resttight.com",
    note: "PHYSICAL SECURITY OPERATIONS · Texas",
    status: "QUEUED",
  },
]

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !listRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      const items = listRef.current?.querySelectorAll("article")
      items?.forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.1 * i,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative min-h-screen py-24 md:py-32 pl-6 md:pl-28 pr-6 md:pr-16"
    >
      {/* Quiet index rail */}
      <div
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground z-20"
        aria-hidden="true"
      >
        {clients.map((c) => (
          <span key={c.number} className="hover:text-accent transition-colors">
            {c.number}
          </span>
        ))}
      </div>

      {/* Label only */}
<div ref={headerRef} className="mb-28 md:mb-36">
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
    00 / Portfolio
  </span>
</div>

      {/* Client list */}
      <div ref={listRef} className="space-y-28 md:space-y-36 max-w-4xl">
        {clients.map((client) => (
          <article key={client.number} className="group">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {client.number} / CLIENT
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent border border-accent/40 px-2 py-0.5">
                {client.status}
              </span>
            </div>

            <Link
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-3"
            >
              <h2 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none">
                <HighlightText parallaxSpeed={0.4}>{client.highlight}</HighlightText>
                <span>{client.rest}</span>
              </h2>
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <p className="font-mono text-sm text-muted-foreground">{client.note}</p>
              <Link
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent hover:underline"
              >
                Visit site →
              </Link>
            </div>

            <div className="mt-10 h-px bg-border w-full max-w-[6rem] md:max-w-[12rem] transition-all duration-500 ease-out group-hover:max-w-full group-hover:bg-accent" />
          </article>
        ))}
      </div>

            {/* Client list ends above */}

      {/* Social */}
      <div className="pt-20 md:pt-28 max-w-4xl border-t border-border/30">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Stay Connected
        </h3>
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="https://x.com/rowgle"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors"
          >
            X / @rowgle
          </a>
          <a
            href="https://www.instagram.com/rowgle"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors"
          >
            Instagram / @rowgle
          </a>
        </div>
      </div>

      {/* Logo + Closing */}
      <div className="pt-10 max-w-4xl">
        <img
          src="/orangeharp.png"
          alt="Rowgle"
          className="h-12 md:h-14 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 mb-8"
        />
      </div>

      {/* Back link */}
      <div className="mt-24">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  )
}