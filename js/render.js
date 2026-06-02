// ── Build positions ────────────────────────────
let positions = {};

function buildPositions() {
  positions = {};
  let maxRows = 0;
  LAYOUT.forEach(col => { if (col.length > maxRows) maxRows = col.length; });
  const maxColH = maxRows * (NH + RG) - RG;

  let cx = 20;
  LAYOUT.forEach(col => {
    const colH = col.length * (NH + RG) - RG;
    const startY = 20 + Math.round((maxColH - colH) / 2);
    col.forEach((id, i) => {
      positions[id] = { x: cx, y: startY + i * (NH + RG), w: NW, h: NH };
    });
    cx += NW + CG;
  });

  cx += 10;
  const wRows = Math.ceil(WONDERS.length / WCOLS);
  const wColH = wRows * (NH + RG) - RG;
  const wStartY = 20 + Math.round((maxColH - wColH) / 2);
  WONDERS.forEach((w, i) => {
    const col = i % WCOLS;
    const row = Math.floor(i / WCOLS);
    positions[w.id] = { x: cx + col * (NW + CG / 2), y: wStartY + row * (NH + RG), w: NW, h: NH };
  });
}

// ── Full render ────────────────────────────────
function render() {
  buildPositions();
  const world = document.getElementById('world');
  Array.from(world.children).forEach(c => { if (c.id !== 'svg-layer') c.remove(); });

  let maxX = 0, maxY = 0;
  Object.values(positions).forEach(p => {
    if (p.x + p.w > maxX) maxX = p.x + p.w;
    if (p.y + p.h > maxY) maxY = p.y + p.h;
  });
  maxX += 20; maxY += 20;

  const svg = document.getElementById('svg-layer');
  svg.style.width = maxX + 'px';
  svg.style.height = maxY + 'px';
  svg.setAttribute('width', maxX);
  svg.setAttribute('height', maxY);
  svg.innerHTML = `<defs><marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;

  const drawn = new Set();
  TECHS.forEach(tech => {
    if (!tech.req) return;
    const toPos = positions[tech.id];
    if (!toPos) return;
    const isOr = isOrStr(tech.req);
    parseReqs(tech.req).forEach(reqId => {
      const fromPos = positions[reqId];
      if (!fromPos) return;
      const key = reqId + '->' + tech.id;
      if (drawn.has(key)) return;
      drawn.add(key);
      const fromT = techMap[reqId];
      const col = ERA_COLORS[fromT ? fromT.era : 1] || '#888';
      const x1 = fromPos.x + fromPos.w, y1 = fromPos.y + fromPos.h / 2;
      const x2 = toPos.x, y2 = toPos.y + toPos.h / 2;
      const mx = (x1 + x2) / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', col);
      path.setAttribute('stroke-width', isOr ? '1' : '1.8');
      path.setAttribute('stroke-opacity', isOr ? '0.35' : '0.5');
      if (isOr) path.setAttribute('stroke-dasharray', '5 4');
      path.setAttribute('marker-end', 'url(#arr)');
      path.classList.add('edge-path');
      path.dataset.from = reqId;
      path.dataset.to = tech.id;
      svg.appendChild(path);
    });
  });

  TECHS.forEach(tech => {
    const pos = positions[tech.id];
    if (!pos) return;
    world.appendChild(makeNode(tech, pos));
  });

  const wFirst = positions[WONDERS[0].id];
  if (wFirst) {
    const wTotalW = WCOLS * NW + (WCOLS - 1) * CG / 2;
    const lbl = document.createElement('div');
    lbl.style.cssText = `position:absolute;left:${wFirst.x}px;top:${wFirst.y - 20}px;width:${wTotalW}px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:var(--wonder);opacity:0.7;text-align:center;`;
    lbl.textContent = '✦ ' + tr('eraW') + ' ✦';
    world.appendChild(lbl);
  }

  WONDERS.forEach(w => {
    const pos = positions[w.id];
    if (!pos) return;
    world.appendChild(makeNode({ ...w, era: 0, wonder: true }, pos));
  });

  applyHighlight();
  applyViewFilter();
  applyQueueOverlay();
  if (searchQuery) applySearchFilter();
}

// ── Node creation ──────────────────────────────
function makeNode(tech, pos) {
  const div = document.createElement('div');
  const isChecked = checkedIds.has(tech.id);
  div.className = 'tech-node era-' + (tech.era || 0)
      + (tech.unlock_era ? ' era-unlock' : '')
      + (tech.wonder ? ' wonder-node' : '')
      + (isChecked ? ' node-checked' : '');
  div.style.left = pos.x + 'px';
  div.style.top = pos.y + 'px';
  div.style.width = pos.w + 'px';
  div.style.minHeight = pos.h + 'px';
  div.dataset.id = tech.id;

  const chk = document.createElement('div');
  chk.className = 'node-check' + (isChecked ? ' checked' : '');
  chk.title = isChecked ? 'Uncheck' : 'Check';
  chk.addEventListener('click', e => { e.stopPropagation(); toggleCheck(tech.id); });
  div.appendChild(chk);

  const badge = document.createElement('div');
  badge.className = 'node-era-badge';
  badge.textContent = tech.wonder ? tr('wonder') : tech.unlock_era ? tr('eraUnlock') : (tr('era' + tech.era) || '');
  div.appendChild(badge);

  const name = document.createElement('div');
  name.className = 'node-name';
  name.style.paddingRight = '20px';
  name.textContent = getName(tech);
  div.appendChild(name);

  const desc = document.createElement('div');
  desc.className = 'node-desc';
  desc.textContent = getDesc(tech);
  div.appendChild(desc);

  const costs = document.createElement('div');
  costs.className = 'node-costs';
  costs.innerHTML = `<span class="node-cost">🔬 ${fmtN(tech.bc)}</span>${tech.cost ? `<span class="node-cost">💰 ${fmtN(tech.cost)}</span>` : ''}`;
  div.appendChild(costs);

  div.addEventListener('click', e => { e.stopPropagation(); selectTech(tech.id); });
  return div;
}

// ── Highlight ──────────────────────────────────
function applyHighlight() {
  if (searchQuery) { applySearchFilter(); return; }

  const world = document.getElementById('world');
  const svg = document.getElementById('svg-layer');
  if (!selectedId) {
    world.querySelectorAll('.tech-node').forEach(el => el.classList.remove('node-selected', 'node-path', 'node-faded'));
    svg.querySelectorAll('.edge-path').forEach(el => el.classList.remove('edge-active', 'edge-faded'));
    return;
  }
  const chain = getRequiredChain(selectedId);
  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    el.classList.remove('node-selected', 'node-path', 'node-faded');
    if (id === selectedId) el.classList.add('node-selected');
    else if (chain.has(id)) el.classList.add('node-path');
    else el.classList.add('node-faded');
  });
  svg.querySelectorAll('.edge-path').forEach(el => {
    el.classList.remove('edge-active', 'edge-faded');
    const inChain = chain.has(el.dataset.to) && chain.has(el.dataset.from);
    if (inChain) el.classList.add('edge-active');
    else el.classList.add('edge-faded');
  });
}

// ── View filter ────────────────────────────────
function applyViewFilter() {
  const world = document.getElementById('world');
  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    const isChecked = checkedIds.has(id);
    let hidden = false;
    if (viewMode === 'done' && !isChecked) hidden = true;
    if (viewMode === 'undone' && isChecked) hidden = true;
    el.classList.toggle('node-hidden', hidden);
  });
}

// ── Search filter ──────────────────────────────
function applySearchFilter() {
  const world = document.getElementById('world');
  const svg = document.getElementById('svg-layer');

  if (!searchQuery) {
    applyHighlight();
    return;
  }

  world.querySelectorAll('.tech-node').forEach(el => {
    const id = el.dataset.id;
    const tech = techMap[id];
    if (!tech) return;
    const nameStr = getName(tech).toLowerCase();
    const descStr = getDesc(tech).toLowerCase();
    const matches = nameStr.includes(searchQuery) || descStr.includes(searchQuery);
    el.classList.remove('node-selected', 'node-path');
    el.classList.toggle('node-faded', !matches);
  });

  svg.querySelectorAll('.edge-path').forEach(el => {
    el.classList.add('edge-faded');
    el.classList.remove('edge-active');
  });
}

// ── Queue overlay ──────────────────────────────
function applyQueueOverlay() {
  const world = document.getElementById('world');
  world.querySelectorAll('.queue-badge').forEach(el => el.remove());
  world.querySelectorAll('.tech-node.node-queued').forEach(el => el.classList.remove('node-queued'));
  researchQueue.forEach((id, index) => {
    const el = world.querySelector(`.tech-node[data-id="${id}"]`);
    if (!el) return;
    el.classList.add('node-queued');
    const badge = document.createElement('div');
    badge.className = 'queue-badge';
    badge.textContent = index + 1;
    el.appendChild(badge);
  });
}
