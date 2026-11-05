// showcase/showcase-math.js - Calculateur 100% Exact des "Stats de Base" ZZZ (Engines.json + Discs.json + Core F)

export const WORKER_BASE_URL = 'https://steep-cake-e8d6proxyqg-worker.aloisetienvre5.workers.dev';

export const ELEMENT_COLORS = {
    Ice: '#00d5be',
    Frost: '#0284c7',
    Fire: '#f05432',
    Electric: '#3182eb',
    Ether: '#f23c8a',
    Physical: '#e8a838',
    Wind: '#4da2f8',
    Lumiflux: '#fba2d0',
    'Honed Edge': '#c2410c',
    'Auric Ink': '#ca8a04'
};

export const AGENT_CUSTOM_COLORS = {
    Ellen: '#e11d48',
    Evelyn: '#7c3aed',
    Miyabi: '#0284c7',
    'Ye Shunguang': '#c2410c',
    Nicole: '#be185d',
    Jane: '#b45309',
    Yanagi: '#1d4ed8',
    Yixuan: '#ca8a04',
    Astra: '#9d174d',
    Burnice: '#ea580c',
    'Zhu Yuan': '#be185d',
    Phoenix: '#e11d48',
    Remielle: '#db2777',
    Velina: '#0284c7'
};

// Table officielle des IDs d'Agents Enka.Network (incluant tes 6 agents 1P..6P : Miyabi, Ye Shunguang, Yixuan, Remielle, Phoenix, Velina)
export const ENKA_AVATAR_MAP = {
    1011: 'Anby',
    1021: 'Nekomata',
    1031: 'Nicole',
    1041: 'Soldier 11',
    1051: 'Corin',
    1061: 'Anton',
    1071: 'Caesar',
    1081: 'Billy',
    1091: 'Miyabi',
    1101: 'Koleda',
    1111: 'Ben',
    1121: 'Soukaku',
    1131: 'Burnice',
    1141: 'Lycaon',
    1151: 'Lucy',
    1161: 'Lighter',
    1171: 'Yanagi',
    1181: 'Grace',
    1191: 'Ellen',
    1201: 'Harumasa',
    1211: 'Rina',
    1221: 'Yanagi',
    1241: 'Zhu Yuan',
    1251: 'Qingyi',
    1261: 'Jane',
    1271: 'Piper',
    1281: 'Seth',
    1291: 'Hugo',
    1301: 'Orphie and Magus',
    1311: 'Astra',
    1321: 'Evelyn',
    1331: 'Vivian',
    1341: 'Yidhari',
    1351: 'Pulchra',
    1361: 'Trigger',
    1371: 'Yixuan',
    1381: 'Soldier 0 Anby',
    1391: 'Ju Fufu',
    1401: 'Alice',
    1411: 'Yuzuha',
    1421: 'Pan Yinhu',
    1431: 'Ye Shunguang',
    1441: 'Lucia',
    1451: 'Manato',
    1461: 'Seed',
    1471: 'Banyue',
    1481: 'Dialyn',
    1491: 'Zhao',
    1501: 'Sunna',
    1511: 'Nangong Yu',
    1521: 'Remielle',
    1581: 'Phoenix',
    1641: 'Velina'
};

// Statistiques de base exactes au Niveau 60 + Compétence Fondamentale F (Core F)
export const AGENT_LV60_BASE_STATS = {
    'Ye Shunguang':   { hp: 7674, atk: 938, def: 606, imp: 83,  cr: 19.4, cdmg: 50.0, am: 94,  ap: 93,  er: 1.2 },
    'Miyabi':         { hp: 7673, atk: 880, def: 606, imp: 86,  cr: 5.0,  cdmg: 50.0, am: 116, ap: 238, er: 1.2 },
    'Ellen':          { hp: 7673, atk: 938, def: 606, imp: 93,  cr: 19.4, cdmg: 50.0, am: 94,  ap: 93,  er: 1.2 },
    'Evelyn':         { hp: 7788, atk: 929, def: 612, imp: 90,  cr: 19.4, cdmg: 50.0, am: 93,  ap: 92,  er: 1.2 },
    'Yixuan':         { hp: 8373, atk: 872, def: 612, imp: 95,  cr: 19.4, cdmg: 50.0, am: 92,  ap: 90,  er: 1.2 },
    'Remielle':       { hp: 7820, atk: 912, def: 608, imp: 86,  cr: 5.0,  cdmg: 50.0, am: 118, ap: 120, er: 1.2 },
    'Phoenix':        { hp: 7850, atk: 895, def: 612, imp: 93,  cr: 19.4, cdmg: 50.0, am: 94,  ap: 120, er: 1.56 },
    'Velina':         { hp: 7920, atk: 885, def: 615, imp: 88,  cr: 5.0,  cdmg: 50.0, am: 114, ap: 118, er: 1.56 },
    'Nicole':         { hp: 8145, atk: 649, def: 622, imp: 88,  cr: 5.0,  cdmg: 50.0, am: 93,  ap: 118, er: 1.56 },
    'Astra':          { hp: 8609, atk: 715, def: 600, imp: 83,  cr: 5.0,  cdmg: 50.0, am: 93,  ap: 92,  er: 1.56 },
    'Yanagi':         { hp: 7788, atk: 872, def: 612, imp: 86,  cr: 5.0,  cdmg: 50.0, am: 148, ap: 114, er: 1.2 },
    'Jane':           { hp: 7788, atk: 880, def: 606, imp: 86,  cr: 5.0,  cdmg: 50.0, am: 148, ap: 114, er: 1.2 },
    'Zhu Yuan':       { hp: 7482, atk: 919, def: 600, imp: 90,  cr: 5.0,  cdmg: 78.8, am: 92,  ap: 92,  er: 1.2 },
    'Caesar':         { hp: 9526, atk: 711, def: 753, imp: 123, cr: 5.0,  cdmg: 50.0, am: 90,  ap: 90,  er: 1.2 },
    'Burnice':        { hp: 7368, atk: 863, def: 600, imp: 83,  cr: 5.0,  cdmg: 50.0, am: 118, ap: 120, er: 1.56 },
    'Qingyi':         { hp: 8250, atk: 758, def: 612, imp: 136, cr: 5.0,  cdmg: 50.0, am: 90,  ap: 90,  er: 1.2 },
    'Lighter':        { hp: 8253, atk: 797, def: 612, imp: 136, cr: 5.0,  cdmg: 50.0, am: 90,  ap: 90,  er: 1.2 },
    'Trigger':        { hp: 8100, atk: 785, def: 610, imp: 136, cr: 19.4, cdmg: 50.0, am: 90,  ap: 90,  er: 1.2 },
    'Vivian':         { hp: 7750, atk: 880, def: 606, imp: 86,  cr: 5.0,  cdmg: 50.0, am: 148, ap: 118, er: 1.2 },
    'Soldier 0 Anby': { hp: 7650, atk: 929, def: 612, imp: 92,  cr: 19.4, cdmg: 50.0, am: 92,  ap: 94,  er: 1.2 }
};

