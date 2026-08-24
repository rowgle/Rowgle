"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export function ColophonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header slide in
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Grid columns fade up with stagger
      if (gridRef.current) {
        const columns = gridRef.current.querySelectorAll(":scope > div")
        gsap.from(columns, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Footer fade in
      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
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
      id="colophon"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Contact</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">GET IN TOUCH</h2>
      </div>

      {/* Multi-column layout */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
        {/* Legal */}
<div className="col-span-1">
  <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
    Legal
  </h4>
  <ul className="space-y-2">
    <li>
      <Link
        href="/legal#privacy"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Privacy Policy
      </Link>
    </li>
    <li>
      <Link
        href="/legal#terms"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Terms of Service
      </Link>
    </li>
    <li>
      <Link
        href="/legal#data"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Data Disclaimer
      </Link>
    </li>
  </ul>
</div>

        {/* Creative */}
<div className="col-span-1">
  <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
    Creative
  </h4>
  <ul className="space-y-2">
    <li>
      <Link
        href="/services#brand-identity"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Brand Identity
      </Link>
    </li>
    <li>
      <Link
        href="/services#visual-systems"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Visual Systems
      </Link>
    </li>
    <li>
      <Link
        href="/services#art-direction"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Art Direction
      </Link>
    </li>
  </ul>
</div>

{/* Digital */}
<div className="col-span-1">
  <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
    Digital
  </h4>
  <ul className="space-y-2">
    <li>
      <Link
        href="/services#web-experiences"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Web Experiences
      </Link>
    </li>
    <li>
      <Link
        href="/services#digital-products"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Digital Products
      </Link>
    </li>
    <li>
      <Link
        href="/services#content-systems"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Content Systems
      </Link>
    </li>
  </ul>
</div>

        {/* Location */}
<div className="col-span-1">
  <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
    Location
  </h4>
  <ul className="space-y-2">
    <li className="font-mono text-xs text-foreground/80">Designed in USA</li>
    <li>
      <Link
        href="/review"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Fort Worth, Texas
      </Link>
    </li>
  </ul>
</div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hello@rowgle.com"
                className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                Email
              </a>
            </li>
            <li>
  <Link
    href="/inquiry"
    className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
  >
    Inquiry
  </Link>
</li>
          </ul>
        </div>

        {/* Companies */}
<div className="col-span-1">
  <h4 className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
    Companies
  </h4>
  <ul className="space-y-2">
    <li>
      <Link
        href="/about"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Rowgle
      </Link>
    </li>
    <li>
      <Link
        href="/harpy"
        className="font-mono text-xs text-foreground/80 hover:text-accent transition-colors duration-200"
      >
        Harpy Industries
      </Link>
    </li>
  </ul>
</div>
      </div>

      {/* Bottom copyright */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          © 2026 Rowgle. All rights reserved.
        </p>
        <Image
          src="/r-brand-mark-orange.png"
          alt="Rowgle"
          width={40}
          height={40}
          className="opacity-60 hover:opacity-100 transition-opacity"
        />
        <p className="font-mono text-[10px] text-muted-foreground">Designed with Precision. Built for Brand.</p>
      </div>
    </section>
  )
}
