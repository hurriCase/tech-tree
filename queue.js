// ── Queue panel toggle ─────────────────────────
function toggleQueuePanel() {
  document.getElementById('queue-panel').classList.toggle('open');
}

// ── Queue validation ───────────────────────────
function validateQueueable(id, available) {
  const tech = techMap[id];
  if (!tech || !tech.req) return null;
  if (tech.req.includes('/')) {
    const branches = tech.req.split('/').filter(Boolean);
    const anyReady = branches.some(branchId => checkedIds.has(branchId) || available.has(branchId));
    if (!anyReady) {
      return branches.map(branchId => { const bt = techMap[branchId]; return bt ? getName(bt) : branchId; }).join(' / ');
    }
    return null;
  }
  const deps = tech.req.split(':').filter(Boolean);
  for (const depId of deps) {
    if (!checkedIds.has(depId) && !available.has(depId)) {
      const depTech = techMap[depId];
      return depTech ? getName(depTech) : depId;
    }
  }
  return null;
}

function buildResearchOrder(targetId) {
  const available = new Set(checkedIds);
  researchQueue.forEach(id => available.add(id));
  const toProcess = [];
  const visited = new Set();

  function collect(id) {
    if (visited.has(id)) return;
    visited.add(id);
    if (checkedIds.has(id) || available.has(id)) return;
    const tech = techMap[id];
    if (!tech) return;
    if (tech.req) {
      if (tech.req.includes('/')) {
        const branches = tech.req.split('/').filter(Boolean);
        const satisfied = branches.find(branchId => checkedIds.has(branchId) || available.has(branchId));
        if (!satisfied) {
          const best = pickBestBranch(branches, available);
          if (best) collect(best);
        }
      } else {
        tech.req.split(':').filter(Boolean).forEach(depId => collect(depId));
      }
    }
    toProcess.push(id);
    available.add(id);
  }

  collect(targetId);

  const validateSet = new Set(checkedIds);
  researchQueue.forEach(id => validateSet.add(id));
  for (const id of toProcess) {
    const missing = validateQueueable(id, validateSet);
    if (missing) {
      const techName = getName(techMap[id] || { name: id });
      return { order: [], error: `"${techName}" — ${I18N[lang].queueError} "${missing}"` };
    }
    validateSet.add(id);
  }
  return { order: toProcess, error: null };
}

