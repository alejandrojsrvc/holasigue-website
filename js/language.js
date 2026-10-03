const currentLanguage = document.body.dataset.language;

try {
  if (currentLanguage === 'es' || currentLanguage === 'en') {
    localStorage.setItem('sigue-language', currentLanguage);
  }
} catch {
  // Language selection still works when storage is unavailable.
}

document.querySelectorAll('[data-language-link]').forEach((link) => {
  link.addEventListener('click', () => {
    try {
      localStorage.setItem('sigue-language', link.dataset.languageLink);
    } catch {
      // The destination remains available without storage.
    }
  });
});
