import { colorMap, iconMap, filterGroups } from './data/agents.js';
import { updateStaticUI, setLanguage, currentLang, tTerm } from './i18n.js';
let agentsData = [];
let factionsData = [];
// ==========================================
// 1. ÉTAT GLOBAL (STATE)
// ==========================================
let initialFavorites = [];
try {
    const stored = localStorage.getItem('zzz_favorites');
    initialFavorites = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(initialFavorites)) initialFavorites = [];
} catch (e) {
    initialFavorites = [];
}

const State = {
    mode: 'elements',
    filters: { element: 'All', role: 'All', version: 'All' },
    search: '',
    faction: null,
    showFavorites: false,
    favorites: initialFavorites,
    filteredAgents: [],
    modalIndex: -1,
    currentAgent: null,
    agentHistory: []
};

// ==========================================
// 2. CACHE DU DOM
// ==========================================
const DOM = {
    grid: document.getElementById('agents-grid'),
    empty: document.getElementById('empty-state'),
    scrollArea: document.querySelector('main'),
    ascensionModule: document.getElementById('ascensionModule'),
    
    tabContainers: [document.getElementById('mainTabContainer'), document.getElementById('mobileTabContainer')],
    groups: {
        elements: [document.getElementById('groupElements'), document.getElementById('groupElementsMobile')],
        roles: [document.getElementById('groupRoles'), document.getElementById('groupRolesMobile')],
        versions: [document.getElementById('groupVersions'), document.getElementById('groupVersionsMobile')]
    },

    searchInputs: [document.getElementById('searchInput'), document.getElementById('searchInputMobile')],
    clearBtns: [document.getElementById('clearSearchBtn'), document.getElementById('clearSearchBtnMobile')],
    dropdowns: [document.getElementById('searchDropdown'), document.getElementById('searchDropdownMobile')],
    
    mobileFilterModal: document.getElementById('mobileFilterModal'),
    mobileFilterBtn: document.getElementById('mobileFilterBtn'),
    closeMobileFilterBtn: document.getElementById('closeMobileFilterBtn'),
    
    // NOUVEAU : Cache pour les éléments générés dynamiquement (Zéro Reflow)
    agentCards: [],
    separators: []
};

let searchTimeout;
let searchDiscsCache = null;
let searchEnginesCache = null;
let firstSearchMatch = null;

// ==========================================
// 3. INITIALISATION
// ==========================================
// 1. Récupère la promesse lancée dès le <head> HTML (zéro temps mort)
const dataPromise = window.__initialData || Promise.all([
    fetch('./js/data/agents.json').then(r => r.json()),
    fetch('./js/data/factions.json').then(r => r.json())
]);

document.addEventListener('DOMContentLoaded', async () => {
    // Applique immédiatement la traduction statique sans attendre le réseau
    updateStaticUI();

    // Les données sont déjà prêtes ou déjà en cours de réception
    [agentsData, factionsData] = await dataPromise;
    agentsData.reverse(); // Place les agents les plus récents (V3) en haut de grille
    initTabs();
    initFilters('.filter-elem-btn', 'element');
    initFilters('.filter-role-btn', 'role');
    initFilters('.filter-version-btn', 'version');
    initSearch();
    initFavorites();
    initLanguageSwitcher();
    initKeyboardNavigation();
    initModals();
    initMobileDrawer();
    initPatchCountdown();
    
    // Attend jusqu'à 60ms max le décodage RAM des portraits du 1er écran pour éviter tout carré noir initial
    if (window.__preloadedImgs && window.__preloadedImgs.length > 0) {
        const decodes = window.__preloadedImgs.slice(0, 18).map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve());
        await Promise.race([Promise.all(decodes), new Promise(r => setTimeout(r, 60))]);
    }

    buildInitialGrid(); // 1. Génère la grille principale en priorité absolue pour le LCP
    renderAgents(true);
    renderFactions();   // 2. Génère la sidebar immédiatement (sans pop visuel)
    
    setTimeout(() => { updateAllSliders('elements'); }, 100);
    if (document.fonts) {
        document.fonts.ready.then(() => {
            updateAllSliders(State.mode);
        });
    }
    window.addEventListener('resize', () => { updateAllSliders(State.mode); });
    checkUrlForAgent();

    // Préchargement furtif au premier contact humain (Guides + Reste des portraits de la grille)
    let guidesPreloaded = false;
    const preloadGuides = (e) => {
        if (guidesPreloaded) return;
        guidesPreloaded = true;

        ['mousemove', 'touchstart', 'pointerdown', 'wheel', 'scroll'].forEach(evt => {
            window.removeEventListener(evt, preloadGuides);
        });

        // Charge immédiatement toutes les images restantes de la grille avant même le début du scroll
        DOM.agentCards.forEach(c => hydrateCardImage(c.el));

        const load = () => import('./guides/index.js').catch(() => {});

        if (e && (e.type === 'touchstart' || e.type === 'pointerdown')) {
            load();
        } else if ('requestIdleCallback' in window) {
            requestIdleCallback(load);
        } else {
            setTimeout(load, 100);
        }
    };

    ['mousemove', 'touchstart', 'pointerdown', 'wheel', 'scroll'].forEach(evt => {
        window.addEventListener(evt, preloadGuides, { passive: true });
    });
});

// ==========================================
// 4. ONGLETS ET FILTRES
// ==========================================
function scrollToTop() {
    if (DOM.scrollArea) DOM.scrollArea.scrollTo({ top: 0, behavior: 'smooth' });
}
window.scrollToTop = scrollToTop;

function updateSliderPosition(container, activePill) {
    if (!container || !activePill) return;
    const containerRect = container.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();
    container.style.setProperty('--slide-left', `${pillRect.left - containerRect.left}px`);
    container.style.setProperty('--slide-width', `${pillRect.width}px`);
}

function updateAllSliders(mode) {
    const desktopPill = document.querySelector(`#mainTabContainer .tab-pill[id*="${mode.charAt(0).toUpperCase() + mode.slice(1)}"]`);
    const mobilePill = document.querySelector(`#mobileTabContainer .tab-pill[id*="${mode.charAt(0).toUpperCase() + mode.slice(1)}"]`);
    if (DOM.tabContainers[0] && desktopPill) updateSliderPosition(DOM.tabContainers[0], desktopPill);
    if (DOM.tabContainers[1] && mobilePill) updateSliderPosition(DOM.tabContainers[1], mobilePill);
}

function initTabs() {
    const attachTabEvent = (btnId, mode) => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        btn.addEventListener('click', () => {
            State.mode = mode;
            document.querySelectorAll('.tab-pill').forEach(p => {
                const isCurrent = p.id.toLowerCase().includes(mode.toLowerCase());
                p.classList.toggle('active', isCurrent);
            });
            Object.keys(DOM.groups).forEach(gKey => {
                const isGroupActive = gKey === mode;
                DOM.groups[gKey].forEach(el => { if (el) el.classList.toggle('hidden', !isGroupActive); });
            });
            updateAllSliders(mode);
            renderAgents();
            scrollToTop();
        });
    };
    attachTabEvent('tabElements', 'elements'); attachTabEvent('tabElementsMobile', 'elements');
    attachTabEvent('tabRoles', 'roles'); attachTabEvent('tabRolesMobile', 'roles');
    attachTabEvent('tabVersions', 'versions'); attachTabEvent('tabVersionsMobile', 'versions');
}

function initFilters(selector, filterType) {
    const attrName = filterType === 'element' ? 'data-filter' : `data-${filterType}`;
    const btns = document.querySelectorAll(selector);
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const clickedVal = btn.getAttribute(attrName);
            // Recliquer sur un filtre actif le désactive et repasse sur 'All'
            const newVal = (State.filters[filterType] === clickedVal && clickedVal !== 'All') ? 'All' : clickedVal;
            State.filters[filterType] = newVal;
            btns.forEach(b => {
                b.classList.toggle('active', b.getAttribute(attrName) === newVal);
            });
            renderAgents();
            scrollToTop();
            if (btn.closest('#mobileFilterModal')) {
                window.closeModal('mobileFilterModal');
            }
        });
    });
}

window.resetAllFilters = function() {
    State.filters = { element: 'All', role: 'All', version: 'All' };
    State.search = '';
    State.faction = null;
    State.showFavorites = false;

    document.querySelectorAll('.filter-elem-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'All'));
    document.querySelectorAll('.filter-role-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-role') === 'All'));
    document.querySelectorAll('.filter-version-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-version') === 'All'));

    const shortcutHint = document.getElementById('searchShortcutHint');
    if (shortcutHint) shortcutHint.classList.remove('hidden');
    DOM.searchInputs.forEach(input => { if (input) input.value = ''; });
    DOM.clearBtns.forEach(btn => { if (btn) btn.classList.add('hidden'); });
    DOM.dropdowns.forEach(drop => { if (drop) drop.classList.add('hidden'); });

    document.querySelectorAll('.active-faction-tag').forEach(t => { t.classList.add('hidden'); t.classList.remove('flex'); });
    document.querySelectorAll('.favorite-filter-btn').forEach(b => {
        const svg = b.querySelector('svg');
        b.classList.replace('border-red-500', 'border-zinc-800');
        b.classList.replace('text-white', 'text-zinc-400');
        b.classList.remove('bg-red-500/10');
        if (svg) svg.classList.remove('text-red-500');
    });

    renderAgents();
    scrollToTop();
};

window.handleLogoClick = function(e) {
    if (e && (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1)) return;
    if (e) e.preventDefault();

    if (typeof window.hideTooltip === 'function') window.hideTooltip(true);
    if (typeof window.hideDiscTooltip === 'function') window.hideDiscTooltip(true);

    window.resetAllFilters();
};

