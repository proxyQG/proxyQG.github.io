// js/disc-tooltip.js
(function () {
    let DISCS_DB = null;
    let AGENTS_DB = null;
    let overlayEl = null;
    let modalEl = null;

    // Lecture depuis le cache local de session pour une ouverture en 0 ms
    const storedDiscs = sessionStorage.getItem('zzz_discs_db');
    if (storedDiscs) {
        try {
            DISCS_DB = JSON.parse(storedDiscs);
        } catch (e) {
            sessionStorage.removeItem('zzz_discs_db');
        }
    }

    function getLang() {
        return localStorage.getItem('zzz_lang') || 'fr';
    }

    function t(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        const lang = getLang();
        return obj[lang] || obj['fr'] || obj['en'] || '';
    }

    // Colorisation ZZZ des termes clés et des valeurs
    function formatText(text) {
        if (!text) return '';
        return text
            .replace(/\{([^}]+)\}/g, '<span style="color: #d7f70c; font-weight: 700;">$1</span>')
            .replace(/\[([^\]]+)\]/g, '<span style="color: #ffffff; font-weight: 800; background: rgba(255,255,255,0.08); padding: 1px 4px; border-radius: 4px;">$1</span>');
    }

    function createDOM() {
        if (document.getElementById('disc-tooltip-overlay')) return;

        overlayEl = document.createElement('div');
        overlayEl.id = 'disc-tooltip-overlay';

        modalEl = document.createElement('div');
        modalEl.id = 'disc-tooltip-modal';

        document.body.appendChild(overlayEl);
        document.body.appendChild(modalEl);

        overlayEl.addEventListener('click', () => hideDiscTooltip());

        modalEl.addEventListener('click', (e) => {
            const agentBtn = e.target.closest('[data-disc-agent]');
            if (agentBtn) {
                const targetAgent = agentBtn.getAttribute('data-disc-agent');
                if (targetAgent && typeof window.openAgentDetail === 'function') {
                    hideDiscTooltip(true);
                    const modal = document.getElementById('agentDetailModal');
                    const isGuideOpen = modal && !modal.classList.contains('hidden');
                    window.history.replaceState({}, '', '?' + new URLSearchParams({ agent: targetAgent }).toString());
                    window.openAgentDetail(targetAgent, false, isGuideOpen);
                }
            }
        });

        // GESTION DU SWIPE-TO-CLOSE TACTILE FLUIDE (MOBILE)
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        modalEl.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 768) return;
            if (modalEl.scrollTop > 0) return;
            
            startY = e.touches[0].clientY;
            isDragging = true;
            modalEl.style.transition = 'none';
        }, { passive: true });

        modalEl.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY - startY;

            if (currentY > 0) {
                e.preventDefault();
                modalEl.style.transform = `translateY(${currentY}px)`;
                if (overlayEl) overlayEl.style.opacity = Math.max(0, 1 - (currentY / window.innerHeight));
            }
        }, { passive: false });

        modalEl.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            modalEl.style.transition = '';
            if (overlayEl) overlayEl.style.opacity = '';

            if (currentY > 80) {
                hideDiscTooltip();
            } else {
                modalEl.style.transform = '';
            }
            currentY = 0;
        });
    }

    async function loadDatabase() {
        if (DISCS_DB) return DISCS_DB;
        try {
            const res = await fetch('js/data/discs.json');
            DISCS_DB = await res.json();
            sessionStorage.setItem('zzz_discs_db', JSON.stringify(DISCS_DB));
            return DISCS_DB;
        } catch (e) {
            console.error('Erreur chargement discs.json:', e);
            return null;
        }
    }

    async function getAgentsDB() {
        if (AGENTS_DB) return AGENTS_DB;
        const stored = sessionStorage.getItem('zzz_agent_db');
        if (stored) {
            try {
                AGENTS_DB = JSON.parse(stored);
                return AGENTS_DB;
            } catch (e) {}
        }
        try {
            const res = await fetch('js/data/agent_database.json');
            AGENTS_DB = await res.json();
            sessionStorage.setItem('zzz_agent_db', JSON.stringify(AGENTS_DB));
            return AGENTS_DB;
        } catch (e) {
            return null;
        }
    }

    // Préchargement silencieux quand le navigateur est au repos
    if (!DISCS_DB) {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => loadDatabase(), { timeout: 3000 });
        } else {
            setTimeout(loadDatabase, 1800);
        }
    }

    async function showDiscTooltip(discKey) {
        createDOM();
        const [db, agentsDB] = await Promise.all([loadDatabase(), getAgentsDB()]);
        if (!db || !db[discKey]) return;

        const disc = db[discKey];
        const lang = getLang();

        const ranksHTML = (disc.ranks || ['S'])
            .map(r => {
                const color = r === 'S' ? '#eab308' : (r === 'A' ? '#a855f7' : '#3b82f6');
                return `<span style="background:${color}20; color:${color}; border:1px solid ${color}40;" class="text-[10px] font-black px-2 py-0.5 rounded shadow-sm">${r}</span>`;
            }).join('');

        let recommendedHTML = '';
        if (agentsDB) {
            const matchingAgents = Object.keys(agentsDB).filter(agentName => {
                const discs = agentsDB[agentName]?.discs;
                return Array.isArray(discs) && discs.some(d => d.set1 === discKey || d.set2 === discKey);
            });
            if (matchingAgents.length > 0) {
                const recTitle = lang === 'en' ? 'Recommended on' : 'Recommandé sur';
                const pills = matchingAgents.map(agentName => {
                    const displayName = agentName === 'Jane' ? 'Jane Doe' : agentName;
                    const safeAttr = agentName.replace(/"/g, '&quot;');
                    return `
                    <button type="button" data-disc-agent="${safeAttr}" title="${displayName}" class="group flex items-center gap-1.5 bg-black/60 hover:bg-[#1a1a1f] border border-white/10 hover:border-[#d7f70c] rounded-full pr-2.5 pl-1 py-1 transition-all cursor-pointer">
                        <img src="assets/Agents/${agentName}.webp" loading="lazy" decoding="async" alt="${displayName}" class="w-6 h-6 rounded-full object-cover object-top bg-zinc-900">
                        <span class="text-[10px] font-extrabold uppercase tracking-wider text-zinc-300 group-hover:text-[#d7f70c] transition-colors">${displayName}</span>
                    </button>`;
                }).join('');
                recommendedHTML = `
                <div class="mt-4 pt-3.5 border-t border-white/10">
                    <div class="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2.5">${recTitle}</div>
                    <div class="flex flex-wrap gap-2">${pills}</div>
                </div>`;
            }
        }

        modalEl.innerHTML = `
            <div class="p-5 sm:p-6 relative">
                <!-- Bouton fermer -->
                <button type="button" onclick="window.hideDiscTooltip()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <!-- Platine Vinyle Centrée -->
                <div class="disc-turntable">
                    <div class="disc-platter-ring"></div>
                    <div class="disc-vinyl-plate">
                        <img src="assets/Disque/${disc.img}" decoding="async" alt="${t(disc.name)}" class="disc-vinyl-img">
                    </div>
                </div>

                <!-- En-tête : Titre & Badge de farm -->
                <div class="text-center mb-5">
                    <div class="flex items-center justify-center gap-1.5 mb-1.5">
                        ${ranksHTML}
                    </div>
                    <h3 class="text-white font-display font-black text-xl uppercase tracking-wider drop-shadow-md">
                        ${t(disc.name)}
                    </h3>
                    
                    <!-- Badge de Nettoyage de routine -->
                    <div class="disc-source-pill">
                        <svg class="w-3.5 h-3.5 text-[#d7f70c] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span class="text-[11px] font-semibold text-zinc-300 tracking-wide">
                            ${t(disc.source)}
                        </span>
                    </div>
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

                ${recommendedHTML}
            </div>
        `;

        window.history.pushState({ discTooltipOpen: true }, '', window.location.href);

        overlayEl.classList.add('visible');
        modalEl.classList.add('visible');
    }

    let isClosing = false;

    function hideDiscTooltip(fromPopstate = false) {
        if (isClosing || !modalEl || !modalEl.classList.contains('visible')) return;
        isClosing = true;

        if (overlayEl) {
            overlayEl.classList.remove('visible');
            overlayEl.style.opacity = '';
        }
        if (modalEl) {
            modalEl.classList.remove('visible');
            modalEl.style.transform = '';
        }

        if (fromPopstate !== true && window.history.state?.discTooltipOpen) {
            window.history.back();
        }

        setTimeout(() => {
            isClosing = false;
        }, 300);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalEl && modalEl.classList.contains('visible')) {
            hideDiscTooltip();
            e.stopImmediatePropagation();
        }
    });
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
