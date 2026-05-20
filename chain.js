// ── Dependency graph traversal ─────────────────
function getRequiredChain(id, visited = new Set()) {
  if (visited.has(id)) return visited;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return visited;
  if (t.req.includes('/')) {
    const best = pickBestBranch(t.req.split('/').filter(Boolean));
    if (best) getRequiredChain(best, visited);
    return visited;
  }
  t.req.split(':').filter(Boolean).forEach(reqId => getRequiredChain(reqId, visited));
  return visited;
}

function getFullCostChain(id, visited = new Set()) {
  if (visited.has(id)) return visited;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return visited;
  if (t.req.includes('/')) {
    const best = pickBestBranch(t.req.split('/').filter(Boolean));
    if (best) getFullCostChain(best, visited);
    return visited;
  }
  t.req.split(':').filter(Boolean).forEach(reqId => getFullCostChain(reqId, visited));
  return visited;
}

function collectAndChain(id, visited) {
  if (visited.has(id)) return;
  visited.add(id);
  const t = techMap[id];
  if (!t || !t.req) return;
  if (t.req.includes('/')) {
    t.req.split('/').filter(Boolean).forEach(rid => collectAndChain(rid, visited));
  } else {
    t.req.split(':').filter(Boolean).forEach(rid => collectAndChain(rid, visited));
  }
}

// ── Branch selection ───────────────────────────
function scoreBranch(id, available) {
  const all = new Set();
  collectAndChain(id, all);
  let checked = 0, unchecked = 0;
  all.forEach(tid => {
    if (checkedIds.has(tid) || (available && available.has(tid))) checked++;
    else unchecked++;
  });
  return { checked, unchecked, total: all.size };
}

function pickBestBranch(branches, available) {
  for (const branchId of branches) {
    if (checkedIds.has(branchId) || (available && available.has(branchId))) return branchId;
  }
  let best = null, bestScore = null;
  branches.forEach(branchId => {
    const s = scoreBranch(branchId, available);
    if (!bestScore || s.checked > bestScore.checked || (s.checked === bestScore.checked && s.unchecked < bestScore.unchecked)) {
      best = branchId;
      bestScore = s;
    }
  });
  return best;
}

// ── Cost calculation ───────────────────────────
function calcChainCost(id) {
  const chain = getFullCostChain(id);
  let totalBc = 0, totalCost = 0, skippedBc = 0, skippedCost = 0, skippedCount = 0;
  chain.forEach(tid => {
    const t = techMap[tid];
    if (!t) return;
    if (checkedIds.has(tid)) {
      skippedBc += (t.bc || 0);
      skippedCost += (t.cost || 0);
      skippedCount++;
    } else {
      totalBc += (t.bc || 0);
      totalCost += (t.cost || 0);
    }
  });
  return { bc: totalBc, cost: totalCost, skippedBc, skippedCost, chainSize: chain.size, skippedCount };
}

function calcResearchTime(beakerCost) {
  if (cityBeakers <= 0 || beakerCost <= 0) return null;
  const hours = beakerCost / cityBeakers;
  const totalMin = Math.round(hours * 60);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
