// js/disc-tooltip.js
(function () {
    let DISCS_DB = null;
    let AGENTS_DB = null;
    let overlayEl = null;
    let modalEl = null;
    let pendingDiscCardsHTML = '';

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
            // 1. Ouverture / Fermeture du menu déroulant trapézoïdal "Recommandé sur"
            const recTrigger = e.target.closest('[data-rec-toggle]');
            if (recTrigger) {
                const accordion = modalEl.querySelector('.rec-accordion');
                if (accordion) {
                    const gridEl = accordion.querySelector('.rec-grid');
                    if (gridEl && !gridEl.hasChildNodes() && pendingDiscCardsHTML) {
                        gridEl.innerHTML = pendingDiscCardsHTML;
                    }
                    const isOpen = accordion.classList.toggle('open');
                    recTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    if (isOpen) {
                        setTimeout(() => {
                            accordion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 180);
                    }
                }
                return;
            }

            // 2. Clic sur un portrait d'agent dans la grille
            const agentBtn = e.target.closest('[data-disc-agent]');
            if (agentBtn) {
                const targetAgent = agentBtn.getAttribute('data-disc-agent');
                if (targetAgent && typeof window.openAgentDetail === 'function') {
                    const modal = document.getElementById('agentDetailModal');
                    const isGuideOpen = modal && !modal.classList.contains('hidden');
                    const pathMatch = window.location.pathname.match(/^\/agents\/([^/]+)/i);
                    const currentParam = new URLSearchParams(window.location.search).get('agent')
                        || (pathMatch ? decodeURIComponent(pathMatch[1]) : null);

                    // Si on clique sur l'agent dont le guide est déjà ouvert en arrière-plan, on ferme simplement la popup
                    if (isGuideOpen && currentParam && currentParam.toLowerCase() === targetAgent.toLowerCase()) {
                        hideDiscTooltip();
                        return;
                    }

                    const hadHistory = !!window.history.state?.discTooltipOpen;
                    hideDiscTooltip(true);
                    window.openAgentDetail(targetAgent, false, isGuideOpen);
                    if (isGuideOpen && hadHistory) {
                        window.__ignoreNextPopstate = true;
                        window.addEventListener('popstate', () => {
                            window.history.replaceState({ agentModal: true }, '', `/agents/${encodeURIComponent(targetAgent)}/`);
                        }, { once: true });
                        window.history.back();
                    } else {
                        window.history.replaceState({ agentModal: true }, '', `/agents/${encodeURIComponent(targetAgent)}/`);
                    }
                }
            }
        });

        // --- GESTION DU SWIPE-TO-CLOSE SANS CONFLIT DE SCROLL (MOBILE) ---
        let startY = 0;
        let currentY = 0;
        let gestureState = 'idle'; // 'idle' | 'pending' | 'dragging' | 'scrolling'

        modalEl.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 768) return;
            if (modalEl.scrollTop > 0) {
                gestureState = 'scrolling';
                return;
            }
            startY = e.touches[0].clientY;
            currentY = 0;
            gestureState = 'pending';
        }, { passive: true });

        modalEl.addEventListener('touchmove', (e) => {
            if (gestureState === 'idle' || gestureState === 'scrolling') return;

            const deltaY = e.touches[0].clientY - startY;

            if (gestureState === 'pending') {
                if (deltaY < -5) {
                    gestureState = 'scrolling';
                    return;
                }
                if (deltaY > 5) {
                    gestureState = 'dragging';
                    modalEl.style.transition = 'none';
                } else {
                    return;
                }
            }

            if (gestureState === 'dragging') {
                currentY = Math.max(0, deltaY);
                if (e.cancelable) e.preventDefault();
                modalEl.style.transform = `translate3d(0, ${currentY}px, 0)`;
            }
        }, { passive: false });

        const endTouchDrag = () => {
            if (gestureState !== 'dragging') {
                gestureState = 'idle';
                return;
            }
            gestureState = 'idle';

            modalEl.style.transition = '';
            void modalEl.offsetWidth;

            if (currentY > 85) {
                hideDiscTooltip();
            } else {
                modalEl.style.transform = '';
            }
            currentY = 0;
        };

        modalEl.addEventListener('touchend', endTouchDrag, { passive: true });
        modalEl.addEventListener('touchcancel', endTouchDrag, { passive: true });
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

    function buildRecommendedAccordion(agentsDB, discKey, lang) {
        pendingDiscCardsHTML = '';
        if (!agentsDB) return '';

        const list4P = [];
        const list2P = [];

        Object.keys(agentsDB).forEach(agentName => {
            const discs = agentsDB[agentName]?.discs;
            if (!Array.isArray(discs)) return;
            const is4P = discs.some(d => d.set1 === discKey);
            const is2P = discs.some(d => d.set2 === discKey);
            if (is4P) list4P.push({ name: agentName, badge: '4P', isPrimary: true });
            else if (is2P) list2P.push({ name: agentName, badge: '2P', isPrimary: false });
        });

        const matchingAgents = [...list4P, ...list2P];
        if (matchingAgents.length === 0) return '';

        const recTitle = lang === 'en' ? 'Recommended on' : 'Recommandé sur';
        const previewAgents = matchingAgents.slice(0, 4);
        const extraCount = matchingAgents.length - previewAgents.length;

        const previewHTML = previewAgents.map(item => `
            <img src="assets/Agents/${item.name}.webp" loading="lazy" decoding="async" alt="${item.name}" class="rec-preview-avatar">
        `).join('') + (extraCount > 0 ? `<span class="rec-preview-more">+${extraCount}</span>` : '');

        pendingDiscCardsHTML = matchingAgents.map(item => {
            const displayName = item.name === 'Jane' ? 'Jane Doe' : item.name;
            const safeAttr = item.name.replace(/"/g, '&quot;');
            const badgeClass = item.isPrimary ? 'rec-badge-primary' : 'rec-badge-secondary';
            return `
            <button type="button" data-disc-agent="${safeAttr}" title="${displayName} (${item.badge})" class="rec-agent-card ${item.isPrimary ? 'is-primary' : ''}">
                <div class="rec-agent-img-wrap">
                    <span class="rec-agent-badge ${badgeClass}">${item.badge}</span>
                    <img src="assets/Agents/${item.name}.webp" loading="lazy" decoding="async" alt="${displayName}" class="rec-agent-img">
                </div>
                <span class="rec-agent-name">${displayName}</span>
            </button>`;
        }).join('');

        return `
        <div class="rec-accordion mt-4">
            <button type="button" data-rec-toggle="true" aria-expanded="false" class="rec-trigger">
                <div class="rec-trigger-inner">
                    <div class="rec-trigger-top">
                        <div class="rec-trigger-left">
                            <span class="rec-trigger-dot"></span>
                            <span class="rec-trigger-title">${recTitle}</span>
                            <span class="rec-trigger-count">${matchingAgents.length}</span>
                        </div>
                        <div class="rec-preview-stack">
                            ${previewHTML}
                        </div>
                    </div>
                    <div class="rec-trigger-tab">
                        <svg class="rec-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>
                </div>
            </button>
            <div class="rec-panel">
                <div class="rec-panel-inner">
                    <div class="rec-grid"></div>
                </div>
            </div>
        </div>`;
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

        const recommendedHTML = buildRecommendedAccordion(agentsDB, discKey, lang);

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

        modalEl.scrollTop = 0;
        window.history.pushState({ discTooltipOpen: true }, '', window.location.href);

        requestAnimationFrame(() => {
            overlayEl.classList.add('visible');
            modalEl.classList.add('visible');
        });
    }

    let isClosing = false;

    function hideDiscTooltip(fromPopstate = false) {
        if (isClosing || !modalEl || !modalEl.classList.contains('visible')) return;
        isClosing = true;

        modalEl.style.transition = '';
        if (overlayEl) {
            overlayEl.classList.remove('visible');
            overlayEl.style.opacity = '';
        }
        if (modalEl) {
            modalEl.classList.remove('visible');
            modalEl.style.transform = '';
        }

        if (fromPopstate !== true && window.history.state?.discTooltipOpen) {
            setTimeout(() => {
                if (modalEl && !modalEl.classList.contains('visible') && window.history.state?.discTooltipOpen) {
                    window.__ignoreNextPopstate = true;
                    window.history.back();
                }
            }, 260);
        }

        setTimeout(() => {
            isClosing = false;
        }, 280);
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
