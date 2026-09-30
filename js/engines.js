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
    "[Reverb] Mark II": {
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
    "[Reverb] Mark III": {
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
