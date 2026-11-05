// showcase/showcase-init.js - Contrôleur Showcase V4 (Vrais Agents, Modale Supports 3 Colonnes, Leaderboards & Update Report)
import {
    ELEMENT_COLORS,
    AGENT_CUSTOM_COLORS,
    SUPPORT_CATALOG,
    fetchEnkaShowcaseData,
    evaluateAgentBuild,
    computeCalculatorSimulation
} from './showcase-math.js?v=4';

// Purge automatique des anciens caches v1 à v4 pour re-synchroniser proprement les vrais noms d'agents et de moteurs
try {
    ['zzz_proxyqg_showcase_accounts_v1', 'zzz_proxyqg_showcase_profiles_v1',
     'zzz_proxyqg_showcase_accounts_v2', 'zzz_proxyqg_showcase_profiles_v2',
     'zzz_proxyqg_showcase_accounts_v3', 'zzz_proxyqg_showcase_profiles_v3',
     'zzz_proxyqg_showcase_accounts_v4', 'zzz_proxyqg_showcase_profiles_v4'].forEach(k => localStorage.removeItem(k));
} catch (e) {}

const STORAGE_ACCOUNTS_KEY = 'zzz_proxyqg_showcase_accounts_v5';
const STORAGE_PROFILES_KEY = 'zzz_proxyqg_showcase_profiles_v5';

let modalEl = null;
let currentView = 'profile'; // 'profile' | 'leaderboards' | 'agent_leaderboard' | 'calculator'
let activeUID = '';
let activeLbAgentName = 'Miyabi';
let activeLbRegion = 'Global';
let activeCalcAgentName = '';
let isSyncing = false;
let syncErrorMsg = '';
let sortByMode = 'top';
let filterDiscSet = 'all';
let filterDiscGrade = 'all';
let lastUpdateReport = null;

// État de la modale "Assemble your support agent" (Image 4)
let supportModalState = null; // { agentName, slotIdx: 0 | 1, agentKey, weaponKey, setKey }

let calcState = {
    mindscape: 0,
    refinement: 5,
    enemyDef: 952,
    rolls: { ATK_: 11, ATK: 1, CR: 15, CDMG: 13, PEN: 2 }
};

let allSiteAgents = [];
fetch('js/data/agents.json').then(r => r.json()).then(list => {
    allSiteAgents = Array.isArray(list) ? list : [];
}).catch(() => {});

// Petites icônes SVG de statistiques comme sur FAE
const STAT_ICONS = {
    HP:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    HP_:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
    ATK:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6.92 5H5l9 9 1-.94m4.96 6.06l-.84.84a.996.996 0 0 1-1.41 0l-3.12-3.12-2.68 2.66-1.41-1.41 1.42-1.42L3 7.75V3h4.75l8.92 8.92 1.42-1.42 1.41 1.41-2.67 2.67 3.12 3.12c.4.4.4 1.03.01 1.42z"/></svg>`,
    ATK_: `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M6.92 5H5l9 9 1-.94m4.96 6.06l-.84.84a.996.996 0 0 1-1.41 0l-3.12-3.12-2.68 2.66-1.41-1.41 1.42-1.42L3 7.75V3h4.75l8.92 8.92 1.42-1.42 1.41 1.41-2.67 2.67 3.12 3.12c.4.4.4 1.03.01 1.42z"/></svg>`,
    DEF:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
    DEF_: `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
    CR:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="12" cy="12" r="3"/></svg>`,
    CDMG: `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15 9 22 9 16 14 18 21 12 17 6 21 8 14 2 9 9 9"/></svg>`,
    AP:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></svg>`,
    AM:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>`,
    PEN:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    IMP:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    ER:   `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2"/></svg>`,
    DMG:  `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 14.8 9.2 22 12 14.8 14.8 12 22 9.2 14.8 2 12 9.2 9.2"/></svg>`
};

function getSavedAccounts() {
    try {
        const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { myAccount: null, others: [] };
}

function saveAccountToHistory(profile, setAsMyAccount = false) {
    if (!profile || !profile.uid) return;
    const data = getSavedAccounts();
    const entry = {
        uid: profile.uid,
        nickname: profile.nickname || `Proxy #${profile.uid.slice(-4)}`,
        region: profile.region || 'EU',
        avatar: profile.avatarImg || 'assets/Agents/Miyabi.webp'
    };

    if (setAsMyAccount || !data.myAccount) {
        data.myAccount = entry;
        data.others = (data.others || []).filter(o => o.uid !== entry.uid);
    } else if (data.myAccount.uid === entry.uid) {
        data.myAccount = entry;
    } else {
        data.others = [entry, ...(data.others || []).filter(o => o.uid !== entry.uid)].slice(0, 8);
    }

    try {
        localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(data));
    } catch (e) {}
}

