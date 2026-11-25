// Dictionnaire global de l'interface
export const ui = {
    fr: {
        searchPlaceholder: "Agent, disque, moteur...",
        endOfZone: "Fin de la zone",
        filtersTitle: "FILTRES",
        noSignal: "Aucun signal trouvé",
        signalAnalyzing: "En cours d'analyse",
        encryptedArchive: "Les archives de New Eridu pour <span class=\"text-zinc-400 font-bold\">{name}</span> sont actuellement cryptées.",
        emptyStateDesc: "Aucun agent ne correspond à ces critères.",
        elements: "Éléments",
        roles: "Rôles",
        versions: "Mises à jour",
        all: "Tous",
        allVersions: "Toutes les versions",
        favorites: "Mes Favoris",
        custom: "Personnalisé",
        activeFaction: "Faction active",
        allFactions: "Toutes les factions",
        return: "Retour",
        copied: "Lien copié",
        readyToShare: "Prêt à être partagé",
        statsLabel: "Stats recommandées",
        discSets: "Sets de Disques",
        skillPrio: "Priorité Compétences",
        statistics: "Statistiques",
        substatsPrio: "Priorité Sub-stats",
        engines: "Moteurs",
        teams: "Synergies & Équipes",
        installApp: "INSTALLER L'APP",
        agentsFound: "Agents",
        resetFilters: "Réinitialiser"
    },
    en: {
        searchPlaceholder: "Agent, disc, W-Engine...",
        endOfZone: "End of zone",
        filtersTitle: "FILTERS",
        noSignal: "No signal found",
        signalAnalyzing: "Analyzing",
        encryptedArchive: "New Eridu archives for <span class=\"text-zinc-400 font-bold\">{name}</span> are currently encrypted.",
        emptyStateDesc: "No agent matches these criteria.",
        elements: "Elements",
        roles: "Roles",
        versions: "Updates",
        all: "All",
        allVersions: "All versions",
        favorites: "My Favorites",
        custom: "Custom",
        activeFaction: "Active faction",
        allFactions: "All factions",
        return: "Back",
        copied: "Link copied",
        readyToShare: "Ready to share",
        statsLabel: "Recommended Stats",
        discSets: "Drive Discs",
        skillPrio: "Skill Priority",
        statistics: "Statistics",
        substatsPrio: "Sub-stats Priority",
        engines: "W-Engines",
        teams: "Synergies & Teams",
        installApp: "INSTALL APP",
        agentsFound: "Agents",
        resetFilters: "Reset"
    }
};

// Dictionnaire des Termes Fixes (Éléments, Rôles)
export const terms = {
    'Physical': { fr: 'Physique', en: 'Physical' },
    'Fire': { fr: 'Feu', en: 'Fire' },
    'Ice': { fr: 'Glace', en: 'Ice' },
    'Electric': { fr: 'Électrique', en: 'Electric' },
    'Ether': { fr: 'Éther', en: 'Ether' },
    'Wind': { fr: 'Vent', en: 'Wind' },
    'Lumiflux': { fr: 'Lumen', en: 'Lumiflux' },
    "Auric Ink": { fr: "Sépia", en: "Auric Ink" },
    'Honed Edge': { fr: 'Lame affûtée', en: 'Honed Edge' },
    'Frost': { fr: 'Givre', en: 'Frost' },
    'Genesis Flare': { fr: 'Flambeau de la genèse', en: 'Genesis Flare' },
    
    'Attack': { fr: 'Attaque', en: 'Attack' },
    'Stun': { fr: 'Stun', en: 'Stun' },
    'Anomaly': { fr: 'Anomalie', en: 'Anomaly' },
    'Support': { fr: 'Soutien', en: 'Support' },
    'Defense': { fr: 'Défense', en: 'Defense' },
    'Armorer': { fr: 'Forge', en: 'Armorer' },
    'Rupture': { fr: 'Rupture', en: 'Rupture' },

    'DPS': { fr: 'DPS', en: 'DPS' },
    'Agent<br>Stun': { fr: 'Agent<br>Stun', en: 'Stun<br>Agent' },
    'Agent<br>Support': { fr: 'Agent<br>Soutien', en: 'Support<br>Agent' },
    'Agents<br>Support': { fr: 'Agents<br>Soutien', en: 'Support<br>Agents' },
    'Agents<br>Anomalie': { fr: 'Agents<br>Anomalie', en: 'Anomaly<br>Agents' },
    'Agents<br>Anomalies': { fr: 'Agents<br>Anomalie', en: 'Anomaly<br>Agents' },
    'Agents<br>Attaques': { fr: 'Agents<br>Attaque', en: 'Attack<br>Agents' }
};

