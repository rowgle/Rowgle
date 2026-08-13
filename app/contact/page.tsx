"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import gsap from "gsap"

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  })
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

      const blocks = section.querySelectorAll(".contact-block")
      if (blocks.length > 0) {
        gsap.from(blocks, {
          y: 24,
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
    formData.append("company", form.company || "N/A")
    formData.append("interest", form.interest || "General")
    formData.append("message", form.message)
    formData.append(
      "_subject",
      `Contact — ${form.interest || "General"} — ${form.company || form.name}`
    )

    try {
      const res = await fetch("https://formspree.io/f/mnpaznnz", {
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
    form.message.trim().length > 5

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
            Contact
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.9]">
            LET&apos;S
            <br />
            TALK
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Open Water · Custom Scope · General
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Custom partnerships, Open Water scoping, or a straight question —
            send it through. We respond fast and keep the conversation tight.
          </p>
        </div>

        {submitted ? (
          <div className="contact-block border border-border/40 p-10 mb-16">
            <p className="font-[var(--font-bebas)] text-3xl tracking-tight mb-4">
              MESSAGE RECEIVED
            </p>
            <p className="text-foreground/70 leading-relaxed mb-2">
              Got it. We&apos;ll review and get back to you shortly.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Prefer email?{" "}
              <a
                href="mailto:hello@rowgle.com"
                className="text-accent hover:underline"
              >
                hello@rowgle.com
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-0">
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Details */}
            <div className="contact-block mb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Details
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
                    className="w-full bg-transparent border border-border/40 focus:border-accent hover:border-accent px-4 py-3 text-sm outline-none transition-colors"
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
                    className="w-full bg-transparent border border-border/40 focus:border-accent hover:border-accent px-4 py-3 text-sm outline-none transition-colors"
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
                    className="w-full bg-transparent border border-border/40 focus:border-accent hover:border-accent px-4 py-3 text-sm outline-none transition-colors"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Interest
                  </label>
                  <div className="relative">
                    <select
                      value={form.interest}
                      onChange={(e) => update("interest", e.target.value)}
                      className="w-full appearance-none bg-background border border-border/40 focus:border-accent hover:border-accent px-4 py-3 pr-10 text-sm outline-none transition-colors cursor-pointer"
                    >
                      <option value="">Select one</option>
                      <option value="Open Water">Open Water · Custom</option>
                      <option value="Lodge">Lodge · $249/mo</option>
                      <option value="Dam Built">Dam Built · $499/mo</option>
                      <option value="Full Stream">Full Stream · $999/mo</option>
                      <option value="General">General question</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 text-xs">
                      ▾
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="contact-block mb-16">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
                Message
              </h2>
              <textarea
                rows={7}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
                className="w-full bg-transparent border border-border/40 focus:border-accent hover:border-accent px-4 py-3 text-sm outline-none transition-colors resize-none"
                placeholder="Scope, timeline, goals — whatever we need to know."
              />
            </div>

            {/* Submit */}
            <div className="contact-block mb-16 pt-10 border-t border-border/30">
              <p className="text-sm text-foreground/65 leading-relaxed mb-8">
                Submissions go straight to Rowgle. For Open Water, include rough
                scope and constraints so we can respond with a real path forward.
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
                {sending ? "Sending…" : "Send Message →"}
              </button>
            </div>
          </form>
        )}

        {/* Direct */}
        <div className="contact-block mb-16 border border-border/30 p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            Direct line
          </p>
          <a
            href="mailto:hello@rowgle.com"
            className="font-mono text-sm text-foreground/80 hover:text-accent transition-colors"
          >
            hello@rowgle.com
          </a>
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
            Rowgle · Contact
          </p>
          <img src="/orangeharp.png" alt="" className="h-10 w-auto opacity-40" />
        </div>
      </section>
    </main>
  )
}