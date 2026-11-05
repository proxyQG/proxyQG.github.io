// showcase/showcase-math.js - Décodeur Temps Réel Enka.Network (6 Agents max/vitrine) & Moteur FAE V2

// Si tu déploies showcase/cloudflare-worker.js sur ton compte Cloudflare, colle son URL ici (ex: 'https://zzz-showcase.tonpseudo.workers.dev')
export const WORKER_BASE_URL = 'https://steep-cake-e8d6proxyqg-worker.aloisetienvre5.workers.dev';

export const ELEMENT_COLORS = {
    Ice: '#e11d48',
    Frost: '#0284c7',
    Fire: '#7c3aed',
    Electric: '#2563eb',
    Ether: '#db2777',
    Physical: '#d97706',
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
    Astra: '#9d174d',
    Burnice: '#ea580c',
    ZhuYuan: '#be185d',
    'Zhu Yuan': '#be185d'
};

// Table officielle des IDs d'Agents ZZZ (Enka.Network AvatarId -> Nom ProxyQG)
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
    1221: 'Qingyi',
    1241: 'Zhu Yuan',
    1251: 'Seth',
    1261: 'Jane',
    1271: 'Piper',
    1311: 'Astra',
    1321: 'Evelyn',
    1331: 'Vivian',
    1341: 'Hugo',
    1351: 'Pulchra',
    1361: 'Trigger',
    1371: 'Yixuan',
    1381: 'Ju Fufu',
    1391: 'Pan Yinhu',
    1401: 'Alice',
    1411: 'Yuzuha',
    1421: 'Seed',
    1431: 'Orphie and Magus',
    1441: 'Lucia',
    1451: 'Manato',
    1461: 'Yidhari',
    1471: 'Banyue',
    1481: 'Dialyn',
    1491: 'Zhao',
    1501: 'Ye Shunguang',
    1511: 'Nangong Yu'
};

// Table officielle des Sets de Disques ZZZ (Préfixe d'ID Enka Math.floor(Id/100)*100 -> Clé discs.json)
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
    34000: 'Bunny_in_Wonderland'
};

// Table officielle des PropertyId ZZZ dans Enka.Network
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

