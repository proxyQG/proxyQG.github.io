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
    "Frostfall Sickle": {
        name: { fr: "Faucille de givre-chute", en: "Frostfall Sickle" },
        rank: "S",
        specialty: "Anomaly",
        element: "Ice",
        img: "W-Engine_Frostfall_Sickle.png",
        stats: { 
            base: "48 - 713", 
            advancedLabel: { fr: "Adresse d'Anomalie", en: "Anomaly Proficiency" }, 
            advanced: "30 - 75" 
        },
        passiveName: { fr: "Moisson boréale", en: "Boreal Harvest" },
        overclocks: [
            { 
                fr: "Les {DGT de Glace} augmentent de [25 %]. Déclencher {Gel} ou {Désordre} augmente l'ATQ de toute l'équipe de [10 %] pendant 15s.", 
                en: "{Ice DMG} increases by [25%]. Triggering {Freeze} or {Disorder} increases squad ATK by [10%] for 15s." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [28,5 %]. Déclencher {Gel} ou {Désordre} augmente l'ATQ de toute l'équipe de [11,5 %] pendant 15s.", 
                en: "{Ice DMG} increases by [28.5%]. Triggering {Freeze} or {Disorder} increases squad ATK by [11.5%] for 15s." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [32 %]. Déclencher {Gel} ou {Désordre} augmente l'ATQ de toute l'équipe de [13 %] pendant 15s.", 
                en: "{Ice DMG} increases by [32%]. Triggering {Freeze} or {Disorder} increases squad ATK by [13%] for 15s." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [35,5 %]. Déclencher {Gel} ou {Désordre} augmente l'ATQ de toute l'équipe de [14,5 %] pendant 15s.", 
                en: "{Ice DMG} increases by [35.5%]. Triggering {Freeze} or {Disorder} increases squad ATK by [14.5%] for 15s." 
            },
            { 
                fr: "Les {DGT de Glace} augmentent de [40 %]. Déclencher {Gel} ou {Désordre} augmente l'ATQ de toute l'équipe de [16 %] pendant 15s.", 
                en: "{Ice DMG} increases by [40%]. Triggering {Freeze} or {Disorder} increases squad ATK by [16%] for 15s." 
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
