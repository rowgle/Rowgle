"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

export default function ApprovePage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [project, setProject] = useState("")
  const [feedback, setFeedback] = useState("")
  const [decision, setDecision] = useState<"approve" | "revisions" | "">("")
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
      const blocks = section.querySelectorAll(".approve-block")
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

    const decisionLabel =
      decision === "approve"
        ? "APPROVED — Ready to proceed"
        : decision === "revisions"
          ? "REVISIONS REQUESTED"
          : "No decision selected"

    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("project", project || "N/A")
    formData.append("decision", decisionLabel)
    formData.append("feedback", feedback || "None provided")
    formData.append(
      "_subject",
      `Design Approval — ${project || name} — ${decisionLabel}`
    )

    try {
      const res = await fetch("https://formspree.io/f/xvkpkyvv", {
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
    decision !== ""

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
            Design Review
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.9]">
            REVIEW &amp;
            <br />
            APPROVE
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Confidential · Client Use Only
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Review the latest design work sent by Rowgle, then approve to proceed
            or request revisions with notes below.
          </p>
        </div>

        {/* How it works */}
        <div className="approve-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Process
          </h2>
          <div className="space-y-6">
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">01</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Open the design link or files sent in your project email.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">02</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Review carefully against the agreed scope and direction.
              </p>
            </div>
            <div className="flex gap-5">
              <span className="font-mono text-xs text-accent pt-1">03</span>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Submit approval or revision notes below so we can continue.
              </p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="border border-border/40 p-10 mb-16">
            <p className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4">
              RESPONSE RECEIVED
            </p>
            <p className="text-foreground/70 leading-relaxed mb-2">
              Thank you. We’ve received your decision and will follow up shortly.
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Form */}
            <div className="approve-block mb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Your Response
              </h2>
              <div className="space-y-6">
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
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>

                {/* Decision */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-4">
                    Decision
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDecision("approve")}
                      className={`border px-5 py-4 text-left transition-colors ${
                        decision === "approve"
                          ? "border-accent text-accent"
                          : "border-border/40 text-foreground/70 hover:border-foreground/50"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2">
                        Option A
                      </div>
                      <div className="text-sm">Approve &amp; Continue</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecision("revisions")}
                      className={`border px-5 py-4 text-left transition-colors ${
                        decision === "revisions"
                          ? "border-accent text-accent"
                          : "border-border/40 text-foreground/70 hover:border-foreground/50"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-2">
                        Option B
                      </div>
                      <div className="text-sm">Request Revisions</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Feedback / Notes
                  </label>
                  <textarea
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Share any notes, requested changes, or confirmation details"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="approve-block mb-16 pt-10 border-t border-border/30">
              <p className="text-sm text-foreground/65 leading-relaxed mb-8">
                Submitting sends your decision and notes directly to Rowgle.
              </p>

              {error && (
                <p className="font-mono text-xs text-red-400 mb-4">
                  Something went wrong. Try again or email hello@rowgle.com.
                </p>
              )}

              <button
                type="submit"
                disabled={!isValid || sending}
                className="font-mono text-xs uppercase tracking-[0.25em] border border-foreground/30 hover:border-accent hover:text-accent px-8 py-4 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Submit Response →"}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-border/20 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rowgle · Design Approval
          </p>
          <img src="/orangeharp.png" alt="" className="h-10 w-auto opacity-40" />
        </div>
      </section>
    </main>
  )
}