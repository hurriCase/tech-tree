// ── Tech selection ─────────────────────────────
function selectTech(id) {
  selectedId = id;
  applyHighlight();
  openPanel(id);
}

// ── Detail panel ───────────────────────────────
function openPanel(id) {
  const tech = techMap[id];
  if (!tech) return;
  const col = ERA_COLORS[tech.era] || '#888';
  const t = I18N[lang];
  document.getElementById('panel-stripe').style.background = col;
  document.getElementById('panel-era-label').style.color = col;
  document.getElementById('panel-era-label').textContent = tech.wonder ? t.wonder : tech.unlock_era ? t.eraUnlock : (t['era' + tech.era] || '');
  document.getElementById('panel-title').textContent = getName(tech);
  document.getElementById('panel-desc').textContent = getDesc(tech);
  document.getElementById('lbl-unlocks').textContent = t.unlocks;
  document.getElementById('lbl-requires').textContent = t.requires;
  document.getElementById('leg-req').textContent = t.legReq;
  document.getElementById('leg-or').textContent = t.legOr;
  document.getElementById('panel-costs').innerHTML = `
    <div class="panel-cost-item"><div class="panel-cost-label">${t.labelBeaker}</div><div class="panel-cost-value">🔬 ${fmtExact(tech.bc)}</div></div>
    <div class="panel-cost-item"><div class="panel-cost-label">${t.labelCost}</div><div class="panel-cost-value">💰 ${fmtExact(tech.cost || 0)}</div></div>`;

  const reqsEl = document.getElementById('panel-reqs');
  reqsEl.innerHTML = '';
  const section = document.getElementById('panel-reqs-section');
  if (tech.req) {
    section.style.display = '';
    const isOr = isOrStr(tech.req);
    parseReqs(tech.req).forEach(reqId => {
      const rt = techMap[reqId];
      if (!rt) return;
      const item = document.createElement('div');
      item.className = 'req-item';
      item.innerHTML = `<div class="req-dot" style="background:${ERA_COLORS[rt.era] || '#888'}"></div><span>${getName(rt)}</span><span class="req-type">${isOr ? t.orReq : t.andReq}</span>`;
      item.onclick = () => selectTech(reqId);
      reqsEl.appendChild(item);
    });
  } else {
    section.style.display = 'none';
  }

  document.getElementById('detail-panel').classList.add('open');
  updateChainCostPanel(id);
  updatePanelQueueBtn();
}

function closePanel() {
  selectedId = null;
  applyHighlight();
  document.getElementById('detail-panel').classList.remove('open');
}

document.getElementById('viewport').addEventListener('click', () => closePanel());

// ── Chain cost panel ───────────────────────────
function updateChainCostPanel(id) {
  const t = I18N[lang];
  document.getElementById('lbl-chain').textContent = t.chainCost;
  document.getElementById('lbl-chain-remaining').textContent = t.chainRemaining;

  const { bc, cost, skippedBc, skippedCost, chainSize, skippedCount } = calcChainCost(id);
  const townMult = 1 + cityTowns * 0.1;
  const effectiveBc = Math.round(bc * townMult);

  document.getElementById('chain-bc-value').textContent = fmtExact(effectiveBc)
      + (cityTowns > 0 ? ` ×${townMult.toFixed(1)}` : '');
  document.getElementById('chain-cost-value').textContent = fmtExact(cost);

  const bcSkipEl = document.getElementById('chain-bc-skipped');
  const costSkipEl = document.getElementById('chain-cost-skipped');
  if (skippedCount > 0) {
    bcSkipEl.textContent = `−${fmtExact(Math.round(skippedBc * townMult))} ${t.chainSkippedBc}`;
    bcSkipEl.style.color = '#c0392b';
    costSkipEl.textContent = `−${fmtExact(skippedCost)} ${t.chainSkippedCost}`;
    costSkipEl.style.color = '#c0392b';
  } else {
    bcSkipEl.textContent = '';
    costSkipEl.textContent = '';
  }

  const timeEl = document.getElementById('panel-research-time');
  const timeVal = document.getElementById('panel-time-value');
  const timeLabel = document.getElementById('lbl-time-label');
  const timeStr = calcResearchTime(effectiveBc);
  if (timeStr) {
    timeEl.style.display = '';
    timeVal.textContent = timeStr;
    timeLabel.textContent = t.researchTime;
  } else {
    timeEl.style.display = 'none';
  }

  document.getElementById('panel-chain-section').style.display = chainSize > 0 ? '' : 'none';
}

function updatePanelQueueBtn() {
  const btn = document.getElementById('panel-queue-btn');
  if (!btn || !selectedId) return;
  const t = I18N[lang];
  const inQueue = researchQueue.includes(selectedId);
  btn.textContent = inQueue ? t.queueRemove : t.queueAdd;
  btn.classList.toggle('in-queue', inQueue);
}

// ── City modal ─────────────────────────────────
function toggleCityModal() {
  const overlay = document.getElementById('city-modal-overlay');
  if (overlay.classList.contains('open')) { closeCityModal(); } else { openCityModal(); }
}

function openCityModal() {
  const t = I18N[lang];
  document.getElementById('lbl-city-title').textContent = t.cityTitle;
  document.getElementById('lbl-city-beakers').textContent = t.cityBeakers;
  document.getElementById('lbl-city-beakers-hint').textContent = t.cityBeakersHint;
  document.getElementById('lbl-city-towns').textContent = t.cityTowns;
  document.getElementById('lbl-city-towns-hint').textContent = t.cityTownsHint;
  document.getElementById('city-beakers').value = cityBeakers || '';
  document.getElementById('city-towns').value = cityTowns || '';
  const overlay = document.getElementById('city-modal-overlay');
  overlay.classList.add('open');
  const btn = document.getElementById('city-btn');
  const rect = btn.getBoundingClientRect();
  const modal = document.getElementById('city-modal');
  modal.style.top = (rect.bottom + 6) + 'px';
  modal.style.left = rect.left + 'px';
}

function closeCityModal() {
  document.getElementById('city-modal-overlay').classList.remove('open');
}

function onCityOverlayClick(e) {
  if (e.target === document.getElementById('city-modal-overlay')) closeCityModal();
}

function onCityInput() {
  cityBeakers = Math.max(0, parseInt(document.getElementById('city-beakers').value) || 0);
  cityTowns = Math.max(0, parseInt(document.getElementById('city-towns').value) || 0);
  updateCityBtn();
  saveState();
  if (selectedId) updateChainCostPanel(selectedId);
}

function updateCityBtn() {
  const btn = document.getElementById('city-btn');
  const hasVals = cityBeakers > 0 || cityTowns > 0;
  btn.classList.toggle('has-values', hasVals);
  btn.textContent = hasVals ? `⚙ 🔬${fmtN(cityBeakers)}  🏘${cityTowns}` : '⚙ City';
}
