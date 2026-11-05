// showcase/showcase-math.js - Moteur Mathématique FAE V2, Décodage Enka.Network & Calculateur de Dégâts

// URL de ton Cloudflare Worker (si vide, utilise automatiquement le relais Enka direct + profil de démo)
export const WORKER_BASE_URL = 'https://steep-cake-e8d6proxyqg-worker.aloisetienvre5.workers.dev';

// Couleurs officielles par Élément / Agent pour teinter les cartes comme sur FAE
export const ELEMENT_COLORS = {
    Ice: '#e11d48',       // Rouge/Rose Ellen ou Bleu Glace
    Frost: '#0284c7',     // Bleu Miyabi
    Fire: '#7c3aed',      // Violet/Pourpre Evelyn ou Orange Feu
    Electric: '#2563eb',  // Bleu Électrique
    Ether: '#db2777',     // Rose/Magenta Nicole / Vivian / Zhu Yuan
    Physical: '#d97706',  // Ambre/Or Ye Shunguang / Jane / Corin
    Wind: '#0d9488',
    Lumiflux: '#ec4899',
    'Honed Edge': '#ea580c',
    'Auric Ink': '#ca8a04'
};

export const AGENT_CUSTOM_COLORS = {
    Ellen: '#e11d48',
    Evelyn: '#6d28d9',
    Miyabi: '#0284c7',
    'Ye Shunguang': '#c2410c',
    Nicole: '#be185d',
    Jane: '#b45309',
    Yanagi: '#1d4ed8',
    Yixuan: '#a16207',
    Astra: '#9d174d'
};

// Détecte automatiquement la région à partir des premiers chiffres de l'UID ZZZ
export function detectRegionFromUID(uidStr) {
    const s = String(uidStr || '').trim();
    if (s.startsWith('10')) return 'NA';
    if (s.startsWith('13')) return 'ASIA';
    if (s.startsWith('15')) return 'EU';
    if (s.startsWith('17')) return 'TW';
    return 'EU';
}

// Valeurs d'un roll de sous-statistique Rang S Niveau 15 dans ZZZ
export const SUBSTAT_STEP = {
    CR:   { label: 'CR',   full: 'Taux CRIT',           step: 2.4, isPct: true },
    CDMG: { label: 'CDMG', full: 'DGT CRIT',            step: 4.8, isPct: true },
    ATK_: { label: 'ATK%', full: 'ATQ%',                step: 3.0, isPct: true },
    ATK:  { label: 'ATK',  full: 'ATQ',                 step: 19,  isPct: false },
    HP_:  { label: 'HP%',  full: 'PV%',                 step: 3.0, isPct: true },
    HP:   { label: 'HP',   full: 'PV',                  step: 112, isPct: false },
    DEF_: { label: 'DEF%', full: 'DÉF%',                step: 4.8, isPct: true },
    DEF:  { label: 'DEF',  full: 'DÉF',                 step: 15,  isPct: false },
    AP:   { label: 'AP',   full: "Adresse d'anomalie",  step: 9,   isPct: false },
    PEN:  { label: 'PEN',  full: 'PÉN',                 step: 9,   isPct: false }
};

// Profils de sous-stats Major (Poids 1.0) et Minor (Poids 0.4) par archétype ou agent
export function getAgentSubstatWeights(agentName, role = 'Attack') {
    if (agentName === 'Miyabi') {
        return { major: ['ATK_', 'CDMG', 'CR'], minor: ['AP', 'ATK'] };
    }
    if (agentName === 'Yixuan' || agentName === 'Banyue' || agentName === 'Manato') {
        return { major: ['CR', 'CDMG', 'HP_'], minor: ['ATK_', 'HP'] };
    }
    if (role === 'Anomaly' || ['Jane', 'Piper', 'Yanagi', 'Burnice', 'Vivian', 'Alice'].includes(agentName)) {
        return { major: ['AP', 'ATK_'], minor: ['PEN', 'CR', 'ATK'] };
    }
    if (agentName === 'Nicole') {
        return { major: ['AP', 'ATK_'], minor: ['PEN', 'CR', 'ATK'] };
    }
    if (role === 'Defense' || agentName === 'Ben') {
        return { major: ['DEF_', 'CR', 'CDMG'], minor: ['ATK_', 'HP_'] };
    }
    // Par défaut DPS Critique (Ellen, Evelyn, Ye Shunguang, Zhu Yuan, Soldier 11, etc.)
    return { major: ['CDMG', 'ATK_', 'CR'], minor: ['PEN', 'ATK'] };
}

