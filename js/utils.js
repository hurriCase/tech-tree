// ── Formatters ─────────────────────────────────
function fmtN(n) {
  if (!n) return '0';
  return n.toLocaleString('en-US').replace(/,/g, ' ');
}

function fmtExact(n) {
  if (!n) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(3).replace(/\.?0+$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(2).replace(/\.?0+$/, '') + 'K';
  return String(n);
}

// ── Requirement parsing ────────────────────────
function parseReqs(s) { return s ? s.split(/[\/:]/).filter(Boolean) : []; }
function isOrStr(s) { return s && s.includes('/'); }

// ── Localization helpers ───────────────────────
function getName(t) { return lang === 'ru' && NAMES_RU[t.id] ? NAMES_RU[t.id] : t.name; }
function getDesc(t) { return lang === 'ru' && DESC_RU[t.id] ? DESC_RU[t.id] : t.desc || ''; }
function tr(k) { return I18N[lang][k] || k; }
