// Main Application Script
// Lädt die text.json Dateien aus den Komponenten-Ordnern und initialisiert alle Komponenten

let appData = {};

/**
 * Lädt die text.json Dateien aus den Komponenten-Ordnern
 */
async function loadData() {
  try {
    // Header Daten
    const headerResponse = await fetch('./components/header/text.json');
    const headerData = await headerResponse.json();

    // Hero Daten
    const heroResponse = await fetch('./components/hero/text.json');
    const heroData = await heroResponse.json();

    // Body Daten
    const bodyResponse = await fetch('./components/body/text.json');
    const bodyData = await bodyResponse.json();

    // Footer Daten
    const footerResponse = await fetch('./components/footer/text.json');
    const footerData = await footerResponse.json();

    // Alle Daten zusammenführen
    appData = {
      ...headerData,
      ...heroData,
      ...bodyData,
      ...footerData
    };

    console.log('✓ Daten erfolgreich geladen:', appData);
    return appData;
  } catch (error) {
    console.error('✗ Fehler beim Laden der Daten:', error);
    return null;
  }
}

/**
 * Füllt dynamische Inhalte basierend auf data-field Attributen
 */
function populateDynamicContent() {
  const elements = document.querySelectorAll('[data-field]');
  
  elements.forEach(element => {
    const fieldPath = element.getAttribute('data-field');
    const value = getNestedValue(appData, fieldPath);
    
    if (value !== undefined && value !== null) {
      if (typeof value === 'string') {
        element.textContent = value;
      }
    }
  });
}

/**
 * Holt verschachtelte Werte aus Objekten (z.B. "nav.logo" → appData.nav.logo)
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

/**
 * Initialisiert alle Komponenten
 */
async function initializeApp() {
  console.log('🚀 Anwendung wird gestartet...');

  // 1. Daten laden
  const data = await loadData();
  if (!data) {
    console.error('✗ Kritischer Fehler: Daten konnten nicht geladen werden');
    return;
  }

  // 2. Dynamische Inhalte füllen
  populateDynamicContent();

  // 3. Komponenten initialisieren
  console.log('📦 Komponenten werden initialisiert...');

  // Header
  if (typeof initHeader === 'function') {
    initHeader(data);
    console.log('✓ Header initialisiert');
  }

  // Hero
  if (typeof initHero === 'function') {
    initHero(data);
    console.log('✓ Hero initialisiert');
  }

  // Body
  if (typeof initBody === 'function') {
    initBody(data);
    console.log('✓ Body initialisiert');
  }

  // Footer
  if (typeof initFooter === 'function') {
    initFooter(data);
    console.log('✓ Footer initialisiert');
  }

  // 4. Globale Event Listener initialisieren
  setupGlobalListeners();

  console.log('✅ Anwendung erfolgreich geladen');
}

/**
 * Globale Event Listener
 */
function setupGlobalListeners() {
  // Smooth Scroll Polyfill für ältere Browser
  if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // Sicherstellen, dass externe Links in neuem Tab öffnen
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

/**
 * App starten wenn DOM geladen ist
 */
document.addEventListener('DOMContentLoaded', initializeApp);

// Fehlerbehandlung für globale Fehler
window.addEventListener('error', (event) => {
  console.error('! Globaler Fehler:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('! Unbehandelte Promise Rejection:', event.reason);
});
