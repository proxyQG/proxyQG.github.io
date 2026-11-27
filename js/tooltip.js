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
        'Genesis Flare': { fr: 'Flambeau de la genèse', en: 'Genesis Flare' },
        'Ice': { fr: 'Glace', en: 'Ice' },
        'Frost': { fr: 'Givre', en: 'Frost' },
        'Electric': { fr: 'Électrique', en: 'Electric' },
        'Ether': { fr: 'Éther', en: 'Ether' },
        'Wind': { fr: 'Vent', en: 'Wind' },
        'Lumiflux': { fr: 'Lumen', en: 'Lumiflux' },
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

    function getSafeLang() {
        const langSwitcher = document.getElementById('langSwitcher');
        const attr = langSwitcher && langSwitcher.getAttribute('data-active');
        if (attr) return attr;
        try { return localStorage.getItem('zzz_lang') || 'fr'; } catch (e) { return 'fr'; }
    }

    async function loadEnginesDB() {
        if (W_ENGINES_DB) return W_ENGINES_DB;
        try {
            const stored = sessionStorage.getItem('zzz_engines_db');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    W_ENGINES_DB = parsed;
                    return W_ENGINES_DB;
                }
            }
        } catch (e) {
            try { sessionStorage.removeItem('zzz_engines_db'); } catch (_) {}
        }
        try {
            const res = await fetch('js/data/engines.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                W_ENGINES_DB = data;
                try { sessionStorage.setItem('zzz_engines_db', JSON.stringify(W_ENGINES_DB)); } catch (e) {}
            }
            return W_ENGINES_DB;
        } catch (error) {
            console.error("Erreur chargement des moteurs :", error);
            return null;
        }
    }

    async function getAgentsDB() {
        if (AGENTS_DB) return AGENTS_DB;
        try {
            const stored = sessionStorage.getItem('zzz_agent_db');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    AGENTS_DB = parsed;
                    return AGENTS_DB;
                }
            }
        } catch (e) {
            try { sessionStorage.removeItem('zzz_agent_db'); } catch (_) {}
        }
        try {
            const res = await fetch('js/data/agent_database.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                AGENTS_DB = data;
                try { sessionStorage.setItem('zzz_agent_db', JSON.stringify(AGENTS_DB)); } catch (e) {}
            }
            return AGENTS_DB;
        } catch (e) {
            return null;
        }
    }

    let pendingCardsHTML = '';

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
            <div class="tt-body" id="tt-body-scroll">
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
                <div id="tt-recommended-mount"></div>
            </div>
        `;
        document.body.appendChild(tooltipEl);

        const bodyScrollEl = document.getElementById('tt-body-scroll');

        tooltipEl.addEventListener('click', e => {
            if (e.target.classList.contains('tt-oc-btn')) {
                populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
                return;
            }
            if (e.target.closest('.tt-close-btn')) {
                hideTooltip();
                return;
            }
            const recTrigger = e.target.closest('[data-rec-toggle]');
            if (recTrigger) {
                const accordion = tooltipEl.querySelector('.rec-accordion');
                if (accordion) {
                    const gridEl = accordion.querySelector('.rec-grid');
                    if (gridEl && !gridEl.hasChildNodes() && pendingCardsHTML) {
                        gridEl.innerHTML = pendingCardsHTML;
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
            const agentBtn = e.target.closest('[data-tt-agent]');
            if (agentBtn) {
                const targetAgent = agentBtn.getAttribute('data-tt-agent');
                if (!targetAgent) return;

                const gachaModal = document.getElementById('zzz-gacha-modal');
                if (gachaModal && gachaModal.classList.contains('visible')) {
                    hideTooltip(false, true);
                    if (window.ZZZGachaBridge?.openItemModal) {
                        window.ZZZGachaBridge.openItemModal('agent', targetAgent);
                    } else if (typeof window.closeGachaModal === 'function' && typeof window.openAgentDetail === 'function') {
                        window.closeGachaModal();
                        window.openAgentDetail(targetAgent);
                    }
                    return;
                }

                if (typeof window.openAgentDetail === 'function') {
                    const modal = document.getElementById('agentDetailModal');
                    const isGuideOpen = modal && !modal.classList.contains('hidden');
                    const pathMatch = window.location.pathname.match(/^\/agents\/([^/]+)/i);
                    const currentParam = new URLSearchParams(window.location.search).get('agent')
                        || (pathMatch ? decodeURIComponent(pathMatch[1]) : null);

                    if (isGuideOpen && currentParam && currentParam.toLowerCase() === targetAgent.toLowerCase()) {
                        hideTooltip();
                        return;
                    }

                    const hadHistory = !!window.history.state?.tooltipOpen;
                    hideTooltip(true);
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

        overlayEl.addEventListener('click', () => hideTooltip());

        // --- GESTION DU SWIPE-TO-CLOSE SANS CONFLIT DE SCROLL (MOBILE) ---
        let startY = 0;
        let currentY = 0;
        let gestureState = 'idle'; // 'idle' | 'pending' | 'dragging' | 'scrolling'
        let startedInBody = false;

        tooltipEl.addEventListener('touchstart', e => {
            if (window.innerWidth > 768) return;
            startedInBody = !!(bodyScrollEl && bodyScrollEl.contains(e.target));
            if (startedInBody && bodyScrollEl.scrollTop > 0) {
                gestureState = 'scrolling';
                return;
            }
            startY = e.touches[0].clientY;
            currentY = 0;
            gestureState = 'pending';
        }, { passive: true });

        tooltipEl.addEventListener('touchmove', e => {
            if (gestureState === 'idle' || gestureState === 'scrolling') return;

            const deltaY = e.touches[0].clientY - startY;

            if (gestureState === 'pending') {
                if (deltaY < -5) {
                    // L'utilisateur fait défiler le contenu vers le bas : laisse le scroll natif 120Hz agir
                    gestureState = 'scrolling';
                    return;
                }
                if (deltaY > 5) {
                    // L'utilisateur tire le tiroir vers le bas : active le drag
                    gestureState = 'dragging';
                    tooltipEl.style.transition = 'none';
                } else {
                    return;
                }
            }

            if (gestureState === 'dragging') {
                currentY = Math.max(0, deltaY);
                if (e.cancelable) e.preventDefault();
                tooltipEl.style.transform = `translate3d(0, ${currentY}px, 0)`;
            }
        }, { passive: false });

        const endTouchDrag = () => {
            if (gestureState !== 'dragging') {
                gestureState = 'idle';
                return;
            }
            gestureState = 'idle';

            tooltipEl.style.transition = '';
            void tooltipEl.offsetWidth;

            if (currentY > 90) {
                hideTooltip();
            } else {
                tooltipEl.style.transform = '';
            }
            currentY = 0;
        };

        tooltipEl.addEventListener('touchend', endTouchDrag, { passive: true });
        tooltipEl.addEventListener('touchcancel', endTouchDrag, { passive: true });

        void tooltipEl.offsetWidth;
    }
    
    function init() {
        agentModalEl = document.getElementById('agentDetailModal');

        try {
            const storedEngines = sessionStorage.getItem('zzz_engines_db');
            if (storedEngines) {
                const parsed = JSON.parse(storedEngines);
                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    W_ENGINES_DB = parsed;
                }
            }
        } catch (e) {
            try { sessionStorage.removeItem('zzz_engines_db'); } catch (_) {}
        }

        if (!W_ENGINES_DB || !AGENTS_DB) {
            let preloaded = false;
            const triggerPreload = () => {
                if (preloaded) return;
                preloaded = true;
                ['mousemove', 'touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(evt => {
                    window.removeEventListener(evt, triggerPreload);
                });
                loadEnginesDB();
                getAgentsDB();
            };
            ['mousemove', 'touchstart', 'pointerdown', 'scroll', 'keydown'].forEach(evt => {
                window.addEventListener(evt, triggerPreload, { once: true, passive: true });
            });
        }

        bindEvents();
    }

    function parseText(text) {
        if (!text) return "";
        return text
            .replace(/\[(.*?)\]/g, '<span class="tt-hl">$1</span>')
            .replace(/\{(.*?)\}/g, '<strong>$1</strong>');
    }

    function hideTooltip(fromPopstate = false, instant = false) {
        if (!tooltipEl || !tooltipEl.classList.contains('visible')) return;

        if (instant) {
            tooltipEl.style.transition = 'none';
            if (overlayEl) overlayEl.style.transition = 'none';
        } else {
            tooltipEl.style.transition = '';
        }

        tooltipEl.classList.remove('visible');
        tooltipEl.style.transform = '';
        if (overlayEl) {
            overlayEl.classList.remove('visible');
            overlayEl.style.opacity = '';
        }
        currentEngineKey = null;

        if (instant) {
            void tooltipEl.offsetWidth;
            tooltipEl.style.transition = '';
            if (overlayEl) overlayEl.style.transition = '';
        }

        if (fromPopstate !== true && window.history.state?.tooltipOpen) {
            const delay = instant ? 0 : 260;
            setTimeout(() => {
                if (!tooltipEl.classList.contains('visible') && window.history.state?.tooltipOpen) {
                    window.__ignoreNextPopstate = true;
                    window.history.back();
                }
            }, delay);
        }
    }
    window.hideTooltip = hideTooltip;

    function renderRecommendedAgents(engineKey, lang) {
        const mount = document.getElementById('tt-recommended-mount');
        if (!mount) return;
        mount.innerHTML = '';
        pendingCardsHTML = '';

        const db = AGENTS_DB;
        if (!db || currentEngineKey !== engineKey) return;

        const bisList = [];
        const altList = [];

        Object.keys(db).forEach(agentName => {
            const engines = db[agentName]?.engines;
            if (!Array.isArray(engines)) return;
            const idx = engines.findIndex(e => e.name === engineKey);
            if (idx === 0) bisList.push({ name: agentName, badge: '#1', isPrimary: true });
            else if (idx > 0) altList.push({ name: agentName, badge: 'ALT', isPrimary: false });
        });

        const matchingAgents = [...bisList, ...altList];
        if (matchingAgents.length === 0) return;

        const recTitle = lang === 'en' ? 'Recommended on' : 'Recommandé sur';
        const previewAgents = matchingAgents.slice(0, 4);
        const extraCount = matchingAgents.length - previewAgents.length;

        const previewHTML = previewAgents.map(item => `
            <img src="assets/Agents/${item.name}.webp" loading="lazy" decoding="async" alt="${item.name}" class="rec-preview-avatar">
        `).join('') + (extraCount > 0 ? `<span class="rec-preview-more">+${extraCount}</span>` : '');

        // Stocke le HTML des cartes en mémoire pour ne l'injecter que si l'utilisateur ouvre l'accordéon
        pendingCardsHTML = matchingAgents.map(item => {
            const displayName = item.name === 'Jane'
                ? 'Jane Doe'
                : (item.name === 'Sunbringer' && lang !== 'en' ? "Dame de l'Aurore" : item.name);
            const safeAttr = item.name.replace(/"/g, '&quot;');
            const badgeClass = item.isPrimary ? 'rec-badge-primary' : 'rec-badge-secondary';
            return `
            <button type="button" data-tt-agent="${safeAttr}" title="${displayName} (${item.badge})" class="rec-agent-card ${item.isPrimary ? 'is-primary' : ''}">
                <div class="rec-agent-img-wrap">
                    <span class="rec-agent-badge ${badgeClass}">${item.badge}</span>
                    <img src="assets/Agents/${item.name}.webp" loading="lazy" decoding="async" alt="${displayName}" class="rec-agent-img">
                </div>
                <span class="rec-agent-name">${displayName}</span>
            </button>`;
        }).join('');

        mount.innerHTML = `
        <div class="rec-accordion">
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

    function populateTooltip(engineKey, tier = 0) {
        if (!W_ENGINES_DB) return false;
        const data = W_ENGINES_DB[engineKey];
        if (!data) return false; 

        createDOM();

        const lang = getSafeLang();
        const rankLabel = lang === 'en' ? 'Rank' : 'Rang';
        const isArmorer = (data.specialty || '').toLowerCase() === 'armorer';
        const baseAtkLabel = isArmorer
            ? (lang === 'en' ? 'Base DEF' : 'DÉF de base')
            : (lang === 'en' ? 'Base ATK' : 'ATQ de base');
        
        if (currentEngineKey !== engineKey) {
            document.getElementById('tt-name').textContent = data.name[lang] || data.name.en;
            const ttImg = document.getElementById('tt-img');
const nextSrc = `assets/W-Engine/${data.img.replace('.png', '.webp')}`;
ttImg.style.opacity = '0';
ttImg.onload = () => { ttImg.style.opacity = '1'; };
ttImg.src = nextSrc;
if (ttImg.complete) ttImg.style.opacity = '1';
            
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
            const bodyScroll = document.getElementById('tt-body-scroll');
            if (bodyScroll) bodyScroll.scrollTop = 0;
            tooltipEl.scrollTop = 0;
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
        if (typeof window.hideDiscTooltip === 'function') window.hideDiscTooltip(true);
        if (!W_ENGINES_DB || !AGENTS_DB) {
            await Promise.all([loadEnginesDB(), getAgentsDB()]);
        }
        const wasVisible = !!(tooltipEl && tooltipEl.classList.contains('visible'));
        const isValid = populateTooltip(engineKey, 0);
        if (isValid) {
            if (!wasVisible && !window.history.state?.tooltipOpen) {
                window.history.pushState({ tooltipOpen: true }, '', window.location.href);
            }
            requestAnimationFrame(() => {
                tooltipEl.classList.add('visible');
                overlayEl.classList.add('visible');
            });
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
