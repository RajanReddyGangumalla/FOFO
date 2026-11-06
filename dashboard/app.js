/* Post-Demo Call Intelligence — interactive dashboard */
const DATA = { transcripts: {} };
const TRANSCRIPT_FILES = {
  '7001': 'call_01_LEAD801_aarav_english_spouse_objection.txt',
  '7002': 'call_02_LEAD802_zoya_maths_dubai_price_dumping.txt',
  '7003': 'call_03_LEAD803_vihaan_phonics_compliance_redflag.txt',
  '7004': 'call_04_LEAD804_meera_gita_usa_schedule_and_paid_trap.txt',
  '7005': 'call_05_LEAD805_kabir_english_hinglish_competitor_emi.txt',
  '7006': 'call_06_LEAD806_ananya_chess_child_hesitant_rep_gaming_rubric.txt'
};
const STAGE_NAMES = ['Recording', 'Transcript', 'Audit', 'CRM', 'Compliance', 'WhatsApp'];

const TITLES = {
  overview: ['Overview', 'Pipeline health at a glance across all processed calls and leads'],
  live: ['Live Pipeline', 'Realtime simulation — watch each call flow through transcription, audit, CRM and follow-up'],
  audits: ['Call Audits', '6-dimension scorecards with evidence, compliance flags and coaching'],
  crm: ['Cleaned CRM', 'Structured lead fields replacing vague manual dispositions — click a row for detail'],
  wa: ['WhatsApp Sequences', '3-touch personalized cadences with stop-triggers'],
  leaks: ['Pipeline Leaks', 'Revenue leaks detected across the 12-lead CRM snapshot'],
  report: ['Case Report', 'Deliverables A–D compiled report (PDF)']
};
const ICONS = { overview: '◧', live: '▶', audits: '☎', crm: '▤', wa: '✆', leaks: '⚠', report: '▣' };

/* ---------- utils ---------- */
const $ = s => document.querySelector(s);
const esc = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const gradeBadge = g => `<span class="badge b-${g === 'A' ? 'green' : g === 'B' ? 'blue' : g === 'C' ? 'amber' : 'red'} grade g-${g}">${g}</span>`;
const fillClass = p => p >= 70 ? 'f-hi' : p >= 40 ? 'f-mid' : 'f-lo';
const intentBadge = i => {
  const m = { Hot: 'b-red', Warm: 'b-amber', Cold: 'b-gray', Lost: 'b-gray', Enrolled_Paid: 'b-green' };
  const c = { Hot: 'intent-hot', Warm: 'intent-warm', Cold: 'intent-cold', Lost: 'intent-cold', Enrolled_Paid: 'intent-paid' };
  return `<span class="badge ${m[i] || 'b-gray'} ${c[i] || ''}">${i}</span>`;
};
const sevBadge = s => `<span class="badge b-${s === 'critical' ? 'red' : s === 'high' ? 'amber' : 'gray'}">${s}</span>`;

function toast(msg, type = 'ok') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 3200);
}

/* ---------- boot ---------- */
async function load() {
  const files = {
    audits: '../outputs/call_audit_scorecards.json',
    crm: '../outputs/crm_cleaned_leads.json',
    leaks: '../outputs/pipeline_leaks.md',
    wa: '../outputs/whatsapp_sequences.md'
  };
  for (const [k, f] of Object.entries(files)) {
    const r = await fetch(f);
    if (!r.ok) throw new Error(`${f} → ${r.status}`);
    DATA[k] = f.endsWith('.json') ? await r.json() : await r.text();
  }
  // index CRM by lead_id for quick lookup
  DATA.crmById = Object.fromEntries(DATA.crm.leads.map(l => [l.lead_id, l]));
  // index audits by call_id
  DATA.auditByCall = Object.fromEntries(DATA.audits.audits.map(a => [a.call_id, a]));
  buildNav();
  render('overview');
}

function buildNav() {
  $('#nav').innerHTML = Object.keys(TITLES).map(id =>
    `<button data-t="${id}" class="${id === 'overview' ? 'active' : ''}"><span class="ico">${ICONS[id]}</span><span class="txt">${TITLES[id][0]}</span>${id === 'live' ? '<span class="kbd">L</span>' : ''}</button>`).join('');
  document.querySelectorAll('nav button').forEach(b => b.onclick = () => { setTab(b.dataset.t); });
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const map = { '1': 'overview', '2': 'live', '3': 'audits', '4': 'crm', '5': 'wa', '6': 'leaks', '7': 'report' };
    if (map[e.key]) setTab(map[e.key]);
  });
}