function getSavedProfilesMap() {
    try {
        const raw = localStorage.getItem(STORAGE_PROFILES_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
}

function saveProfilesMap(map) {
    try {
        localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(map));
    } catch (e) {}
}

function mergeShowcaseAndBuildReport(uid, incomingProfile) {
    const map = getSavedProfilesMap();
    const existing = map[uid];
    const changes = [];

    if (!existing || !Array.isArray(existing.agents) || existing.agents.length === 0) {
        map[uid] = incomingProfile;
        saveProfilesMap(map);
        saveAccountToHistory(incomingProfile);

        (incomingProfile.agents || []).forEach(ag => {
            const ev = evaluateAgentBuild(ag, uid, map);
            changes.push({
                name: ag.name,
                isNew: true,
                oldRank: null,
                newRank: ev.lbRank,
                discDiffs: ev.discs.slice(0, 2).map(d => ({
                    setImg: d.setImg,
                    oldGrade: null,
                    newGrade: d.eval.grade
                }))
            });
        });
        return { profile: incomingProfile, changes };
    }

    const oldEvalMap = {};
    existing.agents.forEach(oldAg => {
        oldEvalMap[oldAg.name] = evaluateAgentBuild(oldAg, uid, map);
    });

    const mergedAgents = [...existing.agents];
    (incomingProfile.agents || []).forEach(newAg => {
        const idx = mergedAgents.findIndex(a => a.name === newAg.name);
        if (idx !== -1) {
            if (mergedAgents[idx].locked) return;
            const oldEv = oldEvalMap[newAg.name];
            const tempNewEv = evaluateAgentBuild(newAg, uid, map);

            const discDiffs = [];
            tempNewEv.discs.forEach(newD => {
                const oldD = (oldEv?.discs || []).find(x => x.slot === newD.slot);
                const oldSig = oldD ? `${oldD.setKey}_${oldD.main}_${oldD.eval.weightedRolls}` : '';
                const newSig = `${newD.setKey}_${newD.main}_${newD.eval.weightedRolls}`;
                if (oldSig !== newSig) {
                    discDiffs.push({
                        setImg: newD.setImg,
                        oldSetImg: oldD?.setImg || newD.setImg,
                        oldGrade: oldD?.eval?.grade || 'A',
                        newGrade: newD.eval.grade
                    });
                }
            });

            if (discDiffs.length > 0 || (oldEv && oldEv.buildScore !== tempNewEv.buildScore)) {
                changes.push({
                    name: newAg.name,
                    isNew: false,
                    oldRank: oldEv ? oldEv.lbRank : tempNewEv.lbRank,
                    newRank: tempNewEv.lbRank,
                    discDiffs: discDiffs.slice(0, 3)
                });
            }

            mergedAgents[idx] = {
                ...newAg,
                supports: mergedAgents[idx].supports || [
                    { agent: 'none', weapon: 'none', set: 'none' },
                    { agent: 'none', weapon: 'none', set: 'none' }
                ],
                favorite: mergedAgents[idx].favorite,
                locked: false,
                lastUpdatedTs: Date.now()
            };
        } else {
            const tempNewEv = evaluateAgentBuild(newAg, uid, map);
            changes.push({
                name: newAg.name,
                isNew: true,
                oldRank: null,
                newRank: tempNewEv.lbRank,
                discDiffs: tempNewEv.discs.slice(0, 2).map(d => ({
                    setImg: d.setImg,
                    oldSetImg: d.setImg,
                    oldGrade: null,
                    newGrade: d.eval.grade
                }))
            });
            mergedAgents.unshift({ ...newAg, lastUpdatedTs: Date.now() });
        }
    });

    const updated = {
        ...existing,
        nickname: incomingProfile.nickname || existing.nickname,
        region: incomingProfile.region || existing.region,
        signature: incomingProfile.signature || existing.signature,
        avatarImg: incomingProfile.avatarImg || existing.avatarImg,
        updatedAt: incomingProfile.updatedAt,
        agents: mergedAgents
    };
    map[uid] = updated;
    saveProfilesMap(map);
    saveAccountToHistory(updated);
    return { profile: updated, changes };
}

export function onUIDInputFocus(inpEl) {
    const drop = document.getElementById('zsc-header-uid-dropdown');
    if (!drop) return;
    const data = getSavedAccounts();

    if (!data.myAccount && (!data.others || data.others.length === 0)) {
        drop.classList.remove('open');
        return;
    }

    drop.innerHTML = `
        ${data.myAccount ? `
            <div class="zsc-uid-group-title">My Account</div>
            <div class="zsc-uid-acct-row" data-pick-uid="${data.myAccount.uid}">
                <div class="zsc-uid-acct-left">
                    <img src="${data.myAccount.avatar}" class="zsc-uid-acct-ava" alt="" onerror="this.src='assets/Agents/Miyabi.webp'">
                    <span class="zsc-uid-acct-name">${data.myAccount.nickname}</span>
                </div>
                <span class="zsc-uid-region-pill">${data.myAccount.region}</span>
            </div>
        ` : ''}
        ${data.others && data.others.length > 0 ? `
            <div class="zsc-uid-group-title others">Other Accounts</div>
            ${data.others.map(o => `
                <div class="zsc-uid-acct-row" data-pick-uid="${o.uid}">
                    <div class="zsc-uid-acct-left">
                        <img src="${o.avatar}" class="zsc-uid-acct-ava" alt="" onerror="this.src='assets/Agents/Miyabi.webp'">
                        <span class="zsc-uid-acct-name">${o.nickname}</span>
                    </div>
                    <span class="zsc-uid-region-pill">${o.region}</span>
                </div>
            `).join('')}
        ` : ''}
    `;

    drop.classList.add('open');
    drop.querySelectorAll('[data-pick-uid]').forEach(row => {
        row.addEventListener('click', () => {
            const picked = row.getAttribute('data-pick-uid');
            if (inpEl) inpEl.value = picked;
            drop.classList.remove('open');
            openShowcaseFromInput(picked);
        });
    });

    if (!window.__zscOutsideBound) {
        window.__zscOutsideBound = true;
        document.addEventListener('mousedown', (ev) => {
            const w = document.getElementById('zsc-header-uid-widget');
            const d = document.getElementById('zsc-header-uid-dropdown');
            if (w && d && !w.contains(ev.target)) {
                d.classList.remove('open');
            }
        });
    }
}

function ensureModalDOM() {
    if (modalEl) return;
    modalEl = document.createElement('div');
    modalEl.id = 'zzz-showcase-modal';
    document.body.appendChild(modalEl);
}

export async function openShowcaseFromInput(rawUid) {
    ensureModalDOM();
    const cleanUid = String(rawUid || '').replace(/\D/g, '');
    const saved = getSavedAccounts();
    activeUID = cleanUid || saved.myAccount?.uid || '';

    document.getElementById('zsc-header-uid-dropdown')?.classList.remove('open');
    currentView = 'profile';
    syncErrorMsg = '';
    lastUpdateReport = null;
    supportModalState = null;
    document.body.classList.add('modal-open');
    modalEl.classList.add('visible');

    if (!activeUID) {
        renderShowcaseModal();
        return;
    }

    const map = getSavedProfilesMap();
    if (!map[activeUID]) {
        await triggerLiveEnkaSync(activeUID, false);
    } else {
        renderShowcaseModal();
    }
}
window.openZZZShowcaseModal = openShowcaseFromInput;

async function triggerLiveEnkaSync(uidToSync, showReportPopup = true) {
    if (!uidToSync || isSyncing) return;
    isSyncing = true;
    syncErrorMsg = '';
    renderShowcaseModal();

    try {
        const liveProfile = await fetchEnkaShowcaseData(uidToSync);
        const { changes } = mergeShowcaseAndBuildReport(uidToSync, liveProfile);
        if (showReportPopup) {
            lastUpdateReport = { changes };
        }
    } catch (err) {
        syncErrorMsg = err.message || 'Erreur lors de la synchronisation avec Enka.Network.';
    } finally {
        isSyncing = false;
        renderShowcaseModal();
    }
}

function closeShowcaseModal() {
    if (!modalEl) return;
    modalEl.classList.remove('visible');
    document.body.classList.remove('modal-open');
}

function exportAgentCardSummary(agEval, profile) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    const col = AGENT_CUSTOM_COLORS[agEval.name] || ELEMENT_COLORS[agEval.element] || '#e11d48';
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, col);
    grad.addColorStop(0.55, '#121218');
    grad.addColorStop(1, '#09090d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    ctx.strokeStyle = col;
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 1176, 606);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 italic 44px Montserrat, sans-serif';
    ctx.fillText(`${agEval.name.toUpperCase()} (M${agEval.mindscape || 0}) — PROXYQG`, 48, 72);

    ctx.fillStyle = '#d7f70c';
    ctx.font = '800 22px monospace';
    ctx.fillText(`${profile.nickname} (${profile.region}) • UID ${profile.uid} • Rank #${agEval.lbRank} / ${agEval.lbTotal} (${agEval.topPct}%)`, 48, 112);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '800 24px Montserrat, sans-serif';
    ctx.fillText(`Impactful Substats : ${agEval.totalMajor}${agEval.totalMinor > 0 ? ' + ' + agEval.totalMinor : ''} rolls`, 48, 165);

    agEval.discs.forEach((d, idx) => {
        const y = 220 + idx * 62;
        ctx.fillStyle = 'rgba(12,12,18,0.85)';
        ctx.fillRect(48, y, 1104, 52);
        ctx.fillStyle = '#d7f70c';
        ctx.font = '900 italic 26px Montserrat, sans-serif';
        ctx.fillText(`[${d.slot}] Note ${d.eval.grade}`, 68, y + 35);
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 20px sans-serif';
        const subsTxt = d.substats.map(s => `${s.key.replace('_', '%')}${s.up > 0 ? ' +' + s.up : ''}`).join('  •  ');
        ctx.fillText(`Main: ${d.main}   |   ${subsTxt}`, 260, y + 34);
    });

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `ProxyQG_${agEval.name}_${profile.uid}.png`;
    a.click();
}