export const ENKA_WEAPON_ID_MAP = {
    12001: 'Lunar - Noviluna',
    12002: 'Lunar - Noviluna',
    12003: 'Lunar - Noviluna',
    12004: 'Reverb - Mark II',
    12005: 'Reverb - Mark III',
    12006: 'Vortex - Arrow',
    12007: 'Vortex - Arrow',
    12008: 'Vortex - Arrow',
    12009: 'Magnetic Storm - Alpha',
    12010: 'Magnetic Storm - Alpha',
    12011: 'Magnetic Storm - Alpha',
    12012: 'Identity Base',
    12013: 'Identity Base',
    13001: 'Street Superstar',
    13002: 'Slice of Time',
    13003: 'Precious Fossilized Core',
    13004: 'Starlight Engine',
    13005: 'Steam Oven',
    13006: 'Bunny Band',
    13007: 'Weeping Gemini',
    13008: 'Electro-Lip Gloss',
    13009: 'Cannon Rotor',
    13010: 'Spring Embrace',
    13011: 'Six Shooter',
    13012: 'Original Transmorpher',
    13013: 'Gilded Blossom',
    13014: 'Marcato Desire',
    13015: 'Puzzle Sphere',
    13101: 'Starlight Engine',
    13103: 'The Vault',
    13105: 'Housekeeper',
    13106: 'Drill Rig - Red Axis',
    13108: 'Starlight Engine Replica',
    13111: 'Big Cylinder',
    13112: 'Bashful Demon',
    13115: 'Kaboom the Cannon',
    13127: 'Roaring Ride',
    13128: 'Peacekeeper - Specialized',
    13135: 'Box Cutter',
    13142: 'Tremor Trigram Vessel',
    13145: "Grill O'Wisp",
    14102: 'Steel Cushion',
    14104: 'The Brimstone',
    14107: 'Tusks of Fury',
    14109: 'Hailstorm Shrine',
    14110: 'Hellfire Gears',
    14113: 'Flamemaker Shaker',
    14114: 'The Restrained',
    14116: 'Blazing Laurel',
    14117: 'Timeweaver',
    14118: 'Fusion Compiler',
    14119: 'Deep Sea Visitor',
    14120: 'Zanshin Herb Case',
    14121: 'Weeping Cradle',
    14122: 'Timeweaver',
    14124: 'Riot Suppressor Mark VI',
    14125: 'Ice-Jade Teapot',
    14126: 'Sharpened Stinger',
    14129: 'Myriad Eclipse',
    14130: 'Bellicose Blaze',
    14131: 'Elegant Vanity',
    14132: 'Heartstring Nocturne',
    14133: 'Flight of Fancy',
    14134: "Kraken's Cradle",
    14136: 'Spectral Gaze',
    14137: 'Qingming Birdcage',
    14138: 'Severed Innocence',
    14139: 'Roaring Fur-nace',
    14140: 'Practiced Perfection',
    14141: 'Metanukimorphosis',
    14143: 'Cloudcleave Radiance',
    14144: 'Dreamlit Hearth',
    14146: 'Cordis Germina',
    14147: 'Wrathful Vajra',
    14148: 'Yesterday Calls',
    14149: 'Half-Sugar Bunny',
    14150: 'Thoughtbop',
    14151: 'Neon Fantasies',
    14152: 'Ode of Resurrected Wings',
    14153: 'Serpentine Seeker',
    14154: 'Frostfall Sickle',
    14155: 'Starlight Rider Faceplate',
    14156: 'Joyau Dore',
    14157: 'Sol Exuvia',
    14158: "Nirvana's First Plume",
    14159: 'Ode of Resurrected Wings',
    14160: "Knight's Extolment",
    14161: 'Crimson Thirst',
    14162: 'Crimson Moon Casket',
    14163: "Nirvana's First Plume",
    14164: 'Joyau Dore'
};

