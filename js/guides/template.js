import { iconMap } from '../data/agents.js';
import { currentLang, ui, tData, tEngine, tDisc, tTerm, tStats } from '../i18n.js';

// --- FONCTION DE SÉCURISATION (ANTI-XSS) ---
function escapeHTML(str) {
    if (typeof str !== 'string') return str ?? '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

// --- SOUS-COMPOSANTS DES ÉQUIPES ---

function buildTeamMember(m, i, currentAgentName) {
    const isFirst = i === 0;
    const memberColor = m.color || '#52525b';
    const borderStyle = `border-color: ${memberColor}; box-shadow: ${isFirst ? '0 0 15px ' + memberColor + '40' : 'none'};`;

    if (m.img) {
        const agentName = m.img.replace('.webp', '').replace('.png', '');
        const imgSrc = `assets/Agents/${m.img.replace('.png', '.webp')}`;
        const escapedName = escapeHTML(agentName);
        const jsSafeName = agentName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const isCurrentAgent = agentName === currentAgentName;

        if (isCurrentAgent) {
            return `
            <div class="flex flex-col items-center gap-3 cursor-default">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 bg-black overflow-hidden relative" style="${borderStyle}">
                    <img src="${imgSrc}" loading="lazy" class="w-full h-full object-cover object-top scale-110">
                </div>
            </div>`;
        }

        return `
        <div class="flex flex-col items-center gap-3 cursor-pointer hover:scale-110 transition-transform duration-300" onclick="window.openAgentDetail('${jsSafeName}', true, true)" title="Voir le guide de ${escapedName}">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 bg-black overflow-hidden relative hover:shadow-lg transition-shadow duration-300" style="${borderStyle}">
                <img src="${imgSrc}" loading="lazy" class="w-full h-full object-cover object-top scale-110">
            </div>
        </div>`;
    }

    return `
    <div class="flex flex-col items-center gap-3">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 bg-black overflow-hidden relative" style="${borderStyle}">
            <span class="text-xs font-bold text-center text-zinc-400 px-2 flex h-full items-center justify-center leading-tight">${tTerm(m.role)}</span>
        </div>
    </div>`;
}

function buildVideoButton(team) {
    if (!team.videoId) return '';
    const vidId = escapeHTML(team.videoId);
    const start = Number(team.startTime) || 0;
    return `
    <button onclick="window.openVideoModal('${vidId}', ${start}, event)" class="flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#d7f70c] text-zinc-400 hover:text-black border border-zinc-700 hover:border-[#d7f70c] px-3 py-1 rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(215,247,12,0.4)] transition-all duration-300 group/btn">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        <span class="text-[9px] font-black uppercase tracking-widest">Voir</span>
    </button>`;
}

// --- BLOCS DE CONSTRUCTION PRINCIPAUX ---

function buildHeader(agentName, data, c, iconName, agentMeta = null) {
    const webpIcon = iconName ? iconName.replace('.png', '.webp') : 'physique.webp';
    const role = agentMeta?.role || data.role || '';
    const elemKey = agentMeta?.element || data.element || '';
    const roleLabel = role ? tTerm(role) : '';
    const elemLabel = elemKey ? tTerm(elemKey) : '';

    const rawFaction = agentMeta?.faction || '';
    const jsSafeFaction = rawFaction.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const factionFilterHint = currentLang === 'en' ? 'Filter by this faction' : 'Filtrer par cette faction';

    const factionHTML = rawFaction
        ? `<button type="button" onclick="window.closeModal('agentDetailModal'); window.setFactionFilter('${jsSafeFaction}');" title="${factionFilterHint}" class="text-zinc-400 hover:text-[#d7f70c] font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-2 inline-flex items-center gap-1.5 w-fit transition-colors cursor-pointer group/fac text-left">
               <span>${escapeHTML(tData(data.factionTitle))}</span>
               <svg class="w-3 h-3 text-zinc-600 group-hover/fac:text-[#d7f70c] group-hover/fac:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
           </button>`
        : `<span class="text-zinc-400 font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase mb-2">${escapeHTML(tData(data.factionTitle))}</span>`;

    const roleBadgeHTML = role
        ? `<div title="${escapeHTML(roleLabel)}" class="bg-[#1a1a1a] rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg border border-white/5"><img src="assets/Rôles/${escapeHTML(role)}.webp" alt="${escapeHTML(roleLabel)}" loading="lazy" class="w-7 h-7 sm:w-9 sm:h-9 object-contain opacity-90" style="filter: drop-shadow(0 0 8px rgba(255,255,255,0.2));"></div>`
        : '';

    return `
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-zinc-800 pb-6 gap-4">
        <div class="flex flex-col flex-1 min-w-0">
            ${factionHTML}
            <h2 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black italic text-white leading-tight uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-colors duration-500 cursor-default break-words" style="text-shadow: 0 0 20px ${c}40;" onmouseover="this.style.color='${c}'" onmouseout="this.style.color='white'">${escapeHTML(agentName)}</h2>
        </div>
        <div class="flex flex-wrap items-end gap-2 shrink-0">
            ${roleBadgeHTML}
            <div title="${escapeHTML(elemLabel)}" class="bg-[#1a1a1a] rounded-xl w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center shadow-lg border border-white/5"><img src="assets/Icone/${webpIcon}" alt="${escapeHTML(elemLabel)}" loading="lazy" class="w-7 h-7 sm:w-9 sm:h-9 object-contain" style="filter: drop-shadow(0 0 8px ${c});"></div>
            <div class="rounded-xl text-black w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-black text-2xl sm:text-3xl" style="background-color: ${c}; box-shadow: 0 0 15px ${c}40;">${escapeHTML(data.rank)}</div>
        </div>
    </div>`;
}

function buildStats(data, c, txt) {
    const statsHTML = (data.stats || []).map(stat => {
        const noteHTML = stat.note ? `<span class="text-zinc-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide mt-1 leading-tight opacity-90">${escapeHTML(tData(stat.note))}</span>` : '';
        return `
        <div class="bg-black/50 p-4 rounded-xl border border-zinc-800 w-full sm:flex-1 shadow-inner flex justify-between items-center">
            <span class="block text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">${escapeHTML(tStats(stat.label))}</span>
            <div class="flex flex-col items-end text-right">
                <span class="text-white font-black text-xl drop-shadow-md">${escapeHTML(stat.value)}</span>
                ${noteHTML}
            </div>
        </div>`;
    }).join('');

    return `
    <div id="guide-sec-stats" style="scroll-margin-top: 96px;" class="bg-[#111] text-white rounded-2xl p-5 sm:p-6 mb-10 shadow-2xl border border-zinc-800 relative overflow-hidden group">
        <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full blur-3xl transition-all duration-700" style="background-color: ${c}10; group-hover:background-color: ${c}20;"></div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-5 relative z-10 gap-2 border-b border-zinc-800/50 pb-4">
            <h3 class="font-display font-black uppercase text-xl sm:text-2xl tracking-wide" style="color: ${c};">${txt.statsLabel}</h3>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            ${statsHTML}
        </div>
    </div>`;
}

function buildDiscs(data, c, txt) {
    const discsHTML = (data.discs || []).map((disc, index) => {
        const isFirst = index === 0;
        const tagBg = isFirst ? c : '#27272a';
        const tagColor = isFirst ? '#000' : '#fff';
        const tagShadow = isFirst ? `0 0 15px ${c}60` : 'transparent';
        const noteHTML = disc.note ? `<p class="text-[10px] text-zinc-400 mt-2">${escapeHTML(tData(disc.note))}</p>` : '';

        return `
        <div class="bg-[#121212] border border-zinc-700 rounded-xl p-5 transition-all duration-300 relative shadow-xl group">
            <div class="absolute -top-3 -right-3 text-[10px] font-black px-3 py-1.5 rounded-lg border-2 border-black uppercase" style="background-color: ${tagBg}; color: ${tagColor}; box-shadow: ${tagShadow};">${escapeHTML(tData(disc.tag))}</div>
            <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                <div class="flex -space-x-4">
                    <!-- Disque 4P cliquable -->
                    <div data-disc="${escapeHTML(disc.set1)}" title="${escapeHTML(tDisc(disc.set1Name))}" class="cursor-pointer hover:scale-110 hover:z-20 transition-transform relative w-14 h-14 rounded-full border-2 border-zinc-800 bg-black z-10 overflow-hidden shadow-lg">
                        <img src="assets/Disque/${disc.set1}.webp" loading="lazy" class="w-full h-full object-cover">
                    </div>
                    <!-- Disque 2P cliquable -->
                    <div data-disc="${escapeHTML(disc.set2)}" title="${escapeHTML(tDisc(disc.set2Name))}" class="cursor-pointer hover:scale-110 hover:z-20 transition-transform relative w-12 h-12 rounded-full border-2 border-zinc-800 bg-black z-0 opacity-80 hover:opacity-100 overflow-hidden">
                        <img src="assets/Disque/${disc.set2}.webp" loading="lazy" class="w-full h-full object-cover">
                    </div>
                </div>
                <div class="flex flex-col">
                    <span data-disc="${escapeHTML(disc.set1)}" class="cursor-pointer hover:text-[#d7f70c] transition-colors font-black text-sm uppercase text-white tracking-wide">${escapeHTML(tDisc(disc.set1Name))}</span>
                    <span data-disc="${escapeHTML(disc.set2)}" class="cursor-pointer hover:text-[#d7f70c] transition-colors font-bold text-xs text-zinc-400">${escapeHTML(tDisc(disc.set2Name))}</span>
                </div>
            </div>
            ${noteHTML}
        </div>`;
    }).join('');

    return `
    <div id="guide-sec-discs" style="scroll-margin-top: 96px;">
        <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide mb-6" style="border-color: ${c};">${txt.discSets}</h3>
        <div class="flex flex-col gap-5">
            ${discsHTML}
        </div>
    </div>`;
}

function buildSkills(data, c, txt) {
    const skillsList = data.skills || [];
    const skillsHTML = skillsList.map((skill, index) => {
        const skillName = (skill.name || '').toUpperCase();
        const needsMoreZoom = ['ASSIST', 'BASIC', 'DODGE'].includes(skillName);
        const scaleClass = needsMoreZoom ? 'scale-[1.35]' : 'scale-[1.15]';
        const isFirst = index === 0;
        const iconSrc = `assets/Skills/${(skill.icon || '').replace('.png', '.webp')}`;
        const levelText = skill.level ? `(${escapeHTML(skill.level)})` : '';
        const arrow = (index < skillsList.length - 1)
            ? `<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 text-zinc-700 shrink-0 -mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>`
            : '';

        let iconContainer;
        if (isFirst) {
            iconContainer = `
            <div class="relative">
                <div class="absolute inset-0 rounded-full blur-md opacity-40" style="background-color: ${c};"></div>
                <div class="w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-full border-2 bg-black relative z-10 overflow-hidden" style="border-color: ${c};">
                    <img src="${iconSrc}" loading="lazy" draggable="false" class="w-full h-full object-cover object-center ${scaleClass} pointer-events-none">
                </div>
            </div>`;
        } else {
            iconContainer = `
            <div class="relative w-10 h-10 sm:w-11 sm:h-11 2xl:w-12 2xl:h-12 rounded-full border-2 border-zinc-700 bg-black overflow-hidden">
                <img src="${iconSrc}" loading="lazy" draggable="false" class="w-full h-full object-cover object-center ${scaleClass} pointer-events-none">
            </div>`;
        }

        return `
        <div class="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0 ${isFirst ? 'group cursor-default' : 'opacity-80'}">
            ${iconContainer}
            <span class="text-[9px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-wider whitespace-nowrap" style="color: ${isFirst ? c : '#a1a1aa'};">${escapeHTML(skill.name)}${levelText}</span>
        </div>
        ${arrow}`;
    }).join('');

    return `
    <div id="guide-sec-skills" style="scroll-margin-top: 96px;" class="h-fit overflow-hidden w-full">
        <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide mb-6" style="border-color: ${c};">${txt.skillPrio}</h3>
        <div class="relative">
            <div class="bg-[#0f0f0f] px-3 py-4 sm:px-4 sm:py-5 2xl:p-5 rounded-2xl border border-zinc-800 shadow-inner flex flex-nowrap items-center justify-between gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                ${skillsHTML}
            </div>
        </div>
    </div>`;
}

function buildStatPriority(data, c, txt) {
    const mainList = data.statPriority?.main || [];
    const subList = data.statPriority?.sub || [];

    const mainHTML = mainList.map((m, index) => {
        const slotColor = index === 0 ? c : (index === 1 ? '#ef4444' : '#71717a');
        const borderColor = index === 0 ? 'border-zinc-600 shadow-lg' : 'border-zinc-800';
        const labelColor = index === 0 ? 'text-white' : 'text-zinc-300';
        return `
        <div class="flex items-center gap-4 bg-[#121212] p-3.5 rounded-xl border ${borderColor}">
            <span class="font-black text-xl w-6 text-center" style="color: ${slotColor};">${escapeHTML(m.slot)}</span>
            <span class="font-bold uppercase tracking-wider text-sm flex-1 ${labelColor}">${escapeHTML(tStats(m.label))}</span>
        </div>`;
    }).join('');

    const subHTML = subList.map((s, index) => {
        const color = s.highlight ? c : '#d4d4d8';
        const separator = (index < subList.length - 1) ? `<span class="text-zinc-700 shrink-0 select-none">&gt;&gt;</span>` : '';
        return `
        <span class="bg-[#1a1a1a] px-2.5 py-1.5 rounded-md border border-zinc-700 shrink-0 whitespace-nowrap shadow-inner" style="color: ${color};">${escapeHTML(tStats(s.label))}</span>${separator}`;
    }).join('');

    return `
    <div>
        <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide mb-6" style="border-color: ${c};">${txt.statistics}</h3>
        <div class="flex flex-col gap-2.5 mb-5">
            ${mainHTML}
        </div>
        <div class="bg-[#0f0f0f] p-4 rounded-xl border border-zinc-800/80 relative">
            <span class="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-3">${txt.substatsPrio}</span>
            <div class="flex items-center gap-2 text-xs font-bold uppercase overflow-x-auto flex-nowrap md:flex-wrap pb-1 pr-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                ${subHTML}
            </div>
            <div class="absolute right-[1px] bottom-[1px] top-[1px] w-12 bg-gradient-to-l from-[#0f0f0f] to-transparent pointer-events-none md:hidden rounded-r-xl"></div>
        </div>
    </div>`;
}

function buildEngines(data, c, txt) {
    const enginesHTML = (data.engines || []).map((eng, index) => {
        const isFirst = index === 0;
        const borderColor = isFirst ? `${c}40` : '#27272a';
        const shadow = isFirst ? `0 0 15px ${c}10` : 'none';
        const tagBg = isFirst ? `${c}20` : 'transparent';
        const tagColor = isFirst ? c : '#a1a1aa';
        const titleColor = isFirst ? '#fff' : '#d4d4d8';
        const imgSrc = `assets/W-Engine/${(eng.img || '').replace('.png', '.webp')}`;

        return `
        <div data-engine="${escapeHTML(eng.name)}" class="cursor-pointer flex gap-4 p-3.5 rounded-xl border bg-[#121212]" style="border-color: ${borderColor}; box-shadow: ${shadow};">
            <div class="sheen"></div>
            <div class="w-14 h-14 bg-black rounded-lg border border-zinc-800 overflow-hidden"><img src="${imgSrc}" loading="lazy" class="w-full h-full object-cover"></div>
            <div class="flex flex-col justify-center">
                <span class="text-[10px] uppercase font-bold mb-1 px-2 py-0.5 rounded w-fit" style="background-color: ${tagBg}; color: ${tagColor};">${escapeHTML(tData(eng.tag))}</span>
                <span class="font-black text-xs uppercase tracking-wide" style="color: ${titleColor};">${escapeHTML(tEngine(eng.name))}</span>
            </div>
        </div>`;
    }).join('');

    return `
    <div id="guide-sec-engines" style="scroll-margin-top: 96px;">
        <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide mb-6" style="border-color: ${c};">${txt.engines}</h3>
        <div class="flex flex-col gap-3">
            ${enginesHTML}
        </div>
    </div>`;
}

function buildTeams(agentName, data, c, txt) {
    const teamsList = data.teams || [];
    const teamsHTML = teamsList.map((team, index) => {
        const isFirst = index === 0;
        const tagBg = isFirst ? `${c}20` : '#27272a';
        const tagColor = isFirst ? c : '#a1a1aa';
        const tagBorder = isFirst ? `${c}40` : '#3f3f46';
        const num = String(index + 1).padStart(2, '0');

        const membersList = team.members || [];
        const membersHTML = membersList.map((m, i) => {
            const memberCard = buildTeamMember(m, i, agentName);
            const separator = (i < membersList.length - 1) ? `<div class="w-6 h-px bg-zinc-700"></div>` : '';
            return memberCard + separator;
        }).join('');

        return `
        <div class="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-colors hover:border-zinc-700">
            <div class="absolute right-4 -top-5 text-[85px] font-display font-black text-zinc-800/20 italic tracking-tighter leading-none pointer-events-none select-none transform group-hover:scale-110 transition-all duration-700">${num}</div>
            
            <div class="flex flex-col mb-6 border-b border-zinc-800/80 pb-3 relative z-10">
                <div class="flex items-center justify-between">
                    <span class="text-white font-display font-black italic text-2xl tracking-widest drop-shadow-md">${escapeHTML(tData(team.name))}</span>
                    <div class="flex items-center gap-2">
                        ${buildVideoButton(team)}
                        <span class="text-[10px] font-bold uppercase border px-3 py-1 rounded tracking-wide shadow-sm" style="background-color: ${tagBg}; color: ${tagColor}; border-color: ${tagBorder};">${escapeHTML(tData(team.tag))}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-between gap-2 relative z-10">
                ${membersHTML}
            </div>
        </div>`;
    }).join('');

    return `
    <div id="guide-sec-teams" style="scroll-margin-top: 96px;" class="border-t border-zinc-800/80 pt-10">
        <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide mb-8" style="border-color: ${c};">${txt.teams}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            ${teamsHTML}
        </div>
    </div>`;
}

// --- GESTIONNAIRE D'INTERACTION DES MINDSCAPES ---
if (typeof window !== 'undefined') {
    window.setMindscape = function(idx, color) {
        const modal = document.getElementById('agentDetailModal');
        if (!modal) return;

        const tabs = modal.querySelectorAll('.ms-tab-btn');
        const panels = modal.querySelectorAll('.ms-panel-card');

        tabs.forEach((tab, i) => {
            const isActive = (i === idx);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive) {
                tab.style.backgroundColor = color;
                tab.style.color = '#000';
                tab.style.borderColor = color;
                tab.style.boxShadow = `0 0 18px ${color}60`;
                tab.classList.add('scale-[1.02]', 'z-10');
            } else {
                tab.style.backgroundColor = '#141414';
                tab.style.color = '#71717a';
                tab.style.borderColor = '#27272a';
                tab.style.boxShadow = 'none';
                tab.classList.remove('scale-[1.02]', 'z-10');
            }
        });

        panels.forEach((panel, i) => {
            if (i === idx) {
                panel.classList.remove('hidden');
                panel.style.animation = 'none';
                void panel.offsetWidth; // Force le recalcul pour rejouer l'animation
                panel.style.animation = 'msSlideFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards';
            } else {
                panel.classList.add('hidden');
            }
        });
    };
}

