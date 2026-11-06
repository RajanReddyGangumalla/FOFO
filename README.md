# Bambinos.live — AI Post-Demo Conversion & Call Intelligence Pipeline

Take-home submission for **AI Program Manager (Sales)**. End-to-end prototype that audits post-demo counselling calls, structures CRM fields, and generates personalized WhatsApp follow-ups across the provided 6 transcripts + 12-lead CRM dataset.

## Repo structure

```
├── sales/                        # Official assessment assets (transcripts + CSVs)
├── prompts/                      # Exact system prompts used (JSON-mode, temp-controlled)
│   ├── 01_call_audit_scorecard.md
│   ├── 02_crm_field_extraction.md
│   └── 03_whatsapp_followup_generator.md
├── outputs/                      # Generated results across the full dataset
│   ├── call_audit_scorecards.json     # 6-dimension /60 scorecard + compliance flags + coaching per call
│   ├── crm_cleaned_leads.json/.csv    # Structured CRM fields for all 12 leads (replaces vague notes)
│   ├── whatsapp_sequences.md          # 3-touch sequences w/ stop-triggers per lead
│   └── pipeline_leaks.md              # 8-leak CRM audit ranked by revenue at risk
├── docs/
│   ├── deliverable_a_framework.md     # Scorecard, CRM taxonomy, parent psychology
│   ├── deliverable_b_workflow.md      # Pipeline map, human-in-loop matrix, guardrails
│   └── deliverable_d_rollout.md       # Funnel math, rep adoption, 30-60-90 plan
├── case_report.md               # PDF source (Deliverables A+B+D)
└── case_report.pdf              # Compiled submission deck
```

## Headline results

| Call | Lead | Score | Grade | Key finding |
|---|---|---|---|---|
| 7001 | LEAD-801 Aarav | 55/60 | A | Exemplar consultative call; spouse-decision handled |
| 7002 | LEAD-802 Zoya | 29/60 | C | Price dumped at 00:30; fake urgency; Bar-Model moment unused |
| 7003 | LEAD-803 Vihaan | 12/60 | F | 4 critical compliance violations → outreach suppressed, manager alerted |
| 7004 | LEAD-804 Meera | 55/60 | A | Clean close; paid USD 265 — CRM stage bug flagged |
| 7005 | LEAD-805 Kabir | 49/60 | B | Strong Hinglish call; payment failed → auto recovery sequence |
| 7006 | LEAD-806 Ananya | 15/60 | F | Rubric-gaming + policy-mandated micro-batch offer refused |

**Funnel math:** +2.5pp demo→paid on 1,000 demos/week ≈ **+$195K/year**; ~10,400 manager/rep hours/year saved; audit coverage 2% → 100%.

## How to reproduce

The prompts are deterministic (temp 0.0–0.4, JSON mode). Run each transcript + joined CSV rows through Prompts 01→02→03 in sequence; outputs land in `outputs/`. A reference n8n/Make workflow is documented in `docs/deliverable_b_workflow.md`.
