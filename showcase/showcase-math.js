// showcase/showcase-math.js - Moteur Mathématique FAE V2, Décodage Enka.Network & Calculateur de Dégâts

// URL de ton Cloudflare Worker (si vide, utilise automatiquement le relais Enka direct + profil de démo)
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
    'Honed Edge': '#e8a838',
    'Auric Ink': '#c88e34'
};

export const AGENT_CUSTOM_COLORS = {
    Ellen: '#e11d48',
    Evelyn: '#7c3aed',
    Miyabi: '#0284c7',
    'Ye Shunguang': '#c2410c',
    Nicole: '#be185d',
    Jane: '#b45309',
    Yanagi: '#1d4ed8',
    Yixuan: '#a16207',
    Astra: '#9d174d',
    Burnice: '#ea580c',
    'Zhu Yuan': '#be185d',
    Phoenix: '#e11d48'
};

// Table complète des AvatarId ZZZ -> Nom exact dans js/data/agents.json
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
    1521: 'Aria',
    1531: 'Cissia',
    1541: 'Promeia',
    1551: 'Starlight Billy',
    1561: 'Velina',
    1571: 'Pyrois',
    1581: 'Norma',
    1591: 'Remielle',
    1601: 'Sigrid',
    1611: 'Claret',
    1621: 'Roxy',
    1631: 'Phoenix',
    1641: 'Severian'
};

// Table directe des IDs de Moteurs-Amplis ZZZ (Enka WeaponId -> Nom exact dans js/data/engines.json)
export const ENKA_WEAPON_ID_MAP = {
    // Moteurs Rang B
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
    // Moteurs Rang A Génériques / Craftables / BP
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
    // Moteurs Rang A Signatures (13 + 3 derniers chiffres de l'Agent)
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
    // Moteurs Rang S Standards & Limités (14 + 3 derniers chiffres de l'Agent)
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
    14152: 'Angel in the Shell',
    14153: 'Serpentine Seeker',
    14154: 'Frostfall Sickle',
    14155: 'Starlight Rider Faceplate',
    14156: 'Joyau Dore',
    14157: 'Sol Exuvia',
    14158: 'Chief Sidekick',
    14159: 'Ode of Resurrected Wings',
    14160: "Knight's Extolment",
    14161: 'Crimson Thirst',
    14162: 'Crimson Moon Casket',
    14163: "Nirvana's First Plume",
    14164: 'Sin-Ban Cage'
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
    if (s.startsWith('17')) return 'TW';
    return 'EU';
}

async function fetchJsonViaProxy(targetUrl) {
    const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
    ];
    for (const p of proxies) {
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 5500);
            const r = await fetch(p, { signal: ctrl.signal });
            clearTimeout(t);
            if (r.ok) return await r.json();
        } catch (e) {}
    }
    return null;
}

let LOCAL_DB = null;
async function ensureDictionariesLoaded() {
    if (LOCAL_DB) return LOCAL_DB;
    const [agents, engines, discs, guides] = await Promise.all([
        fetch('js/data/agents.json').then(r => r.json()).catch(() => []),
        fetch('js/data/engines.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/agent_database.json').then(r => r.json()).catch(() => ({}))
    ]);

    let hakushChars = {};
    let hakushWeps = {};
    try {
        const cachedC = sessionStorage.getItem('zsc_hakush_chars');
        const cachedW = sessionStorage.getItem('zsc_hakush_weps');
        if (cachedC && cachedW) {
            hakushChars = JSON.parse(cachedC);
            hakushWeps = JSON.parse(cachedW);
        } else {
            const [hc, hw] = await Promise.all([
                fetchJsonViaProxy('https://api.hakush.in/zzz/data/character.json'),
                fetchJsonViaProxy('https://api.hakush.in/zzz/data/weapon.json')
            ]);
            if (hc) { hakushChars = hc; sessionStorage.setItem('zsc_hakush_chars', JSON.stringify(hc)); }
            if (hw) { hakushWeps = hw; sessionStorage.setItem('zsc_hakush_weps', JSON.stringify(hw)); }
        }
    } catch (e) {}

    LOCAL_DB = { agents, engines, discs, guides, hakushChars, hakushWeps };
    return LOCAL_DB;
}