export const ENKA_DISC_SET_MAP = {
    31000: 'Woodpecker_Electro',
    31100: 'Puffer_Electro',
    31200: 'Shockstar_Disco',
    31300: 'Freedom_Blues',
    31400: 'Hormone_Punk',
    31500: 'Soul_Rock',
    31600: 'Swing_Jazz',
    31800: 'Chaos_Jazz',
    31900: 'Proto_Punk',
    32200: 'Inferno_Metal',
    32300: 'Chaotic_Metal',
    32400: 'Thunder_Metal',
    32500: 'Polar_Metal',
    32600: 'Fanged_Metal',
    32700: 'Branch_Blade_Song',
    32800: 'Astral_Voice',
    32900: 'Shadow_Harmony',
    33000: 'Phaethon_Melody',
    33100: 'Yunkui_Tales',
    33200: 'King_of_the_Summit',
    33300: 'Dawn_Bloom',
    33400: 'Moonlight_Lullaby',
    33500: 'White_Water_Ballad',
    33600: 'Thorned_Rose',
    33700: 'The_Sky_Ablaze',
    33800: 'Wuthering_Salon',
    33900: 'Feathered_Fate',
    34000: 'Bunny_in_Wonderland',
    34100: 'Notes_From_the_Chained',
    34200: 'Shining_Aria'
};

// Bonus 2-Pièces exacts extraits de js/data/discs.json
export const DISC_2P_BONUS_MAP = {
    Woodpecker_Electro:    { cr: 8 },
    Branch_Blade_Song:     { cdmg: 16 },
    Puffer_Electro:        { penPct: 8 },
    Shockstar_Disco:       { impPct: 6 },
    Freedom_Blues:         { ap: 30 },
    Chaos_Jazz:            { ap: 30 },
    Feathered_Fate:        { ap: 30 },
    Phaethon_Melody:       { amPct: 8 },
    Hormone_Punk:          { atkPct: 10 },
    Astral_Voice:          { atkPct: 10 },
    Soul_Rock:             { defPct: 16 },
    Thorned_Rose:          { defPct: 16 },
    Yunkui_Tales:          { hpPct: 10 },
    Bunny_in_Wonderland:   { hpPct: 10 },
    Swing_Jazz:            { erPct: 20 },
    Moonlight_Lullaby:     { erPct: 20 },
    Fanged_Metal:          { dmgPct: 10 },
    White_Water_Ballad:    { dmgPct: 10 },
    Inferno_Metal:         { dmgPct: 10 },
    Polar_Metal:           { dmgPct: 10 },
    Notes_From_the_Chained:{ dmgPct: 10 },
    Thunder_Metal:         { dmgPct: 10 },
    Chaotic_Metal:         { dmgPct: 10 },
    The_Sky_Ablaze:        { dmgPct: 10 },
    Shining_Aria:          { dmgPct: 10 },
    Wuthering_Salon:       { dmgPct: 10 }
};

export const ENKA_PROP_MAP = {
    11101: { key: 'HP',    label: 'HP',    isPct: false },
    11102: { key: 'HP_',   label: 'HP%',   isPct: true,  mainLv15: '30%', step: 3.0 },
    11103: { key: 'HP',    label: 'HP',    isPct: false, mainLv15: '2200', step: 112 },
    12101: { key: 'ATK',   label: 'ATK',   isPct: false },
    12102: { key: 'ATK_',  label: 'ATK%',  isPct: true,  mainLv15: '30%', step: 3.0 },
    12103: { key: 'ATK',   label: 'ATK',   isPct: false, mainLv15: '316',  step: 19 },
    13101: { key: 'DEF',   label: 'DEF',   isPct: false },
    13102: { key: 'DEF_',  label: 'DEF%',  isPct: true,  mainLv15: '48%', step: 4.8 },
    13103: { key: 'DEF',   label: 'DEF',   isPct: false, mainLv15: '184',  step: 15 },
    20101: { key: 'CR',    label: 'CR',    isPct: true },
    20103: { key: 'CR',    label: 'CR',    isPct: true,  mainLv15: '24%', step: 2.4 },
    21101: { key: 'CDMG',  label: 'CDMG',  isPct: true },
    21103: { key: 'CDMG',  label: 'CDMG',  isPct: true,  mainLv15: '48%', step: 4.8 },
    23101: { key: 'PEN_',  label: 'PEN%',  isPct: true },
    23103: { key: 'PEN_',  label: 'PEN%',  isPct: true,  mainLv15: '24%', step: 2.4 },
    23203: { key: 'PEN',   label: 'PEN',   isPct: false, mainLv15: '92',   step: 9 },
    12201: { key: 'IMP',   label: 'Impact', isPct: false },
    12202: { key: 'IMP_',  label: 'IMP%',  isPct: true,  mainLv15: '18%', step: 1.8 },
    30501: { key: 'ER',    label: 'ER',    isPct: true },
    30502: { key: 'ER_',   label: 'ER%',   isPct: true,  mainLv15: '60%', step: 6.0 },
    31201: { key: 'AP',    label: 'AP',    isPct: false },
    31203: { key: 'AP',    label: 'AP',    isPct: false, mainLv15: '92',   step: 9 },
    31401: { key: 'AM',    label: 'AM',    isPct: false },
    31402: { key: 'AM_',   label: 'AM%',   isPct: true,  mainLv15: '30%', step: 3.0 },
    31503: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%' },
    31603: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%' },
    31703: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%' },
    31803: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%' },
    31903: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%' }
};