// ── Queue mutation ─────────────────────────────
function toggleQueueItem() {
  if (!selectedId) return;
  const idx = researchQueue.indexOf(selectedId);
  if (idx !== -1) {
    removeFromQueueWithDependents(selectedId);
  } else {
    const { order, error } = buildResearchOrder(selectedId);
    if (error) { showQueueError(error); return; }
    order.forEach(id => { if (!researchQueue.includes(id)) researchQueue.push(id); });
  }
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function removeFromQueueWithDependents(id) {
  const idxToRemove = new Set([id]);
  for (let i = 0; i < researchQueue.length; i++) {
    const qId = researchQueue[i];
    if (idxToRemove.has(qId)) continue;
    const tech = techMap[qId];
    if (!tech || !tech.req) continue;
    const deps = tech.req.includes('/') ? tech.req.split('/') : tech.req.split(':');
    if (deps.some(depId => idxToRemove.has(depId))) idxToRemove.add(qId);
  }
  idxToRemove.forEach(removeId => {
    const i = researchQueue.indexOf(removeId);
    if (i !== -1) researchQueue.splice(i, 1);
  });
}

function removeQueueItem(id) {
  removeFromQueueWithDependents(id);
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function clearQueue() {
  researchQueue.length = 0;
  applyQueueOverlay();
  renderQueue();
  updatePanelQueueBtn();
  saveState();
}

function showQueueError(message) {
  const el = document.getElementById('queue-error');
  el.innerHTML = `<div class="queue-error">⚠ ${message}</div>`;
  setTimeout(() => { el.innerHTML = ''; }, 4000);
  document.getElementById('queue-panel').classList.add('open');
}

// ── Queue render ───────────────────────────────
function renderQueue() {
  const t = I18N[lang];
  document.getElementById('lbl-queue-title').textContent = t.queueTitle;
  document.getElementById('lbl-queue-clear').textContent = t.queueClear;

  const listEl = document.getElementById('queue-list');
  listEl.innerHTML = '';

  if (researchQueue.length === 0) {
    listEl.innerHTML = `<div class="queue-empty">${t.queueEmpty}</div>`;
    document.getElementById('queue-total').innerHTML = '';
    document.getElementById('queue-toggle-btn').classList.remove('has-queue');
    document.getElementById('queue-toggle-btn').textContent = '📋 Queue';
    return;
  }

  document.getElementById('queue-toggle-btn').classList.add('has-queue');
  document.getElementById('queue-toggle-btn').textContent = `📋 Queue (${researchQueue.length})`;

  let totalBc = 0, totalCost = 0;
  const townMult = 1 + cityTowns * 0.1;

  researchQueue.forEach((id, index) => {
    const tech = techMap[id];
    if (!tech) return;
    totalBc += (tech.bc || 0);
    totalCost += (tech.cost || 0);
    const item = document.createElement('div');
    item.className = 'queue-item';
    const col = ERA_COLORS[tech.era] || '#888';
    item.innerHTML = `
      <span class="queue-item-num">${index + 1}</span>
      <div class="queue-item-dot" style="background:${col}"></div>
      <span class="queue-item-name">${getName(tech)}</span>
      <button class="queue-item-remove" onclick="removeQueueItem('${id}')" title="Remove">✕</button>`;
    listEl.appendChild(item);
  });

  const effectiveBc = Math.round(totalBc * townMult);
  const timeStr = calcResearchTime(effectiveBc);
  const totalEl = document.getElementById('queue-total');
  totalEl.innerHTML = `
    <div>${t.queueTotal} <span>🔬 ${fmtExact(effectiveBc)}${cityTowns > 0 ? ` ×${townMult.toFixed(1)}` : ''}</span> &nbsp; <span>💰 ${fmtExact(totalCost)}</span></div>
    ${timeStr ? `<div>⏱ <span>${timeStr}</span></div>` : ''}`;

  applyQueueOverlay();
}

// ── Export ─────────────────────────────────────
function exportQueue(format) {
  if (researchQueue.length === 0) return;
  const t = I18N[lang];
  const townMult = 1 + cityTowns * 0.1;
  let totalBc = 0, totalCost = 0;

  const rows = researchQueue.map((id, i) => {
    const tech = techMap[id];
    if (!tech) return null;
    const bc = Math.round((tech.bc || 0) * townMult);
    totalBc += bc;
    totalCost += (tech.cost || 0);
    const nextTech = researchQueue[i + 1] ? techMap[researchQueue[i + 1]] : null;
    return { num: i + 1, name: getName(tech), desc: getDesc(tech), nextName: nextTech ? getName(nextTech) : null };
  }).filter(Boolean);

  const timeStr = calcResearchTime(Math.round(totalBc));
  const header = `Research Queue — ${new Date().toLocaleDateString()}`;
  let text = '';

  if (format === 'txt') {
    text += header + '\n' + '='.repeat(header.length) + '\n\n';
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `${r.name}${arrow}\n`;
      if (r.desc) text += `  (${r.desc})\n`;
    });
    text += '\n' + '-'.repeat(40) + '\n';
    text += `Total: 🔬 ${fmtExact(Math.round(totalBc))}  💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += `  ⏱ ${timeStr}`;
    downloadText(text, 'research-queue.txt', 'text/plain');
  } else if (format === 'md') {
    text += `# ${header}\n\n`;
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `- **${r.name}**${arrow}`;
      if (r.desc) text += ` *(${r.desc})*`;
      text += '\n';
    });
    text += `\n**Total:** 🔬 ${fmtExact(Math.round(totalBc))}  💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += `  ⏱ ${timeStr}`;
    if (cityTowns > 0) text += `\n\n*Beakers include ×${townMult.toFixed(1)} town modifier (${cityTowns} towns)*`;
    downloadText(text, 'research-queue.md', 'text/markdown');
  } else if (format === 'copy') {
    rows.forEach(r => {
      const arrow = r.nextName ? ` => ${r.nextName}` : '';
      text += `${r.name}${arrow}`;
      if (r.desc) text += ` (${r.desc})`;
      text += '\n';
    });
    text += `\nTotal: 🔬 ${fmtExact(Math.round(totalBc))} / 💰 ${fmtExact(totalCost)}`;
    if (timeStr) text += ` / ⏱ ${timeStr}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.querySelector('.export-btn[onclick*="copy"]');
      if (btn) { const orig = btn.textContent; btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = orig, 1500); }
    }).catch(() => {});
  }
}

function downloadText(text, filename, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
