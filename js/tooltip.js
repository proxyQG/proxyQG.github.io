(function() {
    let tooltipEl = null;
    let currentEngineKey = null;
    let hoverTimeout = null;
    
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

    function parseText(text) {
        if (!text) return "";
        return text
            .replace(/\[(.*?)\]/g, '<span class="tt-hl">$1</span>')
            .replace(/\{(.*?)\}/g, '<strong>$1</strong>');
    }

    function hideTooltip() {
        if (tooltipEl) tooltipEl.classList.remove('visible');
        currentEngineKey = null;
    }

    function populateTooltip(engineKey, tier = 0) {
        const data = W_ENGINES_DB[engineKey];
        if (!data) return false; 

        const lang = document.documentElement.lang || 'fr';
        const rankLabel = lang === 'en' ? 'Rank' : 'Rang';
        const baseAtkLabel = lang === 'en' ? 'Base ATK' : 'ATQ de base';
        
        if (currentEngineKey !== engineKey) {
            document.getElementById('tt-name').textContent = data.name[lang] || data.name.en;
            document.getElementById('tt-img').src = `assets/W-Engine/${data.img.replace('.png', '.webp')}`;
            
            const tagsHtml = `<span class="tt-tag rank-${data.rank}">${rankLabel} ${data.rank}</span>
                              <span class="tt-tag">${data.specialty}</span>
                              ${data.element ? `<span class="tt-tag">${data.element}</span>` : ''}`;
            document.getElementById('tt-tags').innerHTML = tagsHtml;
            
            document.getElementById('tt-stat-base-lbl').textContent = baseAtkLabel;
            document.getElementById('tt-stat-base').textContent = data.stats.base;
            
            const advLbl = data.stats.advancedLabel[lang] || data.stats.advancedLabel.en || data.stats.advancedLabel;
            document.getElementById('tt-stat-adv-lbl').textContent = advLbl;
            document.getElementById('tt-stat-adv').textContent = data.stats.advanced;
            document.getElementById('tt-passive-title').textContent = data.passiveName[lang] || data.passiveName.en;
            
            currentEngineKey = engineKey;
        }

        let passiveRaw = "";
        if (data.overclocks && data.overclocks[tier]) {
            passiveRaw = data.overclocks[tier][lang] || data.overclocks[tier].en || "";
        }
        document.getElementById('tt-passive-text').innerHTML = parseText(passiveRaw);

        document.querySelectorAll('.tt-oc-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.tier) === tier);
        });
        
        return true; 
    }

    function positionTooltip(target) {
        // Sécurité si l'élément HTML ciblé est supprimé du site
        if (!document.body.contains(target)) {
            hideTooltip();
            return;
        }

        const rect = target.getBoundingClientRect();
        const ttWidth = 340; 
        const gap = 15;

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

            if (trigger || isTooltip) {
                clearTimeout(hoverTimeout);
            }

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
            
            if (trigger && !e.relatedTarget?.closest('[data-engine], #proxy-tooltip')) {
                hoverTimeout = setTimeout(() => {
                    hideTooltip();
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
                hideTooltip();
            }
        }, { passive: true });

        // --- SÉCURITÉS ANTI-BUG FANTÔME ---
        
        // 1. Fermeture via la touche Echap
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') hideTooltip();
        });

        // 2. Fermeture si on clique n'importe où en dehors
        document.addEventListener('click', e => {
            if (!e.target.closest('#proxy-tooltip') && !e.target.closest('[data-engine]')) {
                hideTooltip();
            }
        });

        // 3. Fermeture automatique si la page de l'agent se ferme
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'agentDetailModal' && mutation.target.classList.contains('hidden')) {
                    hideTooltip();
                }
            });
        });
        
        setTimeout(() => {
            const modal = document.getElementById('agentDetailModal');
            if (modal) observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
        }, 1000);
    }

    window.addEventListener('DOMContentLoaded', init);
})();