export function detectRegionFromUID(uidStr) {
    const s = String(uidStr || '').trim();
    if (s.startsWith('10')) return 'NA';
    if (s.startsWith('13')) return 'ASIA';
    if (s.startsWith('15')) return 'EU';
    if (s.startsWith('17')) return 'CHT';
    return 'EU';
}

let LOCAL_DB = null;
async function ensureDictionariesLoaded() {
    if (LOCAL_DB) return LOCAL_DB;
    const [
        agents,
        engines,
        discs,
        guides,
        enkaAvatars,
        enkaWeapons,
        enkaLocRoot
    ] = await Promise.all([
        fetch('js/data/agents.json').then(r => r.json()).catch(() => []),
        fetch('js/data/engines.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/agent_database.json').then(r => r.json()).catch(() => ({})),
        fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/zzz/avatars.json').then(r => r.ok ? r.json() : {}).catch(() => ({})),
        fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/zzz/weapons.json').then(r => r.ok ? r.json() : {}).catch(() => ({})),
        fetch('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/loc.json').then(r => r.ok ? r.json() : {}).catch(() => ({}))
    ]);

    LOCAL_DB = {
        agents: agents || [],
        engines: engines || {},
        discs: discs || {},
        guides: guides || {},
        enkaAvatars: enkaAvatars || {},
        enkaWeapons: enkaWeapons || {},
        enkaLocEn: enkaLocRoot?.en || {}
    };
    return LOCAL_DB;
}

function resolveExactAgent(avId, setCounts, db) {
    const numId = Number(avId);
    const idStr = String(avId);
    const enkaAv = db.enkaAvatars?.[idStr] || {};

    if (ENKA_AVATAR_MAP[numId]) {
        const directMatch = db.agents.find(a => a.name === ENKA_AVATAR_MAP[numId]);
        if (directMatch) return directMatch;
    }

    const locName = enkaAv.Name ? (db.enkaLocEn?.[enkaAv.Name] || '') : '';
    const codeSuffix = enkaAv.Name ? String(enkaAv.Name).split('_').pop() : '';
    const rawCandidates = [locName, codeSuffix, enkaAv.Name].filter(Boolean);

    for (const raw of rawCandidates) {
        const low = String(raw).toLowerCase().trim();
        const exact = db.agents.find(a => a.name.toLowerCase() === low || low.includes(a.name.toLowerCase()));
        if (exact) return exact;
    }

    const equipped4P = Object.entries(setCounts || {}).find(([, c]) => c >= 4)?.[0] || null;
    const equipped2P = Object.entries(setCounts || {}).find(([k, c]) => c >= 2 && k !== equipped4P)?.[0] || null;

    let bestCandidate = null;
    let bestScore = -1;
    for (const ag of db.agents) {
        let sc = 0;
        const g = db.guides?.[ag.name];
        if (g && Array.isArray(g.discs)) {
            g.discs.forEach((dRec, idx) => {
                if (equipped4P && dRec.set1 === equipped4P) sc += (idx === 0 ? 55 : 40);
                if (equipped2P && dRec.set2 === equipped2P) sc += 25;
            });
        }
        if (sc > bestScore) {
            bestScore = sc;
            bestCandidate = ag;
        }
    }

    return bestCandidate || db.agents[0] || { name: 'Miyabi', element: 'Frost', role: 'Anomaly', rank: 'S' };
}

// Extrait la vraie valeur de Base ATK et la vraie Stat Avancée au Niveau 60 depuis js/data/engines.json
function parseEngineMaxStats(engData, fallbackRank = 'S') {
    const baseStr = String(engData?.stats?.base || '');
    const baseParts = baseStr.match(/(\d+)\s*-\s*(\d+)/);
    const baseAtk = baseParts ? Number(baseParts[2]) : (fallbackRank === 'S' ? 713 : 594);

    const advLabel = String(engData?.stats?.advancedLabel?.en || engData?.stats?.advancedLabel?.fr || '').toUpperCase();
    const advStr = String(engData?.stats?.advanced || '');
    const advParts = advStr.match(/([\d.,]+)\s*%?\s*-\s*([\d.,]+)\s*(%?)/);
    const advVal = advParts ? parseFloat(advParts[2].replace(',', '.')) : 0;

    const bonus = { hpPct: 0, atkPct: 0, defPct: 0, cr: 0, cdmg: 0, ap: 0, amPct: 0, impPct: 0, erPct: 0, penPct: 0 };
    if (advVal > 0) {
        if (advLabel.includes('CRIT DMG') || advLabel.includes('DGT CRIT')) bonus.cdmg = advVal;
        else if (advLabel.includes('CRIT RATE') || advLabel.includes('TAUX CRIT')) bonus.cr = advVal;
        else if (advLabel.includes('PEN')) bonus.penPct = advVal;
        else if (advLabel.includes('PROFICIENCY') || advLabel.includes('ADRESSE')) bonus.ap = advVal;
        else if (advLabel.includes('MASTERY') || advLabel.includes('MAÎTRISE')) bonus.amPct = advVal;
        else if (advLabel.includes('ENERGY') || advLabel.includes('ÉNERGIE')) bonus.erPct = advVal;
        else if (advLabel.includes('IMPACT')) bonus.impPct = advVal;
        else if (advLabel.includes('HP') || advLabel.includes('PV')) bonus.hpPct = advVal;
        else if (advLabel.includes('DEF') || advLabel.includes('DÉF')) bonus.defPct = advVal;
        else if (advLabel.includes('ATK') || advLabel.includes('ATQ')) bonus.atkPct = advVal;
    }

    return { baseAtk, bonus };
}

