// ── Transform ──────────────────────────────────
function applyTransform() {
  document.getElementById('world').style.transform = `translate(${panX}px,${panY}px) scale(${zoom})`;
  document.getElementById('zoom-label').textContent = Math.round(zoom * 100) + '%';
}

function zoomAt(newZoom, ox, oy) {
  newZoom = Math.max(0.15, Math.min(3, newZoom));
  const worldX = (ox - panX) / zoom;
  const worldY = (oy - panY) / zoom;
  zoom = newZoom;
  panX = ox - worldX * zoom;
  panY = oy - worldY * zoom;
  applyTransform();
}

function zoomBy(delta) {
  const vp = document.getElementById('viewport');
  zoomAt(zoom + delta, vp.clientWidth / 2, vp.clientHeight / 2);
  saveState();
}

function resetView() { zoom = 1; panX = 20; panY = 20; applyTransform(); saveState(); }

// ── Mouse pan ──────────────────────────────────
let isPanning = false, didPan = false;
let px0 = 0, py0 = 0, panX0 = 0, panY0 = 0;

const vp = document.getElementById('viewport');
vp.addEventListener('mousedown', e => {
  if (e.button !== 0) return;
  isPanning = true; didPan = false;
  px0 = e.clientX; py0 = e.clientY;
  panX0 = panX; panY0 = panY;
  vp.classList.add('panning');
});
window.addEventListener('mousemove', e => {
  if (!isPanning) return;
  const dx = e.clientX - px0, dy = e.clientY - py0;
  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didPan = true;
  panX = panX0 + dx; panY = panY0 + dy;
  applyTransform();
});
window.addEventListener('mouseup', () => {
  if (!isPanning) return;
  isPanning = false;
  vp.classList.remove('panning');
  if (didPan) saveState();
});
vp.addEventListener('click', e => {
  if (didPan) { e.stopPropagation(); didPan = false; }
}, true);

// ── Mouse wheel ────────────────────────────────
let _saveTimer = null;
vp.addEventListener('wheel', e => {
  e.preventDefault();
  const rect = vp.getBoundingClientRect();
  const ox = e.clientX - rect.left;
  const oy = e.clientY - rect.top;
  const delta = e.deltaMode === 1 ? e.deltaY * 30 : e.deltaY;
  zoomAt(zoom * Math.pow(0.999, delta), ox, oy);
  if (isPanning) { px0 = e.clientX; py0 = e.clientY; panX0 = panX; panY0 = panY; }
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(saveState, 400);
}, { passive: false });

// ── Touch ──────────────────────────────────────
let touchState = {}, lastPinchD = null, touchPanX0 = 0, touchPanY0 = 0, touchPX0 = 0, touchPY0 = 0;
vp.addEventListener('touchstart', e => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => touchState[t.identifier] = [t.clientX, t.clientY]);
  const pts = Object.values(touchState);
  if (pts.length === 1) { touchPX0 = pts[0][0]; touchPY0 = pts[0][1]; touchPanX0 = panX; touchPanY0 = panY; lastPinchD = null; }
  else if (pts.length === 2) { lastPinchD = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]); }
}, { passive: false });
vp.addEventListener('touchmove', e => {
  e.preventDefault();
  Array.from(e.changedTouches).forEach(t => { if (touchState[t.identifier]) touchState[t.identifier] = [t.clientX, t.clientY]; });
  const pts = Object.values(touchState);
  if (pts.length === 1) { panX = touchPanX0 + (pts[0][0] - touchPX0); panY = touchPanY0 + (pts[0][1] - touchPY0); applyTransform(); }
  else if (pts.length === 2 && lastPinchD) {
    const d = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]);
    const rect = vp.getBoundingClientRect();
    const mx = (pts[0][0] + pts[1][0]) / 2 - rect.left, my = (pts[0][1] + pts[1][1]) / 2 - rect.top;
    zoomAt(zoom * (d / lastPinchD), mx, my); lastPinchD = d;
  }
}, { passive: false });
vp.addEventListener('touchend', e => {
  Array.from(e.changedTouches).forEach(t => delete touchState[t.identifier]);
  const pts = Object.values(touchState);
  if (pts.length === 1) { touchPX0 = pts[0][0]; touchPY0 = pts[0][1]; touchPanX0 = panX; touchPanY0 = panY; lastPinchD = null; }
}, { passive: false });
