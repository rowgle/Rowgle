"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import gsap from "gsap"

export default function UnbuiltAgreementPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
      }
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          delay: 0.15,
          ease: "power3.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="relative min-h-screen">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <section
        ref={sectionRef}
        className="relative z-10 pt-32 pb-40 pl-6 md:pl-28 pr-6 md:pr-12"
      >
        {/* Header */}
        <div ref={headerRef} className="mb-16 max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            00 / Unbuilt Agreement
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-6xl md:text-8xl tracking-tight leading-[0.9]">
            UNBUILT<br />
            AGREEMENT
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
            Terms for the one-time Dam Built package awarded through Unbuilt.
            Read before applying.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Last updated: August 5, 2026
          </p>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="max-w-2xl space-y-12 text-sm md:text-base text-foreground/75 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              01 / The Offer
            </h2>
            <p>
              Rowgle (“we,” “us”) will provide one (1) complimentary Dam Built website
              package to one (1) selected applicant (“you,” “Client”) under the
              Unbuilt program. This is not a raffle, sweepstakes, or purchase-required
              promotion. Selection is based on eligibility and verification.
              Submission of an application does not guarantee selection.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              02 / Eligibility
            </h2>
            <p className="mb-4">To qualify, you must:</p>
            <ul className="space-y-2 list-none">
              <li>— Be a U.S.-registered business (LLC, corporation, or equivalent)</li>
              <li>— Have no active marketing website at the time of application</li>
              <li>— Be the decision-maker authorized to approve scope and content</li>
              <li>— Complete verification and sign this agreement before work begins</li>
              <li>— Provide required assets and feedback within agreed timelines</li>
            </ul>
            <p className="mt-4">
              Rowgle may decline any application that does not meet these criteria,
              for any reason, at its sole discretion.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              03 / Scope of Work
            </h2>
            <p className="mb-4">
              The awarded package is limited to the Dam Built offering described at{" "}
              <Link href="/proposal" className="text-accent hover:underline">
                rowgle.com/proposal
              </Link>
              . Unless otherwise agreed in writing, scope includes:
            </p>
            <ul className="space-y-2 list-none">
              <li>— Design and development of the agreed Stream page set</li>
              <li>— Mobile-responsive layout</li>
              <li>— Basic on-page SEO setup</li>
              <li>— Contact / inquiry path</li>
              <li>— Deployment to a domain owned by the Client</li>
              <li>— Two (2) rounds of revisions</li>
            </ul>
            <p className="mt-4">
              Not included: unlimited revisions, ongoing retainers, custom
              applications, ecommerce catalogs, full brand identity systems,
              copywriting beyond reasonable page content support, or rush weekend
              delivery.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              04 / Revisions
            </h2>
            <p>
              Client receives two (2) revision rounds after the initial draft is
              delivered. A revision round means consolidated feedback in one pass.
              Additional revisions, scope changes, or new pages beyond Stream are
              outside this agreement and may be quoted separately or declined.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              05 / Timeline
            </h2>
            <p>
              Target delivery is approximately fourteen (14) to twenty-one (21) days
              after Rowgle receives required assets (logo, copy, domain access, and
              any brand materials). Delays in Client feedback or asset delivery
              pause the timeline. Rowgle is not responsible for launch delays caused
              by Client inaction, third-party domain registrars, or hosting limits
              outside our control.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              06 / Client Responsibilities
            </h2>
            <ul className="space-y-2 list-none">
              <li>— Provide accurate business and contact information</li>
              <li>— Own or obtain a domain for deployment</li>
              <li>— Supply logo, text, and images in a usable form, or approve Rowgle’s use of placeholders until final assets arrive</li>
              <li>— Respond to requests within a reasonable time (generally 3–5 business days)</li>
              <li>— Ensure content does not infringe third-party rights</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              07 / Payment
            </h2>
            <p>
              There is no fee for the selected Unbuilt build. The work is provided
              at $0 due under this program. The Dam Built package has standard commercial
              value as listed on our proposal page; that value is waived for the
              winner only. This offer is one-time, non-transferable, and has no cash
              equivalent.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              08 / Ownership & Portfolio
            </h2>
            <p className="mb-4">
              Upon completion and delivery, Client owns the delivered website files
              and content provided by Client. Domain registration and hosting accounts
              remain in Client’s name unless secured by Rowgle due to no domain status at time of Unbuilt award.
            </p>
            <p>
              Rowgle may display the project in its portfolio, website, social
              channels, and case studies, including screenshots, description, and
              Client business name, unless Client requests reasonable limitations in
              writing before launch. Rowgle retains ownership of pre-existing tools,
              frameworks, and internal process materials.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              09 / Silence & Termination
            </h2>
            <p>
              If Client becomes unresponsive for seven (7) or more consecutive days
              during an active phase (after selection or during build), Rowgle may
              pause or terminate the project. If terminated for non-response or
              material breach of these terms, Rowgle has no obligation to complete or
              re-award the build. Either party may end the engagement if eligibility
              was misrepresented.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              10 / No Warranties & Limitation
            </h2>
            <p>
              The site is delivered as a professional marketing build under the Dam Built
              scope. Rowgle does not guarantee rankings, leads, sales, or uninterrupted
              third-party services. To the maximum extent permitted by law, Rowgle’s
              liability under this agreement is limited to re-performance of the Full Stream
              scope or, at our option, a good-faith attempt to resolve defects in our
              delivered work. This program is not legal, financial, or business advice.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              11 / Acceptance
            </h2>
            <p>
              Submitting an Unbuilt application and checking the required
              confirmations constitutes acknowledgment of these terms. Final selection
              requires explicit confirmation of this agreement before kickoff. Rowgle
              may update this page; the version in effect at the time of selection
              applies to the awarded project.
            </p>
          </div>

          {/* Contact */}
          <div className="border border-border/40 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
              Contact
            </p>
            <p>
              Questions about Unbuilt or this agreement:{" "}
              <a
                href="mailto:hello@rowgle.com"
                className="text-accent hover:underline"
              >
                hello@rowgle.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Link
              href="/unbuilt"
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              ← Back to Unbuilt
            </Link>
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}