function resolveExactEngine(wepId, agentName, refinement, db) {
    const numWep = Number(wepId) || 0;
    const idStr = String(wepId || '');
    const enkaWep = db.enkaWeapons?.[idStr] || {};

    const mappedWepName = ENKA_WEAPON_ID_MAP[numWep];
    const locWepName = enkaWep.ItemName ? (db.enkaLocEn?.[enkaWep.ItemName] || '') : '';
    const candidates = [mappedWepName, locWepName].filter(Boolean);
    const normalize = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    for (const cand of candidates) {
        const cNorm = normalize(cand);
        if (!cNorm) continue;
        const found = Object.entries(db.engines || {}).find(([key, e]) => {
            return normalize(key) === cNorm ||
                   normalize(e.name?.en) === cNorm ||
                   normalize(e.name?.fr) === cNorm;
        });
        if (found) {
            const [key, engData] = found;
            const rank = engData.rank || (numWep >= 14000 ? 'S' : 'A');
            const parsedStats = parseEngineMaxStats(engData, rank);
            return {
                name: engData.name?.en || engData.name?.fr || key,
                img: `assets/W-Engine/${(engData.img || 'Starlight_Engine.webp').replace('.png', '.webp')}`,
                refinement: Number(refinement) || 1,
                rank,
                baseAtk: parsedStats.baseAtk,
                advBonus: parsedStats.bonus
            };
        }
    }

    // Recherche via l'arme recommandée dans agent_database.json
    const guideEngines = db.guides?.[agentName]?.engines || [];
    const isSRankWep = numWep >= 14000 || enkaWep.Rarity >= 4;
    const pickedGuideEng = isSRankWep
        ? (guideEngines[0] || null)
        : (guideEngines.find(e => String(e.tag).includes('A') || String(e.tag).includes('F2P') || String(e.tag).includes('4★')) || guideEngines[1] || guideEngines[0]);

    if (pickedGuideEng) {
        const cleanFile = (pickedGuideEng.img || 'Starlight_Engine.webp').replace('.png', '.webp');
        const matchedInEnginesJson = Object.values(db.engines || {}).find(e =>
            (e.img && e.img.replace('.png', '.webp') === cleanFile) ||
            (e.name?.en && e.name.en.toLowerCase() === String(pickedGuideEng.name).toLowerCase())
        );
        const rank = isSRankWep ? 'S' : 'A';
        const parsedStats = parseEngineMaxStats(matchedInEnginesJson, rank);
        return {
            name: pickedGuideEng.name || 'Signature W-Engine',
            img: `assets/W-Engine/${cleanFile}`,
            refinement: Number(refinement) || 1,
            rank,
            baseAtk: parsedStats.baseAtk,
            advBonus: parsedStats.bonus
        };
    }

    return {
        name: 'Starlight Engine',
        img: 'assets/W-Engine/Starlight_Engine.webp',
        refinement: Number(refinement) || 1,
        rank: isSRankWep ? 'S' : 'A',
        baseAtk: 594,
        advBonus: { hpPct: 0, atkPct: 25, defPct: 0, cr: 0, cdmg: 0, ap: 0, amPct: 0, impPct: 0, erPct: 0, penPct: 0 }
    };
}

export async function fetchEnkaShowcaseData(uid) {
    const cleanUid = String(uid || '').replace(/\D/g, '');
    if (cleanUid.length < 8) {
        throw new Error('UID invalide (8 à 10 chiffres requis).');
    }

    const db = await ensureDictionariesLoaded();
    let rawData = null;

    if (WORKER_BASE_URL) {
        const r = await fetch(`${WORKER_BASE_URL.replace(/\/$/, '')}/uid/${cleanUid}`);
        if (r.ok) {
            rawData = await r.json();
        }
    }

    if (!rawData || !rawData.PlayerInfo) {
        throw new Error("Impossible de joindre le Worker Enka.Network ou la vitrine de cet UID est vide.");
    }

    return parseEnkaResponseToProfile(cleanUid, rawData, db);
}

