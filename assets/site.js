/* BAMM — en-tête, pied de page et animations communs à toutes les pages */
(function () {
  const APK = {
    url: 'downloads/BAMM-1.0.0.apk',
    version: '1.0.0',
    size: '10,0 Mo',
    sha256: '55e53b2e6d97e0a1d9041374362162aa278ed29656a7e092dba7827669379acb',
  };
  window.BAMM_APK = APK;

  const LOGO = '<svg width="28" height="32" viewBox="0 0 30 34" aria-hidden="true"><path d="M15 2 3 7v9c0 8 5 13 12 16 7-3 12-8 12-16V7z" fill="currentColor" opacity=".14"/><path d="M15 2 3 7v9c0 8 5 13 12 16 7-3 12-8 12-16V7z" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><path d="m9.5 16.5 4 4 7-8" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const DL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>';
  window.BAMM_ICON_DL = DL;

  const PAGES = [
    ['index', 'Accueil'], ['probleme', 'Problème'], ['solution', 'Solution'],
    ['demo', 'Démo'], ['ia', 'IA'], ['business', 'Business'], ['equipe', 'Équipe'],
  ];
  const page = document.body.dataset.page;

  const header = document.querySelector('header[data-nav]');
  if (header) {
    header.className = 'nav';
    header.innerHTML = `
      <div class="wrap">
        <a class="brand" href="index.html" style="color:var(--green)">${LOGO}<span style="color:var(--text)">BAMM</span></a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        <nav class="nav-links" id="nav-links">
          ${PAGES.map(([id, label]) => `<a href="${id}.html"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
          <a class="btn btn-primary btn-sm nav-cta" href="telecharger.html"${page === 'telecharger' ? ' aria-current="page"' : ''} style="color:#fff;background:var(--green)">${DL}Télécharger</a>
        </nav>
      </div>`;
    const toggle = header.querySelector('.nav-toggle');
    const links = header.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const footer = document.querySelector('footer[data-footer]');
  if (footer) {
    footer.className = 'footer';
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer-grid">
          <div>
            <a class="brand" href="index.html" style="color:var(--glow)">${LOGO}<span style="color:#fff">BAMM</span></a>
            <p style="max-width:380px">Bouclier Anti-fraude Mobile Money. La fraude bloquée au moment exact de l'attaque, dans la langue de chacun.</p>
          </div>
          <div>
            <h4>Le projet</h4>
            <ul>${PAGES.slice(1).map(([id, label]) => `<li><a href="${id}.html">${label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h4>Ressources</h4>
            <ul>
              <li><a href="telecharger.html">Télécharger l'APK (v${APK.version})</a></li>
              <li><a href="https://github.com/BAMM-Project/BAMM" target="_blank" rel="noopener">Code source sur GitHub</a></li>
              <li><a href="https://github.com/BAMM-Project/BAMM/blob/main/data_science/notebooks/BAMM_pipeline.ipynb" target="_blank" rel="noopener">Notebook data science</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Sources : GSMA (2025) · TechNext24 (2024) · Tech With Africa (2026) · Lundberg &amp; Lee (2017), SHAP, NeurIPS.</span>
          <span>Hackathon AI4Youth · Lomé 2026</span>
        </div>
      </div>`;
  }

  // Apparition douce des blocs au défilement
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  // Champs remplis automatiquement avec les infos de l'APK
  document.querySelectorAll('[data-apk]').forEach((el) => {
    const k = el.dataset.apk;
    if (k === 'href') el.setAttribute('href', APK.url);
    else el.textContent = APK[k];
  });
})();
