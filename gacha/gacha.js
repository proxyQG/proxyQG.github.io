// gacha/gacha.js - Simulateur Recherche de Signal ZZZ (Triple Persistance, Cible S, Quêtes + Succès, Magasin 6 Offres)
(async function () {
    const ASSETS = {
        polychrome: 'assets/Gacha/polychrome.webp',
        tape: 'assets/Gacha/tape.webp'
    };

    const STORAGE_KEY = 'zzz_proxyqg_gacha_v1';
    const STORAGE_BACKUP_KEY = 'zzz_proxyqg_gacha_backup_v1';
    const IDB_NAME = 'ProxyQG_Gacha_DB';
    const IDB_STORE = 'save_store';

    // Configuration des 6 Succès à paliers évolutifs (déclarée en tête de fichier)
    const ACH_TIERS = {
        a1: { targets: [10, 30, 60, 100, 200, 500],      rewards: [320, 480, 640, 800, 1600, 3200], val: (st) => st.totalPulls || 0 },
        a2: { targets: [1, 3, 6, 12, 25, 50],            rewards: [400, 600, 800, 1200, 1600, 2400], val: (st) => st.totalSPulls || 0 },
        a3: { targets: [3, 10, 20, 35, 50, 62],          rewards: [300, 500, 800, 1200, 1600, 3200], val: (st) => Object.values(st.inventory || {}).filter(i => i.type === 'agent').length },
        a4: { targets: [5, 15, 30, 50, 75, 100],         rewards: [300, 500, 800, 1000, 1600, 2400], val: (st) => Object.values(st.inventory || {}).filter(i => i.type !== 'agent').length },
        a5: { targets: [5, 15, 30, 60, 100, 200],        rewards: [200, 400, 600, 800, 1200, 1600],  val: (st) => st.totalGuidesRead || 0 },
        a6: { targets: [40, 150, 400, 800, 1500, 3000],  rewards: [200, 400, 600, 1000, 1600, 2400], val: (st) => st.totalDupesRes || 0 }
    };

    let DICT = null;
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

    async function ensureDictLoaded() {
        if (DICT) return;
        try {
            const mod = await import('./gacha-i18n.js');
            DICT = mod.GACHA_I18N;
        } catch (e) {
            console.error('Erreur chargement gacha-i18n.js :', e);
        }
    }

    function getLang() {
        const switcher = document.getElementById('langSwitcher');
        const attr = switcher && switcher.getAttribute('data-active');
        return attr || localStorage.getItem('zzz_lang') || 'fr';
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
    // 1. TRIPLE PERSISTANCE (LOCALSTORAGE + MIROIR + INDEXEDDB)
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
                    claimed: { q1: false, q2: false, q3: false, q4: false, q5: false }
                }
            };
        }

        if (typeof state.totalSPulls !== 'number') state.totalSPulls = 0;
        if (typeof state.totalAPulls !== 'number') state.totalAPulls = 0;
        if (typeof state.totalDupesRes !== 'number') state.totalDupesRes = state.residual || 0;
        if (typeof state.totalGuidesRead !== 'number') state.totalGuidesRead = 0;
        if (!Array.isArray(state.recentDrops)) state.recentDrops = [];
        if (!state.achievements) state.achievements = { a1: 0, a2: 0, a3: 0, a4: 0, a5: 0, a6: 0 };
        if (!state.inventory) state.inventory = {};

        if (!state.daily || state.daily.date !== today) {
            state.daily = {
                date: today,
                visitDone: true,
                pullsToday: 0,
                freePackClaimed: false,
                guidesOpened: [],
                itemsInspected: [],
                claimed: { q1: false, q2: false, q3: false, q4: false, q5: false }
            };
        } else {
            state.daily.visitDone = true;
            if (typeof state.daily.pullsToday !== 'number') state.daily.pullsToday = 0;
            if (!state.daily.claimed) state.daily.claimed = {};
        }

        state.updatedAt = Date.now();
        return state;
    }

    function scoreState(st) {
        if (!st || typeof st !== 'object') return -1;
        const invCount = Object.keys(st.inventory || {}).length;
        return (st.totalPulls || 0) * 100 + invCount * 10 + (st.polychromes || 0) * 0.001;
    }

    function hasUnclaimedQuests(st) {
        if (!st || !st.daily) return false;
        const d = st.daily;
        const dailyReady = (d.visitDone && !d.claimed.q1)
            || (d.guidesOpened.length >= 3 && !d.claimed.q2)
            || (d.itemsInspected.length >= 2 && !d.claimed.q3)
            || (d.pullsToday >= 1 && !d.claimed.q4)
            || (d.guidesOpened.length >= 5 && !d.claimed.q5);

        const achReady = Object.entries(ACH_TIERS).some(([key, cfg]) => {
            const tierIdx = st.achievements?.[key] || 0;
            if (tierIdx >= cfg.targets.length) return false;
            return cfg.val(st) >= cfg.targets[tierIdx];
        });

        return dailyReady || achReady || !d.freePackClaimed;
    }

    function updateQuestNotificationDot(st) {
        const hasNotif = hasUnclaimedQuests(st);
        document.querySelectorAll('.gacha-quest-dot-global').forEach(el => {
            el.style.display = hasNotif ? 'block' : 'none';
        });
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
    // 2. OUVERTURE / FERMETURE PUBLIQUE (DÉCLARÉE IMMÉDIATEMENT)
    // ==========================================
    function closeGachaModal() {
        if (!modalEl) return;
        modalEl.classList.remove('visible');
        if (animOverlayEl) animOverlayEl.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    window.closeGachaModal = closeGachaModal;

    window.openGachaModal = async function () {
        await ensureDictLoaded();
        createModalDOM();
        await ensurePoolLoaded();
        GState = loadState();
        refreshModalStaticLabels();
        renderCurrentTab();
        document.body.classList.add('modal-open');
        modalEl.classList.add('visible');
    };

    // Restauration asynchrone depuis IndexedDB si nécessaire
    readFromIDB().then(idbState => {
        if (idbState && scoreState(idbState) > scoreState(GState)) {
            GState = normalizeState(idbState);
            saveState(GState);
            if (modalEl && modalEl.classList.contains('visible')) renderCurrentTab();
        }
    });

    await ensureDictLoaded();

    // ==========================================
    // 3. ÉCOUTEURS DE QUÊTES & SYNCHRO LANGUE
    // ==========================================
    function trackGuideOpen(agentName) {
        if (!agentName) return;
        GState = loadState();
        GState.totalGuidesRead = (GState.totalGuidesRead || 0) + 1;
        if (!GState.daily.guidesOpened.includes(agentName)) {
            GState.daily.guidesOpened.push(agentName);
        }
        saveState(GState);
    }

    function trackEquipmentInspect(itemKey) {
        if (!itemKey) return;
        GState = loadState();
        if (!GState.daily.itemsInspected.includes(itemKey)) {
            GState.daily.itemsInspected.push(itemKey);
            saveState(GState);
        }
    }

    document.addEventListener('click', (e) => {
        const agentCard = e.target.closest('[data-agent], [onclick*="openAgentDetail"], [data-tt-agent], [data-disc-agent]');
        if (agentCard) {
            const name = agentCard.getAttribute('data-agent')
                || agentCard.getAttribute('data-tt-agent')
                || agentCard.getAttribute('data-disc-agent')
                || (agentCard.getAttribute('onclick')?.match(/openAgentDetail\(\s*['"]([^'"]+)['"]/) || [])[1];
            if (name) trackGuideOpen(name);
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
                    renderCurrentTab();
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
    async function ensurePoolLoaded() {
        if (poolReady) return;
        try {
            const [agents, engines, discs, timer] = await Promise.all([
                fetch('js/data/agents.json').then(r => r.json()).catch(() => []),
                fetch('js/data/engines.json').then(r => r.json()).catch(() => ({})),
                fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})),
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
                const displayName = a.name === 'Jane' ? 'Jane Doe' : a.name;
                const item = {
                    id: `agent_${a.name}`,
                    type: 'agent',
                    nameFr: displayName,
                    nameEn: displayName,
                    rawKey: a.name,
                    rank: a.rank || 'S',
                    element: a.element,
                    role: a.role,
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
        return POOL.S_featured[0] || sAgents[0] || { nameFr: 'Velina', rawKey: 'Velina', type: 'agent', img: 'assets/Agents/Velina.webp' };
    }

    function getSecondaryFeatured(primary) {
        const sAgents = POOL.S_all.filter(i => i.type === 'agent');
        const second = POOL.S_featured.find(a => a.rawKey !== primary.rawKey)
            || sAgents.find(a => a.rawKey !== primary.rawKey);
        return second || primary;
    }

    // ==========================================
    // 5. ALGORITHME DE TIRAGE & ENREGISTREMENT
    // ==========================================
    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function registerItemToInventory(chosen) {
        const prev = GState.inventory[chosen.id];
        const isNew = !prev;
        GState.inventory[chosen.id] = {
            count: (prev ? prev.count : 0) + 1,
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

        return { ...chosen, isNew, count: GState.inventory[chosen.id].count };
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

            if (GState.guaranteedFeatured || Math.random() < 0.5) {
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

    // ==========================================
    // 6. DOM PRINCIPAL & TOPBAR 3 ZONES
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
                    <button type="button" class="gacha-nav-btn active" data-gtab="search" id="gtab-lbl-search">${t.tabs?.search || 'Canal Unifié'}</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="quests">
                        <span id="gtab-lbl-quests">${t.tabs?.quests || 'Quêtes'}</span>
                        <span class="gacha-quest-dot gacha-quest-dot-global" style="display:none;"></span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="shop" id="gtab-lbl-shop">${t.tabs?.shop || 'Magasin'}</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="collection" id="gtab-lbl-collection">${t.tabs?.collection || 'Collection'}</button>
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
                    <button type="button" class="gacha-save-trigger" id="gacha-open-backup" title="Backup / Transfer">
                        <span>💾</span>
                        <span class="lbl" id="gacha-lbl-save">${t.saveBtn || 'Sauvegarde'}</span>
                    </button>
                </div>
            </div>

            <div class="gacha-main-area custom-scrollbar" id="gacha-view-mount"></div>
        `;
        document.body.appendChild(modalEl);

        animOverlayEl = document.createElement('div');
        animOverlayEl.id = 'gacha-anim-overlay';
        document.body.appendChild(animOverlayEl);

        document.getElementById('gacha-close-btn').addEventListener('click', closeGachaModal);
        document.getElementById('gacha-open-backup').addEventListener('click', showBackupModal);

        modalEl.querySelectorAll('[data-gtab]').forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.getAttribute('data-gtab');
                modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b === btn));
                renderCurrentTab();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalEl && modalEl.classList.contains('visible')) {
                if (animOverlayEl && animOverlayEl.classList.contains('active')) {
                    animOverlayEl.classList.remove('active');
                } else {
                    closeGachaModal();
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

    function renderCurrentTab() {
        updateTopCurrencies();
        const mount = document.getElementById('gacha-view-mount');
        if (!mount) return;
        mount.scrollTop = 0;

        if (activeTab === 'search') renderSearchStage(mount);
        else if (activeTab === 'quests') renderQuestsTab(mount);
        else if (activeTab === 'shop') renderShopTab(mount);
        else if (activeTab === 'collection') renderCollectionTab(mount);
    }

    // ==========================================
    // 7. ONGLET 1 : CANAL UNIFIÉ + CIBLAGE S + HISTORIQUE
    // ==========================================
    function renderSearchStage(mount) {
        const t = L().banner;
        const sLeft = Math.max(1, 90 - GState.pityS);
        const aLeft = Math.max(1, 10 - GState.pityA);
        const feat1 = getPrimaryFeatured();
        const feat2 = getSecondaryFeatured(feat1);

        const totalAgents = POOL.allCatalog.filter(i => i.type === 'agent').length;
        const totalEngines = POOL.allCatalog.filter(i => i.type === 'engine').length;
        const totalDiscs = POOL.allCatalog.filter(i => i.type === 'disc').length;

        const sRateAcct = GState.totalPulls > 0
            ? `${((GState.totalSPulls || 0) / GState.totalPulls * 100).toFixed(2)}%`
            : '0.00%';

        const recentHTML = (GState.recentDrops || []).length === 0
            ? `<div style="font-size:11.5px;color:#71717a;font-weight:600;padding:6px 2px;">${t.recentDropsEmpty}</div>`
            : GState.recentDrops.map(d => `
                <div class="gacha-hist-chip rank-${d.rank}" data-h-type="${d.type}" data-h-key="${d.rawKey}">
                    <img src="${d.img}" alt="${itemName(d)}">
                    <div style="display:flex;flex-direction:column;gap:1px;">
                        <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10.5px;color:#fff;text-transform:uppercase;">${itemName(d)}</span>
                        <span style="font-family:monospace;font-size:9.5px;font-weight:800;color:${d.rank === 'S' ? '#facc15' : '#c084fc'};">RANK ${d.rank}</span>
                    </div>
                </div>
            `).join('');

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-stage-grid">
                    <div class="gacha-tv-showcase">
                        <div class="gacha-showcase-header">
                            <span class="gacha-rateup-tag">★ ${t.rateUpLabel}</span>
                            <div class="gacha-header-btns">
                                <button type="button" class="gacha-details-btn accent" id="btn-choose-target">
                                    <span>🎯</span>
                                    <span>${t.chooseTarget}</span>
                                </button>
                                <button type="button" class="gacha-details-btn" id="btn-open-rates">
                                    <span>ⓘ</span>
                                    <span>${t.detailsBtn}</span>
                                </button>
                            </div>
                        </div>

                        <div class="gacha-featured-tvs">
                            <div class="gacha-crt-screen primary" data-feat-type="${feat1.type}" data-feat-key="${feat1.rawKey}">
                                <img src="${feat1.img}" alt="${itemName(feat1)}">
                                <div class="gacha-crt-caption">
                                    <span class="gacha-crt-name">${itemName(feat1)}</span>
                                    <span class="gacha-crt-up-pill">CIBLE UP!</span>
                                </div>
                            </div>
                            <div class="gacha-crt-screen" data-feat-type="${feat2.type}" data-feat-key="${feat2.rawKey}">
                                <img src="${feat2.img}" alt="${itemName(feat2)}">
                                <div class="gacha-crt-caption">
                                    <span class="gacha-crt-name">${itemName(feat2)}</span>
                                    <span class="gacha-crt-up-pill">UP!</span>
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
                        <div>
                            <span class="gacha-patch-tag">${t.badge.replace('{patch}', bannerInfo.patch)}</span>
                            <h2 class="gacha-panel-title">${t.title}</h2>
                            <p class="gacha-panel-desc">${t.subtitle}</p>
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
                                <span>${t.pityA}</span>
                                <span class="gacha-pity-count c-a">${t.pullsLeft.replace('{n}', aLeft)}</span>
                            </div>
                            <div class="gacha-pity-pill">
                                <span>${t.pityS}</span>
                                <span class="gacha-pity-count c-s">${t.pullsLeft.replace('{n}', sLeft)}</span>
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

                <div class="gacha-telemetry-panel">
                    <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#a1a1aa;">
                        📊 ${t.statsBarTitle}
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
                    <div class="gacha-history-strip custom-scrollbar">
                        ${recentHTML}
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-pull-1').addEventListener('click', () => triggerPull(1));
        document.getElementById('btn-pull-10').addEventListener('click', () => triggerPull(10));
        document.getElementById('btn-open-rates').addEventListener('click', showRatesDetailsModal);
        document.getElementById('btn-choose-target').addEventListener('click', showTargetSelectorModal);

        mount.querySelectorAll('[data-feat-key], [data-h-key]').forEach(el => {
            el.addEventListener('click', () => {
                const tp = el.getAttribute('data-feat-type') || el.getAttribute('data-h-type');
                const ky = el.getAttribute('data-feat-key') || el.getAttribute('data-h-key');
                openItemFromGacha(tp, ky);
            });
        });
    }

    function showTargetSelectorModal() {
        const tm = L().targetModal;
        const sAgents = POOL.S_all.filter(i => i.type === 'agent');
        const currentPrimary = getPrimaryFeatured().rawKey;

        animOverlayEl.classList.add('active');
        animOverlayEl.innerHTML = `
            <div class="gacha-dialog-box">
                <div>
                    <span class="gacha-patch-tag">RATE-UP 50/50</span>
                    <h2 class="gacha-panel-title">${tm.title}</h2>
                    <p class="gacha-panel-desc">${tm.subtitle}</p>
                </div>
                <div class="gacha-selector-grid custom-scrollbar">
                    ${sAgents.map(a => `
                        <div class="gacha-col-card rank-S" data-pick-target="${a.rawKey}" style="${a.rawKey === currentPrimary ? 'border-color:#d7f70c;box-shadow:0 0 18px rgba(215,247,12,0.45);' : ''}">
                            <div class="gacha-col-visual">
                                <span class="gacha-col-rank-tag">S</span>
                                <img src="${a.img}" loading="lazy" class="is-agent">
                            </div>
                            <div class="gacha-col-info">
                                <span class="gacha-col-name">${itemName(a)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button type="button" class="gacha-res-btn" id="close-target-modal" style="align-self:flex-end;">${tm.close}</button>
            </div>
        `;

        document.getElementById('close-target-modal').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });

        animOverlayEl.querySelectorAll('[data-pick-target]').forEach(card => {
            card.addEventListener('click', () => {
                GState.selectedRateUp = card.getAttribute('data-pick-target');
                saveState(GState);
                animOverlayEl.classList.remove('active');
                renderCurrentTab();
            });
        });
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
    // 8. ONGLET 2 : 5 QUÊTES QUOTIDIENNES + 6 SUCCÈS PERMANENTS
    // ==========================================
    function renderQuestsTab(mount) {
        const t = L().quests;
        const d = GState.daily;

        const dailyList = [
            { id: 'q1', title: t.q1Title, desc: t.q1Desc, progress: d.visitDone ? 1 : 0, max: 1, reward: 500, claimed: !!d.claimed.q1 },
            { id: 'q2', title: t.q2Title, desc: t.q2Desc, progress: Math.min(3, d.guidesOpened.length), max: 3, reward: 500, claimed: !!d.claimed.q2 },
            { id: 'q3', title: t.q3Title, desc: t.q3Desc, progress: Math.min(2, d.itemsInspected.length), max: 2, reward: 400, claimed: !!d.claimed.q3 },
            { id: 'q4', title: t.q4Title, desc: t.q4Desc, progress: Math.min(1, d.pullsToday || 0), max: 1, reward: 300, claimed: !!d.claimed.q4 },
            { id: 'q5', title: t.q5Title, desc: t.q5Desc, progress: Math.min(5, d.guidesOpened.length), max: 5, reward: 300, claimed: !!d.claimed.q5 }
        ];

        const achList = Object.entries(ACH_TIERS).map(([key, cfg], idx) => {
            const num = idx + 1;
            const tierIdx = GState.achievements?.[key] || 0;
            const isMaxed = tierIdx >= cfg.targets.length;
            const target = isMaxed ? cfg.targets[cfg.targets.length - 1] : cfg.targets[tierIdx];
            const reward = isMaxed ? 0 : cfg.rewards[tierIdx];
            const currentVal = cfg.val(GState);
            return {
                id: key,
                tier: Math.min(cfg.targets.length, tierIdx + 1),
                title: t[`a${num}Title`],
                desc: (t[`a${num}Desc`] || '').replace('{target}', target),
                progress: Math.min(target, currentVal),
                max: target,
                reward,
                isMaxed
            };
        });

        mount.innerHTML = `
            <div class="gacha-page-wrap">
                <div class="gacha-quests-split">
                    <div class="gacha-quest-column">
                        <div class="gacha-sec-header">
                            <div>
                                <h2 class="gacha-sec-title">${t.dailyHeader}</h2>
                                <p class="gacha-sec-sub">${t.dailySub}</p>
                            </div>
                            <span class="gacha-reset-pill">${t.resetLabel}</span>
                        </div>
                        <div class="gacha-quest-list">
                            ${dailyList.map(q => {
                                const isDone = q.progress >= q.max;
                                const canClaim = isDone && !q.claimed;
                                return `
                                <div class="gacha-quest-card ${canClaim ? 'ready' : ''}">
                                    <div style="flex:1;min-width:0;">
                                        <div class="gacha-quest-top">
                                            <span class="gacha-quest-name">${q.title}</span>
                                            <span class="gacha-quest-prog ${isDone ? 'done' : ''}">${q.progress} / ${q.max}</span>
                                        </div>
                                        <p class="gacha-quest-desc">${q.desc}</p>
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
                                </div>`;
                            }).join('')}
                        </div>
                    </div>

                    <div class="gacha-quest-column">
                        <div class="gacha-sec-header">
                            <div>
                                <h2 class="gacha-sec-title">${t.achHeader}</h2>
                                <p class="gacha-sec-sub">${t.achSub}</p>
                            </div>
                        </div>
                        <div class="gacha-quest-list">
                            ${achList.map(a => {
                                const canClaim = !a.isMaxed && a.progress >= a.max;
                                return `
                                <div class="gacha-quest-card ${canClaim ? 'ready' : ''}">
                                    <div style="flex:1;min-width:0;">
                                        <div class="gacha-quest-top">
                                            <span class="gacha-quest-name">${a.title}</span>
                                            <span class="gacha-quest-prog" style="color:#38bdf8;">${t.tierLabel.replace('{n}', a.tier)}</span>
                                            <span class="gacha-quest-prog ${canClaim || a.isMaxed ? 'done' : ''}">${a.progress} / ${a.max}</span>
                                        </div>
                                        <p class="gacha-quest-desc">${a.desc}</p>
                                    </div>
                                    <div class="gacha-quest-actions">
                                        ${!a.isMaxed ? `
                                        <div class="gacha-reward-box">
                                            <img src="${ASSETS.polychrome}" ${iconFallback('poly')}>
                                            <span>+${a.reward}</span>
                                        </div>` : ''}
                                        <button type="button" data-claim-ach="${a.id}" ${!canClaim ? 'disabled' : ''}
                                            class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}">
                                            ${a.isMaxed ? t.claimed : (canClaim ? t.claim : t.inProgress)}
                                        </button>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

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
                }
            });
        });

        mount.querySelectorAll('[data-claim-ach]').forEach(btn => {
            btn.addEventListener('click', () => {
                const aId = btn.getAttribute('data-claim-ach');
                const cfg = ACH_TIERS[aId];
                const tierIdx = GState.achievements[aId] || 0;
                if (cfg && tierIdx < cfg.targets.length && cfg.val(GState) >= cfg.targets[tierIdx]) {
                    GState.polychromes += cfg.rewards[tierIdx];
                    GState.achievements[aId] = tierIdx + 1;
                    saveState(GState);
                    renderQuestsTab(mount);
                    updateTopCurrencies();
                }
            });
        });
    }

    // ==========================================
    // 9. ONGLET 3 : MAGASIN DE SIGNAUX (6 OFFRES EN GRILLE)
    // ==========================================
    function renderShopTab(mount) {
        const t = L().shop;
        const maxResTapes = Math.floor(GState.residual / 20);
        const freeClaimed = !!GState.daily.freePackClaimed;

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
                            <button type="button" id="buy-tape-1" class="gacha-shop-btn primary-yellow">${t.buy1}</button>
                            <button type="button" id="buy-tape-10" class="gacha-shop-btn secondary-yellow">${t.buy10}</button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-purple">
                        <span class="gacha-shop-badge">${t.card2Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <img src="${ASSETS.tape}" ${iconFallback('tape')}>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card2Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card2Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card2Cost}</span>
                        <div class="gacha-shop-btn-row">
                            <button type="button" id="buy-res-1" class="gacha-shop-btn primary-purple" ${GState.residual < 20 ? 'disabled' : ''}>${t.buyResidual1}</button>
                            <button type="button" id="buy-res-max" class="gacha-shop-btn secondary-purple" ${maxResTapes < 1 ? 'disabled' : ''}>${t.buyResidualMax.replace('{n}', maxResTapes)}</button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-purple">
                        <span class="gacha-shop-badge">${t.card3Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;font-size:38px;color:#c084fc;">A★</span>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card3Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card3Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card3Cost}</span>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-box-a" class="gacha-shop-btn primary-purple" ${GState.residual < 80 ? 'disabled' : ''}>${t.buyBoxA}</button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-gold">
                        <span class="gacha-shop-badge">${t.card4Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;font-size:34px;color:#facc15;">W-S</span>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card4Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card4Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card4Cost}</span>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-select-engine" class="gacha-shop-btn primary-gold" ${GState.residual < 300 ? 'disabled' : ''}>${t.buySelectEngine}</button>
                        </div>
                    </div>

                    <div class="gacha-shop-card theme-gold">
                        <span class="gacha-shop-badge">${t.card5Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;font-size:38px;color:#facc15;">S★</span>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card5Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card5Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card5Cost}</span>
                        <div class="gacha-shop-btn-single">
                            <button type="button" id="buy-select-agent" class="gacha-shop-btn primary-gold" ${GState.residual < 500 ? 'disabled' : ''}>${t.buySelectAgent}</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('buy-free-pack').addEventListener('click', () => {
            if (!GState.daily.freePackClaimed) {
                GState.daily.freePackClaimed = true;
                GState.polychromes += 160;
                GState.residual += 10;
                GState.totalDupesRes = (GState.totalDupesRes || 0) + 10;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
            }
        });

        document.getElementById('buy-tape-1').addEventListener('click', () => {
            if (GState.polychromes >= 160) {
                GState.polychromes -= 160;
                GState.tapes += 1;
                saveState(GState);
                updateTopCurrencies();
            } else {
                activeTab = 'quests';
                modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b.getAttribute('data-gtab') === 'quests'));
                renderCurrentTab();
            }
        });

        document.getElementById('buy-tape-10').addEventListener('click', () => {
            if (GState.polychromes >= 1600) {
                GState.polychromes -= 1600;
                GState.tapes += 10;
                saveState(GState);
                updateTopCurrencies();
            } else {
                activeTab = 'quests';
                modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b.getAttribute('data-gtab') === 'quests'));
                renderCurrentTab();
            }
        });

        document.getElementById('buy-res-1').addEventListener('click', () => {
            if (GState.residual >= 20) {
                GState.residual -= 20;
                GState.tapes += 1;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
            }
        });

        document.getElementById('buy-res-max').addEventListener('click', () => {
            const count = Math.floor(GState.residual / 20);
            if (count > 0) {
                GState.residual -= count * 20;
                GState.tapes += count;
                saveState(GState);
                renderShopTab(mount);
                updateTopCurrencies();
            }
        });

        document.getElementById('buy-box-a').addEventListener('click', () => {
            if (GState.residual >= 80 && POOL.A_all.length > 0) {
                GState.residual -= 80;
                const won = registerItemToInventory(pickRandom(POOL.A_all));
                saveState(GState);
                updateTopCurrencies();
                renderSearchResultsScreen([won]);
                animOverlayEl.classList.add('active');
            }
        });

        document.getElementById('buy-select-engine').addEventListener('click', () => {
            if (GState.residual >= 300) {
                openShopSelectorModal('engine', 300, t.selectorEngineTitle);
            }
        });

        document.getElementById('buy-select-agent').addEventListener('click', () => {
            if (GState.residual >= 500) {
                openShopSelectorModal('agent', 500, t.selectorAgentTitle);
            }
        });
    }

    function openShopSelectorModal(targetType, cost, titleText) {
        const items = POOL.S_all.filter(i => i.type === targetType);
        animOverlayEl.classList.add('active');
        animOverlayEl.innerHTML = `
            <div class="gacha-dialog-box">
                <div>
                    <span class="gacha-patch-tag">SIGNAL SHOP • ${cost} ✦</span>
                    <h2 class="gacha-panel-title">${titleText}</h2>
                </div>
                <div class="gacha-selector-grid custom-scrollbar">
                    ${items.map(it => {
                        const owned = GState.inventory[it.id]?.count || 0;
                        const badge = owned > 0 ? (it.type === 'agent' ? `M${Math.min(6, owned - 1)}` : `★${Math.min(5, owned)}`) : 'NEW';
                        return `
                        <div class="gacha-col-card rank-S" data-shop-pick="${it.id}">
                            <div class="gacha-col-visual">
                                <span class="gacha-col-rank-tag">S</span>
                                <span class="gacha-col-dupe-tag">${badge}</span>
                                <img src="${it.img}" loading="lazy" class="${it.type === 'agent' ? 'is-agent' : 'is-equip'}">
                            </div>
                            <div class="gacha-col-info">
                                <span class="gacha-col-name">${itemName(it)}</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
                <button type="button" class="gacha-res-btn" id="close-shop-selector" style="align-self:flex-end;">Cancel</button>
            </div>
        `;

        document.getElementById('close-shop-selector').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });

        animOverlayEl.querySelectorAll('[data-shop-pick]').forEach(card => {
            card.addEventListener('click', () => {
                const pickedId = card.getAttribute('data-shop-pick');
                const chosen = items.find(i => i.id === pickedId);
                if (chosen && GState.residual >= cost) {
                    GState.residual -= cost;
                    const won = registerItemToInventory(chosen);
                    saveState(GState);
                    updateTopCurrencies();
                    renderSearchResultsScreen([won]);
                }
            });
        });
    }

    // ==========================================
    // 10. ONGLET 4 : COLLECTION AVEC FILTRES & RECHERCHE
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
        let list = catalog.map(item => {
            const owned = inv[item.id];
            return {
                ...item,
                count: owned ? owned.count : 0,
                unlocked: !!(owned && owned.count > 0)
            };
        });

        if (colFilterType !== 'all') list = list.filter(i => i.type === colFilterType);
        if (colFilterRank !== 'all') list = list.filter(i => i.rank === colFilterRank);
        if (!colShowLocked) list = list.filter(i => i.unlocked);
        if (colSearchQuery.trim()) {
            const q = colSearchQuery.trim().toLowerCase();
            list = list.filter(i => itemName(i).toLowerCase().includes(q) || (i.rawKey || '').toLowerCase().includes(q));
        }

        list.sort((a, b) => {
            if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
            const rw = (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9);
            if (rw !== 0) return rw;
            return b.count - a.count;
        });

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
                    <div class="gacha-col-stat-box">
                        <div class="gacha-col-stat-top"><span>${t.totalUnlocked}</span><strong>${unlockedAll}/${totalAll}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedAll / totalAll * 100)}%"></div></div>
                    </div>
                    <div class="gacha-col-stat-box">
                        <div class="gacha-col-stat-top"><span>${t.filterAgents}</span><strong>${unlockedAgents}/${agentsCat.length}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedAgents / (agentsCat.length || 1) * 100)}%"></div></div>
                    </div>
                    <div class="gacha-col-stat-box">
                        <div class="gacha-col-stat-top"><span>${t.filterEngines}</span><strong>${unlockedEngines}/${enginesCat.length}</strong></div>
                        <div class="gacha-col-bar-track"><div class="gacha-col-bar-fill" style="width:${Math.round(unlockedEngines / (enginesCat.length || 1) * 100)}%;background:#c084fc;"></div></div>
                    </div>
                    <div class="gacha-col-stat-box">
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

                ${list.length === 0 ? `<div style="text-align:center;padding:44px 10px;color:#71717a;font-weight:700;">${t.emptyFilter}</div>` : `
                <div class="gacha-col-grid">
                    ${list.map(it => {
                        let progBadge = '';
                        let isMax = false;
                        if (it.unlocked) {
                            if (it.type === 'agent') {
                                const mLvl = Math.min(6, it.count - 1);
                                isMax = mLvl >= 6;
                                progBadge = isMax ? `M6 MAX` : `M${mLvl}`;
                            } else {
                                const sLvl = Math.min(5, it.count);
                                isMax = sLvl >= 5;
                                progBadge = `★${sLvl} (×${it.count})`;
                            }
                        } else {
                            progBadge = t.lockedLabel;
                        }

                        return `
                        <div class="gacha-col-card rank-${it.rank} ${it.unlocked ? '' : 'is-locked'}"
                             data-col-type="${it.type}" data-col-key="${it.rawKey}">
                            <div class="gacha-col-visual">
                                <span class="gacha-col-rank-tag">${it.rank}</span>
                                <span class="gacha-col-dupe-tag ${isMax ? 'maxed' : ''}">${progBadge}</span>
                                <img src="${it.img}" loading="lazy" alt="${itemName(it)}" class="${it.type === 'agent' ? 'is-agent' : 'is-equip'}">
                            </div>
                            <div class="gacha-col-info">
                                <span class="gacha-col-name">${itemName(it)}</span>
                                <span class="gacha-col-sub">${typeLabel(it.type)}</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>`}
            </div>
        `;

        mount.querySelectorAll('[data-cfilter]').forEach(btn => {
            btn.addEventListener('click', () => {
                colFilterType = btn.getAttribute('data-cfilter');
                renderCollectionTab(mount);
            });
        });

        mount.querySelectorAll('[data-rfilter]').forEach(btn => {
            btn.addEventListener('click', () => {
                colFilterRank = btn.getAttribute('data-rfilter');
                renderCollectionTab(mount);
            });
        });

        const searchInp = document.getElementById('col-search-input');
        if (searchInp) {
            searchInp.addEventListener('input', (e) => {
                colSearchQuery = e.target.value;
                renderCollectionTab(mount);
                const newInp = document.getElementById('col-search-input');
                if (newInp) {
                    newInp.focus();
                    newInp.setSelectionRange(newInp.value.length, newInp.value.length);
                }
            });
        }

        const lockCheckbox = document.getElementById('toggle-show-locked');
        if (lockCheckbox) {
            lockCheckbox.addEventListener('change', (e) => {
                colShowLocked = e.target.checked;
                renderCollectionTab(mount);
            });
        }

        mount.querySelectorAll('[data-col-type]').forEach(card => {
            card.addEventListener('click', () => {
                openItemFromGacha(card.getAttribute('data-col-type'), card.getAttribute('data-col-key'));
            });
        });
    }

    // ==========================================
    // 11. MODALE DE SAUVEGARDE / TRANSFERT (EXPORT & IMPORT)
    // ==========================================
    function encodeBackupCode(stateObj) {
        try {
            return btoa(unescape(encodeURIComponent(JSON.stringify(stateObj))));
        } catch (e) {
            return '';
        }
    }

    function decodeBackupCode(str) {
        try {
            return JSON.parse(decodeURIComponent(escape(atob(str.trim()))));
        } catch (e) {
            return null;
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
                    <button type="button" id="btn-copy-backup" class="gacha-shop-btn primary-yellow" style="flex:1;">📋 ${b.copyBtn}</button>
                    <button type="button" id="btn-dl-backup" class="gacha-shop-btn secondary-yellow" style="flex:1;">⬇️ ${b.downloadBtn}</button>
                </div>
                <div id="backup-status-msg" style="font-size:12px;font-weight:800;color:#d7f70c;min-height:18px;"></div>

                <div style="border-top:1px solid #262630;padding-top:12px;display:flex;flex-direction:column;gap:8px;">
                    <label style="font-size:11.5px;font-weight:800;color:#d4d4d8;text-transform:uppercase;">${b.importLabel}</label>
                    <textarea id="backup-import-input" rows="3" placeholder="${b.importPlaceholder}" style="width:100%;background:#09090d;border:1px solid #2e2e3a;border-radius:10px;padding:10px;color:#fff;font-family:monospace;font-size:11px;resize:none;"></textarea>
                    <button type="button" id="btn-restore-backup" class="gacha-shop-btn primary-purple">${b.importBtn}</button>
                </div>

                <button type="button" class="gacha-res-btn" id="close-backup-modal" style="align-self:flex-end;">${b.close}</button>
            </div>
        `;

        const msgEl = document.getElementById('backup-status-msg');

        document.getElementById('btn-copy-backup').addEventListener('click', () => {
            navigator.clipboard?.writeText(code);
            msgEl.textContent = b.copiedMsg;
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

        document.getElementById('btn-restore-backup').addEventListener('click', () => {
            const raw = document.getElementById('backup-import-input').value.trim();
            if (!raw) return;
            let parsed = decodeBackupCode(raw);
            if (!parsed) {
                try { parsed = JSON.parse(raw); } catch (e) {}
            }
            if (parsed && typeof parsed === 'object' && parsed.inventory) {
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
        });

        document.getElementById('close-backup-modal').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });
    }

    function openItemFromGacha(type, key) {
        if (!key) return;
        if (type === 'agent' && typeof window.openAgentDetail === 'function') {
            closeGachaModal();
            window.openAgentDetail(key);
        } else if (type === 'engine' && typeof window.showEngineTooltip === 'function') {
            window.showEngineTooltip(key);
        } else if (type === 'disc' && typeof window.showDiscTooltip === 'function') {
            window.showDiscTooltip(key);
        }
    }

    // ==========================================
    // 12. ANIMATION TV ZZZ & SEARCH RESULTS
    // ==========================================
    async function triggerPull(count) {
        await ensurePoolLoaded();
        GState = loadState();

        if (GState.tapes < count) {
            const missingTapes = count - GState.tapes;
            const neededPoly = missingTapes * 160;
            if (GState.polychromes >= neededPoly) {
                GState.polychromes -= neededPoly;
                GState.tapes += missingTapes;
            } else {
                activeTab = 'quests';
                modalEl.querySelectorAll('[data-gtab]').forEach(b => b.classList.toggle('active', b.getAttribute('data-gtab') === 'quests'));
                renderCurrentTab();
                return;
            }
        }

        GState.tapes -= count;
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(rollSingleItem());
        }
        saveState(GState);
        updateTopCurrencies();

        playZZZTVAnimation(results);
    }

    function playZZZTVAnimation(results) {
        const t = L().results;
        skipRequested = false;
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
        `;

        const showFinalScreen = () => {
            skipRequested = true;
            renderSearchResultsScreen(results);
        };

        document.getElementById('gacha-skip-anim').addEventListener('click', showFinalScreen);

        results.forEach((item, idx) => {
            setTimeout(() => {
                if (skipRequested) return;
                const tv = document.getElementById(`gtv-${idx}`);
                if (tv) tv.classList.add(`lit-${item.rank}`);
            }, 130 + idx * 130);
        });

        const totalDuration = 130 + results.length * 130 + 700;
        setTimeout(() => {
            if (!skipRequested) renderSearchResultsScreen(results);
        }, totalDuration);
    }

    function renderSearchResultsScreen(results) {
        const t = L().results;
        const rankWeight = { S: 0, A: 1, B: 2 };
        const sorted = [...results].sort((a, b) => (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9));

        const cardsHTML = sorted.map((item, idx) => {
            const delay = idx * 45;
            const fitClass = item.type === 'agent' ? 'is-agent' : 'is-equip';
            const topBadge = item.isNew
                ? `<span style="position:absolute;top:6px;right:6px;z-index:10;background:#d7f70c;color:#000;font-size:9px;font-weight:900;padding:2px 6px;border-radius:4px;">${t.newBadge}</span>`
                : `<span style="position:absolute;top:6px;right:6px;z-index:10;background:rgba(0,0,0,0.82);color:#e4e4e7;font-family:monospace;font-size:9.5px;font-weight:800;padding:2px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.15);">✦ +${item.rank === 'S' ? 40 : (item.rank === 'A' ? 8 : 2)}</span>`;

            return `
            <div class="gacha-result-card rank-${item.rank}" style="animation-delay:${delay}ms"
                 data-res-type="${item.type}" data-res-key="${item.rawKey}" title="${itemName(item)} (${t.inspectHint})">
                <span class="gacha-col-rank-tag">${item.rank}</span>
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
                <div class="gacha-results-grid" style="${results.length === 1 ? 'max-width:220px;grid-template-columns:1fr;' : ''}">
                    ${cardsHTML}
                </div>
                <div class="gacha-results-bar">
                    <span style="font-family:monospace;font-size:12px;font-weight:800;color:#f43f5e;">✦ ${GState.residual}</span>
                    <span style="font-family:monospace;font-size:12px;font-weight:800;color:#d7f70c;display:inline-flex;align-items:center;gap:4px;">
                        <img src="${ASSETS.polychrome}" style="width:16px;height:16px;object-fit:contain;" ${iconFallback('poly')}> ${GState.polychromes}
                    </span>
                    <button type="button" id="gacha-again-btn" class="gacha-res-btn">
                        ${results.length === 10 ? t.pullAgain10 : t.pullAgain1}
                    </button>
                    <button type="button" id="gacha-confirm-results" class="gacha-res-btn primary">
                        ${t.confirm}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('gacha-confirm-results').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
            renderCurrentTab();
        });

        document.getElementById('gacha-again-btn').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
            triggerPull(results.length);
        });

        animOverlayEl.querySelectorAll('[data-res-type]').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-res-type');
                const key = card.getAttribute('data-res-key');
                animOverlayEl.classList.remove('active');
                openItemFromGacha(type, key);
            });
        });
    }

    updateQuestNotificationDot(GState);
    syncSidebarButtonText();
})();