function renderShowcaseModal() {
    const map = getSavedProfilesMap();
    const profile = map[activeUID] || null;
    let evaluatedAgents = profile ? (profile.agents || []).map(ag => evaluateAgentBuild(ag, activeUID, map)) : [];

    evaluatedAgents.sort((a, b) => {
        if ((b.favorite ? 1 : 0) !== (a.favorite ? 1 : 0)) {
            return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
        }
        if (sortByMode === 'top') {
            return (a.topPctNum - b.topPctNum) || (b.buildScore - a.buildScore);
        }
        if (sortByMode === 'rank') {
            return (a.lbRank - b.lbRank) || (b.buildScore - a.buildScore);
        }
        if (sortByMode === 'date') {
            return (b.lastUpdatedTs || 0) - (a.lastUpdatedTs || 0);
        }
        return 0;
    });

    const allSetsInProfile = [...new Set(evaluatedAgents.flatMap(a => a.discs.map(d => d.setKey)))];
    let displayedAgents = [...evaluatedAgents];
    if (filterDiscSet !== 'all') {
        displayedAgents = displayedAgents.filter(a => a.discs.some(d => d.setKey === filterDiscSet));
    }
    if (filterDiscGrade !== 'all') {
        displayedAgents = displayedAgents.filter(a => a.discs.some(d => d.eval.grade === filterDiscGrade));
    }

    const railHTML = evaluatedAgents.map((ag, idx) => `
        <div class="zsc-rail-avatar ${idx === 0 ? 'active' : ''}" data-scroll-agent="${ag.name}" title="${ag.name}">
            <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}" onerror="this.src='assets/Agents/Miyabi.webp'">
            ${ag.locked ? `<span class="zsc-rail-lock-dot">🔒</span>` : ''}
        </div>
    `).join('');

    let mainViewHTML = '';
    if (currentView === 'leaderboards') {
        mainViewHTML = renderLeaderboardsOverview(map);
    } else if (currentView === 'agent_leaderboard') {
        mainViewHTML = renderAgentSpecificLeaderboard(activeLbAgentName, map);
    } else if (currentView === 'calculator' && evaluatedAgents.length > 0) {
        mainViewHTML = renderCalculatorView(evaluatedAgents);
    } else {
        mainViewHTML = renderProfileCardsView(profile, displayedAgents, allSetsInProfile);
    }

    const reportPopupHTML = lastUpdateReport ? renderUpdateReportPopup(lastUpdateReport) : '';
    const supportPopupHTML = supportModalState ? renderSupportSelectorModal(supportModalState) : '';

    modalEl.innerHTML = `
        <div class="zsc-topbar">
            <div class="zsc-top-brand">
                <button type="button" class="zsc-close-btn" id="zsc-btn-close">
                    <span>← Retour QG</span>
                </button>
            </div>

            <!-- Barre UID au centre + Bouton SVG Leaderboard juste à droite -->
            <div class="zsc-top-center-group">
                <div class="zsc-top-search-wrap">
                    <svg class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" id="zsc-modal-uid-inp" inputmode="numeric" maxlength="10" class="zsc-top-search-box" value="${activeUID}" placeholder="Search by UID...">
                </div>

                <button type="button" class="zsc-top-lb-svg-btn ${currentView === 'leaderboards' || currentView === 'agent_leaderboard' ? 'active' : ''}" id="zsc-btn-top-leaderboards" title="Leaderboards">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
                    </svg>
                </button>
            </div>

            <div></div>
        </div>

        <div class="zsc-body-layout">
            ${evaluatedAgents.length > 0 ? `<aside class="zsc-left-rail">${railHTML}</aside>` : ''}
            <div class="zsc-main-scroll custom-scrollbar" id="zsc-scroll-container">
                <div class="zsc-container">
                    ${mainViewHTML}
                </div>
            </div>
        </div>

        ${reportPopupHTML}
        ${supportPopupHTML}
    `;

    bindShowcaseEvents(profile, evaluatedAgents);
}