function setTab(t) {
  document.querySelectorAll('nav button').forEach(x => x.classList.toggle('active', x.dataset.t === t));
  render(t);
  window.scrollTo({ top: 0 });
}

function render(t) {
  $('#page-title').textContent = TITLES[t][0];
  $('#page-sub').textContent = TITLES[t][1];
  $('#page-actions').innerHTML = '';
  ({ overview: vOverview, live: vLive, audits: vAudits, crm: vCrm, wa: vWa, leaks: vLeaks, report: vReport })[t]();
}

/* ---------- OVERVIEW ---------- */
function vOverview() {
  const s = DATA.audits.scorecard_summary;
  const avg = (s.reduce((a, b) => a + b.total, 0) / s.length).toFixed(1);
  const crit = DATA.audits.audits.reduce((a, x) => a + x.compliance_flags.filter(f => f.severity === 'critical').length, 0);
  const paid = DATA.crm.leads.filter(l => l.lead_intent === 'Enrolled_Paid').length;
  const hot = DATA.crm.leads.filter(l => l.intent_score_1_to_10 >= 8 && l.lead_intent !== 'Enrolled_Paid').length;
  const recover = DATA.crm.leads.filter(l => l.primary_objection_bucket === 'Payment_Failure').length;

  $('#content').innerHTML = `
    <div class="kpis">
      <div class="kpi" onclick="setTab('audits')" style="cursor:pointer"><div class="num">${s.length}</div><div class="lbl">Calls audited</div><div class="delta up">▲ 100% coverage</div></div>
      <div class="kpi"><div class="num">${avg}<span style="font-size:16px;color:var(--muted)">/60</span></div><div class="lbl">Avg call score</div></div>
      <div class="kpi" onclick="setTab('audits')" style="cursor:pointer"><div class="num" style="color:var(--red)">${crit}</div><div class="lbl">Critical flags</div><div class="delta down">▼ 2 calls suppressed</div></div>
      <div class="kpi" onclick="setTab('crm')" style="cursor:pointer"><div class="num" style="color:var(--green)">${paid}</div><div class="lbl">Paid enrollments</div></div>
      <div class="kpi" onclick="setTab('crm')" style="cursor:pointer"><div class="num" style="color:var(--amber)">${hot}</div><div class="lbl">Hot leads pending</div></div>
      <div class="kpi" onclick="setTab('wa')" style="cursor:pointer"><div class="num" style="color:var(--blue)">${recover}</div><div class="lbl">Payment recoveries</div></div>
    </div>

    <div class="live-wrap">
      <div>
        <div class="panel"><div class="panel-head"><h3>Call score distribution</h3><span class="badge b-gray">click bar → audit</span></div>
          <div class="panel-body">
            ${s.map(x => `<div class="score-row" style="cursor:pointer" onclick="openAudit('${x.call_id}')">
              <div class="name mono">${x.call_id} · ${x.lead_id}</div>
              <div class="track"><div class="fill ${fillClass(x.total / 60 * 100)}" style="width:${x.total / 60 * 100}%"></div></div>
              <div class="val">${x.total} ${gradeBadge(x.grade)}</div></div>`).join('')}
          </div></div>

        <div class="panel"><div class="panel-head"><h3>Revenue funnel projection</h3><span class="badge b-indigo">+2.5pp scenario</span></div>
          <div class="panel-body">
            <div class="funnel">
              <div class="funnel-row"><div class="fl">Demos / week</div><div class="fbar base" style="width:100%">1,000</div><div class="fv">top of funnel</div></div>
              <div class="funnel-row"><div class="fl">Baseline paid (15%)</div><div class="fbar base" style="width:15%">150</div><div class="fv">$22.5K/wk</div></div>
              <div class="funnel-row"><div class="fl">With AI pipeline (17.5%)</div><div class="fbar proj" style="width:17.5%">175</div><div class="fv up">+$3.75K/wk · ~$195K/yr</div></div>
            </div>
            <p class="muted mt16" style="font-size:12.5px">Lift sources evidenced in this dataset: uncalled 5/5-engagement demos, same-day payment-failure recovery, spouse-armament assets, compliance-burn prevention.</p>
          </div></div>
      </div>

      <div>
        <div class="panel"><div class="panel-head"><h3>Actions queued</h3><button class="btn sm" onclick="setTab('live')">▶ Run live</button></div>
          <div class="panel-body" style="font-size:13px;line-height:2.1">
            <span class="badge b-red">URGENT</span> Compliance review — LEAD-803, LEAD-806<br>
            <span class="badge b-amber">TODAY</span> Hot calls — LEAD-807, LEAD-812<br>
            <span class="badge b-blue">RECOVERY</span> Payment retry — LEAD-805, LEAD-809<br>
            <span class="badge b-green">DONE</span> Auto-enrolled — LEAD-804<br>
            <span class="badge b-gray">OPS</span> Merge dup — LEAD-811→801
          </div></div>
        <div class="panel"><div class="panel-head"><h3>Pipeline coverage</h3></div>
          <div class="panel-body">
            <div class="score-row"><div class="name">Manual audit (before)</div><div class="track"><div class="fill f-lo" style="width:2%"></div></div><div class="val">2%</div></div>
            <div class="score-row"><div class="name">AI audit (after)</div><div class="track"><div class="fill f-hi" style="width:100%"></div></div><div class="val">100%</div></div>
            <div class="score-row"><div class="name">CRM note quality</div><div class="track"><div class="fill f-lo" style="width:15%"></div></div><div class="val">vague</div></div>
            <div class="score-row"><div class="name">Structured fields</div><div class="track"><div class="fill f-hi" style="width:100%"></div></div><div class="val">12/12</div></div>
          </div></div>
      </div>
    </div>`;
}

