import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

let cachedDatabase = null;
let cachedMindscapes = null;
let dbLoadPromise = null;

export function preloadGuideDatabases() {
    if (cachedDatabase && cachedMindscapes) return Promise.resolve();
    if (dbLoadPromise) return dbLoadPromise;

    // 1. Lecture synchrone depuis le sessionStorage si disponible
    if (!cachedDatabase) {
        const storedDB = sessionStorage.getItem('zzz_agent_db');
        if (storedDB) {
            try { cachedDatabase = JSON.parse(storedDB); }
            catch (e) { sessionStorage.removeItem('zzz_agent_db'); }
        }
    }

    if (!cachedMindscapes) {
        const storedMS = sessionStorage.getItem('zzz_mindscapes_db');
        if (storedMS) {
            try { cachedMindscapes = JSON.parse(storedMS); }
            catch (e) { sessionStorage.removeItem('zzz_mindscapes_db'); }
        }
    }

    const needDB = !cachedDatabase;
    const needMS = !cachedMindscapes;
    if (!needDB && !needMS) return Promise.resolve();

    // 2. Utilise le préchargement du <head> sur lien direct ou télécharge en parallèle (HTTP/2)
    const initialPromise = window.__initialGuideData;
    window.__initialGuideData = null;

    const rawPromise = initialPromise || Promise.all([
        needDB ? fetch('./js/data/agent_database.json').then(r => r.json()) : Promise.resolve(cachedDatabase),
        needMS ? fetch('./js/data/mindscapes.json').then(r => r.json()) : Promise.resolve(cachedMindscapes)
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
