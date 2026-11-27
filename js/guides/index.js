import { generateGenericGuide } from './generic.js';
import { generateGuideFromData, buildMindscapes } from './template.js';

let cachedDatabase = null;
let cachedMindscapes = null;
let dbLoadPromise = null;
let msLoadPromise = null;

try {
    const navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    if (navEntry && navEntry.type === 'reload') {
        ['zzz_agent_db', 'zzz_mindscapes_db', 'zzz_engines_db', 'zzz_discs_db'].forEach(k => sessionStorage.removeItem(k));
    }
} catch (e) {}

function readSessionJSON(key) {
    try {
        const raw = sessionStorage.getItem(key);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        try { sessionStorage.removeItem(key); } catch (_) {}
    }
    return null;
}

function fetchJsonSafe(url) {
    return fetch(url).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    });
}

function ensureAgentDatabase() {
    if (cachedDatabase) return Promise.resolve(cachedDatabase);
    cachedDatabase = readSessionJSON('zzz_agent_db');
    if (cachedDatabase) return Promise.resolve(cachedDatabase);
    if (dbLoadPromise) return dbLoadPromise;

    const initialDB = window.__initialAgentDB;
    window.__initialAgentDB = null;

    dbLoadPromise = (initialDB || fetchJsonSafe('./js/data/agent_database.json'))
        .then((dbData) => {
            if (dbData && typeof dbData === 'object' && Object.keys(dbData).length > 0) {
                cachedDatabase = dbData;
                try { sessionStorage.setItem('zzz_agent_db', JSON.stringify(cachedDatabase)); } catch (e) {}
            }
            return cachedDatabase;
        })
        .finally(() => {
            dbLoadPromise = null;
        });

    return dbLoadPromise;
}

function ensureMindscapesDatabase() {
    if (cachedMindscapes) return Promise.resolve(cachedMindscapes);
    cachedMindscapes = readSessionJSON('zzz_mindscapes_db');
    if (cachedMindscapes) return Promise.resolve(cachedMindscapes);
    if (msLoadPromise) return msLoadPromise;

    msLoadPromise = fetchJsonSafe('./js/data/mindscapes.json')
        .then((msData) => {
            if (msData && typeof msData === 'object' && Object.keys(msData).length > 0) {
                cachedMindscapes = msData;
                try { sessionStorage.setItem('zzz_mindscapes_db', JSON.stringify(cachedMindscapes)); } catch (e) {}
            }
            return cachedMindscapes;
        })
        .finally(() => {
            msLoadPromise = null;
        });

    return msLoadPromise;
}

export function preloadGuideDatabases() {
    return Promise.all([ensureAgentDatabase(), ensureMindscapesDatabase()]);
}

export async function getGuideHTML(agentName, agentMeta = null) {
    if (!cachedDatabase) {
        try {
            await ensureAgentDatabase();
        } catch (error) {
            console.error("Erreur lors du chargement des guides :", error);
            if (!cachedDatabase) return generateGenericGuide(agentName);
        }
    }
    if (!cachedMindscapes) {
        cachedMindscapes = readSessionJSON('zzz_mindscapes_db');
    }

    if (cachedDatabase && cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName], cachedMindscapes, agentMeta);
    } else {
        return generateGenericGuide(agentName);
    }
}

export async function getMindscapesHTML(agentName, color) {
    try {
        await ensureMindscapesDatabase();
    } catch (e) {
        return '';
    }
    if (!cachedMindscapes || !cachedMindscapes[agentName]) return '';
    return buildMindscapes(cachedMindscapes[agentName], color || '#d7f70c');
}

export { generateGenericGuide };