/* ---------- LIVE PIPELINE ---------- */
let liveState = { running: false, speed: 1, timers: [] };

function vLive() {
  $('#page-actions').innerHTML = `
    <div class="speed-ctl">Speed:
      ${[1, 2, 4].map(s => `<button class="chip ${liveState.speed === s ? 'on' : ''}" data-speed="${s}" onclick="setSpeed(${s})">${s}×</button>`).join('')}
    </div>
    <button class="btn ghost" onclick="resetLive()">↺ Reset</button>
    <button class="btn primary" id="run-btn" onclick="runPipeline()">${liveState.running ? 'Running…' : '▶ Run pipeline'}</button>`;

  const audits = DATA.audits.audits;
  $('#content').innerHTML = `
    <div class="live-wrap">
      <div>
        <div class="panel"><div class="panel-head"><h3>Call processing queue</h3><span class="badge b-gray" id="live-progress">0 / ${audits.length} complete</span></div>
          <div class="panel-body" id="pipe-cards">
            ${audits.map(a => `
              <div class="pipe-card" id="pc-${a.call_id}">
                <div class="pc-head">
                  <div><span class="pc-name">Call ${a.call_id}</span> <span class="pc-meta">· ${esc(a.student)} · ${esc(a.course)}</span></div>
                  <span class="badge b-gray" id="pc-status-${a.call_id}">queued</span>
                </div>
                <div class="stages">${STAGE_NAMES.map((_, i) => `<div class="stage-dot" id="sd-${a.call_id}-${i}"></div>`).join('')}</div>
                <div class="stage-labels">${STAGE_NAMES.map(s => `<span>${s}</span>`).join('')}</div>
              </div>`).join('')}
          </div></div>
      </div>
      <div class="panel" style="align-self:start"><div class="panel-head"><h3>Event stream</h3><span class="badge b-indigo">live</span></div>
        <div class="event-log" id="event-log"><div><span class="ev-time">--:--:--</span> <span class="ev-info">Pipeline idle. Press “Run pipeline” to simulate realtime processing.</span></div><span class="cursor"></span></div>
      </div>
    </div>`;
}

function setSpeed(s) {
  liveState.speed = s;
  document.querySelectorAll('.speed-ctl .chip').forEach(c => c.classList.toggle('on', +c.dataset.speed === s));
}

function resetLive() {
  liveState.timers.forEach(clearTimeout); liveState.timers = [];
  liveState.running = false;
  document.querySelectorAll('.stage-dot').forEach(d => d.className = 'stage-dot');
  document.querySelectorAll('[id^="pc-status-"]').forEach(e => { e.className = 'badge b-gray'; e.textContent = 'queued'; });
  $('#live-progress').textContent = `0 / ${DATA.audits.audits.length} complete`;
  const btn = $('#run-btn'); if (btn) { btn.disabled = false; btn.textContent = '▶ Run pipeline'; }
  $('#run-status').innerHTML = '<span class="pulse"></span>Idle';
  logEvent('Pipeline reset. Ready for next run.', 'info');
}

function logEvent(msg, cls = 'info') {
  const log = $('#event-log'); if (!log) return;
  const cursor = log.querySelector('.cursor');
  if (cursor) cursor.remove();
  const t = new Date().toTimeString().slice(0, 8);
  const div = document.createElement('div');
  div.innerHTML = `<span class="ev-time">${t}</span> <span class="ev-${cls}">${msg}</span>`;
  log.appendChild(div);
  log.appendChild(Object.assign(document.createElement('span'), { className: 'cursor' }));
  log.scrollTop = log.scrollHeight;
}

