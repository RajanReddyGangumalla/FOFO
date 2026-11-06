# Deliverable A — Sales Discovery & Call Evaluation Framework

## 1. Parent Psychology: Why Parents Buy Kids' Courses

Bambinos sells **outcomes a parent can see**, not curriculum. Across India, GCC, and US/UK the buying logic differs but the structure is identical:

| Market | Parent psychology | What closes |
|---|---|---|
| **India (INR)** | Price-sensitive but outcome-anchored; joint decision (father often controls card); festival/school-fee cash-flow cycles; trust via WhatsApp proof, not ads | Demo "magic moment" replayed to the spouse + installment ease + refund safety |
| **GCC (AED)** | Expat parents compare against local offline tuition (e.g., AED 350 Karama tutor); status + British-curriculum exam outcomes matter; less price-shock tolerance than India | Method differentiation (Bar-Model vs worksheets) + small-group peer effect + risk-free trial |
| **US/UK (USD/GBP)** | Parents buy enrichment + values (Little Yogi); schedule fit is the #1 blocker (sports, activities); expect transparency and policies in writing | Exact batch-time fit + teacher continuity + refund policy stated plainly |

**Universal insight from the 6 calls:** the sale is won or lost in the first 3 minutes. Every winning call opened with *this child's specific demo moment*; every losing call opened with company monologue, checklist-reading, or a price quote.

## 2. Call Quality Scorecard (6 dimensions, /60)

| # | Dimension | What "good" looks like | Failure mode seen in data |
|---|---|---|---|
| 1 | **Rapport & Child-Specific Praise** | Opens with the child's demo magic moment from the teacher eval | Generic praise; false praise contradicting the demo (Call 7006) |
| 2 | **Discovery & Learning-Pain Diagnosis** | Surfaces the parent's real concern (learning gap, exam pressure, confidence) BEFORE fee | Price quoted at 00:30 before diagnosis (Call 7002) |
| 3 | **Value Pitch vs Price Dumping** | Explains method/batch/outcomes, then fee with per-session math | Fee dump + "which package today?" (Call 7002) |
| 4 | **Objection Handling** | Probe → reframe with evidence → involve real decision-maker | Dismissal ("kids make excuses"), fake urgency, ignoring policy-mandated offers (Calls 7003, 7006) |
| 5 | **Trial Close & Next Step** | Specific time-bound next step the parent agrees to | Vague "we'll see"; coercive 5-min ultimatum (Call 7003) |
| 6 | **Compliance & Policy Adherence** | Discounts ≤10% cap, no forbidden claims, honest scarcity, talk ratio <65% | 42% discount, Rank-1 guarantee, blacklist threat (Call 7003) |

**Grade bands:** A ≥50 · B 40–49 · C 28–39 · F <28. Any critical compliance flag → automatic F on dimension 6 + manager escalation + outreach suppression.

## 3. Structured CRM Taxonomy (what the AI extracts)

| Field | Controlled vocabulary |
|---|---|
| `lead_intent` | Hot / Warm / Cold / Lost / Enrolled_Paid |
| `intent_score_1_to_10` | Anchored: 9–10 agreed-to-pay · 7–8 concrete next step · 5–6 real unresolved objection · 3–4 vague · 1–2 rejected/burned |
| `primary_objection_bucket` | Price · Spouse_Decision · Schedule_Conflict · Child_Not_Interested · Competitor_Comparison · Payment_Failure · None |
| `child_demo_highlight` | Verbatim-adapted from `demo_magic_moment_for_parent` — the personalization hook |
| `next_best_action` | 9-value enum (see Prompt 02) — every lead gets exactly one |
| `crm_stage_recommendation` | Maps to existing pipeline stages incl. `Do_Not_Contact` |

**Before/after example (LEAD-805):** manual note *"Thinking / comparing with planetspark and school exam going on"* → structured: `Competitor_Comparison + Schedule_Conflict`, intent 8/10, action `Payment_Recovery_Resend_Link` (payment actually failed at 8:45 PM — the manual note missed the highest-intent signal in the dataset).
