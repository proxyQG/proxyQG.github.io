// showcase/showcase-math.js - Décodeur Officiel via Cloudflare Worker + Enka Store (Zéro erreur console)

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

export const SUPPORT_CATALOG = {
    agents: [
        { key: 'none',    name: 'None',    img: '', buffsLbl: '', bonus: {} },
        { key: 'Astra',   name: 'Astra',   img: 'assets/Agents/Astra.webp',   buffsLbl: 'ATK • CDMG • DMG%', bonus: { atkFlat: 1200, cdmg: 25, dmg: 20 } },
        { key: 'Nicole',  name: 'Nicole',  img: 'assets/Agents/Nicole.webp',  buffsLbl: 'DMG% • CR',         bonus: { dmg: 25, cr: 15 } },
        { key: 'Caesar',  name: 'Caesar',  img: 'assets/Agents/Caesar.webp',  buffsLbl: 'DMG% • ATK',        bonus: { atkFlat: 1000, dmg: 25 } },
        { key: 'Lucia',   name: 'Lucia',   img: 'assets/Agents/Lucia.webp',   buffsLbl: 'DMG% • HP%',        bonus: { dmg: 25, hpPct: 15 } },
        { key: 'Yuzuha',  name: 'Yuzuha',  img: 'assets/Agents/Yuzuha.webp',  buffsLbl: 'ATK • DMG%',        bonus: { atkFlat: 600, dmg: 20 } },
        { key: 'Dialyn',  name: 'Dialyn',  img: 'assets/Agents/Dialyn.webp',  buffsLbl: 'CDMG • DMG%',       bonus: { cdmg: 30, dmg: 15 } },
        { key: 'Soukaku', name: 'Soukaku', img: 'assets/Agents/Soukaku.webp', buffsLbl: 'DMG% • ATK',        bonus: { atkFlat: 1000, dmg: 20 } },
        { key: 'Lycaon',  name: 'Lycaon',  img: 'assets/Agents/Lycaon.webp',  buffsLbl: 'DMG% • RES%',       bonus: { dmg: 25 } },
        { key: 'Lucy',    name: 'Lucy',    img: 'assets/Agents/Lucy.webp',    buffsLbl: 'ATK • CDMG',        bonus: { atkFlat: 600, cdmg: 10 } },
        { key: 'Lighter', name: 'Lighter', img: 'assets/Agents/Lighter.webp', buffsLbl: 'DMG% • CDMG',       bonus: { dmg: 40 } },
        { key: 'Rina',    name: 'Rina',    img: 'assets/Agents/Rina.webp',    buffsLbl: 'DMG% • PEN%',       bonus: { dmg: 10 } },
        { key: 'Qingyi',  name: 'Qingyi',  img: 'assets/Agents/Qingyi.webp',  buffsLbl: 'DMG%',              bonus: { dmg: 20 } },
        { key: 'Trigger', name: 'Trigger', img: 'assets/Agents/Trigger.webp', buffsLbl: 'DMG%',              bonus: { dmg: 25 } },
        { key: 'Ju Fufu', name: 'Ju Fufu', img: 'assets/Agents/Ju Fufu.webp', buffsLbl: 'CDMG • DMG%',       bonus: { cdmg: 20, dmg: 15 } },
        { key: 'Koleda',  name: 'Koleda',  img: 'assets/Agents/Koleda.webp',  buffsLbl: 'DMG% • Chain',      bonus: { dmg: 15 } },
        { key: 'Ben',     name: 'Ben',     img: 'assets/Agents/Ben.webp',     buffsLbl: 'CR',                bonus: { cr: 16 } }
    ],
    weapons: [
        { key: 'none',                 name: 'None',                 img: '', buffsLbl: '', bonus: {} },
        { key: 'Elegant Vanity',       name: 'Elegant Vanity',       img: 'assets/W-Engine/W-Engine_Elegant_Vanity.webp',       buffsLbl: 'DMG%',        bonus: { dmg: 20 } },
        { key: 'The Vault',            name: 'The Vault',            img: 'assets/W-Engine/W-Engine_The_Vault.webp',            buffsLbl: 'DMG%',        bonus: { dmg: 15 } },
        { key: 'Kaboom the Cannon',    name: 'Kaboom the Ca...',     img: 'assets/W-Engine/W-Engine_Kaboom_the_Cannon.webp',    buffsLbl: 'ATK%',        bonus: { atkPct: 12 } },
        { key: 'Bashful Demon',        name: 'Bashful Demon',        img: 'assets/W-Engine/W-Engine_Bashful_Demon.webp',        buffsLbl: 'ATK%',        bonus: { atkPct: 8 } },
        { key: 'Unfettered Game Ball', name: 'Unfettered Gam...',    img: 'assets/W-Engine/W-Engine_Unfettered_Game_Ball.webp', buffsLbl: 'CR',          bonus: { cr: 12 } },
        { key: 'Tusks of Fury',        name: 'Tusks of Fury',        img: 'assets/W-Engine/W-Engine_Tusks_of_Fury.webp',        buffsLbl: 'DMG% • Daze', bonus: { dmg: 18 } },
        { key: 'Blazing Laurel',       name: 'Blazing Laurel',       img: 'assets/W-Engine/W-Engine_Blazing_Laurel.webp',       buffsLbl: 'CDMG',        bonus: { cdmg: 30 } },
        { key: 'Weeping Cradle',       name: 'Weeping Cradle',       img: 'assets/W-Engine/W-Engine_Weeping_Cradle.webp',       buffsLbl: 'DMG%',        bonus: { dmg: 15 } },
        { key: 'Ice-Jade Teapot',      name: 'Ice-Jade Teapot',      img: 'assets/W-Engine/W-Engine_Ice-Jade_Teapot.webp',      buffsLbl: 'DMG%',        bonus: { dmg: 20 } },
        { key: 'Half-Sugar Bunny',     name: 'Half-Sugar Bunny',     img: 'assets/W-Engine/W-Engine_Half-Sugar_Bunny.webp',     buffsLbl: 'ATK% • CDMG', bonus: { atkPct: 10, cdmg: 30 } },
        { key: 'Dreamlit Hearth',      name: 'Dreamlit Hearth',      img: 'assets/W-Engine/W-Engine_Dreamlit_Hearth.webp',      buffsLbl: 'DMG% • HP%',  bonus: { dmg: 25, hpPct: 15 } },
        { key: 'Yesterday Calls',      name: 'Yesterday Calls',      img: 'assets/W-Engine/W-Engine_Yesterday_Calls.webp',      buffsLbl: 'CDMG',        bonus: { cdmg: 30 } },
        { key: 'Spectral Gaze',        name: 'Spectral Gaze',        img: 'assets/W-Engine/W-Engine_Spectral_Gaze.webp',        buffsLbl: 'DEF Red.',    bonus: { dmg: 14 } }
    ],
    sets: [
        { key: 'none',                 name: 'None',                 img: '', buffsLbl: '', bonus: {} },
        { key: 'Astral_Voice',         name: 'Astral Voice',         img: 'assets/Disque/Astral_Voice.webp',         buffsLbl: 'DMG%', bonus: { dmg: 24 } },
        { key: 'King_of_the_Summit',   name: 'King of the Sum...',   img: 'assets/Disque/King_of_the_Summit.webp',   buffsLbl: 'CDMG', bonus: { cdmg: 30 } },
        { key: 'Moonlight_Lullaby',    name: 'Moonlight Lullaby',    img: 'assets/Disque/Moonlight_Lullaby.webp',    buffsLbl: 'DMG%', bonus: { dmg: 18 } },
        { key: 'Swing_Jazz',           name: 'Swing Jazz',           img: 'assets/Disque/Swing_Jazz.webp',           buffsLbl: 'DMG%', bonus: { dmg: 15 } },
        { key: 'Proto_Punk',           name: 'Proto Punk',           img: 'assets/Disque/Proto_Punk.webp',           buffsLbl: 'DMG%', bonus: { dmg: 15 } },
        { key: 'Bunny_in_Wonderland',  name: 'Bunny in Wonde...',    img: 'assets/Disque/Bunny_in_Wonderland.webp',  buffsLbl: 'DMG%', bonus: { dmg: 18 } }
    ]
};

