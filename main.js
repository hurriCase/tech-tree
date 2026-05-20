loadState();
document.getElementById('btn-en').classList.toggle('active', lang === 'en');
document.getElementById('btn-ru').classList.toggle('active', lang === 'ru');
document.getElementById('search-input').placeholder = I18N[lang].searchPlaceholder;
updateViewBtnLabels();
updateCityBtn();
render();
applyTransform();
renderQueue();
