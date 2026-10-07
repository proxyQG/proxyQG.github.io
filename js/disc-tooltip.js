// js/disc-tooltip.js
(function () {
    let DISCS_DB = null;
    let overlayEl = null;
    let modalEl = null;

    // Détection de la langue active
    function getLang() {
        return localStorage.getItem('zzz_lang') || 'fr';
    }

    // Traduction bilingue
    function t(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        const lang = getLang();
        return obj[lang] || obj['fr'] || obj['en'] || '';
    }

    // Colorisation des mots-clés dans les descriptions (ex: {Stun}, [15 %])
    function formatText(text) {
        if (!text) return '';
        return text
            .replace(/\{([^}]+)\}/g, '<span style="color: #d7f70c; font-weight: 700;">$1</span>')
            .replace(/\[([^\]]+)\]/g, '<span style="color: #ffffff; font-weight: 800;">$1</span>');
    }

    // Création du DOM de la modale
    function createDOM() {
        if (document.getElementById('disc-tooltip-overlay')) return;

        overlayEl = document.createElement('div');
        overlayEl.id = 'disc-tooltip-overlay';

        modalEl = document.createElement('div');
        modalEl.id = 'disc-tooltip-modal';

        document.body.appendChild(overlayEl);
        document.body.appendChild(modalEl);

        // Fermeture au clic extérieur
        overlayEl.addEventListener('click', hideDiscTooltip);

        // Fermeture par geste de balayage tactile (Swipe-to-close sur mobile)
        let touchStartY = 0;
        modalEl.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        modalEl.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const diff = touchY - touchStartY;
            if (diff > 80 && modalEl.scrollTop === 0) {
                hideDiscTooltip();
            }
        }, { passive: true });
    }

    // Chargement différé de la base JSON
    async function loadDatabase() {
        if (DISCS_DB) return DISCS_DB;
        try {
            const res = await fetch('js/data/discs.json');
            DISCS_DB = await res.json();
            return DISCS_DB;
        } catch (e) {
            console.error('Erreur chargement discs.json:', e);
            return null;
        }
    }

    // Affichage de l'infobulle
    async function showDiscTooltip(discKey) {
        createDOM();
        const db = await loadDatabase();
        if (!db || !db[discKey]) return;

        const disc = db[discKey];
        const lang = getLang();

        const ranksHTML = (disc.ranks || ['S'])
            .map(r => {
                const color = r === 'S' ? '#eab308' : (r === 'A' ? '#a855f7' : '#3b82f6');
                return `<span style="background:${color}20; color:${color}; border:1px solid ${color}40;" class="text-[10px] font-black px-2 py-0.5 rounded">${r}</span>`;
            }).join('');

        modalEl.innerHTML = `
            <div class="p-6 relative">
                <!-- Bouton fermer -->
                <button type="button" onclick="window.hideDiscTooltip()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <!-- Vinyle interactif -->
                <div class="disc-vinyl-container mb-4">
                    <div class="disc-vinyl-plate">
                        <img src="assets/Disque/${disc.img}" alt="${t(disc.name)}" class="disc-vinyl-img">
                    </div>
                </div>

                <!-- Titre & Rangs -->
                <div class="text-center mb-5">
                    <div class="flex items-center justify-center gap-1.5 mb-1.5">
                        ${ranksHTML}
                    </div>
                    <h3 class="text-white font-display font-black text-xl uppercase tracking-wider drop-shadow-md">
                        ${t(disc.name)}
                    </h3>
                    <p class="text-zinc-400 text-xs mt-1">
                        ${t(disc.source)}
                    </p>
                </div>

                <!-- Bonus 2-Pièces -->
                <div class="disc-bonus-box mb-3">
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="disc-bonus-badge bg-zinc-800 text-zinc-300 border border-zinc-700">2-SET</span>
                        <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                            ${lang === 'en' ? '2-Piece Bonus' : 'Bonus 2 pièces'}
                        </span>
                    </div>
                    <p class="text-xs text-zinc-200 leading-relaxed font-normal">
                        ${formatText(t(disc.twoPiece))}
                    </p>
                </div>

                <!-- Bonus 4-Pièces -->
                <div class="disc-bonus-box">
                    <div class="flex items-center gap-2 mb-1.5">
                        <span class="disc-bonus-badge bg-[#d7f70c] text-black">4-SET</span>
                        <span class="text-[11px] font-bold text-[#d7f70c] uppercase tracking-wide">
                            ${lang === 'en' ? '4-Piece Bonus' : 'Bonus 4 pièces'}
                        </span>
                    </div>
                    <p class="text-xs text-zinc-200 leading-relaxed font-normal">
                        ${formatText(t(disc.fourPiece))}
                    </p>
                </div>
            </div>
        `;

        overlayEl.classList.add('visible');
        modalEl.classList.add('visible');
    }

    function hideDiscTooltip() {
        if (overlayEl) overlayEl.classList.remove('visible');
        if (modalEl) modalEl.classList.remove('visible');
    }

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && modalEl.classList.contains('visible')) {
            hideDiscTooltip();
        }
    });

    // Délégation d'événement globale pour écouter les clics sur les disques
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-disc]');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            const discKey = trigger.getAttribute('data-disc');
            showDiscTooltip(discKey);
        }
    });

    window.showDiscTooltip = showDiscTooltip;
    window.hideDiscTooltip = hideDiscTooltip;
})();
