function onSearchInput() {
  const input = document.getElementById('search-input');
  searchQuery = input.value.trim().toLowerCase();
  const clearBtn = document.getElementById('search-clear');
  clearBtn.classList.toggle('visible', searchQuery.length > 0);
  input.classList.toggle('active', searchQuery.length > 0);
  applySearchFilter();
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  searchQuery = '';
  document.getElementById('search-clear').classList.remove('visible');
  document.getElementById('search-input').classList.remove('active');
  applySearchFilter();
}