// ==========================================
// ==========================================
// 5. RECHERCHE UNIVERSELLE (AGENTS + DISQUES + MOTEURS)
// ==========================================
function normalizeSearchStr(str) {
    if (!str) return '';
    return String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function ensureSearchDatabases() {
    if (!searchDiscsCache) {
        const storedD = sessionStorage.getItem('zzz_discs_db');
        if (storedD) {
            try { searchDiscsCache = JSON.parse(storedD); } catch (e) {}
        }
        if (!searchDiscsCache) {
            fetch('./js/data/discs.json').then(r => r.json()).then(d => {
                searchDiscsCache = d;
                sessionStorage.setItem('zzz_discs_db', JSON.stringify(d));
            }).catch(() => {});
        }
    }
    if (!searchEnginesCache) {
        const storedE = sessionStorage.getItem('zzz_engines_db');
        if (storedE) {
            try { searchEnginesCache = JSON.parse(storedE); } catch (e) {}
        }
        if (!searchEnginesCache) {
            fetch('./js/data/engines.json').then(r => r.json()).then(e => {
                searchEnginesCache = e;
                sessionStorage.setItem('zzz_engines_db', JSON.stringify(e));
            }).catch(() => {});
        }
    }
}

function initSearch() {
    const shortcutHint = document.getElementById('searchShortcutHint');
    DOM.searchInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => handleSearch(e.target.value), 120);
        });
        input.addEventListener('focus', (e) => {
            ensureSearchDatabases();
            if (shortcutHint && input.id === 'searchInput') shortcutHint.classList.add('hidden');
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => handleSearch(e.target.value), 120);
        });
        input.addEventListener('blur', () => {
            if (shortcutHint && input.id === 'searchInput' && !input.value) shortcutHint.classList.remove('hidden');
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimeout);
                handleSearch(input.value);
                if (firstSearchMatch) {
                    if (firstSearchMatch.type === 'agent') {
                        window.triggerSearchSelect(firstSearchMatch.key);
                    } else {
                        window.triggerSearchItemSelect(firstSearchMatch.type, firstSearchMatch.key);
                    }
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                if (input.value) {
                    clearSearch();
                } else {
                    DOM.dropdowns.forEach(d => d && d.classList.add('hidden'));
                }
                input.blur();
            }
        });
    });
    DOM.clearBtns.forEach(btn => { if (btn) btn.addEventListener('click', clearSearch); });

    // Ferme le menu déroulant uniquement si l'utilisateur clique en dehors de la zone de recherche
    document.addEventListener('pointerdown', (e) => {
        const insideSearch = DOM.searchInputs.some(inp => inp && inp.parentElement?.parentElement?.contains(e.target));
        if (!insideSearch) {
            DOM.dropdowns.forEach(d => d && d.classList.add('hidden'));
        }
    });

    // Raccourci clavier "/" pour cibler la barre de recherche (bloqué si une modale ou infobulle est active)
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
            const anyOverlayOpen = document.body.classList.contains('modal-open')
                || !document.getElementById('videoModal')?.classList.contains('hidden')
                || document.getElementById('proxy-tooltip')?.classList.contains('visible')
                || document.getElementById('disc-tooltip-modal')?.classList.contains('visible');
            if (!anyOverlayOpen && DOM.searchInputs[0]) {
                e.preventDefault();
                DOM.searchInputs[0].focus();
            }
        }
    });
}

function handleSearch(query) {
    State.search = query;
    const shortcutHint = document.getElementById('searchShortcutHint');
    if (shortcutHint) shortcutHint.classList.toggle('hidden', query.length > 0 || document.activeElement === DOM.searchInputs[0]);
    DOM.searchInputs.forEach(input => { if (input) input.value = query; });
    const isHidden = query.length === 0;
    DOM.clearBtns.forEach(btn => { if (btn) btn.classList.toggle('hidden', isHidden); });
    DOM.dropdowns.forEach(drop => { if (drop) drop.classList.remove('hidden'); });
    updateDropdownUI(query);
    renderAgents();
}

function clearSearch() {
    State.search = '';
    firstSearchMatch = null;
    const shortcutHint = document.getElementById('searchShortcutHint');
    if (shortcutHint && document.activeElement !== DOM.searchInputs[0]) shortcutHint.classList.remove('hidden');
    DOM.searchInputs.forEach(input => { if (input) input.value = ''; });
    DOM.clearBtns.forEach(btn => { if (btn) btn.classList.add('hidden'); });
    DOM.dropdowns.forEach(drop => { if (drop) drop.classList.add('hidden'); });
    renderAgents();
}

function updateDropdownUI(query) {
    const normQuery = normalizeSearchStr(query.trim());
    const isEn = currentLang === 'en';
    firstSearchMatch = null;

    let filteredAgents = normQuery
        ? agentsData.filter(a => normalizeSearchStr(a.name).includes(normQuery) || (a.name === 'Jane' && 'jane doe'.includes(normQuery)))
        : [...agentsData];
    filteredAgents.sort((a, b) => a.name.localeCompare(b.name));

    let matchedDiscs = [];
    let matchedEngines = [];

    if (normQuery.length >= 2) {
        if (searchDiscsCache) {
            Object.entries(searchDiscsCache).forEach(([key, disc]) => {
                const nameFr = disc.name?.fr || '';
                const nameEn = disc.name?.en || key;
                if (normalizeSearchStr(nameFr).includes(normQuery) || normalizeSearchStr(nameEn).includes(normQuery) || normalizeSearchStr(key).includes(normQuery)) {
                    matchedDiscs.push({
                        key,
                        displayName: (isEn ? nameEn : nameFr) || nameEn,
                        img: disc.img
                    });
                }
            });
            matchedDiscs = matchedDiscs.slice(0, 5);
        }
        if (searchEnginesCache) {
            Object.entries(searchEnginesCache).forEach(([key, eng]) => {
                const nameFr = eng.name?.fr || '';
                const nameEn = eng.name?.en || key;
                if (normalizeSearchStr(nameFr).includes(normQuery) || normalizeSearchStr(nameEn).includes(normQuery) || normalizeSearchStr(key).includes(normQuery)) {
                    matchedEngines.push({
                        key,
                        displayName: (isEn ? nameEn : nameFr) || nameEn,
                        img: (eng.img || '').replace('.png', '.webp'),
                        rank: eng.rank || 'S',
                        specialty: eng.specialty || ''
                    });
                }
            });
            matchedEngines = matchedEngines.slice(0, 5);
        }
    }

    if (filteredAgents.length > 0) {
        firstSearchMatch = { type: 'agent', key: filteredAgents[0].name };
    } else if (matchedDiscs.length > 0) {
        firstSearchMatch = { type: 'disc', key: matchedDiscs[0].key };
    } else if (matchedEngines.length > 0) {
        firstSearchMatch = { type: 'engine', key: matchedEngines[0].key };
    }

    let sectionsHTML = '';
    let animIndex = 0;

    if (filteredAgents.length > 0) {
        if (normQuery.length >= 2 && (matchedDiscs.length > 0 || matchedEngines.length > 0)) {
            sectionsHTML += `<div class="px-3 py-1.5 bg-[#09090b] text-[9px] font-black uppercase tracking-widest text-zinc-500">Agents (${filteredAgents.length})</div>`;
        }
        sectionsHTML += filteredAgents.map((agent) => {
            const iconFile = iconMap[agent.element] || 'physique.png';
            const delay = Math.min((animIndex++) * 12, 180);
            const displayName = agent.name === 'Jane' ? 'Jane Doe' : agent.name;
            return `
            <div class="dropdown-item-anim flex items-center justify-between gap-3 p-3 hover:bg-[#18181c] cursor-pointer transition-colors group" style="animation-delay: ${delay}ms" onmousedown="window.triggerSearchSelect('${agent.name.replace(/'/g, "\\'")}')">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-[#121212] border border-zinc-700/80 group-hover:border-[#d7f70c] overflow-hidden flex-shrink-0 relative shadow-inner transition-colors"><img src="assets/Agents/${agent.name}.webp" loading="lazy" decoding="async" class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300" onerror="this.src='https://placehold.co/100x100/222222/ffffff?text=${agent.name.charAt(0)}'"></div>
                    <div class="flex flex-col min-w-0"><span class="text-white text-xs font-black tracking-wider group-hover:text-[#d7f70c] transition-colors uppercase truncate">${displayName}</span><div class="flex items-center gap-1.5 mt-0.5"><img src="assets/Icone/${iconFile.replace('.png', '.webp')}" loading="lazy" decoding="async" class="w-3.5 h-3.5 object-contain opacity-80"><span class="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">${tTerm(agent.element)}</span></div></div>
                </div>
                <svg class="w-4 h-4 text-zinc-600 group-hover:text-[#d7f70c] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>`;
        }).join('');
    }

    if (matchedDiscs.length > 0) {
        const discHeader = isEn ? 'Drive Discs' : 'Disques de poussée';
        sectionsHTML += `<div class="px-3 py-1.5 bg-[#09090b] text-[9px] font-black uppercase tracking-widest text-[#d7f70c]">${discHeader} (${matchedDiscs.length})</div>`;
        sectionsHTML += matchedDiscs.map(disc => {
            const delay = Math.min((animIndex++) * 12, 180);
            const jsSafeKey = disc.key.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            return `
            <div class="dropdown-item-anim flex items-center justify-between gap-3 p-3 hover:bg-[#18181c] cursor-pointer transition-colors group" style="animation-delay: ${delay}ms" onmousedown="window.triggerSearchItemSelect('disc', '${jsSafeKey}')">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-black border border-zinc-700/80 group-hover:border-[#d7f70c] overflow-hidden flex-shrink-0 relative shadow-inner transition-colors"><img src="assets/Disque/${disc.img}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"></div>
                    <div class="flex flex-col min-w-0">
                        <span class="text-white text-xs font-black tracking-wider group-hover:text-[#d7f70c] transition-colors uppercase truncate">${disc.displayName}</span>
                        <span class="text-zinc-500 text-[9px] uppercase font-bold tracking-widest mt-0.5">${isEn ? 'Drive Disc Set' : 'Set de disques'}</span>
                    </div>
                </div>
                <svg class="w-4 h-4 text-zinc-600 group-hover:text-[#d7f70c] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>`;
        }).join('');
    }

    if (matchedEngines.length > 0) {
        const engHeader = isEn ? 'W-Engines' : 'Moteurs-Ampli';
        sectionsHTML += `<div class="px-3 py-1.5 bg-[#09090b] text-[9px] font-black uppercase tracking-widest text-[#d7f70c]">${engHeader} (${matchedEngines.length})</div>`;
        sectionsHTML += matchedEngines.map(eng => {
            const delay = Math.min((animIndex++) * 12, 180);
            const jsSafeKey = eng.key.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            const rankColor = eng.rank === 'S' ? '#eab308' : (eng.rank === 'A' ? '#a855f7' : '#3b82f6');
            return `
            <div class="dropdown-item-anim flex items-center justify-between gap-3 p-3 hover:bg-[#18181c] cursor-pointer transition-colors group" style="animation-delay: ${delay}ms" onmousedown="window.triggerSearchItemSelect('engine', '${jsSafeKey}')">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-black border border-zinc-700/80 group-hover:border-[#d7f70c] overflow-hidden flex-shrink-0 relative shadow-inner transition-colors p-0.5"><img src="assets/W-Engine/${eng.img}" loading="lazy" decoding="async" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"></div>
                    <div class="flex flex-col min-w-0">
                        <span class="text-white text-xs font-black tracking-wider group-hover:text-[#d7f70c] transition-colors uppercase truncate">${eng.displayName}</span>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <span class="text-[9px] font-black uppercase" style="color: ${rankColor};">${isEn ? 'Rank' : 'Rang'} ${eng.rank}</span>
                            ${eng.specialty ? `<span class="text-zinc-600 text-[9px]">•</span><span class="text-zinc-500 text-[9px] uppercase font-bold tracking-widest">${tTerm(eng.specialty)}</span>` : ''}
                        </div>
                    </div>
                </div>
                <svg class="w-4 h-4 text-zinc-600 group-hover:text-[#d7f70c] group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>`;
        }).join('');
    }

    const noResultText = isEn ? 'No signal found' : 'Aucun signal trouvé';
    const html = sectionsHTML || `<div class="p-5 text-zinc-500 text-xs text-center italic font-bold">${noResultText}</div>`;

    const activeDrop = window.innerWidth >= 768 ? DOM.dropdowns[0] : DOM.dropdowns[1];
    if (activeDrop) activeDrop.innerHTML = html;
}