// Associe n'importe quel nom complet/anglais d'agent d'Enka/Hakush au vrai nom dans js/data/agents.json
function resolveProxyQGAgent(avId, rawName, db) {
    const cleanRaw = String(rawName || '').trim();
    const lower = cleanRaw.toLowerCase();

    // 1. Correspondance directe ou par sous-chaîne avec js/data/agents.json (ex: "Hoshimi Miyabi" -> "Miyabi", "Ellen Joe" -> "Ellen")
    if (cleanRaw) {
        const exact = db.agents.find(a => a.name.toLowerCase() === lower);
        if (exact) return exact;

        const aliasMap = {
            'astra yao': 'Astra',
            'jane doe': 'Jane',
            'soldier 0 - anby': 'Soldier 0 Anby',
            'soldier 0 anby': 'Soldier 0 Anby',
            'starlight - billy': 'Starlight Billy',
            'orphie & magus': 'Orphie and Magus',
            'orphie': 'Orphie and Magus',
            'nekomiya mana': 'Nekomata',
            'alexandrina': 'Rina',
            'von lycaon': 'Lycaon'
        };
        if (aliasMap[lower]) {
            const aliased = db.agents.find(a => a.name === aliasMap[lower]);
            if (aliased) return aliased;
        }

        const partial = db.agents.find(a =>
            lower.includes(a.name.toLowerCase()) || a.name.toLowerCase().includes(lower)
        );
        if (partial) return partial;
    }

    // 2. Correspondance par Table d'ID
    const mappedName = ENKA_AVATAR_MAP[avId];
    if (mappedName) {
        const found = db.agents.find(a => a.name === mappedName);
        if (found) return found;
    }

    // 3. Fallback sécurisé sur un agent existant de agents.json (ne renvoie JAMAIS "Agent #..." sans image)
    const fallbackIdx = Math.abs(Number(avId) || 0) % (db.agents.length || 1);
    return db.agents[fallbackIdx] || { name: 'Miyabi', element: 'Frost', role: 'Anomaly', rank: 'S' };
}

// Associe l'ID d'arme Enka (`av.Weapon.Id`) au vrai Moteur-Ampli de js/data/engines.json
function resolveProxyQGEngine(wepId, agentName, refinement, db) {
    const wId = Number(wepId) || 0;
    const hakWep = db.hakushWeps?.[wId];
    const candidates = [
        ENKA_WEAPON_ID_MAP[wId],
        hakWep?.EN,
        hakWep?.FR
    ].filter(Boolean);

    for (const cand of candidates) {
        const cLow = String(cand).toLowerCase().replace(/[\[\]\-_]/g, ' ').trim();
        const found = Object.entries(db.engines || {}).find(([key, e]) => {
            const kLow = key.toLowerCase().replace(/[\[\]\-_]/g, ' ').trim();
            const enLow = (e.name?.en || '').toLowerCase().replace(/[\[\]\-_]/g, ' ').trim();
            const frLow = (e.name?.fr || '').toLowerCase().replace(/[\[\]\-_]/g, ' ').trim();
            return kLow === cLow || enLow === cLow || frLow === cLow || enLow.includes(cLow) || cLow.includes(enLow);
        });
        if (found) {
            const [key, engData] = found;
            return {
                name: engData.name?.en || engData.name?.fr || key,
                img: `assets/W-Engine/${(engData.img || 'Starlight_Engine.webp').replace('.png', '.webp')}`,
                refinement: Number(refinement) || 1,
                rank: engData.rank || (wId >= 14000 ? 'S' : (wId >= 13000 ? 'A' : 'B'))
            };
        }
    }

    // Si c'est une arme Signature (14xxx ou 13xxx) ou non résolue, on prend l'arme recommandée n°1 du guide de cet Agent dans agent_database.json !
    const guideEngines = db.guides?.[agentName]?.engines || [];
    const sigFromGuide = wId >= 14000 ? guideEngines[0] : (guideEngines.find(e => !String(e.tag).includes('5★') && !String(e.tag).includes('Signature')) || guideEngines[0]);
    if (sigFromGuide && sigFromGuide.img) {
        const cleanImg = sigFromGuide.img.replace('.png', '.webp');
        return {
            name: sigFromGuide.name || 'Signature W-Engine',
            img: `assets/W-Engine/${cleanImg}`,
            refinement: Number(refinement) || 1,
            rank: wId >= 14000 ? 'S' : 'A'
        };
    }

    return {
        name: 'Starlight Engine',
        img: 'assets/W-Engine/Starlight_Engine.webp',
        refinement: Number(refinement) || 1,
        rank: wId >= 14000 ? 'S' : 'A'
    };
}

