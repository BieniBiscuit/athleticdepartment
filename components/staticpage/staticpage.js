function initStaticPage(data, pageKey) {
  const staticRoot = data && data.static ? data.static : null;
  if (!staticRoot || !staticRoot.pages || !staticRoot.pages[pageKey]) {
    return;
  }

  const page = staticRoot.pages[pageKey];
  const textContainer = document.getElementById('staticText');
  if (!textContainer) {
    return;
  }

  textContainer.innerHTML = formatStaticText(page.content);
}

function formatStaticText(rawText) {
  const blocks = rawText
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(block => block.trim())
    .filter(Boolean);

  return blocks.map(block => {
    const isPlainUrl = /^https?:\/\/\S+$/i.test(block);

    if (isPlainUrl) {
      const safeUrl = escapeHtml(block);
      return `<p><a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a></p>`;
    }

    const headingLike =
      block.length <= 95 &&
      !/[.!?:]$/.test(block) &&
      block.split(/\s+/).length <= 8;

    const safeBlock = linkify(escapeHtml(block)).replace(/\n/g, '<br>');

    if (headingLike) {
      return `<h2 class="static-section-title">${safeBlock}</h2>`;
    }

    return `<p>${safeBlock}</p>`;
  }).join('');
}

function linkify(text) {
  return text.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