window.triggerSearchSelect = function(agentName) {
    DOM.dropdowns.forEach(drop => { if (drop) drop.classList.add('hidden'); });
    DOM.searchInputs.forEach(input => { if (input) input.blur(); });
    window.openAgentDetail(agentName);
};

window.triggerSearchItemSelect = function(type, key) {
    DOM.dropdowns.forEach(drop => { if (drop) drop.classList.add('hidden'); });
    DOM.searchInputs.forEach(input => { if (input) input.blur(); });
    clearSearch();
    if (type === 'disc' && typeof window.showDiscTooltip === 'function') {
        window.showDiscTooltip(key);
    } else if (type === 'engine' && typeof window.showEngineTooltip === 'function') {
        window.showEngineTooltip(key);
    }
};

// ==========================================
// 6. FAVORIS
// ==========================================
function updateFavBadges() { document.querySelectorAll('.fav-count-badge').forEach(badge => { badge.textContent = State.favorites.length; }); }

function initFavorites() {
    updateFavBadges();
    const favButtons = document.querySelectorAll('.favorite-filter-btn');
    favButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            State.showFavorites = !State.showFavorites;
            favButtons.forEach(b => {
                const svg = b.querySelector('svg');
                if (State.showFavorites) {
                    b.classList.replace('border-zinc-800', 'border-red-500'); b.classList.replace('text-zinc-400', 'text-white'); b.classList.add('bg-red-500/10'); if (svg) svg.classList.add('text-red-500');
                } else {
                    b.classList.replace('border-red-500', 'border-zinc-800'); b.classList.replace('text-white', 'text-zinc-400'); b.classList.remove('bg-red-500/10'); if (svg) svg.classList.remove('text-red-500');
                }
            });
            renderAgents(); scrollToTop();
            if (btn.closest('#mobileFilterModal')) {
                window.closeModal('mobileFilterModal');
            }
        });
    });
}

function updateModalFavoriteButton(agentName, animate = false) {
    const btn = document.getElementById('favAgentModalBtn');
    if (!btn || !agentName) return;

    const isFav = State.favorites.includes(agentName);
    const displayName = agentName === 'Jane' ? 'Jane Doe' : agentName;
    const isEn = currentLang === 'en';
    const label = isFav
        ? (isEn ? `Remove ${displayName} from favorites (F)` : `Retirer ${displayName} des favoris (F)`)
        : (isEn ? `Add ${displayName} to favorites (F)` : `Ajouter ${displayName} aux favoris (F)`);

    btn.classList.toggle('is-fav', isFav);
    btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);

    btn.classList.remove('anim-pop', 'anim-unpop');
    if (animate) {
        void btn.offsetWidth; // Force le recalcul pour rejouer l'animation immédiatement
        btn.classList.add(isFav ? 'anim-pop' : 'anim-unpop');
    }
}

window.toggleFavorite = function(btn, agentName, event) {
    if (event) event.stopPropagation();
    if (!agentName) return;

    const wasFav = State.favorites.includes(agentName);
    if (wasFav) {
        State.favorites = State.favorites.filter(f => f !== agentName);
    } else {
        State.favorites.push(agentName);
    }
    const isNowFav = !wasFav;

    localStorage.setItem('zzz_favorites', JSON.stringify(State.favorites));
    updateFavBadges();

    const cardObj = DOM.agentCards.find(c => c.agent.name === agentName);
    const targetBtn = btn || (cardObj && cardObj.el.querySelector('button.group\\/fav'));
    const svg = targetBtn && targetBtn.querySelector('svg');
    if (targetBtn) {
        targetBtn.classList.toggle('border-red-500/60', isNowFav);
        targetBtn.classList.toggle('bg-[#1a080a]/95', isNowFav);
        targetBtn.classList.toggle('opacity-100', isNowFav);
        targetBtn.classList.toggle('border-zinc-700/80', !isNowFav);
        targetBtn.classList.toggle('bg-[#111]/90', !isNowFav);
        targetBtn.classList.toggle('opacity-80', !isNowFav);
    }
    if (svg) {
        svg.classList.toggle('text-red-500', isNowFav);
        svg.classList.toggle('fill-red-500', isNowFav);
        svg.classList.toggle('text-zinc-400', !isNowFav);
        svg.classList.toggle('fill-none', !isNowFav);
        if (isNowFav && btn) {
            svg.classList.remove('grid-fav-pop');
            void svg.offsetWidth;
            svg.classList.add('grid-fav-pop');
        }
    }

    if (State.showFavorites) {
        renderAgents();
    }

    if (State.currentAgent === agentName) {
        updateModalFavoriteButton(agentName, !btn);
    }
};

window.toggleCurrentAgentFavorite = function(event) {
    if (event) event.stopPropagation();
    const agentName = State.currentAgent || (State.modalIndex !== -1 ? State.filteredAgents[State.modalIndex]?.name : null);
    if (!agentName) return;
    window.toggleFavorite(null, agentName, event);
};

// ==========================================
// 7. FACTIONS
// ==========================================
const factionTranslations = {
    "Lièvres rusés": "Cunning Hares",
    "Usines Belobog": "Belobog Heavy Industries",
    "Société d'entretien Victoria": "Victoria Housekeeping Co.",
    "Fils de Calydon": "Sons of Calydon",
    "Section 6": "Hollow Special Operations Section 6",
    "Escouade Obole": "Obol Squad",
    "Division de l'Ordre urbain": "Metropolitan Order Division",
    "Équipe d'intervention spéciale des Enquêtes criminelles": "C.I.S.R.T.",
    "Étoiles de la Lyre": "Stars of Lyra",
    "Forces de défense - Escouade Argent": "Defense Force - Silver Squad",
    "Oiseaux-moqueurs": "Mockingbirds",
    "Cimes de Yunkui": "Yunkui Summit",
    "Maison hantée": "Spook Shack",
    "Autorité de conformité Krampus": "Krampus Compliance Authority",
    "Anges de l'illusion": "Angels of Delusion",
    "Département de stratégie externe": "External Strategy Department",
    "Département de la patrouille aérienne": "Airspace Patrol Department",
    "Entente de Dayat": "Void Hunters",
    "Phaéthon": "Phaethon",
    "Atelier Flint": "Flint Workshop"
};

let modalFactionsRendered = false;

function generateFactionCardHTML(faction, isSidebar, index = 0) {
    const imgPath = `assets/Faction/${faction}.webp`; 
    const fallbackImg = `https://placehold.co/300x300/181818/d7f70c?text=${faction.substring(0,3).toUpperCase()}&font=montserrat`;
    
    const isEn = currentLang === 'en';
    let displayName = faction;
    if (isEn && factionTranslations[faction]) {
        displayName = factionTranslations[faction];
    }
    
    let subName = '';
    if (faction === "Équipe d'intervention spéciale des Enquêtes criminelles") {
        displayName = "N.E.P.S.";
        subName = isEn ? "Special Response Team" : "Équipe d'intervention spéciale";
    }

    if (isSidebar) {
        // Carrousel animé en continu : pas de lazy-loading ni de décodage async (les images n'apparaissent sinon qu'au prochain mouvement de souris)
        const loadingAttr = 'loading="eager" fetchpriority="low" decoding="async"';

        return `
        <div class="mb-2.5 px-0.5 hidden md:block">
            <div class="faction-box rounded-2xl p-2.5 flex items-center gap-3.5 cursor-pointer w-full group bg-gradient-to-r from-[#131316] to-[#0c0c0e] border border-zinc-800/90 hover:border-[#d7f70c]/70 hover:bg-[#18181c] transition-all duration-200 shadow-md" onclick="window.setFactionFilter('${faction.replace(/'/g, "\\'")}')">
                <div class="w-12 h-12 bg-black rounded-xl overflow-hidden flex items-center justify-center p-1.5 border border-zinc-800 group-hover:border-[#d7f70c]/40 transition-colors shrink-0 relative">
                    <img src="${imgPath}" ${loadingAttr} alt="${faction}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" onerror="this.onerror=null; this.src='${fallbackImg}'">
                </div>
                <div class="flex flex-col justify-center min-w-0 flex-1">
                    <span class="text-[11px] font-black text-zinc-300 group-hover:text-white transition-colors uppercase leading-snug line-clamp-2">${displayName}</span>
                    ${subName ? `<span class="block text-[8px] text-zinc-500 mt-0.5 tracking-wider uppercase truncate">${subName}</span>` : ''}
                </div>
                <svg class="w-4 h-4 text-zinc-600 group-hover:text-[#d7f70c] group-hover:translate-x-0.5 transition-all shrink-0 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
            </div>
        </div>`;
    } else {
        const agentCount = agentsData.filter(a => a.faction === faction).length;
        const isActive = State.faction === faction;
        const cardBorder = isActive ? 'border-[#d7f70c] shadow-[0_0_25px_rgba(215,247,12,0.18)]' : 'border-zinc-800';
        const badgeStyle = isActive ? 'border-[#d7f70c] text-[#d7f70c] bg-[#d7f70c]/10' : 'border-zinc-700/80 text-zinc-400 bg-black/80 group-hover:border-yellow-400/60 group-hover:text-white';

        return `
        <div class="bg-[#121212] border-2 ${cardBorder} rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 flex flex-col items-center justify-start gap-3 sm:gap-6 cursor-pointer hover:border-yellow-400 hover:-translate-y-2 transition-all duration-300 group shadow-lg sm:shadow-2xl relative overflow-hidden h-full" onclick="window.setFactionFilter('${faction.replace(/'/g, "\\'")}', true)">
            <div class="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 border ${badgeStyle} px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider uppercase z-20 transition-colors">
                ${agentCount}
            </div>
            <div class="w-20 h-20 sm:w-32 sm:h-32 md:w-48 md:h-48 transition-all duration-500 group-hover:scale-110 relative z-10 flex-shrink-0 flex items-center justify-center mt-1 sm:mt-0">
                <img src="${imgPath}" loading="lazy" decoding="async" alt="${faction}" class="w-full h-full object-contain" onerror="this.onerror=null; this.src='${fallbackImg}'">
            </div>
            <div class="mt-auto bg-black/80 px-2 py-2.5 sm:px-5 sm:py-3 rounded-xl text-[9px] sm:text-xs md:text-sm font-black w-full text-center border ${isActive ? 'border-[#d7f70c] text-[#d7f70c]' : 'border-zinc-800 text-zinc-300'} group-hover:border-yellow-400 shadow-inner group-hover:text-yellow-400 transition-colors duration-300 uppercase tracking-wider relative z-10 flex flex-col justify-center items-center">
                ${displayName}${subName ? `<span class="block text-[7.5px] sm:text-[10px] text-zinc-500 mt-1 leading-tight">${subName}</span>` : ''}
            </div>
        </div>`;
    }
}

