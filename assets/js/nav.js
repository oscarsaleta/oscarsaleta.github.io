/**
 * threepscoot.cc - Unified Global Navigation & Breadcrumbs Component
 */

(function () {
  function renderGlobalNav() {
    const target = document.getElementById('ts-nav-root');
    if (!target) return;

    const path = window.location.pathname.replace(/\/$/, '') || '/';
    
    // Determine active links and breadcrumb items
    let breadcrumbsHtml = `
      <div class="ts-breadcrumbs">
        <a href="/">threepscoot</a>
    `;

    if (path.includes('pourover')) {
      breadcrumbsHtml += `
        <span class="separator">/</span>
        <span>hobbies</span>
        <span class="separator">/</span>
        <span style="color: var(--accent-coffee); font-weight: 500;">pourover</span>
      `;
    } else if (path.includes('running-nutrition')) {
      breadcrumbsHtml += `
        <span class="separator">/</span>
        <span>hobbies</span>
        <span class="separator">/</span>
        <span style="color: var(--accent-running); font-weight: 500;">running-nutrition</span>
      `;
    } else if (path.includes('catalan-learning')) {
      breadcrumbsHtml += `
        <span class="separator">/</span>
        <span>hobbies</span>
        <span class="separator">/</span>
        <span style="color: var(--accent-catalan); font-weight: 500;">catalan-learning</span>
      `;
    } else if (path.includes('knowledge')) {
      breadcrumbsHtml += `
        <span class="separator">/</span>
        <span style="color: var(--accent-kb); font-weight: 500;">knowledge-base</span>
      `;
    }
    breadcrumbsHtml += `</div>`;

    const navHtml = `
      <nav class="ts-nav">
        <div class="ts-nav-container">
          <div class="ts-nav-brand-group">
            <a href="/" class="ts-nav-brand">
              <span class="status-beacon"></span>
              threepscoot
            </a>
            ${breadcrumbsHtml}
          </div>

          <div class="ts-nav-links">
            <a href="/" class="ts-nav-link ${path === '/' ? 'active' : ''}">Home</a>
            <a href="/pourover/" class="ts-nav-link ${path.includes('pourover') ? 'active' : ''}">
              <span style="color: var(--accent-coffee)">☕</span> Coffee
            </a>
            <a href="/running-nutrition/" class="ts-nav-link ${path.includes('running-nutrition') ? 'active' : ''}">
              <span style="color: var(--accent-running)">🏃</span> Running
            </a>
            <a href="/catalan-learning/" class="ts-nav-link ${path.includes('catalan-learning') ? 'active' : ''}">
              <span style="color: var(--accent-catalan)">📚</span> Catalan
            </a>
            <a href="/knowledge/" class="ts-nav-link ${path.includes('knowledge') ? 'active' : ''}">
              <span style="color: var(--accent-kb)">🧠</span> Knowledge
            </a>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <button class="ts-cmdk-trigger" data-cmdk-trigger aria-label="Open Command Palette">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search</span>
              <span class="ts-kbd">⌘K</span>
            </button>
          </div>
        </div>
      </nav>
    `;

    target.innerHTML = navHtml;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGlobalNav);
  } else {
    renderGlobalNav();
  }
})();
