"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const packages = [
  {
    title: "Lodge",
    medium: "Tier 01 · $249/mo",
    description:
      "Free custom business site + steady monthly support. Updates, bug fixes, light content changes, and basic upkeep — capacity when you need it.",
    href: "/proposal#lodge",
  },
  {
    title: "Dam Built",
    medium: "Tier 02 · $499/mo",
    description:
      "Free brand-ready site + active monthly ops. Everything in Lodge, plus marketing materials, more revision capacity, and branding collaboration.",
    href: "/proposal#dam-built",
  },
  {
    title: "Full Stream",
    medium: "Tier 03 · $999/mo",
    description:
      "Free full system build + priority monthly partnership. Higher capacity for changes, marketing support, and ongoing brand direction.",
    href: "/proposal#full-stream",
  },
  {
    title: "Open Water",
    medium: "Tier 04 · Custom",
    description:
      "Custom scope. Free-build model where it fits; monthly retainer and deliverables defined together for the real job.",
    href: "/contact",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const cards = gridRef.current?.querySelectorAll("a")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 40, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12"
    >
      <div ref={headerRef} className="mb-16 flex items-end justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Systems
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            PACKAGE MODEL
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Site build $0. Monthly partnership is the product. Click a tier to
          review and confirm direction.
        </p>
      </div>

      <div className="mb-8 border border-border/40 p-6 md:p-8 max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
          Core offer
        </p>
        <p className="text-sm text-foreground/75 leading-relaxed">
          Full custom website included at no upfront cost with every partnership.
          You invest monthly for updates, fixes, materials, brand support, and
          defined capacity — not a full-time hire.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
      >
        {packages.map((pkg, index) => (
          <Link
            key={pkg.title}
            href={pkg.href}
            className={cn(
              "group relative border border-border/40 p-6 md:p-8 flex flex-col min-h-[220px]",
              "transition-all duration-300 hover:border-accent/60 hover:-translate-y-1"
            )}
          >
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex items-start justify-between gap-4 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {pkg.medium}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="relative z-10 font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors duration-300">
              {pkg.title}
            </h3>

            <p className="relative z-10 font-mono text-xs text-muted-foreground leading-relaxed flex-1">
              {pkg.description}
            </p>

            <p className="relative z-10 mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              {pkg.href === "/contact" ? "Contact us →" : "View details →"}
            </p>

            <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-full h-px bg-accent" />
              <div className="absolute top-0 right-0 w-px h-full bg-accent" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}