// Dictionnaire officiel des Disques (EN strict -> FR)
export const discsDict = {
    "Crimson Wing Nocturne": "Nocturne des ailes écarlates",
    "Rank Stele": "Monument aux étoiles",
    "Fated Feathers": "Plumes du destin",
    "Feathered Fate": "Plumes du destin",
    "Thorny Rose": "Rose couverte d'épines",
    "Thorned Rose": "Rose couverte d'épines",
    "Blazing Sky": "Le ciel ardent",
    "The Sky Ablaze": "Le ciel ardent",
    "Turmoil's Salon": "Salon de tourmente",
    "Wuthering Salon": "Salon de tourmente",
    "Prisoner's Notes": "Notes d'une prisonnière",
    "Notes From the Chained": "Notes d'une prisonnière",
    "Wonderland Bunny": "Lapin au pays des merveilles",
    "Bunny in Wonderland": "Lapin au pays des merveilles",
    "Branch Blade Song": "Balade de l'épée de bois",
    "Radiant Aria": "Aria rayonnante",
    "Shining Aria": "Aria rayonnante",
    "White Water Ballad": "Mélopée des eaux blanches",
    "Moonlight Lullaby": "Berceuse au clair de lune",
    "Dawn's Bloom": "Floraison de l'aube",
    "King of the Summit": "Reine des cimes",
    "Yunkui Tales": "Contes de Yunkui",
    "Phaethon's Melody": "La mélodie de Phaéthon",
    "Phaethon Melody": "La mélodie de Phaéthon",
    "Shadow Harmony": "Harmonie dans l'ombre",
    "Branch and Blade Song": "Balade de l'épée de bois",
    "Branch & Blade Song": "Balade de l'épée de bois",
    "Astral Voice": "Voix astrale",
    "Chaos Jazz": "Jazz chaotique",
    "Proto Punk": "Protopunk",
    "Woodpecker Electro": "Électro pivert",
    "Puffer Electro": "Électro fugu",
    "Stellar Collision": "Discollision stellaire",
    "Shockstar Disco": "Discollision stellaire",
    "Freedom Blues": "Blues libre",
    "Hormone Punk": "Punk hormonal",
    "Soul Rock": "Soul rock",
    "Swing Jazz": "Jazz swing",
    "Inferno Metal": "Métal infernal",
    "Chaos Metal": "Métal chaotique",
    "Chaotic Metal": "Métal chaotique",
    "Thunder Metal": "Métal tonitruant",
    "Polar Metal": "Métal polaire",
    "Fanged Metal": "Métal mordant"
};

// Corrections de noms EN officiels (préserve les clés internes pour ne pas casser les sauvegardes Gacha)
const enginesEnOverrides = {
    "Sin-Ban Cage": "Incarcerating Grip",
    "Nirvana's First Plume": "Plume of Rebirth",
    "Lunar - Noviluna": "[Lunar] Noviluna",
    "Identity Base": "[Identity] Base",
    "Vortex - Arrow": "[Vortex] Arrow",
    "Reverb - Mark II": "[Reverb] Mark II",
    "Reverb - Mark III": "[Reverb] Mark III",
    "Magnetic Storm - Alpha": "[Magnetic Storm] Alpha"
};

