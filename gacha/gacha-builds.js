// gacha/gacha-builds.js - Studio de Builds ZZZ, Auto-Build relié aux Guides, Prix ×2 Main Stat Ciblée & Responsive Mobile
(function () {
    try {
        // ========================================================
        // 1. DICTIONNAIRE BILINGUE FR / EN COMPLET
        // ========================================================
        const BUILDS_I18N = {
            fr: {
                tabBuilds: "🛠️ Builds",
                tabBadges: "🏆 Badges",
                noAgentsTitle: "Aucun Agent débloqué",
                noAgentsDesc: "Effectuez des Recherches de Signal sur le Canal Unifié pour recruter votre premier Agent et débloquer son studio de Build !",
                bardicBtnTitle: "Studio Disques (Elfy)",
                bardicBtnSub: "{free} Gratuits • {d} Disques S",
                storageBtnTitle: "Entrepôt ({d})",
                storageBtnSub: "Trier & Recycler",
                step1: "Gravez des Disques S dans le Studio Disques",
                step2: "Cliquez sur ⚡ Équipement Auto (Guide)",
                step3: "Montez vos Disques (+15) et Compétences",
                overclockBanner: "⚡ SURCHARGE PRISMATIQUE ★{lvl} (+{pct}% TOUTES STATS)",
                subStats: "Stats de base",
                subSkills: "Compétences",
                subEquip: "Équipement",
                effectiveSubs: "Stats secondaires utiles :",
                combatEval: "Évaluation de combat",
                skillsTag: "ENTRAÎNEMENT D'AGENT • MAX NIV. {max}",
                skillsTitle: "Amélioration des Compétences",
                skillsDesc: "Améliorez les 5 compétences de l'Agent avec vos Signaux résiduels (✦) ou vos Polychromes pour booster son ATQ et son score de combat.",
                skillNames: ["Attaque Normale", "Esquive", "Soutien", "Attaque Spéciale EX", "Enchaînement & Ultime"],
                skillShort: ["Normale", "Esquive", "Soutien", "Spéciale", "Ultime"],
                skillBonusDesc: ["ATQ de base +{val} & DGT Normaux", "ATQ +{val} & Réflexes d'Esquive", "ATQ +{val} & Impact de Soutien", "ATQ +{val} & DGT Spéciaux EX", "ATQ +{val} & DGT d'Ultime"],
                upgradeRes: "Niv. +1 ({cost} ✦)",
                upgradePoly: "Niv. +1 ({cost} Poly)",
                upgradeMax: "NIVEAU MAX ✓",
                equipTag: "LECTEUR DE DISQUES & MOTEUR-AMPLI",
                equipTitle: "Roue d'Équipement",
                autoEquip: "⚡ Équipement Auto (Guide)",
                unequipAll: "✖ Tout retirer",
                unequipBtn: "✖ Déséquiper",
                equipBtn: "Équiper",
                transferBtn: "🔄 Transférer (de {owner})",
                emptySlot: "Vide",
                engineSlot: "Moteur-Ampli",
                noEngineEquipped: "Aucun Moteur-Ampli (Cliquer pour choisir)",
                activeSetBonuses: "Bonus de Sets Actifs (2P / 4P)",
                noSetBonus: "Équipez 2 ou 4 disques d'un même set pour activer ses bonus.",
                guideRecTitle: "💡 Build Recommandé par le Guide :",
                piece2: "Ensemble de 2 pièces",
                piece4: "Ensemble de 4 pièces",
                mainStatLabel: "Stat principale",
                subStatsLabel: "Stats secondaires",
                setEffectsLabel: "Effets de l'ensemble",
                engineEffectLabel: "Effet de moteur-ampli",
                upStepBtn: "Renforcer +{lvl} (4 ✦)",
                upMaxBtn: "Max +15 ({cost} ✦)",
                lockBtn: "🔒 Verrouiller",
                unlockBtn: "🔓 Déverrouiller",
                dismantleSingle: "🗑️ Démanteler (+{gain} ✦)",
                batchDismantle: "♻️ Démanteler Niv.0 non-équipés (+{gain} ✦)",
                recycleSurplusEngines: "♻️ Recycler doublons Moteurs (+{gain} ✦)",
                storageTitle: "📦 Entrepôt : Disques & Moteurs",
                storageDiscsTab: "💿 Disques [{n}]",
                storageEnginesTab: "⚙️ Moteurs [{n}]",
                filterAllSets: "Tous les Sets",
                sortLevel: "Tri : Niveau",
                sortGuide: "Tri : Guide",
                bardicTag: "BARDIC NEEDLE • STUDIO D'ACCORDAGE RANG S",
                bardicTitle: "Graver des Disques de Poussée",
                searchSetPlaceholder: "Rechercher un Set de Disques...",
                randomPartition: "Aléatoire (I–VI)",
                orientationLabel: "🎯 Choisir la Stat Principale (Prix ×2 si sélectionnée) :",
                standardWeighted: "Aléatoire pondéré (Prix normal ×1)",
                targetedPriceTag: "Stat choisie : {stat} (Prix ×2)",
                tuneFreeStock: "💿 Graver Stock Gacha ×1 (Coût : {c} stock • {n} dispo)",
                tune1Res: "🎵 Accordage ×1 ({cost} ✦)",
                tune5Res: "🎵 Accordage ×5 ({cost} ✦)",
                tune1Poly: "🎵 Accordage ×1 ({cost} Poly)",
                equipNow: "Équiper",
                equippedTag: "Équipé ✓",
                noDiscInSlot: "Aucun disque sur la Partition [{slot}].",
                badgesTitle: "🏆 Salle des Trophées : Séries & Factions",
                badgesSub: "Complétez les escouades de New Eridu et les défis d'accordage de disques pour gagner des Polychromes.",
                badgesUnlockedCount: "Badges : {u} / {t}",
                filterAllBadges: "Tous ({n})",
                filterMastery: "Maîtrise & Disques",
                filterSquads: "Escouades",
                claimBadge: "Récupérer",
                claimedBadge: "Obtenu ✓",
                inProgress: "En cours",
                close: "Fermer",
                stats: {
                    "PV": "PV",
                    "ATQ": "ATQ",
                    "DÉF": "DÉF",
                    "Impact": "Impact",
                    "Taux CRIT": "Taux CRIT",
                    "Dégâts CRIT": "DGT CRIT",
                    "Maîtrise d'anomalie": "Maîtrise d'anomalie",
                    "Adresse d'anomalie": "Adresse d'anomalie",
                    "Ratio de PÉN": "Taux de PÉN",
                    "Régénération d'énergie": "Récup. d'énergie",
                    "PV (flat)": "PV",
                    "ATQ (flat)": "ATQ",
                    "DÉF (flat)": "DÉF",
                    "PV%": "PV%",
                    "ATQ%": "ATQ%",
                    "DÉF%": "DÉF%",
                    "PÉN (flat)": "PÉN",
                    "DGT Physique": "DGT Physique",
                    "DGT Feu": "DGT Feu",
                    "DGT Glace": "DGT Glace",
                    "DGT Électrique": "DGT Électrique",
                    "DGT Éther": "DGT Éther",
                    "DGT Vent": "DGT Vent"
                }
            },
            en: {
                tabBuilds: "🛠️ Builds",
                tabBadges: "🏆 Badges",
                noAgentsTitle: "No Agents Unlocked Yet",
                noAgentsDesc: "Perform Signal Searches on the Unified Channel to recruit your first Agent and unlock their Build Studio!",
                bardicBtnTitle: "Disc Studio (Elfy)",
                bardicBtnSub: "{free} Free Stock • {d} S-Discs",
                storageBtnTitle: "Storage ({d})",
                storageBtnSub: "Sort & Dismantle",
                step1: "Tune S-Rank Discs in the Disc Studio",
                step2: "Click ⚡ Auto-Equip (Guide)",
                step3: "Upgrade Discs (+15) and Skills",
                overclockBanner: "⚡ PRISMATIC OVERCLOCK ★{lvl} (+{pct}% ALL STATS)",
                subStats: "Base Stats",
                subSkills: "Skills",
                subEquip: "Equipment",
                effectiveSubs: "Effective Sub-Stats:",
                combatEval: "Combat Readiness",
                skillsTag: "AGENT TRAINING • MAX LV. {max}",
                skillsTitle: "Skill Enhancement",
                skillsDesc: "Upgrade your Agent's 5 combat skills using Residual Signals (✦) or Polychromes to boost their ATK and Combat Readiness.",
                skillNames: ["Basic Attack", "Dodge", "Assist", "EX Special Attack", "Chain Attack & Ultimate"],
                skillShort: ["Basic", "Dodge", "Assist", "Special", "Ultimate"],
                skillBonusDesc: ["Base ATK +{val} & Basic DMG", "ATK +{val} & Dodge Counter", "ATK +{val} & Assist Impact", "ATK +{val} & EX Special DMG", "ATK +{val} & Ultimate DMG"],
                upgradeRes: "Lv. +1 ({cost} ✦)",
                upgradePoly: "Lv. +1 ({cost} Poly)",
                upgradeMax: "MAX LEVEL ✓",
                equipTag: "DRIVE DISC PLAYER & W-ENGINE",
                equipTitle: "Equipment Wheel",
                autoEquip: "⚡ Auto-Equip (Guide)",
                unequipAll: "✖ Unequip All",
                unequipBtn: "✖ Unequip",
                equipBtn: "Equip",
                transferBtn: "🔄 Transfer (from {owner})",
                emptySlot: "Empty",
                engineSlot: "W-Engine",
                noEngineEquipped: "No W-Engine (Click to select)",
                activeSetBonuses: "Active Set Bonuses (2P / 4P)",
                noSetBonus: "Equip 2 or 4 discs from the same set to activate set bonuses.",
                guideRecTitle: "💡 ProxyQG Guide Recommendation:",
                piece2: "2-Piece Set",
                piece4: "4-Piece Set",
                mainStatLabel: "Main Stat",
                subStatsLabel: "Sub-Stats",
                setEffectsLabel: "Set Effects",
                engineEffectLabel: "W-Engine Effect",
                upStepBtn: "Enhance +{lvl} (4 ✦)",
                upMaxBtn: "Max +15 ({cost} ✦)",
                lockBtn: "🔒 Lock",
                unlockBtn: "🔓 Unlock",
                dismantleSingle: "🗑️ Dismantle (+{gain} ✦)",
                batchDismantle: "♻️ Dismantle Unowned Lv.0 (+{gain} ✦)",
                recycleSurplusEngines: "♻️ Recycle Surplus W-Engines (+{gain} ✦)",
                storageTitle: "📦 Storage: Drive Discs & W-Engines",
                storageDiscsTab: "💿 Discs [{n}]",
                storageEnginesTab: "⚙️ W-Engines [{n}]",
                filterAllSets: "All Sets",
                sortLevel: "Sort: Level",
                sortGuide: "Sort: Guide",
                bardicTag: "BARDIC NEEDLE • S-RANK TUNING STUDIO",
                bardicTitle: "Tune S-Rank Drive Discs",
                searchSetPlaceholder: "Search a Drive Disc Set...",
                randomPartition: "Random (I–VI)",
                orientationLabel: "🎯 Choose Main Stat (2× Price if selected):",
                standardWeighted: "Random weighted roll (1× Normal Price)",
                targetedPriceTag: "Chosen Stat: {stat} (2× Price)",
                tuneFreeStock: "💿 Roll Gacha Disc ×1 (Cost: {c} stock • {n} left)",
                tune1Res: "🎵 Tune ×1 ({cost} ✦)",
                tune5Res: "🎵 Tune ×5 ({cost} ✦)",
                tune1Poly: "🎵 Tune ×1 ({cost} Poly)",
                equipNow: "Equip",
                equippedTag: "Equipped ✓",
                noDiscInSlot: "No disc in Partition [{slot}].",
                badgesTitle: "🏆 Trophy Room: Series & Factions",
                badgesSub: "Complete New Eridu squads and Drive Disc tuning challenges to earn Polychrome rewards.",
                badgesUnlockedCount: "Badges: {u} / {t}",
                filterAllBadges: "All ({n})",
                filterMastery: "Mastery & Discs",
                filterSquads: "Squads",
                claimBadge: "Claim",
                claimedBadge: "Claimed ✓",
                inProgress: "In Progress",
                close: "Close",
                stats: {
                    "PV": "HP",
                    "ATQ": "ATK",
                    "DÉF": "DEF",
                    "Impact": "Impact",
                    "Taux CRIT": "CRIT Rate",
                    "Dégâts CRIT": "CRIT DMG",
                    "Maîtrise d'anomalie": "Anomaly Mastery",
                    "Adresse d'anomalie": "Anomaly Proficiency",
                    "Ratio de PÉN": "PEN Ratio",
                    "Régénération d'énergie": "Energy Regen",
                    "PV (flat)": "HP",
                    "ATQ (flat)": "ATK",
                    "DÉF (flat)": "DEF",
                    "PV%": "HP%",
                    "ATQ%": "ATK%",
                    "DÉF%": "DEF%",
                    "PÉN (flat)": "PEN",
                    "DGT Physique": "Physical DMG",
                    "DGT Feu": "Fire DMG",
                    "DGT Glace": "Ice DMG",
                    "DGT Électrique": "Electric DMG",
                    "DGT Éther": "Ether DMG",
                    "DGT Vent": "Wind DMG"
                }
            }
        };

        function B() {
            const lang = window.ZZZGachaBridge?.getLang?.() || 'fr';
            return BUILDS_I18N[lang] || BUILDS_I18N.fr;
        }

        function tStat(statKey) {
            const dict = B().stats || {};
            return dict[statKey] || statKey;
        }

        // ========================================================
        // 2. CHARGEMENT DES DONNÉES DE GUIDES (AGENT_DATABASE, DISCS, ENGINES)
        // ========================================================
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

        // ========================================================
        // 3. MOTEUR MATHÉMATIQUE OFFICIEL DES DISQUES RANG S
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

        function generateSRankDisc(setKey, partitionSlot, forcedMainStat = null) {
            const slot = Number(partitionSlot) || (Math.floor(Math.random() * 6) + 1);
            const mainStat = (forcedMainStat && PARTITION_WEIGHTS[slot][forcedMainStat])
                ? forcedMainStat
                : drawWeightedKey(PARTITION_WEIGHTS[slot]);

            const available = SUBSTAT_POOL
                .filter(s => s.key !== mainStat)
                .map(s => ({ ...s }));

            const isFourLiner = Math.random() < 0.20;
            const initialCount = isFourLiner ? 4 : 3;

            const substats = [];
            for (let k = 0; k < initialCount; k++) {
                substats.push(drawSubstatFromPool(available));
            }

            return {
                uid: 'disc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
                setKey,
                slot,
                level: 0,
                locked: false,
                isFourLiner,
                mainStat,
                substats
            };
        }

        function upgradeDiscOneStep(disc) {
            if (!disc || disc.level >= 15) return false;
            disc.level = Math.min(15, disc.level + 3);

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
            return sub.isPct ? `${raw.toFixed(1)} %` : `${Math.round(raw)}`;
        }

        // ========================================================
        // 4. UNICITÉ STRICTE DES DISQUES & GESTION D'INVENTAIRE
        // ========================================================
        const ELEM_ICON_MAP = {
            Physical: 'physique.webp',
            Fire: 'feu.webp',
            Ice: 'glace.webp',
            Electric: 'electrique.webp',
            Ether: 'ether.webp',
            Wind: 'vent.webp',
            Aurora: 'lumen.webp',
            HonedEdge: 'lame.webp',
            Sepia: 'sepia.webp'
        };

        const SKILL_DEFS = [
            { idx: 0, icon: "assets/Skills/Attaque_basic.webp", color: "#d7f70c", glow: "rgba(215,247,12,0.35)" },
            { idx: 1, icon: "assets/Skills/Esquive.webp",       color: "#38bdf8", glow: "rgba(56,189,248,0.35)" },
            { idx: 2, icon: "assets/Skills/Assist.webp",        color: "#4ade80", glow: "rgba(74,222,128,0.35)" },
            { idx: 3, icon: "assets/Skills/Ex.webp",            color: "#e879f9", glow: "rgba(232,121,249,0.35)" },
            { idx: 4, icon: "assets/Skills/Ultime.webp",        color: "#f59e0b", glow: "rgba(245,158,11,0.4)" }
        ];

        function ensureBuildState(st) {
            if (!st.buildSystem) {
                st.buildSystem = {
                    craftedDiscs: [],
                    agentBuilds: {},
                    usedGachaDiscs: {},
                    claimedBadges: {}
                };
            }
            if (!st.buildSystem.usedGachaDiscs) st.buildSystem.usedGachaDiscs = {};
            if (!st.buildSystem.agentBuilds) st.buildSystem.agentBuilds = {};
            if (!Array.isArray(st.buildSystem.craftedDiscs)) st.buildSystem.craftedDiscs = [];

            // Garantie d'unicité stricte : un même uid de disque ne peut JAMAIS être équipé sur 2 agents différents
            const seenDiscUids = new Set();
            const validUids = new Set(st.buildSystem.craftedDiscs.map(d => d.uid));
            Object.values(st.buildSystem.agentBuilds).forEach(ab => {
                if (!ab || !ab.discs) return;
                for (let s = 1; s <= 6; s++) {
                    const uid = ab.discs[s];
                    if (!uid) continue;
                    if (!validUids.has(uid) || seenDiscUids.has(uid)) {
                        ab.discs[s] = null;
                    } else {
                        seenDiscUids.add(uid);
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

        function getEngineOwner(st, engineKey) {
            if (!engineKey || !st.buildSystem?.agentBuilds) return null;
            for (const [agKey, ab] of Object.entries(st.buildSystem.agentBuilds)) {
                if (ab.engineKey === engineKey) return agKey;
            }
            return null;
        }

        function equipDiscUnique(st, targetAgentKey, slotNum, discUid) {
            const bs = ensureBuildState(st);
            Object.entries(bs.agentBuilds).forEach(([, ab]) => {
                for (let s = 1; s <= 6; s++) {
                    if (ab.discs && ab.discs[s] === discUid) {
                        ab.discs[s] = null;
                    }
                }
            });
            const targetAb = getOrInitAgentBuild(st, targetAgentKey);
            targetAb.discs[slotNum] = discUid;
        }

        function equipEngineUnique(st, targetAgentKey, engineKey) {
            const bs = ensureBuildState(st);
            Object.entries(bs.agentBuilds).forEach(([, ab]) => {
                if (ab.engineKey === engineKey) ab.engineKey = null;
            });
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
        // 5. ÉQUIPEMENT AUTO RELIÉ AU GUIDE
        // ========================================================
        function autoEquipFromGuide(st, pool, agent) {
            const bs = ensureBuildState(st);
            const prof = getGuideProfile(agent.rawKey);

            const ownedEngines = pool.allCatalog.filter(i => {
                if (i.type !== 'engine' || (st.inventory[i.id]?.count || 0) <= 0) return false;
                const owner = getEngineOwner(st, i.rawKey);
                return !owner || owner === agent.rawKey;
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

            for (let slot = 1; slot <= 6; slot++) {
                const available = bs.craftedDiscs.filter(d => {
                    if (d.slot !== slot) return false;
                    const owner = getDiscOwner(st, d.uid);
                    return !owner || owner === agent.rawKey;
                });
                if (available.length > 0) {
                    available.sort((a, b) => scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
                    equipDiscUnique(st, agent.rawKey, slot, available[0].uid);
                }
            }
        }

        // ========================================================
        // 6. CALCUL DES STATISTIQUES COMPLÈTES DE L'AGENT
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
            const prof = getGuideProfile(agentMeta.rawKey);
            const recSubList = prof.subPrio.length > 0 ? prof.subPrio : base.rec;

            const ownedCopies = st.inventory[`agent_${agentMeta.rawKey}`]?.count || 1;
            const mindscape = Math.min(6, Math.max(0, ownedCopies - 1));
            const overclockLvl = Math.max(0, ownedCopies - 7);

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

            for (let slot = 1; slot <= 6; slot++) {
                const uid = ab.discs[slot];
                if (!uid) continue;
                const d = bs.craftedDiscs.find(x => x.uid === uid);
                if (!d) continue;

                setCounts[d.setKey] = (setCounts[d.setKey] || 0) + 1;

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

            const totalSkillLvls = (ab.skills || [1, 1, 1, 1, 1]).reduce((a, b) => a + b, 0);
            const overclockMult = 1 + Math.min(0.20, overclockLvl * 0.02);

            const finalHp = Math.round(((baseHp * (1 + hpPct / 100)) + hpFlat) * overclockMult);
            const finalAtk = Math.round(((baseAtk * (1 + atkPct / 100)) + atkFlat + totalSkillLvls * 5) * overclockMult);
            const finalDef = Math.round(((baseDef * (1 + defPct / 100)) + defFlat) * overclockMult);
            const finalImp = Math.round(base.imp * (1 + impPct / 100));
            const finalAm = Math.round(base.am * (1 + amPct / 100));
            const finalEr = (base.er * (1 + erPct / 100)).toFixed(2);

            const equippedDiscsCount = Object.values(ab.discs).filter(Boolean).length;
            const score = effectiveSubRolls * 3 + equippedDiscsCount * 6 + (ab.engineKey ? 15 : 0) + totalSkillLvls + mindscape * 4;
            const grade = score >= 135 ? 'SSS' : (score >= 110 ? 'SS' : (score >= 80 ? 'S' : (score >= 50 ? 'A' : 'B')));

            return {
                hp: finalHp,
                hpBonus: finalHp - base.hp,
                atk: finalAtk,
                atkBonus: finalAtk - base.atk,
                def: finalDef,
                defBonus: finalDef - base.def,
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
                recSubList
            };
        }

        // ========================================================
        // 7. RENDU DE L'ONGLET « BUILDS » & SES 3 MENUS
        // ========================================================
        let selectedAgentKey = '';
        let currentSubMenu = 'equip';
        let bardicSetKey = '';
        let bardicSlot = 0;

        function getOwnedAgents(st, pool) {
            return pool.allCatalog.filter(i => i.type === 'agent' && (st.inventory[i.id]?.count || 0) > 0);
        }

        async function renderBuildsTab(mount) {
            await ensureExternalDataLoaded();
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const t = B();
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

            const freeDiscsTotal = getFreeGachaDiscCount(st);

            const rosterHTML = ownedAgents.map(a => {
                const cnt = st.inventory[a.id]?.count || 1;
                const mTag = cnt > 7 ? `M6 ★${cnt - 7}` : `M${Math.min(6, cnt - 1)}`;
                return `
                <div class="zb-roster-pill ${a.rawKey === agent.rawKey ? 'active' : ''}" data-pick-build-agent="${a.rawKey}">
                    <img src="${a.img}" alt="${bridge.itemName(a)}">
                    <div class="zb-roster-meta">
                        <span class="zb-roster-name">${bridge.itemName(a)}</span>
                        <span class="zb-roster-sub">${a.rank} • Lv.60 • ${mTag}</span>
                    </div>
                </div>`;
            }).join('');

            let rightPanelContent = '';
            if (currentSubMenu === 'stats') {
                rightPanelContent = renderSubMenuStats(agent, calc, pool, bridge, t);
            } else if (currentSubMenu === 'skills') {
                rightPanelContent = renderSubMenuSkills(st, agent, ab, calc, t);
            } else {
                rightPanelContent = renderSubMenuEquip(st, pool, bs, agent, ab, calc, bridge, t);
            }

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-top-bar">
                        <div class="zb-roster-bar">${rosterHTML}</div>
                        <div class="zb-top-actions">
                            <button type="button" class="zb-bardic-cta secondary" id="btn-open-storage">
                                <span class="zb-bardic-cta-icon">📦</span>
                                <div class="zb-bardic-cta-txt">
                                    <span class="zb-bardic-cta-title">${t.storageBtnTitle.replace('{d}', bs.craftedDiscs.length)}</span>
                                    <span class="zb-bardic-cta-sub" style="color:#38bdf8;">${t.storageBtnSub}</span>
                                </div>
                            </button>
                            <button type="button" class="zb-bardic-cta" id="btn-open-bardic-needle">
                                <span class="zb-bardic-cta-icon">💿</span>
                                <div class="zb-bardic-cta-txt">
                                    <span class="zb-bardic-cta-title">${t.bardicBtnTitle}</span>
                                    <span class="zb-bardic-cta-sub">${t.bardicBtnSub.replace('{free}', freeDiscsTotal).replace('{d}', bs.craftedDiscs.length)}</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Bandeau d'aide intuitif en 3 étapes -->
                    <div class="zb-steps-strip">
                        <div class="zb-step-item"><span class="zb-step-num">1</span><span>${t.step1}</span></div>
                        <div class="zb-step-item"><span class="zb-step-num">2</span><span>${t.step2}</span></div>
                        <div class="zb-step-item"><span class="zb-step-num">3</span><span>${t.step3}</span></div>
                    </div>

                    <div class="zb-stage">
                        <div class="zb-agent-showcase ${calc.overclockLvl > 0 ? 'overclocked' : ''} ${currentSubMenu !== 'stats' ? 'hide-on-mobile-sub' : ''}">
                            <div class="zb-agent-bg-name">${bridge.itemName(agent)}</div>
                            ${calc.overclockLvl > 0 ? `<div class="zb-overclock-pill">${t.overclockBanner.replace('{lvl}', calc.overclockLvl).replace('{pct}', Math.min(20, calc.overclockLvl * 2))}</div>` : ''}
                            <img src="assets/splash/${agent.rawKey}.webp" onerror="this.onerror=null;this.src='${agent.img}';" alt="${bridge.itemName(agent)}" class="zb-agent-art">
                            <div class="zb-cinema-badge">
                                <span class="zb-cinema-lbl">CINEMA</span>
                                <span class="zb-cinema-val">${calc.mindscape} / 6</span>
                            </div>
                        </div>

                        <div class="zb-right-column">
                            <div class="zb-panel-card">
                                ${rightPanelContent}
                            </div>

                            <div class="zb-subnav">
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'stats' ? 'active' : ''}" data-bsub="stats">${t.subStats}</button>
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'skills' ? 'active' : ''}" data-bsub="skills">${t.subSkills}</button>
                                <button type="button" class="zb-subnav-btn ${currentSubMenu === 'equip' ? 'active' : ''}" data-bsub="equip">${t.subEquip}</button>
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

            document.getElementById('btn-open-bardic-needle')?.addEventListener('click', () => openBardicNeedleModal(mount));
            document.getElementById('btn-open-storage')?.addEventListener('click', () => openStorageModal(mount, 'discs'));

            bindSubMenuEvents(mount, st, pool, bs, agent, ab, calc);
        }

        // --- MENU 1 : STATS DE BASE ---
        function renderSubMenuStats(agent, calc, pool, bridge, t) {
            const elemIcon = ELEM_ICON_MAP[agent.element] || 'physique.webp';
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
                            <span style="color:#facc15;">★ ${agent.rank}</span>
                            <span>• ${agent.faction || 'New Eridu'}</span>
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
                    <div class="zb-stat-row">
                        <span>${tStat('PV')}</span>
                        <span class="zb-stat-val">${calc.hp} ${calc.hpBonus > 0 ? `<small class="zb-stat-bonus">(+${calc.hpBonus})</small>` : ''}</span>
                    </div>
                    <div class="zb-stat-row recommended">
                        <span>${tStat('ATQ')}</span>
                        <span class="zb-stat-val">${calc.atk} ${calc.atkBonus > 0 ? `<small class="zb-stat-bonus">(+${calc.atkBonus})</small>` : ''}</span>
                    </div>
                    <div class="zb-stat-row">
                        <span>${tStat('DÉF')}</span>
                        <span class="zb-stat-val">${calc.def} ${calc.defBonus > 0 ? `<small class="zb-stat-bonus">(+${calc.defBonus})</small>` : ''}</span>
                    </div>
                    <div class="zb-stat-row"><span>${tStat('Impact')}</span><span class="zb-stat-val">${calc.imp}</span></div>
                    <div class="zb-stat-row recommended"><span>${tStat('Taux CRIT')}</span><span class="zb-stat-val">${calc.cr}</span></div>
                    <div class="zb-stat-row recommended"><span>${tStat('Dégâts CRIT')}</span><span class="zb-stat-val">${calc.cd}</span></div>
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

        // --- MENU 2 : COMPÉTENCES ---
        let activeSkillIdx = 0;

        function renderSubMenuSkills(st, agent, ab, calc, t) {
            const maxCap = calc.mindscape >= 5 ? 16 : (calc.mindscape >= 3 ? 14 : 12);
            const curLvl = ab.skills[activeSkillIdx] || 1;
            const costRes = curLvl * 4;
            const costPoly = curLvl * 30;
            const isMax = curLvl >= maxCap;
            const bonusDesc = (t.skillBonusDesc[activeSkillIdx] || '').replace('{val}', curLvl * 5);

            return `
                <div>
                    <span class="gacha-patch-tag">${t.skillsTag.replace('{max}', maxCap)}</span>
                    <h3 class="gacha-panel-title" style="font-size:20px;">${t.skillsTitle}</h3>
                    <p class="gacha-panel-desc">${t.skillsDesc}</p>
                </div>

                <div class="zb-skills-row">
                    ${SKILL_DEFS.map((sk, idx) => {
                        const lv = ab.skills[idx] || 1;
                        return `
                        <div class="zb-skill-capsule ${idx === activeSkillIdx ? 'active' : ''}" data-pick-skill="${idx}"
                             style="--sk-color:${sk.color};--sk-glow:${sk.glow};">
                            <div class="zb-skill-circle">
                                <img src="${sk.icon}" alt="${t.skillShort[idx]}">
                            </div>
                            <span style="font-size:9px;font-weight:900;text-transform:uppercase;color:#e4e4e7;text-align:center;">${t.skillShort[idx]}</span>
                            <div class="zb-skill-lvl-pill">
                                <span style="color:${lv >= maxCap ? '#d7f70c' : '#fff'};">${String(lv).padStart(2, '0')}</span>
                                <span class="max">/${maxCap}</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>

                <div style="background:#0c0c12;border:1.5px solid #272733;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
                        <strong style="font-family:'Montserrat',sans-serif;font-size:13.5px;text-transform:uppercase;color:#fff;">
                            ${t.skillNames[activeSkillIdx]} (Lv. ${curLvl} → ${isMax ? 'MAX' : curLvl + 1})
                        </strong>
                        <span class="gacha-quest-prog done">${bonusDesc}</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        <button type="button" class="gacha-shop-btn primary-purple" id="btn-up-skill-res" ${isMax || st.residual < costRes ? 'disabled' : ''}>
                            ${isMax ? t.upgradeMax : t.upgradeRes.replace('{cost}', costRes)}
                        </button>
                        <button type="button" class="gacha-shop-btn primary-yellow" id="btn-up-skill-poly" ${isMax || st.polychromes < costPoly ? 'disabled' : ''}>
                            ${isMax ? t.upgradeMax : t.upgradePoly.replace('{cost}', costPoly)}
                        </button>
                    </div>
                </div>
            `;
        }

        // --- MENU 3 : COCKPIT D'ÉQUIPEMENT ---
        function renderSubMenuEquip(st, pool, bs, agent, ab, calc, bridge, t) {
            const engObj = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;
            const engCount = engObj ? Math.min(5, st.inventory[engObj.id]?.count || 1) : 0;
            const prof = getGuideProfile(agent.rawKey);

            const nodesHTML = [1, 2, 3, 4, 5, 6].map(slot => {
                const uid = ab.discs[slot];
                const disc = uid ? bs.craftedDiscs.find(d => d.uid === uid) : null;
                const setObj = disc ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === disc.setKey) : null;

                return `
                <div class="zb-disc-node slot-${slot} ${disc ? 'equipped' : ''}" data-wheel-slot="${slot}" title="Partition [${slot}]">
                    ${disc && setObj
                        ? `<img src="${setObj.img}" alt="Slot ${slot}"><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">+${disc.level}</span>`
                        : `<span class="zb-disc-slot-num">${slot}</span><span class="zb-slot-tag">${t.emptySlot}</span>`
                    }
                </div>`;
            }).join('');

            const slotRowsHTML = [1, 2, 3, 4, 5, 6].map(slot => {
                const uid = ab.discs[slot];
                const disc = uid ? bs.craftedDiscs.find(d => d.uid === uid) : null;
                return `
                <div class="zb-equip-slot-mini ${disc ? 'filled' : ''}" data-wheel-slot="${slot}">
                    <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;color:${disc ? '#facc15' : '#52525b'};">[${slot}]</span>
                    <span style="font-size:10px;font-weight:800;color:${disc ? '#fff' : '#71717a'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;">
                        ${disc ? `${tStat(disc.mainStat)} (${formatMainStatValue(disc.mainStat, disc.level)})` : t.emptySlot}
                    </span>
                    ${disc
                        ? `<span style="font-family:monospace;font-size:9.5px;font-weight:900;color:#d7f70c;">+${disc.level}</span>
                           <button type="button" class="zb-mini-unequip" data-unequip-slot="${slot}" title="${t.unequipBtn}">✖</button>`
                        : `<span style="font-size:10px;color:#52525b;">➕</span>`
                    }
                </div>`;
            }).join('');

            const activeSets = Object.entries(calc.setCounts).filter(([, c]) => c >= 2);

            const recSet1Obj = prof.sets4[0] ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === prof.sets4[0]) : null;
            const recSet2Obj = prof.sets2[0] ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === prof.sets2[0]) : null;
            const guideRecSummary = (recSet1Obj || prof.subPrio.length > 0)
                ? `<div style="background:rgba(215,247,12,0.06);border:1px solid rgba(215,247,12,0.3);border-radius:12px;padding:7px 10px;font-size:10.5px;color:#d4d4d8;display:flex;flex-direction:column;gap:2px;">
                    <strong style="color:#d7f70c;font-size:9.5px;text-transform:uppercase;">${t.guideRecTitle}</strong>
                    <div>
                        ${recSet1Obj ? `<strong>4P:</strong> ${bridge.itemName(recSet1Obj)}` : ''}
                        ${recSet2Obj ? ` • <strong>2P:</strong> ${bridge.itemName(recSet2Obj)}` : ''}
                    </div>
                    <div style="color:#a1a1aa;font-size:9.5px;">
                        <strong>[4]</strong> ${(prof.mainBySlot[4]?.[0] && tStat(prof.mainBySlot[4][0])) || 'CRIT/Anomalie'} •
                        <strong>[5]</strong> ${(prof.mainBySlot[5]?.[0] && tStat(prof.mainBySlot[5][0])) || 'DGT/ATQ%'} •
                        <strong>[6]</strong> ${(prof.mainBySlot[6]?.[0] && tStat(prof.mainBySlot[6][0])) || 'ATQ%/Impact/ER'}
                    </div>
                   </div>`
                : '';

            return `
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div>
                        <span class="gacha-patch-tag">${t.equipTag}</span>
                        <h3 class="gacha-panel-title" style="font-size:19px;">${t.equipTitle} — ${bridge.itemName(agent)}</h3>
                    </div>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;">
                        <button type="button" class="gacha-details-btn accent" id="btn-auto-equip">${t.autoEquip}</button>
                        <button type="button" class="gacha-details-btn" id="btn-unequip-all">${t.unequipAll}</button>
                    </div>
                </div>

                <div class="zb-equip-cockpit">
                    <div class="zb-hex-housing">
                        <span class="zb-driver-plaque">DRIVER</span>
                        ${nodesHTML}
                        <div class="zb-wengine-core" id="btn-wheel-wengine" title="${t.engineSlot}">
                            ${engObj
                                ? `<img src="${engObj.img}" alt="${bridge.itemName(engObj)}"><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">${engObj.rank} ★${engCount}</span>`
                                : `<span style="font-size:24px;color:#52525b;">➕</span><span class="zb-slot-tag">${t.engineSlot}</span>`
                            }
                        </div>
                    </div>

                    <div class="zb-equip-details">
                        <div class="zb-equip-wcard" id="btn-card-wengine">
                            <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">
                                ${engObj
                                    ? `<img src="${engObj.img}" style="width:38px;height:38px;object-fit:contain;background:#000;border-radius:10px;padding:3px;">`
                                    : `<div style="width:38px;height:38px;border-radius:10px;background:#181822;display:flex;align-items:center;justify-content:center;font-size:17px;">⚙️</div>`
                                }
                                <div style="min-width:0;flex:1;">
                                    <span style="font-size:9px;font-weight:900;color:#facc15;text-transform:uppercase;display:block;">${t.engineSlot}</span>
                                    <strong style="font-family:'Montserrat',sans-serif;font-size:11px;color:#fff;text-transform:uppercase;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                        ${engObj ? bridge.itemName(engObj) : t.noEngineEquipped}
                                    </strong>
                                </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:6px;">
                                <span class="gacha-quest-prog done">${engObj ? `★${engCount}` : '✎'}</span>
                                ${engObj ? `<button type="button" class="zb-mini-unequip" id="btn-quick-unequip-engine" title="${t.unequipBtn}">✖</button>` : ''}
                            </div>
                        </div>

                        ${guideRecSummary}

                        <div style="background:#0b0b11;border:1px solid #252532;border-radius:12px;padding:7px 10px;">
                            <span style="font-size:9px;font-weight:900;color:#a1a1aa;text-transform:uppercase;display:block;margin-bottom:3px;">${t.activeSetBonuses}</span>
                            ${activeSets.length === 0
                                ? `<span style="font-size:10px;color:#71717a;">${t.noSetBonus}</span>`
                                : `<div style="display:flex;gap:5px;flex-wrap:wrap;">${activeSets.map(([sk, cnt]) => {
                                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? '4P' : '2P'} : ${dObj ? bridge.itemName(dObj) : sk}</span>`;
                                }).join('')}</div>`
                            }
                        </div>

                        <div class="zb-equip-slot-list">
                            ${slotRowsHTML}
                        </div>
                    </div>
                </div>
            `;
        }

        function bindSubMenuEvents(mount, st, pool, bs, agent, ab, calc) {
            const bridge = window.ZZZGachaBridge;

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

            document.getElementById('btn-wheel-wengine')?.addEventListener('click', () => openZZZArmoryModal(mount, st, pool, bs, agent, ab, 'engine'));
            document.getElementById('btn-card-wengine')?.addEventListener('click', (ev) => {
                if (ev.target.closest('#btn-quick-unequip-engine')) return;
                openZZZArmoryModal(mount, st, pool, bs, agent, ab, 'engine');
            });

            document.getElementById('btn-quick-unequip-engine')?.addEventListener('click', (ev) => {
                ev.stopPropagation();
                ab.engineKey = null;
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            mount.querySelectorAll('[data-unequip-slot]').forEach(btn => {
                btn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    const sl = parseInt(btn.getAttribute('data-unequip-slot'), 10);
                    if (sl) ab.discs[sl] = null;
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                });
            });

            mount.querySelectorAll('[data-wheel-slot]').forEach(node => {
                node.addEventListener('click', (ev) => {
                    if (ev.target.closest('[data-unequip-slot]')) return;
                    const slotNum = parseInt(node.getAttribute('data-wheel-slot'), 10);
                    openZZZArmoryModal(mount, st, pool, bs, agent, ab, slotNum);
                });
            });

            document.getElementById('btn-auto-equip')?.addEventListener('click', () => {
                autoEquipFromGuide(st, pool, agent);
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('btn-unequip-all')?.addEventListener('click', () => {
                ab.engineKey = null;
                ab.discs = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
                bridge.saveState(st);
                renderBuildsTab(mount);
            });
        }

        // ========================================================
        // 8. ÉCRAN D'ARMURERIE ZZZ (BOUTON FERMER À DROITE SANS FLÈCHE)
        // ========================================================
        function openZZZArmoryModal(mount, st, pool, bs, agent, ab, initialTarget = 1) {
            const bridge = window.ZZZGachaBridge;
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            let activeSlotOrEngine = initialTarget;
            let selectedUidOrKey = null;
            let filterSet = 'all';
            let sortMode = 'guide';

            const prof = getGuideProfile(agent.rawKey);

            function syncDefaultSelection() {
                if (activeSlotOrEngine === 'engine') {
                    selectedUidOrKey = ab.engineKey || pool.allCatalog.find(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0)?.rawKey || null;
                } else {
                    const sl = Number(activeSlotOrEngine) || 1;
                    selectedUidOrKey = ab.discs[sl] || bs.craftedDiscs.find(d => d.slot === sl)?.uid || null;
                }
            }
            syncDefaultSelection();

            function renderArmory() {
                const t = B();
                const isLangEn = (bridge.getLang?.() || 'fr') === 'en';
                const isEngineMode = activeSlotOrEngine === 'engine';
                const slotNum = isEngineMode ? 0 : Number(activeSlotOrEngine);

                const wheelNodesHTML = [1, 2, 3, 4, 5, 6].map(s => {
                    const u = ab.discs[s];
                    const d = u ? bs.craftedDiscs.find(x => x.uid === u) : null;
                    const sObj = d ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey) : null;
                    const isRing = !isEngineMode && slotNum === s;
                    return `
                    <div class="zb-disc-node slot-${s} ${d ? 'equipped' : ''} ${isRing ? 'selected-ring' : ''}" data-armory-wheel="${s}">
                        ${d && sObj
                            ? `<img src="${sObj.img}" alt=""><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">+${d.level}</span>`
                            : `<span class="zb-disc-slot-num">${s}</span>`
                        }
                    </div>`;
                }).join('');

                const eqEngineObj = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;

                let leftGridHTML = '';
                let centerInspectorHTML = '';
                let bottomRightButtonsHTML = '';

                if (isEngineMode) {
                    const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
                    const rW = { S: 0, A: 1, B: 2 };
                    ownedEngines.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));

                    if (!selectedUidOrKey && ownedEngines[0]) selectedUidOrKey = ownedEngines[0].rawKey;

                    leftGridHTML = ownedEngines.map(e => {
                        const cnt = Math.min(5, st.inventory[e.id]?.count || 1);
                        const ownerKey = getEngineOwner(st, e.rawKey);
                        const isSel = selectedUidOrKey === e.rawKey;
                        return `
                        <div class="zb-gear-tile rank-${e.rank} ${isSel ? 'selected' : ''}" data-arm-pick="${e.rawKey}">
                            <span class="zb-gear-tile-slot">★${cnt}</span>
                            ${ownerKey ? `<div class="zb-gear-owner-avatar" title="${ownerKey}"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            <img src="${e.img}" class="zb-gear-tile-img" alt="">
                            <span class="zb-gear-tile-lvl">Niv. 60</span>
                        </div>`;
                    }).join('');

                    const selEng = ownedEngines.find(e => e.rawKey === selectedUidOrKey) || null;
                    if (selEng) {
                        const rawJson = EXT_DATA.engines[selEng.rawKey] || {};
                        const cnt = Math.min(5, st.inventory[selEng.id]?.count || 1);
                        const starsHTML = Array.from({ length: 5 }, (_, i) => `<span style="color:${i < cnt ? '#facc15' : '#3f3f4e'};font-size:14px;">★</span>`).join(' ');
                        const baseAtkVal = rawJson.baseAtk || (selEng.rank === 'S' ? 713 : (selEng.rank === 'A' ? 594 : 475));
                        const advStatLbl = (isLangEn ? (rawJson.subStat?.en || rawJson.stat?.en) : (rawJson.subStat?.fr || rawJson.stat?.fr)) || `${tStat('ATQ%')} +${selEng.rank === 'S' ? 24 : 18}%`;
                        const effectTxt = (isLangEn ? (rawJson.effect?.en || rawJson.desc?.en) : (rawJson.effect?.fr || rawJson.desc?.fr)) || '';
                        const ownerKey = getEngineOwner(st, selEng.rawKey);

                        centerInspectorHTML = `
                            <div style="display:flex;flex-direction:column;gap:8px;">
                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:17px;color:#fff;text-transform:uppercase;">
                                        ${bridge.itemName(selEng)}
                                    </h3>
                                    ${ownerKey ? `<img src="assets/Agents/${ownerKey}.webp" style="width:26px;height:26px;border-radius:999px;border:2px solid #d7f70c;">` : ''}
                                </div>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span class="gacha-quest-prog done">${selEng.rank} • Niv. 60/60</span>
                                    <span>${starsHTML}</span>
                                </div>
                                <span style="font-size:10px;font-weight:900;color:#71717a;text-transform:uppercase;">Stat de base</span>
                                <div class="zb-insp-subline"><span>ATQ de base</span><strong>${baseAtkVal}</strong></div>
                                <span style="font-size:10px;font-weight:900;color:#71717a;text-transform:uppercase;">Stat avancée</span>
                                <div class="zb-insp-subline guide-hit"><span>${advStatLbl}</span><strong>MAX</strong></div>
                                <span style="font-size:10px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.engineEffectLabel} (${selEng.role || 'All'})</span>
                                <div style="font-size:11px;color:#d4d4d8;line-height:1.45;background:#07070b;padding:9px;border-radius:12px;border:1px solid #1f202b;">
                                    ${effectTxt || 'Augmente l\'ATQ et l\'efficacité de combat du porteur.'}
                                </div>
                            </div>
                        `;

                        const isEquippedHere = ab.engineKey === selEng.rawKey;
                        bottomRightButtonsHTML = isEquippedHere
                            ? `<button type="button" class="gacha-res-btn" id="btn-arm-unequip" style="border-color:#ef4444;color:#fca5a5;">${t.unequipBtn}</button>`
                            : `<button type="button" class="gacha-res-btn primary" id="btn-arm-equip">${ownerKey ? t.transferBtn.replace('{owner}', ownerKey) : t.equipBtn}</button>`;
                    } else {
                        centerInspectorHTML = `<div style="margin:auto;text-align:center;color:#71717a;font-size:12px;">Aucun Moteur-Ampli disponible.</div>`;
                    }
                } else {
                    let list = bs.craftedDiscs.filter(d => d.slot === slotNum);
                    if (filterSet !== 'all') list = list.filter(d => d.setKey === filterSet);

                    if (sortMode === 'guide') {
                        list.sort((a, b) => scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
                    } else {
                        list.sort((a, b) => b.level - a.level);
                    }

                    if (!selectedUidOrKey || !list.some(d => d.uid === selectedUidOrKey)) {
                        selectedUidOrKey = ab.discs[slotNum] || list[0]?.uid || null;
                    }

                    leftGridHTML = list.map(d => {
                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey);
                        const ownerKey = getDiscOwner(st, d.uid);
                        const isSel = d.uid === selectedUidOrKey;
                        return `
                        <div class="zb-gear-tile rank-S ${isSel ? 'selected' : ''}" data-arm-pick="${d.uid}">
                            <span class="zb-gear-tile-slot">${d.slot}</span>
                            ${ownerKey ? `<div class="zb-gear-owner-avatar" title="${ownerKey}"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            ${d.locked ? `<span class="zb-gear-lock-badge">🔒</span>` : ''}
                            <img src="${sObj ? sObj.img : ''}" class="zb-gear-tile-img" style="border-radius:999px;" alt="">
                            <span class="zb-gear-tile-lvl">Niv. ${d.level}</span>
                        </div>`;
                    }).join('');

                    const selDisc = bs.craftedDiscs.find(d => d.uid === selectedUidOrKey) || null;
                    if (selDisc) {
                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === selDisc.setKey);
                        const rawDiscJson = EXT_DATA.discs[selDisc.setKey] || {};
                        const desc2P = (isLangEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || '';
                        const desc4P = (isLangEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || '';
                        const ownerKey = getDiscOwner(st, selDisc.uid);
                        const isMainRec = slotNum >= 4 && (prof.mainBySlot[slotNum] || []).includes(selDisc.mainStat);
                        const dismantleGain = calcDiscDismantleGain(selDisc);

                        centerInspectorHTML = `
                            <div style="display:flex;flex-direction:column;gap:7px;">
                                <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                    <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#fff;text-transform:uppercase;">
                                        ${sObj ? bridge.itemName(sObj) : selDisc.setKey} [${selDisc.slot}]
                                    </h3>
                                    <div style="display:flex;align-items:center;gap:5px;">
                                        <button type="button" class="gacha-details-btn" id="btn-arm-lock" title="${selDisc.locked ? t.unlockBtn : t.lockBtn}">${selDisc.locked ? '🔒' : '🔓'}</button>
                                        <button type="button" class="gacha-details-btn" id="btn-arm-trash" ${selDisc.locked || ownerKey ? 'disabled' : ''}>🗑️ +${dismantleGain}✦</button>
                                    </div>
                                </div>

                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span class="gacha-quest-prog done">S • Niv. ${selDisc.level}/15 • ${selDisc.isFourLiner ? '4-Liner' : '3-Liner'}</span>
                                    ${ownerKey ? `<span style="display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:800;color:#d7f70c;"><img src="assets/Agents/${ownerKey}.webp" style="width:18px;height:18px;border-radius:999px;"> ${ownerKey}</span>` : ''}
                                </div>

                                <span style="font-size:9.5px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.mainStatLabel}</span>
                                <div class="zb-insp-subline ${isMainRec ? 'guide-hit' : ''}">
                                    <span>${tStat(selDisc.mainStat)}</span>
                                    <strong>${formatMainStatValue(selDisc.mainStat, selDisc.level)}</strong>
                                </div>

                                <span style="font-size:9.5px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.subStatsLabel}</span>
                                <div style="display:flex;flex-direction:column;gap:4px;">
                                    ${selDisc.substats.map(sub => {
                                        const isGuideSub = prof.subPrio.includes(sub.key);
                                        return `
                                        <div class="zb-insp-subline ${isGuideSub ? 'guide-hit' : ''}">
                                            <span>${tStat(sub.key)} ${sub.upgrades > 0 ? `+${sub.upgrades}` : ''}</span>
                                            <strong>${formatSubstatValue(sub)}</strong>
                                        </div>`;
                                    }).join('')}
                                </div>

                                <span style="font-size:9.5px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.setEffectsLabel}</span>
                                <div style="font-size:10.5px;color:#a1a1aa;line-height:1.4;background:#07070b;padding:8px 10px;border-radius:12px;border:1px solid #1f202b;">
                                    <div><strong style="color:#fff;">2P :</strong> ${desc2P || 'Bonus de statistique 2 pièces.'}</div>
                                    <div style="margin-top:3px;"><strong style="color:#d7f70c;">4P :</strong> ${desc4P || 'Effet passif 4 pièces en combat.'}</div>
                                </div>
                            </div>
                        `;

                        const isEquippedHere = ab.discs[slotNum] === selDisc.uid;
                        const maxCost = ((15 - selDisc.level) / 3) * 4;

                        bottomRightButtonsHTML = `
                            ${isEquippedHere
                                ? `<button type="button" class="gacha-res-btn" id="btn-arm-unequip" style="border-color:#ef4444;color:#fca5a5;">${t.unequipBtn}</button>`
                                : `<button type="button" class="gacha-res-btn primary" id="btn-arm-equip">${ownerKey ? t.transferBtn.replace('{owner}', ownerKey) : t.equipBtn}</button>`
                            }
                            <button type="button" class="gacha-res-btn" id="btn-arm-up-step" ${selDisc.level >= 15 || st.residual < 4 ? 'disabled' : ''}>
                                ${selDisc.level >= 15 ? t.upgradeMax : t.upStepBtn.replace('{lvl}', selDisc.level + 3)}
                            </button>
                            ${selDisc.level < 15 ? `
                            <button type="button" class="gacha-res-btn" id="btn-arm-up-max" ${st.residual < maxCost ? 'disabled' : ''}>
                                ${t.upMaxBtn.replace('{cost}', maxCost)}
                            </button>` : ''}
                        `;
                    } else {
                        centerInspectorHTML = `
                            <div style="margin:auto;text-align:center;padding:20px;display:flex;flex-direction:column;gap:10px;align-items:center;">
                                <span style="font-size:12px;color:#a1a1aa;">${t.noDiscInSlot.replace('{slot}', slotNum)}</span>
                                <button type="button" class="gacha-res-btn primary" id="btn-arm-craft-slot">🎵 Graver Partition [${slotNum}]</button>
                            </div>`;
                    }
                }

                const distinctSets = [...new Set(bs.craftedDiscs.map(d => d.setKey))];

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="zb-armory-modal">
                        <!-- En-tête : Filtres à gauche, Bouton FERMER à droite sans flèche (Point 5) -->
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;border-bottom:1px solid #262734;padding-bottom:10px;">
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                ${!isEngineMode ? `
                                <select id="arm-filter-set" class="gacha-col-search" style="min-width:135px;">
                                    <option value="all">${t.filterAllSets}</option>
                                    ${distinctSets.map(sk => {
                                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                        return `<option value="${sk}" ${filterSet === sk ? 'selected' : ''}>${sObj ? bridge.itemName(sObj) : sk}</option>`;
                                    }).join('')}
                                </select>
                                <button type="button" class="gacha-col-filter-btn ${sortMode === 'guide' ? 'active' : ''}" id="arm-sort-toggle">
                                    ${sortMode === 'guide' ? t.sortGuide : t.sortLevel}
                                </button>` : `<span class="gacha-patch-tag" style="margin:0;">${t.engineSlot}</span>`}
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                ${!isEngineMode ? `<button type="button" class="gacha-details-btn accent" id="btn-arm-open-studio">🎵 Graver [${slotNum}]</button>` : ''}
                                <button type="button" class="gacha-res-btn" id="close-armory-modal">${t.close}</button>
                            </div>
                        </div>

                        <!-- Barre rapide de sélection de slot sur Mobile/Tablette -->
                        <div class="zb-mobile-slot-pills">
                            <button type="button" class="gacha-col-filter-btn ${isEngineMode ? 'active' : ''}" data-armory-wheel="engine">⚙️ Moteur</button>
                            ${[1, 2, 3, 4, 5, 6].map(s => `
                                <button type="button" class="gacha-col-filter-btn ${!isEngineMode && slotNum === s ? 'active' : ''}" data-armory-wheel="${s}">[${s}]</button>
                            `).join('')}
                        </div>

                        <!-- Corps 3 Colonnes (2 colonnes sur Tablette, 1 sur Mobile) -->
                        <div class="zb-armory-3col">
                            <div class="zb-armory-grid-scroll">
                                ${leftGridHTML || `<div style="grid-column:1/-1;text-align:center;color:#71717a;padding:24px 10px;font-size:12px;">Aucun élément.</div>`}
                            </div>

                            <div class="zb-inspector-col">
                                ${centerInspectorHTML}
                            </div>

                            <div class="zb-armory-wheel-col">
                                <div class="zb-hex-housing">
                                    <span class="zb-driver-plaque">DRIVER</span>
                                    ${wheelNodesHTML}
                                    <div class="zb-wengine-core ${isEngineMode ? 'selected-ring' : ''}" id="arm-wheel-engine">
                                        ${eqEngineObj
                                            ? `<img src="${eqEngineObj.img}" alt=""><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">Niv.60</span>`
                                            : `<span style="font-size:10px;font-weight:900;color:#d7f70c;text-align:center;padding:4px;">CORE AVAILABLE</span>`
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;border-top:1px solid #262734;padding-top:10px;">
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                <button type="button" class="gacha-res-btn" id="btn-arm-auto-guide" style="border-color:#d7f70c;color:#d7f70c;">${t.autoEquip}</button>
                                <button type="button" class="gacha-res-btn" id="btn-arm-unequip-all">${t.unequipAll}</button>
                            </div>
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                ${bottomRightButtonsHTML}
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('close-armory-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                document.getElementById('arm-filter-set')?.addEventListener('change', (e) => {
                    filterSet = e.target.value;
                    renderArmory();
                });

                document.getElementById('arm-sort-toggle')?.addEventListener('click', () => {
                    sortMode = sortMode === 'guide' ? 'level' : 'guide';
                    renderArmory();
                });

                document.getElementById('btn-arm-open-studio')?.addEventListener('click', () => {
                    bardicSlot = slotNum;
                    openBardicNeedleModal(mount);
                });

                document.getElementById('btn-arm-craft-slot')?.addEventListener('click', () => {
                    bardicSlot = slotNum;
                    openBardicNeedleModal(mount);
                });

                overlay.querySelectorAll('[data-armory-wheel]').forEach(el => {
                    el.addEventListener('click', () => {
                        const val = el.getAttribute('data-armory-wheel');
                        activeSlotOrEngine = val === 'engine' ? 'engine' : parseInt(val, 10);
                        syncDefaultSelection();
                        renderArmory();
                    });
                });

                document.getElementById('arm-wheel-engine')?.addEventListener('click', () => {
                    activeSlotOrEngine = 'engine';
                    syncDefaultSelection();
                    renderArmory();
                });

                overlay.querySelectorAll('[data-arm-pick]').forEach(tile => {
                    tile.addEventListener('click', () => {
                        selectedUidOrKey = tile.getAttribute('data-arm-pick');
                        renderArmory();
                    });
                });

                document.getElementById('btn-arm-equip')?.addEventListener('click', () => {
                    if (!selectedUidOrKey) return;
                    if (isEngineMode) {
                        equipEngineUnique(st, agent.rawKey, selectedUidOrKey);
                    } else {
                        equipDiscUnique(st, agent.rawKey, slotNum, selectedUidOrKey);
                    }
                    bridge.saveState(st);
                    renderArmory();
                });

                document.getElementById('btn-arm-unequip')?.addEventListener('click', () => {
                    if (isEngineMode) {
                        ab.engineKey = null;
                    } else {
                        ab.discs[slotNum] = null;
                    }
                    bridge.saveState(st);
                    renderArmory();
                });

                document.getElementById('btn-arm-auto-guide')?.addEventListener('click', () => {
                    autoEquipFromGuide(st, pool, agent);
                    bridge.saveState(st);
                    syncDefaultSelection();
                    renderArmory();
                });

                document.getElementById('btn-arm-unequip-all')?.addEventListener('click', () => {
                    ab.engineKey = null;
                    ab.discs = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
                    bridge.saveState(st);
                    renderArmory();
                });

                document.getElementById('btn-arm-lock')?.addEventListener('click', () => {
                    const d = bs.craftedDiscs.find(x => x.uid === selectedUidOrKey);
                    if (d) {
                        d.locked = !d.locked;
                        bridge.saveState(st);
                        renderArmory();
                    }
                });

                document.getElementById('btn-arm-trash')?.addEventListener('click', () => {
                    const idx = bs.craftedDiscs.findIndex(x => x.uid === selectedUidOrKey);
                    if (idx !== -1) {
                        const d = bs.craftedDiscs[idx];
                        if (d.locked || getDiscOwner(st, d.uid)) return;
                        const gain = calcDiscDismantleGain(d);
                        bs.craftedDiscs.splice(idx, 1);
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        selectedUidOrKey = null;
                        bridge.saveState(st);
                        syncDefaultSelection();
                        renderArmory();
                    }
                });

                document.getElementById('btn-arm-up-step')?.addEventListener('click', () => {
                    const d = bs.craftedDiscs.find(x => x.uid === selectedUidOrKey);
                    if (d && d.level < 15 && st.residual >= 4) {
                        st.residual -= 4;
                        upgradeDiscOneStep(d);
                        bridge.saveState(st);
                        renderArmory();
                    }
                });

                document.getElementById('btn-arm-up-max')?.addEventListener('click', () => {
                    const d = bs.craftedDiscs.find(x => x.uid === selectedUidOrKey);
                    if (!d || d.level >= 15) return;
                    const cost = ((15 - d.level) / 3) * 4;
                    if (st.residual >= cost) {
                        st.residual -= cost;
                        while (d.level < 15) upgradeDiscOneStep(d);
                        bridge.saveState(st);
                        renderArmory();
                    }
                });
            }

            renderArmory();
        }

        // ========================================================
        // 9. ENTREPÔT GLOBAL DISQUES & MOTEURS (FERMER À DROITE SANS FLÈCHE)
        // ========================================================
        function openStorageModal(mount, initialTab = 'discs') {
            const bridge = window.ZZZGachaBridge;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            let storageTab = initialTab;
            let filterSet = 'all';
            let filterSlot = 0;
            let selectedId = null;

            function renderStorage() {
                const t = B();
                const isLangEn = (bridge.getLang?.() || 'fr') === 'en';
                const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
                const distinctSets = [...new Set(bs.craftedDiscs.map(d => d.setKey))];

                const unownedLv0Discs = bs.craftedDiscs.filter(d => d.level === 0 && !d.locked && !getDiscOwner(st, d.uid));
                const batchDiscGain = unownedLv0Discs.length * 5;

                let surplusEngineGain = 0;
                ownedEngines.forEach(e => {
                    const cnt = st.inventory[e.id]?.count || 0;
                    if (cnt > 1) {
                        const diff = cnt - 1;
                        surplusEngineGain += diff * (e.rank === 'S' ? 40 : (e.rank === 'A' ? 10 : 3));
                    }
                });

                let leftGridHTML = '';
                let rightDetailHTML = '';

                if (storageTab === 'discs') {
                    let discs = [...bs.craftedDiscs];
                    if (filterSet !== 'all') discs = discs.filter(d => d.setKey === filterSet);
                    if (filterSlot > 0) discs = discs.filter(d => d.slot === filterSlot);
                    discs.sort((a, b) => b.level - a.level || a.slot - b.slot);

                    if (!selectedId || !discs.some(d => d.uid === selectedId)) {
                        selectedId = discs[0]?.uid || null;
                    }

                    leftGridHTML = discs.map(d => {
                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey);
                        const ownerKey = getDiscOwner(st, d.uid);
                        return `
                        <div class="zb-gear-tile rank-S ${d.uid === selectedId ? 'selected' : ''}" data-st-pick="${d.uid}">
                            <span class="zb-gear-tile-slot">${d.slot}</span>
                            ${ownerKey ? `<div class="zb-gear-owner-avatar" title="${ownerKey}"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            ${d.locked ? `<span class="zb-gear-lock-badge">🔒</span>` : ''}
                            <img src="${sObj ? sObj.img : ''}" class="zb-gear-tile-img" style="border-radius:999px;" alt="">
                            <span class="zb-gear-tile-lvl">Niv. ${d.level}</span>
                        </div>`;
                    }).join('');

                    const selD = bs.craftedDiscs.find(d => d.uid === selectedId) || null;
                    if (selD) {
                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === selD.setKey);
                        const ownerKey = getDiscOwner(st, selD.uid);
                        const gain = calcDiscDismantleGain(selD);

                        rightDetailHTML = `
                            <div style="display:flex;flex-direction:column;gap:8px;">
                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <div>
                                        <span style="font-size:9.5px;font-weight:900;color:#71717a;">DETAIL</span>
                                        <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:17px;color:#fff;text-transform:uppercase;">
                                            ${sObj ? bridge.itemName(sObj) : selD.setKey} [${selD.slot}]
                                        </h3>
                                    </div>
                                    <img src="${sObj ? sObj.img : ''}" style="width:44px;height:44px;border-radius:999px;">
                                </div>

                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span class="gacha-quest-prog done">S • Niv. ${selD.level}/15</span>
                                    ${ownerKey ? `<span style="display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:800;color:#d7f70c;"><img src="assets/Agents/${ownerKey}.webp" style="width:20px;height:20px;border-radius:999px;"> ${ownerKey}</span>` : `<span style="font-size:10px;color:#71717a;">EMPTY</span>`}
                                </div>

                                <span style="font-size:9.5px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.mainStatLabel}</span>
                                <div class="zb-insp-subline guide-hit">
                                    <span>${tStat(selD.mainStat)}</span>
                                    <strong>${formatMainStatValue(selD.mainStat, selD.level)}</strong>
                                </div>

                                <span style="font-size:9.5px;font-weight:900;color:#71717a;text-transform:uppercase;">${t.subStatsLabel}</span>
                                <div style="display:flex;flex-direction:column;gap:4px;">
                                    ${selD.substats.map(sub => `
                                        <div class="zb-insp-subline ${sub.upgrades > 0 ? 'guide-hit' : ''}">
                                            <span>${tStat(sub.key)} ${sub.upgrades > 0 ? `+${sub.upgrades}` : ''}</span>
                                            <strong>${formatSubstatValue(sub)}</strong>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
                                <button type="button" class="gacha-details-btn" id="st-btn-lock">${selD.locked ? t.unlockBtn : t.lockBtn}</button>
                                <button type="button" class="gacha-details-btn" id="st-btn-trash" ${selD.locked || ownerKey ? 'disabled' : ''} style="border-color:#ef4444;color:#fca5a5;">
                                    ${t.dismantleSingle.replace('{gain}', gain)}
                                </button>
                                <button type="button" class="gacha-shop-btn primary-yellow" id="st-btn-up" style="flex:1;" ${selD.level >= 15 || st.residual < 4 ? 'disabled' : ''}>
                                    ${selD.level >= 15 ? t.upgradeMax : t.upStepBtn.replace('{lvl}', selD.level + 3)}
                                </button>
                            </div>
                        `;
                    } else {
                        rightDetailHTML = `<div style="margin:auto;text-align:center;color:#71717a;font-size:12px;">Aucun disque dans l'entrepôt.</div>`;
                    }
                } else {
                    const rW = { S: 0, A: 1, B: 2 };
                    ownedEngines.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));
                    if (!selectedId || !ownedEngines.some(e => e.rawKey === selectedId)) {
                        selectedId = ownedEngines[0]?.rawKey || null;
                    }

                    leftGridHTML = ownedEngines.map(e => {
                        const cnt = st.inventory[e.id]?.count || 1;
                        const ownerKey = getEngineOwner(st, e.rawKey);
                        return `
                        <div class="zb-gear-tile rank-${e.rank} ${e.rawKey === selectedId ? 'selected' : ''}" data-st-pick="${e.rawKey}">
                            <span class="zb-gear-tile-slot">★${Math.min(5, cnt)} (×${cnt})</span>
                            ${ownerKey ? `<div class="zb-gear-owner-avatar" title="${ownerKey}"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            <img src="${e.img}" class="zb-gear-tile-img" alt="">
                            <span class="zb-gear-tile-lvl">Niv. 60</span>
                        </div>`;
                    }).join('');

                    const selE = ownedEngines.find(e => e.rawKey === selectedId) || null;
                    if (selE) {
                        const cnt = st.inventory[selE.id]?.count || 1;
                        const ownerKey = getEngineOwner(st, selE.rawKey);
                        const rawJson = EXT_DATA.engines[selE.rawKey] || {};
                        const effectTxt = (isLangEn ? (rawJson.effect?.en || rawJson.desc?.en) : (rawJson.effect?.fr || rawJson.desc?.fr)) || '';
                        const unitVal = selE.rank === 'S' ? 40 : (selE.rank === 'A' ? 10 : 3);

                        rightDetailHTML = `
                            <div style="display:flex;flex-direction:column;gap:8px;">
                                <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:17px;color:#fff;text-transform:uppercase;">
                                    ${bridge.itemName(selE)}
                                </h3>
                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span class="gacha-quest-prog done">${selE.rank} • ★${Math.min(5, cnt)} (${cnt} ex.)</span>
                                    ${ownerKey ? `<span style="font-size:10.5px;font-weight:800;color:#d7f70c;">Porté par ${ownerKey}</span>` : ''}
                                </div>
                                <div style="font-size:11px;color:#d4d4d8;line-height:1.45;background:#07070b;padding:9px;border-radius:12px;border:1px solid #1f202b;">
                                    ${effectTxt || 'Moteur-Ampli de spécialisation ' + (selE.role || '')}
                                </div>
                            </div>
                            <button type="button" class="gacha-shop-btn primary-purple" id="st-btn-recycle-1-eng" ${cnt <= 1 ? 'disabled' : ''}>
                                🗑️ Recycler 1 doublon (+${unitVal} ✦)
                            </button>
                        `;
                    }
                }

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="zb-armory-modal" style="max-width:1100px;">
                        <!-- En-tête : Onglets à gauche, FERMER à droite sans flèche (Point 5) -->
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;border-bottom:1px solid #262734;padding-bottom:10px;">
                            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                <button type="button" class="gacha-col-filter-btn ${storageTab === 'discs' ? 'active' : ''}" data-st-tab="discs">${t.storageDiscsTab.replace('{n}', bs.craftedDiscs.length)}</button>
                                <button type="button" class="gacha-col-filter-btn ${storageTab === 'engines' ? 'active' : ''}" data-st-tab="engines">${t.storageEnginesTab.replace('{n}', ownedEngines.length)}</button>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;margin-left:auto;">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                <button type="button" class="gacha-res-btn" id="close-storage-modal">${t.close}</button>
                            </div>
                        </div>

                        ${storageTab === 'discs' ? `
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
                            <div style="display:flex;gap:5px;flex-wrap:wrap;">
                                <select id="st-filter-set" class="gacha-col-search">
                                    <option value="all">${t.filterAllSets}</option>
                                    ${distinctSets.map(sk => {
                                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                        return `<option value="${sk}" ${filterSet === sk ? 'selected' : ''}>${sObj ? bridge.itemName(sObj) : sk}</option>`;
                                    }).join('')}
                                </select>
                                ${[0, 1, 2, 3, 4, 5, 6].map(n => `
                                    <button type="button" class="gacha-col-filter-btn ${filterSlot === n ? 'active' : ''}" data-st-slot="${n}">${n === 0 ? 'I–VI' : `[${n}]`}</button>
                                `).join('')}
                            </div>
                            <button type="button" class="gacha-details-btn accent" id="st-batch-dismantle" ${batchDiscGain <= 0 ? 'disabled' : ''}>
                                ${t.batchDismantle.replace('{gain}', batchDiscGain)}
                            </button>
                        </div>` : `
                        <div style="display:flex;justify-content:flex-end;">
                            <button type="button" class="gacha-details-btn accent" id="st-batch-engines" ${surplusEngineGain <= 0 ? 'disabled' : ''}>
                                ${t.recycleSurplusEngines.replace('{gain}', surplusEngineGain)}
                            </button>
                        </div>`}

                        <div class="zb-storage-2col">
                            <div class="zb-armory-grid-scroll">
                                ${leftGridHTML || `<div style="grid-column:1/-1;text-align:center;color:#71717a;padding:24px;">Vide</div>`}
                            </div>
                            <div class="zb-inspector-col">
                                ${rightDetailHTML}
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('close-storage-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                overlay.querySelectorAll('[data-st-tab]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        storageTab = btn.getAttribute('data-st-tab');
                        selectedId = null;
                        renderStorage();
                    });
                });

                document.getElementById('st-filter-set')?.addEventListener('change', (e) => {
                    filterSet = e.target.value;
                    renderStorage();
                });

                overlay.querySelectorAll('[data-st-slot]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        filterSlot = parseInt(btn.getAttribute('data-st-slot'), 10) || 0;
                        renderStorage();
                    });
                });

                overlay.querySelectorAll('[data-st-pick]').forEach(tile => {
                    tile.addEventListener('click', () => {
                        selectedId = tile.getAttribute('data-st-pick');
                        renderStorage();
                    });
                });

                document.getElementById('st-btn-lock')?.addEventListener('click', () => {
                    const d = bs.craftedDiscs.find(x => x.uid === selectedId);
                    if (d) {
                        d.locked = !d.locked;
                        bridge.saveState(st);
                        renderStorage();
                    }
                });

                document.getElementById('st-btn-trash')?.addEventListener('click', () => {
                    const idx = bs.craftedDiscs.findIndex(x => x.uid === selectedId);
                    if (idx !== -1) {
                        const d = bs.craftedDiscs[idx];
                        if (d.locked || getDiscOwner(st, d.uid)) return;
                        const gain = calcDiscDismantleGain(d);
                        bs.craftedDiscs.splice(idx, 1);
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        selectedId = null;
                        bridge.saveState(st);
                        renderStorage();
                    }
                });

                document.getElementById('st-btn-up')?.addEventListener('click', () => {
                    const d = bs.craftedDiscs.find(x => x.uid === selectedId);
                    if (d && d.level < 15 && st.residual >= 4) {
                        st.residual -= 4;
                        upgradeDiscOneStep(d);
                        bridge.saveState(st);
                        renderStorage();
                    }
                });

                document.getElementById('st-batch-dismantle')?.addEventListener('click', () => {
                    if (unownedLv0Discs.length === 0) return;
                    const toRemove = new Set(unownedLv0Discs.map(d => d.uid));
                    bs.craftedDiscs = bs.craftedDiscs.filter(d => !toRemove.has(d.uid));
                    st.residual += batchDiscGain;
                    st.totalDupesRes = (st.totalDupesRes || 0) + batchDiscGain;
                    selectedId = null;
                    bridge.saveState(st);
                    renderStorage();
                });

                document.getElementById('st-btn-recycle-1-eng')?.addEventListener('click', () => {
                    const selE = ownedEngines.find(e => e.rawKey === selectedId);
                    if (selE && (st.inventory[selE.id]?.count || 0) > 1) {
                        st.inventory[selE.id].count -= 1;
                        const gain = selE.rank === 'S' ? 40 : (selE.rank === 'A' ? 10 : 3);
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        bridge.saveState(st);
                        renderStorage();
                    }
                });

                document.getElementById('st-batch-engines')?.addEventListener('click', () => {
                    if (surplusEngineGain <= 0) return;
                    ownedEngines.forEach(e => {
                        if ((st.inventory[e.id]?.count || 0) > 1) {
                            st.inventory[e.id].count = 1;
                        }
                    });
                    st.residual += surplusEngineGain;
                    st.totalDupesRes = (st.totalDupesRes || 0) + surplusEngineGain;
                    bridge.saveState(st);
                    renderStorage();
                });
            }

            renderStorage();
        }

        // ========================================================
        // 10. STUDIO D'ACCORDAGE ELFY (SANS CALIBRATEUR -> PRIX ×2 SI STAT CHOISIE)
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
                bardicSetKey = prof.sets4[0] || allSets[0]?.rawKey || '';
            }

            let setSearch = '';
            let selectedMainStat = '';
            let lastCraftedList = [];

            function renderBardic() {
                const t = B();
                const prof = getGuideProfile(selectedAgentKey);
                const filteredSets = allSets.filter(s => {
                    if (!setSearch.trim()) return true;
                    const q = setSearch.trim().toLowerCase();
                    return bridge.itemName(s).toLowerCase().includes(q) || s.rawKey.toLowerCase().includes(q);
                });

                filteredSets.sort((a, b) => {
                    const aRec = prof.sets4.includes(a.rawKey) ? 2 : (prof.sets2.includes(a.rawKey) ? 1 : 0);
                    const bRec = prof.sets4.includes(b.rawKey) ? 2 : (prof.sets2.includes(b.rawKey) ? 1 : 0);
                    if (aRec !== bRec) return bRec - aRec;
                    return getFreeGachaDiscCount(st, b.rawKey) - getFreeGachaDiscCount(st, a.rawKey);
                });

                const currentSet = allSets.find(s => s.rawKey === bardicSetKey) || allSets[0];
                const freeForCurrentSet = getFreeGachaDiscCount(st, bardicSetKey);
                const variableMainKeys = bardicSlot >= 4 ? Object.keys(PARTITION_WEIGHTS[bardicSlot]) : [];
                const activeAgent = pool.allCatalog.find(i => i.type === 'agent' && i.rawKey === selectedAgentKey);

                // Multiplicateur ×2 si une Main Stat précise est choisie sur Partition 4, 5 ou 6 (Point 4)
                const isTargeted = !!(selectedMainStat && bardicSlot >= 4 && PARTITION_WEIGHTS[bardicSlot][selectedMainStat]);
                const mult = isTargeted ? 2 : 1;

                const costRes1 = 10 * mult;
                const costRes5 = 50 * mult;
                const costPoly1 = 80 * mult;
                const costFree1 = 1 * mult;

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:1000px;">
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
                                        const isGuideRec = prof.sets4.includes(s.rawKey) || prof.sets2.includes(s.rawKey);
                                        return `
                                        <div class="zb-set-card ${s.rawKey === bardicSetKey ? 'active' : ''}" data-bset="${s.rawKey}">
                                            <img src="${s.img}" alt="${bridge.itemName(s)}">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                    ${isGuideRec ? '⭐ ' : ''}${bridge.itemName(s)}
                                                </div>
                                                <span style="font-family:monospace;font-size:9.5px;color:${freeStock > 0 ? '#4ade80' : '#a1a1aa'};">
                                                    ${freeStock > 0 ? `💿 ${freeStock} gratuits` : `×${countCrafted} gravés`}
                                                </span>
                                            </div>
                                        </div>`;
                                    }).join('')}
                                </div>
                            </div>

                            <div style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;background:#0c0c12;border:1px solid #262632;border-radius:18px;padding:14px;">
                                <div style="display:flex;flex-direction:column;gap:9px;">
                                    <div style="display:flex;align-items:center;gap:10px;">
                                        <img src="${currentSet ? currentSet.img : ''}" style="width:42px;height:42px;border-radius:999px;">
                                        <div>
                                            <span style="font-size:9px;font-weight:900;color:#d7f70c;text-transform:uppercase;">PISTE SÉLECTIONNÉE • 100% UP</span>
                                            <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:15px;color:#fff;text-transform:uppercase;">
                                                ${currentSet ? bridge.itemName(currentSet) : bardicSetKey}
                                            </h3>
                                        </div>
                                    </div>

                                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;">
                                        <button type="button" class="gacha-col-filter-btn ${bardicSlot === 0 ? 'active' : ''}" data-bslot="0" style="grid-column:span 2;">${t.randomPartition}</button>
                                        ${[1, 2, 3, 4, 5, 6].map(n => `
                                            <button type="button" class="gacha-col-filter-btn ${bardicSlot === n ? 'active' : ''}" data-bslot="${n}">[${n}]</button>
                                        `).join('')}
                                    </div>

                                    ${variableMainKeys.length > 0 ? `
                                    <div style="display:flex;flex-direction:column;gap:5px;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;">
                                            <span style="font-size:10.5px;font-weight:800;color:#a1a1aa;">${t.orientationLabel}</span>
                                            ${isTargeted ? `<span class="gacha-quest-prog done">${t.targetedPriceTag.replace('{stat}', tStat(selectedMainStat))}</span>` : ''}
                                        </div>
                                        <select id="bardic-main-select" class="gacha-col-search" style="width:100%;border-color:${isTargeted ? '#d7f70c' : '#2c2c36'};">
                                            <option value="">${t.standardWeighted}</option>
                                            ${variableMainKeys.map(k => `<option value="${k}" ${selectedMainStat === k ? 'selected' : ''}>🎯 ${tStat(k)} — Prix ×2 (${Math.round(PARTITION_WEIGHTS[bardicSlot][k] * 100)}% base)</option>`).join('')}
                                        </select>
                                    </div>` : ''}
                                </div>

                                <div style="display:flex;flex-direction:column;gap:6px;max-height:155px;overflow-y:auto;">
                                    ${lastCraftedList.map(d => `
                                        <div style="background:#141520;border:1.5px solid #d7f70c;border-radius:12px;padding:7px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-size:10px;font-weight:900;color:#d7f70c;">
                                                    [${d.slot}] ${tStat(d.mainStat)} (${formatMainStatValue(d.mainStat, d.level)}) • ${d.isFourLiner ? '★ 4-Liner' : '3-Liner'}
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

                                <div style="display:flex;flex-direction:column;gap:6px;">
                                    ${freeForCurrentSet >= costFree1 ? `
                                    <button type="button" class="gacha-shop-btn primary-emerald" id="btn-craft-free">
                                        ${t.tuneFreeStock.replace('{c}', costFree1).replace('{n}', freeForCurrentSet)}
                                    </button>` : ''}
                                    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
                                        <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-1" ${st.residual < costRes1 ? 'disabled' : ''}>${t.tune1Res.replace('{cost}', costRes1)}</button>
                                        <button type="button" class="gacha-shop-btn primary-purple" id="btn-craft-5" ${st.residual < costRes5 ? 'disabled' : ''}>${t.tune5Res.replace('{cost}', costRes5)}</button>
                                        <button type="button" class="gacha-shop-btn primary-cyan" id="btn-craft-poly" ${st.polychromes < costPoly1 ? 'disabled' : ''}>${t.tune1Poly.replace('{cost}', costPoly1)}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('close-bardic-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
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

                function executeCraft(count, mode = 'res') {
                    const forceStat = isTargeted ? selectedMainStat : null;
                    if (mode === 'free') {
                        if (getFreeGachaDiscCount(st, bardicSetKey) < costFree1) return;
                        bs.usedGachaDiscs[bardicSetKey] = (bs.usedGachaDiscs[bardicSetKey] || 0) + costFree1;
                    } else if (mode === 'poly') {
                        const needed = costPoly1 * count;
                        if (st.polychromes < needed) return;
                        st.polychromes -= needed;
                    } else {
                        const needed = costRes1 * count;
                        if (st.residual < needed) return;
                        st.residual -= needed;
                    }
                    lastCraftedList = [];
                    for (let i = 0; i < count; i++) {
                        const d = generateSRankDisc(bardicSetKey, bardicSlot, forceStat);
                        bs.craftedDiscs.unshift(d);
                        lastCraftedList.push(d);
                    }
                    bridge.saveState(st);
                    renderBardic();
                }

                document.getElementById('btn-craft-free')?.addEventListener('click', () => executeCraft(1, 'free'));
                document.getElementById('btn-craft-1')?.addEventListener('click', () => executeCraft(1, 'res'));
                document.getElementById('btn-craft-5')?.addEventListener('click', () => executeCraft(5, 'res'));
                document.getElementById('btn-craft-poly')?.addEventListener('click', () => executeCraft(1, 'poly'));

                overlay.querySelectorAll('[data-quick-equip]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const uid = btn.getAttribute('data-quick-equip');
                        const sl = parseInt(btn.getAttribute('data-qslot'), 10);
                        if (selectedAgentKey && uid && sl) {
                            equipDiscUnique(st, selectedAgentKey, sl, uid);
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
        // 11. SALLE DES TROPHÉES : BADGES DE MAÎTRISE & ESCOUADES
        // ========================================================
        let badgeFilter = 'all';

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

            badges.push({
                id: 'series_all_discs',
                cat: 'mastery',
                emoji: '💿',
                title: isEn ? 'Master Vinyl Collector' : 'Maître Disquaire de New Eridu',
                desc: isEn ? 'Unlock all Drive Disc sets in your Collection.' : 'Débloquer l\'intégralité des Sets de Disques dans la Collection.',
                cur: ownedDiscs,
                max: allDiscs.length || 30,
                reward: 1600
            });

            badges.push({
                id: 'series_craft_20',
                cat: 'mastery',
                emoji: '🎵',
                title: isEn ? 'Bardic Needle Regular' : 'Habitué de Bardic Needle',
                desc: isEn ? 'Tune 20 S-Rank Drive Discs in Elfy\'s Studio.' : 'Graver 20 Disques de Poussée de Rang S dans le Studio d\'Accordage.',
                cur: Math.min(20, bs.craftedDiscs.length),
                max: 20,
                reward: 800
            });

            badges.push({
                id: 'series_lv15_6',
                cat: 'mastery',
                emoji: '⚡',
                title: isEn ? 'Full Resonance (+15 Set)' : 'Résonance Maximale (6 Disques +15)',
                desc: isEn ? 'Upgrade 6 S-Rank Drive Discs to Level +15.' : 'Améliorer 6 Disques de Rang S jusqu\'au niveau maximal +15.',
                cur: Math.min(6, lv15Count),
                max: 6,
                reward: 1000
            });

            badges.push({
                id: 'series_god_roll',
                cat: 'mastery',
                emoji: '🎲',
                title: isEn ? 'Statistical Miracle (+4 / +5 Roll)' : 'Miracle Statistique (+4 / +5 Roll)',
                desc: isEn ? 'Hit at least +4 upgrades on a single Drive Disc substat.' : 'Obtenir au moins +4 améliorations sur une seule sous-statistique de Disque S.',
                cur: hasGodRoll ? 1 : 0,
                max: 1,
                reward: 1200
            });

            badges.push({
                id: 'series_overclock_m6',
                cat: 'mastery',
                emoji: '🌈',
                title: isEn ? 'Beyond Limits (M6+ Overclock)' : 'Au-Delà des Limites (Surcharge M6+)',
                desc: isEn ? 'Obtain an 8th copy of any Agent to awaken Prismatic Overclock.' : 'Obtenir un 8e exemplaire d\'un même Agent pour éveiller sa Surcharge Prismatique.',
                cur: hasOverclock ? 1 : 0,
                max: 1,
                reward: 1200
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
                    id: `fac_${facName}`,
                    cat: 'squads',
                    icon: `assets/Faction/${facName}.webp`,
                    title: `${facName}`,
                    desc: isEn ? `Recruit all ${members.length} Agents from ${facName}.` : `Recruter les ${members.length} Agents de l'escouade ${facName}.`,
                    cur: ownedCount,
                    max: members.length,
                    reward: 800,
                    members
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
            const filtered = badgeFilter === 'all' ? allBadges : allBadges.filter(b => b.cat === badgeFilter);

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-badges-summary">
                        <div>
                            <h2 class="gacha-sec-title">${t.badgesTitle}</h2>
                            <p class="gacha-sec-sub">${t.badgesSub}</p>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
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
                                    <div style="width:48px;height:48px;border-radius:14px;background:#09090d;border:1.5px solid #2b2b36;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:22px;">
                                        ${b.icon ? `<img src="${b.icon}" style="width:36px;height:36px;object-fit:contain;" onerror="this.outerHTML='🏅'">` : b.emoji}
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

        // ========================================================
        // 12. INJECTION DES ONGLETS & FERMETURE UNIVERSELLE AU CLIC AUTOUR (POINT 2)
        // ========================================================
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

            // Active la fermeture universelle en cliquant autour de n'importe quelle pop-up (Point 2)
            const animOverlay = document.getElementById('gacha-anim-overlay');
            if (animOverlay && !animOverlay.__zbBackdropBound) {
                animOverlay.__zbBackdropBound = true;
                animOverlay.addEventListener('mousedown', (ev) => {
                    if (ev.target === animOverlay && animOverlay.querySelector('.zb-armory-modal, .gacha-dialog-box, .zb-modal-box')) {
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
