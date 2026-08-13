"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

export default function OpsPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

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

      const blocks = section.querySelectorAll(".ops-block")
      if (blocks.length > 0) {
        gsap.from(blocks, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.1,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

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
          <img
            src="/beaver.png"
            alt="Rowgle"
            className="h-12 w-auto opacity-90"
          />
          <div className="h-px flex-1 bg-border/30" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            Internal Ops
          </span>
          <h1 className="mt-5 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight leading-[0.9]">
            CLIENT
            <br />
            PROCESS
          </h1>
          <p className="mt-6 text-foreground/60 font-mono text-xs uppercase tracking-[0.2em]">
            Confidential · Internal Use Only
          </p>
          <p className="mt-8 text-lg text-foreground/75 leading-relaxed max-w-2xl">
            Standard workflow for the monthly partnership model. Site build is $0.
            The product is the retainer. Keep every client on the same track.
          </p>
        </div>

        {/* Model reminder */}
        <div className="ops-block mb-16 border border-border/30 p-6">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
            Current Model
          </h2>
          <div className="space-y-2 text-sm text-foreground/75 leading-relaxed">
            <p>
              <span className="text-foreground">Lodge</span> — $249/mo · site $0 · recovery $1,500 (~6 mo)
            </p>
            <p>
              <span className="text-foreground">Dam Built</span> — $499/mo · site $0 · recovery $3,000 (~6 mo)
            </p>
            <p>
              <span className="text-foreground">Full Stream</span> — $999/mo · site $0 · recovery $5,000 (~5 mo)
            </p>
            <p>
              <span className="text-foreground">Open Water</span> — custom monthly · recovery + term in SOW
            </p>
          </div>
          <p className="mt-4 text-xs text-foreground/50 font-mono tracking-wide">
            Monthly billing begins after launch (or as stated in agreement). Selection ≠ payment.
          </p>
        </div>

        {/* Master Sequence */}
        <div className="ops-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Master Sequence
          </h2>
          <div className="space-y-5">
            {[
              ["01", "Lead comes in", "Conversation / inquiry"],
              ["02", "Send proposal", "/proposal"],
              ["03", "Client selects tier", "Formspree notification"],
              ["04", "Send agreement", "/client"],
              ["05", "Send onboarding", "/onboarding"],
              ["06", "Stripe setup", "Subscription / first invoice as agreed"],
              ["07", "Start build", "Design / development begins"],
              ["08", "Design review rounds", "/approve"],
              ["09", "Final approval", "/approve"],
              ["10", "Launch", "Site live · monthly partnership active"],
              ["11", "Request review", "/review"],
            ].map(([num, title, detail]) => (
              <div key={num} className="flex gap-5 border-b border-border/20 pb-4">
                <span className="font-mono text-xs text-accent pt-0.5 w-6">
                  {num}
                </span>
                <div>
                  <p className="text-sm text-foreground/90">{title}</p>
                  <p className="text-xs text-foreground/50 mt-1 font-mono tracking-wide">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="ops-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Core Links
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <span className="text-foreground/50 font-mono text-xs tracking-wide mr-3">
                PROPOSAL
              </span>
              <a href="/proposal" className="hover:text-accent transition-colors">
                /proposal
              </a>
            </p>
            <p>
              <span className="text-foreground/50 font-mono text-xs tracking-wide mr-3">
                AGREEMENT
              </span>
              <a href="/client" className="hover:text-accent transition-colors">
                /client
              </a>
            </p>
            <p>
              <span className="text-foreground/50 font-mono text-xs tracking-wide mr-3">
                ONBOARDING
              </span>
              <a href="/onboarding" className="hover:text-accent transition-colors">
                /onboarding
              </a>
            </p>
            <p>
              <span className="text-foreground/50 font-mono text-xs tracking-wide mr-3">
                APPROVE
              </span>
              <a href="/approve" className="hover:text-accent transition-colors">
                /approve
              </a>
            </p>
            <p>
              <span className="text-foreground/50 font-mono text-xs tracking-wide mr-3">
                REVIEW
              </span>
              <a href="/review" className="hover:text-accent transition-colors">
                /review
              </a>
            </p>
          </div>
        </div>

        {/* Timing Rules */}
        <div className="ops-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Timing Rules
          </h2>
          <div className="space-y-3 text-sm text-foreground/75 leading-relaxed">
            <p>1. Selection on /proposal confirms direction only — not payment or contract.</p>
            <p>2. Send agreement (/client) before onboarding and before Stripe.</p>
            <p>3. Complete onboarding before production starts.</p>
            <p>4. Stripe subscription / payment setup before or at start of build (per agreement).</p>
            <p>5. Monthly partnership billing begins after launch unless agreement says otherwise.</p>
            <p>6. Every design delivery uses /approve.</p>
            <p>7. /review is only post-launch.</p>
            <p>8. Open Water requires written scope + recovery terms before Stripe.</p>
            <p>9. Free build is tied to minimum commitment — track recovery amount per tier.</p>
          </div>
        </div>

        {/* Checklist */}
        <div className="ops-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            Per-Client Checklist
          </h2>
          <div className="space-y-2 text-sm text-foreground/75 font-mono">
            <p>□ Proposal sent</p>
            <p>□ Tier selected (Formspree)</p>
            <p>□ Agreement sent (/client)</p>
            <p>□ Onboarding complete</p>
            <p>□ Stripe set up (subscription / first payment)</p>
            <p>□ Build started</p>
            <p>□ Design round(s) via /approve</p>
            <p>□ Final approval</p>
            <p>□ Launched</p>
            <p>□ Monthly partnership active</p>
            <p>□ Google review requested</p>
            <p>□ Recovery / minimum term noted</p>
          </div>
        </div>

        {/* Email Templates */}
        <div className="ops-block mb-16">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent mb-8">
            Email Templates
          </h2>

          <div className="space-y-10">
            {/* 01 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                01 · Proposal Send
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Rowgle partnership options
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Great talking with you.

We build the full custom site at $0. You pick a monthly partnership tier — that retainer is the product (updates, fixes, materials, brand support, capacity when you need us).

Review tiers and confirm direction here:
https://rowgle.com/proposal

Once you select, I’ll send agreement and next steps.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 02 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                02 · Agreement
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Next step — agreement
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Got your tier selection — thank you.

Next step is a quick agreement review:
https://rowgle.com/client

This covers the free site build, monthly partnership, and minimum commitment terms.

Once that’s done, I’ll send the kickoff form.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 03 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                03 · Onboarding
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Project kickoff form
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Ready for kickoff.

Please complete this short onboarding form so we start with clear goals, assets, and timeline:
https://rowgle.com/onboarding

As soon as that’s in, I’ll send Stripe details and we get moving on the build.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 04 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                04 · Payment / Stripe
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Payment setup — [Lodge / Dam Built / Full Stream / Open Water]
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Onboarding received — thank you.

Here’s the secure Stripe link for your [Lodge / Dam Built / Full Stream / Open Water] partnership:
[STRIPE LINK]

Site build remains $0. Monthly partnership billing runs per the agreement (typically after launch).

Once this is set, we start production.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 05 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                05 · Work Started
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: We’re underway
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

You’re in build.

I’ll keep communication tight and send the first review link when concepts are ready.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 06 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                06 · Design Review
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Design ready for review
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

First pass is ready.

Please review the files/link sent above, then submit your decision here:
https://rowgle.com/approve

You can approve and continue, or request revisions with notes.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 07 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                07 · Revisions
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Updated design ready
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Revisions are in.

Please review and submit your response here:
https://rowgle.com/approve

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 08 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                08 · Final Approval
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Final approval before launch
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

We’re at final review.

If everything looks good, approve here so we can move to launch:
https://rowgle.com/approve

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 09 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                09 · Launch
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: You’re live
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

You’re live.

Site: [URL]

Your monthly partnership is now active. Use the capacity when you need updates, materials, or support.

If anything small needs adjusting in the first few days, just reply here.

— Nick
Rowgle`}
              </pre>
            </div>

            {/* 10 */}
            <div className="border border-border/30 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
                10 · Google Review
              </p>
              <p className="text-xs text-foreground/50 mb-4 font-mono">
                Subject: Quick favor
              </p>
              <pre className="whitespace-pre-wrap text-sm text-foreground/75 leading-relaxed font-sans">
{`Hey [Name],

Hope the new site is treating you well.

If you’re happy with the work, a short Google review helps a lot:
https://rowgle.com/review

Appreciate you.

— Nick
Rowgle`}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border/20 flex items-center justify-between gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Rowgle · Internal Ops
          </p>
          <img
            src="/orangeharp.png"
            alt=""
            className="h-10 w-auto opacity-40"
          />
        </div>
      </section>
    </main>
  )
}