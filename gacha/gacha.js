// gacha/gacha.js - Simulateur Recherche de Signal ZZZ (Pastilles Rouges Séparées, Tout Récupérer, Jauges & Historique Mobile)
(async function () {
    const ASSETS = {
        polychrome: 'assets/Gacha/polychrome.webp',
        tape: 'assets/Gacha/tape.webp'
    };

    const STORAGE_KEY = 'zzz_proxyqg_gacha_v1';
    const STORAGE_BACKUP_KEY = 'zzz_proxyqg_gacha_backup_v1';
    const IDB_NAME = 'ProxyQG_Gacha_DB';
    const IDB_STORE = 'save_store';

    const DAILY_GUIDE_CAP = 10;

    // Paliers adaptatifs INFINIS : une fois les paliers de base franchis, chaque succès continue à l'infini
    const ACH_CONFIG = {
        a1: { baseT: [10, 30, 60, 100, 150, 200],      stepT: 50,  baseR: [320, 480, 640, 800, 1000, 1200], stepR: 600, val: (st) => st.totalPulls || 0 },
        a2: { baseT: [1, 3, 6, 10, 15, 20],            stepT: 5,   baseR: [400, 600, 800, 1000, 1200, 1600], stepR: 800, val: (st) => st.totalSPulls || 0 },
        a3: { baseT: [3, 8, 15, 25, 40, 60],           stepT: 20,  baseR: [300, 500, 640, 800, 1000, 1200], stepR: 640, val: (st) => Object.values(st.inventory || {}).filter(i => i.type === 'agent').reduce((acc, i) => acc + (i.count || 0), 0) },
        a4: { baseT: [10, 25, 50, 80, 120, 170],       stepT: 50,  baseR: [300, 450, 600, 800, 1000, 1200], stepR: 500, val: (st) => Object.values(st.inventory || {}).filter(i => i.type !== 'agent').reduce((acc, i) => acc + (i.count || 0), 0) },
        a5: { baseT: [5, 12, 20, 30, 45, 60],          stepT: 15,  baseR: [300, 400, 500, 600, 800, 1000],  stepR: 500, val: (st) => st.totalGuidesRead || 0 },
        a6: { baseT: [40, 120, 240, 400, 600, 850],    stepT: 250, baseR: [300, 450, 600, 800, 1000, 1200], stepR: 600, val: (st) => st.totalDupesRes || 0 }
    };

    function getAchTierData(key, tierIdx, st) {
        const cfg = ACH_CONFIG[key];
        const idx = Math.max(0, tierIdx || 0);
        const len = cfg.baseT.length;
        const target = idx < len
            ? cfg.baseT[idx]
            : cfg.baseT[len - 1] + (idx - len + 1) * cfg.stepT;
        const reward = idx < len
            ? cfg.baseR[idx]
            : cfg.stepR;
        const currentVal = cfg.val(st);
        return { tier: idx + 1, target, reward, currentVal };
    }

    let DICT = null;
    let buildsLoadPromise = null;
    let modalEl = null;
    let animOverlayEl = null;
    let poolReady = false;
    let POOL = { S_featured: [], S_all: [], A_all: [], B_all: [], allCatalog: [] };
    let bannerInfo = { patch: '3.3', phase: '1', featuredNames: ['Phoenix', 'Velina'] };
    let activeTab = 'search';
    let colFilterType = 'all';
    let colFilterRank = 'all';
    let colSearchQuery = '';
    let colShowLocked = false;
    let skipRequested = false;
    let questMobTab = 'daily';
    let mobTelemetryOpen = false;

    async function ensureDictLoaded() {
        if (DICT) return;
        try {
            const mod = await import('./gacha-i18n.js?v=8');
            DICT = mod.GACHA_I18N;
        } catch (e) {
            console.error('Erreur chargement gacha-i18n.js :', e);
        }
    }

    function getLang() {
        const switcher = document.getElementById('langSwitcher');
        const attr = switcher && switcher.getAttribute('data-active');
        if (attr) return attr;
        try { return localStorage.getItem('zzz_lang') || 'fr'; } catch (e) { return 'fr'; }
    }

    function L() {
        const lang = getLang();
        return (DICT && DICT[lang]) || (DICT && DICT.fr) || {};
    }

    try {
        if (navigator.storage && navigator.storage.persist) {
            navigator.storage.persist().catch(() => {});
        }
    } catch (e) {}

    // ==========================================
    // 1. TRIPLE PERSISTANCE & SYNCHRO RÉTROACTIVE
    // ==========================================
    function openIDB() {
        return new Promise((resolve) => {
            if (!('indexedDB' in window)) return resolve(null);
            try {
                const req = indexedDB.open(IDB_NAME, 1);
                req.onupgradeneeded = (ev) => {
                    const db = ev.target.result;
                    if (!db.objectStoreNames.contains(IDB_STORE)) {
                        db.createObjectStore(IDB_STORE);
                    }
                };
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    }

    async function saveToIDB(stateObj) {
        const db = await openIDB();
        if (!db) return;
        try {
            const tx = db.transaction(IDB_STORE, 'readwrite');
            tx.objectStore(IDB_STORE).put(stateObj, 'main');
        } catch (e) {}
    }

    async function readFromIDB() {
        const db = await openIDB();
        if (!db) return null;
        return new Promise((resolve) => {
            try {
                const tx = db.transaction(IDB_STORE, 'readonly');
                const req = tx.objectStore(IDB_STORE).get('main');
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    }

    function getTodayStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function normalizeState(state) {
        const today = getTodayStr();
        if (!state || typeof state !== 'object') {
            state = {
                polychromes: 3200,
                tapes: 10,
                residual: 0,
                pityS: 0,
                pityA: 0,
                guaranteedFeatured: false,
                selectedRateUp: '',
                selectedRateUp2: '',
                totalPulls: 0,
                totalSPulls: 0,
                totalAPulls: 0,
                totalDupesRes: 0,
                totalGuidesRead: 0,
                recentDrops: [],
                achievements: { a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0 },
                inventory: {},
                daily: {
                    date: today,
                    visitDone: true,
                    pullsToday: 0,
                    freePackClaimed: false,
                    guidesOpened: [],
                    itemsInspected: [],
                    claimed: { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false }
                }
            };
        }

        const safeInt = (v, fb = 0, max = Infinity) => {
            const n = Number(v);
            return Number.isFinite(n) ? Math.min(max, Math.max(0, Math.floor(n))) : fb;
        };
        state.polychromes = safeInt(state.polychromes, 3200);
        state.tapes = safeInt(state.tapes, 10);
        state.residual = safeInt(state.residual, 0);
        state.pityS = safeInt(state.pityS, 0, 89);
        state.pityA = safeInt(state.pityA, 0, 9);
        state.totalPulls = safeInt(state.totalPulls, 0);
        state.totalSPulls = safeInt(state.totalSPulls, 0);
        state.totalAPulls = safeInt(state.totalAPulls, 0);
        state.totalDupesRes = safeInt(state.totalDupesRes, 0);
        state.totalGuidesRead = safeInt(state.totalGuidesRead, 0);
        state.guaranteedFeatured = !!state.guaranteedFeatured;

        if (!state.inventory || typeof state.inventory !== 'object') state.inventory = {};
        if (!Array.isArray(state.recentDrops)) state.recentDrops = [];
        if (!state.achievements || typeof state.achievements !== 'object') state.achievements = { a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0 };

        let invSCount = 0;
        let invACount = 0;
        const fallbackRecent = [];
        Object.entries(state.inventory).forEach(([id, it]) => {
            const c = it.count || 0;
            if (it.rank === 'S') {
                invSCount += c;
                fallbackRecent.unshift({ id, type: it.type, rank: 'S', rawKey: it.rawKey, nameFr: it.nameFr || it.name, nameEn: it.nameEn || it.name, img: it.img });
            } else if (it.rank === 'A') {
                invACount += c;
                fallbackRecent.push({ id, type: it.type, rank: 'A', rawKey: it.rawKey, nameFr: it.nameFr || it.name, nameEn: it.nameEn || it.name, img: it.img });
            }
        });

        state.totalSPulls = Math.max(state.totalSPulls || 0, invSCount);
        state.totalAPulls = Math.max(state.totalAPulls || 0, invACount);
        state.totalDupesRes = Math.max(state.totalDupesRes || 0, state.residual || 0);
        if (state.recentDrops.length === 0 && fallbackRecent.length > 0) {
            state.recentDrops = fallbackRecent.slice(0, 14);
        }

        if (!state.daily || state.daily.date !== today) {
            state.daily = {
                date: today,
                visitDone: true,
                pullsToday: 0,
                freePackClaimed: false,
                guidesOpened: [],
                itemsInspected: [],
                claimed: { q1: false, q2: false, q3: false, q4: false, q5: false, q6: false }
            };
        } else {
            state.daily.visitDone = true;
            if (typeof state.daily.pullsToday !== 'number') state.daily.pullsToday = 0;
            if (!state.daily.claimed) state.daily.claimed = {};
            if (!Array.isArray(state.daily.guidesOpened)) state.daily.guidesOpened = [];
            if (!Array.isArray(state.daily.itemsInspected)) state.daily.itemsInspected = [];
        }

        // Garantit que le cumul de guides lus est toujours au moins égal aux guides lus aujourd'hui
        state.totalGuidesRead = Math.max(state.totalGuidesRead || 0, state.daily.guidesOpened.length);

        if (!state.discPackV2Migrated) {
            Object.values(state.inventory).forEach(it => {
                if (it && it.type === 'disc' && (it.count || 0) > 0) {
                    it.count = it.count * (Math.floor(Math.random() * 4) + 2);
                }
            });
            state.discPackV2Migrated = true;
        }

        state.updatedAt = Date.now();
        return state;
    }

    function scoreState(st) {
        if (!st || typeof st !== 'object') return -1;
        const invCount = Object.keys(st.inventory || {}).length;
        return (st.totalPulls || 0) * 100 + invCount * 10 + (st.polychromes || 0) * 0.001;
    }

    // Séparation stricte entre les notifications de Quêtes et la notification du Pack Gratuit Magasin
    function hasClaimableQuestsOrAch(st) {
        if (!st || !st.daily) return false;
        const d = st.daily;
        const dailyReady = (d.visitDone && !d.claimed.q1)
            || (d.guidesOpened.length >= 3 && !d.claimed.q2)
            || (d.itemsInspected.length >= 2 && !d.claimed.q3)
            || (d.pullsToday >= 1 && !d.claimed.q4)
            || (d.guidesOpened.length >= 6 && !d.claimed.q5)
            || (d.pullsToday >= 10 && !d.claimed.q6);

        const achReady = Object.keys(ACH_CONFIG).some((key) => {
            const tierIdx = st.achievements?.[key] || 0;
            const info = getAchTierData(key, tierIdx, st);
            return info.currentVal >= info.target;
        });

        return dailyReady || achReady;
    }

    function hasClaimableShopFreePack(st) {
        if (!st || !st.daily) return false;
        return !st.daily.freePackClaimed;
    }

    function updateQuestNotificationDot(st) {
        const questsReady = hasClaimableQuestsOrAch(st);
        const shopReady = hasClaimableShopFreePack(st);
        const badgesReady = !!(window.ZZZBuilds && typeof window.ZZZBuilds.hasClaimableBadges === 'function' && window.ZZZBuilds.hasClaimableBadges(st));
        const anyGlobal = questsReady || shopReady || badgesReady;

        // Pastille sur les boutons du site (PC & mobile)
        document.querySelectorAll('.gacha-quest-dot-global').forEach(el => {
            el.style.display = anyGlobal ? 'block' : 'none';
        });

        // Pastille uniquement sur l'onglet Quêtes & Succès
        const qDot = document.getElementById('gacha-dot-quests');
        if (qDot) qDot.style.display = questsReady ? 'block' : 'none';

        // Pastille uniquement sur l'onglet Magasin
        const sDot = document.getElementById('gacha-dot-shop');
        if (sDot) sDot.style.display = shopReady ? 'block' : 'none';

        // Pastille uniquement sur l'onglet Badges
        const bDot = document.getElementById('gacha-dot-badges');
        if (bDot) bDot.style.display = badgesReady ? 'block' : 'none';
    }

    function saveState(state) {
        try {
            const raw = JSON.stringify(state);
            localStorage.setItem(STORAGE_KEY, raw);
            localStorage.setItem(STORAGE_BACKUP_KEY, raw);
        } catch (e) {}
        saveToIDB(state);
        updateQuestNotificationDot(state);
    }

    function loadState() {
        let s1 = null, s2 = null;
        try {
            const r1 = localStorage.getItem(STORAGE_KEY);
            if (r1) s1 = JSON.parse(r1);
        } catch (e) {}
        try {
            const r2 = localStorage.getItem(STORAGE_BACKUP_KEY);
            if (r2) s2 = JSON.parse(r2);
        } catch (e) {}

        const best = scoreState(s2) > scoreState(s1) ? s2 : s1;
        const normalized = normalizeState(best);
        saveState(normalized);
        return normalized;
    }

    let GState = loadState();

    // ==========================================
    // 2. OUVERTURE / FERMETURE & HISTORIQUE
    // ==========================================
    let miniCardOverlayEl = null;
    let gachaOpenedAt = 0;

    let ignoreNextGachaPop = false;
    let tvAnimTimers = [];
    let tvAnimSession = 0;

    function clearTVAnimTimers() {
        tvAnimSession += 1;
        tvAnimTimers.forEach(id => clearTimeout(id));
        tvAnimTimers = [];
        if (animOverlayEl) animOverlayEl.onclick = null;
    }

    function pushGachaSubState(subName) {
        try {
            if (!window.history.state?.gachaSub) {
                window.history.pushState({ gachaOpen: true, gachaSub: subName || 'drawer' }, '', window.location.href);
            }
        } catch (e) {}
    }

    function popGachaSubState() {
        try {
            if (window.history.state?.gachaSub) {
                ignoreNextGachaPop = true;
                window.history.back();
            }
        } catch (e) {}
    }

    function closeGachaModal(fromPopState = false) {
        if (!modalEl) return;
        clearTVAnimTimers();
        window.ZZZBuilds?.closeAllDrawers?.();
        modalEl.classList.remove('visible');
        if (animOverlayEl) animOverlayEl.classList.remove('active');
        if (miniCardOverlayEl) miniCardOverlayEl.classList.remove('active');
        document.body.classList.remove('modal-open');
        if (!fromPopState && window.history.state?.gachaOpen) {
            try {
                const steps = window.history.state?.gachaSub ? -2 : -1;
                ignoreNextGachaPop = true;
                window.history.go(steps);
            } catch (e) {}
        }
    }
    window.closeGachaModal = () => closeGachaModal(false);

    window.__realOpenGachaModal = window.openGachaModal = async function () {
        gachaOpenedAt = Date.now();
        // Laisse le temps au history.back() de closeModal('mobileFilterModal') de passer sur mobile
        await new Promise(r => setTimeout(r, 45));
        gachaOpenedAt = Date.now();

        await Promise.all([
            ensureDictLoaded(),
            buildsLoadPromise || Promise.resolve()
        ]);
        createModalDOM();
        window.ZZZBuilds?.initTabs?.();
        await ensurePoolLoaded();
        GState = loadState();
        refreshModalStaticLabels();
        renderCurrentTab(true);

        gachaOpenedAt = Date.now();
        document.body.classList.add('modal-open');
        if (!window.history.state?.gachaOpen) {
            try { window.history.pushState({ gachaOpen: true }, '', window.location.href); } catch (e) {}
        }
        modalEl.classList.add('visible');

        // Ré-applique modal-open après le timeout de 300ms de closeModal('mobileFilterModal')
        setTimeout(() => {
            if (modalEl && modalEl.classList.contains('visible')) {
                document.body.classList.add('modal-open');
            }
        }, 320);
    };

    window.addEventListener('popstate', (e) => {
        if (ignoreNextGachaPop) {
            ignoreNextGachaPop = false;
            return;
        }
        // Ignore tout popstate résiduel déclenché par la fermeture du menu mobile lors de l'ouverture du Gacha
        if (Date.now() - gachaOpenedAt < 500) {
            return;
        }
        const engTip = document.getElementById('proxy-tooltip');
        const discTip = document.getElementById('disc-tooltip-modal');
        if ((engTip && engTip.classList.contains('visible')) ||
            (discTip && discTip.classList.contains('visible'))) {
            return;
        }
        if (miniCardOverlayEl && miniCardOverlayEl.classList.contains('active')) {
            miniCardOverlayEl.classList.remove('active');
            return;
        }
        if (animOverlayEl && animOverlayEl.classList.contains('active')) {
            clearTVAnimTimers();
            animOverlayEl.classList.remove('active');
            renderCurrentTab(false);
            return;
        }
        if (window.ZZZBuilds?.closeTopDrawer?.(true)) {
            return;
        }
        if (e.state && e.state.gachaOpen) {
            return;
        }
        if (modalEl && modalEl.classList.contains('visible')) {
            closeGachaModal(true);
        }
    });

    readFromIDB().then(idbState => {
        if (idbState && scoreState(idbState) > scoreState(GState)) {
            GState = normalizeState(idbState);
            saveState(GState);
            if (modalEl && modalEl.classList.contains('visible')) renderCurrentTab(false);
        }
    });

    // ==========================================
    // 3. QUÊTES (1 FOIS PAR AGENT/JOUR, CAP 10/JOUR, FLÈCHES < > INCLUSES)
    // ==========================================
    function normalizeTrackedAgentName(agentName) {
        const raw = String(agentName || '').trim();
        if (!raw) return '';
        const low = raw.toLowerCase();
        if (low === 'nothing') return '';
        if (low === "dame de l'aurore" || low === 'dame de l’aurore') return 'Sunbringer';
        if (low === 'jane doe') return 'Jane';
        return raw;
    }

    function trackGuideOpen(agentName) {
        const clean = normalizeTrackedAgentName(agentName);
        if (!clean) return;
        GState = loadState();
        // 1 seul comptage par agent par jour + plafond strict de 10 guides par jour
        const alreadyTracked = GState.daily.guidesOpened.some(
            n => normalizeTrackedAgentName(n).toLowerCase() === clean.toLowerCase()
        );
        if (alreadyTracked) return;
        if (GState.daily.guidesOpened.length >= DAILY_GUIDE_CAP) return;

        GState.daily.guidesOpened.push(clean);
        GState.totalGuidesRead = (GState.totalGuidesRead || 0) + 1;
        saveState(GState);
    }

    function trackEquipmentInspect(itemKey) {
        const clean = String(itemKey || '').trim();
        if (!clean) return;
        GState = loadState();
        if (!GState.daily.itemsInspected.includes(clean)) {
            GState.daily.itemsInspected.push(clean);
            saveState(GState);
        }
    }

    // Détecte aussi l'ouverture d'un guide via les flèches Précédent / Suivant ou le clavier
    function setupGuideNavigationObserver() {
        const giantTitle = document.getElementById('modalGiantNameText');
        if (giantTitle && !giantTitle.__gachaWatched) {
            giantTitle.__gachaWatched = true;
            const obs = new MutationObserver(() => {
                const agModal = document.getElementById('agentDetailModal');
                if (agModal && !agModal.classList.contains('hidden')) {
                    const currentName = giantTitle.textContent.trim();
                    if (currentName) trackGuideOpen(currentName);
                }
            });
            obs.observe(giantTitle, { childList: true, characterData: true, subtree: true });
        }
    }
    setupGuideNavigationObserver();

    document.addEventListener('click', (e) => {
        if (e.target.closest('[onclick*="toggleFavorite"]')) return;
        setupGuideNavigationObserver();

        const agentCard = e.target.closest('[data-agent], [onclick*="openAgentDetail"], [data-tt-agent], [data-disc-agent]');
        if (agentCard) {
            const name = agentCard.getAttribute('data-agent')
                || agentCard.getAttribute('data-tt-agent')
                || agentCard.getAttribute('data-disc-agent')
                || (agentCard.getAttribute('onclick')?.match(/openAgentDetail\(\s*['"]([^'"]+)['"]/) || [])[1];
            if (name) trackGuideOpen(name);
        }

        if (e.target.closest('#prevAgentBtn, #nextAgentBtn')) {
            setTimeout(() => {
                const giantTitle = document.getElementById('modalGiantNameText');
                const currentName = giantTitle && giantTitle.textContent.trim();
                if (currentName) trackGuideOpen(currentName);
            }, 40);
        }

        const equipTrigger = e.target.closest('[data-engine], [data-disc]');
        if (equipTrigger) {
            const key = equipTrigger.getAttribute('data-engine') || equipTrigger.getAttribute('data-disc');
            if (key) trackEquipmentInspect(key);
        }

        if (e.target.closest('#langSwitcher')) {
            setTimeout(() => {
                syncSidebarButtonText();
                if (modalEl && modalEl.classList.contains('visible')) {
                    refreshModalStaticLabels();
                    renderCurrentTab(false);
                }
            }, 50);
        }
    }, true);

    function syncSidebarButtonText() {
        const txt = L().sidebarBtn;
        if (!txt) return;
        document.querySelectorAll('[onclick*="openGachaModal"] span').forEach(sp => {
            if (!sp.classList.contains('gacha-quest-dot-global') && sp.textContent.trim().length > 2) {
                sp.textContent = txt;
            }
        });
    }

    // ==========================================
    // 4. CHARGEMENT DU CATALOGUE COMPLET
    // ==========================================
    async function fetchCachedJson(url, storageKey, fallback) {
        if (storageKey) {
            try {
                const cached = sessionStorage.getItem(storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                        return parsed;
                    }
                }
            } catch (e) {
                try { sessionStorage.removeItem(storageKey); } catch (_) {}
            }
        }
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (storageKey && data && typeof data === 'object' && Object.keys(data).length > 0) {
                try { sessionStorage.setItem(storageKey, JSON.stringify(data)); } catch (e) {}
            }
            return data;
        } catch (e) {
            return fallback;
        }
    }

    async function ensurePoolLoaded() {
        if (poolReady) return;
        try {
            const [agents, engines, discs, timer] = await Promise.all([
                fetch('js/data/agents.json').then(r => r.json()).catch(() => []),
                fetchCachedJson('js/data/engines.json', 'zzz_engines_db', {}),
                fetchCachedJson('js/data/discs.json', 'zzz_discs_db', {}),
                fetch('js/data/patch_timer.json').then(r => r.json()).catch(() => null)
            ]);

            if (timer) {
                bannerInfo.patch = timer.patch || '3.3';
                bannerInfo.phase = timer.phase || '1';
                if (Array.isArray(timer.featured) && timer.featured.length) {
                    bannerInfo.featuredNames = timer.featured;
                }
            }

            POOL = { S_featured: [], S_all: [], A_all: [], B_all: [], allCatalog: [] };

            agents.forEach(a => {
                const nameFr = a.name === 'Jane' ? 'Jane Doe' : (a.name === 'Sunbringer' ? "Dame de l'Aurore" : a.name);
                const nameEn = a.name === 'Jane' ? 'Jane Doe' : a.name;
                const item = {
                    id: `agent_${a.name}`,
                    type: 'agent',
                    nameFr,
                    nameEn,
                    rawKey: a.name,
                    rank: a.rank || 'S',
                    element: a.element || 'Physical',
                    role: a.role || 'Attack',
                    faction: a.faction || 'New Eridu',
                    img: `assets/Agents/${a.name}.webp`
                };
                POOL.allCatalog.push(item);
                if (item.rank === 'S') {
                    POOL.S_all.push(item);
                    if (bannerInfo.featuredNames.some(fn => fn.toLowerCase() === a.name.toLowerCase())) {
                        POOL.S_featured.push(item);
                    }
                } else {
                    POOL.A_all.push(item);
                }
            });

            Object.entries(engines).forEach(([key, eng]) => {
                const item = {
                    id: `engine_${key}`,
                    type: 'engine',
                    nameFr: eng.name?.fr || eng.name?.en || key,
                    nameEn: eng.name?.en || eng.name?.fr || key,
                    rawKey: key,
                    rank: eng.rank || 'A',
                    role: eng.specialty || '',
                    img: `assets/W-Engine/${(eng.img || '').replace('.png', '.webp')}`
                };
                POOL.allCatalog.push(item);
                if (item.rank === 'S') {
                    POOL.S_all.push(item);
                } else if (item.rank === 'A') {
                    POOL.A_all.push(item);
                } else {
                    POOL.B_all.push(item);
                }
            });

            Object.entries(discs).forEach(([key, d]) => {
                const item = {
                    id: `disc_${key}`,
                    type: 'disc',
                    nameFr: d.name?.fr || d.name?.en || key,
                    nameEn: d.name?.en || d.name?.fr || key,
                    rawKey: key,
                    rank: 'A',
                    role: 'Drive Disc',
                    img: `assets/Disque/${d.img}`
                };
                POOL.allCatalog.push(item);
                POOL.A_all.push(item);
            });

            if (POOL.S_featured.length === 0 && POOL.S_all.length > 0) {
                POOL.S_featured = POOL.S_all.filter(i => i.type === 'agent').slice(-2);
            }

            poolReady = true;
        } catch (e) {
            console.error('Erreur chargement Gacha Pool:', e);
        }
    }

    function normSearch(str) {
        return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function itemName(item) {
        if (!item) return '';
        const isEn = getLang() === 'en';
        return (isEn ? (item.nameEn || item.nameFr || item.name) : (item.nameFr || item.nameEn || item.name)) || '';
    }

    function getPrimaryFeatured() {
        const sAgents = POOL.S_all.filter(i => i.type === 'agent');
        if (GState.selectedRateUp) {
            const custom = sAgents.find(a => a.rawKey === GState.selectedRateUp);
            if (custom) return custom;
        }
        return POOL.S_featured[0] || sAgents[0] || { id: 'agent_Velina', nameFr: 'Velina', rawKey: 'Velina', type: 'agent', rank: 'S', img: 'assets/Agents/Velina.webp' };
    }

    function getSecondaryFeatured(primary) {
        if (GState.selectedRateUp2) {
            const custom2 = POOL.S_all.find(i => i.id === GState.selectedRateUp2 || i.rawKey === GState.selectedRateUp2);
            if (custom2 && custom2.id !== primary.id) return custom2;
        }
        const sAgents = POOL.S_all.filter(i => i.type === 'agent');
        const second = POOL.S_featured.find(a => a.rawKey !== primary.rawKey)
            || sAgents.find(a => a.rawKey !== primary.rawKey);
        return second || primary;
    }

    // ==========================================
    // 5. ALGORITHME DE TIRAGE & RECYCLAGE SURPLUS
    // ==========================================
    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function registerItemToInventory(chosen) {
        const prev = GState.inventory[chosen.id];
        const isNew = !prev;
        // Chaque drop de Disque donne aléatoirement entre 2 et 5 exemplaires à graver
        const qtyAdded = chosen.type === 'disc' ? (Math.floor(Math.random() * 4) + 2) : 1;
        GState.inventory[chosen.id] = {
            count: (prev ? prev.count : 0) + qtyAdded,
            type: chosen.type,
            rank: chosen.rank,
            nameFr: chosen.nameFr,
            nameEn: chosen.nameEn,
            rawKey: chosen.rawKey,
            img: chosen.img
        };

        if (chosen.rank === 'S' || chosen.rank === 'A') {
            GState.recentDrops.unshift({
                id: chosen.id,
                type: chosen.type,
                rank: chosen.rank,
                rawKey: chosen.rawKey,
                nameFr: chosen.nameFr,
                nameEn: chosen.nameEn,
                img: chosen.img
            });
            if (GState.recentDrops.length > 14) GState.recentDrops.pop();
        }

        return { ...chosen, isNew, qtyAdded, count: GState.inventory[chosen.id].count };
    }

    function rollSingleItem() {
        GState.pityS += 1;
        GState.pityA += 1;
        GState.totalPulls += 1;
        GState.daily.pullsToday = (GState.daily.pullsToday || 0) + 1;

        let sChance = 0.006;
        if (GState.pityS >= 90) {
            sChance = 1.0;
        } else if (GState.pityS >= 75) {
            sChance = 0.006 + (GState.pityS - 74) * 0.06;
        }

        const rand = Math.random();
        let chosen = null;

        if (rand < sChance) {
            GState.pityS = 0;
            GState.pityA = 0;
            GState.totalSPulls = (GState.totalSPulls || 0) + 1;
            const feat1 = getPrimaryFeatured();
            const feat2 = getSecondaryFeatured(feat1);

            if (GState.guaranteedFeatured) {
                chosen = feat1;
                GState.guaranteedFeatured = false;
            } else if (Math.random() < 0.5) {
                chosen = Math.random() < 0.7 ? feat1 : feat2;
                GState.guaranteedFeatured = false;
            } else {
                chosen = pickRandom(POOL.S_all);
                GState.guaranteedFeatured = true;
            }
            GState.residual += 40;
            GState.totalDupesRes = (GState.totalDupesRes || 0) + 40;
        } else if (GState.pityA >= 10 || rand < sChance + 0.094) {
            GState.pityA = 0;
            GState.totalAPulls = (GState.totalAPulls || 0) + 1;
            chosen = pickRandom(POOL.A_all);
            GState.residual += 8;
            GState.totalDupesRes = (GState.totalDupesRes || 0) + 8;
        } else {
            chosen = pickRandom(POOL.B_all);
            GState.residual += 2;
            GState.totalDupesRes = (GState.totalDupesRes || 0) + 2;
        }

        return registerItemToInventory(chosen);
    }

    function computeOvercapSurplus() {
        let totalExcess = 0;
        let totalGain = 0;
        const agentBuilds = Object.values(GState.buildSystem?.agentBuilds || {});
        Object.values(GState.inventory || {}).forEach(it => {
            if (it.type === 'agent') {
                const maxCap = 7;
                if ((it.count || 0) > maxCap) {
                    const diff = it.count - maxCap;
                    totalExcess += diff;
                    totalGain += diff * (it.rank === 'S' ? 40 : 10);
                }
            } else if (it.type === 'engine') {
                const equippedCount = agentBuilds.filter(ab => ab && ab.engineKey === it.rawKey).length;
                const keepCap = Math.max(5, equippedCount);
                if ((it.count || 0) > keepCap) {
                    const diff = it.count - keepCap;
                    totalExcess += diff;
                    totalGain += diff * (it.rank === 'S' ? 40 : (it.rank === 'A' ? 10 : 3));
                }
            }
        });
        return { totalExcess, totalGain };
    }

    // ==========================================
    // 6. DOM PRINCIPAL & TOPBAR (AVEC PASTILLES SÉPARÉES)
    // ==========================================
    function iconFallback(type) {
        if (type === 'poly') {
            return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23d7f70c%22><polygon points=%2212,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5%22/></svg>'"`;
        }
        return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%2338bdf8%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/><circle cx=%2212%22 cy=%2212%22 r=%224%22 fill=%22%23000%22/></svg>'"`;
    }

    function calcIKLevel() {
        const xp = (GState.totalPulls || 0) * 15 + Object.keys(GState.inventory || {}).length * 40 + (GState.totalGuidesRead || 0) * 10;
        return Math.min(60, Math.max(1, Math.floor(1 + Math.sqrt(xp / 12))));
    }

    function createModalDOM() {
        if (modalEl) return;
        const t = L();

        modalEl = document.createElement('div');
        modalEl.id = 'zzz-gacha-modal';
        modalEl.innerHTML = `
            <div class="gacha-bg-pattern"></div>
            <div class="gacha-topbar">
                <div class="gacha-top-left">
                    <button type="button" class="gacha-back-btn" id="gacha-close-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
                        <span id="gacha-lbl-back">${t.backBtn || 'Retour QG'}</span>
                    </button>
                    <div class="gacha-ik-badge" id="gacha-ui-iklvl">IK Lv. 1</div>
                </div>

                <div class="gacha-nav-pills">
                    <button type="button" class="gacha-nav-btn active" data-gtab="search">
                        <span class="gnav-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2.5"/><polyline points="17 2 12 7 7 2"/></svg></span>
                        <span class="gnav-lbl-full" id="gtab-lbl-search">${t.tabs?.search || 'Canal Unifié'}</span>
                        <span class="gnav-lbl-mob" id="gtab-mob-search">${t.tabsMobile?.search || 'Signal'}</span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="quests">
                        <span class="gnav-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>
                        <span class="gnav-lbl-full" id="gtab-lbl-quests">${t.tabs?.quests || 'Quêtes & Succès'}</span>
                        <span class="gnav-lbl-mob" id="gtab-mob-quests">${t.tabsMobile?.quests || 'Quêtes'}</span>
                        <span class="gacha-quest-dot" id="gacha-dot-quests" style="display:none;"></span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="shop">
                        <span class="gnav-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
                        <span class="gnav-lbl-full" id="gtab-lbl-shop">${t.tabs?.shop || 'Magasin'}</span>
                        <span class="gnav-lbl-mob" id="gtab-mob-shop">${t.tabsMobile?.shop || 'Shop'}</span>
                        <span class="gacha-quest-dot" id="gacha-dot-shop" style="display:none;"></span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="collection">
                        <span class="gnav-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg></span>
                        <span class="gnav-lbl-full" id="gtab-lbl-collection">${t.tabs?.collection || 'Collection'}</span>
                        <span class="gnav-lbl-mob" id="gtab-mob-collection">${t.tabsMobile?.collection || 'Archives'}</span>
                    </button>
                </div>

                <div class="gacha-currencies">
                    <div class="gacha-curr-pill" title="Residual Signals (✦)">
                        <span style="color:#f43f5e;font-size:13px;">✦</span>
                        <span id="gacha-ui-residual">0</span>
                    </div>
                    <div class="gacha-curr-pill" title="Polychromes">
                        <img src="${ASSETS.polychrome}" alt="Poly" ${iconFallback('poly')}>
                        <span id="gacha-ui-poly">0</span>
                    </div>
                    <div class="gacha-curr-pill" title="Encrypted Master Tapes">
                        <img src="${ASSETS.tape}" alt="Tapes" ${iconFallback('tape')}>
                        <span id="gacha-ui-tapes">0</span>
                    </div>
                    <button type="button" class="gacha-save-trigger" id="gacha-open-backup" title="Backup / Transfer" aria-label="Backup">
                        <svg class="save-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        <span class="lbl" id="gacha-lbl-save">${t.saveBtn || 'Sauvegarde'}</span>
                    </button>
                </div>
            </div>

            <div class="gacha-main-area custom-scrollbar" id="gacha-view-mount"></div>
        `;
        document.body.appendChild(modalEl);

        animOverlayEl = document.createElement('div');
        animOverlayEl.id = 'gacha-anim-overlay';
        // Cliquer en dehors d'une boîte de dialogue (.gacha-dialog-box / .zb-modal-box) ferme automatiquement la pop-up
        animOverlayEl.addEventListener('mousedown', (ev) => {
            if (ev.target === animOverlayEl && animOverlayEl.querySelector('.gacha-dialog-box, .zb-modal-box')) {
                animOverlayEl.classList.remove('active');
                renderCurrentTab(false);
            }
        });
        document.body.appendChild(animOverlayEl);

        document.getElementById('gacha-close-btn').addEventListener('click', () => closeGachaModal(false));
        document.getElementById('gacha-open-backup').addEventListener('click', showBackupModal);

        miniCardOverlayEl = document.createElement('div');
        miniCardOverlayEl.id = 'gacha-agent-minicard-overlay';
        document.body.appendChild(miniCardOverlayEl);

        modalEl.querySelectorAll('[data-gtab]').forEach(btn => {
            btn.addEventListener('click', () => {
                window.ZZZBuilds?.closeAllDrawers?.();
                activeTab = btn.getAttribute('data-gtab');
                modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b === btn));
                renderCurrentTab(true);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalEl && modalEl.classList.contains('visible')) {
                const engTip = document.getElementById('proxy-tooltip');
                const discTip = document.getElementById('disc-tooltip-modal');
                if ((engTip && engTip.classList.contains('visible')) ||
                    (discTip && discTip.classList.contains('visible'))) {
                    return;
                }
                if (miniCardOverlayEl && miniCardOverlayEl.classList.contains('active')) {
                    miniCardOverlayEl.classList.remove('active');
                    return;
                }
                if (animOverlayEl && animOverlayEl.classList.contains('active')) {
                    clearTVAnimTimers();
                    animOverlayEl.classList.remove('active');
                    renderCurrentTab(false);
                } else if (window.ZZZBuilds?.closeTopDrawer?.(false)) {
                    return;
                } else {
                    closeGachaModal(false);
                }
            }
        });
    }

    function refreshModalStaticLabels() {
        if (!modalEl) return;
        const t = L();
        if (!t.tabs) return;
        document.getElementById('gacha-lbl-back').textContent = t.backBtn;
        document.getElementById('gacha-lbl-save').textContent = t.saveBtn;
        document.getElementById('gtab-lbl-search').textContent = t.tabs.search;
        document.getElementById('gtab-lbl-quests').textContent = t.tabs.quests;
        document.getElementById('gtab-lbl-shop').textContent = t.tabs.shop;
        document.getElementById('gtab-lbl-collection').textContent = t.tabs.collection;
        if (t.tabsMobile) {
            const setTxt = (id, v) => { const el = document.getElementById(id); if (el && v) el.textContent = v; };
            setTxt('gtab-mob-search', t.tabsMobile.search);
            setTxt('gtab-mob-quests', t.tabsMobile.quests);
            setTxt('gtab-mob-shop', t.tabsMobile.shop);
            setTxt('gtab-mob-collection', t.tabsMobile.collection);
        }
    }

    function updateTopCurrencies() {
        if (!modalEl) return;
        const t = L();
        document.getElementById('gacha-ui-residual').textContent = GState.residual;
        document.getElementById('gacha-ui-poly').textContent = GState.polychromes;
        document.getElementById('gacha-ui-tapes').textContent = GState.tapes;
        const ikEl = document.getElementById('gacha-ui-iklvl');
        if (ikEl && t.ikLevel) ikEl.textContent = t.ikLevel.replace('{lvl}', calcIKLevel());
        updateQuestNotificationDot(GState);
    }

    function renderCurrentTab(resetScroll = false) {
        updateTopCurrencies();
        const mount = document.getElementById('gacha-view-mount');
        if (!mount) return;
        const savedScroll = mount.scrollTop;

        if (activeTab === 'search') renderSearchStage(mount);
        else if (activeTab === 'quests') renderQuestsTab(mount);
        else if (activeTab === 'shop') renderShopTab(mount);
        else if (activeTab === 'collection') renderCollectionTab(mount);
        else if (activeTab === 'builds' || activeTab === 'badges') {
            window.ZZZBuilds?.refreshActiveView?.(activeTab);
        }

        mount.scrollTop = resetScroll ? 0 : savedScroll;
    }

    // ==========================================
    // 7. ONGLET 1 : CANAL UNIFIÉ + JAUGES DE PITY
    // ==========================================
    function renderSearchStage(mount) {
        const t = L().banner;
        const sLeft = Math.max(1, 90 - GState.pityS);
        const aLeft = Math.max(1, 10 - GState.pityA);
        const sPct = Math.min(100, Math.round((GState.pityS / 90) * 100));
        const aPct = Math.min(100, Math.round((GState.pityA / 10) * 100));
        const inSoftPity = GState.pityS >= 74;

        const feat1 = getPrimaryFeatured();
        const feat2 = getSecondaryFeatured(feat1);

        const totalAgents = POOL.allCatalog.filter(i => i.type === 'agent').length;
        const totalEngines = POOL.allCatalog.filter(i => i.type === 'engine').length;
        const totalDiscs = POOL.allCatalog.filter(i => i.type === 'disc').length;

        const sRateAcct = GState.totalPulls > 0
            ? `${((GState.totalSPulls || 0) / GState.totalPulls * 100).toFixed(2)}%`
            : '0.00%';

        const rWord = t.rankWord || 'RANG';
        const recentHTML = (GState.recentDrops || []).length === 0
            ? `<div style="font-size:11.5px;color:#71717a;font-weight:600;padding:6px 2px;">${t.recentDropsEmpty}</div>`
            : GState.recentDrops.map(d => {
                const liveItem = POOL.allCatalog.find(c => c.id === d.id) || d;
                const liveName = itemName(liveItem);
                return `
                <div class="gacha-hist-chip rank-${d.rank}" data-h-type="${d.type}" data-h-key="${d.rawKey}">
                    <img src="${liveItem.img || d.img}" alt="${liveName}">
                    <div style="display:flex;flex-direction:column;gap:1px;">
                        <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10.5px;color:#fff;text-transform:uppercase;">${liveName}</span>
                        <span style="font-family:monospace;font-size:9.5px;font-weight:800;color:${d.rank === 'S' ? '#facc15' : '#c084fc'};">${rWord} ${d.rank}</span>
                    </div>
                </div>`;
            }).join('');

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-stage-grid">
                    <div class="gacha-tv-showcase">
                        <div class="gacha-showcase-header">
                            <span class="gacha-rateup-tag">${t.rateUpLabel}</span>
                            <div class="gacha-header-btns">
                                <button type="button" class="gacha-change-duo-btn" id="btn-change-duo">
                                    <span>${t.changeDuoBtn || 'Changer le Duo en Vedette'}</span>
                                </button>
                                <button type="button" class="gacha-details-btn" id="btn-open-rates">
                                    <span>${t.detailsBtn}</span>
                                </button>
                            </div>
                        </div>

                        <div class="gacha-featured-tvs">
                            <div class="gacha-crt-screen primary" id="tv-screen-slot1" title="${t.chooseTarget1}">
                                <span class="gacha-crt-edit-mob">✎ ${t.tapToChange || 'Changer'}</span>
                                <img src="${feat1.img}" alt="${itemName(feat1)}">
                                <div class="gacha-crt-caption">
                                    <span class="gacha-crt-name">${itemName(feat1)}</span>
                                    <span class="gacha-crt-up-pill">RATE-UP</span>
                                </div>
                            </div>
                            <div class="gacha-crt-screen ${feat2.type === 'engine' ? 'equip-tv-bg' : ''}" id="tv-screen-slot2" title="${t.chooseTarget2}">
                                <span class="gacha-crt-edit-mob">✎ ${t.tapToChange || 'Changer'}</span>
                                <img src="${feat2.img}" alt="${itemName(feat2)}" class="${feat2.type === 'engine' ? 'is-equip-tv' : ''}">
                                <div class="gacha-crt-caption">
                                    <span class="gacha-crt-name">${itemName(feat2)}</span>
                                    <span class="gacha-crt-up-pill">RATE-UP</span>
                                </div>
                            </div>
                        </div>

                        <div class="gacha-pool-minis">
                            <div class="gacha-mini-tv">
                                <span class="gacha-mini-tv-val" style="color:#d7f70c;">${totalAgents} AGENTS</span>
                                <span class="gacha-mini-tv-lbl">${t.poolStatsAgents.replace('{n}', totalAgents)}</span>
                            </div>
                            <div class="gacha-mini-tv">
                                <span class="gacha-mini-tv-val" style="color:#c084fc;">${totalEngines} W-ENGINES</span>
                                <span class="gacha-mini-tv-lbl">${t.poolStatsEngines.replace('{n}', totalEngines)}</span>
                            </div>
                            <div class="gacha-mini-tv">
                                <span class="gacha-mini-tv-val" style="color:#38bdf8;">${totalDiscs} DISCS</span>
                                <span class="gacha-mini-tv-lbl">${t.poolStatsDiscs.replace('{n}', totalDiscs)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="gacha-info-panel">
                        <div class="gacha-info-head">
                            <span class="gacha-patch-tag">${t.badge.replace('{patch}', bannerInfo.patch)}</span>
                            <h2 class="gacha-panel-title">${t.title}</h2>
                            <p class="gacha-panel-desc">${(t.subtitle || '').replace('{n}', totalAgents)}</p>
                        </div>

                        <div class="gacha-mob-pity-strip">
                            <div class="gacha-mob-pity-top">
                                <span class="gacha-mob-pity-s"><strong>S</strong> ${GState.pityS}/90 <small>(${GState.guaranteedFeatured ? '100%' : '50/50'})</small></span>
                                <span class="gacha-mob-pity-a"><strong>A</strong> ${GState.pityA}/10</span>
                                <button type="button" class="gacha-mob-rates-ico" id="btn-open-rates-mob" aria-label="${t.detailsBtn}">i</button>
                            </div>
                            <div class="gacha-pity-bar-track" style="height:5px;">
                                <div class="gacha-pity-bar-fill" style="width:${sPct}%;background:${inSoftPity ? '#ef4444' : '#facc15'};"></div>
                            </div>
                        </div>

                        <div class="gacha-rates-box">
                            <div class="gacha-rates-head">
                                <span>${t.ratesTitle}</span>
                                <span>50/50 UP</span>
                            </div>
                            <div class="gacha-rates-grid">
                                <div class="gacha-rate-pill r-s">
                                    <span class="gacha-rate-rank">${t.rankS}</span>
                                    <span class="gacha-rate-val">0.6% / 1.6%</span>
                                </div>
                                <div class="gacha-rate-pill r-a">
                                    <span class="gacha-rate-rank">${t.rankA}</span>
                                    <span class="gacha-rate-val">9.4% / 13%</span>
                                </div>
                                <div class="gacha-rate-pill r-b">
                                    <span class="gacha-rate-rank">${t.rankB}</span>
                                    <span class="gacha-rate-val">90.0%</span>
                                </div>
                            </div>
                        </div>

                        <div class="gacha-pity-stack">
                            <div class="gacha-pity-pill">
                                <div class="gacha-pity-row">
                                    <span>${t.pityA}</span>
                                    <span class="gacha-pity-count c-a">${t.pullsLeft.replace('{n}', aLeft)}</span>
                                </div>
                                <div class="gacha-pity-bar-track">
                                    <div class="gacha-pity-bar-fill" style="width:${aPct}%;background:#c084fc;"></div>
                                </div>
                            </div>
                            <div class="gacha-pity-pill">
                                <div class="gacha-pity-row">
                                    <span>${t.pityS}</span>
                                    <span class="gacha-pity-count c-s">${t.pullsLeft.replace('{n}', sLeft)}</span>
                                </div>
                                <div class="gacha-pity-bar-track">
                                    <div class="gacha-pity-bar-fill" style="width:${sPct}%;background:${inSoftPity ? '#ef4444' : '#facc15'};"></div>
                                </div>
                            </div>
                            <div class="gacha-meta-row">
                                <span>${t.status5050} <strong>${GState.guaranteedFeatured ? t.guaranteed : t.fiftyFifty}</strong></span>
                                <span>${t.totalPulls} <strong>${GState.totalPulls}</strong></span>
                            </div>
                        </div>

                        <div class="gacha-pull-actions">
                            <button type="button" class="gacha-pull-btn" id="btn-pull-1">
                                <span class="gacha-pull-btn-title">${t.pull1Title}</span>
                                <span class="gacha-pull-btn-cost">
                                    <img src="${ASSETS.tape}" ${iconFallback('tape')}> ×1 ${t.orPoly.replace('{n}', '160')}
                                    <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                                </span>
                            </button>
                            <button type="button" class="gacha-pull-btn multi" id="btn-pull-10">
                                <span class="gacha-pull-btn-title">${t.pull10Title}</span>
                                <span class="gacha-pull-btn-cost">
                                    <img src="${ASSETS.tape}" ${iconFallback('tape')}> ×10 ${t.orPoly.replace('{n}', '1600')}
                                    <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="gacha-telemetry-panel ${mobTelemetryOpen ? 'mob-expanded' : ''}">
                    <button type="button" class="gacha-mob-telemetry-toggle" id="btn-toggle-mob-telemetry">
                        <span>${(t.mobDetailsToggle || 'Stats & Historique ({n} tirages)').replace('{n}', GState.totalPulls)}</span>
                        <span class="chev">${mobTelemetryOpen ? '▴' : '▾'}</span>
                    </button>
                    <div class="gacha-telemetry-body">
                    <div class="gacha-telemetry-title" style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#a1a1aa;">
                        ${t.statsBarTitle}
                    </div>
                    <div class="gacha-telemetry-stats">
                        <div class="gacha-tstat-card">
                            <span class="gacha-tstat-lbl">${t.statTotalPulls}</span>
                            <span class="gacha-tstat-val">${GState.totalPulls}</span>
                        </div>
                        <div class="gacha-tstat-card">
                            <span class="gacha-tstat-lbl">${t.statTotalS}</span>
                            <span class="gacha-tstat-val" style="color:#facc15;">${GState.totalSPulls || 0}</span>
                        </div>
                        <div class="gacha-tstat-card">
                            <span class="gacha-tstat-lbl">${t.statTotalA}</span>
                            <span class="gacha-tstat-val" style="color:#c084fc;">${GState.totalAPulls || 0}</span>
                        </div>
                        <div class="gacha-tstat-card">
                            <span class="gacha-tstat-lbl">${t.statLuckS}</span>
                            <span class="gacha-tstat-val" style="color:#d7f70c;">${sRateAcct}</span>
                        </div>
                    </div>
                    <div class="gacha-history-strip">
                        ${recentHTML}
                    </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-pull-1').addEventListener('click', () => triggerPull(1));
        document.getElementById('btn-pull-10').addEventListener('click', () => triggerPull(10));
        document.getElementById('btn-open-rates').addEventListener('click', showRatesDetailsModal);
        document.getElementById('btn-open-rates-mob')?.addEventListener('click', showRatesDetailsModal);
        document.getElementById('btn-toggle-mob-telemetry')?.addEventListener('click', () => {
            mobTelemetryOpen = !mobTelemetryOpen;
            const pan = mount.querySelector('.gacha-telemetry-panel');
            if (pan) pan.classList.toggle('mob-expanded', mobTelemetryOpen);
            const chev = mount.querySelector('#btn-toggle-mob-telemetry .chev');
            if (chev) chev.textContent = mobTelemetryOpen ? '▴' : '▾';
        });
        document.getElementById('btn-change-duo').addEventListener('click', () => showTargetSelectorModal(1));
        document.getElementById('tv-screen-slot1').addEventListener('click', () => showTargetSelectorModal(1));
        document.getElementById('tv-screen-slot2').addEventListener('click', () => showTargetSelectorModal(2));

        const histStrip = mount.querySelector('.gacha-history-strip');
        if (histStrip) {
            histStrip.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    histStrip.scrollLeft += e.deltaY;
                }
            }, { passive: false });
        }

        mount.querySelectorAll('[data-h-key]').forEach(el => {
            el.addEventListener('click', () => {
                openItemFromGacha(el.getAttribute('data-h-type'), el.getAttribute('data-h-key'));
            });
        });
    }

    function showTargetSelectorModal(initialSlot = 1) {
        const tm = L().targetModal;
        let slotNum = initialSlot === 2 ? 2 : 1;
        let filterCat = slotNum === 1 ? 'agent' : 'engine';
        let query = '';

        animOverlayEl.classList.add('active');

        function renderTargetGridOnly() {
            const grid = document.getElementById('target-selector-grid');
            if (!grid) return;
            const primaryObj = getPrimaryFeatured();
            const secondaryObj = getSecondaryFeatured(primaryObj);
            const activeKey = slotNum === 1 ? primaryObj.rawKey : (secondaryObj.id || secondaryObj.rawKey);

            let candidates = slotNum === 1
                ? POOL.S_all.filter(i => i.type === 'agent')
                : POOL.S_all.filter(i => i.id !== primaryObj.id);

            if (slotNum === 2 && filterCat !== 'all') {
                candidates = candidates.filter(i => i.type === filterCat);
            }
            if (query.trim()) {
                const q = normSearch(query.trim());
                candidates = candidates.filter(i => normSearch(itemName(i)).includes(q) || normSearch(i.rawKey).includes(q));
            }

            const ordered = [...candidates].reverse().sort((a, b) => {
                const aSel = (slotNum === 1 ? a.rawKey === activeKey : (a.id === activeKey || a.rawKey === activeKey)) ? 1 : 0;
                const bSel = (slotNum === 1 ? b.rawKey === activeKey : (b.id === activeKey || b.rawKey === activeKey)) ? 1 : 0;
                return bSel - aSel;
            });

            grid.innerHTML = ordered.map(it => {
                const isSelected = (slotNum === 1 ? it.rawKey === activeKey : (it.id === activeKey || it.rawKey === activeKey));
                const ownedCount = GState.inventory[it.id]?.count || 0;
                const ownedBadge = ownedCount > 0
                    ? (it.type === 'agent' ? `M${Math.min(6, ownedCount - 1)}` : `×${ownedCount}`)
                    : tm.unownedTag;
                const roleTranslated = (tm.roles && tm.roles[it.role]) || it.role || 'S-Rank';

                return `
                <div class="gacha-col-card rank-S" data-pick-id="${it.id}" data-pick-key="${it.rawKey}"
                     style="${isSelected ? 'border-color:#d7f70c;box-shadow:0 0 20px rgba(215,247,12,0.5);' : ''}">
                    <div class="gacha-col-visual">
                        ${isSelected ? `<span class="gacha-col-rank-tag" style="background:#d7f70c;color:#000;border-color:#000;">${tm.selectedTag}</span>` : (it.type !== 'agent' ? `<span class="gacha-col-rank-tag">S</span>` : '')}
                        <span class="gacha-col-dupe-tag ${ownedCount > 0 ? 'maxed' : ''}">${ownedBadge}</span>
                        <img src="${it.img}" loading="lazy" alt="${itemName(it)}" class="${it.type === 'agent' ? 'is-agent' : 'is-equip'}">
                    </div>
                    <div class="gacha-col-info">
                        <span class="gacha-col-name">${itemName(it)}</span>
                        <span class="gacha-col-sub">${roleTranslated}</span>
                    </div>
                </div>`;
            }).join('');

            grid.querySelectorAll('[data-pick-key]').forEach(card => {
                card.addEventListener('click', () => {
                    if (slotNum === 1) GState.selectedRateUp = card.getAttribute('data-pick-key');
                    else GState.selectedRateUp2 = card.getAttribute('data-pick-id');
                    saveState(GState);
                    renderCurrentTab(false);
                    renderSelectorContent();
                });
            });
        }

        function renderSelectorContent() {
            const primaryObj = getPrimaryFeatured();
            const secondaryObj = getSecondaryFeatured(primaryObj);
            const phText = slotNum === 1 ? (tm.searchPlaceholder1 || tm.searchPlaceholder) : tm.searchPlaceholder;

            animOverlayEl.innerHTML = `
                <div class="gacha-dialog-box">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                        <div>
                            <span class="gacha-patch-tag">${tm.badgeDuo || 'DUO EN VEDETTE • 50/50'}</span>
                            <h2 class="gacha-panel-title">${slotNum === 1 ? tm.title1 : tm.title2}</h2>
                            <p class="gacha-panel-desc">${slotNum === 1 ? tm.subtitle1 : tm.subtitle2}</p>
                        </div>
                        <button type="button" class="gacha-res-btn" id="close-target-modal">${tm.close}</button>
                    </div>

                    <div class="gacha-duo-tabs">
                        <button type="button" class="gacha-duo-tab-btn ${slotNum === 1 ? 'active' : ''}" data-switch-slot="1">
                            ${tm.tabSlot1 || 'Écran #1 : Agent S'} (${itemName(primaryObj)})
                        </button>
                        <button type="button" class="gacha-duo-tab-btn ${slotNum === 2 ? 'active' : ''}" data-switch-slot="2">
                            ${tm.tabSlot2 || 'Écran #2 : Moteur / Agent S'} (${itemName(secondaryObj)})
                        </button>
                    </div>

                    <div class="gacha-col-controls" style="flex-shrink:0;">
                        ${slotNum === 2 ? `
                        <div class="gacha-col-filter-group">
                            <button type="button" class="gacha-col-filter-btn ${filterCat === 'engine' ? 'active' : ''}" data-tcat="engine">${tm.filterEngines}</button>
                            <button type="button" class="gacha-col-filter-btn ${filterCat === 'agent' ? 'active' : ''}" data-tcat="agent">${tm.filterAgents}</button>
                            <button type="button" class="gacha-col-filter-btn ${filterCat === 'all' ? 'active' : ''}" data-tcat="all">${tm.filterAll}</button>
                        </div>` : ''}
                        <input type="text" class="gacha-col-search" id="target-search-inp" placeholder="${phText}" value="${query.replace(/"/g, '&quot;')}" style="flex:1;">
                    </div>

                    <div class="gacha-selector-scroll custom-scrollbar">
                        <div class="gacha-selector-grid" id="target-selector-grid"></div>
                    </div>
                </div>
            `;

            document.getElementById('close-target-modal').addEventListener('click', () => {
                animOverlayEl.classList.remove('active');
            });

            animOverlayEl.querySelectorAll('[data-switch-slot]').forEach(btn => {
                btn.addEventListener('click', () => {
                    slotNum = parseInt(btn.getAttribute('data-switch-slot'), 10) || 1;
                    filterCat = slotNum === 1 ? 'agent' : 'engine';
                    query = '';
                    renderSelectorContent();
                });
            });

            animOverlayEl.querySelectorAll('[data-tcat]').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterCat = btn.getAttribute('data-tcat');
                    animOverlayEl.querySelectorAll('[data-tcat]').forEach(b => b.classList.toggle('active', b === btn));
                    renderTargetGridOnly();
                });
            });

            document.getElementById('target-search-inp')?.addEventListener('input', (e) => {
                query = e.target.value;
                renderTargetGridOnly();
            });

            renderTargetGridOnly();
        }

        renderSelectorContent();
    }

    function showRatesDetailsModal() {
        const r = L().ratesModal;
        animOverlayEl.classList.add('active');
        animOverlayEl.innerHTML = `
            <div class="gacha-dialog-box" style="max-width:640px;">
                <div>
                    <span class="gacha-patch-tag">ZENLESS ZONE ZERO</span>
                    <h2 class="gacha-panel-title">${r.title}</h2>
                    <p class="gacha-panel-desc">${r.subtitle}</p>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;font-size:12.5px;color:#d4d4d8;line-height:1.6;background:#0a0a0e;padding:16px;border-radius:14px;border:1px solid #26262f;">
                    <strong style="color:#d7f70c;text-transform:uppercase;font-size:11px;letter-spacing:0.06em;">${r.rulesTitle}</strong>
                    <p style="margin:0;">${r.ruleS}</p>
                    <p style="margin:0;">${r.rule5050}</p>
                    <p style="margin:0;">${r.ruleA}</p>
                    <p style="margin:0;">${r.ruleB}</p>
                </div>
                <button type="button" class="gacha-res-btn primary" id="close-rates-modal" style="align-self:flex-end;">${r.close}</button>
            </div>
        `;
        document.getElementById('close-rates-modal').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });
    }

    // ==========================================
    // 8. ONGLET 2 : 6 QUÊTES QUOTIDIENNES + HAUTS FAITS INFINIS
    // ==========================================
    function renderQuestsTab(mount) {
        const prevScroll = mount.scrollTop;
        const t = L().quests;
        const d = GState.daily;

        const QUEST_SVGS = {
            q1: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d7f70c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>`,
            q2: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
            q3: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><circle cx="11" cy="11" r="3"/></svg>`,
            q4: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
            q5: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
            q6: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
        };

        const ACH_SVGS = [
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d7f70c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
            `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2 12 2"/></svg>`
        ];

        const dailyList = [
            { id: 'q1', icon: QUEST_SVGS.q1, title: t.q1Title, desc: t.q1Desc, progress: d.visitDone ? 1 : 0, max: 1, reward: 400, claimed: !!d.claimed.q1 },
            { id: 'q2', icon: QUEST_SVGS.q2, title: t.q2Title, desc: t.q2Desc, progress: Math.min(3, d.guidesOpened.length), max: 3, reward: 400, claimed: !!d.claimed.q2 },
            { id: 'q3', icon: QUEST_SVGS.q3, title: t.q3Title, desc: t.q3Desc, progress: Math.min(2, d.itemsInspected.length), max: 2, reward: 400, claimed: !!d.claimed.q3 },
            { id: 'q4', icon: QUEST_SVGS.q4, title: t.q4Title, desc: t.q4Desc, progress: Math.min(1, d.pullsToday || 0), max: 1, reward: 300, claimed: !!d.claimed.q4 },
            { id: 'q5', icon: QUEST_SVGS.q5, title: t.q5Title, desc: t.q5Desc, progress: Math.min(6, d.guidesOpened.length), max: 6, reward: 450, claimed: !!d.claimed.q5 },
            { id: 'q6', icon: QUEST_SVGS.q6, title: t.q6Title, desc: t.q6Desc, progress: Math.min(10, d.pullsToday || 0), max: 10, reward: 450, claimed: !!d.claimed.q6 }
        ];

        const achList = Object.keys(ACH_CONFIG).map((key, idx) => {
            const num = idx + 1;
            const tierIdx = GState.achievements?.[key] || 0;
            const info = getAchTierData(key, tierIdx, GState);
            return {
                id: key,
                icon: ACH_SVGS[idx] || ACH_SVGS[0],
                tier: info.tier,
                title: t[`a${num}Title`],
                desc: (t[`a${num}Desc`] || '').replace('{target}', info.target),
                progress: Math.min(info.target, info.currentVal),
                max: info.target,
                reward: info.reward
            };
        });

        // Tri intelligent : 1. Prêt à récupérer -> 2. En cours -> 3. Terminé en bas !
        const sortedDaily = [...dailyList].sort((a, b) => {
            const aState = (a.progress >= a.max && !a.claimed) ? 0 : (!a.claimed ? 1 : 2);
            const bState = (b.progress >= b.max && !b.claimed) ? 0 : (!b.claimed ? 1 : 2);
            return aState - bState;
        });

        const sortedAch = [...achList].sort((a, b) => {
            const aReady = a.progress >= a.max ? 1 : 0;
            const bReady = b.progress >= b.max ? 1 : 0;
            if (aReady !== bReady) return bReady - aReady;
            return (b.progress / (b.max || 1)) - (a.progress / (a.max || 1));
        });

        const dailyEarnedPoly = dailyList.filter(q => q.claimed).reduce((acc, q) => acc + q.reward, 0);
        const dailyTotalPoly = dailyList.reduce((acc, q) => acc + q.reward, 0);
        const dailyEarnedPct = Math.round((dailyEarnedPoly / dailyTotalPoly) * 100);

        const claimableDailyCount = dailyList.filter(q => q.progress >= q.max && !q.claimed).length;
        const claimableAchCount = achList.filter(a => a.progress >= a.max).length;
        const totalClaimable = claimableDailyCount + claimableAchCount;
        const capInfoText = (t.dailyCapInfo || 'Guides du jour : {n} / 10').replace('{n}', Math.min(DAILY_GUIDE_CAP, d.guidesOpened.length));

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-quest-mob-bar">
                    <div class="gacha-quest-mob-tabs">
                        <button type="button" class="gacha-qmob-tab ${questMobTab === 'daily' ? 'active' : ''}" data-qmob="daily">
                            <span>${t.tabDaily || 'Quotidiennes'}</span>
                            ${claimableDailyCount > 0 ? `<span class="gacha-qmob-badge">${claimableDailyCount}</span>` : ''}
                        </button>
                        <button type="button" class="gacha-qmob-tab ${questMobTab === 'ach' ? 'active' : ''}" data-qmob="ach">
                            <span>${t.tabAch || 'Hauts Faits'}</span>
                            ${claimableAchCount > 0 ? `<span class="gacha-qmob-badge">${claimableAchCount}</span>` : ''}
                        </button>
                    </div>
                    ${totalClaimable > 0 ? `<button type="button" id="btn-claim-all-mob" class="gacha-claim-btn can-claim" style="width:100%;">${(t.claimAll || 'Tout récupérer ({n})').replace('{n}', totalClaimable)}</button>` : ''}
                </div>
                <div class="gacha-quests-split">
                    <div class="gacha-quest-column ${questMobTab !== 'daily' ? 'mob-hidden-col' : ''}" data-qcol="daily">
                        <div class="gacha-sec-header">
                            <div>
                                <h2 class="gacha-sec-title">${t.dailyHeader}</h2>
                                <p class="gacha-sec-sub">${t.dailySub}</p>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                ${totalClaimable > 0 ? `<button type="button" id="btn-claim-all" class="gacha-claim-btn can-claim">${(t.claimAll || 'Tout récupérer ({n})').replace('{n}', totalClaimable)}</button>` : ''}
                                <span class="gacha-reset-pill" style="color:#38bdf8;">${capInfoText}</span>
                                <span class="gacha-reset-pill">${t.resetLabel}</span>
                            </div>
                        </div>

                        <div class="gacha-daily-summary-banner">
                            <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;font-weight:900;">
                                <span style="color:#e4e4e7;">${t.dailyEarnedHeader || 'RÉCOMPENSES QUOTIDIENNES OBTENUES'}</span>
                                <span style="font-family:monospace;color:#d7f70c;">${dailyEarnedPoly} / ${dailyTotalPoly} POLYCHROMES (${dailyEarnedPct}%)</span>
                            </div>
                            <div class="gacha-quest-bar-track" style="height:6px;">
                                <div class="gacha-quest-bar-fill" style="width:${dailyEarnedPct}%;background:#d7f70c;"></div>
                            </div>
                        </div>

                        <div class="gacha-quest-list">
                            ${sortedDaily.map(q => {
                                const isDone = q.progress >= q.max;
                                const canClaim = isDone && !q.claimed;
                                const pct = Math.min(100, Math.round((q.progress / q.max) * 100));
                                return `
                                <div class="gacha-quest-card ${canClaim ? 'ready' : ''} ${q.claimed ? 'is-claimed-card' : ''}">
                                    <div class="gacha-quest-body">
                                        <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
                                            <div class="gacha-quest-icon-box">${q.icon}</div>
                                            <div style="flex:1;min-width:0;">
                                                <div class="gacha-quest-top">
                                                    <span class="gacha-quest-name">${q.title}</span>
                                                    <span class="gacha-quest-prog ${isDone ? 'done' : ''}">${q.progress} / ${q.max}</span>
                                                </div>
                                                <p class="gacha-quest-desc">${q.desc}</p>
                                            </div>
                                        </div>
                                        <div class="gacha-quest-actions">
                                            <div class="gacha-reward-box">
                                                <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                                                <span>+${q.reward}</span>
                                            </div>
                                            <button type="button" data-claim-daily="${q.id}" data-reward="${q.reward}" ${!canClaim ? 'disabled' : ''}
                                                class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}">
                                                ${q.claimed ? t.claimed : (canClaim ? t.claim : t.inProgress)}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="gacha-quest-bar-track">
                                        <div class="gacha-quest-bar-fill" style="width:${pct}%;background:${q.claimed ? '#22c55e' : (canClaim ? '#d7f70c' : '#38bdf8')};"></div>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>

                    <div class="gacha-quest-column ${questMobTab !== 'ach' ? 'mob-hidden-col' : ''}" data-qcol="ach">
                        <div class="gacha-sec-header">
                            <div>
                                <h2 class="gacha-sec-title">${t.achHeader}</h2>
                                <p class="gacha-sec-sub">${t.achSub}</p>
                            </div>
                        </div>
                        <div class="gacha-quest-list">
                            ${sortedAch.map(a => {
                                const canClaim = a.progress >= a.max;
                                const pct = Math.min(100, Math.round((a.progress / a.max) * 100));
                                return `
                                <div class="gacha-quest-card ${canClaim ? 'ready' : ''}">
                                    <div class="gacha-quest-body">
                                        <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
                                            <div class="gacha-quest-icon-box">${a.icon}</div>
                                            <div style="flex:1;min-width:0;">
                                                <div class="gacha-quest-top">
                                                    <span class="gacha-quest-name">${a.title}</span>
                                                    <span class="gacha-quest-prog" style="color:#38bdf8;">${t.tierLabel.replace('{n}', a.tier)}</span>
                                                    <span class="gacha-quest-prog ${canClaim ? 'done' : ''}">${a.progress} / ${a.max}</span>
                                                </div>
                                                <p class="gacha-quest-desc">${a.desc}</p>
                                            </div>
                                        </div>
                                        <div class="gacha-quest-actions">
                                            <div class="gacha-reward-box">
                                                <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                                                <span>+${a.reward}</span>
                                            </div>
                                            <button type="button" data-claim-ach="${a.id}" ${!canClaim ? 'disabled' : ''}
                                                class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}">
                                                ${canClaim ? t.claim : t.inProgress}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="gacha-quest-bar-track">
                                        <div class="gacha-quest-bar-fill" style="width:${pct}%;background:${canClaim ? '#d7f70c' : '#c084fc'};"></div>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        mount.scrollTop = prevScroll;

        mount.querySelectorAll('[data-qmob]').forEach(btn => {
            btn.addEventListener('click', () => {
                questMobTab = btn.getAttribute('data-qmob');
                mount.querySelectorAll('[data-qmob]').forEach(b => b.classList.toggle('active', b === btn));
                mount.querySelectorAll('[data-qcol]').forEach(col => {
                    col.classList.toggle('mob-hidden-col', col.getAttribute('data-qcol') !== questMobTab);
                });
            });
        });

        const executeClaimAll = () => {
                let gained = 0;
                dailyList.forEach(q => {
                    if (q.progress >= q.max && !GState.daily.claimed[q.id]) {
                        GState.daily.claimed[q.id] = true;
                        GState.polychromes += q.reward;
                        gained += q.reward;
                    }
                });
                Object.keys(ACH_CONFIG).forEach((key) => {
                    let tierIdx = GState.achievements[key] || 0;
                    let info = getAchTierData(key, tierIdx, GState);
                    while (info.currentVal >= info.target) {
                        GState.polychromes += info.reward;
                        gained += info.reward;
                        tierIdx++;
                        GState.achievements[key] = tierIdx;
                        info = getAchTierData(key, tierIdx, GState);
                    }
                });
                saveState(GState);
                renderQuestsTab(mount);
                updateTopCurrencies();
                if (gained > 0) showGachaToast(`+${gained} Polychromes`);
        };
        document.getElementById('btn-claim-all')?.addEventListener('click', executeClaimAll);
        document.getElementById('btn-claim-all-mob')?.addEventListener('click', executeClaimAll);

        mount.querySelectorAll('[data-claim-daily]').forEach(btn => {
            btn.addEventListener('click', () => {
                const qId = btn.getAttribute('data-claim-daily');
                const reward = parseInt(btn.getAttribute('data-reward'), 10) || 0;
                if (!GState.daily.claimed[qId]) {
                    GState.daily.claimed[qId] = true;
                    GState.polychromes += reward;
                    saveState(GState);
                    renderQuestsTab(mount);
                    updateTopCurrencies();
                    showGachaToast(`+${reward} Polychromes`);
                }
            });
        });

        mount.querySelectorAll('[data-claim-ach]').forEach(btn => {
            btn.addEventListener('click', () => {
                const aId = btn.getAttribute('data-claim-ach');
                const tierIdx = GState.achievements[aId] || 0;
                const info = getAchTierData(aId, tierIdx, GState);
                if (info.currentVal >= info.target) {
                    GState.polychromes += info.reward;
                    GState.achievements[aId] = tierIdx + 1;
                    saveState(GState);
                    renderQuestsTab(mount);
                    updateTopCurrencies();
                    showGachaToast(`+${info.reward} Polychromes`);
                }
            });
        });
    }

    // ==========================================
    // 9. ONGLET 3 : MAGASIN DE SIGNAUX
    // ==========================================
    function renderShopTab(mount) {
        const t = L().shop;
        const maxResTapes = Math.floor(GState.residual / 20);
        const maxPolyTapes = Math.min(10, Math.floor(GState.polychromes / 160));
        const freeClaimed = !!GState.daily.freePackClaimed;
        const { totalExcess, totalGain } = computeOvercapSurplus();

        const feat1 = getPrimaryFeatured();
        const sAgents = POOL.S_all.filter(i => i.type === 'agent');
        const sEngines = POOL.S_all.filter(i => i.type === 'engine');
        const aAgents = POOL.A_all.filter(i => i.type === 'agent');

        const agLeft = sAgents[sAgents.length - 3] || feat1;
        const agCenter = feat1;
        const agRight = sAgents[sAgents.length - 2] || feat1;

        const engLeft = sEngines[0] || { img: ASSETS.tape };
        const engCenter = sEngines[Math.floor(sEngines.length / 2)] || engLeft;
        const engRight = sEngines[sEngines.length - 1] || engLeft;

        const aLeftImg = aAgents[0]?.img || 'assets/Agents/Nicole.webp';
        const aCenterImg = aAgents[1]?.img || 'assets/Agents/Anby.webp';
        const aRightImg = aAgents[2]?.img || 'assets/Agents/Billy.webp';

        const curRes = GState.residual || 0;

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-sec-header">
                    <div>
                        <h2 class="gacha-sec-title">${t.title}</h2>
                        <p class="gacha-sec-sub">${t.subtitle}</p>
                    </div>
                </div>

                <div class="gacha-shop-grid">
                    <div class="gacha-shop-card theme-cyan">
                        <span class="gacha-shop-badge">${t.freeBadge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.freeTitle}</h3>
                        <p class="gacha-shop-item-desc">${t.freeDesc}</p>
                        <span class="gacha-shop-cost-lbl">${t.freeCost}</span>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-free-pack" class="gacha-shop-btn primary-cyan" ${freeClaimed ? 'disabled' : ''}>
                                ${freeClaimed ? t.freeClaimed : t.freeClaim}
                            </button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-yellow">
                        <span class="gacha-shop-badge">${t.card1Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <img src="${ASSETS.tape}" ${iconFallback('tape')}>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card1Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card1Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card1Cost}</span>
                        <div class="gacha-shop-btn-row">
                            <button type="button" id="buy-tape-1" class="gacha-shop-btn primary-yellow" ${GState.polychromes < 160 ? 'disabled' : ''}>${t.buy1}</button>
                            <button type="button" id="buy-tape-multi" class="gacha-shop-btn secondary-yellow" ${maxPolyTapes < 2 ? 'disabled' : ''}>
                                ${maxPolyTapes >= 10 || maxPolyTapes < 2 ? t.buy10 : t.buyMaxPoly.replace('{n}', maxPolyTapes).replace('{cost}', maxPolyTapes * 160)}
                            </button>
                        </div>
                    </div>

                    <div class="gacha-shop-card ${totalGain > 0 ? 'theme-emerald' : 'theme-purple'}">
                        <span class="gacha-shop-badge">${totalGain > 0 ? t.cardRecycleBadge : t.card2Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <img src="${ASSETS.tape}" ${iconFallback('tape')}>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card2Title}</h3>
                        <p class="gacha-shop-item-desc">${totalGain > 0 ? t.cardRecycleDesc : t.card2Desc}</p>
                        <span class="gacha-shop-cost-lbl">
                            ${totalGain > 0 ? t.cardRecycleReady.replace('{count}', totalExcess).replace('{gain}', totalGain) : t.card2Cost}
                        </span>
                        <div class="gacha-shop-btn-row">
                            <button type="button" id="buy-res-1" class="gacha-shop-btn primary-purple" ${curRes < 20 ? 'disabled' : ''}>
                                ${t.buyResidual1}
                            </button>
                            ${totalGain > 0 ? `
                            <button type="button" id="btn-recycle-surplus" class="gacha-shop-btn primary-emerald">
                                ${t.btnRecycle.replace('{gain}', totalGain)}
                            </button>` : `
                            <button type="button" id="buy-res-max" class="gacha-shop-btn secondary-purple" ${maxResTapes < 2 ? 'disabled' : ''}>
                                ${t.buyResidualMax.replace('{n}', Math.max(0, maxResTapes))}
                            </button>`}
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-purple">
                        <span class="gacha-shop-badge">${t.card3Badge}</span>
                        <div class="gacha-shop-Showcase-trio">
                            <div class="gacha-shop-trio-item"><img src="${aLeftImg}" alt="A"></div>
                            <div class="gacha-shop-trio-item center"><img src="${aCenterImg}" alt="A"></div>
                            <div class="gacha-shop-trio-item"><img src="${aRightImg}" alt="A"></div>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card3Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card3Desc}</p>
                        <div class="gacha-shop-cost-wrap">
                            <span class="gacha-shop-cost-lbl">${t.card3Cost.replace('{cur}', curRes)}</span>
                            <div class="gacha-shop-prog-bar"><div class="gacha-shop-prog-fill" style="width:${Math.min(100, Math.round(curRes / 80 * 100))}%"></div></div>
                        </div>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-box-a" class="gacha-shop-btn primary-purple" ${curRes < 80 ? 'disabled' : ''}>${t.buyBoxA}</button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-gold">
                        <span class="gacha-shop-badge">${t.card4Badge}</span>
                        <div class="gacha-shop-Showcase-trio">
                            <div class="gacha-shop-trio-item"><img src="${engLeft.img}" class="contain-mode" alt="W-S"></div>
                            <div class="gacha-shop-trio-item center"><img src="${engCenter.img}" class="contain-mode" alt="W-S"></div>
                            <div class="gacha-shop-trio-item"><img src="${engRight.img}" class="contain-mode" alt="W-S"></div>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card4Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card4Desc}</p>
                        <div class="gacha-shop-cost-wrap">
                            <span class="gacha-shop-cost-lbl">${t.card4Cost.replace('{cur}', curRes)}</span>
                            <div class="gacha-shop-prog-bar"><div class="gacha-shop-prog-fill" style="width:${Math.min(100, Math.round(curRes / 300 * 100))}%"></div></div>
                        </div>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-select-engine" class="gacha-shop-btn ${curRes >= 300 ? 'primary-gold' : 'secondary-gold'}">
                                ${curRes >= 300 ? t.buySelectEngine : t.previewEngine.replace('{cur}', curRes)}
                            </button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-gold">
                        <span class="gacha-shop-badge">${t.card5Badge}</span>
                        <div class="gacha-shop-Showcase-trio">
                            <div class="gacha-shop-trio-item"><img src="${agLeft.img}" alt="S"></div>
                            <div class="gacha-shop-trio-item center"><img src="${agCenter.img}" alt="S"></div>
                            <div class="gacha-shop-trio-item"><img src="${agRight.img}" alt="S"></div>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card5Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card5Desc}</p>
                        <div class="gacha-shop-cost-wrap">
                            <span class="gacha-shop-cost-lbl">${t.card5Cost.replace('{cur}', curRes)}</span>
                            <div class="gacha-shop-prog-bar"><div class="gacha-shop-prog-fill" style="width:${Math.min(100, Math.round(curRes / 500 * 100))}%"></div></div>
                        </div>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-select-agent" class="gacha-shop-btn ${curRes >= 500 ? 'primary-gold' : 'secondary-gold'}">
                                ${curRes >= 500 ? t.buySelectAgent : t.previewAgent.replace('{cur}', curRes)}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const isEnShop = getLang() === 'en';

        document.getElementById('buy-free-pack').addEventListener('click', () => {
            if (!GState.daily.freePackClaimed) {
                GState.daily.freePackClaimed = true;
                GState.polychromes += 320;
                GState.residual += 20;
                GState.totalDupesRes = (GState.totalDupesRes || 0) + 20;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
                showGachaToast(isEnShop ? '+320 Polychromes & +20 ✦ claimed' : '+320 Polychromes & +20 ✦ récupérés');
            }
        });

        document.getElementById('buy-tape-1').addEventListener('click', () => {
            if (GState.polychromes >= 160) {
                GState.polychromes -= 160;
                GState.tapes += 1;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
                showGachaToast(isEnShop ? '+1 Encrypted Master Tape' : '+1 Bande maîtresse chiffrée');
            }
        });

        document.getElementById('buy-tape-multi').addEventListener('click', () => {
            const count = Math.min(10, Math.floor(GState.polychromes / 160));
            if (count >= 2) {
                GState.polychromes -= count * 160;
                GState.tapes += count;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
                showGachaToast(isEnShop ? `+${count} Encrypted Master Tapes` : `+${count} Bandes maîtresses chiffrées`);
            }
        });

        document.getElementById('buy-res-1').addEventListener('click', () => {
            if (GState.residual >= 20) {
                GState.residual -= 20;
                GState.tapes += 1;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
                showGachaToast(isEnShop ? '+1 Master Tape (-20 ✦)' : '+1 Bande maîtresse (-20 ✦)');
            }
        });

        const buyResMaxBtn = document.getElementById('buy-res-max');
        if (buyResMaxBtn) {
            buyResMaxBtn.addEventListener('click', () => {
                const count = Math.floor(GState.residual / 20);
                if (count >= 2) {
                    GState.residual -= count * 20;
                    GState.tapes += count;
                    saveState(GState);
                    renderShopTab(mount);
                    updateTopCurrencies();
                    showGachaToast(isEnShop ? `+${count} Master Tapes (-${count * 20} ✦)` : `+${count} Bandes maîtresses (-${count * 20} ✦)`);
                }
            });
        }

        const recycleBtn = document.getElementById('btn-recycle-surplus');
        if (recycleBtn) {
            recycleBtn.addEventListener('click', () => {
                const { totalGain } = computeOvercapSurplus();
                if (totalGain > 0) {
                    const agentBuilds = Object.values(GState.buildSystem?.agentBuilds || {});
                    Object.values(GState.inventory || {}).forEach(it => {
                        if (it.type === 'agent' && (it.count || 0) > 7) {
                            it.count = 7;
                        } else if (it.type === 'engine') {
                            const equippedCount = agentBuilds.filter(ab => ab && ab.engineKey === it.rawKey).length;
                            const keepCap = Math.max(5, equippedCount);
                            if ((it.count || 0) > keepCap) {
                                it.count = keepCap;
                            }
                        }
                    });
                    GState.residual += totalGain;
                    GState.totalDupesRes = (GState.totalDupesRes || 0) + totalGain;
                    saveState(GState);
                    renderShopTab(mount);
                    updateTopCurrencies();
                    showGachaToast(isEnShop ? `Surplus recycled (+${totalGain} ✦)` : `Surplus recyclés (+${totalGain} ✦)`);
                }
            });
        }

        document.getElementById('buy-box-a').addEventListener('click', () => {
            const boxAPool = POOL.A_all.filter(i => i.type === 'agent' || i.type === 'engine');
            if (GState.residual >= 80 && boxAPool.length > 0) {
                GState.residual -= 80;
                const won = registerItemToInventory(pickRandom(boxAPool));
                saveState(GState);
                updateTopCurrencies();
                renderSearchResultsScreen([won], true);
                animOverlayEl.classList.add('active');
            }
        });

        document.getElementById('buy-select-engine').addEventListener('click', () => {
            openShopSelectorModal('engine', 300, t.selectorEngineTitle);
        });

        document.getElementById('buy-select-agent').addEventListener('click', () => {
            openShopSelectorModal('agent', 500, t.selectorAgentTitle);
        });
    }

    function openShopSelectorModal(targetType, cost, titleText) {
        const t = L().shop;
        const tm = L().targetModal;
        const canAfford = (GState.residual || 0) >= cost;
        const missing = Math.max(0, cost - (GState.residual || 0));
        let query = '';

        animOverlayEl.classList.add('active');

        function renderShopGridOnly() {
            const grid = document.getElementById('shop-selector-grid');
            if (!grid) return;
            let items = [...POOL.S_all.filter(i => i.type === targetType)].reverse();
            if (query.trim()) {
                const q = normSearch(query.trim());
                items = items.filter(i => normSearch(itemName(i)).includes(q) || normSearch(i.rawKey).includes(q));
            }
            grid.innerHTML = items.map(it => {
                const owned = GState.inventory[it.id]?.count || 0;
                const badge = owned > 0 ? (it.type === 'agent' ? `M${Math.min(6, owned - 1)}` : `×${owned}`) : tm.unownedTag;
                return `
                <div class="gacha-col-card rank-S" data-shop-pick="${it.id}">
                    <div class="gacha-col-visual">
                        ${it.type !== 'agent' ? `<span class="gacha-col-rank-tag">S</span>` : ''}
                        <span class="gacha-col-dupe-tag ${owned > 0 ? 'maxed' : ''}">${badge}</span>
                        <img src="${it.img}" loading="lazy" class="${it.type === 'agent' ? 'is-agent' : 'is-equip'}">
                    </div>
                    <div class="gacha-col-info">
                        <span class="gacha-col-name">${itemName(it)}</span>
                        <span class="gacha-col-sub">${canAfford ? `${cost} ✦` : ((tm.roles && tm.roles[it.role]) || it.role || 'S-Rank')}</span>
                    </div>
                </div>`;
            }).join('');

            grid.querySelectorAll('[data-shop-pick]').forEach(card => {
                card.addEventListener('click', () => {
                    const pickedId = card.getAttribute('data-shop-pick');
                    const chosen = POOL.S_all.find(i => i.id === pickedId);
                    if (!chosen) return;
                    if (GState.residual >= cost) {
                        GState.residual -= cost;
                        const won = registerItemToInventory(chosen);
                        saveState(GState);
                        updateTopCurrencies();
                        renderSearchResultsScreen([won], true);
                    } else {
                        animOverlayEl.classList.remove('active');
                        openItemFromGacha(chosen.type, chosen.rawKey);
                    }
                });
            });
        }

        function renderCatalog() {
            animOverlayEl.innerHTML = `
                <div class="gacha-dialog-box">
                    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                        <div>
                            <span class="gacha-patch-tag">SIGNAL SHOP • ${GState.residual} / ${cost} ✦</span>
                            <h2 class="gacha-panel-title">${titleText}</h2>
                            ${!canAfford ? `<p class="gacha-panel-desc" style="color:#facc15;font-weight:700;">⚠️ ${t.selectorInsufficient.replace('{missing}', missing)}</p>` : ''}
                        </div>
                        <button type="button" class="gacha-res-btn" id="close-shop-selector">${tm.close}</button>
                    </div>

                    <div class="gacha-col-controls" style="flex-shrink:0;">
                        <input type="text" class="gacha-col-search" id="shop-cat-search" placeholder="${tm.searchPlaceholder}" value="${query.replace(/"/g, '&quot;')}" style="width:100%;">
                    </div>

                    <div class="gacha-selector-scroll custom-scrollbar">
                        <div class="gacha-selector-grid" id="shop-selector-grid"></div>
                    </div>
                </div>
            `;

            document.getElementById('close-shop-selector').addEventListener('click', () => {
                animOverlayEl.classList.remove('active');
            });

            document.getElementById('shop-cat-search')?.addEventListener('input', (e) => {
                query = e.target.value;
                renderShopGridOnly();
            });

            renderShopGridOnly();
        }

        renderCatalog();
    }

    // ==========================================
    // 10. ONGLET 4 : COLLECTION
    // ==========================================
    function renderCollectionTab(mount) {
        const t = L().collection;
        const inv = GState.inventory || {};

        const catalog = POOL.allCatalog;
        const totalAll = catalog.length || 1;
        const unlockedAll = catalog.filter(c => inv[c.id]?.count > 0).length;

        const agentsCat = catalog.filter(c => c.type === 'agent');
        const unlockedAgents = agentsCat.filter(c => inv[c.id]?.count > 0).length;

        const enginesCat = catalog.filter(c => c.type === 'engine');
        const unlockedEngines = enginesCat.filter(c => inv[c.id]?.count > 0).length;

        const discsCat = catalog.filter(c => c.type === 'disc');
        const unlockedDiscs = discsCat.filter(c => inv[c.id]?.count > 0).length;

        const rankWeight = { S: 0, A: 1, B: 2 };
        const typeWeight = { agent: 0, engine: 1, disc: 2 };
        const acElems = L().agentCard?.elements || {};
        const tmRoles = L().targetModal?.roles || {};

        const typeLabel = (tp) => tp === 'agent' ? t.typeAgent : (tp === 'engine' ? t.typeEngine : t.typeDisc);

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-sec-header">
                    <div>
                        <h2 class="gacha-sec-title">${t.title}</h2>
                        <p class="gacha-sec-sub">${t.subtitle}</p>
                    </div>
                </div>

                <div class="gacha-col-stats-bar">
                    <div class="gacha-col-stat-box is-primary-stat">
                        <div class="gacha-col-stat-top"><span>${t.totalUnlocked}</span><strong>${unlockedAll}/${totalAll}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedAll / totalAll * 100)}%"></div></div>
                    </div>
                    <div class="gacha-col-stat-box is-sub-stat">
                        <div class="gacha-col-stat-top"><span>${t.filterAgents}</span><strong>${unlockedAgents}/${agentsCat.length}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedAgents / (agentsCat.length || 1) * 100)}%"></div></div>
                    </div>
                    <div class="gacha-col-stat-box is-sub-stat">
                        <div class="gacha-col-stat-top"><span>${t.filterEngines}</span><strong>${unlockedEngines}/${enginesCat.length}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedEngines / (enginesCat.length || 1) * 100)}%;background:#c084fc;"></div></div>
                    </div>
                    <div class="gacha-col-stat-box is-sub-stat">
                        <div class="gacha-col-stat-top"><span>${t.filterDiscs}</span><strong>${unlockedDiscs}/${discsCat.length}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedDiscs / (discsCat.length || 1) * 100)}%;background:#38bdf8;"></div></div>
                    </div>
                </div>

                <div class="gacha-col-controls">
                    <div class="gacha-col-filter-group">
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'all' ? 'active' : ''}" data-cfilter="all">${t.filterAll}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'agent' ? 'active' : ''}" data-cfilter="agent">${t.filterAgents}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'engine' ? 'active' : ''}" data-cfilter="engine">${t.filterEngines}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'disc' ? 'active' : ''}" data-cfilter="disc">${t.filterDiscs}</button>
                    </div>
                    <div class="gacha-col-filter-group">
                        <button type="button" class="gacha-col-filter-btn ${colFilterRank === 'all' ? 'active' : ''}" data-rfilter="all">${t.rankAll}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterRank === 'S' ? 'active' : ''}" data-rfilter="S">S</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterRank === 'A' ? 'active' : ''}" data-rfilter="A">A</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterRank === 'B' ? 'active' : ''}" data-rfilter="B">B</button>
                    </div>
                    <input type="text" class="gacha-col-search" id="col-search-input" placeholder="${t.searchPlaceholder}" value="${colSearchQuery.replace(/"/g, '&quot;')}">
                    <label class="gacha-col-toggle-locked">
                        <input type="checkbox" id="toggle-show-locked" ${colShowLocked ? 'checked' : ''}>
                        <span>${t.showLocked}</span>
                    </label>
                </div>

                <div id="gacha-col-grid-wrap"></div>
            </div>
        `;

        function renderCollectionGridOnly() {
            const wrap = document.getElementById('gacha-col-grid-wrap');
            if (!wrap) return;

            let filtered = catalog.map(item => {
                const owned = inv[item.id];
                return { ...item, count: owned ? owned.count : 0, unlocked: !!(owned && owned.count > 0) };
            });

            if (colFilterType !== 'all') filtered = filtered.filter(i => i.type === colFilterType);
            if (colFilterRank !== 'all') filtered = filtered.filter(i => i.rank === colFilterRank);
            if (!colShowLocked) filtered = filtered.filter(i => i.unlocked);
            if (colSearchQuery.trim()) {
                const q = normSearch(colSearchQuery.trim());
                filtered = filtered.filter(i =>
                    normSearch(itemName(i)).includes(q)
                    || normSearch(i.rawKey).includes(q)
                    || normSearch(acElems[i.element] || i.element).includes(q)
                    || normSearch(tmRoles[i.role] || i.role).includes(q)
                );
            }

            filtered.sort((a, b) => {
                if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
                const rw = (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9);
                if (rw !== 0) return rw;
                const tw = (typeWeight[a.type] ?? 9) - (typeWeight[b.type] ?? 9);
                if (tw !== 0) return tw;
                return b.count - a.count;
            });

            if (filtered.length === 0) {
                wrap.innerHTML = `<div style="text-align:center;padding:44px 10px;color:#71717a;font-weight:700;">${t.emptyFilter}</div>`;
                return;
            }

            wrap.innerHTML = `<div class="gacha-col-grid">${filtered.map(it => {
                let progBadge = '';
                let isMax = false;
                if (it.unlocked) {
                    if (it.type === 'agent') {
                        const mLvl = Math.min(6, it.count - 1);
                        isMax = mLvl >= 6;
                        progBadge = isMax ? `M6 MAX` : `M${mLvl}`;
                    } else {
                        progBadge = `×${it.count}`;
                    }
                } else {
                    progBadge = t.lockedLabel;
                }

                const rankBadgeHTML = it.type !== 'agent' ? `<span class="gacha-col-rank-tag">${it.rank}</span>` : '';

                let buildBadgeHTML = '';
                if (it.unlocked && it.type === 'agent') {
                    const ab = GState.buildSystem?.agentBuilds?.[it.rawKey];
                    const eqDiscs = ab?.discs ? Object.values(ab.discs).filter(Boolean).length : 0;
                    const hasEng = !!ab?.engineKey;
                    if (eqDiscs > 0 || hasEng) {
                        const isFull = eqDiscs === 6 && hasEng;
                        buildBadgeHTML = `<span class="zb-col-build-badge ${isFull ? 'is-full' : ''}">${eqDiscs}/6</span>`;
                    }
                }

                const elemTxt = acElems[it.element] || it.element || '';
                const roleTxt = tmRoles[it.role] || it.role || typeLabel(it.type);
                const subText = it.type === 'agent'
                    ? `${elemTxt} • ${roleTxt}`
                    : (it.type === 'engine' && it.role ? roleTxt : typeLabel(it.type));

                return `
                <div class="gacha-col-card rank-${it.rank} ${it.unlocked ? '' : 'is-locked'}"
                     data-col-type="${it.type}" data-col-key="${it.rawKey}">
                    <div class="gacha-col-visual">
                        ${rankBadgeHTML}
                        ${buildBadgeHTML}
                        <span class="gacha-col-dupe-tag ${isMax ? 'maxed' : ''}">${progBadge}</span>
                        <img src="${it.img}" loading="lazy" alt="${itemName(it)}" class="${it.type === 'agent' ? 'is-agent' : 'is-equip'}">
                    </div>
                    <div class="gacha-col-info">
                        <span class="gacha-col-name">${itemName(it)}</span>
                        <span class="gacha-col-sub">${subText}</span>
                    </div>
                </div>`;
            }).join('')}</div>`;

            wrap.querySelectorAll('[data-col-type]').forEach(card => {
                card.addEventListener('click', () => {
                    const type = card.getAttribute('data-col-type');
                    const key = card.getAttribute('data-col-key');
                    const isUnlocked = !card.classList.contains('is-locked');
                    if (type === 'agent' && isUnlocked && window.ZZZBuilds?.openAgentBuild) {
                        window.ZZZBuilds.openAgentBuild(key);
                        return;
                    }
                    openItemFromGacha(type, key);
                });
            });
        }

        mount.querySelectorAll('[data-cfilter]').forEach(btn => {
            btn.addEventListener('click', () => {
                colFilterType = btn.getAttribute('data-cfilter');
                mount.querySelectorAll('[data-cfilter]').forEach(b => b.classList.toggle('active', b === btn));
                renderCollectionGridOnly();
            });
        });

        mount.querySelectorAll('[data-rfilter]').forEach(btn => {
            btn.addEventListener('click', () => {
                colFilterRank = btn.getAttribute('data-rfilter');
                mount.querySelectorAll('[data-rfilter]').forEach(b => b.classList.toggle('active', b === btn));
                renderCollectionGridOnly();
            });
        });

        document.getElementById('col-search-input')?.addEventListener('input', (e) => {
            colSearchQuery = e.target.value;
            renderCollectionGridOnly();
        });

        document.getElementById('toggle-show-locked')?.addEventListener('change', (e) => {
            colShowLocked = e.target.checked;
            renderCollectionGridOnly();
        });

        renderCollectionGridOnly();
    }

    // ==========================================
    // 11. MODALE DE SAUVEGARDE / TRANSFERT
    // ==========================================
    function encodeBackupCode(stateObj) {
        try {
            const bytes = new TextEncoder().encode(JSON.stringify(stateObj));
            let bin = '';
            for (let i = 0; i < bytes.length; i += 0x8000) {
                bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
            }
            return btoa(bin);
        } catch (e) {
            return '';
        }
    }

    function decodeBackupCode(str) {
        try {
            const bin = atob(str.trim());
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return JSON.parse(new TextDecoder().decode(bytes));
        } catch (e) {
            try {
                return JSON.parse(decodeURIComponent(escape(atob(str.trim()))));
            } catch (e2) {
                return null;
            }
        }
    }

    function showBackupModal() {
        const b = L().backup;
        const code = encodeBackupCode(GState);

        animOverlayEl.classList.add('active');
        animOverlayEl.innerHTML = `
            <div class="gacha-dialog-box" style="max-width:600px;">
                <div>
                    <span class="gacha-patch-tag">CLOUD & LOCAL BACKUP</span>
                    <h2 class="gacha-panel-title">${b.title}</h2>
                    <p class="gacha-panel-desc">${b.subtitle}</p>
                </div>

                <div style="display:flex;gap:10px;flex-wrap:wrap;">
                    <button type="button" id="btn-copy-backup" class="gacha-shop-btn primary-yellow" style="flex:1;">${b.copyBtn}</button>
                    <button type="button" id="btn-dl-backup" class="gacha-shop-btn secondary-yellow" style="flex:1;">${b.downloadBtn}</button>
                </div>
                <div id="backup-status-msg" style="font-size:12px;font-weight:800;color:#d7f70c;min-height:18px;"></div>

                <div style="border-top:1px solid #262630;padding-top:12px;display:flex;flex-direction:column;gap:8px;">
                    <label style="font-size:11.5px;font-weight:800;color:#d4d4d8;text-transform:uppercase;">${b.importLabel}</label>
                    <textarea id="backup-import-input" rows="3" placeholder="${b.importPlaceholder}" style="width:100%;background:#09090d;border:1px solid #2e2e3a;border-radius:10px;padding:10px;color:#fff;font-family:monospace;font-size:11px;resize:none;"></textarea>
                    <input type="file" id="backup-file-input" accept=".json,application/json" style="display:none;">
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <button type="button" id="btn-restore-backup" class="gacha-shop-btn primary-purple" style="flex:1;">${b.importBtn}</button>
                        <button type="button" id="btn-upload-backup" class="gacha-shop-btn secondary-purple" style="flex:1;">${b.importFileBtn || 'Importer (.json)'}</button>
                    </div>
                </div>

                <button type="button" class="gacha-res-btn" id="close-backup-modal" style="align-self:flex-end;">${b.close}</button>
            </div>
        `;

        const msgEl = document.getElementById('backup-status-msg');

        document.getElementById('btn-copy-backup').addEventListener('click', () => {
            const onDone = () => {
                msgEl.style.color = '#d7f70c';
                msgEl.textContent = b.copiedMsg;
            };
            const fallbackCopy = () => {
                const ta = document.createElement('textarea');
                ta.value = code;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); onDone(); } catch (e) {}
                document.body.removeChild(ta);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(onDone).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });

        document.getElementById('btn-dl-backup').addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(GState, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ProxyQG_Gacha_Save_${getTodayStr()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });

        function applyBackupPayload(raw) {
            const clean = String(raw || '').trim();
            if (!clean) return;
            let parsed = decodeBackupCode(clean);
            if (!parsed) {
                try { parsed = JSON.parse(clean); } catch (e) {}
            }
            if (parsed && typeof parsed === 'object' && parsed.inventory) {
                if (scoreState(parsed) < scoreState(GState)) {
                    const warnMsg = b.confirmOverwrite || 'Attention : cette sauvegarde contient moins de progression que votre compte actuel. Continuer ?';
                    if (!window.confirm(warnMsg)) return;
                }
                GState = normalizeState(parsed);
                saveState(GState);
                msgEl.style.color = '#d7f70c';
                msgEl.textContent = b.importSuccess;
                updateTopCurrencies();
                renderCurrentTab();
            } else {
                msgEl.style.color = '#ef4444';
                msgEl.textContent = b.importError;
            }
        }

        document.getElementById('btn-restore-backup').addEventListener('click', () => {
            applyBackupPayload(document.getElementById('backup-import-input').value);
        });

        const fileInp = document.getElementById('backup-file-input');
        document.getElementById('btn-upload-backup').addEventListener('click', () => fileInp?.click());
        fileInp?.addEventListener('change', (ev) => {
            const file = ev.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => applyBackupPayload(reader.result);
            reader.onerror = () => {
                msgEl.style.color = '#ef4444';
                msgEl.textContent = b.importError;
            };
            reader.readAsText(file);
            ev.target.value = '';
        });

        document.getElementById('close-backup-modal').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });
    }

    // Mini-Fiche Agent affichée directement dans le Gacha (sans jamais quitter le Gacha)
    const ELEM_ICON_MAP = {
        Physical: 'physique.webp',
        Fire: 'feu.webp',
        Ice: 'Ice.webp',
        Frost: 'Frost.webp',
        Electric: 'electrique.webp',
        Ether: 'Ether.webp',
        Wind: 'Vent.webp',
        Aurora: 'Lumiflux.webp',
        Lumiflux: 'Lumiflux.webp',
        HonedEdge: 'Honed_Edge.webp',
        Honed_Edge: 'Honed_Edge.webp',
        'Honed Edge': 'Honed_Edge.webp',
        Sepia: 'Auric_Ink.webp',
        Auric_Ink: 'Auric_Ink.webp',
        'Auric Ink': 'Auric_Ink.webp',
        'Genesis Flare': 'Genesis_Flare.webp',
        Genesis_Flare: 'Genesis_Flare.webp'
    };

    function showAgentMiniCard(rawKey) {
        if (!miniCardOverlayEl) return;
        const agent = POOL.allCatalog.find(i => i.type === 'agent' && i.rawKey === rawKey);
        if (!agent) return;

        const ac = L().agentCard || {};
        const tm = L().targetModal || {};
        const owned = GState.inventory[agent.id]?.count || 0;
        const statusStr = owned > 0
            ? `M${Math.min(6, owned - 1)} • ${(ac.copies || '{n} ex.').replace('{n}', owned)}`
            : (ac.unowned || 'Non obtenu');

        const roleLabel = (tm.roles && tm.roles[agent.role]) || agent.role || 'Attack';
        const elemLabel = (ac.elements && ac.elements[agent.element]) || agent.element || 'Physical';
        const factionLabel = (typeof window.translateFactionName === 'function' ? window.translateFactionName(agent.faction) : null)
            || (ac.factions && ac.factions[agent.faction])
            || agent.faction || 'New Eridu';
        const elemIcon = ELEM_ICON_MAP[agent.element] || 'physique.webp';
        const borderCol = agent.rank === 'S' ? '#facc15' : '#c084fc';

        miniCardOverlayEl.innerHTML = `
            <div class="gacha-minicard-box" style="border-color:${borderCol};">
                <div class="gacha-minicard-top">
                    <div class="gacha-minicard-avatar" style="border-color:${borderCol};">
                        <img src="${agent.img}" alt="${itemName(agent)}">
                    </div>
                    <div class="gacha-minicard-meta">
                        <span class="gacha-patch-tag" style="width:fit-content;margin-bottom:2px;background:${borderCol};">${(ac.rankLabel || 'RANG {r}').replace('{r}', agent.rank)}</span>
                        <h3 class="gacha-minicard-name">${itemName(agent)}</h3>
                        <span style="font-family:monospace;font-size:11px;font-weight:800;color:#d7f70c;">${statusStr}</span>
                    </div>
                </div>

                <div class="gacha-minicard-grid">
                    <div class="gacha-minicard-pill full">
                        <span class="gacha-minicard-lbl">${ac.faction || 'Faction'}</span>
                        <div class="gacha-minicard-val">
                            <img src="assets/Faction/${agent.faction}.webp" alt="" onerror="this.style.display='none'">
                            <span>${factionLabel}</span>
                        </div>
                    </div>
                    <div class="gacha-minicard-pill">
                        <span class="gacha-minicard-lbl">${ac.role || 'Rôle'}</span>
                        <div class="gacha-minicard-val">
                            <img src="assets/Rôles/${agent.role}.webp" alt="" onerror="this.style.display='none'">
                            <span>${roleLabel}</span>
                        </div>
                    </div>
                    <div class="gacha-minicard-pill">
                        <span class="gacha-minicard-lbl">${ac.element || 'Élément'}</span>
                        <div class="gacha-minicard-val">
                            <img src="assets/Icone/${elemIcon}" alt="" onerror="this.style.display='none'">
                            <span>${elemLabel}</span>
                        </div>
                    </div>
                </div>

                <div style="display:flex;gap:8px;width:100%;">
                    ${owned > 0 ? `<button type="button" class="gacha-res-btn primary" id="open-agent-build-btn" style="flex:1.3;">${ac.buildBtn || 'Build & Disques'}</button>` : ''}
                    <button type="button" class="gacha-res-btn ${owned > 0 ? '' : 'primary'}" id="close-agent-minicard" style="flex:1;">${ac.close || 'Fermer'}</button>
                </div>
            </div>
        `;

        miniCardOverlayEl.classList.add('active');

        const buildBtn = document.getElementById('open-agent-build-btn');
        if (buildBtn) {
            buildBtn.addEventListener('click', () => {
                miniCardOverlayEl.classList.remove('active');
                if (animOverlayEl) animOverlayEl.classList.remove('active');
                if (window.ZZZBuilds && typeof window.ZZZBuilds.openAgentBuild === 'function') {
                    window.ZZZBuilds.openAgentBuild(rawKey);
                }
            });
        }

        document.getElementById('close-agent-minicard').addEventListener('click', () => {
            miniCardOverlayEl.classList.remove('active');
        });
        miniCardOverlayEl.onclick = (ev) => {
            if (ev.target === miniCardOverlayEl) {
                miniCardOverlayEl.classList.remove('active');
            }
        };
    }

    function openItemFromGacha(type, key) {
        if (!key) return;
        if (type === 'agent') {
            showAgentMiniCard(key);
        } else if (type === 'engine') {
            trackEquipmentInspect(key);
            if (typeof window.showEngineTooltip === 'function') {
                window.showEngineTooltip(key);
            } else {
                const ghost = document.createElement('div');
                ghost.setAttribute('data-engine', key);
                ghost.style.display = 'none';
                document.body.appendChild(ghost);
                ghost.click();
                ghost.remove();
            }
        } else if (type === 'disc') {
            trackEquipmentInspect(key);
            if (typeof window.showDiscTooltip === 'function') {
                window.showDiscTooltip(key);
            } else {
                const ghost = document.createElement('div');
                ghost.setAttribute('data-disc', key);
                ghost.style.display = 'none';
                document.body.appendChild(ghost);
                ghost.click();
                ghost.remove();
            }
        }
    }

    // ==========================================
    // 12. ANIMATION TV ZZZ & SEARCH RESULTS
    // ==========================================
    let isPulling = false;

    async function triggerPull(count) {
        if (isPulling) return;
        isPulling = true;
        try {
            await ensurePoolLoaded();
            GState = loadState();

            if (GState.tapes < count) {
                const missingTapes = count - GState.tapes;
                const neededPoly = missingTapes * 160;
                if (GState.polychromes >= neededPoly) {
                    GState.polychromes -= neededPoly;
                    GState.tapes += missingTapes;
                } else {
                    const lacking = neededPoly - GState.polychromes;
                    const msg = getLang() === 'en'
                        ? `Need ${lacking} more Polychromes — complete Quests!`
                        : `Il vous manque ${lacking} Polychromes — complétez vos quêtes !`;
                    activeTab = 'quests';
                    modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b.getAttribute('data-gtab') === 'quests'));
                    renderCurrentTab(true);
                    showGachaToast(msg, 'warn');
                    return;
                }
            }

            GState.tapes -= count;
            const results = [];
            for (let i = 0; i < count; i++) {
                results.push(rollSingleItem());
            }

            // Garantie Multi ×10 : assure toujours au moins 1 Pack de ×5 Disques sur un tirage ×10
            if (count >= 10 && !results.some(r => r.type === 'disc')) {
                const discPool = POOL.A_all.filter(i => i.type === 'disc');
                const bIdx = results.findIndex(r => r.rank === 'B');
                if (discPool.length > 0 && bIdx !== -1) {
                    const oldB = results[bIdx];
                    if (GState.inventory[oldB.id]) {
                        GState.inventory[oldB.id].count -= 1;
                        if (GState.inventory[oldB.id].count <= 0) {
                            delete GState.inventory[oldB.id];
                        }
                    }
                    const chosenDisc = pickRandom(discPool);
                    GState.residual += 6;
                    GState.totalDupesRes = (GState.totalDupesRes || 0) + 6;
                    GState.totalAPulls = (GState.totalAPulls || 0) + 1;
                    results[bIdx] = registerItemToInventory(chosenDisc);
                }
            }

            saveState(GState);
            updateTopCurrencies();

            playZZZTVAnimation(results);
        } finally {
            isPulling = false;
        }
    }

    function playZZZTVAnimation(results) {
        const t = L().results;
        clearTVAnimTimers();
        const mySession = tvAnimSession;
        skipRequested = false;
        animOverlayEl.classList.remove('s-rank-flash');
        animOverlayEl.classList.add('active');

        const tvCount = results.length;
        const rowsHTML = tvCount === 1
            ? `<div class="gacha-tv-row"><div class="gacha-anim-tv" id="gtv-0" style="width:160px;"><span class="gacha-tv-letter">${results[0].rank}</span></div></div>`
            : `
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-0"><span class="gacha-tv-letter">${results[0].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-1"><span class="gacha-tv-letter">${results[1].rank}</span></div>
                </div>
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-2"><span class="gacha-tv-letter">${results[2].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-3"><span class="gacha-tv-letter">${results[3].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-4"><span class="gacha-tv-letter">${results[4].rank}</span></div>
                </div>
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-5"><span class="gacha-tv-letter">${results[5].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-6"><span class="gacha-tv-letter">${results[6].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-7"><span class="gacha-tv-letter">${results[7].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-8"><span class="gacha-tv-letter">${results[8].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-9"><span class="gacha-tv-letter">${results[9].rank}</span></div>
                </div>
            `;

        animOverlayEl.innerHTML = `
            <button type="button" class="gacha-skip-btn" id="gacha-skip-anim">${t.skip}</button>
            <div class="gacha-tv-pyramid">${rowsHTML}</div>
            <p style="margin-top:18px;font-size:11px;font-weight:700;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;text-align:center;">
                ${t.skipAnywhere || ''}
            </p>
        `;

        const showFinalScreen = () => {
            if (skipRequested || mySession !== tvAnimSession) return;
            skipRequested = true;
            clearTVAnimTimers();
            renderSearchResultsScreen(results);
        };

        document.getElementById('gacha-skip-anim').addEventListener('click', (ev) => {
            ev.stopPropagation();
            showFinalScreen();
        });

        // Cliquer n'importe où autour des téléviseurs (ou sur l'écran) passe directement l'animation
        animOverlayEl.onclick = () => {
            showFinalScreen();
        };

        results.forEach((item, idx) => {
            tvAnimTimers.push(setTimeout(() => {
                if (skipRequested || mySession !== tvAnimSession) return;
                const tv = document.getElementById(`gtv-${idx}`);
                if (tv) {
                    tv.classList.add(`lit-${item.rank}`);
                    if (item.rank === 'S') {
                        animOverlayEl.classList.remove('s-rank-flash');
                        void animOverlayEl.offsetWidth;
                        animOverlayEl.classList.add('s-rank-flash');
                    }
                }
            }, 130 + idx * 130));
        });

        const totalDuration = 130 + results.length * 130 + 700;
        tvAnimTimers.push(setTimeout(() => {
            if (!skipRequested && mySession === tvAnimSession) showFinalScreen();
        }, totalDuration));
    }

    function renderSearchResultsScreen(results, fromShop = false) {
        animOverlayEl.onclick = null;
        const t = L().results;
        const rankWeight = { S: 0, A: 1, B: 2 };
        const sorted = [...results].sort((a, b) => (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9));

        const singleStyle = results.length === 1 ? 'aspect-ratio:1/1.05;' : '';

        const cardsHTML = sorted.map((item, idx) => {
            const delay = idx * 45;
            const fitClass = item.type === 'agent' ? 'is-agent' : 'is-equip';
            const badgePos = item.type === 'agent' ? 'left:5px;' : 'right:5px;';
            const dupTag = fromShop
                ? (item.type === 'agent' ? `M${Math.min(6, Math.max(0, (item.count || 1) - 1))}` : `×${item.count || 1}`)
                : `✦ +${item.rank === 'S' ? 40 : (item.rank === 'A' ? 8 : 2)}`;
            const topBadge = item.type === 'disc'
                ? `<span style="position:absolute;top:5px;right:5px;z-index:10;background:#38bdf8;color:#000;font-size:8.5px;font-weight:900;padding:2px 6px;border-radius:4px;">PACK ×${item.qtyAdded || 3}</span>`
                : (item.isNew
                    ? `<span style="position:absolute;top:5px;${badgePos}z-index:10;background:#d7f70c;color:#000;font-size:8.5px;font-weight:900;padding:2px 5px;border-radius:4px;">${t.newBadge}</span>`
                    : `<span style="position:absolute;top:5px;${badgePos}z-index:10;background:rgba(0,0,0,0.82);color:#e4e4e7;font-family:monospace;font-size:9px;font-weight:800;padding:2px 5px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);">${dupTag}</span>`);

            return `
            <div class="gacha-result-card rank-${item.rank}" style="animation-delay:${delay}ms;${singleStyle}"
                 data-res-type="${item.type}" data-res-key="${item.rawKey}" title="${itemName(item)} (${t.inspectHint})">
                ${item.type !== 'agent' ? `<span class="gacha-col-rank-tag">${item.rank}</span>` : ''}
                ${topBadge}
                <img src="${item.img}" alt="${itemName(item)}" class="gacha-res-img ${fitClass}">
                <div class="gacha-res-bottom">
                    <span class="gacha-res-name">${itemName(item)}</span>
                </div>
            </div>`;
        }).join('');

        animOverlayEl.innerHTML = `
            <div class="gacha-results-wrap">
                <h2 class="gacha-results-title">${t.title}</h2>
                <div class="gacha-results-grid" style="${results.length === 1 ? 'max-width:210px;grid-template-columns:1fr;' : ''}">
                    ${cardsHTML}
                </div>
                <div class="gacha-results-bar">
                    <div class="gacha-results-curr-group">
                        <span style="font-family:monospace;font-size:12px;font-weight:800;color:#f43f5e;">✦ ${GState.residual}</span>
                        <span style="font-family:monospace;font-size:12px;font-weight:800;color:#d7f70c;display:inline-flex;align-items:center;gap:4px;">
                            <img src="${ASSETS.polychrome}" style="width:16px;height:16px;object-fit:contain;" ${iconFallback('poly')}> ${GState.polychromes}
                        </span>
                    </div>
                    ${!fromShop ? `
                    <button type="button" id="gacha-again-btn" class="gacha-res-btn">
                        ${results.length === 10 ? t.pullAgain10 : t.pullAgain1}
                    </button>` : ''}
                    <button type="button" id="gacha-confirm-results" class="gacha-res-btn primary" style="${fromShop ? 'grid-column:span 2;' : ''}">
                        ${t.confirm}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('gacha-confirm-results').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
            renderCurrentTab(false);
        });

        document.getElementById('gacha-again-btn')?.addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
            triggerPull(results.length);
        });

        animOverlayEl.querySelectorAll('[data-res-type]').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-res-type');
                const key = card.getAttribute('data-res-key');
                openItemFromGacha(type, key);
            });
        });
    }

    let gachaToastTimer = null;
    function showGachaToast(message, tone = 'lime') {
        if (!message) return;
        let box = document.getElementById('gacha-toast-box');
        if (!box) {
            box = document.createElement('div');
            box.id = 'gacha-toast-box';
            document.body.appendChild(box);
        }
        box.textContent = message;
        box.classList.remove('tone-warn', 'tone-danger');
        if (tone === 'warn') box.classList.add('tone-warn');
        else if (tone === 'danger') box.classList.add('tone-danger');

        box.classList.add('visible');
        clearTimeout(gachaToastTimer);
        gachaToastTimer = setTimeout(() => {
            box.classList.remove('visible');
        }, 2200);
    }

    // Pont sécurisé pour le module indépendant gacha-builds.js
    window.ZZZGachaBridge = {
        getState: () => GState,
        saveState: (st) => { GState = st; saveState(GState); updateTopCurrencies(); },
        getPool: () => POOL,
        getLang: getLang,
        itemName: itemName,
        openItemModal: openItemFromGacha,
        showToast: showGachaToast,
        refreshDots: () => updateQuestNotificationDot(GState),
        pushSubState: pushGachaSubState,
        popSubState: popGachaSubState,
        switchCustomTab: (tabName, renderFn) => {
            activeTab = tabName;
            if (!modalEl) return;
            modalEl.querySelectorAll('[data-gtab]').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-gtab') === tabName);
            });
            updateTopCurrencies();
            const mount = document.getElementById('gacha-view-mount');
            if (mount && typeof renderFn === 'function') {
                mount.scrollTop = 0;
                renderFn(mount);
            }
        }
    };

    // Chargement isolé du système de Builds, Disques & Badges
    try {
        if (!document.getElementById('zzz-gacha-builds-css')) {
            const link = document.createElement('link');
            link.id = 'zzz-gacha-builds-css';
            link.rel = 'stylesheet';
            link.href = 'gacha/gacha-builds.css?v=15';
            document.head.appendChild(link);
        }
        buildsLoadPromise = import('./gacha-builds.js?v=21').catch(err => console.warn('Module Builds optionnel non chargé:', err));
    } catch (e) {}

    await ensureDictLoaded();
    updateQuestNotificationDot(GState);
    syncSidebarButtonText();
})();
