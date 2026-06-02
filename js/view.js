// ── Check toggle ───────────────────────────────
function toggleCheck(id) {
  if (checkedIds.has(id)) checkedIds.delete(id);
  else checkedIds.add(id);
  const world = document.getElementById('world');
  const el = world.querySelector(`.tech-node[data-id="${id}"]`);
  if (el) {
    const isChecked = checkedIds.has(id);
    el.classList.toggle('node-checked', isChecked);
    const chk = el.querySelector('.node-check');
    if (chk) { chk.classList.toggle('checked', isChecked); chk.title = isChecked ? 'Uncheck' : 'Check'; }
    applyViewFilter();
  }
  saveState();
  if (selectedId) updateChainCostPanel(selectedId);
}

// ── View mode ──────────────────────────────────
function setView(mode) {
  viewMode = mode;
  ['all', 'done', 'undone'].forEach(m => {
    document.getElementById('vbtn-' + m).classList.toggle('active', m === mode);
  });
  updateViewBtnLabels();
  applyViewFilter();
  saveState();
}

function updateViewBtnLabels() {
  const t = I18N[lang];
  document.getElementById('vbtn-all').textContent = t.viewAll;
  document.getElementById('vbtn-done').textContent = t.viewDone;
  document.getElementById('vbtn-undone').textContent = t.viewUndone;
}

// ── Language ───────────────────────────────────
function setLang(l) {
  lang = l;
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  document.getElementById('btn-ru').classList.toggle('active', l === 'ru');
  document.getElementById('search-input').placeholder = I18N[l].searchPlaceholder;
  updateViewBtnLabels();
  render();
  if (selectedId) openPanel(selectedId);
  renderQueue();
  saveState();
}
