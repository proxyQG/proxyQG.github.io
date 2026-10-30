// gacha/gacha-builds.js - Studio de Builds ZZZ, Moteur Mathématique de Disques Rang S, Accordage Elfy & Salle des Trophées (FR / EN)
(function () {
    try {
        // ========================================================
        // 1. DICTIONNAIRE BILINGUE FR / EN COMPLET (POINT 5)
        // ========================================================
        const BUILDS_I18N = {
            fr: {
                tabBuilds: "🛠️ Builds",
                tabBadges: "🏆 Badges",
                noAgentsTitle: "Aucun Agent débloqué",
                noAgentsDesc: "Effectuez des Recherches de Signal sur le Canal Unifié pour recruter votre premier Agent et débloquer son studio de Build !",
                bardicBtnTitle: "Studio Disques (Elfy)",
                bardicBtnSub: "{n} Disques S • 🎯 {cal} Calibrateur(s)",
                overclockBanner: "⚡ SURCHARGE PRISMATIQUE ★{lvl} (+{pct}% TOUTES STATS)",
                subStats: "Stats de base",
                subSkills: "Compétences",
                subEquip: "Équipement",
                effectiveSubs: "Nombre de stats secondaires effectives :",
                combatEval: "Évaluation de préparation au combat",
                skillsTag: "ENTRAÎNEMENT D'AGENT • MAX NIV. {max}",
                skillsTitle: "Amélioration des Compétences",
                skillsDesc: "Améliorez les 5 compétences de l'Agent avec vos Signaux résiduels (✦) ou vos Polychromes pour booster ses statistiques et son score de combat.",
                skillNames: ["Attaque Normale", "Esquive", "Soutien", "Attaque Spéciale EX", "Enchaînement & Ultime"],
                skillShort: ["Normale", "Esquive", "Soutien", "Spéciale", "Ultime"],
                skillBonusDesc: ["ATQ de base +{val} & DGT Normaux", "ATQ +{val} & Réflexes d'Esquive", "ATQ +{val} & Impact de Soutien", "ATQ +{val} & DGT Spéciaux EX", "ATQ +{val} & DGT d'Ultime"],
                upgradeRes: "Niv. +1 ({cost} ✦)",
                upgradePoly: "Niv. +1 ({cost} Poly)",
                upgradeMax: "NIVEAU MAX ✓",
                equipTag: "LECTEUR DE DISQUES & MOTEUR-AMPLI",
                equipTitle: "Roue d'Équipement",
                autoEquip: "⚡ Équipement Auto",
                emptySlot: "Vide",
                engineSlot: "Moteur-Ampli",
                noEngineEquipped: "Aucun Moteur-Ampli équipé (Cliquer pour choisir)",
                activeSetBonuses: "Bonus de Sets Actifs (2P / 4P)",
                noSetBonus: "Équipez 2 ou 4 disques d'un même set pour activer ses bonus.",
                piece2: "2-Pièces",
                piece4: "4-Pièces",
                slotModalTitle: "Partition [{slot}] — Disque de Poussée",
                openStudioSlot: "🎵 Graver Partition [{slot}]",
                mainStatLabel: "Stat Principale",
                upStepBtn: "Améliorer +{lvl} (4 ✦)",
                upMaxBtn: "Max +15 ({cost} ✦)",
                availableSlotDiscs: "Disques Rang S disponibles pour la Partition [{slot}] ({n}) :",
                noDiscInSlot: "Aucun disque équipé sur la Partition [{slot}]. Cliquez sur « Graver Partition [{slot}] » pour en créer un !",
                bardicTag: "BARDIC NEEDLE • STUDIO D'ACCORDAGE RANG S",
                bardicTitle: "Graver des Disques de Poussée",
                searchSetPlaceholder: "Rechercher un Set de Disques...",
                randomPartition: "Aléatoire (I–VI)",
                partitionN: "Partition [{n}]",
                orientationLabel: "🎯 Orientation Stat Principale (1 Calibrateur si ciblée) :",
                standardWeighted: "Tirage pondéré standard (0 🎯)",
                tune1Res: "🎵 Accordage ×1 (10 ✦)",
                tune5Res: "🎵 Accordage ×5 (50 ✦)",
                tune1Poly: "🎵 Accordage ×1 (80 Poly)",
                equipNow: "Équiper sur {name}",
                equippedTag: "Équipé ✓",
                dismantleBtn: "+3 ✦",
                badgesTitle: "🏆 Salle des Trophées : Séries & Factions",
                badgesSub: "Complétez les escouades de New Eridu et les défis d'accordage de disques pour gagner des Polychromes.",
                badgesUnlockedCount: "Badges débloqués : {u} / {t}",
                filterAllBadges: "Tous ({n})",
                filterMastery: "Maîtrise & Disques",
                filterSquads: "Escouades & Factions",
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
                    "PV (flat)": "PV (flat)",
                    "ATQ (flat)": "ATQ (flat)",
                    "DÉF (flat)": "DÉF (flat)",
                    "PV%": "PV%",
                    "ATQ%": "ATQ%",
                    "DÉF%": "DÉF%",
                    "PÉN (flat)": "PÉN (flat)",
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
                bardicBtnSub: "{n} S-Discs • 🎯 {cal} Calibrator(s)",
                overclockBanner: "⚡ PRISMATIC OVERCLOCK ★{lvl} (+{pct}% ALL STATS)",
                subStats: "Base Stats",
                subSkills: "Skills",
                subEquip: "Equipment",
                effectiveSubs: "Effective Sub-Stat Rolls:",
                combatEval: "Combat Readiness Evaluation",
                skillsTag: "AGENT TRAINING • MAX LV. {max}",
                skillsTitle: "Skill Enhancement",
                skillsDesc: "Upgrade your Agent's 5 combat skills using Residual Signals (✦) or Polychromes to boost their stats and Combat Readiness.",
                skillNames: ["Basic Attack", "Dodge", "Assist", "EX Special Attack", "Chain Attack & Ultimate"],
                skillShort: ["Basic", "Dodge", "Assist", "Special", "Ultimate"],
                skillBonusDesc: ["Base ATK +{val} & Basic DMG", "ATK +{val} & Dodge Counter", "ATK +{val} & Assist Impact", "ATK +{val} & EX Special DMG", "ATK +{val} & Ultimate DMG"],
                upgradeRes: "Lv. +1 ({cost} ✦)",
                upgradePoly: "Lv. +1 ({cost} Poly)",
                upgradeMax: "MAX LEVEL ✓",
                equipTag: "DRIVE DISC PLAYER & W-ENGINE",
                equipTitle: "Equipment Wheel",
                autoEquip: "⚡ Auto-Equip",
                emptySlot: "Empty",
                engineSlot: "W-Engine",
                noEngineEquipped: "No W-Engine equipped (Click to select)",
                activeSetBonuses: "Active Set Bonuses (2P / 4P)",
                noSetBonus: "Equip 2 or 4 discs from the same set to activate set bonuses.",
                piece2: "2-Piece",
                piece4: "4-Piece",
                slotModalTitle: "Partition [{slot}] — Drive Disc",
                openStudioSlot: "🎵 Tune Partition [{slot}]",
                mainStatLabel: "Main Stat",
                upStepBtn: "Upgrade +{lvl} (4 ✦)",
                upMaxBtn: "Max +15 ({cost} ✦)",
                availableSlotDiscs: "Available S-Rank Discs for Partition [{slot}] ({n}):",
                noDiscInSlot: "No disc equipped in Partition [{slot}]. Click 'Tune Partition [{slot}]' to craft one!",
                bardicTag: "BARDIC NEEDLE • S-RANK TUNING STUDIO",
                bardicTitle: "Tune S-Rank Drive Discs",
                searchSetPlaceholder: "Search a Drive Disc Set...",
                randomPartition: "Random (I–VI)",
                partitionN: "Partition [{n}]",
                orientationLabel: "🎯 Main Stat Orientation (1 Calibrator if targeted):",
                standardWeighted: "Standard weighted roll (0 🎯)",
                tune1Res: "🎵 Tune ×1 (10 ✦)",
                tune5Res: "🎵 Tune ×5 (50 ✦)",
                tune1Poly: "🎵 Tune ×1 (80 Poly)",
                equipNow: "Equip on {name}",
                equippedTag: "Equipped ✓",
                dismantleBtn: "+3 ✦",
                badgesTitle: "🏆 Trophy Room: Series & Factions",
                badgesSub: "Complete New Eridu squads and Drive Disc tuning challenges to earn Polychrome rewards.",
                badgesUnlockedCount: "Unlocked Badges: {u} / {t}",
                filterAllBadges: "All ({n})",
                filterMastery: "Mastery & Discs",
                filterSquads: "Squads & Factions",
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
                    "PV (flat)": "HP (Flat)",
                    "ATQ (flat)": "ATK (Flat)",
                    "DÉF (flat)": "DEF (Flat)",
                    "PV%": "HP%",
                    "ATQ%": "ATK%",
                    "DÉF%": "DEF%",
                    "PÉN (flat)": "PEN (Flat)",
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
        // 2. MOTEUR MATHÉMATIQUE OFFICIEL DES DISQUES RANG S
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
            return sub.isPct ? `+${raw.toFixed(1)}%` : `+${Math.round(raw)}`;
        }

        // ========================================================
        // 3. ÉTAT ÉTENDU & ICÔNES EXACTES (POINT 2)
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

        // Utilise exactement les fichiers présents dans ton dossier assets/Skills/ (image_09c11b.png)
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
                    calibrators: 2,
                    claimedBadges: {}
                };
            }
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
                    if (base.rec.includes(sub.key) || sub.key === 'Taux CRIT' || sub.key === 'Dégâts CRIT' || sub.key === 'ATQ%') {
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
                recList: base.rec
            };
        }

        // ========================================================
        // 4. RENDU DE L'ONGLET « BUILDS » & SES 3 MENUS
        // ========================================================
        let selectedAgentKey = '';
        let currentSubMenu = 'stats';
        let bardicSetKey = '';
        let bardicSlot = 0;

        function getOwnedAgents(st, pool) {
            return pool.allCatalog.filter(i => i.type === 'agent' && (st.inventory[i.id]?.count || 0) > 0);
        }

        function renderBuildsTab(mount) {
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
                        <button type="button" class="zb-bardic-cta" id="btn-open-bardic-needle">
                            <span class="zb-bardic-cta-icon">💿</span>
                            <div class="zb-bardic-cta-txt">
                                <span class="zb-bardic-cta-title">${t.bardicBtnTitle}</span>
                                <span class="zb-bardic-cta-sub">${t.bardicBtnSub.replace('{n}', bs.craftedDiscs.length).replace('{cal}', bs.calibrators || 0)}</span>
                            </div>
                        </button>
                    </div>

                    <div class="zb-stage">
                        <div class="zb-agent-showcase ${calc.overclockLvl > 0 ? 'overclocked' : ''}">
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

            document.getElementById('btn-open-bardic-needle')?.addEventListener('click', () => {
                openBardicNeedleModal(mount);
            });

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
                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? t.piece4 : t.piece2} : ${name}</span>`;
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

        // --- MENU 2 : COMPÉTENCES (AVEC TES VRAIES IMAGES ASSETS/SKILLS/*.WEBP) ---
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
                    <h3 class="gacha-panel-title" style="font-size:22px;">${t.skillsTitle}</h3>
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
                            <span style="font-size:9.5px;font-weight:900;text-transform:uppercase;color:#e4e4e7;text-align:center;">${t.skillShort[idx]}</span>
                            <div class="zb-skill-lvl-pill">
                                <span style="color:${lv >= maxCap ? '#d7f70c' : '#fff'};">${String(lv).padStart(2, '0')}</span>
                                <span class="max">/${maxCap}</span>
                            </div>
                        </div>`;
                    }).join('')}
                </div>

                <div style="background:#0c0c12;border:1.5px solid #272733;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;">
                        <strong style="font-family:'Montserrat',sans-serif;font-size:14px;text-transform:uppercase;color:#fff;">
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

        // --- MENU 3 : COCKPIT D'ÉQUIPEMENT 2 COLONNES (POINT 4) ---
        function renderSubMenuEquip(st, pool, bs, agent, ab, calc, bridge, t) {
            const engObj = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;
            const engCount = engObj ? Math.min(5, st.inventory[engObj.id]?.count || 1) : 0;

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
                    <span style="font-size:10.5px;font-weight:800;color:${disc ? '#fff' : '#71717a'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;">
                        ${disc ? `${tStat(disc.mainStat)} (${formatMainStatValue(disc.mainStat, disc.level)})` : t.emptySlot}
                    </span>
                    <span style="font-family:monospace;font-size:9.5px;font-weight:900;color:#d7f70c;">${disc ? `+${disc.level}` : '➕'}</span>
                </div>`;
            }).join('');

            const activeSets = Object.entries(calc.setCounts).filter(([, c]) => c >= 2);

            return `
                <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                    <div>
                        <span class="gacha-patch-tag">${t.equipTag}</span>
                        <h3 class="gacha-panel-title" style="font-size:20px;">${t.equipTitle}</h3>
                    </div>
                    <div style="display:flex;gap:6px;">
                        <button type="button" class="gacha-details-btn accent" id="btn-equip-open-studio">🎵 ${t.bardicBtnTitle}</button>
                        <button type="button" class="gacha-details-btn" id="btn-auto-equip">${t.autoEquip}</button>
                    </div>
                </div>

                <div class="zb-equip-cockpit">
                    <!-- Gauche : Roue Mécanique 6 Partitions + Moteur Central -->
                    <div class="zb-hex-housing">
                        <span class="zb-driver-plaque">DRIVER</span>
                        ${nodesHTML}
                        <div class="zb-wengine-core" id="btn-wheel-wengine" title="${t.engineSlot}">
                            ${engObj
                                ? `<img src="${engObj.img}" alt="${bridge.itemName(engObj)}"><span class="zb-slot-tag" style="border-color:#facc15;color:#facc15;">${engObj.rank} ★${engCount}</span>`
                                : `<span style="font-size:26px;color:#52525b;">➕</span><span class="zb-slot-tag">${t.engineSlot}</span>`
                            }
                        </div>
                    </div>

                    <!-- Droite : Inspecteur de Moteur, Bonus de Sets & Liste des 6 Partitions -->
                    <div class="zb-equip-details">
                        <div class="zb-equip-wcard" id="btn-card-wengine">
                            <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                                ${engObj
                                    ? `<img src="${engObj.img}" style="width:42px;height:42px;object-fit:contain;background:#000;border-radius:10px;padding:3px;">`
                                    : `<div style="width:42px;height:42px;border-radius:10px;background:#181822;display:flex;align-items:center;justify-content:center;font-size:18px;">⚙️</div>`
                                }
                                <div style="min-width:0;">
                                    <span style="font-size:9.5px;font-weight:900;color:#facc15;text-transform:uppercase;display:block;">${t.engineSlot}</span>
                                    <strong style="font-family:'Montserrat',sans-serif;font-size:12px;color:#fff;text-transform:uppercase;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                        ${engObj ? bridge.itemName(engObj) : t.noEngineEquipped}
                                    </strong>
                                </div>
                            </div>
                            <span class="gacha-quest-prog done">${engObj ? `★${engCount}` : '✎'}</span>
                        </div>

                        <div style="background:#0b0b11;border:1px solid #252532;border-radius:12px;padding:8px 10px;">
                            <span style="font-size:9.5px;font-weight:900;color:#a1a1aa;text-transform:uppercase;display:block;margin-bottom:5px;">${t.activeSetBonuses}</span>
                            ${activeSets.length === 0
                                ? `<span style="font-size:11px;color:#71717a;">${t.noSetBonus}</span>`
                                : `<div style="display:flex;gap:5px;flex-wrap:wrap;">${activeSets.map(([sk, cnt]) => {
                                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? t.piece4 : t.piece2} : ${dObj ? bridge.itemName(dObj) : sk}</span>`;
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

            document.getElementById('btn-wheel-wengine')?.addEventListener('click', () => openWEngineSelectorModal(mount, st, pool, agent, ab));
            document.getElementById('btn-card-wengine')?.addEventListener('click', () => openWEngineSelectorModal(mount, st, pool, agent, ab));
            document.getElementById('btn-equip-open-studio')?.addEventListener('click', () => openBardicNeedleModal(mount));

            mount.querySelectorAll('[data-wheel-slot]').forEach(node => {
                node.addEventListener('click', () => {
                    const slotNum = parseInt(node.getAttribute('data-wheel-slot'), 10);
                    openSlotInspectorModal(mount, st, pool, bs, agent, ab, slotNum);
                });
            });

            document.getElementById('btn-auto-equip')?.addEventListener('click', () => {
                const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
                if (ownedEngines.length > 0) {
                    ownedEngines.sort((a, b) => (a.rank === 'S' ? -1 : 1) - (b.rank === 'S' ? -1 : 1));
                    ab.engineKey = ownedEngines[0].rawKey;
                }
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
        // 5. MODALES D'INSPECTION DE PARTITION & STUDIO ELFY (POINT 6 & 7)
        // ========================================================
        function openWEngineSelectorModal(mount, st, pool, agent, ab) {
            const bridge = window.ZZZGachaBridge;
            const t = B();
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const ownedEngines = pool.allCatalog.filter(i => i.type === 'engine' && (st.inventory[i.id]?.count || 0) > 0);
            overlay.classList.add('active');
            overlay.innerHTML = `
                <div class="gacha-dialog-box" style="max-width:740px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <h2 class="gacha-panel-title">${t.engineSlot} (${ownedEngines.length})</h2>
                        <button type="button" class="gacha-res-btn" id="close-we-sel">${t.close}</button>
                    </div>
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
                    </div>
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
            const t = B();
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            function renderSlotModal() {
                const slotDiscs = bs.craftedDiscs.filter(d => d.slot === slotNum);
                const eqDisc = ab.discs[slotNum] ? bs.craftedDiscs.find(d => d.uid === ab.discs[slotNum]) : null;
                const setObj = eqDisc ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === eqDisc.setKey) : null;

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:760px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
                            <div>
                                <span class="gacha-patch-tag">PARTITION [${slotNum}] • S-RANK</span>
                                <h2 class="gacha-panel-title" style="font-size:22px;">${t.slotModalTitle.replace('{slot}', slotNum)}</h2>
                            </div>
                            <div style="display:flex;gap:8px;">
                                <button type="button" class="gacha-details-btn accent" id="btn-slot-goto-bardic">${t.openStudioSlot.replace('{slot}', slotNum)}</button>
                                <button type="button" class="gacha-res-btn" id="close-slot-modal">${t.close}</button>
                            </div>
                        </div>

                        ${eqDisc ? `
                        <div style="background:#0d0d13;border:1.5px solid #facc15;border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:12px;">
                            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <img src="${setObj ? setObj.img : ''}" style="width:54px;height:54px;border-radius:999px;object-fit:cover;">
                                    <div>
                                        <span style="font-size:10px;font-weight:900;color:#facc15;text-transform:uppercase;">
                                            ${eqDisc.isFourLiner ? '★ 4-LINER NATIF' : '3-LINER'} • +${eqDisc.level} / 15
                                        </span>
                                        <h3 style="margin:2px 0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#fff;text-transform:uppercase;">
                                            ${setObj ? bridge.itemName(setObj) : eqDisc.setKey} [${slotNum}]
                                        </h3>
                                        <span style="font-family:monospace;font-size:13px;font-weight:900;color:#d7f70c;">
                                            ${t.mainStatLabel} : ${tStat(eqDisc.mainStat)} (${formatMainStatValue(eqDisc.mainStat, eqDisc.level)})
                                        </span>
                                    </div>
                                </div>
                                <div style="display:flex;gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-up-disc-step" style="width:auto;padding:9px 14px;" ${eqDisc.level >= 15 || st.residual < 4 ? 'disabled' : ''}>
                                        ${eqDisc.level >= 15 ? t.upgradeMax : t.upStepBtn.replace('{lvl}', eqDisc.level + 3)}
                                    </button>
                                    <button type="button" class="gacha-shop-btn primary-purple" id="btn-up-disc-max" style="width:auto;padding:9px 14px;" ${eqDisc.level >= 15 || st.residual < ((15 - eqDisc.level) / 3) * 4 ? 'disabled' : ''}>
                                        ${t.upMaxBtn.replace('{cost}', ((15 - eqDisc.level) / 3) * 4)}
                                    </button>
                                </div>
                            </div>

                            <div class="zb-stats-grid">
                                ${eqDisc.substats.map(sub => `
                                    <div class="zb-stat-row ${sub.upgrades >= 3 ? 'recommended' : ''}">
                                        <span>• ${tStat(sub.key)} ${sub.upgrades > 0 ? `<strong style="color:#d7f70c;">+${sub.upgrades}</strong>` : ''}</span>
                                        <span class="zb-stat-val">${formatSubstatValue(sub)}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : `<div style="padding:18px;background:#0c0c11;border:1px dashed #3f3f4e;border-radius:14px;text-align:center;color:#a1a1aa;font-size:12px;">${t.noDiscInSlot.replace(/\{slot\}/g, slotNum)}</div>`}

                        <div style="font-size:11px;font-weight:900;text-transform:uppercase;color:#a1a1aa;">
                            ${t.availableSlotDiscs.replace('{slot}', slotNum).replace('{n}', slotDiscs.length)}
                        </div>
                        <div class="gacha-selector-scroll custom-scrollbar" style="max-height:220px;">
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
                                        <span style="font-size:11px;font-weight:800;color:#facc15;">${tStat(d.mainStat)} (${formatMainStatValue(d.mainStat, d.level)})</span>
                                        <span style="font-size:10px;color:#a1a1aa;">${d.substats.map(s => `${tStat(s.key)}${s.upgrades > 0 ? '+' + s.upgrades : ''}`).join(', ')}</span>
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

        // Studio d'Accordage Bardic Needle (Elfy) en 2 Colonnes avec Grille de Sets sans barre grise + Double Monnaie (Point 6)
        function openBardicNeedleModal(mount) {
            const bridge = window.ZZZGachaBridge;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const allSets = pool.allCatalog.filter(i => i.type === 'disc');
            if (!bardicSetKey || !allSets.some(s => s.rawKey === bardicSetKey)) {
                bardicSetKey = allSets[0]?.rawKey || '';
            }

            let setSearch = '';
            let selectedMainStat = '';
            let lastCraftedList = [];

            function renderBardic() {
                const t = B();
                const filteredSets = allSets.filter(s => {
                    if (!setSearch.trim()) return true;
                    const q = setSearch.trim().toLowerCase();
                    return bridge.itemName(s).toLowerCase().includes(q) || s.rawKey.toLowerCase().includes(q);
                });

                const currentSet = allSets.find(s => s.rawKey === bardicSetKey) || allSets[0];
                const variableMainKeys = bardicSlot >= 4 ? Object.keys(PARTITION_WEIGHTS[bardicSlot]) : [];
                const activeAgent = pool.allCatalog.find(i => i.type === 'agent' && i.rawKey === selectedAgentKey);

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box" style="max-width:980px;">
                        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
                            <div>
                                <span class="gacha-patch-tag">${t.bardicTag}</span>
                                <h2 class="gacha-panel-title" style="font-size:22px;">${t.bardicTitle}</h2>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                <span class="gacha-reset-pill" style="color:#d7f70c;">Poly : ${st.polychromes}</span>
                                <span class="gacha-reset-pill" style="color:#38bdf8;">🎯 ${bs.calibrators || 0}</span>
                                <button type="button" class="gacha-res-btn" id="close-bardic-modal">${t.close}</button>
                            </div>
                        </div>

                        <div class="zb-bardic-layout">
                            <!-- Colonne Gauche : Sélecteur Visuel de Set en Grille avec Recherche -->
                            <div style="display:flex;flex-direction:column;gap:10px;min-height:0;">
                                <input type="text" id="bardic-set-search" class="gacha-col-search" placeholder="${t.searchSetPlaceholder}" value="${setSearch.replace(/"/g, '&quot;')}" style="width:100%;">
                                <div class="zb-set-grid-scroll">
                                    ${filteredSets.map(s => {
                                        const countCrafted = bs.craftedDiscs.filter(d => d.setKey === s.rawKey).length;
                                        return `
                                        <div class="zb-set-card ${s.rawKey === bardicSetKey ? 'active' : ''}" data-bset="${s.rawKey}">
                                            <img src="${s.img}" alt="${bridge.itemName(s)}">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                    ${bridge.itemName(s)}
                                                </div>
                                                <span style="font-family:monospace;font-size:9.5px;color:#d7f70c;">×${countCrafted} gravés</span>
                                            </div>
                                        </div>`;
                                    }).join('')}
                                </div>
                            </div>

                            <!-- Colonne Droite : Choix de Partition, Orientation & Tirages -->
                            <div style="display:flex;flex-direction:column;justify-content:space-between;gap:12px;background:#0c0c12;border:1px solid #262632;border-radius:18px;padding:14px;">
                                <div style="display:flex;flex-direction:column;gap:10px;">
                                    <div style="display:flex;align-items:center;gap:10px;">
                                        <img src="${currentSet ? currentSet.img : ''}" style="width:44px;height:44px;border-radius:999px;">
                                        <div>
                                            <span style="font-size:9.5px;font-weight:900;color:#d7f70c;text-transform:uppercase;">PISTE SÉLECTIONNÉE • 100% UP</span>
                                            <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:#fff;text-transform:uppercase;">
                                                ${currentSet ? bridge.itemName(currentSet) : bardicSetKey}
                                            </h3>
                                        </div>
                                    </div>

                                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                                        <button type="button" class="gacha-col-filter-btn ${bardicSlot === 0 ? 'active' : ''}" data-bslot="0" style="grid-column:span 2;">${t.randomPartition}</button>
                                        ${[1, 2, 3, 4, 5, 6].map(n => `
                                            <button type="button" class="gacha-col-filter-btn ${bardicSlot === n ? 'active' : ''}" data-bslot="${n}">[${n}]</button>
                                        `).join('')}
                                    </div>

                                    ${variableMainKeys.length > 0 ? `
                                    <div style="display:flex;flex-direction:column;gap:5px;">
                                        <span style="font-size:10.5px;font-weight:800;color:#a1a1aa;">${t.orientationLabel}</span>
                                        <select id="bardic-main-select" class="gacha-col-search" style="width:100%;">
                                            <option value="">${t.standardWeighted}</option>
                                            ${variableMainKeys.map(k => `<option value="${k}" ${selectedMainStat === k ? 'selected' : ''}>${tStat(k)} (${Math.round(PARTITION_WEIGHTS[bardicSlot][k] * 100)}%)</option>`).join('')}
                                        </select>
                                    </div>` : ''}
                                </div>

                                <!-- Résultats des derniers disques gravés avec bouton Équiper direct -->
                                <div style="display:flex;flex-direction:column;gap:6px;max-height:175px;overflow-y:auto;">
                                    ${lastCraftedList.map(d => `
                                        <div style="background:#141520;border:1.5px solid #d7f70c;border-radius:12px;padding:8px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-size:10px;font-weight:900;color:#d7f70c;">
                                                    [${d.slot}] ${tStat(d.mainStat)} (${formatMainStatValue(d.mainStat, d.level)}) • ${d.isFourLiner ? '★ 4-Liner' : '3-Liner'}
                                                </div>
                                                <div style="font-size:9.5px;color:#d4d4d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                    ${d.substats.map(s => `${tStat(s.key)} ${formatSubstatValue(s)}`).join(' | ')}
                                                </div>
                                            </div>
                                            ${activeAgent ? `
                                            <button type="button" class="gacha-claim-btn can-claim" data-quick-equip="${d.uid}" data-qslot="${d.slot}" style="padding:5px 9px;font-size:9.5px;">
                                                ${t.equipNow.replace('{name}', bridge.itemName(activeAgent))}
                                            </button>` : ''}
                                        </div>
                                    `).join('')}
                                </div>

                                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-1" ${st.residual < 10 ? 'disabled' : ''}>${t.tune1Res}</button>
                                    <button type="button" class="gacha-shop-btn primary-purple" id="btn-craft-5" ${st.residual < 50 ? 'disabled' : ''}>${t.tune5Res}</button>
                                    <button type="button" class="gacha-shop-btn primary-cyan" id="btn-craft-poly" ${st.polychromes < 80 ? 'disabled' : ''}>${t.tune1Poly}</button>
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
                });

                function executeCraft(count, usePoly = false) {
                    if (usePoly) {
                        if (st.polychromes < 80 * count) return;
                        st.polychromes -= 80 * count;
                    } else {
                        if (st.residual < 10 * count) return;
                        st.residual -= 10 * count;
                    }
                    let forceStat = null;
                    if (selectedMainStat && bardicSlot >= 4 && (bs.calibrators || 0) >= 1) {
                        forceStat = selectedMainStat;
                        bs.calibrators -= 1;
                    }
                    lastCraftedList = [];
                    for (let i = 0; i < count; i++) {
                        const d = generateSRankDisc(bardicSetKey, bardicSlot, i === 0 ? forceStat : null);
                        bs.craftedDiscs.unshift(d);
                        lastCraftedList.push(d);
                    }
                    bridge.saveState(st);
                    renderBardic();
                }

                document.getElementById('btn-craft-1')?.addEventListener('click', () => executeCraft(1, false));
                document.getElementById('btn-craft-5')?.addEventListener('click', () => executeCraft(5, false));
                document.getElementById('btn-craft-poly')?.addEventListener('click', () => executeCraft(1, true));

                overlay.querySelectorAll('[data-quick-equip]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const uid = btn.getAttribute('data-quick-equip');
                        const sl = parseInt(btn.getAttribute('data-qslot'), 10);
                        if (selectedAgentKey && uid && sl) {
                            const ab = getOrInitAgentBuild(st, selectedAgentKey);
                            ab.discs[sl] = uid;
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
        // 6. SALLE DES TROPHÉES : BADGES DE MAÎTRISE & ESCOUADES AVEC PORTRAITS (POINT 8)
        // ========================================================
        let badgeFilter = 'all'; // 'all' | 'mastery' | 'squads'

        function computeSeriesBadges(st, pool) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            const isEn = (window.ZZZGachaBridge?.getLang?.() || 'fr') === 'en';
            const badges = [];

            // A. Badges de Maîtrise & Équipement (Placés en tête !)
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

            // B. Badges d'Escouades (Factions) avec les portraits de chaque membre
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

            // Tri intelligent : Prêts à récupérer en 1er, puis par pourcentage d'avancement décroissant
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
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'all' ? 'active' : ''}" data-bf="${'all'}">${t.filterAllBadges.replace('{n}', allBadges.length)}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'mastery' ? 'active' : ''}" data-bf="${'mastery'}">${t.filterMastery}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'squads' ? 'active' : ''}" data-bf="${'squads'}">${t.filterSquads}</button>
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
                                    <div style="width:50px;height:50px;border-radius:14px;background:#09090d;border:1.5px solid #2b2b36;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:24px;">
                                        ${b.icon ? `<img src="${b.icon}" style="width:38px;height:38px;object-fit:contain;" onerror="this.outerHTML='🏅'">` : b.emoji}
                                    </div>
                                    <div style="min-width:0;flex:1;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                            <strong style="font-family:'Montserrat',sans-serif;font-size:12.5px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.title}</strong>
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
        // 7. INJECTION DES ONGLETS & SYNCHRO DE LANGUE FR / EN
        // ========================================================
        function injectBuildTabsIntoTopbar() {
            const navPills = document.querySelector('#zzz-gacha-modal .gacha-nav-pills');
            if (!navPills) return;
            const t = B();

            if (!document.getElementById('gtab-lbl-builds')) {
                navPills.style.gridTemplateColumns = 'repeat(6, 1fr)';

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
                document.getElementById('gtab-lbl-builds').textContent = t.tabBuilds;
                document.getElementById('gtab-lbl-badges').textContent = t.tabBadges;
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
