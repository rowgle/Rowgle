"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

export default function OnboardingPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    goals: "",
    audience: "",
    references: "",
    assets: "",
    timeline: "",
    notes: "",
  })
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

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
      const blocks = section.querySelectorAll(".onboard-block")
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

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("company", form.company)
    formData.append("website", form.website || "N/A")
    formData.append("goals", form.goals || "N/A")
    formData.append("audience", form.audience || "N/A")
    formData.append("references", form.references || "N/A")
    formData.append("assets", form.assets || "N/A")
    formData.append(
      "selectedFiles",
      selectedFiles.length ? selectedFiles.join(", ") : "None selected"
    )
    formData.append("timeline", form.timeline || "N/A")
    formData.append("notes", form.notes || "None")
    formData.append(
      "_subject",
      `Client Onboarding — ${form.company || form.name}`
    )

    try {
      const res = await fetch("https://formspree.io/f/mqpzpjye", {
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
    form.name.trim().length > 1 &&
    form.email.trim().length > 5 &&
    form.company.trim().length > 1

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
            Client Onboarding
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.9]">
            PROJECT
            <br />
            KICKOFF
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Confidential · Client Use Only
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Complete this form so we can start with clarity. The more detail you
            provide, the faster we can move.
          </p>
        </div>

        {submitted ? (
          <div className="border border-border/40 p-10 mb-16">
            <p className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4">
              ONBOARDING RECEIVED
            </p>
            <p className="text-foreground/70 leading-relaxed mb-2">
              Got it. We’ll review your details and follow up with kickoff next
              steps.
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

            {/* Contact */}
            <div className="onboard-block mb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Contact
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
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
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
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
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    required
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Current Website
                  </label>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="onboard-block mb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Project Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Primary Goals
                  </label>
                  <textarea
                    rows={4}
                    value={form.goals}
                    onChange={(e) => update("goals", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="What does success look like for this project?"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Target Audience
                  </label>
                  <textarea
                    rows={3}
                    value={form.audience}
                    onChange={(e) => update("audience", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Who is this for?"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    References / Inspiration
                  </label>
                  <textarea
                    rows={3}
                    value={form.references}
                    onChange={(e) => update("references", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Links to sites, brands, or work you like"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Existing Assets
                  </label>
                  <textarea
                    rows={3}
                    value={form.assets}
                    onChange={(e) => update("assets", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Describe assets you already have, or paste a Google Drive / Dropbox link"
                  />
                  <div className="mt-4">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                      Select Files
                    </label>
                    <input
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg,.svg,.pdf,.zip,.ai,.psd,.fig"
                      onChange={(e) => {
                        const files = e.target.files
                        if (!files) return
                        const names = Array.from(files).map((f) => f.name)
                        setSelectedFiles(names)
                      }}
                      className="block w-full text-sm text-foreground/70 file:mr-4 file:py-2 file:px-4 file:border file:border-border/40 file:bg-transparent file:text-xs file:uppercase file:tracking-[0.2em] file:font-mono file:text-foreground/80 hover:file:border-accent hover:file:text-accent file:transition-colors"
                    />
                    {selectedFiles.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {selectedFiles.map((file) => (
                          <li
                            key={file}
                            className="text-xs text-foreground/60 font-mono"
                          >
                            – {file}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-3 text-xs text-foreground/45 leading-relaxed">
                      Selected file names are included in your submission. For
                      actual transfer, include a shared Drive or Dropbox link
                      above.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Ideal Timeline
                  </label>
                  <input
                    type="text"
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="e.g. 4–6 weeks / launch by specific date"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    className="w-full bg-transparent border border-border/40 focus:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                    placeholder="Anything else we should know"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="onboard-block mb-16 pt-10 border-t border-border/30">
              <p className="text-sm text-foreground/65 leading-relaxed mb-8">
                Submitting this form sends your responses to Rowgle so we can
                prepare kickoff and next steps.
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
                {sending ? "Sending…" : "Submit Onboarding →"}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-border/20 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rowgle · Client Onboarding
          </p>
          <img src="/orangeharp.png" alt="" className="h-10 w-auto opacity-40" />
        </div>
      </section>
    </main>
  )
}