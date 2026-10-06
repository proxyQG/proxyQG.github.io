import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

let cachedDatabase = null;
let cachedMindscapes = null;

export async function getGuideHTML(agentName) {
    // 1. Récupération de la base agents (sessionStorage d'abord, puis fetch si absent)
    if (!cachedDatabase) {
        const storedDB = sessionStorage.getItem('zzz_agent_db');
        if (storedDB) {
            try {
                cachedDatabase = JSON.parse(storedDB);
            } catch (e) {
                sessionStorage.removeItem('zzz_agent_db');
            }
        }

        if (!cachedDatabase) {
            try {
                const response = await fetch('./js/data/agent_database.json');
                cachedDatabase = await response.json();
                sessionStorage.setItem('zzz_agent_db', JSON.stringify(cachedDatabase));
            } catch (error) {
                console.error("Erreur lors du chargement de la base agents :", error);
                return generateGenericGuide(agentName);
            }
        }
    }

    // 2. Récupération des Mindscapes (sessionStorage d'abord, puis fetch si absent)
    if (!cachedMindscapes) {
        const storedMS = sessionStorage.getItem('zzz_mindscapes_db');
        if (storedMS) {
            try {
                cachedMindscapes = JSON.parse(storedMS);
            } catch (e) {
                sessionStorage.removeItem('zzz_mindscapes_db');
            }
        }

        if (!cachedMindscapes) {
            try {
                const msResponse = await fetch('./js/data/mindscapes.json');
                cachedMindscapes = await msResponse.json();
                sessionStorage.setItem('zzz_mindscapes_db', JSON.stringify(cachedMindscapes));
            } catch (error) {
                console.error("Erreur lors du chargement des mindscapes :", error);
                cachedMindscapes = {};
            }
        }
    }

    // 3. Affichage du guide
    if (cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName], cachedMindscapes);
    } else {
        return generateGenericGuide(agentName);
    }
}

export { generateGenericGuide };