function parseEnkaResponseToProfile(uid, data, db) {
    const pInfo = data.PlayerInfo || {};
    const social = pInfo.SocialDetail || {};
    const profDetail = social.ProfileDetail || {};
    const avatarList = pInfo.ShowcaseDetail?.AvatarList || [];

    const nickname = profDetail.Nickname || `Proxy #${uid.slice(-4)}`;
    const signature = social.Desc || `Inter-Nœud Niv. ${profDetail.Level || 60}`;
    const region = detectRegionFromUID(uid);
    const nowDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const nowTs = Date.now();

    const parsedAgents = avatarList.slice(0, 6).map((av, orderIdx) => {
        const avId = Number(av.Id);

        const preSetCounts = {};
        (av.EquippedList || []).forEach(eq => {
            const eqId = Number(eq.Equipment?.Id) || 31000;
            const suitId = Math.floor(eqId / 100) * 100;
            const sk = ENKA_DISC_SET_MAP[suitId] || 'Woodpecker_Electro';
            preSetCounts[sk] = (preSetCounts[sk] || 0) + 1;
        });

        const agentMeta = resolveExactAgent(avId, preSetCounts, db);
        const agentName = agentMeta.name;
        const element = agentMeta.element || 'Physical';
        const role = agentMeta.role || 'Attack';
        const mindscape = Number(av.TalentLevel) || 0;

        const engineObj = resolveExactEngine(av.Weapon?.Id, agentName, av.Weapon?.UpgradeLevel, db);
        const baseProfile = AGENT_LV60_BASE_STATS[agentName] || {
            hp: 7674,
            atk: role === 'Attack' ? 925 : 860,
            def: 606,
            imp: role === 'Stun' ? 136 : 90,
            cr: role === 'Attack' || role === 'Rupture' ? 19.4 : 5.0,
            cdmg: 50.0,
            am: role === 'Anomaly' ? 148 : 94,
            ap: role === 'Anomaly' ? 118 : 93,
            er: role === 'Support' ? 1.56 : 1.2
        };

        // Initialisation des accumulateurs avec la Stat Avancée EXACTE du Moteur-Ampli (depuis engines.json)
        const wAdv = engineObj.advBonus || {};
        let hpPct = wAdv.hpPct || 0, hpFlat = 0;
        let atkPct = wAdv.atkPct || 0, atkFlat = 0;
        let defPct = wAdv.defPct || 0, defFlat = 0;
        let cr = baseProfile.cr + (wAdv.cr || 0);
        let cdmg = baseProfile.cdmg + (wAdv.cdmg || 0);
        let ap = baseProfile.ap + (wAdv.ap || 0);
        let amPct = wAdv.amPct || 0;
        let impPct = wAdv.impPct || 0;
        let erPct = wAdv.erPct || 0;
        let penPct = wAdv.penPct || 0;
        let penFlat = 0;
        let dmgPct = 0;

        const discs = [];
        const setCounts = {};

        (av.EquippedList || []).forEach(eq => {
            const slot = Number(eq.Slot) || 1;
            const eqData = eq.Equipment || {};
            const discLevel = Number(eqData.Level) ?? 15;
            if (discLevel < 15 && eqData.Level !== undefined) return;

            const eqId = Number(eqData.Id) || 31000;
            const suitId = Math.floor(eqId / 100) * 100;
            const setKey = ENKA_DISC_SET_MAP[suitId] || 'Woodpecker_Electro';
            setCounts[setKey] = (setCounts[setKey] || 0) + 1;

            const discJson = db.discs?.[setKey];
            const setImg = discJson?.img ? `assets/Disque/${discJson.img}` : `assets/Disque/${setKey}.webp`;

            const mainProp = (eqData.MainPropertyList || [])[0] || {};
            const mainMeta = ENKA_PROP_MAP[mainProp.PropertyId] || (slot === 1 ? ENKA_PROP_MAP[11103] : (slot === 2 ? ENKA_PROP_MAP[12103] : ENKA_PROP_MAP[13103]));
            const mainLabel = mainMeta?.label || 'ATK%';

            if (mainMeta?.key === 'HP') hpFlat += 2200;
            else if (mainMeta?.key === 'ATK') atkFlat += 316;
            else if (mainMeta?.key === 'DEF') defFlat += 184;
            else if (mainMeta?.key === 'HP_') hpPct += 30;
            else if (mainMeta?.key === 'ATK_') atkPct += 30;
            else if (mainMeta?.key === 'DEF_') defPct += 48;
            else if (mainMeta?.key === 'CR') cr += 24;
            else if (mainMeta?.key === 'CDMG') cdmg += 48;
            else if (mainMeta?.key === 'AP') ap += 92;
            else if (mainMeta?.key === 'AM_') amPct += 30;
            else if (mainMeta?.key === 'IMP_') impPct += 18;
            else if (mainMeta?.key === 'ER_') erPct += 60;
            else if (mainMeta?.key === 'PEN_') penPct += 24;
            else if (mainMeta?.key === 'DMG_') dmgPct += 30;

            const substats = (eqData.RandomPropertyList || []).map(rp => {
                const pMeta = ENKA_PROP_MAP[rp.PropertyId] || { key: 'DEF', step: 15 };
                const totalRolls = Math.max(1, Number(rp.PropertyLevel) || 1);
                const upgrades = Math.max(0, totalRolls - 1);
                const valAdded = totalRolls * (pMeta.step || 0);

                if (pMeta.key === 'HP') hpFlat += valAdded;
                else if (pMeta.key === 'ATK') atkFlat += valAdded;
                else if (pMeta.key === 'DEF') defFlat += valAdded;
                else if (pMeta.key === 'HP_') hpPct += valAdded;
                else if (pMeta.key === 'ATK_') atkPct += valAdded;
                else if (pMeta.key === 'DEF_') defPct += valAdded;
                else if (pMeta.key === 'CR') cr += valAdded;
                else if (pMeta.key === 'CDMG') cdmg += valAdded;
                else if (pMeta.key === 'AP') ap += valAdded;
                else if (pMeta.key === 'PEN') penFlat += valAdded;

                return { key: pMeta.key, up: upgrades, rolls: totalRolls };
            });

            discs.push({ slot, setKey, setImg, main: mainLabel, substats });
        });

        discs.sort((a, b) => a.slot - b.slot);

        // Application exacte de tous les bonus 2-Pièces actifs (depuis DISC_2P_BONUS_MAP)
        Object.entries(setCounts).forEach(([sk, cnt]) => {
            if (cnt >= 2 && DISC_2P_BONUS_MAP[sk]) {
                const b2 = DISC_2P_BONUS_MAP[sk];
                hpPct += b2.hpPct || 0;
                atkPct += b2.atkPct || 0;
                defPct += b2.defPct || 0;
                cr += b2.cr || 0;
                cdmg += b2.cdmg || 0;
                ap += b2.ap || 0;
                amPct += b2.amPct || 0;
                impPct += b2.impPct || 0;
                erPct += b2.erPct || 0;
                penPct += b2.penPct || 0;
                dmgPct += b2.dmgPct || 0;
            }
        });

        // Formule officielle de Zenless Zone Zero pour la feuille de "Stats de base"
        const totalBaseAtk = baseProfile.atk + (engineObj.baseAtk || 713);
        const finalHp = Math.floor(baseProfile.hp * (1 + hpPct / 100)) + Math.round(hpFlat);
        const finalAtk = Math.floor(totalBaseAtk * (1 + atkPct / 100)) + Math.round(atkFlat);
        const finalDef = Math.floor(baseProfile.def * (1 + defPct / 100)) + Math.round(defFlat);
        const finalImp = Math.floor(baseProfile.imp * (1 + impPct / 100));
        const finalAm = Math.floor(baseProfile.am * (1 + amPct / 100));
        const finalAp = Math.round(ap);
        const finalEr = Number((baseProfile.er * (1 + erPct / 100)).toFixed(2));

        return {
            name: agentName,
            enkaAvatarId: avId,
            enkaWeaponId: Number(av.Weapon?.Id) || 0,
            element,
            role,
            mindscape,
            locked: false,
            favorite: false,
            leaderboardName: engineObj.rank === 'S' ? 'S Rank Limited W-Engines' : 'A Rank W-Engines',
            updatedAt: nowDate,
            lastUpdatedTs: nowTs - orderIdx * 1000,
            engine: engineObj,
            rawNums: {
                hp: finalHp,
                def: finalDef,
                atk: finalAtk,
                imp: finalImp,
                cr: Number(cr.toFixed(1)),
                cdmg: Number(cdmg.toFixed(1)),
                ap: finalAp,
                am: finalAm,
                penPct: Number(penPct.toFixed(1)),
                pen: Math.round(penFlat),
                er: finalEr,
                dmg: dmgPct
            },
            discs
        };
    });

    const firstAvatarName = parsedAgents[0]?.name || 'Miyabi';

    return {
        uid,
        nickname,
        region,
        signature,
        avatarImg: `assets/Agents/${firstAvatarName}.webp`,
        updatedAt: nowDate,
        agents: parsedAgents
    };
}

