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
    note: "GLOBAL AIRLIFT SUPPORT · Worldwide",
    status: "LIVE",
  },
  {
    number: "02",
    highlight: "MINE SERVICE",
    rest: " INC.",
    href: "https://mineservice-ckczquewl-rowgle-projects.vercel.app",
    note: "GENERAL CONTRACTING · Texas",
    status: "IN PRODUCTION",
  },
  {
    number: "03",
    highlight: "HARPY",
    rest: " INDUSTRIES",
    href: "https://harpyindustries.com",
    note: "FSO / PERSEC / FCL SUPPORT · Texas",
    status: "LIVE",
  },
  {
    number: "04",
    highlight: "THE",
    rest: " LIT ELF",
    href: "https://thelitelf.com",
    note: "SEASONAL LIGHTING COMPANY · Colorado",
    status: "IN PRODUCTION",
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
    highlight: "REDACTED",
    rest: " FACE",
    href: "https://redactedface.com",
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
      {/* Quiet index rail — click to jump */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 font-mono text-[10px] tracking-[0.3em] text-muted-foreground z-20">
        {clients.map((c) => (
          <button
            key={c.number}
            type="button"
            onClick={() => {
              document.getElementById(`client-${c.number}`)?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
            }}
            className="text-left hover:text-accent transition-colors"
          >
            {c.number}
          </button>
        ))}
      </div>

      {/* Label only */}
      <div ref={headerRef} className="mb-28 md:mb-36">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          00 / Portfolio
        </span>
      </div>

      {/* About — compact */}
      <div className="mb-28 md:mb-36 max-w-4xl">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-end">
          <div className="md:col-span-4">
            <div className="relative overflow-hidden border border-border">
              <img
                src="/redacted.png"
                alt="Nicholas Harp"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                023 / Harp, N.
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                TX / DoD
              </span>
            </div>
          </div>

          <div className="md:col-span-8 pb-1">
            <h2 className="font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight leading-none mb-6">
              FOUNDER
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-lg">
              The day job pays, but it doesn’t scratch the itch. I got tired of watching companies do serious work for three-letter agencies while sitting on websites that looked like they were built in a waiting room. Rowgle exists to fix that. Defense-first. Anyone with standards is welcome.
            </p>
          </div>
        </div>
      </div>

      {/* Client list */}
      <div ref={listRef} className="space-y-28 md:space-y-36 max-w-4xl">
        {clients.map((client) => (
          <article key={client.number} id={`client-${client.number}`} className="group">
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
          src="/r-brand-mark-orange.png"
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