(function() {
    let tooltipEl = null;
    let currentEngineKey = null;
    
    function init() {
        if (document.getElementById('proxy-tooltip')) return;
        
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'proxy-tooltip';
        tooltipEl.innerHTML = `
    <div class="tt-header">
        <span id="tt-name"></span>
        <button class="tt-close-btn" aria-label="Fermer l'infobulle">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
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
window.hideTooltip = hideTooltip;

    function populateTooltip(engineKey, tier = 0) {
        const data = W_ENGINES_DB[engineKey];
        if (!data) return false; 

        const langSwitcher = document.getElementById('langSwitcher');
        const lang = langSwitcher ? langSwitcher.getAttribute('data-active') : 'fr';
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
        if (left < 10) left = 10; // ← À RAJOUTER ICI
        
        let top = rect.top + (rect.height / 2) - (tooltipEl.offsetHeight / 2);
        if (top < 10) top = 10;
        if (top + tooltipEl.offsetHeight > window.innerHeight) top = window.innerHeight - tooltipEl.offsetHeight - 10;

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
    }

    function bindEvents() {
        // Écouteur principal au CLIC (remplace mouseover / mouseout)
        document.addEventListener('click', e => {
            // 1. SÉCURITÉ : Vérifie si le modal est actif
            const agentModal = document.getElementById('agentDetailModal');
            if (!agentModal || agentModal.classList.contains('hidden') || !agentModal.classList.contains('opacity-100')) {
                return;
            }

            const trigger = e.target.closest('[data-engine]');
            const isTooltip = e.target.closest('#proxy-tooltip');

            // Cas A : On clique sur une carte d'équipement
            if (trigger) {
                const isValid = populateTooltip(trigger.dataset.engine, 0);
                if (isValid) {
                    tooltipEl.classList.add('visible');
                }
            } 
            // Cas B : On clique n'importe où ailleurs (sauf à l'intérieur de l'infobulle)
            else if (!isTooltip) {
                hideTooltip();
            }
        });
        tooltipEl.addEventListener('click', e => {
    if (e.target.classList.contains('tt-oc-btn')) {
        populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
    }

    if (e.target.closest('.tt-close-btn')) {
        hideTooltip();
    }
});

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') hideTooltip();
        });
        let touchStartX = 0;
let touchStartY = 0;
let isTouchScrolling = false;
let touchTargetEngine = null;

document.addEventListener('touchstart', e => {
    const agentModal = document.getElementById('agentDetailModal');
    if (!agentModal || agentModal.classList.contains('hidden') || !agentModal.classList.contains('opacity-100')) {
        return;
    }

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isTouchScrolling = false;
    touchTargetEngine = e.target.closest('[data-engine]');
}, { passive: true });

document.addEventListener('touchmove', e => {
    if (!touchTargetEngine) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
    
    // Si le doigt bouge de plus de 10px, c'est un scroll !
    if (deltaX > 10 || deltaY > 10) {
        isTouchScrolling = true;
    }
}, { passive: true });

document.addEventListener('touchend', e => {
    // Si l'utilisateur était en train de scroller, on annule l'ouverture
    if (isTouchScrolling) return;

    if (touchTargetEngine) {
        const isValid = populateTooltip(touchTargetEngine.dataset.engine, 0);
        if (isValid) {
            positionTooltip(touchTargetEngine);
            tooltipEl.classList.add('visible');
        }
    } else if (!e.target.closest('#proxy-tooltip')) {
        hideTooltip();
    }
});

        // L'observateur tue l'infobulle à la milliseconde exacte où tu cliques sur "Fermer"
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.id === 'agentDetailModal' && !mutation.target.classList.contains('opacity-100')) {
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