function buildMindscapes(mindscapes, c) {
    if (!mindscapes || !Array.isArray(mindscapes) || mindscapes.length === 0) return '';

    const isEn = currentLang === 'en';
    const subHeader = isEn ? 'Key Ranks (4/4)' : 'Paliers Clés (4/4)';
    const statusText = isEn ? 'RESONANCE ACTIVE' : 'RÉSONANCE ACTIVE';

    // 1. Boutons Sélecteurs (M1, M2, M4, M6)
    const tabsHTML = mindscapes.map((ms, index) => {
        const isFirst = index === 0;
        const initialBg = isFirst ? c : '#141414';
        const initialColor = isFirst ? '#000' : '#71717a';
        const initialBorder = isFirst ? c : '#27272a';
        const initialShadow = isFirst ? `box-shadow: 0 0 18px ${c}60;` : '';
        const initialScale = isFirst ? 'scale-[1.02] z-10' : '';
        const rankLabel = escapeHTML(ms.rank || `M${index + 1}`);

        return `
        <button type="button"
            onclick="window.setMindscape(${index}, '${c}')"
            aria-selected="${isFirst ? 'true' : 'false'}"
            class="ms-tab-btn py-2.5 sm:py-3 rounded-xl border font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 select-none cursor-pointer flex items-center justify-center hover:text-white hover:border-zinc-500 ${initialScale}"
            style="background-color: ${initialBg}; color: ${initialColor}; border-color: ${initialBorder}; ${initialShadow}">
            ${rankLabel}
        </button>`;
    }).join('');

    // 2. Écrans d'affichage holographique
    const panelsHTML = mindscapes.map((ms, index) => {
        const isFirst = index === 0;
        const rankText = escapeHTML(ms.rank || `M${index + 1}`);

        return `
        <div class="ms-panel-card ${isFirst ? '' : 'hidden'} relative z-10">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 border-b border-zinc-800/80 pb-3">
                <div class="flex items-center gap-3">
                    <span class="font-black text-xs px-2.5 py-1 rounded-md border tracking-widest uppercase shadow-sm" style="color: ${c}; background-color: ${c}15; border-color: ${c}40;">
                        ${rankText}
                    </span>
                    <h4 class="text-white font-display font-black uppercase tracking-wide text-base sm:text-lg drop-shadow-md">
                        ${escapeHTML(tData(ms.title))}
                    </h4>
                </div>
                <span class="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500 hidden sm:inline-block">
                    ${statusText}
                </span>
            </div>
            <p class="text-zinc-300 text-xs sm:text-sm leading-relaxed sm:leading-loose font-normal pr-2 sm:pr-8">
                ${escapeHTML(tData(ms.desc))}
            </p>
        </div>`;
    }).join('');

    return `
    <div id="guide-sec-mindscapes" style="scroll-margin-top: 96px;" class="mt-14 border-t border-zinc-800/80 pt-10">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-white font-display font-black text-2xl uppercase border-l-4 pl-4 leading-none tracking-wide" style="border-color: ${c};">Mindscapes</h3>
            <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden sm:inline-block">${subHeader}</span>
        </div>

        <div class="bg-gradient-to-br from-[#121212] via-[#0e0e0e] to-[#0a0a0a] border border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
            <!-- Lueur diffuse de fond -->
            <div class="absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20" style="background-color: ${c};"></div>
            
            <!-- Filigrane matriciel géant -->
            <div class="absolute right-4 bottom-0 text-[80px] sm:text-[110px] font-display font-black text-white/[0.03] italic select-none pointer-events-none leading-none">
                MINDSCAPES
            </div>

            <!-- Grille des 4 sélecteurs -->
            <div class="grid grid-cols-4 gap-2 sm:gap-3 mb-5 relative z-10 w-full">
                ${tabsHTML}
            </div>

            <!-- Conteneur d'affichage dynamique -->
            <div class="min-h-[140px] sm:min-h-[100px] flex flex-col justify-center relative">
                ${panelsHTML}
            </div>
        </div>
    </div>`;
}

// --- FONCTION PRINCIPALE (ASSEMBLAGE) ---

export function generateGuideFromData(agentName, data, mindscapesDB, agentMeta = null) {
    const iconName = data.elementIcon || iconMap[data.element] || 'physique.png';
    const c = data.color || '#d7f70c';
    const txt = ui[currentLang] || ui.fr;
    
    const mindscapes = mindscapesDB ? mindscapesDB[agentName] : null;

    return `
    <div class="max-w-[1400px] w-full mx-auto pb-20 pt-4 text-zinc-100">
        ${buildHeader(agentName, data, c, iconName, agentMeta)}
        ${buildStats(data, c, txt)}

<div class="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-14">
    <div class="flex flex-col gap-10">
        ${buildDiscs(data, c, txt)}
        ${buildSkills(data, c, txt)}
    </div>
    <div class="flex flex-col gap-10">
        ${buildStatPriority(data, c, txt)}
        ${buildEngines(data, c, txt)}
    </div>
</div>

        ${buildTeams(agentName, data, c, txt)}
        ${buildMindscapes(mindscapes, c)}
    </div>
    `;
}