function renderFactions() {
    if (window.innerWidth >= 768) {
        const sidebarList = document.getElementById('sidebarFactionsList');
        if (sidebarList && factionsData.length > 0) {
            // 1. Retire la classe d'animation
            sidebarList.classList.remove('marquee-track-vertical');

            // 2. Injecte le HTML
            const sidebarHTML = factionsData.map((f, idx) => generateFactionCardHTML(f, true, idx)).join('');
            sidebarList.innerHTML = sidebarHTML + sidebarHTML;

            // 3. Réapplique la classe d'animation une fois toutes les images décodées
            // - jeton : ignore une ancienne promesse si renderFactions() a été rappelée entre-temps (changement de langue)
            // - timeout : le carrousel démarre quoi qu'il arrive après 3 s, même si une image traîne
            const renderId = (renderFactions._id = (renderFactions._id || 0) + 1);
            const startMarquee = () => {
                if (renderId !== renderFactions._id) return;
                sidebarList.classList.add('marquee-track-vertical');
            };
            const imgs = Array.from(sidebarList.querySelectorAll('img'));
            const decoded = Promise.all(imgs.map(img => (img.decode ? img.decode() : Promise.resolve()).catch(() => {})));
            Promise.race([decoded, new Promise(resolve => setTimeout(resolve, 3000))]).then(startMarquee);
        }
    }
    if (modalFactionsRendered) {
        window.renderModalFactions(true);
    }
}

// Génère la grille de la modale uniquement au clic
window.renderModalFactions = function(force = false) {
    if (modalFactionsRendered && !force) return;
    const modalGrid = document.getElementById('modalFactionsGrid');
    if (modalGrid && factionsData.length > 0) {
        modalGrid.innerHTML = factionsData.map(f => generateFactionCardHTML(f, false)).join('');
        modalFactionsRendered = true;
    }
};

window.setFactionFilter = function(faction, fromModal = false, isLangSwitch = false) {
    if (!isLangSwitch && State.faction === faction) {
        State.faction = null;
        document.querySelectorAll('.active-faction-tag').forEach(t => { t.classList.add('hidden'); t.classList.remove('flex'); });
        if (fromModal) window.closeModal('factionModal');
        renderAgents();
        scrollToTop();
        return;
    }
    if (!isLangSwitch) State.faction = faction; 
    const tags = document.querySelectorAll('.active-faction-tag');
    const nameLabels = document.querySelectorAll('.active-faction-name');
    
    const isEn = currentLang === 'en';
    let labelText = faction;
    if (isEn && factionTranslations[faction]) {
        labelText = factionTranslations[faction];
    }
    if (faction === "Équipe d'intervention spéciale des Enquêtes criminelles") {
        labelText = "N.E.P.S.";
    }

    nameLabels.forEach(nl => nl.textContent = labelText);
    tags.forEach(t => { t.classList.remove('hidden'); t.classList.add('flex'); });

    if (fromModal) window.closeModal('factionModal');
    if (!isLangSwitch) { renderAgents(); scrollToTop(); }
};

document.querySelectorAll('.clear-faction-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); State.faction = null;
        document.querySelectorAll('.active-faction-tag').forEach(t => { t.classList.add('hidden'); t.classList.remove('flex'); });
        renderAgents(); scrollToTop();
    });
});

// ==========================================
// 8. GRILLE DES AGENTS (ZÉRO REFLOW)
// ==========================================
const versionLabels = {
    'V3': '3.0 — 3.X',
    'V2': '2.0 — 2.8',
    'V1': '1.0 — 1.7'
};

window.removeSingleFilter = function(type) {
    if (type === 'element') {
        State.filters.element = 'All';
        document.querySelectorAll('.filter-elem-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-filter') === 'All'));
    } else if (type === 'role') {
        State.filters.role = 'All';
        document.querySelectorAll('.filter-role-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-role') === 'All'));
    } else if (type === 'version') {
        State.filters.version = 'All';
        document.querySelectorAll('.filter-version-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-version') === 'All'));
    } else if (type === 'faction') {
        State.faction = null;
        document.querySelectorAll('.active-faction-tag').forEach(t => { t.classList.add('hidden'); t.classList.remove('flex'); });
    } else if (type === 'favorites') {
        State.showFavorites = false;
        document.querySelectorAll('.favorite-filter-btn').forEach(b => {
            const svg = b.querySelector('svg');
            b.classList.replace('border-red-500', 'border-zinc-800');
            b.classList.replace('text-white', 'text-zinc-400');
            b.classList.remove('bg-red-500/10');
            if (svg) svg.classList.remove('text-red-500');
        });
    } else if (type === 'search') {
        clearSearch();
        return;
    }
    renderAgents();
    scrollToTop();
};

function updateActiveFiltersBar(hasAnyActiveFilter) {
    const bar = document.getElementById('activeFiltersBar');
    const chipsContainer = document.getElementById('activeFiltersChips');
    if (!bar || !chipsContainer) return;

    if (!hasAnyActiveFilter) {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
        chipsContainer.innerHTML = '';
        return;
    }

    const chips = [];
    const makeChip = (label, type, color = '#d7f70c', iconHtml = '') => `
        <button onclick="window.removeSingleFilter('${type}')" class="inline-flex items-center gap-1.5 bg-[#121215] hover:bg-[#1c1c21] text-white border px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer group" style="border-color: color-mix(in srgb, ${color} 45%, #27272a);">
            ${iconHtml}
            <span>${label}</span>
            <svg class="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>`;

    if (State.filters.element !== 'All') {
        const c = colorMap[State.filters.element] || '#d7f70c';
        const icon = (iconMap[State.filters.element] || 'physique.png').replace('.png', '.webp');
        chips.push(makeChip(tTerm(State.filters.element), 'element', c, `<img src="assets/Icone/${icon}" class="w-3.5 h-3.5 object-contain">`));
    }
    if (State.filters.role !== 'All') {
        chips.push(makeChip(tTerm(State.filters.role), 'role', '#d7f70c', `<img src="assets/Rôles/${State.filters.role}.webp" class="w-3.5 h-3.5 object-contain">`));
    }
    if (State.filters.version !== 'All') {
        chips.push(makeChip(versionLabels[State.filters.version] || State.filters.version, 'version', '#d7f70c'));
    }
    if (State.faction) {
        let fName = (currentLang === 'en' && factionTranslations[State.faction]) ? factionTranslations[State.faction] : State.faction;
        if (State.faction === "Équipe d'intervention spéciale des Enquêtes criminelles") fName = "N.E.P.S.";
        chips.push(makeChip(fName, 'faction', '#eab308'));
    }
    if (State.showFavorites) {
        const favLbl = currentLang === 'en' ? 'Favorites' : 'Favoris';
        chips.push(makeChip(favLbl, 'favorites', '#ef4444', `<svg class="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`));
    }
    if (State.search.length > 0) {
        const safeSearch = State.search.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
        chips.push(makeChip(`"${safeSearch}"`, 'search', '#d7f70c'));
    }

    chipsContainer.innerHTML = chips.join('');
    bar.classList.remove('hidden');
    bar.classList.add('flex');
}

function buildInitialGrid() {
    DOM.grid.innerHTML = ''; 
    let currentV = '';
    let finalHTML = '';
    
    agentsData.forEach((agent, index) => {
        const v = agent.version || 'Inconnu';
        if (v !== currentV) {
            currentV = v;
            const vLabel = versionLabels[v] || v.replace('V', '');
            finalHTML += `
            <div class="version-separator col-span-full relative mt-10 first:mt-2 mb-6 flex items-center justify-center hidden" data-version="${v}">
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div class="w-[90%] md:w-[70%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#d7f70c]/70 to-transparent -translate-x-full laser-beam"></div>
                    </div>
                </div>
                <div class="relative bg-[#0b0b0e] px-6 py-2.5 border border-zinc-800 rounded-full flex items-center gap-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] z-10 cursor-default">
                    <span class="w-2 h-2 bg-[#d7f70c] rounded-full shadow-[0_0_8px_#d7f70c]"></span>
                    <span class="font-display font-black italic text-base sm:text-xl tracking-[0.22em] text-white uppercase">Version <span class="text-[#d7f70c]">${vLabel}</span></span>
                    <span class="version-count-badge bg-[#16161a] border border-zinc-700/80 text-zinc-300 text-[10px] font-black px-2 py-0.5 rounded-md">0</span>
                </div>
            </div>`;
        }
        finalHTML += createCardHTML(agent, index === 0, index);
    });
    
    DOM.grid.innerHTML = finalHTML;
    
    DOM.agentCards = Array.from(DOM.grid.querySelectorAll('.agent-card-container')).map((el, i) => ({
        el: el,
        agent: agentsData[i],
        version: agentsData[i].version || 'Inconnu'
    }));
    DOM.separators = Array.from(DOM.grid.querySelectorAll('.version-separator'));
    
    init3DParallax();
    initLazyCardsObserver();
    
    requestAnimationFrame(() => {
        DOM.grid.classList.add('loaded');
    });
}