// Dictionnaire officiel des Moteurs (EN -> FR HoYoWiki officiel)
export const enginesDict = {
    "Dragonfire Mirage": "Mirage draconique",
    "Elegy of the Molted Spider": "Requiem Araneae",
    "Starlit Chroma": "Stellaria iridescente",
    "Street Superstar": "Star de la rue",
    "The Brimstone": "Soufre",
    "The Restrained": "L'enchaîné",
    "The Simmering Pot": "Marmite mijotante",
    "The Vault": "Chambre forte",
    "Thoughtbop": "Ballade au fil des pensées",
    "Tigerbane Bell": "Cloche fléau du tigre",
    "Timeweaver": "Chronotisseur",
    "Tremor Trigram Vessel": "Boîtier du trigramme sismique",
    "Tusks of Fury": "Défenses de la fureur",
    "Unfettered Game Ball": "Sphère ludique endiablée",
    "Weeping Cradle": "Berceau des sanglots",
    "Weeping Gemini": "Gémeaux éplorés",
    "Wrathful Vajra": "Vajra courroucé",
    "Yesterday Calls": "Appel de la nuit dernière",
    "Zanshin Herb Case": "Pilulier Zanshin",
    "Roaring Fur-nace": "Fu-fourneau rugissant",
    "Roaring Ride": "Moteur hurlant",
    "Serpentine Seeker": "Traque serpentine",
    "Severed Innocence": "Innocence brisée",
    "Sharpened Stinger": "Pinces acérées",
    "Six Shooter": "Barillet à six coups",
    "Slice of Time": "Figeur temporel",
    "Sol Exuvia": "Sol Exuvia",
    "Spectral Gaze": "Regard spectral",
    "Spring Embrace": "Source printanière",
    "Starlight Engine Replica": "Réplique du moteur stellaire",
    "Starlight Engine": "Moteur stellaire",
    "Starlight Rider Faceplate": "Heaume du Chevalier stellaire",
    "Steam Oven": "Four à vapeur",
    "The Steam Oven": "Four à vapeur",
    "Steel Cushion": "Coussinets d'acier",
    "Kraken's Cradle": "Berceau du kraken",
    "Marcato Desire": "Capriccio marcato",
    "Metanukimorphosis": "Métanukimorphose",
    "Myriad Eclipse": "Mille facettes du soleil déchu",
    "Sin-Ban Cage": "Poigne d'incarcération",
    "Incarcerating Grip": "Poigne d'incarcération",
    "Neon Fantasies": "Fantaisie de néon",
    "Ode of Resurrected Wings": "Ode des ailes ressuscitées",
    "Original Transmorpher": "Transformateur originel",
    "Peacekeeper - Specialized": "Défenseur de la paix – Spécialisé",
    "Practiced Perfection": "Sphère stellaire 10D",
    "Precious Fossilized Core": "Noyau fossilisé précieux",
    "Precious Fossilized": "Noyau fossilisé précieux",
    "Puzzle Sphere": "Casse-tête sphérique",
    "Qingming Birdcage": "Cage à oiseau Qingming",
    "Radiowave Journey": "Radio-baladeur",
    "Nirvana's First Plume": "Première plume du nirvana",
    "Plume of Rebirth": "Première plume du nirvana",
    "Rainforest Gourmet": "Gourmet de la jungle",
    "Reel Projector": "Projecteur à bobines",
    "Riot Suppressor Mark VI": "Force anti-émeute Mark VI",
    "Riot Suppressor": "Force anti-émeute Mark VI",
    "Flamemaker Shaker": "Shakeur à flammes",
    "Flight of Fancy": "Envol de l'oiseau des rêves",
    "Frostfall Sickle": "Faucille de givre-chute",
    "Fusion Compiler": "Compilateur chimérique",
    "Gilded Blossom": "Floraison dorée",
    "Grill O'Wisp": "Fournaise follette",
    "Grill O' Wisp": "Fournaise follette",
    "Hailstorm Shrine": "Temple de la grêle",
    "Half-Sugar Bunny": "Lapin givré allégé",
    "Heartstring Nocturne": "Appassionato nocturne",
    "Hellfire Gears": "Engrenage infernal",
    "Housekeeper": "Aide à domicile",
    "Ice-Jade Teapot": "Théière en jade",
    "Kaboom the Cannon": "Canon Kaboum",
    "Knight's Extolment": "Éloge du cavalier",
    "Knight's Extolments": "Éloge du cavalier",
    "Bunny Band": "Panier-lapin",
    "Cannon Rotor": "Rotor de canon",
    "Catty Luck": "Felis Fortuna",
    "Cauldron of Clarity": "Chaudron d'émeraude",
    "Chief Sidekick": "Bras droit en chef",
    "Cloudcleave Radiance": "Éclat fend-nuages",
    "Concealed Light": "Lumière dissimulée",
    "Cordis Germina": "Cordis germina",
    "Crimson Thirst": "Soif cramoisie",
    "Crimson Moon Casket": "Coffret de la lune cramoisie",
    "Deep Sea Visitor": "Visiteur des abysses",
    "Demara Battery Mark II": "Batterie Demara Mark II",
    "Dreamlit Hearth": "Fourneau des rêves",
    "Drill Rig - Red Axis": "Foreuse – Axe rouge",
    "Electro-Lip Gloss": "Brillant à lèvres électro",
    "Elegant Vanity": "Trousse coquette",
    "Angel in the Shell": "Ange dans la coquille",
    "Bashful Demon": "Démon pudique",
    "Bellicose Blaze": "Brasier belliqueux",
    "Big Cylinder": "Big-cylindre",
    "Blazing Laurel": "Laurier flamboyant",
    "Bloodmarrow Coffer": "Coffre de moelle sanguine",
    "Boisterous Echoes": "Échos tumultueux",
    "Box Cutter": "Cutter",
    "Cinder Cobalt": "[Cendres] Cobalt",
    "Identity Base": "[Identité] Base",
    "Identity Inflection": "[Identité] Inflexion",
    "Lunar Decrescent": "[Lunaire] Décroissante",
    "Lunar Noviluna": "[Lunaire] Nouvelle lune",
    "Lunar - Noviluna": "[Lunaire] Nouvelle lune",
    "Lunar Pleniluna": "[Lunaire] Pleine lune",
    "Magnetic Storm Alpha": "[Tempête magnétique] Alpha",
    "Magnetic Storm - Alpha": "[Tempête magnétique] Alpha",
    "Magnetic Storm Bravo": "[Tempête magnétique] Bravo",
    "Magnetic Storm Charlie": "[Tempête magnétique] Charlie",
    "Reverb Mark I": "[Réverbération] Mark I",
    "Reverb Mark II": "[Réverbération] Mark II",
    "Reverb - Mark II": "[Réverbération] Mark II",
    "Reverb Mark III": "[Réverbération] Mark III",
    "Reverb - Mark III": "[Réverbération] Mark III",
    "Vortex Arrow": "[Vortex] Flèche",
    "Vortex - Arrow": "[Vortex] Flèche",
    "Vortex Hatchet": "[Vortex] Hachette",
    "Vortex Revolver": "[Vortex] Revolver",
    "Joyau Dore": "Joyau doré",
    "Joyau Doré": "Joyau doré"
};

