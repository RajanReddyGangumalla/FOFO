# Deliverable B — End-to-End AI Workflow & CRM Automation Architecture

## 1. Pipeline Map

```
┌─────────────────┐   ┌──────────────┐   ┌─────────────────┐   ┌───────────────┐   ┌──────────────────┐   ┌─────────────────┐
│ Call Ends       │──▶│ Transcription│──▶│ AI Analysis     │──▶│ Auto-CRM      │──▶│ Counsellor       │──▶│ Parent WhatsApp │
│ (Zoom/Phone     │   │ (Whisper API │   │ (3 prompts,     │   │ Update        │   │ Coaching Alert   │   │ Cadence         │
│  recording)     │   │  or          │   │  JSON mode)     │   │ (CRM API /    │   │ (dashboard +     │   │ (per-lead       │
│                 │   │  AssemblyAI) │   │                 │   │  Sheets sync) │   │  Slack/email)    │   │  sequence)      │
└─────────────────┘   └──────────────┘   └─────────────────┘   └───────────────┘   └──────────────────┘   └─────────────────┘
        │                                          │                    │                    │                    │
        │                                          ▼                    ▼                    ▼                    ▼
        │                              ┌─────────────────────────────────────────────────────────────────────┐
        │                              │ GUARDRAIL LAYER (runs before every downstream action)               │
        │                              │ • Payment gateway reconcile (Paid → Enrolled_Paid, suppress sales)  │
        │                              │ • Compliance flag check (critical → suppress outreach + escalate)   │
        │                              │ • Discount-cap validator (order anomaly → void link + alert)        │
        │                              │ • Stop-trigger check (opt-out, DND, paid, batch-fix pending)        │
        │                              └─────────────────────────────────────────────────────────────────────┘
```

### Step detail

1. **Recording → Transcript** (~2 min): Zoom cloud recording / telephony webhook → Whisper/AssemblyAI → timestamped transcript + language detection (already present in `3_sales_call_logs.csv`).
2. **AI Analysis** (~30 s): Prompts 01+02 run in parallel on transcript + demo eval + CRM row + pricing/policy row → `call_audit_scorecards.json` + `crm_cleaned_leads.json`.
3. **Auto-CRM Update**: `crm_stage_recommendation`, `lead_intent`, `intent_score`, `primary_objection_bucket`, `next_best_action`, `suggested_next_followup_at` written back; manual note preserved but superseded. **Payment gateway reconciliation runs first** — order 99404 proved a paid lead can sit at `Payment_Link_Sent` for hours.
4. **Counsellor Coaching Alert**: scorecard + top-3 coaching items pushed to the rep's private dashboard and their manager's team view. Critical flags → manager Slack alert within 15 min.
5. **Parent WhatsApp Cadence**: Prompt 03 generates the 3-touch sequence; guardrail layer decides auto-send vs approve.

## 2. Human-in-the-Loop Matrix

| Action | Auto or Approve? | Why |
|---|---|---|
| CRM field updates (stage, intent, objection) | **AUTO** | Structured data, reversible, audit-logged |
| Payment-status reconciliation | **AUTO** | Deterministic gateway data |
| Touch 1 WhatsApp — Warm/Hot leads, no flags | **AUTO** | Time-sensitive (<2h); content is value-first, no discount |
| Touch 1 — Cold leads / any discount mention | **APPROVE** | Discount language needs human check vs cap |
| Touch 2 & 3 (all leads) | **APPROVE** | Day-2/4 messages benefit from rep's personal touch |
| Any message to a `Do_Not_Contact` / compliance-flagged lead | **NEVER** | Hard suppression |
| Payment-recovery messages (failed orders) | **AUTO Touch 1** | Parent already said yes; delay loses the sale |
| Academic batch-fix offers (e.g., Ananya micro-batch) | **APPROVE** | Depends on real seat availability — AI must not promise seats |
| Compliance incident response | **HUMAN ONLY** | Manager decides apology/escalation; AI only detects + suppresses |

## 3. Compliance Guardrails (what the AI must catch)

Detected automatically in the 6-call dataset:

| Red flag | Example from data | System action |
|---|---|---|
| **Forbidden outcome claims** | "Rank 1 in 30 days", "read Harry Potter" (Call 7003) | Critical flag → suppress outreach, manager alert, retraining ticket |
| **Discount cap breach** | 42% off vs 10% cap; order 99403 auto-flagged | Void payment link, finance alert, manager review |
| **Fake refund promises** | "100% refund anytime in 6 months" off-record (Call 7003) | Critical flag; legal/compliance notified |
| **Coercive urgency/threats** | "blacklist student ID in 5 minutes" (Call 7003); "link expires in 30 min" (Call 7002) | High flag → coaching + copy blocked from WhatsApp templates |
| **Rubric gaming / false praise** | Reading checklist verbatim; "natural Grandmaster" vs engagement 2/5 (Call 7006) | Detection rule: transcript contains ≥3 consecutive scripted discovery questions → flag |
| **Policy-mandated offer skipped** | Age 5-6 micro-batch not offered (class_id 401 policy) | Cross-check demo eval `recommended_batch_type` vs transcript offer |
| **Rude/dismissive tone** | "kids always make excuses" (Call 7006) | Sentiment flag on parent turns + rep talk-ratio >75% |
| **Unverifiable statistics** | "improves IQ by 40%" (Call 7006) | Block quantified claims not in approved claims library |

## 4. No-Code Implementation Stack

- **Trigger:** n8n (self-hosted) or Make.com — webhook on "call recording available" from Zoom/Exotel/Knowlarity.
- **Transcription:** Whisper API or AssemblyAI node.
- **LLM:** Single GPT-4o/Claude call with the 3 prompts as separate chain steps (JSON mode).
- **CRM:** Google Sheets (MVP) → Zoho/Salesforce API (scale). Sheets suffices for the 12-lead pilot.
- **WhatsApp:** WhatsApp Business API via Interakt/AiSensy/WATI — template messages for Touch 1, session messages for replies.
- **Alerts:** Slack webhook to counsellor DM + manager channel.
- **Audit log:** Every AI action written to a `ai_action_log` sheet (who/what/when/prompt-version) for disputes.