const wait = ms => sleep(ms / liveState.speed);

async function runPipeline() {
  if (liveState.running) return;
  liveState.running = true;
  const btn = $('#run-btn'); btn.disabled = true; btn.textContent = 'Running…';
  $('#run-status').innerHTML = '<span class="pulse live"></span>Processing';
  const audits = DATA.audits.audits;
  let done = 0;

  logEvent(`Pipeline started — ${audits.length} recordings received from telephony webhook`, 'ok');

  for (const a of audits) {
    const cid = a.call_id;
    setStage(cid, 0, 'active'); setStatus(cid, 'processing', 'b-blue');
    logEvent(`[${cid}] Recording received (${Math.round(a.duration_sec / 60)}m ${a.duration_sec % 60}s) — sending to transcription`, 'info');
    await wait(900);

    setStage(cid, 0, 'done'); setStage(cid, 1, 'active');
    logEvent(`[${cid}] Transcribing audio → timestamped transcript (${a.rep_talk_time_pct_observed}% rep talk-time detected)`, 'info');
    await wait(1100);

    setStage(cid, 1, 'done'); setStage(cid, 2, 'active');
    logEvent(`[${cid}] Running audit prompt — scoring 6 dimensions…`, 'info');
    await wait(1300);
    const crit = a.compliance_flags.filter(f => f.severity === 'critical').length;
    logEvent(`[${cid}] Audit complete: <b>${a.total_score}/60 (${a.grade})</b>${crit ? ` — <span class="ev-err">${crit} critical compliance flag(s)</span>` : ''}`, crit ? 'err' : 'ok');
    await wait(400);

    setStage(cid, 2, 'done'); setStage(cid, 3, 'active');
    const lead = DATA.crmById[a.lead_id];
    logEvent(`[${cid}] CRM updated: intent=<b>${lead.lead_intent}</b> score=${lead.intent_score_1_to_10}/10 objection=<b>${lead.primary_objection_bucket}</b> → ${lead.next_best_action}`, 'ok');
    await wait(800);

    setStage(cid, 3, 'done'); setStage(cid, 4, 'active');
    if (a.escalate_to_manager) {
      logEvent(`[${cid}] ⚠ COMPLIANCE GATE: outreach suppressed, manager alert sent, payment link voided`, 'err');
    } else if (a.suppress_parent_outreach) {
      logEvent(`[${cid}] ⚠ Outreach suppressed per guardrail rules`, 'warn');
    } else {
      logEvent(`[${cid}] Compliance check passed — ${a.compliance_flags.length} flag(s) logged for coaching`, 'ok');
    }
    await wait(700);

    setStage(cid, 4, 'done'); setStage(cid, 5, 'active');
    if (lead.next_best_action === 'Onboarding_Sequence') {
      logEvent(`[${cid}] Payment reconciled (Paid) → sales cadence stopped, onboarding sequence queued`, 'ok');
    } else if (lead.next_best_action === 'Payment_Recovery_Resend_Link') {
      logEvent(`[${cid}] Payment-failure recovery WhatsApp queued (Touch 1 auto-send ≤1h)`, 'ok');
    } else if (lead.next_best_action === 'Manager_Compliance_Review_Suppress_Outreach' || lead.next_best_action === 'Academic_Team_Batch_Fix_Then_Reengage') {
      logEvent(`[${cid}] WhatsApp gated — requires human approval before send`, 'warn');
    } else {
      logEvent(`[${cid}] 3-touch WhatsApp sequence generated (Touch 1 auto, Touches 2–3 approve)`, 'ok');
    }
    await wait(600);

    setStage(cid, 5, 'done');
    setStatus(cid, a.grade === 'F' ? 'flagged' : 'done', a.grade === 'F' ? 'b-red' : 'b-green');
    done++;
    $('#live-progress').textContent = `${done} / ${audits.length} complete`;
    await wait(500);
  }

  logEvent(`Pipeline run complete — ${done}/${audits.length} calls processed. 2 suppressed, 1 auto-enrolled, 2 payment recoveries queued.`, 'ok');
  toast(`Pipeline run complete — ${done} calls processed`, 'ok');
  liveState.running = false;
  btn.disabled = false; btn.textContent = '↻ Run again';
  $('#run-status').innerHTML = '<span class="pulse"></span>Idle';
}

