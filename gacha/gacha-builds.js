// gacha/gacha-builds.js - Réplique 1:1 du Menu Équipement Zenless Zone Zero (Sans Flash & Boutons Complets)
(function () {
    try {
        const BUILDS_I18N = {
            fr: {
                tabBuilds: "Builds",
                tabBadges: "Badges",
                noAgentsTitle: "Aucun Agent débloqué",
                noAgentsDesc: "Effectuez des Recherches de Signal sur le Canal Unifié pour recruter votre premier Agent !",
                filterBtn: "Filtrer",
                dismantleBtn: "Démanteler",
                recycleBtn: "Recycler",
                customDiscBtn: "Magasin de musique",
                compareBtn: "Comparer",
                collapseBtn: "Réduire",
                recommendedBtn: "Recommandé",
                unequipAllBtn: "Tout déséquiper",
                equipAllBtn: "Tout équiper",
                removeBtn: "Retirer",
                replaceBtn: "Remplacer",
                equipBtn: "Équiper",
                enhanceBtn: "Renforcer",
                confirmUnequipBtn: "Confirmer ?",
                toastEquippedAll: "Build recommandé équipé",
                toastUnequippedAll: "Équipement retiré",
                toastEnhancedMax: "Disque amélioré au Niv. 15",
                toastDismantledOne: "Démantelé (+{g} ✦)",
                toastDismantledBatch: "×{n} démantelés (+{g} ✦)",
                toastLocked: "Disque verrouillé",
                toastUnlocked: "Disque déverrouillé",
                currentSelection: "Sélection actuelle",
                currentlyEquipped: "Équipé",
                subStats: "Stats de l'agent",
                subEquip: "Équipement",
                effectiveSubs: "Stats secondaires utiles :",
                combatEval: "Évaluation de combat",
                piece2: "Ensemble de 2 pièces",
                piece4: "Ensemble de 4 pièces",
                mainStatLabel: "Stat principale",
                subStatsLabel: "Stats secondaires",
                setEffectsLabel: "Effets de l'ensemble",
                baseStatLabel: "Stat de base",
                advStatLabel: "Stat avancée",
                engineEffectLabel: "Effet de moteur-ampli",
                engineSpecIntro: "Les effets suivants sont appliqués pour les personnages de la spécialisation",
                filterAllSets: "Tous les Sets",
                allPartitions: "Toutes Partitions (I–VI)",
                slotOnly: "Partition [{s}] uniquement",
                emptyDiscList: "Aucun disque sur cette partition. Cliquez sur « Magasin de musique » en haut à droite pour en graver.",
                emptyEngineList: "Aucun Moteur-Ampli possédé.",
                bardicTag: "BARDIC NEEDLE • MAGASIN DE MUSIQUE",
                bardicTitle: "Graver des Disques de Poussée",
                searchSetPlaceholder: "Rechercher un Set de Disques...",
                randomPartition: "Aléatoire (I–VI)",
                equipNow: "Équiper",
                equippedTag: "Équipé",
                badgesTitle: "Salle des Trophées : Séries & Factions",
                badgesSub: "Complétez les escouades de New Eridu et les défis d'accordage de disques pour gagner des Polychromes.",
                badgesUnlockedCount: "Badges : {u} / {t}",
                filterAllBadges: "Tous ({n})",
                filterMastery: "Maîtrise & Disques",
                filterSquads: "Escouades",
                claimBadge: "Récupérer",
                claimedBadge: "Obtenu",
                inProgress: "En cours",
                close: "Fermer",
                changeAgentBtn: "Changer",
                pickerTitle: "Sélectionner un Agent",
                pickerSub: "Choisissez l'Agent à équiper parmi vos {n} Agents débloqués.",
                pickerSearch: "Rechercher un Agent...",
                pickerAll: "Tous",
                pickerActive: "ACTIF",
                prevAgentTitle: "Agent précédent",
                nextAgentTitle: "Agent suivant",
                mobWheelHint: "Touchez un disque ou le moteur pour modifier",
                mobStoreShort: "Magasin",
                mobStatsShort: "Stats",
                mobEquipShort: "Roue",
                mobEngineTitle: "Moteur-Ampli",
                mobSlotTitle: "Partition [{s}]",
                mobEffectToggle: "Effet",
                stats: {
                    "PV": "PV", "ATQ": "ATQ", "DÉF": "DÉF", "Impact": "Impact",
                    "Taux CRIT": "Taux CRIT", "Dégâts CRIT": "DGT CRIT",
                    "Maîtrise d'anomalie": "Maîtrise d'anomalie", "Adresse d'anomalie": "Adresse d'anomalie",
                    "Ratio de PÉN": "Taux de PÉN", "Régénération d'énergie": "Récup. d'énergie",
                    "PV (flat)": "PV", "ATQ (flat)": "ATQ", "DÉF (flat)": "DÉF",
                    "PV%": "PV %", "ATQ%": "ATQ %", "DÉF%": "DÉF %", "PÉN (flat)": "PÉN",
                    "DGT Physique": "DGT Physique", "DGT Feu": "DGT Feu", "DGT Glace": "DGT Glace",
                    "DGT Électrique": "DGT Électrique", "DGT Éther": "DGT Éther", "DGT Vent": "DGT Vent"
                }
            },
            en: {
                tabBuilds: "Builds",
                tabBadges: "Badges",
                noAgentsTitle: "No Agents Unlocked Yet",
                noAgentsDesc: "Perform Signal Searches on the Unified Channel to recruit your first Agent!",
                filterBtn: "Filter",
                dismantleBtn: "Dismantle",
                recycleBtn: "Recycle",
                customDiscBtn: "Music Store",
                compareBtn: "Compare",
                collapseBtn: "Collapse",
                recommendedBtn: "Recommended",
                unequipAllBtn: "Unequip All",
                equipAllBtn: "Equip All",
                removeBtn: "Remove",
                replaceBtn: "Replace",
                equipBtn: "Equip",
                enhanceBtn: "Enhance",
                confirmUnequipBtn: "Confirm?",
                toastEquippedAll: "Recommended build equipped",
                toastUnequippedAll: "All equipment removed",
                toastEnhancedMax: "Disc upgraded to Lv. 15",
                toastDismantledOne: "Dismantled (+{g} ✦)",
                toastDismantledBatch: "×{n} dismantled (+{g} ✦)",
                toastLocked: "Disc locked",
                toastUnlocked: "Disc unlocked",
                currentSelection: "Current Selection",
                currentlyEquipped: "Equipped",
                subStats: "Agent Stats",
                subEquip: "Equipment",
                effectiveSubs: "Effective Sub-Stats:",
                combatEval: "Combat Readiness",
                piece2: "2-Piece Set",
                piece4: "4-Piece Set",
                mainStatLabel: "Main Stat",
                subStatsLabel: "Sub-Stats",
                setEffectsLabel: "Set Effects",
                baseStatLabel: "Base Stat",
                advStatLabel: "Advanced Stat",
                engineEffectLabel: "W-Engine Effect",
                engineSpecIntro: "The following effects apply to characters with the specialty",
                filterAllSets: "All Sets",
                allPartitions: "All Partitions (I–VI)",
                slotOnly: "Partition [{s}] Only",
                emptyDiscList: "No Drive Discs in this partition. Click 'Music Store' at the top right to tune discs.",
                emptyEngineList: "No W-Engines owned.",
                bardicTag: "BARDIC NEEDLE • MUSIC STORE",
                bardicTitle: "Tune S-Rank Drive Discs",
                searchSetPlaceholder: "Search a Drive Disc Set...",
                randomPartition: "Random (I–VI)",
                equipNow: "Equip",
                equippedTag: "Equipped",
                badgesTitle: "Trophy Room: Series & Factions",
                badgesSub: "Complete New Eridu squads and Drive Disc tuning challenges to earn Polychrome rewards.",
                badgesUnlockedCount: "Badges: {u} / {t}",
                filterAllBadges: "All ({n})",
                filterMastery: "Mastery & Discs",
                filterSquads: "Squads",
                claimBadge: "Claim",
                claimedBadge: "Claimed",
                inProgress: "In Progress",
                close: "Close",
                changeAgentBtn: "Switch",
                pickerTitle: "Select an Agent",
                pickerSub: "Choose an Agent to customize from your {n} unlocked Agents.",
                pickerSearch: "Search an Agent...",
                pickerAll: "All",
                pickerActive: "ACTIVE",
                prevAgentTitle: "Previous Agent",
                nextAgentTitle: "Next Agent",
                mobWheelHint: "Tap a disc or W-Engine to edit",
                mobStoreShort: "Store",
                mobStatsShort: "Stats",
                mobEquipShort: "Wheel",
                mobEngineTitle: "W-Engine",
                mobSlotTitle: "Partition [{s}]",
                mobEffectToggle: "Effect",
                stats: {
                    "PV": "HP", "ATQ": "ATK", "DÉF": "DEF", "Impact": "Impact",
                    "Taux CRIT": "CRIT Rate", "Dégâts CRIT": "CRIT DMG",
                    "Maîtrise d'anomalie": "Anomaly Mastery", "Adresse d'anomalie": "Anomaly Proficiency",
                    "Ratio de PÉN": "PEN Ratio", "Régénération d'énergie": "Energy Regen",
                    "PV (flat)": "HP", "ATQ (flat)": "ATK", "DÉF (flat)": "DEF",
                    "PV%": "HP %", "ATQ%": "ATK %", "DÉF%": "DEF %", "PÉN (flat)": "PEN",
                    "DGT Physique": "Physical DMG", "DGT Feu": "Fire DMG", "DGT Glace": "Ice DMG",
                    "DGT Électrique": "Electric DMG", "DGT Éther": "Ether DMG", "DGT Vent": "Wind DMG"
                }
            }
        };

        const UI_SVGS = {
            funnel: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18l-7 8v7l-4 2v-9L3 4z"/></svg>`,
            trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
            lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
            lockMini: `<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
            dismantle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><rect x="5" y="6" width="14" height="14" rx="2"/></svg>`,
            discTune: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></svg>`,
            compare: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="4" width="8" height="16" rx="1.5"/><rect x="13" y="4" width="8" height="16" rx="1.5"/></svg>`,
            recommend: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><polygon points="12 7 13.8 10.6 17.8 11.2 14.9 14 15.6 18 12 16.1 8.4 18 9.1 14 6.2 11.2 10.2 10.6 12 7" fill="currentColor"/></svg>`,
            users: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
            chevLeft: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
            chevRight: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`,
            chevDown: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`,
            moreDots: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/></svg>`,
            infoCircle: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
            navBuilds: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></svg>`,
            navBadges: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`
        };

        function B() {
            const lang = window.ZZZGachaBridge?.getLang?.() || 'fr';
            return BUILDS_I18N[lang] || BUILDS_I18N.fr;
        }

        function tStat(statKey) {
            const dict = B().stats || {};
            return dict[statKey] || statKey;
        }

        function normText(str) {
            return String(str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        }

        const ELEM_FR_MAP = {
            Physical: 'Physique', Fire: 'Feu', Ice: 'Glace', Frost: 'Givre',
            Electric: 'Électrique', Ether: 'Éther', Wind: 'Vent',
            Lumiflux: 'Lumen', 'Honed Edge': 'Lame affûtée',
            'Auric Ink': 'Sépia', 'Genesis Flare': 'Flambeau de la genèse'
        };
        const ROLE_FR_MAP = {
            Attack: 'Attaque', Stun: 'Stun', Anomaly: 'Anomalie',
            Support: 'Soutien', Defense: 'Défense', Armorer: 'Forge', Rupture: 'Rupture'
        };
        function tElem(key) {
            const isEn = (window.ZZZGachaBridge?.getLang?.() || 'fr') === 'en';
            return isEn ? (key || '') : (ELEM_FR_MAP[key] || key || '');
        }
        function tRole(key) {
            const isEn = (window.ZZZGachaBridge?.getLang?.() || 'fr') === 'en';
            return isEn ? (key || '') : (ROLE_FR_MAP[key] || key || '');
        }

        // Supprime les {accolades} et [crochets] des textes JSON et met en valeur les chiffres/mots-clés comme en jeu
        function formatCleanDesc(rawText) {
            if (!rawText) return '';
            return String(rawText)
                .replace(/\[([^\]]+)\]/g, '<span style="color:#4ade80;font-weight:900;">$1</span>')
                .replace(/\{([^}]+)\}/g, '<span style="color:#fbbf24;font-weight:800;">$1</span>');
        }

        function extractMaxToken(rangeStr) {
            if (!rangeStr) return '';
            const parts = String(rangeStr).split(/\s*[-–—]\s*/);
            return (parts[parts.length - 1] || '').trim();
        }

        function parseEngineInfo(rawJson, itemObj, isLangEn, overclockIdx = 0) {
            const spec = (rawJson?.specialty || itemObj?.role || '').toLowerCase();
            const isArmorer = spec === 'armorer';
            const rank = rawJson?.rank || itemObj?.rank || 'A';

            const fallbackBase = isArmorer
                ? (rank === 'S' ? 446 : (rank === 'A' ? 356 : 280))
                : (rank === 'S' ? 713 : (rank === 'A' ? 594 : 475));

            const rawBaseMax = extractMaxToken(rawJson?.stats?.base || rawJson?.baseAtk);
            const baseVal = parseFloat(rawBaseMax.replace(',', '.')) || fallbackBase;
            const baseLabel = isArmorer
                ? (isLangEn ? 'Base DEF' : 'DÉF de base')
                : (isLangEn ? 'Base ATK' : 'ATQ de base');

            const fallbackAdvLabel = isArmorer ? tStat('DÉF%') : tStat('ATQ%');
            const fallbackAdvVal = isArmorer
                ? (rank === 'S' ? '48%' : (rank === 'A' ? '40%' : '32%'))
                : (rank === 'S' ? '30%' : (rank === 'A' ? '24%' : '18%'));

            let advLabel = '';
            let advValStr = '';
            if (rawJson?.stats?.advancedLabel) {
                advLabel = (isLangEn ? rawJson.stats.advancedLabel.en : rawJson.stats.advancedLabel.fr)
                    || rawJson.stats.advancedLabel.fr || rawJson.stats.advancedLabel.en || fallbackAdvLabel;
                advValStr = extractMaxToken(rawJson.stats.advanced) || fallbackAdvVal;
            } else {
                const legacySub = (isLangEn ? (rawJson?.subStat?.en || rawJson?.stat?.en) : (rawJson?.subStat?.fr || rawJson?.stat?.fr)) || '';
                const m = String(legacySub).match(/^(.*?)\s*([+]?\d+[.,]?\d*\s*%?)$/);
                advLabel = m ? m[1].trim() : fallbackAdvLabel;
                advValStr = m ? m[2].replace('+', '').trim() : fallbackAdvVal;
            }

            const advNum = parseFloat(String(advValStr).replace(',', '.')) || 0;
            const advStatKey = parseGuideStatKeys(advLabel)[0] || (isArmorer ? 'DÉF%' : 'ATQ%');

            const overclocks = Array.isArray(rawJson?.overclocks) ? rawJson.overclocks : [];
            let rawDesc = '';
            if (overclocks.length > 0) {
                const idx = Math.min(overclocks.length - 1, Math.max(0, overclockIdx));
                rawDesc = (isLangEn ? overclocks[idx]?.en : overclocks[idx]?.fr)
                    || overclocks[idx]?.fr || overclocks[idx]?.en || '';
            } else {
                rawDesc = (isLangEn ? (rawJson?.effect?.en || rawJson?.desc?.en) : (rawJson?.effect?.fr || rawJson?.desc?.fr)) || '';
            }

            return {
                isArmorer,
                baseLabel,
                baseVal: Math.round(baseVal),
                advLabel,
                advValStr,
                advNum,
                advStatKey,
                effectTitle: (isLangEn ? rawJson?.passiveName?.en : rawJson?.passiveName?.fr) || '',
                effectHTML: formatCleanDesc(rawDesc || (isLangEn ? "Increases the equipper's combat effectiveness." : "Augmente l'efficacité de combat du porteur."))
            };
        }

        let EXT_DATA = { loaded: false, guides: {}, discs: {}, engines: {} };

        async function fetchCachedExtJson(url, storageKey) {
            try {
                const cached = sessionStorage.getItem(storageKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
                        return parsed;
                    }
                }
            } catch (e) {
                try { sessionStorage.removeItem(storageKey); } catch (_) {}
            }
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    try { sessionStorage.setItem(storageKey, JSON.stringify(data)); } catch (e) {}
                }
                return data || {};
            } catch (e) {
                return {};
            }
        }

        async function ensureExternalDataLoaded() {
            if (EXT_DATA.loaded) return;
            try {
                const [g, d, e] = await Promise.all([
                    fetchCachedExtJson('js/data/agent_database.json', 'zzz_agent_db'),
                    fetchCachedExtJson('js/data/discs.json', 'zzz_discs_db'),
                    fetchCachedExtJson('js/data/engines.json', 'zzz_engines_db')
                ]);
                EXT_DATA.guides = g || {};
                EXT_DATA.discs = d || {};
                EXT_DATA.engines = e || {};
                EXT_DATA.loaded = Object.keys(EXT_DATA.guides).length > 0
                    && Object.keys(EXT_DATA.discs).length > 0
                    && Object.keys(EXT_DATA.engines).length > 0;
            } catch (err) {
                console.warn('Erreur chargement données externes Builds:', err);
            }
        }

        function getAgentGuide(agentKey) {
            if (!agentKey) return null;
            return EXT_DATA.guides[agentKey]
                || (agentKey === 'Jane' ? EXT_DATA.guides['Jane Doe'] : null)
                || (agentKey === 'Jane Doe' ? EXT_DATA.guides['Jane'] : null)
                || null;
        }

        function parseGuideStatKeys(rawLabel) {
            if (!rawLabel) return [];
            const text = typeof rawLabel === 'object'
                ? (rawLabel.fr || rawLabel.en || '')
                : String(rawLabel);
            const str = text.toUpperCase();
            const parts = str.split(/[>/=,()/]+|\bOU\b|\bOR\b/).map(s => s.trim()).filter(Boolean);
            const res = [];

            parts.forEach(p => {
                if (p.includes('TAUX CRIT') || p.includes('CRIT RATE')) res.push('Taux CRIT');
                else if (p.includes('DGT CRIT') || p.includes('CRIT DMG') || p.includes('DÉGÂTS CRIT') || p.includes('DEGAT CRIT')) res.push('Dégâts CRIT');
                else if (p.includes('ADRESSE') || p.includes('ADRE.') || p.includes('PROFICIENCY')) res.push("Adresse d'anomalie");
                else if (p.includes('MAÎTRISE') || p.includes('MAITRISE') || p.includes('MAÎ.') || p.includes('MASTERY')) res.push("Maîtrise d'anomalie");
                else if (p.includes('ÉNERGIE') || p.includes('ENERGIE') || p.includes('ENERGY')) res.push("Régénération d'énergie");
                else if (p.includes('IMPACT')) res.push('Impact');
                else if ((p.includes('PÉN') || p.includes('PEN')) && (p.includes('FLAT') || (!p.includes('%') && !p.includes('TAUX') && !p.includes('RATIO')))) res.push('PÉN (flat)');
                else if (p.includes('PÉN') || p.includes('PEN')) res.push('Ratio de PÉN');
                else if (p.includes('PHYSIQUE') || p.includes('PHYSICAL')) res.push('DGT Physique');
                else if (p.includes('FEU') || p.includes('FIRE')) res.push('DGT Feu');
                else if (p.includes('GLACE') || p.includes('ICE')) res.push('DGT Glace');
                else if (p.includes('ÉLECTRIQUE') || p.includes('ELECTRIQUE') || p.includes('ELECTRIC')) res.push('DGT Électrique');
                else if (p.includes('ÉTHER') || p.includes('ETHER')) res.push('DGT Éther');
                else if (p.includes('VENT') || p.includes('WIND')) res.push('DGT Vent');
                else if ((p.includes('ATQ') || p.includes('ATK') || p.includes('ATTAQUE')) && p.includes('FLAT')) res.push('ATQ (flat)');
                else if (p.includes('ATQ') || p.includes('ATK') || p.includes('ATTAQUE')) res.push('ATQ%');
                else if ((p.includes('PV') || p.includes('HP')) && p.includes('FLAT')) res.push('PV (flat)');
                else if (p.includes('PV') || p.includes('HP')) res.push('PV%');
                else if ((p.includes('DÉF') || p.includes('DEF')) && p.includes('FLAT')) res.push('DÉF (flat)');
                else if (p.includes('DÉF') || p.includes('DEF')) res.push('DÉF%');
            });

            return [...new Set(res)];
        }

        const STAT_KEY_TO_GOAL_PROP = {
            'PV%': 'hp', 'PV (flat)': 'hp',
            'ATQ%': 'atk', 'ATQ (flat)': 'atk',
            'DÉF%': 'def', 'DÉF (flat)': 'def',
            'Impact': 'imp',
            'Taux CRIT': 'cr',
            'Dégâts CRIT': 'cd',
            "Maîtrise d'anomalie": 'am',
            "Adresse d'anomalie": 'ap',
            'Ratio de PÉN': 'pen',
            "Régénération d'énergie": 'er'
        };

        function parseGuideNumbers(rawVal) {
            const txt = typeof rawVal === 'object' ? (rawVal.fr || rawVal.en || '') : String(rawVal || '');
            if (!txt || txt.includes('...')) return [];
            const cleaned = txt
                .replace(/(\d)[\s\u00a0\u202f]+(\d{3})(?!\d)/g, '$1$2')
                .replace(/(\d),(\d{3})(?!\d)/g, '$1$2')
                .replace(/(\d),(\d)/g, '$1.$2');
            const matches = cleaned.match(/\d+(?:\.\d+)?/g);
            return matches ? matches.map(Number).filter(n => Number.isFinite(n) && n > 0) : [];
        }

        function parseGuideGoals(guide) {
            const goals = {};
            if (!guide || !Array.isArray(guide.stats)) return goals;
            guide.stats.forEach(st => {
                const rawVal = typeof st?.value === 'object' ? (st.value.fr || st.value.en || '') : String(st?.value || '');
                const rawNote = typeof st?.note === 'object' ? `${st.note.fr || ''} ${st.note.en || ''}` : String(st?.note || '');
                if (/\bbase\b/i.test(rawVal) || /ne pas viser|do not build/i.test(rawNote)) return;

                const nums = parseGuideNumbers(rawVal);
                if (nums.length === 0) return;

                const keys = parseGuideStatKeys(st.label);
                const normalizeVal = (prop, val) => (prop === 'er' && val > 10 && rawVal.includes('%'))
                    ? Number((1.2 * val / 100).toFixed(2))
                    : val;

                if (keys.length === 1) {
                    const prop = STAT_KEY_TO_GOAL_PROP[keys[0]];
                    if (prop && !goals[prop]) goals[prop] = normalizeVal(prop, nums[0]);
                } else if (keys.length >= 2) {
                    keys.forEach((k, idx) => {
                        const prop = STAT_KEY_TO_GOAL_PROP[k];
                        const val = nums[idx] ?? nums[0];
                        if (prop && val && !goals[prop]) goals[prop] = normalizeVal(prop, val);
                    });
                }
            });
            return goals;
        }

        function getGuideProfile(agentKey) {
            const g = getAgentGuide(agentKey);
            if (!g) return { sets: [], sets4: [], sets2: [], mainBySlot: { 4: [], 5: [], 6: [] }, subPrio: [], engines: [], goals: {} };

            const sets = (g.discs || []).filter(d => d.set1 && d.set2);
            const sets4 = [];
            const sets2 = [];
            sets.forEach(d => {
                if (d.set1 && !sets4.includes(d.set1)) sets4.push(d.set1);
                if (d.set2 && !sets2.includes(d.set2)) sets2.push(d.set2);
            });

            const mainBySlot = { 4: [], 5: [], 6: [] };
            (g.statPriority?.main || []).forEach(m => {
                const sl = parseInt(m.slot, 10);
                if (mainBySlot[sl]) {
                    parseGuideStatKeys(m.label).forEach(k => {
                        if (!mainBySlot[sl].includes(k)) mainBySlot[sl].push(k);
                    });
                }
            });

            const subPrio = [];
            (g.statPriority?.sub || []).forEach(s => {
                parseGuideStatKeys(s.label).forEach(k => {
                    if (!subPrio.includes(k)) subPrio.push(k);
                });
            });

            const engines = (g.engines || []).map(e => {
                const rawImg = (e.img || e.id || '').replace('.png', '').replace('.webp', '');
                return { rawImg, name: e.name };
            });

            return { sets, sets4, sets2, mainBySlot, subPrio, engines, goals: parseGuideGoals(g) };
        }

        const MAIN_STAT_MAX_LV15 = {
            "PV (flat)": { val: 2200, isPct: false },
            "ATQ (flat)": { val: 316, isPct: false },
            "DÉF (flat)": { val: 184, isPct: false },
            "ATQ%": { val: 30.0, isPct: true },
            "PV%": { val: 30.0, isPct: true },
            "DÉF%": { val: 48.0, isPct: true },
            "Taux CRIT": { val: 24.0, isPct: true },
            "Dégâts CRIT": { val: 48.0, isPct: true },
            "Adresse d'anomalie": { val: 92, isPct: false },
            "Ratio de PÉN": { val: 24.0, isPct: true },
            "DGT Physique": { val: 30.0, isPct: true },
            "DGT Feu": { val: 30.0, isPct: true },
            "DGT Glace": { val: 30.0, isPct: true },
            "DGT Électrique": { val: 30.0, isPct: true },
            "DGT Éther": { val: 30.0, isPct: true },
            "DGT Vent": { val: 30.0, isPct: true },
            "Maîtrise d'anomalie": { val: 30.0, isPct: true },
            "Régénération d'énergie": { val: 60.0, isPct: true },
            "Impact": { val: 18.0, isPct: true }
        };

        const PARTITION_WEIGHTS = {
            1: { "PV (flat)": 1.0 },
            2: { "ATQ (flat)": 1.0 },
            3: { "DÉF (flat)": 1.0 },
            4: {
                "Adresse d'anomalie": 0.2105, "Taux CRIT": 0.1579, "Dégâts CRIT": 0.1579,
                "ATQ%": 0.1579, "PV%": 0.1579, "DÉF%": 0.1579
            },
            5: {
                "DGT Physique": 0.088, "DGT Feu": 0.088, "DGT Glace": 0.088, "DGT Électrique": 0.088,
                "DGT Éther": 0.088, "DGT Vent": 0.088, "Ratio de PÉN": 0.088, "ATQ%": 0.128, "PV%": 0.128, "DÉF%": 0.128
            },
            6: {
                "Maîtrise d'anomalie": 0.150, "Régénération d'énergie": 0.150, "Impact": 0.150,
                "ATQ%": 0.183, "PV%": 0.183, "DÉF%": 0.184
            }
        };

        const SUBSTAT_POOL = [
            { key: "PV (flat)", weight: 150, step: 112, isPct: false },
            { key: "ATQ (flat)", weight: 150, step: 19, isPct: false },
            { key: "DÉF (flat)", weight: 150, step: 15, isPct: false },
            { key: "PV%", weight: 100, step: 3.0, isPct: true },
            { key: "ATQ%", weight: 100, step: 3.0, isPct: true },
            { key: "DÉF%", weight: 100, step: 4.8, isPct: true },
            { key: "Adresse d'anomalie", weight: 100, step: 9, isPct: false },
            { key: "PÉN (flat)", weight: 100, step: 9, isPct: false },
            { key: "Taux CRIT", weight: 75, step: 2.4, isPct: true },
            { key: "Dégâts CRIT", weight: 75, step: 4.8, isPct: true }
        ];

        function drawWeightedKey(table) {
            const entries = Object.entries(table);
            const total = entries.reduce((acc, [, w]) => acc + w, 0);
            let r = Math.random() * total;
            for (const [k, w] of entries) {
                r -= w;
                if (r <= 0) return k;
            }
            return entries[entries.length - 1][0];
        }

        function drawSubstatFromPool(availablePool) {
            const totalWeight = availablePool.reduce((acc, s) => acc + s.weight, 0);
            let r = Math.random() * totalWeight;
            for (let i = 0; i < availablePool.length; i++) {
                r -= availablePool[i].weight;
                if (r <= 0) {
                    const picked = availablePool.splice(i, 1)[0];
                    return { key: picked.key, step: picked.step, isPct: picked.isPct, upgrades: 0 };
                }
            }
            const last = availablePool.pop();
            return { key: last.key, step: last.step, isPct: last.isPct, upgrades: 0 };
        }

        function upgradeDiscOneStep(disc) {
            if (!disc || disc.level >= 15) return false;
            disc.level = Math.min(15, disc.level + 3);

            if (!disc.isFourLiner && disc.level === 3 && disc.substats.length < 4) {
                const usedKeys = new Set([disc.mainStat, ...disc.substats.map(s => s.key)]);
                const remaining = SUBSTAT_POOL.filter(s => !usedKeys.has(s.key)).map(s => ({ ...s }));
                if (remaining.length > 0) {
                    disc.substats.push(drawSubstatFromPool(remaining));
                }
                return true;
            }

            if (disc.substats.length > 0) {
                const lineIdx = Math.floor(Math.random() * disc.substats.length);
                disc.substats[lineIdx].upgrades = (disc.substats[lineIdx].upgrades || 0) + 1;
            }
            return true;
        }

        function formatMainStatValue(mainStatKey, level) {
            const cfg = MAIN_STAT_MAX_LV15[mainStatKey] || { val: 30, isPct: true };
            const scaled = cfg.val * (0.25 + 0.75 * (level / 15));
            return cfg.isPct ? `${scaled.toFixed(1).replace('.0', '')} %` : `${Math.round(scaled)}`;
        }

        function formatSubstatValue(sub) {
            const totalUnits = 1 + (sub.upgrades || 0);
            const raw = totalUnits * sub.step;
            return sub.isPct ? `${raw.toFixed(1).replace('.0', '').replace('.', ',')} %` : `${Math.round(raw)}`;
        }

        const ELEM_ICON_MAP = {
            Physical: 'physique.webp', Fire: 'feu.webp', Ice: 'Ice.webp', Frost: 'Frost.webp',
            Electric: 'electrique.webp', Ether: 'Ether.webp', Wind: 'Vent.webp',
            Aurora: 'Lumiflux.webp', Lumiflux: 'Lumiflux.webp',
            HonedEdge: 'Honed_Edge.webp', Honed_Edge: 'Honed_Edge.webp', 'Honed Edge': 'Honed_Edge.webp',
            Sepia: 'Auric_Ink.webp', Auric_Ink: 'Auric_Ink.webp', 'Auric Ink': 'Auric_Ink.webp',
            'Genesis Flare': 'Genesis_Flare.webp', Genesis_Flare: 'Genesis_Flare.webp'
        };

        function getEngineOwnersList(st, engineKey) {
            if (!engineKey || !st.buildSystem?.agentBuilds) return [];
            const owners = [];
            for (const [agKey, ab] of Object.entries(st.buildSystem.agentBuilds)) {
                if (ab && ab.engineKey === engineKey) owners.push(agKey);
            }
            return owners;
        }

        function ensureBuildState(st) {
            if (!st.buildSystem) {
                st.buildSystem = { craftedDiscs: [], agentBuilds: {}, usedGachaDiscs: {}, claimedBadges: {} };
            }
            if (!st.buildSystem.usedGachaDiscs) st.buildSystem.usedGachaDiscs = {};
            if (!st.buildSystem.agentBuilds) st.buildSystem.agentBuilds = {};
            if (!Array.isArray(st.buildSystem.craftedDiscs)) st.buildSystem.craftedDiscs = [];

            const seenDiscUids = new Set();
            const validUids = new Set(st.buildSystem.craftedDiscs.map(d => d.uid));
            const engineUsedCounts = {};

            Object.values(st.buildSystem.agentBuilds).forEach(ab => {
                if (!ab) return;
                if (ab.discs) {
                    for (let s = 1; s <= 6; s++) {
                        const uid = ab.discs[s];
                        if (!uid) continue;
                        if (!validUids.has(uid) || seenDiscUids.has(uid)) {
                            ab.discs[s] = null;
                        } else {
                            seenDiscUids.add(uid);
                        }
                    }
                }
                if (ab.engineKey) {
                    const ownedCount = st.inventory?.[`engine_${ab.engineKey}`]?.count || 0;
                    const used = engineUsedCounts[ab.engineKey] || 0;
                    if (used >= ownedCount) {
                        ab.engineKey = null;
                    } else {
                        engineUsedCounts[ab.engineKey] = used + 1;
                    }
                }
            });

            return st.buildSystem;
        }

        function getOrInitAgentBuild(st, agentKey) {
            if (!st.buildSystem) ensureBuildState(st);
            if (!st.buildSystem.agentBuilds[agentKey]) {
                st.buildSystem.agentBuilds[agentKey] = {
                    engineKey: null,
                    discs: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null },
                    skills: [1, 1, 1, 1, 1]
                };
            }
            return st.buildSystem.agentBuilds[agentKey];
        }

        function getDiscOwner(st, discUid) {
            if (!discUid || !st.buildSystem?.agentBuilds) return null;
            for (const [agKey, ab] of Object.entries(st.buildSystem.agentBuilds)) {
                for (let s = 1; s <= 6; s++) {
                    if (ab.discs && ab.discs[s] === discUid) return agKey;
                }
            }
            return null;
        }

        function equipDiscUnique(st, targetAgentKey, slotNum, discUid) {
            const bs = ensureBuildState(st);
            Object.entries(bs.agentBuilds).forEach(([, ab]) => {
                for (let s = 1; s <= 6; s++) {
                    if (ab.discs && ab.discs[s] === discUid) ab.discs[s] = null;
                }
            });
            const targetAb = getOrInitAgentBuild(st, targetAgentKey);
            targetAb.discs[slotNum] = discUid;
        }

        function equipEngineUnique(st, targetAgentKey, engineKey) {
            const bs = ensureBuildState(st);
            const totalOwned = st.inventory?.[`engine_${engineKey}`]?.count || 0;
            if (totalOwned <= 0) return;

            const otherOwners = getEngineOwnersList(st, engineKey).filter(k => k !== targetAgentKey);
            if (otherOwners.length >= totalOwned && otherOwners[0]) {
                bs.agentBuilds[otherOwners[0]].engineKey = null;
            }
            const targetAb = getOrInitAgentBuild(st, targetAgentKey);
            targetAb.engineKey = engineKey;
        }

        function getFreeGachaDiscCount(st, setKey = null) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            if (setKey) {
                const pulled = inv[`disc_${setKey}`]?.count || 0;
                const used = bs.usedGachaDiscs[setKey] || 0;
                return Math.max(0, pulled - used);
            }
            let total = 0;
            Object.entries(inv).forEach(([, it]) => {
                if (it.type === 'disc') {
                    const used = bs.usedGachaDiscs[it.rawKey] || 0;
                    total += Math.max(0, (it.count || 0) - used);
                }
            });
            return total;
        }

        function calcDiscDismantleGain(disc) {
            if (!disc) return 0;
            const steps = Math.floor((disc.level || 0) / 3);
            return 5 + Math.round(steps * 4 * 0.8);
        }

        function scoreDiscForAgent(disc, agentKey) {
            if (!disc) return 0;
            const prof = getGuideProfile(agentKey);
            let score = (disc.level || 0) * 2 + (disc.isFourLiner ? 8 : 0);

            if (prof.sets4.includes(disc.setKey)) score += 45;
            else if (prof.sets2.includes(disc.setKey)) score += 38;

            if (disc.slot >= 4) {
                const recMains = prof.mainBySlot[disc.slot] || [];
                const mIdx = recMains.indexOf(disc.mainStat);
                if (mIdx === 0) score += 110;
                else if (mIdx === 1) score += 85;
                else if (mIdx >= 2) score += 65;
            }

            (disc.substats || []).forEach(sub => {
                const sIdx = prof.subPrio.indexOf(sub.key);
                const rolls = 1 + (sub.upgrades || 0);
                if (sIdx === 0) score += rolls * 24;
                else if (sIdx === 1 || sIdx === 2) score += rolls * 18;
                else if (sIdx >= 3) score += rolls * 12;
            });

            return score;
        }

        // ========================================================
        // 5. ÉQUIPEMENT RECOMMANDÉ AUTO V2 (4P + 2P)
        // ========================================================
        function autoEquipFromGuide(st, pool, agent) {
            const bs = ensureBuildState(st);
            const prof = getGuideProfile(agent.rawKey);

            const ownedEngines = pool.allCatalog.filter(i => {
                if (i.type !== 'engine') return false;
                const totalOwned = st.inventory[i.id]?.count || 0;
                if (totalOwned <= 0) return false;
                const otherOwners = getEngineOwnersList(st, i.rawKey).filter(k => k !== agent.rawKey);
                return otherOwners.length < totalOwned;
            });

            let chosenEngine = null;
            for (const recEng of prof.engines) {
                const match = ownedEngines.find(e =>
                    e.rawKey.toLowerCase() === recEng.rawImg.toLowerCase()
                    || (recEng.name && e.rawKey.toLowerCase() === recEng.name.toLowerCase())
                    || e.img.toLowerCase().includes(recEng.rawImg.toLowerCase())
                );
                if (match) {
                    chosenEngine = match;
                    break;
                }
            }
            if (!chosenEngine && ownedEngines.length > 0) {
                const roleMatches = ownedEngines.filter(e => (e.role || '').toLowerCase() === (agent.role || '').toLowerCase());
                const listToPick = roleMatches.length > 0 ? roleMatches : ownedEngines;
                const rW = { S: 0, A: 1, B: 2 };
                listToPick.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));
                chosenEngine = listToPick[0];
            }
            if (chosenEngine) {
                equipEngineUnique(st, agent.rawKey, chosenEngine.rawKey);
            }

            const availBySlot = {};
            for (let s = 1; s <= 6; s++) {
                availBySlot[s] = bs.craftedDiscs.filter(d => {
                    if (d.slot !== s) return false;
                    const owner = getDiscOwner(st, d.uid);
                    return !owner || owner === agent.rawKey;
                });
                availBySlot[s].sort((a, b) => scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
            }

            const target4P = prof.sets4[0] || null;
            const target2P = prof.sets2[0] || null;
            const chosenBySlot = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };

            if (target4P) {
                const slotsWith4P = [1, 2, 3, 4, 5, 6].map(s => {
                    const best4P = availBySlot[s].find(d => d.setKey === target4P) || null;
                    const best2P = target2P ? (availBySlot[s].find(d => d.setKey === target2P) || null) : null;
                    return { slot: s, best4P, best2P };
                }).filter(x => x.best4P !== null);

                if (slotsWith4P.length >= 4) {
                    slotsWith4P.sort((a, b) => {
                        const scoreA = scoreDiscForAgent(a.best4P, agent.rawKey) - (a.best2P ? scoreDiscForAgent(a.best2P, agent.rawKey) : 0);
                        const scoreB = scoreDiscForAgent(b.best4P, agent.rawKey) - (b.best2P ? scoreDiscForAgent(b.best2P, agent.rawKey) : 0);
                        return scoreB - scoreA;
                    });
                    slotsWith4P.slice(0, 4).forEach(x => {
                        chosenBySlot[x.slot] = x.best4P;
                    });
                }
            }

            for (let s = 1; s <= 6; s++) {
                if (chosenBySlot[s]) continue;
                const best2P = target2P ? availBySlot[s].find(d => d.setKey === target2P) : null;
                const bestAny = availBySlot[s][0] || null;
                if (best2P && (!bestAny || scoreDiscForAgent(best2P, agent.rawKey) >= scoreDiscForAgent(bestAny, agent.rawKey) - 35)) {
                    chosenBySlot[s] = best2P;
                } else if (bestAny) {
                    chosenBySlot[s] = bestAny;
                }
            }

            for (let s = 1; s <= 6; s++) {
                if (chosenBySlot[s]) {
                    equipDiscUnique(st, agent.rawKey, s, chosenBySlot[s].uid);
                }
            }
        }

        // ========================================================
        // 6. CALCUL STATISTIQUE & ÉVALUATION
        // ========================================================
        const ROLE_BASE_STATS = {
            Attack:  { hp: 7650, atk: 915, def: 605, imp: 92,  cr: 5.0, cd: 50.0, am: 92,  ap: 95,  pen: 0, er: 1.2, rec: ['Taux CRIT', 'Dégâts CRIT', 'ATQ%'], goals: { atk: 2600, cr: 65, cd: 135 } },
            Anomaly: { hp: 7800, atk: 885, def: 612, imp: 86,  cr: 5.0, cd: 50.0, am: 148, ap: 118, pen: 0, er: 1.2, rec: ["Adresse d'anomalie", 'ATQ%'], goals: { ap: 360, atk: 2450, am: 175 } },
            Stun:    { hp: 8250, atk: 790, def: 650, imp: 136, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['Impact', 'Taux CRIT', 'ATQ%'], goals: { imp: 162, atk: 2050, cr: 52 } },
            Support: { hp: 8400, atk: 810, def: 660, imp: 90,  cr: 5.0, cd: 50.0, am: 94,  ap: 96,  pen: 0, er: 1.4, rec: ["Régénération d'énergie", 'ATQ%', 'PV%'], goals: { er: 2.2, atk: 2250, hp: 9600 } },
            Defense: { hp: 9100, atk: 740, def: 780, imp: 110, cr: 5.0, cd: 50.0, am: 90,  ap: 90,  pen: 0, er: 1.2, rec: ['DÉF%', 'PV%', 'Impact'], goals: { def: 1700, hp: 10800, imp: 125 } },
            Rupture: { hp: 8100, atk: 895, def: 620, imp: 98,  cr: 5.0, cd: 50.0, am: 96,  ap: 98,  pen: 8, er: 1.2, rec: ['Taux CRIT', 'Dégâts CRIT', 'PV%', 'ATQ%'], goals: { cr: 62, cd: 135, atk: 2450 } },
            Armorer: { hp: 8300, atk: 760, def: 790, imp: 105, cr: 5.0, cd: 50.0, am: 95,  ap: 95,  pen: 0, er: 1.2, rec: ['Taux CRIT', 'DÉF%', 'Dégâts CRIT'], goals: { def: 2000, cr: 65, cd: 100 } }
        };

        function computeAgentStats(st, pool, agentMeta) {
            const bs = ensureBuildState(st);
            const ab = getOrInitAgentBuild(st, agentMeta.rawKey);
            const base = { ...(ROLE_BASE_STATS[agentMeta.role] || ROLE_BASE_STATS.Attack) };
            const prof = getGuideProfile(agentMeta.rawKey);
            const recSubList = prof.subPrio.length > 0 ? prof.subPrio : base.rec;

            const ownedCopies = st.inventory[`agent_${agentMeta.rawKey}`]?.count || 1;
            const mindscape = Math.min(6, Math.max(0, ownedCopies - 1));
            const overclockLvl = Math.max(0, ownedCopies - 7);

            let engineAtkFlat = 0;
            let engineDefFlat = 0;
            let engineAdvStatKey = null;
            let engineAdvNum = 0;
            let isGuideEngine = false;
            let engRank = null;
            if (ab.engineKey) {
                const engObj = pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey);
                if (engObj) {
                    engRank = engObj.rank;
                    const parsedEng = parseEngineInfo(EXT_DATA.engines[engObj.rawKey], engObj, false, 0);
                    if (parsedEng.isArmorer) engineDefFlat = parsedEng.baseVal;
                    else engineAtkFlat = parsedEng.baseVal;
                    engineAdvStatKey = parsedEng.advStatKey;
                    engineAdvNum = parsedEng.advNum;
                    isGuideEngine = prof.engines.some(re =>
                        engObj.rawKey.toLowerCase() === re.rawImg.toLowerCase()
                        || (re.name && engObj.rawKey.toLowerCase() === re.name.toLowerCase())
                        || engObj.img.toLowerCase().includes(re.rawImg.toLowerCase())
                    );
                }
            }

            const baseHp = base.hp;
            const baseAtk = base.atk + engineAtkFlat;
            const baseDef = base.def + engineDefFlat;

            let hpPct = 0, hpFlat = 0;
            let atkPct = 0, atkFlat = 0;
            let defPct = 0, defFlat = 0;
            let cr = base.cr, cd = base.cd;
            let ap = base.ap, amPct = 0, impPct = 0, erPct = 0, penPct = base.pen;
            let effectiveSubRolls = 0;
            let totalDiscLevels = 0;
            let matchingMainStats = 0;

            const setCounts = {};

            function addStatContribution(statKey, amount) {
                if (statKey === 'PV (flat)') hpFlat += amount;
                else if (statKey === 'ATQ (flat)') atkFlat += amount;
                else if (statKey === 'DÉF (flat)') defFlat += amount;
                else if (statKey === 'PV%') hpPct += amount;
                else if (statKey === 'ATQ%') atkPct += amount;
                else if (statKey === 'DÉF%') defPct += amount;
                else if (statKey === 'Taux CRIT') cr += amount;
                else if (statKey === 'Dégâts CRIT') cd += amount;
                else if (statKey === "Adresse d'anomalie") ap += amount;
                else if (statKey === 'Ratio de PÉN') penPct += amount;
                else if (statKey === "Maîtrise d'anomalie") amPct += amount;
                else if (statKey === "Régénération d'énergie") erPct += amount;
                else if (statKey === 'Impact') impPct += amount;
            }

            if (engineAdvStatKey && engineAdvNum > 0) {
                addStatContribution(engineAdvStatKey, engineAdvNum);
            }

            for (let slot = 1; slot <= 6; slot++) {
                const uid = ab.discs[slot];
                if (!uid) continue;
                const d = bs.craftedDiscs.find(x => x.uid === uid);
                if (!d) continue;

                totalDiscLevels += (d.level || 0);
                setCounts[d.setKey] = (setCounts[d.setKey] || 0) + 1;

                if (slot >= 4) {
                    const recMains = prof.mainBySlot[slot] || [];
                    if (recMains.length === 0 || recMains.includes(d.mainStat)) {
                        matchingMainStats += 1;
                    }
                }

                const mCfg = MAIN_STAT_MAX_LV15[d.mainStat];
                if (mCfg) {
                    const mVal = mCfg.val * (0.25 + 0.75 * (d.level / 15));
                    addStatContribution(d.mainStat, mVal);
                }

                (d.substats || []).forEach(sub => {
                    const units = 1 + (sub.upgrades || 0);
                    addStatContribution(sub.key, units * sub.step);
                    if (recSubList.includes(sub.key)) {
                        effectiveSubRolls += units;
                    }
                });
            }

            // Application réelle des bonus de sets 2-pièces actifs
            Object.entries(setCounts).forEach(([setKey, count]) => {
                if (count < 2) return;
                const dJson = EXT_DATA.discs[setKey];
                const raw2p = String(dJson?.twoPiece?.en || dJson?.twoPiece?.fr || '').replace(/[\[\]{}]/g, '');
                if (!raw2p) return;
                const valMatch = raw2p.match(/\+?\s*(\d+(?:[.,]\d+)?)\s*(%?)/);
                const val = valMatch ? parseFloat(valMatch[1].replace(',', '.')) : 0;
                if (!val) return;
                const up = raw2p.toUpperCase();
                if (up.includes('CRIT RATE') || up.includes('TAUX CRIT')) addStatContribution('Taux CRIT', val);
                else if (up.includes('CRIT DMG') || up.includes('DGT CRIT')) addStatContribution('Dégâts CRIT', val);
                else if (up.includes('ANOMALY PROFICIENCY') || up.includes("ADRESSE D'ANOMALIE")) addStatContribution("Adresse d'anomalie", val);
                else if (up.includes('ANOMALY MASTERY') || up.includes("MAÎTRISE D'ANOMALIE")) addStatContribution("Maîtrise d'anomalie", val);
                else if (up.includes('ENERGY REGEN') || up.includes("ÉNERGIE") || up.includes("ENERGIE")) addStatContribution("Régénération d'énergie", val);
                else if (up.includes('PEN RATIO') || up.includes('TAUX DE PÉN') || up.includes('TAUX DE PEN')) addStatContribution('Ratio de PÉN', val);
                else if (up.includes('IMPACT')) addStatContribution('Impact', val);
                else if (/\bATK\b|\bATQ\b/.test(up) && valMatch[2] === '%') addStatContribution('ATQ%', val);
                else if (/\bDEF\b|\bDÉF\b/.test(up) && valMatch[2] === '%') addStatContribution('DÉF%', val);
                else if (/\bHP\b|\bPV\b/.test(up) && valMatch[2] === '%') addStatContribution('PV%', val);
            });

            const overclockMult = 1 + Math.min(0.20, overclockLvl * 0.02);

            const finalHp = Math.round(((baseHp * (1 + hpPct / 100)) + hpFlat) * overclockMult);
            const finalAtk = Math.round(((baseAtk * (1 + atkPct / 100)) + atkFlat) * overclockMult);
            const finalDef = Math.round(((baseDef * (1 + defPct / 100)) + defFlat) * overclockMult);
            const finalImp = Math.round(base.imp * (1 + impPct / 100));
            const finalAm = Math.round(base.am * (1 + amPct / 100));
            const finalErNum = Number((base.er * (1 + erPct / 100)).toFixed(2));
            const finalAp = Math.round(ap);

            const hasGuideGoals = prof.goals && Object.keys(prof.goals).length > 0;
            const gTargets = hasGuideGoals ? prof.goals : (base.goals || { atk: 2500, cr: 60, cd: 120 });
            const goalBuilders = {
                hp:  (v) => ({ label: tStat('PV'), cur: finalHp, target: v, pct: Math.min(100, Math.round(finalHp / v * 100)) }),
                atk: (v) => ({ label: tStat('ATQ'), cur: finalAtk, target: v, pct: Math.min(100, Math.round(finalAtk / v * 100)) }),
                def: (v) => ({ label: tStat('DÉF'), cur: finalDef, target: v, pct: Math.min(100, Math.round(finalDef / v * 100)) }),
                imp: (v) => ({ label: tStat('Impact'), cur: finalImp, target: v, pct: Math.min(100, Math.round(finalImp / v * 100)) }),
                cr:  (v) => ({ label: tStat('Taux CRIT'), cur: `${cr.toFixed(1)}%`, target: `${v}%`, pct: Math.min(100, Math.round(cr / v * 100)) }),
                cd:  (v) => ({ label: tStat('Dégâts CRIT'), cur: `${cd.toFixed(1)}%`, target: `${v}%`, pct: Math.min(100, Math.round(cd / v * 100)) }),
                am:  (v) => ({ label: tStat("Maîtrise d'anomalie"), cur: finalAm, target: v, pct: Math.min(100, Math.round(finalAm / v * 100)) }),
                ap:  (v) => ({ label: tStat("Adresse d'anomalie"), cur: finalAp, target: v, pct: Math.min(100, Math.round(finalAp / v * 100)) }),
                pen: (v) => ({ label: tStat('Ratio de PÉN'), cur: `${penPct.toFixed(1)}%`, target: `${v}%`, pct: Math.min(100, Math.round(penPct / v * 100)) }),
                er:  (v) => ({ label: tStat("Régénération d'énergie"), cur: finalErNum.toFixed(2), target: Number(v).toFixed(2), pct: Math.min(100, Math.round(finalErNum / v * 100)) })
            };
            const goalItems = Object.entries(gTargets)
                .map(([k, v]) => (goalBuilders[k] && v > 0 ? goalBuilders[k](v) : null))
                .filter(Boolean);

            const equippedDiscsCount = Object.values(ab.discs).filter(Boolean).length;
            let evalPoints = 0;

            if (ab.engineKey) {
                evalPoints += isGuideEngine ? 12 : (engRank === 'S' ? 10 : (engRank === 'A' ? 7 : 4));
            }
            evalPoints += (totalDiscLevels / 90) * 30;

            const hasGuide4P = Object.entries(setCounts).some(([sk, c]) => c >= 4 && (prof.sets4.length === 0 || prof.sets4.includes(sk)));
            const hasAny4P = Object.values(setCounts).some(c => c >= 4);
            const twoPieceSetsCount = Object.values(setCounts).filter(c => c >= 2).length;
            if (hasGuide4P) evalPoints += 11;
            else if (hasAny4P) evalPoints += 7;
            if ((hasAny4P && twoPieceSetsCount >= 2) || twoPieceSetsCount >= 3) evalPoints += 5;
            else if (twoPieceSetsCount >= 2) evalPoints += 2;

            evalPoints += matchingMainStats * 5;

            const avgGoalPct = goalItems.length > 0
                ? (goalItems.reduce((acc, g) => acc + g.pct, 0) / (goalItems.length * 100))
                : 0.4;
            if (equippedDiscsCount > 0) {
                const lvlFactor = 0.35 + 0.65 * (totalDiscLevels / 90);
                evalPoints += (avgGoalPct * 14) * lvlFactor;
                evalPoints += Math.min(13, effectiveSubRolls * 0.65);
            }

            const finalScore = Math.min(100, Math.round(evalPoints));
            let grade = 'C';
            if (equippedDiscsCount < 4 || (totalDiscLevels < 18 && finalScore < 42)) {
                grade = 'C';
            } else if (finalScore >= 90 && totalDiscLevels >= 75) {
                grade = 'SSS';
            } else if (finalScore >= 80 && totalDiscLevels >= 60) {
                grade = 'SS';
            } else if (finalScore >= 68 && totalDiscLevels >= 45) {
                grade = 'S';
            } else if (finalScore >= 52 && totalDiscLevels >= 18) {
                grade = 'A';
            } else {
                grade = 'B';
            }

            return {
                hp: finalHp, hpBonus: finalHp - base.hp, atk: finalAtk, atkBonus: finalAtk - base.atk,
                def: finalDef, defBonus: finalDef - base.def, imp: finalImp,
                cr: cr.toFixed(1) + ' %', cd: cd.toFixed(1) + ' %', am: finalAm, ap: finalAp,
                pen: penPct.toFixed(1) + ' %', er: finalErNum.toFixed(2),
                effectiveSubRolls, totalDiscLevels, matchingMainStats,
                goalItems: goalItems.slice(0, 3), grade, finalScore,
                mindscape, overclockLvl, setCounts, recSubList,
                goalProps: Object.keys(gTargets)
            };
        }

        // ========================================================
        // 7. INTERFACE D'ÉQUIPEMENT ZZZ 1:1
        // ========================================================
        let selectedAgentKey = '';
        let currentSubMenu = 'equip';
        let activeWheelTarget = 1;
        let selectedItemId = null;
        let isCompareMode = false;
        let showFilterBar = false;
        let filterSetKey = 'all';
        let showAllPartitions = false;
        let filterEngineSpecialtyOnly = false;
        let bardicSetKey = '';
        let bardicSlot = 0;
        let unequipConfirmArmed = false;
        let unequipConfirmTimer = null;
        let batchTrashConfirmArmed = false;
        let batchTrashConfirmTimer = null;
        let mobileSlotDrawerOpen = false;
        let mobileMoreMenuOpen = false;
        let mobileEffectExpanded = false;
        let lastMobTapId = null;
        let lastMobTapTime = 0;

        function isMobileViewport() {
            return window.innerWidth < 768;
        }

        function getBuildsPortal() {
            const modal = document.getElementById('zzz-gacha-modal');
            if (!modal) return null;
            let portal = document.getElementById('zzz-builds-portal');
            if (!portal) {
                portal = document.createElement('div');
                portal.id = 'zzz-builds-portal';
                modal.appendChild(portal);
            }
            return portal;
        }

        function clearBuildsPortal() {
            const portal = document.getElementById('zzz-builds-portal');
            if (portal) {
                portal.innerHTML = '';
                portal.classList.remove('active');
            }
        }

        function resetConfirmStates() {
            unequipConfirmArmed = false;
            clearTimeout(unequipConfirmTimer);
            batchTrashConfirmArmed = false;
            clearTimeout(batchTrashConfirmTimer);
        }

        function getOwnedAgents(st, pool) {
            const bridge = window.ZZZGachaBridge;
            const rW = { S: 0, A: 1, B: 2 };
            return pool.allCatalog
                .filter(i => i.type === 'agent' && (st.inventory[i.id]?.count || 0) > 0)
                .sort((a, b) => {
                    const rw = (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9);
                    if (rw !== 0) return rw;
                    const na = bridge?.itemName ? bridge.itemName(a) : (a.nameFr || a.rawKey);
                    const nb = bridge?.itemName ? bridge.itemName(b) : (b.nameFr || b.rawKey);
                    return na.localeCompare(nb);
                });
        }

        function buildAgentSwitcherHTML(st, pool, ownedAgents, agent, ab, calc, bridge, t) {
            const isEn = (bridge.getLang?.() || 'fr') === 'en';
            const cnt = st.inventory[agent.id]?.count || 1;
            const mTag = cnt > 7 ? `M6 +${cnt - 7}` : `M${Math.min(6, cnt - 1)}`;
            const eqDiscs = ab?.discs ? Object.values(ab.discs).filter(Boolean).length : 0;
            const navDisabled = ownedAgents.length <= 1 ? 'disabled' : '';

            const gradeColors = { SSS: '#d7f70c', SS: '#facc15', S: '#facc15', A: '#c084fc', B: '#38bdf8', C: '#a1a1aa' };
            const gradeCol = gradeColors[calc.grade] || '#a1a1aa';

            const activeSets = Object.entries(calc.setCounts || {})
                .filter(([, count]) => count >= 2)
                .sort((a, b) => b[1] - a[1]);

            const setsHTML = activeSets.length > 0
                ? activeSets.map(([setKey, count]) => {
                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === setKey);
                    const sName = dObj ? bridge.itemName(dObj) : setKey;
                    const pTag = count >= 4 ? (isEn ? '4pc' : '4P') : (isEn ? '2pc' : '2P');
                    return `
                    <div class="zb-hud-chip is-set" title="${pTag} ${sName}">
                        ${dObj ? `<img src="${dObj.img}" alt="">` : ''}
                        <span class="zb-hud-set-tag">${pTag}</span>
                        <span class="zb-hud-set-name">${sName}</span>
                    </div>`;
                }).join('')
                : `<span class="zb-hud-muted">${isEn ? 'No active set bonus' : 'Aucun bonus de set actif'}</span>`;

            return `
            <div class="zb-agent-switcher">
                <button type="button" class="zb-nav-arrow-btn" id="zb-btn-prev-agent" ${navDisabled} title="${t.prevAgentTitle}">
                    ${UI_SVGS.chevLeft}
                </button>
                <button type="button" class="zb-agent-picker-btn" id="zb-btn-open-agent-picker" title="${t.pickerTitle}">
                    <div class="zb-agent-picker-left">
                        <img src="${agent.img}" alt="${bridge.itemName(agent)}">
                        <div style="min-width:0;">
                            <span class="zb-roster-name">${bridge.itemName(agent)}</span>
                            <span class="zb-roster-sub">
                                <span class="zb-sub-desk">${agent.rank} • ${isEn ? 'Lv.' : 'Niv.'} 60 • ${mTag}</span>
                                <span class="zb-sub-mob"><strong style="color:${gradeCol};">${calc.grade}</strong> • ${eqDiscs}/6 • ${mTag}</span>
                            </span>
                        </div>
                    </div>
                    <span class="zb-agent-picker-cta">
                        <span>${t.changeAgentBtn}<span class="zb-cta-count"> (${ownedAgents.length})</span></span>
                        ${UI_SVGS.chevDown}
                    </span>
                </button>
                <button type="button" class="zb-nav-arrow-btn" id="zb-btn-next-agent" ${navDisabled} title="${t.nextAgentTitle}">
                    ${UI_SVGS.chevRight}
                </button>
            </div>

            <div class="zb-build-hud">
                <div class="zb-hud-chip is-grade">
                    <span style="color:#a1a1aa;font-size:10px;text-transform:uppercase;">${isEn ? 'Grade' : 'Note'}</span>
                    <span class="zb-hud-grade-val" style="color:${gradeCol};">${calc.grade}</span>
                    <span style="font-family:monospace;font-size:10px;color:#a1a1aa;">(${calc.finalScore}%)</span>
                </div>
                <div class="zb-hud-chip">
                    <span style="color:#a1a1aa;font-size:10px;text-transform:uppercase;">${isEn ? 'Discs' : 'Disques'}</span>
                    <span style="font-family:monospace;color:${eqDiscs === 6 ? '#4ade80' : '#38bdf8'};">${eqDiscs}/6</span>
                </div>
                ${setsHTML}
                <div class="zb-hud-chip">
                    <span style="color:#a1a1aa;font-size:10px;text-transform:uppercase;">Sub-stats</span>
                    <span style="font-family:monospace;color:#facc15;">${calc.effectiveSubRolls}</span>
                </div>
            </div>`;
        }

        function buildInspectorPaneHTML(st, pool, agent, itemObj, isEngineMode, headerTag = '', isLangEn = false, t, bridge, prof) {
            if (!itemObj) {
                return `
                    <div class="zzz-inspector-pane" style="justify-content:center;align-items:center;text-align:center;min-height:260px;color:#8e8e99;font-size:12.5px;">
                        ${isEngineMode ? t.emptyEngineList : t.emptyDiscList}
                    </div>`;
            }

            if (isEngineMode) {
                const rawJson = EXT_DATA.engines[itemObj.rawKey] || {};
                const cnt = st.inventory[itemObj.id]?.count || 1;
                const owners = getEngineOwnersList(st, itemObj.rawKey);
                const avatarOwner = owners.includes(agent.rawKey) ? agent.rawKey : owners[0];
                const ocTier = Math.min(5, Math.max(1, cnt));
                const engInfo = parseEngineInfo(rawJson, itemObj, isLangEn, ocTier - 1);
                const effectTitle = engInfo.effectTitle || bridge.itemName(itemObj);

                return `
                    <div class="zzz-inspector-pane">
                        ${headerTag ? `<span class="zzz-insp-tag-top">${headerTag}</span>` : ''}
                        <h3 class="zzz-insp-title">${bridge.itemName(itemObj)}</h3>

                        <div class="zzz-insp-lvl-row">
                            <div class="zzz-insp-lvl-pill">
                                <span class="zzz-rank-circle r-${itemObj.rank}">${itemObj.rank}</span>
                                <span>${isLangEn ? 'Lv.' : 'Niv.'} 60/60 • ★${ocTier}</span>
                            </div>
                            ${avatarOwner ? `<img src="assets/Agents/${avatarOwner}.webp" title="${owners.join(', ')}" style="width:28px;height:28px;border-radius:999px;border:2px solid #fff;background:#000;">` : ''}
                        </div>

                        <div class="zzz-stat-bar" style="width:fit-content;gap:14px;padding:4px 14px;">
                            <span style="color:#a1a1aa;font-size:11px;">${isLangEn ? 'Copies' : 'Exemplaires'} : ×${cnt}</span>
                            <span style="color:#d7f70c;font-size:11px;">${owners.length}/${cnt} ${isLangEn ? 'equipped' : 'équipé(s)'}</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.baseStatLabel}</span>
                        <div class="zzz-stat-bar">
                            <span>${engInfo.baseLabel}</span>
                            <span>${engInfo.baseVal}</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.advStatLabel}</span>
                        <div class="zzz-stat-bar hl-gold">
                            <span>${engInfo.advLabel}</span>
                            <span>${engInfo.advValStr}</span>
                        </div>

                        <span class="zzz-insp-sec-lbl">${t.engineEffectLabel}</span>
                        <div class="zzz-set-desc-block">
                            <div style="margin-bottom:6px;color:#d4d4d8;">
                                ${t.engineSpecIntro} <strong style="color:#f59e0b;">${tRole(rawJson.specialty || itemObj.role || agent.role)}</strong> :
                            </div>
                            <div class="zzz-stat-bar" style="margin-bottom:7px;">
                                <span>${effectTitle}</span>
                            </div>
                            <div>${engInfo.effectHTML}</div>
                        </div>
                    </div>
                `;
            }

            const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === itemObj.setKey);
            const setName = sObj ? bridge.itemName(sObj) : itemObj.setKey;
            const rawDiscJson = EXT_DATA.discs[itemObj.setKey] || {};
            const desc2P = formatCleanDesc((isLangEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || (isLangEn ? '2-piece stat bonus.' : 'Bonus de statistique 2 pièces.'));
            const desc4P = formatCleanDesc((isLangEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || (isLangEn ? '4-piece combat passive effect.' : 'Effet passif 4 pièces en combat.'));
            const ownerKey = getDiscOwner(st, itemObj.uid);

            return `
                <div class="zzz-inspector-pane">
                    ${headerTag ? `<span class="zzz-insp-tag-top">${headerTag}</span>` : ''}
                    <h3 class="zzz-insp-title">${setName} [${itemObj.slot}]</h3>

                    <div class="zzz-insp-lvl-row">
                        <div class="zzz-insp-lvl-pill">
                            <span class="zzz-rank-circle">S</span>
                            <span>${isLangEn ? 'Lv.' : 'Niv.'} ${itemObj.level}/15</span>
                        </div>
                        ${ownerKey ? `<img src="assets/Agents/${ownerKey}.webp" title="${ownerKey}" style="width:28px;height:28px;border-radius:999px;border:2px solid #fff;background:#000;">` : ''}
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.mainStatLabel}</span>
                    <div class="zzz-stat-bar">
                        <span>${tStat(itemObj.mainStat)}</span>
                        <span>${formatMainStatValue(itemObj.mainStat, itemObj.level)}</span>
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.subStatsLabel}</span>
                    <div style="display:flex;flex-direction:column;gap:5px;">
                        ${(itemObj.substats || []).map(sub => {
                            const isGuideSub = prof.subPrio.includes(sub.key);
                            return `
                            <div class="zzz-stat-bar ${isGuideSub ? 'hl-gold' : ''}">
                                <span>${tStat(sub.key)}${sub.upgrades > 0 ? `<span class="up-num">+${sub.upgrades}</span>` : ''}</span>
                                <span>${formatSubstatValue(sub)}</span>
                            </div>`;
                        }).join('')}
                    </div>

                    <span class="zzz-insp-sec-lbl">${t.setEffectsLabel}</span>
                    <div class="zzz-stat-bar">
                        <span>${setName}</span>
                    </div>
                    <div class="zzz-set-desc-block">
                        <div><strong>${t.piece2} :</strong> ${desc2P}</div>
                        <div style="margin-top:4px;"><strong>${t.piece4} :</strong> ${desc4P}</div>
                    </div>
                </div>
            `;
        }

        async function renderBuildsTab(mount) {
            await ensureExternalDataLoaded();
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const t = B();
            const isLangEn = (bridge.getLang?.() || 'fr') === 'en';
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const ownedAgents = getOwnedAgents(st, pool);

            if (ownedAgents.length === 0) {
                mount.innerHTML = `
                    <div class="zb-wrap" style="text-align:center;padding:60px 20px;">
                        <h2 class="gacha-panel-title">${t.noAgentsTitle}</h2>
                        <p class="gacha-panel-desc">${t.noAgentsDesc}</p>
                    </div>`;
                return;
            }

            if (!selectedAgentKey || !ownedAgents.some(a => a.rawKey === selectedAgentKey)) {
                selectedAgentKey = ownedAgents[0].rawKey;
            }

            const agent = ownedAgents.find(a => a.rawKey === selectedAgentKey) || ownedAgents[0];
            const ab = getOrInitAgentBuild(st, agent.rawKey);
            const calc = computeAgentStats(st, pool, agent);
            const prof = getGuideProfile(agent.rawKey);
            const freeDiscsTotal = getFreeGachaDiscCount(st);

            const switcherHTML = buildAgentSwitcherHTML(st, pool, ownedAgents, agent, ab, calc, bridge, t);

            if (currentSubMenu === 'stats') {
                clearBuildsPortal();
                mount.innerHTML = `
                    <div class="zb-wrap">
                        <div class="zb-roster-strip">
                            ${switcherHTML}
                            <button type="button" class="zzz-pill-btn active zb-subview-btn" id="btn-toggle-subview">
                                <span class="zzz-pill-icon yellow">${UI_SVGS.discTune}</span>
                                <span class="zb-lbl-desk">${t.subEquip}</span>
                                <span class="zb-lbl-mob">${t.mobEquipShort || t.subEquip}</span>
                            </button>
                        </div>
                        <div class="zb-panel-card">
                            ${renderSubMenuStats(agent, calc, pool, bridge, t)}
                        </div>
                    </div>
                `;
                bindRosterAndSubViewEvents(mount, ownedAgents);
                return;
            }

            const isEngineMode = activeWheelTarget === 'engine';
            const slotNum = isEngineMode ? 0 : (Number(activeWheelTarget) || 1);

            let gridItems = [];
            if (isEngineMode) {
                gridItems = pool.allCatalog.filter(i => {
                    if (i.type !== 'engine' || (st.inventory[i.id]?.count || 0) <= 0) return false;
                    if (filterEngineSpecialtyOnly && (i.role || '').toLowerCase() !== (agent.role || '').toLowerCase()) return false;
                    return true;
                });
                const rW = { S: 0, A: 1, B: 2 };
                gridItems.sort((a, b) => (rW[a.rank] ?? 9) - (rW[b.rank] ?? 9));
                if (!selectedItemId || !gridItems.some(e => e.rawKey === selectedItemId)) {
                    selectedItemId = ab.engineKey || gridItems[0]?.rawKey || null;
                }
            } else {
                gridItems = bs.craftedDiscs.filter(d => showAllPartitions ? true : d.slot === slotNum);
                if (filterSetKey !== 'all') {
                    gridItems = gridItems.filter(d => d.setKey === filterSetKey);
                }
                gridItems.sort((a, b) => b.level - a.level || scoreDiscForAgent(b, agent.rawKey) - scoreDiscForAgent(a, agent.rawKey));
                if (!selectedItemId || !gridItems.some(d => d.uid === selectedItemId)) {
                    selectedItemId = ab.discs[slotNum] || gridItems[0]?.uid || null;
                }
            }

            const leftGridHTML = gridItems.map(it => {
                if (isEngineMode) {
                    const cnt = st.inventory[it.id]?.count || 1;
                    const owners = getEngineOwnersList(st, it.rawKey);
                    const avatarOwner = owners.includes(agent.rawKey) ? agent.rawKey : owners[0];
                    const isSel = it.rawKey === selectedItemId;
                    const isEqHere = ab.engineKey === it.rawKey;
                    return `
                    <div class="zzz-case-item ${isSel ? 'selected' : ''}" data-grid-pick="${it.rawKey}">
                        <div class="zzz-case-box rank-${it.rank}">
                            ${avatarOwner ? `<div class="zzz-case-owner"><img src="assets/Agents/${avatarOwner}.webp"></div>` : ''}
                            ${isSel ? `<button type="button" class="zzz-mob-quick-btn ${isEqHere ? 'is-equipped' : ''}" data-mob-quick-equip="${it.rawKey}" aria-label="${isEqHere ? t.removeBtn : t.equipBtn}">${isEqHere ? '−' : '+'}</button>` : ''}
                            <img src="${it.img}" class="zzz-engine-thumb" alt="">
                            <div class="zzz-case-rarity-lock">
                                <span class="r-${it.rank.toLowerCase()}">${it.rank}</span>
                                <span style="font-size:8.5px;color:#e4e4e7;font-family:monospace;font-weight:900;">×${cnt}</span>
                            </div>
                        </div>
                        <span class="zzz-case-lvl-pill">${isLangEn ? 'Lv. 60' : 'Niv. 60'}</span>
                    </div>`;
                } else {
                    const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === it.setKey);
                    const ownerKey = getDiscOwner(st, it.uid);
                    const isSel = it.uid === selectedItemId;
                    const isEqHere = ab.discs[it.slot || slotNum] === it.uid;
                    return `
                    <div class="zzz-case-item ${isSel ? 'selected' : ''}" data-grid-pick="${it.uid}">
                        <div class="zzz-case-box rank-S">
                            ${ownerKey ? `<div class="zzz-case-owner"><img src="assets/Agents/${ownerKey}.webp"></div>` : ''}
                            ${isSel ? `<button type="button" class="zzz-mob-quick-btn ${isEqHere ? 'is-equipped' : ''}" data-mob-quick-equip="${it.uid}" aria-label="${isEqHere ? t.removeBtn : t.equipBtn}">${isEqHere ? '−' : '+'}</button>` : ''}
                            <div class="zzz-disc-cd-sleeve">
                                <img src="${sObj ? sObj.img : ''}" alt="">
                            </div>
                            <div class="zzz-case-rarity-lock">
                                <span class="r-s">S</span>
                                ${it.locked ? `<span style="color:#facc15;display:inline-flex;">${UI_SVGS.lockMini}</span>` : ''}
                            </div>
                        </div>
                        <span class="zzz-case-lvl-pill">${isLangEn ? 'Lv.' : 'Niv.'} ${it.level}</span>
                    </div>`;
                }
            }).join('');

            const selectedObj = isEngineMode
                ? (gridItems.find(e => e.rawKey === selectedItemId) || null)
                : (bs.craftedDiscs.find(d => d.uid === selectedItemId) || null);

            const equippedObj = isEngineMode
                ? (ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null)
                : (ab.discs[slotNum] ? bs.craftedDiscs.find(d => d.uid === ab.discs[slotNum]) : null);

            let centerHTML = '';
            if (isCompareMode && selectedObj && equippedObj && ((isEngineMode && selectedObj.rawKey !== equippedObj.rawKey) || (!isEngineMode && selectedObj.uid !== equippedObj.uid))) {
                centerHTML = `
                    <div class="zzz-center-inspector-wrap compare-split">
                        ${buildInspectorPaneHTML(st, pool, agent, selectedObj, isEngineMode, t.currentSelection, isLangEn, t, bridge, prof)}
                        ${buildInspectorPaneHTML(st, pool, agent, equippedObj, isEngineMode, t.currentlyEquipped, isLangEn, t, bridge, prof)}
                    </div>
                `;
            } else {
                centerHTML = `
                    <div class="zzz-center-inspector-wrap">
                        ${buildInspectorPaneHTML(st, pool, agent, selectedObj, isEngineMode, isCompareMode ? t.currentSelection : '', isLangEn, t, bridge, prof)}
                    </div>
                `;
            }

            const eqEngineForWheel = ab.engineKey ? pool.allCatalog.find(i => i.type === 'engine' && i.rawKey === ab.engineKey) : null;
            const wheelDiscsHTML = [1, 2, 3, 4, 5, 6].map(s => {
                const u = ab.discs[s];
                const d = u ? bs.craftedDiscs.find(x => x.uid === u) : null;
                const sObj = d ? pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === d.setKey) : null;
                const isAct = !isEngineMode && slotNum === s;
                return `
                <div class="zzz-wheel-disc pos-${s} ${isAct ? 'active-ring' : ''}" data-wheel-pick="${s}">
                    ${d && sObj
                        ? `<img src="${sObj.img}" alt="Slot ${s}">
                           <div class="zzz-wheel-lvl-tag"><span class="mini-s">S</span><span>${isLangEn ? 'Lv.' : 'Niv.'} ${d.level} /15</span></div>`
                        : `<span class="zzz-wheel-empty-num">${s}</span>`
                    }
                </div>`;
            }).join('');

            // Démantèlement actif pour les Disques ET pour les Moteurs-Ampli (tant qu'il reste au moins 1 exemplaire non équipé)
            const engTotalOwned = (isEngineMode && selectedObj) ? (st.inventory[selectedObj.id]?.count || 0) : 0;
            const engUsedCount = (isEngineMode && selectedObj) ? getEngineOwnersList(st, selectedObj.rawKey).length : 0;
            const canTrashSelected = isEngineMode
                ? !!(selectedObj && engTotalOwned > engUsedCount)
                : !!(selectedObj && !selectedObj.locked && !getDiscOwner(st, selectedObj.uid));

            const singleTrashGain = isEngineMode
                ? (selectedObj ? (selectedObj.rank === 'S' ? 40 : (selectedObj.rank === 'A' ? 10 : 3)) : 0)
                : (selectedObj ? calcDiscDismantleGain(selectedObj) : 0);

            const batchTrashDiscs = !isEngineMode
                ? gridItems.filter(d => d.level === 0 && !d.locked && !getDiscOwner(st, d.uid))
                : [];
            const spareEngCount = isEngineMode ? Math.max(0, engTotalOwned - engUsedCount) : 0;
            const canBatchTrash = isEngineMode ? spareEngCount > 0 : batchTrashDiscs.length > 0;
            const batchTrashGain = isEngineMode
                ? spareEngCount * singleTrashGain
                : batchTrashDiscs.reduce((acc, d) => acc + calcDiscDismantleGain(d), 0);
            const batchTrashLabel = !isEngineMode
                ? (canBatchTrash
                    ? `${isLangEn ? 'Dismantle Lv.0' : 'Démanteler Niv. 0'} (×${batchTrashDiscs.length} • +${batchTrashGain} ✦)`
                    : (isLangEn ? 'Dismantle Lv.0' : 'Démanteler Niv. 0'))
                : (canBatchTrash
                    ? `${t.dismantleBtn} ×${spareEngCount} (+${batchTrashGain} ✦)`
                    : t.dismantleBtn);

            const isSelectedEquippedHere = isEngineMode
                ? (selectedObj && ab.engineKey === selectedObj.rawKey)
                : (selectedObj && ab.discs[slotNum] === selectedObj.uid);

            const hasEquippedInSlot = isEngineMode ? !!ab.engineKey : !!ab.discs[slotNum];
            const equipBtnLabel = isSelectedEquippedHere ? t.removeBtn : (hasEquippedInSlot ? t.replaceBtn : t.equipBtn);
            const canEnhanceSelected = !isEngineMode && selectedObj && selectedObj.level < 15 && st.residual >= 4;
            const stepsToMax = (!isEngineMode && selectedObj && selectedObj.level < 12)
                ? Math.ceil((15 - selectedObj.level) / 3)
                : 0;
            const maxEnhanceCost = stepsToMax * 4;
            const canEnhanceMax = stepsToMax >= 2 && st.residual >= maxEnhanceCost;
            const hasAnyEquipped = !!ab.engineKey || [1, 2, 3, 4, 5, 6].some(s => !!ab.discs[s]);
            const distinctSets = [...new Set(bs.craftedDiscs.map(d => d.setKey))];

            // Construction du tiroir "Recommandations" 100% raccordé au Guide de l'Agent
            let recommendationDrawerHTML = '';
            if (window.__zzzRecOpen) {
                if (isEngineMode) {
                    // --- TIROIR MOTEURS-AMPLIS RECOMMANDÉS PAR LE GUIDE ---
                    const recEngList = [];
                    (prof.engines || []).forEach(re => {
                        const found = pool.allCatalog.find(i =>
                            i.type === 'engine' && (
                                i.rawKey.toLowerCase() === re.rawImg.toLowerCase() ||
                                (re.name && i.rawKey.toLowerCase() === re.name.toLowerCase()) ||
                                i.img.toLowerCase().includes(re.rawImg.toLowerCase())
                            )
                        );
                        if (found && !recEngList.some(x => x.rawKey === found.rawKey)) recEngList.push(found);
                    });

                    if (!window.__zzzRecEngKey || !recEngList.some(e => e.rawKey === window.__zzzRecEngKey)) {
                        window.__zzzRecEngKey = recEngList[0]?.rawKey || selectedObj?.rawKey || null;
                    }
                    const previewEng = recEngList.find(e => e.rawKey === window.__zzzRecEngKey) || recEngList[0] || selectedObj;
                    const previewOwned = previewEng ? (st.inventory[previewEng.id]?.count || 0) : 0;
                    const rawJson = previewEng ? (EXT_DATA.engines[previewEng.rawKey] || {}) : {};
                    const recOcTier = previewOwned > 0 ? Math.min(5, previewOwned) : 1;
                    const recInfo = parseEngineInfo(rawJson, previewEng, isLangEn, recOcTier - 1);
                    const baseLabelTxt = recInfo.baseLabel;
                    const baseAtkVal = recInfo.baseVal;
                    const advName = recInfo.advLabel;
                    const advVal = recInfo.advValStr;
                    const effectTitle = recInfo.effectTitle || (previewEng ? bridge.itemName(previewEng) : '');
                    const effectTxt = recInfo.effectHTML;

                    const exclusiveEng = recEngList[0] || null;
                    const popularEngs = recEngList.slice(1);

                    const renderSphere = (eObj) => {
                        if (!eObj) return '';
                        const cnt = st.inventory[eObj.id]?.count || 0;
                        const owners = getEngineOwnersList(st, eObj.rawKey);
                        const isEqHere = ab.engineKey === eObj.rawKey;
                        const isAct = window.__zzzRecEngKey === eObj.rawKey;
                        return `
                            <div class="zzz-rec-eng-sphere ${isAct ? 'active' : ''} ${cnt <= 0 ? 'unowned' : ''}" data-rec-eng="${eObj.rawKey}">
                                ${owners[0] ? `<div class="zzz-case-owner" style="top:-3px;left:-3px;right:auto;"><img src="assets/Agents/${owners[0]}.webp"></div>` : ''}
                                ${isEqHere ? `<div class="zzz-rec-eng-check">✓</div>` : ''}
                                <img src="${eObj.img}" class="eng-art" alt="">
                                ${cnt <= 0 ? `<div class="zzz-rec-eng-lock-overlay">${UI_SVGS.lock}</div>` : ''}
                                <span class="zzz-rank-circle r-${eObj.rank} zzz-rec-eng-rank-badge">${eObj.rank}</span>
                            </div>
                        `;
                    };

                    recommendationDrawerHTML = `
                        <div class="zzz-rec-drawer">
                            <div class="zzz-rec-header">
                                <div class="zzz-rec-header-left">
                                    <img src="${agent.img}" class="zzz-rec-agent-ava" alt="">
                                    <h3 class="zzz-rec-title">${isLangEn ? 'Recommended W-Engines' : 'Moteurs-amplis recommandés'}</h3>
                                </div>
                                <button type="button" class="zzz-rec-close-btn" id="zzz-close-rec">✕</button>
                            </div>

                            <div class="zzz-rec-engine-split" style="padding:10px 0;">
                                <div class="zzz-rec-eng-left">
                                    ${previewEng ? `
                                        <h4 class="zzz-insp-title" style="font-size:19px;">${bridge.itemName(previewEng)}</h4>
                                        <div class="zzz-insp-lvl-row">
                                            <div class="zzz-insp-lvl-pill">
                                                <span class="zzz-rank-circle r-${previewEng.rank}">${previewEng.rank}</span>
                                                <span>${isLangEn ? 'Lv.' : 'Niv.'} 60/60</span>
                                            </div>
                                            <img src="${agent.img}" style="width:26px;height:26px;border-radius:999px;border:2px solid #fff;">
                                        </div>
                                        <span class="zzz-insp-sec-lbl">${t.baseStatLabel}</span>
                                        <div class="zzz-stat-bar"><span>${baseLabelTxt}</span><span>${baseAtkVal}</span></div>
                                        <span class="zzz-insp-sec-lbl">${t.advStatLabel}</span>
                                        <div class="zzz-stat-bar hl-gold"><span>${advName}</span><span>${advVal}</span></div>
                                        <span class="zzz-insp-sec-lbl">${t.engineEffectLabel}</span>
                                        <div class="zzz-set-desc-block">
                                            <div style="margin-bottom:6px;color:#d4d4d8;">
                                                ${t.engineSpecIntro} <strong style="color:#f59e0b;">${tRole(previewEng.role || agent.role)}</strong> :
                                            </div>
                                            <div class="zzz-stat-bar" style="margin-bottom:7px;"><span>${effectTitle}</span></div>
                                            <div>${effectTxt}</div>
                                        </div>
                                    ` : ''}
                                </div>

                                <div class="zzz-rec-eng-right">
                                    ${exclusiveEng ? `
                                        <span class="zzz-rec-eng-group-lbl">${isLangEn ? 'Best in Slot' : 'Exclusif à l\'agent'}</span>
                                        ${renderSphere(exclusiveEng)}
                                    ` : ''}
                                    ${popularEngs.length > 0 ? `
                                        <span class="zzz-rec-eng-group-lbl" style="margin-top:4px;">${isLangEn ? 'Alternatives' : 'Populaire'}</span>
                                        ${popularEngs.map(renderSphere).join('')}
                                    ` : ''}
                                </div>
                            </div>

                            <div class="zzz-rec-footer">
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                    <button type="button" class="zzz-action-pill" id="zzz-rec-eng-details" style="min-width:0;">
                                        ${isLangEn ? 'Details' : 'Détails'}
                                    </button>
                                    <button type="button" class="zzz-action-pill primary-highlight" id="zzz-rec-eng-equip" style="min-width:0;" ${previewOwned <= 0 ? 'disabled' : ''}>
                                        ${ab.engineKey === previewEng?.rawKey ? t.removeBtn : t.equipBtn}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    // --- TIROIR RECOMMANDATIONS DE DISQUES (100% RACCORDÉ AU GUIDE DE L'AGENT) ---
                    const allDiscCat = pool.allCatalog.filter(i => i.type === 'disc');
                    const combos = prof.sets || [];

                    // Stats principales recommandées par le guide pour la partition active (slotNum)
                    let mainRecKeys = [];
                    if (slotNum === 1) mainRecKeys = ['PV (flat)'];
                    else if (slotNum === 2) mainRecKeys = ['ATQ (flat)'];
                    else if (slotNum === 3) mainRecKeys = ['DÉF (flat)'];
                    else {
                        mainRecKeys = [...(prof.mainBySlot[slotNum] || [])];
                    }

                    const subRecKeys = prof.subPrio || [];

                    recommendationDrawerHTML = `
                        <div class="zzz-rec-drawer">
                            <div class="zzz-rec-header">
                                <div class="zzz-rec-header-left">
                                    <img src="${agent.img}" class="zzz-rec-agent-ava" alt="">
                                    <h3 class="zzz-rec-title">${isLangEn ? 'Recommendations' : 'Recommandations'}</h3>
                                </div>
                                <button type="button" class="zzz-rec-close-btn" id="zzz-close-rec">✕</button>
                            </div>

                            <div class="zzz-rec-body">
                                <div class="zzz-rec-sec-head">
                                    <span>${isLangEn ? 'Recommended Sets' : 'Ensembles recommandés'}</span>
                                </div>

                                ${combos.map((cb) => {
                                    const s4Obj = allDiscCat.find(i => i.rawKey === cb.set1);
                                    const s2Obj = allDiscCat.find(i => i.rawKey === cb.set2);
                                    const isFiltered = filterSetKey === cb.set1;
                                    const s4Name = s4Obj ? bridge.itemName(s4Obj) : cb.set1;
                                    const s2Name = s2Obj ? bridge.itemName(s2Obj) : cb.set2;
                                    return `
                                    <div class="zzz-rec-set-row" data-rec-filter-set="${cb.set1}" style="${isFiltered ? 'border-color:#84cc16;' : ''}" title="${s4Name} (4P) + ${s2Name} (2P)">
                                        <div class="zzz-rec-set-icons">
                                            <div class="zzz-rec-disc-circle">
                                                ${s4Obj ? `<img src="${s4Obj.img}" alt="">` : ''}
                                                <span class="zzz-rec-disc-num">4</span>
                                            </div>
                                            <div class="zzz-rec-disc-circle">
                                                ${s2Obj ? `<img src="${s2Obj.img}" alt="">` : ''}
                                                <span class="zzz-rec-disc-num">2</span>
                                            </div>
                                            <div class="zzz-rec-disc-circle" style="opacity:0.35;">
                                                <span style="font-size:18px;font-weight:900;color:#52525b;">✕</span>
                                            </div>
                                        </div>
                                        <div style="display:flex;flex-direction:column;align-items:flex-end;min-width:0;flex:1;padding-right:6px;">
                                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${isLangEn ? '4pc' : '4P'} ${s4Name}</span>
                                            <span style="font-family:'Montserrat',sans-serif;font-weight:800;font-size:10px;color:#a1a1aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;">${isLangEn ? '2pc' : '2P'} ${s2Name}</span>
                                        </div>
                                    </div>`;
                                }).join('')}

                                <div class="zzz-rec-sec-head" style="margin-top:4px;">
                                    <span>${isLangEn ? `Recommended Main Stats for Partition ${slotNum}` : `Stats principales recommandées pour la partition ${slotNum}`}</span>
                                </div>

                                ${mainRecKeys.map((statKey) => `
                                    <div class="zzz-rec-main-row" data-rec-open-bardic="${statKey}">
                                        <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                                            <span style="width:26px;height:26px;border-radius:999px;background:#14151c;border:1px solid #343644;display:inline-flex;align-items:center;justify-content:center;color:#f97316;font-weight:900;font-size:12px;">✦</span>
                                            <strong style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                ${tStat(statKey)}
                                            </strong>
                                        </div>
                                    </div>
                                `).join('')}

                                <div class="zzz-rec-sec-head" style="margin-top:4px;">
                                    <span>${isLangEn ? 'Recommended Sub-Stats' : 'Stats secondaires recommandées'}</span>
                                </div>

                                <div class="zzz-rec-sub-grid">
                                    ${subRecKeys.map(sk => `
                                        <div class="zzz-rec-sub-pill" style="justify-content:center;">
                                            <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tStat(sk)}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }
            }

            const prevGridTop = mount.querySelector('.zzz-left-grid-wrap')?.scrollTop || 0;
            const prevInspTop = mount.querySelector('.zzz-center-inspector-wrap')?.scrollTop || 0;
            const prevPortalGridTop = document.querySelector('#zzz-builds-portal .zzz-mob-slot-grid-wrap')?.scrollTop || 0;

            const allMobLv0Discs = bs.craftedDiscs.filter(d => d.level === 0 && !d.locked && !getDiscOwner(st, d.uid));
            const allMobLv0Gain = allMobLv0Discs.reduce((acc, d) => acc + calcDiscDismantleGain(d), 0);
            const mobActiveSetsHTML = Object.entries(calc.setCounts || {})
                .filter(([, count]) => count >= 2)
                .sort((a, b) => b[1] - a[1])
                .map(([setKey, count]) => {
                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === setKey);
                    const sName = dObj ? bridge.itemName(dObj) : setKey;
                    const pTag = count >= 4 ? (isLangEn ? '4pc' : '4P') : (isLangEn ? '2pc' : '2P');
                    return `<span class="zb-hud-chip is-set">${dObj ? `<img src="${dObj.img}" alt="">` : ''}<span class="zb-hud-set-tag">${pTag}</span><span class="zb-hud-set-name">${sName}</span></span>`;
                }).join('');

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-roster-strip">
                        ${switcherHTML}
                        <button type="button" class="zzz-pill-btn zb-subview-btn" id="btn-toggle-subview">
                            <span class="zzz-pill-icon yellow">${UI_SVGS.recommend}</span>
                            <span class="zb-lbl-desk">${t.subStats}</span>
                            <span class="zb-lbl-mob">${t.mobStatsShort || t.subStats}</span>
                        </button>
                    </div>

                    <div class="zzz-eq-screen">
                        <img class="zzz-eq-bg-art" src="assets/splash/${agent.rawKey}.webp" onerror="this.onerror=null;this.src='${agent.img}';" alt="">
                        <div class="zzz-eq-bg-stripes"></div>

                        <div class="zzz-eq-topbar">
                            <div class="zzz-eq-top-left">
                                <button type="button" class="zzz-pill-btn ${(showFilterBar || (isEngineMode ? filterEngineSpecialtyOnly : (filterSetKey !== 'all' || showAllPartitions))) ? 'active' : ''}" id="zzz-btn-filter">
                                    <span class="zzz-pill-icon dark">${UI_SVGS.funnel}</span>
                                    <span>${t.filterBtn}${(isEngineMode ? filterEngineSpecialtyOnly : (filterSetKey !== 'all' || showAllPartitions)) ? ' •' : ''}</span>
                                </button>
                            </div>

                            <div class="zzz-eq-top-right">
                                <div class="zzz-key-action">
                                    <span class="zzz-key-tag">R</span>
                                    <button type="button" class="zzz-round-icon-btn" id="zzz-btn-trash-one" ${!canTrashSelected ? 'disabled' : ''} title="${t.dismantleBtn}">
                                        ${UI_SVGS.trash}
                                    </button>
                                </div>
                                ${!isEngineMode ? `
                                <div class="zzz-key-action">
                                    <span class="zzz-key-tag">T</span>
                                    <button type="button" class="zzz-round-icon-btn ${selectedObj?.locked ? 'locked-active' : ''}" id="zzz-btn-lock-one" ${!selectedObj ? 'disabled' : ''} title="Lock">
                                        ${UI_SVGS.lock}
                                    </button>
                                </div>` : ''}

                                <button type="button" class="zzz-pill-btn ${batchTrashConfirmArmed ? 'confirm-danger' : ''}" id="zzz-btn-batch-dismantle" ${!canBatchTrash ? 'disabled' : ''}>
                                    <span class="zzz-pill-icon cyan">${UI_SVGS.dismantle}</span>
                                    <span>${batchTrashConfirmArmed ? `${t.confirmUnequipBtn} (${isEngineMode ? `×${spareEngCount}` : `×${batchTrashDiscs.length}`} • +${batchTrashGain} ✦)` : batchTrashLabel}</span>
                                </button>

                                <button type="button" class="zzz-pill-btn bardic-music-btn" id="zzz-btn-open-bardic">
                                    <span class="zzz-pill-icon bardic-teal">${UI_SVGS.discTune}</span>
                                    <span>${t.customDiscBtn}${freeDiscsTotal > 0 ? ` (${freeDiscsTotal})` : ''}</span>
                                </button>
                            </div>
                        </div>

                        ${showFilterBar && !isEngineMode ? `
                        <div class="zzz-filter-drawer">
                            <select id="zzz-select-set-filter" class="gacha-col-search" style="min-width:160px;">
                                <option value="all">${t.filterAllSets}</option>
                                ${distinctSets.map(sk => {
                                    const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                    return `<option value="${sk}" ${filterSetKey === sk ? 'selected' : ''}>${sObj ? bridge.itemName(sObj) : sk}</option>`;
                                }).join('')}
                            </select>
                            <button type="button" class="gacha-col-filter-btn ${!showAllPartitions ? 'active' : ''}" id="zzz-btn-slot-only">
                                ${t.slotOnly.replace('{s}', slotNum)}
                            </button>
                            <button type="button" class="gacha-col-filter-btn ${showAllPartitions ? 'active' : ''}" id="zzz-btn-all-slots">
                                ${t.allPartitions}
                            </button>
                        </div>` : (showFilterBar && isEngineMode ? `
                        <div class="zzz-filter-drawer">
                            <button type="button" class="gacha-col-filter-btn ${!filterEngineSpecialtyOnly ? 'active' : ''}" id="zzz-btn-eng-all">
                                ${isLangEn ? 'All W-Engines' : 'Tous les Moteurs'}
                            </button>
                            <button type="button" class="gacha-col-filter-btn ${filterEngineSpecialtyOnly ? 'active' : ''}" id="zzz-btn-eng-spec">
                                ${isLangEn ? `Specialty: ${tRole(agent.role)}` : `Spécialité : ${tRole(agent.role)}`}
                            </button>
                        </div>` : '')}

                        <div class="zzz-mobile-slots">
                            <button type="button" class="gacha-col-filter-btn ${isEngineMode ? 'active' : ''}" data-wheel-pick="engine">W-Engine</button>
                            ${[1, 2, 3, 4, 5, 6].map(s => `
                                <button type="button" class="gacha-col-filter-btn ${!isEngineMode && slotNum === s ? 'active' : ''}" data-wheel-pick="${s}">[${s}]</button>
                            `).join('')}
                        </div>

                        <div class="zzz-eq-body ${isCompareMode ? 'compare-active' : ''}">
                            <div class="zzz-left-grid-wrap">
                                ${gridItems.length > 0
                                    ? `<div class="zzz-left-grid">${leftGridHTML}</div>`
                                    : `<div style="height:100%;display:flex;align-items:center;justify-content:center;text-align:center;color:#71717a;font-size:12px;padding:16px;">${isEngineMode ? t.emptyEngineList : t.emptyDiscList}</div>`
                                }
                            </div>

                            ${centerHTML}

                            <div class="zzz-wheel-stage">
                                <div class="zzz-driver-chassis">
                                    <span class="zzz-driver-top-plaque">DRIVER</span>
                                    <div class="zzz-driver-inner-ring"></div>
                                    ${wheelDiscsHTML}
                                    <div class="zzz-wheel-wengine ${isEngineMode ? 'active-ring' : ''}" id="zzz-wheel-center-engine">
                                        ${eqEngineForWheel
                                            ? `<img src="${eqEngineForWheel.img}" alt="">
                                               <div class="zzz-wheel-lvl-tag"><span class="mini-s">${eqEngineForWheel.rank}</span><span>${isLangEn ? 'Lv.' : 'Niv.'} 60 /60</span></div>`
                                            : `<span class="zzz-wheel-empty-num">+</span>`
                                        }
                                    </div>
                                    <div class="zzz-driver-bottom-vent"></div>
                                </div>
                            </div>
                        </div>

                        <div class="zzz-mob-wheel-hub">
                            <div class="zzz-mob-wheel-hint">${t.mobWheelHint}</div>
                            ${mobActiveSetsHTML ? `<div class="zzz-mob-active-sets">${mobActiveSetsHTML}</div>` : ''}
                            <div class="zzz-mob-action-dock">
                                <button type="button" class="zzz-mob-dock-btn is-primary" id="zzz-mob-equip-all">
                                    <span>${t.equipAllBtn}</span>
                                </button>
                                <button type="button" class="zzz-mob-dock-btn is-bardic" id="zzz-mob-open-bardic">
                                    <span>${t.mobStoreShort || t.customDiscBtn}${freeDiscsTotal > 0 ? ` (${freeDiscsTotal})` : ''}</span>
                                </button>
                                <button type="button" class="zzz-mob-dock-btn is-rec" id="zzz-mob-open-rec">
                                    <span>${t.recommendedBtn}</span>
                                </button>
                                <button type="button" class="zzz-mob-dock-more ${mobileMoreMenuOpen ? 'active' : ''}" id="zzz-mob-more-btn" aria-label="Options">
                                    ${UI_SVGS.moreDots}
                                </button>
                            </div>
                            ${mobileMoreMenuOpen ? `
                            <div class="zzz-mob-more-bar">
                                <button type="button" class="zzz-action-pill ${unequipConfirmArmed ? 'confirm-danger' : ''}" id="zzz-mob-unequip-all" ${!hasAnyEquipped ? 'disabled' : ''}>
                                    ${unequipConfirmArmed ? t.confirmUnequipBtn : t.unequipAllBtn}
                                </button>
                                <button type="button" class="zzz-action-pill ${batchTrashConfirmArmed ? 'confirm-danger' : ''}" id="zzz-mob-batch-lv0" ${allMobLv0Discs.length === 0 ? 'disabled' : ''}>
                                    ${batchTrashConfirmArmed
                                        ? `${t.confirmUnequipBtn} (×${allMobLv0Discs.length} • +${allMobLv0Gain} ✦)`
                                        : `${isLangEn ? 'Dismantle Lv.0' : 'Démanteler Niv. 0'}${allMobLv0Discs.length > 0 ? ` (×${allMobLv0Discs.length})` : ''}`}
                                </button>
                            </div>` : ''}
                        </div>

                        <div class="zzz-eq-bottombar">
                            <div class="zzz-eq-bot-left">
                                <button type="button" class="zzz-pill-btn ${isCompareMode ? 'active' : ''}" id="zzz-btn-compare">
                                    <span class="zzz-pill-icon yellow">${UI_SVGS.compare}</span>
                                    <span>${isCompareMode ? t.collapseBtn : t.compareBtn}</span>
                                </button>
                                <button type="button" class="zzz-pill-btn ${window.__zzzRecOpen ? 'active' : ''}" id="zzz-btn-recommended">
                                    <span class="zzz-pill-icon green">${UI_SVGS.recommend}</span>
                                    <span>${t.recommendedBtn}</span>
                                </button>
                            </div>

                            <div class="zzz-eq-bot-right">
                                <button type="button" class="zzz-action-pill ${unequipConfirmArmed ? 'confirm-danger' : ''}" id="zzz-btn-unequip-all" ${!hasAnyEquipped ? 'disabled' : ''}>
                                    ${unequipConfirmArmed ? t.confirmUnequipBtn : t.unequipAllBtn}
                                </button>
                                <button type="button" class="zzz-action-pill" id="zzz-btn-equip-all">
                                    ${t.equipAllBtn}
                                </button>
                                <button type="button" class="zzz-action-pill ${!isSelectedEquippedHere && selectedObj ? 'primary-highlight' : ''}" id="zzz-btn-equip-or-remove" ${!selectedObj ? 'disabled' : ''}>
                                    ${equipBtnLabel}
                                </button>
                                <button type="button" class="zzz-action-pill ${canEnhanceSelected ? 'primary-highlight' : ''}" id="zzz-btn-enhance" ${!canEnhanceSelected ? 'disabled' : ''}>
                                    ${!isEngineMode && selectedObj && selectedObj.level < 15 ? `${t.enhanceBtn} (+${selectedObj.level + 3} • 4 ✦)` : t.enhanceBtn}
                                </button>
                                ${stepsToMax >= 2 ? `
                                <button type="button" class="zzz-action-pill max-enhance" id="zzz-btn-enhance-max" ${!canEnhanceMax ? 'disabled' : ''}>
                                    +15 MAX (${maxEnhanceCost} ✦)
                                </button>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const newGridEl = mount.querySelector('.zzz-left-grid-wrap');
            if (newGridEl) newGridEl.scrollTop = prevGridTop;
            const newInspEl = mount.querySelector('.zzz-center-inspector-wrap');
            if (newInspEl) newInspEl.scrollTop = prevInspTop;

            // Montage dans le portail global (au-dessus de la topbar et de la barre basse mobile)
            const portal = getBuildsPortal();
            if (portal) {
                if (window.__zzzRecOpen && recommendationDrawerHTML) {
                    portal.innerHTML = `<div class="zzz-portal-backdrop" id="zzz-portal-backdrop">${recommendationDrawerHTML}</div>`;
                    portal.classList.add('active');
                } else if (mobileSlotDrawerOpen && isMobileViewport()) {
                    const slotTitle = isEngineMode
                        ? (t.mobEngineTitle || 'Moteur-Ampli')
                        : (t.mobSlotTitle || 'Partition [{s}]').replace('{s}', slotNum);
                    const hasActiveFilter = isEngineMode ? filterEngineSpecialtyOnly : (filterSetKey !== 'all' || showAllPartitions);

                    let mobInspHTML = '';
                    if (!selectedObj) {
                        mobInspHTML = `<div class="zzz-mob-insp-empty">${isEngineMode ? t.emptyEngineList : t.emptyDiscList}</div>`;
                    } else if (isEngineMode) {
                        const rawJson = EXT_DATA.engines[selectedObj.rawKey] || {};
                        const cnt = st.inventory[selectedObj.id]?.count || 1;
                        const ocTier = Math.min(5, Math.max(1, cnt));
                        const engInfo = parseEngineInfo(rawJson, selectedObj, isLangEn, ocTier - 1);
                        mobInspHTML = `
                            <div class="zzz-mob-insp-head">
                                <div style="min-width:0;flex:1;">
                                    <div class="zzz-mob-insp-title">${bridge.itemName(selectedObj)}</div>
                                    <div class="zzz-mob-insp-meta">
                                        <span class="zzz-rank-circle r-${selectedObj.rank}" style="width:18px;height:18px;font-size:10px;">${selectedObj.rank}</span>
                                        <span>${isLangEn ? 'Lv.' : 'Niv.'} 60 • ★${ocTier} • ×${cnt}</span>
                                    </div>
                                </div>
                                <div class="zzz-mob-insp-tools">
                                    <button type="button" class="zzz-round-icon-btn" id="zzz-mob-trash-one" ${!canTrashSelected ? 'disabled' : ''} title="${t.dismantleBtn}">${UI_SVGS.trash}</button>
                                    <button type="button" class="zzz-round-icon-btn ${mobileEffectExpanded ? 'locked-active' : ''}" id="zzz-mob-toggle-effect" title="${t.mobEffectToggle}">${UI_SVGS.infoCircle}</button>
                                </div>
                            </div>
                            <div class="zzz-mob-sub-grid">
                                <div class="zzz-mob-stat-chip"><span>${engInfo.baseLabel}</span><strong>${engInfo.baseVal}</strong></div>
                                <div class="zzz-mob-stat-chip hl-gold"><span>${engInfo.advLabel}</span><strong>${engInfo.advValStr}</strong></div>
                            </div>
                            ${mobileEffectExpanded ? `<div class="zzz-mob-effect-box"><div><strong>${engInfo.effectTitle || bridge.itemName(selectedObj)}</strong> (${tRole(rawJson.specialty || selectedObj.role || agent.role)})</div><div style="margin-top:3px;">${engInfo.effectHTML}</div></div>` : ''}
                        `;
                    } else {
                        const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === selectedObj.setKey);
                        const setName = sObj ? bridge.itemName(sObj) : selectedObj.setKey;
                        const rawDiscJson = EXT_DATA.discs[selectedObj.setKey] || {};
                        const desc2P = formatCleanDesc((isLangEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || '');
                        const desc4P = formatCleanDesc((isLangEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || '');
                        mobInspHTML = `
                            <div class="zzz-mob-insp-head">
                                <div style="min-width:0;flex:1;">
                                    <div class="zzz-mob-insp-title">${setName} [${selectedObj.slot}]</div>
                                    <div class="zzz-mob-insp-meta">
                                        <span class="zzz-rank-circle" style="width:18px;height:18px;font-size:10px;">S</span>
                                        <span>${isLangEn ? 'Lv.' : 'Niv.'} ${selectedObj.level}/15</span>
                                    </div>
                                </div>
                                <div class="zzz-mob-insp-tools">
                                    <button type="button" class="zzz-round-icon-btn ${selectedObj.locked ? 'locked-active' : ''}" id="zzz-mob-lock-one" title="Lock">${UI_SVGS.lock}</button>
                                    <button type="button" class="zzz-round-icon-btn" id="zzz-mob-trash-one" ${!canTrashSelected ? 'disabled' : ''} title="${t.dismantleBtn}">${UI_SVGS.trash}</button>
                                    <button type="button" class="zzz-round-icon-btn ${mobileEffectExpanded ? 'locked-active' : ''}" id="zzz-mob-toggle-effect" title="${t.mobEffectToggle}">${UI_SVGS.infoCircle}</button>
                                </div>
                            </div>
                            <div class="zzz-mob-main-stat">
                                <span>${tStat(selectedObj.mainStat)}</span>
                                <strong>${formatMainStatValue(selectedObj.mainStat, selectedObj.level)}</strong>
                            </div>
                            <div class="zzz-mob-sub-grid">
                                ${(selectedObj.substats || []).map(sub => {
                                    const isGuideSub = prof.subPrio.includes(sub.key);
                                    return `<div class="zzz-mob-stat-chip ${isGuideSub ? 'hl-gold' : ''}">
                                        <span>${tStat(sub.key)}${sub.upgrades > 0 ? `<em class="up">+${sub.upgrades}</em>` : ''}</span>
                                        <strong>${formatSubstatValue(sub)}</strong>
                                    </div>`;
                                }).join('')}
                            </div>
                            ${mobileEffectExpanded ? `<div class="zzz-mob-effect-box"><div><strong>${isLangEn ? '2pc:' : '2P :'}</strong> ${desc2P}</div><div style="margin-top:3px;"><strong>${isLangEn ? '4pc:' : '4P :'}</strong> ${desc4P}</div></div>` : ''}
                        `;
                    }

                    portal.innerHTML = `
                        <div class="zzz-portal-backdrop zzz-mob-slot-backdrop" id="zzz-portal-backdrop">
                            <div class="zzz-mob-slot-sheet">
                                <div class="zzz-rec-header">
                                    <div class="zzz-rec-header-left">
                                        <img src="${agent.img}" class="zzz-rec-agent-ava" alt="">
                                        <h3 class="zzz-rec-title">${slotTitle}</h3>
                                    </div>
                                    <div style="display:flex;align-items:center;gap:8px;">
                                        <button type="button" class="zzz-pill-btn ${(showFilterBar || hasActiveFilter) ? 'active' : ''}" id="zzz-mob-slot-filter" style="height:30px;padding:2px 10px 2px 4px;font-size:10.5px;">
                                            <span class="zzz-pill-icon dark" style="width:20px;height:20px;">${UI_SVGS.funnel}</span>
                                            <span>${t.filterBtn}${hasActiveFilter ? ' •' : ''}</span>
                                        </button>
                                        <button type="button" class="zzz-rec-close-btn" id="zzz-mob-slot-close">✕</button>
                                    </div>
                                </div>

                                <div class="zzz-mob-slot-tabs">
                                    <button type="button" class="zzz-mob-stab ${isEngineMode ? 'active' : ''} ${ab.engineKey ? 'has-item' : ''}" data-mob-slot="engine">
                                        ${isLangEn ? 'W-Eng' : 'Moteur'}
                                    </button>
                                    ${[1, 2, 3, 4, 5, 6].map(s => `
                                        <button type="button" class="zzz-mob-stab ${!isEngineMode && slotNum === s ? 'active' : ''} ${ab.discs[s] ? 'has-item' : ''}" data-mob-slot="${s}">
                                            [${s}]
                                        </button>
                                    `).join('')}
                                </div>

                                ${showFilterBar && !isEngineMode ? `
                                <div class="zzz-filter-drawer" style="margin-top:0;flex-shrink:0;">
                                    <select id="zzz-mob-select-set" class="gacha-col-search" style="flex:1;min-width:130px;">
                                        <option value="all">${t.filterAllSets}</option>
                                        ${distinctSets.map(sk => {
                                            const sObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === sk);
                                            return `<option value="${sk}" ${filterSetKey === sk ? 'selected' : ''}>${sObj ? bridge.itemName(sObj) : sk}</option>`;
                                        }).join('')}
                                    </select>
                                    <button type="button" class="gacha-col-filter-btn ${!showAllPartitions ? 'active' : ''}" id="zzz-mob-slot-only">[${slotNum}]</button>
                                    <button type="button" class="gacha-col-filter-btn ${showAllPartitions ? 'active' : ''}" id="zzz-mob-all-slots">I–VI</button>
                                </div>` : (showFilterBar && isEngineMode ? `
                                <div class="zzz-filter-drawer" style="margin-top:0;flex-shrink:0;">
                                    <button type="button" class="gacha-col-filter-btn ${!filterEngineSpecialtyOnly ? 'active' : ''}" id="zzz-mob-eng-all">${isLangEn ? 'All' : 'Tous'}</button>
                                    <button type="button" class="gacha-col-filter-btn ${filterEngineSpecialtyOnly ? 'active' : ''}" id="zzz-mob-eng-spec">${tRole(agent.role)}</button>
                                </div>` : '')}

                                <div class="zzz-mob-slot-grid-wrap">
                                    ${gridItems.length > 0
                                        ? `<div class="zzz-left-grid">${leftGridHTML}</div>`
                                        : `<div style="padding:28px 12px;text-align:center;color:#71717a;font-size:12px;">
                                            <p style="margin:0 0 10px;">${isEngineMode ? t.emptyEngineList : t.emptyDiscList}</p>
                                            ${!isEngineMode ? `<button type="button" class="zzz-pill-btn bardic-music-btn" id="zzz-mob-empty-bardic" style="margin:0 auto;"><span class="zzz-pill-icon bardic-teal">${UI_SVGS.discTune}</span><span>${t.customDiscBtn}${freeDiscsTotal > 0 ? ` (${freeDiscsTotal})` : ''}</span></button>` : ''}
                                          </div>`
                                    }
                                </div>

                                <div class="zzz-mob-slot-footer">
                                    ${mobInspHTML}
                                    <div class="zzz-mob-slot-actions ${stepsToMax >= 2 ? 'cols-3' : (!isEngineMode ? 'cols-2' : 'cols-1')}">
                                        <button type="button" class="zzz-action-pill ${!isSelectedEquippedHere && selectedObj ? 'primary-highlight' : ''}" id="zzz-mob-equip-btn" ${!selectedObj ? 'disabled' : ''}>
                                            ${equipBtnLabel}
                                        </button>
                                        ${!isEngineMode ? `
                                        <button type="button" class="zzz-action-pill ${canEnhanceSelected ? 'primary-highlight' : ''}" id="zzz-mob-enh-btn" ${!canEnhanceSelected ? 'disabled' : ''}>
                                            ${selectedObj && selectedObj.level < 15 ? `+3 (4✦)` : 'MAX'}
                                        </button>` : ''}
                                        ${stepsToMax >= 2 ? `
                                        <button type="button" class="zzz-action-pill max-enhance" id="zzz-mob-enh-max" ${!canEnhanceMax ? 'disabled' : ''}>
                                            +15 (${maxEnhanceCost}✦)
                                        </button>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    portal.classList.add('active');
                    const newMobGrid = portal.querySelector('.zzz-mob-slot-grid-wrap');
                    if (newMobGrid) newMobGrid.scrollTop = prevPortalGridTop;
                } else {
                    clearBuildsPortal();
                }
            }

            bindRosterAndSubViewEvents(mount, ownedAgents);
            bindZZZEquipmentEvents(mount, st, pool, bs, agent, ab, selectedObj, isEngineMode, slotNum, batchTrashDiscs, allMobLv0Discs);
        }

        function switchBuildAgent(mount, newAgentKey) {
            if (!newAgentKey || newAgentKey === selectedAgentKey) return;
            resetConfirmStates();
            mobileMoreMenuOpen = false;
            mobileEffectExpanded = false;
            selectedAgentKey = newAgentKey;
            selectedItemId = null;
            window.__zzzRecEngKey = null;
            renderBuildsTab(mount);
        }

        function openAgentPickerModal(mount) {
            const bridge = window.ZZZGachaBridge;
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!bridge || !overlay) return;

            const st = bridge.getState();
            const pool = bridge.getPool();
            const ownedAgents = getOwnedAgents(st, pool);
            const t = B();

            let rankFilter = 'all';
            let query = '';

            overlay.classList.add('active');

            function renderPickerGridOnly() {
                const grid = document.getElementById('zb-picker-grid');
                if (!grid) return;
                let list = ownedAgents;
                if (rankFilter !== 'all') list = list.filter(a => a.rank === rankFilter);
                if (query.trim()) {
                    const q = normText(query.trim());
                    list = list.filter(a =>
                        normText(bridge.itemName(a)).includes(q)
                        || normText(a.rawKey).includes(q)
                        || normText(tElem(a.element)).includes(q)
                        || normText(tRole(a.role)).includes(q)
                    );
                }

                grid.innerHTML = list.map(a => {
                    const isAct = a.rawKey === selectedAgentKey;
                    const cnt = st.inventory[a.id]?.count || 1;
                    const mLvl = Math.min(6, cnt - 1);
                    const mLabel = cnt > 7 ? `M6 +${cnt - 7}` : (mLvl >= 6 ? 'M6 MAX' : `M${mLvl}`);
                    const ab = st.buildSystem?.agentBuilds?.[a.rawKey];
                    const eqDiscs = ab?.discs ? Object.values(ab.discs).filter(Boolean).length : 0;
                    const isFull = eqDiscs === 6 && !!ab?.engineKey;

                    return `
                    <div class="gacha-col-card rank-${a.rank}" data-zb-pick-modal="${a.rawKey}"
                         style="${isAct ? 'border-color:#d7f70c;box-shadow:0 0 20px rgba(215,247,12,0.5);' : ''}">
                        <div class="gacha-col-visual">
                            ${isAct ? `<span class="gacha-col-rank-tag" style="background:#d7f70c;color:#000;border-color:#000;">${t.pickerActive}</span>` : ''}
                            ${(eqDiscs > 0 || ab?.engineKey) ? `<span class="zb-col-build-badge ${isFull ? 'is-full' : ''}">${eqDiscs}/6</span>` : ''}
                            <span class="gacha-col-dupe-tag ${mLvl >= 6 ? 'maxed' : ''}">${mLabel}</span>
                            <img src="${a.img}" loading="lazy" alt="${bridge.itemName(a)}" class="is-agent">
                        </div>
                        <div class="gacha-col-info">
                            <span class="gacha-col-name">${bridge.itemName(a)}</span>
                            <span class="gacha-col-sub">${tElem(a.element)} • ${tRole(a.role)}</span>
                        </div>
                    </div>`;
                }).join('');

                grid.querySelectorAll('[data-zb-pick-modal]').forEach(card => {
                    card.addEventListener('click', () => {
                        const key = card.getAttribute('data-zb-pick-modal');
                        overlay.classList.remove('active');
                        switchBuildAgent(mount, key);
                    });
                });
            }

            function renderPicker() {
                overlay.innerHTML = `
                    <div class="gacha-dialog-box">
                        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;">
                            <div>
                                <span class="gacha-patch-tag">BUILDS • ${ownedAgents.length} AGENTS</span>
                                <h2 class="gacha-panel-title">${t.pickerTitle}</h2>
                                <p class="gacha-panel-desc">${t.pickerSub.replace('{n}', ownedAgents.length)}</p>
                            </div>
                            <button type="button" class="gacha-res-btn" id="zb-close-agent-picker">${t.close}</button>
                        </div>

                        <div class="gacha-col-controls" style="flex-shrink:0;">
                            <div class="gacha-col-filter-group">
                                <button type="button" class="gacha-col-filter-btn ${rankFilter === 'all' ? 'active' : ''}" data-zb-prank="all">${t.pickerAll}</button>
                                <button type="button" class="gacha-col-filter-btn ${rankFilter === 'S' ? 'active' : ''}" data-zb-prank="S">S</button>
                                <button type="button" class="gacha-col-filter-btn ${rankFilter === 'A' ? 'active' : ''}" data-zb-prank="A">A</button>
                            </div>
                            <input type="text" class="gacha-col-search" id="zb-picker-search" placeholder="${t.pickerSearch}" value="${query.replace(/"/g, '&quot;')}" style="flex:1;">
                        </div>

                        <div class="gacha-selector-scroll custom-scrollbar">
                            <div class="gacha-selector-grid" id="zb-picker-grid"></div>
                        </div>
                    </div>
                `;

                document.getElementById('zb-close-agent-picker')?.addEventListener('click', () => {
                    overlay.classList.remove('active');
                });

                overlay.querySelectorAll('[data-zb-prank]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        rankFilter = btn.getAttribute('data-zb-prank');
                        overlay.querySelectorAll('[data-zb-prank]').forEach(b => b.classList.toggle('active', b === btn));
                        renderPickerGridOnly();
                    });
                });

                document.getElementById('zb-picker-search')?.addEventListener('input', (e) => {
                    query = e.target.value;
                    renderPickerGridOnly();
                });

                renderPickerGridOnly();
            }

            renderPicker();
        }

        function bindRosterAndSubViewEvents(mount, ownedAgents) {
            document.getElementById('zb-btn-open-agent-picker')?.addEventListener('click', () => {
                openAgentPickerModal(mount);
            });

            document.getElementById('zb-btn-prev-agent')?.addEventListener('click', () => {
                if (ownedAgents.length <= 1) return;
                const idx = ownedAgents.findIndex(a => a.rawKey === selectedAgentKey);
                const prevIdx = (idx <= 0 ? ownedAgents.length - 1 : idx - 1);
                switchBuildAgent(mount, ownedAgents[prevIdx].rawKey);
            });

            document.getElementById('zb-btn-next-agent')?.addEventListener('click', () => {
                if (ownedAgents.length <= 1) return;
                const idx = ownedAgents.findIndex(a => a.rawKey === selectedAgentKey);
                const nextIdx = (idx + 1) % ownedAgents.length;
                switchBuildAgent(mount, ownedAgents[nextIdx].rawKey);
            });

            document.getElementById('btn-toggle-subview')?.addEventListener('click', () => {
                resetConfirmStates();
                mobileMoreMenuOpen = false;
                currentSubMenu = currentSubMenu === 'stats' ? 'equip' : 'stats';
                renderBuildsTab(mount);
            });
        }

        function bindZZZEquipmentEvents(mount, st, pool, bs, agent, ab, selectedObj, isEngineMode, slotNum, batchTrashDiscs = [], allMobLv0Discs = []) {
            const bridge = window.ZZZGachaBridge;
            const portal = document.getElementById('zzz-builds-portal');

            mount.querySelectorAll('[data-wheel-pick]').forEach(el => {
                el.addEventListener('click', () => {
                    resetConfirmStates();
                    const val = el.getAttribute('data-wheel-pick');
                    activeWheelTarget = val === 'engine' ? 'engine' : parseInt(val, 10);
                    selectedItemId = null;
                    mobileEffectExpanded = false;
                    if (isMobileViewport()) {
                        mobileSlotDrawerOpen = true;
                        mobileMoreMenuOpen = false;
                        window.__zzzRecOpen = false;
                        bridge.pushSubState?.('slot');
                    }
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('zzz-wheel-center-engine')?.addEventListener('click', () => {
                resetConfirmStates();
                activeWheelTarget = 'engine';
                selectedItemId = null;
                mobileEffectExpanded = false;
                if (isMobileViewport()) {
                    mobileSlotDrawerOpen = true;
                    mobileMoreMenuOpen = false;
                    window.__zzzRecOpen = false;
                    bridge.pushSubState?.('slot');
                }
                renderBuildsTab(mount);
            });

            const toggleQuickEquip = (pickId) => {
                if (!pickId) return;
                selectedItemId = pickId;
                resetConfirmStates();
                if (isEngineMode) {
                    if (ab.engineKey === pickId) ab.engineKey = null;
                    else equipEngineUnique(st, agent.rawKey, pickId);
                } else {
                    const dObj = bs.craftedDiscs.find(x => x.uid === pickId);
                    if (!dObj) return;
                    const targetSlot = dObj.slot || slotNum;
                    if (ab.discs[targetSlot] === dObj.uid) ab.discs[targetSlot] = null;
                    else {
                        equipDiscUnique(st, agent.rawKey, targetSlot, dObj.uid);
                        activeWheelTarget = targetSlot;
                    }
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            };

            mount.querySelectorAll('[data-grid-pick]').forEach(el => {
                el.addEventListener('click', () => {
                    selectedItemId = el.getAttribute('data-grid-pick');
                    renderBuildsTab(mount);
                });
                el.addEventListener('dblclick', () => {
                    toggleQuickEquip(el.getAttribute('data-grid-pick'));
                });
            });

            document.getElementById('zzz-btn-filter')?.addEventListener('click', () => {
                showFilterBar = !showFilterBar;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-select-set-filter')?.addEventListener('change', (e) => {
                resetConfirmStates();
                filterSetKey = e.target.value;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-slot-only')?.addEventListener('click', () => {
                resetConfirmStates();
                showAllPartitions = false;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-all-slots')?.addEventListener('click', () => {
                resetConfirmStates();
                showAllPartitions = true;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-eng-all')?.addEventListener('click', () => {
                resetConfirmStates();
                filterEngineSpecialtyOnly = false;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-eng-spec')?.addEventListener('click', () => {
                resetConfirmStates();
                filterEngineSpecialtyOnly = true;
                selectedItemId = null;
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-lock-one')?.addEventListener('click', () => {
                if (!isEngineMode && selectedObj) {
                    const t = B();
                    selectedObj.locked = !selectedObj.locked;
                    bridge.saveState(st);
                    bridge.showToast?.(selectedObj.locked ? t.toastLocked : t.toastUnlocked);
                    renderBuildsTab(mount);
                }
            });

            // Démantèle 1 exemplaire du Moteur-Ampli sélectionné OU le Disque sélectionné
            function dismantleSelectedItem() {
                if (isEngineMode && selectedObj) {
                    const cnt = st.inventory[selectedObj.id]?.count || 0;
                    const usedCount = getEngineOwnersList(st, selectedObj.rawKey).length;
                    if (cnt > usedCount) {
                        const gain = selectedObj.rank === 'S' ? 40 : (selectedObj.rank === 'A' ? 10 : 3);
                        st.inventory[selectedObj.id].count -= 1;
                        if (st.inventory[selectedObj.id].count <= 0) {
                            delete st.inventory[selectedObj.id];
                            selectedItemId = null;
                        }
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        bridge.saveState(st);
                        bridge.showToast?.(B().toastDismantledOne.replace('{g}', gain));
                        renderBuildsTab(mount);
                    }
                } else if (!isEngineMode && selectedObj && !selectedObj.locked && !getDiscOwner(st, selectedObj.uid)) {
                    const idx = bs.craftedDiscs.findIndex(x => x.uid === selectedObj.uid);
                    if (idx !== -1) {
                        const gain = calcDiscDismantleGain(selectedObj);
                        bs.craftedDiscs.splice(idx, 1);
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        selectedItemId = null;
                        bridge.saveState(st);
                        bridge.showToast?.(B().toastDismantledOne.replace('{g}', gain));
                        renderBuildsTab(mount);
                    }
                }
            }

            function dismantleBatchItems() {
                if (!batchTrashConfirmArmed) {
                    batchTrashConfirmArmed = true;
                    clearTimeout(batchTrashConfirmTimer);
                    batchTrashConfirmTimer = setTimeout(() => {
                        batchTrashConfirmArmed = false;
                        const activeBtn = document.querySelector('#zzz-gacha-modal .gacha-nav-btn.active');
                        if (activeBtn?.getAttribute('data-gtab') === 'builds' && currentSubMenu === 'equip') {
                            renderBuildsTab(mount);
                        }
                    }, 2600);
                    renderBuildsTab(mount);
                    return;
                }
                batchTrashConfirmArmed = false;
                clearTimeout(batchTrashConfirmTimer);

                if (isEngineMode && selectedObj) {
                    const cnt = st.inventory[selectedObj.id]?.count || 0;
                    const usedCount = getEngineOwnersList(st, selectedObj.rawKey).length;
                    const spare = Math.max(0, cnt - usedCount);
                    if (spare > 0) {
                        const unitGain = selectedObj.rank === 'S' ? 40 : (selectedObj.rank === 'A' ? 10 : 3);
                        const gain = spare * unitGain;
                        st.inventory[selectedObj.id].count -= spare;
                        if (st.inventory[selectedObj.id].count <= 0) {
                            delete st.inventory[selectedObj.id];
                            selectedItemId = null;
                        }
                        st.residual += gain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + gain;
                        bridge.saveState(st);
                        bridge.showToast?.(B().toastDismantledBatch.replace('{n}', spare).replace('{g}', gain));
                        renderBuildsTab(mount);
                    }
                } else if (!isEngineMode && batchTrashDiscs.length > 0) {
                    const uidSet = new Set(batchTrashDiscs.map(d => d.uid));
                    let totalGain = 0;
                    bs.craftedDiscs = bs.craftedDiscs.filter(d => {
                        if (uidSet.has(d.uid)) {
                            totalGain += calcDiscDismantleGain(d);
                            return false;
                        }
                        return true;
                    });
                    if (selectedItemId && uidSet.has(selectedItemId)) selectedItemId = null;
                    if (totalGain > 0) {
                        st.residual += totalGain;
                        st.totalDupesRes = (st.totalDupesRes || 0) + totalGain;
                        bridge.saveState(st);
                        bridge.showToast?.(B().toastDismantledBatch.replace('{n}', uidSet.size).replace('{g}', totalGain));
                        renderBuildsTab(mount);
                    }
                }
            }

            document.getElementById('zzz-btn-trash-one')?.addEventListener('click', dismantleSelectedItem);
            document.getElementById('zzz-btn-batch-dismantle')?.addEventListener('click', dismantleBatchItems);

            document.getElementById('zzz-btn-open-bardic')?.addEventListener('click', () => {
                resetConfirmStates();
                bardicSlot = isEngineMode ? 0 : slotNum;
                openBardicNeedleModal(mount);
            });

            document.getElementById('zzz-btn-compare')?.addEventListener('click', () => {
                isCompareMode = !isCompareMode;
                if (isCompareMode) window.__zzzRecOpen = false;
                renderBuildsTab(mount);
            });

            const openRecDrawer = () => {
                window.__zzzRecOpen = !window.__zzzRecOpen;
                if (window.__zzzRecOpen) {
                    isCompareMode = false;
                    mobileSlotDrawerOpen = false;
                    mobileMoreMenuOpen = false;
                    bridge.pushSubState?.('rec');
                } else {
                    bridge.popSubState?.();
                }
                renderBuildsTab(mount);
            };

            const closeRecDrawerUI = () => {
                window.__zzzRecOpen = false;
                bridge.popSubState?.();
                renderBuildsTab(mount);
            };

            const closeMobSlotDrawerUI = () => {
                mobileSlotDrawerOpen = false;
                mobileEffectExpanded = false;
                bridge.popSubState?.();
                renderBuildsTab(mount);
            };

            // Bouton [Recommandé] PC & Mobile
            document.getElementById('zzz-btn-recommended')?.addEventListener('click', openRecDrawer);
            document.getElementById('zzz-mob-open-rec')?.addEventListener('click', openRecDrawer);

            document.getElementById('zzz-close-rec')?.addEventListener('click', closeRecDrawerUI);
            document.getElementById('zzz-mob-slot-close')?.addEventListener('click', closeMobSlotDrawerUI);

            document.getElementById('zzz-portal-backdrop')?.addEventListener('mousedown', (ev) => {
                if (ev.target.id === 'zzz-portal-backdrop') {
                    if (window.__zzzRecOpen) closeRecDrawerUI();
                    else if (mobileSlotDrawerOpen) closeMobSlotDrawerUI();
                }
            });

            const recScope = portal || mount;
            recScope.querySelectorAll('[data-rec-filter-set]').forEach(row => {
                row.addEventListener('click', () => {
                    const sk = row.getAttribute('data-rec-filter-set');
                    filterSetKey = filterSetKey === sk ? 'all' : sk;
                    showFilterBar = filterSetKey !== 'all';
                    selectedItemId = null;
                    if (isMobileViewport()) {
                        window.__zzzRecOpen = false;
                        mobileSlotDrawerOpen = true;
                        bridge.showToast?.(filterSetKey === 'all' ? B().filterAllSets : `${B().filterBtn}: ${row.getAttribute('title')?.split(' (4P)')[0] || sk}`);
                    }
                    renderBuildsTab(mount);
                });
            });

            recScope.querySelectorAll('[data-rec-open-bardic]').forEach(row => {
                row.addEventListener('click', () => {
                    resetConfirmStates();
                    window.__zzzRecOpen = false;
                    clearBuildsPortal();
                    const prof = getGuideProfile(agent.rawKey);
                    if (prof.sets4[0]) bardicSetKey = prof.sets4[0];
                    bardicSlot = slotNum;
                    const recStatKey = row.getAttribute('data-rec-open-bardic') || '';
                    openBardicNeedleModal(mount, recStatKey);
                });
            });

            recScope.querySelectorAll('[data-rec-eng]').forEach(sph => {
                sph.addEventListener('click', () => {
                    window.__zzzRecEngKey = sph.getAttribute('data-rec-eng');
                    renderBuildsTab(mount);
                });
            });

            document.getElementById('zzz-rec-eng-details')?.addEventListener('click', () => {
                const targetKey = window.__zzzRecEngKey;
                if (!targetKey) return;
                if ((st.inventory[`engine_${targetKey}`]?.count || 0) > 0) {
                    selectedItemId = targetKey;
                    window.__zzzRecOpen = false;
                    if (isMobileViewport()) mobileSlotDrawerOpen = true;
                    else bridge.popSubState?.();
                    renderBuildsTab(mount);
                } else {
                    bridge.openItemModal?.('engine', targetKey);
                }
            });

            document.getElementById('zzz-rec-eng-equip')?.addEventListener('click', () => {
                const targetKey = window.__zzzRecEngKey;
                if (!targetKey || (st.inventory[`engine_${targetKey}`]?.count || 0) <= 0) return;
                if (ab.engineKey === targetKey) {
                    ab.engineKey = null;
                } else {
                    equipEngineUnique(st, agent.rawKey, targetKey);
                    selectedItemId = targetKey;
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-unequip-all')?.addEventListener('click', () => {
                const t = B();
                if (!unequipConfirmArmed) {
                    unequipConfirmArmed = true;
                    clearTimeout(unequipConfirmTimer);
                    unequipConfirmTimer = setTimeout(() => {
                        unequipConfirmArmed = false;
                        ['zzz-btn-unequip-all', 'zzz-mob-unequip-all'].forEach(id => {
                            const btn = document.getElementById(id);
                            if (btn) {
                                btn.classList.remove('confirm-danger');
                                btn.textContent = B().unequipAllBtn;
                            }
                        });
                    }, 2500);
                    renderBuildsTab(mount);
                    return;
                }
                unequipConfirmArmed = false;
                clearTimeout(unequipConfirmTimer);
                ab.engineKey = null;
                ab.discs = { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
                bridge.saveState(st);
                bridge.showToast?.(t.toastUnequippedAll, 'warn');
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-equip-all')?.addEventListener('click', () => {
                resetConfirmStates();
                const beforeSnap = JSON.stringify({ e: ab.engineKey, d: ab.discs });
                autoEquipFromGuide(st, pool, agent);
                const afterSnap = JSON.stringify({ e: ab.engineKey, d: ab.discs });
                bridge.saveState(st);
                if (beforeSnap !== afterSnap) {
                    bridge.showToast?.(B().toastEquippedAll);
                } else {
                    const isEn = (bridge.getLang?.() || 'fr') === 'en';
                    bridge.showToast?.(isEn ? 'Already optimal or no spare gear' : 'Déjà optimal ou aucun équipement libre', 'warn');
                }
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-equip-or-remove')?.addEventListener('click', () => {
                if (!selectedObj) return;
                resetConfirmStates();
                if (isEngineMode) {
                    if (ab.engineKey === selectedObj.rawKey) {
                        ab.engineKey = null;
                    } else {
                        equipEngineUnique(st, agent.rawKey, selectedObj.rawKey);
                    }
                } else {
                    const targetSlot = selectedObj.slot || slotNum;
                    if (ab.discs[targetSlot] === selectedObj.uid) {
                        ab.discs[targetSlot] = null;
                    } else {
                        equipDiscUnique(st, agent.rawKey, targetSlot, selectedObj.uid);
                        activeWheelTarget = targetSlot;
                    }
                }
                bridge.saveState(st);
                renderBuildsTab(mount);
            });

            document.getElementById('zzz-btn-enhance')?.addEventListener('click', () => {
                if (!isEngineMode && selectedObj && selectedObj.level < 15 && st.residual >= 4) {
                    resetConfirmStates();
                    st.residual -= 4;
                    upgradeDiscOneStep(selectedObj);
                    bridge.saveState(st);
                    renderBuildsTab(mount);
                }
            });

            const executeEnhanceMax = () => {
                if (isEngineMode || !selectedObj || selectedObj.level >= 15) return;
                const steps = Math.ceil((15 - selectedObj.level) / 3);
                const cost = steps * 4;
                if (st.residual < cost) return;
                resetConfirmStates();
                st.residual -= cost;
                while (selectedObj.level < 15) {
                    upgradeDiscOneStep(selectedObj);
                }
                bridge.saveState(st);
                bridge.showToast?.(B().toastEnhancedMax);
                renderBuildsTab(mount);
            };
            document.getElementById('zzz-btn-enhance-max')?.addEventListener('click', executeEnhanceMax);

            // --- Écouteurs dédiés Mobile Hub & Mobile Slot Drawer ---
            document.getElementById('zzz-mob-equip-all')?.addEventListener('click', () => {
                document.getElementById('zzz-btn-equip-all')?.click();
            });
            document.getElementById('zzz-mob-open-bardic')?.addEventListener('click', () => {
                resetConfirmStates();
                mobileMoreMenuOpen = false;
                bardicSlot = isEngineMode ? 0 : slotNum;
                openBardicNeedleModal(mount);
            });
            document.getElementById('zzz-mob-more-btn')?.addEventListener('click', () => {
                resetConfirmStates();
                mobileMoreMenuOpen = !mobileMoreMenuOpen;
                renderBuildsTab(mount);
            });
            document.getElementById('zzz-mob-unequip-all')?.addEventListener('click', () => {
                document.getElementById('zzz-btn-unequip-all')?.click();
            });
            document.getElementById('zzz-mob-batch-lv0')?.addEventListener('click', () => {
                if (!allMobLv0Discs.length) return;
                if (!batchTrashConfirmArmed) {
                    batchTrashConfirmArmed = true;
                    clearTimeout(batchTrashConfirmTimer);
                    batchTrashConfirmTimer = setTimeout(() => {
                        batchTrashConfirmArmed = false;
                        const activeBtn = document.querySelector('#zzz-gacha-modal .gacha-nav-btn.active');
                        if (activeBtn?.getAttribute('data-gtab') === 'builds' && currentSubMenu === 'equip') {
                            renderBuildsTab(mount);
                        }
                    }, 2600);
                    renderBuildsTab(mount);
                    return;
                }
                batchTrashConfirmArmed = false;
                clearTimeout(batchTrashConfirmTimer);
                const uidSet = new Set(allMobLv0Discs.map(d => d.uid));
                let totalGain = 0;
                bs.craftedDiscs = bs.craftedDiscs.filter(d => {
                    if (uidSet.has(d.uid)) {
                        totalGain += calcDiscDismantleGain(d);
                        return false;
                    }
                    return true;
                });
                if (selectedItemId && uidSet.has(selectedItemId)) selectedItemId = null;
                if (totalGain > 0) {
                    st.residual += totalGain;
                    st.totalDupesRes = (st.totalDupesRes || 0) + totalGain;
                    bridge.saveState(st);
                    bridge.showToast?.(B().toastDismantledBatch.replace('{n}', uidSet.size).replace('{g}', totalGain));
                    mobileMoreMenuOpen = false;
                    renderBuildsTab(mount);
                }
            });

            if (portal && mobileSlotDrawerOpen) {
                portal.querySelectorAll('[data-mob-slot]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        resetConfirmStates();
                        const val = btn.getAttribute('data-mob-slot');
                        activeWheelTarget = val === 'engine' ? 'engine' : parseInt(val, 10);
                        selectedItemId = null;
                        mobileEffectExpanded = false;
                        renderBuildsTab(mount);
                    });
                });
                portal.querySelectorAll('[data-mob-quick-equip]').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        lastMobTapId = null;
                        lastMobTapTime = 0;
                        toggleQuickEquip(btn.getAttribute('data-mob-quick-equip'));
                    });
                });
                portal.querySelectorAll('[data-grid-pick]').forEach(el => {
                    el.addEventListener('click', () => {
                        const pickId = el.getAttribute('data-grid-pick');
                        const now = Date.now();
                        if (pickId && pickId === lastMobTapId && (now - lastMobTapTime) < 360) {
                            lastMobTapId = null;
                            lastMobTapTime = 0;
                            toggleQuickEquip(pickId);
                            return;
                        }
                        lastMobTapId = pickId;
                        lastMobTapTime = now;
                        selectedItemId = pickId;
                        renderBuildsTab(mount);
                    });
                });
                document.getElementById('zzz-mob-slot-filter')?.addEventListener('click', () => {
                    showFilterBar = !showFilterBar;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-select-set')?.addEventListener('change', (e) => {
                    resetConfirmStates();
                    filterSetKey = e.target.value;
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-slot-only')?.addEventListener('click', () => {
                    resetConfirmStates();
                    showAllPartitions = false;
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-all-slots')?.addEventListener('click', () => {
                    resetConfirmStates();
                    showAllPartitions = true;
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-eng-all')?.addEventListener('click', () => {
                    resetConfirmStates();
                    filterEngineSpecialtyOnly = false;
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-eng-spec')?.addEventListener('click', () => {
                    resetConfirmStates();
                    filterEngineSpecialtyOnly = true;
                    selectedItemId = null;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-empty-bardic')?.addEventListener('click', () => {
                    mobileSlotDrawerOpen = false;
                    clearBuildsPortal();
                    bardicSlot = slotNum;
                    openBardicNeedleModal(mount);
                });
                document.getElementById('zzz-mob-lock-one')?.addEventListener('click', () => {
                    document.getElementById('zzz-btn-lock-one')?.click();
                });
                document.getElementById('zzz-mob-trash-one')?.addEventListener('click', dismantleSelectedItem);
                document.getElementById('zzz-mob-toggle-effect')?.addEventListener('click', () => {
                    mobileEffectExpanded = !mobileEffectExpanded;
                    renderBuildsTab(mount);
                });
                document.getElementById('zzz-mob-equip-btn')?.addEventListener('click', () => {
                    document.getElementById('zzz-btn-equip-or-remove')?.click();
                });
                document.getElementById('zzz-mob-enh-btn')?.addEventListener('click', () => {
                    document.getElementById('zzz-btn-enhance')?.click();
                });
                document.getElementById('zzz-mob-enh-max')?.addEventListener('click', executeEnhanceMax);
            }
        }

        function renderSubMenuStats(agent, calc, pool, bridge, t) {
            const elemIcon = ELEM_ICON_MAP[agent.element] || 'physique.webp';
            const isEn = (bridge.getLang?.() || 'fr') === 'en';
            const elemLabel = tElem(agent.element);
            const roleLabel = tRole(agent.role);
            const factionLabel = (typeof window.translateFactionName === 'function' ? window.translateFactionName(agent.faction) : agent.faction) || 'New Eridu';

            const activeSetsHTML = Object.entries(calc.setCounts)
                .filter(([, cnt]) => cnt >= 2)
                .map(([setKey, cnt]) => {
                    const dObj = pool.allCatalog.find(i => i.type === 'disc' && i.rawKey === setKey);
                    const name = dObj ? bridge.itemName(dObj) : setKey;
                    return `<span class="gacha-quest-prog done">${cnt >= 4 ? (isEn ? '4pc' : '4P') : (isEn ? '2pc' : '2P')} : ${name}</span>`;
                }).join(' ');

            return `
                <div class="zb-agent-header">
                    <div>
                        <div class="zb-faction-line">
                            <span>${factionLabel}</span>
                        </div>
                        <h2 class="zb-agent-big-name">${bridge.itemName(agent)}</h2>
                    </div>
                    <img src="assets/Faction/${agent.faction}.webp" class="zb-faction-logo" onerror="this.style.display='none'">
                </div>

                <div class="zb-level-row">
                    <div class="zb-lvl-pill">
                        <span>${isEn ? 'Lv.' : 'Niv.'} 60 <span style="color:#52525b;">/ 60</span></span>
                        <span style="background:#272732;color:#d7f70c;font-size:10px;padding:2px 7px;border-radius:5px;">MAX</span>
                    </div>
                    <div class="zb-elem-role-pill">
                        <img src="assets/Icone/${elemIcon}" alt="">
                        <span>${elemLabel}</span>
                        <span style="color:#3f3f46;">|</span>
                        <img src="assets/Rôles/${agent.role}.webp" alt="">
                        <span>${roleLabel}</span>
                    </div>
                </div>

                <div class="zb-stats-grid">
                    <div class="zb-stat-row ${(calc.recSubList.some(k => k.startsWith('PV')) || calc.goalProps?.includes('hp')) ? 'recommended' : ''}">
                        <span>${tStat('PV')}</span>
                        <span class="zb-stat-val">${calc.hp}${calc.hpBonus > 0 ? `<span class="zb-stat-bonus">+${calc.hpBonus}</span>` : ''}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.some(k => k.startsWith('ATQ')) || calc.goalProps?.includes('atk')) ? 'recommended' : ''}">
                        <span>${tStat('ATQ')}</span>
                        <span class="zb-stat-val">${calc.atk}${calc.atkBonus > 0 ? `<span class="zb-stat-bonus">+${calc.atkBonus}</span>` : ''}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.some(k => k.startsWith('DÉF')) || calc.goalProps?.includes('def')) ? 'recommended' : ''}">
                        <span>${tStat('DÉF')}</span>
                        <span class="zb-stat-val">${calc.def}${calc.defBonus > 0 ? `<span class="zb-stat-bonus">+${calc.defBonus}</span>` : ''}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes('Impact') || calc.goalProps?.includes('imp')) ? 'recommended' : ''}">
                        <span>${tStat('Impact')}</span><span class="zb-stat-val">${calc.imp}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes('Taux CRIT') || calc.goalProps?.includes('cr')) ? 'recommended' : ''}">
                        <span>${tStat('Taux CRIT')}</span><span class="zb-stat-val">${calc.cr}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes('Dégâts CRIT') || calc.goalProps?.includes('cd')) ? 'recommended' : ''}">
                        <span>${tStat('Dégâts CRIT')}</span><span class="zb-stat-val">${calc.cd}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes("Maîtrise d'anomalie") || calc.goalProps?.includes('am')) ? 'recommended' : ''}">
                        <span>${tStat("Maîtrise d'anomalie")}</span><span class="zb-stat-val">${calc.am}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes("Adresse d'anomalie") || calc.goalProps?.includes('ap')) ? 'recommended' : ''}">
                        <span>${tStat("Adresse d'anomalie")}</span><span class="zb-stat-val">${calc.ap}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.some(k => k.includes('PÉN')) || calc.goalProps?.includes('pen')) ? 'recommended' : ''}">
                        <span>${tStat('Ratio de PÉN')}</span><span class="zb-stat-val">${calc.pen}</span>
                    </div>
                    <div class="zb-stat-row ${(calc.recSubList.includes("Régénération d'énergie") || calc.goalProps?.includes('er')) ? 'recommended' : ''}">
                        <span>${tStat("Régénération d'énergie")}</span><span class="zb-stat-val">${calc.er}</span>
                    </div>
                </div>

                ${calc.goalItems?.length ? `
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;">
                    ${calc.goalItems.map(g => `
                        <div style="background:#0a0a0f;border:1px solid #22222c;border-radius:12px;padding:8px 10px;display:flex;flex-direction:column;gap:5px;">
                            <div style="display:flex;align-items:center;justify-content:space-between;font-size:10.5px;font-weight:800;">
                                <span style="color:#a1a1aa;">${g.label}</span>
                                <span style="font-family:monospace;color:${g.pct >= 100 ? '#4ade80' : '#facc15'};">${g.cur} / ${g.target}</span>
                            </div>
                            <div class="zb-goal-bar-track">
                                <div class="zb-goal-bar-fill" style="width:${g.pct}%;background:${g.pct >= 100 ? '#4ade80' : '#d7f70c'};"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>` : ''}

                ${activeSetsHTML ? `<div style="display:flex;gap:6px;flex-wrap:wrap;">${activeSetsHTML}</div>` : ''}

                <div class="zb-eval-bar">
                    <span style="font-size:12px;font-weight:800;color:#d4d4d8;">
                        ${t.effectiveSubs} <strong style="color:#facc15;font-size:14px;">${calc.effectiveSubRolls}</strong>
                    </span>
                    <div class="zb-eval-grade">
                        <span style="color:#f59e0b;font-size:14px;">${calc.grade}</span>
                        <span>${t.combatEval}</span>
                    </div>
                </div>
            `;
        }

        // ========================================================
        // 8. MAGASIN DE MUSIQUE (STUDIO BARDIC NEEDLE)
        // ========================================================
        function openBardicNeedleModal(mount, initialMainStat = '') {
            const bridge = window.ZZZGachaBridge;
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const overlay = document.getElementById('gacha-anim-overlay');
            if (!overlay) return;

            const allSets = pool.allCatalog.filter(i => i.type === 'disc');
            if (!bardicSetKey || !allSets.some(s => s.rawKey === bardicSetKey)) {
                const prof = getGuideProfile(selectedAgentKey);
                const firstWithStock = allSets.find(s => getFreeGachaDiscCount(st, s.rawKey) > 0);
                bardicSetKey = prof.sets4[0] || firstWithStock?.rawKey || allSets[0]?.rawKey || '';
            }

            let setSearch = '';
            let selectedMainStat = (initialMainStat && bardicSlot >= 4 && PARTITION_WEIGHTS[bardicSlot]?.[initialMainStat])
                ? initialMainStat
                : '';
            let selectedSubStats = [];
            let lastCraftedList = [];

            function generateCustomSRankDisc(setKey, partitionSlot, forcedMain = null, forcedSubs = []) {
                const slot = Number(partitionSlot) || (Math.floor(Math.random() * 6) + 1);
                const mainStat = (forcedMain && PARTITION_WEIGHTS[slot][forcedMain])
                    ? forcedMain
                    : drawWeightedKey(PARTITION_WEIGHTS[slot]);

                const available = SUBSTAT_POOL.filter(s => s.key !== mainStat).map(s => ({ ...s }));
                const substats = [];
                forcedSubs.forEach(subKey => {
                    if (subKey === mainStat || substats.length >= 4) return;
                    const idx = available.findIndex(a => a.key === subKey);
                    if (idx !== -1) {
                        const picked = available.splice(idx, 1)[0];
                        substats.push({ key: picked.key, step: picked.step, isPct: picked.isPct, upgrades: 0 });
                    }
                });

                const isFourLiner = substats.length === 4 || Math.random() < 0.20;
                const targetCount = isFourLiner ? 4 : 3;
                while (substats.length < targetCount && available.length > 0) {
                    substats.push(drawSubstatFromPool(available));
                }

                return {
                    uid: 'disc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
                    setKey, slot, level: 0, locked: false, isFourLiner: substats.length >= 4, mainStat, substats
                };
            }

            function renderBardic() {
                const prevSetListScroll = overlay.querySelector('.zb-set-grid-scroll')?.scrollTop || 0;
                const t = B();
                const isEn = (bridge.getLang?.() || 'fr') === 'en';
                const prof = getGuideProfile(selectedAgentKey);
                const activeAgent = pool.allCatalog.find(i => i.type === 'agent' && i.rawKey === selectedAgentKey);

                const sortedSets = [...allSets].sort((a, b) => {
                    const aStock = getFreeGachaDiscCount(st, a.rawKey);
                    const bStock = getFreeGachaDiscCount(st, b.rawKey);
                    if ((aStock > 0) !== (bStock > 0)) return bStock > 0 ? 1 : -1;
                    const aRec = prof.sets4.includes(a.rawKey) ? 2 : (prof.sets2.includes(a.rawKey) ? 1 : 0);
                    const bRec = prof.sets4.includes(b.rawKey) ? 2 : (prof.sets2.includes(b.rawKey) ? 1 : 0);
                    if (aRec !== bRec) return bRec - aRec;
                    return bStock - aStock;
                });
                const normSetQ = normText(setSearch.trim());

                const currentSet = allSets.find(s => s.rawKey === bardicSetKey) || allSets[0];
                const rawDiscJson = EXT_DATA.discs[bardicSetKey] || {};
                const desc2P = formatCleanDesc((isEn ? (rawDiscJson.twoPiece?.en || rawDiscJson.desc2?.en) : (rawDiscJson.twoPiece?.fr || rawDiscJson.desc2?.fr)) || '');
                const desc4P = formatCleanDesc((isEn ? (rawDiscJson.fourPiece?.en || rawDiscJson.desc4?.en) : (rawDiscJson.fourPiece?.fr || rawDiscJson.desc4?.fr)) || '');

                const stockForCurrentSet = getFreeGachaDiscCount(st, bardicSetKey);
                const variableMainKeys = bardicSlot >= 4 ? Object.keys(PARTITION_WEIGHTS[bardicSlot]) : [];

                const fixedMainForSlot = bardicSlot === 1 ? 'PV (flat)' : (bardicSlot === 2 ? 'ATQ (flat)' : (bardicSlot === 3 ? 'DÉF (flat)' : selectedMainStat));
                selectedSubStats = selectedSubStats.filter(k => k !== fixedMainForSlot);

                const isMainTargeted = !!(selectedMainStat && bardicSlot >= 4 && PARTITION_WEIGHTS[bardicSlot][selectedMainStat]);
                const customResCost = (isMainTargeted ? 15 : 0) + (selectedSubStats.length * 10);
                const customPolyCost = customResCost * 8;
                const isFreeRoll = customResCost === 0;
                const bulkFreeCount = Math.min(5, stockForCurrentSet);

                overlay.classList.add('active');
                overlay.innerHTML = `
                    <div class="gacha-dialog-box zb-bardic-dialog">
                        <div class="zb-bardic-top">
                            <div>
                                <span class="gacha-patch-tag">${t.bardicTag}</span>
                                <h2 class="gacha-panel-title zb-bardic-main-title">${t.bardicTitle}</h2>
                            </div>
                            <div class="zb-bardic-top-curr">
                                <span class="gacha-reset-pill">✦ ${st.residual}</span>
                                <span class="gacha-reset-pill" style="color:#d7f70c;">Poly : ${st.polychromes}</span>
                                <button type="button" class="gacha-res-btn" id="close-bardic-modal">${t.close}</button>
                            </div>
                        </div>

                        <div class="zb-bardic-layout">
                            <div class="zb-bardic-left-col">
                                <input type="text" id="bardic-set-search" class="gacha-col-search" placeholder="${t.searchSetPlaceholder}" value="${setSearch.replace(/"/g, '&quot;')}" style="width:100%;">
                                <div class="zb-set-grid-scroll">
                                    ${sortedSets.map(s => {
                                        const freeStock = getFreeGachaDiscCount(st, s.rawKey);
                                        const countCrafted = bs.craftedDiscs.filter(d => d.setKey === s.rawKey).length;
                                        const is4P = prof.sets4.includes(s.rawKey);
                                        const is2P = prof.sets2.includes(s.rawKey);
                                        const hiddenBySearch = normSetQ && !normText(bridge.itemName(s)).includes(normSetQ) && !normText(s.rawKey).includes(normSetQ);
                                        return `
                                        <div class="zb-set-card ${s.rawKey === bardicSetKey ? 'active' : ''}" data-bset="${s.rawKey}" style="${freeStock <= 0 ? 'opacity:0.55;' : ''}${hiddenBySearch ? 'display:none;' : ''}">
                                            <img src="${s.img}" alt="${bridge.itemName(s)}">
                                            <div style="min-width:0;flex:1;display:flex;flex-direction:column;gap:2px;">
                                                <div style="display:flex;align-items:center;justify-content:space-between;gap:4px;">
                                                    <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:10px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                        ${bridge.itemName(s)}
                                                    </span>
                                                    ${is4P ? `<span class="zb-guide-chip">${isEn ? '4pc' : '4P'}</span>` : (is2P ? `<span class="zb-guide-chip">${isEn ? '2pc' : '2P'}</span>` : '')}
                                                </div>
                                                <span style="font-family:monospace;font-size:9.5px;color:${freeStock > 0 ? '#4ade80' : '#71717a'};">
                                                    ${freeStock > 0 ? `${freeStock} ${isEn ? 'to tune' : 'à graver'}` : `0 stock (×${countCrafted})`}
                                                </span>
                                            </div>
                                        </div>`;
                                    }).join('')}
                                </div>
                            </div>

                            <div class="zb-bardic-right-col">
                                <div style="display:flex;flex-direction:column;gap:8px;">
                                    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                                        <div style="display:flex;align-items:center;gap:10px;">
                                            <img src="${currentSet ? currentSet.img : ''}" style="width:40px;height:40px;border-radius:999px;flex-shrink:0;">
                                            <div>
                                                <span style="font-size:9.5px;font-weight:900;color:${stockForCurrentSet > 0 ? '#4ade80' : '#f43f5e'};text-transform:uppercase;">
                                                    ${isEn
                                                        ? `Available stock: ${stockForCurrentSet} disc(s)`
                                                        : `Stock disponible : ${stockForCurrentSet} disque(s)`}
                                                </span>
                                                <h3 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:15px;color:#fff;text-transform:uppercase;">
                                                    ${currentSet ? bridge.itemName(currentSet) : bardicSetKey}
                                                </h3>
                                            </div>
                                        </div>
                                        ${!isFreeRoll ? `<button type="button" class="gacha-details-btn" id="bardic-reset-custom">${isEn ? 'Reset' : 'Réinitialiser'}</button>` : ''}
                                    </div>

                                    <div style="font-size:10px;color:#a1a1aa;line-height:1.35;background:#08080c;padding:7px 10px;border-radius:10px;border:1px solid #1f202b;">
                                        <div><strong style="color:#fff;">${isEn ? '2pc:' : '2P :'}</strong> ${desc2P || (isEn ? '2-piece stat bonus.' : 'Bonus de statistique 2 pièces.')}</div>
                                        <div style="margin-top:2px;"><strong style="color:#d7f70c;">${isEn ? '4pc:' : '4P :'}</strong> ${desc4P || (isEn ? '4-piece combat passive effect.' : 'Effet passif 4 pièces en combat.')}</div>
                                    </div>

                                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;">
                                        <button type="button" class="gacha-col-filter-btn ${bardicSlot === 0 ? 'active' : ''}" data-bslot="0" style="grid-column:span 2;">${t.randomPartition}</button>
                                        ${[1, 2, 3, 4, 5, 6].map(n => `
                                            <button type="button" class="gacha-col-filter-btn ${bardicSlot === n ? 'active' : ''}" data-bslot="${n}">[${n}]</button>
                                        `).join('')}
                                    </div>

                                    ${variableMainKeys.length > 0 ? `
                                    <div style="display:flex;flex-direction:column;gap:4px;">
                                        <span style="font-size:10px;font-weight:800;color:#a1a1aa;">${isEn ? 'Main Stat (+15 ✦ if targeted):' : 'Stat Principale (+15 ✦ si choisie) :'}</span>
                                        <select id="bardic-main-select" class="gacha-col-search" style="width:100%;border-color:${isMainTargeted ? '#d7f70c' : '#2c2c36'};">
                                            <option value="">${isEn ? 'Random (Free)' : 'Aléatoire (Gratuit)'}</option>
                                            ${variableMainKeys.map(k => {
                                                const isRecMain = (prof.mainBySlot[bardicSlot] || []).includes(k);
                                                return `<option value="${k}" ${selectedMainStat === k ? 'selected' : ''}>${tStat(k)} ${isRecMain ? '[GUIDE]' : ''} (+15 ✦)</option>`;
                                            }).join('')}
                                        </select>
                                    </div>` : ''}

                                    <div style="display:flex;flex-direction:column;gap:5px;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;">
                                            <span style="font-size:10px;font-weight:800;color:#a1a1aa;">${isEn ? 'Guaranteed Sub-Stats (+10 ✦ each, max 4):' : 'Sous-Stats garanties (+10 ✦ chacune, max 4) :'}</span>
                                            <span class="gacha-quest-prog ${selectedSubStats.length > 0 ? 'done' : ''}">${selectedSubStats.length} / 4</span>
                                        </div>
                                        <div style="display:flex;flex-wrap:wrap;gap:5px;">
                                            ${SUBSTAT_POOL.map(s => {
                                                const isPicked = selectedSubStats.includes(s.key);
                                                const isConflict = s.key === fixedMainForSlot;
                                                const isGuideSub = prof.subPrio.includes(s.key);
                                                return `
                                                <button type="button" class="gacha-col-filter-btn ${isPicked ? 'active' : ''}"
                                                        data-bsubstat="${s.key}" ${isConflict ? 'disabled style="opacity:0.3;"' : ''}
                                                        style="padding:4px 8px;font-size:9.5px;${isGuideSub && !isPicked ? 'border-color:rgba(250,204,21,0.55);color:#fde047;' : ''}">
                                                    ${tStat(s.key)}${isGuideSub ? ' • GUIDE' : ''}
                                                </button>`;
                                            }).join('')}
                                        </div>
                                    </div>
                                </div>

                                <div style="display:flex;flex-direction:column;gap:5px;max-height:115px;overflow-y:auto;">
                                    ${lastCraftedList.map(d => {
                                        const isEqNow = !!(activeAgent && getDiscOwner(st, d.uid) === activeAgent.rawKey);
                                        return `
                                        <div style="background:#141520;border:1.5px solid #d7f70c;border-radius:12px;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;">
                                            <div style="min-width:0;flex:1;">
                                                <div style="font-size:10px;font-weight:900;color:#d7f70c;">
                                                    [${d.slot}] ${tStat(d.mainStat)} (${formatMainStatValue(d.mainStat, d.level)}) • ${d.isFourLiner ? '4-Liner' : '3-Liner'}
                                                </div>
                                                <div style="font-size:9.5px;color:#d4d4d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                                                    ${d.substats.map(s => `${tStat(s.key)} +${formatSubstatValue(s)}`).join(' | ')}
                                                </div>
                                            </div>
                                            ${activeAgent ? `
                                            <button type="button" class="gacha-claim-btn ${isEqNow ? '' : 'can-claim'}" data-quick-equip="${d.uid}" data-qslot="${d.slot}" ${isEqNow ? 'disabled' : ''} style="padding:5px 9px;font-size:9.5px;">
                                                ${isEqNow ? t.equippedTag : t.equipNow}
                                            </button>` : ''}
                                        </div>`;
                                    }).join('')}
                                </div>

                                ${stockForCurrentSet <= 0 ? `
                                <div style="text-align:center;padding:10px;background:#14141d;border:1px solid #2b2b38;border-radius:12px;font-size:11px;font-weight:800;color:#a1a1aa;">
                                    ${isEn
                                        ? 'No disc stock for this set. Perform Signal Searches on the Unified Channel to earn more!'
                                        : 'Aucun disque en stock pour ce set. Faites des tirages sur le Canal Unifié pour en obtenir !'}
                                </div>` : (isFreeRoll ? `
                                <div style="display:grid;grid-template-columns:${bulkFreeCount > 1 ? '1fr 1fr' : '1fr'};gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-emerald" id="btn-craft-free-1">
                                        ${isEn
                                            ? `Tune ×1 (Free • ${stockForCurrentSet} left)`
                                            : `Graver ×1 (Gratuit • ${stockForCurrentSet} dispo)`}
                                    </button>
                                    ${bulkFreeCount > 1 ? `
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-free-bulk">
                                        ${isEn ? `Tune ×${bulkFreeCount} (Free)` : `Graver ×${bulkFreeCount} (Gratuit)`}
                                    </button>` : ''}
                                </div>` : `
                                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                                    <button type="button" class="gacha-shop-btn primary-yellow" id="btn-craft-custom-res" ${st.residual < customResCost ? 'disabled' : ''}>
                                        ${isEn ? `Custom Tune (${customResCost} ✦)` : `Graver Sur-Mesure (${customResCost} ✦)`}
                                    </button>
                                    <button type="button" class="gacha-shop-btn primary-cyan" id="btn-craft-custom-poly" ${st.polychromes < customPolyCost ? 'disabled' : ''}>
                                        ${isEn ? `Custom Tune (${customPolyCost} Poly)` : `Graver Sur-Mesure (${customPolyCost} Poly)`}
                                    </button>
                                </div>`)}
                            </div>
                        </div>
                    </div>
                `;

                const newSetList = overlay.querySelector('.zb-set-grid-scroll');
                if (newSetList) newSetList.scrollTop = prevSetListScroll;

                document.getElementById('close-bardic-modal').addEventListener('click', () => {
                    overlay.classList.remove('active');
                    renderBuildsTab(mount);
                });

                document.getElementById('bardic-reset-custom')?.addEventListener('click', () => {
                    selectedMainStat = '';
                    selectedSubStats = [];
                    renderBardic();
                });

                const sInp = document.getElementById('bardic-set-search');
                if (sInp) {
                    sInp.addEventListener('input', (e) => {
                        setSearch = e.target.value;
                        const q = normText(setSearch.trim());
                        overlay.querySelectorAll('[data-bset]').forEach(card => {
                            const key = card.getAttribute('data-bset') || '';
                            const nameTxt = normText(card.textContent);
                            card.style.display = (!q || nameTxt.includes(q) || normText(key).includes(q)) ? '' : 'none';
                        });
                    });
                }

                overlay.querySelectorAll('[data-bset]').forEach(el => {
                    el.addEventListener('click', () => {
                        bardicSetKey = el.getAttribute('data-bset');
                        renderBardic();
                    });
                });

                overlay.querySelectorAll('[data-bslot]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        bardicSlot = parseInt(btn.getAttribute('data-bslot'), 10) || 0;
                        selectedMainStat = '';
                        renderBardic();
                    });
                });

                document.getElementById('bardic-main-select')?.addEventListener('change', (e) => {
                    selectedMainStat = e.target.value;
                    renderBardic();
                });

                overlay.querySelectorAll('[data-bsubstat]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const k = btn.getAttribute('data-bsubstat');
                        const idx = selectedSubStats.indexOf(k);
                        if (idx !== -1) {
                            selectedSubStats.splice(idx, 1);
                        } else if (selectedSubStats.length < 4) {
                            selectedSubStats.push(k);
                        }
                        renderBardic();
                    });
                });

                function executeCraft(count, payMode = 'free') {
                    const avail = getFreeGachaDiscCount(st, bardicSetKey);
                    if (avail < count) return;

                    if (payMode === 'res') {
                        if (st.residual < customResCost * count) return;
                        st.residual -= customResCost * count;
                    } else if (payMode === 'poly') {
                        if (st.polychromes < customPolyCost * count) return;
                        st.polychromes -= customPolyCost * count;
                    }

                    bs.usedGachaDiscs[bardicSetKey] = (bs.usedGachaDiscs[bardicSetKey] || 0) + count;

                    const forceMain = isMainTargeted ? selectedMainStat : null;
                    lastCraftedList = [];
                    for (let i = 0; i < count; i++) {
                        const d = generateCustomSRankDisc(bardicSetKey, bardicSlot, forceMain, selectedSubStats);
                        bs.craftedDiscs.unshift(d);
                        lastCraftedList.push(d);
                        selectedItemId = d.uid;
                    }
                    bridge.saveState(st);
                    renderBardic();
                }

                document.getElementById('btn-craft-free-1')?.addEventListener('click', () => executeCraft(1, 'free'));
                document.getElementById('btn-craft-free-bulk')?.addEventListener('click', () => executeCraft(bulkFreeCount, 'free'));
                document.getElementById('btn-craft-custom-res')?.addEventListener('click', () => executeCraft(1, 'res'));
                document.getElementById('btn-craft-custom-poly')?.addEventListener('click', () => executeCraft(1, 'poly'));

                overlay.querySelectorAll('[data-quick-equip]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const uid = btn.getAttribute('data-quick-equip');
                        const sl = parseInt(btn.getAttribute('data-qslot'), 10);
                        if (selectedAgentKey && uid && sl) {
                            equipDiscUnique(st, selectedAgentKey, sl, uid);
                            activeWheelTarget = sl;
                            selectedItemId = uid;
                            bridge.saveState(st);
                            bridge.showToast?.(`${t.equippedTag} [${sl}]`);
                            renderBardic();
                        }
                    });
                });
            }

            renderBardic();
        }

        // ========================================================
        // 9. SALLE DES TROPHÉES : BADGES DE MAÎTRISE & ESCOUADES
        // ========================================================
        let badgeFilter = 'all';

        const BADGE_SVGS = {
            squadReady: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d7f70c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
            engines: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            vinyl: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M6 12a6 6 0 0 1 6-6"/></svg>`,
            tuning: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
            resonance: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
            miracle: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 12 12 22 2 12 12 2"/><circle cx="12" cy="12" r="3"/></svg>`,
            overclock: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
        };

        function computeSeriesBadges(st, pool) {
            const bs = ensureBuildState(st);
            const inv = st.inventory || {};
            const isEn = (window.ZZZGachaBridge?.getLang?.() || 'fr') === 'en';
            const badges = [];

            const allDiscs = pool.allCatalog.filter(i => i.type === 'disc');
            const ownedDiscs = allDiscs.filter(d => (inv[d.id]?.count || 0) > 0).length;
            const lv15Count = bs.craftedDiscs.filter(d => d.level >= 15).length;
            const hasGodRoll = bs.craftedDiscs.some(d => (d.substats || []).some(s => (s.upgrades || 0) >= 4));
            const hasOverclock = Object.values(inv).some(i => i.type === 'agent' && (i.count || 0) > 7);

            const sEnginesOwned = pool.allCatalog.filter(i => i.type === 'engine' && i.rank === 'S' && (inv[i.id]?.count || 0) > 0).length;
            const fullyEquippedAgents = Object.values(bs.agentBuilds || {}).filter(ab =>
                ab && ab.engineKey && [1, 2, 3, 4, 5, 6].every(s => !!ab.discs?.[s])
            ).length;

            badges.push({
                id: 'series_squad_ready_3', cat: 'mastery', svg: BADGE_SVGS.squadReady,
                title: isEn ? 'Combat Ready Squad (3 Built Agents)' : 'Escouade Opérationnelle (3 Agents Équipés)',
                desc: isEn ? 'Equip 3 different Agents with a W-Engine and all 6 Drive Discs.' : 'Équiper 3 Agents différents avec un Moteur-Ampli et leurs 6 Disques.',
                cur: Math.min(3, fullyEquippedAgents), max: 3, reward: 1000
            });
            badges.push({
                id: 'series_s_engines_5', cat: 'mastery', svg: BADGE_SVGS.engines,
                title: isEn ? 'Signature Arsenal (5 S-Engines)' : 'Arsenal Signature (5 Moteurs Rang S)',
                desc: isEn ? 'Unlock 5 different S-Rank W-Engines in your Collection.' : 'Débloquer 5 Moteurs-Ampli de Rang S différents dans la Collection.',
                cur: Math.min(5, sEnginesOwned), max: 5, reward: 1200
            });
            badges.push({
                id: 'series_all_discs', cat: 'mastery', svg: BADGE_SVGS.vinyl,
                title: isEn ? 'Master Vinyl Collector' : 'Maître Disquaire de New Eridu',
                desc: isEn ? 'Unlock all Drive Disc sets in your Collection.' : 'Débloquer l\'intégralité des Sets de Disques dans la Collection.',
                cur: ownedDiscs, max: allDiscs.length || 30, reward: 1600
            });
            badges.push({
                id: 'series_craft_20', cat: 'mastery', svg: BADGE_SVGS.tuning,
                title: isEn ? 'Bardic Needle Regular' : 'Habitué du Magasin de musique',
                desc: isEn ? 'Tune 20 S-Rank Drive Discs in the Studio.' : 'Graver 20 Disques de Poussée de Rang S dans le Magasin de musique.',
                cur: Math.min(20, bs.craftedDiscs.length), max: 20, reward: 800
            });
            badges.push({
                id: 'series_lv15_6', cat: 'mastery', svg: BADGE_SVGS.resonance,
                title: isEn ? 'Full Resonance (+15 Set)' : 'Résonance Maximale (6 Disques +15)',
                desc: isEn ? 'Upgrade 6 S-Rank Drive Discs to Level +15.' : 'Améliorer 6 Disques de Rang S jusqu\'au niveau maximal +15.',
                cur: Math.min(6, lv15Count), max: 6, reward: 1000
            });
            badges.push({
                id: 'series_god_roll', cat: 'mastery', svg: BADGE_SVGS.miracle,
                title: isEn ? 'Statistical Miracle (+4 / +5 Roll)' : 'Miracle Statistique (+4 / +5 Roll)',
                desc: isEn ? 'Hit at least +4 upgrades on a single Drive Disc substat.' : 'Obtenir au moins +4 améliorations sur une seule sous-statistique de Disque S.',
                cur: hasGodRoll ? 1 : 0, max: 1, reward: 1200
            });
            badges.push({
                id: 'series_overclock_m6', cat: 'mastery', svg: BADGE_SVGS.overclock,
                title: isEn ? 'Beyond Limits (M6+ Overclock)' : 'Au-Delà des Limites (Surcharge M6+)',
                desc: isEn ? 'Obtain an 8th copy of any Agent to awaken Prismatic Overclock.' : 'Obtenir un 8e exemplaire d\'un même Agent pour éveiller sa Surcharge Prismatique.',
                cur: hasOverclock ? 1 : 0, max: 1, reward: 1200
            });

            const factionMap = {};
            pool.allCatalog.filter(i => i.type === 'agent').forEach(a => {
                const fac = a.faction || 'New Eridu';
                if (!factionMap[fac]) factionMap[fac] = [];
                factionMap[fac].push(a);
            });

            Object.entries(factionMap).forEach(([facName, members]) => {
                const ownedCount = members.filter(m => (inv[m.id]?.count || 0) > 0).length;
                const displayFac = (typeof window.translateFactionName === 'function' ? window.translateFactionName(facName) : facName) || facName;
                badges.push({
                    id: `fac_${facName}`, cat: 'squads',
                    icon: `assets/Faction/${facName}.webp`, svg: BADGE_SVGS.squadReady,
                    title: displayFac,
                    desc: isEn ? `Recruit all ${members.length} Agents from ${displayFac}.` : `Recruter les ${members.length} Agents de l'escouade ${displayFac}.`,
                    cur: ownedCount, max: members.length, reward: 800, members
                });
            });

            badges.sort((a, b) => {
                const aClaimed = !!bs.claimedBadges[a.id];
                const bClaimed = !!bs.claimedBadges[b.id];
                const aReady = a.cur >= a.max && !aClaimed;
                const bReady = b.cur >= b.max && !bClaimed;
                if (aReady !== bReady) return aReady ? -1 : 1;
                if (aClaimed !== bClaimed) return aClaimed ? 1 : -1;
                return (b.cur / (b.max || 1)) - (a.cur / (a.max || 1));
            });

            return badges;
        }

        function renderBadgesTab(mount) {
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return;
            const t = B();
            const st = bridge.getState();
            const pool = bridge.getPool();
            const bs = ensureBuildState(st);
            const allBadges = computeSeriesBadges(st, pool);

            const unlockedTotal = allBadges.filter(b => b.cur >= b.max).length;
            const claimableBadges = allBadges.filter(b => b.cur >= b.max && !bs.claimedBadges[b.id]);
            const filtered = badgeFilter === 'all' ? allBadges : allBadges.filter(b => b.cat === badgeFilter);

            mount.innerHTML = `
                <div class="zb-wrap">
                    <div class="zb-badges-summary">
                        <div>
                            <h2 class="gacha-sec-title">${t.badgesTitle}</h2>
                            <p class="gacha-sec-sub">${t.badgesSub}</p>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                            ${claimableBadges.length > 0 ? `<button type="button" class="gacha-claim-btn can-claim" id="btn-claim-all-badges">${(bridge.getLang?.() === 'en' ? 'Claim All' : 'Tout récupérer')} (${claimableBadges.length})</button>` : ''}
                            <span class="gacha-reset-pill">${t.badgesUnlockedCount.replace('{u}', unlockedTotal).replace('{t}', allBadges.length)}</span>
                            <div class="gacha-col-filter-group">
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'all' ? 'active' : ''}" data-bf="all">${t.filterAllBadges.replace('{n}', allBadges.length)}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'mastery' ? 'active' : ''}" data-bf="mastery">${t.filterMastery}</button>
                                <button type="button" class="gacha-col-filter-btn ${badgeFilter === 'squads' ? 'active' : ''}" data-bf="squads">${t.filterSquads}</button>
                            </div>
                        </div>
                    </div>

                    <div class="zb-badges-grid">
                        ${filtered.map(b => {
                            const isDone = b.cur >= b.max;
                            const isClaimed = !!bs.claimedBadges[b.id];
                            const canClaim = isDone && !isClaimed;
                            const pct = Math.min(100, Math.round((b.cur / (b.max || 1)) * 100));

                            const membersHTML = b.members ? `
                                <div class="zb-squad-avatars">
                                    ${b.members.map(m => {
                                        const hasM = (st.inventory[m.id]?.count || 0) > 0;
                                        return `
                                        <div class="zb-squad-mini ${hasM ? '' : 'missing'}" data-badge-agent="${m.rawKey}" title="${bridge.itemName(m)}">
                                            <img src="${m.img}" alt="${bridge.itemName(m)}" loading="lazy">
                                        </div>`;
                                    }).join('')}
                                </div>
                            ` : '';

                            return `
                            <div class="zb-badge-card ${canClaim ? 'unlocked' : (isClaimed ? 'claimed' : '')}">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <div style="width:48px;height:48px;border-radius:14px;background:#09090d;border:1.5px solid #2b2b36;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                                        ${b.icon ? `<img src="${b.icon}" style="width:36px;height:36px;object-fit:contain;" onerror="this.style.display='none'">` : b.svg}
                                    </div>
                                    <div style="min-width:0;flex:1;">
                                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                            <strong style="font-family:'Montserrat',sans-serif;font-size:12px;color:#fff;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${b.title}</strong>
                                            <span class="gacha-quest-prog ${isDone ? 'done' : ''}">${b.cur}/${b.max}</span>
                                        </div>
                                        <p style="font-size:11px;color:#a1a1aa;margin:4px 0 0;">${b.desc}</p>
                                    </div>
                                </div>

                                ${membersHTML}

                                <div class="gacha-quest-bar-track">
                                    <div class="gacha-quest-bar-fill" style="width:${pct}%;background:${isClaimed ? '#22c55e' : (canClaim ? '#d7f70c' : '#38bdf8')};"></div>
                                </div>

                                <div style="display:flex;align-items:center;justify-content:space-between;">
                                    <span style="font-family:monospace;font-size:12px;font-weight:900;color:#d7f70c;">+${b.reward} Polychromes</span>
                                    <button type="button" class="gacha-claim-btn ${canClaim ? 'can-claim' : ''}" data-claim-badge="${b.id}" data-breward="${b.reward}" ${!canClaim ? 'disabled' : ''}>
                                        ${isClaimed ? t.claimedBadge : (canClaim ? t.claimBadge : t.inProgress)}
                                    </button>
                                </div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>
            `;

            document.getElementById('btn-claim-all-badges')?.addEventListener('click', () => {
                let totalRew = 0;
                claimableBadges.forEach(b => {
                    bs.claimedBadges[b.id] = true;
                    st.polychromes += b.reward;
                    totalRew += b.reward;
                });
                bridge.saveState(st);
                bridge.showToast?.(`+${totalRew} Polychromes`);
                renderBadgesTab(mount);
            });

            mount.querySelectorAll('[data-bf]').forEach(btn => {
                btn.addEventListener('click', () => {
                    badgeFilter = btn.getAttribute('data-bf');
                    renderBadgesTab(mount);
                });
            });

            mount.querySelectorAll('[data-badge-agent]').forEach(el => {
                el.addEventListener('click', () => {
                    bridge.openItemModal?.('agent', el.getAttribute('data-badge-agent'));
                });
            });

            mount.querySelectorAll('[data-claim-badge]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const bId = btn.getAttribute('data-claim-badge');
                    const rew = parseInt(btn.getAttribute('data-breward'), 10) || 0;
                    if (!bs.claimedBadges[bId]) {
                        bs.claimedBadges[bId] = true;
                        st.polychromes += rew;
                        bridge.saveState(st);
                        bridge.showToast?.(`+${rew} Polychromes`);
                        renderBadgesTab(mount);
                    }
                });
            });
        }

        function hasClaimableBadges(customState = null) {
            const bridge = window.ZZZGachaBridge;
            if (!bridge) return false;
            const st = customState || bridge.getState();
            const pool = bridge.getPool();
            if (!st || !pool || !Array.isArray(pool.allCatalog) || pool.allCatalog.length === 0) return false;
            const bs = ensureBuildState(st);
            const badges = computeSeriesBadges(st, pool);
            return badges.some(b => b.cur >= b.max && !bs.claimedBadges[b.id]);
        }

        function injectBuildTabsIntoTopbar() {
            const navPills = document.querySelector('#zzz-gacha-modal .gacha-nav-pills');
            if (!navPills) return;
            const t = B();

            navPills.classList.add('zb-six-tabs');

            const existingBuildsBtn = document.getElementById('gtab-btn-builds');
            const existingBuildsTxt = document.getElementById('gtab-lbl-builds');
            const existingBuildsMob = document.getElementById('gtab-mob-builds');
            const existingBadgesTxt = document.getElementById('gtab-lbl-badges-txt');
            const existingBadgesMob = document.getElementById('gtab-mob-badges');

            if (!existingBuildsBtn) {
                const btnBuilds = document.createElement('button');
                btnBuilds.type = 'button';
                btnBuilds.className = 'gacha-nav-btn';
                btnBuilds.setAttribute('data-gtab', 'builds');
                btnBuilds.id = 'gtab-btn-builds';
                btnBuilds.innerHTML = `<span class="gnav-icon" aria-hidden="true">${UI_SVGS.navBuilds}</span><span class="gnav-lbl-full" id="gtab-lbl-builds">${t.tabBuilds}</span><span class="gnav-lbl-mob" id="gtab-mob-builds">${t.tabBuilds}</span>`;

                const btnBadges = document.createElement('button');
                btnBadges.type = 'button';
                btnBadges.className = 'gacha-nav-btn';
                btnBadges.setAttribute('data-gtab', 'badges');
                btnBadges.id = 'gtab-lbl-badges';
                btnBadges.innerHTML = `<span class="gnav-icon" aria-hidden="true">${UI_SVGS.navBadges}</span><span class="gnav-lbl-full" id="gtab-lbl-badges-txt">${t.tabBadges}</span><span class="gnav-lbl-mob" id="gtab-mob-badges">${t.tabBadges}</span><span class="gacha-quest-dot" id="gacha-dot-badges" style="display:none;"></span>`;

                navPills.appendChild(btnBuilds);
                navPills.appendChild(btnBadges);

                btnBuilds.addEventListener('click', () => {
                    window.ZZZBuilds?.closeAllDrawers?.();
                    window.ZZZGachaBridge?.switchCustomTab('builds', renderBuildsTab);
                });

                btnBadges.addEventListener('click', () => {
                    window.ZZZBuilds?.closeAllDrawers?.();
                    window.ZZZGachaBridge?.switchCustomTab('badges', renderBadgesTab);
                });
            } else {
                if (existingBuildsTxt && existingBuildsTxt.textContent !== t.tabBuilds) existingBuildsTxt.textContent = t.tabBuilds;
                if (existingBuildsMob && existingBuildsMob.textContent !== t.tabBuilds) existingBuildsMob.textContent = t.tabBuilds;
                if (existingBadgesTxt && existingBadgesTxt.textContent !== t.tabBadges) existingBadgesTxt.textContent = t.tabBadges;
                if (existingBadgesMob && existingBadgesMob.textContent !== t.tabBadges) existingBadgesMob.textContent = t.tabBadges;
            }

            }

        document.addEventListener('click', (e) => {
            if (e.target.closest('#langSwitcher')) {
                setTimeout(() => {
                    injectBuildTabsIntoTopbar();
                }, 30);
            }
        }, true);

        if (!window.__zbKeysBound) {
            window.__zbKeysBound = true;
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey || e.metaKey || e.altKey) return;
                const tag = document.activeElement?.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

                const gModal = document.getElementById('zzz-gacha-modal');
                if (!gModal || !gModal.classList.contains('visible')) return;
                if (document.getElementById('gacha-anim-overlay')?.classList.contains('active')) return;
                if (document.getElementById('gacha-agent-minicard-overlay')?.classList.contains('active')) return;

                const activeBtn = gModal.querySelector('.gacha-nav-btn.active');
                if (activeBtn?.getAttribute('data-gtab') !== 'builds') return;

                if (e.key === 'ArrowLeft') {
                    const prevBtn = document.getElementById('zb-btn-prev-agent');
                    if (prevBtn && !prevBtn.disabled) {
                        e.preventDefault();
                        prevBtn.click();
                    }
                    return;
                }
                if (e.key === 'ArrowRight') {
                    const nextBtn = document.getElementById('zb-btn-next-agent');
                    if (nextBtn && !nextBtn.disabled) {
                        e.preventDefault();
                        nextBtn.click();
                    }
                    return;
                }

                if (currentSubMenu !== 'equip') return;

                if (e.key === 'r' || e.key === 'R') {
                    const trashBtn = document.getElementById('zzz-btn-trash-one');
                    if (trashBtn && !trashBtn.disabled) {
                        e.preventDefault();
                        trashBtn.click();
                    }
                } else if (e.key === 't' || e.key === 'T') {
                    const lockBtn = document.getElementById('zzz-btn-lock-one');
                    if (lockBtn && !lockBtn.disabled) {
                        e.preventDefault();
                        lockBtn.click();
                    }
                }
            });
        }

        injectBuildTabsIntoTopbar();

        window.ZZZBuilds = {
            initTabs: injectBuildTabsIntoTopbar,
            hasClaimableBadges,
            closeAllDrawers: () => {
                window.__zzzRecOpen = false;
                mobileSlotDrawerOpen = false;
                mobileMoreMenuOpen = false;
                mobileEffectExpanded = false;
                clearBuildsPortal();
            },
            closeTopDrawer: (fromPopState = false) => {
                const mount = document.getElementById('gacha-view-mount');
                if (window.__zzzRecOpen) {
                    window.__zzzRecOpen = false;
                    clearBuildsPortal();
                    if (!fromPopState) window.ZZZGachaBridge?.popSubState?.();
                    if (mount) renderBuildsTab(mount);
                    return true;
                }
                if (mobileSlotDrawerOpen) {
                    mobileSlotDrawerOpen = false;
                    mobileEffectExpanded = false;
                    clearBuildsPortal();
                    if (!fromPopState) window.ZZZGachaBridge?.popSubState?.();
                    if (mount) renderBuildsTab(mount);
                    return true;
                }
                return false;
            },
            closeRecDrawer: () => window.ZZZBuilds.closeTopDrawer(false),
            refreshActiveView: (tabName) => {
                const mount = document.getElementById('gacha-view-mount');
                if (!mount) return;
                if (tabName === 'builds') renderBuildsTab(mount);
                else if (tabName === 'badges') renderBadgesTab(mount);
            },
            openAgentBuild: (agentKey) => {
                injectBuildTabsIntoTopbar();
                window.ZZZBuilds.closeAllDrawers();
                selectedAgentKey = agentKey;
                currentSubMenu = 'equip';
                window.ZZZGachaBridge?.switchCustomTab('builds', renderBuildsTab);
            }
        };

        window.ZZZGachaBridge?.refreshDots?.();
    } catch (err) {
        console.error('Erreur isolée dans gacha-builds.js :', err);
    }
})();
