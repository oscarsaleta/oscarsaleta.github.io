document.addEventListener('DOMContentLoaded', () => {
    const verbSelect = document.getElementById('verb-select');
    const conjugationResult = document.getElementById('conjugation-result');

    const verbs = {
        // -ar verbs
        'Parlar (to speak)': { ending: 'ar', stem: 'parl' },
        'Cantar (to sing)': { ending: 'ar', stem: 'cant' },
        'Estudiar (to study)': { ending: 'ar', stem: 'estudi' },
        'Treballar (to work)': { ending: 'ar', stem: 'treball' },
        'Comprar (to buy)': { ending: 'ar', stem: 'compr' },
        // -er/-re verbs
        'Beure (to drink)': { ending: 're', stem: 'beu' },
        'Créixer (to grow)': { ending: 'er', stem: 'creix' },
        'Perdre (to lose)': { ending: 're', stem: 'perd' },
        'Vendre (to sell)': { ending: 're', stem: 'ven' },
        'Témer (to fear)': { ending: 'er', stem: 'tem' },
        // -ir verbs
        'Viure (to live)': { ending: 'ir', stem: 'viv' },
        'Obrir (to open)': { ending: 'ir', stem: 'obr' },
        'Sentir (to feel/hear)': { ending: 'ir', stem: 'sent' },
        'Dormir (to sleep)': { ending: 'ir', stem: 'dorm' },
        'Servir (to serve)': { ending: 'ir', stem: 'serv' }
    };

    // Populate dropdown
    for (const verb in verbs) {
        const option = document.createElement('option');
        option.value = verb;
        option.textContent = verb;
        verbSelect.appendChild(option);
    }

    // Event listener for selection
    verbSelect.addEventListener('change', (event) => {
        const selectedVerb = event.target.value;
        if (!selectedVerb) {
            conjugationResult.innerHTML = '';
            return;
        }

        const verbInfo = verbs[selectedVerb];
        conjugate(verbInfo.stem, verbInfo.ending);
    });

    function conjugate(stem, ending) {
        let conjugations;
        const pronouns = ['jo', 'tu', 'ell/ella', 'nosaltres', 'vosaltres', 'ells/elles'];

        if (ending === 'ar') {
            conjugations = [`${stem}o`, `${stem}es`, `${stem}a`, `${stem}em`, `${stem}eu`, `${stem}en`];
        } else if (ending === 'er' || ending === 're') {
            conjugations = [`${stem}o`, `${stem}s`, stem, `${stem}em`, `${stem}eu`, `${stem}en`];
        } else if (ending === 'ir') {
            conjugations = [`${stem}o`, `${stem}s`, stem, `${stem}im`, `${stem}iu`, `${stem}en`];
        }

        let tableHTML = '<table>';
        for (let i = 0; i < pronouns.length; i++) {
            tableHTML += `<tr><td>${pronouns[i]}</td><td><b>${conjugations[i]}</b></td></tr>`;
        }
        tableHTML += '</table>';

        conjugationResult.innerHTML = tableHTML;
    }
});