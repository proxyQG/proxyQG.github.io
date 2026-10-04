import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

// Variable globale pour stocker la base de données une fois chargée
let cachedDatabase = null;
let cachedMindscapes = null;

export async function getGuideHTML(agentName) {
    // 1. Si on n'a pas encore chargé la base de données, on le fait maintenant
    if (!cachedDatabase) {
        try {
            const response = await fetch('./js/data/agent_database.json');
            cachedDatabase = await response.json();
        } catch (error) {
            console.error("Erreur lors du chargement de la base de données des agents:", error);
            return generateGenericGuide(agentName);
        }
    }

    // NOUVEAU : Chargement des mindscapes
if (!cachedMindscapes) {
    try {
        const msResponse = await fetch('./js/data/mindscapes.json', { cache: 'no-store' });
        cachedMindscapes = await msResponse.json();
    } catch (error) {
        console.error("Erreur lors du chargement des mindscapes:", error);
        cachedMindscapes = {};
    }
}
    
    // 2. Maintenant que les données sont chargées (ou l'étaient déjà), on vérifie si l'agent existe
    if (cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName], cachedMindscapes);
    } else {
        // Au cas où tu cliques sur un perso pas encore fait
        return generateGenericGuide(agentName);
    }
}

export { generateGenericGuide };