// Génère la Modale "Assemble your support agent" (3 Colonnes : AGENT | WEAPON | SET) - Image 4
function renderSupportSelectorModal(stModal) {
    const slotLabel = stModal.slotIdx === 0 ? 'SLOT A' : 'SLOT B';
    return `
        <div class="zsc-report-overlay" id="zsc-sup-backdrop">
            <div class="zsc-sup-modal-box">
                <span class="zsc-sup-slot-tag">${slotLabel}</span>
                <div class="zsc-report-header">
                    <h3 class="zsc-report-title" style="font-size:17px;">Assemble your support agent</h3>
                    <button type="button" class="zsc-report-close" id="zsc-close-sup-x">✕</button>
                </div>

                <div class="zsc-report-note-box">
                    <strong>Please note:</strong> Only agents and gear that provides team-wide buffs are being listed here. If the gear you are running is not being listed, just leave it blank.
                </div>

                <div class="zsc-sup-3col-head">
                    <span>AGENT</span>
                    <span>WEAPON</span>
                    <span>SET</span>
                </div>

                <div class="zsc-sup-3col-scroll">
                    <div class="zsc-sup-col-list">
                        ${SUPPORT_CATALOG.agents.map(a => `
                            <button type="button" class="zsc-sup-item-btn ${stModal.agentKey === a.key ? 'active' : ''}" data-sup-pick-agent="${a.key}">
                                ${a.img ? `<img src="${a.img}" alt="${a.name}">` : `<div style="width:28px;height:28px;border-radius:999px;background:#14141a;border:1px solid #3f3f4a;flex-shrink:0;"></div>`}
                                <div style="min-width:0;flex:1;">
                                    <span class="zsc-sup-item-name">${a.name}</span>
                                    ${a.buffsLbl ? `<span class="zsc-sup-item-buffs">${a.buffsLbl}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>

                    <div class="zsc-sup-col-list">
                        ${SUPPORT_CATALOG.weapons.map(w => `
                            <button type="button" class="zsc-sup-item-btn ${stModal.weaponKey === w.key ? 'active' : ''}" data-sup-pick-weapon="${w.key}">
                                ${w.img ? `<img src="${w.img}" alt="${w.name}">` : `<div style="width:28px;height:28px;border-radius:999px;background:#14141a;border:1px solid #3f3f4a;flex-shrink:0;"></div>`}
                                <div style="min-width:0;flex:1;">
                                    <span class="zsc-sup-item-name">${w.name}</span>
                                    ${w.buffsLbl ? `<span class="zsc-sup-item-buffs">${w.buffsLbl}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>

                    <div class="zsc-sup-col-list">
                        ${SUPPORT_CATALOG.sets.map(s => `
                            <button type="button" class="zsc-sup-item-btn ${stModal.setKey === s.key ? 'active' : ''}" data-sup-pick-set="${s.key}">
                                ${s.img ? `<img src="${s.img}" alt="${s.name}">` : `<div style="width:28px;height:28px;border-radius:999px;background:#14141a;border:1px solid #3f3f4a;flex-shrink:0;"></div>`}
                                <div style="min-width:0;flex:1;">
                                    <span class="zsc-sup-item-name">${s.name}</span>
                                    ${s.buffsLbl ? `<span class="zsc-sup-item-buffs">${s.buffsLbl}</span>` : ''}
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button type="button" class="zsc-report-gotit-btn" id="zsc-confirm-sup-btn">Confirm</button>
            </div>
        </div>
    `;
}

function renderUpdateReportPopup(report) {
    const changes = report?.changes || [];
    const rowsHTML = changes.length === 0
        ? `<div class="zsc-report-agent-box" style="text-align:center;color:#a1a1aa;font-size:12.5px;font-weight:700;padding:18px;">
                Aucune modification détectée sur les 6 agents actuellement affichés dans votre vitrine en jeu.
           </div>`
        : changes.map(ch => `
            <div class="zsc-report-agent-box">
                <div class="zsc-report-agent-top">
                    <div style="display:flex;align-items:center;gap:9px;">
                        <img src="assets/Agents/${ch.name}.webp" style="width:28px;height:28px;border-radius:999px;object-fit:cover;object-position:top center;border:1.5px solid #fff;" onerror="this.src='assets/Agents/Miyabi.webp'">
                        <strong style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:14px;color:#fff;">${ch.name}</strong>
                    </div>
                    <div style="font-family:'Montserrat',sans-serif;font-size:12.5px;font-weight:800;color:#d4d4d8;">
                        ${ch.isNew
                            ? `<span style="color:#4ade80;font-weight:900;">NEW</span> &nbsp;Rank <strong style="color:#f97316;">#${ch.newRank}</strong>`
                            : `Rank <strong style="color:#f97316;">#${ch.oldRank}</strong> → <strong style="color:#f97316;">#${ch.newRank}</strong>`
                        }
                    </div>
                </div>
                ${ch.discDiffs && ch.discDiffs.length > 0 ? `
                <div class="zsc-report-disc-diff">
                    ${ch.discDiffs.map(df => `
                        <div class="zsc-report-disc-pair">
                            ${df.oldGrade ? `
                                <img src="${df.oldSetImg || df.setImg}" style="width:26px;height:26px;border-radius:999px;">
                                <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;font-size:13px;color:#f59e0b;">${df.oldGrade}</span>
                                <span style="color:#71717a;font-size:11px;">→</span>
                            ` : ''}
                            <img src="${df.setImg}" style="width:26px;height:26px;border-radius:999px;">
                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-style:italic;font-size:13px;color:#38bdf8;">${df.newGrade}</span>
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
        `).join('');

    return `
        <div class="zsc-report-overlay" id="zsc-report-backdrop">
            <div class="zsc-report-modal">
                <div class="zsc-report-header">
                    <h3 class="zsc-report-title">Update report</h3>
                    <button type="button" class="zsc-report-close" id="zsc-close-report-x">✕</button>
                </div>

                <div style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow-y:auto;">
                    ${rowsHTML}
                </div>

                <div class="zsc-report-note-box">
                    <strong>Note:</strong> Discs must be <strong>level 15</strong> to be recognised.
                </div>

                <div class="zsc-report-note-box">
                    <strong>Hint:</strong> You can use the <strong>🔒 button</strong> to lock specific builds, preventing them from being updated. Particularly useful when sharing equipment between agents.
                </div>

                <button type="button" class="zsc-report-gotit-btn" id="zsc-close-report-btn">Got it</button>
            </div>
        </div>
    `;
}

function renderProfileCardsView(profile, evaluatedAgents, allSetsInProfile) {
    if (isSyncing) {
        return `
            <div style="text-align:center;padding:80px 20px;display:flex;flex-direction:column;align-items:center;gap:14px;">
                <div style="width:46px;height:46px;border:4px solid #272732;border-top-color:#d7f70c;border-radius:999px;animation:zscSpin 0.8s linear infinite;"></div>
                <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:20px;color:#fff;margin:0;">Synchronisation en direct avec Enka.Network...</h2>
                <p style="font-size:12.5px;color:#8e8e99;margin:0;">Lecture des 6 agents affichés dans la vitrine de l'UID ${activeUID}</p>
            </div>
        `;
    }

    if (!profile) {
        return `
            <div style="text-align:center;padding:70px 20px;background:#121218;border:1.5px solid #272734;border-radius:24px;display:flex;flex-direction:column;align-items:center;gap:14px;">
                <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:22px;color:#fff;margin:0;">
                    ${syncErrorMsg ? 'Vitrine inaccessible ou vide' : 'Entrez votre UID Zenless Zone Zero'}
                </h2>
                <p style="font-size:13px;color:#a1a1aa;max-width:520px;line-height:1.55;margin:0;">
                    ${syncErrorMsg || 'Tapez votre UID à 10 chiffres dans la barre ci-dessus pour importer automatiquement les 6 agents de votre vitrine en jeu et calculer vos notes E à Z.'}
                </p>
                ${activeUID ? `
                <button type="button" class="zsc-update-btn" id="zsc-btn-sync-enka">
                    <span>↻ Réessayer (${activeUID})</span>
                </button>` : ''}
            </div>
        `;
    }

    const cardsHTML = evaluatedAgents.map(ag => {
        const agColor = AGENT_CUSTOM_COLORS[ag.name] || ELEMENT_COLORS[ag.element] || '#e11d48';
        const leftDiscs = ag.discs.filter(d => d.slot <= 3);
        const rightDiscs = ag.discs.filter(d => d.slot >= 4);

        const renderDiscWing = (d, isRight) => {
            const gClass = d.eval.grade === 'S+' ? 'zsc-grade-Sp' : `zsc-grade-${d.eval.grade}`;
            const mainIcon = STAT_ICONS[d.main.replace('%', '_')] || STAT_ICONS.DMG;
            return `
                <div class="zsc-disc-Wing ${isRight ? 'right-side' : ''}">
                    <div class="zsc-grade-circle ${gClass}">${d.eval.grade}</div>
                    <div class="zsc-disc-stats-mid">
                        ${isRight ? `<span class="zsc-disc-main-pill">${mainIcon} ${d.main}</span>` : ''}
                        ${d.substats.map(s => {
                            const isMaj = ag.weights.major.includes(s.key);
                            const isMin = ag.weights.minor.includes(s.key);
                            const cls = isMaj ? 'sub-major' : (isMin ? 'sub-minor' : '');
                            const sIcon = STAT_ICONS[s.key] || '';
                            return `
                            <div class="zsc-disc-sub-row ${cls}">
                                <span class="zsc-stat-lbl-wrap">${sIcon}<span>${s.key.replace('_', '%')}</span></span>
                                <span>${s.up > 0 ? `+${s.up}` : ''}</span>
                            </div>`;
                        }).join('')}
                    </div>
                    <div class="zsc-disc-set-circle">
                        <img src="${d.setImg}" alt="" onerror="this.style.display='none'">
                    </div>
                </div>
            `;
        };

        const st = ag.stats || {};
        const statRows = [
            { k: 'HP',   lbl: 'HP',     d: st.hp },
            { k: 'DEF',  lbl: 'DEF',    d: st.def },
            { k: 'ATK',  lbl: 'ATK',    d: st.atk },
            { k: 'IMP',  lbl: 'Impact', d: st.imp },
            { k: 'CR',   lbl: 'CR',     d: st.cr },
            { k: 'CDMG', lbl: 'CDMG',   d: st.cdmg },
            { k: 'AP',   lbl: 'AP',     d: st.ap },
            { k: 'AM',   lbl: 'AM',     d: st.am },
            { k: 'PEN',  lbl: 'PEN',    d: st.pen },
            { k: 'ER',   lbl: 'ER',     d: st.er },
            { k: 'DMG',  lbl: st.dmg?.label || 'DMG%', d: st.dmg }
        ].filter(r => r.d && (r.d.init || r.d.buffed));

        const rollChipsHTML = Object.entries(ag.rollSummary).map(([k, count]) => `
            <div class="zsc-roll-chip">
                <span style="opacity:0.8;display:inline-flex;">${STAT_ICONS[k] || ''}</span>
                <span class="zsc-roll-count-badge">${count}x</span>
                <span>${k.replace('_', '%')}</span>
            </div>
        `).join('');

        const renderSupSlot = (slotIdx) => {
            const sup = ag.supports?.[slotIdx] || { agent: 'none', weapon: 'none', set: 'none' };
            const aObj = SUPPORT_CATALOG.agents.find(x => x.key === sup.agent);
            const wObj = SUPPORT_CATALOG.weapons.find(x => x.key === sup.weapon);
            const sObj = SUPPORT_CATALOG.sets.find(x => x.key === sup.set);

            if (!aObj || aObj.key === 'none') {
                return `<div class="zsc-sup-slot" data-open-sup="${ag.name}" data-sup-idx="${slotIdx}" title="Ajouter un Support">${slotIdx + 1}</div>`;
            }
            return `
                <div class="zsc-sup-slot" data-open-sup="${ag.name}" data-sup-idx="${slotIdx}" title="${aObj.name}">
                    <img src="${aObj.img}" class="sup-ava" alt="${aObj.name}">
                    ${wObj && wObj.key !== 'none' ? `<img src="${wObj.img}" class="zsc-sup-mini-wep" alt="">` : ''}
                    ${sObj && sObj.key !== 'none' ? `<img src="${sObj.img}" class="zsc-sup-mini-set" alt="">` : ''}
                </div>
            `;
        };

        return `
        <section class="zsc-agent-card" id="zsc-card-${ag.name}" style="--ag-color: ${agColor};">
            <div class="zsc-card-watermark" style="background-image:url('assets/splash/${ag.name}.webp'), url('assets/Agents/${ag.name}.webp');"></div>

            <div class="zsc-card-actions">
                <button type="button" class="zsc-card-act-btn" data-act-export="${ag.name}" title="Exporter la carte en PNG">📷</button>
                <button type="button" class="zsc-card-act-btn" data-act-calc="${ag.name}" title="Ouvrir dans le Calculateur">🧮</button>
                <button type="button" class="zsc-card-act-btn" data-act-guide="${ag.name}" title="Voir le Guide ProxyQG">📖</button>
                <button type="button" class="zsc-card-act-btn ${ag.favorite ? 'active' : ''}" data-act-fav="${ag.name}" title="Épingler en favori">☆</button>
                <button type="button" class="zsc-card-act-btn ${ag.locked ? 'active' : ''}" data-act-lock="${ag.name}" title="Verrouiller ce build">${ag.locked ? '🔒' : '🔓'}</button>
                <button type="button" class="zsc-card-act-btn" data-act-del="${ag.name}" title="Retirer de la liste">🗑</button>
            </div>

            <div class="zsc-card-header">
                <div class="zsc-card-title-row">
                    <div class="zsc-card-ava-wrap">
                        <span class="zsc-card-m-badge">M${ag.mindscape || 0}</span>
                        <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}" onerror="this.src='assets/Agents/Miyabi.webp'">
                    </div>
                    <h3 class="zsc-card-agent-name">${ag.name}</h3>
                </div>
                <div class="zsc-card-lb-line" data-open-agent-lb="${ag.name}" title="Voir le classement de ${ag.name}">
                    <span style="color:#8e8e99;">Leaderboard</span>
                    <strong>${ag.leaderboardName || 'S Rank Limited W-Engines'} ⌄</strong>
                </div>
                <div class="zsc-card-rank-row">
                    <span>Rank <strong style="color:#fff;">#${ag.lbRank}</strong> out of <strong style="color:#fff;">${ag.lbTotal}</strong></span>
                    <span class="zsc-pct-badge">${ag.topPct}% 🔥</span>
                </div>
            </div>

            <div class="zsc-card-body">
                <div class="zsc-stats-panel">
                    <div class="zsc-supports-box">
                        <span style="font-size:10.5px;font-weight:800;color:#d4d4d8;">Supports</span>
                        <div class="zsc-supports-slots">
                            ${renderSupSlot(0)}
                            ${renderSupSlot(1)}
                        </div>
                    </div>

                    <div class="zsc-stats-head">
                        <span><strong style="color:#fff;">Stats</strong> &nbsp;Buffs</span>
                        <span>Initial &gt; <strong style="color:var(--ag-color);">Buffed</strong></span>
                    </div>

                    <div class="zsc-stats-list">
                        ${statRows.map(r => `
                            <div class="zsc-stat-line ${r.d.highlight ? 'is-major' : 'is-minor'}">
                                <span class="zsc-stat-lbl-wrap">${STAT_ICONS[r.k] || ''}<span>${r.lbl}</span></span>
                                <span class="zsc-stat-vals">
                                    ${r.d.init ? `<span style="color:${r.d.buffed ? '#71717a' : 'inherit'};">${r.d.init}</span>` : ''}
                                    ${r.d.init && r.d.buffed ? `<span style="color:#52525b;">&gt;</span>` : ''}
                                    ${r.d.buffed ? `<span style="color:${r.d.highlight ? 'var(--ag-color)' : '#fff'};">${r.d.buffed}</span>` : ''}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="zsc-discs-assembly">
                    <div class="zsc-disc-col">
                        ${leftDiscs.map(d => renderDiscWing(d, false)).join('')}
                    </div>

                    <div class="zsc-center-wengine" title="${ag.engine?.name || ''}">
                        <span class="zsc-wengine-ref-pill">R${ag.engine?.refinement || 1}</span>
                        <img src="${ag.engine?.img || 'assets/W-Engine/Starlight_Engine.webp'}" alt="${ag.engine?.name || ''}" onerror="this.src='assets/W-Engine/Starlight_Engine.webp'">
                    </div>

                    <div class="zsc-disc-col">
                        ${rightDiscs.map(d => renderDiscWing(d, true)).join('')}
                    </div>
                </div>
            </div>

            <div class="zsc-card-footer">
                <div class="zsc-roll-chips">${rollChipsHTML}</div>
                <div class="zsc-bottom-meta">
                    <span>Last update - ${ag.updatedAt || profile.updatedAt}</span>
                    <div class="zsc-impactful-trigger">
                        <span>Impactful substats &nbsp;<strong style="color:#fff;">${ag.totalMajor}</strong>${ag.totalMinor > 0 ? ` <strong style="color:var(--ag-color);">+ ${ag.totalMinor}</strong>` : ''}</span>
                        <div class="zsc-substats-popover">
                            <div>
                                <div style="font-size:9px;font-weight:900;color:#71717a;margin-bottom:4px;">MAJOR SUBSTATS</div>
                                ${ag.weights.major.map(m => `<div style="font-size:11px;font-weight:900;color:#fff;padding:2px 0;">${m.replace('_', '%')}</div>`).join('')}
                            </div>
                            <div>
                                <div style="font-size:9px;font-weight:900;color:#71717a;margin-bottom:4px;">MINOR SUBSTATS</div>
                                ${ag.weights.minor.map(m => `<div style="font-size:11px;font-weight:800;color:#a1a1aa;padding:2px 0;">${m.replace('_', '%')}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <span>UID • ${profile.uid}</span>
                </div>
            </div>
        </section>`;
    }).join('');

    return `
        <div class="zsc-profile-header">
            <div class="zsc-profile-id">
                <img src="${profile.avatarImg || 'assets/Agents/Miyabi.webp'}" class="zsc-profile-ava" alt="" onerror="this.src='assets/Agents/Miyabi.webp'">
                <div>
                    <div class="zsc-profile-name-row">
                        <h2 class="zsc-profile-name">${profile.nickname}</h2>
                        <span class="zsc-uid-region-pill">${profile.region}</span>
                    </div>
                    <p class="zsc-profile-bio">${profile.signature || ''}</p>
                </div>
            </div>

            <button type="button" class="zsc-update-btn" id="zsc-btn-sync-enka">
                <span>↻ Update from Showcase</span>
            </button>
        </div>

        ${syncErrorMsg ? `<div style="background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.45);color:#fca5a5;padding:10px 14px;border-radius:12px;font-size:12px;font-weight:700;">${syncErrorMsg}</div>` : ''}

        <div class="zsc-controls-bar">
            <div class="zsc-controls-left">
                <div class="zsc-sort-pills">
                    <button type="button" class="zsc-sort-btn ${sortByMode === 'top' ? 'active' : ''}" data-zsc-sort="top">Top%</button>
                    <button type="button" class="zsc-sort-btn ${sortByMode === 'rank' ? 'active' : ''}" data-zsc-sort="rank">Rank</button>
                    <button type="button" class="zsc-sort-btn ${sortByMode === 'date' ? 'active' : ''}" data-zsc-sort="date">Date</button>
                </div>

                <select id="zsc-filter-disc-set" class="zsc-filter-select">
                    <option value="all">≡ Disc Sets</option>
                    ${allSetsInProfile.map(sk => `<option value="${sk}" ${filterDiscSet === sk ? 'selected' : ''}>${sk.replace(/_/g, ' ')}</option>`).join('')}
                </select>

                <select id="zsc-filter-disc-grade" class="zsc-filter-select">
                    <option value="all">≡ Disc Grades</option>
                    ${['Z', 'S+', 'S', 'A', 'B', 'C', 'D'].map(g => `<option value="${g}" ${filterDiscGrade === g ? 'selected' : ''}>Grade ${g}</option>`).join('')}
                </select>
            </div>
        </div>

        ${cardsHTML || `<div style="text-align:center;padding:40px;color:#71717a;font-weight:700;">Aucun agent ne correspond à ces filtres.</div>`}
    `;
}

// --- VUE LEADERBOARDS GLOBALE PAR AGENT ---
function renderLeaderboardsOverview(profilesMap) {
    const list = allSiteAgents.length > 0 ? [...allSiteAgents].reverse() : [];
    const countBuildsForAgent = (agName) => {
        let c = 0;
        Object.values(profilesMap || {}).forEach(p => {
            if ((p?.agents || []).some(a => a.name === agName)) c++;
        });
        return c;
    };

    return `
        <div>
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
                <div>
                    <button type="button" class="zsc-sort-btn active" id="zsc-lb-back-profile" style="margin-bottom:8px;">← Back to Profile</button>
                    <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:26px;color:#fff;margin:0;">Leaderboards</h2>
                    <p style="font-size:12.5px;color:#8e8e99;margin:4px 0 0;">Browse builds registered by players on ProxyQG.</p>
                </div>
            </div>

            <div class="zsc-lb-agents-grid">
                ${list.map(a => {
                    const count = countBuildsForAgent(a.name);
                    return `
                    <div class="zsc-lb-agent-tile" data-open-agent-lb="${a.name}">
                        <img src="assets/Agents/${a.name}.webp" style="width:44px;height:44px;border-radius:999px;object-fit:cover;object-position:top center;background:#09090d;border:1.5px solid #3f3f46;">
                        <div style="min-width:0;flex:1;">
                            <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.name}</div>
                            <div style="font-size:11px;color:#71717a;font-weight:700;">${count} Build${count > 1 ? 's' : ''}</div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `;
}

// --- VUE CLASSEMENT D'UN AGENT (IMAGE 3 : PHOENIX LEADERBOARD) ---
function renderAgentSpecificLeaderboard(agentName, profilesMap) {
    const contenders = [];
    Object.values(profilesMap || {}).forEach(p => {
        const ag = (p?.agents || []).find(a => a.name === agentName);
        if (ag) {
            const ev = evaluateAgentBuild(ag, p.uid, profilesMap);
            contenders.push({
                uid: p.uid,
                nickname: p.nickname,
                region: p.region || 'EU',
                avatarImg: p.avatarImg || `assets/Agents/${agentName}.webp`,
                ev
            });
        }
    });

    const filtered = activeLbRegion === 'Global'
        ? contenders
        : contenders.filter(c => c.region.toUpperCase() === activeLbRegion.toUpperCase());

    filtered.sort((a, b) => b.ev.buildScore - a.ev.buildScore);

    return `
        <div style="display:flex;flex-direction:column;gap:18px;">
            <div>
                <button type="button" class="zsc-sort-btn active" id="zsc-back-to-lb-overview" style="margin-bottom:12px;">← Back to Overview</button>
                <div style="display:flex;align-items:center;gap:14px;">
                    <img src="assets/Agents/${agentName}.webp" style="width:56px;height:56px;border-radius:999px;object-fit:cover;object-position:top center;border:2px solid #c4b5fd;">
                    <div>
                        <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:24px;color:#fff;margin:0;">${agentName}</h2>
                        <span style="font-size:12px;color:#8e8e99;font-weight:700;">${contenders.length} Build${contenders.length > 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>

            <div class="zsc-controls-bar">
                <div class="zsc-controls-left">
                    <div class="zsc-sort-pills">
                        ${['Global', 'EU', 'NA', 'Asia', 'CHT'].map(reg => `
                            <button type="button" class="zsc-sort-btn ${activeLbRegion === reg ? 'active' : ''}" data-lb-region="${reg}">${reg}</button>
                        `).join('')}
                    </div>
                    <span style="font-size:11.5px;color:#8e8e99;font-weight:700;">${filtered.length} Contender${filtered.length > 1 ? 's' : ''}</span>
                </div>
            </div>

            ${filtered.length === 0 ? `
                <div style="text-align:center;padding:50px 20px;background:#14141b;border:1px solid #262632;border-radius:18px;color:#71717a;font-weight:700;">
                    Aucun joueur n'a encore enregistré de build pour ${agentName} dans cette région.
                </div>
            ` : `
                <div class="zsc-lb-contenders-grid">
                    ${filtered.map((c, idx) => {
                        const rankNum = idx + 1;
                        const rankColor = rankNum === 1 ? '#f59e0b' : (rankNum === 2 ? '#cbd5e1' : (rankNum === 3 ? '#d97706' : '#8e8e99'));
                        const d4 = c.ev.discs.find(d => d.slot === 4)?.main || '-';
                        const d5 = c.ev.discs.find(d => d.slot === 5)?.main || '-';
                        const d6 = c.ev.discs.find(d => d.slot === 6)?.main || '-';
                        return `
                        <div class="zsc-contender-card" data-open-contender-uid="${c.uid}">
                            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.06);">
                                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                                    <img src="${c.avatarImg}" style="width:34px;height:34px;border-radius:999px;object-fit:cover;object-position:top center;border:1.5px solid #3f3f4a;">
                                    <div style="min-width:0;">
                                        <div style="display:flex;align-items:center;gap:6px;">
                                            <strong style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.nickname}</strong>
                                            <span class="zsc-uid-region-pill">${c.region}</span>
                                        </div>
                                        <span style="font-family:monospace;font-size:10px;color:#71717a;">${c.uid}</span>
                                    </div>
                                </div>
                                <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:15px;color:${rankColor};">
                                    #${rankNum}
                                </div>
                            </div>

                            <div class="zsc-contender-row">
                                <span>Mindscape</span>
                                <strong>M${c.ev.mindscape || 0}</strong>
                                <span>W-Engine</span>
                                <span style="display:inline-flex;align-items:center;gap:5px;">
                                    <img src="${c.ev.engine?.img || 'assets/W-Engine/Starlight_Engine.webp'}" style="width:20px;height:20px;object-fit:contain;">
                                    <strong>R${c.ev.engine?.refinement || 1}</strong>
                                </span>
                            </div>

                            <div class="zsc-contender-row">
                                <span>Discs</span>
                                <div style="display:flex;align-items:center;gap:3px;">
                                    ${c.ev.discs.map(d => `<img src="${d.setImg}" style="width:20px;height:20px;border-radius:999px;">`).join('')}
                                </div>
                            </div>

                            <div class="zsc-contender-row">
                                <span>Mainstats</span>
                                <strong>${d4} <sup style="color:#71717a;">4</sup> &nbsp;${d5} <sup style="color:#71717a;">5</sup> &nbsp;${d6} <sup style="color:#71717a;">6</sup></strong>
                            </div>

                            <div class="zsc-contender-row">
                                <span>Substats</span>
                                <strong>${c.ev.totalMajor} + ${c.ev.totalMinor}</strong>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            `}
        </div>
    `;
}

function renderCalculatorView(evaluatedAgents) {
    const ag = evaluatedAgents.find(a => a.name === activeCalcAgentName) || evaluatedAgents[0];
    const sim = computeCalculatorSimulation(ag, calcState);

    return `
        <div class="zsc-calc-box">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
                <div style="display:flex;align-items:center;gap:12px;">
                    <img src="assets/Agents/${ag.name}.webp" style="width:48px;height:48px;border-radius:999px;border:2px solid #a78bfa;object-fit:cover;object-position:top center;">
                    <div>
                        <button type="button" class="zsc-close-btn" id="zsc-calc-back" style="margin-bottom:6px;border-color:#a78bfa;">← Back to agent card</button>
                        <h2 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:20px;color:#fff;">${ag.name} Calculator</h2>
                    </div>
                </div>
                <select id="zsc-calc-pick-agent" class="zsc-filter-select">
                    ${evaluatedAgents.map(a => `<option value="${a.name}" ${a.name === ag.name ? 'selected' : ''}>${a.name}</option>`).join('')}
                </select>
            </div>

            <div class="zsc-calc-grid">
                <div class="zsc-calc-panel">
                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Mindscapes (M0–M6)</span>
                    <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                        <button type="button" class="zsc-sort-btn active" data-calc-m="-1">−</button>
                        <strong style="font-family:monospace;font-size:14px;">M${calcState.mindscape}</strong>
                        <button type="button" class="zsc-sort-btn active" data-calc-m="1">+</button>
                    </div>

                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">W-Engine Refinement</span>
                    <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                        <button type="button" class="zsc-sort-btn active" data-calc-r="-1">−</button>
                        <strong style="font-family:monospace;font-size:14px;">R${calcState.refinement}</strong>
                        <button type="button" class="zsc-sort-btn active" data-calc-r="1">+</button>
                    </div>
                    <img src="${ag.engine?.img || 'assets/W-Engine/Starlight_Engine.webp'}" style="width:64px;height:64px;object-fit:contain;margin:6px auto;">
                </div>

                <div class="zsc-calc-panel">
                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Substats (Rolls & Gain +1 Roll)</span>
                    ${['ATK_', 'ATK', 'CR', 'CDMG', 'PEN'].map(k => {
                        const gain = sim.marginalGains[k];
                        const isBest = gain === sim.marginalGains.CDMG && gain !== '+0%';
                        return `
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;background:#16161f;border-radius:10px;padding:6px 10px;">
                            <span style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:11px;width:50px;">${k.replace('_', '%')}</span>
                            <div style="display:flex;align-items:center;gap:6px;">
                                <button type="button" class="zsc-sort-btn active" data-calc-sub="${k}" data-delta="-1">−</button>
                                <strong style="font-family:monospace;width:22px;text-align:center;">${calcState.rolls[k] || 0}</strong>
                                <button type="button" class="zsc-sort-btn active" data-calc-sub="${k}" data-delta="1">+</button>
                            </div>
                            <span style="font-family:monospace;font-size:11px;font-weight:900;color:${gain === '+0%' ? '#71717a' : (isBest ? '#4ade80' : '#d4d4d8')};width:62px;text-align:right;">
                                ${gain}
                            </span>
                        </div>`;
                    }).join('')}

                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">Enemy DEF Target</span>
                    <select id="zsc-calc-enemy-def" class="zsc-filter-select" style="width:100%;">
                        <option value="952" ${calcState.enemyDef === 952 ? 'selected' : ''}>Common Boss (~952 DEF)</option>
                        <option value="600" ${calcState.enemyDef === 600 ? 'selected' : ''}>Low DEF Boss (~600 DEF)</option>
                        <option value="1250" ${calcState.enemyDef === 1250 ? 'selected' : ''}>High DEF Boss (~1250 DEF)</option>
                    </select>
                </div>

                <div class="zsc-calc-panel" style="justify-content:space-between;">
                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Result (Simulated Hit)</span>
                    <div class="zsc-calc-Result-orb">
                        <div style="font-size:11px;font-weight:800;color:#c4b5fd;text-decoration:underline;">Avg. Critical</div>
                        <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:30px;color:#fff;margin-top:4px;">${sim.avgCritDmg.toLocaleString('fr-FR')}</div>
                    </div>

                    <div style="background:#16161f;padding:10px;border-radius:12px;font-size:11px;display:flex;flex-direction:column;gap:4px;">
                        <strong style="color:#fff;margin-bottom:2px;">Combat Stats</strong>
                        <div style="display:flex;justify-content:space-between;"><span>ATK</span><strong>${sim.initAtk} → ${sim.combatAtk}</strong></div>
                        <div style="display:flex;justify-content:space-between;"><span>CR</span><strong>${sim.initCr}% → ${sim.combatCr}%</strong></div>
                        <div style="display:flex;justify-content:space-between;"><span>CDMG</span><strong>${sim.combatCdmg}%</strong></div>
                        <div style="display:flex;justify-content:space-between;"><span>DMG%</span><strong>${sim.dmgBonus}%</strong></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function bindShowcaseEvents(profile, evaluatedAgents) {
    document.getElementById('zsc-btn-close')?.addEventListener('click', closeShowcaseModal);

    const modalInp = document.getElementById('zsc-modal-uid-inp');
    modalInp?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && modalInp.value.trim()) {
            openShowcaseFromInput(modalInp.value.trim());
        }
    });

    // Bouton SVG Leaderboard en haut à droite de l'input UID
    document.getElementById('zsc-btn-top-leaderboards')?.addEventListener('click', () => {
        currentView = currentView === 'leaderboards' ? 'profile' : 'leaderboards';
        renderShowcaseModal();
    });

    document.getElementById('zsc-lb-back-profile')?.addEventListener('click', () => {
        currentView = 'profile';
        renderShowcaseModal();
    });

    document.getElementById('zsc-back-to-lb-overview')?.addEventListener('click', () => {
        currentView = 'leaderboards';
        renderShowcaseModal();
    });

    modalEl.querySelectorAll('[data-open-agent-lb]').forEach(el => {
        el.addEventListener('click', () => {
            activeLbAgentName = el.getAttribute('data-open-agent-lb');
            currentView = 'agent_leaderboard';
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-lb-region]').forEach(btn => {
        btn.addEventListener('click', () => {
            activeLbRegion = btn.getAttribute('data-lb-region');
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-open-contender-uid]').forEach(card => {
        card.addEventListener('click', () => {
            const targetUid = card.getAttribute('data-open-contender-uid');
            if (targetUid) openShowcaseFromInput(targetUid);
        });
    });

    // Modale "Assemble your support agent" (SLOT A / SLOT B)
    modalEl.querySelectorAll('[data-open-sup]').forEach(slotEl => {
        slotEl.addEventListener('click', () => {
            const agName = slotEl.getAttribute('data-open-sup');
            const slotIdx = parseInt(slotEl.getAttribute('data-sup-idx'), 10) || 0;
            const ag = evaluatedAgents.find(a => a.name === agName);
            const cur = ag?.supports?.[slotIdx] || { agent: 'none', weapon: 'none', set: 'none' };
            supportModalState = {
                agentName: agName,
                slotIdx,
                agentKey: cur.agent || 'none',
                weaponKey: cur.weapon || 'none',
                setKey: cur.set || 'none'
            };
            renderShowcaseModal();
        });
    });

    const closeSupModal = () => {
        supportModalState = null;
        renderShowcaseModal();
    };
    document.getElementById('zsc-close-sup-x')?.addEventListener('click', closeSupModal);
    document.getElementById('zsc-sup-backdrop')?.addEventListener('mousedown', (e) => {
        if (e.target.id === 'zsc-sup-backdrop') closeSupModal();
    });

    modalEl.querySelectorAll('[data-sup-pick-agent]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!supportModalState) return;
            supportModalState.agentKey = btn.getAttribute('data-sup-pick-agent');
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-sup-pick-weapon]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!supportModalState) return;
            supportModalState.weaponKey = btn.getAttribute('data-sup-pick-weapon');
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-sup-pick-set]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!supportModalState) return;
            supportModalState.setKey = btn.getAttribute('data-sup-pick-set');
            renderShowcaseModal();
        });
    });

    document.getElementById('zsc-confirm-sup-btn')?.addEventListener('click', () => {
        if (!supportModalState) return;
        const map = getSavedProfilesMap();
        const p = map[activeUID];
        const target = p?.agents?.find(a => a.name === supportModalState.agentName);
        if (target) {
            if (!Array.isArray(target.supports)) {
                target.supports = [
                    { agent: 'none', weapon: 'none', set: 'none' },
                    { agent: 'none', weapon: 'none', set: 'none' }
                ];
            }
            target.supports[supportModalState.slotIdx] = {
                agent: supportModalState.agentKey,
                weapon: supportModalState.weaponKey,
                set: supportModalState.setKey
            };
            saveProfilesMap(map);
        }
        supportModalState = null;
        renderShowcaseModal();
    });

    // Fermeture de la pop-up Update report
    const closeReport = () => {
        lastUpdateReport = null;
        renderShowcaseModal();
    };
    document.getElementById('zsc-close-report-x')?.addEventListener('click', closeReport);
    document.getElementById('zsc-close-report-btn')?.addEventListener('click', closeReport);
    document.getElementById('zsc-report-backdrop')?.addEventListener('mousedown', (e) => {
        if (e.target.id === 'zsc-report-backdrop') closeReport();
    });

    modalEl.querySelectorAll('[data-zsc-sort]').forEach(btn => {
        btn.addEventListener('click', () => {
            sortByMode = btn.getAttribute('data-zsc-sort');
            renderShowcaseModal();
        });
    });

    document.getElementById('zsc-filter-disc-set')?.addEventListener('change', (e) => {
        filterDiscSet = e.target.value;
        renderShowcaseModal();
    });
    document.getElementById('zsc-filter-disc-grade')?.addEventListener('change', (e) => {
        filterDiscGrade = e.target.value;
        renderShowcaseModal();
    });

    modalEl.querySelectorAll('[data-scroll-agent]').forEach(ava => {
        ava.addEventListener('click', () => {
            const name = ava.getAttribute('data-scroll-agent');
            if (currentView !== 'profile') {
                currentView = 'profile';
                renderShowcaseModal();
            }
            const card = document.getElementById(`zsc-card-${name}`);
            if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    document.getElementById('zsc-btn-sync-enka')?.addEventListener('click', () => {
        const inpVal = document.getElementById('zsc-modal-uid-inp')?.value.trim() || activeUID;
        if (inpVal) {
            activeUID = inpVal.replace(/\D/g, '');
            triggerLiveEnkaSync(activeUID, true);
        }
    });

    modalEl.querySelectorAll('[data-act-export]').forEach(btn => {
        btn.addEventListener('click', () => {
            const ag = evaluatedAgents.find(a => a.name === btn.getAttribute('data-act-export'));
            if (ag && profile) exportAgentCardSummary(ag, profile);
        });
    });

    modalEl.querySelectorAll('[data-act-calc]').forEach(btn => {
        btn.addEventListener('click', () => {
            activeCalcAgentName = btn.getAttribute('data-act-calc');
            currentView = 'calculator';
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-act-guide]').forEach(btn => {
        btn.addEventListener('click', () => {
            const agName = btn.getAttribute('data-act-guide');
            closeShowcaseModal();
            if (typeof window.openAgentDetail === 'function') {
                window.openAgentDetail(agName);
            }
        });
    });

    modalEl.querySelectorAll('[data-act-lock]').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-act-lock');
            const map = getSavedProfilesMap();
            const p = map[activeUID];
            const target = p?.agents?.find(a => a.name === name);
            if (target) {
                target.locked = !target.locked;
                saveProfilesMap(map);
                renderShowcaseModal();
            }
        });
    });

    modalEl.querySelectorAll('[data-act-fav]').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-act-fav');
            const map = getSavedProfilesMap();
            const p = map[activeUID];
            const target = p?.agents?.find(a => a.name === name);
            if (target) {
                target.favorite = !target.favorite;
                saveProfilesMap(map);
                renderShowcaseModal();
            }
        });
    });

    modalEl.querySelectorAll('[data-act-del]').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-act-del');
            const map = getSavedProfilesMap();
            const p = map[activeUID];
            if (p && Array.isArray(p.agents) && p.agents.length > 1) {
                p.agents = p.agents.filter(a => a.name !== name);
                saveProfilesMap(map);
                renderShowcaseModal();
            }
        });
    });

    document.getElementById('zsc-calc-back')?.addEventListener('click', () => {
        currentView = 'profile';
        renderShowcaseModal();
    });

    document.getElementById('zsc-calc-pick-agent')?.addEventListener('change', (e) => {
        activeCalcAgentName = e.target.value;
        renderShowcaseModal();
    });

    modalEl.querySelectorAll('[data-calc-m]').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = parseInt(btn.getAttribute('data-calc-m'), 10);
            calcState.mindscape = Math.min(6, Math.max(0, calcState.mindscape + d));
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-calc-r]').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = parseInt(btn.getAttribute('data-calc-r'), 10);
            calcState.refinement = Math.min(5, Math.max(1, calcState.refinement + d));
            renderShowcaseModal();
        });
    });

    modalEl.querySelectorAll('[data-calc-sub]').forEach(btn => {
        btn.addEventListener('click', () => {
            const k = btn.getAttribute('data-calc-sub');
            const d = parseInt(btn.getAttribute('data-delta'), 10);
            calcState.rolls[k] = Math.min(30, Math.max(0, (calcState.rolls[k] || 0) + d));
            renderShowcaseModal();
        });
    });

    document.getElementById('zsc-calc-enemy-def')?.addEventListener('change', (e) => {
        calcState.enemyDef = parseInt(e.target.value, 10) || 952;
        renderShowcaseModal();
    });
}
