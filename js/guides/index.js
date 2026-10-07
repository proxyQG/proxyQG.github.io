import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

let cachedDatabase = null;
let cachedMindscapes = null;

export async function getGuideHTML(agentName) {
    // 1. Lecture synchrone depuis le sessionStorage si les données ne sont pas encore en mémoire RAM
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

    // 2. Téléchargement en parallèle (HTTP/2) de ce qui manque
    const fetchPromises = [];
    const needDB = !cachedDatabase;
    const needMS = !cachedMindscapes;

    if (needDB) fetchPromises.push(fetch('./js/data/agent_database.json').then(r => r.json()));
    if (needMS) fetchPromises.push(fetch('./js/data/mindscapes.json').then(r => r.json()));

    if (fetchPromises.length > 0) {
        try {
            const results = await Promise.all(fetchPromises);
            let idx = 0;
            if (needDB) {
                cachedDatabase = results[idx++];
                sessionStorage.setItem('zzz_agent_db', JSON.stringify(cachedDatabase));
            }
            if (needMS) {
                cachedMindscapes = results[idx++];
                sessionStorage.setItem('zzz_mindscapes_db', JSON.stringify(cachedMindscapes));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des guides :", error);
            if (!cachedDatabase) return generateGenericGuide(agentName);
        }
    }

    // 3. Affichage du guide
    if (cachedDatabase && cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName], cachedMindscapes || {});
    } else {
        return generateGenericGuide(agentName);
    }
}

export { generateGenericGuide };
