"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { HighlightText } from "@/components/highlight-text"
import Link from "next/link"

export default function ProposalPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [packageChoice, setPackageChoice] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      }

      const blocks = section.querySelectorAll(".proposal-block")
      if (blocks.length > 0) {
        gsap.from(blocks, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.1,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return

    setSending(true)
    setError(false)

    const packageLabel =
      packageChoice === "lodge"
        ? "Lodge — $249/mo (site included free)"
        : packageChoice === "dam-built"
          ? "Dam Built — $499/mo (site included free)"
          : packageChoice === "full-stream"
            ? "Full Stream — $999/mo (site included free)"
            : packageChoice === "open-water"
              ? "Open Water — Custom monthly / contract"
              : "None selected"

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("company", company || "N/A")
    formData.append("package", packageLabel)
    formData.append("notes", notes || "None")
    formData.append("_subject", `Proposal Selection — ${company || name}`)

    try {
      const res = await fetch("https://formspree.io/f/mzepewvg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const isValid =
    name.trim().length > 1 &&
    email.trim().length > 5 &&
    packageChoice !== "" &&
    accepted

  return (
    <main className="relative min-h-screen">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <section
        ref={sectionRef}
        className="relative z-10 pt-28 pb-40 px-6 md:px-12 max-w-3xl mx-auto"
      >
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            How We Work
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-none">
            YOUR SITE
            <br />
            <span className="inline-block">
              <HighlightText parallaxSpeed={0.4}>IS FREE</HighlightText>
            </span>
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Monthly Partnership · No Upfront Build Cost
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Rowgle designs and builds a full custom website at $0. You partner
            monthly for ongoing support — updates, fixes, materials, branding
            help, and real capacity when you need it. Not a full-time hire. A
            retainer you actually use.
          </p>
        </div>

        {/* How it works */}
        <div className="proposal-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">01</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Pick a monthly partnership tier. The full website build is
                included at no charge.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">02</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                We design, build, and launch. Monthly service starts after the
                site is live.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">03</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Use the capacity when you need it — changes, materials, brand
                support, maintenance. Cancel after the minimum term is met.
              </p>
            </div>
          </div>
        </div>

        {/* Partnership Tiers */}
        <div className="proposal-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
            Partnership Tiers
          </h2>
          <p className="text-sm text-foreground/65 leading-relaxed mb-8">
            Every tier includes a fully coded custom site at $0. The monthly fee
            is the product — ongoing support that goes past basic upkeep.
          </p>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setPackageChoice("lodge")}
              className={`w-full text-left border p-6 transition-colors ${
                packageChoice === "lodge"
                  ? "border-accent"
                  : "border-border/40 hover:border-foreground/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                    Tier 01
                  </div>
                  <h3 className="text-2xl mb-2">Lodge</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                    Free custom business site plus steady monthly support.
                    Updates, bug fixes, light content changes, and basic upkeep —
                    capacity when you need it.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                    Site build $0 · Light monthly capacity
                  </p>
                </div>
                <div className="font-mono text-sm whitespace-nowrap pt-1">
                  $249/mo
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPackageChoice("dam-built")}
              className={`w-full text-left border p-6 transition-colors ${
                packageChoice === "dam-built"
                  ? "border-accent"
                  : "border-border/40 hover:border-foreground/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                    Tier 02
                  </div>
                  <h3 className="text-2xl mb-2">Dam Built</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                    Free brand-ready site plus active monthly ops. Everything in
                    Lodge, plus marketing materials, more revision capacity, and
                    branding collaboration — without a full-time team.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                    Site build $0 · Materials + brand support
                  </p>
                </div>
                <div className="font-mono text-sm whitespace-nowrap pt-1">
                  $499/mo
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPackageChoice("full-stream")}
              className={`w-full text-left border p-6 transition-colors ${
                packageChoice === "full-stream"
                  ? "border-accent"
                  : "border-border/40 hover:border-foreground/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                    Tier 03
                  </div>
                  <h3 className="text-2xl mb-2">Full Stream</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                    Free full system build plus priority monthly partnership.
                    Higher capacity for changes, marketing support, and ongoing
                    brand direction — on-call, not on payroll.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                    Site build $0 · Priority capacity
                  </p>
                </div>
                <div className="font-mono text-sm whitespace-nowrap pt-1">
                  $999/mo
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPackageChoice("open-water")}
              className={`w-full text-left border p-6 transition-colors ${
                packageChoice === "open-water"
                  ? "border-accent"
                  : "border-border/40 hover:border-foreground/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-2">
                    Tier 04
                  </div>
                  <h3 className="text-2xl mb-2">Open Water</h3>
                  <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                    Custom scope. Site still structured around the free-build
                    model where it fits. Monthly retainer and deliverables defined
                    together for the real job.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                    Contract-based · Scoped together
                  </p>
                </div>
                <div className="font-mono text-sm whitespace-nowrap pt-1">
                  Custom
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* What’s included */}
        <div className="proposal-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            What The Monthly Covers
          </h2>
          <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>• Site changes, content updates, and bug fixes</p>
            <p>• General maintenance and technical upkeep</p>
            <p>• Marketing materials (scoped by tier)</p>
            <p>• Branding collaboration and light marketing support</p>
            <p>• Defined monthly capacity — use it when you need us</p>
          </div>
          <p className="mt-6 text-sm text-foreground/55 leading-relaxed border-l border-border/40 pl-4">
            This is not unlimited full-time staff. Each tier has capacity limits
            so the partnership stays sharp, fair, and sustainable on both sides.
          </p>
        </div>

        {/* Payments */}
        <div className="proposal-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Payments
          </h2>
          <div className="space-y-4 text-sm text-foreground/75 leading-relaxed">
            <p>
              Selecting a tier signals interest and preferred direction — it is
              not payment.
            </p>
            <p>
              After you confirm, Rowgle follows up with agreement details and a
              secure Stripe link. The website build stays at $0. Monthly
              partnership billing begins after launch (or as stated in your
              agreement).
            </p>
            <p>
              Subscriptions are recurring. Cancel per the terms in your
              agreement. Receipts are provided automatically.
            </p>
          </div>
        </div>

        {/* Terms */}
        <div className="proposal-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Standard Terms
          </h2>
          <div className="space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>• Tier selection confirms direction, not final legal execution.</p>
            <p>• Formal agreement and payment details are sent after confirmation.</p>
            <p>• Website build is included at $0 with an active monthly partnership.</p>
            <p>
              • Free build is subject to a minimum payment commitment before
              cancellation is available. Early exit without meeting the recovery
              amount requires written agreement from Rowgle.
            </p>
          </div>
          <div className="mt-6 border border-border/40 p-5 space-y-3 text-sm text-foreground/75">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
              Minimum commitment by tier
            </p>
            <p>
              <span className="text-foreground">Lodge</span> — $249/mo · recovery
              $1,500 · <span className="text-foreground">~6 months</span>
            </p>
            <p>
              <span className="text-foreground">Dam Built</span> — $499/mo ·
              recovery $3,000 · <span className="text-foreground">~6 months</span>
            </p>
            <p>
              <span className="text-foreground">Full Stream</span> — $999/mo ·
              recovery $5,000 · <span className="text-foreground">~5 months</span>
            </p>
            <p>
              <span className="text-foreground">Open Water</span> — custom monthly
              · recovery and term defined in your statement of work
            </p>
          </div>
          <div className="mt-6 space-y-3 text-sm text-foreground/70 leading-relaxed">
            <p>
              • Scope and capacity are defined by tier; overages may be billed
              separately.
            </p>
            <p>• Work begins after agreement confirmation and onboarding steps.</p>
          </div>
        </div>

        {/* Confirmation form */}
        <div className="proposal-block mb-16 pt-10 border-t border-border/30">
          {submitted ? (
            <div className="border border-border/40 p-10">
              <p className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4">
                SELECTION RECEIVED
              </p>
              <p className="text-foreground/70 leading-relaxed mb-2">
                Got it. We’ll follow up with agreement details and next steps.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Questions?{" "}
                <a
                  href="mailto:hello@rowgle.com"
                  className="text-accent hover:underline"
                >
                  hello@rowgle.com
                </a>
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-3">
                Get Started
              </h2>
              <p className="text-sm text-foreground/65 leading-relaxed mb-8">
                Select a tier above, then confirm below. We’ll send agreement and
                next steps — no charge on selection.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Anything we should know before next steps"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-foreground/75 leading-relaxed">
                    I have reviewed the partnership tiers and understand the
                    website build is included at no upfront cost with the selected
                    monthly plan. I understand the free build is subject to a
                    minimum payment commitment before cancellation (Lodge ~6
                    months / $1,500 · Dam Built ~6 months / $3,000 · Full Stream ~5
                    months / $5,000 · Open Water as scoped). I want to proceed;
                    Rowgle will follow up with agreement and payment details.
                  </span>
                </label>
                {error && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong. Try again or email hello@rowgle.com.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isValid || sending}
                  className="font-mono text-xs uppercase tracking-[0.25em] border border-foreground/30 hover:border-accent hover:text-accent px-8 py-4 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending…" : "Confirm Selection →"}
                </button>
              </form>
            </>
          )}
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

        {/* Footer */}
        <div className="pt-8 border-t border-border/20 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rowgle · Partnership
          </p>
          <img src="/r-brand-mark-orange.png" alt="" className="h-10 w-auto opacity-40" />
        </div>
      </section>
    </main>
  )
}