function setStage(cid, idx, state) {
  const el = $(`#sd-${cid}-${idx}`); if (!el) return;
  el.className = 'stage-dot ' + (state === 'done' ? 'done' : state === 'active' ? 'active' : state === 'fail' ? 'fail' : '');
}
function setStatus(cid, text, cls) {
  const el = $(`#pc-status-${cid}`); if (!el) return;
  el.className = `badge ${cls}`; el.textContent = text;
  const card = $(`#pc-${cid}`);
  if (card) {
    card.classList.remove('processing', 'done-card', 'flag-card');
    if (text === 'processing') card.classList.add('processing');
    else if (text === 'flagged') card.classList.add('flag-card');
    else if (text === 'done') card.classList.add('done-card');
  }
}

/* ---------- CALL AUDITS ---------- */
function openAudit(callId) {
  const a = DATA.auditByCall[callId]; if (!a) return;
  setTab('audits');
  setTimeout(() => {
    const idx = DATA.audits.audits.findIndex(x => x.call_id === callId);
    const card = $(`#audit-${idx}`);
    if (card && !card.classList.contains('open')) card.classList.add('open');
    card && card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 60);
}

function vAudits() {
  $('#content').innerHTML = DATA.audits.audits.map((a, i) => `
    <div class="audit ${a.grade === 'F' ? 'open' : ''}" id="audit-${i}">
      <div class="audit-head" onclick="this.parentElement.classList.toggle('open')">
        <span class="chev">▶</span>
        <div>
          <div class="audit-title">Call ${a.call_id} — ${esc(a.student)}</div>
          <div class="audit-sub">${esc(a.course)} · ${a.counsellor} · ${Math.round(a.duration_sec / 60)} min · rep talk ${a.rep_talk_time_pct_observed}%</div>
        </div>
        <div class="audit-right">
          ${a.compliance_flags.filter(f => f.severity === 'critical').map(f => `<span class="badge b-red">${f.flag}</span>`).join('')}
          <button class="btn sm" onclick="event.stopPropagation();openTranscript('${a.call_id}')">Transcript</button>
          <span class="badge b-gray mono">${a.total_score}/60</span> ${gradeBadge(a.grade)}
        </div>
      </div>
      <div class="audit-body">
        <div class="dim-grid">
          ${Object.entries(a.scores).map(([k, v]) => `<div class="dim-item">
            <span class="dn">${k.replace(/_/g, ' ')}</span>
            <div class="dt"><div class="df ${fillClass(v.score * 10)}" style="width:${v.score * 10}%"></div></div>
            <span class="dv">${v.score}</span></div>`).join('')}
        </div>
        <h4 style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px">Compliance flags</h4>
        ${a.compliance_flags.map(f => `<div class="flag-item">${sevBadge(f.severity)} <b>${f.flag}</b> <span class="ev">— ${esc(f.evidence)}</span></div>`).join('')}
        <h4 style="font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;margin:16px 0 6px">Coaching feedback</h4>
        ${a.coaching_feedback.map(c => `<div class="coach"><b>P${c.priority} · ${esc(c.issue)}</b><div class="rephrase">→ ${esc(c.suggested_rephrase)}</div></div>`).join('')}
      </div>
    </div>`).join('');
}

/* ---------- TRANSCRIPT MODAL ---------- */
async function openTranscript(callId) {
  const a = DATA.auditByCall[callId];
  const file = TRANSCRIPT_FILES[callId];
  if (!file) { toast('Transcript not found', 'err'); return; }
  if (!DATA.transcripts[file]) {
    const r = await fetch(`../sales/call_transcripts/${file}`);
    DATA.transcripts[file] = await r.text();
  }
  const text = DATA.transcripts[file];
  // collect evidence timestamps from this audit
  const stamps = new Set();
  JSON.stringify(a.scores).replace(/\[(\d{2}:\d{2})\]/g, (_, ts) => { stamps.add(ts); return _; });
  a.compliance_flags.forEach(f => (f.evidence.match(/\[(\d{2}:\d{2})\]/g) || []).forEach(m => stamps.add(m.slice(1, -1))));
  a.coaching_feedback.forEach(c => (c.evidence.match(/\[(\d{2}:\d{2})\]/g) || []).forEach(m => stamps.add(m.slice(1, -1))));

  const lines = text.split('\n').filter(l => l.trim());
  const body = lines.map(l => {
    const m = l.match(/^\[(\d{2}:\d{2})\]\s+(COUNSELLOR|PARENT)\s*(?:\(([^)]*)\))?:\s*(.*)$/);
    if (!m) return `<div class="t-line"><span class="ts"></span><span>${esc(l)}</span></div>`;
    const [, ts, who, name, msg] = m;
    const hl = stamps.has(ts) ? ' hl' : '';
    return `<div class="t-line${hl}"><span class="ts">[${ts}]</span><span class="who ${who === 'COUNSELLOR' ? 'c' : 'p'}">${who === 'COUNSELLOR' ? 'Counsellor' : 'Parent'}${name ? ' · ' + esc(name) : ''}</span><span>${esc(msg)}</span></div>`;
  }).join('');

  $('#modal-title').textContent = `Transcript — Call ${callId}`;
  $('#modal-sub').textContent = `${a.student} · ${a.course} · ${a.counsellor}`;
  $('#modal-body').innerHTML = `
    <div class="t-legend"><span><span class="sw"></span>highlighted = evidence cited in audit scorecard</span><span>· ${stamps.size} citations</span></div>
    ${body}`;
  $('#modal').classList.remove('hidden');
}
function closeModal() { $('#modal').classList.add('hidden'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeDrawer(); } });