// Calcule la note d'un disque (Z, S+, S, A, B, C, D, E) et ses rolls Major / Minor
export function evaluateSingleDisc(disc, weights) {
    if (!disc || !Array.isArray(disc.substats)) {
        return { grade: 'E', majorRolls: 0, minorRolls: 0, weightedRolls: 0 };
    }
    let majorRolls = 0;
    let minorRolls = 0;

    disc.substats.forEach(sub => {
        const rolls = Math.max(1, Number(sub.rolls) || (1 + (Number(sub.upgrades) || 0)));
        if (weights.major.includes(sub.key)) {
            majorRolls += rolls;
        } else if (weights.minor.includes(sub.key)) {
            minorRolls += rolls;
        }
    });

    const eff = majorRolls + minorRolls * 0.45;
    const isRightSide = Number(disc.slot) >= 4;
    const thresholdOffset = isRightSide ? 1.0 : 0.0;
    const score = eff + thresholdOffset;

    let grade = 'E';
    if (score >= 7.5) grade = 'Z';
    else if (score >= 6.5) grade = 'S+';
    else if (score >= 5.5) grade = 'S';
    else if (score >= 4.5) grade = 'A';
    else if (score >= 3.5) grade = 'B';
    else if (score >= 2.3) grade = 'C';
    else if (score >= 1.0) grade = 'D';

    return { grade, majorRolls, minorRolls, weightedRolls: eff };
}

// Calcule le bilan complet d'un Agent (Stats Initial -> Buffed, Total des Rolls, Rang Leaderboard)
export function evaluateAgentBuild(agentBuild) {
    const weights = getAgentSubstatWeights(agentBuild.name, agentBuild.role);
    let totalMajor = 0;
    let totalMinor = 0;
    const rollSummary = {};

    const evaluatedDiscs = (agentBuild.discs || []).map(d => {
        const ev = evaluateSingleDisc(d, weights);
        totalMajor += ev.majorRolls;
        totalMinor += ev.minorRolls;
        (d.substats || []).forEach(sub => {
            const r = Math.max(1, Number(sub.rolls) || (1 + (Number(sub.upgrades) || 0)));
            if (weights.major.includes(sub.key) || weights.minor.includes(sub.key)) {
                rollSummary[sub.key] = (rollSummary[sub.key] || 0) + r;
            }
        });
        return { ...d, eval: ev };
    });

    // Calcul du Rang et Top % si non fourni par le serveur
    const totalPool = agentBuild.lbTotal || 6181;
    const qualityRatio = Math.min(0.9995, (totalMajor + totalMinor * 0.35) / 43);
    const computedRank = agentBuild.lbRank || Math.max(1, Math.round(totalPool * Math.pow(1 - qualityRatio, 3.2)));
    const topPct = ((computedRank / totalPool) * 100).toFixed(2);

    return {
        ...agentBuild,
        weights,
        discs: evaluatedDiscs,
        totalMajor,
        totalMinor,
        rollSummary,
        lbRank: computedRank,
        lbTotal: totalPool,
        topPct
    };
}

