import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

let cachedDatabase = null;
let cachedMindscapes = null;
let dbLoadPromise = null;

try {
    const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (navEntry && navEntry.type === 'reload') {
        ['zzz_agent_db', 'zzz_mindscapes_db', 'zzz_engines_db', 'zzz_discs_db'].forEach(k => sessionStorage.removeItem(k));
    }
} catch (e) {}

export function preloadGuideDatabases() {
    if (cachedDatabase && cachedMindscapes) return Promise.resolve();
    if (dbLoadPromise) return dbLoadPromise;

    // 1. Lecture synchrone depuis le sessionStorage si disponible
    if (!cachedDatabase) {
        try {
            const storedDB = sessionStorage.getItem('zzz_agent_db');
            if (storedDB) {
                const parsed = JSON.parse(storedDB);
                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    cachedDatabase = parsed;
                }
            }
        } catch (e) {
            try { sessionStorage.removeItem('zzz_agent_db'); } catch (_) {}
        }
    }

    if (!cachedMindscapes) {
        try {
            const storedMS = sessionStorage.getItem('zzz_mindscapes_db');
            if (storedMS) {
                const parsed = JSON.parse(storedMS);
                if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                    cachedMindscapes = parsed;
                }
            }
        } catch (e) {
            try { sessionStorage.removeItem('zzz_mindscapes_db'); } catch (_) {}
        }
    }

    const needDB = !cachedDatabase;
    const needMS = !cachedMindscapes;
    if (!needDB && !needMS) return Promise.resolve();

    // 2. Utilise le préchargement du <head> sur lien direct ou télécharge en parallèle (HTTP/2)
    const initialPromise = window.__initialGuideData;
    window.__initialGuideData = null;

    const fetchJsonSafe = (url) => fetch(url).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    });

    const rawPromise = initialPromise || Promise.all([
        needDB ? fetchJsonSafe('./js/data/agent_database.json') : Promise.resolve(cachedDatabase),
        needMS ? fetchJsonSafe('./js/data/mindscapes.json') : Promise.resolve(cachedMindscapes)
    ]);

    dbLoadPromise = rawPromise.then(([dbData, msData]) => {
        if (needDB && dbData) {
            cachedDatabase = dbData;
            try { sessionStorage.setItem('zzz_agent_db', JSON.stringify(cachedDatabase)); } catch (e) {}
        }
        if (needMS && msData) {
            cachedMindscapes = msData;
            try { sessionStorage.setItem('zzz_mindscapes_db', JSON.stringify(cachedMindscapes)); } catch (e) {}
        }
    }).finally(() => {
        dbLoadPromise = null;
    });

    return dbLoadPromise;
}

export async function getGuideHTML(agentName, agentMeta = null) {
    if (!cachedDatabase || !cachedMindscapes) {
        try {
            await preloadGuideDatabases();
        } catch (error) {
            console.error("Erreur lors du chargement des guides :", error);
            if (!cachedDatabase) return generateGenericGuide(agentName);
        }
    }

    if (cachedDatabase && cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName], cachedMindscapes || {}, agentMeta);
    } else {
        return generateGenericGuide(agentName);
    }
}

export { generateGenericGuide };