/* ---------- CLEANED CRM ---------- */
let crmFilter = { q: '', intent: 'all' };
function vCrm() {
  const intents = ['all', 'Enrolled_Paid', 'Hot', 'Warm', 'Cold', 'Lost'];
  $('#page-actions').innerHTML = `
    <input class="search" id="crm-q" placeholder="Search lead, student, objection…" value="${esc(crmFilter.q)}" oninput="crmFilter.q=this.value;renderCrmTable()">
    <div class="filters">${intents.map(i => `<button class="chip ${crmFilter.intent === i ? 'on' : ''}" onclick="crmFilter.intent='${i}';vCrm()">${i === 'all' ? 'All intents' : i}</button>`).join('')}</div>`;
  renderCrmTable();
}
function renderCrmTable() {
  const q = crmFilter.q.toLowerCase();
  const order = { Enrolled_Paid: 0, Hot: 1, Warm: 2, Cold: 3, Lost: 4 };
  let leads = DATA.crm.leads.filter(l =>
    (crmFilter.intent === 'all' || l.lead_intent === crmFilter.intent) &&
    (!q || [l.lead_id, l.student, l.course, l.primary_objection_bucket, l.next_best_action].join(' ').toLowerCase().includes(q)));
  leads.sort((a, b) => (order[a.lead_intent] ?? 9) - (order[b.lead_intent] ?? 9) || b.intent_score_1_to_10 - a.intent_score_1_to_10);
  $('#content').innerHTML = `
    <div class="panel"><div class="panel-head"><h3>Structured leads</h3><span class="badge b-gray">${leads.length} shown · click row for detail</span></div>
    <div class="tbl-wrap"><table><thead><tr>
      <th>Lead</th><th>Student / Course</th><th>Intent</th><th>Score</th><th>Objection</th><th>Next best action</th><th>Stage</th>
    </tr></thead><tbody>
      ${leads.map(l => `<tr onclick="openLead('${l.lead_id}')">
        <td class="mono">${l.lead_id}</td>
        <td><b>${esc(l.student)}</b><br><span class="muted" style="font-size:12px">${esc(l.course)} · ${esc(l.geo)}</span></td>
        <td>${intentBadge(l.lead_intent)}</td>
        <td><b>${l.intent_score_1_to_10}</b><span class="muted">/10</span></td>
        <td style="font-size:12.5px">${esc(l.primary_objection_bucket)}${l.secondary_objections.length ? `<br><span class="muted" style="font-size:11px">+${l.secondary_objections.join(', ')}</span>` : ''}</td>
        <td style="font-size:12.5px">${esc(l.next_best_action)}</td>
        <td class="mono muted" style="font-size:11.5px">${esc(l.crm_stage_recommendation)}</td>
      </tr>`).join('') || `<tr><td colspan="7" class="empty">No leads match</td></tr>`}
    </tbody></table></div></div>
    <p class="muted" style="font-size:12px;margin-top:8px">Each lead's <code>child_demo_highlight</code> and evidence quotes are in the detail drawer →</p>`;
}