let lazyCardObserver = null;
function hydrateCardImage(cardEl) {
    const img = cardEl.querySelector('.agent-image[data-src]');
    if (img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        if (lazyCardObserver) lazyCardObserver.unobserve(cardEl);
    }
}

function initLazyCardsObserver() {
    if (!('IntersectionObserver' in window)) {
        DOM.agentCards.forEach(c => hydrateCardImage(c.el));
        return;
    }
    lazyCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) hydrateCardImage(entry.target);
        });
    }, { root: DOM.scrollArea, rootMargin: '800px 0px' });

    DOM.agentCards.forEach((c, i) => {
        if (i >= 24) lazyCardObserver.observe(c.el);
    });
}

function renderAgents(isInitial = false) {
    State.filteredAgents = []; 
    let visibleIndex = 0;
    const versionCounts = {};
    const isVersionModeAll = State.mode === 'versions' && State.filters.version === 'All';
    const normSearch = normalizeSearchStr(State.search);

    // 1. Filtrer en temps réel en combinant Élément + Rôle + Version (Zéro Reflow)
    DOM.agentCards.forEach((card) => {
        const agent = card.agent;
        const matchSearch = !normSearch || normalizeSearchStr(agent.name).includes(normSearch) || (agent.name === 'Jane' && 'jane doe'.includes(normSearch));
        const matchElem = State.filters.element === 'All' || filterGroups[State.filters.element]?.includes(agent.element);
        const matchRole = State.filters.role === 'All' || agent.role === State.filters.role;
        const matchVersion = State.filters.version === 'All' || agent.version === State.filters.version;
        const matchFaction = !State.faction || agent.faction === State.faction; 
        const matchFav = !State.showFavorites || State.favorites.includes(agent.name);
        
        if (matchSearch && matchElem && matchRole && matchVersion && matchFaction && matchFav) {
            State.filteredAgents.push(agent);
            versionCounts[card.version] = (versionCounts[card.version] || 0) + 1;
            
            if (!isInitial || visibleIndex < 24) hydrateCardImage(card.el);
            card.el.classList.remove('hidden');
            visibleIndex++;
        } else {
            card.el.classList.add('hidden');
        }
    });

    // 1bis. Met à jour le compteur d'agents, les pastilles d'onglets et la barre de filtres actifs
    document.querySelectorAll('.active-agent-count').forEach(el => {
        el.textContent = State.filteredAgents.length === agentsData.length 
            ? `${agentsData.length}` 
            : `${State.filteredAgents.length} / ${agentsData.length}`;
    });
    document.querySelectorAll('[data-dot="element"]').forEach(d => d.classList.toggle('hidden', State.filters.element === 'All'));
    document.querySelectorAll('[data-dot="role"]').forEach(d => d.classList.toggle('hidden', State.filters.role === 'All'));
    document.querySelectorAll('[data-dot="version"]').forEach(d => d.classList.toggle('hidden', State.filters.version === 'All'));

    const hasAnyActiveFilter = State.filters.element !== 'All' || State.filters.role !== 'All' || State.filters.version !== 'All' || State.search.length > 0 || State.faction !== null || State.showFavorites;
    document.querySelectorAll('.reset-filters-btn').forEach(btn => {
        btn.classList.toggle('hidden', !hasAnyActiveFilter);
        btn.classList.toggle('inline-flex', hasAnyActiveFilter);
    });
    updateActiveFiltersBar(hasAnyActiveFilter);

    const hasDrawerFilter = State.filters.element !== 'All' || State.filters.role !== 'All' || State.filters.version !== 'All' || State.faction !== null || State.showFavorites;
    if (DOM.mobileFilterBtn) {
        DOM.mobileFilterBtn.classList.toggle('border-[#d7f70c]', hasDrawerFilter);
        DOM.mobileFilterBtn.classList.toggle('bg-[#d7f70c]/10', hasDrawerFilter);
        DOM.mobileFilterBtn.classList.toggle('border-zinc-800', !hasDrawerFilter);
        DOM.mobileFilterBtn.classList.toggle('bg-[#151515]', !hasDrawerFilter);
        const activeDot = document.getElementById('mobileFilterActiveDot');
        if (activeDot) activeDot.classList.toggle('hidden', !hasDrawerFilter);
    }

    // 2. Gérer les séparateurs de versions et leurs compteurs
    DOM.separators.forEach(sep => {
        const v = sep.getAttribute('data-version');
        const count = versionCounts[v] || 0;
        if (isVersionModeAll && count > 0) {
            const badge = sep.querySelector('.version-count-badge');
            if (badge) badge.textContent = count;
            sep.classList.remove('hidden');
        } else {
            sep.classList.add('hidden');
        }
    });

    // 3. Afficher ou cacher les modules externes
    if (State.filteredAgents.length > 0) {
        DOM.empty.classList.add('hidden'); DOM.empty.classList.remove('opacity-100'); 
    } else { 
        DOM.empty.classList.remove('hidden'); setTimeout(() => DOM.empty.classList.add('opacity-100'), 10); 
    }

    if (DOM.ascensionModule) {
        if (State.filteredAgents.length >= 12) {
            DOM.ascensionModule.classList.remove('hidden');
            setTimeout(() => {
                if (State.filteredAgents.length >= 12) DOM.ascensionModule.classList.add('opacity-100');
            }, 50);
        } else {
            DOM.ascensionModule.classList.remove('opacity-100');
            DOM.ascensionModule.classList.add('hidden');
        }
    }
    
    if (State.currentAgent) {
        State.modalIndex = State.filteredAgents.findIndex(a => a.name === State.currentAgent);
    }
    updateModalNavigation();
}

function createCardHTML(agent, isNew = false, index = 0) {
    const hexColor = colorMap[agent.element] || '#ffffff'; const cleanHex = hexColor.replace('#', ''); 
    const isFav = State.favorites.includes(agent.name); 
    const heartClass = isFav ? 'text-red-500 fill-red-500' : 'text-zinc-400 fill-none'; 
    const favBtnStateClass = isFav ? 'border-red-500/60 bg-[#1a080a]/95 opacity-100' : 'border-zinc-700/80 bg-[#111]/90 opacity-80';
    const displayName = agent.name === 'Jane' ? 'Jane Doe' : agent.name;
    const roleLabel = tTerm(agent.role);

    // 1re carte en priorité haute (+2px pour le LCP), les 24 premières en priorité normale et decoding="sync" (zéro carré noir)
    const isLcpHero = index === 0;
    const heroWrapperStyle = isLcpHero ? 'style="width: calc(100% + 2px); margin-left: -1px; margin-top: -2px;"' : '';
    const imgPath = `assets/Agents/${agent.name}.webp`;
    const imgAttributes = isLcpHero
        ? `src="${imgPath}" loading="eager" fetchpriority="high" decoding="sync"`
        : (index < 24
            ? `src="${imgPath}" loading="eager" decoding="sync"`
            : `src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="${imgPath}" decoding="sync"`);

    const newRibbonHTML = isNew ? `
        <div class="new-ribbon-wrapper">
            <div class="new-ribbon-glow"></div>
            <div class="new-ribbon-tag">
                <span class="new-ribbon-shine"></span>
                <span class="new-ribbon-text">NEW</span>
            </div>
        </div>` : '';

    return `
    <div data-agent="${agent.name}" class="agent-card-container flex flex-col cursor-pointer w-full group" style="--elem-color: ${hexColor};" onclick="window.openAgentDetail('${agent.name.replace(/'/g, "\\'")}')">
        <div class="agent-shape-wrapper w-full aspect-square bg-zinc-800 relative" ${heroWrapperStyle}>
            <div class="agent-shape-inner relative overflow-hidden flex items-end justify-center h-full w-full">
                ${newRibbonHTML}
                <div class="agent-role-badge absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0c0c0e]/90 border border-white/10 flex items-center justify-center z-20 pointer-events-none transition-colors duration-200 shadow-md" title="${roleLabel}">
                    <img src="assets/Rôles/${agent.role}.webp" alt="${roleLabel}" loading="eager" decoding="sync" class="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain opacity-90 group-hover:opacity-100">
                </div>
                <img ${imgAttributes} alt="${displayName}" class="agent-image absolute bottom-0 w-full h-auto min-h-full object-cover object-bottom" onerror="this.onerror=null; this.src='https://placehold.co/400x400/181818/${cleanHex}?text=${agent.name.charAt(0)}&font=montserrat'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-40"></div>
                <button onclick="window.toggleFavorite(this, '${agent.name.replace(/'/g, "\\'")}', event)" aria-label="Ajouter ${displayName} aux favoris" class="absolute bottom-2 right-2 w-9 h-9 rounded-full border ${favBtnStateClass} group-hover:opacity-100 flex items-center justify-center z-30 transition-all hover:scale-110 shadow-lg group/fav"><svg class="w-5 h-5 transition-colors duration-300 ${heartClass} group-hover/fav:text-red-400" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></button>
            </div>
        </div>
        <div class="agent-nameplate mt-2.5 mx-1 bg-[#141417] py-2 px-2 skew-x-[-15deg] border border-zinc-800/90 border-b-[4px] shadow-lg transition-colors duration-200 relative overflow-hidden" style="border-bottom-color: ${hexColor};">
            <div class="skew-x-[15deg] text-center w-full px-1 overflow-hidden flex items-center justify-center"><span class="text-zinc-100 group-hover:text-white font-display font-black uppercase text-xs sm:text-[14px] tracking-[0.18em] truncate block drop-shadow-md transition-colors pointer-events-none">${displayName}</span></div>
        </div>
    </div>`;
}

// ==========================================
// 9. MODALES ET NAVIGATION
// ==========================================

// --- Cache des splashs préchargés : nom -> { img, loaded } ---
// `loaded` est une promesse (qui ne rejette jamais) résolue quand l'image est téléchargée.
// On garde l'objet Image pour que le navigateur conserve le fichier en mémoire ;
// la taille est limitée aux derniers splashs demandés.
const SPLASH_CACHE_MAX = 16;
const SPLASH_FADE_OUT_MS = 70;        // fondu de sortie rapide de l'ancien splash
const SPLASH_LOAD_TIMEOUT_MS = 600;   // attente max du téléchargement avant de changer l'image
const SPLASH_DECODE_TIMEOUT_MS = 2500; // attente max du décodage avant de révéler quand même
const splashCache = new Map();
const guideAssetCache = new Map();
let openAgentToken = 0; // identifie la dernière ouverture de guide : ignore les réponses tardives
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function preloadGuideAssetsFromHTML(guideHTML) {
    const urls = [...guideHTML.matchAll(/src="([^"]+\.webp)"/g)].map(m => m[1]);
    return Promise.all(urls.map(url => {
        if (guideAssetCache.has(url)) return guideAssetCache.get(url).decoded;
        const img = new Image();
        img.decoding = 'sync';
        img.src = url;
        const decoded = img.decode
            ? img.decode().catch(() => {})
            : new Promise(r => { img.onload = img.onerror = r; });
        guideAssetCache.set(url, { img, decoded });
        if (guideAssetCache.size > 120) guideAssetCache.delete(guideAssetCache.keys().next().value);
        return decoded;
    }));
}

