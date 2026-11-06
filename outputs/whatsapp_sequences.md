# Generated WhatsApp Follow-Up Sequences

**Pipeline:** Prompt 03 (`prompts/03_whatsapp_followup_generator.md`) · Run: 2026-11-03 · Model: gpt-4o (temp=0.4)
**Stop-trigger engine:** checks payment status + compliance flags + parent opt-out before EVERY send.

---

## SEQ-LEAD-801 — Aarav / Divya (Bengaluru, IST) · Objection: Spouse Decision · Intent 8/10 · Order 99401 Unpaid (link opened twice)

**Touch 1** — auto-send, 2026-11-02 21:30 IST (≤2h post-call)
> Hi Divya ji! Rohan from Bambinos here 🌟
> Quick note for you and your husband: today at minute 18, Aarav delivered a 45-second space-rescue story with full hand gestures after Ms. Rhea gave him the 3-step 'Superhero Hook' — his teacher called it the biggest confidence jump she's seen in a demo.
> He's enrolled in Ms. Rhea's Tue–Thu 6 PM batch (1 seat left, held for you till tomorrow 11 AM). Fee is Rs. 12,000 for 48 sessions — and there's a written 14-day 100% refund policy if it isn't working.
> I'll call tomorrow at 11 AM to answer his questions. Meanwhile here's the enrollment link: [link]
> *CTA: confirm seat or ask anything before 11 AM.*

**Touch 2** — counsellor-approve, Day 2 (2026-11-04)
> Good morning Divya ji! For your husband's 8:30 PM question — "will this fix stage fear or is it grammar tuition?" — here's the honest answer: this is NOT grammar tuition. Every 4th week is a Stage Showcase where Aarav presents a 2-min speech with props while parents watch live. By session 48 he moves from story prompts to impromptu speaking.
> Ms. Rhea's demo note on Aarav is on WhatsApp for you to show him. Reply YES if the Tue–Thu 6 PM slot still works.

**Touch 3** — counsellor-approve, Day 4 (2026-11-06)
> Divya ji, last note from me 🙂 The Tue–Thu 6 PM batch with Ms. Rhea starts this week and the 6th seat is the only one left. Aarav already proved he can speak 45 seconds when given structure — imagine him doing that without notes by December.
> If timing or fee is the blocker, tell me which and I'll solve that specifically. Otherwise the link is above — takes 2 minutes.

**Stop-triggers:** payment Paid → onboarding sequence; reply "stop" → suppress; 11 AM call happens → pause cadence.

---

## SEQ-LEAD-802 — Zoya / Amina (Dubai, GST) · Objection: Competitor Comparison + Price · Intent 5/10 · Order 99402 Unpaid (link not clicked)

**Touch 1** — auto-send, 2026-11-02 21:00 GST
> Hi Amina! Sneha from Bambinos here.
> You asked the right question on the call — why pay more than the AED 350 local tutor? Honest answer: the tutor gives worksheets; our method is different. Today Mr. Vikram used the visual 'Bar-Model' method and Zoya solved two Grade-6 fraction word problems completely alone — the exact skill her word-problem panic needs.
> I'm sending the 1-page curriculum sheet showing how Bar-Model breaks 4-line problems into steps. No rush on the fee decision — take your time comparing.
> *CTA: reply with your tutor's biggest complaint about Zoya's word problems, I'll address it specifically.*

**Touch 2** — counsellor-approve, Day 3 (2026-11-05)
> Amina, one thing worth knowing: Zoya's issue isn't maths ability — she gets full marks on straight-number questions. It's translating word problems into operations. That's a teachable, specific skill — and it's exactly what the Brainiac track drills 2×/week with Mr. Vikram's batch (max 6 kids, all working on application problems, not drills).
> If you'd like, I can arrange a free 15-min demo of the Bar-Model method for Zoya this weekend — no commitment, just so you can compare it against your tutor's worksheets fairly.

**Touch 3** — counsellor-approve, Day 6 (2026-11-08)
> Last message from me, Amina 🙂 The AED 1,200 covers 48 live classes + the Zing app + monthly parent reports — roughly AED 25/class vs AED ~117/class for 3×/week offline tuition. And there's a 14-day refund policy, so you can literally test it risk-free.
> If word problems are still a worry after the weekend demo, I'll personally review Zoya's first month of progress reports with you.

**Stop-triggers:** any reply → counsellor takes over; payment → onboarding; no reply after Touch 3 → move to 14-day nurture cadence.

---

## SEQ-LEAD-803 — Vihaan / Kiran (Mumbai, IST) · ⚠️ COMPLIANCE INCIDENT · Intent 2/10 · Order 99403 Anomaly · **ALL OUTREACH SUPPRESSED**

**Status: `COMPLIANCE_SUPPRESS`** — audit 7003 returned 4 critical flags (fake Rank-1 guarantee, unauthorized 42% discount, off-record refund promise, blacklist threat). Parent explicitly said "do not call me again."

**Action taken instead of WhatsApp:**
1. Manager alert fired to Head of Sales + Compliance within 15 min of transcript processing.
2. Order 99403 payment link voided; Rs. 5,500 anomaly link disabled.
3. Counsellor Amitabh R*** flagged for mandatory retraining + call monitoring.
4. Lead moved to `Do_Not_Contact`; NO WhatsApp sequence generated.
5. Optional (manager decision only): a single apology message from a senior counsellor — NOT automated, requires human approval.

---