function openLead(id) {
  const l = DATA.crmById[id]; if (!l) return;
  const audit = Object.values(DATA.auditByCall).find(a => a.lead_id === id);
  $('#drawer-title').textContent = `${id} — ${l.student}`;
  $('#drawer-body').innerHTML = `
    <div class="kv"><span class="k">Intent</span><span class="v">${intentBadge(l.lead_intent)} ${l.intent_score_1_to_10}/10</span></div>
    <div class="kv"><span class="k">Course</span><span class="v">${esc(l.course)}</span></div>
    <div class="kv"><span class="k">Geo</span><span class="v">${esc(l.geo)}</span></div>
    <div class="kv"><span class="k">Decision maker</span><span class="v">${esc(l.decision_maker_identified)}</span></div>
    <div class="kv"><span class="k">Primary objection</span><span class="v">${esc(l.primary_objection_bucket)}</span></div>
    <div class="kv"><span class="k">Next best action</span><span class="v" style="font-size:12px">${esc(l.next_best_action)}</span></div>
    <div class="kv"><span class="k">Recommended stage</span><span class="v mono" style="font-size:11.5px">${esc(l.crm_stage_recommendation)}</span></div>
    <div class="kv"><span class="k">Next follow-up</span><span class="v mono" style="font-size:11.5px">${esc(l.suggested_next_followup_at || '—')}</span></div>
    <div class="kv"><span class="k">Payment status</span><span class="v" style="font-size:12px">${esc(l.payment_status)}</span></div>

    <div class="section-title">Child demo highlight (WhatsApp hook)</div>
    <div class="quote">${esc(l.child_demo_highlight)}</div>

    ${l.secondary_objections.length ? `<div class="section-title">Secondary objections</div><div>${l.secondary_objections.map(o => `<span class="badge b-amber">${esc(o)}</span>`).join(' ')}</div>` : ''}

    ${l.evidence_quotes.length ? `<div class="section-title">Evidence from call</div>${l.evidence_quotes.map(q => `<div class="quote">${esc(q)}</div>`).join('')}` : ''}

    ${l.data_quality_flags.length ? `<div class="section-title">Data quality flags</div><div>${l.data_quality_flags.map(f => `<span class="badge b-red" style="margin:2px">${esc(f)}</span>`).join(' ')}</div>` : ''}

    ${audit ? `<div class="section-title">Linked call audit</div>
      <div style="display:flex;gap:8px;align-items:center">
        <span class="badge b-gray mono">${audit.call_id}</span> ${gradeBadge(audit.grade)}
        <span class="mono" style="font-size:12px">${audit.total_score}/60</span>
        <button class="btn sm" onclick="closeDrawer();openAudit('${audit.call_id}')">View scorecard</button>
        <button class="btn sm" onclick="closeDrawer();openTranscript('${audit.call_id}')">Transcript</button>
      </div>` : ''}

    <div class="section-title">Replaces manual note</div>
    <div class="quote" style="border-left-color:var(--red);font-style:normal">“${esc(l.replaces_manual_note)}”</div>`;
  $('#drawer').classList.remove('hidden');
  requestAnimationFrame(() => $('#drawer').classList.add('open'));
  $('#drawer-overlay').classList.remove('hidden');
}
function closeDrawer() {
  $('#drawer').classList.remove('open');
  $('#drawer-overlay').classList.add('hidden');
  setTimeout(() => $('#drawer').classList.add('hidden'), 260);
}

