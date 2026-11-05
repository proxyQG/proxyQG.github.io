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

// Catalogue officiel des Supports, Moteurs de Support et Sets de Support (Image 4 : Assemble your support agent)
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
    if (s.startsWith('17')) return 'CHT';
    return 'EU';
}

// Essaie d'abord un fetch direct (pour GitHub Raw et Hakush qui ont CORS *), sinon bascule sur les proxies
async function fetchJsonSmart(targetUrl, allowDirectFirst = true) {
    const urls = allowDirectFirst
        ? [
            targetUrl,
            `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
          ]
        : [
            `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`, `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}` ];  for (const u of urls) { try { const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 6000); const r = await fetch(u, { signal: ctrl.signal }); clearTimeout(t); if (r.ok) { const j = await r.json(); if (j) return j; } } catch (e) {} } return null; }  let LOCAL_DB = null; async function ensureDictionariesLoaded() { if (LOCAL_DB) return LOCAL_DB; const [ agents, engines, discs, guides, enkaAvatars, enkaWeapons, enkaLoc, hakushChars, hakushWeps ] = await Promise.all([ fetch('js/data/agents.json').then(r => r.json()).catch(() => []), fetch('js/data/engines.json').then(r => r.json()).catch(() => ({})), fetch('js/data/discs.json').then(r => r.json()).catch(() => ({})), fetch('js/data/agent_database.json').then(r => r.json()).catch(() => ({})), fetchJsonSmart('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/zzz/avatars.json', true), fetchJsonSmart('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/zzz/weapons.json', true), fetchJsonSmart('https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/zzz/loc.json', true), fetchJsonSmart('https://api.hakush.in/zzz/data/character.json', true), fetchJsonSmart('https://api.hakush.in/zzz/data/weapon.json', true) ]);  LOCAL_DB = { agents: agents \vert{}\vert{} [], engines: engines \vert{}\vert{} {}, discs: discs \vert{}\vert{} {}, guides: guides \vert{}\vert{} {}, enkaAvatars: enkaAvatars \vert{}\vert{} {}, enkaWeapons: enkaWeapons \vert{}\vert{} {}, enkaLocEn: enkaLoc?.en \vert{}\vert{} {}, hakushChars: hakushChars \vert{}\vert{} {}, hakushWeps: hakushWeps \vert{}\vert{} {} }; return LOCAL_DB; }  // Résout le vrai personnage à partir des tables officielles Enka.Network et Hakush (SANS aucun tirage aléatoire) function resolveExactAgent(avId, db) { const idStr = String(avId); const enkaAv = db.enkaAvatars?.[idStr]; const hakChar = db.hakushChars?.[idStr];  // Récupère le vrai nom anglais depuis Enka loc.json et Hakush const enkaRealName = enkaAv?.Name ? (db.enkaLocEn?.[enkaAv.Name] \vert{}\vert{} '') : ''; const hakRealName = hakChar?.EN \vert{}\vert{} hakChar?.code \vert{}\vert{} ''; const rawCandidates = [enkaRealName, hakRealName].filter(Boolean);  const aliasTable = { 'hoshimi miyabi': 'Miyabi', 'miyabi': 'Miyabi', 'ellen joe': 'Ellen', 'ellen': 'Ellen', 'evelyn chevalier': 'Evelyn', 'evelyn': 'Evelyn', 'astra yao': 'Astra', 'astra': 'Astra', 'tsukishiro yanagi': 'Yanagi', 'yanagi': 'Yanagi', 'asaba harumasa': 'Harumasa', 'harumasa': 'Harumasa', 'jane doe': 'Jane', 'jane': 'Jane', 'zhu yuan': 'Zhu Yuan', 'qingyi': 'Qingyi', 'seth lowell': 'Seth', 'seth': 'Seth', 'caesar king': 'Caesar', 'caesar': 'Caesar', 'burnice white': 'Burnice', 'burnice': 'Burnice', 'lighter': 'Lighter', 'piper wheel': 'Piper', 'piper': 'Piper', 'luciana de montefio': 'Lucy', 'lucy': 'Lucy', 'von lycaon': 'Lycaon', 'lycaon': 'Lycaon', 'alexandrina sebastiane': 'Rina', 'rina': 'Rina', 'corin wickes': 'Corin', 'corin': 'Corin', 'nekomiya mana': 'Nekomata', 'nekomata': 'Nekomata', 'billy kid': 'Billy', 'billy': 'Billy', 'anby demara': 'Anby', 'anby': 'Anby', 'nicole demara': 'Nicole', 'nicole': 'Nicole', 'soldier 11': 'Soldier 11', 'koleda belobog': 'Koleda', 'koleda': 'Koleda', 'grace howard': 'Grace', 'grace': 'Grace', 'ben bigger': 'Ben', 'ben': 'Ben', 'anton ivanov': 'Anton', 'anton': 'Anton', 'soukaku': 'Soukaku', 'soldier 0 - anby': 'Soldier 0 Anby', 'soldier 0 anby': 'Soldier 0 Anby', 'anby0': 'Soldier 0 Anby', 'pulchra fellini': 'Pulchra', 'pulchra': 'Pulchra', 'trigger': 'Trigger', 'vivian banshee': 'Vivian', 'vivian': 'Vivian', 'hugo vlad': 'Hugo', 'hugo': 'Hugo', 'yi xuan': 'Yixuan', 'yixuan': 'Yixuan', 'ju fufu': 'Ju Fufu', 'pan yinhu': 'Pan Yinhu', 'ukinami yuzuha': 'Yuzuha', 'yuzuha': 'Yuzuha', 'alice thymefield': 'Alice', 'alice': 'Alice', 'seed': 'Seed', 'orphie & magus': 'Orphie and Magus', 'orphie and magus': 'Orphie and Magus', 'orphie': 'Orphie and Magus', 'komano manato': 'Manato', 'manato': 'Manato', 'lucia': 'Lucia', 'yidhari': 'Yidhari', 'dialyn': 'Dialyn', 'banyue': 'Banyue', 'zhao': 'Zhao', 'ye shunguang': 'Ye Shunguang', 'sunna': 'Sunna', 'aria': 'Aria', 'nangong yu': 'Nangong Yu', 'cissia': 'Cissia', 'promeia': 'Promeia', 'starlight billy': 'Starlight Billy', 'starlight - billy': 'Starlight Billy' };  for (const raw of rawCandidates) { const low = String(raw).toLowerCase().trim(); if (aliasTable[low]) { const matched = db.agents.find(a => a.name === aliasTable[low]); if (matched) return matched; } const exact = db.agents.find(a => a.name.toLowerCase() === low); if (exact) return exact;  // Recherche par mot entier pour éviter toute confusion const byWord = db.agents.find(a => { const escaped = a.name.toLowerCase().replace(/[.*+?^${}()\vert{}[\]\\]/g, '\\$&'); return new RegExp(`\\b${escaped}\\b`, 'i').test(low);
        });
        if (byWord) return byWord;
    }

    // Si l'agent existe dans Hakush/Enka mais pas dans agents.json, on utilise son vrai nom officiel
    const fallbackOfficialName = enkaRealName || hakRealName || `Agent ${avId}`; return { name: fallbackOfficialName, element: 'Physical', role: 'Attack', rank: 'S' }; }  // Résout le vrai Moteur-Ampli à partir des tables officielles Enka.Network (`weapons.json` + `loc.json`) et Hakush (`weapon.json`) function resolveExactEngine(wepId, agentName, refinement, db) { const idStr = String(wepId \vert{}\vert{} ''); const enkaWep = db.enkaWeapons?.[idStr]; const hakWep = db.hakushWeps?.[idStr];  const enkaWepName = enkaWep?.ItemName ? (db.enkaLocEn?.[enkaWep.ItemName] \vert{}\vert{} '') : ''; const hakWepNameEn = hakWep?.EN \vert{}\vert{} ''; const hakWepNameFr = hakWep?.FR \vert{}\vert{} ''; const candidates = [enkaWepName, hakWepNameEn, hakWepNameFr].filter(Boolean);  const normalize = (s) => String(s \vert{}\vert{} '').toLowerCase().replace(/[^a-z0-9]/g, '');  for (const cand of candidates) { const cNorm = normalize(cand); if (!cNorm) continue; const found = Object.entries(db.engines \vert{}\vert{} {}).find(([key, e]) => { return normalize(key) === cNorm \vert{}\vert{} normalize(e.name?.en) === cNorm \vert{}\vert{} normalize(e.name?.fr) === cNorm \vert{}\vert{} (cNorm.length > 5 && normalize(e.name?.en).includes(cNorm)); }); if (found) { const [key, engData] = found; return { name: engData.name?.en \vert{}\vert{} engData.name?.fr \vert{}\vert{} key, img: `assets/W-Engine/${(engData.img || 'Starlight_Engine.webp').replace('.png', '.webp')}`,
                refinement: Number(refinement) || 1,
                rank: engData.rank || (enkaWep?.Rarity >= 4 || hakWep?.rank >= 4 ? 'S' : 'A')
            };
        }
    }

    // Si le moteur n'est pas dans engines.json, on utilise l'icône officielle d'Enka/Hakush ou l'arme signature du guide de l'agent
    const guideEng = db.guides?.[agentName]?.engines?.[0];
    if (guideEng && guideEng.img) {
        return {
            name: enkaWepName || hakWepNameEn || guideEng.name,
            img: `assets/W-Engine/${guideEng.img.replace('.png', '.webp')}`, refinement: Number(refinement) \vert{}\vert{} 1, rank: (enkaWep?.Rarity >= 4 \vert{}\vert{} hakWep?.rank >= 4 \vert{}\vert{} Number(wepId) >= 14000) ? 'S' : 'A' }; }  return { name: enkaWepName \vert{}\vert{} hakWepNameEn \vert{}\vert{} 'W-Engine', img: 'assets/W-Engine/Starlight_Engine.webp', refinement: Number(refinement) \vert{}\vert{} 1, rank: Number(wepId) >= 14000 ? 'S' : 'A' }; }  export async function fetchEnkaShowcaseData(uid) { const cleanUid = String(uid \vert{}\vert{} '').replace(/\D/g, ''); if (cleanUid.length < 8) { throw new Error('UID invalide (8 à 10 chiffres requis).'); }  const db = await ensureDictionariesLoaded(); const targetUrl = `https://enka.network/api/zzz/uid/${cleanUid}`;
    let rawData = null;

    if (WORKER_BASE_URL) {
        try {
            const r = await fetch(`${WORKER_BASE_URL.replace(/\/$/, '')}/uid/${cleanUid}`); if (r.ok) rawData = await r.json(); } catch (e) {} } if (!rawData \vert{}\vert{} !rawData.PlayerInfo) { rawData = await fetchJsonSmart(targetUrl, false); }  if (!rawData \vert{}\vert{} !rawData.PlayerInfo) { throw new Error("Impossible de joindre Enka.Network ou la vitrine de cet UID est masquée en jeu."); }  return parseEnkaResponseToProfile(cleanUid, rawData, db); }  function parseEnkaResponseToProfile(uid, data, db) { const pInfo = data.PlayerInfo \vert{}\vert{} {}; const social = pInfo.SocialDetail \vert{}\vert{} {}; const profDetail = social.ProfileDetail \vert{}\vert{} {}; const avatarList = pInfo.ShowcaseDetail?.AvatarList \vert{}\vert{} [];  const nickname = profDetail.Nickname \vert{}\vert{} `Proxy #${uid.slice(-4)}`;
    const signature = social.Desc || `Inter-Nœud Niv. ${profDetail.Level \vert{}\vert{} 60}`; const region = detectRegionFromUID(uid); const nowDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); const nowTs = Date.now();  const parsedAgents = avatarList.slice(0, 6).map((av, orderIdx) => { const avId = Number(av.Id); const agentMeta = resolveExactAgent(avId, db); const agentName = agentMeta.name; const element = agentMeta.element \vert{}\vert{} 'Physical'; const role = agentMeta.role \vert{}\vert{} 'Attack'; const mindscape = Number(av.TalentLevel) \vert{}\vert{} 0;  const engineObj = resolveExactEngine(av.Weapon?.Id, agentName, av.Weapon?.UpgradeLevel, db);  const discs = []; const setCounts = {}; let bonusHpPct = 0, bonusHpFlat = 0; let bonusAtkPct = engineObj.rank === 'S' ? 30 : 24, bonusAtkFlat = 0; let bonusDefPct = 0, bonusDefFlat = 0; let bonusCr = 5.0 + (engineObj.rank === 'S' ? 12 : 0), bonusCdmg = 50.0 + (engineObj.rank === 'S' ? 24 : 0); let bonusAp = 95, bonusAmPct = 0, bonusImpPct = 0, bonusErPct = 0, bonusPenFlat = 0, bonusDmgPct = 0;  (av.EquippedList \vert{}\vert{} []).forEach(eq => { const slot = Number(eq.Slot) \vert{}\vert{} 1; const eqData = eq.Equipment \vert{}\vert{} {}; const discLevel = Number(eqData.Level) ?? 15; if (discLevel < 15 && eqData.Level !== undefined) return;  const eqId = Number(eqData.Id) \vert{}\vert{} 31000; const suitId = Math.floor(eqId / 100) * 100; const setKey = ENKA_DISC_SET_MAP[suitId] \vert{}\vert{} 'Woodpecker_Electro'; setCounts[setKey] = (setCounts[setKey] \vert{}\vert{} 0) + 1;  const discJson = db.discs?.[setKey]; const setImg = discJson?.img ? `assets/Disque/${discJson.img}` : `assets/Disque/${setKey}.webp`;  const mainProp = (eqData.MainPropertyList \vert{}\vert{} [])[0] \vert{}\vert{} {}; const mainMeta = ENKA_PROP_MAP[mainProp.PropertyId] \vert{}\vert{} (slot === 1 ? ENKA_PROP_MAP[11103] : (slot === 2 ? ENKA_PROP_MAP[12103] : ENKA_PROP_MAP[13103])); const mainLabel = mainMeta?.label \vert{}\vert{} 'ATK\%';  if (mainMeta?.key === 'HP') bonusHpFlat += 2200; else if (mainMeta?.key === 'ATK') bonusAtkFlat += 316; else if (mainMeta?.key === 'DEF') bonusDefFlat += 184; else if (mainMeta?.key === 'HP_') bonusHpPct += 30; else if (mainMeta?.key === 'ATK_') bonusAtkPct += 30; else if (mainMeta?.key === 'DEF_') bonusDefPct += 48; else if (mainMeta?.key === 'CR') bonusCr += 24; else if (mainMeta?.key === 'CDMG') bonusCdmg += 48; else if (mainMeta?.key === 'AP') bonusAp += 92; else if (mainMeta?.key === 'AM_') bonusAmPct += 30; else if (mainMeta?.key === 'IMP_') bonusImpPct += 18; else if (mainMeta?.key === 'ER_') bonusErPct += 60; else if (mainMeta?.key === 'DMG_') bonusDmgPct += 30;  const substats = (eqData.RandomPropertyList \vert{}\vert{} []).map(rp => { const pMeta = ENKA_PROP_MAP[rp.PropertyId] \vert{}\vert{} { key: 'DEF', step: 15 }; const totalRolls = Math.max(1, Number(rp.PropertyLevel) \vert{}\vert{} 1); const upgrades = Math.max(0, totalRolls - 1); const valAdded = totalRolls * (pMeta.step \vert{}\vert{} 0);  if (pMeta.key === 'HP') bonusHpFlat += valAdded; else if (pMeta.key === 'ATK') bonusAtkFlat += valAdded; else if (pMeta.key === 'DEF') bonusDefFlat += valAdded; else if (pMeta.key === 'HP_') bonusHpPct += valAdded; else if (pMeta.key === 'ATK_') bonusAtkPct += valAdded; else if (pMeta.key === 'DEF_') bonusDefPct += valAdded; else if (pMeta.key === 'CR') bonusCr += valAdded; else if (pMeta.key === 'CDMG') bonusCdmg += valAdded; else if (pMeta.key === 'AP') bonusAp += valAdded; else if (pMeta.key === 'PEN') bonusPenFlat += valAdded;  return { key: pMeta.key, up: upgrades, rolls: totalRolls }; });  discs.push({ slot, setKey, setImg, main: mainLabel, substats }); });  discs.sort((a, b) => a.slot - b.slot);  if ((setCounts.Woodpecker_Electro \vert{}\vert{} 0) >= 2) bonusCr += 8; if ((setCounts.Branch_Blade_Song \vert{}\vert{} 0) >= 2) bonusCdmg += 16; if ((setCounts.Astral_Voice \vert{}\vert{} 0) >= 2 \vert{}\vert{} (setCounts.Hormone_Punk \vert{}\vert{} 0) >= 2) bonusAtkPct += 10; if ((setCounts.Chaos_Jazz \vert{}\vert{} 0) >= 2 \vert{}\vert{} (setCounts.Freedom_Blues \vert{}\vert{} 0) >= 2) bonusAp += 30;  const baseAtk = (role === 'Attack' ? 915 : 830) + (engineObj.rank === 'S' ? 713 : 594); const initAtkNum = Math.round(baseAtk * (1 + bonusAtkPct / 100) + bonusAtkFlat); const initHpNum = Math.round(7850 * (1 + bonusHpPct / 100) + bonusHpFlat); const initDefNum = Math.round(610 * (1 + bonusDefPct / 100) + bonusDefFlat); const initImpNum = Math.round((role === 'Stun' ? 136 : 92) * (1 + bonusImpPct / 100)); const initAmNum = Math.round((role === 'Anomaly' ? 148 : 94) * (1 + bonusAmPct / 100)); const initErNum = Number((1.2 * (1 + bonusErPct / 100)).toFixed(2));  return { name: agentName, element, role, mindscape, locked: false, favorite: false, supports: [ { agent: 'none', weapon: 'none', set: 'none' }, { agent: 'none', weapon: 'none', set: 'none' } ], leaderboardName: engineObj.rank === 'S' ? 'S Rank Limited W-Engines' : 'A Rank W-Engines', updatedAt: nowDate, lastUpdatedTs: nowTs - orderIdx * 1000, engine: engineObj, rawNums: { hp: initHpNum, def: initDefNum, atk: initAtkNum, imp: initImpNum, cr: Number(bonusCr.toFixed(1)), cdmg: Number(bonusCdmg.toFixed(1)), ap: Math.round(bonusAp), am: initAmNum, pen: Math.round(bonusPenFlat), er: initErNum, dmg: bonusDmgPct }, discs }; });  const firstAvatarName = parsedAgents[0]?.name \vert{}\vert{} 'Miyabi';  return { uid, nickname, region, signature, avatarImg: `assets/Agents/${firstAvatarName}.webp`,
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

// Calcule les statistiques Initial -> Buffed en intégrant les 2 Supports choisis par l'utilisateur + le classement réel sur le site
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

    // Calcul dynamique des buffs de Supports (Slot 1 & Slot 2)
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
        cr:   { init: `${rn.cr.toFixed(1)}\%`, buffed: buffedCr > rn.cr ? `${buffedCr.toFixed(1)}%` : '', highlight: isCritRole },
        cdmg: { init: `${rn.cdmg.toFixed(1)}\%`, buffed: buffedCdmg > rn.cdmg ? `${buffedCdmg.toFixed(1)}%` : '', highlight: isCritRole },
        ap:   { init: String(rn.ap), buffed: '', highlight: agentBuild.role === 'Anomaly' },
        am:   { init: String(rn.am), buffed: '', highlight: agentBuild.role === 'Anomaly' },
        pen:  rn.pen > 0 ? { init: String(rn.pen), buffed: '' } : null,
        er:   { init: `${rn.er.toFixed(2)}/s`, buffed: '' }, dmg:  { label: 'DMG\%', init: `${rn.dmg}%`, buffed: `${buffedDmg}\%`, highlight: true } };  const myScore = Number((totalMajor * 100 + totalMinor * 42).toFixed(2));  // Classement basé exclusivement sur les profils (UIDs) enregistrés sur le site const allUIDs = Object.keys(allProfilesMap \vert{}\vert{} {}); const scoresForAgent = [];  allUIDs.forEach(u => { const p = allProfilesMap[u]; const matchingAg = (p?.agents \vert{}\vert{} []).find(a => a.name === agentBuild.name); if (matchingAg) { let maj = 0, min = 0; (matchingAg.discs \vert{}\vert{} []).forEach(d => { const ev = evaluateSingleDisc(d, weights); maj += ev.majorRolls; min += ev.minorRolls; }); scoresForAgent.push({ uid: u, score: Number((maj * 100 + min * 42).toFixed(2)) }); } });  if (!scoresForAgent.some(s => s.uid === currentUid)) { scoresForAgent.push({ uid: currentUid, score: myScore }); }  scoresForAgent.sort((a, b) => b.score - a.score);  const totalProfilesOnSite = Math.max(1, scoresForAgent.length); const myRankIndex = scoresForAgent.findIndex(s => s.uid === currentUid); const computedRank = myRankIndex !== -1 ? myRankIndex + 1 : 1; const topPctNum = (computedRank / totalProfilesOnSite) * 100; const topPct = topPctNum < 10 ? topPctNum.toFixed(2) : topPctNum.toFixed(1);  return { ...agentBuild, supports: supSlots, stats: computedStats, weights, discs: evaluatedDiscs, totalMajor, totalMinor, buildScore: myScore, rollSummary, lbRank: computedRank, lbTotal: totalProfilesOnSite, topPct, topPctNum }; }  export function computeCalculatorSimulation(agentBuild, customConfig = {}) { const baseAtk = Number(customConfig.baseAtk) \vert{}\vert{} 1650; const rolls = customConfig.rolls \vert{}\vert{} { ATK_: 11, ATK: 1, CR: 15, CDMG: 13, PEN: 2 }; const enemyDef = Number(customConfig.enemyDef) \vert{}\vert{} 952;  const calcDmgWithRolls = (rMap) => { const atkPct = 30 + (rMap.ATK_ \vert{}\vert{} 0) * 3.0 + 24; const flatAtk = 316 + (rMap.ATK \vert{}\vert{} 0) * 19; const initAtk = Math.round(baseAtk * (1 + atkPct / 100) + flatAtk); const combatAtk = Math.round(initAtk * 1.096);  const initCr = Math.min(100, 5 + 24 + (rMap.CR \vert{}\vert{} 0) * 2.4); const combatCr = Math.min(100, initCr + 25.0);  const combatCdmg = 50 + 48 + (rMap.CDMG \vert{}\vert{} 0) * 4.8; const dmgBonus = 30 + 24; const penFlat = (rMap.PEN \vert{}\vert{} 0) * 9;  const effDef = Math.max(0, enemyDef - penFlat); const defMult = 794 / (794 + effDef);  const critFactor = 1 + (combatCr / 100) * (combatCdmg / 100); const avgCritDmg = Math.round(combatAtk * 1.85 * critFactor * (1 + dmgBonus / 100) * defMult);  return { initAtk, combatAtk, initCr: initCr.toFixed(1), combatCr: (initCr + 25.0).toFixed(1), combatCdmg: combatCdmg.toFixed(1), dmgBonus, penFlat, avgCritDmg }; };  const baseSim = calcDmgWithRolls(rolls); const marginalGains = {}; ['ATK_', 'ATK', 'CR', 'CDMG', 'PEN'].forEach(k => { const nextRolls = { ...rolls, [k]: (rolls[k] \vert{}\vert{} 0) + 1 }; const nextSim = calcDmgWithRolls(nextRolls); const pctGain = baseSim.avgCritDmg > 0 ? (((nextSim.avgCritDmg - baseSim.avgCritDmg) / baseSim.avgCritDmg) * 100).toFixed(3) : '0.000'; marginalGains[k] = Number(pctGain) > 0 ? `+${pctGain.replace('.', ',')}%` : '+0%';
    });

    return { ...baseSim, rolls, marginalGains };
}
