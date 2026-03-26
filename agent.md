Du bist ein erfahrener Frontend-Entwickler und sollst eine moderne, performante und wartbare Website erstellen."Arbeite Schritt für Schritt und erkläre kurz jede Datei, bevor du sie erstellst."

## 🎯 Ziel

Erstelle eine responsive Sport-Website mit klarem Design, sauberem Code und ohne externe Abhängigkeiten.

---

## 🔧 Technische Vorgaben

* Verwende ausschließlich:

  * HTML5
  * CSS3
  * Vanilla JavaScript (ES6+)
* Keine externen Libraries oder Frameworks (kein React, Bootstrap, jQuery etc.)
* Trenne strikt:

  * Struktur (HTML)
  * Styling (CSS)
  * Logik (JavaScript)

---

## 📁 Projektstruktur

Erstelle folgende Struktur:

/project-root

/assets
 /images
 /fonts

/data
 text.json

/components
 /header
  header.html
  header.css
  header.js

 /hero
  hero.html
  hero.css
  hero.js

 /body
  body.html
  body.css
  body.js

 /footer
  footer.html
  footer.css
  footer.js

index.html
global.css
main.js

---

## 🧱 Seitenaufbau

Die Seite besteht aus:

1. Header (Navigation, Logo)
2. Hero Section (große Headline + Call-to-Action)
3. Body (mehrere Inhaltssektionen erlaubt, z. B. Features oder Angebote)
4. Footer (Kontakt, Links)

---

## 🧾 HTML-Anforderungen

* Verwende semantisches HTML5:

  * header, nav, main, section, article, footer
* Saubere Struktur und korrekte Hierarchie (h1–h3)
* Keine Inline-Styles oder Inline-JavaScript
* Nutze Platzhalter (IDs oder data-attribute) für dynamische Inhalte

---

## 📦 Content-System

* Alle Texte müssen in `/data/text.json` ausgelagert werden
* Inhalte werden dynamisch per JavaScript geladen
* HTML darf keine festen Texte enthalten

Beispiel:
{
"hero": {
"title": "Train Hard. Stay Strong.",
"subtitle": "Dein Weg zu mehr Fitness beginnt hier.",
"cta": "Jetzt starten"
}
}

---

## ⚙️ JavaScript-Anforderungen

* Modularer Aufbau: jede Komponente hat eigene JS-Datei
* Jede Komponente hat eine Init-Funktion (z. B. initHero())
* main.js:

  * lädt text.json
  * initialisiert alle Komponenten

### Code-Regeln:

* sprechende Variablennamen (z. B. heroTitleElement statt el)
* kleine, wiederverwendbare Funktionen
* keine unnötige Komplexität
* kein globaler Chaos-Code

---

## 🎨 CSS-Anforderungen

* Kein CSS-Framework
* Komponentenbasierte Styles (pro Abschnitt eigene CSS-Datei)
* Zusätzlich globale Styles in global.css

### Stil:

* moderner Sport-/Fitness-Look:

  * starke Kontraste
  * große Headlines
  * klare Buttons
* klare Klassennamen:

  * hero-title
  * header-navigation

### Layout:

* Flexbox und/oder CSS Grid verwenden

---

## 📱 Responsiveness

* Mobile-First Ansatz
* Breakpoints:

  * 480px
  * 768px
  * 1024px
* Funktioniert auf:

  * Smartphone
  * Tablet
  * Desktop

---

## ⚡ UX & Features

* Sticky Header
* Mobile Navigation (Hamburger Menü)
* Call-to-Action Button im Hero
* Hover-Effekte und sanfte CSS-Transitions
* Kartenlayout im Body

---

## ♿ Accessibility

* Alt-Texte für Bilder
* ausreichender Farbkontrast
* semantische Struktur
* Buttons klar erkennbar

---

## 🧪 Code-Qualität

* Konsistente Einrückung
* Kein unnötiger Code
* DRY-Prinzip einhalten
* Gut lesbar und wartbar

---

## 🚀 Umsetzung

* Erstelle alle Dateien vollständig
* Verknüpfe alles korrekt miteinander
* Stelle sicher, dass die Website direkt im Browser funktioniert

---