/* ---------- WHATSAPP ---------- */
function vWa() {
  const md = DATA.wa;
  const sections = md.split(/^## /m).slice(1);
  $('#content').innerHTML = sections.map((sec, i) => {
    const title = sec.split('\n')[0].trim();
    const body = sec.split('\n').slice(1).join('\n');
    const touches = [];
    const re = /\*\*Touch (\d)[^*]*\*\*\s*—?\s*([^\n]*)\n> ([\s\S]*?)(?=\n\*\*Touch|\n---|$)/g;
    let m;
    while ((m = re.exec(body))) touches.push({ n: m[1], meta: m[2].trim(), text: m[3].trim() });
    const status = (body.match(/\*\*Status: `?(\w+)/) || [])[1] || '';
    const badge = status.includes('SUPPRESS') ? '<span class="badge b-red">suppressed</span>'
      : status.includes('PAID') ? '<span class="badge b-green">paid → onboarding</span>'
      : status.includes('GATED') ? '<span class="badge b-amber">approval-gated</span>'
      : '<span class="badge b-blue">active</span>';
    return `<div class="audit seq ${i === 0 ? 'open' : ''}" id="seq-${i}">
      <div class="seq-head" onclick="document.getElementById('seq-${i}').classList.toggle('open')">
        <span class="chev">▶</span><div style="flex:1"><b style="font-size:13.5px">${esc(title)}</b></div>${badge}
      </div>
      <div class="seq-body">
        ${touches.length ? touches.map(t => `
          <div class="touch-label">Touch ${t.n} <span class="when">${esc(t.meta)}</span></div>
          <div class="wa-msg">${esc(t.text)}</div>
          <div class="wa-actions"><button class="btn sm" onclick="copyText(this)">⧉ Copy</button><button class="btn sm" onclick="toast('Simulated send queued (demo)','ok')">➤ Simulate send</button></div>`).join('')
        : `<div style="padding:14px 0;font-size:13px;color:var(--muted);white-space:pre-wrap">${esc(body.slice(0, 1200))}</div>`}
      </div></div>`;
  }).join('') || '<div class="empty">No sequences found</div>';
}
function copyText(btn) {
  const msg = btn.closest('.seq-body').querySelector('.wa-msg');
  navigator.clipboard.writeText(msg.textContent).then(() => toast('Message copied to clipboard', 'ok'));
}

/* ---------- LEAKS ---------- */
function vLeaks() {
  const md = DATA.leaks;
  const rows = [];
  md.split('\n').forEach(l => {
    if (l.startsWith('|') && !l.includes('---') && !l.startsWith('| #')) {
      const c = l.split('|').map(x => x.trim()).filter(Boolean);
      if (c.length >= 4 && /^\d/.test(c[0])) rows.push(c);
    }
  });
  $('#content').innerHTML = `
    <div class="panel"><div class="panel-body" style="font-size:13.5px;color:var(--muted);line-height:1.7">
      Scan of the 12-lead CRM joined with demo evals, call logs, orders and call audits.
      <b style="color:var(--text)">8 of 12 leads had actionable leaks</b> — 2 revenue-ready but stranded, 1 compliance incident, 1 duplicate.
    </div></div>
    ${rows.map((r, i) => `<div class="panel"><div class="leak">
      <div class="leak-num">${i + 1}</div>
      <div><h4>${esc(r[1])} <span class="badge b-gray mono" style="margin-left:6px">${esc(r[2])}</span></h4>
      <p>${esc(r[3])}</p>
      <p class="fix" style="margin-top:6px">→ ${esc(r[4])}</p></div>
    </div></div>`).join('')}`;
}

/* ---------- REPORT ---------- */
function vReport() {
  $('#content').innerHTML = `
    <div class="panel"><div class="panel-body" style="text-align:center;padding:50px 30px">
      <div style="font-size:44px;margin-bottom:14px">▣</div>
      <h3 style="font-size:18px;margin-bottom:8px">Case Report — Deliverables A to D</h3>
      <p class="muted" style="max-width:520px;margin:0 auto 22px;font-size:13.5px;line-height:1.7">
        Compiled PDF covering the call scorecard framework, CRM taxonomy, workflow architecture with guardrails,
        funnel math (+$195K/yr at +2.5pp) and the 30-60-90 rollout plan.
      </p>
      <a class="btn primary" href="../case_report.pdf" target="_blank">⬇ Open / Download PDF</a>
      <div class="mt16" style="font-size:12px;color:var(--faint)">case_report.pdf · 3 pages · generated from case_report.md</div>
    </div></div>
    <div class="kpis">
      <div class="kpi"><div class="num">A</div><div class="lbl">Scorecard + taxonomy<br><span class="muted" style="font-size:11px">docs/deliverable_a_framework.md</span></div></div>
      <div class="kpi"><div class="num">B</div><div class="lbl">Workflow + guardrails<br><span class="muted" style="font-size:11px">docs/deliverable_b_workflow.md</span></div></div>
      <div class="kpi"><div class="num">C</div><div class="lbl">Prototype outputs<br><span class="muted" style="font-size:11px">outputs/ + this dashboard</span></div></div>
      <div class="kpi"><div class="num">D</div><div class="lbl">ROI + rollout<br><span class="muted" style="font-size:11px">docs/deliverable_d_rollout.md</span></div></div>
    </div>`;
}

/* ---------- theme ---------- */
function currentTheme() { return document.documentElement.dataset.theme || 'dark'; }
function syncThemeUI() {
  const light = currentTheme() === 'light';
  const icon = $('#theme-icon');
  if (icon) icon.textContent = light ? '☾' : '☀';
  const label = $('#theme-label');
  if (label) label.textContent = light ? 'Dark mode' : 'Light mode';
}
function toggleTheme() {
  const next = currentTheme() === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('ci-theme', next);
  syncThemeUI();
  toast(`Switched to ${next} theme`, 'ok');
}

load().then(syncThemeUI).catch(e => {
  $('#content').innerHTML = `<div class="empty">Failed to load pipeline data: ${esc(String(e))}<br><br>Serve the repo root, e.g. <code>python3 -m http.server 8080</code> from the project directory.</div>`;
});
