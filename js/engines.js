const W_ENGINES_DB = {
    "Practiced Perfection": {
        name: { fr: "Perfection de la pratique", en: "Practiced Perfection" },
        rank: "S",
        specialty: "Anomaly",
        element: "Physical",
        img: "W-Engine_Practiced_Perfection.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Don de poussière d'étoile", en: "Gift of Stardust" },
        overclocks: [
            { 
                fr: "Augmente la {Maîtrise d'Anomalie} de [60]. En infligeant {Assaut}, les {DGT Physiques} augmentent de [20 %] pendant 20s (cumulable 2 fois). Entrer en combat octroie immédiatement 2 cumuls.", 
                en: "Increases {Anomaly Mastery} by [60]. When inflicting {Assault}, the equipper's {Physical DMG} increases by [20%] for 20s (stacking up to 2 times). Repeated triggers reset the duration. When entering combat, immediately gain 2 stacks." 
            },
            { 
                fr: "Augmente la {Maîtrise d'Anomalie} de [69]. En infligeant {Assaut}, les {DGT Physiques} augmentent de [23 %] pendant 20s (cumulable 2 fois). Entrer en combat octroie immédiatement 2 cumuls.", 
                en: "Increases {Anomaly Mastery} by [69]. When inflicting {Assault}, the equipper's {Physical DMG} increases by [23%] for 20s (stacking up to 2 times). Repeated triggers reset the duration. When entering combat, immediately gain 2 stacks." 
            },
            { 
                fr: "Augmente la {Maîtrise d'Anomalie} de [78]. En infligeant {Assaut}, les {DGT Physiques} augmentent de [26 %] pendant 20s (cumulable 2 fois). Entrer en combat octroie immédiatement 2 cumuls.", 
                en: "Increases {Anomaly Mastery} by [78]. When inflicting {Assault}, the equipper's {Physical DMG} increases by [26%] for 20s (stacking up to 2 times). Repeated triggers reset the duration. When entering combat, immediately gain 2 stacks." 
            },
            { 
                fr: "Augmente la {Maîtrise d'Anomalie} de [87]. En infligeant {Assaut}, les {DGT Physiques} augmentent de [29 %] pendant 20s (cumulable 2 fois). Entrer en combat octroie immédiatement 2 cumuls.", 
                en: "Increases {Anomaly Mastery} by [87]. When inflicting {Assault}, the equipper's {Physical DMG} increases by [29%] for 20s (stacking up to 2 times). Repeated triggers reset the duration. When entering combat, immediately gain 2 stacks." 
            },
            { 
                fr: "Augmente la {Maîtrise d'Anomalie} de [96]. En infligeant {Assaut}, les {DGT Physiques} augmentent de [32 %] pendant 20s (cumulable 2 fois). Entrer en combat octroie immédiatement 2 cumuls.", 
                en: "Increases {Anomaly Mastery} by [96]. When inflicting {Assault}, the equipper's {Physical DMG} increases by [32%] for 20s (stacking up to 2 times). Repeated triggers reset the duration. When entering combat, immediately gain 2 stacks." 
            }
        ]
    },
    "Lunar - Noviluna": {
        name: { fr: "Lune Nouvelle", en: "[Lunar] Noviluna" },
        rank: "B",
        specialty: "Support",
        img: "Lunar_Noviluna.png",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "6.4% - 16%" 
        },
        passiveName: { fr: "Nouvelle Lune", en: "New Moon" },
        overclocks: [
            { 
                fr: "Lancer une {Attaque spéciale EX} génère [3] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s.", 
                en: "Launching an {EX Special Attack} generates [3] Energy for the equipper. This effect can trigger once every 12s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} génère [3,5] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s.", 
                en: "Launching an {EX Special Attack} generates [3.5] Energy for the equipper. This effect can trigger once every 12s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} génère [4] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s.", 
                en: "Launching an {EX Special Attack} generates [4] Energy for the equipper. This effect can trigger once every 12s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} génère [4,5] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s.", 
                en: "Launching an {EX Special Attack} generates [4.5] Energy for the equipper. This effect can trigger once every 12s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} génère [5] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s.", 
                en: "Launching an {EX Special Attack} generates [5] Energy for the equipper. This effect can trigger once every 12s." 
            }
        ]
    },
    "Zanshin Herb Case": {
        name: { fr: "Étui à herbes Zanshin", en: "Zanshin Herb Case" },
        rank: "S",
        specialty: "Anomaly",
        element: "Electric",
        img: "W-Engine_Zanshin_Herb_Case.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "DGT CRIT", en: "CRIT DMG" }, 
            advanced: "19.2% - 48%" 
        },
        passiveName: { fr: "Croissance dans l'adversité", en: "Growth Through Adversity" },
        overclocks: [
            { 
                fr: "Augmente le Taux CRIT de [10 %]. Les {DGT Électriques} des {Attaques bondissantes} augmentent de [40 %]. Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut ou étourdit un ennemi, le Taux CRIT de l'équipementier augmente de [10 %] supplémentaires pendant 12s.", 
                en: "CRIT Rate increases by [10%]. {Dash Attack} {Electric DMG} increases by [40%]. When any squad member applies an Attribute Anomaly or Stuns an enemy, the equipper's CRIT Rate increases by an additional [10%] for 12s." 
            },
            { 
                fr: "Augmente le Taux CRIT de [11,5 %]. Les {DGT Électriques} des {Attaques bondissantes} augmentent de [46 %]. Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut ou étourdit un ennemi, le Taux CRIT de l'équipementier augmente de [11,5 %] supplémentaires pendant 12s.", 
                en: "CRIT Rate increases by [11.5%]. {Dash Attack} {Electric DMG} increases by [46%]. When any squad member applies an Attribute Anomaly or Stuns an enemy, the equipper's CRIT Rate increases by an additional [11.5%] for 12s." 
            },
            { 
                fr: "Augmente le Taux CRIT de [13 %]. Les {DGT Électriques} des {Attaques bondissantes} augmentent de [52 %]. Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut ou étourdit un ennemi, le Taux CRIT de l'équipementier augmente de [13 %] supplémentaires pendant 12s.", 
                en: "CRIT Rate increases by [13%]. {Dash Attack} {Electric DMG} increases by [52%]. When any squad member applies an Attribute Anomaly or Stuns an enemy, the equipper's CRIT Rate increases by an additional [13%] for 12s." 
            },
            { 
                fr: "Augmente le Taux CRIT de [14,5 %]. Les {DGT Électriques} des {Attaques bondissantes} augmentent de [58 %]. Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut ou étourdit un ennemi, le Taux CRIT de l'équipementier augmente de [14,5 %] supplémentaires pendant 12s.", 
                en: "CRIT Rate increases by [14.5%]. {Dash Attack} {Electric DMG} increases by [58%]. When any squad member applies an Attribute Anomaly or Stuns an enemy, the equipper's CRIT Rate increases by an additional [14.5%] for 12s." 
            },
            { 
                fr: "Augmente le Taux CRIT de [16 %]. Les {DGT Électriques} des {Attaques bondissantes} augmentent de [64 %]. Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut ou étourdit un ennemi, le Taux CRIT de l'équipementier augmente de [16 %] supplémentaires pendant 12s.", 
                en: "CRIT Rate increases by [16%]. {Dash Attack} {Electric DMG} increases by [64%]. When any squad member applies an Attribute Anomaly or Stuns an enemy, the equipper's CRIT Rate increases by an additional [16%] for 12s." 
            }
        ]
    },
    "Street Superstar": {
        name: { fr: "Superstar des rues", en: "Street Superstar" },
        rank: "A",
        specialty: "Attack",
        img: "W-Engine_Street_Superstar.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "ATQ %", en: "ATK" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Barres enflammées", en: "Flaming Bars" },
        overclocks: [
            { 
                fr: "Lorsqu'un membre de l'escouade lance un {Enchaînement}, l'équipementier gagne 1 cumul de Charge, cumulable jusqu'à 3 fois. Lors de l'activation de son propre {Ultime}, l'équipementier consomme tous les cumuls de Charge, et chaque cumul augmente les DGT de la compétence de [15 %].", 
                en: "Whenever a squad member launches a {Chain Attack}, the equipper gains 1 Charge stack, stacking up to 3 times. Upon activating their own {Ultimate}, the equipper consumes all Charge stacks, and each stack increases the skill's DMG by [15%]." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade lance un {Enchaînement}, l'équipementier gagne 1 cumul de Charge, cumulable jusqu'à 3 fois. Lors de l'activation de son propre {Ultime}, l'équipementier consomme tous les cumuls de Charge, et chaque cumul augmente les DGT de la compétence de [17,25 %].", 
                en: "Whenever a squad member launches a {Chain Attack}, the equipper gains 1 Charge stack, stacking up to 3 times. Upon activating their own {Ultimate}, the equipper consumes all Charge stacks, and each stack increases the skill's DMG by [17.25%]." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade lance un {Enchaînement}, l'équipementier gagne 1 cumul de Charge, cumulable jusqu'à 3 fois. Lors de l'activation de son propre {Ultime}, l'équipementier consomme tous les cumuls de Charge, et chaque cumul augmente les DGT de la compétence de [19,5 %].", 
                en: "Whenever a squad member launches a {Chain Attack}, the equipper gains 1 Charge stack, stacking up to 3 times. Upon activating their own {Ultimate}, the equipper consumes all Charge stacks, and each stack increases the skill's DMG by [19.5%]." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade lance un {Enchaînement}, l'équipementier gagne 1 cumul de Charge, cumulable jusqu'à 3 fois. Lors de l'activation de son propre {Ultime}, l'équipementier consomme tous les cumuls de Charge, et chaque cumul augmente les DGT de la compétence de [21,75 %].", 
                en: "Whenever a squad member launches a {Chain Attack}, the equipper gains 1 Charge stack, stacking up to 3 times. Upon activating their own {Ultimate}, the equipper consumes all Charge stacks, and each stack increases the skill's DMG by [21.75%]." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade lance un {Enchaînement}, l'équipementier gagne 1 cumul de Charge, cumulable jusqu'à 3 fois. Lors de l'activation de son propre {Ultime}, l'équipementier consomme tous les cumuls de Charge, et chaque cumul augmente les DGT de la compétence de [24 %].", 
                en: "Whenever a squad member launches a {Chain Attack}, the equipper gains 1 Charge stack, stacking up to 3 times. Upon activating their own {Ultimate}, the equipper consumes all Charge stacks, and each stack increases the skill's DMG by [24%]." 
            }
        ]
    },
    "Drill Rig - Red Axis": {
        name: { fr: "Foreuse - Axe rouge", en: "Drill Rig - Red Axis" },
        rank: "A",
        specialty: "Attack",
        element: "Electric",
        img: "W-Engine_Drill_Rig_-_Red_Axis.webp",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "20% - 50%" 
        },
        passiveName: { fr: "Générateur infernal", en: "Hell's Generator" },
        overclocks: [
            { 
                fr: "Lors du lancement d'une {Attaque spéciale EX} ou d'un {Enchaînement}, les {DGT Électriques} des {Attaques de base} et des {Attaques bondissantes} augmentent de [50 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 15s.", 
                en: "When launching an {EX Special Attack} or {Chain Attack}, {Electric DMG} from {Basic Attacks} and {Dash Attacks} increases by [50%] for 10s. This effect can trigger once every 15s." 
            },
            { 
                fr: "Lors du lancement d'une {Attaque spéciale EX} ou d'un {Enchaînement}, les {DGT Électriques} des {Attaques de base} et des {Attaques bondissantes} augmentent de [57,5 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 15s.", 
                en: "When launching an {EX Special Attack} or {Chain Attack}, {Electric DMG} from {Basic Attacks} and {Dash Attacks} increases by [57.5%] for 10s. This effect can trigger once every 15s." 
            },
            { 
                fr: "Lors du lancement d'une {Attaque spéciale EX} ou d'un {Enchaînement}, les {DGT Électriques} des {Attaques de base} et des {Attaques bondissantes} augmentent de [65 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 15s.", 
                en: "When launching an {EX Special Attack} or {Chain Attack}, {Electric DMG} from {Basic Attacks} and {Dash Attacks} increases by [65%] for 10s. This effect can trigger once every 15s." 
            },
            { 
                fr: "Lors du lancement d'une {Attaque spéciale EX} ou d'un {Enchaînement}, les {DGT Électriques} des {Attaques de base} et des {Attaques bondissantes} augmentent de [72,5 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 15s.", 
                en: "When launching an {EX Special Attack} or {Chain Attack}, {Electric DMG} from {Basic Attacks} and {Dash Attacks} increases by [72.5%] for 10s. This effect can trigger once every 15s." 
            },
            { 
                fr: "Lors du lancement d'une {Attaque spéciale EX} ou d'un {Enchaînement}, les {DGT Électriques} des {Attaques de base} et des {Attaques bondissantes} augmentent de [80 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 15s.", 
                en: "When launching an {EX Special Attack} or {Chain Attack}, {Electric DMG} from {Basic Attacks} and {Dash Attacks} increases by [80%] for 10s. This effect can trigger once every 15s." 
            }
        ]
    },
    "Frostfall Sickle": {
        name: { fr: "Faucille de givre-chute", en: "Frostfall Sickle" },
        rank: "S",
        specialty: "Anomaly",
        element: "Ice",
        img: "W-Engine_Frostfall_Sickle.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Maîtrise d'Anomalie", en: "Anomaly Mastery" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Verdict final", en: "Terminating Verdict" },
        overclocks: [
            { 
                fr: "Lorsqu'un équipier d'{attribut Glace} utilise une {Attaque spéciale} ou une {Attaque spéciale EX}, ses {DGT de Glace} augmentent de [20 %] pendant 40s, cumulable jusqu'à 2 fois (une fois par utilisation de compétence). Les déclenchements répétés réinitialisent la durée. À 2 cumuls, les DGT d'{Abloom} infligés par l'équipementier augmentent de [35 %] supplémentaires.", 
                en: "When an {Ice attribute} equipper uses a {Special Attack} or {EX Special Attack}, their {Ice DMG} is increased by [20%] for 40s, stacking up to 2 times, once per use of a skill. Repeated triggers refresh the duration. At 2 stacks, the equipper's {Abloom} DMG dealt is increased by an additional [35%]." 
            },
            { 
                fr: "Lorsqu'un équipier d'{attribut Glace} utilise une {Attaque spéciale} ou une {Attaque spéciale EX}, ses {DGT de Glace} augmentent de [23 %] pendant 40s, cumulable jusqu'à 2 fois (une fois par utilisation de compétence). Les déclenchements répétés réinitialisent la durée. À 2 cumuls, les DGT d'{Abloom} infligés par l'équipementier augmentent de [38,75 %] supplémentaires.", 
                en: "When an {Ice attribute} equipper uses a {Special Attack} or {EX Special Attack}, their {Ice DMG} is increased by [23%] for 40s, stacking up to 2 times, once per use of a skill. Repeated triggers refresh the duration. At 2 stacks, the equipper's {Abloom} DMG dealt is increased by an additional [38.75%]." 
            },
            { 
                fr: "Lorsqu'un équipier d'{attribut Glace} utilise une {Attaque spéciale} ou une {Attaque spéciale EX}, ses {DGT de Glace} augmentent de [26 %] pendant 40s, cumulable jusqu'à 2 fois (une fois par utilisation de compétence). Les déclenchements répétés réinitialisent la durée. À 2 cumuls, les DGT d'{Abloom} infligés par l'équipementier augmentent de [42,5 %] supplémentaires.", 
                en: "When an {Ice attribute} equipper uses a {Special Attack} or {EX Special Attack}, their {Ice DMG} is increased by [26%] for 40s, stacking up to 2 times, once per use of a skill. Repeated triggers refresh the duration. At 2 stacks, the equipper's {Abloom} DMG dealt is increased by an additional [42.5%]." 
            },
            { 
                fr: "Lorsqu'un équipier d'{attribut Glace} utilise une {Attaque spéciale} ou une {Attaque spéciale EX}, ses {DGT de Glace} augmentent de [29 %] pendant 40s, cumulable jusqu'à 2 fois (une fois par utilisation de compétence). Les déclenchements répétés réinitialisent la durée. À 2 cumuls, les DGT d'{Abloom} infligés par l'équipementier augmentent de [46,25 %] supplémentaires.", 
                en: "When an {Ice attribute} equipper uses a {Special Attack} or {EX Special Attack}, their {Ice DMG} is increased by [29%] for 40s, stacking up to 2 times, once per use of a skill. Repeated triggers refresh the duration. At 2 stacks, the equipper's {Abloom} DMG dealt is increased by an additional [46.25%]." 
            },
            { 
                fr: "Lorsqu'un équipier d'{attribut Glace} utilise une {Attaque spéciale} ou une {Attaque spéciale EX}, ses {DGT de Glace} augmentent de [32 %] pendant 40s, cumulable jusqu'à 2 fois (une fois par utilisation de compétence). Les déclenchements répétés réinitialisent la durée. À 2 cumuls, les DGT d'{Abloom} infligés par l'équipementier augmentent de [50 %] supplémentaires.", 
                en: "When an {Ice attribute} equipper uses a {Special Attack} or {EX Special Attack}, their {Ice DMG} is increased by [32%] for 40s, stacking up to 2 times, once per use of a skill. Repeated triggers refresh the duration. At 2 stacks, the equipper's {Abloom} DMG dealt is increased by an additional [50%]." 
            }
        ]
    },
    "Sharpened Stinger": {
        name: { fr: "Dard Aiguisé", en: "Sharpened Stinger" },
        rank: "S",
        specialty: "Anomaly",
        element: "Physical",
        img: "W-Engine_Sharpened_Stinger.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Adresse d'Anomalie", en: "Anomaly Proficiency" }, 
            advanced: "36 - 90" 
        },
        passiveName: { fr: "Plaisir de la chasse", en: "Indulge in the Hunt" },
        overclocks: [
            { 
                fr: "Lors de l'activation d'une {Attaque bondissante}, gagne 1 cumul d'{Instinct de prédateur}. Chaque cumul d'{Instinct de prédateur} augmente les {DGT Physiques} de [12 %] pendant 10s (cumulable 3 fois). Déclenchement toutes les 0,5s ; réinitialise la durée. Lors de l'entrée en combat ou d'une {Esquive parfaite}, gagne 3 cumuls. Au maximum de cumuls, le taux d'accumulation d'Anomalie augmente de [40 %].", 
                en: "Upon activating a {Dash Attack}, gain 1 stack of {Predatory Instinct}. Each stack increases {Physical DMG} by [12%] for 10s (max 3 stacks). Triggers every 0.5s; repeated triggers reset duration. Entering combat or triggering {Perfect Dodge} grants 3 stacks. While at max stacks, Anomaly Buildup Rate increases by [40%]." 
            },
            { 
                fr: "Lors de l'activation d'une {Attaque bondissante}, gagne 1 cumul d'{Instinct de prédateur}. Chaque cumul d'{Instinct de prédateur} augmente les {DGT Physiques} de [15 %] pendant 10s (cumulable 3 fois). Déclenchement toutes les 0,5s ; réinitialise la durée. Lors de l'entrée en combat ou d'une {Esquive parfaite}, gagne 3 cumuls. Au maximum de cumuls, le taux d'accumulation d'Anomalie augmente de [50 %].", 
                en: "Upon activating a {Dash Attack}, gain 1 stack of {Predatory Instinct}. Each stack increases {Physical DMG} by [15%] for 10s (max 3 stacks). Triggers every 0.5s; repeated triggers reset duration. Entering combat or triggering {Perfect Dodge} grants 3 stacks. While at max stacks, Anomaly Buildup Rate increases by [50%]." 
            },
            { 
                fr: "Lors de l'activation d'une {Attaque bondissante}, gagne 1 cumul d'{Instinct de prédateur}. Chaque cumul d'{Instinct de prédateur} augmente les {DGT Physiques} de [18 %] pendant 10s (cumulable 3 fois). Déclenchement toutes les 0,5s ; réinitialise la durée. Lors de l'entrée en combat ou d'une {Esquive parfaite}, gagne 3 cumuls. Au maximum de cumuls, le taux d'accumulation d'Anomalie augmente de [60 %].", 
                en: "Upon activating a {Dash Attack}, gain 1 stack of {Predatory Instinct}. Each stack increases {Physical DMG} by [18%] for 10s (max 3 stacks). Triggers every 0.5s; repeated triggers reset duration. Entering combat or triggering {Perfect Dodge} grants 3 stacks. While at max stacks, Anomaly Buildup Rate increases by [60%]." 
            },
            { 
                fr: "Lors de l'activation d'une {Attaque bondissante}, gagne 1 cumul d'{Instinct de prédateur}. Chaque cumul d'{Instinct de prédateur} augmente les {DGT Physiques} de [21 %] pendant 10s (cumulable 3 fois). Déclenchement toutes les 0,5s ; réinitialise la durée. Lors de l'entrée en combat ou d'une {Esquive parfaite}, gagne 3 cumuls. Au maximum de cumuls, le taux d'accumulation d'Anomalie augmente de [70 %].", 
                en: "Upon activating a {Dash Attack}, gain 1 stack of {Predatory Instinct}. Each stack increases {Physical DMG} by [21%] for 10s (max 3 stacks). Triggers every 0.5s; repeated triggers reset duration. Entering combat or triggering {Perfect Dodge} grants 3 stacks. While at max stacks, Anomaly Buildup Rate increases by [70%]." 
            },
            { 
                fr: "Lors de l'activation d'une {Attaque bondissante}, gagne 1 cumul d'{Instinct de prédateur}. Chaque cumul d'{Instinct de prédateur} augmente les {DGT Physiques} de [24 %] pendant 10s (cumulable 3 fois). Déclenchement toutes les 0,5s ; réinitialise la durée. Lors de l'entrée en combat ou d'une {Esquive parfaite}, gagne 3 cumuls. Au maximum de cumuls, le taux d'accumulation d'Anomalie augmente de [80 %].", 
                en: "Upon activating a {Dash Attack}, gain 1 stack of {Predatory Instinct}. Each stack increases {Physical DMG} by [24%] for 10s (max 3 stacks). Triggers every 0.5s; repeated triggers reset duration. Entering combat or triggering {Perfect Dodge} grants 3 stacks. While at max stacks, Anomaly Buildup Rate increases by [80%]." 
            }
        ]
    },
    "Weeping Gemini": {
        name: { fr: "Gémeaux en pleurs", en: "Weeping Gemini" },
        rank: "A",
        specialty: "Anomaly",
        img: "W-Engine_Weeping_Gemini.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Pleurs persistants", en: "Lingering Cries" },
        overclocks: [
            { 
                fr: "Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut, l'équipementier augmente son {Adresse d'Anomalie} de [30] (cumulable 4 fois). L'effet expire lorsque la cible récupère du Stun ou est vaincue. La durée de chaque cumul est calculée séparément.", 
                en: "Whenever a squad member inflicts an Attribute Anomaly on an enemy, the equipper gains a buff that increases {Anomaly Proficiency} by [30] (max 4 stacks). Expires when the target recovers from Stun or is defeated. Duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut, l'équipementier augmente son {Adresse d'Anomalie} de [34] (cumulable 4 fois). L'effet expire lorsque la cible récupère du Stun ou est vaincue. La durée de chaque cumul est calculée séparément.", 
                en: "Whenever a squad member inflicts an Attribute Anomaly on an enemy, the equipper gains a buff that increases {Anomaly Proficiency} by [34] (max 4 stacks). Expires when the target recovers from Stun or is defeated. Duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut, l'équipementier augmente son {Adresse d'Anomalie} de [38] (cumulable 4 fois). L'effet expire lorsque la cible récupère du Stun ou est vaincue. La durée de chaque cumul est calculée séparément.", 
                en: "Whenever a squad member inflicts an Attribute Anomaly on an enemy, the equipper gains a buff that increases {Anomaly Proficiency} by [38] (max 4 stacks). Expires when the target recovers from Stun or is defeated. Duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut, l'équipementier augmente son {Adresse d'Anomalie} de [42] (cumulable 4 fois). L'effet expire lorsque la cible récupère du Stun ou est vaincue. La durée de chaque cumul est calculée séparément.", 
                en: "Whenever a squad member inflicts an Attribute Anomaly on an enemy, the equipper gains a buff that increases {Anomaly Proficiency} by [42] (max 4 stacks). Expires when the target recovers from Stun or is defeated. Duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade inflige une Anomalie d'attribut, l'équipementier augmente son {Adresse d'Anomalie} de [46] (cumulable 4 fois). L'effet expire lorsque la cible récupère du Stun ou est vaincue. La durée de chaque cumul est calculée séparément.", 
                en: "Whenever a squad member inflicts an Attribute Anomaly on an enemy, the equipper gains a buff that increases {Anomaly Proficiency} by [46] (max 4 stacks). Expires when the target recovers from Stun or is defeated. Duration of each stack is calculated separately." 
            }
        ]
    },
    "Roaring Ride": {
        name: { fr: "Virée rugissante", en: "Roaring Ride" },
        rank: "A",
        specialty: "Anomaly",
        element: "Physical",
        img: "W-Engine_Roaring_Ride.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Potentiel de collision", en: "Collision Potential" },
        overclocks: [
            { 
                fr: "Lorsqu'une {Attaque spéciale EX} touche un ennemi, l'un des 3 effets aléatoires s'active pour 5s (déclenchement toutes les 0,3s). Les mêmes effets ne se cumulent pas, mais plusieurs différents peuvent coexister : Augmente l'ATQ de [8 %], augmente l'{Adresse d'Anomalie} de [40], ou augmente le taux d'accumulation d'Anomalie de [25 %].", 
                en: "When {EX Special Attack} hits an enemy, 1 of 3 random effects triggers for 5s (triggers every 0.3s). Same effects cannot stack; repeated triggers reset duration. Increases ATK by [8%], {Anomaly Proficiency} by [40], or Anomaly Buildup Rate by [25%]." 
            },
            { 
                fr: "Lorsqu'une {Attaque spéciale EX} touche un ennemi, l'un des 3 effets aléatoires s'active pour 5s (déclenchement toutes les 0,3s). Les mêmes effets ne se cumulent pas, mais plusieurs différents peuvent coexister : Augmente l'ATQ de [9 %], augmente l'{Adresse d'Anomalie} de [46], ou augmente le taux d'accumulation d'Anomalie de [28 %].", 
                en: "When {EX Special Attack} hits an enemy, 1 of 3 random effects triggers for 5s (triggers every 0.3s). Same effects cannot stack; repeated triggers reset duration. Increases ATK by [9%], {Anomaly Proficiency} by [46], or Anomaly Buildup Rate by [28%]." 
            },
            { 
                fr: "Lorsqu'une {Attaque spéciale EX} touche un ennemi, l'un des 3 effets aléatoires s'active pour 5s (déclenchement toutes les 0,3s). Les mêmes effets ne se cumulent pas, mais plusieurs différents peuvent coexister : Augmente l'ATQ de [10 %], augmente l'{Adresse d'Anomalie} de [52], ou augmente le taux d'accumulation d'Anomalie de [32 %].", 
                en: "When {EX Special Attack} hits an enemy, 1 of 3 random effects triggers for 5s (triggers every 0.3s). Same effects cannot stack; repeated triggers reset duration. Increases ATK by [10%], {Anomaly Proficiency} by [52], or Anomaly Buildup Rate by [32%]." 
            },
            { 
                fr: "Lorsqu'une {Attaque spéciale EX} touche un ennemi, l'un des 3 effets aléatoires s'active pour 5s (déclenchement toutes les 0,3s). Les mêmes effets ne se cumulent pas, mais plusieurs différents peuvent coexister : Augmente l'ATQ de [11,5 %], augmente l'{Adresse d'Anomalie} de [58], ou augmente le taux d'accumulation d'Anomalie de [36 %].", 
                en: "When {EX Special Attack} hits an enemy, 1 of 3 random effects triggers for 5s (triggers every 0.3s). Same effects cannot stack; repeated triggers reset duration. Increases ATK by [11.5%], {Anomaly Proficiency} by [58], or Anomaly Buildup Rate by [36%]." 
            },
            { 
                fr: "Lorsqu'une {Attaque spéciale EX} touche un ennemi, l'un des 3 effets aléatoires s'active pour 5s (déclenchement toutes les 0,3s). Les mêmes effets ne se cumulent pas, mais plusieurs différents peuvent coexister : Augmente l'ATQ de [13 %], augmente l'{Adresse d'Anomalie} de [64], ou augmente le taux d'accumulation d'Anomalie de [40 %].", 
                en: "When {EX Special Attack} hits an enemy, 1 of 3 random effects triggers for 5s (triggers every 0.3s). Same effects cannot stack; repeated triggers reset duration. Increases ATK by [13%], {Anomaly Proficiency} by [64], or Anomaly Buildup Rate by [40%]." 
            }
        ]
    },
    "Kaboom the Cannon": {
        name: { fr: "Kaboom le canon", en: "Kaboom the Cannon" },
        rank: "A",
        specialty: "Support",
        img: "W-Engine_Kaboom_the_Cannon.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "20% - 50%" 
        },
        passiveName: { fr: "Accident de bousculade", en: "Stampede Accident" },
        overclocks: [
            { 
                fr: "Lorsqu'une unité alliée de l'escouade attaque et touche un ennemi, l'ATQ de tous les membres de l'escouade augmente de [2,5 %] pendant 8s (cumulable jusqu'à 4 fois). La durée de chaque cumul est calculée séparément, et chaque unité alliée peut fournir 1 cumul de l'amélioration.", 
                en: "When any friendly unit in the squad attacks and hits an enemy, all squad members' ATK increases by [2.5%] for 8s, stacking up to 4 times. The duration of each stack is calculated separately, and each friendly unit can provide 1 stack of the buff." 
            },
            { 
                fr: "Lorsqu'une unité alliée de l'escouade attaque et touche un ennemi, l'ATQ de tous les membres de l'escouade augmente de [2,9 %] pendant 8s (cumulable jusqu'à 4 fois). La durée de chaque cumul est calculée séparément, et chaque unité alliée peut fournir 1 cumul de l'amélioration.", 
                en: "When any friendly unit in the squad attacks and hits an enemy, all squad members' ATK increases by [2.9%] for 8s, stacking up to 4 times. The duration of each stack is calculated separately, and each friendly unit can provide 1 stack of the buff." 
            },
            { 
                fr: "Lorsqu'une unité alliée de l'escouade attaque et touche un ennemi, l'ATQ de tous les membres de l'escouade augmente de [3,2 %] pendant 8s (cumulable jusqu'à 4 fois). La durée de chaque cumul est calculée séparément, et chaque unité alliée peut fournir 1 cumul de l'amélioration.", 
                en: "When any friendly unit in the squad attacks and hits an enemy, all squad members' ATK increases by [3.2%] for 8s, stacking up to 4 times. The duration of each stack is calculated separately, and each friendly unit can provide 1 stack of the buff." 
            },
            { 
                fr: "Lorsqu'une unité alliée de l'escouade attaque et touche un ennemi, l'ATQ de tous les membres de l'escouade augmente de [3,6 %] pendant 8s (cumulable jusqu'à 4 fois). La durée de chaque cumul est calculée séparément, et chaque unité alliée peut fournir 1 cumul de l'amélioration.", 
                en: "When any friendly unit in the squad attacks and hits an enemy, all squad members' ATK increases by [3.6%] for 8s, stacking up to 4 times. The duration of each stack is calculated separately, and each friendly unit can provide 1 stack of the buff." 
            },
            { 
                fr: "Lorsqu'une unité alliée de l'escouade attaque et touche un ennemi, l'ATQ de tous les membres de l'escouade augmente de [4 %] pendant 8s (cumulable jusqu'à 4 fois). La durée de chaque cumul est calculée séparément, et chaque unité alliée peut fournir 1 cumul de l'amélioration.", 
                en: "When any friendly unit in the squad attacks and hits an enemy, all squad members' ATK increases by [4%] for 8s, stacking up to 4 times. The duration of each stack is calculated separately, and each friendly unit can provide 1 stack of the buff." 
            }
        ]
    },
    "Elegant Vanity": {
        name: { fr: "Vanité élégante", en: "Elegant Vanity" },
        rank: "S",
        specialty: "Support",
        img: "W-Engine_Elegant_Vanity.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Beauté secrète", en: "Untold Beauty" },
        overclocks: [
            { 
                fr: "Lorsqu'un membre de l'escouade entre sur le terrain via une {Assistance rapide}, un {Enchaînement}, une {Assistance défensive} ou une {Assistance évasive}, l'équipementier gagne [5] points d'énergie (déclenchement toutes les 5s). Lorsque l'équipementier consomme 25 points d'énergie ou plus, les dégâts de toute l'escouade augmentent de [10 %] (cumulable 2 fois) pendant 20s. Réinitialise la durée à chaque déclenchement.", 
                en: "When any squad member enters the field through a {Quick Assist}, {Chain Attack}, {Defensive Assist} or {Evasive Assist}, the equipper gains [5] Energy. This effect can trigger once every 5s. When the equipper consumes 25 Energy or more, the damage dealt by all squad members increases by [10%], stacking up to 2 times, and lasting 20s. Repeated triggers refresh the duration." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade entre sur le terrain via une {Assistance rapide}, un {Enchaînement}, une {Assistance défensive} ou une {Assistance évasive}, l'équipementier gagne [5,5] points d'énergie (déclenchement toutes les 5s). Lorsque l'équipementier consomme 25 points d'énergie ou plus, les dégâts de toute l'escouade augmentent de [11,5 %] (cumulable 2 fois) pendant 20s. Réinitialise la durée à chaque déclenchement.", 
                en: "When any squad member enters the field through a {Quick Assist}, {Chain Attack}, {Defensive Assist} or {Evasive Assist}, the equipper gains [5.5] Energy. This effect can trigger once every 5s. When the equipper consumes 25 Energy or more, the damage dealt by all squad members increases by [11.5%], stacking up to 2 times, and lasting 20s. Repeated triggers refresh the duration." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade entre sur le terrain via une {Assistance rapide}, un {Enchaînement}, une {Assistance défensive} ou une {Assistance évasive}, l'équipementier gagne [6] points d'énergie (déclenchement toutes les 5s). Lorsque l'équipementier consomme 25 points d'énergie ou plus, les dégâts de toute l'escouade augmentent de [13 %] (cumulable 2 fois) pendant 20s. Réinitialise la durée à chaque déclenchement.", 
                en: "When any squad member enters the field through a {Quick Assist}, {Chain Attack}, {Defensive Assist} or {Evasive Assist}, the equipper gains [6] Energy. This effect can trigger once every 5s. When the equipper consumes 25 Energy or more, the damage dealt by all squad members increases by [13%], stacking up to 2 times, and lasting 20s. Repeated triggers refresh the duration." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade entre sur le terrain via une {Assistance rapide}, un {Enchaînement}, une {Assistance défensive} ou une {Assistance évasive}, l'équipementier gagne [6,5] points d'énergie (déclenchement toutes les 5s). Lorsque l'équipementier consomme 25 points d'énergie ou plus, les dégâts de toute l'escouade augmentent de [14,5 %] (cumulable 2 fois) pendant 20s. Réinitialise la durée à chaque déclenchement.", 
                en: "When any squad member enters the field through a {Quick Assist}, {Chain Attack}, {Defensive Assist} or {Evasive Assist}, the equipper gains [6.5] Energy. This effect can trigger once every 5s. When the equipper consumes 25 Energy or more, the damage dealt by all squad members increases by [14.5%], stacking up to 2 times, and lasting 20s. Repeated triggers refresh the duration." 
            },
            { 
                fr: "Lorsqu'un membre de l'escouade entre sur le terrain via une {Assistance rapide}, un {Enchaînement}, une {Assistance défensive} ou une {Assistance évasive}, l'équipementier gagne [7] points d'énergie (déclenchement toutes les 5s). Lorsque l'équipementier consomme 25 points d'énergie ou plus, les dégâts de toute l'escouade augmentent de [16 %] (cumulable 2 fois) pendant 20s. Réinitialise la durée à chaque déclenchement.", 
                en: "When any squad member enters the field through a {Quick Assist}, {Chain Attack}, {Defensive Assist} or {Evasive Assist}, the equipper gains [7] Energy. This effect can trigger once every 5s. When the equipper consumes 25 Energy or more, the damage dealt by all squad members increases by [16%], stacking up to 2 times, and lasting 20s. Repeated triggers refresh the duration." 
            }
        ]
    },
    "Bashful Demon": {
        name: { fr: "Démon timide", en: "Bashful Demon" },
        rank: "A",
        specialty: "Support",
        element: "Ice",
        img: "W-Engine_Bashful_Demon.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Visage de l'Avarice", en: "Visage of Greed" },
        overclocks: [
            { 
                fr: "Les {DGT de Glace} augmentent de [15 %]. Lors du lancement d'une {Attaque spéciale EX}, l'ATQ de tous les membres de l'escouade augmente de [2 %] pendant 12s (cumulable jusqu'à 4 fois). Déclencher l'effet à nouveau réinitialise sa durée.", 
                en: "Increases {Ice DMG} by [15%]. When launching an {EX Special Attack}, all squad members' ATK increases by [2%] for 12s, stacking up to 4 times. Retriggering refreshes duration." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [17,5 %]. Lors du lancement d'une {Attaque spéciale EX}, l'ATQ de tous les membres de l'escouade augmente de [2,3 %] pendant 12s (cumulable jusqu'à 4 fois). Déclencher l'effet à nouveau réinitialise sa durée.", 
                en: "Increases {Ice DMG} by [17.5%]. When launching an {EX Special Attack}, all squad members' ATK increases by [2.3%] for 12s, stacking up to 4 times. Retriggering refreshes duration." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [20 %]. Lors du lancement d'une {Attaque spéciale EX}, l'ATQ de tous les membres de l'escouade augmente de [2,6 %] pendant 12s (cumulable jusqu'à 4 fois). Déclencher l'effet à nouveau réinitialise sa durée.", 
                en: "Increases {Ice DMG} by [20%]. When launching an {EX Special Attack}, all squad members' ATK increases by [2.6%] for 12s, stacking up to 4 times. Retriggering refreshes duration." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [22,5 %]. Lors du lancement d'une {Attaque spéciale EX}, l'ATQ de tous les membres de l'escouade augmente de [2,9 %] pendant 12s (cumulable jusqu'à 4 fois). Déclencher l'effet à nouveau réinitialise sa durée.", 
                en: "Increases {Ice DMG} by [22.5%]. When launching an {EX Special Attack}, all squad members' ATK increases by [2.9%] for 12s, stacking up to 4 times. Retriggering refreshes duration." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [25 %]. Lors du lancement d'une {Attaque spéciale EX}, l'ATQ de tous les membres de l'escouade augmente de [3,2 %] pendant 12s (cumulable jusqu'à 4 fois). Déclencher l'effet à nouveau réinitialise sa durée.", 
                en: "Increases {Ice DMG} by [25%]. When launching an {EX Special Attack}, all squad members' ATK increases by [3.2%] for 12s, stacking up to 4 times. Retriggering refreshes duration." 
            }
        ]
    },
    "Unfettered Game Ball": {
        name: { fr: "Balle de jeu sans entraves", en: "Unfettered Game Ball" },
        rank: "A",
        specialty: "Support",
        img: "W-Engine_Unfettered_Game_Ball.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "20% - 50%" 
        },
        passiveName: { fr: "Début du jeu !", en: "Game Start!" },
        overclocks: [
            { 
                fr: "Lorsque l'attaque de l'équipementier déclenche un effet de Contre d'Attribut, le Taux CRIT de toutes les unités contre l'ennemi touché augmente de [12 %] pendant 12s.", 
                en: "Whenever the equipper's attack triggers an Attribute Counter effect, all units' CRIT Rate against the struck enemy increases by [12%] for 12s." 
            },
            { 
                fr: "Lorsque l'attaque de l'équipementier déclenche un effet de Contre d'Attribut, le Taux CRIT de toutes les unités contre l'ennemi touché augmente de [13,5 %] pendant 12s.", 
                en: "Whenever the equipper's attack triggers an Attribute Counter effect, all units' CRIT Rate against the struck enemy increases by [13.5%] for 12s." 
            },
            { 
                fr: "Lorsque l'attaque de l'équipementier déclenche un effet de Contre d'Attribut, le Taux CRIT de toutes les unités contre l'ennemi touché augmente de [15 %] pendant 12s.", 
                en: "Whenever the equipper's attack triggers an Attribute Counter effect, all units' CRIT Rate against the struck enemy increases by [15%] for 12s." 
            },
            { 
                fr: "Lorsque l'attaque de l'équipementier déclenche un effet de Contre d'Attribut, le Taux CRIT de toutes les unités contre l'ennemi touché augmente de [17 %] pendant 12s.", 
                en: "Whenever the equipper's attack triggers an Attribute Counter effect, all units' CRIT Rate against the struck enemy increases by [17%] for 12s." 
            },
            { 
                fr: "Lorsque l'attaque de l'équipementier déclenche un effet de Contre d'Attribut, le Taux CRIT de toutes les unités contre l'ennemi touché augmente de [18,5 %] pendant 12s.", 
                en: "Whenever the equipper's attack triggers an Attribute Counter effect, all units' CRIT Rate against the struck enemy increases by [18.5%] for 12s." 
            }
        ]
    },
    "Weeping Cradle": {
        name: { fr: "Berceau en pleurs", en: "Weeping Cradle" },
        rank: "S",
        specialty: "Support",
        img: "W-Engine_Weeping_Cradle.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "Taux de PÉN", en: "PEN Ratio" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Punition", en: "Punishment" },
        overclocks: [
            { 
                fr: "En dehors du terrain, la Réc. d'énergie augmente de [0,6]/s. Les attaques de l'équipementier augmentent les DGT de toutes les unités contre la cible touchée de [10 %] pendant 3 secondes. Pendant cette période, cet effet augmente de [1,7 %] toutes les 0,5s (max +[10,2 %] supplémentaires). Les déclenchements répétés réinitialisent uniquement la durée.", 
                en: "While off-field, Energy Regen increases by [0.6]/s. Attacks from the equipper increase all units' DMG against a struck target by [10%] for 3 seconds. During this period, this effect is further increased by [1.7%] every 0.5s, up to a maximum additional increase of [10.2%]. Repeated triggers only refresh its duration without refreshing the DMG increase effect." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie augmente de [0,7]/s. Les attaques de l'équipementier augmentent les DGT de toutes les unités contre la cible touchée de [11,5 %] pendant 3 secondes. Pendant cette période, cet effet augmente de [2 %] toutes les 0,5s (max +[12 %] supplémentaires). Les déclenchements répétés réinitialisent uniquement la durée.", 
                en: "While off-field, Energy Regen increases by [0.7]/s. Attacks from the equipper increase all units' DMG against a struck target by [11.5%] for 3 seconds. During this period, this effect is further increased by [2%] every 0.5s, up to a maximum additional increase of [12%]. Repeated triggers only refresh its duration without refreshing the DMG increase effect." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie augmente de [0,8]/s. Les attaques de l'équipementier augmentent les DGT de toutes les unités contre la cible touchée de [13 %] pendant 3 secondes. Pendant cette période, cet effet augmente de [2,2 %] toutes les 0,5s (max +[13,2 %] supplémentaires). Les déclenchements répétés réinitialisent uniquement la durée.", 
                en: "While off-field, Energy Regen increases by [0.8]/s. Attacks from the equipper increase all units' DMG against a struck target by [13%] for 3 seconds. During this period, this effect is further increased by [2.2%] every 0.5s, up to a maximum additional increase of [13.2%]. Repeated triggers only refresh its duration without refreshing the DMG increase effect." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie augmente de [0,9]/s. Les attaques de l'équipementier augmentent les DGT de toutes les unités contre la cible touchée de [14,5 %] pendant 3 secondes. Pendant cette période, cet effet augmente de [2,5 %] toutes les 0,5s (max +[15 %] supplémentaires). Les déclenchements répétés réinitialisent uniquement la durée.", 
                en: "While off-field, Energy Regen increases by [0.9]/s. Attacks from the equipper increase all units' DMG against a struck target by [14.5%] for 3 seconds. During this period, this effect is further increased by [2.5%] every 0.5s, up to a maximum additional increase of [15%]. Repeated triggers only refresh its duration without refreshing the DMG increase effect." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie augmente de [1,0]/s. Les attaques de l'équipementier augmentent les DGT de toutes les unités contre la cible touchée de [16 %] pendant 3 secondes. Pendant cette période, cet effet augmente de [2,8 %] toutes les 0,5s (max +[16,8 %] supplémentaires). Les déclenchements répétés réinitialisent uniquement la durée.", 
                en: "While off-field, Energy Regen increases by [1.0]/s. Attacks from the equipper increase all units' DMG against a struck target by [16%] for 3 seconds. During this period, this effect is further increased by [2.8%] every 0.5s, up to a maximum additional increase of [16.8%]. Repeated triggers only refresh its duration without refreshing the DMG increase effect." 
            }
        ]
    },
    "Slice of Time": {
        name: { fr: "Tranche de temps", en: "Slice of Time" },
        rank: "A",
        specialty: "Support",
        img: "W-Engine_Slice_of_Time.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Taux de PÉN", en: "PEN Ratio" }, 
            advanced: "8% - 20%" 
        },
        passiveName: { fr: "Ouistiti", en: "Say Cheese" },
        overclocks: [
            { 
                fr: "Les {Contres d'esquive}, {Attaques spéciales EX}, {Attaques de soutien} ou {Enchaînements} d'un membre de l'escouade génèrent respectivement [20/25/30/35] Décibels supplémentaires et génèrent [0,7] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s. Le temps de recharge est indépendant pour chaque attaque.", 
                en: "Any squad members' {Dodge Counter}, {EX Special Attack}, {Assist Attack}, or {Chain Attack} respectively generates [20/25/30/35] more Decibels and generates [0.7] Energy for the equipper. This effect can trigger once every 12s. The cooldown for each type of attack is independent of others." 
            },
            { 
                fr: "Les {Contres d'esquive}, {Attaques spéciales EX}, {Attaques de soutien} ou {Enchaînements} d'un membre de l'escouade génèrent respectivement [23/28/34/40] Décibels supplémentaires et génèrent [0,8] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s. Le temps de recharge est indépendant pour chaque attaque.", 
                en: "Any squad members' {Dodge Counter}, {EX Special Attack}, {Assist Attack}, or {Chain Attack} respectively generates [23/28/34/40] more Decibels and generates [0.8] Energy for the equipper. This effect can trigger once every 12s. The cooldown for each type of attack is independent of others." 
            },
            { 
                fr: "Les {Contres d'esquive}, {Attaques spéciales EX}, {Attaques de soutien} ou {Enchaînements} d'un membre de l'escouade génèrent respectivement [26/32/38/45] Décibels supplémentaires et génèrent [0,9] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s. Le temps de recharge est indépendant pour chaque attaque.", 
                en: "Any squad members' {Dodge Counter}, {EX Special Attack}, {Assist Attack}, or {Chain Attack} respectively generates [26/32/38/45] more Decibels and generates [0.9] Energy for the equipper. This effect can trigger once every 12s. The cooldown for each type of attack is independent of others." 
            },
            { 
                fr: "Les {Contres d'esquive}, {Attaques spéciales EX}, {Attaques de soutien} ou {Enchaînements} d'un membre de l'escouade génèrent respectivement [29/36/43/50] Décibels supplémentaires et génèrent [1,0] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s. Le temps de recharge est indépendant pour chaque attaque.", 
                en: "Any squad members' {Dodge Counter}, {EX Special Attack}, {Assist Attack}, or {Chain Attack} respectively generates [29/36/43/50] more Decibels and generates [1.0] Energy for the equipper. This effect can trigger once every 12s. The cooldown for each type of attack is independent of others." 
            },
            { 
                fr: "Les {Contres d'esquive}, {Attaques spéciales EX}, {Attaques de soutien} ou {Enchaînements} d'un membre de l'escouade génèrent respectivement [32/40/48/56] Décibels supplémentaires et génèrent [1,1] points d'énergie pour l'équipementier. Cet effet peut se déclencher une fois toutes les 12s. Le temps de recharge est indépendant pour chaque attaque.", 
                en: "Any squad members' {Dodge Counter}, {EX Special Attack}, {Assist Attack}, or {Chain Attack} respectively generates [32/40/48/56] more Decibels and generates [1.1] Energy for the equipper. This effect can trigger once every 12s. The cooldown for each type of attack is independent of others." 
            }
        ]
    },
    "Reverb - Mark II": {
        name: { fr: "[Réverbération] Mark II", en: "[Reverb] Mark II" },
        rank: "B",
        specialty: "Support",
        img: "Reverb_Mark_II.png",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "16% - 40%" 
        },
        passiveName: { fr: "Vagues rugissantes", en: "Roaring Waves" },
        overclocks: [
            { 
                fr: "Lancer une {Attaque spéciale EX} ou un {Enchaînement} augmente la Maîtrise d'Anomalie et l'Adresse d'Anomalie de tous les membres de l'escouade de [10] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching an {EX Special Attack} or {Chain Attack} increases all squad members' Anomaly Mastery and Anomaly Proficiency by [10] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} ou un {Enchaînement} augmente la Maîtrise d'Anomalie et l'Adresse d'Anomalie de tous les membres de l'escouade de [12] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching an {EX Special Attack} or {Chain Attack} increases all squad members' Anomaly Mastery and Anomaly Proficiency by [12] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} ou un {Enchaînement} augmente la Maîtrise d'Anomalie et l'Adresse d'Anomalie de tous les membres de l'escouade de [13] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching an {EX Special Attack} or {Chain Attack} increases all squad members' Anomaly Mastery and Anomaly Proficiency by [13] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} ou un {Enchaînement} augmente la Maîtrise d'Anomalie et l'Adresse d'Anomalie de tous les membres de l'escouade de [15] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching an {EX Special Attack} or {Chain Attack} increases all squad members' Anomaly Mastery and Anomaly Proficiency by [15] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer une {Attaque spéciale EX} ou un {Enchaînement} augmente la Maîtrise d'Anomalie et l'Adresse d'Anomalie de tous les membres de l'escouade de [16] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching an {EX Special Attack} or {Chain Attack} increases all squad members' Anomaly Mastery and Anomaly Proficiency by [16] for 10s. This effect can trigger once every 20s." 
            }
        ]
    },
    "Reverb - Mark III": {
        name: { fr: "[Réverbération] Mark III", en: "[Reverb] Mark III" },
        rank: "B",
        specialty: "Support",
        img: "Reverb_Mark_III.png",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "PV %", en: "HP %" }, 
            advanced: "8% - 20%" 
        },
        passiveName: { fr: "Son retentissant", en: "Booming Sound" },
        overclocks: [
            { 
                fr: "Lancer un {Enchaînement} ou un {Ultime} augmente l'ATQ de tous les membres de l'escouade de [8 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching a {Chain Attack} or {Ultimate} increases all squad members' ATK by [8%] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer un {Enchaînement} ou un {Ultime} augmente l'ATQ de tous les membres de l'escouade de [9 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching a {Chain Attack} or {Ultimate} increases all squad members' ATK by [9%] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer un {Enchaînement} ou un {Ultime} augmente l'ATQ de tous les membres de l'escouade de [10 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching a {Chain Attack} or {Ultimate} increases all squad members' ATK by [10%] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer un {Enchaînement} ou un {Ultime} augmente l'ATQ de tous les membres de l'escouade de [11 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching a {Chain Attack} or {Ultimate} increases all squad members' ATK by [11%] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Lancer un {Enchaînement} ou un {Ultime} augmente l'ATQ de tous les membres de l'escouade de [12 %] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Launching a {Chain Attack} or {Ultimate} increases all squad members' ATK by [12%] for 10s. This effect can trigger once every 20s." 
            }
        ]
    },
    "Fusion Compiler": {
        name: { fr: "Compilateur de fusion", en: "Fusion Compiler" },
        rank: "S",
        specialty: "Anomaly",
        img: "W-Engine_Fusion_Compiler.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "Taux de PÉN", en: "PEN Ratio" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Déluge de données", en: "Data Flood" },
        overclocks: [
            { 
                fr: "Augmente l'ATQ de [12 %]. Lors de l'utilisation d'une {Attaque spéciale} ou d'une {Attaque spéciale EX}, l'Adresse d'Anomalie de l'équipementier augmente de [25] pendant 8s, cumulable jusqu'à 3 fois. La durée de chaque cumul est calculée séparément.", 
                en: "Increases ATK by [12%]. When using a {Special Attack} or {EX Special Attack}, the equipper's Anomaly Proficiency is increased by [25] for 8s, stacking up to 3 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Augmente l'ATQ de [15 %]. Lors de l'utilisation d'une {Attaque spéciale} ou d'une {Attaque spéciale EX}, l'Adresse d'Anomalie de l'équipementier augmente de [28] pendant 8s, cumulable jusqu'à 3 fois. La durée de chaque cumul est calculée séparément.", 
                en: "Increases ATK by [15%]. When using a {Special Attack} or {EX Special Attack}, the equipper's Anomaly Proficiency is increased by [28] for 8s, stacking up to 3 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Augmente l'ATQ de [18 %]. Lors de l'utilisation d'une {Attaque spéciale} ou d'une {Attaque spéciale EX}, l'Adresse d'Anomalie de l'équipementier augmente de [32] pendant 8s, cumulable jusqu'à 3 fois. La durée de chaque cumul est calculée séparément.", 
                en: "Increases ATK by [18%]. When using a {Special Attack} or {EX Special Attack}, the equipper's Anomaly Proficiency is increased by [32] for 8s, stacking up to 3 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Augmente l'ATQ de [21 %]. Lors de l'utilisation d'une {Attaque spéciale} ou d'une {Attaque spéciale EX}, l'Adresse d'Anomalie de l'équipementier augmente de [35] pendant 8s, cumulable jusqu'à 3 fois. La durée de chaque cumul est calculée séparément.", 
                en: "Increases ATK by [21%]. When using a {Special Attack} or {EX Special Attack}, the equipper's Anomaly Proficiency is increased by [35] for 8s, stacking up to 3 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Augmente l'ATQ de [24 %]. Lors de l'utilisation d'une {Attaque spéciale} ou d'une {Attaque spéciale EX}, l'Adresse d'Anomalie de l'équipementier augmente de [38] pendant 8s, cumulable jusqu'à 3 fois. La durée de chaque cumul est calculée séparément.", 
                en: "Increases ATK by [24%]. When using a {Special Attack} or {EX Special Attack}, the equipper's Anomaly Proficiency is increased by [38] for 8s, stacking up to 3 times. The duration of each stack is calculated separately." 
            }
        ]
    },
    "Timeweaver": {
        name: { fr: "Tisseur de temps", en: "Timeweaver" },
        rank: "S",
        specialty: "Anomaly",
        element: "Electric",
        img: "W-Engine_Timeweaver.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Stratagème dévoreur de temps", en: "Time-Devouring Stratagem" },
        overclocks: [
            { 
                fr: "Le {Taux d'accumulation d'Anomalie Électrique} de l'équipementier augmente de [30 %]. Lorsque des {Attaques spéciales} ou {Attaques spéciales EX} touchent des ennemis subissant une Anomalie d'attribut, l'Adresse d'Anomalie de l'équipementier augmente de [75] pendant 15s. Lorsque l'Adresse d'Anomalie est supérieure ou égale à 375, les DGT de {Désordre} infligés par l'équipementier augmentent de [25 %].", 
                en: "The equipper's {Electric Anomaly Buildup Rate} increases by [30%]. When {Special Attacks} or {EX Special Attacks} hit enemies under Attribute Anomalies, the equipper's Anomaly Proficiency increases by [75] for 15s. When the equipper's Anomaly Proficiency is greater than or equal to 375, {Disorder} DMG inflicted by the equipper increases by [25%]." 
            },
            { 
                fr: "Le {Taux d'accumulation d'Anomalie Électrique} de l'équipementier augmente de [34,5 %]. Lorsque des {Attaques spéciales} ou {Attaques spéciales EX} touchent des ennemis subissant une Anomalie d'attribut, l'Adresse d'Anomalie de l'équipementier augmente de [86] pendant 15s. Lorsque l'Adresse d'Anomalie est supérieure ou égale à 375, les DGT de {Désordre} infligés par l'équipementier augmentent de [28,5 %].", 
                en: "The equipper's {Electric Anomaly Buildup Rate} increases by [34.5%]. When {Special Attacks} or {EX Special Attacks} hit enemies under Attribute Anomalies, the equipper's Anomaly Proficiency increases by [86] for 15s. When the equipper's Anomaly Proficiency is greater than or equal to 375, {Disorder} DMG inflicted by the equipper increases by [28.5%]." 
            },
            { 
                fr: "Le {Taux d'accumulation d'Anomalie Électrique} de l'équipementier augmente de [39 %]. Lorsque des {Attaques spéciales} ou {Attaques spéciales EX} touchent des ennemis subissant une Anomalie d'attribut, l'Adresse d'Anomalie de l'équipementier augmente de [97] pendant 15s. Lorsque l'Adresse d'Anomalie est supérieure ou égale à 375, les DGT de {Désordre} infligés par l'équipementier augmentent de [32 %].", 
                en: "The equipper's {Electric Anomaly Buildup Rate} increases by [39%]. When {Special Attacks} or {EX Special Attacks} hit enemies under Attribute Anomalies, the equipper's Anomaly Proficiency increases by [97] for 15s. When the equipper's Anomaly Proficiency is greater than or equal to 375, {Disorder} DMG inflicted by the equipper increases by [32%]." 
            },
            { 
                fr: "Le {Taux d'accumulation d'Anomalie Électrique} de l'équipementier augmente de [43,5 %]. Lorsque des {Attaques spéciales} ou {Attaques spéciales EX} touchent des ennemis subissant une Anomalie d'attribut, l'Adresse d'Anomalie de l'équipementier augmente de [108] pendant 15s. Lorsque l'Adresse d'Anomalie est supérieure ou égale à 375, les DGT de {Désordre} infligés par l'équipementier augmentent de [35,5 %].", 
                en: "The equipper's {Electric Anomaly Buildup Rate} increases by [43.5%]. When {Special Attacks} or {EX Special Attacks} hit enemies under Attribute Anomalies, the equipper's Anomaly Proficiency increases by [108] for 15s. When the equipper's Anomaly Proficiency is greater than or equal to 375, {Disorder} DMG inflicted by the equipper increases by [35.5%]." 
            },
            { 
                fr: "Le {Taux d'accumulation d'Anomalie Électrique} de l'équipementier augmente de [48 %]. Lorsque des {Attaques spéciales} ou {Attaques spéciales EX} touchent des ennemis subissant une Anomalie d'attribut, l'Adresse d'Anomalie de l'équipementier augmente de [120] pendant 15s. Lorsque l'Adresse d'Anomalie est supérieure ou égale à 375, les DGT de {Désordre} infligés par l'équipementier augmentent de [40 %].", 
                en: "The equipper's {Electric Anomaly Buildup Rate} increases by [48%]. When {Special Attacks} or {EX Special Attacks} hit enemies under Attribute Anomalies, the equipper's Anomaly Proficiency increases by [120] for 15s. When the equipper's Anomaly Proficiency is greater than or equal to 375, {Disorder} DMG inflicted by the equipper increases by [40%]." 
            }
        ]
    },
    "Magnetic Storm - Alpha": {
        name: { fr: "[Tempête Magnétique] Alpha", en: "[Magnetic Storm] Alpha" },
        rank: "B",
        specialty: "Anomaly",
        img: "Magnetic_Storm_Alpha.png",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "8% - 20%" 
        },
        passiveName: { fr: "Courant désordonné", en: "Disordered Current" },
        overclocks: [
            { 
                fr: "Accumuler de l'{Accumulation d'Anomalie} augmente la Maîtrise d'Anomalie de l'équipementier de [25] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Accumulating {Anomaly Buildup} increases the equipper's Anomaly Mastery by [25] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Accumuler de l'{Accumulation d'Anomalie} augmente la Maîtrise d'Anomalie de l'équipementier de [29] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Accumulating {Anomaly Buildup} increases the equipper's Anomaly Mastery by [29] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Accumuler de l'{Accumulation d'Anomalie} augmente la Maîtrise d'Anomalie de l'équipementier de [32] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Accumulating {Anomaly Buildup} increases the equipper's Anomaly Mastery by [32] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Accumuler de l'{Accumulation d'Anomalie} augmente la Maîtrise d'Anomalie de l'équipementier de [36] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Accumulating {Anomaly Buildup} increases the equipper's Anomaly Mastery by [36] for 10s. This effect can trigger once every 20s." 
            },
            { 
                fr: "Accumuler de l'{Accumulation d'Anomalie} augmente la Maîtrise d'Anomalie de l'équipementier de [40] pendant 10s. Cet effet peut se déclencher une fois toutes les 20s.", 
                en: "Accumulating {Anomaly Buildup} increases the equipper's Anomaly Mastery by [40] for 10s. This effect can trigger once every 20s." 
            }
        ]
    },
    "Hellfire Gears": {
        name: { fr: "Engrenages des flammes infernales", en: "Hellfire Gears" },
        rank: "S",
        specialty: "Stun",
        element: "Fire",
        img: "W-Engine_Hellfire_Gears.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "7.2% - 18%" 
        },
        passiveName: { fr: "Construction passionnée", en: "Passionate Construction" },
        overclocks: [
            { 
                fr: "En dehors du terrain, la Réc. d'énergie de l'équipementier augmente de [0,6]/s. Lors de l'utilisation d'une {Attaque spéciale EX}, l'Impact de l'équipementier augmente de [10 %] pendant 10s, cumulable jusqu'à 2 fois. La durée de chaque cumul est calculée séparément.", 
                en: "While off-field, the equipper's Energy Regen increases by [0.6]/s. When using an {EX Special Attack}, the equipper's Impact is increased by [10%] for 10s, stacking up to 2 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie de l'équipementier augmente de [0,7]/s. Lors de l'utilisation d'une {Attaque spéciale EX}, l'Impact de l'équipementier augmente de [11,5 %] pendant 10s, cumulable jusqu'à 2 fois. La durée de chaque cumul est calculée séparément.", 
                en: "While off-field, the equipper's Energy Regen increases by [0.7]/s. When using an {EX Special Attack}, the equipper's Impact is increased by [11.5%] for 10s, stacking up to 2 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie de l'équipementier augmente de [0,8]/s. Lors de l'utilisation d'une {Attaque spéciale EX}, l'Impact de l'équipementier augmente de [13 %] pendant 10s, cumulable jusqu'à 2 fois. La durée de chaque cumul est calculée séparément.", 
                en: "While off-field, the equipper's Energy Regen increases by [0.8]/s. When using an {EX Special Attack}, the equipper's Impact is increased by [13%] for 10s, stacking up to 2 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie de l'équipementier augmente de [0,9]/s. Lors de l'utilisation d'une {Attaque spéciale EX}, l'Impact de l'équipementier augmente de [14,5 %] pendant 10s, cumulable jusqu'à 2 fois. La durée de chaque cumul est calculée séparément.", 
                en: "While off-field, the equipper's Energy Regen increases by [0.9]/s. When using an {EX Special Attack}, the equipper's Impact is increased by [14.5%] for 10s, stacking up to 2 times. The duration of each stack is calculated separately." 
            },
            { 
                fr: "En dehors du terrain, la Réc. d'énergie de l'équipementier augmente de [1,0]/s. Lors de l'utilisation d'une {Attaque spéciale EX}, l'Impact de l'équipementier augmente de [16 %] pendant 10s, cumulable jusqu'à 2 fois. La durée de chaque cumul est calculée séparément.", 
                en: "While off-field, the equipper's Energy Regen increases by [1.0]/s. When using an {EX Special Attack}, the equipper's Impact is increased by [16%] for 10s, stacking up to 2 times. The duration of each stack is calculated separately." 
            }
        ]
    },
    "The Restrained": {
        name: { fr: "Le Restreint", en: "The Restrained" },
        rank: "S",
        specialty: "Stun",
        img: "W-Engine_The_Restrained.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "7.2% - 18%" 
        },
        passiveName: { fr: "Chaînes contraignantes", en: "Binding Chains" },
        overclocks: [
            { 
                fr: "Lorsqu'une attaque touche un ennemi, les DGT et la Stupeur infligés par les {Attaques de base} augmentent de [6 %] pendant 8s, cumulable jusqu'à 5 fois. Cet effet peut se déclencher au maximum une fois pendant chaque compétence. La durée de chaque cumul est calculée séparément.", 
                en: "When an attack hits an enemy, DMG and Daze from {Basic Attacks} increase by [6%] for 8s, stacking up to 5 times. This effect can trigger at most once during each skill. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une attaque touche un ennemi, les DGT et la Stupeur infligés par les {Attaques de base} augmentent de [6,9 %] pendant 8s, cumulable jusqu'à 5 fois. Cet effet peut se déclencher au maximum une fois pendant chaque compétence. La durée de chaque cumul est calculée séparément.", 
                en: "When an attack hits an enemy, DMG and Daze from {Basic Attacks} increase by [6.9%] for 8s, stacking up to 5 times. This effect can trigger at most once during each skill. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une attaque touche un ennemi, les DGT et la Stupeur infligés par les {Attaques de base} augmentent de [7,8 %] pendant 8s, cumulable jusqu'à 5 fois. Cet effet peut se déclencher au maximum une fois pendant chaque compétence. La durée de chaque cumul est calculée séparément.", 
                en: "When an attack hits an enemy, DMG and Daze from {Basic Attacks} increase by [7.8%] for 8s, stacking up to 5 times. This effect can trigger at most once during each skill. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une attaque touche un ennemi, les DGT et la Stupeur infligés par les {Attaques de base} augmentent de [8,7 %] pendant 8s, cumulable jusqu'à 5 fois. Cet effet peut se déclencher au maximum une fois pendant chaque compétence. La durée de chaque cumul est calculée séparément.", 
                en: "When an attack hits an enemy, DMG and Daze from {Basic Attacks} increase by [8.7%] for 8s, stacking up to 5 times. This effect can trigger at most once during each skill. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une attaque touche un ennemi, les DGT et la Stupeur infligés par les {Attaques de base} augmentent de [9,6 %] pendant 8s, cumulable jusqu'à 5 fois. Cet effet peut se déclencher au maximum une fois pendant chaque compétence. La durée de chaque cumul est calculée séparément.", 
                en: "When an attack hits an enemy, DMG and Daze from {Basic Attacks} increase by [9.6%] for 8s, stacking up to 5 times. This effect can trigger at most once during each skill. The duration of each stack is calculated separately." 
            }
        ]
    },
    "Precious Fossilized Core": {
        name: { fr: "Noyau fossilisé précieux", en: "Precious Fossilized Core" },
        rank: "A",
        specialty: "Stun",
        img: "W-Engine_Precious_Fossilized.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "6% - 15%" 
        },
        passiveName: { fr: "Chasseur de Béhémoth", en: "Behemoth Hunter" },
        overclocks: [
            { 
                fr: "Lorsque les PV de la cible ne sont pas inférieurs à 50 %, l'équipementier inflige [10 %] de Stupeur supplémentaire. Lorsque les PV de la cible ne sont pas inférieurs à 75 %, ce bonus est encore amélioré de [10 %].", 
                en: "When the target's HP is no lower than 50%, the equipper inflicts [10%] more Daze. When the target's HP is no lower than 75%, this bonus is further enhanced by [10%]." 
            },
            { 
                fr: "Lorsque les PV de la cible ne sont pas inférieurs à 50 %, l'équipementier inflige [11,5 %] de Stupeur supplémentaire. Lorsque les PV de la cible ne sont pas inférieurs à 75 %, ce bonus est encore amélioré de [11,5 %].", 
                en: "When the target's HP is no lower than 50%, the equipper inflicts [11.5%] more Daze. When the target's HP is no lower than 75%, this bonus is further enhanced by [11.5%]." 
            },
            { 
                fr: "Lorsque les PV de la cible ne sont pas inférieurs à 50 %, l'équipementier inflige [13 %] de Stupeur supplémentaire. Lorsque les PV de la cible ne sont pas inférieurs à 75 %, ce bonus est encore amélioré de [13 %].", 
                en: "When the target's HP is no lower than 50%, the equipper inflicts [13%] more Daze. When the target's HP is no lower than 75%, this bonus is further enhanced by [13%]." 
            },
            { 
                fr: "Lorsque les PV de la cible ne sont pas inférieurs à 50 %, l'équipementier inflige [14,5 %] de Stupeur supplémentaire. Lorsque les PV de la cible ne sont pas inférieurs à 75 %, ce bonus est encore amélioré de [14,5 %].", 
                en: "When the target's HP is no lower than 50%, the equipper inflicts [14.5%] more Daze. When the target's HP is no lower than 75%, this bonus is further enhanced by [14.5%]." 
            },
            { 
                fr: "Lorsque les PV de la cible ne sont pas inférieurs à 50 %, l'équipementier inflige [16 %] de Stupeur supplémentaire. Lorsque les PV de la cible ne sont pas inférieurs à 75 %, ce bonus est encore amélioré de [16 %].", 
                en: "When the target's HP is no lower than 50%, the equipper inflicts [16%] more Daze. When the target's HP is no lower than 75%, this bonus is further enhanced by [16%]." 
            }
        ]
    },
    "Six Shooter": {
        name: { fr: "Six coups", en: "Six Shooter" },
        rank: "A",
        specialty: "Stun",
        img: "W-Engine_Six_Shooter.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "6% - 15%" 
        },
        passiveName: { fr: "Feu !", en: "Fire!" },
        overclocks: [
            { 
                fr: "L'équipementier gagne 1 cumul de Charge toutes les 3s, cumulable jusqu'à 6 fois. Lors du lancement d'une {Attaque spéciale EX}, consomme tous les cumuls de Charge et chaque cumul consommé augmente la Stupeur infligée par la compétence de [4 %].", 
                en: "The equipper gains 1 Charge stack every 3s, stacking up to 6 times. When launching an {EX Special Attack}, consumes all Charge stacks and each stack consumed increases the skill's Daze inflicted by [4%]." 
            },
            { 
                fr: "L'équipementier gagne 1 cumul de Charge toutes les 3s, cumulable jusqu'à 6 fois. Lors du lancement d'une {Attaque spéciale EX}, consomme tous les cumuls de Charge et chaque cumul consommé augmente la Stupeur infligée par la compétence de [4,6 %].", 
                en: "The equipper gains 1 Charge stack every 3s, stacking up to 6 times. When launching an {EX Special Attack}, consumes all Charge stacks and each stack consumed increases the skill's Daze inflicted by [4.6%]." 
            },
            { 
                fr: "L'équipementier gagne 1 cumul de Charge toutes les 3s, cumulable jusqu'à 6 fois. Lors du lancement d'une {Attaque spéciale EX}, consomme tous les cumuls de Charge et chaque cumul consommé augmente la Stupeur infligée par la compétence de [5,2 %].", 
                en: "The equipper gains 1 Charge stack every 3s, stacking up to 6 times. When launching an {EX Special Attack}, consumes all Charge stacks and each stack consumed increases the skill's Daze inflicted by [5.2%]." 
            },
            { 
                fr: "L'équipementier gagne 1 cumul de Charge toutes les 3s, cumulable jusqu'à 6 fois. Lors du lancement d'une {Attaque spéciale EX}, consomme tous les cumuls de Charge et chaque cumul consommé augmente la Stupeur infligée par la compétence de [5,8 %].", 
                en: "The equipper gains 1 Charge stack every 3s, stacking up to 6 times. When launching an {EX Special Attack}, consumes all Charge stacks and each stack consumed increases the skill's Daze inflicted by [5.8%]." 
            },
            { 
                fr: "L'équipementier gagne 1 cumul de Charge toutes les 3s, cumulable jusqu'à 6 fois. Lors du lancement d'une {Attaque spéciale EX}, consomme tous les cumuls de Charge et chaque cumul consommé augmente la Stupeur infligée par la compétence de [6,4 %].", 
                en: "The equipper gains 1 Charge stack every 3s, stacking up to 6 times. When launching an {EX Special Attack}, consumes all Charge stacks and each stack consumed increases the skill's Daze inflicted by [6.4%]." 
            }
        ]
    },
    "Heartstring Nocturne": {
        name: { fr: "Nocturne des cordes du cœur", en: "Heartstring Nocturne" },
        rank: "S",
        specialty: "Attack",
        element: "Fire",
        img: "W-Engine_Heartstring_Nocturne.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Corde et Mélodie", en: "String & Melody" },
        overclocks: [
            { 
                fr: "Les DGT CRIT augmentent de [50 %]. Lorsque l'équipementier entre sur le champ de bataille, ou active un {Enchaînement} ou un {Ultime}, il gagne 1 cumul de {Corde sensible}. Chaque cumul de {Corde sensible} permet à l'{Enchaînement} et à l'{Ultime} de l'équipementier d'ignorer [12,5 %] de la {RÉS Feu} de la cible, cumulable jusqu'à 2 fois et d'une durée de 30s. Les déclenchements répétés réinitialisent la durée.", 
                en: "CRIT DMG increases by [50%]. When the equipper enters the battlefield, or activates a {Chain Attack} or {Ultimate}, they gain 1 stack of {Heartstring}. Each stack of {Heartstring} allows the equipper's {Chain Attack} and {Ultimate} to ignore [12.5%] of the target's {Fire RES}, stacking up to 2 times and lasting 30s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT CRIT augmentent de [57,5 %]. Lorsque l'équipementier entre sur le champ de bataille, ou active un {Enchaînement} ou un {Ultime}, il gagne 1 cumul de {Corde sensible}. Chaque cumul de {Corde sensible} permet à l'{Enchaînement} et à l'{Ultime} de l'équipementier d'ignorer [14,4 %] de la {RÉS Feu} de la cible, cumulable jusqu'à 2 fois et d'une durée de 30s. Les déclenchements répétés réinitialisent la durée.", 
                en: "CRIT DMG increases by [57.5%]. When the equipper enters the battlefield, or activates a {Chain Attack} or {Ultimate}, they gain 1 stack of {Heartstring}. Each stack of {Heartstring} allows the equipper's {Chain Attack} and {Ultimate} to ignore [14.4%] of the target's {Fire RES}, stacking up to 2 times and lasting 30s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT CRIT augmentent de [65 %]. Lorsque l'équipementier entre sur le champ de bataille, ou active un {Enchaînement} ou un {Ultime}, il gagne 1 cumul de {Corde sensible}. Chaque cumul de {Corde sensible} permet à l'{Enchaînement} et à l'{Ultime} de l'équipementier d'ignorer [16,2 %] de la {RÉS Feu} de la cible, cumulable jusqu'à 2 fois et d'une durée de 30s. Les déclenchements répétés réinitialisent la durée.", 
                en: "CRIT DMG increases by [65%]. When the equipper enters the battlefield, or activates a {Chain Attack} or {Ultimate}, they gain 1 stack of {Heartstring}. Each stack of {Heartstring} allows the equipper's {Chain Attack} and {Ultimate} to ignore [16.2%] of the target's {Fire RES}, stacking up to 2 times and lasting 30s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT CRIT augmentent de [72,5 %]. Lorsque l'équipementier entre sur le champ de bataille, ou active un {Enchaînement} ou un {Ultime}, il gagne 1 cumul de {Corde sensible}. Chaque cumul de {Corde sensible} permet à l'{Enchaînement} et à l'{Ultime} de l'équipementier d'ignorer [18,1 %] de la {RÉS Feu} de la cible, cumulable jusqu'à 2 fois et d'une durée de 30s. Les déclenchements répétés réinitialisent la durée.", 
                en: "CRIT DMG increases by [72.5%]. When the equipper enters the battlefield, or activates a {Chain Attack} or {Ultimate}, they gain 1 stack of {Heartstring}. Each stack of {Heartstring} allows the equipper's {Chain Attack} and {Ultimate} to ignore [18.1%] of the target's {Fire RES}, stacking up to 2 times and lasting 30s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT CRIT augmentent de [80 %]. Lorsque l'équipementier entre sur le champ de bataille, ou active un {Enchaînement} ou un {Ultime}, il gagne 1 cumul de {Corde sensible}. Chaque cumul de {Corde sensible} permet à l'{Enchaînement} et à l'{Ultime} de l'équipementier d'ignorer [20 %] de la {RÉS Feu} de la cible, cumulable jusqu'à 2 fois et d'une durée de 30s. Les déclenchements répétés réinitialisent la durée.", 
                en: "CRIT DMG increases by [80%]. When the equipper enters the battlefield, or activates a {Chain Attack} or {Ultimate}, they gain 1 stack of {Heartstring}. Each stack of {Heartstring} allows the equipper's {Chain Attack} and {Ultimate} to ignore [20%] of the target's {Fire RES}, stacking up to 2 times and lasting 30s. Repeated triggers reset the duration." 
            }
        ]
    },
    "Cordis Germina": {
        name: { fr: "Cordis Germina", en: "Cordis Germina" },
        rank: "S",
        specialty: "Attack",
        element: "Electric",
        img: "W-Engine_Cordis_Germina.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Noyau bourgeonnant", en: "Sprouting Core" },
        overclocks: [
            { 
                fr: "Augmente le Taux CRIT de [15 %]. Lorsque l'équipementier inflige des DGT avec une {Attaque de base} ou une {Attaque spéciale EX}, il gagne 1 cumul d'amélioration. Chaque cumul augmente les {DGT Électriques} de l'équipementier de [12,5 %], jusqu'à 2 cumuls. Chaque cumul dure 40s et sa durée est calculée séparément. Ne peut se déclencher qu'une fois par utilisation d'une compétence. À 2 cumuls, les DGT de l'{Attaque de base} et de l'{Ultime} du porteur ignorent [20 %] de la DÉF ennemie.", 
                en: "Increases CRIT Rate by [15%]. When the equipper deals DMG with a {Basic Attack} or {EX Special Attack}, they gain 1 stack of a buff. Each stack increases the equipper's {Electric DMG} by [12.5%], up to 2 stacks. Each stack lasts 40s. The duration of each stack is calculated separately. Can trigger once per use of a skill. At 2 stacks, the wearer's {Basic Attack} and {Ultimate} DMG ignore [20%] of enemy DEF." 
            },
            { 
                fr: "Augmente le Taux CRIT de [17,3 %]. Lorsque l'équipementier inflige des DGT avec une {Attaque de base} ou une {Attaque spéciale EX}, il gagne 1 cumul d'amélioration. Chaque cumul augmente les {DGT Électriques} de l'équipementier de [14,4 %], jusqu'à 2 cumuls. Chaque cumul dure 40s et sa durée est calculée séparément. Ne peut se déclencher qu'une fois par utilisation d'une compétence. À 2 cumuls, les DGT de l'{Attaque de base} et de l'{Ultime} du porteur ignorent [23 %] de la DÉF ennemie.", 
                en: "Increases CRIT Rate by [17.3%]. When the equipper deals DMG with a {Basic Attack} or {EX Special Attack}, they gain 1 stack of a buff. Each stack increases the equipper's {Electric DMG} by [14.4%], up to 2 stacks. Each stack lasts 40s. The duration of each stack is calculated separately. Can trigger once per use of a skill. At 2 stacks, the wearer's {Basic Attack} and {Ultimate} DMG ignore [23%] of enemy DEF." 
            },
            { 
                fr: "Augmente le Taux CRIT de [19,5 %]. Lorsque l'équipementier inflige des DGT avec une {Attaque de base} ou une {Attaque spéciale EX}, il gagne 1 cumul d'amélioration. Chaque cumul augmente les {DGT Électriques} de l'équipementier de [16,2 %], jusqu'à 2 cumuls. Chaque cumul dure 40s et sa durée est calculée séparément. Ne peut se déclencher qu'une fois par utilisation d'une compétence. À 2 cumuls, les DGT de l'{Attaque de base} et de l'{Ultime} du porteur ignorent [26 %] de la DÉF ennemie.", 
                en: "Increases CRIT Rate by [19.5%]. When the equipper deals DMG with a {Basic Attack} or {EX Special Attack}, they gain 1 stack of a buff. Each stack increases the equipper's {Electric DMG} by [16.2%], up to 2 stacks. Each stack lasts 40s. The duration of each stack is calculated separately. Can trigger once per use of a skill. At 2 stacks, the wearer's {Basic Attack} and {Ultimate} DMG ignore [26%] of enemy DEF." 
            },
            { 
                fr: "Augmente le Taux CRIT de [21,8 %]. Lorsque l'équipementier inflige des DGT avec une {Attaque de base} ou une {Attaque spéciale EX}, il gagne 1 cumul d'amélioration. Chaque cumul augmente les {DGT Électriques} de l'équipementier de [18,1 %], jusqu'à 2 cumuls. Chaque cumul dure 40s et sa durée est calculée séparément. Ne peut se déclencher qu'une fois par utilisation d'une compétence. À 2 cumuls, les DGT de l'{Attaque de base} et de l'{Ultime} du porteur ignorent [29 %] de la DÉF ennemie.", 
                en: "Increases CRIT Rate by [21.8%]. When the equipper deals DMG with a {Basic Attack} or {EX Special Attack}, they gain 1 stack of a buff. Each stack increases the equipper's {Electric DMG} by [18.1%], up to 2 stacks. Each stack lasts 40s. The duration of each stack is calculated separately. Can trigger once per use of a skill. At 2 stacks, the wearer's {Basic Attack} and {Ultimate} DMG ignore [29%] of enemy DEF." 
            },
            { 
                fr: "Augmente le Taux CRIT de [24 %]. Lorsque l'équipementier inflige des DGT avec une {Attaque de base} ou une {Attaque spéciale EX}, il gagne 1 cumul d'amélioration. Chaque cumul augmente les {DGT Électriques} de l'équipementier de [20 %], jusqu'à 2 cumuls. Chaque cumul dure 40s et sa durée est calculée séparément. Ne peut se déclencher qu'une fois par utilisation d'une compétence. À 2 cumuls, les DGT de l'{Attaque de base} et de l'{Ultime} du porteur ignorent [32 %] de la DÉF ennemie.", 
                en: "Increases CRIT Rate by [24%]. When the equipper deals DMG with a {Basic Attack} or {EX Special Attack}, they gain 1 stack of a buff. Each stack increases the equipper's {Electric DMG} by [20%], up to 2 stacks. Each stack lasts 40s. The duration of each stack is calculated separately. Can trigger once per use of a skill. At 2 stacks, the wearer's {Basic Attack} and {Ultimate} DMG ignore [32%] of enemy DEF." 
            }
        ]
    },
    "Myriad Eclipse": {
        name: { fr: "Éclipse de la myriade", en: "Myriad Eclipse" },
        rank: "S",
        specialty: "Attack",
        element: "Ice",
        img: "W-Engine_Myriad_Eclipse.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Fausses personnalités", en: "False Personas" },
        overclocks: [
            { 
                fr: "Augmente les DGT CRIT de [45 %]. Lors de l'utilisation d'une {Attaque spéciale EX}, d'un {Enchaînement} ou d'un {Ultime} pour infliger des {DGT de Glace}, l'équipementier gagne l'effet {Peine de mort du zéro absolu} pendant 3s. Tant que {Peine de mort du zéro absolu} est actif, le personnage ignore [25 %] de la DÉF de l'ennemi lorsqu'il réussit un coup.", 
                en: "Increases CRIT DMG by [45%]. When using an {EX Special Attack}, {Chain Attack}, or {Ultimate} to deal {Ice DMG}, the equipper gains the {Absolute Zero Death Sentence} effect for 3s. While {Absolute Zero Death Sentence} is active, the character ignores [25%] of the enemy's DEF when landing a hit." 
            },
            { 
                fr: "Augmente les DGT CRIT de [51,8 %]. Lors de l'utilisation d'une {Attaque spéciale EX}, d'un {Enchaînement} ou d'un {Ultime} pour infliger des {DGT de Glace}, l'équipementier gagne l'effet {Peine de mort du zéro absolu} pendant 3s. Tant que {Peine de mort du zéro absolu} est actif, le personnage ignore [28,5 %] de la DÉF de l'ennemi lorsqu'il réussit un coup.", 
                en: "Increases CRIT DMG by [51.8%]. When using an {EX Special Attack}, {Chain Attack}, or {Ultimate} to deal {Ice DMG}, the equipper gains the {Absolute Zero Death Sentence} effect for 3s. While {Absolute Zero Death Sentence} is active, the character ignores [28.5%] of the enemy's DEF when landing a hit." 
            },
            { 
                fr: "Augmente les DGT CRIT de [58,5 %]. Lors de l'utilisation d'une {Attaque spéciale EX}, d'un {Enchaînement} ou d'un {Ultime} pour infliger des {DGT de Glace}, l'équipementier gagne l'effet {Peine de mort du zéro absolu} pendant 3s. Tant que {Peine de mort du zéro absolu} est actif, le personnage ignore [32 %] de la DÉF de l'ennemi lorsqu'il réussit un coup.", 
                en: "Increases CRIT DMG by [58.5%]. When using an {EX Special Attack}, {Chain Attack}, or {Ultimate} to deal {Ice DMG}, the equipper gains the {Absolute Zero Death Sentence} effect for 3s. While {Absolute Zero Death Sentence} is active, the character ignores [32%] of the enemy's DEF when landing a hit." 
            },
            { 
                fr: "Augmente les DGT CRIT de [65,3 %]. Lors de l'utilisation d'une {Attaque spéciale EX}, d'un {Enchaînement} ou d'un {Ultime} pour infliger des {DGT de Glace}, l'équipementier gagne l'effet {Peine de mort du zéro absolu} pendant 3s. Tant que {Peine de mort du zéro absolu} est actif, le personnage ignore [35,5 %] de la DÉF de l'ennemi lorsqu'il réussit un coup.", 
                en: "Increases CRIT DMG by [65.3%]. When using an {EX Special Attack}, {Chain Attack}, or {Ultimate} to deal {Ice DMG}, the equipper gains the {Absolute Zero Death Sentence} effect for 3s. While {Absolute Zero Death Sentence} is active, the character ignores [35.5%] of the enemy's DEF when landing a hit." 
            },
            { 
                fr: "Augmente les DGT CRIT de [72 %]. Lors de l'utilisation d'une {Attaque spéciale EX}, d'un {Enchaînement} ou d'un {Ultime} pour infliger des {DGT de Glace}, l'équipementier gagne l'effet {Peine de mort du zéro absolu} pendant 3s. Tant que {Peine de mort du zéro absolu} est actif, le personnage ignore [40 %] de la DÉF de l'ennemi lorsqu'il réussit un coup.", 
                en: "Increases CRIT DMG by [72%]. When using an {EX Special Attack}, {Chain Attack}, or {Ultimate} to deal {Ice DMG}, the equipper gains the {Absolute Zero Death Sentence} effect for 3s. While {Absolute Zero Death Sentence} is active, the character ignores [40%] of the enemy's DEF when landing a hit." 
            }
        ]
    },
    "The Brimstone": {
        name: { fr: "Le Soufre", en: "The Brimstone" },
        rank: "S",
        specialty: "Attack",
        element: "Fire",
        img: "W-Engine_The_Brimstone.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Souffle brûlant", en: "Scorching Breath" },
        overclocks: [
            { 
                fr: "Lorsqu'une {Attaque de base}, une {Attaque bondissante} ou un {Contre d'esquive} touche un ennemi, l'ATQ de l'équipementier augmente de [3,5 %] pendant 8s, cumulable jusqu'à 8 fois. Cet effet peut se déclencher une fois toutes les 0,5s. La durée de chaque cumul est calculée séparément.", 
                en: "Upon hitting an enemy with a {Basic Attack}, {Dash Attack}, or {Dodge Counter}, the equipper's ATK increases by [3.5%] for 8s, stacking up to 8 times. This effect can trigger once every 0.5s. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base}, une {Attaque bondissante} ou un {Contre d'esquive} touche un ennemi, l'ATQ de l'équipementier augmente de [4,4 %] pendant 8s, cumulable jusqu'à 8 fois. Cet effet peut se déclencher une fois toutes les 0,5s. La durée de chaque cumul est calculée séparément.", 
                en: "Upon hitting an enemy with a {Basic Attack}, {Dash Attack}, or {Dodge Counter}, the equipper's ATK increases by [4.4%] for 8s, stacking up to 8 times. This effect can trigger once every 0.5s. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base}, une {Attaque bondissante} ou un {Contre d'esquive} touche un ennemi, l'ATQ de l'équipementier augmente de [5,2 %] pendant 8s, cumulable jusqu'à 8 fois. Cet effet peut se déclencher une fois toutes les 0,5s. La durée de chaque cumul est calculée séparément.", 
                en: "Upon hitting an enemy with a {Basic Attack}, {Dash Attack}, or {Dodge Counter}, the equipper's ATK increases by [5.2%] for 8s, stacking up to 8 times. This effect can trigger once every 0.5s. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base}, une {Attaque bondissante} ou un {Contre d'esquive} touche un ennemi, l'ATQ de l'équipementier augmente de [6 %] pendant 8s, cumulable jusqu'à 8 fois. Cet effet peut se déclencher une fois toutes les 0,5s. La durée de chaque cumul est calculée séparément.", 
                en: "Upon hitting an enemy with a {Basic Attack}, {Dash Attack}, or {Dodge Counter}, the equipper's ATK increases by [6%] for 8s, stacking up to 8 times. This effect can trigger once every 0.5s. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base}, une {Attaque bondissante} ou un {Contre d'esquive} touche un ennemi, l'ATQ de l'équipementier augmente de [7 %] pendant 8s, cumulable jusqu'à 8 fois. Cet effet peut se déclencher une fois toutes les 0,5s. La durée de chaque cumul est calculée séparément.", 
                en: "Upon hitting an enemy with a {Basic Attack}, {Dash Attack}, or {Dodge Counter}, the equipper's ATK increases by [7%] for 8s, stacking up to 8 times. This effect can trigger once every 0.5s. The duration of each stack is calculated separately." 
            }
        ]
    },
    "Starlight Engine": {
        name: { fr: "Moteur Starlight", en: "Starlight Engine" },
        rank: "A",
        specialty: "Attack",
        img: "Starlight_Engine.webp",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Combo de chevalier", en: "Knight's Combo" },
        overclocks: [
            { 
                fr: "Lancer un {Contre d'esquive} ou une {Assistance rapide} augmente l'ATQ de l'équipementier de [12 %] pendant 12s.", 
                en: "Launching a {Dodge Counter} or {Quick Assist} increases the equipper's ATK by [12%] for 12s." 
            },
            { 
                fr: "Lancer un {Contre d'esquive} ou une {Assistance rapide} augmente l'ATQ de l'équipementier de [13,8 %] pendant 12s.", 
                en: "Launching a {Dodge Counter} or {Quick Assist} increases the equipper's ATK by [13.8%] for 12s." 
            },
            { 
                fr: "Lancer un {Contre d'esquive} ou une {Assistance rapide} augmente l'ATQ de l'équipementier de [15,6 %] pendant 12s.", 
                en: "Launching a {Dodge Counter} or {Quick Assist} increases the equipper's ATK by [15.6%] for 12s." 
            },
            { 
                fr: "Lancer un {Contre d'esquive} ou une {Assistance rapide} augmente l'ATQ de l'équipementier de [17,4 %] pendant 12s.", 
                en: "Launching a {Dodge Counter} or {Quick Assist} increases the equipper's ATK by [17.4%] for 12s." 
            },
            { 
                fr: "Lancer un {Contre d'esquive} ou une {Assistance rapide} augmente l'ATQ de l'équipementier de [19,2 %] pendant 12s.", 
                en: "Launching a {Dodge Counter} or {Quick Assist} increases the equipper's ATK by [19.2%] for 12s." 
            }
        ]
    },
    "Spring Embrace": {
        name: { fr: "Étreinte printanière", en: "Spring Embrace" },
        rank: "A",
        specialty: "Defense",
        img: "W-Engine_Spring_Embrace.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Soupe de source thermale", en: "Hot Spring Soup" },
        overclocks: [
            { 
                fr: "Réduit les DGT subis de [7,5 %]. En subissant une attaque, la {Réc. d'énergie} de l'équipementier augmente de [10 %] pendant 12s. Lorsque l'équipementier quitte le terrain, ce buff est transféré au nouveau personnage déployé et sa durée est réinitialisée. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Reduces DMG taken by [7.5%]. When attacked, the equipper's {Energy Generation Rate} increases by [10%] for 12s. When the equipper switches off-field, this buff will be transferred to the new on-field character with its duration refreshed. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Réduit les DGT subis de [8.5 %]. En subissant une attaque, la {Réc. d'énergie} de l'équipementier augmente de [11,5 %] pendant 12s. Lorsque l'équipementier quitte le terrain, ce buff est transféré au nouveau personnage déployé et sa durée est réinitialisée. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Reduces DMG taken by [8.5%]. When attacked, the equipper's {Energy Generation Rate} increases by [11.5%] for 12s. When the equipper switches off-field, this buff will be transferred to the new on-field character with its duration refreshed. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Réduit les DGT subis de [9.5 %]. En subissant une attaque, la {Réc. d'énergie} de l'équipementier augmente de [13 %] pendant 12s. Lorsque l'équipementier quitte le terrain, ce buff est transféré au nouveau personnage déployé et sa durée est réinitialisée. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Reduces DMG taken by [9.5%]. When attacked, the equipper's {Energy Generation Rate} increases by [13%] for 12s. When the equipper switches off-field, this buff will be transferred to the new on-field character with its duration refreshed. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Réduit les DGT subis de [10.5 %]. En subissant une attaque, la {Réc. d'énergie} de l'équipementier augmente de [14,5 %] pendant 12s. Lorsque l'équipementier quitte le terrain, ce buff est transféré au nouveau personnage déployé et sa durée est réinitialisée. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Reduces DMG taken by [10.5%]. When attacked, the equipper's {Energy Generation Rate} increases by [14.5%] for 12s. When the equipper switches off-field, this buff will be transferred to the new on-field character with its duration refreshed. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Réduit les DGT subis de [12 %]. En subissant une attaque, la {Réc. d'énergie} de l'équipementier augmente de [16 %] pendant 12s. Lorsque l'équipementier quitte le terrain, ce buff est transféré au nouveau personnage déployé et sa durée est réinitialisée. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Reduces DMG taken by [12%]. When attacked, the equipper's {Energy Generation Rate} increases by [16%] for 12s. When the equipper switches off-field, this buff will be transferred to the new on-field character with its duration refreshed. Passive effects of the same name do not stack." 
            }
        ]
    },
    "Original Transmorpher": {
        name: { fr: "Transmorpheur original", en: "Original Transmorpher" },
        rank: "A",
        specialty: "Defense",
        img: "W-Engine_Original_Transmorpher.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "PV %", en: "HP %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Coup de pied volant du Chevalier Starlight", en: "Starlight Knight Flying Kick" },
        overclocks: [
            { 
                fr: "Augmente les PV max de [8 %]. En subissant une attaque, l'{Impact} de l'équipementier augmente de [10 %] pendant 12s.", 
                en: "Increases Max HP by [8%]. When attacked, the equipper's {Impact} is increased by [10%] for 12s." 
            },
            { 
                fr: "Augmente les PV max de [9 %]. En subissant une attaque, l'{Impact} de l'équipementier augmente de [11,5 %] pendant 12s.", 
                en: "Increases Max HP by [9%]. When attacked, the equipper's {Impact} is increased by [11.5%] for 12s." 
            },
            { 
                fr: "Augmente les PV max de [10 %]. En subissant une attaque, l'{Impact} de l'équipementier augmente de [13 %] pendant 12s.", 
                en: "Increases Max HP by [10%]. When attacked, the equipper's {Impact} is increased by [13%] for 12s." 
            },
            { 
                fr: "Augmente les PV max de [11 %]. En subissant une attaque, l'{Impact} de l'équipementier augmente de [14,5 %] pendant 12s.", 
                en: "Increases Max HP by [11%]. When attacked, the equipper's {Impact} is increased by [14.5%] for 12s." 
            },
            { 
                fr: "Augmente les PV max de [12,5 %]. En subissant une attaque, l'{Impact} de l'équipementier augmente de [16 %] pendant 12s.", 
                en: "Increases Max HP by [12.5%]. When attacked, the equipper's {Impact} is increased by [16%] for 12s." 
            }
        ]
    },
    "Big Cylinder": {
        name: { fr: "Gros Cylindre", en: "Big Cylinder" },
        rank: "A",
        specialty: "Defense",
        img: "W-Engine_Big_Cylinder.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "DÉF %", en: "DEF %" }, 
            advanced: "16% - 40%" 
        },
        passiveName: { fr: "Dix Top Dix", en: "Ten Top Ten" },
        overclocks: [
            { 
                fr: "Réduit les DGT subis de [7,5 %]. Après avoir subi une attaque, la prochaine attaque touchant un ennemi déclenchera un coup critique et infligera [600 %] de la DÉF de l'équipementier en DGT supplémentaires. Cet effet peut se déclencher une fois toutes les 7,5s.", 
                en: "Reduces DMG taken by [7.5%]. After being attacked, the next attack to hit an enemy will trigger a critical hit and deal [600%] of the equipper's DEF as additional DMG. This effect can be triggered once every 7.5s." 
            },
            { 
                fr: "Réduit les DGT subis de [8,5 %]. Après avoir subi une attaque, la prochaine attaque touchant un ennemi déclenchera un coup critique et infligera [690 %] de la DÉF de l'équipementier en DGT supplémentaires. Cet effet peut se déclencher une fois toutes les 7,5s.", 
                en: "Reduces DMG taken by [8.5%]. After being attacked, the next attack to hit an enemy will trigger a critical hit and deal [690%] of the equipper's DEF as additional DMG. This effect can be triggered once every 7.5s." 
            },
            { 
                fr: "Réduit les DGT subis de [9,5 %]. Après avoir subi une attaque, la prochaine attaque touchant un ennemi déclenchera un coup critique et infligera [780 %] de la DÉF de l'équipementier en DGT supplémentaires. Cet effet peut se déclencher une fois toutes les 7,5s.", 
                en: "Reduces DMG taken by [9.5%]. After being attacked, the next attack to hit an enemy will trigger a critical hit and deal [780%] of the equipper's DEF as additional DMG. This effect can be triggered once every 7.5s." 
            },
            { 
                fr: "Réduit les DGT subis de [10,5 %]. Après avoir subi une attaque, la prochaine attaque touchant un ennemi déclenchera un coup critique et infligera [870 %] de la DÉF de l'équipementier en DGT supplémentaires. Cet effet peut se déclencher une fois toutes les 7,5s.", 
                en: "Reduces DMG taken by [10.5%]. After being attacked, the next attack to hit an enemy will trigger a critical hit and deal [870%] of the equipper's DEF as additional DMG. This effect can be triggered once every 7.5s." 
            },
            { 
                fr: "Réduit les DGT subis de [10,5 %]. Après avoir subi une attaque, la prochaine attaque touchant un ennemi déclenchera un coup critique et infligera [960 %] de la DÉF de l'équipementier en DGT supplémentaires. Cet effet peut se déclencher une fois toutes les 7,5s.", 
                en: "Reduces DMG taken by [10.5%]. After being attacked, the next attack to hit an enemy will trigger a critical hit and deal [960%] of the equipper's DEF as additional DMG. This effect can be triggered once every 7.5s." 
            }
        ]
    },
    "Identity Base": {
        name: { fr: "Base Identité", en: "Identity Base" },
        rank: "B",
        specialty: "Defense",
        img: "Identity_Base.webp",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "DÉF %", en: "DEF %" }, 
            advanced: "12.8% - 32%" 
        },
        passiveName: { fr: "Frappe naufrageuse", en: "Sinking Strike" },
        overclocks: [
            { 
                fr: "En subissant une attaque, la DÉF de l'équipementier augmente de [20 %] pendant 8s.", 
                en: "When attacked, equipper's DEF increases by [20%] for 8s." 
            },
            { 
                fr: "En subissant une attaque, la DÉF de l'équipementier augmente de [23 %] pendant 8s.", 
                en: "When attacked, equipper's DEF increases by [23%] for 8s." 
            },
            { 
                fr: "En subissant une attaque, la DÉF de l'équipementier augmente de [26 %] pendant 8s.", 
                en: "When attacked, equipper's DEF increases by [26%] for 8s." 
            },
            { 
                fr: "En subissant une attaque, la DÉF de l'équipementier augmente de [29 %] pendant 8s.", 
                en: "When attacked, equipper's DEF increases by [29%] for 8s." 
            },
            { 
                fr: "En subissant une attaque, la DÉF de l'équipementier augmente de [32 %] pendant 8s.", 
                en: "When attacked, equipper's DEF increases by [32%] for 8s." 
            }
        ]
    },
    "Vortex - Arrow": {
        name: { fr: "Flèche Vortex", en: "Vortex Arrow" },
        rank: "B",
        specialty: "Stun",
        img: "Vortex_Arrow.webp",
        stats: { 
            base: "32 - 475", 
            advancedLabel: { fr: "Impact %", en: "Impact %" }, 
            advanced: "4.8% - 12%" 
        },
        passiveName: { fr: "Tsunami", en: "Tsunami" },
        overclocks: [
            { 
                fr: "Les attaques de l'équipementier infligent [8 %] de {Stupeur} supplémentaire à leur cible principale.", 
                en: "The equipper's attacks inflict [8%] more {Daze} on their main target." 
            },
            { 
                fr: "Les attaques de l'équipementier infligent [9 %] de {Stupeur} supplémentaire à leur cible principale.", 
                en: "The equipper's attacks inflict [9%] more {Daze} on their main target." 
            },
            { 
                fr: "Les attaques de l'équipementier infligent [10 %] de {Stupeur} supplémentaire à leur cible principale.", 
                en: "The equipper's attacks inflict [10%] more {Daze} on their main target." 
            },
            { 
                fr: "Les attaques de l'équipementier infligent [11 %] de {Stupeur} supplémentaire à leur cible principale.", 
                en: "The equipper's attacks inflict [11%] more {Daze} on their main target." 
            },
            { 
                fr: "Les attaques de l'équipementier infligent [12 %] de {Stupeur} supplémentaire à leur cible principale.", 
                en: "The equipper's attacks inflict [12%] more {Daze} on their main target." 
            }
        ]
    },
    "Housekeeper": {
        name: { fr: "Gouvernante", en: "Housekeeper" },
        rank: "A",
        specialty: "Attack",
        img: "W-Engine_Housekeeper.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Scie domestique sécurisée", en: "Safe Household Saw" },
        overclocks: [
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,45]/s. Lorsqu'une {Attaque spéciale EX} touche un ennemi, les {DGT Physiques} de l'équipementier augmentent de [3 %], cumulable jusqu'à 15 fois et d'une durée de 1s. Les déclenchements répétés réinitialisent la durée.", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.45]/s. When an {EX Special Attack} hits an enemy, the equipper's {Physical DMG} increases by [3%], stacking up to 15 times and lasting 1s. Repeated triggers reset the duration." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,52]/s. Lorsqu'une {Attaque spéciale EX} touche un ennemi, les {DGT Physiques} de l'équipementier augmentent de [3,5 %], cumulable jusqu'à 15 fois et d'une durée de 1s. Les déclenchements répétés réinitialisent la durée.", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.52]/s. When an {EX Special Attack} hits an enemy, the equipper's {Physical DMG} increases by [3.5%], stacking up to 15 times and lasting 1s. Repeated triggers reset the duration." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,58]/s. Lorsqu'une {Attaque spéciale EX} touche un ennemi, les {DGT Physiques} de l'équipementier augmentent de [4 %], cumulable jusqu'à 15 fois et d'une durée de 1s. Les déclenchements répétés réinitialisent la durée.", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.58]/s. When an {EX Special Attack} hits an enemy, the equipper's {Physical DMG} increases by [4%], stacking up to 15 times and lasting 1s. Repeated triggers reset the duration." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,65]/s. Lorsqu'une {Attaque spéciale EX} touche un ennemi, les {DGT Physiques} de l'équipementier augmentent de [4,4 %], cumulable jusqu'à 15 fois et d'une durée de 1s. Les déclenchements répétés réinitialisent la durée.", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.65]/s. When an {EX Special Attack} hits an enemy, the equipper's {Physical DMG} increases by [4.4%], stacking up to 15 times and lasting 1s. Repeated triggers reset the duration." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,72]/s. Lorsqu'une {Attaque spéciale EX} touche un ennemi, les {DGT Physiques} de l'équipementier augmentent de [4,8 %], cumulable jusqu'à 15 fois et d'une durée de 1s. Les déclenchements répétés réinitialisent la durée.", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.72]/s. When an {EX Special Attack} hits an enemy, the equipper's {Physical DMG} increases by [4.8%], stacking up to 15 times and lasting 1s. Repeated triggers reset the duration." 
            }
        ]
    },
    "Steel Cushion": {
        name: { fr: "Coussin d'acier", en: "Steel Cushion" },
        rank: "S",
        specialty: "Attack",
        element: "Physical",
        img: "W-Engine_Steel_Cushion.png",
        stats: { 
            base: "46 - 684", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Griffes de chat en métal", en: "Metal Cat Claws" },
        overclocks: [
            { 
                fr: "Augmente les {DGT Physiques} de [20 %]. Les DGT de l'équipementier augmentent de [25 %] lorsqu'il attaque l'ennemi par-derrière.", 
                en: "Increases {Physical DMG} by [20%]. The equipper's DMG increases by [25%] when attacking the enemy from behind." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de [25 %]. Les DGT de l'équipementier augmentent de [31,5 %] lorsqu'il attaque l'ennemi par-derrière.", 
                en: "Increases {Physical DMG} by [25%]. The equipper's DMG increases by [31.5%] when attacking the enemy from behind." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de [30 %]. Les DGT de l'équipementier augmentent de [37,5 %] lorsqu'il attaque l'ennemi par-derrière.", 
                en: "Increases {Physical DMG} by [30%]. The equipper's DMG increases by [37.5%] when attacking the enemy from behind." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de [35 %]. Les DGT de l'équipementier augmentent de [44 %] lorsqu'il attaque l'ennemi par-derrière.", 
                en: "Increases {Physical DMG} by [35%]. The equipper's DMG increases by [44%] when attacking the enemy from behind." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de [40 %]. Les DGT de l'équipementier augmentent de [50 %] lorsqu'il attaque l'ennemi par-derrière.", 
                en: "Increases {Physical DMG} by [40%]. The equipper's DMG increases by [50%] when attacking the enemy from behind." 
            }
        ]
    },
    "Cannon Rotor": {
        name: { fr: "Rotor canon", en: "Cannon Rotor" },
        rank: "A",
        specialty: "Attack",
        img: "W-Engine_Cannon_Rotor.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "8% - 20%" 
        },
        passiveName: { fr: "Canon surdimensionné", en: "Oversized Barrel" },
        overclocks: [
            { 
                fr: "Augmente l'ATQ de [7,5 %]. Infliger un coup critique à un ennemi inflige des DGT supplémentaires équivalents à [200 %] de l'ATQ. Cet effet peut se déclencher une fois toutes les 8s.", 
                en: "Increases ATK by [7.5%]. Landing a critical hit on an enemy will inflict an additional [200%] of ATK as DMG. This effect can trigger once every 8s." 
            },
            { 
                fr: "Augmente l'ATQ de [8,6 %]. Infliger un coup critique à un ennemi inflige des DGT supplémentaires équivalents à [230 %] de l'ATQ. Cet effet peut se déclencher une fois toutes les 7.5s.", 
                en: "Increases ATK by [8.6%]. Landing a critical hit on an enemy will inflict an additional [230%] of ATK as DMG. This effect can trigger once every 8s." 
            },
            { 
                fr: "Augmente l'ATQ de [9,7 %]. Infliger un coup critique à un ennemi inflige des DGT supplémentaires équivalents à [260 %] de l'ATQ. Cet effet peut se déclencher une fois toutes les 7s.", 
                en: "Increases ATK by [9.7%]. Landing a critical hit on an enemy will inflict an additional [260%] of ATK as DMG. This effect can trigger once every 7s." 
            },
            { 
                fr: "Augmente l'ATQ de [10,9 %]. Infliger un coup critique à un ennemi inflige des DGT supplémentaires équivalents à [290 %] de l'ATQ. Cet effet peut se déclencher une fois toutes les 6.5s.", 
                en: "Increases ATK by [10.9%]. Landing a critical hit on an enemy will inflict an additional [290%] of ATK as DMG. This effect can trigger once every 6.5s." 
            },
            { 
                fr: "Augmente l'ATQ de [12 %]. Infliger un coup critique à un ennemi inflige des DGT supplémentaires équivalents à [320 %] de l'ATQ. Cet effet peut se déclencher une fois toutes les 6s.", 
                en: "Increases ATK by [12%]. Landing a critical hit on an enemy will inflict an additional [320%] of ATK as DMG. This effect can trigger once every 6s." 
            }
        ]
    },
    "The Vault": {
        name: { fr: "Le Coffre-fort", en: "The Vault" },
        rank: "A",
        specialty: "Support",
        element: "Ether",
        img: "W-Engine_The_Vault.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "20% - 50%" 
        },
        passiveName: { fr: "Appât du gain", en: "Money-Lover" },
        overclocks: [
            { 
                fr: "Infliger des {DGT d'Éther} avec une {Attaque spéciale EX}, un {Enchaînement} ou un {Ultime} augmente les DGT infligés par tous les membres de l'escouade à la cible de [15 %] et augmente la {Réc. d'énergie} de l'équipementier de [0,5]/s pendant 2s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Dealing {Ether DMG} using an {EX Special Attack}, {Chain Attack}, or {Ultimate} increases all units' DMG against the target by [15%] and increases the equipper's {Energy Regen} by [0.5]/s for 2s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Infliger des {DGT d'Éther} avec une {Attaque spéciale EX}, un {Enchaînement} ou un {Ultime} augmente les DGT infligés par tous les membres de l'escouade à la cible de [17,25 %] et augmente la {Réc. d'énergie} de l'équipementier de [0,58]/s pendant 2s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Dealing {Ether DMG} using an {EX Special Attack}, {Chain Attack}, or {Ultimate} increases all units' DMG against the target by [17.25%] and increases the equipper's {Energy Regen} by [0.58]/s for 2s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Infliger des {DGT d'Éther} avec une {Attaque spéciale EX}, un {Enchaînement} ou un {Ultime} augmente les DGT infligés par tous les membres de l'escouade à la cible de [19,5 %] et augmente la {Réc. d'énergie} de l'équipementier de [0,65]/s pendant 2s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Dealing {Ether DMG} using an {EX Special Attack}, {Chain Attack}, or {Ultimate} increases all units' DMG against the target by [19.5%] and increases the equipper's {Energy Regen} by [0.65]/s for 2s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Infliger des {DGT d'Éther} avec une {Attaque spéciale EX}, un {Enchaînement} ou un {Ultime} augmente les DGT infligés par tous les membres de l'escouade à la cible de [21,75 %] et augmente la {Réc. d'énergie} de l'équipementier de [0,72]/s pendant 2s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Dealing {Ether DMG} using an {EX Special Attack}, {Chain Attack}, or {Ultimate} increases all units' DMG against the target by [21.75%] and increases the equipper's {Energy Regen} by [0.72]/s for 2s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Infliger des {DGT d'Éther} avec une {Attaque spéciale EX}, un {Enchaînement} ou un {Ultime} augmente les DGT infligés par tous les membres de l'escouade à la cible de [24 %] et augmente la {Réc. d'énergie} de l'équipementier de [0,8]/s pendant 2s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "Dealing {Ether DMG} using an {EX Special Attack}, {Chain Attack}, or {Ultimate} increases all units' DMG against the target by [24%] and increases the equipper's {Energy Regen} by [0.8]/s for 2s. Passive effects of the same name do not stack." 
            }
        ]
    },
    "Cloudcleave Radiance": {
        name: { fr: "Clarté fendeuse de nuages", en: "Cloudcleave Radiance" },
        rank: "S",
        specialty: "Attack",
        element: "Physical",
        img: "W-Engine_Cloudcleave_Radiance.png",
        stats: { 
            base: "50 - 743", 
            advancedLabel: { fr: "DGT CRIT", en: "CRIT DMG" }, 
            advanced: "19.2% - 48%" 
        },
        passiveName: { fr: "Âme de jade, cœur de glace", en: "Jade Soul, Frozen Heart" },
        overclocks: [
            { 
                fr: "Les DGT de l'équipementier ignorent [20 %] de la {RÉS Physique} de la cible. Lorsque l'équipementier active un {Voile d'éther}, ses DGT augmentent de [25 %] et ses {DGT CRIT} augmentent de [25 %] pendant 40s. Les déclenchements répétés réinitialisent la durée.", 
                en: "The equipper's DMG ignores [20%] of the target's {Physical RES}. When the equipper activates an {Ether Veil}, the equipper's DMG increases by [25%] and {CRIT DMG} increases by [25%] for 40s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT de l'équipementier ignorent [22 %] de la {RÉS Physique} de la cible. Lorsque l'équipementier active un {Voile d'éther}, ses DGT augmentent de [28,75 %] et ses {DGT CRIT} augmentent de [28,75 %] pendant 40s. Les déclenchements répétés réinitialisent la durée.", 
                en: "The equipper's DMG ignores [22%] of the target's {Physical RES}. When the equipper activates an {Ether Veil}, the equipper's DMG increases by [28.75%] and {CRIT DMG} increases by [28.75%] for 40s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT de l'équipementier ignorent [24 %] de la {RÉS Physique} de la cible. Lorsque l'équipementier active un {Voile d'éther}, ses DGT augmentent de [32,5 %] et ses {DGT CRIT} augmentent de [32,5 %] pendant 40s. Les déclenchements répétés réinitialisent la durée.", 
                en: "The equipper's DMG ignores [24%] of the target's {Physical RES}. When the equipper activates an {Ether Veil}, the equipper's DMG increases by [32.5%] and {CRIT DMG} increases by [32.5%] for 40s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT de l'équipementier ignorent [26 %] de la {RÉS Physique} de la cible. Lorsque l'équipementier active un {Voile d'éther}, ses DGT augmentent de [36,25 %] et ses {DGT CRIT} augmentent de [36,25 %] pendant 40s. Les déclenchements répétés réinitialisent la durée.", 
                en: "The equipper's DMG ignores [26%] of the target's {Physical RES}. When the equipper activates an {Ether Veil}, the equipper's DMG increases by [36.25%] and {CRIT DMG} increases by [36.25%] for 40s. Repeated triggers reset the duration." 
            },
            { 
                fr: "Les DGT de l'équipementier ignorent [28 %] de la {RÉS Physique} de la cible. Lorsque l'équipementier active un {Voile d'éther}, ses DGT augmentent de [40 %] et ses {DGT CRIT} augmentent de [40 %] pendant 40s. Les déclenchements répétés réinitialisent la durée.", 
                en: "The equipper's DMG ignores [28%] of the target's {Physical RES}. When the equipper activates an {Ether Veil}, the equipper's DMG increases by [40%] and {CRIT DMG} increases by [40%] for 40s. Repeated triggers reset the duration." 
            }
        ]
    },
    "Starlight Engine Replica": {
        name: { fr: "Réplique du Moteur Starlight", en: "Starlight Engine Replica" },
        rank: "A",
        specialty: "Attack",
        element: "Physical",
        img: "W-Engine_Starlight_Engine_Replica.png",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "ATQ %", en: "ATK %" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Rayon de chevalier : Changement", en: "Knight Beam: Change" },
        overclocks: [
            { 
                fr: "Augmente les {DGT Physiques} de l'équipementier de [36 %] pendant 8s lorsqu'une {Attaque de base} ou une {Attaque bondissante} touche un ennemi situé à au moins 6 mètres.", 
                en: "Increases the equipper's {Physical DMG} by [36%] for 8s upon hitting an enemy at least 6 meters away with a {Basic Attack} or {Dash Attack}." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de l'équipementier de [41,4 %] pendant 8s lorsqu'une {Attaque de base} ou une {Attaque bondissante} touche un ennemi situé à au moins 6 mètres.", 
                en: "Increases the equipper's {Physical DMG} by [41.4%] for 8s upon hitting an enemy at least 6 meters away with a {Basic Attack} or {Dash Attack}." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de l'équipementier de [46,8 %] pendant 8s lorsqu'une {Attaque de base} ou une {Attaque bondissante} touche un ennemi situé à au moins 6 mètres.", 
                en: "Increases the equipper's {Physical DMG} by [46.8%] for 8s upon hitting an enemy at least 6 meters away with a {Basic Attack} or {Dash Attack}." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de l'équipementier de [52,2 %] pendant 8s lorsqu'une {Attaque de base} ou une {Attaque bondissante} touche un ennemi situé à au moins 6 mètres.", 
                en: "Increases the equipper's {Physical DMG} by [52.2%] for 8s upon hitting an enemy at least 6 meters away with a {Basic Attack} or {Dash Attack}." 
            },
            { 
                fr: "Augmente les {DGT Physiques} de l'équipementier de [57,5 %] pendant 8s lorsqu'une {Attaque de base} ou une {Attaque bondissante} touche un ennemi situé à au moins 6 mètres.", 
                en: "Increases the equipper's {Physical DMG} by [57.5%] for 8s upon hitting an enemy at least 6 meters away with a {Basic Attack} or {Dash Attack}." 
            }
        ]
    },
    "Steam Oven": {
        name: { fr: "Four à vapeur", en: "Steam Oven" },
        rank: "A",
        specialty: "Stun",
        img: "W-Engine_Steam_Oven.webp",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Réc. d'énergie", en: "Energy Regen" }, 
            advanced: "20% - 50%" 
        },
        passiveName: { fr: "Bouillon épais", en: "Thick Broth" },
        overclocks: [
            { 
                fr: "Pour chaque tranche de 10 points d'énergie accumulée, l'{Impact} de l'équipementier augmente de [2 %], cumulable jusqu'à 8 fois. Après avoir consommé de l'énergie, ce bonus persiste pendant 8s supplémentaires. La durée de chaque cumul est calculée séparément.", 
                en: "For every 10 Energy accumulated, the equipper's {Impact} is increased by [2%], stacking up to 8 times. After Energy is consumed, this bonus remains for 8 more seconds. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Pour chaque tranche de 10 points d'énergie accumulée, l'{Impact} de l'équipementier augmente de [2,3 %], cumulable jusqu'à 8 fois. Après avoir consommé de l'énergie, ce bonus persiste pendant 8s supplémentaires. La durée de chaque cumul est calculée séparément.", 
                en: "For every 10 Energy accumulated, the equipper's {Impact} is increased by [2.3%], stacking up to 8 times. After Energy is consumed, this bonus remains for 8 more seconds. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Pour chaque tranche de 10 points d'énergie accumulée, l'{Impact} de l'équipementier augmente de [2,6 %], cumulable jusqu'à 8 fois. Après avoir consommé de l'énergie, ce bonus persiste pendant 8s supplémentaires. La durée de chaque cumul est calculée séparément.", 
                en: "For every 10 Energy accumulated, the equipper's {Impact} is increased by [2.6%], stacking up to 8 times. After Energy is consumed, this bonus remains for 8 more seconds. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Pour chaque tranche de 10 points d'énergie accumulée, l'{Impact} de l'équipementier augmente de [2,9 %], cumulable jusqu'à 8 fois. Après avoir consommé de l'énergie, ce bonus persiste pendant 8s supplémentaires. La durée de chaque cumul est calculée séparément.", 
                en: "For every 10 Energy accumulated, the equipper's {Impact} is increased by [2.9%], stacking up to 8 times. After Energy is consumed, this bonus remains for 8 more seconds. The duration of each stack is calculated separately." 
            },
            { 
                fr: "Pour chaque tranche de 10 points d'énergie accumulée, l'{Impact} de l'équipementier augmente de [3,2 %], cumulable jusqu'à 8 fois. Après avoir consommé de l'énergie, ce bonus persiste pendant 8s supplémentaires. La durée de chaque cumul est calculée séparément.", 
                en: "For every 10 Energy accumulated, the equipper's {Impact} is increased by [3.2%], stacking up to 8 times. After Energy is consumed, this bonus remains for 8 more seconds. The duration of each stack is calculated separately." 
            }
        ]
    },
    "Peacekeeper - Specialized": {
        name: { fr: "Pacificateur - Spécialisé", en: "Peacekeeper - Specialized" },
        rank: "A",
        specialty: "Defense",
        img: "W-Engine_Peacekeeper_-_Specialized.webp",
        stats: { 
            base: "42 - 624", 
            advancedLabel: { fr: "ATQ %", en: "ATK" }, 
            advanced: "10% - 25%" 
        },
        passiveName: { fr: "Technique de parade standard", en: "Standard Blocking Technique" },
        overclocks: [
            { 
                fr: "Sous l'effet d'un bouclier, la {Réc. d'énergie} de l'équipementier augmente de [0,4]/s. Le taux d'accumulation d'Anomalie des {Attaques spéciales EX} et des {Attaques d'assistance} augmente de [36 %].", 
                en: "While Shielded, the equipper's {Energy Regen} increases by [0.4]/s. The Anomaly Buildup of {EX Special Attacks} and {Assist Follow-Ups} increases by [36%]." 
            },
            { 
                fr: "Sous l'effet d'un bouclier, la {Réc. d'énergie} de l'équipementier augmente de [0,46]/s. Le taux d'accumulation d'Anomalie des {Attaques spéciales EX} et des {Attaques d'assistance} augmente de [40,75 %].", 
                en: "While Shielded, the equipper's {Energy Regen} increases by [0.46]/s. The Anomaly Buildup of {EX Special Attacks} and {Assist Follow-Ups} increases by [40.75%]." 
            },
            { 
                fr: "Sous l'effet d'un bouclier, la {Réc. d'énergie} de l'équipementier augmente de [0,52]/s. Le taux d'accumulation d'Anomalie des {Attaques spéciales EX} et des {Attaques d'assistance} augmente de [45,5 %].", 
                en: "While Shielded, the equipper's {Energy Regen} increases by [0.52]/s. The Anomaly Buildup of {EX Special Attacks} and {Assist Follow-Ups} increases by [45.5%]." 
            },
            { 
                fr: "Sous l'effet d'un bouclier, la {Réc. d'énergie} de l'équipementier augmente de [0,58]/s. Le taux d'accumulation d'Anomalie des {Attaques spéciales EX} et des {Attaques d'assistance} augmente de [50,25 %].", 
                en: "While Shielded, the equipper's {Energy Regen} increases by [0.58]/s. The Anomaly Buildup of {EX Special Attacks} and {Assist Follow-Ups} increases by [50.25%]." 
            },
            { 
                fr: "Sous l'effet d'un bouclier, la {Réc. d'énergie} de l'équipementier augmente de [0,64]/s. Le taux d'accumulation d'Anomalie des {Attaques spéciales EX} et des {Attaques d'assistance} augmente de [55 %].", 
                en: "While Shielded, the equipper's {Energy Regen} increases by [0.64]/s. The Anomaly Buildup of {EX Special Attacks} and {Assist Follow-Ups} increases by [55%]." 
            }
        ]
    },
    "Bunny Band": {
        name: { fr: "Boule de lapins", en: "Bunny Band" },
        rank: "A",
        specialty: "Defense",
        img: "W-Engine_Bunny_Band.webp",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "DÉF %", en: "DEF %" }, 
            advanced: "16% - 40%" 
        },
        passiveName: { fr: "Caressez le lapin", en: "Pet the Bunny" },
        overclocks: [
            { 
                fr: "Augmente les {PV max} de [8 %]. Augmente l'ATQ de l'équipementier de [10 %] lorsqu'il est sous l'effet d'un bouclier.", 
                en: "Increases {Max HP} by [8%]. Increases the equipper's ATK by [10%] when they are shielded." 
            },
            { 
                fr: "Augmente les {PV max} de [9,2 %]. Augmente l'ATQ de l'équipementier de [11,5 %] lorsqu'il est sous l'effet d'un bouclier.", 
                en: "Increases {Max HP} by [9.2%]. Increases the equipper's ATK by [11.5%] when they are shielded." 
            },
            { 
                fr: "Augmente les {PV max} de [10,4 %]. Augmente l'ATQ de l'équipementier de [13 %] lorsqu'il est sous l'effet d'un bouclier.", 
                en: "Increases {Max HP} by [10.4%]. Increases the equipper's ATK by [13%] when they are shielded." 
            },
            { 
                fr: "Augmente les {PV max} de [11,6 %]. Augmente l'ATQ de l'équipementier de [14,5 %] lorsqu'il est sous l'effet d'un bouclier.", 
                en: "Increases {Max HP} by [11.6%]. Increases the equipper's ATK by [14.5%] when they are shielded." 
            },
            { 
                fr: "Augmente les {PV max} de [12,8 %]. Augmente l'ATQ de l'équipementier de [16 %] lorsqu'il est sous l'effet d'un bouclier.", 
                en: "Increases {Max HP} by [12.8%]. Increases the equipper's ATK by [16%] when they are shielded." 
            }
        ]
    },
    "Deep Sea Visitor": {
        name: { fr: "Visiteur des grands fonds", en: "Deep Sea Visitor" },
        rank: "S",
        specialty: "Attack",
        element: "Ice",
        img: "W-Engine_Deep_Sea_Visitor.webp",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Taux CRIT", en: "CRIT Rate" }, 
            advanced: "9.6% - 24%" 
        },
        passiveName: { fr: "Seigneur des mers", en: "Lord of Seas" },
        overclocks: [
            { 
                fr: "Augmente les {DGT de Glace} de [25 %]. Lorsqu'une {Attaque de base} touche un ennemi, le {Taux CRIT} de l'équipementier augmente de [10 %] pendant 8s. Lorsqu'une {Attaque bondissante} inflige des {DGT de Glace}, le {Taux CRIT} de l'équipementier augmente de [10 %] supplémentaires pendant 15s. La durée de chaque effet est calculée séparément.", 
                en: "Increases {Ice DMG} by [25%]. Upon hitting an enemy with a {Basic Attack}, the equipper's {CRIT Rate} increases by [10%] for 8s. When dealing {Ice DMG} with a {Dash Attack}, the equipper's {CRIT Rate} increases by an additional [10%] for 15s. The duration of each effect is calculated separately." 
            },
            { 
                fr: "Augmente les {DGT de Glace} de [31,5 %]. Lorsqu'une {Attaque de base} touche un ennemi, le {Taux CRIT} de l'équipementier augmente de [12,5 %] pendant 8s. Lorsqu'une {Attaque bondissante} inflige des {DGT de Glace}, le {Taux CRIT} de l'équipementier augmente de [12,5 %] supplémentaires pendant 15s. La durée de chaque effet est calculée séparément.", 
                en: "Increases {Ice DMG} by [31.5%]. Upon hitting an enemy with a {Basic Attack}, the equipper's {CRIT Rate} increases by [12.5%] for 8s. When dealing {Ice DMG} with a {Dash Attack}, the equipper's {CRIT Rate} increases by an additional [12.5%] for 15s. The duration of each effect is calculated separately." 
            },
            { 
                fr: "Augmente les {DGT de Glace} de [37,5 %]. Lorsqu'une {Attaque de base} touche un ennemi, le {Taux CRIT} de l'équipementier augmente de [15 %] pendant 8s. Lorsqu'une {Attaque bondissante} inflige des {DGT de Glace}, le {Taux CRIT} de l'équipementier augmente de [15 %] supplémentaires pendant 15s. La durée de chaque effet est calculée séparément.", 
                en: "Increases {Ice DMG} by [37.5%]. Upon hitting an enemy with a {Basic Attack}, the equipper's {CRIT Rate} increases by [15%] for 8s. When dealing {Ice DMG} with a {Dash Attack}, the equipper's {CRIT Rate} increases by an additional [15%] for 15s. The duration of each effect is calculated separately." 
            },
            { 
                fr: "Augmente les {DGT de Glace} de [44 %]. Lorsqu'une {Attaque de base} touche un ennemi, le {Taux CRIT} de l'équipementier augmente de [17,5 %] pendant 8s. Lorsqu'une {Attaque bondissante} inflige des {DGT de Glace}, le {Taux CRIT} de l'équipementier augmente de [17,5 %] supplémentaires pendant 15s. La durée de chaque effet est calculée séparément.", 
                en: "Increases {Ice DMG} by [44%]. Upon hitting an enemy with a {Basic Attack}, the equipper's {CRIT Rate} increases by [17.5%] for 8s. When dealing {Ice DMG} with a {Dash Attack}, the equipper's {CRIT Rate} increases by an additional [17.5%] for 15s. The duration of each effect is calculated separately." 
            },
            { 
                fr: "Augmente les {DGT de Glace} de [50 %]. Lorsqu'une {Attaque de base} touche un ennemi, le {Taux CRIT} de l'équipementier augmente de [20 %] pendant 8s. Lorsqu'une {Attaque bondissante} inflige des {DGT de Glace}, le {Taux CRIT} de l'équipementier augmente de [20 %] supplémentaires pendant 15s. La durée de chaque effet est calculée séparément.", 
                en: "Increases {Ice DMG} by [50%]. Upon hitting an enemy with a {Basic Attack}, the equipper's {CRIT Rate} increases by [20%] for 8s. When dealing {Ice DMG} with a {Dash Attack}, the equipper's {CRIT Rate} increases by an additional [20%] for 15s. The duration of each effect is calculated separately." 
            }
        ]
    },
    "Riot Suppressor Mark VI": {
        name: { fr: "Répresseur d'émeutes Mark VI", en: "Riot Suppressor Mark VI" },
        rank: "S",
        specialty: "Attack",
        element: "Ether",
        img: "W-Engine_Riot_Suppressor_Mark_VI.webp",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "DGT CRIT", en: "CRIT DMG" }, 
            advanced: "19.2% - 48%" 
        },
        passiveName: { fr: "Patrouille de sécurité", en: "Security Patrol" },
        overclocks: [
            { 
                fr: "Augmente le {Taux CRIT} de [15 %]. Lancer une {Attaque spéciale EX} confère à l'équipementier 8 cumuls de Charge (maximum 8). Chaque fois que l'{Attaque de base} ou l'{Attaque bondissante} de l'équipementier inflige des {DGT d'Éther}, consomme 1 cumul de Charge et augmente les DGT de la compétence de [35 %].", 
                en: "Increases {CRIT Rate} by [15%]. Launching an {EX Special Attack} grants the equipper 8 Charge stacks, up to a maximum of 8 stacks. Whenever the equipper's {Basic Attack} or {Dash Attack} deals {Ether DMG}, consumes a Charge stack and increases the skill's DMG by [35%]." 
            },
            { 
                fr: "Augmente le {Taux CRIT} de [18,8 %]. Lancer une {Attaque spéciale EX} confère à l'équipementier 8 cumuls de Charge (maximum 8). Chaque fois que l'{Attaque de base} ou l'{Attaque bondissante} de l'équipementier inflige des {DGT d'Éther}, consomme 1 cumul de Charge et augmente les DGT de la compétence de [43,8 %].", 
                en: "Increases {CRIT Rate} by [18.8%]. Launching an {EX Special Attack} grants the equipper 8 Charge stacks, up to a maximum of 8 stacks. Whenever the equipper's {Basic Attack} or {Dash Attack} deals {Ether DMG}, consumes a Charge stack and increases the skill's DMG by [43.8%]." 
            },
            { 
                fr: "Augmente le {Taux CRIT} de [22,5 %]. Lancer une {Attaque spéciale EX} confère à l'équipementier 8 cumuls de Charge (maximum 8). Chaque fois que l'{Attaque de base} ou l'{Attaque bondissante} de l'équipementier inflige des {DGT d'Éther}, consomme 1 cumul de Charge et augmente les DGT de la compétence de [52,5 %].", 
                en: "Increases {CRIT Rate} by [22.5%]. Launching an {EX Special Attack} grants the equipper 8 Charge stacks, up to a maximum of 8 stacks. Whenever the equipper's {Basic Attack} or {Dash Attack} deals {Ether DMG}, consumes a Charge stack and increases the skill's DMG by [52.5%]." 
            },
            { 
                fr: "Augmente le {Taux CRIT} de [26,3 %]. Lancer une {Attaque spéciale EX} confère à l'équipementier 8 cumuls de Charge (maximum 8). Chaque fois que l'{Attaque de base} ou l'{Attaque bondissante} de l'équipementier inflige des {DGT d'Éther}, consomme 1 cumul de Charge et augmente les DGT de la compétence de [61,3 %].", 
                en: "Increases {CRIT Rate} by [26.3%]. Launching an {EX Special Attack} grants the equipper 8 Charge stacks, up to a maximum of 8 stacks. Whenever the equipper's {Basic Attack} or {Dash Attack} deals {Ether DMG}, consumes a Charge stack and increases the skill's DMG by [61.3%]." 
            },
            { 
                fr: "Augmente le {Taux CRIT} de [30 %]. Lancer une {Attaque spéciale EX} confère à l'équipementier 8 cumuls de Charge (maximum 8). Chaque fois que l'{Attaque de base} ou l'{Attaque bondissante} de l'équipementier inflige des {DGT d'Éther}, consomme 1 cumul de Charge et augmente les DGT de la compétence de [70 %].", 
                en: "Increases {CRIT Rate} by [30%]. Launching an {EX Special Attack} grants the equipper 8 Charge stacks, up to a maximum of 8 stacks. Whenever the equipper's {Basic Attack} or {Dash Attack} deals {Ether DMG}, consumes a Charge stack and increases the skill's DMG by [70%]." 
            }
        ]
    },
    "Ice-Jade Teapot": {
        name: { fr: "Théière de jade glacé", en: "Ice-Jade Teapot" },
        rank: "S",
        specialty: "Stun",
        img: "W-Engine_Ice-Jade_Teapot.webp",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "7.2% - 18%" 
        },
        passiveName: { fr: "Mélodie retentissante", en: "Ringing Melody" },
        overclocks: [
            { 
                fr: "Lorsqu'une {Attaque de base} touche un ennemi, gagne 1 cumul d'{Infusion divine}. Chaque cumul augmente l'{Impact} de l'équipementier de [0,7 %] pendant 8s (cumulable 30 fois, durée calculée séparément). À 15 cumuls ou plus, les DGT de tous les membres de l'escouade augmentent de [20 %] pendant 10s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "When a {Basic Attack} hits an enemy, gain 1 stack of {Tea-riffic}. Each stack of {Tea-riffic} increases the user's {Impact} by [0.7%], stacking up to 30 times, and lasting for 8s. The duration of each stack is calculated separately. Upon acquiring {Tea-riffic}, if the equipper possesses stacks of {Tea-riffic} greater than or equal to 15, all squad members' DMG is increased by [20%] for 10s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base} touche un ennemi, gagne 1 cumul d'{Infusion divine}. Chaque cumul augmente l'{Impact} de l'équipementier de [0,88 %] pendant 8s (cumulable 30 fois, durée calculée séparément). À 15 cumuls ou plus, les DGT de tous les membres de l'escouade augmentent de [23 %] pendant 10s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "When a {Basic Attack} hits an enemy, gain 1 stack of {Tea-riffic}. Each stack of {Tea-riffic} increases the user's {Impact} by [0.88%], stacking up to 30 times, and lasting for 8s. The duration of each stack is calculated separately. Upon acquiring {Tea-riffic}, if the equipper possesses stacks of {Tea-riffic} greater than or equal to 15, all squad members' DMG is increased by [23%] for 10s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base} touche un ennemi, gagne 1 cumul d'{Infusion divine}. Chaque cumul augmente l'{Impact} de l'équipementier de [1,05 %] pendant 8s (cumulable 30 fois, durée calculée séparément). À 15 cumuls ou plus, les DGT de tous les membres de l'escouade augmentent de [26 %] pendant 10s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "When a {Basic Attack} hits an enemy, gain 1 stack of {Tea-riffic}. Each stack of {Tea-riffic} increases the user's {Impact} by [1.05%], stacking up to 30 times, and lasting for 8s. The duration of each stack is calculated separately. Upon acquiring {Tea-riffic}, if the equipper possesses stacks of {Tea-riffic} greater than or equal to 15, all squad members' DMG is increased by [26%] for 10s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base} touche un ennemi, gagne 1 cumul d'{Infusion divine}. Chaque cumul augmente l'{Impact} de l'équipementier de [1,22 %] pendant 8s (cumulable 30 fois, durée calculée séparément). À 15 cumuls ou plus, les DGT de tous les membres de l'escouade augmentent de [29 %] pendant 10s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "When a {Basic Attack} hits an enemy, gain 1 stack of {Tea-riffic}. Each stack of {Tea-riffic} increases the user's {Impact} by [1.22%], stacking up to 30 times, and lasting for 8s. The duration of each stack is calculated separately. Upon acquiring {Tea-riffic}, if the equipper possesses stacks of {Tea-riffic} greater than or equal to 15, all squad members' DMG is increased by [29%] for 10s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "Lorsqu'une {Attaque de base} touche un ennemi, gagne 1 cumul d'{Infusion divine}. Chaque cumul augmente l'{Impact} de l'équipementier de [1,4 %] pendant 8s (cumulable 30 fois, durée calculée séparément). À 15 cumuls ou plus, les DGT de tous les membres de l'escouade augmentent de [32 %] pendant 10s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "When a {Basic Attack} hits an enemy, gain 1 stack of {Tea-riffic}. Each stack of {Tea-riffic} increases the user's {Impact} by [1.4%], stacking up to 30 times, and lasting for 8s. The duration of each stack is calculated separately. Upon acquiring {Tea-riffic}, if the equipper possesses stacks of {Tea-riffic} greater than or equal to 15, all squad members' DMG is increased by [32%] for 10s. Passive effects of the same name do not stack." 
            }
        ]
    },
    "Flamemaker Shaker": {
        name: { fr: "Secoueur incendiaire", en: "Flamemaker Shaker" },
        rank: "S",
        specialty: "Anomaly",
        element: "Fire",
        img: "W-Engine_Flamemaker_Shaker.webp",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "ATQ %", en: "ATK" }, 
            advanced: "12% - 30%" 
        },
        passiveName: { fr: "Carburant sur glace", en: "Fuel on the Rocks" },
        overclocks: [
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,6]/s. Lorsqu'une {Attaque spéciale EX} ou une {Attaque de soutien} touche un ennemi, les DGT de l'équipementier augmentent de [3,5 %] pendant 6s (cumulable 10 fois, déclenchement toutes les 0,3s). En dehors du terrain, l'effet des cumuls est doublé. À 5 cumuls ou plus, l'{Adresse d'Anomalie} augmente de [50] pendant 6s (non cumulable).", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.6]/s. When hitting an enemy with an {EX Special Attack} or {Assist Attack}, the equipper's DMG increases by [3.5%], stacking up to 10 times and lasting for 6s. This effect can trigger once every 0.3s. While off-field, the stack effect is doubled. Repeated triggers reset the duration. Upon obtaining the DMG increase effect, if the number of current stacks is greater than or equal to 5, then the equipper's {Anomaly Proficiency} increases by [50]. This Anomaly Proficiency increase does not stack and lasts for 6s." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,75]/s. Lorsqu'une {Attaque spéciale EX} ou une {Attaque de soutien} touche un ennemi, les DGT de l'équipementier augmentent de [4,4 %] pendant 6s (cumulable 10 fois, déclenchement toutes les 0,3s). En dehors du terrain, l'effet des cumuls est doublé. À 5 cumuls ou plus, l'{Adresse d'Anomalie} augmente de [62] pendant 6s (non cumulable).", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.75]/s. When hitting an enemy with an {EX Special Attack} or {Assist Attack}, the equipper's DMG increases by [4.4%], stacking up to 10 times and lasting for 6s. This effect can trigger once every 0.3s. While off-field, the stack effect is doubled. Repeated triggers reset the duration. Upon obtaining the DMG increase effect, if the number of current stacks is greater than or equal to 5, then the equipper's {Anomaly Proficiency} increases by [62]. This Anomaly Proficiency increase does not stack and lasts for 6s." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [0,9]/s. Lorsqu'une {Attaque spéciale EX} ou une {Attaque de soutien} touche un ennemi, les DGT de l'équipementier augmentent de [5,25 %] pendant 6s (cumulable 10 fois, déclenchement toutes les 0,3s). En dehors du terrain, l'effet des cumuls est doublé. À 5 cumuls ou plus, l'{Adresse d'Anomalie} augmente de [75] pendant 6s (non cumulable).", 
                en: "While off-field, the equipper's {Energy Regen} increases by [0.9]/s. When hitting an enemy with an {EX Special Attack} or {Assist Attack}, the equipper's DMG increases by [5.25%], stacking up to 10 times and lasting for 6s. This effect can trigger once every 0.3s. While off-field, the stack effect is doubled. Repeated triggers reset the duration. Upon obtaining the DMG increase effect, if the number of current stacks is greater than or equal to 5, then the equipper's {Anomaly Proficiency} increases by [75]. This Anomaly Proficiency increase does not stack and lasts for 6s." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [1,05]/s. Lorsqu'une {Attaque spéciale EX} ou une {Attaque de soutien} touche un ennemi, les DGT de l'équipementier augmentent de [6,1 %] pendant 6s (cumulable 10 fois, déclenchement toutes les 0,3s). En dehors du terrain, l'effet des cumuls est doublé. À 5 cumuls ou plus, l'{Adresse d'Anomalie} augmente de [88] pendant 6s (non cumulable).", 
                en: "While off-field, the equipper's {Energy Regen} increases by [1.05]/s. When hitting an enemy with an {EX Special Attack} or {Assist Attack}, the equipper's DMG increases by [6.1%], stacking up to 10 times and lasting for 6s. This effect can trigger once every 0.3s. While off-field, the stack effect is doubled. Repeated triggers reset the duration. Upon obtaining the DMG increase effect, if the number of current stacks is greater than or equal to 5, then the equipper's {Anomaly Proficiency} increases by [88]. This Anomaly Proficiency increase does not stack and lasts for 6s." 
            },
            { 
                fr: "En dehors du terrain, la {Réc. d'énergie} de l'équipementier augmente de [1,2]/s. Lorsqu'une {Attaque spéciale EX} ou une {Attaque de soutien} touche un ennemi, les DGT de l'équipementier augmentent de [7 %] pendant 6s (cumulable 10 fois, déclenchement toutes les 0,3s). En dehors du terrain, l'effet des cumuls est doublé. À 5 cumuls ou plus, l'{Adresse d'Anomalie} augmente de [100] pendant 6s (non cumulable).", 
                en: "While off-field, the equipper's {Energy Regen} increases by [1.2]/s. When hitting an enemy with an {EX Special Attack} or {Assist Attack}, the equipper's DMG increases by [7%], stacking up to 10 times and lasting for 6s. This effect can trigger once every 0.3s. While off-field, the stack effect is doubled. Repeated triggers reset the duration. Upon obtaining the DMG increase effect, if the number of current stacks is greater than or equal to 5, then the equipper's {Anomaly Proficiency} increases by [100]. This Anomaly Proficiency increase does not stack and lasts for 6s." 
            }
        ]
    },
    "Tusks of Fury": {
        name: { fr: "Défenses de fureur", en: "Tusks of Fury" },
        rank: "S",
        specialty: "Defense",
        img: "W-Engine_Tusks_of_Fury.webp",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Impact %", en: "Impact" }, 
            advanced: "7.2% - 18%" 
        },
        passiveName: { fr: "Motard invincible", en: "Invincible Rider" },
        overclocks: [
            { 
                fr: "La valeur du bouclier fourni par l'équipementier augmente de [30 %]. Lorsqu'un membre de l'escouade déclenche une {Interruption} ou une {Esquive parfaite}, les DGT de tous les membres de l'escouade augmentent de [18 %] et la {Stupeur} infligée augmente de [12 %] pendant 20s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "The Shield value provided by the equipper increases by [30%]. When any squad member triggers {Interrupt} or {Perfect Dodge}, all squad members' DMG increases by [18%] and {Daze} dealt increases by [12%] for 20s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "La valeur du bouclier fourni par l'équipementier augmente de [37,5 %]. Lorsqu'un membre de l'escouade déclenche une {Interruption} ou une {Esquive parfaite}, les DGT de tous les membres de l'escouade augmentent de [22,5 %] et la {Stupeur} infligée augmente de [15 %] pendant 20s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "The Shield value provided by the equipper increases by [37.5%]. When any squad member triggers {Interrupt} or {Perfect Dodge}, all squad members' DMG increases by [22.5%] and {Daze} dealt increases by [15%] for 20s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "La valeur du bouclier fourni par l'équipementier augmente de [45 %]. Lorsqu'un membre de l'escouade déclenche une {Interruption} ou une {Esquive parfaite}, les DGT de tous les membres de l'escouade augmentent de [27 %] et la {Stupeur} infligée augmente de [18 %] pendant 20s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "The Shield value provided by the equipper increases by [45%]. When any squad member triggers {Interrupt} or {Perfect Dodge}, all squad members' DMG increases by [27%] and {Daze} dealt increases by [18%] for 20s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "La valeur du bouclier fourni par l'équipementier augmente de [52,5 %]. Lorsqu'un membre de l'escouade déclenche une {Interruption} ou une {Esquive parfaite}, les DGT de tous les membres de l'escouade augmentent de [31,5 %] et la {Stupeur} infligée augmente de [21 %] pendant 20s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "The Shield value provided by the equipper increases by [52.5%]. When any squad member triggers {Interrupt} or {Perfect Dodge}, all squad members' DMG increases by [31.5%] and {Daze} dealt increases by [21%] for 20s. Passive effects of the same name do not stack." 
            },
            { 
                fr: "La valeur du bouclier fourni par l'équipementier augmente de [60 %]. Lorsqu'un membre de l'escouade déclenche une {Interruption} ou une {Esquive parfaite}, les DGT de tous les membres de l'escouade augmentent de [36 %] et la {Stupeur} infligée augmente de [24 %] pendant 20s. Les effets passifs du même nom ne se cumulent pas.", 
                en: "The Shield value provided by the equipper increases by [60%]. When any squad member triggers {Interrupt} or {Perfect Dodge}, all squad members' DMG increases by [36%] and {Daze} dealt increases by [24%] for 20s. Passive effects of the same name do not stack." 
            }
        ]
    },
    "Electro-Lip Gloss": {
        name: { fr: "Gloss électrique", en: "Electro-Lip Gloss" },
        rank: "A",
        specialty: "Anomaly",
        img: "W-Engine_Electro-Lip_Gloss.png",
        stats: { 
            base: "40 - 594", 
            advancedLabel: { fr: "Adresse d'Anomalie", en: "Anomaly Proficiency" }, 
            advanced: "30 - 75" 
        },
        passiveName: { fr: "Baiser de la mort", en: "Kiss of Death" },
        overclocks: [
            { 
                fr: "Lorsqu'il y a des ennemis subissant une Anomalie d'attribut sur le terrain, l'ATQ de l'équipementier augmente de [10 %] et il inflige [15 %] de DGT supplémentaires à la cible.", 
                en: "When there are enemies inflicted with Attribute Anomaly on the field, the equipper's ATK increases by [10%] and they deal an additional [15%] more DMG to the target." 
            },
            { 
                fr: "Lorsqu'il y a des ennemis subissant une Anomalie d'attribut sur le terrain, l'ATQ de l'équipementier augmente de [11,5 %] et il inflige [17,5 %] de DGT supplémentaires à la cible.", 
                en: "When there are enemies inflicted with Attribute Anomaly on the field, the equipper's ATK increases by [11.5%] and they deal an additional [17.5%] more DMG to the target." 
            },
            { 
                fr: "Lorsqu'il y a des ennemis subissant une Anomalie d'attribut sur le terrain, l'ATQ de l'équipementier augmente de [13 %] et il inflige [20 %] de DGT supplémentaires à la cible.", 
                en: "When there are enemies inflicted with Attribute Anomaly on the field, the equipper's ATK increases by [13%] and they deal an additional [20%] more DMG to the target." 
            },
            { 
                fr: "Lorsqu'il y a des ennemis subissant une Anomalie d'attribut sur le terrain, l'ATQ de l'équipementier augmente de [14,5 %] et il inflige [22,5 %] de DGT supplémentaires à la cible.", 
                en: "When there are enemies inflicted with Attribute Anomaly on the field, the equipper's ATK increases by [14.5%] and they deal an additional [22.5%] more DMG to the target." 
            },
            { 
                fr: "Lorsqu'il y a des ennemis subissant une Anomalie d'attribut sur le terrain, l'ATQ de l'équipementier augmente de [16 %] et il inflige [25 %] de DGT supplémentaires à la cible.", 
                en: "When there are enemies inflicted with Attribute Anomaly on the field, the equipper's ATK increases by [16%] and they deal an additional [25%] more DMG to the target." 
            }
        ]
    }
};
