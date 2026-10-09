// Dictionnaire global de l'interface
export const ui = {
    fr: {
        searchPlaceholder: "Rechercher un agent...",
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
        installApp: "INSTALLER L'APP"
    },
    en: {
        searchPlaceholder: "Search an agent...",
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
        installApp: "INSTALL APP"
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
    'Lumiflux': { fr: 'Lumiflux', en: 'Lumiflux' },
    "Auric Ink": { fr: "Sépia", en: "Auric Ink" },
    'Honed Edge': { fr: 'Lame affûtée', en: 'Honed Edge' },
    'Frost': { fr: 'Givre', en: 'Frost' },
    
    'Attack': { fr: 'Attaque', en: 'Attack' },
    'Stun': { fr: 'Stun', en: 'Stun' },
    'Anomaly': { fr: 'Anomalie', en: 'Anomaly' },
    'Support': { fr: 'Soutien', en: 'Support' },
    'Defense': { fr: 'Défense', en: 'Defense' },
    'Armorer': { fr: 'Armurier', en: 'Armorer' },
    'Rupture': { fr: 'Rupture', en: 'Rupture' }
};

// Dictionnaire officiel des Disques (EN strict -> FR)
export const discsDict = {
    "Fated Feathers": "Plumes du destin",
    "Thorny Rose": "Rose couverte d'épines",
    "Thorned Rose": "Rose couverte d'épines",
    "Blazing Sky": "Le ciel ardent",
    "Turmoil's Salon": "Salon de tourmente",
    "Wuthering Salon": "Salon de tourmente",
    "Prisoner's Notes": "Notes d'une prisonnière",
    "Wonderland Bunny": "Lapine au pays des merveilles",
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

// Dictionnaire officiel des Moteurs (EN strict -> FR)
export const enginesDict = {
    "Street Superstar": "Superstar des rues",
    "The Brimstone": "Le Soufre",
    "The Restrained": "L'Entravé",
    "The Simmering Pot": "La Marmite frémissante",
    "The Vault": "Le Coffre-fort",
    "Thoughtbop": "Choc de pensée",
    "Tigerbane Bell": "Cloche fléau du tigre",
    "Timeweaver": "Tisseur de temps",
    "Tremor Trigram Vessel": "Récipient trigramme de secousse",
    "Tusks of Fury": "Défenses de la furie",
    "Unfettered Game Ball": "Balle de match libérée",
    "Weeping Cradle": "Berceau en pleurs",
    "Weeping Gemini": "Gémeaux en pleurs",
    "Wrathful Vajra": "Vajra courroucé",
    "Yesterday Calls": "L'appel d'hier",
    "Zanshin Herb Case": "Étui à herbes Zanshin",
    "Roaring Fur-nace": "Fournaise rugissante",
    "Roaring Ride": "Virée rugissante",
    "Serpentine Seeker": "Chercheur serpentin",
    "Severed Innocence": "Innocence tranchée",
    "Sharpened Stinger": "Dard aiguisé",
    "Six Shooter": "Six-coups",
    "Slice of Time": "Tranche de temps",
    "Sol Exuvia": "Sol Exuvia",
    "Spectral Gaze": "Regard spectral",
    "Spring Embrace": "Étreinte printanière",
    "Starlight Engine Replica": "Stellaire - Réplique",
    "Starlight Engine": "Stellaire",
    "Steam Oven": "Four à vapeur",
    "The Steam Oven": "Four à vapeur",
    "Steel Cushion": "Coussin d'acier",
    "Kraken's Cradle": "Berceau du Kraken",
    "Marcato Desire": "Désir marcato",
    "Metanukimorphosis": "Métanukimorphose",
    "Myriad Eclipse": "Éclipse myriade",
    "Sin-Ban Cage": "Cage des péchés interdits",
    "Neon Fantasies": "Fantaisies néon",
    "Ode of Resurrected Wings": "Ode aux ailes ressuscitées",
    "Original Transmorpher": "Transmorpheur original",
    "Peacekeeper - Specialized": "Pacificateur - Spécialisé",
    "Practiced Perfection": "Perfection de la pratique",
    "Precious Fossilized Core": "Noyau fossilisé précieux",
    "Precious Fossilized": "Noyau fossilisé précieux",
    "Puzzle Sphere": "Sphère puzzle",
    "Qingming Birdcage": "Cage à oiseaux Qingming",
    "Radiowave Journey": "Voyage hertzien",
    "Nirvana's First Plume": "Première plume du nirvana",
    "Rainforest Gourmet": "Gourmet de la jungle",
    "Reel Projector": "Projecteur à bobines",
    "Riot Suppressor Mark VI": "Anti-émeute Mark VI",
    "Riot Suppressor": "Anti-émeute Mark VI",
    "Flamemaker Shaker": "Shaker enflammé",
    "Flight of Fancy": "Fantaisie volante",
    "Frostfall Sickle": "Faucille de givre",
    "Fusion Compiler": "Compilateur de fusion",
    "Gilded Blossom": "Fleur dorée",
    "Grill O'Wisp": "Grill follet",
    "Grill O' Wisp": "Grill follet",
    "Hailstorm Shrine": "Sanctuaire de grêle",
    "Half-Sugar Bunny": "Lapin mi-sucré",
    "Heartstring Nocturne": "Nocturne du cœur",
    "Hellfire Gears": "Engrenages infernaux",
    "Housekeeper": "Le Domestique",
    "Ice-Jade Teapot": "Théière de jade de glace",
    "Kaboom the Cannon": "Boum le canon",
    "Knight's Extolment": "Éloge du chevalier",
    "Knight's Extolments": "Éloge du chevalier",
    "Bunny Band": "Bande de lapins",
    "Cannon Rotor": "Rotor de canon",
    "Catty Luck": "Chance féline",
    "Cauldron of Clarity": "Chaudron de clarté",
    "Chief Sidekick": "Super acolyte",
    "Cloudcleave Radiance": "Éclat fendeur de nuages",
    "Concealed Light": "Lumière dissimulée",
    "Cordis Germina": "Cordis Germina",
    "Crimson Thirst": "Soif écarlate",
    "Crimson Moon Casket": "Coffret de la lune cramoisie",
    "Deep Sea Visitor": "Visiteur des abysses",
    "Demara Battery Mark II": "Batterie Demara Mark II",
    "Dreamlit Hearth": "Foyer onirique",
    "Drill Rig - Red Axis": "Foreuse - Axe rouge",
    "Electro-Lip Gloss": "Gloss électrique",
    "Elegant Vanity": "Vanité élégante",
    "Angel in the Shell": "Ange dans la carapace",
    "Bashful Demon": "Démon timide",
    "Bellicose Blaze": "Flamme belliqueuse",
    "Big Cylinder": "Gros cylindre",
    "Blazing Laurel": "Laurier ardent",
    "Bloodmarrow Coffer": "Reliquaire de moelle",
    "Boisterous Echoes": "Échos tumultueux",
    "Box Cutter": "Cutter",
    "Cinder Cobalt": "Cendre Cobalt",
    "Identity Base": "Identité Base",
    "Identity Inflection": "Identité Inflexion",
    "Lunar Decrescent": "Lune Décroissante",
    "Lunar Noviluna": "Lune Nouvelle",
    "Lunar - Noviluna": "Lune Nouvelle",
    "Lunar Pleniluna": "Lune Pleine",
    "Magnetic Storm Alpha": "Orage magnétique Alpha",
    "Magnetic Storm - Alpha": "Orage magnétique Alpha",
    "Magnetic Storm Bravo": "Orage magnétique Bravo",
    "Magnetic Storm Charlie": "Orage magnétique Charlie",
    "Reverb Mark I": "Réverbération Mark I",
    "Reverb Mark II": "Réverbération Mark II",
    "Reverb - Mark II": "Réverbération Mark II",
    "Reverb Mark III": "Réverbération Mark III",
    "Reverb - Mark III": "Réverbération Mark III",
    "Vortex Arrow": "Vortex Flèche",
    "Vortex - Arrow": "Vortex Flèche",
    "Vortex Hatchet": "Vortex Hachette",
    "Vortex Revolver": "Vortex Revolver",
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
    'PV %': 'HP%',
    'ATQ': 'ATK',
    'DEF': 'DEF',
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
    'DGT Éther': 'Ether DMG'
};

// Règles précompilées pour les phrases complexes de stats (ex: combinaisons avec / ou multi-lignes)
const STAT_RULES = [
    [/\bjusqu'à\b/gi, "Until"],
    [/\bou\b/gi, "or"],
    [/(?:ATQ|Attaque)\s*%/gi, "ATK%"],
    [/(?:DEF|Défense)\s*%/gi, "DEF%"],
    [/(?:PV|Points\s*de\s*vie)\s*%/gi, "HP%"],
    [/\b(?:ATQ|Attaque)\b/gi, "ATK"],
    [/\b(?:DEF|Défense)\b/gi, "DEF"],
    [/\b(?:PV|Points\s*de\s*vie)\b/gi, "HP"],
    [/Taux\s*Crit(?:ique)?/gi, "CRIT Rate"],
    [/(?:Dégât(?:s)?\s*Crit(?:ique)?|DGT\s*CRIT)/gi, "CRIT DMG"],
    [/Taux\s*de\s*PEN/gi, "PEN Ratio"],
    [/(?:Ma[îi]trise|Ma[îi]\.)\s*(?:d')?Anomalie/gi, "Anomaly Mastery"],
    [/(?:Adresse|Adre\.)\s*(?:d')?Anomalie/gi, "Anomaly Prof."],
    [/(?:R[ée]cup(?:[ée]ration)?|R[ée]c)\.?\s*d'?[ée]nergie/gi, "Energy Regen"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Glace/gi, "Ice DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Physique(?:s)?/gi, "Physical DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:d')?[Ée]lectrique/gi, "Electric DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:d')?[Ée]ther/gi, "Ether DMG"],
    [/(?:DGT|Dégât(?:s)?)\s*(?:de\s*)?Feu/gi, "Fire DMG"],
    [/\bDGT\b/gi, "DMG"]
];

// Langue active (sauvegardée en LocalStorage)
export let currentLang = localStorage.getItem('zzz_lang') || 'fr';

export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('zzz_lang', lang);
    updateStaticUI();
}

// Fonction de traduction générique (lit { fr: "...", en: "..." } ou renvoie la chaîne brute)
export function tData(field) {
    if (!field) return '';
    if (typeof field === 'object') return field[currentLang] || field['fr'] || '';
    return field;
}

// Traducteur pour les moteurs (vérifie le dictionnaire officiel)
export function tEngine(englishName) {
    if (currentLang === 'en') return englishName;
    return enginesDict[englishName] || englishName;
}

// Traducteur pour les sets de disques (Exécution en une passe unique)
export function tDisc(name) {
    if (!name) return '';
    if (currentLang === 'en') {
        return name.replace(/4-pièces/gi, "4pc").replace(/2-pièces/gi, "2pc");
    }
    return name
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

// Traducteur pour les statistiques (Recherche directe instantanée + repli règles précompilées)
export function tStats(statStr) {
    if (!statStr) return '';
    if (typeof statStr === 'object') return tData(statStr);
    if (currentLang === 'fr') return statStr;

    // Raccourci direct instantané si le mot correspond exactement
    if (exactStatsEn[statStr]) return exactStatsEn[statStr];

    // Repli pour les statistiques composées (ex: "Taux Crit / Dégâts Crit")
    let translated = statStr;
    for (let i = 0; i < STAT_RULES.length; i++) {
        translated = translated.replace(STAT_RULES[i][0], STAT_RULES[i][1]);
    }
    return translated;
}

// Rafraîchissement des balises fixes dans le DOM
export function updateStaticUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (ui[currentLang] && ui[currentLang][key]) {
            if (el.tagName === 'INPUT') el.placeholder = ui[currentLang][key];
            else el.innerHTML = ui[currentLang][key];
        }
    });
    document.querySelectorAll('.dyn-term').forEach(el => {
        const term = el.getAttribute('data-term');
        if (term) el.textContent = tTerm(term);
    });
}