// Table directe des IDs d'Agents ZZZ connus
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
    1311: 'Astra',
    1321: 'Evelyn',
    1331: 'Vivian',
    1351: 'Pulchra',
    1361: 'Trigger',
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
    1511: 'Nangong Yu'
};

// Table directe des IDs de Moteurs-Amplis ZZZ
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
    31503: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%', elemHint: 'Physical' },
    31603: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%', elemHint: 'Fire' },
    31703: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%', elemHint: 'Ice' },
    31803: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%', elemHint: 'Electric' },
    31903: { key: 'DMG_',  label: 'DMG%',  isPct: true,  mainLv15: '30%', elemHint: 'Ether' }
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
        enkaLocEn: enkaLocRoot?.en || enkaLocRoot?.['en'] || {}
    };
    return LOCAL_DB;
}

// Résout l'agent avec 4 niveaux de vérification et garantit TOUJOURS un vrai nom de js/data/agents.json (zéro 404 image)
function resolveExactAgent(avId, setCounts, mainStatsBySlot, db) {
    const numId = Number(avId);
    const idStr = String(avId);
    const enkaAv = db.enkaAvatars?.[idStr] || {};

    // 1. Table d'IDs directe vérifiée
    if (ENKA_AVATAR_MAP[numId]) {
        const directMatch = db.agents.find(a => a.name === ENKA_AVATAR_MAP[numId]);
        if (directMatch) return directMatch;
    }

    // 2. Traduction via Enka loc.json ou codename interne dans enkaAv.Name / Image
    const locName = enkaAv.Name ? (db.enkaLocEn?.[enkaAv.Name] || '') : '';
    const codeSuffix = enkaAv.Name ? String(enkaAv.Name).split('_').pop() : '';
    const rawCandidates = [locName, codeSuffix, enkaAv.Name].filter(Boolean);

    const aliasTable = {
        'unagi': 'Miyabi',
        'hoshimi miyabi': 'Miyabi',
        'miyabi': 'Miyabi',
        'ellen joe': 'Ellen',
        'ellen': 'Ellen',
        'evelyn chevalier': 'Evelyn',
        'evelyn': 'Evelyn',
        'astra yao': 'Astra',
        'astra': 'Astra',
        'yao': 'Astra',
        'tsukishiro yanagi': 'Yanagi',
        'yanagi': 'Yanagi',
        'asaba harumasa': 'Harumasa',
        'harumasa': 'Harumasa',
        'jane doe': 'Jane',
        'jane': 'Jane',
        'zhu yuan': 'Zhu Yuan',
        'zhuyuan': 'Zhu Yuan',
        'qingyi': 'Qingyi',
        'seth lowell': 'Seth',
        'seth': 'Seth',
        'caesar king': 'Caesar',
        'caesar': 'Caesar',
        'burnice white': 'Burnice',
        'burnice': 'Burnice',
        'lighter': 'Lighter',
        'piper wheel': 'Piper',
        'piper': 'Piper',
        'luciana de montefio': 'Lucy',
        'lucy': 'Lucy',
        'von lycaon': 'Lycaon',
        'lycaon': 'Lycaon',
        'alexandrina sebastiane': 'Rina',
        'rina': 'Rina',
        'corin wickes': 'Corin',
        'corin': 'Corin',
        'nekomiya mana': 'Nekomata',
        'nekomata': 'Nekomata',
        'billy kid': 'Billy',
        'billy': 'Billy',
        'anby demara': 'Anby',
        'anby': 'Anby',
        'nicole demara': 'Nicole',
        'nicole': 'Nicole',
        'soldier 11': 'Soldier 11',
        'soldier11': 'Soldier 11',
        'koleda belobog': 'Koleda',
        'koleda': 'Koleda',
        'grace howard': 'Grace',
        'grace': 'Grace',
        'ben bigger': 'Ben',
        'ben': 'Ben',
        'anton ivanov': 'Anton',
        'anton': 'Anton',
        'soukaku': 'Soukaku',
        'soldier 0 - anby': 'Soldier 0 Anby',
        'soldier 0 anby': 'Soldier 0 Anby',
        'anby0': 'Soldier 0 Anby',
        'silveranby': 'Soldier 0 Anby',
        'pulchra fellini': 'Pulchra',
        'pulchra': 'Pulchra',
        'trigger': 'Trigger',
        'vivian banshee': 'Vivian',
        'vivian': 'Vivian',
        'hugo vlad': 'Hugo',
        'hugo': 'Hugo',
        'yi xuan': 'Yixuan',
        'yixuan': 'Yixuan',
        'ju fufu': 'Ju Fufu',
        'jufufu': 'Ju Fufu',
        'pan yinhu': 'Pan Yinhu',
        'panyinhu': 'Pan Yinhu',
        'ukinami yuzuha': 'Yuzuha',
        'yuzuha': 'Yuzuha',
        'alice thymefield': 'Alice',
        'alice': 'Alice',
        'seed': 'Seed',
        'orphie & magus': 'Orphie and Magus',
        'orphie and magus': 'Orphie and Magus',
        'orphie': 'Orphie and Magus',
        'komano manato': 'Manato',
        'manato': 'Manato',
        'lucia': 'Lucia',
        'yidhari': 'Yidhari',
        'dialyn': 'Dialyn',
        'banyue': 'Banyue',
        'zhao': 'Zhao',
        'ye shunguang': 'Ye Shunguang',
        'yeshunguang': 'Ye Shunguang',
        'shunguang': 'Ye Shunguang',
        'sunna': 'Sunna',
        'aria': 'Aria',
        'nangong yu': 'Nangong Yu',
        'nangongyu': 'Nangong Yu',
        'cissia': 'Cissia',
        'promeia': 'Promeia',
        'starlight billy': 'Starlight Billy',
        'velina': 'Velina',
        'pyrois': 'Pyrois',
        'norma': 'Norma',
        'remielle': 'Remielle',
        'sigrid': 'Sigrid',
        'claret': 'Claret',
        'roxy': 'Roxy',
        'phoenix': 'Phoenix',
        'severian': 'Severian'
    };

    for (const raw of rawCandidates) {
        const low = String(raw).toLowerCase().trim();
        if (aliasTable[low]) {
            const matched = db.agents.find(a => a.name === aliasTable[low]);
            if (matched) return matched;
        }
        const exact = db.agents.find(a => a.name.toLowerCase() === low);
        if (exact) return exact;
    }

    // 3. Reconnaissance intelligente par empreinte de Build (Sets 4P/2P équipés + Rôle/Élément de enkaAv)
    const equipped4P = Object.entries(setCounts || {}).find(([, c]) => c >= 4)?.[0] || null;
    const equipped2P = Object.entries(setCounts || {}).find(([k, c]) => c >= 2 && k !== equipped4P)?.[0] || null;
    const enkaElem = Array.isArray(enkaAv.ElementTypes) ? enkaAv.ElementTypes[0] : null;
    const enkaRole = enkaAv.ProfessionType || enkaAv.WeaponType || null;

    let bestCandidate = null;
    let bestScore = -1;

    for (const ag of db.agents) {
        let sc = 0;
        const g = db.guides?.[ag.name];
        if (enkaElem && ag.element.toLowerCase().includes(String(enkaElem).toLowerCase())) sc += 40;
        if (enkaRole && ag.role.toLowerCase() === String(enkaRole).toLowerCase()) sc += 40;

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

// Résout le Moteur-Ampli exact de l'agent (et choisit l'arme Signature de l'agent dans agent_database.json si l'ID est récent)
function resolveExactEngine(wepId, agentName, refinement, db) {
    const numWep = Number(wepId) || 0;
    const idStr = String(wepId || '');
    const enkaWep = db.enkaWeapons?.[idStr] || {};

    // 1. Table directe des IDs d'armes
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
            return {
                name: engData.name?.en || engData.name?.fr || key,
                img: `assets/W-Engine/${(engData.img || 'Starlight_Engine.webp').replace('.png', '.webp')}`,
                refinement: Number(refinement) || 1,
                rank: engData.rank || (numWep >= 14000 ? 'S' : 'A')
            };
        }
    }

    // 2. Correspondance avec le moteur recommandé dans le guide de cet agent (agent_database.json)
    const guideEngines = db.guides?.[agentName]?.engines || [];
    const isSRankWep = numWep >= 14000 || enkaWep.Rarity >= 4;
    const pickedGuideEng = isSRankWep
        ? (guideEngines[0] || null)
        : (guideEngines.find(e => String(e.tag).includes('A') || String(e.tag).includes('F2P') || String(e.tag).includes('4★')) || guideEngines[1] || guideEngines[0]);

    if (pickedGuideEng && pickedGuideEng.img) {
        const cleanFile = pickedGuideEng.img.replace('.png', '.webp');
        const fullPath = cleanFile.startsWith('W-Engine_') || cleanFile.includes('_')
            ? `assets/W-Engine/${cleanFile}`
            : `assets/W-Engine/${cleanFile}`;
        return {
            name: pickedGuideEng.name || 'Signature W-Engine',
            img: fullPath,
            refinement: Number(refinement) || 1,
            rank: isSRankWep ? 'S' : 'A'
        };
    }

    return {
        name: 'Starlight Engine',
        img: 'assets/W-Engine/Starlight_Engine.webp',
        refinement: Number(refinement) || 1,
        rank: isSRankWep ? 'S' : 'A'
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

        // Pré-calcul des sets de disques équipés pour aider à identifier l'agent si son ID est nouveau
        const preSetCounts = {};
        const preMainStats = {};
        (av.EquippedList || []).forEach(eq => {
            const slot = Number(eq.Slot) || 1;
            const eqId = Number(eq.Equipment?.Id) || 31000;
            const suitId = Math.floor(eqId / 100) * 100;
            const sk = ENKA_DISC_SET_MAP[suitId] || 'Woodpecker_Electro';
            preSetCounts[sk] = (preSetCounts[sk] || 0) + 1;
            const mp = (eq.Equipment?.MainPropertyList || [])[0];
            if (mp) preMainStats[slot] = ENKA_PROP_MAP[mp.PropertyId]?.label || 'ATK%';
        });

        const agentMeta = resolveExactAgent(avId, preSetCounts, preMainStats, db);
        const agentName = agentMeta.name;
        const element = agentMeta.element || 'Physical';
        const role = agentMeta.role || 'Attack';
        const mindscape = Number(av.TalentLevel) || 0;

        const engineObj = resolveExactEngine(av.Weapon?.Id, agentName, av.Weapon?.UpgradeLevel, db);

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
        const initAtkNum = Math.round(baseAtk * (1 + bonusAtkPct / 100) + bonusAtkFlat);
        const initHpNum = Math.round(7850 * (1 + bonusHpPct / 100) + bonusHpFlat);
        const initDefNum = Math.round(610 * (1 + bonusDefPct / 100) + bonusDefFlat);
        const initImpNum = Math.round((role === 'Stun' ? 136 : 92) * (1 + bonusImpPct / 100));
        const initAmNum = Math.round((role === 'Anomaly' ? 148 : 94) * (1 + bonusAmPct / 100));
        const initErNum = Number((1.2 * (1 + bonusErPct / 100)).toFixed(2));

        return {
            name: agentName,
            enkaAvatarId: avId,
            enkaWeaponId: Number(av.Weapon?.Id) || 0,
            element,
            role,
            mindscape,
            locked: false,
            favorite: false,
            supports: [
                { agent: 'none', weapon: 'none', set: 'none' },
                { agent: 'none', weapon: 'none', set: 'none' }
            ],
            leaderboardName: engineObj.rank === 'S' ? 'S Rank Limited W-Engines' : 'A Rank W-Engines',
            updatedAt: nowDate,
            lastUpdatedTs: nowTs - orderIdx * 1000,
            engine: engineObj,
            rawNums: {
                hp: initHpNum,
                def: initDefNum,
                atk: initAtkNum,
                imp: initImpNum,
                cr: Number(bonusCr.toFixed(1)),
                cdmg: Number(bonusCdmg.toFixed(1)),
                ap: Math.round(bonusAp),
                am: initAmNum,
                pen: Math.round(bonusPenFlat),
                er: initErNum,
                dmg: bonusDmgPct
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

    let supAtkFlat = 0, supAtkPct = 0, supCr = 0, supCdmg = 0, supDmg = 0, supHpPct = 0;
    const supSlots = Array.isArray(agentBuild.supports) ? agentBuild.supports : [
        { agent: 'none', weapon: 'none', set: 'none' },
        { agent: 'none', weapon: 'none', set: 'none' }
    ];

    supSlots.forEach(sl => {
        const aObj = SUPPORT_CATALOG.agents.find(x => x.key === sl.agent);
        const wObj = SUPPORT_CATALOG.weapons.find(x => x.key === sl.weapon);
        const sObj = SUPPORT_CATALOG.sets.find(x => x.key === sl.set);
        [aObj?.bonus, wObj?.bonus, sObj?.bonus].forEach(b => {
            if (!b) return;
            supAtkFlat += b.atkFlat || 0;
            supAtkPct += b.atkPct || 0;
            supCr += b.cr || 0;
            supCdmg += b.cdmg || 0;
            supDmg += b.dmg || 0;
            supHpPct += b.hpPct || 0;
        });
    });

    const rn = agentBuild.rawNums || { hp: 10050, def: 853, atk: 3100, imp: 92, cr: 55, cdmg: 140, ap: 120, am: 116, pen: 0, er: 1.2, dmg: 30 };
    const isCritRole = agentBuild.role === 'Attack' || agentBuild.role === 'Rupture' || agentBuild.name === 'Miyabi';

    const buffedHp = supHpPct > 0 ? Math.round(rn.hp * (1 + supHpPct / 100)) : rn.hp;
    const buffedAtk = Math.round(rn.atk * (1 + (18 + supAtkPct) / 100) + supAtkFlat);
    const buffedCr = Math.min(100, Number((rn.cr + (isCritRole ? 15 : 0) + supCr).toFixed(1)));
    const buffedCdmg = Number((rn.cdmg + (isCritRole ? 50 : 0) + supCdmg).toFixed(1));
    const buffedDmg = rn.dmg + 25 + supDmg;

    const computedStats = {
        hp:   { init: rn.hp.toLocaleString('en-US'), buffed: buffedHp > rn.hp ? buffedHp.toLocaleString('en-US') : '' },
        def:  { init: rn.def.toLocaleString('en-US'), buffed: '' },
        atk:  { init: rn.atk.toLocaleString('en-US'), buffed: buffedAtk.toLocaleString('en-US'), highlight: true },
        imp:  { init: String(rn.imp), buffed: '' },
        cr:   { init: `${rn.cr.toFixed(1)}%`, buffed: buffedCr > rn.cr ? `${buffedCr.toFixed(1)}%` : '', highlight: isCritRole },
        cdmg: { init: `${rn.cdmg.toFixed(1)}%`, buffed: buffedCdmg > rn.cdmg ? `${buffedCdmg.toFixed(1)}%` : '', highlight: isCritRole },
        ap:   { init: String(rn.ap), buffed: '', highlight: agentBuild.role === 'Anomaly' },
        am:   { init: String(rn.am), buffed: '', highlight: agentBuild.role === 'Anomaly' },
        pen:  rn.pen > 0 ? { init: String(rn.pen), buffed: '' } : null,
        er:   { init: `${rn.er.toFixed(2)}/s`, buffed: '' },
        dmg:  { label: 'DMG%', init: `${rn.dmg}%`, buffed: `${buffedDmg}%`, highlight: true }
    };

    const myScore = Number((totalMajor * 100 + totalMinor * 42).toFixed(2));

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
        supports: supSlots,
        stats: computedStats,
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
