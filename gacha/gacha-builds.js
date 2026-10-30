// gacha/gacha-builds.js - Système de Builds ZZZ, Moteur Mathématique de Disques Rang S & Badges de Séries (100% Isolé)
(function () {
    try {
        // ========================================================
        // 1. CONSTANTES MATHÉMATIQUES OFFICIELLES DES DISQUES RANG S
        // ========================================================
        const MAIN_STAT_MAX_LV15 = {
            "PV (flat)": { val: 2200, isPct: false },
            "ATQ (flat)": { val: 316, isPct: false },
            "DÉF (flat)": { val: 184, isPct: false },
            "ATQ%": { val: 30.0, isPct: true },
            "PV%": { val: 30.0, isPct: true },
            "DÉF%": { val: 48.0, isPct: true },
            "Taux CRIT": { val: 24.0, isPct: true },
            "Dégâts CRIT": { val: 48.0, isPct: true },
            "Adresse d'anomalie": { val: 92, isPct: false },
            "Ratio de PÉN": { val: 24.0, isPct: true },
            "DGT Physique": { val: 30.0, isPct: true },
            "DGT Feu": { val: 30.0, isPct: true },
            "DGT Glace": { val: 30.0, isPct: true },
            "DGT Électrique": { val: 30.0, isPct: true },
            "DGT Éther": { val: 30.0, isPct: true },
            "DGT Vent": { val: 30.0, isPct: true },
            "Maîtrise d'anomalie": { val: 30.0, isPct: true },
            "Régénération d'énergie": { val: 60.0, isPct: true },
            "Impact": { val: 18.0, isPct: true }
        };

        const PARTITION_WEIGHTS = {
            1: { "PV (flat)": 1.0 },
            2: { "ATQ (flat)": 1.0 },
            3: { "DÉF (flat)": 1.0 },
            4: {
                "Adresse d'anomalie": 0.2105,
                "Taux CRIT": 0.1579,
                "Dégâts CRIT": 0.1579,
                "ATQ%": 0.1579,
                "PV%": 0.1579,
                "DÉF%": 0.1579
            },
            5: {
                "DGT Physique": 0.088,
                "DGT Feu": 0.088,
                "DGT Glace": 0.088,
                "DGT Électrique": 0.088,
                "DGT Éther": 0.088,
                "DGT Vent": 0.088,
                "Ratio de PÉN": 0.088,
                "ATQ%": 0.128,
                "PV%": 0.128,
                "DÉF%": 0.128
            },
            6: {
                "Maîtrise d'anomalie": 0.150,
                "Régénération d'énergie": 0.150,
                "Impact": 0.150,
                "ATQ%": 0.183,
                "PV%": 0.183,
                "DÉF%": 0.184
            }
        };

        // Pool des 10 sous-statistiques (Poids total vierge = 1 100, valeurs fixes sans variance)
        const SUBSTAT_POOL = [
            { key: "PV (flat)",          weight: 150, step: 112, isPct: false },
            { key: "ATQ (flat)",         weight: 150, step: 19,  isPct: false },
            { key: "DÉF (flat)",         weight: 150, step: 15,  isPct: false },
            { key: "PV%",                weight: 100, step: 3.0, isPct: true },
            { key: "ATQ%",               weight: 100, step: 3.0, isPct: true },
            { key: "DÉF%",               weight: 100, step: 4.8, isPct: true },
            { key: "Adresse d'anomalie", weight: 100, step: 9,   isPct: false },
            { key: "PÉN (flat)",         weight: 100, step: 9,   isPct: false },
            { key: "Taux CRIT",          weight: 75,  step: 2.4, isPct: true },
            { key: "Dégâts CRIT",        weight: 75,  step: 4.8, isPct: true }
        ];

        // Tirage pondéré selon une table { cle: probabilite }
        function drawWeightedKey(table) {
            const entries = Object.entries(table);
            const total = entries.reduce((acc, [, w]) => acc + w, 0);
            let r = Math.random() * total;
            for (const [k, w] of entries) {
                r -= w;
                if (r <= 0) return k;
            }
            return entries[entries.length - 1][0];
        }

        // Tirage sans remise pondéré d'une sous-statistique : P(i) = w_i / sum(w_j)
        function drawSubstatFromPool(availablePool) {
            const totalWeight = availablePool.reduce((acc, s) => acc + s.weight, 0);
            let r = Math.random() * totalWeight;
            for (let i = 0; i < availablePool.length; i++) {
                r -= availablePool[i].weight;
                if (r <= 0) {
                    const picked = availablePool.splice(i, 1)[0];
                    return { key: picked.key, step: picked.step, isPct: picked.isPct, upgrades: 0 };
                }
            }
            const last = availablePool.pop();
            return { key: last.key, step: last.step, isPct: last.isPct, upgrades: 0 };
        }

        // Génération d'un Disque de Rang S au Niveau 0 (strictement fidèle au cahier des charges)
        function generateSRankDisc(setKey, partitionSlot, forcedMainStat = null) {
            const slot = Number(partitionSlot) || (Math.floor(Math.random() * 6) + 1);
            const mainStat = (forcedMainStat && PARTITION_WEIGHTS[slot][forcedMainStat])
                ? forcedMainStat
                : drawWeightedKey(PARTITION_WEIGHTS[slot]);

            // 1. Exclusion de la Main Stat (w_main = 0 si présente dans les 10 sous-stats)
            const available = SUBSTAT_POOL
                .filter(s => s.key !== mainStat)
                .map(s => ({ ...s }));

            // 2. Détermination 3-liner (80%) vs 4-liner natif (20%)
            const isFourLiner = Math.random() < 0.20;
            const initialCount = isFourLiner ? 4 : 3;

            // 3. Tirage sans remise pondéré des sous-stats initiales (+0)
            const substats = [];
            for (let k = 0; k < initialCount; k++) {
                substats.push(drawSubstatFromPool(available));
            }

            return {
                uid: 'disc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
                setKey,
                slot,
                level: 0,
                isFourLiner,
                mainStat,
                substats
            };
        }

        // Amélioration d'un Disque d'un palier (+3) jusqu'à +15
        function upgradeDiscOneStep(disc) {
            if (!disc || disc.level >= 15) return false;
            disc.level = Math.min(15, disc.level + 3);

            // Cas A : 3-liner au palier +3 -> débloque la 4e sous-statistique
            if (!disc.isFourLiner && disc.level === 3 && disc.substats.length < 4) {
                const usedKeys = new Set([disc.mainStat, ...disc.substats.map(s => s.key)]);
                const remaining = SUBSTAT_POOL
                    .filter(s => !usedKeys.has(s.key))
                    .map(s => ({ ...s }));
                if (remaining.length > 0) {
                    disc.substats.push(drawSubstatFromPool(remaining));
                }
                return true;
            }

            // Cas A (+6 à +15) et Cas B (+3 à +15) : tirage équiprobable 1/4 (p = 0.25, i.i.d.)
            if (disc.substats.length > 0) {
                const lineIdx = Math.floor(Math.random() * disc.substats.length);
                disc.substats[lineIdx].upgrades = (disc.substats[lineIdx].upgrades || 0) + 1;
            }
            return true;
        }

        function formatMainStatValue(mainStatKey, level) {
            const cfg = MAIN_STAT_MAX_LV15[mainStatKey] || { val: 30, isPct: true };
            const scaled = cfg.val * (0.25 + 0.75 * (level / 15));
            return cfg.isPct ? `${scaled.toFixed(1)}%` : `${Math.round(scaled)}`;
        }

        function formatSubstatValue(sub) {
            const totalUnits = 1 + (sub.upgrades || 0);
            const raw = totalUnits * sub.step;
            return sub.isPct ? `+${raw.toFixed(1)}%` : `+${Math.round(raw)}`;
        }

        // ========================================================
        // 2. ÉTAT ÉTENDU (BUILDS, DISQUES GRAVÉS, SURCHARGE M6+, BADGES)
        // ========================================================
        function ensureBuildState(st) {
            if (!st.buildSystem) {
                st.buildSystem = {
                    craftedDiscs: [],   // Liste des disques S générés
                    agentBuilds: {},    // { [agentKey]: { engineKey: null, discs: {1..6: uid}, skills: [1,1,1,1,1], overclockClaimed: 7 } }
                    calibrators: 2,     // 2 Calibrateurs offerts pour tester le choix de Main Stat !
                    claimedBadges: {}   // { [badgeId]: true }
                };
            }
            // Vérifie automatiquement si des Agents ont dépassé M6 (7 copies) pour attribuer les Calibrateurs de Surcharge
            Object.values(st.inventory || {}).forEach(it => {
                if (it.type === 'agent' && (it.count || 0) > 7) {
                    const ab = getOrInitAgentBuild(st, it.rawKey);
                    const prevClaimed = ab.overclockClaimed || 7;
                    if (it.count > prevClaimed) {
                        const newOverclocks = it.count - prevClaimed;
                        st.buildSystem.calibrators = (st.buildSystem.calibrators || 0) + newOverclocks;
                        ab.overclockClaimed = it.count;
                    }
                }
            });
            return st.buildSystem;
        }

        function getOrInitAgentBuild(st, agentKey) {
            if (!st.buildSystem) ensureBuildState(st);
            if (!st.buildSystem.agentBuilds[agentKey]) {
                st.buildSystem.agentBuilds[agentKey] = {
                    engineKey: null,
                    discs: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
                    skills: [1, 1, 1, 1, 1],
                    overclockClaimed: 7
                };
            }
            return st.buildSystem.agentBuilds[agentKey];
        }

        // ========================================================
        // 3. CALCUL DES STATISTIQUES COMPLÈTES D'UN AGENT
        // ========================================================
        const ROLE_BASE_STATS = {
            Attack:  { hp: 7650, atk: 915, def: 605, imp: 92,  cr: 5.0, cd: 50.0, am: 92,  ap: 95,  pen: 0, er: 1.2, rec: ['ATQ%', 'Taux CRIT', 'Dégâts CRIT', 'ATQ (flat)'] },
            Anomaly: { hp: 7800, atk: 885, def: 612, imp: 86,  cr: 5.0, cd: 50.0, am: 148, ap: 118, pen: 0, er: 1.2, rec: ["Adresse d'anomalie", "Maîtrise d'anomalie", "ATQ%"] },
            Stun:    { hp: 8250, atk: 790, def: 650, imp: 136, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['Impact', 'Taux CRIT', 'ATQ%'] },
            Support: { hp: 8400, atk: 810, def: 660, imp: 90,  cr: 5.0, cd: 50.0, am: 94,  ap: 96,  pen: 0, er: 1.4, rec: ["Régénération d'énergie", 'ATQ%', 'PV%'] },
            Defense: { hp: 9100, atk: 740, def: 780, imp: 110, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['DÉF%', 'PV%', 'Impact'] },
            Rupture: { hp: 8100, atk: 895, def: 620, imp: 98,  cr: 5.0, cd: 50.0, am: 96,  ap: 98,  pen: 8, er: 1.2, rec: ['Taux CRIT', 'Dégâts CRIT', 'ATQ%', 'Ratio de PÉN'] },
            Armorer: { hp: 8300, atk: 870, def: 675, imp: 105, cr: 5.0, cd: 50.0, am: 95,  ap: 95,  pen: 0, er: 1.2, rec: ['ATQ%', 'Taux CRIT', 'Dégâts CRIT'] }
        };

        function computeAgentStats(st, pool, agentMeta) {
            const bs = ensureBuildState(st);
            const ab = getOrInitAgentBuild(st, agentMeta.rawKey);
            const base = { ...(ROLE_BASE_STATS[agentMeta.role] || ROLE_BASE_STATS.Attack) };

            const ownedCopies = st.inventory[`agent_${agentMeta.rawKey}`]?.count || 1;
            const mindscape = Math.min(6, Math.max(0, ownedCopies - 1));
            const overclockLvl = Math.max(0, ownedCopies - 7); // Copies au-delà de M6

            // Bonus de Moteur-Ampli équipé
            let engineAtkFlat = 0;
            let enginePctBonus = 0;
            if (ab.engineKey) {
                const engObj = pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey);
                const engCopies = Math.min(5, st.inventory[`engine_${ab.engineKey}`]?.count || 1);
                if (engObj) {
                    engineAtkFlat = engObj.rank === 'S' ? 713 : (engObj.rank === 'A' ? 594 : 475);
                    enginePctBonus = (engObj.rank === 'S' ? 24 : 18) + (engCopies - 1) * 3;
                }
            }

            const baseHp = base.hp;
            const baseAtk = base.atk + engineAtkFlat;
            const baseDef = base.def;

            let hpPct = 0, hpFlat = 0;
            let atkPct = enginePctBonus, atkFlat = 0;
            let defPct = 0, defFlat = 0;
            let cr = base.cr, cd = base.cd;
            let ap = base.ap, amPct = 0, impPct = 0, erPct = 0, penPct = base.pen;
            let effectiveSubRolls = 0;

            const setCounts = {};

            function addStatContribution(statKey, amount) {
                if (statKey === 'PV (flat)') hpFlat += amount;
                else if (statKey === 'ATQ (flat)') atkFlat += amount;
                else if (statKey === 'DÉF (flat)') defFlat += amount;
                else if (statKey === 'PV%') hpPct += amount;
                else if (statKey === 'ATQ%') atkPct += amount;
                else if (statKey === 'DÉF%') defPct += amount;
                else if (statKey === 'Taux CRIT') cr += amount;
                else if (statKey === 'Dégâts CRIT') cd += amount;
                else if (statKey === "Adresse d'anomalie") ap += amount;
                else if (statKey === 'Ratio de PÉN') penPct += amount;
                else if (statKey === "Maîtrise d'anomalie") amPct += amount;
                else if (statKey === "Régénération d'énergie") erPct += amount;
                else if (statKey === 'Impact') impPct += amount;
            }

            // Parcours des 6 Disques équipés
            for (let slot = 1; slot <= 6; slot++) {
                const uid = ab.discs[slot];
                if (!uid) continue;
                const d = bs.craftedDiscs.find(x => x.uid === uid);
                if (!d) continue;

                setCounts[d.setKey] = (setCounts[d.setKey] || 0) + 1;

                // Main stat
                const mCfg = MAIN_STAT_MAX_LV15[d.mainStat];
                if (mCfg) {
                    const mVal = mCfg.val * (0.25 + 0.75 * (d.level / 15));
                    addStatContribution(d.mainStat, mVal);
                }

                // Substats
                (d.substats || []).forEach(sub => {
                    const units = 1 + (sub.upgrades || 0);
                    addStatContribution(sub.key, units * sub.step);
                    if (base.rec.includes(sub.key) || sub.key === 'Taux CRIT' || sub.key === 'Dégâts CRIT' || sub.key === 'ATQ%') {
                        effectiveSubRolls += units;
                    }
                });
            }

            // Bonus des Compétences et de Surcharge M6+
            const totalSkillLvls = (ab.skills || [1, 1, 1, 1, 1]).reduce((a, b) => a + b, 0);
            const overclockMult = 1 + Math.min(0.20, overclockLvl * 0.02);

            const finalHp = Math.round(((baseHp * (1 + hpPct / 100)) + hpFlat) * overclockMult);
            const finalAtk = Math.round(((baseAtk * (1 + atkPct / 100)) + atkFlat + totalSkillLvls * 4) * overclockMult);
            const finalDef = Math.round(((baseDef * (1 + defPct / 100)) + defFlat) * overclockMult);
            const finalImp = Math.round(base.imp * (1 + impPct / 100));
            const finalAm = Math.round(base.am * (1 + amPct / 100));
            const finalEr = (base.er * (1 + erPct / 100)).toFixed(2);

            // Score de préparation au combat
            const equippedDiscsCount = Object.values(ab.discs).filter(Boolean).length;
            const score = effectiveSubRolls * 3 + equippedDiscsCount * 5 + (ab.engineKey ? 15 : 0) + totalSkillLvls + mindscape * 4;
            const grade = score >= 135 ? 'SSS' : (score >= 110 ? 'SS' : (score >= 80 ? 'S' : (score >= 50 ? 'A' : 'B')));

            return {
                hp: finalHp,
                atk: finalAtk,
                def: finalDef,
                imp: finalImp,
                cr: cr.toFixed(1) + ' %',
                cd: cd.toFixed(1) + ' %',
                am: finalAm,
                ap: Math.round(ap),
                pen: penPct.toFixed(1) + ' %',
                er: finalEr,
                effectiveSubRolls,
                grade,
                mindscape,
                overclockLvl,
                setCounts,
                recList: base.rec
            };
        }

        // ========================================================
        // 4. RENDU DE L'ONGLET « BUILDS & DISQUES » (LES 3 MENUS ZZZ)
        // ========================================================
        let selectedAgentKey = '';
        let currentSubMenu = 'stats'; // 'stats' | 'skills' | 'equip'
        let bardicSetKey = '';
        let bardicSlot = 0; // 0 = Aléatoire, 1..6 = Partition ciblée

        function getOwnedAgents(st, pool) {
            return pool.allCatalog.filter(i => i.type === 'agent' && (st.inventory[i.id]?.count || 0) > 0);
        }

        function renderBuildsTab(mount) {
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const ownedAgents = getOwnedAgents(st, pool);

            if (ownedAgents.length === 0) {
                mount.innerHTML = `
                    <div class="zb-wrap" style="text-align:center;padding:60px 20px;">
                        <h2 class="gacha-panel-title">Aucun Agent débloqué</h2>
                        <p class="gacha-panel-desc">Effectuez des Recherches de Signal sur le Canal Unifié pour recruter votre premier Agent et débloquer son studio de Build !</p>
                    </div>`;
                return;
            }

            if (!selectedAgentKey || !ownedAgents.some(a => a.rawKey === selectedAgentKey)) {
                selectedAgentKey = ownedAgents[0].rawKey;
            }

            const agent = ownedAgents.find(a => a.rawKey === selectedAgentKey) || ownedAgents[0];
            const ab = getOrInitAgentBuild(st, agent.rawKey);
            const calc = computeAgentStats(st, pool, agent);

            // Barre supérieure de sélection rapide des agents possédés
            const rosterHTML = ownedAgents.map(a => {
                const cnt = st.inventory[a.id]?.count || 1;
                const mTag = cnt > 7 ? `M6 ★${cnt - 7}` : `M${Math.min(6, cnt - 1)}`;
                return `
                <div class="zb-roster-pill ${a.rawKey === agent.rawKey ? 'active' : ''}" data-pick-build-agent="${a.rawKey}">
                    <img src="${a.img}" alt="${bridge.itemName(a)}">
                    <div class="zb-roster-meta">
                        <span class="zb-roster-name">${bridge.itemName(a)}</span>
                        <span class="zb-roster-sub">${a.rank} • Niv. 60 • ${mTag}</span>
                    </div>
                </div>`;
            }).join('');

            let rightPanelContent = '';
            if (currentSubMenu === 'stats') {
                rightPanelContent = renderSubMenuStats(agent, calc, pool, bridge);
            } else if (currentSubMenu === 'skills') {
                rightPanelContent = renderSubMenuSkills(st, agent, ab, calc);
            } else {
                rightPanelContent = renderSubMenuEquip(st, pool, bs, agent, ab, calc, bridge);
            }

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                        <div class="zb-roster-bar" style="flex:1;">${rosterHTML}</div>
                        <button type="button" class="gacha-details-btn accent" id="btn-open-bardic-needle" style="padding:10px 16px;font-size:11.5px;">
                            🎵 Studio d'Accordage Disques (${bs.craftedDiscs.length}) • 🎯 ${bs.calibrators || 0}
                        </button>
                    </div>

                    <div class="zb-stage">
                        <!-- Colonne Gauche : Splash / Portrait + Badge CINEMA X/6 + Surcharge M6+ -->
                        <div class="zb-agent-showcase ${calc.overclockLvl > 0 ? 'overclocked' : ''}">
                            ${calc.overclockLvl > 0 ? `<div class="zb-overclock-pill">⚡ SURCHARGE PRISMATIQUE ★${calc.overclockLvl} (+${Math.min(20, calc.overclockLvl * 2)}% STATS)</div>` : ''}
                            <img src="assets/splash/${agent.rawKey}.webp" onerror="this.onerror=null;this.src='${agent.img}';" alt="${bridge.itemName(agent)}" class="zb-agent-art">
                            <div class="zb-cinema-badge">
                                <span class="zb-cinema-lbl">CINEMA</span>
                                <span class="zb-cinema-val">${calc.mindscape} / 6</span>
                            </div>
                        </div>

                        <!-- Colonne Droite : Panneau actif + Barre des 3 Menus -->
                        <div class="zb-right-column">
                            <div class="zb-panel-card">
                                ${rightPanelContent}
                            </div>

                            <div class="zb-subnav">
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'stats' ? 'active' : ''}" data-bsub="stats">Stats de base</button>
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'skills' ? 'active' : ''}" data-bsub="skills">Compétences</button>
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'equip' ? 'active' : ''}" data-bsub="equip">Équipement</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            mount.querySelectorAll('[data-pick-build-agent]').forEach(el => {
                el.addEventListener('click', () => {
                    selectedAgentKey = el.getAttribute('data-pick-build-agent');
                    renderBuildsTab(mount);
                });
            });

            mount.querySelectorAll('[data-bsub]').forEach(btn => {
                btn.addEventListener('click', () => {
                    currentSubMenu = btn.getAttribute('data-bsub');
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('btn-open-bardic-needle')?.addEventListener('click', () => {
                openBardicNeedleModal(mount);
            });

            bindSubMenuEvents(mount, st, pool, bs, agent, ab, calc);
        }

        // --- MENU 1 : STATS DE BASE (FIDÈLE À IMAGE 2) ---
        function renderSubMenuStats(agent, calc, pool, bridge) {
            const activeSetsHTML = Object.entries(calc.setCounts)
                .filter(([, cnt]) => cnt >= 2)
                .map(([setKey, cnt]) => {
                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === setKey);
                    const name = dObj ? bridge.itemName(dObj) : setKey;
                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? '4-Pièces' : '2-Pièces'} : ${name}</span>`;
                }).join(' ');

            return `
                <div class="zb-agent-header">
                    <div>
                        <div class="zb-faction-line">
                            <span style="color:#facc15;">★ ${agent.rank}</span>
                            <span>• ${agent.faction || 'New Eridu'}</span>
                        </div>
                        <h2 class="zb-agent-big-name">${bridge.itemName(agent)}</h2>
                    </div>
                    <img src="assets/Faction/${agent.faction}.webp" class="zb-faction-logo" onerror="this.style.display='none'">
                </div>

                <div class="zb-level-row">
                    <div class="zb-lvl-pill">
                        <span>Niv. 60 <span style="color:#52525b;">/ 60</span></span>
                        <span style="background:#272732;color:#d4d4d8;font-size:10px;padding:2px 7px;border-radius:5px;">MAX</span>
                    </div>
                    <div class="zb-elem-role-pill">
                        <span>${agent.element}</span>
                        <span style="color:#3f3f46;">|</span>
                        <span>${agent.role}</span>
                    </div>
                </div>

                <div class="zb-stats-grid">
                    <div class="zb-stat-row"><span>PV</span><span class="zb-stat-val">${calc.hp}</span></div>
                    <div class="zb-stat-row recommended"><span>ATQ</span><span class="zb-stat-val">${calc.atk}</span></div>
                    <div class="zb-stat-row"><span>DÉF</span><span class="zb-stat-val">${calc.def}</span></div>
                    <div class="zb-stat-row"><span>Impact</span><span class="zb-stat-val">${calc.imp}</span></div>
                    <div class="zb-stat-row recommended"><span>Taux CRIT</span><span class="zb-stat-val">${calc.cr}</span></div>
                    <div class="zb-stat-row recommended"><span>DGT CRIT</span><span class="zb-stat-val">${calc.cd}</span></div>
                    <div class="zb-stat-row"><span>Maîtrise d'anomalie</span><span class="zb-stat-val">${calc.am}</span></div>
                    <div class="zb-stat-row"><span>Adresse d'anomalie</span><span class="zb-stat-val">${calc.ap}</span></div>
                    <div class="zb-stat-row"><span>Taux de PÉN</span><span class="zb-stat-val">${calc.pen}</span></div>
                    <div class="zb-stat-row"><span>Récupération d'énergie</span><span class="zb-stat-val">${calc.er}</span></div>
                </div>

                ${activeSetsHTML ? `<div style="display:flex;gap:6px;flex-wrap:wrap;">${activeSetsHTML}</div>` : ''}

                <div class="zb-eval-bar">
                    <span style="font-size:12px;font-weight:800;color:#d4d4d8;">
                        Nombre de stats secondaires effectives : <strong style="color:#facc15;font-size:14px;">${calc.effectiveSubRolls}</strong>
                    </span>
                    <div class="zb-eval-grade">
                        <span style="color:#f59e0b;font-size:14px;">${calc.grade}</span>
                        <span>Évaluation de préparation au combat</span>
                    </div>
                </div>
            `;
        }

        // --- MENU 2 : COMPÉTENCES (SANS LE CORE A-F, FIDÈLE À IMAGE 3) ---
        const SKILL_DEFS = [
            { idx: 0, name: "Attaque Normale", icon: "assets/Skills/normal.webp", fallback: "⚔️" },
            { idx: 1, name: "Esquive",         icon: "assets/Skills/dodge.webp",  fallback: "⚡" },
            { idx: 2, name: "Soutien",         icon: "assets/Skills/assist.webp", fallback: "🛡️" },
            { idx: 3, name: "Attaque Spéciale",icon: "assets/Skills/special.webp",fallback: "💥" },
            { idx: 4, name: "Ultime",          icon: "assets/Skills/chain.webp",  fallback: "🌟" }
        ];
        let activeSkillIdx = 0;

        function renderSubMenuSkills(st, agent, ab, calc) {
            const maxCap = calc.mindscape >= 5 ? 16 : (calc.mindscape >= 3 ? 14 : 12);
            const curLvl = ab.skills[activeSkillIdx] || 1;
            const costRes = curLvl * 4;
            const costPoly = curLvl * 30;
            const isMax = curLvl >= maxCap;

            return `
                <div>
                    <span class="gacha-patch-tag">ENTRAÎNEMENT D'AGENT • MAX NIV. ${maxCap}</span>
                    <h3 class="gacha-panel-title" style="font-size:22px;">Amélioration des Compétences</h3>
                    <p class="gacha-panel-desc">Améliorez les 5 compétences de l'Agent avec vos Signaux résiduels (✦) ou vos Polychromes pour augmenter son ATQ et son Évaluation de combat.</p>
                </div>

                <div class="zb-skills-row">
                    ${SKILL_DEFS.map((sk, idx) => {
                        const lv = ab.skills[idx] || 1;
                        return `
                        <div class="zb-skill-capsule ${idx === activeSkillIdx ? 'active' : ''}" data-pick-skill="${idx}">
                            <div class="zb-skill-circle">
                                <img src="${sk.icon}" alt="${sk.name}" onerror="this.style.display='none';this.parentElement.textContent='${sk.fallback}';">
                            </div>
                            <span style="font-size:9.5px;font-weight:900;text-transform:uppercase;color:#d4d4d8;text-align:center;">${sk.name.split(' ').pop()}</span>
                            <div class="zb-skill-lvl-pill">
                                <span style="color:${lv >= maxCap ? '#d7f70c' : '#fff'};">${String(lv).padStart(2, '0')}</span>
                                <span class="max">/${maxCap}</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>

                <div style="background:#0c0c12;border:1px solid #272733;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <strong style="font-family:'Montserrat',sans-serif;font-size:14px;text-transform:uppercase;color:#fff;">
                            ${SKILL_DEFS[activeSkillIdx].name} (Niv. ${curLvl} → ${isMax ? 'MAX' : curLvl + 1})
                        </strong>
                        <span class="gacha-quest-prog done">Bonus ATQ +${curLvl * 4}</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        <button type="button" class="gacha-shop-btn primary-purple" id="btn-up-skill-res" ${isMax || st.residual < costRes ? 'disabled' : ''}>
                            ${isMax ? 'NIVEAU MAX ✓' : `Améliorer (${costRes} ✦)`}
                        </button>
                        <button type="button" class="gacha-shop-btn primary-yellow" id="btn-up-skill-poly" ${isMax || st.polychromes < costPoly ? 'disabled' : ''}>
                            ${isMax ? 'NIVEAU MAX ✓' : `Améliorer (${costPoly} Poly)`}
                        </button>
                    </div>
                </div>
            `;
        }

        // --- MENU 3 : ÉQUIPEMENT (ROUE HEXAGONALE DES 6 DISQUES + MOTEUR CENTRAL, IMAGE 4) ---
        function renderSubMenuEquip(st, pool, bs, agent, ab, calc, bridge) {
            const engObj = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;

            const nodesHTML = [1, 2, 3, 4, 5, 6].map(slot => {
                const uid = ab.discs[slot];
                const disc = uid ? bs.craftedDiscs.find(d => d.uid === uid) : null;
                const setObj = disc ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === disc.setKey) : null;

                return `
                <div class="zb-disc-node slot-${slot} ${disc ? 'equipped' : ''}" data-wheel-slot="${slot}" title="Partition ${slot}">
                    ${disc && setObj
                        ? `<img src="${setObj.img}" alt="Slot ${slot}"><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">S Niv.${disc.level}/15</span>`
                        : `<span class="zb-disc-slot-num">${slot}</span><span class="zb-slot-tag">Vide</span>`
                    }
                </div>`;
            }).join('');

            return `
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div>
                        <span class="gacha-patch-tag">LECTEUR DE DISQUES & MOTEUR-AMPLI</span>
                        <h3 class="gacha-panel-title" style="font-size:20px;">Roue d'Équipement</h3>
                    </div>
                    <button type="button" class="gacha-details-btn accent" id="btn-auto-equip">⚡ Équipement Auto</button>
                </div>

                <div class="zb-wheel-stage">
                    <div class="zb-hex-housing">
                        ${nodesHTML}
                        <div class="zb-wengine-core" id="btn-wheel-wengine" title="Changer de Moteur-Ampli">
                            ${engObj
                                ? `<img src="${engObj.img}" alt="${bridge.itemName(engObj)}"><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">${engObj.rank} Niv. 60/60</span>`
                                : `<span style="font-size:26px;color:#52525b;">➕</span><span class="zb-slot-tag">Moteur</span>`
                            }
                        </div>
                    </div>
                </div>
            `;
        }

        function bindSubMenuEvents(mount, st, pool, bs, agent, ab, calc) {
            const bridge = window.ZZZGachaBridge;

            // Événements Menu 2 (Compétences)
            mount.querySelectorAll('[data-pick-skill]').forEach(el => {
                el.addEventListener('click', () => {
                    activeSkillIdx = parseInt(el.getAttribute('data-pick-skill'), 10) || 0;
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('btn-up-skill-res')?.addEventListener('click', () => {
                const maxCap = calc.mindscape >= 5 ? 16 : (calc.mindscape >= 3 ? 14 : 12);
                const cur = ab.skills[activeSkillIdx] || 1;
                const cost = cur * 4;
                if (cur < maxCap && st.residual >= cost) {
                    st.residual -= cost;
                    ab.skills[activeSkillIdx] = cur + 1;
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                }
            });

            document.getElementById('btn-up-skill-poly')?.addEventListener('click', () => {
                const maxCap = calc.mindscape >= 5 ? 16 : (calc.mindscape >= 3 ? 14 : 12);
                const cur = ab.skills[activeSkillIdx] || 1;
                const cost = cur * 30;
                if (cur < maxCap && st.polychromes >= cost) {
                    st.polychromes -= cost;
                    ab.skills[activeSkillIdx] = cur + 1;
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                }
            });

            // Événements Menu 3 (Roue d'Équipement)
            document.getElementById('btn-wheel-wengine')?.addEventListener('click', () => {
                openWEngineSelectorModal(mount, st, pool, agent, ab);
            });

            mount.querySelectorAll('[data-wheel-slot]').forEach(node => {
                node.addEventListener('click', () => {
                    const slotNum = parseInt(node.getAttribute('data-wheel-slot'), 10);
                    openSlotInspectorModal(mount, st, pool, bs, agent, ab, slotNum);
                });
            });

            document.getElementById('btn-auto-equip')?.addEventListener('click', () => {
                // Équipe le meilleur Moteur possédé
                const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
                if (ownedEngines.length > 0) {
                    ownedEngines.sort((a, b) => (a.rank === 'S' ? -1 : 1) - (b.rank === 'S' ? -1 : 1));
                    ab.engineKey = ownedEngines[0].rawKey;
                }
                // Équipe le disque de plus haut niveau sur chaque partition 1 à 6
                for (let s = 1; s <= 6; s++) {
                    const candidates = bs.craftedDiscs.filter(d => d.slot === s);
                    if (candidates.length > 0) {
                        candidates.sort((a, b) => b.level - a.level);
                        ab.discs[s] = candidates[0].uid;
                    }
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            });
        }

        // ========================================================
        // 5. MODALES D'INSPECTION DE PARTITION & BARDIC NEEDLE (IMAGE 5)
        // ========================================================
        function openWEngineSelectorModal(mount, st, pool, agent, ab) {
            const bridge = window.ZZZGachaBridge;
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
            overlay.classList.add('active');
            overlay.innerHTML = `
                <div class="gacha-dialog-box" style="max-width:740px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <h2 class="gacha-panel-title">Choisir un Moteur-Ampli (${ownedEngines.length})</h2>
                        <button type="button" class="gacha-res-btn" id="close-we-sel">Fermer</button>
                    </div>
                    ${ownedEngines.length === 0 ? `<p class="gacha-panel-desc">Vous n'avez encore obtenu aucun Moteur-Ampli dans vos tirages.</p>` : `
                    <div class="gacha-selector-scroll custom-scrollbar">
                        <div class="gacha-selector-grid">
                            ${ownedEngines.map(e => {
                                const cnt = st.inventory[e.id]?.count || 1;
                                const isEq = ab.engineKey === e.rawKey;
                                return `
                                <div class="gacha-col-card rank-${e.rank}" data-equip-eng="${e.rawKey}" style="${isEq ? 'border-color:#d7f70c;' : ''}">
                                    <div class="gacha-col-visual">
                                        <span class="gacha-col-rank-tag">${e.rank}</span>
                                        <span class="gacha-col-dupe-tag maxed">★${Math.min(5, cnt)}</span>
                                        <img src="${e.img}" class="is-equip">
                                    </div>
                                    <div class="gacha-col-info">
                                        <span class="gacha-col-name">${bridge.itemName(e)}</span>
                                        <span class="gacha-col-sub">${e.role || 'W-Engine'}</span>
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>`}
                </div>
            `;

            document.getElementById('close-we-sel').addEventListener('click', () => overlay.classList.remove('active'));
            overlay.querySelectorAll('[data-equip-eng]').forEach(card => {
                card.addEventListener('click', () => {
                    ab.engineKey = card.getAttribute('data-equip-eng');
                    bridge.saveState(st);
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });
            });
        }

        function openSlotInspectorModal(mount, st, pool, bs, agent, ab, slotNum) {
            const bridge = window.ZZZGachaBridge;
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const currentUid = ab.discs[slotNum];
            const currentDisc = currentUid ? bs.craftedDiscs.find(d => d.uid === currentUid) : null;
            const slotDiscs = bs.craftedDiscs.filter(d => d.slot === slotNum);

            function renderSlotModal() {
                const eqDisc = ab.discs[slotNum] ? bs.craftedDiscs.find(d => d.uid === ab.discs[slotNum]) : null;
                const setObj = eqDisc ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === eqDisc.setKey) : null;

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:760px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                            <div>
                                <span class="gacha-patch-tag">PARTITION [${slotNum}] • RANG S</span>
                                <h2 class="gacha-panel-title" style="font-size:22px;">Gestion du Disque [${slotNum}]</h2>
                            </div>
                            <div style="display:flex;gap:8px;">
                                <button type="button" class="gacha-details-btn accent" id="btn-slot-goto-bardic">🎵 Accorder un Disque [${slotNum}]</button>
                                <button type="button" class="gacha-res-btn" id="close-slot-modal">Fermer</button>
                            </div>
                        </div>

                        ${eqDisc ? `
                        <div style="background:#0d0d13;border:1.5px solid #facc15;border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <img src="${setObj ? setObj.img : ''}" style="width:54px;height:54px;border-radius:999px;object-fit:cover;">
                                    <div>
                                        <span style="font-size:10px;font-weight:900;color:#facc15;text-transform:uppercase;">
                                            ${eqDisc.isFourLiner ? '★ 4-LINER NATIF' : '3-LINER'} • NIVEAU +${eqDisc.level} / 15
                                        </span>
                                        <h3 style="margin:2px 0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#fff;text-transform:uppercase;">
                                            ${setObj ? bridge.itemName(setObj) : eqDisc.setKey} [${slotNum}]
                                        </h3>
                                        <span style="font-family:monospace;font-size:13px;font-weight:900;color:#d7f70c;">
                                            Stat Principale : ${eqDisc.mainStat} (${formatMainStatValue(eqDisc.mainStat, eqDisc.level)})
                                        </span>
                                    </div>
                                </div>
                                <div style="display:flex;gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-up-disc-step" style="width:auto;padding:9px 14px;" ${eqDisc.level >= 15 || st.residual < 4 ? 'disabled' : ''}>
                                        ${eqDisc.level >= 15 ? 'NIV. 15 MAX ✓' : `Améliorer +${eqDisc.level + 3} (4 ✦)`}
                                    </button>
                                    <button type="button" class="gacha-shop-btn primary-purple" id="btn-up-disc-max" style="width:auto;padding:9px 14px;" ${eqDisc.level >= 15 || st.residual < ((15 - eqDisc.level) / 3) * 4 ? 'disabled' : ''}>
                                        Max +15 (${((15 - eqDisc.level) / 3) * 4} ✦)
                                    </button>
                                </div>
                            </div>

                            <div class="zb-stats-grid">
                                ${eqDisc.substats.map(sub => `
                                    <div class="zb-stat-row ${sub.upgrades >= 3 ? 'recommended' : ''}">
                                        <span>• ${sub.key} ${sub.upgrades > 0 ? `<strong style="color:#d7f70c;">+${sub.upgrades}</strong>` : ''}</span>
                                        <span class="zb-stat-val">${formatSubstatValue(sub)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : `<div style="padding:18px;background:#0c0c11;border:1px dashed #3f3f4e;border-radius:14px;text-align:center;color:#a1a1aa;font-size:12px;">Aucun disque équipé sur la Partition [${slotNum}]. Sélectionnez-en un ci-dessous ou gravez-en un dans le Studio d'Accordage !</div>`}

                        <div style="font-size:11px;font-weight:900;text-transform:uppercase;color:#a1a1aa;">
                            Disques disponibles en Partition [${slotNum}] (${slotDiscs.length}) :
                        </div>
                        <div class="gacha-selector-scroll custom-scrollbar" style="max-height:240px;">
                            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;">
                                ${slotDiscs.map(d => {
                                    const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey);
                                    const isCurrent = ab.discs[slotNum] === d.uid;
                                    return `
                                    <div data-equip-disc-uid="${d.uid}" style="background:#111118;border:1.5px solid ${isCurrent ? '#d7f70c' : '#2b2b36'};border-radius:12px;padding:10px;cursor:pointer;display:flex;flex-direction:column;gap:4px;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;">
                                            <strong style="font-size:11px;color:#fff;">${sObj ? bridge.itemName(sObj) : d.setKey}</strong>
                                            <span class="gacha-quest-prog done">+${d.level}</span>
                                        </div>
                                        <span style="font-size:11px;font-weight:800;color:#facc15;">${d.mainStat} (${formatMainStatValue(d.mainStat, d.level)})</span>
                                        <span style="font-size:10px;color:#a1a1aa;">${d.substats.map(s => `${s.key}${s.upgrades > 0 ? '+' + s.upgrades : ''}`).join(', ')}</span>
                                    </div>`;
                                }).join('')}
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('close-slot-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                document.getElementById('btn-slot-goto-bardic').addEventListener('click', () => {
                    bardicSlot = slotNum;
                    openBardicNeedleModal(mount);
                });

                document.getElementById('btn-up-disc-step')?.addEventListener('click', () => {
                    if (eqDisc && eqDisc.level < 15 && st.residual >= 4) {
                        st.residual -= 4;
                        upgradeDiscOneStep(eqDisc);
                        bridge.saveState(st);
                        renderSlotModal();
                    }
                });

                document.getElementById('btn-up-disc-max')?.addEventListener('click', () => {
                    if (!eqDisc || eqDisc.level >= 15) return;
                    const steps = (15 - eqDisc.level) / 3;
                    const cost = steps * 4;
                    if (st.residual >= cost) {
                        st.residual -= cost;
                        while (eqDisc.level < 15) upgradeDiscOneStep(eqDisc);
                        bridge.saveState(st);
                        renderSlotModal();
                    }
                });

                overlay.querySelectorAll('[data-equip-disc-uid]').forEach(el => {
                    el.addEventListener('click', () => {
                        ab.discs[slotNum] = el.getAttribute('data-equip-disc-uid');
                        bridge.saveState(st);
                        renderSlotModal();
                    });
                });
            }

            renderSlotModal();
        }

        // Studio d'Accordage Bardic Needle (inspiré d'Elfy - image_1450e1.png)
        function openBardicNeedleModal(mount) {
            const bridge = window.ZZZGachaBridge;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const unlockedSets = pool.allCatalog.filter(i => i.type === 'disc' && (st.inventory[i.id]?.count || 0) > 0);
            const allSets = unlockedSets.length > 0 ? unlockedSets : pool.allCatalog.filter(i => i.type === 'disc');
            if (!bardicSetKey || !allSets.some(s => s.rawKey === bardicSetKey)) {
                bardicSetKey = allSets[0]?.rawKey || '';
            }

            let selectedMainStat = '';

            function renderBardic() {
                const currentSet = allSets.find(s => s.rawKey === bardicSetKey) || allSets[0];
                const variableMainKeys = bardicSlot >= 4 ? Object.keys(PARTITION_WEIGHTS[bardicSlot]) : [];

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:860px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                            <div>
                                <span class="gacha-patch-tag">BARDIC NEEDLE • STUDIO D'ACCORDAGE RANG S</span>
                                <h2 class="gacha-panel-title" style="font-size:22px;">Graver des Disques de Poussée</h2>
                            </div>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                <span class="gacha-reset-pill" style="color:#38bdf8;">🎯 Calibrateurs : ${bs.calibrators || 0}</span>
                                <button type="button" class="gacha-res-btn" id="close-bardic-modal">Fermer</button>
                            </div>
                        </div>

                        <div style="display:grid;grid-template-columns:1fr;gap:14px;">
                            <!-- Choix du Set de Disques -->
                            <div style="display:flex;align-items:center;gap:10px;overflow-x:auto;padding-bottom:6px;">
                                ${allSets.map(s => `
                                    <div data-bset="${s.rawKey}" style="flex-shrink:0;cursor:pointer;background:#111118;border:2px solid ${s.rawKey === bardicSetKey ? '#d7f70c' : '#272732'};border-radius:14px;padding:6px 10px;display:flex;align-items:center;gap:8px;">
                                        <img src="${s.img}" style="width:34px;height:34px;border-radius:999px;">
                                        <span style="font-size:10.5px;font-weight:900;color:#fff;text-transform:uppercase;">${bridge.itemName(s)}</span>
                                    </div>
                                `).join('')}
                            </div>

                            <!-- Choix de la Partition (Aléatoire ou 1 à 6) -->
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                <button type="button" class="gacha-col-filter-btn ${bardicSlot === 0 ? 'active' : ''}" data-bslot="0">Aléatoire (I–VI)</button>
                                ${[1, 2, 3, 4, 5, 6].map(n => `
                                    <button type="button" class="gacha-col-filter-btn ${bardicSlot === n ? 'active' : ''}" data-bslot="${n}">Partition [${n}]</button>
                                `).join('')}
                            </div>

                            ${variableMainKeys.length > 0 ? `
                            <div style="background:#0c0c12;border:1px solid #292936;border-radius:12px;padding:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                                <span style="font-size:11px;font-weight:800;color:#d4d4d8;">🎯 Orientation Stat Principale (Coût : 1 Calibrateur si ciblée) :</span>
                                <select id="bardic-main-select" class="gacha-col-search" style="min-width:210px;">
                                    <option value="">Tirage pondéré standard (0 🎯)</option>
                                    ${variableMainKeys.map(k => `<option value="${k}" ${selectedMainStat === k ? 'selected' : ''}>${k} (${Math.round(PARTITION_WEIGHTS[bardicSlot][k] * 100)}%)</option>`).join('')}
                                </select>
                            </div>` : ''}

                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-1" ${st.residual < 10 ? 'disabled' : ''}>
                                    🎵 Accordage ×01 (10 ✦)
                                </button>
                                <button type="button" class="gacha-shop-btn primary-purple" id="btn-craft-5" ${st.residual < 50 ? 'disabled' : ''}>
                                    🎵 Accordage ×05 (50 ✦)
                                </button>
                            </div>

                            <div id="bardic-new-results" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px;max-height:220px;overflow-y:auto;"></div>
                        </div>
                    </div>
                `;

                document.getElementById('close-bardic-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                overlay.querySelectorAll('[data-bset]').forEach(el => {
                    el.addEventListener('click', () => {
                        bardicSetKey = el.getAttribute('data-bset');
                        renderBardic();
                    });
                });

                overlay.querySelectorAll('[data-bslot]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        bardicSlot = parseInt(btn.getAttribute('data-bslot'), 10) || 0;
                        selectedMainStat = '';
                        renderBardic();
                    });
                });

                document.getElementById('bardic-main-select')?.addEventListener('change', (e) => {
                    selectedMainStat = e.target.value;
                });

                function doCraft(count) {
                    const cost = count * 10;
                    if (st.residual < cost) return;
                    let forceStat = null;
                    if (selectedMainStat && bardicSlot >= 4 && (bs.calibrators || 0) >= 1) {
                        forceStat = selectedMainStat;
                        bs.calibrators -= 1;
                    }
                    st.residual -= cost;
                    const created = [];
                    for (let i = 0; i < count; i++) {
                        const d = generateSRankDisc(bardicSetKey, bardicSlot, i === 0 ? forceStat : null);
                        bs.craftedDiscs.unshift(d);
                        created.push(d);
                    }
                    bridge.saveState(st);
                    renderBardic();
                    const resBox = document.getElementById('bardic-new-results');
                    if (resBox) {
                        resBox.innerHTML = created.map(d => `
                            <div style="background:#12131c;border:1.5px solid #d7f70c;border-radius:12px;padding:10px;">
                                <div style="display:flex;justify-content:space-between;font-size:10.5px;font-weight:900;color:#d7f70c;">
                                    <span>PARTITION [${d.slot}]</span>
                                    <span>${d.isFourLiner ? '★ 4-LINER NATIF' : '3-LINER'}</span>
                                </div>
                                <strong style="display:block;font-size:12px;color:#fff;margin:3px 0;">${d.mainStat} (${formatMainStatValue(d.mainStat, 0)})</strong>
                                <div style="font-size:10.5px;color:#a1a1aa;">${d.substats.map(s => `${s.key} (${formatSubstatValue(s)})`).join(' • ')}</div>
                            </div>
                        `).join('');
                    }
                }

                document.getElementById('btn-craft-1')?.addEventListener('click', () => doCraft(1));
                document.getElementById('btn-craft-5')?.addEventListener('click', () => doCraft(5));
            }

            renderBardic();
        }

        // ========================================================
        // 6. RENDU DE L'ONGLET « BADGES & SÉRIES » (FACTIONS, DISQUES, GOD ROLLS)
        // ========================================================
        function computeSeriesBadges(st, pool) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            const badges = [];

            // 1. Badges de Factions complètes
            const factionMap = {};
            pool.allCatalog.filter(i => i.type === 'agent').forEach(a => {
                const fac = a.faction || 'New Eridu';
                if (!factionMap[fac]) factionMap[fac] = [];
                factionMap[fac].push(a);
            });

            Object.entries(factionMap).forEach(([facName, members]) => {
                const ownedCount = members.filter(m => (inv[m.id]?.count || 0) > 0).length;
                badges.push({
                    id: `fac_${facName}`,
                    icon: `assets/Faction/${facName}.webp`,
                    title: `Escouade : ${facName}`,
                    desc: `Recruter tous les Agents de la faction ${facName}.`,
                    cur: ownedCount,
                    max: members.length,
                    reward: 800
                });
            });

            // 2. Tous les Sets de Disques
            const allDiscs = pool.allCatalog.filter(i => i.type === 'disc');
            const ownedDiscs = allDiscs.filter(d => (inv[d.id]?.count || 0) > 0).length;
            badges.push({
                id: 'series_all_discs',
                icon: '',
                emoji: '💿',
                title: 'Maître Disquaire de New Eridu',
                desc: 'Débloquer l\'intégralité des Sets de Disques dans la Collection.',
                cur: ownedDiscs,
                max: allDiscs.length || 30,
                reward: 1600
            });

            // 3. God Roll (+4 ou +5 sur une sous-statistique de disque)
            const hasGodRoll = bs.craftedDiscs.some(d => (d.substats || []).some(s => (s.upgrades || 0) >= 4));
            badges.push({
                id: 'series_god_roll',
                icon: '',
                emoji: '🎲',
                title: 'Miracle Statistique (+4 / +5 Roll)',
                desc: 'Obtenir au moins +4 améliorations sur une seule sous-statistique de Disque S.',
                cur: hasGodRoll ? 1 : 0,
                max: 1,
                reward: 1200
            });

            // 4. Surcharge Prismatique (Agent M6+)
            const hasOverclock = Object.values(inv).some(i => i.type === 'agent' && (i.count || 0) > 7);
            badges.push({
                id: 'series_overclock_m6',
                icon: '',
                emoji: '🌈',
                title: 'Au-Delà des Limites (Surcharge M6+)',
                desc: 'Obtenir un 8e exemplaire d\'un même Agent pour éveiller sa Surcharge Prismatique.',
                cur: hasOverclock ? 1 : 0,
                max: 1,
                reward: 1000
            });

            return badges;
        }

        function renderBadgesTab(mount) {
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const badges = computeSeriesBadges(st, pool);

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="gacha-sec-header">
                        <div>
                            <h2 class="gacha-sec-title">🏆 Badges de Séries & Factions</h2>
                            <p class="gacha-sec-sub">Complétez des factions entières, maîtrisez l'accordage de disques et débloquez vos insignes de prestige.</p>
                        </div>
                    </div>

                    <div class="zb-badges-grid">
                        ${badges.map(b => {
                            const isDone = b.cur >= b.max;
                            const isClaimed = !!bs.claimedBadges[b.id];
                            const canClaim = isDone && !isClaimed;
                            const pct = Math.min(100, Math.round((b.cur / (b.max || 1)) * 100));

                            return `
                            <div class="zb-badge-card ${canClaim ? 'unlocked' : (isClaimed ? 'claimed' : '')}">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <div style="width:48px;height:48px;border-radius:14px;background:#0b0b10;border:1px solid #2b2b36;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:24px;">
                                        ${b.icon ? `<img src="${b.icon}" style="width:36px;height:36px;object-fit:contain;" onerror="this.outerHTML='🏅'">` : b.emoji}
                                    </div>
                                    <div style="min-width:0;flex:1;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                            <strong style="font-family:'Montserrat',sans-serif;font-size:12.5px;color:#fff;text-transform:uppercase;">${b.title}</strong>
                                            <span class="gacha-quest-prog ${isDone ? 'done' : ''}">${b.cur}/${b.max}</span>
                                        </div>
                                        <p style="font-size:11px;color:#a1a1aa;margin:4px 0 0;">${b.desc}</p>
                                    </div>
                                </div>

                                <div class="gacha-quest-bar-track">
                                    <div class="gacha-quest-bar-fill" style="width:${pct}%;background:${isClaimed ? '#22c55e' : (canClaim ? '#d7f70c' : '#38bdf8')};"></div>
                                </div>

                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span style="font-family:monospace;font-size:12px;font-weight:900;color:#d7f70c;">+${b.reward} Polychromes</span>
                                    <button type="button" class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}" data-claim-badge="${b.id}" data-breward="${b.reward}" ${!canClaim ? 'disabled' : ''}>
                                        ${isClaimed ? 'Badge Obtenu ✓' : (canClaim ? 'Récupérer' : 'En cours')}
                                    </button>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;

            mount.querySelectorAll('[data-claim-badge]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bId = btn.getAttribute('data-claim-badge');
                    const rew = parseInt(btn.getAttribute('data-breward'), 10) || 0;
                    if (!bs.claimedBadges[bId]) {
                        bs.claimedBadges[bId] = true;
                        st.polychromes += rew;
                        bridge.saveState(st);
                        renderBadgesTab(mount);
                    }
                });
            });
        }

        // ========================================================
        // 7. INJECTION AUTOMATIQUE DES ONGLETS DANS LA BARRE DU HAUT
        // ========================================================
        function injectBuildTabsIntoTopbar() {
            const navPills = document.querySelector('#zzz-gacha-modal .gacha-nav-pills');
            if (!navPills || document.getElementById('gtab-lbl-builds')) return;

            navPills.style.gridTemplateColumns = 'repeat(6, 1fr)';

            const btnBuilds = document.createElement('button');
            btnBuilds.type = 'button';
            btnBuilds.className = 'gacha-nav-btn';
            btnBuilds.setAttribute('data-gtab', 'builds');
            btnBuilds.id = 'gtab-lbl-builds';
            btnBuilds.textContent = '🛠️ Builds';

            const btnBadges = document.createElement('button');
            btnBadges.type = 'button';
            btnBadges.className = 'gacha-nav-btn';
            btnBadges.setAttribute('data-gtab', 'badges');
            btnBadges.id = 'gtab-lbl-badges';
            btnBadges.textContent = '🏆 Badges';

            navPills.appendChild(btnBuilds);
            navPills.appendChild(btnBadges);

            btnBuilds.addEventListener('click', () => {
                window.ZZZGachaBridge?.switchCustomTab('builds', renderBuildsTab);
            });

            btnBadges.addEventListener('click', () => {
                window.ZZZGachaBridge?.switchCustomTab('badges', renderBadgesTab);
            });
        }

        // Observer léger pour injecter les onglets dès l'ouverture du Gacha
        const domObs = new MutationObserver(() => {
            if (document.getElementById('zzz-gacha-modal')) {
                injectBuildTabsIntoTopbar();
            }
        });
        domObs.observe(document.body, { childList: true, subtree: true });
        injectBuildTabsIntoTopbar();

        window.ZZZBuilds = {
            openAgentBuild: (agentKey) => {
                injectBuildTabsIntoTopbar();
                selectedAgentKey = agentKey;
                currentSubMenu = 'equip';
                window.ZZZGachaBridge?.switchCustomTab('builds', renderBuildsTab);
            }
        };
    } catch (err) {
        console.error('Erreur isolée dans gacha-builds.js :', err);
    }
})();
