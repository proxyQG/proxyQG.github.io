import { generateGenericGuide } from './generic.js';
import { generateGuideFromData } from './template.js';

// Variable globale pour stocker la base de données une fois chargée
let cachedDatabase = null;

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

    // 2. Maintenant que les données sont chargées (ou l'étaient déjà), on vérifie si l'agent existe
    if (cachedDatabase[agentName]) {
        return generateGuideFromData(agentName, cachedDatabase[agentName]);
    } else {
        // Au cas où tu cliques sur un perso pas encore fait
        return generateGenericGuide(agentName);
    }
}

export { generateGenericGuide };
