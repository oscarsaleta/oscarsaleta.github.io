document.addEventListener('DOMContentLoaded', () => {
  const verbSelect = document.getElementById('verb-select');
  const conjugationResult = document.getElementById('conjugation-result');
  const tensePresentBtn = document.getElementById('tense-present');
  const tensePastBtn = document.getElementById('tense-past');

  let currentTense = 'present';

  const verbs = {
    // Irregular Key Verbs
    'Ser (to be - identity)': {
      type: 'irregular',
      infinitive: 'ser',
      present: ['sóc', 'ets', 'és', 'som', 'sou', 'són']
    },
    'Estar (to be - state/location)': {
      type: 'irregular',
      infinitive: 'estar',
      present: ['estic', 'estàs', 'està', 'estem', 'esteu', 'estan']
    },
    'Tenir (to have)': {
      type: 'irregular',
      infinitive: 'tenir',
      present: ['tinc', 'tens', 'té', 'tenim', 'teniu', 'tenen']
    },
    'Anar (to go)': {
      type: 'irregular',
      infinitive: 'anar',
      present: ['vaig', 'vas', 'va', 'anem', 'aneu', 'van']
    },
    'Fer (to do / make)': {
      type: 'irregular',
      infinitive: 'fer',
      present: ['faig', 'fas', 'fa', 'fem', 'feu', 'fan']
    },
    'Voler (to want)': {
      type: 'irregular',
      infinitive: 'voler',
      present: ['vull', 'vols', 'vol', 'volem', 'voleu', 'volen']
    },
    'Poder (to be able / can)': {
      type: 'irregular',
      infinitive: 'poder',
      present: ['puc', 'pots', 'pot', 'podem', 'podeu', 'poden']
    },

    // -ar Regular Verbs
    'Parlar (to speak)': { ending: 'ar', stem: 'parl', infinitive: 'parlar' },
    'Cantar (to sing)': { ending: 'ar', stem: 'cant', infinitive: 'cantar' },
    'Estudiar (to study)': { ending: 'ar', stem: 'estudi', infinitive: 'estudiar' },
    'Treballar (to work)': { ending: 'ar', stem: 'treball', infinitive: 'treballar' },
    'Comprar (to buy)': { ending: 'ar', stem: 'compr', infinitive: 'comprar' },

    // -er / -re Verbs
    'Beure (to drink)': { ending: 're', stem: 'beu', infinitive: 'beure' },
    'Créixer (to grow)': { ending: 'er', stem: 'creix', infinitive: 'créixer' },
    'Perdre (to lose)': { ending: 're', stem: 'perd', infinitive: 'perdre' },
    'Vendre (to sell)': { ending: 're', stem: 'ven', infinitive: 'vendre' },
    'Témer (to fear)': { ending: 'er', stem: 'tem', infinitive: 'témer' },

    // -ir Verbs (Standard & Inchoative)
    'Sentir (to feel/hear)': { ending: 'ir', stem: 'sent', infinitive: 'sentir' },
    'Dormir (to sleep)': { ending: 'ir', stem: 'dorm', infinitive: 'dormir' },
    'Obrir (to open)': { ending: 'ir', stem: 'obr', infinitive: 'obrir' },
    'Viure (to live)': { ending: 're', stem: 'visc', customPresent: ['visc', 'vius', 'viu', 'vivim', 'viviu', 'viuen'], infinitive: 'viure' },
    'Servir (to serve - inchoative)': { 
      type: 'inchoative',
      stem: 'serv', 
      infinitive: 'servir',
      present: ['serveixo', 'serveixes', 'serveix', 'servim', 'serviu', 'serveixen']
    }
  };

  // Populate dropdown with grouped categories
  const optGroupIrreg = document.createElement('optgroup');
  optGroupIrreg.label = 'Essential Irregulars';
  const optGroupAr = document.createElement('optgroup');
  optGroupAr.label = 'Regular -ar Verbs';
  const optGroupErRe = document.createElement('optgroup');
  optGroupErRe.label = 'Regular -er / -re Verbs';
  const optGroupIr = document.createElement('optgroup');
  optGroupIr.label = 'Regular & Inchoative -ir Verbs';

  for (const verb in verbs) {
    const opt = document.createElement('option');
    opt.value = verb;
    opt.textContent = verb;

    if (verbs[verb].type === 'irregular') {
      optGroupIrreg.appendChild(opt);
    } else if (verbs[verb].ending === 'ar') {
      optGroupAr.appendChild(opt);
    } else if (verbs[verb].ending === 'er' || verbs[verb].ending === 're') {
      optGroupErRe.appendChild(opt);
    } else {
      optGroupIr.appendChild(opt);
    }
  }

  verbSelect.appendChild(optGroupIrreg);
  verbSelect.appendChild(optGroupAr);
  verbSelect.appendChild(optGroupErRe);
  verbSelect.appendChild(optGroupIr);

  // Set default selection
  verbSelect.value = 'Parlar (to speak)';

  function renderConjugation() {
    const selectedVerb = verbSelect.value;
    if (!selectedVerb || !verbs[selectedVerb]) {
      conjugationResult.innerHTML = '<div class="p-8 text-center text-slate-500 text-sm">Select a verb to see its conjugations.</div>';
      return;
    }

    const info = verbs[selectedVerb];
    const pronouns = [
      { p: 'jo', label: 'jo (I)' },
      { p: 'tu', label: 'tu (you)' },
      { p: 'ell / ella / vostè', label: 'ell / ella (he/she/you formal)' },
      { p: 'nosaltres', label: 'nosaltres (we)' },
      { p: 'vosaltres', label: 'vosaltres (you all)' },
      { p: 'ells / elles / vostès', label: 'ells / elles (they)' }
    ];

    let forms = [];

    if (currentTense === 'past') {
      // Periphrastic Past (vaig + infinitive)
      const aux = ['vaig', 'vas', 'va', 'vam', 'vau', 'van'];
      forms = aux.map(a => `${a} <b>${info.infinitive}</b>`);
    } else {
      // Present Tense
      if (info.present) {
        forms = info.present.map(f => `<b>${f}</b>`);
      } else if (info.customPresent) {
        forms = info.customPresent.map(f => `<b>${f}</b>`);
      } else if (info.ending === 'ar') {
        const s = info.stem;
        forms = [
          `${s}<b>o</b>`,
          `${s}<b>es</b>`,
          `${s}<b>a</b>`,
          `${s}<b>em</b>`,
          `${s}<b>eu</b>`,
          `${s}<b>en</b>`
        ];
      } else if (info.ending === 'er' || info.ending === 're') {
        const s = info.stem;
        forms = [
          `${s}<b>o</b>`,
          `${s}<b>s</b>`,
          `<b>${s}</b>`,
          `${s}<b>em</b>`,
          `${s}<b>eu</b>`,
          `${s}<b>en</b>`
        ];
      } else if (info.ending === 'ir') {
        const s = info.stem;
        forms = [
          `${s}<b>o</b>`,
          `${s}<b>s</b>`,
          `<b>${s}</b>`,
          `${s}<b>im</b>`,
          `${s}<b>iu</b>`,
          `${s}<b>en</b>`
        ];
      }
    }

    let html = '<table class="conjugation-table">';
    for (let i = 0; i < pronouns.length; i++) {
      html += `
        <tr>
          <td class="pronoun">${pronouns[i].label}</td>
          <td class="verb-form">${forms[i]}</td>
        </tr>
      `;
    }
    html += '</table>';

    conjugationResult.innerHTML = html;
  }

  verbSelect.addEventListener('change', renderConjugation);

  tensePresentBtn.addEventListener('click', () => {
    currentTense = 'present';
    tensePresentBtn.classList.add('active');
    tensePresentBtn.classList.remove('text-slate-400');
    tensePastBtn.classList.remove('active');
    tensePastBtn.classList.add('text-slate-400');
    renderConjugation();
  });

  tensePastBtn.addEventListener('click', () => {
    currentTense = 'past';
    tensePastBtn.classList.add('active');
    tensePastBtn.classList.remove('text-slate-400');
    tensePresentBtn.classList.remove('active');
    tensePresentBtn.classList.add('text-slate-400');
    renderConjugation();
  });

  renderConjugation();
});