window.preloadSplash = function(agentName) {
    // Précharge le module de guide ET toutes ses icônes (disques, moteurs, skills) en RAM
    import('./guides/index.js').then(({ getGuideHTML }) => {
        const meta = agentsData.find(a => a.name === agentName);
        if (meta) return getGuideHTML(agentName, meta);
    }).then(html => {
        if (html) preloadGuideAssetsFromHTML(html);
    }).catch(() => {});

    const cached = splashCache.get(agentName);
    if (cached) return cached.loaded;

    const img = new Image();
    const loaded = new Promise(resolve => { img.onload = img.onerror = () => resolve(); });
    img.src = `assets/splash/${agentName}.webp`;
    splashCache.set(agentName, { img, loaded });
    if (splashCache.size > SPLASH_CACHE_MAX) splashCache.delete(splashCache.keys().next().value);
    return loaded;
};
// -------------------------------------------------------------------------

window.openModal = function(id) {
    const m = document.getElementById(id);
    if (!m) return;
    // Si l'utilisateur ouvre la modale des factions, on peuple les cartes à la volée
    if (id === 'factionModal' && typeof window.renderModalFactions === 'function') {
        window.renderModalFactions(true);
    }
    if (id === 'agentDetailModal' || id === 'factionModal') {
        document.body.classList.add('modal-open');
    }
    if ((id === 'factionModal' || id === 'mobileFilterModal') && m.classList.contains('hidden')) {
        if (window.history.state?.modalId) {
            window.history.replaceState({ modalId: id }, '', window.location.href);
        } else {
            window.history.pushState({ modalId: id }, '', window.location.href);
        }
    }
    m.classList.remove('hidden'); void m.offsetWidth; m.classList.add('opacity-100');
};

function updateBackToAgentButton() {
    const btn = document.getElementById('backToAgentBtn');
    const img = document.getElementById('backToAgentImg');
    const nameEl = document.getElementById('backToAgentName');
    if (!btn || !img || !nameEl) return;

    if (State.agentHistory.length > 0) {
        const prevAgent = State.agentHistory[State.agentHistory.length - 1];
        img.src = `assets/Agents/${prevAgent}.webp`;
        img.alt = prevAgent;
        nameEl.textContent = prevAgent === 'Jane' ? 'Jane Doe' : prevAgent;
        btn.classList.remove('hidden');
        btn.classList.add('flex');
    } else {
        btn.classList.add('hidden');
        btn.classList.remove('flex');
    }
}

window.goBackToPreviousAgent = function() {
    if (State.agentHistory.length === 0) return;
    const prevAgent = State.agentHistory.pop();
    window.openAgentDetail(prevAgent, true, false, true);
};

window.closeModal = function(id, updateUrl = true) {
    const m = document.getElementById(id);
    if (!m) return;
    if (id === 'agentDetailModal') {
        openAgentToken++; // annule les ouvertures encore en attente (splash / guide)
        // Rétablit l'affichage de la grille principale
        document.documentElement.classList.remove('direct-agent-load');

        if (updateUrl) {
            if (window.history.state?.agentModal) {
                window.__ignoreNextPopstate = true;
                window.history.back();
            } else {
                window.history.replaceState({}, '', '/');
            }
        }
        State.modalIndex = -1;
        State.currentAgent = null;
        State.agentHistory = [];
        updateBackToAgentButton();
        document.title = 'ProxyQG - Zenless Zone Zero Guides';
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', 'https://proxyqg.github.io/');
    } else if (updateUrl && window.history.state?.modalId === id) {
        window.__ignoreNextPopstate = true;
        window.history.back();
    }
    m.classList.remove('opacity-100');
    setTimeout(() => {
        if (!m.classList.contains('opacity-100')) {
            m.classList.add('hidden');
            if (id === 'agentDetailModal') {
                const splash = document.getElementById('agentSplashImage');
                if (splash) {
                    splash.style.transitionDuration = '0ms';
                    splash.style.opacity = '0';
                }
            }
        }
        const aModal = document.getElementById('agentDetailModal');
        const fModal = document.getElementById('factionModal');
        if ((!aModal || aModal.classList.contains('hidden')) && (!fModal || fModal.classList.contains('hidden'))) {
            document.body.classList.remove('modal-open');
            if (typeof window.refreshPatchTimerLang === 'function') window.refreshPatchTimerLang();
        }
    }, 300);
};

window.openAgentDetail = async function(agentName, updateUrl = true, fromTeammate = false, isBackNav = false) {
    const modal = document.getElementById('agentDetailModal');
    if (!modal) return;
    if (modal.parentElement !== document.body) { document.body.appendChild(modal); }

    if (fromTeammate && State.currentAgent) {
        if (State.currentAgent === agentName) return;
        State.agentHistory.push(State.currentAgent);
    } else if (!isBackNav) {
        State.agentHistory = [];
    }
    State.currentAgent = agentName;
    const token = ++openAgentToken;
    updateBackToAgentButton();
    updateModalFavoriteButton(agentName, false);

    const splashImg = document.getElementById('agentSplashImage'); 
    const giantName = document.getElementById('modalGiantNameText'); 
    const guideContainer = document.getElementById('agentGuideContainer');
    
    State.modalIndex = State.filteredAgents.findIndex(a => a.name === agentName); 
    updateModalNavigation();
    if (updateUrl) {
        if (modal.classList.contains('hidden')) {
            window.history.pushState({ agentModal: true }, '', `/agents/${encodeURIComponent(agentName)}/`);
        } else {
            window.history.replaceState({ agentModal: window.history.state?.agentModal === true }, '', `/agents/${encodeURIComponent(agentName)}/`);
        }
    }

document.title = `${agentName} - Guide & Build | ProxyQG`;
const canonical = document.querySelector('link[rel="canonical"]');
if (canonical) canonical.setAttribute('href', `https://proxyqg.github.io/agents/${encodeURIComponent(agentName)}/`);
    
    const modalScroll = document.getElementById('agentModalScroll');
    const modalWasHidden = modal.classList.contains('hidden') || !modal.classList.contains('opacity-100');
    const isScrolledDown = !modalWasHidden && modalScroll && modalScroll.scrollTop > 80;

    // Si on a défilé vers le bas sur mobile, on coupe l'ancien splash en 0ms avant de remonter
    const shouldAnimateFadeOut = !!splashImg && splashImg.style.opacity === '1' && !isScrolledDown;
    if (splashImg) {
        splashImg.alt = agentName === 'Jane' ? 'Jane Doe' : agentName;
        splashImg.loading = 'eager';
        splashImg.style.transitionDuration = shouldAnimateFadeOut ? `${SPLASH_FADE_OUT_MS}ms` : '0ms';
        splashImg.style.opacity = '0';
        if (!shouldAnimateFadeOut) void splashImg.offsetWidth; // Applique l'opacité 0 avant la remontée du scroll
    }
    // Masque l'ancien guide pendant le changement
    if (giantName) giantName.textContent = agentName;

    // 1. Ouvre la modale uniquement si elle était fermée
    if (modalWasHidden) {
        window.openModal('agentDetailModal');
    }

    // 2. Remonte la modale en haut immédiatement (0 ms de décalage)
    if (modalScroll) {
        modalScroll.scrollTop = 0;
    }

    // 2bis. Change puis révèle le splash dès que la nouvelle image est prête
    if (splashImg) {
        (async () => {
            await Promise.all([
                Promise.race([window.preloadSplash(agentName), wait(SPLASH_LOAD_TIMEOUT_MS)]),
                wait(shouldAnimateFadeOut ? SPLASH_FADE_OUT_MS + 10 : 0)
            ]);
            if (token !== openAgentToken) return;

            splashImg.onerror = function() { this.onerror = null; this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; };
            splashImg.src = `assets/splash/${agentName}.webp`;

            const decoded = splashImg.decode ? splashImg.decode().catch(() => {}) : Promise.resolve();
            await Promise.race([decoded, wait(SPLASH_DECODE_TIMEOUT_MS)]);
            if (token !== openAgentToken) return;

            splashImg.style.transitionDuration = ''; // fondu d'entrée à la vitesse normale (CSS)
            splashImg.style.opacity = '1';
        })();
    }

    // 3. Charge, pré-décode les icônes (disques/moteurs) en RAM, puis injecte le guide
    if (guideContainer) {
        try {
            const { getGuideHTML } = await import('./guides/index.js');
            const guideHTML = await getGuideHTML(agentName, agentsData.find(a => a.name === agentName));
            if (token !== openAgentToken) return; // un autre agent a été demandé entre-temps
            await Promise.race([preloadGuideAssetsFromHTML(guideHTML), wait(65)]);
            if (token !== openAgentToken) return;
            guideContainer.innerHTML = guideHTML;
            guideContainer.scrollTo(0, 0);
            
            setTimeout(preloadTeammatesFromDOM, 350);
            setTimeout(initGuideDragScroll, 350);
        } catch (err) {
            console.error("Erreur lors du chargement du guide :", err);
        }
    }
};

// Préchargement discret des coéquipiers du guide en arrière-plan
function preloadTeammatesFromDOM() {
    const guideContainer = document.getElementById('agentGuideContainer');
    if (!guideContainer) return;

    // Détecte tous les liens vers d'autres agents dans les équipes
    const triggers = guideContainer.querySelectorAll('[onclick*="openAgentDetail"]');
    triggers.forEach(el => {
        const attr = el.getAttribute('onclick') || '';
        // Accepte aussi les appels avec arguments supplémentaires : openAgentDetail('Nom', true, true)
        const match = attr.match(/openAgentDetail\(\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/);
        if (match && match[2]) {
            window.preloadSplash(match[2].replace(/\\(.)/g, '$1'));
        } // <-- C'est cette accolade qu'il manquait avant de fermer la boucle forEach !
    });
}

// Active le glisser-déposer à la souris sur les conteneurs horizontaux du guide
function initGuideDragScroll() {
    const guideContainer = document.getElementById('agentGuideContainer');
    if (!guideContainer) return;

    guideContainer.querySelectorAll('.overflow-x-auto').forEach(slider => {
        let isDown = false, startX = 0, scrollLeft = 0;
        slider.addEventListener('mousedown', (e) => {
            if (slider.scrollWidth <= slider.clientWidth) return;
            isDown = true;
            slider.classList.add('cursor-grabbing');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('cursor-grabbing'); });
        slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('cursor-grabbing'); });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
        });
    });
}