## SEQ-LEAD-804 — Meera / Neha (California, PST) · ✅ PAID · Intent 10/10 · Order 99404 Paid USD 265

**Status: `PAID_SUPPRESS`** — sales cadence stopped automatically when order 99404 reconciled at 11:40 AM PST.

**Onboarding sequence (replaces sales touches):**
> **Touch 1 (auto, 2026-11-03 12:00 PST):** Welcome to Bambinos, Neha! 🎉 Meera is confirmed in Acharya Aditi's Sat–Sun 9:30 AM PST Little Yogi batch. Here's what happens next: (1) you'll get the parent portal login by tonight, (2) Meera's first class is this Saturday — Acharya Aditi already has her 'Samatvam' balance-beam story ready to continue, (3) reply here anytime if the weekend timing needs adjusting.
> **Touch 2 (Day 3):** Parent reflection guide + how to use the 8 Gunas at home (2-min read attached).
> **Touch 3 (Day 7):** First-week progress snapshot from Acharya Aditi + invite to parent webinar.

**System fix flagged:** CRM stage was still `Payment_Link_Sent` 2h after payment — auto-reconciliation job added (see Deliverable B).

---

## SEQ-LEAD-805 — Kabir / Rajesh (Delhi NCR, IST · Hinglish) · Objection: Competitor + Exams + Installment · Intent 8/10 · Order 99405 Payment_Failed

**Touch 1** — auto-send, 2026-11-03 21:15 IST (payment-failure recovery, ≤1h after failure)
> Namaste Rajesh sir! Pooja again 🙂
> Aapka Rs. 5,400 ka payment link try kiya tha raat ko — bank side pe UPI mandate ka OTP timeout ho gaya, isliye payment fail hua. Yeh aapki ya Kabir ki problem nahi hai.
> Maine aapke liye fresh payment link bhej diya hai — is baar aap **card ya UPI QR** dono mein se jo convenient ho use kar sakte hain. Kabir ki Ms. Rhea wali weekend batch (Sat–Sun 11 AM) ki seat abhi held hai.
> *CTA: link pe click karke payment complete karein — 2 minute ka kaam hai.*

**Touch 2** — counsellor-approve, Day 2 (2026-11-04)
> Rajesh sir, ek aur option bata doon — agar ek saath Rs. 5,400 bhi tight lage toh hamari official policy mein **3-part installment** bhi available hai (Rs. 3,600 abhi + 2 equal parts). Aur school exams ke liye portal pe 'Exam Pause' button hai — ek bhi paid class waste nahi hogi.
> Kabir ka PEEL method wala 60-second speech clip main WhatsApp pe forward kar rahi hoon — dekh kar aapko pata chalega yeh fee kyun justify hoti hai vs. 1-on-1 classes.

**Touch 3** — counsellor-approve, Day 4 (2026-11-06)
> Rajesh sir, last reminder 🙂 Weekend batch Sat–Sun 11 AM shuru ho rahi hai aur Kabir ki seat held hai. Rs. 10,800 (10% scholar discount applied) ya 3-part installment — jo aapko suit kare.
> Agar abhi time nahi hai toh bas 'BAAD MEIN' reply kar dein, main aapko exam dates ke baad message karungi — koi pressure nahi.

**Stop-triggers:** payment success → onboarding; reply "baad mein" → reschedule to post-exam date; PlanetSpark counter-offer → counsellor handles personally.

---

## SEQ-LEAD-806 — Ananya / Swathi (Hyderabad, IST) · Objection: Child Not Interested / Batch Mismatch · Intent 3/10 · **OUTREACH GATED**

**Touch 1** — counsellor-approve ONLY (no auto-send; requires academic team confirmation first)
> Hi Swathi! This is [Senior Counsellor name] from Bambinos — Karan asked me to personally follow up.
> You were absolutely right about Ananya's demo — a 6-year-old shouldn't be in a room with 9-year-olds answering before she can count squares. Coach Arvind flagged the same thing.
> We're checking two options for her: our **Age 5–6 'Little Starters' micro-batch (max 3 kids)** or a **complimentary 1-on-1 bridge session** so she can try chess calmly first. I'll confirm seat availability by [day] and message you — no payment needed to check.
> *CTA: reply YES if you'd like us to hold a spot pending confirmation.*

**Touch 2 (Day 3):** Only if micro-batch/bridge confirmed — share batch details + Coach Arvind's warm-up puzzle Ananya enjoyed.
**Touch 3 (Day 5):** Final check-in; if no response → 30-day nurture.

**Stop-triggers:** parent declines again → `Lost`, suppress 90 days; academic team can't offer micro-batch → honest "we'll let you know when it opens" + exit gracefully.

---

## Pipeline leads (no transcript — generated from CRM + demo eval only)

| Lead | Trigger | Sequence type |
|---|---|---|
| **LEAD-807** Arjun (Olympiad, engagement 5/5, UNCALLED 26h) | Priority dial today | Hot-lead call script → standard 3-touch post-call |
| **LEAD-812** Riya (Gita Teen, engagement 5/5, UNCALLED) | Priority dial today | Same |
| **LEAD-809** Dev (Maths, GBP 210 payment FAILED 3DS) | Payment recovery | Payment-recovery 3-touch (card retry / alternate gateway / installment) |
| **LEAD-811** Aarav duplicate | Merge into LEAD-801 | No outreach — dedupe job |
| **LEAD-808 / 810** | Vague notes | Re-qualification call → then standard cadence |