// Cache mémoire des dictionnaires locaux ProxyQG + tables Enka
let LOCAL_DB = null;
async function ensureDictionariesLoaded() {
    if (LOCAL_DB) return LOCAL_DB;
    const [agents, engines, discs, guides, hakushChars, hakushWeps] = await Promise.all([
        fetch('js/data/agents.json').then(r => r.json()).catch(() => []),
        fetch('js/data/engines.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})),
        fetch('js/data/agent_database.json').then(r => r.json()).catch(() => ({})),
        fetch('https://api.hakush.in/zzz/data/character.json').then(r => r.json()).catch(() => ({})),
        fetch('https://api.hakush.in/zzz/data/weapon.json').then(r => r.json()).catch(() => ({}))
    ]);
    LOCAL_DB = { agents, engines, discs, guides, hakushChars, hakushWeps };
    return LOCAL_DB;
}

// Récupère le JSON Enka.Network d'un UID avec bascule multi-relais anti-CORS
export async function fetchEnkaShowcaseData(uid) {
    const cleanUid = String(uid || '').replace(/\D/g, '');
    if (cleanUid.length < 8) {
        throw new Error('UID invalide (8 à 10 chiffres requis).');
    }

    const db = await ensureDictionariesLoaded();
    const targetUrl = `https://enka.network/api/zzz/uid/${cleanUid}`;
    const endpoints = [];

    if (WORKER_BASE_URL) {
        endpoints.push(`${WORKER_BASE_URL.replace(/\/$/, '')}/uid/${cleanUid}`);
    }
    endpoints.push(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`
    );

    let rawData = null;
    for (const ep of endpoints) {
        try {
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 7500);
            const res = await fetch(ep, { signal: ctrl.signal });
            clearTimeout(timer);
            if (res.ok) {
                const json = await res.json();
                if (json && json.PlayerInfo) {
                    rawData = json;
                    break;
                }
            }
        } catch (e) {}
    }

    if (!rawData || !rawData.PlayerInfo) {
        throw new Error("Impossible de joindre Enka.Network ou la vitrine de cet UID est masquée en jeu.");
    }

    return parseEnkaResponseToProfile(cleanUid, rawData, db);
}

// Convertit la réponse brute d'Enka.Network (jusqu'à 6 agents dans AvatarList) en profil ProxyQG
function parseEnkaResponseToProfile(uid, data, db) {
    const pInfo = data.PlayerInfo || {};
    const social = pInfo.SocialDetail || {};
    const profDetail = social.ProfileDetail || {};
    const avatarList = pInfo.ShowcaseDetail?.AvatarList || [];

    const nickname = profDetail.Nickname || `Proxy #${uid.slice(-4)}`;
    const signature = social.Desc || `Inter-Nœud Niv. ${profDetail.Level || 60}`;
    const region = detectRegionFromUID(uid);

    const nowDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    // Décodage des 6 agents maximum de la vitrine en jeu
    const parsedAgents = avatarList.slice(0, 6).map(av => {
        const avId = Number(av.Id);
        let agentName = ENKA_AVATAR_MAP[avId] || db.hakushChars?.[avId]?.EN || '';

        // Normalisation avec agents.json de ProxyQG
        const matchedAgent = db.agents.find(a =>
            a.name.toLowerCase() === String(agentName).toLowerCase() ||
            (agentName === 'Jane Doe' && a.name === 'Jane') ||
            (agentName === 'Soukaku' && a.name === 'Soukaku')
        );
        if (matchedAgent) agentName = matchedAgent.name;
        if (!agentName) agentName = `Agent #${avId}`;

        const element = matchedAgent?.element || 'Physical';
        const role = matchedAgent?.role || 'Attack';
        const mindscape = Number(av.TalentLevel) || 0;

        // Décodage du Moteur-Ampli (Weapon)
        let engineObj = { name: 'W-Engine', img: 'assets/W-Engine/Starlight_Engine.webp', refinement: 1, rank: 'A' };
        if (av.Weapon && av.Weapon.Id) {
            const wId = Number(av.Weapon.Id);
            const hakWep = db.hakushWeps?.[wId];
            const wepEnName = hakWep?.EN || '';
            const foundEngEntry = Object.entries(db.engines || {}).find(([k, e]) =>
                (e.name?.en && e.name.en.toLowerCase() === wepEnName.toLowerCase()) ||
                (e.name?.fr && e.name.fr.toLowerCase() === wepEnName.toLowerCase()) ||
                k.toLowerCase() === wepEnName.toLowerCase().replace(/[^a-z0-9]/g, '_')
            );
            if (foundEngEntry) {
                const [, engData] = foundEngEntry;
                engineObj = {
                    name: engData.name?.en || engData.name?.fr || wepEnName,
                    img: `assets/W-Engine/${(engData.img || 'Starlight_Engine.webp').replace('.png', '.webp')}`,
                    refinement: Number(av.Weapon.UpgradeLevel) || 1,
                    rank: engData.rank || (hakWep?.rank === 4 ? 'S' : 'A')
                };
            } else if (wepEnName) {
                engineObj.name = wepEnName;
                engineObj.refinement = Number(av.Weapon.UpgradeLevel) || 1;
                engineObj.rank = hakWep?.rank === 4 ? 'S' : 'A';
            }
        }

        // Décodage des 6 Disques de Poussée (EquippedList)
        const discs = [];
        const setCounts = {};
        let bonusHpPct = 0, bonusHpFlat = 0;
        let bonusAtkPct = engineObj.rank === 'S' ? 30 : 24, bonusAtkFlat = 0;
        let bonusDefPct = 0, bonusDefFlat = 0;
        let bonusCr = 5.0, bonusCdmg = 50.0;
        let bonusAp = 95, bonusAmPct = 0, bonusImpPct = 0, bonusErPct = 0, bonusPenFlat = 0, bonusDmgPct = 0;

        (av.EquippedList || []).forEach(eq => {
            const slot = Number(eq.Slot) || 1;
            const eqData = eq.Equipment || {};
            const eqId = Number(eqData.Id) || 31000;
            const suitId = Math.floor(eqId / 100) * 100;
            const setKey = ENKA_DISC_SET_MAP[suitId] || 'Woodpecker_Electro';
            setCounts[setKey] = (setCounts[setKey] || 0) + 1;

            const discJson = db.discs?.[setKey];
            const setImg = discJson?.img ? `assets/Disque/${discJson.img}` : `assets/Disque/${setKey}.webp`;

            // Stat principale du disque
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

            // Sous-stats du disque (RandomPropertyList)
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

                return {
                    key: pMeta.key,
                    up: upgrades,
                    rolls: totalRolls
                };
            });

            discs.push({
                slot,
                setKey,
                setImg,
                main: mainLabel,
                substats
            });
        });

        discs.sort((a, b) => a.slot - b.slot);

        // Bonus 2-Pièces des sets actifs
        if ((setCounts.Woodpecker_Electro || 0) >= 2) bonusCr += 8;
        if ((setCounts.Branch_Blade_Song || 0) >= 2) bonusCdmg += 16;
        if ((setCounts.Astral_Voice || 0) >= 2 || (setCounts.Hormone_Punk || 0) >= 2) bonusAtkPct += 10;
        if ((setCounts.Chaos_Jazz || 0) >= 2 || (setCounts.Freedom_Blues || 0) >= 2) bonusAp += 30;

        // Calcul des statistiques Initial -> Buffed de l'Agent
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

    const firstAvatarName = parsedAgents[0]?.name || 'Ellen';

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
            const r = Math.max(1, Number(sub.rolls) || (1 + (Number(sub.up) || 0)));
            if (weights.major.includes(sub.key) || weights.minor.includes(sub.key)) {
                rollSummary[sub.key] = (rollSummary[sub.key] || 0) + r;
            }
        });
        return { ...d, eval: ev };
    });

    const totalPool = agentBuild.lbTotal || 18450;
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