// Simulation mathématique du Calculateur de Dégâts (Image 4 : Evelyn Calculator)
export function computeCalculatorSimulation(agentBuild, customConfig = {}) {
    const baseAtk = Number(customConfig.baseAtk) || 1650;
    const rolls = customConfig.rolls || { ATK_: 11, ATK: 1, CR: 15, CDMG: 13, PEN: 2 };
    const enemyDef = Number(customConfig.enemyDef) || 952;

    const calcDmgWithRolls = (rMap) => {
        const atkPct = 30 + (rMap.ATK_ || 0) * 3.0 + 24; // Slot 6 + Substats + Buffs
        const flatAtk = 316 + (rMap.ATK || 0) * 19;
        const initAtk = Math.round(baseAtk * (1 + atkPct / 100) + flatAtk);
        const combatAtk = Math.round(initAtk * 1.096); // +9.6% Combat ATK

        const initCr = Math.min(100, 5 + 24 + (rMap.CR || 0) * 2.4);
        const combatCr = Math.min(100, initCr + 25.0); // +25% CR passif en combat

        const combatCdmg = 50 + 48 + (rMap.CDMG || 0) * 4.8;
        const dmgBonus = 30 + 24; // Slot 5 + Astral Voice 24%
        const penFlat = (rMap.PEN || 0) * 9;

        // Formule officielle de Défense ZZZ au Niveau 60 (Constante = 794)
        const effDef = Math.max(0, enemyDef - penFlat);
        const defMult = 794 / (794 + effDef);

        const critFactor = 1 + (combatCr / 100) * (combatCdmg / 100);
        const avgCritDmg = Math.round(combatAtk * 1.85 * critFactor * (1 + dmgBonus / 100) * defMult);

        return {
            initAtk,
            combatAtk,
            initCr: initCr.toFixed(1),
            combatCr: (initCr + 25.0).toFixed(1),
            combatCdmg: combatCdmg.toFixed(1),
            dmgBonus,
            penFlat,
            avgCritDmg
        };
    };

    const baseSim = calcDmgWithRolls(rolls);

    // Calcule le gain marginal exact (+X.XXX%) si on ajoute +1 roll de chaque sous-stat
    const marginalGains = {};
    ['ATK_', 'ATK', 'CR', 'CDMG', 'PEN'].forEach(k => {
        const nextRolls = { ...rolls, [k]: (rolls[k] || 0) + 1 };
        const nextSim = calcDmgWithRolls(nextRolls);
        const pctGain = baseSim.avgCritDmg > 0
            ? (((nextSim.avgCritDmg - baseSim.avgCritDmg) / baseSim.avgCritDmg) * 100).toFixed(3)
            : '0.000';
        marginalGains[k] = Number(pctGain) > 0 ? `+${pctGain.replace('.', ',')}%` : '+0%';
    });

    return { ...baseSim, rolls, marginalGains };
}

