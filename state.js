// ── Tech map ───────────────────────────────────
const techMap = {};
TECHS.forEach(t => techMap[t.id] = t);
WONDERS.forEach(w => techMap[w.id] = { ...w, era: 0, wonder: true, cost: 75000, req: null });

// ── App state ──────────────────────────────────
let lang = 'en';
let zoom = 1, panX = 20, panY = 20;
let selectedId = null;
const checkedIds = new Set();
let viewMode = 'all';
let searchQuery = '';
let cityBeakers = 0;
let cityTowns = 0;
const researchQueue = [];

// ── Persistence ────────────────────────────────
const LS_KEY = 'techtree_state';

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      checked: [...checkedIds], viewMode, lang, zoom, panX, panY,
      cityBeakers, cityTowns, queue: [...researchQueue],
    }));
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (Array.isArray(s.checked)) s.checked.forEach(id => checkedIds.add(id));
    if (s.viewMode) viewMode = s.viewMode;
    if (s.lang) lang = s.lang;
    if (typeof s.zoom === 'number') zoom = s.zoom;
    if (typeof s.panX === 'number') panX = s.panX;
    if (typeof s.panY === 'number') panY = s.panY;
    if (typeof s.cityBeakers === 'number') cityBeakers = s.cityBeakers;
    if (typeof s.cityTowns === 'number') cityTowns = s.cityTowns;
    if (Array.isArray(s.queue)) { researchQueue.length = 0; s.queue.forEach(id => researchQueue.push(id)); }
  } catch (e) {}
}
