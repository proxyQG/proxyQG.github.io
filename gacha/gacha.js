// gacha/gacha.js - Simulateur Recherche de Signal & Quêtes Quotidiennes ZZZ
(function () {
    // Chemins des icônes (modifiables si tes fichiers portent un autre nom)
    const ASSETS = {
        polychrome: 'assets/Gacha/polychrome.webp',
        tape: 'assets/Gacha/tape.webp'
    };

    const STORAGE_KEY = 'zzz_proxyqg_gacha_v1';

    let modalEl = null;
    let animOverlayEl = null;
    let poolReady = false;
    let POOL = { S_featured: [], S_all: [], A_all: [], B_all: [] };
    let bannerInfo = { patch: '3.3', phase: '1', featuredNames: ['Phoenix', 'Velina'] };
    let activeTab = 'search'; // 'search' | 'quests' | 'shop' | 'collection'
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
                polychromes: 3200, // Bonus de bienvenue (20 tirages)
                tapes: 10,         // + 10 Bandes maîtresses offertes
                residual: 0,       // Signaux résiduels (doublons)
                pityS: 0,
                pityA: 0,
                guaranteedFeatured: false,
                totalPulls: 0,
                inventory: {},     // { "itemKey": { count, type, rank, name, img } }
                daily: {
                    date: today,
                    visitDone: true,
                    guidesOpened: [],
                    itemsInspected: [],
                    claimed: { q1: false, q2: false, q3: false }
                }
            };
        }

        // Réinitialisation automatique des 3 quêtes chaque nouveau jour
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
    // 1. SUIVI AUTOMATIQUE DES 3 QUÊTES SUR LE SITE
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

    // Écoute non-intrusive des clics sur tout le site (0 modification requise dans app.js)
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
    }, true);

    function hasUnclaimedQuests(st = GState) {
        const d = st.daily;
        const q1Ready = d.visitDone && !d.claimed.q1;
        const q2Ready = d.guidesOpened.length >= 3 && !d.claimed.q2;
        const q3Ready = d.itemsInspected.length >= 2 && !d.claimed.q3;
        return q1Ready || q2Ready || q3Ready;
    }

    function updateQuestNotificationDot(st = GState) {
        const hasNotif = hasUnclaimedQuests(st);
        document.querySelectorAll('.gacha-quest-dot-global').forEach(el => {
            el.style.display = hasNotif ? 'block' : 'none';
        });
    }

    // ==========================================
    // 2. CHARGEMENT DU POOL (AGENTS + MOTEURS + DISQUES)
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

            POOL = { S_featured: [], S_all: [], A_all: [], B_all: [] };

            // 1. Agents (S et A)
            agents.forEach(a => {
                const item = {
                    id: `agent_${a.name}`,
                    type: 'agent',
                    name: a.name === 'Jane' ? 'Jane Doe' : a.name,
                    rawKey: a.name,
                    rank: a.rank || 'S',
                    element: a.element,
                    role: a.role,
                    faction: a.faction,
                    img: `assets/Agents/${a.name}.webp`
                };
                if (item.rank === 'S') {
                    POOL.S_all.push(item);
                    if (bannerInfo.featuredNames.some(fn => fn.toLowerCase() === a.name.toLowerCase())) {
                        POOL.S_featured.push(item);
                    }
                } else {
                    POOL.A_all.push(item);
                }
            });

            // 2. Moteurs-Ampli (S, A et B)
            Object.entries(engines).forEach(([key, eng]) => {
                const item = {
                    id: `engine_${key}`,
                    type: 'engine',
                    name: eng.name?.fr || eng.name?.en || key,
                    rawKey: key,
                    rank: eng.rank || 'A',
                    role: eng.specialty || '',
                    img: `assets/W-Engine/${(eng.img || '').replace('.png', '.webp')}`
                };
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

            // 3. Sets de Disques (ajoutés en A/S pour enrichir le canal universel)
            Object.entries(discs).forEach(([key, d]) => {
                POOL.A_all.push({
                    id: `disc_${key}`,
                    type: 'disc',
                    name: d.name?.fr || d.name?.en || key,
                    rawKey: key,
                    rank: 'A',
                    role: 'Drive Disc',
                    img: `assets/Disque/${d.img}`
                });
            });

            if (POOL.S_featured.length === 0 && POOL.S_all.length > 0) {
                POOL.S_featured = POOL.S_all.slice(-2);
            }

            poolReady = true;
        } catch (e) {
            console.error('Erreur chargement Gacha Pool:', e);
        }
    }

    // ==========================================
    // 3. ALGORITHME DE TIRAGE ZZZ (SOFT PITY 75 / HARD PITY 90)
    // ==========================================
    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function rollSingleItem() {
        GState.pityS += 1;
        GState.pityA += 1;
        GState.totalPulls += 1;

        // Calcul du taux S officiel ZZZ : 0.6% de 1 à 74, +6% par pull dès 75, 100% à 90
        let sChance = 0.006;
        if (GState.pityS >= 90) {
            sChance = 1.0;
        } else if (GState.pityS >= 75) {
            sChance = 0.006 + (GState.pityS - 74) * 0.06;
        }

        const rand = Math.random();
        let chosen = null;

        if (rand < sChance) {
            // RANG S OBTENU !
            GState.pityS = 0;
            GState.pityA = 0;
            if (GState.guaranteedFeatured || Math.random() < 0.5) {
                chosen = pickRandom(POOL.S_featured);
                GState.guaranteedFeatured = false;
            } else {
                chosen = pickRandom(POOL.S_all);
                GState.guaranteedFeatured = true;
            }
            GState.residual += 40; // Signal résiduel S
        } else if (GState.pityA >= 10 || rand < sChance + 0.094) {
            // RANG A OBTENU (Garanti au 10e tirage ou 9.4% de base)
            GState.pityA = 0;
            chosen = pickRandom(POOL.A_all);
            GState.residual += 8; // Signal résiduel A
        } else {
            // RANG B OBTENU
            chosen = pickRandom(POOL.B_all);
            GState.residual += 2;
        }

        // Enregistrement dans la collection du joueur
        const prev = GState.inventory[chosen.id];
        const isNew = !prev;
        GState.inventory[chosen.id] = {
            count: (prev ? prev.count : 0) + 1,
            type: chosen.type,
            rank: chosen.rank,
            name: chosen.name,
            rawKey: chosen.rawKey,
            img: chosen.img
        };

        return { ...chosen, isNew, count: GState.inventory[chosen.id].count };
    }

    // ==========================================
    // 4. INTERFACE & RENDU DES 4 ONGLETS
    // ==========================================
    function iconFallback(type) {
        if (type === 'poly') {
            return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23d7f70c%22><polygon points=%2212,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5%22/></svg>'"`;
        }
        return `onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%2338bdf8%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22/><circle cx=%2212%22 cy=%2212%22 r=%224%22 fill=%22%23000%22/></svg>'"`;
    }

    function createModalDOM() {
        if (modalEl) return;

        modalEl = document.createElement('div');
        modalEl.id = 'zzz-gacha-modal';
        modalEl.innerHTML = `
            <div class="gacha-bg-pattern"></div>
            <div class="gacha-topbar">
                <button type="button" class="gacha-back-btn" id="gacha-close-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M15 18l-6-6 6-6"/></svg>
                    <span>Retour QG</span>
                </button>

                <div class="gacha-nav-pills">
                    <button type="button" class="gacha-nav-btn active" data-gtab="search">Canal Unifié</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="quests">
                        Quêtes du Jour
                        <span class="gacha-quest-dot gacha-quest-dot-global" style="display:none;"></span>
                    </button>
                    <button type="button" class="gacha-nav-btn" data-gtab="shop">Magasin</button>
                    <button type="button" class="gacha-nav-btn" data-gtab="collection">Collection</button>
                </div>

                <div class="gacha-currencies">
                    <div class="gacha-curr-pill" title="Signaux résiduels (Doublons)">
                        <span style="color:#f43f5e;font-size:14px;">✦</span>
                        <span id="gacha-ui-residual">0</span>
                    </div>
                    <div class="gacha-curr-pill" title="Polychromes (160 = 1 Recherche)">
                        <img src="${ASSETS.polychrome}" alt="Polychromes" ${iconFallback('poly')}>
                        <span id="gacha-ui-poly">0</span>
                    </div>
                    <div class="gacha-curr-pill" title="Bandes maîtresses chiffrées">
                        <img src="${ASSETS.tape}" alt="Bandes" ${iconFallback('tape')}>
                        <span id="gacha-ui-tapes">0</span>
                    </div>
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

    // --- ONGLET 1 : RECHERCHE DE SIGNAL ---
    function renderSearchStage(mount) {
        const sLeft = Math.max(1, 90 - GState.pityS);
        const aLeft = Math.max(1, 10 - GState.pityA);
        const feat1 = POOL.S_featured[0] || POOL.S_all[0] || { name: 'Phoenix', img: 'assets/Agents/Phoenix.webp' };
        const feat2 = POOL.S_featured[1] || POOL.S_all[1] || { name: 'Velina', img: 'assets/Agents/Velina.webp' };

        mount.innerHTML = `
            <div class="gacha-stage-grid">
                <!-- Pile de Téléviseurs façon ZZZ (image_ac72fa.png) -->
                <div class="gacha-tv-showcase">
                    <div class="gacha-tv-stack">
                        <div class="gacha-crt-box tv-main">
                            <img src="${feat1.img}" alt="${feat1.name}" class="w-full h-full object-cover object-top">
                            <div class="absolute bottom-2 left-2 bg-black/85 border border-[#d7f70c] px-2.5 py-1 rounded text-[11px] font-black uppercase text-[#d7f70c]">
                                ★ RATE-UP : ${feat1.name}
                            </div>
                            <span class="gacha-crt-led"></span>
                        </div>
                        <div class="gacha-crt-box tv-side">
                            <img src="${feat2.img}" alt="${feat2.name}" class="w-full h-full object-cover object-top">
                            <div class="absolute bottom-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[9px] font-black uppercase text-white">
                                ${feat2.name}
                            </div>
                            <span class="gacha-crt-led"></span>
                        </div>
                        <div class="gacha-crt-box tv-bottom flex items-center justify-center bg-[#111]">
                            <div class="text-center p-2">
                                <span class="block text-[#d7f70c] font-display font-black italic text-xl">62 AGENTS</span>
                                <span class="text-[9px] text-zinc-400 uppercase font-bold">Rang S & A inclus</span>
                            </div>
                        </div>
                        <div class="gacha-crt-box tv-bottom flex items-center justify-center bg-[#111]">
                            <div class="text-center p-2">
                                <span class="block text-purple-400 font-display font-black italic text-xl">MOTEURS</span>
                                <span class="text-[9px] text-zinc-400 uppercase font-bold">Signatures & F2P</span>
                            </div>
                        </div>
                        <div class="gacha-crt-box tv-bottom flex items-center justify-center bg-[#111]">
                            <div class="text-center p-2">
                                <span class="block text-sky-400 font-display font-black italic text-xl">DISQUES</span>
                                <span class="text-[9px] text-zinc-400 uppercase font-bold">Sets Drive Discs</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Panneau de contrôle & Compteurs de Pity -->
                <div class="gacha-info-panel">
                    <div>
                        <span class="inline-block bg-[#d7f70c] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded mb-2">
                            CANAL UNIFIÉ • PATCH ${bannerInfo.patch}
                        </span>
                        <h2 class="font-display font-black italic text-3xl sm:text-4xl uppercase tracking-wide text-white leading-none">
                            Liste en vedette
                        </h2>
                        <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
                            Canal complet regroupant tous les Agents, Moteurs-Ampli et Sets de Disques de New Eridu. Complétez vos 3 quêtes quotidiennes en consultant les guides pour gagner 1 600 Polychromes chaque jour !
                        </p>
                    </div>

                    <div class="flex flex-col gap-2.5">
                        <div class="gacha-pity-pill">
                            <span class="text-zinc-300">Signal de <strong class="text-purple-400">rang A</strong> ou supérieur garanti !</span>
                            <span class="bg-purple-500/20 border border-purple-500/40 text-purple-300 px-2.5 py-0.5 rounded font-mono font-black">${aLeft} recherche(s)</span>
                        </div>
                        <div class="gacha-pity-pill">
                            <span class="text-zinc-300">Signal de <strong class="text-amber-400">rang S</strong> garanti ! <span class="text-[10px] text-zinc-500">(Soft Pity 75)</span></span>
                            <span class="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 rounded font-mono font-black">${sLeft} recherche(s)</span>
                        </div>
                        <div class="flex items-center justify-between text-[11px] text-zinc-400 px-1">
                            <span>Statut 50/50 Vedette : <strong class="text-white">${GState.guaranteedFeatured ? 'GARANTI 100%' : '50 / 50'}</strong></span>
                            <span>Total tirages : <strong class="text-white">${GState.totalPulls}</strong></span>
                        </div>
                    </div>

                    <div class="gacha-pull-actions">
                        <button type="button" class="gacha-pull-btn" id="btn-pull-1">
                            <span class="font-display font-black italic text-sm uppercase">1 Recherche</span>
                            <span class="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                                <img src="${ASSETS.tape}" class="w-4 h-4 object-contain" ${iconFallback('tape')}> ×1 <span class="text-zinc-600">ou</span> 160 Poly
                            </span>
                        </button>
                        <button type="button" class="gacha-pull-btn multi" id="btn-pull-10">
                            <span class="font-display font-black italic text-base uppercase">10 Recherches</span>
                            <span class="text-[11px] font-black flex items-center gap-1">
                                <img src="${ASSETS.tape}" class="w-4 h-4 object-contain" ${iconFallback('tape')}> ×10 <span class="opacity-70">ou</span> 1600 Poly
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('btn-pull-1').addEventListener('click', () => triggerPull(1));
        document.getElementById('btn-pull-10').addEventListener('click', () => triggerPull(10));
    }

    // --- ONGLET 2 : LES 3 QUÊTES QUOTIDIENNES FIXES ---
    function renderQuestsTab(mount) {
        const d = GState.daily;
        const quests = [
            {
                id: 'q1',
                title: 'Pointage Quotidien au QG',
                desc: 'Se connecter sur ProxyQG aujourd\'hui.',
                progress: d.visitDone ? 1 : 0,
                max: 1,
                reward: 600,
                claimed: !!d.claimed.q1
            },
            {
                id: 'q2',
                title: 'Analyse des Agents sur le terrain',
                desc: 'Consulter 3 guides d\'agents différents aujourd\'hui.',
                progress: Math.min(3, d.guidesOpened.length),
                max: 3,
                reward: 600,
                claimed: !!d.claimed.q2
            },
            {
                id: 'q3',
                title: 'Inspection de l\'Arsenal',
                desc: 'Cliquer sur 2 Moteurs-Ampli ou Sets de Disques dans les guides.',
                progress: Math.min(2, d.itemsInspected.length),
                max: 2,
                reward: 400,
                claimed: !!d.claimed.q3
            }
        ];

        mount.innerHTML = `
            <div class="max-w-3xl w-full mx-auto flex flex-col gap-4 my-auto">
                <div class="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h2 class="font-display font-black italic text-2xl sm:text-3xl uppercase text-white">Missions Quotidiennes Proxy</h2>
                        <p class="text-xs text-zinc-400 mt-1">Gagnez 1 600 Polychromes (1 Multi ×10) chaque jour en explorant les builds du site.</p>
                    </div>
                    <span class="bg-zinc-900 border border-zinc-700 text-zinc-300 text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg">
                        Reset : 00h00
                    </span>
                </div>

                <div class="flex flex-col gap-3">
                    ${quests.map(q => {
                        const isDone = q.progress >= q.max;
                        const canClaim = isDone && !q.claimed;
                        return `
                        <div class="bg-[#121216] border ${canClaim ? 'border-[#d7f70c]' : 'border-zinc-800'} rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div class="flex flex-col gap-1">
                                <div class="flex items-center gap-2.5">
                                    <span class="font-display font-black uppercase text-base text-white">${q.title}</span>
                                    <span class="text-xs font-mono font-black px-2 py-0.5 rounded ${isDone ? 'bg-[#d7f70c]/20 text-[#d7f70c]' : 'bg-zinc-800 text-zinc-400'}">${q.progress} / ${q.max}</span>
                                </div>
                                <p class="text-xs text-zinc-400">${q.desc}</p>
                            </div>
                            <div class="flex items-center gap-3 shrink-0">
                                <div class="flex items-center gap-1.5 bg-black/60 border border-zinc-800 px-3 py-1.5 rounded-xl">
                                    <img src="${ASSETS.polychrome}" class="w-5 h-5 object-contain" ${iconFallback('poly')}>
                                    <span class="font-mono font-black text-sm text-[#d7f70c]">+${q.reward}</span>
                                </div>
                                <button type="button" data-claim="${q.id}" data-reward="${q.reward}" ${!canClaim ? 'disabled' : ''}
                                    class="px-4 py-2 rounded-xl font-display font-black uppercase text-xs tracking-wider transition-all ${
                                        q.claimed
                                            ? 'bg-zinc-800 text-zinc-500 cursor-default'
                                            : (canClaim ? 'bg-[#d7f70c] text-black hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(215,247,12,0.4)]' : 'bg-zinc-900 border border-zinc-700 text-zinc-500 cursor-not-allowed')
                                    }">
                                    ${q.claimed ? 'Récupéré ✓' : (canClaim ? 'Récupérer' : 'En cours')}
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

    // --- ONGLET 3 : MAGASIN DE SIGNAUX (COMME IMAGE 6) ---
    function renderShopTab(mount) {
        mount.innerHTML = `
            <div class="max-w-3xl w-full mx-auto flex flex-col gap-5 my-auto">
                <div>
                    <h2 class="font-display font-black italic text-2xl sm:text-3xl uppercase text-white">Magasin de Signaux</h2>
                    <p class="text-xs text-zinc-400 mt-1">Échangez vos Polychromes ou vos Signaux résiduels (obtenus sur les doublons) contre des Bandes maîtresses chiffrées.</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <!-- Échange Polychromes -> Bande -->
                    <div class="bg-gradient-to-b from-[#2a1215] to-[#121216] border-2 border-[#d7f70c] rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-xl">
                        <span class="bg-[#d7f70c] text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full">Échange Polychromes</span>
                        <img src="${ASSETS.tape}" class="w-20 h-20 object-contain my-1" ${iconFallback('tape')}>
                        <h3 class="font-display font-black uppercase text-lg text-white">Bande maîtresse chiffrée ×1</h3>
                        <p class="text-xs text-zinc-400">Coût : 160 Polychromes</p>
                        <div class="flex gap-2 w-full mt-2">
                            <button type="button" id="buy-tape-1" class="flex-1 bg-[#d7f70c] hover:bg-yellow-300 text-black font-black text-xs uppercase py-2.5 rounded-xl cursor-pointer transition-transform hover:scale-105">
                                Acheter ×1 (160)
                            </button>
                            <button type="button" id="buy-tape-10" class="flex-1 bg-white hover:bg-[#d7f70c] text-black font-black text-xs uppercase py-2.5 rounded-xl cursor-pointer transition-transform hover:scale-105">
                                Acheter ×10 (1600)
                            </button>
                        </div>
                    </div>

                    <!-- Échange Signaux Résiduels -> Bande -->
                    <div class="bg-gradient-to-b from-[#1e1b4b] to-[#121216] border-2 border-purple-500/60 rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-xl">
                        <span class="bg-purple-400 text-black text-[10px] font-black uppercase px-3 py-0.5 rounded-full">Signal Résiduel (Doublons)</span>
                        <img src="${ASSETS.tape}" class="w-20 h-20 object-contain my-1" ${iconFallback('tape')}>
                        <h3 class="font-display font-black uppercase text-lg text-white">Bande Bonus ×1</h3>
                        <p class="text-xs text-zinc-400">Coût : 20 Signaux résiduels (✦)</p>
                        <button type="button" id="buy-residual-1" class="w-full mt-2 bg-purple-500 hover:bg-purple-400 text-white font-black text-xs uppercase py-2.5 rounded-xl cursor-pointer transition-transform hover:scale-105">
                            Échanger 20 ✦ contre 1 Bande
                        </button>
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
                renderCurrentTab();
            }
        });
        document.getElementById('buy-residual-1').addEventListener('click', () => {
            if (GState.residual >= 20) {
                GState.residual -= 20;
                GState.tapes += 1;
                saveState(GState);
                updateTopCurrencies();
            }
        });
    }

    // --- ONGLET 4 : COLLECTION DU JOUEUR ---
    function renderCollectionTab(mount) {
        const items = Object.values(GState.inventory || {});
        const rankOrder = { S: 0, A: 1, B: 2 };
        items.sort((a, b) => (rankOrder[a.rank] ?? 9) - (rankOrder[b.rank] ?? 9) || b.count - a.count);

        if (items.length === 0) {
            mount.innerHTML = `<div class="m-auto text-center text-zinc-500 font-bold">Aucun signal obtenu pour le moment. Lancez une recherche !</div>`;
            return;
        }

        mount.innerHTML = `
            <div class="max-w-5xl w-full mx-auto flex flex-col gap-4">
                <div class="flex items-center justify-between">
                    <h2 class="font-display font-black italic text-2xl uppercase text-white">Archives Débloquées (${items.length})</h2>
                    <span class="text-xs text-zinc-400">Cliquez sur un Agent ou Équipement pour ouvrir sa fiche</span>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    ${items.map(it => {
                        const copyLabel = it.type === 'agent'
                            ? `M${Math.min(6, it.count - 1)}`
                            : `×${it.count}`;
                        const borderCol = it.rank === 'S' ? '#eab308' : (it.rank === 'A' ? '#a855f7' : '#3b82f6');
                        return `
                        <div class="bg-[#121216] border-2 rounded-xl p-2.5 flex flex-col items-center gap-2 cursor-pointer hover:scale-105 transition-transform relative"
                             style="border-color:${borderCol};"
                             data-col-type="${it.type}" data-col-key="${it.rawKey}">
                            <span class="absolute top-1.5 left-1.5 bg-black/85 text-[10px] font-mono font-black px-1.5 py-0.5 rounded" style="color:${borderCol};">${it.rank}</span>
                            <span class="absolute top-1.5 right-1.5 bg-[#d7f70c] text-black text-[9px] font-mono font-black px-1.5 py-0.5 rounded">${copyLabel}</span>
                            <img src="${it.img}" loading="lazy" class="w-16 h-16 object-contain mt-3">
                            <span class="text-[10px] font-display font-black uppercase text-center truncate w-full text-white">${it.name}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;

        mount.querySelectorAll('[data-col-type]').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-col-type');
                const key = card.getAttribute('data-col-key');
                openItemFromGacha(type, key);
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
    // 5. EXÉCUTION DU TIRAGE & ANIMATION TV ZZZ
    // ==========================================
    async function triggerPull(count) {
        await ensurePoolLoaded();
        GState = loadState();

        // Vérifie les Bandes maîtresses ou convertit automatiquement les Polychromes (160 / pull)
        if (GState.tapes < count) {
            const missingTapes = count - GState.tapes;
            const neededPoly = missingTapes * 160;
            if (GState.polychromes >= neededPoly) {
                GState.polychromes -= neededPoly;
                GState.tapes += missingTapes;
            } else {
                // Pas assez de Polychromes : bascule sur l'onglet Quêtes du Jour
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
        skipRequested = false;
        animOverlayEl.classList.add('active');

        // Construction de la pyramide de 10 téléviseurs (comme sur image_ac7641.png)
        const tvCount = results.length;
        const padded = tvCount === 1
            ? [results[0]]
            : results;

        const rowsHTML = tvCount === 1
            ? `<div class="gacha-tv-row"><div class="gacha-anim-tv" id="gtv-0" style="width:180px;height:135px;"><span class="gacha-tv-letter">${padded[0].rank}</span></div></div>`
            : `
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-0"><span class="gacha-tv-letter">${padded[0].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-1"><span class="gacha-tv-letter">${padded[1].rank}</span></div>
                </div>
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-2"><span class="gacha-tv-letter">${padded[2].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-3"><span class="gacha-tv-letter">${padded[3].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-4"><span class="gacha-tv-letter">${padded[4].rank}</span></div>
                </div>
                <div class="gacha-tv-row">
                    <div class="gacha-anim-tv" id="gtv-5"><span class="gacha-tv-letter">${padded[5].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-6"><span class="gacha-tv-letter">${padded[6].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-7"><span class="gacha-tv-letter">${padded[7].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-8"><span class="gacha-tv-letter">${padded[8].rank}</span></div>
                    <div class="gacha-anim-tv" id="gtv-9"><span class="gacha-tv-letter">${padded[9].rank}</span></div>
                </div>
            `;

        animOverlayEl.innerHTML = `
            <button type="button" class="gacha-skip-btn" id="gacha-skip-anim">Skip</button>
            <div class="gacha-tv-pyramid">${rowsHTML}</div>
        `;

        const showFinalScreen = () => {
            skipRequested = true;
            renderSearchResultsScreen(results);
        };

        document.getElementById('gacha-skip-anim').addEventListener('click', showFinalScreen);

        // Allumage séquentiel des téléviseurs avec les lettres B / A / S
        padded.forEach((item, idx) => {
            setTimeout(() => {
                if (skipRequested) return;
                const tv = document.getElementById(`gtv-${idx}`);
                if (tv) tv.classList.add(`lit-${item.rank}`);
            }, 140 + idx * 140);
        });

        // Passage automatique à l'écran SEARCH RESULTS (image_ac7622.png)
        const totalDuration = 140 + padded.length * 140 + 750;
        setTimeout(() => {
            if (!skipRequested) renderSearchResultsScreen(results);
        }, totalDuration);
    }

    // Écran SEARCH RESULTS fidèle à image_ac7622.png (Tri S -> A -> B en grille 2x5)
    function renderSearchResultsScreen(results) {
        const rankWeight = { S: 0, A: 1, B: 2 };
        const sorted = [...results].sort((a, b) => (rankWeight[a.rank] ?? 9) - (rankWeight[b.rank] ?? 9));

        const cardsHTML = sorted.map((item, idx) => {
            const delay = idx * 45;
            const fitClass = item.type === 'agent' ? 'object-cover object-top scale-105' : 'object-contain p-2.5';
            const newTag = item.isNew
                ? `<span class="absolute top-1.5 right-1.5 z-10 bg-[#d7f70c] text-black text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">NEW!</span>`
                : `<span class="absolute bottom-1.5 right-1.5 z-10 bg-black/80 border border-white/15 text-zinc-200 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">✦ +${item.rank === 'S' ? 40 : (item.rank === 'A' ? 8 : 2)}</span>`;

            return `
            <div class="gacha-result-card rank-${item.rank}" style="animation-delay:${delay}ms"
                 data-res-type="${item.type}" data-res-key="${item.rawKey}" title="${item.name} (Cliquer pour inspecter)">
                ${newTag}
                <img src="${item.img}" alt="${item.name}" class="w-full h-full ${fitClass}">
                <div class="gacha-card-letter-badge">
                    <span class="big-r">${item.rank}</span>
                    <span class="sub-r">RANK</span>
                </div>
            </div>`;
        }).join('');

        animOverlayEl.innerHTML = `
            <div class="gacha-results-wrap">
                <h2 class="gacha-results-title">SEARCH RESULTS</h2>
                <div class="gacha-results-grid">
                    ${cardsHTML}
                </div>
                <div class="flex items-center gap-4 bg-[#121216] border border-zinc-700 rounded-full px-5 py-2 shadow-2xl mt-2">
                    <span class="text-xs font-mono font-bold text-zinc-300">✦ ${GState.residual}</span>
                    <span class="text-xs font-mono font-bold text-[#d7f70c] flex items-center gap-1">
                        <img src="${ASSETS.polychrome}" class="w-4 h-4 object-contain" ${iconFallback('poly')}> ${GState.polychromes}
                    </span>
                    <button type="button" id="gacha-confirm-results" class="bg-[#1f1f24] hover:bg-[#d7f70c] text-white hover:text-black border border-zinc-600 font-display font-black italic uppercase text-sm px-8 py-2 rounded-full cursor-pointer transition-colors">
                        Confirm
                    </button>
                </div>
            </div>
        `;

        document.getElementById('gacha-confirm-results').addEventListener('click', () => {
            animOverlayEl.classList.remove('active');
            renderCurrentTab();
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
    // 6. OUVERTURE / FERMETURE PUBLIQUE
    // ==========================================
    window.openGachaModal = async function () {
        createModalDOM();
        await ensurePoolLoaded();
        GState = loadState();
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

    window.addEventListener('DOMContentLoaded', () => {
        updateQuestNotificationDot(GState);
    });
})();