// Optimisation Disques : Une seule RegExp précompilée au lieu de 37 créées en boucle
const discsKeys = Object.keys(discsDict).sort((a, b) => b.length - a.length);
const discRegex = new RegExp(discsKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi');
const discsLookup = Object.fromEntries(Object.entries(discsDict).map(([k, v]) => [k.toLowerCase(), v]));

// Optimisation Stats : Annuaire direct O(1) pour les stats les plus fréquentes
const exactStatsEn = {
    'ATQ %': 'ATK%',
    'DEF %': 'DEF%',
    'DÉF %': 'DEF%',
    'PV %': 'HP%',
    'ATQ': 'ATK',
    'DEF': 'DEF',
    'DÉF': 'DEF',
    'PV': 'HP',
    'Taux Crit': 'CRIT Rate',
    'Taux Critique': 'CRIT Rate',
    'Dégâts Crit': 'CRIT DMG',
    'DGT CRIT': 'CRIT DMG',
    'Taux de PEN': 'PEN Ratio',
    'Impact': 'Impact',
    'Maîtrise d\'Anomalie': 'Anomaly Mastery',
    'Adresse d\'Anomalie': 'Anomaly Prof.',
    'Récup. d\'énergie': 'Energy Regen',
    'DGT Glace': 'Ice DMG',
    'DGT Feu': 'Fire DMG',
    'DGT Physique': 'Physical DMG',
    'DGT Électrique': 'Electric DMG',
    'DGT Éther': 'Ether DMG',
    'DGT Vent': 'Wind DMG'
};

// Règles précompilées pour les phrases complexes de stats (ex: combinaisons avec / ou multi-lignes)
const STAT_RULES = [
    [/\bjusqu'à\b/gi, "Until"],
    [/Force\s*transperçante/gi, "Sheer Force"],
    [/\b[Ée]nergie\b/gi, "Energy"],
    [/\bou\b/gi, "or"],
    [/(?:ATQ|Attaque)\s*%/gi, "ATK%"],
    [/(?:D[EÉ]F|D[eé]fense)\s*%/gi, "DEF%"],
    [/(?:PV|Points\s*de\s*vie)\s*%/gi, "HP%"],
    [/\b(?:ATQ|Attaque)\b/gi, "ATK"],
    [/\b(?:D[EÉ]F|D[eé]fense)\b/gi, "DEF"],
    [/\b(?:PV|Points\s*de\s*vie)\b/gi, "HP"],
    [/Taux\s*Crit(?:ique)?/gi, "CRIT Rate"],
    [/(?:Dégât(?:s)?\s*Crit(?:ique)?|DGT\s*CRIT)/gi, "CRIT DMG"],
    [/Taux\s*de\s*P[EÉ]N/gi, "PEN Ratio"],
    [/(?:Ma[îi]trise|Ma[îi]\.)\s*(?:d')?Anomalie/gi, "Anomaly Mastery"],
    [/(?:Adresse|Adre\.)\s*(?:d')?Anomalie/gi, "Anomaly Prof."],
    [/(?:R[ée]cup(?:[ée]ration)?|R[ée]c)\.?\s*d'?[ée]nergie/gi, "Energy Regen"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Glace/gi, "Ice DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Physique(?:s)?/gi, "Physical DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:d')?[Ée]lectrique/gi, "Electric DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:d')?[Ée]ther/gi, "Ether DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Feu/gi, "Fire DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Vent/gi, "Wind DMG"],
    [/\bDGT\b/gi, "DMG"]
];

// Langue active (sauvegardée en LocalStorage)
let savedLang = 'fr';
try {
    savedLang = localStorage.getItem('zzz_lang') || 'fr';
} catch (e) {}
export let currentLang = savedLang;

export function setLanguage(lang) {
    currentLang = lang;
    try { localStorage.setItem('zzz_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;
    updateStaticUI();
}

// Fonction de traduction générique (lit { fr: "...", en: "..." } ou renvoie la chaîne brute)
export function tData(field) {
    if (!field) return '';
    if (typeof field === 'object') return field[currentLang] || field['fr'] || field['en'] || '';
    return field;
}

// Traducteur pour les moteurs (vérifie le dictionnaire officiel)
export function tEngine(englishName) {
    if (!englishName) return '';
    if (typeof englishName === 'object') return tData(englishName);
    if (currentLang === 'en') return enginesEnOverrides[englishName] || englishName;
    return enginesDict[englishName] || englishName;
}

// Traducteur pour les sets de disques (Exécution en une passe unique)
export function tDisc(name) {
    if (!name) return '';
    if (typeof name === 'object') return tData(name);
    const str = String(name);
    if (currentLang === 'en') {
        return str.replace(/4-pièces/gi, "4pc").replace(/2-pièces/gi, "2pc");
    }
    return str
        .replace(discRegex, match => discsLookup[match.toLowerCase()] || match)
        .replace(/4pc/gi, "4-pièces")
        .replace(/2pc/gi, "2-pièces");
}

// Traducteur pour les termes de rôles et d'éléments
export function tTerm(termStr) {
    if (!termStr) return '';
    if (!terms[termStr]) return termStr;
    return terms[termStr][currentLang] || termStr;
}

// Dictionnaire d'affichage des noms d'agents (clé interne -> nom affiché FR / EN)
export const agentNamesDict = {
    'Jane': { fr: 'Jane Doe', en: 'Jane Doe' },
    'Sunbringer': { fr: "Dame de l'Aurore", en: 'Sunbringer' }
};

export function tAgentName(name) {
    if (!name) return '';
    if (agentNamesDict[name]) return agentNamesDict[name][currentLang] || name;
    return name;
}

// Traducteur pour les statistiques (Recherche directe instantanée + repli règles précompilées)
export function tStats(statStr) {
    if (!statStr) return '';
    if (typeof statStr === 'object') return tData(statStr);
    if (currentLang === 'fr') {
    const exactFr = {
        'HP': 'PV',
        'HP %': 'PV %',
        'ATK %': 'ATQ %',
        'Defense': 'Défense',
        'Energie Regen': 'Réc. d\'énergie',
        'Pen Ratio': 'Taux de PÉN',
        'PEN Ratio': 'Taux de PÉN',
        'Sheer Force': 'Force Transperçante'
    };
    return exactFr[statStr] || statStr;
}

    // Raccourci direct instantané si le mot correspond exactement
    if (exactStatsEn[statStr]) return exactStatsEn[statStr];

    // Repli pour les statistiques composées (ex: "Taux Crit / Dégâts Crit")
    let translated = statStr;
    for (let i = 0; i < STAT_RULES.length; i++) {
        translated = translated.replace(STAT_RULES[i][0], STAT_RULES[i][1]);
    }
    return translated;
}

// Rafraîchissement des balises fixes dans le DOM (Zéro mutation inutile si déjà identique)
export function updateStaticUI() {
    document.documentElement.lang = currentLang;
    const dict = ui[currentLang];
    if (dict) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const val = dict[el.getAttribute('data-i18n')];
            if (!val) return;
            if (el.tagName === 'INPUT') {
                if (el.placeholder !== val) el.placeholder = val;
            } else if (val.includes('<')) {
                el.innerHTML = val;
            } else if (el.textContent !== val) {
                el.textContent = val;
            }
        });
    }
    document.querySelectorAll('.dyn-term').forEach(el => {
        const term = el.getAttribute('data-term');
        if (term) {
            const translated = tTerm(term);
            if (el.textContent !== translated) el.textContent = translated;
        }
    });
}
