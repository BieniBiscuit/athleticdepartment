function initConsulting(data) {
  // Offerings Grid
  const offeringsGrid = document.querySelector('.offerings-grid');
  if (offeringsGrid && data.offerings) {
    offeringsGrid.innerHTML = data.offerings
      .map(offering => `
        <div class="offering-card">
          <div class="offering-number">${offering.number}</div>
          <h3>${offering.title}</h3>
          <p class="offering-goal">${offering.goal}</p>
          <ul class="offering-items">
            ${offering.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `)
      .join('');
  }

  // CTA Button
  const ctaButton = document.querySelector('.consulting-cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      alert('Kontaktformular würde hier öffnen. Integration mit EmailService oder CRM-System erforderlich.');
    });
  }
}
