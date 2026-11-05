// showcase/showcase-init.js - Contrôleur Lazy-Loaded (0 Ko au démarrage, Synchronisation Enka 6 Agents/vitrine)
import {
    ELEMENT_COLORS,
    AGENT_CUSTOM_COLORS,
    fetchEnkaShowcaseData,
    evaluateAgentBuild,
    computeCalculatorSimulation
} from './showcase-math.js?v=2';

const STORAGE_ACCOUNTS_KEY = 'zzz_proxyqg_showcase_accounts_v2';
const STORAGE_PROFILES_KEY = 'zzz_proxyqg_showcase_profiles_v2';

let modalEl = null;
let currentView = 'profile';
let activeUID = '';
let activeCalcAgentName = '';
let isSyncing = false;
let syncErrorMsg = '';
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

// ========================================================
// 1. GESTION DES COMPTES MÉMORISÉS (VIDE PAR DÉFAUT POUR TOUT VISITEUR)
// ========================================================
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
        avatar: profile.avatarImg || 'assets/Agents/Anby.webp'
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

// Fusionne les 6 agents de la vitrine actuelle avec ceux déjà enregistrés (sans écraser les agents verrouillés 🔒)
function mergeShowcaseProfile(uid, incomingProfile, replaceAll = false) {
    const map = getSavedProfilesMap();
    const existing = map[uid];

    if (!existing || replaceAll) {
        map[uid] = incomingProfile;
        saveProfilesMap(map);
        saveAccountToHistory(incomingProfile);
        return incomingProfile;
    }

    const mergedAgents = [...(existing.agents || [])];
    (incomingProfile.agents || []).forEach(newAg => {
        const idx = mergedAgents.findIndex(a => a.name === newAg.name);
        if (idx !== -1) {
            if (!mergedAgents[idx].locked) {
                mergedAgents[idx] = { ...newAg, favorite: mergedAgents[idx].favorite, locked: false };
            }
        } else {
            mergedAgents.push(newAg);
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
    return updated;
}

// ========================================================
// 2. MENU DÉROULANT MULTI-COMPTES AU FOCUS DE L'INPUT UID
// ========================================================
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
                    <img src="${data.myAccount.avatar}" class="zsc-uid-acct-ava" alt="">
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
                        <img src="${o.avatar}" class="zsc-uid-acct-ava" alt="">
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

// ========================================================
// 3. OUVERTURE & SYNCHRONISATION EN DIRECT DEPUIS ENKA.NETWORK
// ========================================================
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
    document.body.classList.add('modal-open');
    modalEl.classList.add('visible');

    if (!activeUID) {
        renderShowcaseModal();
        return;
    }

    const map = getSavedProfilesMap();
    if (!map[activeUID]) {
        await triggerLiveEnkaSync(activeUID, true);
    } else {
        renderShowcaseModal();
    }
}
window.openZZZShowcaseModal = openShowcaseFromInput;

async function triggerLiveEnkaSync(uidToSync, replaceAll = false) {
    if (!uidToSync || isSyncing) return;
    isSyncing = true;
    syncErrorMsg = '';
    renderShowcaseModal();

    try {
        const liveProfile = await fetchEnkaShowcaseData(uidToSync);
        mergeShowcaseProfile(uidToSync, liveProfile, replaceAll);
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
    ctx.fillText(`${agEval.name.toUpperCase()} (M${agEval.mindscape || 0}) — PROXYQG SHOWCASE`, 48, 72);

    ctx.fillStyle = '#d7f70c';
    ctx.font = '800 22px monospace';
    ctx.fillText(`${profile.nickname} (${profile.region}) • UID ${profile.uid} • Rank #${agEval.lbRank} / ${agEval.lbTotal} (Top ${agEval.topPct}%)`, 48, 112);

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
    const evaluatedAgents = profile ? (profile.agents || []).map(ag => evaluateAgentBuild(ag)) : [];

    const railHTML = evaluatedAgents.map((ag, idx) => `
        <div class="zsc-rail-avatar ${idx === 0 ? 'active' : ''}" data-scroll-agent="${ag.name}" title="${ag.name}">
            <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}">
            ${ag.locked ? `<span class="zsc-rail-lock-dot">🔒</span>` : ''}
        </div>
    `).join('');

    let mainViewHTML = '';
    if (currentView === 'leaderboards') {
        mainViewHTML = renderLeaderboardsView();
    } else if (currentView === 'calculator' && evaluatedAgents.length > 0) {
        mainViewHTML = renderCalculatorView(evaluatedAgents);
    } else {
        mainViewHTML = renderProfileCardsView(profile, evaluatedAgents);
    }

    modalEl.innerHTML = `
        <div class="zsc-topbar">
            <div class="zsc-top-brand">
                <button type="button" class="zsc-close-btn" id="zsc-btn-close">
                    <span>← Retour QG</span>
                </button>
                <div class="zsc-logo-title">
                    <span>FAE</span>
                    <span class="zsc-v2-pill">V2 • PROXYQG</span>
                </div>
            </div>

            <div class="zsc-top-search-wrap">
                <svg class="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" id="zsc-modal-uid-inp" inputmode="numeric" maxlength="10" class="zsc-top-search-box" value="${activeUID}" placeholder="Entrer un UID (ex: 1501142769)...">
            </div>

            <div class="zsc-top-nav-icons">
                <button type="button" class="zsc-nav-icon-btn ${currentView === 'profile' ? 'active' : ''}" data-zsc-view="profile">
                    <span>Profil (${evaluatedAgents.length})</span>
                </button>
                <button type="button" class="zsc-nav-icon-btn ${currentView === 'leaderboards' ? 'active' : ''}" data-zsc-view="leaderboards">
                    <span>Leaderboards</span>
                </button>
                ${evaluatedAgents.length > 0 ? `
                <button type="button" class="zsc-nav-icon-btn ${currentView === 'calculator' ? 'active' : ''}" data-zsc-view="calculator">
                    <span>Calculator</span>
                </button>` : ''}
            </div>
        </div>

        <div class="zsc-body-layout">
            ${evaluatedAgents.length > 0 ? `<aside class="zsc-left-rail">${railHTML}</aside>` : ''}
            <div class="zsc-main-scroll custom-scrollbar" id="zsc-scroll-container">
                <div class="zsc-container">
                    ${mainViewHTML}
                </div>
            </div>
        </div>
    `;

    bindShowcaseEvents(profile, evaluatedAgents);
}

function renderProfileCardsView(profile, evaluatedAgents) {
    if (isSyncing) {
        return `
            <div style="text-align:center;padding:80px 20px;display:flex;flex-direction:column;align-items:center;gap:14px;">
                <div style="width:46px;height:46px;border:4px solid #272732;border-top-color:#d7f70c;border-radius:999px;animation:spin 0.8s linear infinite;"></div>
                <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:20px;color:#fff;margin:0;">Synchronisation en direct avec Enka.Network...</h2>
                <p style="font-size:12.5px;color:#8e8e99;margin:0;">Récupération des 6 agents affichés dans la vitrine en jeu de l'UID ${activeUID}</p>
            </div>
        `;
    }

    if (!profile || evaluatedAgents.length === 0) {
        return `
            <div style="text-align:center;padding:70px 20px;background:#121218;border:1.5px solid #272734;border-radius:24px;display:flex;flex-direction:column;align-items:center;gap:14px;">
                <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:22px;color:#fff;margin:0;">
                    ${syncErrorMsg ? 'Vitrine inaccessible ou vide' : 'Entrez votre UID Zenless Zone Zero'}
                </h2>
                <p style="font-size:13px;color:#a1a1aa;max-width:520px;line-height:1.55;margin:0;">
                    ${syncErrorMsg || 'Tapez votre UID à 10 chiffres dans la barre ci-dessus pour importer automatiquement les 6 agents de votre vitrine en jeu, évaluer vos disques (notes E à Z) et consulter votre classement.'}
                </p>
                ${activeUID ? `
                <button type="button" class="zsc-update-btn" id="zsc-btn-sync-enka">
                    <span>↻ Réessayer la synchronisation (${activeUID})</span>
                </button>` : ''}
            </div>
        `;
    }

    const savedAccts = getSavedAccounts();
    const isMyMain = savedAccts.myAccount?.uid === profile.uid;

    const cardsHTML = evaluatedAgents.map(ag => {
        const agColor = AGENT_CUSTOM_COLORS[ag.name] || ELEMENT_COLORS[ag.element] || '#e11d48';
        const leftDiscs = ag.discs.filter(d => d.slot <= 3);
        const rightDiscs = ag.discs.filter(d => d.slot >= 4);

        const renderDiscWing = (d, isRight) => {
            const gClass = d.eval.grade === 'S+' ? 'zsc-grade-Sp' : `zsc-grade-${d.eval.grade}`;
            return `
                <div class="zsc-disc-Wing ${isRight ? 'right-side' : ''}">
                    <div class="zsc-grade-circle ${gClass}">${d.eval.grade}</div>
                    <div class="zsc-disc-stats-mid">
                        <span class="zsc-disc-main-pill">[${d.slot}] ${d.main}</span>
                        ${d.substats.map(s => {
                            const isMaj = ag.weights.major.includes(s.key);
                            const isMin = ag.weights.minor.includes(s.key);
                            const cls = isMaj ? 'sub-major' : (isMin ? 'sub-minor' : '');
                            return `
                            <div class="zsc-disc-sub-row ${cls}">
                                <span>${s.key.replace('_', '%')}</span>
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
                <span class="zsc-roll-count-badge">${count}x</span>
                <span>${k.replace('_', '%')}</span>
            </div>
        `).join('');

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
                        <img src="assets/Agents/${ag.name}.webp" alt="${ag.name}">
                    </div>
                    <h3 class="zsc-card-agent-name">${ag.name}</h3>
                </div>
                <div class="zsc-card-lb-line">
                    <span style="color:#8e8e99;">Leaderboard</span>
                    <strong>${ag.leaderboardName || 'S Rank Limited W-Engines'}</strong>
                </div>
                <div class="zsc-card-rank-row">
                    <span>Rank <strong style="color:#fff;">#${ag.lbRank}</strong> out of <strong style="color:#fff;">${ag.lbTotal}</strong></span>
                    <span class="zsc-pct-badge">${ag.topPct}%</span>
                </div>
            </div>

            <div class="zsc-card-body">
                <div class="zsc-stats-panel">
                    <div class="zsc-supports-box">
                        <span style="font-size:10.5px;font-weight:800;color:#d4d4d8;">Supports</span>
                        <div class="zsc-supports-slots">
                            <div class="zsc-sup-slot" title="Support 1">1</div>
                            <div class="zsc-sup-slot" title="Support 2">2</div>
                        </div>
                    </div>

                    <div class="zsc-stats-head">
                        <span><strong style="color:#fff;">Stats</strong> &nbsp;Buffs</span>
                        <span>Initial &gt; <strong style="color:var(--ag-color);">Buffed</strong></span>
                    </div>

                    <div class="zsc-stats-list">
                        ${statRows.map(r => `
                            <div class="zsc-stat-line ${r.d.highlight ? 'is-major' : 'is-minor'}">
                                <span>${r.lbl}</span>
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

                    <div class="zsc-center-wengine">
                        <span class="zsc-wengine-ref-pill">R${ag.engine?.refinement || 1}</span>
                        <img src="${ag.engine?.img || 'assets/W-Engine/Starlight_Engine.webp'}" alt="" onerror="this.src='assets/W-Engine/Starlight_Engine.webp'">
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
                <img src="${profile.avatarImg || 'assets/Agents/Anby.webp'}" class="zsc-profile-ava" alt="">
                <div>
                    <div class="zsc-profile-name-row">
                        <h2 class="zsc-profile-name">${profile.nickname}</h2>
                        <span class="zsc-uid-region-pill">${profile.region}</span>
                        <button type="button" class="zsc-nav-icon-btn ${isMyMain ? 'active' : ''}" id="zsc-btn-set-main" style="height:26px;padding:0 10px;font-size:10px;">
                            ${isMyMain ? '★ Mon Compte' : '☆ Définir comme Mon Compte'}
                        </button>
                    </div>
                    <p class="zsc-profile-bio">${profile.signature || ''}</p>
                </div>
            </div>

            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <button type="button" class="zsc-nav-icon-btn" id="zsc-btn-replace-enka" title="Remplacer la liste par uniquement les 6 agents actuellement dans votre vitrine en jeu">
                    <span>🔄 Vitrine actuelle seule (6 max)</span>
                </button>
                <button type="button" class="zsc-update-btn" id="zsc-btn-sync-enka" title="Cumuler les 6 agents actuels de votre vitrine avec ceux déjà enregistrés">
                    <span>↻ Update from Showcase (+6)</span>
                </button>
            </div>
        </div>

        ${syncErrorMsg ? `<div style="background:rgba(239,68,68,0.14);border:1px solid rgba(239,68,68,0.45);color:#fca5a5;padding:10px 14px;border-radius:12px;font-size:12px;font-weight:700;">${syncErrorMsg}</div>` : ''}

        <div class="zsc-controls-bar">
            <div class="zsc-sort-pills">
                <button type="button" class="zsc-sort-btn active">Top%</button>
                <button type="button" class="zsc-sort-btn">Rank</button>
                <button type="button" class="zsc-sort-btn">Date</button>
            </div>
            <div style="font-size:11.5px;color:#8e8e99;font-weight:700;">
                Vous pouvez afficher jusqu'à <strong style="color:#fff;">6 agents</strong> sur votre bannière en jeu : cliquez sur <strong style="color:#c4b5fd;">Update from Showcase (+6)</strong> pour cumuler vos agents 6 par 6.
            </div>
        </div>

        ${cardsHTML}
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
                        <button type="button" class="gacha-details-btn" id="zsc-calc-back" style="margin-bottom:4px;">← Back to agent card</button>
                        <h2 style="margin:0;font-family:'Montserrat',sans-serif;font-weight:900;font-size:20px;color:#fff;">${ag.name} Calculator</h2>
                    </div>
                </div>
                <select id="zsc-calc-pick-agent" class="gacha-col-search">
                    ${evaluatedAgents.map(a => `<option value="${a.name}" ${a.name === ag.name ? 'selected' : ''}>${a.name}</option>`).join('')}
                </select>
            </div>

            <div class="zsc-calc-grid">
                <div class="zsc-calc-panel">
                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;">Mindscapes (M0–M6)</span>
                    <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                        <button type="button" class="gacha-details-btn" data-calc-m="-1">−</button>
                        <strong style="font-family:monospace;font-size:14px;">M${calcState.mindscape}</strong>
                        <button type="button" class="gacha-details-btn" data-calc-m="1">+</button>
                    </div>

                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">W-Engine Refinement</span>
                    <div style="display:flex;align-items:center;justify-content:space-between;background:#181822;border-radius:10px;padding:6px 12px;">
                        <button type="button" class="gacha-details-btn" data-calc-r="-1">−</button>
                        <strong style="font-family:monospace;font-size:14px;">R${calcState.refinement}</strong>
                        <button type="button" class="gacha-details-btn" data-calc-r="1">+</button>
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
                                <button type="button" class="gacha-details-btn" data-calc-sub="${k}" data-delta="-1">−</button>
                                <strong style="font-family:monospace;width:22px;text-align:center;">${calcState.rolls[k] || 0}</strong>
                                <button type="button" class="gacha-details-btn" data-calc-sub="${k}" data-delta="1">+</button>
                            </div>
                            <span style="font-family:monospace;font-size:11px;font-weight:900;color:${gain === '+0%' ? '#71717a' : (isBest ? '#4ade80' : '#d4d4d8')};width:62px;text-align:right;">
                                ${gain}
                            </span>
                        </div>`;
                    }).join('')}

                    <span style="font-size:10px;font-weight:900;color:#a1a1aa;text-transform:uppercase;margin-top:6px;">Enemy DEF Target</span>
                    <select id="zsc-calc-enemy-def" class="gacha-col-search" style="width:100%;">
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

                    <div style="display:grid;grid-template-columns:1fr;gap:8px;">
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
        </div>
    `;
}

function renderLeaderboardsView() {
    const list = allSiteAgents.length > 0 ? [...allSiteAgents].reverse() : [];
    return `
        <div>
            <h2 style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:26px;color:#fff;margin:0;">Leaderboards</h2>
            <p style="font-size:12.5px;color:#8e8e99;margin:4px 0 18px;">Cliquez sur un Agent pour ouvrir son guide complet et ses paliers de statistiques.</p>
            <div class="zsc-lb-agents-grid">
                ${list.map((a, idx) => {
                    const count = (Math.max(4, 95 - idx * 2) * 843).toLocaleString('fr-FR');
                    return `
                    <div class="zsc-lb-agent-tile" data-lb-open-guide="${a.name}">
                        <img src="assets/Agents/${a.name}.webp" style="width:44px;height:44px;border-radius:999px;object-fit:cover;object-position:top center;background:#09090d;border:1.5px solid #3f3f46;">
                        <div style="min-width:0;flex:1;">
                            <div style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:13px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.name}</div>
                            <div style="font-size:11px;color:#71717a;font-weight:700;">${count} Builds</div>
                        </div>
                    </div>`;
                }).join('')}
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

    modalEl.querySelectorAll('[data-zsc-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            currentView = btn.getAttribute('data-zsc-view');
            renderShowcaseModal();
        });
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

    document.getElementById('zsc-btn-set-main')?.addEventListener('click', () => {
        if (profile) {
            saveAccountToHistory(profile, true);
            renderShowcaseModal();
        }
    });

    // Cumuler les 6 agents de la vitrine actuelle avec ceux déjà en mémoire
    document.getElementById('zsc-btn-sync-enka')?.addEventListener('click', () => {
        const inpVal = document.getElementById('zsc-modal-uid-inp')?.value.trim() || activeUID;
        if (inpVal) {
            activeUID = inpVal.replace(/\D/g, '');
            triggerLiveEnkaSync(activeUID, false);
        }
    });

    // Remplacer la liste par uniquement les 6 agents actuellement présents dans la vitrine en jeu
    document.getElementById('zsc-btn-replace-enka')?.addEventListener('click', () => {
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

    modalEl.querySelectorAll('[data-act-guide], [data-lb-open-guide]').forEach(btn => {
        btn.addEventListener('click', () => {
            const agName = btn.getAttribute('data-act-guide') || btn.getAttribute('data-lb-open-guide');
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
                p.agents.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
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