function updateModalNavigation() {
    const prevBtn = document.getElementById('prevAgentBtn'); const nextBtn = document.getElementById('nextAgentBtn');
    if (!prevBtn || !nextBtn) return;
    
    const hasPrev = State.modalIndex > 0; const hasNext = State.modalIndex < State.filteredAgents.length - 1 && State.modalIndex !== -1;

    prevBtn.classList.toggle('opacity-0', !hasPrev); prevBtn.classList.toggle('pointer-events-none', !hasPrev); prevBtn.classList.toggle('-translate-x-10', !hasPrev);
    nextBtn.classList.toggle('opacity-0', !hasNext); nextBtn.classList.toggle('pointer-events-none', !hasNext); nextBtn.classList.toggle('translate-x-10', !hasNext);

    // Préchargement immédiat en cache des splashs précédent et suivant
    if (hasPrev) {
        const prevAgentName = State.filteredAgents[State.modalIndex - 1].name;
        window.preloadSplash(prevAgentName);
        prevBtn.onclick = (e) => { e.stopPropagation(); window.openAgentDetail(prevAgentName); };
    }
    if (hasNext) {
        const nextAgentName = State.filteredAgents[State.modalIndex + 1].name;
        window.preloadSplash(nextAgentName);
        nextBtn.onclick = (e) => { e.stopPropagation(); window.openAgentDetail(nextAgentName); };
    }
}


function initModals() {
    const openModalBtn = document.getElementById('openModalBtn');
    if (openModalBtn) { openModalBtn.addEventListener('click', () => window.openModal('factionModal')); }
}

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const modalAgent = document.getElementById('agentDetailModal'); 
        const modalFaction = document.getElementById('factionModal'); 
        const modalMobileFilter = document.getElementById('mobileFilterModal');
        const modalVideo = document.getElementById('videoModal');
        const tooltip = document.getElementById('proxy-tooltip');
        const discModal = document.getElementById('disc-tooltip-modal');

        if (e.key === 'Escape') { 
            // 1. Ferme l'infobulle Disque ou W-Engine en priorité si elle est visible
            if (discModal && discModal.classList.contains('visible')) {
                if (typeof window.hideDiscTooltip === 'function') window.hideDiscTooltip();
                return;
            }
            if (tooltip && tooltip.classList.contains('visible')) {
                if (typeof window.hideTooltip === 'function') window.hideTooltip();
                return;
            }
            // 2. Ferme la vidéo si elle est ouverte
            if (modalVideo && !modalVideo.classList.contains('hidden')) {
                window.closeVideoModal();
                return;
            }
            // 3. Ferme la modale des factions
            if (modalFaction && !modalFaction.classList.contains('hidden')) {
                window.closeModal('factionModal');
                return;
            }
            // 4. Ferme le tiroir de filtres mobile
            if (modalMobileFilter && !modalMobileFilter.classList.contains('hidden')) {
                window.closeModal('mobileFilterModal');
                return;
            }
            // 5. Ferme la fiche agent si aucune surcouche n'est active
            if (modalAgent && !modalAgent.classList.contains('hidden')) {
                window.closeModal('agentDetailModal');
                return;
            }
        }

        // Navigation entre agents avec les flèches du clavier
        if (modalAgent && !modalAgent.classList.contains('hidden')) {
            // Empêche la navigation au clavier si la vidéo est active
            if (modalVideo && !modalVideo.classList.contains('hidden')) return;

            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                if (typeof window.hideTooltip === 'function') window.hideTooltip();
                if (typeof window.hideDiscTooltip === 'function') window.hideDiscTooltip();
            }

            if (e.key === 'ArrowLeft' && State.modalIndex > 0) {
                window.openAgentDetail(State.filteredAgents[State.modalIndex - 1].name);
            }
            if (e.key === 'ArrowRight' && State.modalIndex < State.filteredAgents.length - 1 && State.modalIndex !== -1) {
                window.openAgentDetail(State.filteredAgents[State.modalIndex + 1].name);
            }
            if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                window.toggleCurrentAgentFavorite();
            }
        }
    });
}
function getAgentFromUrl() {
    const fromQuery = new URLSearchParams(window.location.search).get('agent');
    if (fromQuery) return fromQuery;
    const match = window.location.pathname.match(/^\/agents\/([^/]+)/i);
    if (match && match[1]) {
        try { return decodeURIComponent(match[1]); } catch (e) { return match[1]; }
    }
    return null;
}

window.addEventListener('popstate', () => {
    if (window.__ignoreNextPopstate) {
        window.__ignoreNextPopstate = false;
        return;
    }
    const modal = document.getElementById('agentDetailModal');
    const agentParam = getAgentFromUrl();
    const tooltip = document.getElementById('proxy-tooltip');
    const discModal = document.getElementById('disc-tooltip-modal');
    const videoModal = document.getElementById('videoModal');
    const factionModal = document.getElementById('factionModal');
    const mobileFilterModal = document.getElementById('mobileFilterModal');

    // 1. Si la vidéo est ouverte, le retour mobile ferme uniquement la vidéo
    if (videoModal && !videoModal.classList.contains('hidden')) {
    window.closeVideoModal(true);
    return;
}

    // 2. Si les factions ou le filtre mobile sont ouverts, on les ferme en priorité
    if (factionModal && !factionModal.classList.contains('hidden')) {
        window.closeModal('factionModal', false);
        return;
    }
    if (mobileFilterModal && !mobileFilterModal.classList.contains('hidden')) {
        window.closeModal('mobileFilterModal', false);
        return;
    }

    // 3. Si la platine vinyle est visible, le retour mobile ferme UNIQUEMENT le vinyle
    if (discModal && discModal.classList.contains('visible')) {
        if (typeof window.hideDiscTooltip === 'function') {
            window.hideDiscTooltip(true);
        }
        return;
    }

    // 4. Si l'infobulle moteur est visible, le retour mobile ferme UNIQUEMENT l'infobulle
    if (tooltip && tooltip.classList.contains('visible')) {
        if (typeof window.hideTooltip === 'function') {
            window.hideTooltip(true);
        }
        return;
    }

    // 5. Gestion normale de l'agent
    if (agentParam) {
        // Si l'agent est déjà affiché à l'écran, on évite de recharger pour ne pas perdre la position de défilement
        if (modal && !modal.classList.contains('hidden') && State.currentAgent && State.currentAgent.toLowerCase() === agentParam.toLowerCase()) {
            return;
        }

        const matchingAgent = agentsData.find(a => a.name.toLowerCase() === agentParam.toLowerCase());
        if (matchingAgent) {
            const lastInHistory = State.agentHistory[State.agentHistory.length - 1];
            const isReturningToPrev = lastInHistory && lastInHistory.toLowerCase() === matchingAgent.name.toLowerCase();
            if (isReturningToPrev) State.agentHistory.pop();
            window.openAgentDetail(matchingAgent.name, false, false, isReturningToPrev);
        }
    } else if (modal && modal.classList.contains('opacity-100')) {
        window.closeModal('agentDetailModal', false);
    }
});

window.shareCurrentAgent = function() {
    const agentName = State.currentAgent || (State.modalIndex !== -1 ? State.filteredAgents[State.modalIndex]?.name : null);
    if (!agentName) return;
    // Génère le lien dédié à l'agent avec sa vignette Discord personnalisée
    const url = `${window.location.origin}/agents/${encodeURIComponent(agentName)}/`;
    const showToast = () => {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;
        toast.classList.remove('-translate-y-32', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('-translate-y-32', 'opacity-0');
        }, 3000);
    };
    const fallbackCopy = () => {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast(); } catch (e) {}
        document.body.removeChild(ta);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(showToast).catch(fallbackCopy);
    } else {
        fallbackCopy();
    }
};

async function checkUrlForAgent() {
    const agentParam = getAgentFromUrl();
    if (agentParam) {
        const agent = agentsData.find(a => a.name.toLowerCase() === agentParam.toLowerCase());
        if (agent) {
            window.history.replaceState({}, '', `/agents/${encodeURIComponent(agent.name)}/`);
            window.openAgentDetail(agent.name, false);
            return;
        }
    }
    // Si aucun agent n'est demandé ou s'il est introuvable, on réactive la grille
    document.documentElement.classList.remove('direct-agent-load');
}

let currentPlayer = null;

function initYTPlayer(videoId, startTime) {
    const hideBangboo = () => {
        const bgLoader = document.getElementById('bangbooLoader');
        if (bgLoader) bgLoader.style.opacity = '0';
    };

    currentPlayer = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'start': startTime || 0,
            'rel': 0,
            'modestbranding': 1,
            'playsinline': 1 // Obligatoire sur iOS pour empêcher Safari de forcer le plein écran natif
        },
        events: {
            'onReady': function() {
                // Révèle le lecteur dès qu'il est prêt : la pub et le bouton "Ignorer" deviennent directement accessibles
                const wrapper = document.getElementById('yt-wrapper');
                if (wrapper) wrapper.style.opacity = '1';
                setTimeout(hideBangboo, 600);
            },
            'onStateChange': function(e) {
                // Quand la vidéo commence effectivement à jouer (e.data === 1)
                if (e.data === 1) {
                    hideBangboo();
                }
            }
        }
    });
}

