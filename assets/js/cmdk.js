/**
 * threepscoot.cc - Global Command Palette (Cmd+K)
 * Fast, keyboard-accessible command bar & fuzzy search
 */

(function () {
  const COMMAND_ITEMS = [
    // Apps & Hobbies
    {
      title: 'Pourover Coffee Lab',
      subtitle: 'Ratio calculator, brew parameters & dial-in guide',
      category: 'Hobbies & Tools',
      badge: 'Coffee',
      badgeClass: 'ts-badge-coffee',
      icon: '☕',
      url: '/pourover/'
    },
    {
      title: 'Endurance & Ultra Nutrition',
      subtitle: 'Caloric & hydration intake calculator for 50k - 100km races',
      category: 'Hobbies & Tools',
      badge: 'Running',
      badgeClass: 'ts-badge-running',
      icon: '🏃',
      url: '/running-nutrition/'
    },
    {
      title: 'Catalan Learning Studio',
      subtitle: 'Verb conjugator, essential grammar rules & tables',
      category: 'Hobbies & Tools',
      badge: 'Catalan',
      badgeClass: 'ts-badge-catalan',
      icon: '📚',
      url: '/catalan-learning/'
    },
    // Knowledge Base
    {
      title: 'Knowledge Base Hub',
      subtitle: 'Browse all engineering, athletics & hobby digital notes',
      category: 'Knowledge Base',
      badge: 'Docs',
      badgeClass: 'ts-badge-kb',
      icon: '🧠',
      url: '/knowledge/'
    },
    {
      title: 'Ultra Marathon Nutrition & Carb Guide',
      subtitle: 'Exogenous carbohydrates, gut training, and sodium loading',
      category: 'Knowledge Base',
      badge: 'Note',
      badgeClass: 'ts-badge-running',
      icon: '📄',
      url: '/knowledge/#ultra-training-protocols'
    },
    {
      title: 'Coffee Extraction & Dial-in Fundamentals',
      subtitle: 'Understanding TDS, extraction yield, temperature and grind distribution',
      category: 'Knowledge Base',
      badge: 'Note',
      badgeClass: 'ts-badge-coffee',
      icon: '📄',
      url: '/knowledge/#coffee-extraction-fundamentals'
    },
    {
      title: 'Catalan Verb Patterns & Memory Anchors',
      subtitle: 'High frequency irregular verbs and mnemonic anchors',
      category: 'Knowledge Base',
      badge: 'Note',
      badgeClass: 'ts-badge-catalan',
      icon: '📄',
      url: '/knowledge/#catalan-verb-patterns'
    },
    {
      title: 'Developer CLI & Git Cheatsheet',
      subtitle: 'Handy git aliases, debugging commands, and shell optimizations',
      category: 'Knowledge Base',
      badge: 'Note',
      badgeClass: 'ts-badge-kb',
      icon: '📄',
      url: '/knowledge/#developer-cheatsheet'
    },
    // Quick Actions
    {
      title: 'Go to Home / Portal',
      subtitle: 'Return to the main dashboard',
      category: 'Navigation',
      badge: 'Home',
      badgeClass: 'ts-badge-kb',
      icon: '🏠',
      url: '/'
    },
    {
      title: 'GitHub Source Repository',
      subtitle: 'Inspect code on github.com/oscarsaleta/oscarsaleta.github.io',
      category: 'Links',
      badge: 'GitHub',
      badgeClass: 'ts-badge-kb',
      icon: '💻',
      action: () => window.open('https://github.com/oscarsaleta/oscarsaleta.github.io', '_blank')
    }
  ];

  function createCmdkModal() {
    if (document.getElementById('ts-cmdk-modal-root')) return;

    const modalHtml = `
      <div id="ts-cmdk-modal-root" class="ts-cmdk-backdrop" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="ts-cmdk-modal">
          <div class="ts-cmdk-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); flex-shrink: 0;">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input id="ts-cmdk-input" class="ts-cmdk-input" type="text" placeholder="Type a command, tool or note name..." autocomplete="off" autocorrect="off" spellcheck="false" />
            <span class="ts-kbd">ESC</span>
          </div>
          <div id="ts-cmdk-list" class="ts-cmdk-list"></div>
          <div class="ts-cmdk-footer">
            <div>Navigate with <span class="ts-kbd">↑</span> <span class="ts-kbd">↓</span> &bull; Open with <span class="ts-kbd">↵</span></div>
            <div><span>threepscoot</span></div>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);

    const backdrop = document.getElementById('ts-cmdk-modal-root');
    const input = document.getElementById('ts-cmdk-input');

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeCmdk();
    });

    input.addEventListener('input', (e) => {
      renderResults(e.target.value);
    });

    input.addEventListener('keydown', handleInputKeydown);
  }

  let selectedIndex = 0;
  let currentFiltered = [];

  function openCmdk() {
    createCmdkModal();
    const backdrop = document.getElementById('ts-cmdk-modal-root');
    const input = document.getElementById('ts-cmdk-input');
    backdrop.classList.add('open');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 30);
    document.body.style.overflow = 'hidden';
  }

  function closeCmdk() {
    const backdrop = document.getElementById('ts-cmdk-modal-root');
    if (!backdrop) return;
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderResults(query) {
    const list = document.getElementById('ts-cmdk-list');
    const q = query.trim().toLowerCase();

    currentFiltered = COMMAND_ITEMS.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) ||
             item.subtitle.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q) ||
             (item.badge && item.badge.toLowerCase().includes(q));
    });

    selectedIndex = 0;
    list.innerHTML = '';

    if (currentFiltered.length === 0) {
      list.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No results found for "${query}"</div>`;
      return;
    }

    // Group items by category
    const groups = {};
    currentFiltered.forEach((item, index) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push({ item, index });
    });

    Object.keys(groups).forEach(cat => {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'ts-cmdk-group-title';
      groupHeader.textContent = cat;
      list.appendChild(groupHeader);

      groups[cat].forEach(({ item, index }) => {
        const itemEl = document.createElement('div');
        itemEl.className = `ts-cmdk-item ${index === selectedIndex ? 'selected' : ''}`;
        itemEl.dataset.index = index;

        itemEl.innerHTML = `
          <div class="ts-cmdk-item-left">
            <div class="ts-cmdk-item-icon">${item.icon}</div>
            <div>
              <div style="font-weight: 500; color: var(--text-primary); font-size: 0.9rem;">${item.title}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${item.subtitle}</div>
            </div>
          </div>
          <div>
            ${item.badge ? `<span class="ts-badge ${item.badgeClass}">${item.badge}</span>` : ''}
          </div>
        `;

        itemEl.addEventListener('mouseenter', () => {
          selectedIndex = index;
          updateSelection();
        });

        itemEl.addEventListener('click', () => {
          executeItem(item);
        });

        list.appendChild(itemEl);
      });
    });

    updateSelection();
  }

  function updateSelection() {
    const items = document.querySelectorAll('.ts-cmdk-item');
    items.forEach(el => {
      if (parseInt(el.dataset.index, 10) === selectedIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  function handleInputKeydown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentFiltered.length > 0) {
        selectedIndex = (selectedIndex + 1) % currentFiltered.length;
        updateSelection();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentFiltered.length > 0) {
        selectedIndex = (selectedIndex - 1 + currentFiltered.length) % currentFiltered.length;
        updateSelection();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFiltered[selectedIndex]) {
        executeItem(currentFiltered[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeCmdk();
    }
  }

  function executeItem(item) {
    closeCmdk();
    if (item.action) {
      item.action();
    } else if (item.url) {
      window.location.href = item.url;
    }
  }

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    // Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const backdrop = document.getElementById('ts-cmdk-modal-root');
      if (backdrop && backdrop.classList.contains('open')) {
        closeCmdk();
      } else {
        openCmdk();
      }
    }
    // Escape closes when open
    if (e.key === 'Escape') {
      closeCmdk();
    }
  });

  // Export to window
  window.threepscootCmdk = {
    open: openCmdk,
    close: closeCmdk
  };

  // Bind any button with data-cmdk-trigger
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-cmdk-trigger]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCmdk();
      });
    });
  });
})();
