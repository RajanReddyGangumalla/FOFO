# Bambinos.live — AI Post-Demo Conversion & Call Intelligence Pipeline

**AI Program Manager (Sales) — Take-Home Case Submission**
Prepared: November 2026 · Dataset: 6 call transcripts + 12-lead CRM + demo evals + orders + pricing/compliance policy

---

## Executive Summary

I designed and prototyped an end-to-end pipeline that converts raw post-demo call recordings into three assets sales actually uses: **(1) an evidence-backed call scorecard**, **(2) clean structured CRM fields**, and **(3) objection-specific WhatsApp follow-up sequences** — with compliance guardrails that suppress outreach on flagged calls.

Running it across the provided dataset surfaced: **2 exemplar calls** (7001, 7004), **1 price-dumping call needing coaching** (7002), **2 rubric-gaming/compliance failures** (7003, 7006), **1 clean Hinglish close with a failed payment needing recovery** (7005), and **8 pipeline leaks** across the 12-lead CRM — including two high-intent demos that sat uncalled for 26+ hours and a paid lead stuck at `Payment_Link_Sent`.

---

## Deliverable A — Sales Discovery & Call Evaluation Framework

### Why parents buy (psychology by market)

- **India:** Joint decision (father often controls payment), price-sensitive but outcome-anchored, festival/school-fee cash cycles. Wins on: demo "magic moment" replayed to the spouse + installments + refund safety.
- **GCC:** Expat parents benchmark against local offline tuition (AED 350 Karama tutor vs AED 1,200 online). Wins on: method differentiation (Bar-Model vs worksheets) + peer-group effect.
- **US/UK:** Buy enrichment + values; schedule fit is the #1 blocker. Wins on: exact batch-time fit + teacher continuity + written policies.

**Universal finding:** the sale is decided in the first 3 minutes. Winning calls open with *this child's specific demo moment*; losing calls open with monologue, checklist-reading, or a price quote.

### 6-dimension scorecard (/60)

| Dimension | Failure mode observed |
|---|---|
| Rapport & Child-Specific Praise | Generic/false praise contradicting demo (7006) |
| Discovery & Learning-Pain Diagnosis | Fee quoted before diagnosis (7002) |
| Value Pitch vs Price Dumping | "Which package today?" at 00:30 (7002) |
| Objection Handling | Dismissal, fake urgency, skipped policy offers (7003, 7006) |
| Trial Close & Next Step | Vague endings; coercive ultimatum (7003) |
| Compliance & Policy | 42% discount, Rank-1 guarantee, blacklist threat (7003) |

### CRM taxonomy

`lead_intent` (Hot/Warm/Cold/Lost/Enrolled_Paid) · `intent_score_1_to_10` (anchored rubric) · `primary_objection_bucket` (7-value enum) · `child_demo_highlight` (verbatim from demo eval — the personalization hook) · `next_best_action` (9-value enum) · `crm_stage_recommendation`.

---

## Deliverable B — Workflow Architecture & Guardrails

**Pipeline:** Recording → Transcription (Whisper/AssemblyAI) → AI Analysis (3 JSON-mode prompts) → Auto-CRM Update → Coaching Alert + WhatsApp Cadence. Full diagram + n8n/Make stack in `docs/deliverable_b_workflow.md`.

**Human-in-the-loop:** CRM updates, payment reconciliation, and Touch-1 WhatsApp on clean Warm/Hot leads are auto; Touches 2–3, discount mentions, batch-fix offers, and ALL compliance-flagged leads require human approval; `Do_Not_Contact` leads are never contacted.

**Compliance guardrails catch:** forbidden outcome claims (Rank-1/30-days), discount breaches (>10% cap — order 99403 auto-flagged), fake refund promises, coercive urgency/blacklist threats, rubric-gaming (scripted discovery questions), skipped policy-mandated offers (age 5-6 micro-batch), dismissive tone, unverifiable statistics.

---

## Deliverable C — Prototype Outputs (summary; full data in `outputs/`)

| Call | Lead | Score | Grade | Headline |
|---|---|---|---|---|
| 7001 | LEAD-801 Aarav | 55/60 | A | Spouse decision handled by arming champion; seat held, 11 AM callback |
| 7002 | LEAD-802 Zoya | 29/60 | C | Price dumped at 00:30; AED 100 "30-min expiry" fake urgency; Bar-Model moment unused |
| 7003 | LEAD-803 Vihaan | 12/60 | F | **4 critical flags** — Rank-1 guarantee, 42% discount, off-record refund, blacklist threat → suppressed + escalated |
| 7004 | LEAD-804 Meera | 55/60 | A | Schedule conflict → perfect weekend-batch fit; paid USD 265; CRM stage bug flagged |
| 7005 | LEAD-805 Kabir | 49/60 | B | Strong Hinglish consultative call; Rs. 5,400 payment FAILED → auto recovery sequence |
| 7006 | LEAD-806 Ananya | 15/60 | F | Checklist-gaming, false "Grandmaster" praise, refused policy-mandated micro-batch |