export async function fetchEnkaShowcaseData(uid) {
    const cleanUid = String(uid || '').replace(/\D/g, '');
    if (cleanUid.length < 8) {
        throw new Error('UID invalide (8 à 10 chiffres requis).');
    }

    const db = await ensureDictionariesLoaded();
    const targetUrl = `https://enka.network/api/zzz/uid/${cleanUid}`;
    let rawData = null;

    if (WORKER_BASE_URL) {
        try {
            const r = await fetch(`${WORKER_BASE_URL.replace(/\/$/, '')}/uid/${cleanUid}`);
            if (r.ok) rawData = await r.json();
        } catch (e) {}
    }
    if (!rawData || !rawData.PlayerInfo) {
        rawData = await fetchJsonViaProxy(targetUrl);
    }

    if (!rawData || !rawData.PlayerInfo) {
        throw new Error("Impossible de joindre Enka.Network ou la vitrine de cet UID est masquée en jeu.");
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
        const rawHakushName = db.hakushChars?.[avId]?.EN || db.hakushChars?.[avId]?.name || '';
        const agentMeta = resolveProxyQGAgent(avId, rawHakushName, db);
        const agentName = agentMeta.name;
        const element = agentMeta.element || 'Physical';
        const role = agentMeta.role || 'Attack';
        const mindscape = Number(av.TalentLevel) || 0;

        const engineObj = resolveProxyQGEngine(av.Weapon?.Id, agentName, av.Weapon?.UpgradeLevel, db);

        const discs = [];
        const setCounts = {};
        let bonusHpPct = 0, bonusHpFlat = 0;
        let bonusAtkPct = engineObj.rank === 'S' ? 30 : 24, bonusAtkFlat = 0;
        let bonusDefPct = 0, bonusDefFlat = 0;
        let bonusCr = 5.0 + (engineObj.rank === 'S' ? 12 : 0), bonusCdmg = 50.0 + (engineObj.rank === 'S' ? 24 : 0);
        let bonusAp = 95, bonusAmPct = 0, bonusImpPct = 0, bonusErPct = 0, bonusPenFlat = 0, bonusDmgPct = 0;

        (av.EquippedList || []).forEach(eq => {
            const slot = Number(eq.Slot) || 1;
            const eqData = eq.Equipment || {};
            const discLevel = Number(eqData.Level) ?? 15;
            // Respecte la règle FAE : seuls les disques niveau 15 sont pris en compte
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

            if (mainMeta?.key === 'HP') bonusHpFlat += 2200;
            else if (mainMeta?.key === 'ATK') bonusAtkFlat += 316;
            else if (mainMeta?.key === 'DEF') bonusDefFlat += 184;
            else if (mainMeta?.key === 'HP_') bonusHpPct += 30;
            else if (mainMeta?.key === 'ATK_') bonusAtkPct += 30;
            else if (mainMeta?.key === 'DEF_') bonusDefPct += 48;
            else if (mainMeta?.key === 'CR') bonusCr += 24;
            else if (mainMeta?.key === 'CDMG') bonusCdmg += 48;
            else if (mainMeta?.key === 'AP') bonusAp += 92;
            else if (mainMeta?.key === 'AM_') bonusAmPct += 30;
            else if (mainMeta?.key === 'IMP_') bonusImpPct += 18;
            else if (mainMeta?.key === 'ER_') bonusErPct += 60;
            else if (mainMeta?.key === 'DMG_') bonusDmgPct += 30;

            const substats = (eqData.RandomPropertyList || []).map(rp => {
                const pMeta = ENKA_PROP_MAP[rp.PropertyId] || { key: 'DEF', step: 15 };
                const totalRolls = Math.max(1, Number(rp.PropertyLevel) || 1);
                const upgrades = Math.max(0, totalRolls - 1);
                const valAdded = totalRolls * (pMeta.step || 0);

                if (pMeta.key === 'HP') bonusHpFlat += valAdded;
                else if (pMeta.key === 'ATK') bonusAtkFlat += valAdded;
                else if (pMeta.key === 'DEF') bonusDefFlat += valAdded;
                else if (pMeta.key === 'HP_') bonusHpPct += valAdded;
                else if (pMeta.key === 'ATK_') bonusAtkPct += valAdded;
                else if (pMeta.key === 'DEF_') bonusDefPct += valAdded;
                else if (pMeta.key === 'CR') bonusCr += valAdded;
                else if (pMeta.key === 'CDMG') bonusCdmg += valAdded;
                else if (pMeta.key === 'AP') bonusAp += valAdded;
                else if (pMeta.key === 'PEN') bonusPenFlat += valAdded;

                return { key: pMeta.key, up: upgrades, rolls: totalRolls };
            });

            discs.push({ slot, setKey, setImg, main: mainLabel, substats });
        });

        discs.sort((a, b) => a.slot - b.slot);

        if ((setCounts.Woodpecker_Electro || 0) >= 2) bonusCr += 8;
        if ((setCounts.Branch_Blade_Song || 0) >= 2) bonusCdmg += 16;
        if ((setCounts.Astral_Voice || 0) >= 2 || (setCounts.Hormone_Punk || 0) >= 2) bonusAtkPct += 10;
        if ((setCounts.Chaos_Jazz || 0) >= 2 || (setCounts.Freedom_Blues || 0) >= 2) bonusAp += 30;

        const baseAtk = (role === 'Attack' ? 915 : 830) + (engineObj.rank === 'S' ? 713 : 594);
        const initAtk = Math.round(baseAtk * (1 + bonusAtkPct / 100) + bonusAtkFlat);
        const buffedAtk = Math.round(initAtk * 1.18 + 600);
        const initHp = Math.round(7850 * (1 + bonusHpPct / 100) + bonusHpFlat);
        const initDef = Math.round(610 * (1 + bonusDefPct / 100) + bonusDefFlat);
        const initImp = Math.round((role === 'Stun' ? 136 : 92) * (1 + bonusImpPct / 100));
        const initAm = Math.round((role === 'Anomaly' ? 148 : 94) * (1 + bonusAmPct / 100));
        const initEr = (1.2 * (1 + bonusErPct / 100)).toFixed(2) + '/s';

        const isCritRole = role === 'Attack' || role === 'Rupture' || agentName === 'Miyabi';
        const buffedCr = Math.min(100, bonusCr + (isCritRole ? 15 : 0));
        const buffedCdmg = bonusCdmg + (isCritRole ? 50 : 0);

        return {
            name: agentName,
            element,
            role,
            mindscape,
            locked: false,
            favorite: false,
            leaderboardName: engineObj.rank === 'S' ? 'S Rank Limited W-Engines' : 'A Rank W-Engines',
            updatedAt: nowDate,
            lastUpdatedTs: nowTs - orderIdx * 1000,
            engine: engineObj,
            stats: {
                hp: { init: initHp.toLocaleString('en-US'), buffed: '' },
                def: { init: initDef.toLocaleString('en-US'), buffed: '' },
                atk: { init: initAtk.toLocaleString('en-US'), buffed: buffedAtk.toLocaleString('en-US'), highlight: true },
                imp: { init: String(initImp), buffed: '' },
                cr: { init: `${bonusCr.toFixed(1)}%`, buffed: buffedCr > bonusCr ? `${buffedCr.toFixed(1)}%` : '', highlight: isCritRole },
                cdmg: { init: `${bonusCdmg.toFixed(1)}%`, buffed: buffedCdmg > bonusCdmg ? `${buffedCdmg.toFixed(1)}%` : '', highlight: isCritRole },
                ap: { init: String(Math.round(bonusAp)), buffed: '', highlight: role === 'Anomaly' },
                am: { init: String(initAm), buffed: '', highlight: role === 'Anomaly' },
                pen: bonusPenFlat > 0 ? { init: String(Math.round(bonusPenFlat)), buffed: '' } : null,
                er: { init: initEr, buffed: '' },
                dmg: bonusDmgPct > 0 ? { label: 'DMG%', init: `${bonusDmgPct}%`, buffed: `${bonusDmgPct + 25}%`, highlight: true } : null
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

// Calcule le classement réel (Rank #X out of Y et Top %) uniquement par rapport aux profils (UIDs) enregistrés sur le site !
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

    const myScore = Number((totalMajor * 100 + totalMinor * 42).toFixed(2));

    // Recense tous les profils (UIDs différents) enregistrés sur le site
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

    // Nombre total de profils ayant cet agent (ou nombre total d'UIDs sur le site)
    const totalProfilesOnSite = Math.max(1, scoresForAgent.length);
    const myRankIndex = scoresForAgent.findIndex(s => s.uid === currentUid);
    const computedRank = myRankIndex !== -1 ? myRankIndex + 1 : 1;
    const topPctNum = (computedRank / totalProfilesOnSite) * 100;
    const topPct = topPctNum < 10 ? topPctNum.toFixed(2) : topPctNum.toFixed(1);

    return {
        ...agentBuild,
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
    const baseAtk = Number(customConfig.baseAtk) || 1650;
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
