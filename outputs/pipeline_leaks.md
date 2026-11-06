# CRM Pipeline Leak Audit — 12 Leads (2026-11-03 snapshot)

Scan of `1_crm_leads.csv` joined with demo evals, call logs, orders, and the 6 call audits. Ranked by revenue at risk.

| # | Leak | Leads | Revenue impact | Automated fix |
|---|---|---|---|---|
| 1 | **High-intent demos never called** | LEAD-807 (engagement 5/5, "asked when batch starts"), LEAD-812 (5/5, mother clapped) | ~2 leads × ~40% hot-conversion ≈ 0.8 enrollments/wk in this sample alone | `Hot_Lead_Call_Today` action + SLA alert if demo uncalled >4h |
| 2 | **Payment failures with no recovery** | LEAD-805 (Rs. 5,400 UPI mandate fail), LEAD-809 (GBP 210 3DS decline) | Both parents already said YES — ~50-70% recoverable ≈ 1+ enrollment | `Payment_Recovery_Resend_Link` auto-cadence within 1h |
| 3 | **Paid lead stuck in pipeline** | LEAD-804 (USD 265 paid 11:40 AM, stage still `Payment_Link_Sent`) | Risk of duplicate sales calls / wrong cadence to a paying parent | Gateway→CRM reconciliation job (15-min sync) |
| 4 | **Compliance-burned lead still in sales flow** | LEAD-803 (rep logged "Interested/good call" after parent said "do not call me again") | Legal/refund exposure + wasted rep time + Rs. 5,500 anomaly link live | Critical-flag suppression → `Do_Not_Contact` + void anomalous links |
| 5 | **Duplicate lead splitting attribution** | LEAD-811 = LEAD-801 (same student_id 78001, mobile, email) | Double outreach risk; funnel metrics inflated | Auto-merge on `student_id` + mobile match |
| 6 | **Vague manual notes destroying intent data** | LEAD-802 ("price high thinking"), LEAD-808 ("Busy/ok"), LEAD-810 ("cb") | Intent scores unknowable → generic spam follow-ups → ignored | Prompt 02 replaces all dispositions with controlled vocabulary |
| 7 | **Stale next_followup dates** | LEAD-810 (`next_followup_at` = 2026-11-01, already past) | Lead silently dropped | Auto-recompute `suggested_next_followup_at` from intent + action |
| 8 | **Child-welfare mismatch pushed to sale** | LEAD-806 (6yo overwhelmed in mixed-age demo; rep refused policy-mandated micro-batch) | Parent trust destroyed; brand risk in parent communities | `Academic_Team_Batch_Fix_Then_Reengage` gate before any sales touch |

**Summary:** of 12 leads, 8 had actionable leaks the AI pipeline catches automatically; 2 were revenue-ready but operationally stranded (807, 809); 1 was a compliance incident (803); 1 was a duplicate (811).