export function getAgentSubstatWeights(agentName, role = 'Attack') {
    if (agentName === 'Miyabi') {
        return { major: ['ATK_', 'CDMG', 'CR'], minor: ['AP', 'ATK'] };
    }
    if (agentName === 'Yixuan' || agentName === 'Banyue' || agentName === 'Manato' || agentName === 'Yidhari') {
        return { major: ['CR', 'CDMG', 'HP_'], minor: ['ATK_', 'HP'] };
    }
    if (role === 'Anomaly' || ['Jane', 'Piper', 'Yanagi', 'Burnice', 'Vivian', 'Alice', 'Phoenix', 'Velina', 'Remielle'].includes(agentName)) {
        return { major: ['AP', 'ATK_'], minor: ['PEN', 'CR', 'ATK'] };
    }
    if (agentName === 'Nicole') {
        return { major: ['AP', 'ATK_'], minor: ['PEN', 'CR', 'ATK'] };
    }
    if (role === 'Defense' || role === 'Armorer' || agentName === 'Ben' || agentName === 'Claret') {
        return { major: ['DEF_', 'CR', 'CDMG'], minor: ['ATK_', 'HP_'] };
    }
    return { major: ['CDMG', 'ATK_', 'CR'], minor: ['PEN', 'ATK'] };
}

