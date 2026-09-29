// js/tooltip.js
(function() {
    let tooltipEl = null;
    let overlayEl = null; // NOUVEAU : L'overlay sombre
    let currentEngineKey = null;
    
    function init() {
        if (document.getElementById('proxy-tooltip')) return;
        
        // 1. Création de l'Overlay
        overlayEl = document.createElement('div');
        overlayEl.id = 'proxy-tooltip-overlay';
        document.body.appendChild(overlayEl);

        // 2. Création de l'Infobulle
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
        if (tooltipEl) {
            tooltipEl.classList.remove('visible');
            tooltipEl.style.transform = ''; // Nettoie le transform du Swipe
        }
        if (overlayEl) {
            overlayEl.classList.remove('visible');
            overlayEl.style.opacity = ''; // Nettoie l'opacité du Swipe
        }
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

    function bindEvents() {
        // --- GESTION DU CLIC ET DE L'OUVERTURE ---
        document.addEventListener('click', e => {
            const agentModal = document.getElementById('agentDetailModal');
            if (!agentModal || agentModal.classList.contains('hidden') || !agentModal.classList.contains('opacity-100')) {
                return;
            }

            const trigger = e.target.closest('[data-engine]');
            if (trigger) {
                const isValid = populateTooltip(trigger.dataset.engine, 0);
                if (isValid) {
                    tooltipEl.classList.add('visible');
                    overlayEl.classList.add('visible'); // Affiche l'overlay
                }
            }
        });

        // --- GESTION DES CLICS INTERNES (Boutons, Croix, Overlay) ---
        tooltipEl.addEventListener('click', e => {
            if (e.target.classList.contains('tt-oc-btn')) {
                populateTooltip(currentEngineKey, parseInt(e.target.dataset.tier));
            }
            if (e.target.closest('.tt-close-btn')) {
                hideTooltip();
            }
        });

        overlayEl.addEventListener('click', hideTooltip); // Ferme si clic dans le noir

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') hideTooltip();
        });

        // --- GESTION DU SWIPE-TO-CLOSE (MOBILE) ---
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        tooltipEl.addEventListener('touchstart', e => {
            if (window.innerWidth > 768) return; // Uniquement sur mobile
            if (tooltipEl.scrollTop > 0) return; // On ne swipe que si on est tout en haut du tiroir
            
            startY = e.touches[0].clientY;
            isDragging = true;
            tooltipEl.style.transition = 'none'; // Désactive la transition CSS pour suivre le doigt
        }, { passive: true });

        tooltipEl.addEventListener('touchmove', e => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY - startY;
            
            // On ne peut tirer que vers le bas (currentY > 0)
            if (currentY > 0) {
                e.preventDefault(); // Bloque le défilement de la page arrière
                tooltipEl.style.transform = `translateY(${currentY}px)`;
                // L'overlay s'éclaircit progressivement en glissant
                overlayEl.style.opacity = 1 - (currentY / window.innerHeight);
            }
        }, { passive: false });

        tooltipEl.addEventListener('touchend', e => {
            if (!isDragging) return;
            isDragging = false;
            
            tooltipEl.style.transition = ''; // Restaure les animations CSS
            overlayEl.style.opacity = '';
            
            // Si on a glissé de plus de 100px vers le bas, on ferme
            if (currentY > 100) {
                hideTooltip();
            } else {
                // Sinon, le tiroir rebondit à sa place d'origine
                tooltipEl.style.transform = ''; 
            }
            currentY = 0;
        });

        // --- SÉCURITÉ ANTI-FANTÔME ---
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
