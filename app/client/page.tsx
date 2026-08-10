"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"

export default function ClientAgreementPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [packageChoice, setPackageChoice] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [acceptedCapacity, setAcceptedCapacity] = useState(false)
  const [acceptedPayment, setAcceptedPayment] = useState(false)
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
      const blocks = section.querySelectorAll(".client-block")
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
        ? "Lodge — $249/mo"
        : packageChoice === "dam-built"
          ? "Dam Built — $499/mo"
          : packageChoice === "full-stream"
            ? "Full Stream — $999/mo"
            : packageChoice === "open-water"
              ? "Open Water — Custom"
              : "None"

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("company", company || "N/A")
    formData.append("package", packageLabel)
    formData.append("agreement", "Client Agreement acknowledged")
    formData.append(
      "_subject",
      `Client Agreement Accepted — ${company || name} — ${packageLabel}`
    )

    try {
      const res = await fetch("https://formspree.io/f/mppapndo", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
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
    accepted &&
    acceptedCapacity &&
    acceptedPayment

  return (
    <main className="relative min-h-screen">
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <section
        ref={sectionRef}
        className="relative z-10 pt-28 pb-40 px-6 md:px-12 max-w-3xl mx-auto"
      >
        {/* Brand Mark */}
        <div className="mb-14 flex items-center gap-4">
          <img src="/beaver.png" alt="Rowgle" className="h-12 w-auto opacity-90" />
          <div className="h-px flex-1 bg-border/30" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Client Agreement
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.9]">
            REVIEW
            <br />
            &amp; CONFIRM
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Package overview · Scope · Terms
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            You selected a partnership direction on the proposal page. This
            document confirms what that means — what we build, what the monthly
            covers, what it does not, and how we work together. Read it fully
            before acknowledging below.
          </p>
        </div>

        {/* Model summary */}
        <div className="client-block mb-16 border border-border/40 p-6 md:p-8">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
            The Model
          </h2>
          <p className="text-sm text-foreground/75 leading-relaxed mb-4">
            Your custom website is included at <span className="text-foreground">$0</span> with
            an active monthly partnership. You are not paying a large upfront
            build invoice. You are retaining Rowgle for ongoing capacity —
            updates, fixes, materials, and brand support — at the tier you
            selected.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed border-l border-border/40 pl-4">
            This is not a full-time hire and not unlimited work. Each tier has
            defined capacity so the partnership stays fair and sustainable.
          </p>
        </div>

        {/* Packages overview */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Partnership Tiers
          </h2>
          <div className="space-y-4">
            <div className="border border-border/40 p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                    Tier 02
                  </p>
                  <h3 className="text-xl">Lodge</h3>
                </div>
                <span className="font-mono text-sm whitespace-nowrap">$249/mo</span>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Free custom business site + steady monthly support. Updates, bug
                fixes, light content changes, basic upkeep.
              </p>
            </div>

            <div className="border border-border/40 p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                    Tier 03
                  </p>
                  <h3 className="text-xl">Dam Built</h3>
                </div>
                <span className="font-mono text-sm whitespace-nowrap">$499/mo</span>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Everything in Lodge, plus marketing materials, more revision
                capacity, and branding collaboration.
              </p>
            </div>

            <div className="border border-border/40 p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                    Tier 04
                  </p>
                  <h3 className="text-xl">Full Stream</h3>
                </div>
                <span className="font-mono text-sm whitespace-nowrap">$999/mo</span>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Priority capacity for changes, marketing support, and ongoing
                brand direction — still on-call, not on payroll.
              </p>
            </div>

            <div className="border border-border/40 p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
                    Tier 05
                  </p>
                  <h3 className="text-xl">Open Water</h3>
                </div>
                <span className="font-mono text-sm whitespace-nowrap">Custom</span>
              </div>
              <p className="text-sm text-foreground/65 leading-relaxed">
                Custom scope and retainer defined together. Written scope controls
                deliverables and fees.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-foreground/55 leading-relaxed">
            Full package detail lives on{" "}
            <Link href="/proposal" className="text-accent hover:underline">
              /proposal
            </Link>
            . Your formal agreement may refine capacity numbers for your tier.
          </p>
        </div>

        {/* What we do */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            What We Do
          </h2>
          <div className="space-y-3 text-sm text-foreground/75 leading-relaxed">
            <p>• Design and build your custom marketing website (included at $0 with active partnership)</p>
            <p>• Deploy to your domain and set up a clean, maintainable foundation</p>
            <p>• Monthly capacity for content updates, bug fixes, and technical upkeep</p>
            <p>• Marketing materials and brand collaboration as defined by tier</p>
            <p>• Reasonable communication during active work windows</p>
            <p>• Secure payment handling via Stripe after agreement confirmation</p>
          </div>
        </div>

        {/* What we don't */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            What We Don&apos;t Do
          </h2>
          <div className="space-y-3 text-sm text-foreground/75 leading-relaxed">
            <p>• Unlimited revisions or open-ended daily staff access</p>
            <p>• Full-time dedicated employee equivalent under a standard tier</p>
            <p>• Guaranteed rankings, leads, or revenue outcomes</p>
            <p>• Legal, tax, or regulated compliance advice outside design/web scope</p>
            <p>• Large rebuilds, custom apps, or ecommerce catalogs unless scoped (typically Open Water)</p>
            <p>• Work outside the selected tier without a written change order or upgrade</p>
          </div>
        </div>

        {/* Process */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            How The Process Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">01</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="text-foreground">Direction</span> — You select a
                tier on /proposal and complete this agreement acknowledgment.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">02</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="text-foreground">Agreement &amp; payment</span> —
                Rowgle sends final terms and a Stripe link. Monthly billing begins
                per the agreement (typically at or after launch kickoff).
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">03</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="text-foreground">Build</span> — We collect assets,
                design and develop the site, and run revision rounds within scope.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">04</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                <span className="text-foreground">Launch &amp; retain</span> — Site
                goes live. Monthly capacity covers ongoing changes and support per
                tier.
              </p>
            </div>
          </div>
        </div>

        {/* Client responsibilities */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Your Responsibilities
          </h2>
          <div className="space-y-3 text-sm text-foreground/75 leading-relaxed">
            <p>• Provide accurate business information, logos, copy, and access in a timely manner</p>
            <p>• Designate a decision-maker for feedback and approvals</p>
            <p>• Respond within agreed windows so timelines can hold</p>
            <p>• Ensure you own or have rights to all materials you supply</p>
            <p>• Keep payment method current for the active monthly partnership</p>
          </div>
        </div>

        {/* Legal / important */}
        <div className="client-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Important Terms
          </h2>
          <div className="space-y-4 text-sm text-foreground/70 leading-relaxed">
            <p>
              <span className="text-foreground">Scope.</span> Written scope and
              tier limits control the engagement. Out-of-scope work requires
              written approval and may be billed separately or require a tier
              change.
            </p>
            <p>
              <span className="text-foreground">Intellectual property.</span> Upon
              payment of amounts due, you own the final deliverables created
              specifically for you, excluding Rowgle tools, frameworks, and
              pre-existing materials. Third-party licenses (fonts, stock, plugins)
              remain under their own terms.
            </p>
            <p>
              <span className="text-foreground">Portfolio.</span> Unless you
              object in writing, Rowgle may reference the project name and public
              site in portfolio and social. Sensitive details stay confidential.
            </p>
            <p>
              <span className="text-foreground">Cancellation.</span> Monthly
              partnerships may be canceled per the formal agreement (typically
              end of billing period after notice). The free build is tied to an
              active partnership as defined in that agreement — early cancellation
              terms will be stated clearly before payment.
            </p>
            <p>
              <span className="text-foreground">Limitation.</span> Rowgle provides
              design and development services. We do not guarantee business
              results. Liability is limited to fees paid for the relevant period
              to the extent permitted by law.
            </p>
            <p>
              <span className="text-foreground">Not legal advice.</span> This page
              is a plain-language overview. The signed/accepted formal agreement
              and any statement of work control if there is a conflict.
            </p>
            <p>
  <span className="text-foreground">Minimum commitment.</span> The website
  build is included at $0 only while the monthly partnership is active under
  these terms. Early cancellation is not available until cumulative monthly
  payments equal the build recovery amount for your tier:
</p>
<ul className="mt-3 space-y-2 text-sm text-foreground/70 pl-1">
  <li>Lodge — $1,500 total paid</li>
  <li>Dam Built — $3,000 total paid</li>
  <li>Full Stream — $5,000 total paid</li>
  <li>Open Water — amount stated in your statement of work</li>
</ul>
<p className="mt-4">
  Until that threshold is met, the partnership remains month-to-month only in
  billing form; you remain obligated for the remaining balance of the recovery
  amount if you discontinue services early (unless Rowgle agrees otherwise in
  writing). After the threshold is met, standard cancellation terms apply.
</p>
          </div>
        </div>

        {/* Acknowledgment form */}
        <div className="client-block mb-16 pt-10 border-t border-border/30">
          {submitted ? (
            <div className="border border-border/40 p-10">
              <p className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4">
                ACKNOWLEDGMENT RECEIVED
              </p>
              <p className="text-foreground/70 leading-relaxed mb-2">
                Thank you. We’ll follow up with next steps, final agreement
                details, and payment instructions.
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
              <Link
                href="/"
                className="inline-block mt-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Acknowledge &amp; Confirm
              </h2>

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
                    Selected Tier
                  </label>
                  <select
                    value={packageChoice}
                    onChange={(e) => setPackageChoice(e.target.value)}
                    required
                    className="w-full bg-background border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors appearance-none"
                  >
                    <option value="">Select the tier you chose…</option>
                    <option value="lodge">Lodge — $249/mo</option>
                    <option value="dam-built">Dam Built — $499/mo</option>
                    <option value="full-stream">Full Stream — $999/mo</option>
                    <option value="open-water">Open Water — Custom</option>
                  </select>
                </div>

                <div className="space-y-4 border border-border/30 p-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm text-foreground/75 leading-relaxed">
                      I have read this Client Agreement overview. I understand the
                      free website build is tied to an active monthly partnership
                      and that the formal agreement and statement of work control
                      final terms.
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedCapacity}
                      onChange={(e) => setAcceptedCapacity(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm text-foreground/75 leading-relaxed">
  I understand monthly capacity is limited by tier and is not a full-time hire.
  Out-of-scope work may require a change order or upgrade. The free site build
  is subject to a minimum payment commitment (Lodge $1,500 · Dam Built $3,000 ·
  Full Stream $5,000 · Open Water as scoped); I may not cancel without meeting
  that recovery amount unless Rowgle agrees otherwise in writing.
</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedPayment}
                      onChange={(e) => setAcceptedPayment(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-sm text-foreground/75 leading-relaxed">
                      I understand this page is not payment. Rowgle will follow up
                      with agreement finalization and a secure Stripe payment link.
                    </span>
                  </label>
                </div>

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
                  {sending ? "Sending…" : "Acknowledge Agreement →"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border/20 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rowgle · Client Agreement
          </p>
          <img src="/orangeharp.png" alt="" className="h-10 w-auto opacity-40" />
        </div>

        <div className="mt-12">
          <Link
            href="/proposal"
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent transition-colors"
          >
            ← Back to Proposal
          </Link>
        </div>
      </section>
    </main>
  )
}