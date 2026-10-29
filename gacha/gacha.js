// gacha/gacha.js - Simulateur Recherche de Signal ZZZ (Bilingue FR/EN, Pity Officielle & Collection Complète)
(async function () {
    const ASSETS = {
        polychrome: 'assets/Gacha/polychrome.webp',
        tape: 'assets/Gacha/tape.webp'
    };

    const STORAGE_KEY = 'zzz_proxyqg_gacha_v1';

    // Chargement automatique du dictionnaire séparé gacha/gacha-i18n.js
    let DICT = null;
    try {
        const mod = await import('./gacha-i18n.js');
        DICT = mod.GACHA_I18N;
    } catch (e) {
        console.error('Erreur chargement gacha-i18n.js :', e);
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

    let modalEl = null;
    let animOverlayEl = null;
    let poolReady = false;
    let POOL = { S_featured: [], S_all: [], A_all: [], B_all: [], allCatalog: [] };
    let bannerInfo = { patch: '3.3', phase: '1', featuredNames: ['Phoenix', 'Velina'] };
    let activeTab = 'search';
    let colFilterType = 'all'; // 'all' | 'agent' | 'engine' | 'disc'
    let colShowLocked = false;
    let skipRequested = false;

    function getTodayStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    function loadState() {
        const today = getTodayStr();
        let state = null;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) state = JSON.parse(raw);
        } catch (e) {}

        if (!state || typeof state !== 'object') {
            state = {
                polychromes: 3200,
                tapes: 10,
                residual: 0,
                pityS: 0,
                pityA: 0,
                guaranteedFeatured: false,
                totalPulls: 0,
                inventory: {},
                daily: {
                    date: today,
                    visitDone: true,
                    guidesOpened: [],
                    itemsInspected: [],
                    claimed: { q1: false, q2: false, q3: false }
                }
            };
        }

        if (!state.daily || state.daily.date !== today) {
            state.daily = {
                date: today,
                visitDone: true,
                guidesOpened: [],
                itemsInspected: [],
                claimed: { q1: false, q2: false, q3: false }
            };
        } else {
            state.daily.visitDone = true;
        }

        saveState(state);
        return state;
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {}
        updateQuestNotificationDot(state);
    }

    let GState = loadState();

    // ==========================================
    // 1. SUIVI DES QUÊTES & SYNCHRO LANGUE
    // ==========================================
    function trackGuideOpen(agentName) {
        if (!agentName) return;
        GState = loadState();
        if (!GState.daily.guidesOpened.includes(agentName)) {
            GState.daily.guidesOpened.push(agentName);
            saveState(GState);
        }
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

    function hasUnclaimedQuests(st = GState) {
        const d = st.daily;
        return (d.visitDone && !d.claimed.q1)
            || (d.guidesOpened.length >= 3 && !d.claimed.q2)
            || (d.itemsInspected.length >= 2 && !d.claimed.q3);
    }

    function updateQuestNotificationDot(st = GState) {
        const hasNotif = hasUnclaimedQuests(st);
        document.querySelectorAll('.gacha-quest-dot-global').forEach(el => {
            el.style.display = hasNotif ? 'block' : 'none';
        });
    }

    // ==========================================
    // 2. CHARGEMENT DU CATALOGUE BILINGUE (AGENTS + MOTEURS + DISQUES)
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
                    if (bannerInfo.featuredNames.some(fn => fn.toLowerCase() === key.toLowerCase())) {
                        POOL.S_featured.push(item);
                    }
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

    // ==========================================
    // 3. ALGORITHME DE TIRAGE ZZZ OFFICIEL
    // ==========================================
    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function rollSingleItem() {
        GState.pityS += 1;
        GState.pityA += 1;
        GState.totalPulls += 1;

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
            if (GState.guaranteedFeatured || Math.random() < 0.5) {
                chosen = pickRandom(POOL.S_featured);
                GState.guaranteedFeatured = false;
            } else {
                chosen = pickRandom(POOL.S_all);
                GState.guaranteedFeatured = true;
            }
            GState.residual += 40;
        } else if (GState.pityA >= 10 || rand < sChance + 0.094) {
            GState.pityA = 0;
            chosen = pickRandom(POOL.A_all);
            GState.residual += 8;
        } else {
            chosen = pickRandom(POOL.B_all);
            GState.residual += 2;
        }

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

        return { ...chosen, isNew, count: GState.inventory[chosen.id].count };
    }

    // ==========================================
    // 4. CONSTRUCTION DOM & BARRE SUPÉRIEURE
    // ==========================================
    function iconFallback(type) {
        if (type === 'poly') {
            return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23d7f70c%22><polygon points=%2212,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5%22/></svg>'"`;
        }
        return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%2338bdf8%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/><circle cx=%2212%22 cy=%2212%22 r=%224%22 fill=%22%23000%22/></svg>'"`;
    }

    function createModalDOM() {
        if (modalEl) return;
        const t = L();

        modalEl = document.createElement('div');
        modalEl.id = 'zzz-gacha-modal';
        modalEl.innerHTML = `
            <div class="gacha-bg-pattern"></div>
            <div class="gacha-topbar">
                <div class="gacha-topbar-row1">
                    <button type="button" class="gacha-back-btn" id="gacha-close-btn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
                        <span id="gacha-lbl-back">${t.backBtn}</span>
                    </button>

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
                    </div>
                </div>

                <div class="gacha-nav-pills">
                    <button type="button" class="gacha-nav-btn active" data-gtab="search" id="gtab-lbl-search">${t.tabs.search}</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="quests">
                        <span id="gtab-lbl-quests">${t.tabs.quests}</span>
                        <span class="gacha-quest-dot gacha-quest-dot-global" style="display:none;"></span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="shop" id="gtab-lbl-shop">${t.tabs.shop}</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="collection" id="gtab-lbl-collection">${t.tabs.collection}</button>
                </div>
            </div>

            <div class="gacha-main-area custom-scrollbar" id="gacha-view-mount"></div>
        `;
        document.body.appendChild(modalEl);

        animOverlayEl = document.createElement('div');
        animOverlayEl.id = 'gacha-anim-overlay';
        document.body.appendChild(animOverlayEl);

        document.getElementById('gacha-close-btn').addEventListener('click', closeGachaModal);

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
        document.getElementById('gacha-lbl-back').textContent = t.backBtn;
        document.getElementById('gtab-lbl-search').textContent = t.tabs.search;
        document.getElementById('gtab-lbl-quests').textContent = t.tabs.quests;
        document.getElementById('gtab-lbl-shop').textContent = t.tabs.shop;
        document.getElementById('gtab-lbl-collection').textContent = t.tabs.collection;
    }

    function updateTopCurrencies() {
        if (!modalEl) return;
        document.getElementById('gacha-ui-residual').textContent = GState.residual;
        document.getElementById('gacha-ui-poly').textContent = GState.polychromes;
        document.getElementById('gacha-ui-tapes').textContent = GState.tapes;
        updateQuestNotificationDot(GState);
    }

    function renderCurrentTab() {
        updateTopCurrencies();
        const mount = document.getElementById('gacha-view-mount');
        if (!mount) return;

        if (activeTab === 'search') renderSearchStage(mount);
        else if (activeTab === 'quests') renderQuestsTab(mount);
        else if (activeTab === 'shop') renderShopTab(mount);
        else if (activeTab === 'collection') renderCollectionTab(mount);
    }

    // ==========================================
    // 5. ONGLET 1 : CANAL UNIFIÉ + PROBABILITÉS
    // ==========================================
    function renderSearchStage(mount) {
        const t = L().banner;
        const sLeft = Math.max(1, 90 - GState.pityS);
        const aLeft = Math.max(1, 10 - GState.pityA);
        const featAgents = POOL.S_featured.filter(i => i.type === 'agent');
        const feat1 = featAgents[0] || POOL.S_featured[0] || POOL.S_all[0] || { nameFr: 'Phoenix', rawKey: 'Phoenix', type: 'agent', img: 'assets/Agents/Phoenix.webp' };
        const feat2 = featAgents[1] || POOL.S_featured[1] || POOL.S_all[1] || { nameFr: 'Velina', rawKey: 'Velina', type: 'agent', img: 'assets/Agents/Velina.webp' };

        const totalAgents = POOL.allCatalog.filter(i => i.type === 'agent').length;
        const totalEngines = POOL.allCatalog.filter(i => i.type === 'engine').length;
        const totalDiscs = POOL.allCatalog.filter(i => i.type === 'disc').length;

        mount.innerHTML = `
            <div class="gacha-stage-grid">
                <!-- Vitrine TV ZZZ -->
                <div class="gacha-tv-showcase">
                    <div class="gacha-showcase-header">
                        <span class="gacha-rateup-tag">★ ${t.rateUpLabel}</span>
                        <button type="button" class="gacha-details-btn" id="btn-open-rates">
                            <span>ⓘ</span>
                            <span>${t.detailsBtn}</span>
                        </button>
                    </div>

                    <div class="gacha-featured-tvs">
                        <div class="gacha-crt-screen primary" data-feat-type="${feat1.type}" data-feat-key="${feat1.rawKey}">
                            <img src="${feat1.img}" alt="${itemName(feat1)}">
                            <div class="gacha-crt-caption">
                                <span class="gacha-crt-name">${itemName(feat1)}</span>
                                <span class="gacha-crt-up-pill">UP!</span>
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

                <!-- Panneau de contrôle, Probabilités & Pity -->
                <div class="gacha-info-panel">
                    <div>
                        <span class="gacha-patch-tag">${t.badge.replace('{patch}', bannerInfo.patch)}</span>
                        <h2 class="gacha-panel-title">${t.title}</h2>
                        <p class="gacha-panel-desc">${t.subtitle}</p>
                    </div>

                    <!-- Probabilités officielles par rang -->
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

                    <!-- Compteurs de Pity -->
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

                    <!-- Boutons de Tirage -->
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
        `;

        document.getElementById('btn-pull-1').addEventListener('click', () => triggerPull(1));
        document.getElementById('btn-pull-10').addEventListener('click', () => triggerPull(10));
        document.getElementById('btn-open-rates').addEventListener('click', showRatesDetailsModal);

        mount.querySelectorAll('[data-feat-key]').forEach(el => {
            el.addEventListener('click', () => {
                openItemFromGacha(el.getAttribute('data-feat-type'), el.getAttribute('data-feat-key'));
            });
        });
    }

    function showRatesDetailsModal() {
        const r = L().ratesModal;
        animOverlayEl.classList.add('active');
        animOverlayEl.innerHTML = `
            <div class="gacha-info-panel" style="max-width:640px;width:100%;margin:auto;">
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
                <button type="button" class="gacha-res-btn primary" id="close-rates-modal" style="align-self:flex-end;">
                    ${r.close}
                </button>
            </div>
        `;
        document.getElementById('close-rates-modal').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
        });
    }

    // ==========================================
    // 6. ONGLET 2 : QUÊTES QUOTIDIENNES
    // ==========================================
    function renderQuestsTab(mount) {
        const t = L().quests;
        const d = GState.daily;
        const quests = [
            { id: 'q1', title: t.q1Title, desc: t.q1Desc, progress: d.visitDone ? 1 : 0, max: 1, reward: 600, claimed: !!d.claimed.q1 },
            { id: 'q2', title: t.q2Title, desc: t.q2Desc, progress: Math.min(3, d.guidesOpened.length), max: 3, reward: 600, claimed: !!d.claimed.q2 },
            { id: 'q3', title: t.q3Title, desc: t.q3Desc, progress: Math.min(2, d.itemsInspected.length), max: 2, reward: 400, claimed: !!d.claimed.q3 }
        ];

        mount.innerHTML = `
            <div class="gacha-section-container">
                <div class="gacha-sec-header">
                    <div>
                        <h2 class="gacha-sec-title">${t.title}</h2>
                        <p class="gacha-sec-sub">${t.subtitle}</p>
                    </div>
                    <span class="gacha-reset-pill">${t.resetLabel}</span>
                </div>

                <div class="gacha-quest-list">
                    ${quests.map(q => {
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
                                <button type="button" data-claim="${q.id}" data-reward="${q.reward}" ${!canClaim ? 'disabled' : ''}
                                    class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}">
                                    ${q.claimed ? t.claimed : (canClaim ? t.claim : t.inProgress)}
                                </button>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;

        mount.querySelectorAll('[data-claim]').forEach(btn => {
            btn.addEventListener('click', () => {
                const qId = btn.getAttribute('data-claim');
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
    }

    // ==========================================
    // 7. ONGLET 3 : MAGASIN DE SIGNAUX
    // ==========================================
    function renderShopTab(mount) {
        const t = L().shop;
        const maxResTapes = Math.floor(GState.residual / 20);

        mount.innerHTML = `
            <div class="gacha-section-container">
                <div class="gacha-sec-header">
                    <div>
                        <h2 class="gacha-sec-title">${t.title}</h2>
                        <p class="gacha-sec-sub">${t.subtitle}</p>
                    </div>
                </div>

                <div class="gacha-shop-grid">
                    <!-- Carte Polychromes -->
                    <div class="gacha-shop-card">
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

                    <!-- Carte Signaux Résiduels -->
                    <div class="gacha-shop-card residual-card">
                        <span class="gacha-shop-badge">${t.card2Badge}</span>
                        <div class="gacha-shop-icon-wrap">
                            <img src="${ASSETS.tape}" ${iconFallback('tape')}>
                        </div>
                        <h3 class="gacha-shop-item-title">${t.card2Title}</h3>
                        <p class="gacha-shop-item-desc">${t.card2Desc}</p>
                        <span class="gacha-shop-cost-lbl">${t.card2Cost}</span>
                        <div class="gacha-shop-btn-row">
                            <button type="button" id="buy-res-1" class="gacha-shop-btn primary-purple">${t.buyResidual1}</button>
                            <button type="button" id="buy-res-max" class="gacha-shop-btn secondary-purple">${t.buyResidualMax} (${maxResTapes})</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

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
    }

    // ==========================================
    // 8. ONGLET 4 : COLLECTION & PROGRESSION AVANCÉE
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

        // Filtrage
        const rankWeight = { S: 0, A: 1, B: 2 };
        let list = catalog.map(item => {
            const owned = inv[item.id];
            return {
                ...item,
                count: owned ? owned.count : 0,
                unlocked: !!(owned && owned.count > 0)
            };
        });

        if (colFilterType !== 'all') {
            list = list.filter(i => i.type === colFilterType);
        }
        if (!colShowLocked) {
            list = list.filter(i => i.unlocked);
        }

        list.sort((a, b) => {
            if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1;
            const rw = (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9);
            if (rw !== 0) return rw;
            return b.count - a.count;
        });

        const typeLabel = (tp) => tp === 'agent' ? t.typeAgent : (tp === 'engine' ? t.typeEngine : t.typeDisc);

        mount.innerHTML = `
            <div class="gacha-col-container">
                <div class="gacha-sec-header">
                    <div>
                        <h2 class="gacha-sec-title">${t.title}</h2>
                        <p class="gacha-sec-sub">${t.subtitle}</p>
                    </div>
                </div>

                <!-- Barres de progression par catégorie -->
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

                <!-- Filtres Catégories & Option Non-Obtenus -->
                <div class="gacha-col-controls">
                    <div class="gacha-col-filter-group">
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'all' ? 'active' : ''}" data-cfilter="all">${t.filterAll}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'agent' ? 'active' : ''}" data-cfilter="agent">${t.filterAgents}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'engine' ? 'active' : ''}" data-cfilter="engine">${t.filterEngines}</button>
                        <button type="button" class="gacha-col-filter-btn ${colFilterType === 'disc' ? 'active' : ''}" data-cfilter="disc">${t.filterDiscs}</button>
                    </div>
                    <label class="gacha-col-toggle-locked">
                        <input type="checkbox" id="toggle-show-locked" ${colShowLocked ? 'checked' : ''}>
                        <span>${t.showLocked}</span>
                    </label>
                </div>

                <!-- Grille de Cartes Collection -->
                ${list.length === 0 ? `<div style="text-align:center;padding:40px 10px;color:#71717a;font-weight:700;">${t.emptyFilter}</div>` : `
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
    // 9. TIRAGE, ANIMATION TV & ÉCRAN SEARCH RESULTS
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

    // ==========================================
    // 10. OUVERTURE / FERMETURE PUBLIQUE
    // ==========================================
    window.openGachaModal = async function () {
        createModalDOM();
        await ensurePoolLoaded();
        GState = loadState();
        refreshModalStaticLabels();
        renderCurrentTab();
        document.body.classList.add('modal-open');
        modalEl.classList.add('visible');
    };

    function closeGachaModal() {
        if (!modalEl) return;
        modalEl.classList.remove('visible');
        if (animOverlayEl) animOverlayEl.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    window.closeGachaModal = closeGachaModal;

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => {
            updateQuestNotificationDot(GState);
            syncSidebarButtonText();
        });
    } else {
        updateQuestNotificationDot(GState);
        syncSidebarButtonText();
    }
})();
