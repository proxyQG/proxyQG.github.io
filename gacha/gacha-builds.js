// gacha/gacha-builds.js - Réplique 1:1 du Menu Équipement Zenless Zone Zero (Sans Flash & Boutons Complets)
(function () {
    try {
        const BUILDS_I18N = {
            fr: {
                tabBuilds: "Builds",
                tabBadges: "Badges",
                noAgentsTitle: "Aucun Agent débloqué",
                noAgentsDesc: "Effectuez des Recherches de Signal sur le Canal Unifié pour recruter votre premier Agent !",
                filterBtn: "Filtrer",
                dismantleBtn: "Démanteler",
                recycleBtn: "Recycler",
                customDiscBtn: "Magasin de musique",
                compareBtn: "Comparer",
                collapseBtn: "Réduire",
                recommendedBtn: "Recommandé",
                unequipAllBtn: "Tout déséquiper",
                equipAllBtn: "Tout équiper",
                removeBtn: "Retirer",
                replaceBtn: "Remplacer",
                equipBtn: "Équiper",
                enhanceBtn: "Renforcer",
                currentSelection: "Sélection actuelle",
                currentlyEquipped: "Équipé",
                subStats: "Stats de l'agent",
                subEquip: "Équipement",
                effectiveSubs: "Stats secondaires utiles :",
                combatEval: "Évaluation de combat",
                piece2: "Ensemble de 2 pièces",
                piece4: "Ensemble de 4 pièces",
                mainStatLabel: "Stat principale",
                subStatsLabel: "Stats secondaires",
                setEffectsLabel: "Effets de l'ensemble",
                baseStatLabel: "Stat de base",
                advStatLabel: "Stat avancée",
                engineEffectLabel: "Effet de moteur-ampli",
                engineSpecIntro: "Les effets suivants sont appliqués pour les personnages de la spécialisation",
                filterAllSets: "Tous les Sets",
                allPartitions: "Toutes Partitions (I–VI)",
                slotOnly: "Partition [{s}] uniquement",
                emptyDiscList: "Aucun disque sur cette partition. Cliquez sur « Magasin de musique » en haut à droite pour en graver.",
                emptyEngineList: "Aucun Moteur-Ampli possédé.",
                bardicTag: "BARDIC NEEDLE • MAGASIN DE MUSIQUE",
                bardicTitle: "Graver des Disques de Poussée",
                searchSetPlaceholder: "Rechercher un Set de Disques...",
                randomPartition: "Aléatoire (I–VI)",
                equipNow: "Équiper",
                equippedTag: "Équipé",
                badgesTitle: "Salle des Trophées : Séries & Factions",
                badgesSub: "Complétez les escouades de New Eridu et les défis d'accordage de disques pour gagner des Polychromes.",
                badgesUnlockedCount: "Badges : {u} / {t}",
                filterAllBadges: "Tous ({n})",
                filterMastery: "Maîtrise & Disques",
                filterSquads: "Escouades",
                claimBadge: "Récupérer",
                claimedBadge: "Obtenu",
                inProgress: "En cours",
                close: "Fermer",
                stats: {
                    "PV": "PV", "ATQ": "ATQ", "DÉF": "DÉF", "Impact": "Impact",
                    "Taux CRIT": "Taux CRIT", "Dégâts CRIT": "DGT CRIT",
                    "Maîtrise d'anomalie": "Maîtrise d'anomalie", "Adresse d'anomalie": "Adresse d'anomalie",
                    "Ratio de PÉN": "Taux de PÉN", "Régénération d'énergie": "Récup. d'énergie",
                    "PV (flat)": "PV", "ATQ (flat)": "ATQ", "DÉF (flat)": "DÉF",
                    "PV%": "PV", "ATQ%": "ATQ", "DÉF%": "DÉF", "PÉN (flat)": "PÉN",
                    "DGT Physique": "DGT Physique", "DGT Feu": "DGT Feu", "DGT Glace": "DGT Glace",
                    "DGT Électrique": "DGT Électrique", "DGT Éther": "DGT Éther", "DGT Vent": "DGT Vent"
                }
            },
            en: {
                tabBuilds: "Builds",
                tabBadges: "Badges",
                noAgentsTitle: "No Agents Unlocked Yet",
                noAgentsDesc: "Perform Signal Searches on the Unified Channel to recruit your first Agent!",
                filterBtn: "Filter",
                dismantleBtn: "Dismantle",
                recycleBtn: "Recycle",
                customDiscBtn: "Music Store",
                compareBtn: "Compare",
                collapseBtn: "Collapse",
                recommendedBtn: "Recommended",
                unequipAllBtn: "Unequip All",
                equipAllBtn: "Equip All",
                removeBtn: "Remove",
                replaceBtn: "Replace",
                equipBtn: "Equip",
                enhanceBtn: "Enhance",
                currentSelection: "Current Selection",
                currentlyEquipped: "Equipped",
                subStats: "Agent Stats",
                subEquip: "Equipment",
                effectiveSubs: "Effective Sub-Stats:",
                combatEval: "Combat Readiness",
                piece2: "2-Piece Set",
                piece4: "4-Piece Set",
                mainStatLabel: "Main Stat",
                subStatsLabel: "Sub-Stats",
                setEffectsLabel: "Set Effects",
                baseStatLabel: "Base Stat",
                advStatLabel: "Advanced Stat",
                engineEffectLabel: "W-Engine Effect",
                engineSpecIntro: "The following effects apply to characters with the specialty",
                filterAllSets: "All Sets",
                allPartitions: "All Partitions (I–VI)",
                slotOnly: "Partition [{s}] Only",
                emptyDiscList: "No Drive Discs in this partition. Click 'Music Store' at the top right to tune discs.",
                emptyEngineList: "No W-Engines owned.",
                bardicTag: "BARDIC NEEDLE • MUSIC STORE",
                bardicTitle: "Tune S-Rank Drive Discs",
                searchSetPlaceholder: "Search a Drive Disc Set...",
                randomPartition: "Random (I–VI)",
                equipNow: "Equip",
                equippedTag: "Equipped",
                badgesTitle: "Trophy Room: Series & Factions",
                badgesSub: "Complete New Eridu squads and Drive Disc tuning challenges to earn Polychrome rewards.",
                badgesUnlockedCount: "Badges: {u} / {t}",
                filterAllBadges: "All ({n})",
                filterMastery: "Mastery & Discs",
                filterSquads: "Squads",
                claimBadge: "Claim",
                claimedBadge: "Claimed",
                inProgress: "In Progress",
                close: "Close",
                stats: {
                    "PV": "HP", "ATQ": "ATK", "DÉF": "DEF", "Impact": "Impact",
                    "Taux CRIT": "CRIT Rate", "Dégâts CRIT": "CRIT DMG",
                    "Maîtrise d'anomalie": "Anomaly Mastery", "Adresse d'anomalie": "Anomaly Proficiency",
                    "Ratio de PÉN": "PEN Ratio", "Régénération d'énergie": "Energy Regen",
                    "PV (flat)": "HP", "ATQ (flat)": "ATK", "DÉF (flat)": "DEF",
                    "PV%": "HP", "ATQ%": "ATK", "DÉF%": "DEF", "PÉN (flat)": "PEN",
                    "DGT Physique": "Physical DMG", "DGT Feu": "Fire DMG", "DGT Glace": "Ice DMG",
                    "DGT Électrique": "Electric DMG", "DGT Éther": "Ether DMG", "DGT Vent": "Wind DMG"
                }
            }
        };

        const UI_SVGS = {
            funnel: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18l-7 8v7l-4 2v-9L3 4z"/></svg>`,
            trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
            lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
            lockMini: `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
            dismantle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><rect x="5" y="6" width="14" height="14" rx="2"/></svg>`,
            discTune: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>`,
            compare: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="4" width="8" height="16" rx="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5"/></svg>`,
            recommend: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><polygon points="12 7 13.8 10.6 17.8 11.2 14.9 14 15.6 18 12 16.1 8.4 18 9.1 14 6.2 11.2 10.2 10.6 12 7" fill="currentColor"/></svg>`,
            users: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`
        };

        function B() {
            const lang = window.ZZZGachaBridge?.getLang?.() || 'fr';
            return BUILDS_I18N[lang] || BUILDS_I18N.fr;
        }

        function tStat(statKey) {
            const dict = B().stats || {};
            return dict[statKey] || statKey;
        }

        // Supprime les {accolades} et [crochets] des textes JSON et met en valeur les chiffres/mots-clés comme en jeu
        function formatCleanDesc(rawText) {
            if (!rawText) return '';
            return String(rawText)
                .replace(/\[([^\]]+)\]/g, '<span style="color:#4ade80;font-weight:900;">$1</span>')
                .replace(/\{([^}]+)\}/g, '<span style="color:#fbbf24;font-weight:800;">$1</span>');
        }

        let EXT_DATA = { loaded: false, guides: {}, discs: {}, engines: {} };

        async function ensureExternalDataLoaded() {
            if (EXT_DATA.loaded) return;
            try {
                const [g, d, e] = await Promise.all([
                    fetch('js/data/agent_database.json').then(r => r.json()).catch(() => ({})),
                    fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})),
                    fetch('js/data/engines.json').then(r => r.json()).catch(() => ({}))
                ]);
                EXT_DATA.guides = g || {};
                EXT_DATA.discs = d || {};
                EXT_DATA.engines = e || {};
                EXT_DATA.loaded = true;
            } catch (err) {
                console.warn('Erreur chargement données externes Builds:', err);
            }
        }

        function getAgentGuide(agentKey) {
            if (!agentKey) return null;
            return EXT_DATA.guides[agentKey]
                || (agentKey === 'Jane' ? EXT_DATA.guides['Jane Doe'] : null)
                || (agentKey === 'Jane Doe' ? EXT_DATA.guides['Jane'] : null)
                || null;
        }

        function parseGuideStatKeys(rawLabel) {
            if (!rawLabel) return [];
            const str = String(rawLabel).toUpperCase();
            const parts = str.split(/[>/=,]+/).map(s => s.trim()).filter(Boolean);
            const res = [];

            parts.forEach(p => {
                if (p.includes('TAUX CRIT') || p.includes('CRIT RATE')) res.push('Taux CRIT');
                else if (p.includes('DGT CRIT') || p.includes('CRIT DMG') || p.includes('DÉGÂTS CRIT')) res.push('Dégâts CRIT');
                else if (p.includes('ADRESSE') || p.includes('PROFICIENCY')) res.push("Adresse d'anomalie");
                else if (p.includes('MAÎTRISE') || p.includes('MAITRISE') || p.includes('MASTERY')) res.push("Maîtrise d'anomalie");
                else if (p.includes('ÉNERGIE') || p.includes('ENERGIE') || p.includes('ENERGY')) res.push("Régénération d'énergie");
                else if (p.includes('IMPACT')) res.push('Impact');
                else if ((p.includes('PÉN') || p.includes('PEN')) && (p.includes('FLAT') || !p.includes('%') && !p.includes('TAUX') && !p.includes('RATIO'))) res.push('PÉN (flat)');
                else if (p.includes('PÉN') || p.includes('PEN')) res.push('Ratio de PÉN');
                else if (p.includes('PHYSIQUE') || p.includes('PHYSICAL')) res.push('DGT Physique');
                else if (p.includes('FEU') || p.includes('FIRE')) res.push('DGT Feu');
                else if (p.includes('GLACE') || p.includes('ICE')) res.push('DGT Glace');
                else if (p.includes('ÉLECTRIQUE') || p.includes('ELECTRIQUE') || p.includes('ELECTRIC')) res.push('DGT Électrique');
                else if (p.includes('ÉTHER') || p.includes('ETHER')) res.push('DGT Éther');
                else if (p.includes('VENT') || p.includes('WIND')) res.push('DGT Vent');
                else if ((p.includes('ATQ') || p.includes('ATK')) && p.includes('FLAT')) res.push('ATQ (flat)');
                else if (p.includes('ATQ') || p.includes('ATK')) res.push('ATQ%');
                else if (p.includes('PV') && p.includes('FLAT')) res.push('PV (flat)');
                else if (p.includes('PV') || p.includes('HP')) res.push('PV%');
                else if ((p.includes('DÉF') || p.includes('DEF')) && p.includes('FLAT')) res.push('DÉF (flat)');
                else if (p.includes('DÉF') || p.includes('DEF')) res.push('DÉF%');
            });

            return [...new Set(res)];
        }

        function getGuideProfile(agentKey) {
            const g = getAgentGuide(agentKey);
            if (!g) return { sets4: [], sets2: [], mainBySlot: { 4: [], 5: [], 6: [] }, subPrio: [], engines: [] };

            const sets4 = [];
            const sets2 = [];
            (g.discs || []).forEach(d => {
                if (d.set1 && !sets4.includes(d.set1)) sets4.push(d.set1);
                if (d.set2 && !sets2.includes(d.set2)) sets2.push(d.set2);
            });

            const mainBySlot = { 4: [], 5: [], 6: [] };
            (g.statPriority?.main || []).forEach(m => {
                const sl = parseInt(m.slot, 10);
                if (mainBySlot[sl]) {
                    mainBySlot[sl].push(...parseGuideStatKeys(m.label));
                }
            });

            const subPrio = [];
            (g.statPriority?.sub || []).forEach(s => {
                parseGuideStatKeys(s.label).forEach(k => {
                    if (!subPrio.includes(k)) subPrio.push(k);
                });
            });

            const engines = (g.engines || []).map(e => {
                const rawImg = (e.img || e.id || '').replace('.png', '').replace('.webp', '');
                return { rawImg, name: e.name };
            });

            return { sets4, sets2, mainBySlot, subPrio, engines };
        }

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
                "Adresse d'anomalie": 0.2105, "Taux CRIT": 0.1579, "Dégâts CRIT": 0.1579,
                "ATQ%": 0.1579, "PV%": 0.1579, "DÉF%": 0.1579
            },
            5: {
                "DGT Physique": 0.088, "DGT Feu": 0.088, "DGT Glace": 0.088, "DGT Électrique": 0.088,
                "DGT Éther": 0.088, "DGT Vent": 0.088, "Ratio de PÉN": 0.088, "ATQ%": 0.128, "PV%": 0.128, "DÉF%": 0.128
            },
            6: {
                "Maîtrise d'anomalie": 0.150, "Régénération d'énergie": 0.150, "Impact": 0.150,
                "ATQ%": 0.183, "PV%": 0.183, "DÉF%": 0.184
            }
        };

        const SUBSTAT_POOL = [
            { key: "PV (flat)", weight: 150, step: 112, isPct: false },
            { key: "ATQ (flat)", weight: 150, step: 19, isPct: false },
            { key: "DÉF (flat)", weight: 150, step: 15, isPct: false },
            { key: "PV%", weight: 100, step: 3.0, isPct: true },
            { key: "ATQ%", weight: 100, step: 3.0, isPct: true },
            { key: "DÉF%", weight: 100, step: 4.8, isPct: true },
            { key: "Adresse d'anomalie", weight: 100, step: 9, isPct: false },
            { key: "PÉN (flat)", weight: 100, step: 9, isPct: false },
            { key: "Taux CRIT", weight: 75, step: 2.4, isPct: true },
            { key: "Dégâts CRIT", weight: 75, step: 4.8, isPct: true }
        ];

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

        function upgradeDiscOneStep(disc) {
            if (!disc || disc.level >= 15) return false;
            disc.level = Math.min(15, disc.level + 3);

            if (!disc.isFourLiner && disc.level === 3 && disc.substats.length < 4) {
                const usedKeys = new Set([disc.mainStat, ...disc.substats.map(s => s.key)]);
                const remaining = SUBSTAT_POOL.filter(s => !usedKeys.has(s.key)).map(s => ({ ...s }));
                if (remaining.length > 0) {
                    disc.substats.push(drawSubstatFromPool(remaining));
                }
                return true;
            }

            if (disc.substats.length > 0) {
                const lineIdx = Math.floor(Math.random() * disc.substats.length);
                disc.substats[lineIdx].upgrades = (disc.substats[lineIdx].upgrades || 0) + 1;
            }
            return true;
        }

        function formatMainStatValue(mainStatKey, level) {
            const cfg = MAIN_STAT_MAX_LV15[mainStatKey] || { val: 30, isPct: true };
            const scaled = cfg.val * (0.25 + 0.75 * (level / 15));
            return cfg.isPct ? `${scaled.toFixed(1).replace('.0', '')} %` : `${Math.round(scaled)}`;
        }

        function formatSubstatValue(sub) {
            const totalUnits = 1 + (sub.upgrades || 0);
            const raw = totalUnits * sub.step;
            return sub.isPct ? `${raw.toFixed(1).replace('.0', '').replace('.', ',')} %` : `${Math.round(raw)}`;
        }

        const ELEM_ICON_MAP = {
            Physical: 'physique.webp', Fire: 'feu.webp', Ice: 'Ice.webp', Frost: 'Frost.webp',
            Electric: 'electrique.webp', Ether: 'Ether.webp', Wind: 'Vent.webp',
            Aurora: 'Lumiflux.webp', Lumiflux: 'Lumiflux.webp', HonedEdge: 'Honed_Edge.webp',
            Honed_Edge: 'Honed_Edge.webp', Sepia: 'Auric_Ink.webp', Auric_Ink: 'Auric_Ink.webp'
        };

        function getEngineOwnersList(st, engineKey) {
            if (!engineKey || !st.buildSystem?.agentBuilds) return [];
            const owners = [];
            for (const [agKey, ab] of Object.entries(st.buildSystem.agentBuilds)) {
                if (ab && ab.engineKey === engineKey) owners.push(agKey);
            }
            return owners;
        }

        function ensureBuildState(st) {
            if (!st.buildSystem) {
                st.buildSystem = { craftedDiscs: [], agentBuilds: {}, usedGachaDiscs: {}, claimedBadges: {} };
            }
            if (!st.buildSystem.usedGachaDiscs) st.buildSystem.usedGachaDiscs = {};
            if (!st.buildSystem.agentBuilds) st.buildSystem.agentBuilds = {};
            if (!Array.isArray(st.buildSystem.craftedDiscs)) st.buildSystem.craftedDiscs = [];

            const seenDiscUids = new Set();
            const validUids = new Set(st.buildSystem.craftedDiscs.map(d => d.uid));
            const engineUsedCounts = {};

            Object.values(st.buildSystem.agentBuilds).forEach(ab => {
                if (!ab) return;
                if (ab.discs) {
                    for (let s = 1; s <= 6; s++) {
                        const uid = ab.discs[s];
                        if (!uid) continue;
                        if (!validUids.has(uid) || seenDiscUids.has(uid)) {
                            ab.discs[s] = null;
                        } else {
                            seenDiscUids.add(uid);
                        }
                    }
                }
                if (ab.engineKey) {
                    const ownedCount = st.inventory?.[`engine_${ab.engineKey}`]?.count || 0;
                    const used = engineUsedCounts[ab.engineKey] || 0;
                    if (used >= ownedCount) {
                        ab.engineKey = null;
                    } else {
                        engineUsedCounts[ab.engineKey] = used + 1;
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
                    skills: [1, 1, 1, 1, 1]
                };
            }
            return st.buildSystem.agentBuilds[agentKey];
        }

        function getDiscOwner(st, discUid) {
            if (!discUid || !st.buildSystem?.agentBuilds) return null;
            for (const [agKey, ab] of Object.entries(st.buildSystem.agentBuilds)) {
                for (let s = 1; s <= 6; s++) {
                    if (ab.discs && ab.discs[s] === discUid) return agKey;
                }
            }
            return null;
        }

        function equipDiscUnique(st, targetAgentKey, slotNum, discUid) {
            const bs = ensureBuildState(st);
            Object.entries(bs.agentBuilds).forEach(([, ab]) => {
                for (let s = 1; s <= 6; s++) {
                    if (ab.discs && ab.discs[s] === discUid) ab.discs[s] = null;
                }
            });
            const targetAb = getOrInitAgentBuild(st, targetAgentKey);
            targetAb.discs[slotNum] = discUid;
        }

        function equipEngineUnique(st, targetAgentKey, engineKey) {
            const bs = ensureBuildState(st);
            const totalOwned = st.inventory?.[`engine_${engineKey}`]?.count || 0;
            if (totalOwned <= 0) return;

            const otherOwners = getEngineOwnersList(st, engineKey).filter(k => k !== targetAgentKey);
            if (otherOwners.length >= totalOwned && otherOwners[0]) {
                bs.agentBuilds[otherOwners[0]].engineKey = null;
            }
            const targetAb = getOrInitAgentBuild(st, targetAgentKey);
            targetAb.engineKey = engineKey;
        }

        function getFreeGachaDiscCount(st, setKey = null) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            if (setKey) {
                const pulled = inv[`disc_${setKey}`]?.count || 0;
                const used = bs.usedGachaDiscs[setKey] || 0;
                return Math.max(0, pulled - used);
            }
            let total = 0;
            Object.entries(inv).forEach(([, it]) => {
                if (it.type === 'disc') {
                    const used = bs.usedGachaDiscs[it.rawKey] || 0;
                    total += Math.max(0, (it.count || 0) - used);
                }
            });
            return total;
        }

        function calcDiscDismantleGain(disc) {
            if (!disc) return 0;
            const steps = Math.floor((disc.level || 0) / 3);
            return 5 + Math.round(steps * 4 * 0.8);
        }

        function scoreDiscForAgent(disc, agentKey) {
            if (!disc) return 0;
            const prof = getGuideProfile(agentKey);
            let score = (disc.level || 0) * 2 + (disc.isFourLiner ? 8 : 0);

            if (prof.sets4.includes(disc.setKey)) score += 45;
            else if (prof.sets2.includes(disc.setKey)) score += 38;

            if (disc.slot >= 4) {
                const recMains = prof.mainBySlot[disc.slot] || [];
                const mIdx = recMains.indexOf(disc.mainStat);
                if (mIdx === 0) score += 110;
                else if (mIdx === 1) score += 85;
                else if (mIdx >= 2) score += 65;
            }

            (disc.substats || []).forEach(sub => {
                const sIdx = prof.subPrio.indexOf(sub.key);
                const rolls = 1 + (sub.upgrades || 0);
                if (sIdx === 0) score += rolls * 24;
                else if (sIdx === 1 || sIdx === 2) score += rolls * 18;
                else if (sIdx >= 3) score += rolls * 12;
            });

            return score;
        }

        // ========================================================
        // 5. ÉQUIPEMENT RECOMMANDÉ AUTO V2 (4P + 2P)
        // ========================================================
        function autoEquipFromGuide(st, pool, agent) {
            const bs = ensureBuildState(st);
            const prof = getGuideProfile(agent.rawKey);

            const ownedEngines = pool.allCatalog.filter(i => {
                if (i.type !== 'engine') return false;
                const totalOwned = st.inventory[i.id]?.count || 0;
                if (totalOwned <= 0) return false;
                const otherOwners = getEngineOwnersList(st, i.rawKey).filter(k => k !== agent.rawKey);
                return otherOwners.length < totalOwned;
            });

            let chosenEngine = null;
            for (const recEng of prof.engines) {
                const match = ownedEngines.find(e =>
                    e.rawKey.toLowerCase() === recEng.rawImg.toLowerCase()
                    || e.img.toLowerCase().includes(recEng.rawImg.toLowerCase())
                );
                if (match) {
                    chosenEngine = match;
                    break;
                }
            }
            if (!chosenEngine && ownedEngines.length > 0) {
                const roleMatches = ownedEngines.filter(e => (e.role || '').toLowerCase() === (agent.role || '').toLowerCase());
                const listToPick = roleMatches.length > 0 ? roleMatches : ownedEngines;
                const rW = { S: 0, A: 1, B: 2 };
                listToPick.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));
                chosenEngine = listToPick[0];
            }
            if (chosenEngine) {
                equipEngineUnique(st, agent.rawKey, chosenEngine.rawKey);
            }

            const availBySlot = {};
            for (let s = 1; s <= 6; s++) {
                availBySlot[s] = bs.craftedDiscs.filter(d => {
                    if (d.slot !== s) return false;
                    const owner = getDiscOwner(st, d.uid);
                    return !owner || owner === agent.rawKey;
                });
                availBySlot[s].sort((a, b) => scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
            }

            const target4P = prof.sets4[0] || null;
            const target2P = prof.sets2[0] || null;
            const chosenBySlot = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };

            if (target4P) {
                const slotsWith4P = [1, 2, 3, 4, 5, 6].map(s => {
                    const best4P = availBySlot[s].find(d => d.setKey === target4P) || null;
                    const best2P = target2P ? (availBySlot[s].find(d => d.setKey === target2P) || null) : null;
                    return { slot: s, best4P, best2P };
                }).filter(x => x.best4P !== null);

                if (slotsWith4P.length >= 4) {
                    slotsWith4P.sort((a, b) => {
                        const scoreA = scoreDiscForAgent(a.best4P, agent.rawKey) - (a.best2P ? scoreDiscForAgent(a.best2P, agent.rawKey) : 0);
                        const scoreB = scoreDiscForAgent(b.best4P, agent.rawKey) - (b.best2P ? scoreDiscForAgent(b.best2P, agent.rawKey) : 0);
                        return scoreB - scoreA;
                    });
                    slotsWith4P.slice(0, 4).forEach(x => {
                        chosenBySlot[x.slot] = x.best4P;
                    });
                }
            }

            for (let s = 1; s <= 6; s++) {
                if (chosenBySlot[s]) continue;
                const best2P = target2P ? availBySlot[s].find(d => d.setKey === target2P) : null;
                const bestAny = availBySlot[s][0] || null;
                if (best2P && (!bestAny || scoreDiscForAgent(best2P, agent.rawKey) >= scoreDiscForAgent(bestAny, agent.rawKey) - 35)) {
                    chosenBySlot[s] = best2P;
                } else if (bestAny) {
                    chosenBySlot[s] = bestAny;
                }
            }

            for (let s = 1; s <= 6; s++) {
                if (chosenBySlot[s]) {
                    equipDiscUnique(st, agent.rawKey, s, chosenBySlot[s].uid);
                }
            }
        }

        // ========================================================
        // 6. CALCUL STATISTIQUE & ÉVALUATION
        // ========================================================
        const ROLE_BASE_STATS = {
            Attack:  { hp: 7650, atk: 915, def: 605, imp: 92,  cr: 5.0, cd: 50.0, am: 92,  ap: 95,  pen: 0, er: 1.2, rec: ['Taux CRIT', 'Dégâts CRIT', 'ATQ%'], goals: { atk: 2600, cr: 65, cd: 135 } },
            Anomaly: { hp: 7800, atk: 885, def: 612, imp: 86,  cr: 5.0, cd: 50.0, am: 148, ap: 118, pen: 0, er: 1.2, rec: ["Adresse d'anomalie", 'ATQ%'], goals: { ap: 360, atk: 2450, am: 175 } },
            Stun:    { hp: 8250, atk: 790, def: 650, imp: 136, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['Impact', 'Taux CRIT', 'ATQ%'], goals: { imp: 162, atk: 2050, cr: 52 } },
            Support: { hp: 8400, atk: 810, def: 660, imp: 90,  cr: 5.0, cd: 50.0, am: 94,  ap: 96,  pen: 0, er: 1.4, rec: ["Régénération d'énergie", 'ATQ%', 'PV%'], goals: { er: 2.2, atk: 2250, hp: 9600 } },
            Defense: { hp: 9100, atk: 740, def: 780, imp: 110, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['DÉF%', 'PV%', 'Impact'], goals: { def: 1700, hp: 10800, imp: 125 } },
            Rupture: { hp: 8100, atk: 895, def: 620, imp: 98,  cr: 5.0, cd: 50.0, am: 96,  ap: 98,  pen: 8, er: 1.2, rec: ['Taux CRIT', 'Dégâts CRIT', 'PV%', 'ATQ%'], goals: { cr: 62, cd: 135, atk: 2450 } },
            Armorer: { hp: 8300, atk: 870, def: 675, imp: 105, cr: 5.0, cd: 50.0, am: 95,  ap: 95,  pen: 0, er: 1.2, rec: ['ATQ%', 'Taux CRIT', 'Dégâts CRIT'], goals: { atk: 2450, cr: 58, cd: 125 } }
        };

        function computeAgentStats(st, pool, agentMeta) {
            const bs = ensureBuildState(st);
            const ab = getOrInitAgentBuild(st, agentMeta.rawKey);
            const base = { ...(ROLE_BASE_STATS[agentMeta.role] || ROLE_BASE_STATS.Attack) };
            const prof = getGuideProfile(agentMeta.rawKey);
            const recSubList = prof.subPrio.length > 0 ? prof.subPrio : base.rec;

            const ownedCopies = st.inventory[`agent_${agentMeta.rawKey}`]?.count || 1;
            const mindscape = Math.min(6, Math.max(0, ownedCopies - 1));
            const overclockLvl = Math.max(0, ownedCopies - 7);

            let engineAtkFlat = 0;
            let enginePctBonus = 0;
            let isGuideEngine = false;
            let engRank = null;
            if (ab.engineKey) {
                const engObj = pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey);
                if (engObj) {
                    engRank = engObj.rank;
                    engineAtkFlat = engObj.rank === 'S' ? 713 : (engObj.rank === 'A' ? 594 : 475);
                    enginePctBonus = engObj.rank === 'S' ? 30 : (engObj.rank === 'A' ? 24 : 18);
                    isGuideEngine = prof.engines.some(re =>
                        engObj.rawKey.toLowerCase() === re.rawImg.toLowerCase()
                        || engObj.img.toLowerCase().includes(re.rawImg.toLowerCase())
                    );
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
            let totalDiscLevels = 0;
            let matchingMainStats = 0;

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

            for (let slot = 1; slot <= 6; slot++) {
                const uid = ab.discs[slot];
                if (!uid) continue;
                const d = bs.craftedDiscs.find(x => x.uid === uid);
                if (!d) continue;

                totalDiscLevels += (d.level || 0);
                setCounts[d.setKey] = (setCounts[d.setKey] || 0) + 1;

                if (slot >= 4) {
                    const recMains = prof.mainBySlot[slot] || [];
                    if (recMains.length === 0 || recMains.includes(d.mainStat)) {
                        matchingMainStats += 1;
                    }
                }

                const mCfg = MAIN_STAT_MAX_LV15[d.mainStat];
                if (mCfg) {
                    const mVal = mCfg.val * (0.25 + 0.75 * (d.level / 15));
                    addStatContribution(d.mainStat, mVal);
                }

                (d.substats || []).forEach(sub => {
                    const units = 1 + (sub.upgrades || 0);
                    addStatContribution(sub.key, units * sub.step);
                    if (recSubList.includes(sub.key)) {
                        effectiveSubRolls += units;
                    }
                });
            }

            const overclockMult = 1 + Math.min(0.20, overclockLvl * 0.02);

            const finalHp = Math.round(((baseHp * (1 + hpPct / 100)) + hpFlat) * overclockMult);
            const finalAtk = Math.round(((baseAtk * (1 + atkPct / 100)) + atkFlat) * overclockMult);
            const finalDef = Math.round(((baseDef * (1 + defPct / 100)) + defFlat) * overclockMult);
            const finalImp = Math.round(base.imp * (1 + impPct / 100));
            const finalAm = Math.round(base.am * (1 + amPct / 100));
            const finalErNum = Number((base.er * (1 + erPct / 100)).toFixed(2));
            const finalAp = Math.round(ap);

            const gTargets = base.goals || { atk: 2500, cr: 60, cd: 120 };
            const goalItems = [];
            if (gTargets.imp) goalItems.push({ label: tStat('Impact'), cur: finalImp, target: gTargets.imp, pct: Math.min(100, Math.round(finalImp / gTargets.imp * 100)) });
            if (gTargets.ap)  goalItems.push({ label: tStat("Adresse d'anomalie"), cur: finalAp, target: gTargets.ap, pct: Math.min(100, Math.round(finalAp / gTargets.ap * 100)) });
            if (gTargets.am)  goalItems.push({ label: tStat("Maîtrise d'anomalie"), cur: finalAm, target: gTargets.am, pct: Math.min(100, Math.round(finalAm / gTargets.am * 100)) });
            if (gTargets.er)  goalItems.push({ label: tStat("Régénération d'énergie"), cur: finalErNum.toFixed(2), target: gTargets.er, pct: Math.min(100, Math.round(finalErNum / gTargets.er * 100)) });
            if (gTargets.def) goalItems.push({ label: tStat('DÉF'), cur: finalDef, target: gTargets.def, pct: Math.min(100, Math.round(finalDef / gTargets.def * 100)) });
            if (gTargets.hp)  goalItems.push({ label: tStat('PV'), cur: finalHp, target: gTargets.hp, pct: Math.min(100, Math.round(finalHp / gTargets.hp * 100)) });
            if (gTargets.atk) goalItems.push({ label: tStat('ATQ'), cur: finalAtk, target: gTargets.atk, pct: Math.min(100, Math.round(finalAtk / gTargets.atk * 100)) });
            if (gTargets.cr)  goalItems.push({ label: tStat('Taux CRIT'), cur: `${cr.toFixed(1)}%`, target: `${gTargets.cr}%`, pct: Math.min(100, Math.round(cr / gTargets.cr * 100)) });
            if (gTargets.cd)  goalItems.push({ label: tStat('Dégâts CRIT'), cur: `${cd.toFixed(1)}%`, target: `${gTargets.cd}%`, pct: Math.min(100, Math.round(cd / gTargets.cd * 100)) });

            const equippedDiscsCount = Object.values(ab.discs).filter(Boolean).length;
            let evalPoints = 0;

            if (ab.engineKey) {
                evalPoints += isGuideEngine ? 12 : (engRank === 'S' ? 10 : (engRank === 'A' ? 7 : 4));
            }
            evalPoints += (totalDiscLevels / 90) * 30;

            const hasGuide4P = Object.entries(setCounts).some(([sk, c]) => c >= 4 && (prof.sets4.length === 0 || prof.sets4.includes(sk)));
            const hasAny4P = Object.values(setCounts).some(c => c >= 4);
            const twoPieceSetsCount = Object.values(setCounts).filter(c => c >= 2).length;
            if (hasGuide4P) evalPoints += 11;
            else if (hasAny4P) evalPoints += 7;
            if ((hasAny4P && twoPieceSetsCount >= 2) || twoPieceSetsCount >= 3) evalPoints += 5;
            else if (twoPieceSetsCount >= 2) evalPoints += 2;

            evalPoints += matchingMainStats * 5;

            const avgGoalPct = goalItems.length > 0
                ? (goalItems.reduce((acc, g) => acc + g.pct, 0) / (goalItems.length * 100))
                : 0.4;
            if (equippedDiscsCount > 0) {
                const lvlFactor = 0.35 + 0.65 * (totalDiscLevels / 90);
                evalPoints += (avgGoalPct * 14) * lvlFactor;
                evalPoints += Math.min(13, effectiveSubRolls * 0.65);
            }

            const finalScore = Math.min(100, Math.round(evalPoints));
            let grade = 'C';
            if (equippedDiscsCount < 4 || (totalDiscLevels < 18 && finalScore < 42)) {
                grade = 'C';
            } else if (finalScore >= 90 && totalDiscLevels >= 75) {
                grade = 'SSS';
            } else if (finalScore >= 80 && totalDiscLevels >= 60) {
                grade = 'SS';
            } else if (finalScore >= 68 && totalDiscLevels >= 45) {
                grade = 'S';
            } else if (finalScore >= 52 && totalDiscLevels >= 18) {
                grade = 'A';
            } else {
                grade = 'B';
            }

            return {
                hp: finalHp, hpBonus: finalHp - base.hp, atk: finalAtk, atkBonus: finalAtk - base.atk,
                def: finalDef, defBonus: finalDef - base.def, imp: finalImp,
                cr: cr.toFixed(1) + ' %', cd: cd.toFixed(1) + ' %', am: finalAm, ap: finalAp,
                pen: penPct.toFixed(1) + ' %', er: finalErNum.toFixed(2),
                effectiveSubRolls, totalDiscLevels, matchingMainStats,
                goalItems: goalItems.slice(0, 3), grade, finalScore,
                mindscape, overclockLvl, setCounts, recSubList
            };
        }

        // ========================================================
        // 7. INTERFACE D'ÉQUIPEMENT ZZZ 1:1
        // ========================================================
        let selectedAgentKey = '';
        let currentSubMenu = 'equip';
        let activeWheelTarget = 1;
        let selectedItemId = null;
        let isCompareMode = false;
        let showFilterBar = false;
        let filterSetKey = 'all';
        let showAllPartitions = false;
        let bardicSetKey = '';
        let bardicSlot = 0;

        function getOwnedAgents(st, pool) {
            return pool.allCatalog.filter(i => i.type === 'agent' && (st.inventory[i.id]?.count || 0) > 0);
        }

        function buildInspectorPaneHTML(st, pool, agent, itemObj, isEngineMode, headerTag = '', isLangEn = false, t, bridge, prof) {
            if (!itemObj) {
                return `
                    <div class="zzz-inspector-pane" style="justify-content:center;align-items:center;text-align:center;min-height:260px;color:#8e8e99;font-size:12.5px;">
                        ${isEngineMode ? t.emptyEngineList : t.emptyDiscList}
                    </div>`;
            }

            if (isEngineMode) {
                const rawJson = EXT_DATA.engines[itemObj.rawKey] || {};
                const cnt = st.inventory[itemObj.id]?.count || 1;
                const owners = getEngineOwnersList(st, itemObj.rawKey);
                const avatarOwner = owners.includes(agent.rawKey) ? agent.rawKey : owners[0];

                const baseAtkVal = rawJson.baseAtk || (itemObj.rank === 'S' ? 713 : (itemObj.rank === 'A' ? 594 : 475));
                const rawSub = (isLangEn ? (rawJson.subStat?.en || rawJson.stat?.en) : (rawJson.subStat?.fr || rawJson.stat?.fr)) || `${tStat('ATQ%')} +${itemObj.rank === 'S' ? '30%' : '24%'}`;
                const effectTitle = (isLangEn ? rawJson.passiveName?.en : rawJson.passiveName?.fr) || bridge.itemName(itemObj);
                const effectTxt = formatCleanDesc((isLangEn ? (rawJson.effect?.en || rawJson.desc?.en) : (rawJson.effect?.fr || rawJson.desc?.fr)) || 'Augmente l\'ATQ et l\'efficacité de combat du porteur.');

                const matchPct = String(rawSub).match(/^(.*?)\s*([+]?\d+[.,]?\d*\s*%?)$/);
                const advName = matchPct ? matchPct[1].trim() : rawSub;
                const advVal = matchPct ? matchPct[2].replace('+', '').trim() : 'MAX';

                return `
                    <div class="zzz-inspector-pane">
                        ${headerTag ? `<span class="zzz-insp-tag-top">${headerTag}</span>` : ''}
                        <h3 class="zzz-insp-title">${bridge.itemName(itemObj)}</h3>

                        <div class="zzz-insp-lvl-row">
                            <div class="zzz-insp-lvl-pill">
                                <span class="zzz-rank-circle r-${itemObj.rank}">${itemObj.rank}</span>
                                <span>Niv. 60/60</span>
                            </div>
                            ${avatarOwner ? `<img src="assets/Agents/${avatarOwner}.webp" title="${owners.join(', ')}" style="width:28px;height:28px;border-radius:999px;border:2px solid #fff;background:#000;">` : ''}
                        </div>

                        <div class="zzz-stat-bar" style="width:fit-content;gap:14px;padding:4px 14px;">
                            <span style="color:#a1a1aa;font-size:11px;">Exemplaires : ×${cnt}</span>
                            <span style="color:#d7f70c;font-size:11px;">${owners.length}/${cnt} équipé(s)</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.baseStatLabel}</span>
                        <div class="zzz-stat-bar">
                            <span>ATQ de base</span>
                            <span>${baseAtkVal}</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.advStatLabel}</span>
                        <div class="zzz-stat-bar hl-gold">
                            <span>${advName}</span>
                            <span>${advVal}</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.engineEffectLabel}</span>
                        <div class="zzz-set-desc-block">
                            <div style="margin-bottom:6px;color:#d4d4d8;">
                                ${t.engineSpecIntro} <strong style="color:#f59e0b;">${itemObj.role || agent.role}</strong> :
                            </div>
                            <div class="zzz-stat-bar" style="margin-bottom:7px;">
                                <span>${effectTitle}</span>
                            </div>
                            <div>${effectTxt}</div>
                        </div>
                    </div>
                `;
            }

            const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === itemObj.setKey);
            const setName = sObj ? bridge.itemName(sObj) : itemObj.setKey;
            const rawDiscJson = EXT_DATA.discs[itemObj.setKey] || {};
            const desc2P = formatCleanDesc((isLangEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || 'Bonus de statistique 2 pièces.');
            const desc4P = formatCleanDesc((isLangEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || 'Effet passif 4 pièces en combat.');
            const ownerKey = getDiscOwner(st, itemObj.uid);

            return `
                <div class="zzz-inspector-pane">
                    ${headerTag ? `<span class="zzz-insp-tag-top">${headerTag}</span>` : ''}
                    <h3 class="zzz-insp-title">${setName} [${itemObj.slot}]</h3>

                    <div class="zzz-insp-lvl-row">
                        <div class="zzz-insp-lvl-pill">
                            <span class="zzz-rank-circle">S</span>
                            <span>Niv. ${itemObj.level}/15</span>
                        </div>
                        ${ownerKey ? `<img src="assets/Agents/${ownerKey}.webp" title="${ownerKey}" style="width:28px;height:28px;border-radius:999px;border:2px solid #fff;background:#000;">` : ''}
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.mainStatLabel}</span>
                    <div class="zzz-stat-bar">
                        <span>${tStat(itemObj.mainStat)}</span>
                        <span>${formatMainStatValue(itemObj.mainStat, itemObj.level)}</span>
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.subStatsLabel}</span>
                    <div style="display:flex;flex-direction:column;gap:5px;">
                        ${(itemObj.substats || []).map(sub => {
                            const isGuideSub = prof.subPrio.includes(sub.key);
                            return `
                            <div class="zzz-stat-bar ${isGuideSub ? 'hl-gold' : ''}">
                                <span>${tStat(sub.key)}${sub.upgrades > 0 ? `<span class="up-num">+${sub.upgrades}</span>` : ''}</span>
                                <span>${formatSubstatValue(sub)}</span>
                            </div>`;
                        }).join('')}
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.setEffectsLabel}</span>
                    <div class="zzz-stat-bar">
                        <span>${setName}</span>
                    </div>
                    <div class="zzz-set-desc-block">
                        <div><strong>${t.piece2} :</strong> ${desc2P}</div>
                        <div style="margin-top:4px;"><strong>${t.piece4} :</strong> ${desc4P}</div>
                    </div>
                </div>
            `;
        }

        async function renderBuildsTab(mount) {
            await ensureExternalDataLoaded();
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const t = B();
            const isLangEn = (bridge.getLang?.() || 'fr') === 'en';
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const ownedAgents = getOwnedAgents(st, pool);

            if (ownedAgents.length === 0) {
                mount.innerHTML = `
                    <div class="zb-wrap" style="text-align:center;padding:60px 20px;">
                        <h2 class="gacha-panel-title">${t.noAgentsTitle}</h2>
                        <p class="gacha-panel-desc">${t.noAgentsDesc}</p>
                    </div>`;
                return;
            }

            if (!selectedAgentKey || !ownedAgents.some(a => a.rawKey === selectedAgentKey)) {
                selectedAgentKey = ownedAgents[0].rawKey;
            }

            const agent = ownedAgents.find(a => a.rawKey === selectedAgentKey) || ownedAgents[0];
            const ab = getOrInitAgentBuild(st, agent.rawKey);
            const calc = computeAgentStats(st, pool, agent);
            const prof = getGuideProfile(agent.rawKey);
            const freeDiscsTotal = getFreeGachaDiscCount(st);

            const rosterHTML = ownedAgents.map(a => {
                const cnt = st.inventory[a.id]?.count || 1;
                const mTag = cnt > 7 ? `M6 +${cnt - 7}` : `M${Math.min(6, cnt - 1)}`;
                return `
                <div class="zb-roster-pill ${a.rawKey === agent.rawKey ? 'active' : ''}" data-pick-build-agent="${a.rawKey}">
                    <img src="${a.img}" alt="${bridge.itemName(a)}">
                    <div>
                        <span class="zb-roster-name">${bridge.itemName(a)}</span>
                        <span class="zb-roster-sub">${a.rank} • Lv.60 • ${mTag}</span>
                    </div>
                </div>`;
            }).join('');

            if (currentSubMenu === 'stats') {
                mount.innerHTML = `
                    <div class="zb-wrap">
                        <div class="zb-roster-strip">
                            <div class="zb-roster-bar" id="zb-roster-scroll">${rosterHTML}</div>
                            <button type="button" class="zzz-pill-btn active" id="btn-toggle-subview">
                                <span class="zzz-pill-icon yellow">${UI_SVGS.discTune}</span>
                                <span>${t.subEquip}</span>
                            </button>
                        </div>
                        <div class="zb-panel-card">
                            ${renderSubMenuStats(agent, calc, pool, bridge, t)}
                        </div>
                    </div>
                `;
                bindRosterAndSubViewEvents(mount);
                return;
            }

            const isEngineMode = activeWheelTarget === 'engine';
            const slotNum = isEngineMode ? 0 : (Number(activeWheelTarget) || 1);

            let gridItems = [];
            if (isEngineMode) {
                gridItems = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
                const rW = { S: 0, A: 1, B: 2 };
                gridItems.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));
                if (!selectedItemId || !gridItems.some(e => e.rawKey === selectedItemId)) {
                    selectedItemId = ab.engineKey || gridItems[0]?.rawKey || null;
                }
            } else {
                gridItems = bs.craftedDiscs.filter(d => showAllPartitions ? true : d.slot === slotNum);
                if (filterSetKey !== 'all') {
                    gridItems = gridItems.filter(d => d.setKey === filterSetKey);
                }
                gridItems.sort((a, b) => b.level - a.level || scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
                if (!selectedItemId || !gridItems.some(d => d.uid === selectedItemId)) {
                    selectedItemId = ab.discs[slotNum] || gridItems[0]?.uid || null;
                }
            }

            const leftGridHTML = gridItems.map(it => {
                if (isEngineMode) {
                    const cnt = st.inventory[it.id]?.count || 1;
                    const owners = getEngineOwnersList(st, it.rawKey);
                    const avatarOwner = owners.includes(agent.rawKey) ? agent.rawKey : owners[0];
                    const isSel = it.rawKey === selectedItemId;
                    return `
                    <div class="zzz-case-item ${isSel ? 'selected' : ''}" data-grid-pick="${it.rawKey}">
                        <div class="zzz-case-box rank-${it.rank}">
                            ${avatarOwner ? `<div class="zzz-case-owner"><img src="assets/Agents/${avatarOwner}.webp"></div>` : ''}
                            <img src="${it.img}" class="zzz-engine-thumb" alt="">
                            <div class="zzz-case-rarity-lock">
                                <span class="r-${it.rank.toLowerCase()}">${it.rank}</span>
                                <span style="font-size:8.5px;color:#e4e4e7;font-family:monospace;font-weight:900;">×${cnt}</span>
                            </div>
                        </div>
                        <span class="zzz-case-lvl-pill">Niv. 60</span>
                    </div>`;
                } else {
                    const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === it.setKey);
                    const ownerKey = getDiscOwner(st, it.uid);
                    const isSel = it.uid === selectedItemId;
                    return `
                    <div class="zzz-case-item ${isSel ? 'selected' : ''}" data-grid-pick="${it.uid}">
                        <div class="zzz-case-box rank-S">
                            ${ownerKey ? `<div class="zzz-case-owner"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            <div class="zzz-disc-cd-sleeve">
                                <img src="${sObj ? sObj.img : ''}" alt="">
                            </div>
                            <div class="zzz-case-rarity-lock">
                                <span class="r-s">S</span>
                                ${it.locked ? `<span style="color:#facc15;display:inline-flex;">${UI_SVGS.lockMini}</span>` : ''}
                            </div>
                        </div>
                        <span class="zzz-case-lvl-pill">Niv. ${it.level}</span>
                    </div>`;
                }
            }).join('');

            const selectedObj = isEngineMode
                ? (gridItems.find(e => e.rawKey === selectedItemId) || null)
                : (bs.craftedDiscs.find(d => d.uid === selectedItemId) || null);

            const equippedObj = isEngineMode
                ? (ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null)
                : (ab.discs[slotNum] ? bs.craftedDiscs.find(d => d.uid === ab.discs[slotNum]) : null);

            let centerHTML = '';
            if (isCompareMode && selectedObj && equippedObj && ((isEngineMode && selectedObj.rawKey !== equippedObj.rawKey) || (!isEngineMode && selectedObj.uid !== equippedObj.uid))) {
                centerHTML = `
                    <div class="zzz-center-inspector-wrap compare-split">
                        ${buildInspectorPaneHTML(st, pool, agent, selectedObj, isEngineMode, t.currentSelection, isLangEn, t, bridge, prof)}
                        ${buildInspectorPaneHTML(st, pool, agent, equippedObj, isEngineMode, t.currentlyEquipped, isLangEn, t, bridge, prof)}
                    </div>
                `;
            } else {
                centerHTML = `
                    <div class="zzz-center-inspector-wrap">
                        ${buildInspectorPaneHTML(st, pool, agent, selectedObj, isEngineMode, isCompareMode ? t.currentSelection : '', isLangEn, t, bridge, prof)}
                    </div>
                `;
            }

            const eqEngineForWheel = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;
            const wheelDiscsHTML = [1, 2, 3, 4, 5, 6].map(s => {
                const u = ab.discs[s];
                const d = u ? bs.craftedDiscs.find(x => x.uid === u) : null;
                const sObj = d ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey) : null;
                const isAct = !isEngineMode && slotNum === s;
                return `
                <div class="zzz-wheel-disc pos-${s} ${isAct ? 'active-ring' : ''}" data-wheel-pick="${s}">
                    ${d && sObj
                        ? `<img src="${sObj.img}" alt="Slot ${s}">
                           <div class="zzz-wheel-lvl-tag"><span class="mini-s">S</span><span>Niv. ${d.level} /15</span></div>`
                        : `<span class="zzz-wheel-empty-num">${s}</span>`
                    }
                </div>`;
            }).join('');

            // Démantèlement actif pour les Disques ET pour les Moteurs-Ampli (tant qu'il reste au moins 1 exemplaire non équipé)
            const engTotalOwned = (isEngineMode && selectedObj) ? (st.inventory[selectedObj.id]?.count || 0) : 0;
            const engUsedCount = (isEngineMode && selectedObj) ? getEngineOwnersList(st, selectedObj.rawKey).length : 0;
            const canTrashSelected = isEngineMode
                ? !!(selectedObj && engTotalOwned > engUsedCount)
                : !!(selectedObj && !selectedObj.locked && !getDiscOwner(st, selectedObj.uid));

            const singleTrashGain = isEngineMode
                ? (selectedObj ? (selectedObj.rank === 'S' ? 40 : (selectedObj.rank === 'A' ? 10 : 3)) : 0)
                : (selectedObj ? calcDiscDismantleGain(selectedObj) : 0);

            const isSelectedEquippedHere = isEngineMode
                ? (selectedObj && ab.engineKey === selectedObj.rawKey)
                : (selectedObj && ab.discs[slotNum] === selectedObj.uid);

            const hasEquippedInSlot = isEngineMode ? !!ab.engineKey : !!ab.discs[slotNum];
            const equipBtnLabel = isSelectedEquippedHere ? t.removeBtn : (hasEquippedInSlot ? t.replaceBtn : t.equipBtn);
            const canEnhanceSelected = !isEngineMode && selectedObj && selectedObj.level < 15 && st.residual >= 4;
            const distinctSets = [...new Set(bs.craftedDiscs.map(d => d.setKey))];

            // Construction du tiroir officiel "Recommandations" (image_f26266.png & image_f25f7a.png)
            let recommendationDrawerHTML = '';
            if (window.__zzzRecOpen) {
                if (isEngineMode) {
                    // --- TIROIR MOTEURS-AMPLIS RECOMMANDÉS ---
                    const recEngList = [];
                    (prof.engines || []).forEach(re => {
                        const found = pool.allCatalog.find(i =>
                            i.type === 'engine' && (
                                i.rawKey.toLowerCase() === re.rawImg.toLowerCase() ||
                                i.img.toLowerCase().includes(re.rawImg.toLowerCase())
                            )
                        );
                        if (found && !recEngList.some(x => x.rawKey === found.rawKey)) recEngList.push(found);
                    });
                    pool.allCatalog.filter(i => i.type === 'engine' && (i.role || '').toLowerCase() === (agent.role || '').toLowerCase()).forEach(e => {
                        if (recEngList.length < 4 && !recEngList.some(x => x.rawKey === e.rawKey)) recEngList.push(e);
                    });

                    if (!window.__zzzRecEngKey || !recEngList.some(e => e.rawKey === window.__zzzRecEngKey)) {
                        window.__zzzRecEngKey = recEngList[0]?.rawKey || selectedObj?.rawKey || null;
                    }
                    const previewEng = recEngList.find(e => e.rawKey === window.__zzzRecEngKey) || recEngList[0] || selectedObj;
                    const previewOwned = previewEng ? (st.inventory[previewEng.id]?.count || 0) : 0;
                    const rawJson = previewEng ? (EXT_DATA.engines[previewEng.rawKey] || {}) : {};
                    const baseAtkVal = rawJson.baseAtk || (previewEng?.rank === 'S' ? 713 : (previewEng?.rank === 'A' ? 594 : 475));
                    const rawSub = (isLangEn ? (rawJson.subStat?.en || rawJson.stat?.en) : (rawJson.subStat?.fr || rawJson.stat?.fr)) || `${tStat('ATQ%')} +${previewEng?.rank === 'S' ? '30 %' : '24 %'}`;
                    const matchPct = String(rawSub).match(/^(.*?)\s*([+]?\d+[.,]?\d*\s*%?)$/);
                    const advName = matchPct ? matchPct[1].trim() : rawSub;
                    const advVal = matchPct ? matchPct[2].replace('+', '').trim() : '30 %';
                    const effectTitle = (isLangEn ? rawJson.passiveName?.en : rawJson.passiveName?.fr) || (previewEng ? bridge.itemName(previewEng) : '');
                    const effectTxt = formatCleanDesc((isLangEn ? (rawJson.effect?.en || rawJson.desc?.en) : (rawJson.effect?.fr || rawJson.desc?.fr)) || 'Augmente l\'ATQ et l\'efficacité de combat du porteur.');

                    const exclusiveEng = recEngList[0] || null;
                    const popularEngs = recEngList.slice(1, 4);

                    const renderSphere = (eObj) => {
                        if (!eObj) return '';
                        const cnt = st.inventory[eObj.id]?.count || 0;
                        const owners = getEngineOwnersList(st, eObj.rawKey);
                        const isEqHere = ab.engineKey === eObj.rawKey;
                        const isAct = window.__zzzRecEngKey === eObj.rawKey;
                        return `
                            <div class="zzz-rec-eng-sphere ${isAct ? 'active' : ''} ${cnt <= 0 ? 'unowned' : ''}" data-rec-eng="${eObj.rawKey}">
                                ${owners[0] ? `<div class="zzz-case-owner" style="top:-3px;left:-3px;right:auto;"><img src="assets/Agents/${owners[0]}.webp"></div>` : ''}
                                ${isEqHere ? `<div class="zzz-rec-eng-check">✓</div>` : ''}
                                <img src="${eObj.img}" class="eng-art" alt="">
                                ${cnt <= 0 ? `<div class="zzz-rec-eng-lock-overlay">${UI_SVGS.lock}</div>` : ''}
                                <span class="zzz-rank-circle r-${eObj.rank} zzz-rec-eng-rank-badge">${eObj.rank}</span>
                            </div>
                        `;
                    };

                    recommendationDrawerHTML = `
                        <div class="zzz-rec-drawer">
                            <div class="zzz-rec-header">
                                <div class="zzz-rec-header-left">
                                    <img src="${agent.img}" class="zzz-rec-agent-ava" alt="">
                                    <h3 class="zzz-rec-title">${isLangEn ? 'Recommended W-Engines' : 'Moteurs-amplis recommandés'}</h3>
                                </div>
                                <button type="button" class="zzz-rec-close-btn" id="zzz-close-rec">✕</button>
                            </div>

                            <div class="zzz-rec-engine-split" style="padding:10px 0;">
                                <div class="zzz-rec-eng-left">
                                    ${previewEng ? `
                                        <h4 class="zzz-insp-title" style="font-size:19px;">${bridge.itemName(previewEng)}</h4>
                                        <div class="zzz-insp-lvl-row">
                                            <div class="zzz-insp-lvl-pill">
                                                <span class="zzz-rank-circle r-${previewEng.rank}">${previewEng.rank}</span>
                                                <span>Niv. 60/60</span>
                                            </div>
                                            <img src="${agent.img}" style="width:26px;height:26px;border-radius:999px;border:2px solid #fff;">
                                        </div>
                                        <span class="zzz-insp-sec-lbl">${t.baseStatLabel}</span>
                                        <div class="zzz-stat-bar"><span>ATQ de base</span><span>${baseAtkVal}</span></div>
                                        <span class="zzz-insp-sec-lbl">${t.advStatLabel}</span>
                                        <div class="zzz-stat-bar hl-gold"><span>${advName}</span><span>${advVal}</span></div>
                                        <span class="zzz-insp-sec-lbl">${t.engineEffectLabel}</span>
                                        <div class="zzz-set-desc-block">
                                            <div style="margin-bottom:6px;color:#d4d4d8;">
                                                ${t.engineSpecIntro} <strong style="color:#f59e0b;">${previewEng.role || agent.role}</strong> :
                                            </div>
                                            <div class="zzz-stat-bar" style="margin-bottom:7px;"><span>${effectTitle}</span></div>
                                            <div>${effectTxt}</div>
                                        </div>
                                    ` : ''}
                                </div>

                                <div class="zzz-rec-eng-right">
                                    ${exclusiveEng ? `
                                        <span class="zzz-rec-eng-group-lbl">${isLangEn ? 'Agent Exclusive' : 'Exclusif à l\'agent'}</span>
                                        ${renderSphere(exclusiveEng)}
                                    ` : ''}
                                    ${popularEngs.length > 0 ? `
                                        <span class="zzz-rec-eng-group-lbl" style="margin-top:4px;">${isLangEn ? 'Popular' : 'Populaire'}</span>
                                        ${popularEngs.map(renderSphere).join('')}
                                    ` : ''}
                                </div>
                            </div>

                            <div class="zzz-rec-footer">
                                <div class="zzz-rec-footnote">
                                    <span>${UI_SVGS.users}</span>
                                    <span>${isLangEn ? 'Data obtained from recently active players' : 'Données obtenues auprès des joueurs actifs récemment'}</span>
                                </div>
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                    <button type="button" class="zzz-action-pill" id="zzz-rec-eng-details" style="min-width:0;">
                                        ${isLangEn ? 'Details' : 'Détails'}
                                    </button>
                                    <button type="button" class="zzz-action-pill primary-highlight" id="zzz-rec-eng-equip" style="min-width:0;" ${previewOwned <= 0 ? 'disabled' : ''}>
                                        ${ab.engineKey === previewEng?.rawKey ? t.removeBtn : t.equipBtn}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // --- TIROIR RECOMMANDATIONS DE DISQUES (image_f26266.png) ---
                    const guideDiscs = getAgentGuide(agent.rawKey)?.discs || [];
                    const allDiscCat = pool.allCatalog.filter(i => i.type === 'disc');
                    const combos = [];

                    guideDiscs.forEach((gd, idx) => {
                        if (gd.set1 && gd.set2) {
                            combos.push({
                                set4: gd.set1,
                                set2: gd.set2,
                                rate: idx === 0 ? '97,1 %' : (idx === 1 ? '1,8 %' : '0,6 %')
                            });
                        }
                    });
                    if (combos.length === 1 && combos[0]) {
                        combos.push({ set4: combos[0].set2, set2: combos[0].set4, rate: '0,8 %' });
                    }
                    while (combos.length < 3 && allDiscCat.length >= 2) {
                        const f1 = allDiscCat[(combos.length * 2) % allDiscCat.length]?.rawKey;
                        const f2 = allDiscCat[(combos.length * 2 + 1) % allDiscCat.length]?.rawKey;
                        combos.push({ set4: f1, set2: f2, rate: combos.length === 0 ? '94,2 %' : '0,4 %' });
                    }

                    // Stats principales recommandées pour la partition active (slotNum)
                    let mainRecKeys = [];
                    if (slotNum === 1) mainRecKeys = [{ k: 'PV (flat)', r: '100 %' }];
                    else if (slotNum === 2) mainRecKeys = [{ k: 'ATQ (flat)', r: '100 %' }];
                    else if (slotNum === 3) mainRecKeys = [{ k: 'DÉF (flat)', r: '100 %' }];
                    else {
                        const fromGuide = [...(prof.mainBySlot[slotNum] || [])];
                        const fallbacks = Object.keys(PARTITION_WEIGHTS[slotNum] || {});
                        fallbacks.forEach(fk => { if (fromGuide.length < 3 && !fromGuide.includes(fk)) fromGuide.push(fk); });
                        const rates = ['81,8 %', '8,8 %', '7,3 %'];
                        mainRecKeys = fromGuide.slice(0, 3).map((k, idx) => ({ k, r: rates[idx] || '4,5 %' }));
                    }

                    const subRecKeys = (prof.subPrio.length > 0 ? prof.subPrio : ['Taux CRIT', 'Dégâts CRIT', 'ATQ%', "Adresse d'anomalie"]).slice(0, 4);

                    recommendationDrawerHTML = `
                        <div class="zzz-rec-drawer">
                            <div class="zzz-rec-header">
                                <div class="zzz-rec-header-left">
                                    <img src="${agent.img}" class="zzz-rec-agent-ava" alt="">
                                    <h3 class="zzz-rec-title">${isLangEn ? 'Recommendations' : 'Recommandations'}</h3>
                                </div>
                                <button type="button" class="zzz-rec-close-btn" id="zzz-close-rec">✕</button>
                            </div>

                            <div class="zzz-rec-body">
                                <div class="zzz-rec-sec-head">
                                    <span>${isLangEn ? 'Recommended Sets' : 'Ensembles recommandés'}</span>
                                    <span>${isLangEn ? 'Usage Rate' : 'Taux d\'utilisation'}</span>
                                </div>

                                ${combos.slice(0, 3).map((cb, idx) => {
                                    const s4Obj = allDiscCat.find(i => i.rawKey === cb.set4);
                                    const s2Obj = allDiscCat.find(i => i.rawKey === cb.set2);
                                    const isFiltered = filterSetKey === cb.set4;
                                    return `
                                    <div class="zzz-rec-set-row" data-rec-filter-set="${cb.set4}" title="Filtrer par ${s4Obj ? bridge.itemName(s4Obj) : cb.set4}">
                                        <div class="zzz-rec-set-icons">
                                            <div class="zzz-rec-disc-circle">
                                                ${s4Obj ? `<img src="${s4Obj.img}" alt="">` : ''}
                                                <span class="zzz-rec-disc-num">4</span>
                                            </div>
                                            <div class="zzz-rec-disc-circle">
                                                ${s2Obj ? `<img src="${s2Obj.img}" alt="">` : ''}
                                                <span class="zzz-rec-disc-num">2</span>
                                            </div>
                                            <div class="zzz-rec-disc-circle" style="opacity:0.35;">
                                                <span style="font-size:18px;font-weight:900;color:#52525b;">✕</span>
                                            </div>
                                        </div>
                                        <div class="zzz-rec-rate-pill">
                                            <span style="color:#a1a1aa;display:inline-flex;">${UI_SVGS.users}</span>
                                            <span>${cb.rate}</span>
                                            <span class="zzz-green-radio ${isFiltered || idx === 0 ? 'active' : ''}"></span>
                                        </div>
                                    </div>`;
                                }).join('')}

                                <div class="zzz-rec-sec-head" style="margin-top:4px;">
                                    <span>${isLangEn ? `Recommended Main Stats for Partition ${slotNum}` : `Stats principales recommandées pour la partition ${slotNum}`}</span>
                                    <span>${isLangEn ? 'Usage Rate' : 'Taux d\'utilisation'}</span>
                                </div>

                                ${mainRecKeys.map((mObj, idx) => `
                                    <div class="zzz-rec-main-row" data-rec-open-bardic="${mObj.k}">
                                        <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                                            <span style="width:26px;height:26px;border-radius:999px;background:#14151c;border:1px solid #343644;display:inline-flex;align-items:center;justify-content:center;color:#f97316;font-weight:900;font-size:12px;">✦</span>
                                            <strong style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                ${tStat(mObj.k)}
                                            </strong>
                                        </div>
                                        <div class="zzz-rec-rate-pill">
                                            <span style="color:#a1a1aa;display:inline-flex;">${UI_SVGS.users}</span>
                                            <span>${mObj.r}</span>
                                            <span class="zzz-green-radio ${idx === 0 ? 'active' : ''}"></span>
                                        </div>
                                    </div>
                                `).join('')}

                                <div class="zzz-rec-sec-head" style="margin-top:4px;">
                                    <span>${isLangEn ? 'Recommended Sub-Stats' : 'Stats secondaires recommandées'}</span>
                                </div>

                                <div class="zzz-rec-sub-grid">
                                    ${subRecKeys.map(sk => `
                                        <div class="zzz-rec-sub-pill">
                                            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tStat(sk)}</span>
                                            <span class="zzz-green-radio active"></span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div class="zzz-rec-footer">
                                <div class="zzz-rec-footnote">
                                    <span>${UI_SVGS.users}</span>
                                    <span>${isLangEn ? 'Data obtained from recently active players' : 'Données obtenues auprès des joueurs actifs récemment'}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }

            const prevRosterLeft = document.getElementById('zb-roster-scroll')?.scrollLeft || 0;
            const prevGridTop = mount.querySelector('.zzz-left-grid-wrap')?.scrollTop || 0;
            const prevInspTop = mount.querySelector('.zzz-center-inspector-wrap')?.scrollTop || 0;

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-roster-strip">
                        <div class="zb-roster-bar" id="zb-roster-scroll">${rosterHTML}</div>
                        <button type="button" class="zzz-pill-btn" id="btn-toggle-subview">
                            <span class="zzz-pill-icon yellow">${UI_SVGS.recommend}</span>
                            <span>${t.subStats}</span>
                        </button>
                    </div>

                    <div class="zzz-eq-screen">
                        <div class="zzz-eq-bg-art" style="background-image:url('assets/splash/${agent.rawKey}.webp'), url('${agent.img}');"></div>
                        <div class="zzz-eq-bg-stripes"></div>

                        <div class="zzz-eq-topbar">
                            <div class="zzz-eq-top-left">
                                <button type="button" class="zzz-pill-btn ${showFilterBar ? 'active' : ''}" id="zzz-btn-filter">
                                    <span class="zzz-pill-icon dark">${UI_SVGS.funnel}</span>
                                    <span>${t.filterBtn}</span>
                                </button>
                            </div>

                            <div class="zzz-eq-top-right">
                                <div class="zzz-key-action">
                                    <span class="zzz-key-tag">R</span>
                                    <button type="button" class="zzz-round-icon-btn" id="zzz-btn-trash-one" ${!canTrashSelected ? 'disabled' : ''} title="${t.dismantleBtn}">
                                        ${UI_SVGS.trash}
                                    </button>
                                </div>
                                ${!isEngineMode ? `
                                <div class="zzz-key-action">
                                    <span class="zzz-key-tag">T</span>
                                    <button type="button" class="zzz-round-icon-btn ${selectedObj?.locked ? 'locked-active' : ''}" id="zzz-btn-lock-one" ${!selectedObj ? 'disabled' : ''} title="Lock">
                                        ${UI_SVGS.lock}
                                    </button>
                                </div>` : ''}

                                <button type="button" class="zzz-pill-btn" id="zzz-btn-batch-dismantle" ${!canTrashSelected ? 'disabled' : ''}>
                                    <span class="zzz-pill-icon cyan">${UI_SVGS.dismantle}</span>
                                    <span>${t.dismantleBtn}${canTrashSelected ? ` (+${singleTrashGain} ✦)` : ''}</span>
                                </button>

                                <button type="button" class="zzz-pill-btn bardic-music-btn" id="zzz-btn-open-bardic">
                                    <span class="zzz-pill-icon bardic-teal">${UI_SVGS.discTune}</span>
                                    <span>${t.customDiscBtn}${freeDiscsTotal > 0 ? ` (${freeDiscsTotal})` : ''}</span>
                                </button>
                            </div>
                        </div>

                        ${showFilterBar && !isEngineMode ? `
                        <div class="zzz-filter-drawer">
                            <select id="zzz-select-set-filter" class="gacha-col-search" style="min-width:160px;">
                                <option value="all">${t.filterAllSets}</option>
                                ${distinctSets.map(sk => {
                                    const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                    return `<option value="${sk}" ${filterSetKey === sk ? 'selected' : ''}>${sObj ? bridge.itemName(sObj) : sk}</option>`;
                                }).join('')}
                            </select>
                            <button type="button" class="gacha-col-filter-btn ${!showAllPartitions ? 'active' : ''}" id="zzz-btn-slot-only">
                                ${t.slotOnly.replace('{s}', slotNum)}
                            </button>
                            <button type="button" class="gacha-col-filter-btn ${showAllPartitions ? 'active' : ''}" id="zzz-btn-all-slots">
                                ${t.allPartitions}
                            </button>
                        </div>` : ''}

                        <div class="zzz-mobile-slots">
                            <button type="button" class="gacha-col-filter-btn ${isEngineMode ? 'active' : ''}" data-wheel-pick="engine">W-Engine</button>
                            ${[1, 2, 3, 4, 5, 6].map(s => `
                                <button type="button" class="gacha-col-filter-btn ${!isEngineMode && slotNum === s ? 'active' : ''}" data-wheel-pick="${s}">[${s}]</button>
                            `).join('')}
                        </div>

                        <div class="zzz-eq-body ${isCompareMode ? 'compare-active' : ''}">
                            <div class="zzz-left-grid-wrap">
                                ${gridItems.length > 0
                                    ? `<div class="zzz-left-grid">${leftGridHTML}</div>`
                                    : `<div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:#71717a;font-size:12px;padding:16px;">${isEngineMode ? t.emptyEngineList : t.emptyDiscList}</div>`
                                }
                            </div>

                            ${centerHTML}

                            <div class="zzz-wheel-stage">
                                <div class="zzz-driver-chassis">
                                    <span class="zzz-driver-top-plaque">DRIVER</span>
                                    <div class="zzz-driver-inner-ring"></div>
                                    ${wheelDiscsHTML}
                                    <div class="zzz-wheel-wengine ${isEngineMode ? 'active-ring' : ''}" id="zzz-wheel-center-engine">
                                        ${eqEngineForWheel
                                            ? `<img src="${eqEngineForWheel.img}" alt="">
                                               <div class="zzz-wheel-lvl-tag"><span class="mini-s">${eqEngineForWheel.rank}</span><span>Niv. 60 /60</span></div>`
                                            : `<span class="zzz-wheel-empty-num">+</span>`
                                        }
                                    </div>
                                    <div class="zzz-driver-bottom-vent"></div>
                                </div>
                            </div>
                        </div>

                        ${recommendationDrawerHTML}

                        <div class="zzz-eq-bottombar">
                            <div class="zzz-eq-bot-left">
                                <button type="button" class="zzz-pill-btn ${isCompareMode ? 'active' : ''}" id="zzz-btn-compare">
                                    <span class="zzz-pill-icon yellow">${UI_SVGS.compare}</span>
                                    <span>${isCompareMode ? t.collapseBtn : t.compareBtn}</span>
                                </button>
                                <button type="button" class="zzz-pill-btn ${window.__zzzRecOpen ? 'active' : ''}" id="zzz-btn-recommended">
                                    <span class="zzz-pill-icon green">${UI_SVGS.recommend}</span>
                                    <span>${t.recommendedBtn}</span>
                                </button>
                            </div>

                            <div class="zzz-eq-bot-right">
                                <button type="button" class="zzz-action-pill" id="zzz-btn-unequip-all">
                                    ${t.unequipAllBtn}
                                </button>
                                <button type="button" class="zzz-action-pill" id="zzz-btn-equip-all">
                                    ${t.equipAllBtn}
                                </button>
                                <button type="button" class="zzz-action-pill ${!isSelectedEquippedHere && selectedObj ? 'primary-highlight' : ''}" id="zzz-btn-equip-or-remove" ${!selectedObj ? 'disabled' : ''}>
                                    ${equipBtnLabel}
                                </button>
                                <button type="button" class="zzz-action-pill ${canEnhanceSelected ? 'primary-highlight' : ''}" id="zzz-btn-enhance" ${!canEnhanceSelected ? 'disabled' : ''}>
                                    ${!isEngineMode && selectedObj && selectedObj.level < 15 ? `${t.enhanceBtn} (+${selectedObj.level + 3} • 4 ✦)` : t.enhanceBtn}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const newRosterEl = document.getElementById('zb-roster-scroll');
            if (newRosterEl) newRosterEl.scrollLeft = prevRosterLeft;
            const newGridEl = mount.querySelector('.zzz-left-grid-wrap');
            if (newGridEl) newGridEl.scrollTop = prevGridTop;
            const newInspEl = mount.querySelector('.zzz-center-inspector-wrap');
            if (newInspEl) newInspEl.scrollTop = prevInspTop;

            bindRosterAndSubViewEvents(mount);
            bindZZZEquipmentEvents(mount, st, pool, bs, agent, ab, selectedObj, isEngineMode, slotNum);
        }

        function bindRosterAndSubViewEvents(mount) {
            const rosterScroll = document.getElementById('zb-roster-scroll');
            if (rosterScroll) {
                rosterScroll.addEventListener('wheel', (e) => {
                    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                        e.preventDefault();
                        rosterScroll.scrollLeft += e.deltaY;
                    }
                }, { passive: false });
            }

            mount.querySelectorAll('[data-pick-build-agent]').forEach(el => {
                el.addEventListener('click', () => {
                    selectedAgentKey = el.getAttribute('data-pick-build-agent');
                    selectedItemId = null;
                    window.__zzzRecEngKey = null;
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('btn-toggle-subview')?.addEventListener('click', () => {
                currentSubMenu = currentSubMenu === 'stats' ? 'equip' : 'stats';
                renderBuildsTab(mount);
            });
        }

        function bindZZZEquipmentEvents(mount, st, pool, bs, agent, ab, selectedObj, isEngineMode, slotNum) {
            const bridge = window.ZZZGachaBridge;

            mount.querySelectorAll('[data-wheel-pick]').forEach(el => {
                el.addEventListener('click', () => {
                    const val = el.getAttribute('data-wheel-pick');
                    activeWheelTarget = val === 'engine' ? 'engine' : parseInt(val, 10);
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('zzz-wheel-center-engine')?.addEventListener('click', () => {
                activeWheelTarget = 'engine';
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            mount.querySelectorAll('[data-grid-pick]').forEach(el => {
                el.addEventListener('click', () => {
                    selectedItemId = el.getAttribute('data-grid-pick');
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('zzz-btn-filter')?.addEventListener('click', () => {
                showFilterBar = !showFilterBar;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-select-set-filter')?.addEventListener('change', (e) => {
                filterSetKey = e.target.value;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-slot-only')?.addEventListener('click', () => {
                showAllPartitions = false;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-all-slots')?.addEventListener('click', () => {
                showAllPartitions = true;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-lock-one')?.addEventListener('click', () => {
                if (!isEngineMode && selectedObj) {
                    selectedObj.locked = !selectedObj.locked;
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                }
            });

            // Démantèle 1 exemplaire du Moteur-Ampli sélectionné OU le Disque sélectionné
            function dismantleSelectedItem() {
                if (isEngineMode && selectedObj) {
                    const cnt = st.inventory[selectedObj.id]?.count || 0;
                    const usedCount = getEngineOwnersList(st, selectedObj.rawKey).length;
                    if (cnt > usedCount) {
                        const gain = selectedObj.rank === 'S' ? 40 : (selectedObj.rank === 'A' ? 10 : 3);
                        st.inventory[selectedObj.id].count -= 1;
                        if (st.inventory[selectedObj.id].count <= 0) {
                            delete st.inventory[selectedObj.id];
                            selectedItemId = null;
                        }
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        bridge.saveState(st);
                        renderBuildsTab(mount);
                    }
                } else if (!isEngineMode && selectedObj && !selectedObj.locked && !getDiscOwner(st, selectedObj.uid)) {
                    const idx = bs.craftedDiscs.findIndex(x => x.uid === selectedObj.uid);
                    if (idx !== -1) {
                        const gain = calcDiscDismantleGain(selectedObj);
                        bs.craftedDiscs.splice(idx, 1);
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        selectedItemId = null;
                        bridge.saveState(st);
                        renderBuildsTab(mount);
                    }
                }
            }

            document.getElementById('zzz-btn-trash-one')?.addEventListener('click', dismantleSelectedItem);
            document.getElementById('zzz-btn-batch-dismantle')?.addEventListener('click', dismantleSelectedItem);

            document.getElementById('zzz-btn-open-bardic')?.addEventListener('click', () => {
                bardicSlot = isEngineMode ? 0 : slotNum;
                openBardicNeedleModal(mount);
            });

            document.getElementById('zzz-btn-compare')?.addEventListener('click', () => {
                isCompareMode = !isCompareMode;
                if (isCompareMode) window.__zzzRecOpen = false;
                renderBuildsTab(mount);
            });

            // Bouton [Recommandé] -> Ouvre / Ferme le tiroir officiel Recommandations ZZZ
            document.getElementById('zzz-btn-recommended')?.addEventListener('click', () => {
                window.__zzzRecOpen = !window.__zzzRecOpen;
                if (window.__zzzRecOpen) isCompareMode = false;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-close-rec')?.addEventListener('click', () => {
                window.__zzzRecOpen = false;
                renderBuildsTab(mount);
            });

            mount.querySelectorAll('[data-rec-filter-set]').forEach(row => {
                row.addEventListener('click', () => {
                    const sk = row.getAttribute('data-rec-filter-set');
                    filterSetKey = filterSetKey === sk ? 'all' : sk;
                    showFilterBar = filterSetKey !== 'all';
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
            });

            mount.querySelectorAll('[data-rec-open-bardic]').forEach(row => {
                row.addEventListener('click', () => {
                    const prof = getGuideProfile(agent.rawKey);
                    if (prof.sets4[0]) bardicSetKey = prof.sets4[0];
                    bardicSlot = slotNum;
                    openBardicNeedleModal(mount);
                });
            });

            mount.querySelectorAll('[data-rec-eng]').forEach(sph => {
                sph.addEventListener('click', () => {
                    window.__zzzRecEngKey = sph.getAttribute('data-rec-eng');
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('zzz-rec-eng-details')?.addEventListener('click', () => {
                if (window.__zzzRecEngKey && (st.inventory[`engine_${window.__zzzRecEngKey}`]?.count || 0) > 0) {
                    selectedItemId = window.__zzzRecEngKey;
                    window.__zzzRecOpen = false;
                    renderBuildsTab(mount);
                }
            });

            document.getElementById('zzz-rec-eng-equip')?.addEventListener('click', () => {
                const targetKey = window.__zzzRecEngKey;
                if (!targetKey || (st.inventory[`engine_${targetKey}`]?.count || 0) <= 0) return;
                if (ab.engineKey === targetKey) {
                    ab.engineKey = null;
                } else {
                    equipEngineUnique(st, agent.rawKey, targetKey);
                    selectedItemId = targetKey;
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-unequip-all')?.addEventListener('click', () => {
                ab.engineKey = null;
                ab.discs = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-equip-all')?.addEventListener('click', () => {
                autoEquipFromGuide(st, pool, agent);
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-equip-or-remove')?.addEventListener('click', () => {
                if (!selectedObj) return;
                if (isEngineMode) {
                    if (ab.engineKey === selectedObj.rawKey) {
                        ab.engineKey = null;
                    } else {
                        equipEngineUnique(st, agent.rawKey, selectedObj.rawKey);
                    }
                } else {
                    const targetSlot = selectedObj.slot || slotNum;
                    if (ab.discs[targetSlot] === selectedObj.uid) {
                        ab.discs[targetSlot] = null;
                    } else {
                        equipDiscUnique(st, agent.rawKey, targetSlot, selectedObj.uid);
                        activeWheelTarget = targetSlot;
                    }
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-enhance')?.addEventListener('click', () => {
                if (!isEngineMode && selectedObj && selectedObj.level < 15 && st.residual >= 4) {
                    st.residual -= 4;
                    upgradeDiscOneStep(selectedObj);
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                }
            });
        }

        function renderSubMenuStats(agent, calc, pool, bridge, t) {
            const elemIcon = ELEM_ICON_MAP[agent.element] || 'physique.webp';
            const isEn = (bridge.getLang?.() || 'fr') === 'en';
            const activeSetsHTML = Object.entries(calc.setCounts)
                .filter(([, cnt]) => cnt >= 2)
                .map(([setKey, cnt]) => {
                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === setKey);
                    const name = dObj ? bridge.itemName(dObj) : setKey;
                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? '4P' : '2P'} : ${name}</span>`;
                }).join(' ');

            return `
                <div class="zb-agent-header">
                    <div>
                        <div class="zb-faction-line">
                            <span>${agent.faction || 'New Eridu'}</span>
                        </div>
                        <h2 class="zb-agent-big-name">${bridge.itemName(agent)}</h2>
                    </div>
                    <img src="assets/Faction/${agent.faction}.webp" class="zb-faction-logo" onerror="this.style.display='none'">
                </div>

                <div class="zb-level-row">
                    <div class="zb-lvl-pill">
                        <span>Lv. 60 <span style="color:#52525b;">/ 60</span></span>
                        <span style="background:#272732;color:#d7f70c;font-size:10px;padding:2px 7px;border-radius:5px;">MAX</span>
                    </div>
                    <div class="zb-elem-role-pill">
                        <img src="assets/Icone/${elemIcon}" alt="">
                        <span>${agent.element}</span>
                        <span style="color:#3f3f46;">|</span>
                        <img src="assets/Rôles/${agent.role}.webp" alt="">
                        <span>${agent.role}</span>
                    </div>
                </div>

                <div class="zb-stats-grid">
                    <div class="zb-stat-row"><span>${tStat('PV')}</span><span class="zb-stat-val">${calc.hp}</span></div>
                    <div class="zb-stat-row"><span>${tStat('ATQ')}</span><span class="zb-stat-val">${calc.atk}</span></div>
                    <div class="zb-stat-row"><span>${tStat('DÉF')}</span><span class="zb-stat-val">${calc.def}</span></div>
                    <div class="zb-stat-row"><span>${tStat('Impact')}</span><span class="zb-stat-val">${calc.imp}</span></div>
                    <div class="zb-stat-row"><span>${tStat('Taux CRIT')}</span><span class="zb-stat-val">${calc.cr}</span></div>
                    <div class="zb-stat-row"><span>${tStat('Dégâts CRIT')}</span><span class="zb-stat-val">${calc.cd}</span></div>
                    <div class="zb-stat-row"><span>${tStat("Maîtrise d'anomalie")}</span><span class="zb-stat-val">${calc.am}</span></div>
                    <div class="zb-stat-row"><span>${tStat("Adresse d'anomalie")}</span><span class="zb-stat-val">${calc.ap}</span></div>
                    <div class="zb-stat-row"><span>${tStat('Ratio de PÉN')}</span><span class="zb-stat-val">${calc.pen}</span></div>
                    <div class="zb-stat-row"><span>${tStat("Régénération d'énergie")}</span><span class="zb-stat-val">${calc.er}</span></div>
                </div>

                ${activeSetsHTML ? `<div style="display:flex;gap:6px;flex-wrap:wrap;">${activeSetsHTML}</div>` : ''}

                <div class="zb-eval-bar">
                    <span style="font-size:12px;font-weight:800;color:#d4d4d8;">
                        ${t.effectiveSubs} <strong style="color:#facc15;font-size:14px;">${calc.effectiveSubRolls}</strong>
                    </span>
                    <div class="zb-eval-grade">
                        <span style="color:#f59e0b;font-size:14px;">${calc.grade}</span>
                        <span>${t.combatEval}</span>
                    </div>
                </div>
            `;
        }

        // ========================================================
        // 8. MAGASIN DE MUSIQUE (STUDIO BARDIC NEEDLE)
        // ========================================================
        function openBardicNeedleModal(mount) {
            const bridge = window.ZZZGachaBridge;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const allSets = pool.allCatalog.filter(i => i.type === 'disc');
            if (!bardicSetKey || !allSets.some(s => s.rawKey === bardicSetKey)) {
                const prof = getGuideProfile(selectedAgentKey);
                const firstWithStock = allSets.find(s => getFreeGachaDiscCount(st, s.rawKey) > 0);
                bardicSetKey = prof.sets4[0] || firstWithStock?.rawKey || allSets[0]?.rawKey || '';
            }

            let setSearch = '';
            let selectedMainStat = '';
            let selectedSubStats = [];
            let lastCraftedList = [];

            function generateCustomSRankDisc(setKey, partitionSlot, forcedMain = null, forcedSubs = []) {
                const slot = Number(partitionSlot) || (Math.floor(Math.random() * 6) + 1);
                const mainStat = (forcedMain && PARTITION_WEIGHTS[slot][forcedMain])
                    ? forcedMain
                    : drawWeightedKey(PARTITION_WEIGHTS[slot]);

                const available = SUBSTAT_POOL.filter(s => s.key !== mainStat).map(s => ({ ...s }));
                const substats = [];
                forcedSubs.forEach(subKey => {
                    if (subKey === mainStat || substats.length >= 4) return;
                    const idx = available.findIndex(a => a.key === subKey);
                    if (idx !== -1) {
                        const picked = available.splice(idx, 1)[0];
                        substats.push({ key: picked.key, step: picked.step, isPct: picked.isPct, upgrades: 0 });
                    }
                });

                const isFourLiner = substats.length === 4 || Math.random() < 0.20;
                const targetCount = isFourLiner ? 4 : 3;
                while (substats.length < targetCount && available.length > 0) {
                    substats.push(drawSubstatFromPool(available));
                }

                return {
                    uid: 'disc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
                    setKey, slot, level: 0, locked: false, isFourLiner: substats.length >= 4, mainStat, substats
                };
            }

            function renderBardic() {
                const t = B();
                const isEn = (bridge.getLang?.() || 'fr') === 'en';
                const prof = getGuideProfile(selectedAgentKey);
                const activeAgent = pool.allCatalog.find(i => i.type === 'agent' && i.rawKey === selectedAgentKey);

                const filteredSets = allSets.filter(s => {
                    if (!setSearch.trim()) return true;
                    const q = setSearch.trim().toLowerCase();
                    return bridge.itemName(s).toLowerCase().includes(q) || s.rawKey.toLowerCase().includes(q);
                });

                filteredSets.sort((a, b) => {
                    const aStock = getFreeGachaDiscCount(st, a.rawKey);
                    const bStock = getFreeGachaDiscCount(st, b.rawKey);
                    if ((aStock > 0) !== (bStock > 0)) return bStock > 0 ? 1 : -1;
                    const aRec = prof.sets4.includes(a.rawKey) ? 2 : (prof.sets2.includes(a.rawKey) ? 1 : 0);
                    const bRec = prof.sets4.includes(b.rawKey) ? 2 : (prof.sets2.includes(b.rawKey) ? 1 : 0);
                    if (aRec !== bRec) return bRec - aRec;
                    return bStock - aStock;
                });

                const currentSet = allSets.find(s => s.rawKey === bardicSetKey) || allSets[0];
                const rawDiscJson = EXT_DATA.discs[bardicSetKey] || {};
                const desc2P = formatCleanDesc((isEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || '');
                const desc4P = formatCleanDesc((isEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || '');

                const stockForCurrentSet = getFreeGachaDiscCount(st, bardicSetKey);
                const variableMainKeys = bardicSlot >= 4 ? Object.keys(PARTITION_WEIGHTS[bardicSlot]) : [];

                const fixedMainForSlot = bardicSlot === 1 ? 'PV (flat)' : (bardicSlot === 2 ? 'ATQ (flat)' : (bardicSlot === 3 ? 'DÉF (flat)' : selectedMainStat));
                selectedSubStats = selectedSubStats.filter(k => k !== fixedMainForSlot);

                const isMainTargeted = !!(selectedMainStat && bardicSlot >= 4 && PARTITION_WEIGHTS[bardicSlot][selectedMainStat]);
                const customResCost = (isMainTargeted ? 15 : 0) + (selectedSubStats.length * 10);
                const customPolyCost = customResCost * 8;
                const isFreeRoll = customResCost === 0;
                const bulkFreeCount = Math.min(5, stockForCurrentSet);

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:1060px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                            <div>
                                <span class="gacha-patch-tag">${t.bardicTag}</span>
                                <h2 class="gacha-panel-title" style="font-size:21px;">${t.bardicTitle}</h2>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                <span class="gacha-reset-pill" style="color:#d7f70c;">Poly : ${st.polychromes}</span>
                                <button type="button" class="gacha-res-btn" id="close-bardic-modal">${t.close}</button>
                            </div>
                        </div>

                        <div class="zb-bardic-layout">
                            <div style="display:flex;flex-direction:column;gap:8px;min-height:0;">
                                <input type="text" id="bardic-set-search" class="gacha-col-search" placeholder="${t.searchSetPlaceholder}" value="${setSearch.replace(/"/g, '&quot;')}" style="width:100%;">
                                <div class="zb-set-grid-scroll">
                                    ${filteredSets.map(s => {
                                        const freeStock = getFreeGachaDiscCount(st, s.rawKey);
                                        const countCrafted = bs.craftedDiscs.filter(d => d.setKey === s.rawKey).length;
                                        const is4P = prof.sets4.includes(s.rawKey);
                                        const is2P = prof.sets2.includes(s.rawKey);
                                        return `
                                        <div class="zb-set-card ${s.rawKey === bardicSetKey ? 'active' : ''}" data-bset="${s.rawKey}" style="${freeStock <= 0 ? 'opacity:0.55;' : ''}">
                                            <img src="${s.img}" alt="${bridge.itemName(s)}">
                                            <div style="min-width:0;flex:1;display:flex;flex-direction:column;gap:2px;">
                                                <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
                                                    <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                        ${bridge.itemName(s)}
                                                    </span>
                                                    ${is4P ? `<span class="zb-guide-chip">4P</span>` : (is2P ? `<span class="zb-guide-chip">2P</span>` : '')}
                                                </div>
                                                <span style="font-family:monospace;font-size:9.5px;color:${freeStock > 0 ? '#4ade80' : '#71717a'};">
                                                    ${freeStock > 0 ? `${freeStock} à graver` : `0 stock (×${countCrafted})`}
                                                </span>
                                            </div>
                                        </div>`;
                                    }).join('')}
                                </div>
                            </div>

                            <div style="display:flex;flex-direction:column;justify-content:space-between;gap:9px;background:#0c0c12;border:1px solid #262632;border-radius:18px;padding:14px;">
                                <div style="display:flex;flex-direction:column;gap:8px;">
                                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                                        <div style="display:flex;align-items:center;gap:10px;">
                                            <img src="${currentSet ? currentSet.img : ''}" style="width:42px;height:42px;border-radius:999px;">
                                            <div>
                                                <span style="font-size:9.5px;font-weight:900;color:${stockForCurrentSet > 0 ? '#4ade80' : '#38bdf8'};text-transform:uppercase;">
                                                    ${stockForCurrentSet > 0 ? `Stock disponible : ${stockForCurrentSet} disque(s)` : `0 stock • Gravure standard : 10 ✦`}
                                                </span>
                                                <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:15px;color:#fff;text-transform:uppercase;">
                                                    ${currentSet ? bridge.itemName(currentSet) : bardicSetKey}
                                                </h3>
                                            </div>
                                        </div>
                                        ${!isFreeRoll ? `<button type="button" class="gacha-details-btn" id="bardic-reset-custom">Réinitialiser</button>` : ''}
                                    </div>

                                    <div style="font-size:10px;color:#a1a1aa;line-height:1.35;background:#08080c;padding:7px 10px;border-radius:10px;border:1px solid #1f202b;">
                                        <div><strong style="color:#fff;">2P :</strong> ${desc2P || 'Bonus de statistique 2 pièces.'}</div>
                                        <div style="margin-top:2px;"><strong style="color:#d7f70c;">4P :</strong> ${desc4P || 'Effet passif 4 pièces en combat.'}</div>
                                    </div>

                                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;">
                                        <button type="button" class="gacha-col-filter-btn ${bardicSlot === 0 ? 'active' : ''}" data-bslot="0" style="grid-column:span 2;">${t.randomPartition}</button>
                                        ${[1, 2, 3, 4, 5, 6].map(n => `
                                            <button type="button" class="gacha-col-filter-btn ${bardicSlot === n ? 'active' : ''}" data-bslot="${n}">[${n}]</button>
                                        `).join('')}
                                    </div>

                                    ${variableMainKeys.length > 0 ? `
                                    <div style="display:flex;flex-direction:column;gap:4px;">
                                        <span style="font-size:10px;font-weight:800;color:#a1a1aa;">Stat Principale (+15 ✦ si choisie) :</span>
                                        <select id="bardic-main-select" class="gacha-col-search" style="width:100%;border-color:${isMainTargeted ? '#d7f70c' : '#2c2c36'};">
                                            <option value="">Aléatoire (Gratuit)</option>
                                            ${variableMainKeys.map(k => {
                                                const isRecMain = (prof.mainBySlot[bardicSlot] || []).includes(k);
                                                return `<option value="${k}" ${selectedMainStat === k ? 'selected' : ''}>${tStat(k)} ${isRecMain ? '[GUIDE]' : ''} (+15 ✦)</option>`;
                                            }).join('')}
                                        </select>
                                    </div>` : ''}

                                    <div style="display:flex;flex-direction:column;gap:5px;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;">
                                            <span style="font-size:10px;font-weight:800;color:#a1a1aa;">Sous-Stats garanties (+10 ✦ chacune, max 4) :</span>
                                            <span class="gacha-quest-prog ${selectedSubStats.length > 0 ? 'done' : ''}">${selectedSubStats.length} / 4</span>
                                        </div>
                                        <div style="display:flex;flex-wrap:wrap;gap:5px;">
                                            ${SUBSTAT_POOL.map(s => {
                                                const isPicked = selectedSubStats.includes(s.key);
                                                const isConflict = s.key === fixedMainForSlot;
                                                const isGuideSub = prof.subPrio.includes(s.key);
                                                return `
                                                <button type="button" class="gacha-col-filter-btn ${isPicked ? 'active' : ''}"
                                                        data-bsubstat="${s.key}" ${isConflict ? 'disabled style="opacity:0.3;"' : ''}
                                                        style="padding:4px 8px;font-size:9.5px;${isGuideSub && !isPicked ? 'border-color:rgba(250,204,21,0.55);color:#fde047;' : ''}">
                                                    ${tStat(s.key)}${isGuideSub ? ' • GUIDE' : ''}
                                                </button>`;
                                            }).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div style="display:flex;flex-direction:column;gap:5px;max-height:115px;overflow-y:auto;">
                                    ${lastCraftedList.map(d => `
                                        <div style="background:#141520;border:1.5px solid #d7f70c;border-radius:12px;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-size:10px;font-weight:900;color:#d7f70c;">
                                                    [${d.slot}] ${tStat(d.mainStat)} (${formatMainStatValue(d.mainStat, d.level)}) • ${d.isFourLiner ? '4-Liner' : '3-Liner'}
                                                </div>
                                                <div style="font-size:9.5px;color:#d4d4d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                    ${d.substats.map(s => `${tStat(s.key)} +${formatSubstatValue(s)}`).join(' | ')}
                                                </div>
                                            </div>
                                            ${activeAgent ? `
                                            <button type="button" class="gacha-claim-btn can-claim" data-quick-equip="${d.uid}" data-qslot="${d.slot}" style="padding:5px 9px;font-size:9.5px;">
                                                ${t.equipNow}
                                            </button>` : ''}
                                        </div>
                                    `).join('')}
                                </div>

                                ${stockForCurrentSet <= 0 ? `
                                <div style="text-align:center;padding:10px;background:#14141d;border:1px solid #2b2b38;border-radius:12px;font-size:11px;font-weight:800;color:#a1a1aa;">
                                    Aucun disque en stock pour ce set. Faites des tirages sur le Canal Unifié pour en obtenir !
                                </div>` : (isFreeRoll ? `
                                <div style="display:grid;grid-template-columns:${bulkFreeCount > 1 ? '1fr 1fr' : '1fr'};gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-emerald" id="btn-craft-free-1">
                                        Graver ×1 (Gratuit • ${stockForCurrentSet} dispo)
                                    </button>
                                    ${bulkFreeCount > 1 ? `
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-free-bulk">
                                        Graver ×${bulkFreeCount} (Gratuit)
                                    </button>` : ''}
                                </div>` : `
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-custom-res" ${st.residual < customResCost ? 'disabled' : ''}>
                                        Graver Sur-Mesure (${customResCost} ✦)
                                    </button>
                                    <button type="button" class="gacha-shop-btn primary-cyan" id="btn-craft-custom-poly" ${st.polychromes < customPolyCost ? 'disabled' : ''}>
                                        Graver Sur-Mesure (${customPolyCost} Poly)
                                    </button>
                                </div>`)}
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('close-bardic-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                document.getElementById('bardic-reset-custom')?.addEventListener('click', () => {
                    selectedMainStat = '';
                    selectedSubStats = [];
                    renderBardic();
                });

                const sInp = document.getElementById('bardic-set-search');
                if (sInp) {
                    sInp.addEventListener('input', (e) => {
                        setSearch = e.target.value;
                        renderBardic();
                        const next = document.getElementById('bardic-set-search');
                        if (next) {
                            next.focus();
                            next.setSelectionRange(next.value.length, next.value.length);
                        }
                    });
                }

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
                    renderBardic();
                });

                overlay.querySelectorAll('[data-bsubstat]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const k = btn.getAttribute('data-bsubstat');
                        const idx = selectedSubStats.indexOf(k);
                        if (idx !== -1) {
                            selectedSubStats.splice(idx, 1);
                        } else if (selectedSubStats.length < 4) {
                            selectedSubStats.push(k);
                        }
                        renderBardic();
                    });
                });

                function executeCraft(count, payMode = 'free') {
                    const avail = getFreeGachaDiscCount(st, bardicSetKey);
                    if (avail < count) return;

                    if (payMode === 'res') {
                        if (st.residual < customResCost * count) return;
                        st.residual -= customResCost * count;
                    } else if (payMode === 'poly') {
                        if (st.polychromes < customPolyCost * count) return;
                        st.polychromes -= customPolyCost * count;
                    }

                    bs.usedGachaDiscs[bardicSetKey] = (bs.usedGachaDiscs[bardicSetKey] || 0) + count;

                    const forceMain = isMainTargeted ? selectedMainStat : null;
                    lastCraftedList = [];
                    for (let i = 0; i < count; i++) {
                        const d = generateCustomSRankDisc(bardicSetKey, bardicSlot, forceMain, selectedSubStats);
                        bs.craftedDiscs.unshift(d);
                        lastCraftedList.push(d);
                        selectedItemId = d.uid;
                    }
                    bridge.saveState(st);
                    renderBardic();
                }

                document.getElementById('btn-craft-free-1')?.addEventListener('click', () => executeCraft(1, 'free'));
                document.getElementById('btn-craft-free-bulk')?.addEventListener('click', () => executeCraft(bulkFreeCount, 'free'));
                document.getElementById('btn-craft-custom-res')?.addEventListener('click', () => executeCraft(1, 'res'));
                document.getElementById('btn-craft-custom-poly')?.addEventListener('click', () => executeCraft(1, 'poly'));

                overlay.querySelectorAll('[data-quick-equip]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const uid = btn.getAttribute('data-quick-equip');
                        const sl = parseInt(btn.getAttribute('data-qslot'), 10);
                        if (selectedAgentKey && uid && sl) {
                            equipDiscUnique(st, selectedAgentKey, sl, uid);
                            activeWheelTarget = sl;
                            selectedItemId = uid;
                            bridge.saveState(st);
                            btn.textContent = t.equippedTag;
                            btn.disabled = true;
                        }
                    });
                });
            }

            renderBardic();
        }

        // ========================================================
        // 9. SALLE DES TROPHÉES : BADGES DE MAÎTRISE & ESCOUADES
        // ========================================================
        let badgeFilter = 'all';

        const BADGE_SVGS = {
            squadReady: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7f70c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
            engines: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            vinyl: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M6 12a6 6 0 0 1 6-6"/></svg>`,
            tuning: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
            resonance: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
            miracle: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 12 12 22 2 12 12 2"/><circle cx="12" cy="12" r="3"/></svg>`,
            overclock: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
        };

        function computeSeriesBadges(st, pool) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            const isEn = (window.ZZZGachaBridge?.getLang?.() || 'fr') === 'en';
            const badges = [];

            const allDiscs = pool.allCatalog.filter(i => i.type === 'disc');
            const ownedDiscs = allDiscs.filter(d => (inv[d.id]?.count || 0) > 0).length;
            const lv15Count = bs.craftedDiscs.filter(d => d.level >= 15).length;
            const hasGodRoll = bs.craftedDiscs.some(d => (d.substats || []).some(s => (s.upgrades || 0) >= 4));
            const hasOverclock = Object.values(inv).some(i => i.type === 'agent' && (i.count || 0) > 7);

            const sEnginesOwned = pool.allCatalog.filter(i => i.type === 'engine' && i.rank === 'S' && (inv[i.id]?.count || 0) > 0).length;
            const fullyEquippedAgents = Object.values(bs.agentBuilds || {}).filter(ab =>
                ab && ab.engineKey && [1, 2, 3, 4, 5, 6].every(s => !!ab.discs?.[s])
            ).length;

            badges.push({
                id: 'series_squad_ready_3', cat: 'mastery', svg: BADGE_SVGS.squadReady,
                title: isEn ? 'Combat Ready Squad (3 Built Agents)' : 'Escouade Opérationnelle (3 Agents Équipés)',
                desc: isEn ? 'Equip 3 different Agents with a W-Engine and all 6 Drive Discs.' : 'Équiper 3 Agents différents avec un Moteur-Ampli et leurs 6 Disques.',
                cur: Math.min(3, fullyEquippedAgents), max: 3, reward: 1000
            });
            badges.push({
                id: 'series_s_engines_5', cat: 'mastery', svg: BADGE_SVGS.engines,
                title: isEn ? 'Signature Arsenal (5 S-Engines)' : 'Arsenal Signature (5 Moteurs Rang S)',
                desc: isEn ? 'Unlock 5 different S-Rank W-Engines in your Collection.' : 'Débloquer 5 Moteurs-Ampli de Rang S différents dans la Collection.',
                cur: Math.min(5, sEnginesOwned), max: 5, reward: 1200
            });
            badges.push({
                id: 'series_all_discs', cat: 'mastery', svg: BADGE_SVGS.vinyl,
                title: isEn ? 'Master Vinyl Collector' : 'Maître Disquaire de New Eridu',
                desc: isEn ? 'Unlock all Drive Disc sets in your Collection.' : 'Débloquer l\'intégralité des Sets de Disques dans la Collection.',
                cur: ownedDiscs, max: allDiscs.length || 30, reward: 1600
            });
            badges.push({
                id: 'series_craft_20', cat: 'mastery', svg: BADGE_SVGS.tuning,
                title: isEn ? 'Bardic Needle Regular' : 'Habitué du Magasin de musique',
                desc: isEn ? 'Tune 20 S-Rank Drive Discs in the Studio.' : 'Graver 20 Disques de Poussée de Rang S dans le Magasin de musique.',
                cur: Math.min(20, bs.craftedDiscs.length), max: 20, reward: 800
            });
            badges.push({
                id: 'series_lv15_6', cat: 'mastery', svg: BADGE_SVGS.resonance,
                title: isEn ? 'Full Resonance (+15 Set)' : 'Résonance Maximale (6 Disques +15)',
                desc: isEn ? 'Upgrade 6 S-Rank Drive Discs to Level +15.' : 'Améliorer 6 Disques de Rang S jusqu\'au niveau maximal +15.',
                cur: Math.min(6, lv15Count), max: 6, reward: 1000
            });
            badges.push({
                id: 'series_god_roll', cat: 'mastery', svg: BADGE_SVGS.miracle,
                title: isEn ? 'Statistical Miracle (+4 / +5 Roll)' : 'Miracle Statistique (+4 / +5 Roll)',
                desc: isEn ? 'Hit at least +4 upgrades on a single Drive Disc substat.' : 'Obtenir au moins +4 améliorations sur une seule sous-statistique de Disque S.',
                cur: hasGodRoll ? 1 : 0, max: 1, reward: 1200
            });
            badges.push({
                id: 'series_overclock_m6', cat: 'mastery', svg: BADGE_SVGS.overclock,
                title: isEn ? 'Beyond Limits (M6+ Overclock)' : 'Au-Delà des Limites (Surcharge M6+)',
                desc: isEn ? 'Obtain an 8th copy of any Agent to awaken Prismatic Overclock.' : 'Obtenir un 8e exemplaire d\'un même Agent pour éveiller sa Surcharge Prismatique.',
                cur: hasOverclock ? 1 : 0, max: 1, reward: 1200
            });

            const factionMap = {};
            pool.allCatalog.filter(i => i.type === 'agent').forEach(a => {
                const fac = a.faction || 'New Eridu';
                if (!factionMap[fac]) factionMap[fac] = [];
                factionMap[fac].push(a);
            });

            Object.entries(factionMap).forEach(([facName, members]) => {
                const ownedCount = members.filter(m => (inv[m.id]?.count || 0) > 0).length;
                badges.push({
                    id: `fac_${facName}`, cat: 'squads',
                    icon: `assets/Faction/${facName}.webp`, svg: BADGE_SVGS.squadReady,
                    title: `${facName}`,
                    desc: isEn ? `Recruit all ${members.length} Agents from ${facName}.` : `Recruter les ${members.length} Agents de l'escouade ${facName}.`,
                    cur: ownedCount, max: members.length, reward: 800, members
                });
            });

            badges.sort((a, b) => {
                const aClaimed = !!bs.claimedBadges[a.id];
                const bClaimed = !!bs.claimedBadges[b.id];
                const aReady = a.cur >= a.max && !aClaimed;
                const bReady = b.cur >= b.max && !bClaimed;
                if (aReady !== bReady) return aReady ? -1 : 1;
                if (aClaimed !== bClaimed) return aClaimed ? 1 : -1;
                return (b.cur / (b.max || 1)) - (a.cur / (a.max || 1));
            });

            return badges;
        }

        function renderBadgesTab(mount) {
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const t = B();
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const allBadges = computeSeriesBadges(st, pool);

            const unlockedTotal = allBadges.filter(b => b.cur >= b.max).length;
            const claimableBadges = allBadges.filter(b => b.cur >= b.max && !bs.claimedBadges[b.id]);
            const filtered = badgeFilter === 'all' ? allBadges : allBadges.filter(b => b.cat === badgeFilter);

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-badges-summary">
                        <div>
                            <h2 class="gacha-sec-title">${t.badgesTitle}</h2>
                            <p class="gacha-sec-sub">${t.badgesSub}</p>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            ${claimableBadges.length > 0 ? `<button type="button" class="gacha-claim-btn can-claim" id="btn-claim-all-badges">Tout récupérer (${claimableBadges.length})</button>` : ''}
                            <span class="gacha-reset-pill">${t.badgesUnlockedCount.replace('{u}', unlockedTotal).replace('{t}', allBadges.length)}</span>
                            <div class="gacha-col-filter-group">
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'all' ? 'active' : ''}" data-bf="all">${t.filterAllBadges.replace('{n}', allBadges.length)}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'mastery' ? 'active' : ''}" data-bf="mastery">${t.filterMastery}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'squads' ? 'active' : ''}" data-bf="squads">${t.filterSquads}</button>
                            </div>
                        </div>
                    </div>

                    <div class="zb-badges-grid">
                        ${filtered.map(b => {
                            const isDone = b.cur >= b.max;
                            const isClaimed = !!bs.claimedBadges[b.id];
                            const canClaim = isDone && !isClaimed;
                            const pct = Math.min(100, Math.round((b.cur / (b.max || 1)) * 100));

                            const membersHTML = b.members ? `
                                <div class="zb-squad-avatars">
                                    ${b.members.map(m => {
                                        const hasM = (st.inventory[m.id]?.count || 0) > 0;
                                        return `
                                        <div class="zb-squad-mini ${hasM ? '' : 'missing'}" data-badge-agent="${m.rawKey}" title="${bridge.itemName(m)}">
                                            <img src="${m.img}" alt="${bridge.itemName(m)}" loading="lazy">
                                        </div>`;
                                    }).join('')}
                                </div>
                            ` : '';

                            return `
                            <div class="zb-badge-card ${canClaim ? 'unlocked' : (isClaimed ? 'claimed' : '')}">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <div style="width:48px;height:48px;border-radius:14px;background:#09090d;border:1.5px solid #2b2b36;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                        ${b.icon ? `<img src="${b.icon}" style="width:36px;height:36px;object-fit:contain;" onerror="this.style.display='none'">` : b.svg}
                                    </div>
                                    <div style="min-width:0;flex:1;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                            <strong style="font-family:'Montserrat',sans-serif;font-size:12px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.title}</strong>
                                            <span class="gacha-quest-prog ${isDone ? 'done' : ''}">${b.cur}/${b.max}</span>
                                        </div>
                                        <p style="font-size:11px;color:#a1a1aa;margin:4px 0 0;">${b.desc}</p>
                                    </div>
                                </div>

                                ${membersHTML}

                                <div class="gacha-quest-bar-track">
                                    <div class="gacha-quest-bar-fill" style="width:${pct}%;background:${isClaimed ? '#22c55e' : (canClaim ? '#d7f70c' : '#38bdf8')};"></div>
                                </div>

                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span style="font-family:monospace;font-size:12px;font-weight:900;color:#d7f70c;">+${b.reward} Polychromes</span>
                                    <button type="button" class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}" data-claim-badge="${b.id}" data-breward="${b.reward}" ${!canClaim ? 'disabled' : ''}>
                                        ${isClaimed ? t.claimedBadge : (canClaim ? t.claimBadge : t.inProgress)}
                                    </button>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;

            document.getElementById('btn-claim-all-badges')?.addEventListener('click', () => {
                claimableBadges.forEach(b => {
                    bs.claimedBadges[b.id] = true;
                    st.polychromes += b.reward;
                });
                bridge.saveState(st);
                renderBadgesTab(mount);
            });

            mount.querySelectorAll('[data-bf]').forEach(btn => {
                btn.addEventListener('click', () => {
                    badgeFilter = btn.getAttribute('data-bf');
                    renderBadgesTab(mount);
                });
            });

            mount.querySelectorAll('[data-badge-agent]').forEach(el => {
                el.addEventListener('click', () => {
                    bridge.openItemModal?.('agent', el.getAttribute('data-badge-agent'));
                });
            });

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

        function injectBuildTabsIntoTopbar() {
            const navPills = document.querySelector('#zzz-gacha-modal .gacha-nav-pills');
            if (!navPills) return;
            const t = B();

            navPills.classList.add('zb-six-tabs');

            const existingBuilds = document.getElementById('gtab-lbl-builds');
            const existingBadges = document.getElementById('gtab-lbl-badges');

            if (!existingBuilds) {
                const btnBuilds = document.createElement('button');
                btnBuilds.type = 'button';
                btnBuilds.className = 'gacha-nav-btn';
                btnBuilds.setAttribute('data-gtab', 'builds');
                btnBuilds.id = 'gtab-lbl-builds';
                btnBuilds.textContent = t.tabBuilds;

                const btnBadges = document.createElement('button');
                btnBadges.type = 'button';
                btnBadges.className = 'gacha-nav-btn';
                btnBadges.setAttribute('data-gtab', 'badges');
                btnBadges.id = 'gtab-lbl-badges';
                btnBadges.textContent = t.tabBadges;

                navPills.appendChild(btnBuilds);
                navPills.appendChild(btnBadges);

                btnBuilds.addEventListener('click', () => {
                    window.ZZZGachaBridge?.switchCustomTab('builds', renderBuildsTab);
                });

                btnBadges.addEventListener('click', () => {
                    window.ZZZGachaBridge?.switchCustomTab('badges', renderBadgesTab);
                });
            } else {
                if (existingBuilds.textContent !== t.tabBuilds) existingBuilds.textContent = t.tabBuilds;
                if (existingBadges && existingBadges.textContent !== t.tabBadges) existingBadges.textContent = t.tabBadges;
            }

            const animOverlay = document.getElementById('gacha-anim-overlay');
            if (animOverlay && !animOverlay.__zbBackdropBound) {
                animOverlay.__zbBackdropBound = true;
                animOverlay.addEventListener('mousedown', (ev) => {
                    if (ev.target === animOverlay && animOverlay.querySelector('.gacha-dialog-box')) {
                        animOverlay.classList.remove('active');
                        const mount = document.getElementById('gacha-view-mount');
                        const activeBtn = document.querySelector('#zzz-gacha-modal .gacha-nav-btn.active');
                        if (mount && activeBtn?.getAttribute('data-gtab') === 'builds') {
                            renderBuildsTab(mount);
                        }
                    }
                });
            }
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('#langSwitcher')) {
                setTimeout(() => {
                    injectBuildTabsIntoTopbar();
                    const mount = document.getElementById('gacha-view-mount');
                    const activeBtn = document.querySelector('#zzz-gacha-modal .gacha-nav-btn.active');
                    const tab = activeBtn?.getAttribute('data-gtab');
                    if (mount && tab === 'builds') renderBuildsTab(mount);
                    else if (mount && tab === 'badges') renderBadgesTab(mount);
                }, 60);
            }
        }, true);

        injectBuildTabsIntoTopbar();

        window.ZZZBuilds = {
            initTabs: injectBuildTabsIntoTopbar,
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