// Profil pré-chargé fidèle à tes captures (UID 1501142769 - LilToxic EU) + Support Live Enka
export function getSeedProfileFor1501142769() {
    return {
        uid: '1501142769',
        nickname: 'LilToxic',
        region: 'EU',
        signature: 'Last dude on the track / F2P',
        avatarImg: 'assets/Agents/Burnice.webp',
        updatedAt: '03 November 2026',
        agents: [
            {
                name: 'Ellen',
                element: 'Ice',
                role: 'Attack',
                mindscape: 0,
                locked: false,
                favorite: true,
                leaderboardName: 'A Rank W-Engines',
                lbRank: 5,
                lbTotal: 6181,
                updatedAt: '25 October 2026',
                engine: { name: 'Cannon Rotor', img: 'assets/W-Engine/W-Engine_Cannon_Rotor.webp', refinement: 5, rank: 'A' },
                stats: {
                    hp: { init: '10,104', buffed: '' },
                    def: { init: '1,025', buffed: '' },
                    atk: { init: '3,104', buffed: '4,538', highlight: true },
                    imp: { init: '93', buffed: '' },
                    cr: { init: '', buffed: '87.4%', highlight: true },
                    cdmg: { init: '138%', buffed: '286%', highlight: true },
                    ap: { init: '102', buffed: '' },
                    am: { init: '94', buffed: '' },
                    er: { init: '1.2/s', buffed: '' },
                    dmg: { label: 'DMG%', init: '', buffed: '30%', highlight: true }
                },
                discs: [
                    { slot: 1, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'HP', substats: [{ key: 'DEF', up: 0 }, { key: 'CDMG', up: 1, rolls: 2 }, { key: 'ATK_', up: 2, rolls: 3 }, { key: 'CR', up: 1, rolls: 2 }] },
                    { slot: 2, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'ATK', substats: [{ key: 'CDMG', up: 0, rolls: 1 }, { key: 'DEF', up: 1 }, { key: 'ATK_', up: 1, rolls: 2 }, { key: 'CR', up: 3, rolls: 4 }] },
                    { slot: 3, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'DEF', substats: [{ key: 'ATK_', up: 1, rolls: 2 }, { key: 'DEF_', up: 0 }, { key: 'CDMG', up: 2, rolls: 3 }, { key: 'CR', up: 2, rolls: 3 }] },
                    { slot: 4, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'CR', substats: [{ key: 'CDMG', up: 4, rolls: 5 }, { key: 'HP_', up: 0 }, { key: 'AP', up: 0 }, { key: 'DEF', up: 0 }] },
                    { slot: 5, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'DMG%', substats: [{ key: 'DEF_', up: 2 }, { key: 'CR', up: 2, rolls: 3 }, { key: 'ATK_', up: 1, rolls: 2 }, { key: 'CDMG', up: 0, rolls: 1 }] },
                    { slot: 6, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'ATK%', substats: [{ key: 'CR', up: 2, rolls: 3 }, { key: 'CDMG', up: 2, rolls: 3 }, { key: 'DEF', up: 1 }, { key: 'DEF_', up: 0 }] }
                ]
            },
            {
                name: 'Miyabi',
                element: 'Frost',
                role: 'Anomaly',
                mindscape: 2,
                locked: false,
                favorite: true,
                leaderboardName: 'S Rank Limited W-Engines',
                lbRank: 639,
                lbTotal: 89276,
                updatedAt: '1 November 2026',
                engine: { name: 'Hailstorm Shrine', img: 'assets/W-Engine/W-Engine_Hailstorm_Shrine.webp', refinement: 1, rank: 'S' },
                stats: {
                    hp: { init: '9,873', buffed: '' },
                    def: { init: '849', buffed: '' },
                    atk: { init: '', buffed: '3,648', highlight: true },
                    imp: { init: '86', buffed: '' },
                    cr: { init: '62.6%', buffed: '89.6%', highlight: true },
                    cdmg: { init: '138%', buffed: '218%', highlight: true },
                    ap: { init: '301', buffed: '' },
                    am: { init: '116', buffed: '', highlight: true },
                    er: { init: '1.2/s', buffed: '' },
                    dmg: { label: 'DMG%', init: '30%', buffed: '70%', highlight: true }
                },
                discs: [
                    { slot: 1, setKey: 'Astral_Voice', setImg: 'assets/Disque/Astral_Voice.webp', main: 'HP', substats: [{ key: 'ATK_', up: 2, rolls: 3 }, { key: 'CDMG', up: 1, rolls: 2 }, { key: 'CR', up: 2, rolls: 3 }, { key: 'DEF', up: 0 }] },
                    { slot: 2, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'ATK', substats: [{ key: 'CDMG', up: 0, rolls: 1 }, { key: 'AP', up: 0, rolls: 1 }, { key: 'CR', up: 3, rolls: 4 }, { key: 'ATK_', up: 1, rolls: 2 }] },
                    { slot: 3, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'DEF', substats: [{ key: 'CDMG', up: 1, rolls: 2 }, { key: 'CR', up: 1, rolls: 2 }, { key: 'AP', up: 1, rolls: 2 }, { key: 'ATK_', up: 2, rolls: 3 }] },
                    { slot: 4, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'ATK%', substats: [{ key: 'DEF_', up: 0 }, { key: 'AP', up: 1, rolls: 2 }, { key: 'CR', up: 0, rolls: 1 }, { key: 'CDMG', up: 4, rolls: 5 }] },
                    { slot: 5, setKey: 'Branch_Blade_Song', setImg: 'assets/Disque/Branch_Blade_Song.webp', main: 'DMG%', substats: [{ key: 'DEF', up: 0 }, { key: 'CR', up: 1, rolls: 2 }, { key: 'CDMG', up: 1, rolls: 2 }, { key: 'ATK_', up: 2, rolls: 3 }] },
                    { slot: 6, setKey: 'Astral_Voice', setImg: 'assets/Disque/Astral_Voice.webp', main: 'ATK%', substats: [{ key: 'CR', up: 1, rolls: 2 }, { key: 'AP', up: 1, rolls: 2 }, { key: 'CDMG', up: 2, rolls: 3 }, { key: 'ATK', up: 1, rolls: 2 }] }
                ]
            },
            {
                name: 'Evelyn',
                element: 'Fire',
                role: 'Attack',
                mindscape: 0,
                locked: false,
                favorite: false,
                leaderboardName: 'A Rank W-Engines',
                lbRank: 19,
                lbTotal: 5549,
                updatedAt: '22 October 2026',
                engine: { name: 'Marcato Desire', img: 'assets/W-Engine/Marcato_Desire.webp', refinement: 5, rank: 'A' },
                stats: {
                    hp: { init: '10,580', buffed: '' },
                    def: { init: '1,045', buffed: '' },
                    atk: { init: '2,827', buffed: '3,099', highlight: true },
                    imp: { init: '90', buffed: '' },
                    cr: { init: '', buffed: '97%', highlight: true },
                    cdmg: { init: '174.8%', buffed: '194.8%', highlight: true },
                    ap: { init: '146', buffed: '' },
                    am: { init: '93', buffed: '' },
                    pen: { init: '18', buffed: '' },
                    er: { init: '1.2/s', buffed: '' },
                    dmg: { label: 'DMG%', init: '40%', buffed: '120%', highlight: true }
                },
                discs: [
                    { slot: 1, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'HP', substats: [{ key: 'CDMG', up: 2, rolls: 3 }, { key: 'CR', up: 1, rolls: 2 }, { key: 'ATK_', up: 1, rolls: 2 }, { key: 'PEN', up: 0, rolls: 1 }] },
                    { slot: 2, setKey: 'Swing_Jazz', setImg: 'assets/Disque/Swing_Jazz.webp', main: 'ATK', substats: [{ key: 'DEF_', up: 1 }, { key: 'CR', up: 1, rolls: 2 }, { key: 'CDMG', up: 1, rolls: 2 }, { key: 'HP_', up: 1 }] },
                    { slot: 3, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'DEF', substats: [{ key: 'CR', up: 0, rolls: 1 }, { key: 'PEN', up: 1, rolls: 2 }, { key: 'ATK', up: 0, rolls: 1 }, { key: 'CDMG', up: 3, rolls: 4 }] },
                    { slot: 4, setKey: 'Swing_Jazz', setImg: 'assets/Disque/Swing_Jazz.webp', main: 'CDMG', substats: [{ key: 'DEF', up: 0 }, { key: 'DEF_', up: 2 }, { key: 'CR', up: 1, rolls: 2 }, { key: 'AP', up: 1 }] },
                    { slot: 5, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'DMG%', substats: [{ key: 'CR', up: 0, rolls: 1 }, { key: 'AP', up: 1 }, { key: 'CDMG', up: 1, rolls: 2 }, { key: 'DEF', up: 2 }] },
                    { slot: 6, setKey: 'Woodpecker_Electro', setImg: 'assets/Disque/Woodpecker_Electro.webp', main: 'ATK%', substats: [{ key: 'CDMG', up: 2, rolls: 3 }, { key: 'CR', up: 2, rolls: 3 }, { key: 'DEF_', up: 0 }, { key: 'AP', up: 1 }] }
                ]
            },
            {
                name: 'Nicole',
                element: 'Ether',
                role: 'Support',
                mindscape: 6,
                locked: false,
                favorite: false,
                leaderboardName: 'A Rank W-Engines',
                lbRank: 6242,
                lbTotal: 6495,
                updatedAt: '22 October 2026',
                engine: { name: 'The Vault', img: 'assets/W-Engine/W-Engine_The_Vault.webp', refinement: 5, rank: 'A' },
                stats: {
                    hp: { init: '11,679', buffed: '' },
                    def: { init: '1,000', buffed: '' },
                    atk: { init: '2,174', buffed: '', highlight: true },
                    imp: { init: '88', buffed: '' },
                    cr: { init: '9.8%', buffed: '24.8%', highlight: true },
                    cdmg: { init: '50%', buffed: '', highlight: true },
                    ap: { init: '359', buffed: '' },
                    am: { init: '117', buffed: '', highlight: true },
                    pen: { init: '45', buffed: '' },
                    er: { init: '2.34/s', buffed: '3.12/s', highlight: true },
                    dmg: { label: 'DMG%', init: '30%', buffed: '54%', highlight: true }
                },
                discs: [
                    { slot: 1, setKey: 'Freedom_Blues', setImg: 'assets/Disque/Freedom_Blues.webp', main: 'HP', substats: [{ key: 'ATK_', up: 2, rolls: 3 }, { key: 'HP_', up: 1 }, { key: 'PEN', up: 0, rolls: 1 }, { key: 'AP', up: 1, rolls: 2 }] },
                    { slot: 2, setKey: 'Freedom_Blues', setImg: 'assets/Disque/Freedom_Blues.webp', main: 'ATK', substats: [{ key: 'AP', up: 3, rolls: 4 }, { key: 'PEN', up: 1, rolls: 2 }, { key: 'ATK_', up: 0, rolls: 1 }, { key: 'DEF_', up: 0 }] },
                    { slot: 3, setKey: 'Astral_Voice', setImg: 'assets/Disque/Astral_Voice.webp', main: 'DEF', substats: [{ key: 'DEF_', up: 1 }, { key: 'ATK_', up: 2, rolls: 3 }, { key: 'AP', up: 2, rolls: 3 }, { key: 'HP_', up: 0 }] },
                    { slot: 4, setKey: 'Freedom_Blues', setImg: 'assets/Disque/Freedom_Blues.webp', main: 'AP', substats: [{ key: 'HP_', up: 1 }, { key: 'HP', up: 1 }, { key: 'DEF_', up: 1 }, { key: 'ATK_', up: 2, rolls: 3 }] },
                    { slot: 5, setKey: 'Freedom_Blues', setImg: 'assets/Disque/Freedom_Blues.webp', main: 'DMG%', substats: [{ key: 'AP', up: 2, rolls: 3 }, { key: 'ATK_', up: 0, rolls: 1 }, { key: 'DEF', up: 2 }, { key: 'CR', up: 0, rolls: 1 }] },
                    { slot: 6, setKey: 'Astral_Voice', setImg: 'assets/Disque/Astral_Voice.webp', main: 'AM%', substats: [{ key: 'CR', up: 0, rolls: 1 }, { key: 'AP', up: 3, rolls: 4 }, { key: 'ATK', up: 1, rolls: 2 }, { key: 'PEN', up: 1, rolls: 2 }] }
                ]
            }
        ]
    };
}
