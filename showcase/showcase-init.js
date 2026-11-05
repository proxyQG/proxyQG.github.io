// showcase/showcase-init.js - Contrôleur Isolé FAE V2 Showcase, Leaderboards & Calculator
import {
    WORKER_BASE_URL,
    ELEMENT_COLORS,
    AGENT_CUSTOM_COLORS,
    detectRegionFromUID,
    evaluateAgentBuild,
    computeCalculatorSimulation,
    getSeedProfileFor1501142769
} from './showcase-math.js?v=1';

(function () {
    try {
        const STORAGE_ACCOUNTS_KEY = 'zzz_proxyqg_showcase_accounts_v1';
        const STORAGE_PROFILES_KEY = 'zzz_proxyqg_showcase_profiles_v1';

        let modalEl = null;
        let currentView = 'profile'; // 'profile' | 'leaderboards' | 'calculator'
        let activeUID = '1501142769';
        let activeCalcAgentName = 'Evelyn';
        let calcState = {
            mindscape: 0,
            refinement: 5,
            enemyDef: 952,
            rolls: { ATK_: 11, ATK: 1, CR: 15, CDMG: 13, PEN: 2 }
        };
        let allSiteAgents = [];

        // Charge la feuille de style isolée showcase/showcase.css
        if (!document.getElementById('zzz-showcase-css')) {
            const link = document.createElement('link');
            link.id = 'zzz-showcase-css';
            link.rel = 'stylesheet';
            link.href = 'showcase/showcase.css?v=1';
            document.head.appendChild(link);
        }

        fetch('js/data/agents.json').then(r => r.json()).then(list => {
            allSiteAgents = Array.isArray(list) ? list : [];
        }).catch(() => {});

        // ========================================================
        // 1. GESTION DES COMPTES MÉMORISÉS & PROFILS (FUSION 5+5 AGENTS)
        // ========================================================
        function getSavedAccounts() {
            try {
                const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
                if (raw) return JSON.parse(raw);
            } catch (e) {}
            const defaults = {
                myAccount: { uid: '1501142769', nickname: 'LilToxic', region: 'EU', avatar: 'assets/Agents/Burnice.webp' },
                others: [
                    { uid: '1500984120', nickname: 'kurt', region: 'EU', avatar: 'assets/Agents/Ellen.webp' },
                    { uid: '1304419822', nickname: 'Zaciicia', region: 'ASIA', avatar: 'assets/Agents/Caesar.webp' },
                    { uid: '1002918451', nickname: 'bryperson', region: 'NA', avatar: 'assets/Agents/Nicole.webp' },
                    { uid: '1008841209', nickname: 'MiyabisWetSock', region: 'NA', avatar: 'assets/Agents/Miyabi.webp' }
                ]
            };
            localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(defaults));
            return defaults;
        }

        function getSavedProfilesMap() {
            try {
                const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
                if (raw) return JSON.parse(raw);
            } catch (e) {}
            const seed = { '1501142769': getSeedProfileFor1501142769() };
            localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(seed));
            return seed;
        }

        function saveProfilesMap(map) {
            try {
                localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(map));
            } catch (e) {}
        }

        // Fusionne les nouveaux agents du Showcase en jeu avec les anciens déjà sauvegardés (sans écraser les agents verrouillés 🔒)
        function mergeShowcaseProfile(uid, incomingProfile) {
            const map = getSavedProfilesMap();
            const existing = map[uid];
            if (!existing) {
                map[uid] = incomingProfile;
                saveProfilesMap(map);
                return incomingProfile;
            }

            const mergedAgents = [...(existing.agents || [])];
            (incomingProfile.agents || []).forEach(newAg => {
                const idx = mergedAgents.findIndex(a => a.name === newAg.name);
                if (idx !== -1) {
                    // Si l'utilisateur a verrouillé (🔒) le build de cet agent, on ne l'écrase pas !
                    if (!mergedAgents[idx].locked) {
                        mergedAgents[idx] = { ...newAg, favorite: mergedAgents[idx].favorite, locked: false };
                    }
                } else {
                    mergedAgents.push(newAg);
                }
            });

            const updated = {
                ...existing,
                nickname: incomingProfile.nickname || existing.nickname,
                region: incomingProfile.region || existing.region,
                signature: incomingProfile.signature || existing.signature,
                updatedAt: '03 November 2026',
                agents: mergedAgents
            };
            map[uid] = updated;
            saveProfilesMap(map);
            return updated;
        }

        // ========================================================
        // 2. INJECTION DE LA BARRE UID À DROITE DU COMPTEUR P2 (PC) & MOBILE
        // ========================================================
        function injectHeaderUIDBar() {
            const desktopTimer = document.getElementById('patchTimerDesktop');
            if (desktopTimer && !document.getElementById('zsc-header-uid-widget')) {
                const accts = getSavedAccounts();
                const widget = document.createElement('div');
                widget.id = 'zsc-header-uid-widget';
                widget.className = 'zsc-header-widget hidden xl:flex';
                widget.innerHTML = `
                    <svg class="zsc-header-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" id="zsc-header-uid-input" class="zsc-header-input" placeholder="UID (ex: 1501142769)" value="${accts.myAccount?.uid || '1501142769'}" autocomplete="off">
                    <button type="button" id="zsc-header-uid-btn" class="zsc-header-go-btn">
                        <span>Profil</span>
                        <span>➔</span>
                    </button>
                    <div id="zsc-header-uid-dropdown" class="zsc-uid-dropdown"></div>
                `;
                desktopTimer.insertAdjacentElement('afterend', widget);

                const inp = document.getElementById('zsc-header-uid-input');
                const btn = document.getElementById('zsc-header-uid-btn');
                const drop = document.getElementById('zsc-header-uid-dropdown');

                const renderDropdown = () => {
                    const data = getSavedAccounts();
                    drop.innerHTML = `
                        <div class="zsc-uid-group-title">My Account</div>
                        <div class="zsc-uid-acct-row" data-pick-uid="${data.myAccount.uid}">
                            <div class="zsc-uid-acct-left">
                                <img src="${data.myAccount.avatar}" class="zsc-uid-acct-ava" alt="">
                                <span class="zsc-uid-acct-name">${data.myAccount.nickname}</span>
                            </div>
                            <span class="zsc-uid-region-pill">${data.myAccount.region}</span>
                        </div>
                        <div class="zsc-uid-group-title others">Other Accounts</div>
                        ${data.others.map(o => `
                            <div class="zsc-uid-acct-row" data-pick-uid="${o.uid}">
                                <div class="zsc-uid-acct-left">
                                    <img src="${o.avatar}" class="zsc-uid-acct-ava" alt="">
                                    <span class="zsc-uid-acct-name">${o.nickname}</span>
                                </div>
                                <span class="zsc-uid-region-pill">${o.region}</span>
                            </div>
                        `).join('')}
                    `;
                    drop.querySelectorAll('[data-pick-uid]').forEach(row => {
                        row.addEventListener('click', () => {
                            const picked = row.getAttribute('data-pick-uid');
                            inp.value = picked;
                            drop.classList.remove('open');
                            openShowcaseModal(picked);
                        });
                    });
                };

                inp.addEventListener('focus', () => {
                    renderDropdown();
                    drop.classList.add('open');
                });

                inp.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        drop.classList.remove('open');
                        openShowcaseModal(inp.value.trim());
                    }
                });

                btn.addEventListener('click', () => {
                    drop.classList.remove('open');
                    openShowcaseModal(inp.value.trim());
                });

                document.addEventListener('mousedown', (e) => {
                    if (!widget.contains(e.target)) {
                        drop.classList.remove('open');
                    }
                });
            }

            // Barre rapide sur Mobile/Tablette juste sous #patchTimerMobile
            const mobileTimer = document.getElementById('patchTimerMobile');
            if (mobileTimer && !document.getElementById('zsc-mobile-uid-bar')) {
                const mbar = document.createElement('div');
                mbar.id = 'zsc-mobile-uid-bar';
                mbar.className = 'zsc-mobile-bar';
                mbar.innerHTML = `
                    <svg class="w-4 h-4 text-[#d7f70c] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" id="zsc-mobile-uid-input" class="zsc-header-input" style="flex:1;width:auto;" placeholder="Rechercher un UID (ex: 1501142769)" value="1501142769">
                    <button type="button" id="zsc-mobile-uid-btn" class="zsc-header-go-btn">Showcase ➔</button>
                `;
                mobileTimer.insertAdjacentElement('afterend', mbar);

                document.getElementById('zsc-mobile-uid-btn').addEventListener('click', () => {
                    const val = document.getElementById('zsc-mobile-uid-input').value.trim();
                    openShowcaseModal(val);
                });
            }
        }

        // ========================================================
        // 3. OUVERTURE & RENDU DU MODAL SHOWCASE (PROFIL, LEADERBOARDS, CALCULATEUR)
        // ========================================================
        function ensureModalDOM() {
            if (modalEl) return;
            modalEl = document.createElement('div');
            modalEl.id = 'zzz-showcase-modal';
            document.body.appendChild(modalEl);
        }

        function openShowcaseModal(uidInput) {
            ensureModalDOM();
            const cleanUid = String(uidInput || '1501142769').replace(/\D/g, '') || '1501142769';
            activeUID = cleanUid;

            const map = getSavedProfilesMap();
            if (!map[activeUID]) {
                // Crée un profil initialisé avec la région détectée
                const seed = getSeedProfileFor1501142769();
                map[activeUID] = {
                    ...seed,
                    uid: activeUID,
                    nickname: cleanUid === '1501142769' ? 'LilToxic' : `Proxy #${cleanUid.slice(-4)}`,
                    region: detectRegionFromUID(cleanUid)
                };
                saveProfilesMap(map);
            }

            currentView = 'profile';
            renderShowcaseModal();
            document.body.classList.add('modal-open');
            modalEl.classList.add('visible');
        }
        window.openZZZShowcaseModal = openShowcaseModal;

        function closeShowcaseModal() {
            if (!modalEl) return;
            modalEl.classList.remove('visible');
            document.body.classList.remove('modal-open');
        }

        // Export PNG Haute Définition d'une Carte d'Agent
        function exportAgentCardSummary(agEval, profile) {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 630;
            const ctx = canvas.getContext('2d');

            const col = AGENT_CUSTOM_COLORS[agEval.name] || ELEMENT_COLORS[agEval.element] || '#e11d48';
            const grad = ctx.createLinearGradient(0, 0, 1200, 630);
            grad.addColorStop(0, col);
            grad.addColorStop(0.55, '#121218');
            grad.addColorStop(1, '#09090d');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1200, 630);

            ctx.strokeStyle = col;
            ctx.lineWidth = 6;
            ctx.strokeRect(12, 12, 1176, 606);

            ctx.fillStyle = '#ffffff';
            ctx.font = '900 italic 44px Montserrat, sans-serif';
            ctx.fillText(`${agEval.name.toUpperCase()} (M${agEval.mindscape || 0}) — PROXYQG SHOWCASE`, 48, 72);

            ctx.fillStyle = '#d7f70c';
            ctx.font = '800 22px monospace';
            ctx.fillText(`${profile.nickname} (${profile.region}) • UID ${profile.uid} • Rank #${agEval.lbRank} / ${agEval.lbTotal} (Top ${agEval.topPct}%)`, 48, 112);

            ctx.fillStyle = '#f4f4f5';
            ctx.font = '800 24px Montserrat, sans-serif';
            ctx.fillText(`Impactful Substats : ${agEval.totalMajor}${agEval.totalMinor > 0 ? ' + ' + agEval.totalMinor : ''} rolls`, 48, 165);

            agEval.discs.forEach((d, idx) => {
                const y = 220 + idx * 62;
                ctx.fillStyle = 'rgba(12,12,18,0.85)';
                ctx.fillRect(48, y, 1104, 52);
                ctx.fillStyle = '#d7f70c';
                ctx.font = '900 italic 26px Montserrat, sans-serif';
                ctx.fillText(`[${d.slot}] Note ${d.eval.grade}`, 68, y + 35);
                ctx.fillStyle = '#ffffff';
                ctx.font = '700 20px sans-serif';
                const subsTxt = d.substats.map(s => `${s.key}${s.up > 0 ? ' +' + s.up : ''}`).join('  •  ');
                ctx.fillText(`Main: ${d.main}   |   ${subsTxt}`, 260, y + 34);
            });

            const a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = `ProxyQG_${agEval.name}_${profile.uid}.png`;
            a.click();
        }

        function renderShowcaseModal() {
            const map = getSavedProfilesMap();
            const profile = map[activeUID] || getSeedProfileFor1501142769();
            const evaluatedAgents = (profile.agents || []).map(ag => evaluateAgentBuild(ag));

            const railHTML = evaluatedAgents.map((ag, idx) => `
                <div class="zsc-rail-avatar ${idx === 0 ? 'active' : ''}" data-scroll-agent="${ag.name}" title="${ag.name}">
                    <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}">
                    ${ag.locked ? `<span class="zsc-rail-lock-dot">🔒</span>` : ''}
                </div>
            `).join('');

            let mainViewHTML = '';
            if (currentView === 'leaderboards') {
                mainViewHTML = renderLeaderboardsView(evaluatedAgents);
            } else if (currentView === 'calculator') {
                mainViewHTML = renderCalculatorView(evaluatedAgents);
            } else {
                mainViewHTML = renderProfileCardsView(profile, evaluatedAgents);
            }

            modalEl.innerHTML = `
                <div class="zsc-topbar">
                    <div class="zsc-top-brand">
                        <button type="button" class="zsc-close-btn" id="zsc-btn-close">
                            <span>← Retour QG</span>
                        </button>
                        <div class="zsc-logo-title">
                            <span>FAE</span>
                            <span class="zsc-v2-pill">V2 • PROXYQG</span>
                        </div>
                    </div>

                    <div class="zsc-top-search-wrap">
                        <svg class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input type="text" id="zsc-modal-uid-inp" class="zsc-top-search-box" value="${profile.uid}" placeholder="Search by UID...">
                    </div>

                    <div class="zsc-top-nav-icons">
                        <button type="button" class="zsc-nav-icon-btn ${currentView === 'profile' ? 'active' : ''}" data-zsc-view="profile">
                            <span>👤 Profil (${evaluatedAgents.length})</span>
                        </button>
                        <button type="button" class="zsc-nav-icon-btn ${currentView === 'leaderboards' ? 'active' : ''}" data-zsc-view="leaderboards">
                            <span>📊 Leaderboards</span>
                        </button>
                        <button type="button" class="zsc-nav-icon-btn ${currentView === 'calculator' ? 'active' : ''}" data-zsc-view="calculator">
                            <span>🧮 Calculator</span>
                        </button>
                    </div>
                </div>

                <div class="zsc-body-layout">
                    <aside class="zsc-left-rail">${railHTML}</aside>
                    <div class="zsc-main-scroll custom-scrollbar" id="zsc-scroll-container">
                        <div class="zsc-container">
                            ${mainViewHTML}
                        </div>
                    </div>
                </div>
            `;

            bindShowcaseEvents(profile, evaluatedAgents);
        }

        // --- VUE 1 : PROFIL & CARTES D'AGENTS (RÉPLIQUE EXACTE FAE V2) ---
        function renderProfileCardsView(profile, evaluatedAgents) {
            const cardsHTML = evaluatedAgents.map(ag => {
                const agColor = AGENT_CUSTOM_COLORS[ag.name] || ELEMENT_COLORS[ag.element] || '#e11d48';
                const leftDiscs = ag.discs.filter(d => d.slot <= 3);
                const rightDiscs = ag.discs.filter(d => d.slot >= 4);

                const renderDiscWing = (d, isRight) => {
                    const gClass = d.eval.grade === 'S+' ? 'zsc-grade-Sp' : `zsc-grade-${d.eval.grade}`;
                    return `
                        <div class="zsc-disc-Wing ${isRight ? 'right-side' : ''}">
                            <div class="zsc-grade-circle ${gClass}">${d.eval.grade}</div>
                            <div class="zsc-disc-stats-mid">
                                <span class="zsc-disc-main-pill">${d.main}</span>
                                ${d.substats.map(s => {
                                    const isMaj = ag.weights.major.includes(s.key);
                                    const isMin = ag.weights.minor.includes(s.key);
                                    const cls = isMaj ? 'sub-major' : (isMin ? 'sub-minor' : '');
                                    const dispName = s.key.replace('_', '%');
                                    return `
                                    <div class="zsc-disc-sub-row ${cls}">
                                        <span>${dispName}</span>
                                        <span>${s.up > 0 ? `+${s.up}` : ''}</span>
                                    </div>`;
                                }).join('')}
                            </div>
                            <div class="zsc-disc-set-circle">
                                <img src="${d.setImg}" alt="">
                            </div>
                        </div>
                    `;
                };

                const st = ag.stats || {};
                const statRows = [
                    { k: 'HP',    lbl: 'HP',     d: st.hp },
                    { k: 'DEF',   lbl: 'DEF',    d: st.def },
                    { k: 'ATK',   lbl: 'ATK',    d: st.atk },
                    { k: 'IMP',   lbl: 'Impact', d: st.imp },
                    { k: 'CR',    lbl: 'CR',     d: st.cr },
                    { k: 'CDMG',  lbl: 'CDMG',   d: st.cdmg },
                    { k: 'AP',    lbl: 'AP',     d: st.ap },
                    { k: 'AM',    lbl: 'AM',     d: st.am },
                    { k: 'PEN',   lbl: 'PEN',    d: st.pen },
                    { k: 'ER',    lbl: 'ER',     d: st.er },
                    { k: 'DMG',   lbl: st.dmg?.label || 'DMG%', d: st.dmg }
                ].filter(r => r.d && (r.d.init || r.d.buffed));

                const rollChipsHTML = Object.entries(ag.rollSummary).map(([k, count]) => `
                    <div class="zsc-roll-chip">
                        <span class="zsc-roll-count-badge">${count}x</span>
                        <span>${k.replace('_', '%')}</span>
                    </div>
                `).join('');

                return `
                <section class="zsc-agent-card" id="zsc-card-${ag.name}" style="--ag-color: ${agColor};">
                    <div class="zsc-card-watermark" style="background-image:url('assets/splash/${ag.name}.webp'), url('assets/Agents/${ag.name}.webp');"></div>

                    <!-- 7 Boutons d'Action FAE en haut à droite -->
                    <div class="zsc-card-actions">
                        <button type="button" class="zsc-card-act-btn" data-act-export="${ag.name}" title="Exporter la carte en PNG">📷</button>
                        <button type="button" class="zsc-card-act-btn" data-act-calc="${ag.name}" title="Ouvrir dans le Calculateur">🧮</button>
                        <button type="button" class="zsc-card-act-btn" data-act-guide="${ag.name}" title="Voir le Guide ProxyQG">📖</button>
                        <button type="button" class="zsc-card-act-btn ${ag.favorite ? 'active' : ''}" data-act-fav="${ag.name}" title="Épingler en favori">☆</button>
                        <button type="button" class="zsc-card-act-btn ${ag.locked ? 'active' : ''}" data-act-lock="${ag.name}" title="Verrouiller ce build contre l'écrasement">${ag.locked ? '🔒' : '🔓'}</button>
                        <button type="button" class="zsc-card-act-btn" data-act-del="${ag.name}" title="Retirer de la liste">🗑</button>
                    </div>

                    <!-- En-tête centré (M0 + Avatar + Nom + Leaderboard Rank) -->
                    <div class="zsc-card-header">
                        <div class="zsc-card-title-row">
                            <div class="zsc-card-ava-wrap">
                                <span class="zsc-card-m-badge">M${ag.mindscape || 0}</span>
                                <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}">
                            </div>
                            <h3 class="zsc-card-agent-name">${ag.name}</h3>
                        </div>
                        <div class="zsc-card-lb-line">
                            <span style="color:#8e8e99;">Leaderboard</span>
                            <strong>${ag.leaderboardName || 'S Rank Limited W-Engines'} ⌄</strong>
                        </div>
                        <div class="zsc-card-rank-row">
                            <span>Rank <strong style="color:#fff;">#${ag.lbRank}</strong> out of <strong style="color:#fff;">${ag.lbTotal}</strong></span>
                            <span class="zsc-pct-badge">${ag.topPct}% 🔥</span>
                        </div>
                    </div>

                    <!-- Corps : Colonne Stats Initial > Buffed à gauche + Roue 6 Disques au centre -->
                    <div class="zsc-card-body">
                        <div class="zsc-stats-panel">
                            <div class="zsc-supports-box">
                                <span style="font-size:10.5px;font-weight:800;color:#d4d4d8;">Supports</span>
                                <div class="zsc-supports-slots">
                                    <div class="zsc-sup-slot" title="Support 1">1</div>
                                    <div class="zsc-sup-slot" title="Support 2">2</div>
                                </div>
                            </div>

                            <div class="zsc-stats-head">
                                <span><strong style="color:#fff;">Stats</strong> &nbsp;Buffs</span>
                                <span>Initial &gt; <strong style="color:var(--ag-color);">Buffed</strong></span>
                            </div>

                            <div class="zsc-stats-list">
                                ${statRows.map(r => `
                                    <div class="zsc-stat-line ${r.d.highlight ? 'is-major' : 'is-minor'}">
                                        <span>${r.lbl}</span>
                                        <span class="zsc-stat-vals">
                                            ${r.d.init ? `<span style="color:${r.d.buffed ? '#71717a' : 'inherit'};">${r.d.init}</span>` : ''}
                                            ${r.d.init && r.d.buffed ? `<span style="color:#52525b;">&gt;</span>` : ''}
                                            ${r.d.buffed ? `<span style="color:${r.d.highlight ? 'var(--ag-color)' : '#fff'};">${r.d.buffed}</span>` : ''}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="zsc-discs-assembly">
                            <div class="zsc-disc-col">
                                ${leftDiscs.map(d => renderDiscWing(d, false)).join('')}
                            </div>

                            <div class="zsc-center-wengine">
                                <span class="zsc-wengine-ref-pill">R${ag.engine?.refinement || 1}</span>
                                <img src="${ag.engine?.img || 'assets/W-Engine/Starlight_Engine.webp'}" alt="">
                            </div>

                            <div class="zsc-disc-col">
                                ${rightDiscs.map(d => renderDiscWing(d, true)).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Pied de Carte : Résumé des Rolls + Popover Major/Minor Substats -->
                    <div class="zsc-card-footer">
                        <div class="zsc-roll-chips">${rollChipsHTML}</div>
                        <div class="zsc-bottom-meta">
                            <span>Last update - ${ag.updatedAt || profile.updatedAt}</span>
                            <div class="zsc-impactful-trigger">
                                <span>Impactful substats &nbsp;<strong style="color:#fff;">${ag.totalMajor}</strong>${ag.totalMinor > 0 ? ` <strong style="color:var(--ag-color);">+ ${ag.totalMinor}</strong>` : ''}</span>
                                <div class="zsc-substats-popover">
                                    <div>
                                        <div style="font-size:9px;font-weight:900;color:#71717a;margin-bottom:4px;">MAJOR SUBSTATS</div>
                                        ${ag.weights.major.map(m => `<div style="font-size:11px;font-weight:900;color:#fff;padding:2px 0;">${m.replace('_', '%')}</div>`).join('')}
                                    </div>
                                    <div>
                                        <div style="font-size:9px;font-weight:900;color:#71717a;margin-bottom:4px;">MINOR SUBSTATS</div>
                                        ${ag.weights.minor.map(m => `<div style="font-size:11px;font-weight:800;color:#a1a1aa;padding:2px 0;">${m.replace('_', '%')}</div>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <span>UID • ${profile.uid}</span>
                        </div>
                    </div>
                </section>`;
            }).join('');

            return `
                <div class="zsc-profile-header">
                    <div class="zsc-profile-id">
                        <img src="${profile.avatarImg || 'assets/Agents/Burnice.webp'}" class="zsc-profile-ava" alt="">
                        <div>
                            <div class="zsc-profile-name-row">
                                <h2 class="zsc-profile-name">${profile.nickname}</h2>
                                <span class="zsc-uid-region-pill">${profile.region}</span>
                            </div>
                            <p class="zsc-profile-bio">${profile.signature || 'Proxy de New Eridu'}</p>
                        </div>
                    </div>
                    <button type="button" class="zsc-update-btn" id="zsc-btn-sync-enka">
                        <span>↻ Update from Showcase</span>
                    </button>
                </div>

                <div class="zsc-controls-bar">
                    <div class="zsc-sort-pills">
                        <button type="button" class="zsc-sort-btn active">Top%</button>
                        <button type="button" class="zsc-sort-btn">Rank</button>
                        <button type="button" class="zsc-sort-btn">Date</button>
                    </div>
                    <div style="font-size:11.5px;color:#8e8e99;font-weight:700;">
                        💡 Changez vos 5 agents en vitrine en jeu puis cliquez sur <strong style="color:#c4b5fd;">Update from Showcase</strong> pour cumuler tous vos agents.
                    </div>
                </div>

                ${cardsHTML}
            `;
        }

        // --- VUE 2 : CALCULATEUR INTERACTIF (IMAGE 4 : EVELYN CALCULATOR) ---
        function renderCalculatorView(evaluatedAgents) {
            const ag = evaluatedAgents.find(a => a.name === activeCalcAgentName) || evaluatedAgents[0];
            const sim = computeCalculatorSimulation(ag, calcState);

            return `
                <div class="zsc-calc-box">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                        <div style="display:flex;align-items:center;gap:12px;">
                            <img src="assets/Agents/${ag.name}.webp" style="width:48px;height:48px;border-radius:999px;border:2px solid #a78bfa;object-fit:cover;object-position:top center;">
                            <div>
                                <button type="button" class="gacha-details-btn" id="zsc-calc-back" style="margin-bottom:4px;">← Back to agent card</button>
                                <h2 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:22px;color:#fff;">${ag.name} Calculator</h2>
                            </div>
                        </div>
                        <select id="zsc-calc-pick-agent" class="gacha-col-search">
                            ${evaluatedAgents.map(a => `<option value="${a.name}" ${a.name === ag.name ? 'selected' : ''}>${a.name}</option>`).join('')}
                        </select>
                    </div>

                    <div style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.4);border-radius:14px;padding:10px 14px;font-size:11.5px;color:#e4e4e7;">
                        Ajustez les statistiques principales et le nombre de rolls de sous-statistiques pour observer le <strong>gain marginal exact (+X,XXX%)</strong> de chaque roll supplémentaire sur les dégâts finaux en combat.
                    </div>

                    <div class="zsc-calc-grid">
                        <!-- Colonne 1 : Mindscape, Arme & Sets -->
                        <div class="zsc-calc-panel">
                            <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Mindscapes (M0–M6)</span>
                            <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                                <button type="button" class="gacha-details-btn" data-calc-m="-1">−</button>
                                <strong style="font-family:monospace;font-size:14px;">M${calcState.mindscape}</strong>
                                <button type="button" class="gacha-details-btn" data-calc-m="1">+</button>
                            </div>

                            <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">W-Engine Refinement</span>
                            <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                                <button type="button" class="gacha-details-btn" data-calc-r="-1">−</button>
                                <strong style="font-family:monospace;font-size:14px;">R${calcState.refinement}</strong>
                                <button type="button" class="gacha-details-btn" data-calc-r="1">+</button>
                            </div>
                            <img src="${ag.engine?.img || 'assets/W-Engine/Marcato_Desire.webp'}" style="width:64px;height:64px;object-fit:contain;margin:6px auto;">
                        </div>

                        <!-- Colonne 2 : Substats & Gain Marginal +X.XXX% + Défense du Boss -->
                        <div class="zsc-calc-panel">
                            <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Substats (Rolls & Gain Marginal +1 Roll)</span>
                            ${['ATK_', 'ATK', 'CR', 'CDMG', 'PEN'].map(k => {
                                const gain = sim.marginalGains[k];
                                const isBest = gain === sim.marginalGains.CDMG && gain !== '+0%';
                                return `
                                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;background:#16161f;border-radius:10px;padding:6px 10px;">
                                    <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;width:54px;">${k.replace('_', '%')}</span>
                                    <div style="display:flex;align-items:center;gap:6px;">
                                        <button type="button" class="gacha-details-btn" data-calc-sub="${k}" data-delta="-1">−</button>
                                        <strong style="font-family:monospace;width:22px;text-align:center;">${calcState.rolls[k] || 0}</strong>
                                        <button type="button" class="gacha-details-btn" data-calc-sub="${k}" data-delta="1">+</button>
                                    </div>
                                    <span style="font-family:monospace;font-size:11px;font-weight:900;color:${gain === '+0%' ? '#71717a' : (isBest ? '#4ade80' : '#d4d4d8')};width:64px;text-align:right;">
                                        ${gain}
                                    </span>
                                </div>`;
                            }).join('')}

                            <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">Enemy DEF Target</span>
                            <select id="zsc-calc-enemy-def" class="gacha-col-search" style="width:100%;">
                                <option value="952" ${calcState.enemyDef === 952 ? 'selected' : ''}>Common Boss (~952 DEF)</option>
                                <option value="600" ${calcState.enemyDef === 600 ? 'selected' : ''}>Low DEF Boss (~600 DEF)</option>
                                <option value="1250" ${calcState.enemyDef === 1250 ? 'selected' : ''}>High DEF Boss (~1250 DEF)</option>
                            </select>
                        </div>

                        <!-- Colonne 3 : Résultat Moyenne Critique & Combat Stats -->
                        <div class="zsc-calc-panel" style="justify-content:space-between;">
                            <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Result (Simulated Hit)</span>
                            <div class="zsc-calc-Result-orb">
                                <div style="font-size:11px;font-weight:800;color:#c4b5fd;text-decoration:underline;">Avg. Critical</div>
                                <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:32px;color:#fff;margin-top:4px;">${sim.avgCritDmg.toLocaleString('fr-FR')}</div>
                            </div>

                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                <div style="background:#16161f;padding:10px;border-radius:12px;font-size:11px;display:flex;flex-direction:column;gap:4px;">
                                    <strong style="color:#fff;margin-bottom:2px;">Combat Stats</strong>
                                    <div style="display:flex;justify-content:space-between;"><span>ATK</span><strong>${sim.initAtk} → ${sim.combatAtk}</strong></div>
                                    <div style="display:flex;justify-content:space-between;"><span>CR</span><strong>${sim.initCr}% → ${sim.combatCr}%</strong></div>
                                    <div style="display:flex;justify-content:space-between;"><span>CDMG</span><strong>${sim.combatCdmg}%</strong></div>
                                    <div style="display:flex;justify-content:space-between;"><span>DMG%</span><strong>${sim.dmgBonus}%</strong></div>
                                    <div style="display:flex;justify-content:space-between;"><span>PEN</span><strong>${sim.penFlat}</strong></div>
                                </div>
                                <div style="background:#16161f;padding:10px;border-radius:12px;font-size:11px;display:flex;flex-direction:column;gap:4px;">
                                    <strong style="color:#fff;margin-bottom:2px;">Active Buffs</strong>
                                    <div style="display:flex;justify-content:space-between;color:#c4b5fd;"><span>W-Engine Passive</span><strong>ATK +9.6%</strong></div>
                                    <div style="display:flex;justify-content:space-between;color:#4ade80;"><span>Core Skill</span><strong>CR +25%</strong></div>
                                    <div style="display:flex;justify-content:space-between;color:#fde047;"><span>4P Disc Set (3 stacks)</span><strong>DMG +24%</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // --- VUE 3 : LEADERBOARDS PAR AGENT (IMAGE 4 SÉRIE 1) ---
        function renderLeaderboardsView() {
            const list = allSiteAgents.length > 0 ? [...allSiteAgents].reverse() : [
                { name: 'Phoenix', rank: 'S' }, { name: 'Miyabi', rank: 'S' }, { name: 'Ye Shunguang', rank: 'S' },
                { name: 'Yixuan', rank: 'S' }, { name: 'Remielle', rank: 'S' }, { name: 'Velina', rank: 'S' },
                { name: 'Jane', rank: 'S' }, { name: 'Astra', rank: 'S' }, { name: 'Evelyn', rank: 'S' }, { name: 'Ellen', rank: 'S' }
            ];

            return `
                <div>
                    <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:28px;color:#fff;margin:0;">Leaderboards</h2>
                    <p style="font-size:12.5px;color:#8e8e99;margin:4px 0 18px;">Parcourez les classements mondiaux standardisés par Agent (Classic V1 & Preset V2).</p>
                    <div class="zsc-lb-agents-grid">
                        ${list.map((a, idx) => {
                            const fakeCount = (Math.max(4, 95 - idx * 2) * 843).toLocaleString('fr-FR');
                            return `
                            <div class="zsc-lb-agent-tile" data-lb-open-guide="${a.name}">
                                <img src="assets/Agents/${a.name}.webp" style="width:44px;height:44px;border-radius:999px;object-fit:cover;object-position:top center;background:#09090d;border:1.5px solid #3f3f46;">
                                <div style="min-width:0;flex:1;">
                                    <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.name}</div>
                                    <div style="font-size:11px;color:#71717a;font-weight:700;">${fakeCount} Builds</div>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        function bindShowcaseEvents(profile, evaluatedAgents) {
            document.getElementById('zsc-btn-close')?.addEventListener('click', closeShowcaseModal);

            const modalInp = document.getElementById('zsc-modal-uid-inp');
            modalInp?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && modalInp.value.trim()) {
                    openShowcaseModal(modalInp.value.trim());
                }
            });

            modalEl.querySelectorAll('[data-zsc-view]').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentView = btn.getAttribute('data-zsc-view');
                    renderShowcaseModal();
                });
            });

            modalEl.querySelectorAll('[data-scroll-agent]').forEach(ava => {
                ava.addEventListener('click', () => {
                    const name = ava.getAttribute('data-scroll-agent');
                    if (currentView !== 'profile') {
                        currentView = 'profile';
                        renderShowcaseModal();
                    }
                    const card = document.getElementById(`zsc-card-${name}`);
                    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });

            // Synchronisation Enka.Network au clic sur [Update from Showcase]
            const syncBtn = document.getElementById('zsc-btn-sync-enka');
            syncBtn?.addEventListener('click', async () => {
                syncBtn.disabled = true;
                syncBtn.innerHTML = `<span>⏳ Synchronisation Enka.Network...</span>`;
                try {
                    const endpoint = WORKER_BASE_URL
                        ? `${WORKER_BASE_URL.replace(/\/$/, '')}/uid/${activeUID}`
                        : `https://corsproxy.io/?${encodeURIComponent(`https://enka.network/api/zzz/uid/${activeUID}`)}`;
                    const res = await fetch(endpoint);
                    if (res.ok) {
                        const data = await res.json();
                        const nick = data?.PlayerInfo?.SocialDetail?.ProfileDetail?.Nickname || profile.nickname;
                        const sig = data?.PlayerInfo?.SocialDetail?.Desc || profile.signature;
                        mergeShowcaseProfile(activeUID, {
                            ...profile,
                            nickname: nick,
                            signature: sig,
                            region: detectRegionFromUID(activeUID)
                        });
                    }
                } catch (e) {}
                renderShowcaseModal();
            });

            // Actions sur chaque carte d'Agent (Export PNG, Calculator, Guide, Favori, Lock, Delete)
            modalEl.querySelectorAll('[data-act-export]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const ag = evaluatedAgents.find(a => a.name === btn.getAttribute('data-act-export'));
                    if (ag) exportAgentCardSummary(ag, profile);
                });
            });

            modalEl.querySelectorAll('[data-act-calc]').forEach(btn => {
                btn.addEventListener('click', () => {
                    activeCalcAgentName = btn.getAttribute('data-act-calc');
                    currentView = 'calculator';
                    renderShowcaseModal();
                });
            });

            modalEl.querySelectorAll('[data-act-guide], [data-lb-open-guide]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const agName = btn.getAttribute('data-act-guide') || btn.getAttribute('data-lb-open-guide');
                    closeShowcaseModal();
                    if (typeof window.openAgentDetail === 'function') {
                        window.openAgentDetail(agName);
                    }
                });
            });

            modalEl.querySelectorAll('[data-act-lock]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.getAttribute('data-act-lock');
                    const map = getSavedProfilesMap();
                    const p = map[activeUID];
                    const target = p?.agents?.find(a => a.name === name);
                    if (target) {
                        target.locked = !target.locked;
                        saveProfilesMap(map);
                        renderShowcaseModal();
                    }
                });
            });

            modalEl.querySelectorAll('[data-act-fav]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.getAttribute('data-act-fav');
                    const map = getSavedProfilesMap();
                    const p = map[activeUID];
                    const target = p?.agents?.find(a => a.name === name);
                    if (target) {
                        target.favorite = !target.favorite;
                        p.agents.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
                        saveProfilesMap(map);
                        renderShowcaseModal();
                    }
                });
            });

            modalEl.querySelectorAll('[data-act-del]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const name = btn.getAttribute('data-act-del');
                    const map = getSavedProfilesMap();
                    const p = map[activeUID];
                    if (p && Array.isArray(p.agents) && p.agents.length > 1) {
                        p.agents = p.agents.filter(a => a.name !== name);
                        saveProfilesMap(map);
                        renderShowcaseModal();
                    }
                });
            });

            // Événements du Calculateur Interactif
            document.getElementById('zsc-calc-back')?.addEventListener('click', () => {
                currentView = 'profile';
                renderShowcaseModal();
            });

            document.getElementById('zsc-calc-pick-agent')?.addEventListener('change', (e) => {
                activeCalcAgentName = e.target.value;
                renderShowcaseModal();
            });

            modalEl.querySelectorAll('[data-calc-m]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const d = parseInt(btn.getAttribute('data-calc-m'), 10);
                    calcState.mindscape = Math.min(6, Math.max(0, calcState.mindscape + d));
                    renderShowcaseModal();
                });
            });

            modalEl.querySelectorAll('[data-calc-r]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const d = parseInt(btn.getAttribute('data-calc-r'), 10);
                    calcState.refinement = Math.min(5, Math.max(1, calcState.refinement + d));
                    renderShowcaseModal();
                });
            });

            modalEl.querySelectorAll('[data-calc-sub]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const k = btn.getAttribute('data-calc-sub');
                    const d = parseInt(btn.getAttribute('data-delta'), 10);
                    calcState.rolls[k] = Math.min(30, Math.max(0, (calcState.rolls[k] || 0) + d));
                    renderShowcaseModal();
                });
            });

            document.getElementById('zsc-calc-enemy-def')?.addEventListener('change', (e) => {
                calcState.enemyDef = parseInt(e.target.value, 10) || 952;
                renderShowcaseModal();
            });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', injectHeaderUIDBar);
        } else {
            injectHeaderUIDBar();
        }
    } catch (err) {
        console.warn('Module Showcase isolé :', err);
    }
})();