**CRM cleaning:** all 12 leads re-dispositioned — e.g., LEAD-805 "Thinking/comparing" → `Competitor_Comparison`, intent 8/10, `Payment_Recovery_Resend_Link`; LEAD-803 false "Interested" → `Do_Not_Contact`; LEAD-811 merged into LEAD-801.

**WhatsApp sequences:** 3-touch cadences per lead referencing the child's actual demo moment and answering the real objection — e.g., LEAD-801 Touch 1 replays the 45-second Superhero Hook story for the spouse; LEAD-805 Touch 1 is a payment-recovery (not re-pitch) in Hinglish; LEAD-806 gated behind academic-team batch confirmation.

---

## Deliverable D — Revenue Impact, Adoption & Rollout

### Funnel math

Baseline: 1,000 demos/week × 15% = 150 paid/week. Blended AOV ≈ $150.

- **+2.5pp → 175 paid/week = +$3,750/week ≈ $195K/year**
- **+3pp → 180 paid/week ≈ $234K/year**

Lift sources (all evidenced in this dataset): uncalled 5/5-engagement demos (LEAD-807/812), same-day payment-failure recovery (LEAD-805/809 — parents already said yes), spouse-armament assets (LEAD-801), compliance-burn prevention (LEAD-803).

**Hours saved:** ~6.25 hrs/reps/week of manual CRM logging → ~1 hr review = **~200 hrs/week ≈ 10,400 hrs/year** (~5 FTEs of selling time). Audit coverage: 2% → **100%**.

### Rep adoption — "copilot, not police"

Private-first scorecards (reps see only their own), lead with exemplar calls, coaching phrased as suggested rephrases, tie improvements to each rep's own conversion, opt-in 5-rep pilot, and frame compliance alerts as protection ("the system stopped you before that cost you your incentive").

### 30-60-90

- **Days 1–30:** 5-rep pilot, weekly calibration, Touch-1 auto-send for clean Warm/Hot leads.
- **Days 31–60:** all 40 reps, payment reconciliation + failure-recovery cadence, pipeline-leak scanner.
- **Days 61–90:** A/B test WhatsApp copy per objection bucket, exemplar program, measure +2.5pp target, hand off runbook.

---

## Appendix — Sample Prototype Outputs

### A.1 Call audit scorecard — Call 7003 (LEAD-803 Vihaan, Grade F)

- **Total:** 12/60 — dimensions: Rapport 3, Discovery 2, Value Pitch 1, Objection Handling 1, Trial Close 2, Compliance 3
- **Critical flags:** `Forbidden_Outcome_Claim` ("guaranteed Rank-1 in 30 days"), `Unauthorized_Discount` (42% vs 10% cap), `Fake_Refund_Promise` (off-record), `Coercive_Threat` ("blacklist from platform")
- **Escalation:** `escalate_to_manager: true`, `suppress_parent_outreach: true` — payment link voided, manager alert sent
- **Coaching:** P1 — replace guarantee with curriculum evidence; P2 — never discount beyond policy; P3 — policy-mandated offers cannot be skipped

### A.2 WhatsApp Touch 1 — LEAD-805 (Kabir, payment recovery, Hinglish)

> Namaste! Kabir ki Brainiac Maths demo class mein aaj bohot accha laga — teacher ne specifically bataya ki usne word problems ko Bar-Model se solve kiya. Humne aapka payment link dobara bhej diya hai; bas ek click mein Kabir ki seat confirm ho jayegi. Koi dikkat ho to reply kar dein, hum help karenge.

*Stop-trigger: if payment succeeds → sales cadence stops, onboarding sequence starts.*

### A.3 Pipeline leaks — top findings (of 8 across 12 leads)

| # | Lead | Leak | Automated fix |
|---|---|---|---|
| 1 | LEAD-807 | 5/5 demo engagement, never called (26h+) | Hot-lead call task + WhatsApp Touch 1 |
| 2 | LEAD-812 | Same — high intent, uncalled | Same |
| 3 | LEAD-805 | Payment failed after verbal yes | Same-day recovery WhatsApp + retry link |
| 4 | LEAD-803 | False "Interested" disposition on flagged call | Re-stage → Do_Not_Contact + compliance review |
| 5 | LEAD-811 | Duplicate of LEAD-801 | Merge records, single thread |

### A.4 Interactive demo

A live interactive dashboard visualizes all outputs: live pipeline simulation, scorecards with transcript evidence highlighting, filterable CRM, and WhatsApp sequences — deployed at **https://callintel-ruby.vercel.app/dashboard/** (source in `dashboard/`).

---

## Submission artifacts

- **Prompts:** `prompts/*.md` (deterministic, JSON-mode)
- **Outputs:** `outputs/` (scorecards JSON, cleaned CRM JSON+CSV, WhatsApp sequences, leak audit)
- **Docs:** `docs/deliverable_{a,b,d}_*.md`
- **This report:** `case_report.pdf`
