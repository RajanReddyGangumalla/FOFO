# Deliverable D — Revenue Impact, Adoption & 30-60-90 Day Rollout

## 1. Funnel Math

**Baseline assumptions (per brief):** 1,000 demos/week · 15% demo→paid · 40 counsellors · blended AOV ≈ $150 (INR 12,000 ≈ $140; AED 1,200 ≈ $327; USD 265 — blended ~$150 conservative).

| Metric | Baseline | With AI pipeline (+2.5pp) | With AI pipeline (+3pp) |
|---|---|---|---|
| Paid enrollments / week | 150 | 175 | 180 |
| Incremental paid / week | — | +25 | +30 |
| Incremental revenue / week | — | **+$3,750** | **+$4,500** |
| Incremental revenue / year | — | **~$195,000** | **~$234,000** |
| Demo→paid conversion | 15.0% | 17.5% | 18.0% |

**Where the +2.5pp comes from (evidence from this dataset):**
- **Uncalled high-intent demos (LEAD-807, LEAD-812):** engagement 5/5 leads sitting 26h+ — at 15% baseline these convert ~15%; hot-lead same-day calling lifts them to ~40%+. ~2 of 12 leads in sample = ~17% of pipeline is this leak.
- **Payment-failure recovery (LEAD-805, LEAD-809):** failed payments are the highest-intent leads in the funnel; same-day recovery converts 30–50% vs ~5% if ignored.
- **Objection-specific follow-ups:** spouse-decision leads (LEAD-801) close when the champion is armed with evidence — the 60-sec summary asset is the difference between "call back tomorrow" and enrollment.
- **Compliance burn prevention:** Call 7003 shows one bad call can torch a lead AND create refund/legal exposure; suppression protects both.

**Manager hours saved:**
- Today: 1,000 calls/week ÷ 40 reps = 25 calls/rep/week × ~15 min manual CRM logging + note-writing ≈ **6.25 hrs/rep/week ≈ 250 hrs/week ≈ 13,000 hrs/year** of admin.
- With AI: structured CRM auto-fill + drafted follow-ups → ~1 hr/week review per rep.
- **Savings: ~200 hrs/week ≈ 10,400 hrs/year** — equivalent to ~5 FTEs of selling time redirected to live conversations.
- **Audit coverage:** manual audit = 2% of calls (~20/week). AI audits **100%** — the 98% blind spot (where Call 7003's violations hid) is eliminated.

## 2. Managing Sales Rep Pushback — "Copilot, Not Police"

Reps will resist call audits if framed as surveillance. Positioning:

1. **Private-first scorecards.** Each rep sees ONLY their own scorecard + coaching tips. Managers see team aggregates; individual scores visible to a rep's manager only after the rep has had 48h to self-review. No public leaderboards.
2. **Lead with wins.** The first dashboard view is "calls worth replaying" — Call 7001/7004 exemplars shared as training assets. Reps opt to hear what great sounds like before hearing what bad sounds like.
3. **Coaching, not scoring.** Output is phrased as "here's the rephrase that would have saved this objection" — every flag includes a suggested script. Reps experience it as a rehearsal tool, not a verdict.
4. **Payoff is visible.** Tie score improvements to their own conversion: "your Warm→Paid rate rose 4pp since you started using the objection library." AI makes good reps look good.
5. **Fix the system, not just the rep.** Call 7006's root cause was a missing micro-batch — the tool routes that to the academic team, showing reps the AI advocates for them too.
6. **Opt-in pilot.** 5 volunteers for 2 weeks; they co-design the coaching tone. Pilot reps become internal champions who train the other 35.
7. **Compliance flags protect reps.** Frame critical-flag alerts as "the system stopped you from saying something that could cost you your job/incentive" — Call 7003's rep faces real consequences the AI helped surface early.

## 3. 30-60-90 Day Rollout

**Days 1–30 — Pilot (5 reps, ~125 calls/week)**
- Deploy transcription → audit → CRM pipeline on pilot reps only.
- Weekly calibration: sales manager + AI PM review 10 scorecards together, tune prompt weights.
- Ship WhatsApp Touch-1 auto-send for Warm/Hot leads only.
- Success metric: ≥90% of reps say scorecards feel fair; catch ≥1 critical compliance issue/week.

**Days 31–60 — Expand (all 40 reps)**
- Roll out to full team; launch private rep dashboards + coaching library.
- Activate payment-reconciliation job (fixes the Call 7004 paid-but-stuck bug) and payment-failure recovery cadence.
- Launch pipeline-leak scanner across full CRM (uncalled demos, duplicates, stale follow-ups).
- Success metric: audit coverage 2% → 100%; uncalled-demo rate <4h; payment-failure recovery <2h.

**Days 61–90 — Optimize & Institutionalize**
- A/B test WhatsApp touch timing/copy per objection bucket; feed winners back into Prompt 03.
- Monthly "call of the month" exemplar program; quarterly rubric review with Head of Sales.
- Measure funnel: target +2.5pp demo→paid; report revenue lift vs baseline.
- Hand off runbook to sales ops; AI PM moves to next funnel (demo-class quality or retention).
