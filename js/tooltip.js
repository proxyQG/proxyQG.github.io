// js/tooltip.js
(function() {
    let tooltipEl = null;
    let currentEngineKey = null;
    let hoverTimeout = null;
    
    // Initialisation
    function init() {
        if (document.getElementById('proxy-tooltip')) return;
        
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'proxy-tooltip';
        // Structure HTML vide prête à être peuplée (évite les reflows constants)
        tooltipEl.innerHTML = `
            <div class="tt-header"><span id="tt-name"></span></div>
            <div class="tt-body">
                <div class="tt-img-wrap"><img id="tt-img" src="" alt=""></div>
                <div class="tt-tags" id="tt-tags"></div>
                <div class="tt-stats-grid">
                    <div class="tt-stat-card"><div class="lbl">ATQ de base</div><div class="val" id="tt-stat-base"></div></div>
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
        return text
            .replace(/\[(.*?)\]/g, '<span class="tt-hl">$1</span>')
            .replace(/\{(.*?)\}/g, '<strong>$1</strong>');
    }

    function populateTooltip(engineKey, tier = 0) {
        const data = W_ENGINES_DB[engineKey];
        if (!data) return;

        const lang = document.documentElement.lang || 'fr';
        
        // Mise à jour de l'UI si on change de moteur
        if (currentEngineKey !== engineKey) {
            document.getElementById('tt-name').textContent = data.name[lang] || data.name.en;
            document.getElementById('tt-img').src = `assets/Engines/${data.img}`;
            
            const tagsHtml = `<span class="tt-tag rank-${data.rank}">Rang ${data.rank}</span>
                              <span class="tt-tag">${data.specialty}</span>
                              ${data.element ? `<span class="tt-tag">${data.element}</span>` : ''}`;
            document.getElementById('tt-tags').innerHTML = tagsHtml;
            
            document.getElementById('tt-stat-base').textContent = data.stats.base;
            document.getElementById('tt-stat-adv-lbl').textContent = data.stats.advancedLabel;
            document.getElementById('tt-stat-adv').textContent = data.stats.advanced;
            document.getElementById('tt-passive-title').textContent = data.passiveName[lang] || data.passiveName.en;
            
            currentEngineKey = engineKey;
        }

        // Mise à jour uniquement du texte du passif et des boutons (Ultra optimisé)
        const passiveRaw = data.overclocks[tier][lang] || data.overclocks[tier].en;
        document.getElementById('tt-passive-text').innerHTML = parseText(passiveRaw);

        document.querySelectorAll('.tt-oc-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.tier) === tier);
        });
    }

    function positionTooltip(target) {
        const rect = target.getBoundingClientRect();
        const ttWidth = 340; // Largeur fixe du CSS
        const gap = 15;

        // Logique anti-débordement intelligente
        let left = rect.right + gap;
        if (left + ttWidth > window.innerWidth) left = rect.left - ttWidth - gap;
        
        let top = rect.top + (rect.height / 2) - (tooltipEl.offsetHeight / 2);
        if (top < 10) top = 10;
        if (top + tooltipEl.offsetHeight > window.innerHeight) top = window.innerHeight - tooltipEl.offsetHeight - 10;

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
    }

    function bindEvents() {
        // Gestion des interactions (Souris)
        document.addEventListener('mouseover', e => {
            const trigger = e.target.closest('[data-engine]');
            if (trigger) {
                clearTimeout(hoverTimeout);
                populateTooltip(trigger.dataset.engine, 0);
                positionTooltip(trigger);
                tooltipEl.classList.add('visible');
            }
        });

        document.addEventListener('mouseout', e => {
            const trigger = e.target.closest('[data-engine], #proxy-tooltip');
            if (trigger && !e.relatedTarget?.closest('[data-engine], #proxy-tooltip')) {
                // Délai de 150ms pour permettre à la souris de traverser l'écart
                hoverTimeout = setTimeout(() => {
                    tooltipEl.classList.remove('visible');
                    currentEngineKey = null; // Reset pour forcer la maj au prochain survol
                }, 150); 
            }
        });

        // Gestion de l'Overclock (sans recharger tout le HTML)
        tooltipEl.addEventListener('click', e => {
            if (e.target.classList.contains('tt-oc-btn')) {
                populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
            }
        });

        // Support Mobile (Tactile)
        document.addEventListener('touchstart', e => {
            const trigger = e.target.closest('[data-engine]');
            if (trigger) {
                populateTooltip(trigger.dataset.engine, 0);
                positionTooltip(trigger);
                tooltipEl.classList.add('visible');
            } else if (!e.target.closest('#proxy-tooltip')) {
                tooltipEl.classList.remove('visible');
            }
        }, { passive: true });
    }

    window.addEventListener('DOMContentLoaded', init);
})();
