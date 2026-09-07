# AGENTS.md — System & Development Guide for AI Agents

Welcome! This file provides comprehensive architectural context, design system rules, codebase anatomy, and execution playbooks for AI coding agents working on **threepscoot.cc** ([oscarsaleta.github.io](https://github.com/oscarsaleta/oscarsaleta.github.io)).

---

## 1. Project Overview & Identity

- **Owner / Persona:** `threepscoot` (Oscar Saleta).
- **Domain:** [threepscoot.cc](https://threepscoot.cc) (served via GitHub Pages using `CNAME`).
- **Purpose:** Modern personal portal, digital garden, and interactive hobby workspace with high aesthetic standards and snappy UX.
- **Core Subject Areas:**
  1. **Ultra Endurance Athletics & Nutrition:** Caloric and carbohydrate periodization (60–120g/hr), electrolyte/sodium management, and whole-food plant-based endurance fueling for 50km–100km+ events.
  2. **Specialty Coffee Brewing:** Science-based extraction split into two distinct disciplines:
     - **Gravity Percolation (Filter / Pour-Over):** Lance Hedrick 2-pour technique, variable isolation, sensory dial-in compass.
     - **Forced-Pressure Extraction (Espresso):** 6–9 bar mechanics, channel-free puck prep (0.35mm WDT + level tamp), and modern recipe exploration (Turbo Shot, Allongé, Sprover, Ristretto, Normale, Lungo) using **relative grind shifts** from a dialed-in standard baseline.
  3. **Catalan Language Acquisition:** Beginner grammar guides and an interactive verb conjugator.
  4. **Second Brain / Digital Garden:** Markdown-powered technical articles on physiology, brewing physics, and software engineering.

---

## 2. Technical Architecture & Constraints

### Zero-Build Static Web Architecture
- **Strict Rule:** **NO Node.js, npm, bundlers, webpack, Vite, or package build pipelines.**
- The site runs on pure modern web standards: semantic **HTML5**, standard **vanilla CSS3** with CSS variables, and native modern **ES6+ JavaScript**.
- **Hosting:** Hosted directly on **GitHub Pages** from the root repository. Every file must be browser-ready without transpilation.
- **Third-Party Dependencies:** Kept minimal, unbundled, and pinned via trusted CDNs:
  - **Tailwind CSS (Script CDN):** `<script src="https://cdn.tailwindcss.com"></script>` for utility styling.
  - **Marked.js:** `<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>` for client-side markdown parsing.
  - **Highlight.js:** `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/.../github-dark.min.css">` + JS for code highlighting in the digital garden.
- **State & Storage:** Client-side state is preserved locally via browser `localStorage` with JSON export/import utilities (e.g. coffee tasting logs, training presets).

---

## 3. Design System & Aesthetics ("Obsidian Dark")

The website adheres to a clean, cohesive, dark developer-aesthetic inspired by Obsidian and modern web applications.

### Color Tokens (Defined in `assets/css/main.css`)
```css
:root {
  /* Surfaces */
  --bg-canvas: #0b0f17;       /* Deepest background */
  --bg-surface: #0f172a;      /* Secondary surface */
  --bg-card: #1e293b;         /* Default card fill */
  --bg-card-hover: #334155;   /* Card hover state */
  
  /* Borders */
  --border-subtle: #1e293b;
  --border-hover: #475569;
  
  /* Text */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-highlight: #ffffff;
  
  /* Domain Accents */
  --accent-coffee: #f59e0b;           /* Specialty Coffee (Amber) */
  --accent-coffee-surface: rgba(245, 158, 11, 0.12);
  --accent-running: #10b981;          /* Endurance Running (Emerald) */
  --accent-running-surface: rgba(16, 185, 129, 0.12);
  --accent-catalan: #8b5cf6;          /* Catalan Studio (Violet) */
  --accent-catalan-surface: rgba(139, 92, 246, 0.12);
  --accent-kb: #38bdf8;               /* Digital Garden (Sky/Cyan) */
  --accent-kb-surface: rgba(56, 189, 248, 0.12);
}
```

### Typography
- **UI Sans:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Code & Numeric Data:** `'JetBrains Mono', 'Fira Code', monospace`

### Common CSS Classes
- `.ts-card`: Rounded cards with subtle border and smooth hover transition.
- `.hobby-card`: Colored gradient hover effects matching the domain accent.
- `.ts-badge`: Pill badges with domain colors (`ts-badge-coffee`, `ts-badge-running`, `ts-badge-catalan`, `ts-badge-kb`).
- `.ts-kbd`: Styled keyboard shortcut indicators (e.g. `⌘K`, `Enter`).
- `.arrow`: Animated indicator that shifts horizontally on card hover (`transform: translateX(4px)`).

---

## 4. Site Anatomy & Directory Map

```
/
├── index.html                   # Homepage (Hero, hobby hub, quick calculators, knowledge preview)
├── CNAME                        # Custom domain mapping (threepscoot.cc)
├── AGENTS.md                    # This developer guide for AI agents
├── assets/
│   ├── css/
│   │   └── main.css             # Design tokens, global resets, typography, and card components
│   └── js/
│       ├── nav.js               # Global top navbar & breadcrumb manager (#ts-nav-root)
│       └── cmdk.js              # Global ⌘K Command Palette (fuzzy search across all tools & notes)
├── coffee/
│   └── index.html               # Specialty Coffee Hub (Landing page separating Pour-Over & Espresso)
├── pourover/
│   └── index.html               # Pour-Over Dial-In Lab (Lance Hedrick 2-pour, sensory compass, log)
├── espresso/
│   └── index.html               # Espresso Lab (18g default, 4 constants, recipe explorer, shot timer, log)
├── running-nutrition/
│   └── index.html               # Ultra Running Fueling Planner (Carb rates, hydration, sodium, recipes)
├── catalan-learning/
│   ├── index.html               # Catalan Studio (Grammar tables, rules, verb conjugator UI)
│   ├── script.js                # Conjugation engine logic
│   └── style.css                # Catalan-specific legacy styles
└── knowledge/
    ├── index.html               # Digital Garden viewer (client-side hash routing, category filters)
    ├── notes.json               # Digital Garden note index (metadata, tags, slugs, categories)
    └── content/
        ├── coffee-extraction-fundamentals.md
        ├── espresso-dialing-and-recipes.md
        ├── ultra-training-protocols.md
        ├── developer-cheatsheet.md
        └── catalan-verb-patterns.md
```

---

## 5. Global Modules & Dynamic Systems

### 1. Global Navigation (`assets/js/nav.js`)
- Injects a standard responsive navbar into `<div id="ts-nav-root"></div>`.
- **Breadcrumb Navigation:** Automatically computes hierarchical breadcrumbs based on `window.location.pathname` (e.g. `/coffee/` → `threepscoot / coffee-hub`, `/espresso/` → `threepscoot / coffee / espresso`).
- **Command Palette Trigger:** Houses the search button that triggers `window.toggleCmdk()`.
- **Active Route Highlighting:** Accurately highlights active section links.

### 2. Command Palette `⌘K` (`assets/js/cmdk.js`)
- Opens with `Cmd+K` (Mac), `Ctrl+K` (Windows/Linux), or by clicking the Search button.
- Fuzzy searches across all apps, calculators, tools, and digital garden notes.
- **Rule for Agents:** Whenever you add a new page, interactive tool, or digital garden note, **you MUST register it in `COMMAND_ITEMS` in `assets/js/cmdk.js`**.

### 3. Digital Garden (`knowledge/index.html` + `knowledge/notes.json`)
- Zero-build client-side Markdown rendering via `marked.js` and `highlight.js`.
- Routing is handled via URL hash (e.g. `threepscoot.cc/knowledge/#espresso-dialing-and-recipes`).
- Notes catalog is statically indexed in `knowledge/notes.json`. When a note is opened, the client fetches `/knowledge/content/{file}` and renders the markdown into the DOM.

---

## 6. Development Guidelines & Best Practices

### A. Arrow & Entity Rendering Rule (CRITICAL)
> **NEVER use HTML entities (`&rarr;`, `&larr;`, `&plusmn;`, `&ne;`) inside JavaScript strings assigned to `.textContent` or `.innerText`!**
>
> When assigned via `.textContent`, the browser renders the literal text `&rarr;` on screen instead of an arrow symbol.
>
> **Best Practice:** Always use literal **Unicode characters** across JavaScript, HTML, and Markdown:
> - Use `→` instead of `&rarr;` or `->`
> - Use `←` instead of `&larr;` or `<-`
> - Use `±` instead of `&plusmn;`
> - Use `≠` instead of `&ne;`
> - Use `•` instead of `&bull;`
> - Use `µm` instead of `&mu;m`

### B. Coffee Extraction Domain Rules
When adding or modifying coffee-related pages:
- **Discipline Separation:** Filter coffee (`/pourover/`) and Espresso (`/espresso/`) are completely separate disciplines with distinct physics (atmospheric gravity percolation vs. 6–9 bar forced extraction). They meet at the Coffee Hub (`/coffee/`).
- **Lance Hedrick Dial-In Methodology:**
  - **Brew time is an output, never a target:** Never advise coarsening or fining just to hit an arbitrary clock. If a brew tastes sweet and balanced, it is dialed in regardless of the clock.
  - **Isolate variables:** Fix dose (18g for espresso, 15g/20g for pour-over), fix ratio, and adjust **only grind size** first.
  - **Astringency ≠ Bitterness:** Astringency is a tactile drying sandpaper defect caused by fines migration and channeling. Bitterness is a flavor.
  - **Modern Espresso Recipes:** Always express grind size changes **relative to the dialed-in standard espresso grind** (e.g. Turbo Shot: `+4 clicks coarser, 6 bar, 1:2.7 ratio, 12–16s`).

### C. Sports Nutrition Domain Rules
- Base endurance hydration and fueling on scientific consensus:
  - Exogenous carbohydrate intake rates: 30–60g/hr (short), 60–90g/hr (marathon/50k), up to 100–120g/hr (ultra 100k+ with 1:0.8 maltodextrin:fructose ratio).
  - Sodium intake: 500–1,000mg/L depending on sweat rate and heat.
  - Plant-based whole-food recommendations alongside functional sports nutrition (gels, drink mix).

---

## 7. Step-by-Step Playbooks for Agents

### Playbook 1: Adding a New Knowledge Base Note
1. **Create the Markdown file:** Place it in `knowledge/content/<slug>.md`. Write clean GitHub Flavored Markdown using Unicode symbols.
2. **Register in `knowledge/notes.json`:** Add an entry:
   ```json
   {
     "id": "your-note-slug",
     "title": "Your Note Title",
     "category": "Running | Coffee | Catalan | Tech",
     "badgeClass": "ts-badge-running | ts-badge-coffee | ts-badge-catalan | ts-badge-kb",
     "file": "content/your-note-slug.md",
     "summary": "1-2 sentence description of the note.",
     "tags": ["tag1", "tag2"],
     "readTime": "4 min read",
     "date": "YYYY-MM"
   }
   ```
3. **Register in Command Palette:** Add an entry to `COMMAND_ITEMS` in `assets/js/cmdk.js`:
   ```javascript
   {
     title: 'Your Note Title',
     subtitle: 'Summary or key takeaway',
     category: 'Knowledge Base',
     badge: 'Note',
     badgeClass: 'ts-badge-kb',
     icon: '📄',
     url: '/knowledge/#your-note-slug'
   }
   ```

### Playbook 2: Adding a New Page or Interactive Tool
1. **Create `<slug>/index.html`:**
   - Include `<head>` with viewport, Inter/JetBrains Mono fonts, `assets/css/main.css`, and Tailwind CDN.
   - Add `<div id="ts-nav-root"></div>` at the top of `<body>`.
   - Add `<script src="/assets/js/nav.js"></script>` and `<script src="/assets/js/cmdk.js"></script>` before `</body>`.
2. **Update Global Nav:**
   - In `assets/js/nav.js`, add breadcrumb handling in `generateNav()` for the new path.
   - If it's a top-level hobby, add a navigation link in the desktop and mobile nav sections.
3. **Update Command Palette:** Add 1–2 entries in `assets/js/cmdk.js` targeting the new tool and its features.
4. **Update Homepage:** Add a hobby card in `index.html` inside `.hobbies-grid`.

### Playbook 3: Verification Before Submitting
1. **Strict HTML Syntax Check:** Run a validation script via Python's `html.parser`:
   ```bash
   python3 -c "from html.parser import HTMLParser; p=HTMLParser(); p.feed(open('path/to/file.html').read()); print('Valid!')"
   ```
2. **JSON Validation:** Verify `knowledge/notes.json`:
   ```bash
   python3 -c "import json; json.load(open('knowledge/notes.json')); print('Valid JSON!')"
   ```
3. **Entity Audit:** Ensure no unwanted entity strings are in code:
   ```bash
   git grep -n -E "(&(r|l|u|d)arr;|&plusmn;|&ne;)"
   ```

---

## 8. Git & Stack Workflow (`gh stack`)

The project uses GitHub's stacked PR workflow (`gh stack` extension).

### Crucial Sandbox Consideration (macOS)
Running `git` commands inside standard sandboxed subprocesses may fail with `.git` ref lock permission errors on macOS. **Always run git and `gh stack` write operations with `BypassSandbox: true`**.

### Standard Stack Commands
```bash
# View active stack
gh stack view

# Add new stacked branch on top of current branch
gh stack add <branch-name>

# Navigate between branches
gh stack up
gh stack down
gh stack trunk

# Submit stack to GitHub (creates/updates PRs)
gh stack submit --auto --open
```

*Maintained with care for seamless human & AI collaboration.*
