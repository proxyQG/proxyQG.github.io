(function() {
    let tooltipEl = null;
    let currentEngineKey = null;
    let hoverTimeout = null;
    
    // Initialisation
    function init() {
        if (document.getElementById('proxy-tooltip')) return;
        
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'proxy-tooltip';
        tooltipEl.innerHTML = `
            <div class="tt-header"><span id="tt-name"></span></div>
            <div class="tt-body">
                <div class="tt-img-wrap"><img id="tt-img" src="" alt=""></div>
                <div class="tt-tags" id="tt-tags"></div>
                <div class="tt-stats-grid">
                    <div class="tt-stat-card"><div class="lbl" id="tt-stat-base-lbl">ATQ de base</div><div class="val" id="tt-stat-base"></div></div>
                    <div class="tt-stat-card"><div class="lbl" id="tt-stat-adv-lbl"></div><div class="val" id="tt-stat-adv"></div></div>
                </div>
                <div class="tt-oc-container">
                    <div class="tt-oc-tabs" id="tt-oc-tabs">
                        ${[1,2,3,4,5].map(i => `<button class="tt-oc-btn" data-tier="${i-1}">${i}</button>`).join('')}
                    </div>
                    <div class="tt-desc-box">
                        <div class="tt-desc-title" id="tt-passive-title"></div>
                        <div class="tt-desc-text" id="tt-passive-text"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(tooltipEl);
        bindEvents();
    }

    // Parser de texte (transforme les [] en fluo et {} en gras)
    function parseText(text) {
        if (!text) return "";
        return text
            .replace(/\[(.*?)\]/g, '<span class="tt-hl">$1</span>')
            .replace(/\{(.*?)\}/g, '<strong>$1</strong>');
    }

    function populateTooltip(engineKey, tier = 0) {
        const data = W_ENGINES_DB[engineKey];
        // SI LE MOTEUR N'EXISTE PAS DANS LA BDD, ON ARRÊTE TOUT ET ON RENVOIE FALSE
        if (!data) return false; 

        const lang = document.documentElement.lang || 'fr';
        const rankLabel = lang === 'en' ? 'Rank' : 'Rang';
        const baseAtkLabel = lang === 'en' ? 'Base ATK' : 'ATQ de base';
        
        // Mise à jour de l'UI si on change de moteur
        if (currentEngineKey !== engineKey) {
            document.getElementById('tt-name').textContent = data.name[lang] || data.name.en;
            
            // Correction du chemin de l'image
            document.getElementById('tt-img').src = `assets/W-Engine/${data.img.replace('.png', '.webp')}`;
            
            const tagsHtml = `<span class="tt-tag rank-${data.rank}">${rankLabel} ${data.rank}</span>
                              <span class="tt-tag">${data.specialty}</span>
                              ${data.element ? `<span class="tt-tag">${data.element}</span>` : ''}`;
            document.getElementById('tt-tags').innerHTML = tagsHtml;
            
            document.getElementById('tt-stat-base-lbl').textContent = baseAtkLabel;
            document.getElementById('tt-stat-base').textContent = data.stats.base;
            
            // Sécurité si advancedLabel n'a pas été défini dans les deux langues
            const advLbl = data.stats.advancedLabel[lang] || data.stats.advancedLabel.en || data.stats.advancedLabel;
            document.getElementById('tt-stat-adv-lbl').textContent = advLbl;
            document.getElementById('tt-stat-adv').textContent = data.stats.advanced;
            
            document.getElementById('tt-passive-title').textContent = data.passiveName[lang] || data.passiveName.en;
            
            currentEngineKey = engineKey;
        }

        // Mise à jour uniquement du texte du passif et des boutons
        let passiveRaw = "";
        if (data.overclocks && data.overclocks[tier]) {
            passiveRaw = data.overclocks[tier][lang] || data.overclocks[tier].en || "";
        }
        document.getElementById('tt-passive-text').innerHTML = parseText(passiveRaw);

        document.querySelectorAll('.tt-oc-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.tier) === tier);
        });
        
        return true; // TOUT S'EST BIEN PASSÉ
    }

    function positionTooltip(target) {
        const rect = target.getBoundingClientRect();
        const ttWidth = 340; 
        const gap = 15;

        // Logique anti-débordement
        let left = rect.right + gap;
        if (left + ttWidth > window.innerWidth) left = rect.left - ttWidth - gap;
        
        let top = rect.top + (rect.height / 2) - (tooltipEl.offsetHeight / 2);
        if (top < 10) top = 10;
        if (top + tooltipEl.offsetHeight > window.innerHeight) top = window.innerHeight - tooltipEl.offsetHeight - 10;

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
    }

    function bindEvents() {
        document.addEventListener('mouseover', e => {
            const trigger = e.target.closest('[data-engine]');
            const isTooltip = e.target.closest('#proxy-tooltip');

            // 1. Si la souris est sur le moteur OU sur l'infobulle, on annule la fermeture
            if (trigger || isTooltip) {
                clearTimeout(hoverTimeout);
            }

            // 2. Si on survole un nouveau moteur, on met à jour les données
            if (trigger) {
                const isValid = populateTooltip(trigger.dataset.engine, 0);
                if (isValid) {
                    positionTooltip(trigger);
                    tooltipEl.classList.add('visible');
                }
            }
        });

        document.addEventListener('mouseout', e => {
            const trigger = e.target.closest('[data-engine], #proxy-tooltip');
            
            // Si on quitte le moteur ou l'infobulle ET qu'on ne va pas vers l'un des deux...
            if (trigger && !e.relatedTarget?.closest('[data-engine], #proxy-tooltip')) {
                // On attend 250ms avant de fermer, pour laisser le temps de bouger la souris
                hoverTimeout = setTimeout(() => {
                    tooltipEl.classList.remove('visible');
                    currentEngineKey = null; 
                }, 250); 
            }
        });

        tooltipEl.addEventListener('click', e => {
            if (e.target.classList.contains('tt-oc-btn')) {
                populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
            }
        });

        document.addEventListener('touchstart', e => {
            const trigger = e.target.closest('[data-engine]');
            if (trigger) {
                const isValid = populateTooltip(trigger.dataset.engine, 0);
                if (isValid) {
                    positionTooltip(trigger);
                    tooltipEl.classList.add('visible');
                }
            } else if (!e.target.closest('#proxy-tooltip')) {
                tooltipEl.classList.remove('visible');
            }
        }, { passive: true });
    }

    window.addEventListener('DOMContentLoaded', init);
})();
