/**
 * threepscoot.cc - Unified Global Navigation & Breadcrumbs Component
 */

(function () {
  function renderGlobalNav() {
    const target = document.getElementById('ts-nav-root');
    if (!target) return;

    const path = window.location.pathname.replace(/\/$/, '') || '/';
    
    // Determine active links and breadcrumb items
    let breadcrumbsHtml = '';

    if (path === '/coffee') {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-coffee); font-weight: 500;">coffee-hub</span>
        </div>
      `;
    } else if (path.includes('pourover')) {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator ts-breadcrumb-intermediate hidden sm:inline">/</span>
          <a href="/coffee/" class="ts-breadcrumb-intermediate hidden sm:inline">coffee</a>
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-coffee); font-weight: 500;">pourover</span>
        </div>
      `;
    } else if (path.includes('espresso')) {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator ts-breadcrumb-intermediate hidden sm:inline">/</span>
          <a href="/coffee/" class="ts-breadcrumb-intermediate hidden sm:inline">coffee</a>
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-coffee); font-weight: 500;">espresso</span>
        </div>
      `;
    } else if (path.includes('running-nutrition')) {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator ts-breadcrumb-intermediate hidden sm:inline">/</span>
          <span class="ts-breadcrumb-intermediate hidden sm:inline">hobbies</span>
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-running); font-weight: 500;">running-nutrition</span>
        </div>
      `;
    } else if (path.includes('catalan-learning')) {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator ts-breadcrumb-intermediate hidden sm:inline">/</span>
          <span class="ts-breadcrumb-intermediate hidden sm:inline">hobbies</span>
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-catalan); font-weight: 500;">catalan-learning</span>
        </div>
      `;
    } else if (path.includes('knowledge')) {
      breadcrumbsHtml = `
        <div class="ts-breadcrumbs min-w-0 shrink overflow-hidden whitespace-nowrap text-ellipsis">
          <span class="separator">/</span>
          <span class="ts-breadcrumb-current" style="color: var(--accent-kb); font-weight: 500;">knowledge-base</span>
        </div>
      `;
    }

    const isCoffeeActive = path.includes('coffee') || path.includes('pourover') || path.includes('espresso');

    const navHtml = `
      <nav class="ts-nav">
        <div class="ts-nav-container">
          <div class="ts-nav-brand-group min-w-0 shrink overflow-hidden">
            <a href="/" class="ts-nav-brand shrink-0">
              <span class="status-beacon"></span>
              <span class="ts-nav-brand-text">threepscoot</span>
            </a>
            ${breadcrumbsHtml}
          </div>

          <div class="ts-nav-links">
            <a href="/" class="ts-nav-link ${path === '/' ? 'active' : ''}">Home</a>
            <a href="/coffee/" class="ts-nav-link ${isCoffeeActive ? 'active' : ''}">
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

          <div class="ts-cmdk-wrapper flex items-center shrink-0">
            <button class="ts-cmdk-trigger" data-cmdk-trigger aria-label="Open Command Palette">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="ts-cmdk-trigger-text hidden sm:inline">Search</span>
              <span class="ts-kbd hidden sm:inline-block">⌘K</span>
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
