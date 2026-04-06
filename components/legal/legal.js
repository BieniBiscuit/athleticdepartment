function initLegalPage(data, pageKey) {
  const legalRoot = data && data.legal ? data.legal : null;
  if (!legalRoot || !legalRoot.pages || !legalRoot.pages[pageKey]) {
    return;
  }

  const page = legalRoot.pages[pageKey];
  const textContainer = document.getElementById('legalText');
  if (!textContainer) {
    return;
  }

  textContainer.innerHTML = pageKey === 'impressum'
    ? formatImpressumText(page.content)
    : formatDefaultLegalText(page.content);
}

function formatDefaultLegalText(rawText) {
  const lines = rawText
    .replace(/\r/g, '')
    .split('\n')
    .map(line => normalizeDisplayText(line))
    .filter(Boolean);

  return lines.map(line => {
    const isPlainUrl = /^https?:\/\/\S+$/i.test(line);

    if (isPlainUrl) {
      const safeUrl = escapeHtml(line);
      return `<p class="legal-body-text"><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></p>`;
    }

    const safeLine = linkify(escapeHtml(line));

    if (isPrimaryLegalHeading(line)) {
      return `<h2 class="legal-numbered-title">${safeLine}</h2>`;
    }

    if (isSectionHeading(line)) {
      return `<h2 class="legal-section-title">${safeLine}</h2>`;
    }

    if (isSubsectionHeading(line)) {
      return `<h3 class="legal-subsection-title">${safeLine}</h3>`;
    }

    return `<p class="legal-body-text">${safeLine}</p>`;
  }).join('');
}

function formatImpressumText(rawText) {
  const blocks = rawText
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(block => normalizeDisplayText(block))
    .filter(Boolean);

  const sectionHeadings = new Set([
    'bildnachweise',
    'hinweis zur sprache'
  ]);

  const subHeadings = new Set([
    'unternehmensname',
    'geschaeftsadresse',
    'geschäftsadresse',
    'telefonnummer noah',
    'telefonnummer tony',
    'e-mail-adresse',
    'gesellschafter',
    'ust-idnr',
    'ust-idnr.',
    'startseite',
    'consulting',
    'termin vereinbaren',
    'blog'
  ]);

  const chunks = [];

  blocks.forEach(block => {
    const normalized = normalizeHeadingKey(block);

    if (normalized === 'impressum') {
      return;
    }

    const isPlainUrl = /^https?:\/\/\S+$/i.test(block);
    if (isPlainUrl) {
      const safeUrl = escapeHtml(block);
      chunks.push(`<p class="legal-body-text"><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></p>`);
      return;
    }

    const safeBlock = linkify(escapeHtml(block)).replace(/\n/g, '<br>');

    if (sectionHeadings.has(normalized)) {
      chunks.push(`<h2 class="legal-section-title">${safeBlock}</h2>`);
      return;
    }

    if (subHeadings.has(normalized)) {
      chunks.push(`<h3 class="legal-subsection-title">${safeBlock}</h3>`);
      return;
    }

    chunks.push(`<p class="legal-body-text">${safeBlock}</p>`);
  });

  return chunks.join('');
}

function linkify(text) {
  return text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function normalizeHeadingKey(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function normalizeDisplayText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function isPrimaryLegalHeading(text) {
  return /^\d+(?:\.\d+)?\.?\s+/.test(text);
}

function isSectionHeading(text) {
  const wordCount = text.split(/\s+/).length;
  const hasLetters = /[A-Za-zÄÖÜäöüß]/.test(text);

  return hasLetters && (
    (text === text.toUpperCase() && wordCount <= 6) ||
    (/^[A-ZÄÖÜ][^.!?:]*$/.test(text) && wordCount <= 7)
  );
}

function isSubsectionHeading(text) {
  const wordCount = text.split(/\s+/).length;

  return !/[.!?:]$/.test(text) && wordCount <= 9 && text.length <= 95;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
