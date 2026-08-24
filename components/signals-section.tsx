"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type Signal = {
  date: string
  title: string
  note: string
  href?: string
  status?: string
}

const signals: Signal[] = [
  {
    date: "2026.08.10",
    title: "UNBUILT",
    note: "NO SITE. ONE BUILD. One registered U.S. business with no active marketing website gets a Dam Built package — on us. Not a raffle. First qualified applicant. SUBMISSIONS OPEN.",
    href: "/unbuilt",
  },
  {
    date: "2026.07.22",
    title: "AIR CENTER",
    note: "Air Center Helicopters — live at flyaircenter.com. Niche airlift operation on Full Stream: site, materials, and ongoing brand support.",
    status: "LIVE",
    href: "https://flyaircenter.com",
  },
  {
    date: "2026.07.08",
    title: "MINE SERVICE",
    note: "Mine Service Inc. — mineserviceinc.com. Full site currently in production for their industrial and field operations.",
    status: "IN PRODUCTION",
    href: "https://mineserviceinc.com",
  },
  {
    date: "2026.06.18",
    title: "THE LIT ELF",
    note: "The Lit Elf — thelitelf.com. Seasonal lighting company site in production. Launch staged for the active season.",
    status: "IN PRODUCTION",
    href: "https://thelitelf.com",
  },
  {
    date: "2026.05.30",
    title: "HARPY",
    note: "Harpy Industries — harpyindustries.com. Live Open Water partnership covering FSO / PERSEC / FCL support and defense-sector positioning.",
    status: "LIVE",
    href: "https://harpyindustries.com",
  },
]

export function SignalsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="signals"
      ref={sectionRef}
      className="relative py-32 pl-6 md:pl-28"
    >
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          01 / Updates
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          LATEST NEWS
        </h2>
      </div>

      <div
        ref={(el) => {
          scrollRef.current = el
          cardsRef.current = el
        }}
        className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {signals.map((signal, index) => (
          <SignalCard key={index} signal={signal} index={index} />
        ))}
      </div>
    </section>
  )
}

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  const isExternal = Boolean(signal.href?.startsWith("http"))
  const ctaLabel = isExternal ? "Visit site" : "View offer"

  const ctaClassName = cn(
    "group/cta mt-6 inline-flex items-center gap-2",
    "font-mono text-[10px] uppercase tracking-[0.25em] text-accent",
    "transition-all duration-300 ease-out",
    "hover:gap-3 hover:translate-x-1"
  )

  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2"
      )}
    >
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          {signal.status ? (
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent border border-accent/40 px-2 py-0.5">
              {signal.status}
            </span>
          ) : (
            <time className="font-mono text-[10px] text-muted-foreground/60">
              {signal.date}
            </time>
          )}
        </div>

        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {signal.title}
        </h3>

        {/* Orange line still expands on card hover */}
        <div className="w-12 h-px bg-accent/60 mb-6 group-hover:w-full transition-all duration-500" />

        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          {signal.note}
        </p>

        {/* Only this is clickable */}
        {signal.href &&
          (isExternal ? (
            <a
              href={signal.href}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClassName}
            >
              <span>{ctaLabel}</span>
              <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                →
              </span>
            </a>
          ) : (
            <Link href={signal.href} className={ctaClassName}>
              <span>{ctaLabel}</span>
              <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                →
              </span>
            </Link>
          ))}

        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}