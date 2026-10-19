// js/tooltip.js
(function() {
    let tooltipEl = null;
    let overlayEl = null;
    let agentModalEl = null;
    let currentEngineKey = null;
    let W_ENGINES_DB = null;
    let AGENTS_DB = null;
    
    // Dictionnaire local pour traduire Rôle et Attribut
    const ttDict = {
        'Physical': { fr: 'Physique', en: 'Physical' },
        'Fire': { fr: 'Feu', en: 'Fire' },
        'Ice': { fr: 'Glace', en: 'Ice' },
        'Frost': { fr: 'Givre', en: 'Frost' },
        'Electric': { fr: 'Électrique', en: 'Electric' },
        'Ether': { fr: 'Éther', en: 'Ether' },
        'Wind': { fr: 'Vent', en: 'Wind' },
        'Lumiflux': { fr: 'Lumiflux', en: 'Lumiflux' },
        'Honed Edge': { fr: 'Lame affûtée', en: 'Honed Edge' },
        'Auric Ink': { fr: 'Sépia', en: 'Auric Ink' },
        'Attack': { fr: 'Attaque', en: 'Attack' },
        'Stun': { fr: 'Étourdissement', en: 'Stun' },
        'Anomaly': { fr: 'Anomalie', en: 'Anomaly' },
        'Support': { fr: 'Soutien', en: 'Support' },
        'Defense': { fr: 'Défense', en: 'Defense' },
        'Armorer': { fr: 'Forge', en: 'Armorer' },
        'Rupture': { fr: 'Rupture', en: 'Rupture' }
    };

    function ttTranslate(term, lang) {
        if (!term) return '';
        if (ttDict[term]) return ttDict[term][lang] || term;
        return term;
    }

    async function loadEnginesDB() {
        if (W_ENGINES_DB) return W_ENGINES_DB;
        const stored = sessionStorage.getItem('zzz_engines_db');
        if (stored) {
            try {
                W_ENGINES_DB = JSON.parse(stored);
                return W_ENGINES_DB;
            } catch (e) {
                sessionStorage.removeItem('zzz_engines_db');
            }
        }
        try {
            const res = await fetch('js/data/engines.json');
            W_ENGINES_DB = await res.json();
            sessionStorage.setItem('zzz_engines_db', JSON.stringify(W_ENGINES_DB));
            return W_ENGINES_DB;
        } catch (error) {
            console.error("Erreur chargement des moteurs :", error);
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

    // Création à la demande uniquement au 1er clic sur un moteur (Zéro FOUC au démarrage)
    function createDOM() {
        if (tooltipEl) return;

        overlayEl = document.createElement('div');
        overlayEl.id = 'proxy-tooltip-overlay';
        document.body.appendChild(overlayEl);

        tooltipEl = document.createElement('div');
        tooltipEl.id = 'proxy-tooltip';
        tooltipEl.innerHTML = `
            <div class="tt-header">
                <span id="tt-name"></span>
                <button class="tt-close-btn" aria-label="Fermer l'infobulle">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
            <div class="tt-body">
                <div class="tt-img-wrap"><img id="tt-img" decoding="async" alt=""></div>
                <div class="tt-tags" id="tt-tags"></div>
                <div class="tt-stats-grid">
                    <div class="tt-stat-card"><div class="lbl" id="tt-stat-base-lbl">ATQ de base</div><div class="val" id="tt-stat-base"></div></div>
                    <div class="tt-stat-card"><div class="lbl" id="tt-stat-adv-lbl"></div><div class="val" id="tt-stat-adv"></div></div>
                </div>
                <div class="tt-oc-container">
                    <div class="tt-oc-tabs" id="tt-oc-tabs">
                        ${[1,2,3,4,5].map(i => `<button class="tt-oc-btn" data-tier="${i-1}">${i}</button>`).join('')}
                    </div>
                    <div class="tt-desc-box">
                        <div class="tt-desc-title" id="tt-passive-title"></div>
                        <div class="tt-desc-text" id="tt-passive-text"></div>
                    </div>
                </div>
                <div id="tt-recommended-wrap" class="mt-3.5 pt-3 border-t border-white/10 hidden">
                    <div id="tt-recommended-lbl" class="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2"></div>
                    <div id="tt-recommended-list" class="flex flex-wrap gap-2"></div>
                </div>
            </div>
        `;
        document.body.appendChild(tooltipEl);

        tooltipEl.addEventListener('click', e => {
            if (e.target.classList.contains('tt-oc-btn')) {
                populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
                return;
            }
            if (e.target.closest('.tt-close-btn')) {
                hideTooltip();
                return;
            }
            const agentBtn = e.target.closest('[data-tt-agent]');
            if (agentBtn) {
                const targetAgent = agentBtn.getAttribute('data-tt-agent');
                if (targetAgent && typeof window.openAgentDetail === 'function') {
                    hideTooltip(true);
                    const modal = document.getElementById('agentDetailModal');
                    const isGuideOpen = modal && !modal.classList.contains('hidden');
                    window.history.replaceState({}, '', '?' + new URLSearchParams({ agent: targetAgent }).toString());
                    window.openAgentDetail(targetAgent, false, isGuideOpen);
                }
            }
        });

        overlayEl.addEventListener('click', () => hideTooltip());

        // --- GESTION DU SWIPE-TO-CLOSE (MOBILE) ---
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        tooltipEl.addEventListener('touchstart', e => {
            if (window.innerWidth > 768) return;
            if (tooltipEl.scrollTop > 0) return;
            
            startY = e.touches[0].clientY;
            isDragging = true;
            tooltipEl.style.transition = 'none';
        }, { passive: true });

        tooltipEl.addEventListener('touchmove', e => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY - startY;
            
            if (currentY > 0) {
                e.preventDefault();
                tooltipEl.style.transform = `translateY(${currentY}px)`;
                overlayEl.style.opacity = 1 - (currentY / window.innerHeight);
            }
        }, { passive: false });

        tooltipEl.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            tooltipEl.style.transition = '';
            overlayEl.style.opacity = '';
            
            if (currentY > 100) {
                hideTooltip();
            } else {
                tooltipEl.style.transform = ''; 
            }
            currentY = 0;
        });

        void tooltipEl.offsetWidth;
    }
    
    function init() {
        agentModalEl = document.getElementById('agentDetailModal');

        const storedEngines = sessionStorage.getItem('zzz_engines_db');
        if (storedEngines) {
            try {
                W_ENGINES_DB = JSON.parse(storedEngines);
            } catch (e) {
                sessionStorage.removeItem('zzz_engines_db');
            }
        }

        if (!W_ENGINES_DB) {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => loadEnginesDB(), { timeout: 2000 });
            } else {
                setTimeout(loadEnginesDB, 1200);
            }
        }

        bindEvents();
    }

    function parseText(text) {
        if (!text) return "";
        return text
            .replace(/\[(.*?)\]/g, '<span class="tt-hl">$1</span>')
            .replace(/\{(.*?)\}/g, '<strong>$1</strong>');
    }

    function hideTooltip(fromPopstate = false) {
        if (!tooltipEl || !tooltipEl.classList.contains('visible')) return;

        tooltipEl.classList.remove('visible');
        tooltipEl.style.transform = '';
        if (overlayEl) {
            overlayEl.classList.remove('visible');
            overlayEl.style.opacity = '';
        }
        currentEngineKey = null;

        if (fromPopstate !== true && window.history.state?.tooltipOpen) {
            window.history.back();
        }
    }
    window.hideTooltip = hideTooltip;

    async function renderRecommendedAgents(engineKey, lang) {
        const wrap = document.getElementById('tt-recommended-wrap');
        const lbl = document.getElementById('tt-recommended-lbl');
        const list = document.getElementById('tt-recommended-list');
        if (!wrap || !lbl || !list) return;

        const db = await getAgentsDB();
        if (!db || currentEngineKey !== engineKey) return;

        const matchingAgents = Object.keys(db).filter(agentName => {
            const engines = db[agentName]?.engines;
            return Array.isArray(engines) && engines.some(e => e.name === engineKey);
        });

        if (matchingAgents.length === 0) {
            wrap.classList.add('hidden');
            return;
        }

        lbl.textContent = lang === 'en' ? 'Recommended on' : 'Recommandé sur';
        list.innerHTML = matchingAgents.map(agentName => {
            const displayName = agentName === 'Jane' ? 'Jane Doe' : agentName;
            const safeAttr = agentName.replace(/"/g, '&quot;');
            return `
            <button type="button" data-tt-agent="${safeAttr}" title="${displayName}" class="group flex items-center gap-1.5 bg-black/60 hover:bg-[#1a1a1f] border border-white/10 hover:border-[#d7f70c] rounded-full pr-2.5 pl-1 py-1 transition-all cursor-pointer">
                <img src="assets/Agents/${agentName}.webp" loading="lazy" decoding="async" alt="${displayName}" class="w-6 h-6 rounded-full object-cover object-top bg-zinc-900">
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-zinc-300 group-hover:text-[#d7f70c] transition-colors">${displayName}</span>
            </button>`;
        }).join('');
        wrap.classList.remove('hidden');
    }

    function populateTooltip(engineKey, tier = 0) {
        if (!W_ENGINES_DB) return false;
        const data = W_ENGINES_DB[engineKey];
        if (!data) return false; 

        createDOM();

        const langSwitcher = document.getElementById('langSwitcher');
        const lang = langSwitcher ? langSwitcher.getAttribute('data-active') : (localStorage.getItem('zzz_lang') || 'fr');
        const rankLabel = lang === 'en' ? 'Rank' : 'Rang';
        const baseAtkLabel = lang === 'en' ? 'Base ATK' : 'ATQ de base';
        
        if (currentEngineKey !== engineKey) {
            document.getElementById('tt-name').textContent = data.name[lang] || data.name.en;
            document.getElementById('tt-img').src = `assets/W-Engine/${data.img.replace('.png', '.webp')}`;
            
            const tagsHtml = `<span class="tt-tag rank-${data.rank}">${rankLabel} ${data.rank}</span>
                              <span class="tt-tag dyn-term" data-term="${data.specialty}">${ttTranslate(data.specialty, lang)}</span>
                              ${data.element ? `<span class="tt-tag dyn-term" data-term="${data.element}">${ttTranslate(data.element, lang)}</span>` : ''}`;
            document.getElementById('tt-tags').innerHTML = tagsHtml;
            
            document.getElementById('tt-stat-base-lbl').textContent = baseAtkLabel;
            document.getElementById('tt-stat-base').textContent = data.stats.base;
            
            const advLbl = data.stats.advancedLabel[lang] || data.stats.advancedLabel.en || data.stats.advancedLabel;
            document.getElementById('tt-stat-adv-lbl').textContent = advLbl;
            document.getElementById('tt-stat-adv').textContent = data.stats.advanced;
            document.getElementById('tt-passive-title').textContent = data.passiveName[lang] || data.passiveName.en;
            
            currentEngineKey = engineKey;
            renderRecommendedAgents(engineKey, lang);
        }

        let passiveRaw = "";
        if (data.overclocks && data.overclocks[tier]) {
            passiveRaw = data.overclocks[tier][lang] || data.overclocks[tier].en || "";
        }
        document.getElementById('tt-passive-text').innerHTML = parseText(passiveRaw);

        tooltipEl.querySelectorAll('.tt-oc-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.tier) === tier);
        });
        
        return true; 
    }

    async function showEngineTooltip(engineKey) {
        if (!W_ENGINES_DB) await loadEnginesDB();
        const isValid = populateTooltip(engineKey, 0);
        if (isValid) {
            window.history.pushState({ tooltipOpen: true }, '', window.location.href);
            tooltipEl.classList.add('visible');
            overlayEl.classList.add('visible');
        }
    }
    window.showEngineTooltip = showEngineTooltip;

    function bindEvents() {
        let spotlightTicking = false;
        document.addEventListener('pointermove', e => {
            if (e.pointerType === 'touch' || spotlightTicking) return;
            if (!agentModalEl) agentModalEl = document.getElementById('agentDetailModal');
            if (!agentModalEl || agentModalEl.classList.contains('hidden')) return;

            const card = e.target.closest('[data-engine]'); 
            if (!card) return;

            spotlightTicking = true;
            window.requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                spotlightTicking = false;
            });
        }, { passive: true });

        document.addEventListener('click', e => {
            const trigger = e.target.closest('[data-engine]');
            if (!trigger) return;

            e.preventDefault();
            e.stopPropagation();

            const engineName = trigger.getAttribute('data-engine') || trigger.dataset.engine;
            showEngineTooltip(engineName);
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && tooltipEl && tooltipEl.classList.contains('visible')) {
                hideTooltip();
                e.stopImmediatePropagation();
            }
        });

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'agentDetailModal' && !mutation.target.classList.contains('opacity-100')) {
                    hideTooltip();
                }
            });
        });
        
        setTimeout(() => {
            const modal = document.getElementById('agentDetailModal');
            if (modal) observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
        }, 1000);
    }

    window.addEventListener('DOMContentLoaded', init);
})();