export function evaluateSingleDisc(disc, weights) {
    if (!disc || !Array.isArray(disc.substats)) {
        return { grade: 'E', majorRolls: 0, minorRolls: 0, weightedRolls: 0 };
    }
    let majorRolls = 0;
    let minorRolls = 0;

    disc.substats.forEach(sub => {
        const rolls = Math.max(1, Number(sub.rolls) || (1 + (Number(sub.up) || 0)));
        if (weights.major.includes(sub.key)) {
            majorRolls += rolls;
        } else if (weights.minor.includes(sub.key)) {
            minorRolls += rolls;
        }
    });

    const eff = majorRolls + minorRolls * 0.45;
    const isRightSide = Number(disc.slot) >= 4;
    const score = eff + (isRightSide ? 1.0 : 0.0);

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

export function evaluateAgentBuild(agentBuild, currentUid, allProfilesMap = {}) {
    const weights = getAgentSubstatWeights(agentBuild.name, agentBuild.role);
    let totalMajor = 0;
    let totalMinor = 0;
    const rollSummary = {};

    const evaluatedDiscs = (agentBuild.discs || []).map(d => {
        const ev = evaluateSingleDisc(d, weights);
        totalMajor += ev.majorRolls;
        totalMinor += ev.minorRolls;
        (d.substats || []).forEach(sub => {
            const r = Math.max(1, Number(sub.rolls) || (1 + (Number(sub.up) || 0)));
            if (weights.major.includes(sub.key) || weights.minor.includes(sub.key)) {
                rollSummary[sub.key] = (rollSummary[sub.key] || 0) + r;
            }
        });
        return { ...d, eval: ev };
    });

    const rn = agentBuild.rawNums || { hp: 10564, def: 820, atk: 4039, imp: 83, cr: 50.6, cdmg: 195.6, ap: 111, am: 94, penPct: 0, pen: 27, er: 1.2, dmg: 0 };
    const isCritRole = agentBuild.role === 'Attack' || agentBuild.role === 'Rupture' || agentBuild.name === 'Miyabi';
    const isAnomalyRole = agentBuild.role === 'Anomaly';

    // Affichage exclusivement des Stats de Base (exactement comme l'écran "Stats de base" en jeu)
    const computedStats = {
        hp:     { val: rn.hp.toLocaleString('fr-FR'), highlight: weights.major.includes('HP_') },
        atk:    { val: rn.atk.toLocaleString('fr-FR'), highlight: weights.major.includes('ATK_') },
        def:    { val: rn.def.toLocaleString('fr-FR'), highlight: weights.major.includes('DEF_') },
        imp:    { val: String(rn.imp), highlight: agentBuild.role === 'Stun' },
        cr:     { val: `${rn.cr.toFixed(1).replace('.', ',')} %`, highlight: isCritRole },
        cdmg:   { val: `${rn.cdmg.toFixed(1).replace('.', ',')} %`, highlight: isCritRole },
        am:     { val: String(rn.am), highlight: isAnomalyRole },
        ap:     { val: String(rn.ap), highlight: isAnomalyRole },
        penPct: { val: `${(rn.penPct || 0).toFixed(1).replace('.0', '').replace('.', ',')} %`, highlight: false },
        pen:    rn.pen > 0 ? { val: String(rn.pen), highlight: false } : null,
        er:     { val: String(rn.er).replace('.', ','), highlight: agentBuild.role === 'Support' },
        dmg:    rn.dmg > 0 ? { label: 'Bonus DGT', val: `${rn.dmg} %`, highlight: true } : null
    };

    const myScore = Number((totalMajor * 100 + totalMinor * 42).toFixed(2));
    const overallGrade = totalMajor >= 38 ? 'Z' : (totalMajor >= 33 ? 'S+' : (totalMajor >= 27 ? 'S' : (totalMajor >= 21 ? 'A' : 'B')));

    const allUIDs = Object.keys(allProfilesMap || {});
    const scoresForAgent = [];

    allUIDs.forEach(u => {
        const p = allProfilesMap[u];
        const matchingAg = (p?.agents || []).find(a => a.name === agentBuild.name);
        if (matchingAg) {
            let maj = 0, min = 0;
            (matchingAg.discs || []).forEach(d => {
                const ev = evaluateSingleDisc(d, weights);
                maj += ev.majorRolls;
                min += ev.minorRolls;
            });
            scoresForAgent.push({ uid: u, score: Number((maj * 100 + min * 42).toFixed(2)) });
        }
    });

    if (!scoresForAgent.some(s => s.uid === currentUid)) {
        scoresForAgent.push({ uid: currentUid, score: myScore });
    }

    scoresForAgent.sort((a, b) => b.score - a.score);

    const totalProfilesOnSite = Math.max(1, scoresForAgent.length);
    const myRankIndex = scoresForAgent.findIndex(s => s.uid === currentUid);
    const computedRank = myRankIndex !== -1 ? myRankIndex + 1 : 1;
    const topPctNum = (computedRank / totalProfilesOnSite) * 100;
    const topPct = topPctNum < 10 ? topPctNum.toFixed(2) : topPctNum.toFixed(1);

    return {
        ...agentBuild,
        stats: computedStats,
        overallGrade,
        weights,
        discs: evaluatedDiscs,
        totalMajor,
        totalMinor,
        buildScore: myScore,
        rollSummary,
        lbRank: computedRank,
        lbTotal: totalProfilesOnSite,
        topPct,
        topPctNum
    };
}

export function computeCalculatorSimulation(agentBuild, customConfig = {}) {
    const baseAtk = Number(customConfig.baseAtk) || 1681;
    const rolls = customConfig.rolls || { ATK_: 11, ATK: 1, CR: 15, CDMG: 13, PEN: 2 };
    const enemyDef = Number(customConfig.enemyDef) || 952;

    const calcDmgWithRolls = (rMap) => {
        const atkPct = 30 + (rMap.ATK_ || 0) * 3.0 + 24;
        const flatAtk = 316 + (rMap.ATK || 0) * 19;
        const initAtk = Math.round(baseAtk * (1 + atkPct / 100) + flatAtk);
        const combatAtk = Math.round(initAtk * 1.096);

        const initCr = Math.min(100, 5 + 24 + (rMap.CR || 0) * 2.4);
        const combatCr = Math.min(100, initCr + 25.0);

        const combatCdmg = 50 + 48 + (rMap.CDMG || 0) * 4.8;
        const dmgBonus = 30 + 24;
        const penFlat = (rMap.PEN || 0) * 9;

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