window.openVideoModal = function(videoId, startTime, event) {
    if (event) event.stopPropagation(); 
    
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('youtubeContainer');
    const content = document.getElementById('videoModalContent');
    if (!modal || !container) return;

    // Rétablit l'animation Bangboo et charge le GIF à la demande
    const bgLoader = document.getElementById('bangbooLoader');
    const bgImg = document.getElementById('bangbooImg');
    if (bgImg && !bgImg.getAttribute('src')) {
        bgImg.src = 'assets/Icone/loading-bangboo.gif';
    }
    if (bgLoader) bgLoader.style.opacity = '1';

    container.innerHTML = `
        <div id="yt-wrapper" class="w-full h-full opacity-0 transition-opacity duration-300 bg-black">
            <div id="yt-player"></div>
        </div>
    `;

    if (modal.classList.contains('hidden')) {
    window.history.pushState({ videoModalOpen: true }, '', window.location.href);
}
modal.classList.remove('hidden');
    void modal.offsetWidth; 
    modal.classList.add('opacity-100');
    content.classList.remove('scale-95');
    content.classList.add('scale-100');

    if (typeof YT !== 'undefined' && YT.Player) {
        initYTPlayer(videoId, startTime);
    } else {
        window.onYouTubeIframeAPIReady = () => initYTPlayer(videoId, startTime);

        if (!document.getElementById('yt-api')) {
            const tag = document.createElement('script');
            tag.id = 'yt-api';
            tag.src = "https://www.youtube.com/iframe_api";
            tag.onerror = () => {
                container.innerHTML = `<iframe class="w-full h-full bg-black" src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&start=${startTime || 0}&playsinline=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
            };
            document.head.appendChild(tag);
        }
    }
};

// Fonction pour fermer la vidéo
window.closeVideoModal = function(fromPopstate = false) {
    const modal = document.getElementById('videoModal');
    const container = document.getElementById('youtubeContainer');
    const content = document.getElementById('videoModalContent');
    if (!modal || modal.classList.contains('hidden')) return;

    // Coupe le son immédiatement dès l'appui sur fermer (sans attendre les 300ms)
    if (currentPlayer && typeof currentPlayer.stopVideo === 'function') {
        currentPlayer.stopVideo();
    }

    if (fromPopstate !== true && window.history.state?.videoModalOpen) {
        window.__ignoreNextPopstate = true;
        window.history.back();
    }

    modal.classList.remove('opacity-100');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        if (currentPlayer && typeof currentPlayer.destroy === 'function') {
            currentPlayer.destroy();
            currentPlayer = null;
        }
        if (container) container.innerHTML = ''; 
    }, 300);
};

function initLanguageSwitcher() {
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.setAttribute('data-active', currentLang);
        langSwitcher.addEventListener('click', async () => {
            const newLang = langSwitcher.getAttribute('data-active') === 'fr' ? 'en' : 'fr'; 
            langSwitcher.setAttribute('data-active', newLang); 
            setLanguage(newLang);
            if (typeof window.refreshPatchTimerLang === 'function') window.refreshPatchTimerLang();
            DOM.agentCards.forEach(c => {
                const badge = c.el.querySelector('.agent-role-badge');
                if (badge) {
                    const lbl = tTerm(c.agent.role);
                    badge.setAttribute('title', lbl);
                    const img = badge.querySelector('img');
                    if (img) img.setAttribute('alt', lbl);
                }
            });
            if (State.currentAgent) {
                updateModalFavoriteButton(State.currentAgent, false);
            }
            
            // --- NOUVEAU : Rechargement des factions ---
            renderFactions();
            if (State.faction) {
                window.setFactionFilter(State.faction, false, true); // Met à jour le tag sans recharger les agents 2 fois
            }
            // -------------------------------------------

            updateDropdownUI(State.search);
            renderAgents(); scrollToTop();
            if (State.currentAgent && !document.getElementById('agentDetailModal').classList.contains('hidden')) {
             const { getGuideHTML } = await import('./guides/index.js');
             document.getElementById('agentGuideContainer').innerHTML = await getGuideHTML(State.currentAgent, agentsData.find(a => a.name === State.currentAgent)); 
         }
        });
    }
}

function init3DParallax() {
    if (window.matchMedia("(hover: none)").matches) return;

    let isScrolling = false;
    let scrollTimer = null;
    if (DOM.scrollArea) {
        DOM.scrollArea.addEventListener('scroll', () => {
            isScrolling = true;
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => { isScrolling = false; }, 120);
        }, { passive: true });
    }

    document.querySelectorAll('.agent-card-container').forEach(card => {
        let preloadTimer = null;
        const agentName = card.getAttribute('data-agent');
        if (!agentName) return;

        card.addEventListener('mouseenter', () => {
            if (isScrolling) return;
            preloadTimer = setTimeout(() => {
                if (!isScrolling) window.preloadSplash(agentName);
            }, 120);
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            clearTimeout(preloadTimer);
        }, { passive: true });
    });
}

// ==========================================
// 11. GESTION DU TIROIR/MODALE FILTRE MOBILE
// ==========================================
function initMobileDrawer() {
    if (!DOM.mobileFilterBtn || !DOM.mobileFilterModal) return;
    DOM.mobileFilterBtn.addEventListener('click', () => { window.openModal('mobileFilterModal'); updateAllSliders(State.mode); });
    if (DOM.closeMobileFilterBtn) { DOM.closeMobileFilterBtn.addEventListener('click', () => { window.closeModal('mobileFilterModal'); }); }
}

// ==========================================
// 13. SYSTÈME D'INSTALLATION PWA PREMIUM (INCLUANT iOS)
// ==========================================
let deferredPrompt;
const installBtn = document.getElementById('pwa-install-btn');

if (installBtn) {
    // 1. Détection iOS (incluant les iPads récents sous iPadOS)
    const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // 2. FORCER l'affichage du bouton sur iOS
    if (isIos() && !isInStandaloneMode()) {
        installBtn.classList.remove('hidden');
        installBtn.classList.add('flex');
    }

    // 3. Intercepte l'événement d'installation standard pour PC/Android
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove('hidden');
        installBtn.classList.add('flex');
    });

    // 4. Action au clic (avec les nouveaux IDs furtifs)
    installBtn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        
        // LA CORRECTION EST ICI : On cherche le nouveau nom !
        const iosModal = document.getElementById('apple-guide-box');

        if (isIos()) {
            if (!iosModal) {
                alert("Erreur critique : La modale 'apple-guide-box' est introuvable !");
                return;
            }

            // SUR IPHONE : Force l'affichage
            iosModal.style.setProperty('display', 'flex', 'important');
            void iosModal.offsetWidth; 
            iosModal.style.setProperty('opacity', '1', 'important');

        } else if (deferredPrompt) {
            // SUR ANDROID / PC : Lance l'installation
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                installBtn.style.opacity = '0';
                setTimeout(() => {
                    installBtn.classList.add('hidden');
                    installBtn.classList.remove('flex');
                }, 300);
            }
            deferredPrompt = null;
        }
    });

    // 5. Fermeture de la modale iOS
    document.addEventListener('click', (e) => {
        // LA CORRECTION EST ICI AUSSI : Nouveaux noms !
        const iosModal = document.getElementById('apple-guide-box');
        const closeBtn = document.getElementById('close-guide-box');

        if (!iosModal || iosModal.style.display === 'none') return;

        // Clic sur la croix ou dans le vide
        if (e.target === closeBtn || closeBtn?.contains(e.target) || e.target === iosModal) {
            iosModal.style.setProperty('opacity', '0', 'important');
            setTimeout(() => {
                iosModal.style.setProperty('display', 'none', 'important');
            }, 300);
        }
    });

    // 6. Sécurité globale
    window.addEventListener('appinstalled', () => {
        installBtn.classList.add('hidden');
        installBtn.classList.remove('flex');
    });
}

// ==========================================
// 14. COMPTE À REBOURS DYNAMIQUE PATCH / BANNIÈRE
// ==========================================
async function initPatchCountdown() {
    let timerData = null;
    try {
        const res = await fetch('./js/data/patch_timer.json');
        if (res.ok) timerData = await res.json();
    } catch (e) {}

    if (!timerData || !timerData.endDate) return;

    const labels = document.querySelectorAll('.patch-timer-label');
    const subs = document.querySelectorAll('.patch-timer-sub');
    const clocks = document.querySelectorAll('.patch-timer-clock');
    const badges = document.querySelectorAll('.patch-timer-badge');
    const desktopBox = document.getElementById('patchTimerDesktop');
    const mobileBox = document.getElementById('patchTimerMobile');

    let lastLabelTxt = '';
    let lastSubTxt = '';

    const updateTimer = (forceText = false) => {
        if (!forceText && (document.hidden || document.body.classList.contains('modal-open'))) return;

        const isEn = currentLang === 'en';
        let endMs = Date.parse(timerData.endDate);
        if (Number.isNaN(endMs)) return;

        const now = Date.now();
        let patch = timerData.patch || '3.3';
        let phase = parseInt(timerData.phase || '1', 10);

        while (now >= endMs) {
            endMs += 21 * 24 * 60 * 60 * 1000;
            if (phase === 1) {
                phase = 2;
            } else {
                phase = 1;
                const parts = String(patch).split('.');
                patch = `${parts[0]}.${parseInt(parts[1] || '0', 10) + 1}`;
            }
        }

        const diffSec = Math.max(0, Math.floor((endMs - now) / 1000));
        const days = Math.floor(diffSec / 86400);
        const hours = Math.floor((diffSec % 86400) / 3600);
        const mins = Math.floor((diffSec % 3600) / 60);
        const secs = diffSec % 60;

        const dUnit = isEn ? 'D' : 'J';
        const phaseTxt = `PATCH ${patch} • P${phase}`;
        const subTxt = phase === 1
            ? (isEn ? 'P2 IN:' : 'P2 DANS :')
            : (isEn ? 'NEXT PATCH:' : 'PATCH SUIV. :');
        const clockTxt = `${days}${dUnit} ${String(hours).padStart(2, '0')}H ${String(mins).padStart(2, '0')}M ${String(secs).padStart(2, '0')}S`;

        if (forceText || phaseTxt !== lastLabelTxt) {
            badges.forEach(el => { el.textContent = `${patch} • P${phase}`; });
            labels.forEach(el => { el.textContent = phaseTxt; });
            lastLabelTxt = phaseTxt;
        }
        if (forceText || subTxt !== lastSubTxt) {
            subs.forEach(el => { el.textContent = subTxt; });
            lastSubTxt = subTxt;
        }
        clocks.forEach(el => { el.textContent = clockTxt; });

        if (forceText && timerData.rawRange) {
            const feat = Array.isArray(timerData.featured) && timerData.featured.length
                ? ` (${timerData.featured.join(' / ')})`
                : '';
            const tooltipTitle = `Patch ${patch} Phase ${phase}${feat} : ${timerData.rawRange}`;
            if (desktopBox) desktopBox.title = tooltipTitle;
            if (mobileBox) mobileBox.title = tooltipTitle;
        }
    };

    window.refreshPatchTimerLang = () => updateTimer(true);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateTimer(false);
    });
    updateTimer(true);
    setInterval(() => updateTimer(false), 1000);
}
