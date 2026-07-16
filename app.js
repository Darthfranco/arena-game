const APP_VERSION = '2026.07.16.17';

document.addEventListener('DOMContentLoaded', () => {
    setupServiceWorkerUpdates();

    const screens = {
        start: document.getElementById('start-screen'),
        build: document.getElementById('build-screen'),
        connect: document.getElementById('connection-screen'),
        waiting: document.getElementById('waiting-screen'),
        settings: document.getElementById('settings-screen'),
        game: document.getElementById('game-screen')
    };
    const installScreen = document.getElementById('install-screen');
    const rotateScreen = document.getElementById('rotate-screen');

    const playerNameInput = document.getElementById('player-name-input');
    const buildBtn = document.getElementById('build-btn');
    const soloBtn = document.getElementById('solo-btn');
    const startConnectBtn = document.getElementById('start-connect-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsBackBtn = document.getElementById('settings-back-btn');
    const musicToggleBtn = document.getElementById('music-toggle-btn');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const customizeLayoutBtn = document.getElementById('customize-layout-btn');
    const redeemCodeInput = document.getElementById('redeem-code-input');
    const backBtn = document.getElementById('back-to-menu-btn');
    const backFromBuildBtn = document.getElementById('back-from-build-btn');
    const roomCodeInput = document.getElementById('room-code-input');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const hostGameBtn = document.getElementById('host-game-btn');
    const joinGameBtn = document.getElementById('join-game-btn');
    const quickJoinBtn = document.getElementById('quick-join-btn');
    const connectionStatus = document.getElementById('connection-status');
    const playerCountButtons = document.querySelectorAll('[data-player-count]');
    const roomMaxButtons = document.querySelectorAll('[data-room-max]');
    const lobbyPanel = document.getElementById('lobby-panel');
    const lobbyTitle = document.getElementById('lobby-title');
    const lobbyHostLabel = document.getElementById('lobby-host-label');
    const lobbyList = document.getElementById('lobby-list');
    const waitingStatus = document.getElementById('waiting-status');
    const waitingRoomCode = document.getElementById('waiting-room-code');
    const waitingPlayerCount = document.getElementById('waiting-player-count');
    const waitingCopyCodeBtn = document.getElementById('waiting-copy-code-btn');
    const waitingHostControls = document.getElementById('waiting-host-controls');
    const waitingRoomList = document.getElementById('waiting-room-list');
    const manualStartBtn = document.getElementById('manual-start-btn');
    const leaveWaitingBtn = document.getElementById('leave-waiting-btn');
    const waitingLeaveBtn = document.getElementById('waiting-leave-btn');
    const alertScreen = document.getElementById('alert-screen');
    const migrationOverlay = document.getElementById('migration-overlay');
    const migrationMessage = document.getElementById('migration-message');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const healthLabel = document.getElementById('health-label');
    const hudHealthFill = document.getElementById('hud-health-fill');
    const hudShieldFill = document.getElementById('hud-shield-fill');
    const gameMenuBtn = document.getElementById('game-menu-btn');
    const gameMenuOverlay = document.getElementById('game-menu-overlay');
    const gameMenuPanel = document.getElementById('game-menu-panel');
    const gameSettingsPanel = document.getElementById('game-settings-panel');
    const hostLeaveConfirm = document.getElementById('host-leave-confirm');
    const closeGameMenuBtn = document.getElementById('close-game-menu-btn');
    const closeGameSettingsBtn = document.getElementById('close-game-settings-btn');
    const gameSettingsBtn = document.getElementById('game-settings-btn');
    const gameLeaveBtn = document.getElementById('game-leave-btn');
    const confirmHostLeaveBtn = document.getElementById('confirm-host-leave-btn');
    const cancelHostLeaveBtn = document.getElementById('cancel-host-leave-btn');
    const gameRoomCode = document.getElementById('game-room-code');
    const gamePlayerCount = document.getElementById('game-player-count');
    const gameCopyCodeBtn = document.getElementById('game-copy-code-btn');
    const settingsRoomCode = document.getElementById('settings-room-code');
    const settingsPlayerCount = document.getElementById('settings-player-count');
    const settingsCopyCodeBtn = document.getElementById('settings-copy-code-btn');
    const gameSettingsList = document.getElementById('game-settings-list');
    const team0ScoreLabel = document.getElementById('team-0-score');
    const team1ScoreLabel = document.getElementById('team-1-score');
    const roundLabel = document.getElementById('round-label');
    const roundStatus = document.getElementById('round-status');
    const roundOverlay = document.getElementById('round-overlay');
    const roundResultTitle = document.getElementById('round-result-title');
    const roundResultDetail = document.getElementById('round-result-detail');
    const roundPanelTeam0 = document.getElementById('round-panel-team-0');
    const roundPanelTeam1 = document.getElementById('round-panel-team-1');
    const roundActionBtn = document.getElementById('round-action-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const abilityBtn = document.getElementById('ability-btn');
    const abilityIcon = abilityBtn.querySelector('img');
    const abilityCooldown = document.getElementById('ability-cooldown');
    const moveZone = document.getElementById('move-zone');
    const shootZone = document.getElementById('shoot-zone');
    const moveStick = document.getElementById('move-stick');
    const shootStick = document.getElementById('shoot-stick');
    const menuLoadoutTitle = document.getElementById('menu-loadout-title');
    const menuLoadoutArt = document.getElementById('menu-loadout-art');
    const characterOptions = document.getElementById('character-options');
    const weaponOptions = document.getElementById('weapon-options');
    const abilityOptions = document.getElementById('ability-options');
    const builderCharacterStat = document.getElementById('builder-character-stat');
    const builderWeaponStat = document.getElementById('builder-weapon-stat');
    const builderComboArt = document.getElementById('builder-combo-art');
    const builderPreviewLabel = document.getElementById('builder-preview-label');
    const builderPreviewStats = document.getElementById('builder-preview-stats');
    const builderMenuArt = document.querySelector('#build-screen .menu-art');
    const builderStepEyebrow = document.getElementById('builder-step-eyebrow');
    const builderStepBackBtn = document.getElementById('builder-step-back-btn');
    const builderStepNextBtn = document.getElementById('builder-step-next-btn');
    const labPrevChoiceBtn = document.getElementById('lab-prev-choice-btn');
    const labNextChoiceBtn = document.getElementById('lab-next-choice-btn');
    const builderStage = document.getElementById('builder-stage');
    const saveLoadoutBtn = document.getElementById('save-loadout-btn');
    const builderTabButtons = document.querySelectorAll('[data-builder-step]');
    const summaryCharacterArt = document.getElementById('summary-character-art');
    const summaryWeaponArt = document.getElementById('summary-weapon-art');
    const summaryAbilityArt = document.getElementById('summary-ability-art');

    const peerIdPrefix = 'roomtext-v1-';
    const builderMenuArtByStep = {
        character: `assets/menu/choose-your-rumbler-menu.png?v=${APP_VERSION}`,
        weapon: `assets/menu/choose-your-rumbler-menu2.png?v=${APP_VERSION}`,
        ability: `assets/menu/choose-your-rumbler-menu2.png?v=${APP_VERSION}`
    };
    const world = { width: 1800, height: 1200 };
    const NETWORK_SEND_INTERVAL_MS = 33;
    const REMOTE_POSITION_LERP = 10;
    const REMOTE_AIM_LERP = 14;
    const REMOTE_SNAP_DISTANCE = 420;
    const MOVE_AIM_RETURN_LERP = 7;
    const PLAYER_SPRITE_SIZE = 94;
    const BULLET_SPRITE_SIZE = 68;
    const MOBILE_CAMERA_ZOOM = 0.82;
    const DASH_COOLDOWN = 3;
    const DASH_DURATION = 0.24;
    const DASH_DISTANCE = 230;
    const GRENADE_COOLDOWN = 4;
    const GRENADE_FLIGHT_TIME = 0.72;
    const GRENADE_RANGE = 410;
    const GRENADE_RADIUS = 118;
    const GRENADE_DAMAGE = 38;
    const INVIS_DURATION = 2;
    const INVIS_COOLDOWN = 5;
    const ONE_SHOT_COOLDOWN = 12;
    const SHIELD_UP_COOLDOWN = 4;
    const SHIELD_UP_AMOUNT = 30;
    const SHIELD_MAX = 100;
    const ABILITY_DRAG_VISUAL_RADIUS = 42;
    const MIGRATION_MAX_ATTEMPTS = 14;
    const ROUNDS_TO_WIN_MATCH = 3;
    const LOADOUT_STORAGE_KEY = 'jungle-rumble-loadout-v1';
    const SETTINGS_STORAGE_KEY = 'jungle-rumble-settings-v1';
    const PLAYER_ID_STORAGE_KEY = 'jungle-rumble-player-id-v1';
    const PLAYER_SESSION_STORAGE_KEY = 'jungle-rumble-player-session-id-v1';
    const RECENT_ROOM_STORAGE_KEY = 'jungle-rumble-recent-room-v1';
    const DEFAULT_LOADOUT = { character: 'snake', weapon: 'pistol', ability: 'dash' };
    const DEFAULT_SETTINGS = { music: true, sounds: true };
    const CHARACTERS = {
        snake: {
            id: 'snake',
            name: 'Snake',
            hp: 100,
            speed: 330,
            speedLabel: 'Medium',
            face: 'assets/snake/snake_face.png'
        },
        croc: {
            id: 'croc',
            name: 'Croc',
            hp: 150,
            speed: 260,
            speedLabel: 'Slow',
            face: 'assets/croc/croc_face.png'
        },
        parrot: {
            id: 'parrot',
            name: 'Parrot',
            hp: 70,
            speed: 405,
            speedLabel: 'Fast',
            face: 'assets/parrot/parrot_face.png'
        }
    };
    const WEAPONS = {
        pistol: {
            id: 'pistol',
            name: 'Pistol',
            ammo: 6,
            reloadDuration: 1.55,
            cooldown: 0.16,
            damage: 14,
            bulletSpeed: 780,
            bulletLife: 0.9,
            pellets: 1,
            spread: 0,
            damageLabel: 'Medium',
            rateLabel: 'Fast',
            rangeLabel: 'Medium',
            art: 'assets/weapons/pistol/good.png'
        },
        rifle: {
            id: 'rifle',
            name: 'Rifle',
            ammo: 3,
            reloadDuration: 1.75,
            cooldown: 0.34,
            damage: 34,
            bulletSpeed: 980,
            bulletLife: 1.28,
            pellets: 1,
            spread: 0,
            damageLabel: 'High',
            rateLabel: 'Slow',
            rangeLabel: 'Long',
            art: 'assets/weapons/rifle/good.png'
        },
        shotgun: {
            id: 'shotgun',
            name: 'Shotgun',
            ammo: 2,
            reloadDuration: 1.55,
            cooldown: 0.22,
            damage: 10,
            bulletSpeed: 720,
            bulletLife: 0.58,
            pellets: 4,
            spread: 0.28,
            damageLabel: 'High',
            rateLabel: 'Fast',
            rangeLabel: 'Short',
            art: 'assets/weapons/shotgun/good.png'
        }
    };
    const ABILITIES = {
        dash: {
            id: 'dash',
            name: 'Dash',
            mode: 'tap',
            cooldown: DASH_COOLDOWN,
            stat: 'Tap to burst forward',
            detail: '3s cooldown',
            art: 'assets/buttons/dash.png'
        },
        grenade: {
            id: 'grenade',
            name: 'Grenade',
            mode: 'drag',
            cooldown: GRENADE_COOLDOWN,
            stat: 'Drag to arc throw',
            detail: 'Big area blast',
            art: 'assets/buttons/grenade.png'
        },
        invis: {
            id: 'invis',
            name: 'Invisibility',
            mode: 'tap',
            cooldown: INVIS_COOLDOWN,
            stat: 'Vanish from enemies',
            detail: '2s active · 5s cooldown',
            art: 'assets/buttons/Invis_button.png'
        },
        oneShot: {
            id: 'oneShot',
            name: 'One Shot',
            mode: 'tap',
            cooldown: ONE_SHOT_COOLDOWN,
            stat: 'Combines all ammo',
            detail: '12s cooldown after reload',
            art: 'assets/buttons/OneShot_button.png'
        },
        autoReload: {
            id: 'autoReload',
            name: 'Auto Reload',
            mode: 'passive',
            cooldown: 0,
            stat: 'Ammo reloads one by one',
            detail: 'Passive reload',
            art: 'assets/buttons/autoreload_button.png'
        },
        shieldUp: {
            id: 'shieldUp',
            name: 'Shield Up',
            mode: 'tap',
            cooldown: SHIELD_UP_COOLDOWN,
            stat: '+30 shield health',
            detail: '4s cooldown · 100 max',
            art: 'assets/buttons/shield_button.png'
        }
    };
    const colors = {
        local: '#2fbf71',
        remote: '#3977ff',
        bullet: '#ffc857',
        enemyBullet: '#ff4f5e',
        floor: '#202633',
        grid: 'rgba(255, 255, 255, 0.055)',
        wall: '#121722',
        wallEdge: '#323b50'
    };
    const spriteCache = new Map();

    const input = {
        move: { pointerId: null, active: false, originX: 0, originY: 0, x: 0, y: 0, power: 0 },
        aim: { pointerId: null, active: false, originX: 0, originY: 0, x: 0, y: 0, power: 0 }
    };

    let peer;
    let conn;
    let intentionalDisconnect = false;
    let playerName = 'Ranger';
    let opponentName = 'Opponent';
    let currentRoomCode = '';
    let currentJoinCode = '';
    let sessionSecret = '';
    let localPlayerId = getLocalPlayerId();
    let hostPlayerId = '';
    let maxPlayers = 2;
    let roomStarted = false;
    let migrationInProgress = false;
    let migrationRestartTimer = 0;
    let migrationRestartTargetPlayers = 0;
    let joinRetryTimer = 0;
    let networkRole = 'solo';
    let gameMode = 'solo';
    let running = false;
    let lastFrame = performance.now();
    let animationId = 0;
    let alertTimer = 0;
    let lastNetworkSend = 0;
    let resizeTimer = 0;
    let installBlocked = false;
    let orientationBlocked = false;
    let score = 0;
    let roundScores = [0, 0];
    let currentRound = 1;
    let roundActive = false;
    let roundOver = false;
    let matchOver = false;
    let roundWinnerTeam = -1;
    let selectedLoadout = normalizeLoadout(loadSavedLoadout());
    let draftLoadout = { ...selectedLoadout };
    let menuSettings = loadSavedSettings();
    let builderStep = 'character';
    let builderSwipeStartX = 0;
    let builderSwipeStartY = 0;
    let builderSwipePointer = null;
    let abilityDrag = null;

    const player = createPlayer('local', world.width * 0.34, world.height * 0.5, colors.local, selectedLoadout);
    const remotePlayer = createPlayer('remote', world.width * 0.66, world.height * 0.5, colors.remote, DEFAULT_LOADOUT);
    const remotePlayers = new Map();
    const connections = new Map();
    let roomPlayers = [];
    const bullets = [];
    const grenades = [];
    const impacts = [];
    const processedHitIds = new Set();
    const departedPlayerIds = new Set();
    const dummies = [
        { x: 900, y: 520, r: 34, hp: 80, maxHp: 80 },
        { x: 1040, y: 690, r: 34, hp: 80, maxHp: 80 },
        { x: 740, y: 720, r: 34, hp: 80, maxHp: 80 }
    ];
    const obstacles = [
        { x: 510, y: 360, w: 260, h: 76 },
        { x: 1020, y: 310, w: 100, h: 280 },
        { x: 650, y: 870, w: 360, h: 72 },
        { x: 1240, y: 760, w: 220, h: 84 }
    ];

    function loadSprite(src) {
        if (spriteCache.has(src)) return spriteCache.get(src);
        const image = new Image();
        image.src = src;
        spriteCache.set(src, image);
        return image;
    }

    function normalizeLoadout(value) {
        const character = value && CHARACTERS[value.character] ? value.character : DEFAULT_LOADOUT.character;
        const weapon = value && WEAPONS[value.weapon] ? value.weapon : DEFAULT_LOADOUT.weapon;
        const ability = value && ABILITIES[value.ability] ? value.ability : DEFAULT_LOADOUT.ability;
        return { character, weapon, ability };
    }

    function loadSavedLoadout() {
        try {
            return JSON.parse(localStorage.getItem(LOADOUT_STORAGE_KEY)) || DEFAULT_LOADOUT;
        } catch {
            return DEFAULT_LOADOUT;
        }
    }

    function normalizeSettings(value) {
        return {
            music: value && typeof value.music === 'boolean' ? value.music : DEFAULT_SETTINGS.music,
            sounds: value && typeof value.sounds === 'boolean' ? value.sounds : DEFAULT_SETTINGS.sounds
        };
    }

    function loadSavedSettings() {
        try {
            return normalizeSettings(JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY)));
        } catch {
            return { ...DEFAULT_SETTINGS };
        }
    }

    function getLocalPlayerId() {
        let stored = sessionStorage.getItem(PLAYER_SESSION_STORAGE_KEY);
        if (!stored) {
            stored = `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
            sessionStorage.setItem(PLAYER_SESSION_STORAGE_KEY, stored);
            localStorage.setItem(PLAYER_ID_STORAGE_KEY, stored);
        }
        return stored;
    }

    function loadRecentRoom() {
        try {
            return JSON.parse(localStorage.getItem(RECENT_ROOM_STORAGE_KEY)) || null;
        } catch {
            return null;
        }
    }

    function saveRecentRoom() {
        if (!currentRoomCode && !sessionSecret) return;
        localStorage.setItem(RECENT_ROOM_STORAGE_KEY, JSON.stringify({
            roomCode: currentRoomCode,
            joinCode: currentJoinCode || currentRoomCode,
            sessionSecret,
            playerId: localPlayerId,
            name: playerName,
            savedAt: Date.now()
        }));
        updateQuickJoinUI();
    }

    function updateQuickJoinUI() {
        const recent = loadRecentRoom();
        const usable = recent && (recent.joinCode || recent.roomCode || recent.sessionSecret);
        quickJoinBtn.classList.toggle('hidden', !usable);
        if (usable) quickJoinBtn.textContent = `Quick Join ${recent.roomCode || recent.joinCode || recent.sessionSecret}`;
    }

    function getSelectedMaxPlayers() {
        const selected = document.querySelector('[data-player-count].selected');
        return clamp(Number(selected ? selected.dataset.playerCount : 2) || 2, 2, 6);
    }

    function makeSecretRoomCode() {
        return `s${Math.random().toString(36).slice(2, 7)}${Date.now().toString(36).slice(-3)}`;
    }

    function getPlayerSlot(playerId) {
        return Math.max(0, roomPlayers.findIndex(entry => entry.id === playerId));
    }

    function getPlayerTeam(playerId) {
        const entry = roomPlayers.find(playerEntry => playerEntry.id === playerId);
        return entry ? Number(entry.team) || 0 : getPlayerSlot(playerId) % 2;
    }

    function canDamagePlayer(attackerId, targetId) {
        if (!attackerId || !targetId || attackerId === targetId) return false;
        const attackerEntry = roomPlayers.find(entry => entry.id === attackerId);
        const targetEntry = roomPlayers.find(entry => entry.id === targetId);
        if (attackerEntry && targetEntry) return attackerEntry.team !== targetEntry.team;
        return attackerId !== targetId;
    }

    function isEnemyProjectile(projectile) {
        if (projectile.ownerId) return canDamagePlayer(projectile.ownerId, localPlayerId);
        return projectile.remote === true;
    }

    function markHitProcessed(hitId) {
        if (!hitId) return false;
        if (processedHitIds.has(hitId)) return true;
        processedHitIds.add(hitId);
        if (processedHitIds.size > 500) {
            const first = processedHitIds.values().next().value;
            processedHitIds.delete(first);
        }
        return false;
    }

    function getSpawnPoint(playerId) {
        const points = [
            { x: world.width * 0.28, y: world.height * 0.42 },
            { x: world.width * 0.72, y: world.height * 0.58 },
            { x: world.width * 0.28, y: world.height * 0.68 },
            { x: world.width * 0.72, y: world.height * 0.32 }
        ];
        return points[getPlayerSlot(playerId) % points.length];
    }

    function normalizeRoster(roster = roomPlayers) {
        const seen = new Set();
        const normalized = roster
            .filter(entry => entry && entry.id && !seen.has(entry.id) && seen.add(entry.id))
            .map((entry, index) => ({
                id: entry.id,
                name: entry.name || 'Ranger',
                connected: entry.connected !== false,
                host: entry.id === hostPlayerId,
                team: Number.isFinite(Number(entry.team)) ? clamp(Number(entry.team), 0, 1) : index % 2
            }));
        if ((networkRole === 'host' || networkRole === 'guest') && !seen.has(localPlayerId)) {
            normalized.push({
                id: localPlayerId,
                name: playerName || 'Ranger',
                connected: true,
                host: localPlayerId === hostPlayerId,
                team: normalized.length % 2
            });
        }
        roomPlayers = normalized;
        return roomPlayers;
    }

    function getOrCreateRemotePlayer(id, name = 'Opponent') {
        if (!id || id === localPlayerId) return null;
        const activeRosterEntry = roomPlayers.find(entry => entry.id === id && entry.connected !== false);
        if (departedPlayerIds.has(id) && !activeRosterEntry) return null;
        if (remotePlayers.has(id)) {
            const existing = remotePlayers.get(id);
            existing.name = name || existing.name;
            return existing;
        }
        const spawn = getSpawnPoint(id);
        const entity = createPlayer(id, spawn.x, spawn.y, colors.remote, DEFAULT_LOADOUT);
        entity.name = name || 'Opponent';
        entity.playerId = id;
        remotePlayers.set(id, entity);
        return entity;
    }

    function removeRemotePlayer(id, markDeparted = false) {
        if (markDeparted && id) departedPlayerIds.add(id);
        remotePlayers.delete(id);
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].ownerId === id) bullets.splice(i, 1);
        }
        for (let i = grenades.length - 1; i >= 0; i--) {
            if (grenades[i].ownerId === id) grenades.splice(i, 1);
        }
    }

    function updateLobbyUI() {
        normalizeRoster();
        if (!lobbyPanel) return;
        const inNetworkFlow = networkRole === 'host' || networkRole === 'guest';
        lobbyPanel.classList.toggle('hidden', !inNetworkFlow || gameMode === 'pvp');
        const hostEntry = hostPlayerId ? roomPlayers.find(entry => entry.id === hostPlayerId) : null;
        lobbyTitle.textContent = roomStarted ? 'Game in progress' : `Waiting for players ${roomPlayers.length}/${maxPlayers}`;
        lobbyHostLabel.textContent = hostEntry ? `Host: ${hostEntry.name}` : 'Host: connecting...';
        lobbyList.replaceChildren();
        for (let index = 0; index < maxPlayers; index++) {
            const entry = roomPlayers[index];
            const slot = document.createElement('div');
            slot.className = `lobby-slot ${entry ? 'filled' : ''} ${entry && entry.id === hostPlayerId ? 'host' : ''} team-${index % 2}`;
            const label = entry ? `${entry.name}${entry.id === localPlayerId ? ' (you)' : ''}` : 'Waiting...';
            slot.innerHTML = `<i aria-hidden="true"></i><span>${label}</span><small>${entry && entry.id === hostPlayerId ? 'host' : entry ? `team ${index % 2 + 1}` : ''}</small>`;
            lobbyList.appendChild(slot);
        }
        updateRoomUI();
    }

    function isLocalHost() {
        return networkRole === 'host' && hostPlayerId === localPlayerId;
    }

    function getRoomJoinCode() {
        return currentJoinCode || currentRoomCode || sessionSecret || '------';
    }

    function copyRoomCode() {
        const code = getRoomJoinCode();
        navigator.clipboard.writeText(code).then(() => showAlert(`Copied ${code}`)).catch(() => showAlert(code));
    }

    function setRoomMaxPlayers(value) {
        if (!isLocalHost()) return;
        const nextMax = clamp(Number(value) || maxPlayers, Math.max(2, roomPlayers.length), 6);
        maxPlayers = nextMax;
        broadcastLobby();
        updateRoomUI();
        saveRecentRoom();
    }

    function setRoomPlayerTeam(id, team) {
        if (!isLocalHost() || !id) return;
        const entry = roomPlayers.find(playerEntry => playerEntry.id === id);
        if (!entry) return;
        entry.team = clamp(Number(team) || 0, 0, 1);
        normalizeRoster();
        broadcastLobby();
        updateRoomUI();
    }

    function kickRoomPlayer(id) {
        if (!isLocalHost() || !id || id === localPlayerId) return;
        const connection = connections.get(id);
        if (connection && connection.open) {
            connection.send({ type: 'kicked', reason: 'You were kicked from the room.' });
            connection.close();
        }
        handleGuestDisconnect(id);
    }

    function makeRoomPlayerRow(entry, options = {}) {
        const row = document.createElement('div');
        const team = Number(entry.team) || 0;
        row.className = `room-player-row team-${team} ${entry.id === hostPlayerId ? 'host' : ''}`;
        const isYou = entry.id === localPlayerId;
        const canEdit = options.editable === true && isLocalHost();
        row.innerHTML = `
            <div class="room-player-main">
                <i aria-hidden="true"></i>
                <strong>${entry.name}${isYou ? ' (you)' : ''}</strong>
                <span>${entry.id === hostPlayerId ? 'host' : `team ${team + 1}`}</span>
            </div>
            <div class="room-player-actions"></div>
        `;
        const actions = row.querySelector('.room-player-actions');
        if (canEdit) {
            const teamToggle = document.createElement('button');
            teamToggle.className = 'mini-btn';
            teamToggle.type = 'button';
            teamToggle.textContent = `Team ${team + 1}`;
            teamToggle.dataset.teamTarget = entry.id;
            teamToggle.dataset.nextTeam = team === 0 ? '1' : '0';
            actions.appendChild(teamToggle);
            if (!isYou) {
                const kickBtn = document.createElement('button');
                kickBtn.className = 'mini-btn danger';
                kickBtn.type = 'button';
                kickBtn.textContent = 'Kick';
                kickBtn.dataset.kickTarget = entry.id;
                actions.appendChild(kickBtn);
            }
        }
        return row;
    }

    function renderRoomPlayerList(container, options = {}) {
        if (!container) return;
        normalizeRoster();
        container.replaceChildren();
        roomPlayers.forEach(entry => container.appendChild(makeRoomPlayerRow(entry, options)));
        for (let index = roomPlayers.length; index < maxPlayers; index++) {
            const row = document.createElement('div');
            row.className = `room-player-row empty team-${index % 2}`;
            row.innerHTML = `<div class="room-player-main"><i aria-hidden="true"></i><strong>Waiting...</strong><span>open slot</span></div>`;
            container.appendChild(row);
        }
    }

    function updateRoomMaxButtons() {
        roomMaxButtons.forEach(button => {
            const value = Number(button.dataset.roomMax);
            const selected = value === maxPlayers;
            button.classList.toggle('selected', selected);
            button.setAttribute('aria-pressed', selected ? 'true' : 'false');
            button.disabled = !isLocalHost() || value < Math.max(2, roomPlayers.length);
        });
    }

    function updateRoomUI() {
        normalizeRoster();
        const countText = `${roomPlayers.length}/${maxPlayers}`;
        const code = getRoomJoinCode();
        [waitingRoomCode, gameRoomCode, settingsRoomCode].forEach(element => {
            if (element) element.textContent = code;
        });
        [waitingPlayerCount, gamePlayerCount, settingsPlayerCount].forEach(element => {
            if (element) element.textContent = countText;
        });
        if (waitingStatus) {
            waitingStatus.textContent = isLocalHost()
                ? 'Set teams, choose room size, then start when ready.'
                : 'Waiting for the host to start the match.';
        }
        if (waitingHostControls) waitingHostControls.classList.toggle('hidden', !isLocalHost());
        if (manualStartBtn) {
            manualStartBtn.classList.toggle('hidden', !isLocalHost());
            manualStartBtn.disabled = !isLocalHost() || roomPlayers.length < 1;
        }
        if (gameSettingsBtn) gameSettingsBtn.classList.toggle('hidden', !isLocalHost());
        renderRoomPlayerList(waitingRoomList, { editable: true });
        renderRoomPlayerList(gameSettingsList, { editable: true });
        updateRoomMaxButtons();
    }

    function openGameMenu(panel = 'menu') {
        updateRoomUI();
        gameMenuOverlay.classList.remove('hidden');
        gameMenuPanel.classList.toggle('hidden', panel !== 'menu');
        gameSettingsPanel.classList.toggle('hidden', panel !== 'settings');
        hostLeaveConfirm.classList.toggle('hidden', panel !== 'confirm');
    }

    function closeGameMenu() {
        gameMenuOverlay.classList.add('hidden');
    }

    function leaveCurrentRoom(force = false) {
        if (!force && isLocalHost() && roomPlayers.length > 1) {
            openGameMenu('confirm');
            return;
        }
        stopGame();
    }

    function resetMatchState() {
        roundScores = [0, 0];
        currentRound = 1;
        roundActive = false;
        roundOver = false;
        matchOver = false;
        roundWinnerTeam = -1;
        updateRoundHud();
        hideRoundOverlay();
    }

    function startRound(options = {}) {
        roundActive = true;
        roundOver = false;
        matchOver = false;
        roundWinnerTeam = -1;
        resetPlayers(false);
        hideRoundOverlay();
        updateRoundHud();
        showScreen('game');
        hideMigrationOverlay();
        if (options.announce !== false) showAlert(`Round ${currentRound}`);
    }

    function updateRoundHud() {
        if (team0ScoreLabel) team0ScoreLabel.textContent = roundScores[0].toString();
        if (team1ScoreLabel) team1ScoreLabel.textContent = roundScores[1].toString();
        if (roundLabel) roundLabel.textContent = `Round ${currentRound}`;
        if (roundStatus) {
            if (gameMode !== 'pvp') roundStatus.textContent = 'Solo';
            else if (matchOver) roundStatus.textContent = `Team ${roundWinnerTeam + 1} wins game`;
            else if (roundOver) roundStatus.textContent = `Team ${roundWinnerTeam + 1} wins round`;
            else if (player.alive === false || player.hp <= 0) roundStatus.textContent = 'Spectating';
            else roundStatus.textContent = 'Elimination';
        }
    }

    function hideRoundOverlay() {
        if (roundOverlay) roundOverlay.classList.add('hidden');
    }

    function showRoundOverlay() {
        if (!roundOverlay) return;
        const winnerText = roundWinnerTeam >= 0 ? `Team ${roundWinnerTeam + 1}` : 'Round';
        roundResultTitle.textContent = matchOver ? `${winnerText} Wins Game` : `${winnerText} Wins Round`;
        roundResultDetail.textContent = matchOver ? 'First to 3 rounds wins.' : `Round ${currentRound} complete.`;
        roundPanelTeam0.textContent = roundScores[0].toString();
        roundPanelTeam1.textContent = roundScores[1].toString();
        roundActionBtn.textContent = matchOver ? 'Play Again' : 'Next Round';
        roundActionBtn.classList.toggle('hidden', !isLocalHost());
        roundOverlay.classList.remove('hidden');
    }

    function eliminateLocalPlayer() {
        if (player.alive === false) return;
        player.hp = 0;
        player.shield = 0;
        player.alive = false;
        player.invisibleTimer = 0;
        player.dashTimer = 0;
        player.vx = 0;
        player.vy = 0;
        resetInput();
        updateHud();
        updateRoundHud();
        showAlert('Eliminated. Spectating.');
        sendData(playerSnapshot('hit', {
            damage: 0,
            hp: player.hp,
            shield: player.shield,
            invisibleTimer: player.invisibleTimer,
            alive: false
        }));
    }

    function getRoundCombatants() {
        return roomPlayers
            .filter(entry => entry.connected !== false)
            .map(entry => ({
                ...entry,
                entity: entry.id === localPlayerId ? player : remotePlayers.get(entry.id)
            }))
            .filter(entry => entry.entity);
    }

    function checkRoundWinner() {
        if (!isLocalHost() || !roundActive || roundOver || gameMode !== 'pvp') return;
        const combatants = getRoundCombatants();
        const presentTeams = new Set(combatants.map(entry => Number(entry.team) || 0));
        if (presentTeams.size < 2) return;
        const aliveByTeam = [0, 0];
        combatants.forEach(entry => {
            const team = clamp(Number(entry.team) || 0, 0, 1);
            if (entry.entity.alive !== false && entry.entity.hp > 0) aliveByTeam[team] += 1;
        });
        if (aliveByTeam[0] > 0 && aliveByTeam[1] === 0) finishRound(0);
        else if (aliveByTeam[1] > 0 && aliveByTeam[0] === 0) finishRound(1);
    }

    function finishRound(winnerTeam, incomingScores = null) {
        if (roundOver && !incomingScores) return;
        roundActive = false;
        roundOver = true;
        roundWinnerTeam = clamp(Number(winnerTeam) || 0, 0, 1);
        if (incomingScores) {
            roundScores = [
                clamp(Number(incomingScores[0]) || 0, 0, ROUNDS_TO_WIN_MATCH),
                clamp(Number(incomingScores[1]) || 0, 0, ROUNDS_TO_WIN_MATCH)
            ];
        } else {
            roundScores[roundWinnerTeam] = Math.min(ROUNDS_TO_WIN_MATCH, roundScores[roundWinnerTeam] + 1);
        }
        matchOver = roundScores[roundWinnerTeam] >= ROUNDS_TO_WIN_MATCH;
        bullets.length = 0;
        grenades.length = 0;
        updateRoundHud();
        showRoundOverlay();
        if (isLocalHost()) {
            broadcastData({
                type: 'round-result',
                winnerTeam: roundWinnerTeam,
                scores: roundScores,
                round: currentRound,
                matchOver,
                roster: roomPlayers,
                maxPlayers,
                hostId: hostPlayerId,
                sessionSecret
            });
        }
    }

    function hostAdvanceRound() {
        if (!isLocalHost() || !roundOver) return;
        if (matchOver) {
            resetMatchState();
        } else {
            currentRound += 1;
            roundOver = false;
            roundWinnerTeam = -1;
        }
        broadcastData({
            type: 'round-start',
            scores: roundScores,
            round: currentRound,
            roster: roomPlayers,
            maxPlayers,
            hostId: hostPlayerId,
            sessionSecret
        });
        startRound();
    }

    function saveMenuSettings() {
        menuSettings = normalizeSettings(menuSettings);
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(menuSettings));
        updateSettingsUI();
    }

    function updateSettingsUI() {
        const settings = normalizeSettings(menuSettings);
        musicToggleBtn.classList.toggle('is-checked', settings.music);
        soundToggleBtn.classList.toggle('is-checked', settings.sounds);
        musicToggleBtn.setAttribute('aria-pressed', settings.music ? 'true' : 'false');
        soundToggleBtn.setAttribute('aria-pressed', settings.sounds ? 'true' : 'false');
    }

    function toggleMenuSetting(key) {
        menuSettings = normalizeSettings(menuSettings);
        menuSettings[key] = !menuSettings[key];
        saveMenuSettings();
    }

    function saveSelectedLoadout() {
        selectedLoadout = normalizeLoadout(draftLoadout);
        localStorage.setItem(LOADOUT_STORAGE_KEY, JSON.stringify(selectedLoadout));
        updateLoadoutUI();
        showScreen('start');
    }

    function getCharacter(id) {
        return CHARACTERS[id] || CHARACTERS[DEFAULT_LOADOUT.character];
    }

    function getWeapon(id) {
        return WEAPONS[id] || WEAPONS[DEFAULT_LOADOUT.weapon];
    }

    function getComboSpritePath(loadout, team = 'good') {
        const normalized = normalizeLoadout(loadout);
        return `assets/${normalized.character}/${normalized.weapon}/${team}.png`;
    }

    function getBulletSpritePath(team = 'good') {
        return `assets/weapons/bullet/${team}.png`;
    }

    function getDashSpritePath(loadout, team = 'good', frame = 1) {
        const normalized = normalizeLoadout(loadout);
        return `assets/${normalized.character}/dash/${normalized.weapon}/${team}/dash_${frame}.png`;
    }

    function loadSpritesForLoadout(loadout) {
        loadSprite(getComboSpritePath(loadout, 'good'));
        loadSprite(getComboSpritePath(loadout, 'bad'));
        loadSprite(getBulletSpritePath('good'));
        loadSprite(getBulletSpritePath('bad'));
        loadSprite('assets/weapons/grenade/good.png');
        loadSprite('assets/weapons/grenade/bad.png');
        for (let frame = 1; frame <= 3; frame++) {
            loadSprite(getDashSpritePath(loadout, 'good', frame));
            loadSprite(getDashSpritePath(loadout, 'bad', frame));
        }
        loadSprite('assets/buttons/dash.png');
        loadSprite('assets/buttons/grenade.png');
        loadSprite('assets/buttons/Invis_button.png');
        loadSprite('assets/buttons/OneShot_button.png');
        loadSprite('assets/buttons/autoreload_button.png');
        loadSprite('assets/buttons/shield_button.png');
        loadSprite('assets/buttons/reload_button.png');
        loadSprite('assets/buttons/attack_button.png');
        loadSprite('assets/buttons/move_button.png');
    }

    function describeLoadout(loadout) {
        const normalized = normalizeLoadout(loadout);
        return `${getCharacter(normalized.character).name} + ${getWeapon(normalized.weapon).name}`;
    }

    function characterStatText(characterId) {
        const character = getCharacter(characterId);
        return `${character.hp} HP · ${character.speedLabel} speed`;
    }

    function weaponStatText(weaponId) {
        const weapon = getWeapon(weaponId);
        return `${weapon.ammo} ammo · ${weapon.damageLabel} damage · ${weapon.rateLabel} fire`;
    }

    function getAbility(id) {
        return ABILITIES[id] || ABILITIES[DEFAULT_LOADOUT.ability];
    }

    function abilityStatText(abilityId) {
        const ability = getAbility(abilityId);
        return `${ability.stat} · ${ability.detail}`;
    }

    const glyphFiles = {
        '.': 'period.png',
        ',': 'comma.png',
        '!': 'exclamation.png',
        '?': 'question.png',
        ':': 'colon.png',
        ';': 'semicolon.png',
        "'": 'apostrophe.png',
        '"': 'quote.png',
        '-': 'hyphen.png',
        '_': 'underscore.png',
        '(': 'left_paren.png',
        ')': 'right_paren.png',
        '&': 'ampersand.png',
        '+': 'plus.png',
        '/': 'slash.png',
        '...': 'ellipsis.png'
    };

    function glyphFileFor(char) {
        const upper = char.toUpperCase();
        if (/^[A-Z]$/.test(upper)) return `${upper}.png`;
        if (/^[0-9]$/.test(char)) return `${char}.png`;
        return glyphFiles[char] || '';
    }

    function createGlyph(char, color = 'white') {
        const file = glyphFileFor(char);
        if (file) {
            const image = document.createElement('img');
            image.className = 'glyph-char';
            image.alt = char;
            image.decoding = 'async';
            image.draggable = false;
            image.src = color === 'white' ? `fonts/${file}` : `fonts/${color}/${file}`;
            return image;
        }

        const span = document.createElement('span');
        span.className = char === ' ' ? 'glyph-space' : 'glyph-plain';
        span.textContent = char === ' ' ? '' : char;
        return span;
    }

    function renderGlyphText(target, text, { color = 'white', className = '' } = {}) {
        const value = String(text ?? '');
        const compactTitle = className.includes('glyph-text-title') && value.replace(/\s/g, '').length > 9;
        const fragment = document.createDocumentFragment();

        target.textContent = '';
        target.classList.add('glyph-text');
        ['glyph-text-white', 'glyph-text-yellow', 'glyph-text-red', 'glyph-text-title', 'glyph-text-title-compact', 'glyph-text-stat', 'glyph-text-small', 'glyph-text-summary', 'glyph-stat-grid', 'glyph-stat-grid-three'].forEach(name => {
            target.classList.remove(name);
        });
        target.classList.add(`glyph-text-${color}`);
        if (className) target.classList.add(className);
        if (compactTitle) target.classList.add('glyph-text-title-compact');
        target.setAttribute('aria-label', value);

        value.split('\n').forEach(textLine => {
            const line = document.createElement('span');
            line.className = 'glyph-line';
            for (let i = 0; i < textLine.length; i += 1) {
                if (textLine.slice(i, i + 3) === '...') {
                    line.appendChild(createGlyph('...', color));
                    i += 2;
                    continue;
                }
                line.appendChild(createGlyph(textLine[i], color));
            }
            fragment.appendChild(line);
        });
        target.replaceChildren(fragment);
    }

    function renderChooserStats(stats, { columns = 2 } = {}) {
        builderPreviewStats.replaceChildren();
        builderPreviewStats.className = columns === 3
            ? 'glyph-stat-grid glyph-stat-grid-three'
            : 'glyph-stat-grid';

        stats.forEach((stat, index) => {
            const block = document.createElement('span');
            block.className = 'glyph-stat-block';
            const label = document.createElement('span');
            const value = document.createElement('span');
            renderGlyphText(label, stat.label, { color: 'white', className: 'glyph-text-stat-label' });
            renderGlyphText(value, stat.value, { color: stat.color || 'white', className: 'glyph-text-stat-value' });
            block.append(label, value);
            builderPreviewStats.appendChild(block);

            if (index < stats.length - 1) {
                const divider = document.createElement('i');
                divider.setAttribute('aria-hidden', 'true');
                builderPreviewStats.appendChild(divider);
            }
        });
    }

    function setBuilderStep(step) {
        builderStep = ['character', 'weapon', 'ability'].includes(step) ? step : 'character';
        updateBuilderUI();
    }

    function getChoiceIds() {
        if (builderStep === 'weapon') return Object.keys(WEAPONS);
        if (builderStep === 'ability') return Object.keys(ABILITIES);
        return Object.keys(CHARACTERS);
    }

    function getCurrentChoiceId() {
        if (builderStep === 'weapon') return draftLoadout.weapon;
        if (builderStep === 'ability') return draftLoadout.ability;
        return draftLoadout.character;
    }

    function setCurrentChoiceId(id) {
        if (builderStep === 'weapon' && WEAPONS[id]) {
            draftLoadout.weapon = id;
        } else if (builderStep === 'ability' && ABILITIES[id]) {
            draftLoadout.ability = id;
        } else if (CHARACTERS[id]) {
            draftLoadout.character = id;
        }
        updateBuilderUI(true);
    }

    function cycleBuilderChoice(direction) {
        const ids = getChoiceIds();
        const currentIndex = Math.max(0, ids.indexOf(getCurrentChoiceId()));
        const nextIndex = (currentIndex + direction + ids.length) % ids.length;
        setCurrentChoiceId(ids[nextIndex]);
    }

    function renderBuilderOptions() {
        characterOptions.replaceChildren();
        weaponOptions.replaceChildren();
        abilityOptions.replaceChildren();

        Object.values(CHARACTERS).forEach(character => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option-card';
            button.dataset.character = character.id;
            button.innerHTML = `
                <img class="option-art" src="${character.face}" alt="">
                <strong>${character.name}</strong>
                <small>${character.hp} HP · ${character.speedLabel}</small>
            `;
            button.addEventListener('click', () => {
                builderStep = 'character';
                setCurrentChoiceId(character.id);
            });
            characterOptions.appendChild(button);
        });

        Object.values(WEAPONS).forEach(weapon => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option-card';
            button.dataset.weapon = weapon.id;
            button.innerHTML = `
                <img class="option-art" src="${weapon.art}" alt="">
                <strong>${weapon.name}</strong>
                <small>${weapon.ammo} ammo · ${weapon.damageLabel}</small>
            `;
            button.addEventListener('click', () => {
                builderStep = 'weapon';
                setCurrentChoiceId(weapon.id);
            });
            weaponOptions.appendChild(button);
        });

        Object.values(ABILITIES).forEach(ability => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'option-card';
            button.dataset.ability = ability.id;
            button.innerHTML = `
                <img class="option-art" src="${ability.art}" alt="">
                <strong>${ability.name}</strong>
                <small>${ability.mode === 'passive' ? 'Passive' : ability.mode === 'drag' ? 'Drag' : 'Tap'} · ${ability.detail}</small>
            `;
            button.addEventListener('click', () => {
                builderStep = 'ability';
                setCurrentChoiceId(ability.id);
            });
            abilityOptions.appendChild(button);
        });
    }

    function updateSelectedOption(container, dataKey, selectedId) {
        const buttons = Array.from(container.querySelectorAll('.option-card'));
        buttons.forEach(button => {
            const selected = button.dataset[dataKey] === selectedId;
            button.classList.toggle('selected', selected);
            button.classList.toggle('peek', !selected);
            button.classList.toggle('is-window-hidden', !selected);
            button.setAttribute('aria-selected', selected ? 'true' : 'false');
        });
    }

    function updateBuilderUI(animate = false) {
        draftLoadout = normalizeLoadout(draftLoadout);
        updateSelectedOption(characterOptions, 'character', draftLoadout.character);
        updateSelectedOption(weaponOptions, 'weapon', draftLoadout.weapon);
        updateSelectedOption(abilityOptions, 'ability', draftLoadout.ability);

        const character = getCharacter(draftLoadout.character);
        const weapon = getWeapon(draftLoadout.weapon);
        const ability = getAbility(draftLoadout.ability);
        const onCharacterStep = builderStep === 'character';
        const onWeaponStep = builderStep === 'weapon';
        const onAbilityStep = builderStep === 'ability';

        builderMenuArt.src = builderMenuArtByStep[builderStep] || builderMenuArtByStep.character;
        characterOptions.classList.toggle('hidden', !onCharacterStep);
        weaponOptions.classList.toggle('hidden', !onWeaponStep);
        abilityOptions.classList.toggle('hidden', !onAbilityStep);
        builderStepBackBtn.classList.add('hidden');
        builderStepNextBtn.classList.add('hidden');
        saveLoadoutBtn.classList.remove('hidden');
        builderWeaponStat.classList.toggle('hidden', onCharacterStep);
        builderCharacterStat.classList.toggle('hidden', !onAbilityStep);
        builderTabButtons.forEach(button => {
            button.classList.toggle('is-active', button.dataset.builderStep === builderStep);
            button.setAttribute('aria-pressed', button.dataset.builderStep === builderStep ? 'true' : 'false');
        });
        builderStepEyebrow.textContent = onAbilityStep ? 'Step 3 of 3' : onWeaponStep ? 'Step 2 of 3' : 'Step 1 of 3';
        document.querySelectorAll('.garage-progress span').forEach((dot, index) => {
            dot.classList.toggle('active', index === (onAbilityStep ? 2 : onWeaponStep ? 1 : 0));
        });
        builderStepNextBtn.textContent = onWeaponStep ? 'Pick Ability' : 'Pick Weapon';

        builderCharacterStat.textContent = `${ability.detail}`;
        builderWeaponStat.textContent = weaponStatText(draftLoadout.weapon);
        builderComboArt.src = getComboSpritePath(draftLoadout, 'good');
        summaryCharacterArt.src = character.face;
        summaryWeaponArt.src = weapon.art;
        summaryAbilityArt.src = ability.art;
        document.querySelectorAll('.chooser-summary > div > span').forEach((label, index) => {
            renderGlyphText(label, ['character', 'weapon', 'ability'][index] || '', { color: 'white', className: 'glyph-text-summary' });
        });
        renderGlyphText(
            builderPreviewLabel,
            onAbilityStep ? ability.name : onWeaponStep ? weapon.name : character.name,
            { color: 'yellow', className: 'glyph-text-title' }
        );
        if (onCharacterStep) {
            renderChooserStats([
                { label: 'speed', value: character.speedLabel },
                { label: 'health', value: character.hp, color: 'red' }
            ]);
            builderWeaponStat.classList.add('hidden');
            builderCharacterStat.classList.add('hidden');
        } else if (onWeaponStep) {
            renderChooserStats([
                { label: 'ammo', value: weapon.ammo },
                { label: 'attack speed', value: weapon.rateLabel },
                { label: 'damage', value: weapon.damageLabel }
            ], { columns: 3 });
            builderWeaponStat.classList.add('hidden');
            builderCharacterStat.classList.add('hidden');
        } else {
            renderGlyphText(builderPreviewStats, ability.stat, { color: 'white', className: 'glyph-text-stat' });
            renderGlyphText(
                builderWeaponStat,
                ability.mode === 'passive' ? 'Passive ability' : `${Math.round(ability.cooldown)}s cooldown`,
                { color: 'white', className: 'glyph-text-small' }
            );
            builderWeaponStat.classList.remove('hidden');
            builderCharacterStat.classList.add('hidden');
        }
        if (animate) {
            builderComboArt.classList.remove('swap');
            requestAnimationFrame(() => {
                builderComboArt.classList.add('swap');
                setTimeout(() => builderComboArt.classList.remove('swap'), 170);
            });
        }
        loadSpritesForLoadout(draftLoadout);
    }

    function updateLoadoutUI() {
        selectedLoadout = normalizeLoadout(selectedLoadout);
        menuLoadoutTitle.textContent = describeLoadout(selectedLoadout);
        menuLoadoutArt.src = getComboSpritePath(selectedLoadout, 'good');
        updateAbilityButtonArt();
        loadSpritesForLoadout(selectedLoadout);
    }

    function updateAbilityButtonArt() {
        const sourceLoadout = running ? player.loadout : selectedLoadout;
        const ability = getAbility(sourceLoadout.ability);
        abilityIcon.src = ability.art;
        abilityIcon.alt = '';
        abilityBtn.dataset.ability = ability.id;
    }

    function createPlayer(id, x, y, color, loadout = DEFAULT_LOADOUT) {
        const normalizedLoadout = normalizeLoadout(loadout);
        const character = getCharacter(normalizedLoadout.character);
        const weapon = getWeapon(normalizedLoadout.weapon);
        const ability = getAbility(normalizedLoadout.ability);
        return {
            id,
            name: id,
            loadout: normalizedLoadout,
            x,
            y,
            visualX: x,
            visualY: y,
            vx: 0,
            vy: 0,
            r: 24,
            speed: character.speed,
            color,
            aimAngle: id === 'local' ? 0 : Math.PI,
            hp: character.hp,
            maxHp: character.hp,
            shield: 0,
            maxShield: SHIELD_MAX,
            ammo: weapon.ammo,
            maxAmmo: weapon.ammo,
            reloadDuration: weapon.reloadDuration,
            reloadTimer: 0,
            reloadProgress: 0,
            reloading: false,
            cooldown: 0,
            abilityCooldown: 0,
            abilityCooldownMax: ability.cooldown,
            dashTimer: 0,
            dashDuration: DASH_DURATION,
            dashAngle: id === 'local' ? 0 : Math.PI,
            invisibleTimer: 0,
            invisibleDuration: INVIS_DURATION,
            oneShotArmed: false,
            oneShotReloadPending: false,
            invuln: 0,
            alive: true,
            targetAimAngle: id === 'local' ? 0 : Math.PI,
            lastSeen: performance.now()
        };
    }

    function applyPlayerLoadout(entity, loadout, refill = true) {
        const normalized = normalizeLoadout(loadout);
        const character = getCharacter(normalized.character);
        const weapon = getWeapon(normalized.weapon);
        const hpPct = entity.maxHp > 0 ? clamp(entity.hp / entity.maxHp, 0, 1) : 1;

        entity.loadout = normalized;
        entity.speed = character.speed;
        entity.maxHp = character.hp;
        entity.hp = refill ? character.hp : Math.max(1, Math.round(character.hp * hpPct));
        entity.maxAmmo = weapon.ammo;
        entity.reloadDuration = weapon.reloadDuration;
        entity.abilityCooldownMax = getAbility(normalized.ability).cooldown;
        if (refill) {
            entity.ammo = weapon.ammo;
            entity.reloading = false;
            entity.reloadTimer = 0;
            entity.reloadProgress = 0;
            entity.abilityCooldown = 0;
            entity.dashTimer = 0;
            entity.invisibleTimer = 0;
            entity.shield = 0;
            entity.maxShield = SHIELD_MAX;
            clearOneShot(entity);
        } else {
            entity.ammo = clamp(entity.ammo, 0, weapon.ammo);
            entity.abilityCooldown = clamp(entity.abilityCooldown, 0, entity.abilityCooldownMax);
            entity.shield = clamp(entity.shield || 0, 0, SHIELD_MAX);
            entity.maxShield = SHIELD_MAX;
        }
        loadSpritesForLoadout(normalized);
    }

    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
        scheduleViewportResize();
        updateAccessGates();
    }

    function updateAccessGates() {
        installBlocked = !isStandaloneApp();
        orientationBlocked = !installBlocked && isPortraitViewport();

        installScreen.classList.toggle('hidden', !installBlocked);
        rotateScreen.classList.toggle('hidden', !orientationBlocked);

        if (installBlocked || orientationBlocked) {
            resetInput();
        }
    }

    function isStandaloneApp() {
        const localDebugStandalone = new URLSearchParams(window.location.search).has('debug-standalone')
            && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost');
        return window.matchMedia('(display-mode: standalone)').matches
            || window.matchMedia('(display-mode: fullscreen)').matches
            || window.navigator.standalone === true
            || localDebugStandalone;
    }

    function isPortraitViewport() {
        const viewport = window.visualViewport;
        const width = viewport ? viewport.width : window.innerWidth;
        const height = viewport ? viewport.height : window.innerHeight;
        return height > width;
    }

    function playBlocked() {
        return installBlocked || orientationBlocked;
    }

    function setupServiceWorkerUpdates() {
        if (!('serviceWorker' in navigator)) return;

        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (refreshing) return;
            refreshing = true;
            window.location.reload();
        });

        navigator.serviceWorker.register(`sw.js?v=${APP_VERSION}`, { updateViaCache: 'none' })
            .then(registration => {
                registration.update();
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible') {
                        registration.update();
                    }
                });

                if (registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                }

                registration.addEventListener('updatefound', () => {
                    const worker = registration.installing;
                    if (!worker) return;

                    worker.addEventListener('statechange', () => {
                        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                            worker.postMessage({ type: 'SKIP_WAITING' });
                        }
                    });
                });
            })
            .catch(() => {});
    }

    function showAlert(message, duration = 2600) {
        clearTimeout(alertTimer);
        alertScreen.textContent = message;
        alertScreen.classList.add('show');
        alertTimer = setTimeout(() => alertScreen.classList.remove('show'), duration);
    }

    function showMigrationOverlay(message = 'Starting new match...') {
        migrationMessage.textContent = message;
        migrationOverlay.classList.remove('hidden');
    }

    function hideMigrationOverlay() {
        migrationOverlay.classList.add('hidden');
    }

    function getConnectedPlayerCount() {
        return roomPlayers.filter(entry => entry.connected !== false).length;
    }

    function clearMigrationRestartTimer() {
        clearTimeout(migrationRestartTimer);
        migrationRestartTimer = 0;
    }

    function queueMigratedRestart(delay = 850) {
        if (roomStarted || migrationRestartTimer) return;
        const restartTarget = migrationRestartTargetPlayers || maxPlayers;
        if (getConnectedPlayerCount() < restartTarget) {
            showMigrationOverlay(`Waiting for players ${getConnectedPlayerCount()}/${restartTarget}...`);
            return;
        }
        hideMigrationOverlay();
        showScreen('waiting');
        updateRoomUI();
        if (isLocalHost()) showAlert('You are the new host. Start when ready.');
    }

    function setPlayerName() {
        playerName = playerNameInput.value.trim() || 'Ranger';
        player.name = playerName;
    }

    function resetConnectionUI() {
        connectionStatus.textContent = 'Ready to connect.';
        hostGameBtn.disabled = false;
        joinGameBtn.disabled = false;
        copyCodeBtn.classList.add('hidden');
        lobbyPanel.classList.add('hidden');
        hideMigrationOverlay();
        updateQuickJoinUI();
    }

    function cleanupPeer(options = {}) {
        intentionalDisconnect = options.intentional !== false;
        clearInterval(joinRetryTimer);
        joinRetryTimer = 0;
        connections.forEach(connection => connection.close());
        connections.clear();
        if (conn) {
            conn.close();
            conn = null;
        }
        if (peer) {
            peer.destroy();
            peer = null;
        }
        if (intentionalDisconnect) {
            clearMigrationRestartTimer();
            setTimeout(() => {
                intentionalDisconnect = false;
            }, 0);
        }
    }

    function sendData(data) {
        const message = {
            ...data,
            playerId: localPlayerId,
            name: playerName,
            sessionSecret
        };
        if (networkRole === 'host') {
            broadcastData(message);
        } else if (conn && conn.open) {
            conn.send(message);
        }
    }

    function broadcastData(data, exceptId = '') {
        connections.forEach((connection, id) => {
            if (id !== exceptId && connection.open) connection.send(data);
        });
    }

    function playerSnapshot(type = 'state', extra = {}) {
        return {
            type,
            x: player.x,
            y: player.y,
            aimAngle: player.aimAngle,
            hp: player.hp,
            shield: player.shield,
            maxShield: player.maxShield,
            ammo: player.ammo,
            maxAmmo: player.maxAmmo,
            reloading: player.reloading,
            reloadProgress: player.reloadProgress,
            abilityCooldown: player.abilityCooldown,
            dashTimer: player.dashTimer,
            dashAngle: player.dashAngle,
            invisibleTimer: player.invisibleTimer,
            oneShotArmed: player.oneShotArmed,
            oneShotReloadPending: player.oneShotReloadPending,
            alive: player.alive,
            loadout: player.loadout,
            ...extra
        };
    }

    function initializeHost(roomCode) {
        cleanupPeer();
        setPlayerName();
        currentRoomCode = roomCode;
        currentJoinCode = roomCode;
        sessionSecret = makeSecretRoomCode();
        hostPlayerId = localPlayerId;
        roomStarted = false;
        networkRole = 'host';
        maxPlayers = getSelectedMaxPlayers();
        migrationRestartTargetPlayers = 0;
        roomPlayers = [{ id: localPlayerId, name: playerName, connected: true, host: true, team: 0 }];
        remotePlayers.clear();
        peer = new Peer(peerIdPrefix + roomCode);
        connectionStatus.textContent = `Room code is ${roomCode}. Waiting for ${maxPlayers - 1} more.`;
        copyCodeBtn.classList.remove('hidden');
        hostGameBtn.disabled = true;
        joinGameBtn.disabled = true;
        saveRecentRoom();
        updateLobbyUI();
        showScreen('waiting');

        peer.on('connection', newConn => {
            setupHostConnection(newConn);
        });

        peer.on('error', err => {
            showAlert(err.type === 'unavailable-id' ? 'Code is in use. Try another.' : `Connection error: ${err.type}`);
            resetConnectionUI();
        });
    }

    function initializeJoin(roomCode, options = {}) {
        cleanupPeer();
        setPlayerName();
        currentRoomCode = options.publicCode || roomCode;
        currentJoinCode = roomCode;
        hostPlayerId = '';
        roomStarted = false;
        migrationRestartTargetPlayers = 0;
        roomPlayers = [{ id: localPlayerId, name: playerName, connected: true, host: false, team: 0 }];
        remotePlayers.clear();
        networkRole = 'guest';
        peer = new Peer();
        connectionStatus.textContent = `Joining room ${roomCode}...`;
        hostGameBtn.disabled = true;
        joinGameBtn.disabled = true;
        lobbyPanel.classList.remove('hidden');
        updateLobbyUI();
        showScreen('waiting');

        peer.on('open', () => {
            conn = peer.connect(peerIdPrefix + roomCode, { reliable: true });
            setupGuestConnection(conn, options.reconnect === true);
        });

        peer.on('error', err => {
            showAlert(err.type === 'peer-unavailable' ? 'Room not found.' : `Connection error: ${err.type}`);
            resetConnectionUI();
        });
    }

    function setupHostConnection(connection) {
        const sendHostReady = () => {
            if (!connection.open) return;
            connection.send({
                type: 'host-ready',
                playerId: localPlayerId,
                hostId: hostPlayerId,
                roomCode: currentRoomCode,
                joinCode: currentJoinCode,
                sessionSecret,
                maxPlayers,
                roster: roomPlayers,
                started: roomStarted
            });
        };
        if (connection.open) sendHostReady();
        else connection.on('open', sendHostReady);
        connection.on('data', data => {
            if (!data || typeof data !== 'object') return;
            if (data.type === 'join') {
                registerGuest(connection, data);
                return;
            }
            const sourceId = connection.playerId || data.playerId;
            if (!sourceId) return;
            const message = { ...data, playerId: sourceId };
            handleData(message);
            broadcastData(message, sourceId);
        });
        connection.on('close', () => {
            handleGuestDisconnect(connection.playerId);
        });
        connection.on('error', () => handleGuestDisconnect(connection.playerId));
    }

    function retryMigratedConnection(attempt) {
        if (!migrationInProgress) return;
        if (attempt < MIGRATION_MAX_ATTEMPTS) {
            setTimeout(() => connectToMigratedHost(attempt + 1), 500 + attempt * 300);
        } else {
            migrationInProgress = false;
            showAlert('Could not reconnect to new host.');
        }
    }

    function setupGuestConnection(connection, reconnect = false, reconnectAttempt = 0) {
        let migratedRetryScheduled = false;
        const scheduleMigratedRetry = () => {
            if (migratedRetryScheduled) return;
            migratedRetryScheduled = true;
            retryMigratedConnection(reconnectAttempt);
        };
        connection.on('data', data => handleData(data));
        connection.on('close', () => {
            if (reconnect && migrationInProgress) scheduleMigratedRetry();
            else if (!intentionalDisconnect && gameMode === 'pvp') beginHostMigration();
            else if (!intentionalDisconnect) resetConnectionUI();
        });
        connection.on('error', () => {
            if (reconnect && migrationInProgress) scheduleMigratedRetry();
            else if (gameMode === 'pvp') beginHostMigration();
            else showAlert('Connection failed.');
        });
        const sendJoin = () => {
            if (!connection.open) return;
            connection.send({
                type: 'join',
                playerId: localPlayerId,
                name: playerName,
                loadout: player.loadout,
                reconnect,
                sessionSecret
            });
        };
        if (connection.open) {
            sendJoin();
        } else {
            connection.on('open', sendJoin);
        }
        clearInterval(joinRetryTimer);
        joinRetryTimer = setInterval(sendJoin, 700);
    }

    function registerGuest(connection, data) {
        const id = data.playerId || connection.peer;
        if (!id) return;
        departedPlayerIds.delete(id);
        if (id === localPlayerId) {
            connection.send({ type: 'join-denied', reason: 'Same browser player id. Try joining again.', resetPlayerId: true });
            connection.close();
            return;
        }
        const existingIndex = roomPlayers.findIndex(entry => entry.id === id);
        if (existingIndex < 0 && roomPlayers.length >= maxPlayers) {
            connection.send({ type: 'join-denied', reason: 'Room is full.' });
            connection.close();
            return;
        }
        connection.playerId = id;
        connections.set(id, connection);
        if (existingIndex >= 0) {
            roomPlayers[existingIndex] = { ...roomPlayers[existingIndex], name: data.name || roomPlayers[existingIndex].name, connected: true };
        } else {
            roomPlayers.push({ id, name: data.name || 'Ranger', connected: true, host: false, team: roomPlayers.length % 2 });
        }
        normalizeRoster();
        getOrCreateRemotePlayer(id, data.name);
        connection.send({
            type: 'welcome',
            playerId: localPlayerId,
            hostId: hostPlayerId,
            roomCode: currentRoomCode,
            joinCode: currentJoinCode,
            sessionSecret,
            maxPlayers,
            roster: roomPlayers,
            started: roomStarted,
            scores: roundScores,
            round: currentRound,
            roundOver,
            matchOver,
            winnerTeam: roundWinnerTeam,
            state: playerSnapshot('state')
        });
        connection.send({
            type: 'lobby',
            playerId: localPlayerId,
            hostId: hostPlayerId,
            roomCode: currentRoomCode,
            joinCode: currentJoinCode,
            sessionSecret,
            maxPlayers,
            roster: roomPlayers,
            started: roomStarted
        });
        broadcastLobby();
        updateLobbyUI();
        if (!roomStarted && currentJoinCode === sessionSecret && sessionSecret) {
            const restartTarget = migrationRestartTargetPlayers || maxPlayers;
            if (getConnectedPlayerCount() >= restartTarget) {
                hideMigrationOverlay();
                showScreen('waiting');
                updateRoomUI();
            } else {
                showMigrationOverlay(`Waiting for players ${getConnectedPlayerCount()}/${restartTarget}...`);
            }
        } else if (roomStarted) {
            connection.send({
                type: 'start',
                roster: roomPlayers,
                maxPlayers,
                hostId: hostPlayerId,
                sessionSecret,
                scores: roundScores,
                round: currentRound
            });
            if (roundOver) {
                connection.send({
                    type: 'round-result',
                    winnerTeam: roundWinnerTeam,
                    scores: roundScores,
                    round: currentRound,
                    matchOver,
                    roster: roomPlayers,
                    maxPlayers,
                    hostId: hostPlayerId,
                    sessionSecret
                });
            }
            sendData(playerSnapshot());
        }
    }

    function broadcastLobby() {
        normalizeRoster();
        broadcastData({
            type: 'lobby',
            playerId: localPlayerId,
            hostId: hostPlayerId,
            roomCode: currentRoomCode,
            joinCode: currentJoinCode,
            sessionSecret,
            maxPlayers,
            roster: roomPlayers,
            started: roomStarted
        });
        updateRoomUI();
    }

    function startNetworkMatch(options = {}) {
        clearMigrationRestartTimer();
        migrationRestartTargetPlayers = 0;
        resetMatchState();
        roomStarted = true;
        normalizeRoster();
        saveRecentRoom();
        broadcastData({ type: 'start', roster: roomPlayers, maxPlayers, hostId: hostPlayerId, sessionSecret, scores: roundScores, round: currentRound });
        startGame('pvp');
        showAlert(options.migrated ? 'New match started.' : 'All players joined.');
    }

    function handleGuestDisconnect(id) {
        if (!id || networkRole !== 'host') return;
        connections.delete(id);
        const entry = roomPlayers.find(playerEntry => playerEntry.id === id);
        if (entry) entry.connected = false;
        removeRemotePlayer(id, true);
        roomPlayers = roomPlayers.filter(playerEntry => playerEntry.id !== id);
        normalizeRoster();
        broadcastData({ type: 'player-left', id, roster: roomPlayers, hostId: hostPlayerId, maxPlayers, sessionSecret });
        broadcastLobby();
        updateLobbyUI();
        checkRoundWinner();
        showAlert(`${entry ? entry.name : 'Player'} left.`);
    }

    function getNextHostId() {
        const candidates = roomPlayers.filter(entry => entry.id !== hostPlayerId && entry.connected !== false);
        return candidates[0] ? candidates[0].id : localPlayerId;
    }

    function beginHostMigration() {
        if (migrationInProgress || !sessionSecret) return;
        migrationInProgress = true;
        const oldHostId = hostPlayerId;
        roomPlayers = roomPlayers.filter(entry => entry.id !== oldHostId);
        if (!roomPlayers.some(entry => entry.id === localPlayerId)) {
            roomPlayers.push({ id: localPlayerId, name: playerName, connected: true });
        }
        hostPlayerId = getNextHostId();
        currentJoinCode = sessionSecret;
        migrationRestartTargetPlayers = Math.max(1, roomPlayers.length);
        roomStarted = false;
        roomPlayers = roomPlayers.map(entry => ({
            ...entry,
            connected: entry.id === localPlayerId
        }));
        normalizeRoster();
        removeRemotePlayer(oldHostId, true);
        resetInput();
        saveRecentRoom();
        showMigrationOverlay('Starting new match...');
        if (hostPlayerId === localPlayerId) {
            setTimeout(becomeMigratedHost, 120);
        } else {
            setTimeout(() => connectToMigratedHost(0), 650);
        }
    }

    function becomeMigratedHost() {
        cleanupPeer({ intentional: false });
        networkRole = 'host';
        hostPlayerId = localPlayerId;
        roomStarted = false;
        currentJoinCode = sessionSecret;
        connections.clear();
        normalizeRoster();
        peer = new Peer(peerIdPrefix + sessionSecret);
        peer.on('connection', setupHostConnection);
        peer.on('open', () => {
            migrationInProgress = false;
            saveRecentRoom();
            broadcastLobby();
            queueMigratedRestart();
        });
        peer.on('error', err => {
            if (err && err.type === 'unavailable-id') {
                showAlert('Another player became host. Rejoining...', 1600);
                setTimeout(() => connectToMigratedHost(0), 350);
                return;
            }
            migrationInProgress = false;
            hideMigrationOverlay();
            showAlert(`Host migration failed${err && err.type ? `: ${err.type}` : ''}.`);
        });
    }

    function connectToMigratedHost(attempt = 0) {
        cleanupPeer({ intentional: false });
        networkRole = 'guest';
        currentJoinCode = sessionSecret;
        peer = new Peer();
        peer.on('open', () => {
            conn = peer.connect(peerIdPrefix + sessionSecret, { reliable: true });
            setupGuestConnection(conn, true, attempt);
        });
        peer.on('error', () => {
            if (attempt < MIGRATION_MAX_ATTEMPTS) {
                setTimeout(() => connectToMigratedHost(attempt + 1), 500 + attempt * 300);
            } else {
                migrationInProgress = false;
                hideMigrationOverlay();
                showAlert('Could not reconnect to new host.');
            }
        });
    }

    function handleData(data) {
        if (!data || typeof data !== 'object') return;
        if (data.playerId === localPlayerId && data.type !== 'welcome') return;

        if (data.type === 'join-denied') {
            clearInterval(joinRetryTimer);
            joinRetryTimer = 0;
            if (data.resetPlayerId) {
                sessionStorage.removeItem(PLAYER_SESSION_STORAGE_KEY);
                localPlayerId = getLocalPlayerId();
                showAlert('New player slot created. Try joining again.');
                resetConnectionUI();
                return;
            }
            showAlert(data.reason || 'Could not join room.');
            resetConnectionUI();
            return;
        }

        if (data.type === 'kicked') {
            showAlert(data.reason || 'You were kicked from the room.');
            stopGame();
            return;
        }

        if (data.type === 'host-ready') {
            hostPlayerId = data.hostId || data.playerId || hostPlayerId;
            currentRoomCode = data.roomCode || currentRoomCode;
            currentJoinCode = data.joinCode || currentJoinCode;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            if (Array.isArray(data.roster) && data.roster.length) {
                roomPlayers = normalizeRoster(data.roster);
            }
            updateLobbyUI();
            if (conn && conn.open) {
                conn.send({
                    type: 'join',
                    playerId: localPlayerId,
                    name: playerName,
                    loadout: player.loadout,
                    reconnect: false,
                    sessionSecret
                });
            }
            return;
        }

        if (data.type === 'welcome') {
            clearInterval(joinRetryTimer);
            joinRetryTimer = 0;
            migrationInProgress = false;
            hostPlayerId = data.hostId || data.playerId;
            currentRoomCode = data.roomCode || currentRoomCode;
            currentJoinCode = data.joinCode || currentJoinCode;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            roomPlayers = normalizeRoster(data.roster || roomPlayers);
            roomStarted = data.started === true;
            roundScores = Array.isArray(data.scores) ? [Number(data.scores[0]) || 0, Number(data.scores[1]) || 0] : roundScores;
            currentRound = Number(data.round) || currentRound;
            roundOver = data.roundOver === true;
            matchOver = data.matchOver === true;
            roundWinnerTeam = Number.isFinite(Number(data.winnerTeam)) ? Number(data.winnerTeam) : roundWinnerTeam;
            if (data.state) handleData(data.state);
            saveRecentRoom();
            updateLobbyUI();
            connectionStatus.textContent = roomStarted ? 'Rejoining match...' : `Waiting for players ${roomPlayers.length}/${maxPlayers}.`;
            if (roomStarted) startGame('pvp');
            else {
                hideMigrationOverlay();
                showScreen('waiting');
            }
            return;
        }

        if (data.type === 'lobby') {
            hostPlayerId = data.hostId || hostPlayerId;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            roomPlayers = normalizeRoster(data.roster || roomPlayers);
            roomStarted = data.started === true;
            saveRecentRoom();
            updateLobbyUI();
            connectionStatus.textContent = roomStarted ? 'Game in progress.' : `Waiting for players ${roomPlayers.length}/${maxPlayers}.`;
            if (!roomStarted) {
                hideMigrationOverlay();
                showScreen('waiting');
            }
            return;
        }

        if (data.type === 'start') {
            hostPlayerId = data.hostId || hostPlayerId;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            roomPlayers = normalizeRoster(data.roster || roomPlayers);
            roundScores = Array.isArray(data.scores) ? [Number(data.scores[0]) || 0, Number(data.scores[1]) || 0] : [0, 0];
            currentRound = Number(data.round) || 1;
            roundOver = false;
            matchOver = false;
            roomStarted = true;
            saveRecentRoom();
            startGame('pvp');
            return;
        }

        if (data.type === 'round-result') {
            hostPlayerId = data.hostId || hostPlayerId;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            roomPlayers = normalizeRoster(data.roster || roomPlayers);
            currentRound = Number(data.round) || currentRound;
            finishRound(data.winnerTeam, data.scores);
            matchOver = data.matchOver === true;
            updateRoundHud();
            showRoundOverlay();
            return;
        }

        if (data.type === 'round-start') {
            hostPlayerId = data.hostId || hostPlayerId;
            sessionSecret = data.sessionSecret || sessionSecret;
            maxPlayers = Number(data.maxPlayers) || maxPlayers;
            roomPlayers = normalizeRoster(data.roster || roomPlayers);
            roundScores = Array.isArray(data.scores) ? [Number(data.scores[0]) || 0, Number(data.scores[1]) || 0] : roundScores;
            currentRound = Number(data.round) || currentRound;
            startRound();
            return;
        }

        if (data.type === 'player-left') {
            roomPlayers = normalizeRoster(data.roster || roomPlayers.filter(entry => entry.id !== data.id));
            removeRemotePlayer(data.id, true);
            updateLobbyUI();
            return;
        }

        if (data.type === 'hello') {
            opponentName = data.name || 'Opponent';
            applyRemoteSnapshot({ ...data, playerId: data.playerId || 'legacy-remote' }, true);
            sendData(playerSnapshot('hello-reply', { name: playerName }));
            showAlert(`${opponentName} joined.`);
            return;
        }

        if (data.type === 'hello-reply') {
            opponentName = data.name || 'Opponent';
            applyRemoteSnapshot({ ...data, playerId: data.playerId || 'legacy-remote' }, true);
            showAlert(`${opponentName} joined.`);
            return;
        }

        if (data.type === 'state') {
            applyRemoteSnapshot(data, false);
            return;
        }

        if (data.type === 'shot') {
            const entity = applyRemoteSnapshot(data, false);
            if (entity) spawnWeaponBullets(entity, Number(data.angle) || entity.aimAngle, true, data.id, data.angles, finiteNumber(data.damageMultiplier, 1));
            return;
        }

        if (data.type === 'ability') {
            const entity = applyRemoteSnapshot(data, false);
            if (data.ability === 'grenade') {
                spawnGrenade(
                    finiteNumber(data.x, entity ? entity.x : 0),
                    finiteNumber(data.y, entity ? entity.y : 0),
                    finiteNumber(data.targetX, entity ? entity.x : 0),
                    finiteNumber(data.targetY, entity ? entity.y : 0),
                    true,
                    data.id || '',
                    data.playerId || ''
                );
            }
            return;
        }

        if (data.type === 'hit') {
            const entity = getOrCreateRemotePlayer(data.playerId, data.name);
            if (!entity) return;
            if (typeof data.hp === 'number') {
                entity.hp = data.hp;
            } else {
                applyDamage(entity, Number(data.damage) || 12);
            }
            entity.shield = typeof data.shield === 'number' ? clamp(data.shield, 0, SHIELD_MAX) : entity.shield;
            entity.invisibleTimer = typeof data.invisibleTimer === 'number' ? clamp(data.invisibleTimer, 0, INVIS_DURATION) : entity.invisibleTimer;
            entity.alive = data.alive !== false && entity.hp > 0;
            if (isLocalHost()) checkRoundWinner();
            return;
        }

        if (data.type === 'damage') {
            if (data.targetId === localPlayerId && canDamagePlayer(data.playerId, localPlayerId)) {
                applyLocalDamage(Number(data.damage) || 0, data.hitId || '');
            }
            return;
        }
    }

    function applyRemoteSnapshot(data, snap) {
        const entity = getOrCreateRemotePlayer(data.playerId, data.name);
        if (!entity) return null;
        const nextX = finiteNumber(data.x, entity.x);
        const nextY = finiteNumber(data.y, entity.y);
        const nextAimAngle = finiteNumber(data.aimAngle, entity.targetAimAngle);

        if (data.loadout) {
            applyPlayerLoadout(entity, data.loadout, false);
        }
        entity.x = nextX;
        entity.y = nextY;
        entity.targetAimAngle = nextAimAngle;
        entity.hp = typeof data.hp === 'number' ? data.hp : entity.hp;
        entity.shield = typeof data.shield === 'number' ? clamp(data.shield, 0, SHIELD_MAX) : entity.shield;
        entity.maxShield = typeof data.maxShield === 'number' ? clamp(data.maxShield, 0, SHIELD_MAX) : entity.maxShield;
        entity.ammo = typeof data.ammo === 'number' ? data.ammo : entity.ammo;
        entity.maxAmmo = typeof data.maxAmmo === 'number' ? data.maxAmmo : entity.maxAmmo;
        entity.reloading = Boolean(data.reloading);
        entity.reloadProgress = typeof data.reloadProgress === 'number' ? clamp(data.reloadProgress, 0, 1) : entity.reloadProgress;
        entity.abilityCooldown = typeof data.abilityCooldown === 'number' ? clamp(data.abilityCooldown, 0, getAbility(entity.loadout.ability).cooldown) : entity.abilityCooldown;
        entity.dashTimer = typeof data.dashTimer === 'number' ? clamp(data.dashTimer, 0, DASH_DURATION) : entity.dashTimer;
        entity.dashAngle = typeof data.dashAngle === 'number' ? data.dashAngle : entity.dashAngle;
        entity.invisibleTimer = typeof data.invisibleTimer === 'number' ? clamp(data.invisibleTimer, 0, INVIS_DURATION) : entity.invisibleTimer;
        entity.oneShotArmed = data.oneShotArmed === true;
        entity.oneShotReloadPending = data.oneShotReloadPending === true;
        entity.alive = data.alive !== false;
        entity.lastSeen = performance.now();

        if (snap) {
            entity.visualX = nextX;
            entity.visualY = nextY;
            entity.aimAngle = nextAimAngle;
        }
        return entity;
    }

    function startGame(mode, options = {}) {
        updateAccessGates();
        if (playBlocked()) return;
        setPlayerName();
        gameMode = mode;
        score = 0;
        if (mode === 'pvp' && options.preserveState !== true) {
            startRound({ announce: options.announceRound !== false });
            scheduleViewportResize();
            if (!running) {
                running = true;
                lastFrame = performance.now();
                animationId = requestAnimationFrame(loop);
            }
            return;
        }
        resetPlayers(options.preserveState === true);
        showScreen('game');
        hideMigrationOverlay();
        scheduleViewportResize();
        if (!running) {
            running = true;
            lastFrame = performance.now();
            animationId = requestAnimationFrame(loop);
        }
    }

    function stopGame() {
        running = false;
        cancelAnimationFrame(animationId);
        resetInput();
        roomStarted = false;
        migrationInProgress = false;
        resetMatchState();
        clearMigrationRestartTimer();
        hideMigrationOverlay();
        cleanupPeer();
        resetConnectionUI();
        showScreen('start');
    }

    function resetPlayers(preserveState = false) {
        if (!roomPlayers.some(entry => entry.id === localPlayerId)) {
            roomPlayers.unshift({ id: localPlayerId, name: playerName, connected: true, host: networkRole === 'host' });
            normalizeRoster();
        }
        if (!preserveState) {
            const localSpawn = gameMode === 'pvp' ? getSpawnPoint(localPlayerId) : { x: world.width * 0.34, y: world.height * 0.5 };
            Object.assign(player, createPlayer('local', localSpawn.x, localSpawn.y, colors.local, selectedLoadout), { name: playerName, playerId: localPlayerId });
            remotePlayers.clear();
            roomPlayers.forEach(entry => {
                if (entry.id !== localPlayerId) getOrCreateRemotePlayer(entry.id, entry.name);
            });
            bullets.length = 0;
            grenades.length = 0;
            impacts.length = 0;
            processedHitIds.clear();
            dummies.forEach(dummy => dummy.hp = dummy.maxHp);
        }
        updateAbilityButtonArt();
        updateHud();
    }

    function resetInput() {
        resetJoystickState(input.move);
        resetJoystickState(input.aim);
        moveStick.style.left = '50%';
        moveStick.style.top = '50%';
        shootStick.style.left = '50%';
        shootStick.style.top = '50%';
        updateStick(moveStick, 0, 0);
        updateStick(shootStick, 0, 0);
        resetAbilityKnob();
    }

    function resetJoystickState(state) {
        state.pointerId = null;
        state.active = false;
        state.originX = 0;
        state.originY = 0;
        state.x = 0;
        state.y = 0;
        state.power = 0;
    }

    function loop(now) {
        if (!running) return;
        const dt = Math.min((now - lastFrame) / 1000, 0.033);
        lastFrame = now;
        if (playBlocked()) {
            animationId = requestAnimationFrame(loop);
            return;
        }
        update(dt, now);
        draw();
        animationId = requestAnimationFrame(loop);
    }

    function update(dt, now) {
        updatePlayer(dt);
        updateRemotePlayer(dt);
        updateBullets(dt);
        updateGrenades(dt);
        updateImpacts(dt);
        updateHud();

        player.visualX = player.x;
        player.visualY = player.y;

        if (gameMode === 'pvp' && now - lastNetworkSend > NETWORK_SEND_INTERVAL_MS) {
            sendData(playerSnapshot());
            lastNetworkSend = now;
        }
        checkRoundWinner();
    }

    function updatePlayer(dt) {
        const move = input.move;
        player.cooldown = Math.max(0, player.cooldown - dt);
        player.invuln = Math.max(0, player.invuln - dt);
        updateAbilityTimers(player, dt);
        updateReload(player, dt);
        if (gameMode === 'pvp' && (player.alive === false || player.hp <= 0 || roundOver)) {
            player.vx = 0;
            player.vy = 0;
            return;
        }

        if (player.dashTimer > 0) {
            const dashSpeed = DASH_DISTANCE / DASH_DURATION;
            player.vx = Math.cos(player.dashAngle) * dashSpeed;
            player.vy = Math.sin(player.dashAngle) * dashSpeed;
            player.aimAngle = lerpAngle(player.aimAngle, player.dashAngle, lerpFactor(18, dt));
            movePlayerWithCollision(player, player.vx * dt, player.vy * dt);
            return;
        }

        if (move.power > 0.05) {
            const speed = player.speed * Math.min(1, move.power);
            player.vx = move.x * speed;
            player.vy = move.y * speed;
            const moveAngle = Math.atan2(move.y, move.x);
            player.aimAngle = lerpAngle(player.aimAngle, moveAngle, lerpFactor(MOVE_AIM_RETURN_LERP, dt));
        } else {
            player.vx = 0;
            player.vy = 0;
        }

        if (input.aim.active && input.aim.power > 0.08) {
            player.aimAngle = Math.atan2(input.aim.y, input.aim.x);
        }

        movePlayerWithCollision(player, player.vx * dt, player.vy * dt);
    }

    function updateAbilityTimers(entity, dt) {
        entity.abilityCooldown = Math.max(0, entity.abilityCooldown - dt);
        entity.dashTimer = Math.max(0, entity.dashTimer - dt);
        entity.invisibleTimer = Math.max(0, entity.invisibleTimer - dt);
    }

    function getDashAngle() {
        if (input.move.power > 0.08) {
            return Math.atan2(input.move.y, input.move.x);
        }
        if (input.aim.active && input.aim.power > 0.08) {
            return Math.atan2(input.aim.y, input.aim.x);
        }
        return player.aimAngle;
    }

    function canLocalAct() {
        return gameMode !== 'pvp' || (roundActive && !roundOver && player.alive !== false && player.hp > 0);
    }

    function applyDamage(entity, amount) {
        let remaining = Math.max(0, Number(amount) || 0);
        if (entity.shield > 0) {
            const absorbed = Math.min(entity.shield, remaining);
            entity.shield = Math.max(0, entity.shield - absorbed);
            remaining -= absorbed;
        }
        if (remaining > 0) {
            entity.hp = Math.max(0, entity.hp - remaining);
        }
    }

    function applyLocalDamage(amount, hitId = '') {
        if (!roundActive || roundOver || player.alive === false) return false;
        if (markHitProcessed(hitId)) return false;
        applyDamage(player, amount);
        player.invisibleTimer = 0;
        if (player.hp <= 0) {
            eliminateLocalPlayer();
            return true;
        }
        sendData({
            type: 'hit',
            damage: amount,
            hp: player.hp,
            shield: player.shield,
            invisibleTimer: player.invisibleTimer,
            alive: player.alive,
            hitId
        });
        return true;
    }

    function activateDash() {
        if (!canLocalAct() || player.hp <= 0 || player.abilityCooldown > 0 || player.dashTimer > 0) return;
        const angle = getDashAngle();
        player.dashAngle = angle;
        player.dashTimer = DASH_DURATION;
        player.dashDuration = DASH_DURATION;
        player.abilityCooldown = DASH_COOLDOWN;
        player.abilityCooldownMax = DASH_COOLDOWN;
        player.aimAngle = angle;
        updateHud();
        sendData(playerSnapshot('ability', {
            ability: 'dash',
        }));
    }

    function activateInvisibility() {
        if (!canLocalAct()) return;
        if (!canUseAbility()) return;
        player.invisibleTimer = INVIS_DURATION;
        player.invisibleDuration = INVIS_DURATION;
        player.abilityCooldown = INVIS_COOLDOWN;
        player.abilityCooldownMax = INVIS_COOLDOWN;
        updateHud();
        sendData(playerSnapshot('ability', {
            ability: 'invis'
        }));
    }

    function activateOneShot() {
        if (!canLocalAct()) return;
        if (!canUseAbility() || player.oneShotArmed || player.oneShotReloadPending) return;
        player.oneShotArmed = true;
        player.oneShotReloadPending = false;
        player.maxAmmo = 1;
        player.ammo = 1;
        player.reloading = false;
        player.reloadTimer = 0;
        player.reloadProgress = 0;
        player.abilityCooldown = 0;
        player.abilityCooldownMax = ONE_SHOT_COOLDOWN;
        updateHud();
        sendData(playerSnapshot('ability', {
            ability: 'oneShot'
        }));
    }

    function activateShieldUp() {
        if (!canLocalAct()) return;
        if (!canUseAbility()) return;
        player.shield = clamp((player.shield || 0) + SHIELD_UP_AMOUNT, 0, SHIELD_MAX);
        player.maxShield = SHIELD_MAX;
        player.abilityCooldown = SHIELD_UP_COOLDOWN;
        player.abilityCooldownMax = SHIELD_UP_COOLDOWN;
        updateHud();
        sendData(playerSnapshot('ability', {
            ability: 'shieldUp'
        }));
    }

    function canUseAbility() {
        return player.hp > 0
            && player.abilityCooldown <= 0
            && player.dashTimer <= 0
            && player.invisibleTimer <= 0
            && !player.oneShotArmed
            && !player.oneShotReloadPending;
    }

    function beginAbilityDrag(event) {
        if (!canLocalAct()) return;
        if (!canUseAbility()) return;
        const ability = getAbility(player.loadout.ability);
        if (ability.id === 'dash') {
            activateDash();
            return;
        }
        if (ability.id === 'invis') {
            activateInvisibility();
            return;
        }
        if (ability.id === 'oneShot') {
            activateOneShot();
            return;
        }
        if (ability.id === 'shieldUp') {
            activateShieldUp();
            return;
        }
        if (ability.mode === 'passive') {
            return;
        }

        const pointerId = event.pointerId ?? 'mouse';
        abilityDrag = {
            pointerId,
            startX: event.clientX,
            startY: event.clientY,
            angle: player.aimAngle,
            power: 0
        };
        if (event.pointerId !== undefined) {
            abilityBtn.setPointerCapture(event.pointerId);
        }
        updateAbilityDrag(event);
    }

    function updateAbilityDrag(event) {
        const pointerId = event.pointerId ?? 'mouse';
        if (!abilityDrag || abilityDrag.pointerId !== pointerId) return;
        const aim = getGrenadeAimFromDrag(abilityDrag.startX, abilityDrag.startY, event.clientX, event.clientY);
        abilityDrag.angle = aim.angle;
        abilityDrag.power = aim.power;
        setAbilityKnobOffset(event.clientX - abilityDrag.startX, event.clientY - abilityDrag.startY);
    }

    function finishAbilityDrag(event) {
        const pointerId = event.pointerId ?? 'mouse';
        if (!abilityDrag || abilityDrag.pointerId !== pointerId) return;
        const drag = abilityDrag;
        abilityDrag = null;
        resetAbilityKnob();
        if (drag.power < 0.16 || !canUseAbility()) return;
        const target = getLiveGrenadeTarget(drag);
        throwGrenade(target.x, target.y);
    }

    function cancelAbilityDrag(event) {
        const pointerId = event.pointerId ?? 'mouse';
        if (abilityDrag && abilityDrag.pointerId === pointerId) {
            abilityDrag = null;
            resetAbilityKnob();
        }
    }

    function setAbilityKnobOffset(dx, dy) {
        const dist = Math.hypot(dx, dy);
        const limited = Math.min(dist, ABILITY_DRAG_VISUAL_RADIUS);
        const x = dist > 0 ? (dx / dist) * limited : 0;
        const y = dist > 0 ? (dy / dist) * limited : 0;
        abilityBtn.classList.add('dragging');
        abilityBtn.style.setProperty('--ability-knob-x', `${x}px`);
        abilityBtn.style.setProperty('--ability-knob-y', `${y}px`);
    }

    function resetAbilityKnob() {
        abilityBtn.classList.remove('dragging');
        abilityBtn.style.setProperty('--ability-knob-x', '0px');
        abilityBtn.style.setProperty('--ability-knob-y', '0px');
    }

    function getGrenadeAimFromDrag(startX, startY, clientX, clientY) {
        const dx = clientX - startX;
        const dy = clientY - startY;
        const dist = Math.hypot(dx, dy);
        const angle = dist > 0 ? Math.atan2(dy, dx) : player.aimAngle;
        const power = clamp(dist / 92, 0, 1);
        return { angle, power };
    }

    function getLiveGrenadeTarget(drag) {
        const angle = Number.isFinite(drag.angle) ? drag.angle : player.aimAngle;
        const power = clamp(drag.power || 0, 0, 1);
        const range = 120 + power * (GRENADE_RANGE - 120);
        return {
            x: clamp(player.x + Math.cos(angle) * range, GRENADE_RADIUS, world.width - GRENADE_RADIUS),
            y: clamp(player.y + Math.sin(angle) * range, GRENADE_RADIUS, world.height - GRENADE_RADIUS)
        };
    }

    function throwGrenade(targetX, targetY) {
        if (!canLocalAct()) return;
        const ability = getAbility(player.loadout.ability);
        if (ability.id !== 'grenade') return;
        const target = clampGrenadeTarget(player.x, player.y, targetX, targetY);
        player.abilityCooldown = ability.cooldown;
        player.abilityCooldownMax = ability.cooldown;
        const angle = Math.atan2(target.y - player.y, target.x - player.x);
        player.aimAngle = angle;
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        spawnGrenade(player.x, player.y, target.x, target.y, false, id, localPlayerId);
        updateHud();
        sendData(playerSnapshot('ability', {
            ability: 'grenade',
            id,
            targetX: target.x,
            targetY: target.y
        }));
    }

    function spawnGrenade(startX, startY, targetX, targetY, remote = false, id = '', ownerId = '') {
        const target = clampGrenadeTarget(startX, startY, targetX, targetY);
        const dx = target.x - startX;
        const dy = target.y - startY;
        const dist = Math.hypot(dx, dy) || 1;
        const arcLift = clamp(dist * 0.34, 78, 150);
        grenades.push({
            id,
            startX,
            startY,
            endX: target.x,
            endY: target.y,
            controlX: (startX + target.x) / 2,
            controlY: (startY + target.y) / 2 - arcLift,
            x: startX,
            y: startY,
            elapsed: 0,
            duration: GRENADE_FLIGHT_TIME,
            scale: 0.78,
            radius: GRENADE_RADIUS,
            damage: GRENADE_DAMAGE,
            ownerId,
            remote,
            color: remote ? colors.enemyBullet : colors.local
        });
    }

    function clampGrenadeTarget(startX, startY, targetX, targetY) {
        const dx = finiteNumber(targetX, startX) - startX;
        const dy = finiteNumber(targetY, startY) - startY;
        const dist = Math.hypot(dx, dy);
        const angle = dist > 0 ? Math.atan2(dy, dx) : player.aimAngle;
        const range = clamp(dist || 120, 120, GRENADE_RANGE);
        return {
            x: clamp(startX + Math.cos(angle) * range, GRENADE_RADIUS, world.width - GRENADE_RADIUS),
            y: clamp(startY + Math.sin(angle) * range, GRENADE_RADIUS, world.height - GRENADE_RADIUS)
        };
    }

    function restoreWeaponAmmo(entity, fill = true) {
        const weapon = getWeapon(entity.loadout.weapon);
        entity.maxAmmo = weapon.ammo;
        entity.reloadDuration = weapon.reloadDuration;
        if (fill) entity.ammo = weapon.ammo;
    }

    function usesAutoReload(entity) {
        return entity.loadout.ability === 'autoReload' && !entity.oneShotArmed && !entity.oneShotReloadPending;
    }

    function getActiveReloadDuration(entity) {
        const weapon = getWeapon(entity.loadout.weapon);
        return usesAutoReload(entity) ? weapon.reloadDuration / weapon.ammo : entity.reloadDuration;
    }

    function clearOneShot(entity, fill = false) {
        entity.oneShotArmed = false;
        entity.oneShotReloadPending = false;
        restoreWeaponAmmo(entity, fill);
    }

    function finishOneShotReload(entity) {
        clearOneShot(entity, true);
        if (entity.loadout.ability === 'oneShot') {
            entity.abilityCooldown = ONE_SHOT_COOLDOWN;
            entity.abilityCooldownMax = ONE_SHOT_COOLDOWN;
        }
    }

    function startReload(entity) {
        if (entity.reloading || entity.ammo >= entity.maxAmmo) return false;
        entity.reloading = true;
        entity.reloadTimer = 0;
        entity.reloadProgress = 0;
        return true;
    }

    function tryManualReload() {
        if (usesAutoReload(player)) return;
        if (!startReload(player)) return;
        updateHud();
        sendData(playerSnapshot());
    }

    function updateReload(entity, dt) {
        if (!entity.reloading) {
            if (entity.ammo <= 0 || (usesAutoReload(entity) && entity.ammo < entity.maxAmmo)) startReload(entity);
            return;
        }

        entity.reloadTimer += dt;
        entity.reloadProgress = clamp(entity.reloadTimer / getActiveReloadDuration(entity), 0, 1);

        if (entity.reloadProgress >= 1) {
            entity.reloadTimer = 0;
            entity.reloadProgress = 0;
            if (entity.oneShotReloadPending) {
                entity.reloading = false;
                finishOneShotReload(entity);
            } else if (usesAutoReload(entity)) {
                entity.ammo = Math.min(entity.maxAmmo, entity.ammo + 1);
                entity.reloading = entity.ammo < entity.maxAmmo;
            } else {
                entity.reloading = false;
                entity.ammo = entity.maxAmmo;
            }
        }
    }

    function updateRemotePlayer(dt) {
        if (gameMode !== 'pvp') return;
        remotePlayers.forEach(entity => {
            updateRemoteReload(entity, dt);
            updateAbilityTimers(entity, dt);

            const dx = entity.x - entity.visualX;
            const dy = entity.y - entity.visualY;
            const dist = Math.hypot(dx, dy);

            if (dist > REMOTE_SNAP_DISTANCE) {
                entity.visualX = entity.x;
                entity.visualY = entity.y;
            } else {
                const t = lerpFactor(REMOTE_POSITION_LERP, dt);
                entity.visualX = lerp(entity.visualX, entity.x, t);
                entity.visualY = lerp(entity.visualY, entity.y, t);
            }

            entity.aimAngle = lerpAngle(entity.aimAngle, entity.targetAimAngle, lerpFactor(REMOTE_AIM_LERP, dt));
        });
    }

    function updateRemoteReload(entity, dt) {
        if (!entity.reloading) return;
        entity.reloadProgress = clamp(entity.reloadProgress + dt / getActiveReloadDuration(entity), 0, 1);
        if (entity.reloadProgress >= 1) {
            entity.reloadProgress = 0;
            if (entity.oneShotReloadPending) {
                entity.reloading = false;
                finishOneShotReload(entity);
            } else if (usesAutoReload(entity)) {
                entity.ammo = Math.min(entity.maxAmmo, entity.ammo + 1);
                entity.reloading = entity.ammo < entity.maxAmmo;
            } else {
                entity.reloading = false;
                entity.ammo = entity.maxAmmo;
            }
        }
    }

    function movePlayerWithCollision(entity, dx, dy) {
        entity.x = clamp(entity.x + dx, entity.r, world.width - entity.r);
        for (const obstacle of obstacles) {
            pushCircleOutOfRect(entity, obstacle);
        }
        entity.y = clamp(entity.y + dy, entity.r, world.height - entity.r);
        for (const obstacle of obstacles) {
            pushCircleOutOfRect(entity, obstacle);
        }
    }

    function pushCircleOutOfRect(circle, rect) {
        const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
        const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
        const dx = circle.x - nearestX;
        const dy = circle.y - nearestY;
        const distSq = dx * dx + dy * dy;
        if (distSq >= circle.r * circle.r) return;

        if (distSq === 0) {
            const left = Math.abs(circle.x - rect.x);
            const right = Math.abs(rect.x + rect.w - circle.x);
            const top = Math.abs(circle.y - rect.y);
            const bottom = Math.abs(rect.y + rect.h - circle.y);
            const min = Math.min(left, right, top, bottom);
            if (min === left) circle.x = rect.x - circle.r;
            else if (min === right) circle.x = rect.x + rect.w + circle.r;
            else if (min === top) circle.y = rect.y - circle.r;
            else circle.y = rect.y + rect.h + circle.r;
            return;
        }

        const dist = Math.sqrt(distSq);
        const overlap = circle.r - dist;
        circle.x += (dx / dist) * overlap;
        circle.y += (dy / dist) * overlap;
    }

    function updateBullets(dt) {
        for (let i = bullets.length - 1; i >= 0; i--) {
            const bullet = bullets[i];
            bullet.x += bullet.vx * dt;
            bullet.y += bullet.vy * dt;
            bullet.life -= dt;

            if (bullet.life <= 0 || bullet.x < 0 || bullet.y < 0 || bullet.x > world.width || bullet.y > world.height || hitsObstacle(bullet)) {
                addImpact(bullet.x, bullet.y, bullet.color);
                bullets.splice(i, 1);
                continue;
            }

            if (gameMode === 'solo' && !bullet.remote) {
                const hitDummy = dummies.find(dummy => dummy.hp > 0 && distance(bullet, dummy) < bullet.r + dummy.r);
                if (hitDummy) {
                    hitDummy.hp = Math.max(0, hitDummy.hp - bullet.damage);
                    score += hitDummy.hp === 0 ? 5 : 1;
                    addImpact(bullet.x, bullet.y, bullet.color);
                    bullets.splice(i, 1);
                    continue;
                }
            }

            if (gameMode === 'pvp' && !bullet.remote && hitRemotePlayerWithLocalBullet(bullet)) {
                bullets.splice(i, 1);
                continue;
            }

            if (gameMode === 'pvp' && isEnemyProjectile(bullet) && distance(bullet, player) < bullet.r + player.r && player.invuln <= 0) {
                applyLocalDamage(bullet.damage, bullet.id);
                addImpact(bullet.x, bullet.y, colors.enemyBullet);
                bullets.splice(i, 1);
            }
        }
    }

    function hitRemotePlayerWithLocalBullet(bullet) {
        for (const [targetId, entity] of remotePlayers.entries()) {
            if (!targetId || targetId === localPlayerId || entity.hp <= 0 || entity.alive === false) continue;
            if (!canDamagePlayer(localPlayerId, targetId)) continue;
            const targetPoint = {
                x: finiteNumber(entity.visualX, entity.x),
                y: finiteNumber(entity.visualY, entity.y)
            };
            if (distance(bullet, targetPoint) >= bullet.r + entity.r) continue;
            const hitId = bullet.id || `bullet-${Date.now()}-${Math.random().toString(16).slice(2)}`;
            sendData({
                type: 'damage',
                targetId,
                damage: bullet.damage,
                hitId,
                sourceType: 'bullet'
            });
            addImpact(bullet.x, bullet.y, colors.bullet);
            return true;
        }
        return false;
    }

    function updateGrenades(dt) {
        for (let i = grenades.length - 1; i >= 0; i--) {
            const grenade = grenades[i];
            grenade.elapsed += dt;
            const t = clamp(grenade.elapsed / grenade.duration, 0, 1);
            const pos = getGrenadePosition(grenade, t);
            grenade.x = pos.x;
            grenade.y = pos.y;
            grenade.scale = 0.78 + Math.sin(t * Math.PI) * 0.42;

            if (t >= 1) {
                explodeGrenade(grenade);
                grenades.splice(i, 1);
            }
        }
    }

    function getGrenadePosition(grenade, t) {
        const one = 1 - t;
        return {
            x: one * one * grenade.startX + 2 * one * t * grenade.controlX + t * t * grenade.endX,
            y: one * one * grenade.startY + 2 * one * t * grenade.controlY + t * t * grenade.endY
        };
    }

    function explodeGrenade(grenade) {
        addImpact(grenade.endX, grenade.endY, grenade.color, grenade.radius, 0.36, 7);

        if (gameMode === 'solo' && !grenade.remote) {
            for (const dummy of dummies) {
                if (dummy.hp > 0 && Math.hypot(dummy.x - grenade.endX, dummy.y - grenade.endY) <= grenade.radius + dummy.r) {
                    dummy.hp = Math.max(0, dummy.hp - grenade.damage);
                    score += dummy.hp === 0 ? 5 : 1;
                }
            }
        }

        if (gameMode === 'pvp' && !grenade.remote) {
            hitRemotePlayersWithLocalGrenade(grenade);
        }

        if (gameMode === 'pvp' && isEnemyProjectile(grenade) && player.invuln <= 0 && Math.hypot(player.x - grenade.endX, player.y - grenade.endY) <= grenade.radius + player.r) {
            applyLocalDamage(grenade.damage, `${grenade.id || 'grenade'}-${localPlayerId}`);
            player.invuln = 0.45;
        }
    }

    function hitRemotePlayersWithLocalGrenade(grenade) {
        for (const [targetId, entity] of remotePlayers.entries()) {
            if (!targetId || targetId === localPlayerId || entity.hp <= 0 || entity.alive === false) continue;
            if (!canDamagePlayer(localPlayerId, targetId)) continue;
            const x = finiteNumber(entity.visualX, entity.x);
            const y = finiteNumber(entity.visualY, entity.y);
            if (Math.hypot(x - grenade.endX, y - grenade.endY) > grenade.radius + entity.r) continue;
            sendData({
                type: 'damage',
                targetId,
                damage: grenade.damage,
                hitId: `${grenade.id || 'grenade'}-${targetId}`,
                sourceType: 'grenade'
            });
        }
    }

    function updateImpacts(dt) {
        for (let i = impacts.length - 1; i >= 0; i--) {
            impacts[i].life -= dt;
            if (impacts[i].life <= 0) impacts.splice(i, 1);
        }
    }

    function hitsObstacle(point) {
        return obstacles.some(rect => point.x > rect.x && point.x < rect.x + rect.w && point.y > rect.y && point.y < rect.y + rect.h);
    }

    function addImpact(x, y, color, radius = 28, life = 0.22, lineWidth = 4) {
        impacts.push({ x, y, color, radius, lineWidth, life, maxLife: life });
    }

    function fire(angle = player.aimAngle) {
        if (!canLocalAct() || player.cooldown > 0 || player.hp <= 0 || (player.reloading && !usesAutoReload(player))) return;
        if (player.ammo <= 0) {
            startReload(player);
            return;
        }

        const weapon = getWeapon(player.loadout.weapon);
        const damageMultiplier = player.oneShotArmed ? weapon.ammo : 1;
        const angles = getShotAngles(angle, weapon);
        player.aimAngle = angle;
        player.cooldown = weapon.cooldown;
        player.ammo = Math.max(0, player.ammo - 1);
        if (player.oneShotArmed) {
            player.oneShotArmed = false;
            player.oneShotReloadPending = true;
        }
        if (usesAutoReload(player)) {
            if (!player.reloading && player.ammo < player.maxAmmo) startReload(player);
        } else if (player.ammo === 0) {
            startReload(player);
        }

        const shotId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        spawnWeaponBullets(player, angle, false, shotId, angles, damageMultiplier);
        sendData(playerSnapshot('shot', {
            angle,
            angles,
            id: shotId,
            damageMultiplier
        }));
    }

    function getShotAngles(angle, weapon) {
        if (weapon.pellets <= 1) return [angle];
        const start = -weapon.spread / 2;
        const step = weapon.pellets > 1 ? weapon.spread / (weapon.pellets - 1) : 0;
        return Array.from({ length: weapon.pellets }, (_, index) => angle + start + step * index);
    }

    function spawnWeaponBullets(owner, angle, remote = false, id = '', angles = null, damageMultiplier = 1) {
        const weapon = getWeapon(owner.loadout.weapon);
        const shotAngles = Array.isArray(angles) && angles.length ? angles.map(value => finiteNumber(value, angle)) : getShotAngles(angle, weapon);
        shotAngles.forEach((shotAngle, index) => {
            spawnBullet(owner, shotAngle, remote, `${id}-${index}`, weapon, damageMultiplier);
        });
    }

    function spawnBullet(owner, angle, remote = false, id = '', weapon = getWeapon(owner.loadout.weapon), damageMultiplier = 1) {
        const muzzle = owner.r + 15;
        const speed = weapon.bulletSpeed;
        const originX = remote ? owner.visualX : owner.x;
        const originY = remote ? owner.visualY : owner.y;
        bullets.push({
            id,
            x: originX + Math.cos(angle) * muzzle,
            y: originY + Math.sin(angle) * muzzle,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            angle,
            r: 7,
            life: weapon.bulletLife,
            damage: weapon.damage * Math.max(1, damageMultiplier),
            weapon: weapon.id,
            ownerId: owner.playerId || (owner.id === 'local' ? localPlayerId : owner.id),
            remote,
            color: remote ? colors.enemyBullet : colors.bullet
        });
    }

    function updateHud() {
        const healthPct = clamp(player.hp / player.maxHp, 0, 1);
        const ability = getAbility(player.loadout.ability);
        const shield = Math.ceil(player.shield || 0);
        healthLabel.textContent = shield > 0 ? `${Math.ceil(player.hp)}+${shield}` : Math.ceil(player.hp).toString();
        hudHealthFill.style.width = `${healthPct * 100}%`;
        if (hudShieldFill) {
            hudShieldFill.style.width = `${clamp((player.shield || 0) / player.maxShield, 0, 1) * 100}%`;
        }
        reloadBtn.disabled = usesAutoReload(player) || player.ammo >= player.maxAmmo || player.reloading;
        const abilityActive = ability.id === 'invis' && player.invisibleTimer > 0;
        const abilityPassive = ability.mode === 'passive';
        const abilityLocked = abilityPassive || abilityActive || player.abilityCooldown > 0 || player.oneShotArmed || player.oneShotReloadPending;
        const eliminated = gameMode === 'pvp' && (player.alive === false || player.hp <= 0 || roundOver);
        reloadBtn.disabled = reloadBtn.disabled || eliminated;
        abilityBtn.disabled = abilityLocked || player.hp <= 0 || eliminated;
        abilityCooldown.textContent = abilityActive
            ? Math.ceil(player.invisibleTimer).toString()
            : player.abilityCooldown > 0
            ? Math.ceil(player.abilityCooldown).toString()
            : '';
        abilityBtn.classList.toggle('active-timer', abilityActive);
        abilityBtn.classList.toggle('passive', abilityPassive);
        abilityBtn.classList.toggle('drag-ready', ability.mode === 'drag' && !abilityLocked);
        abilityBtn.setAttribute('aria-label', abilityPassive ? `${ability.name} passive` : abilityLocked ? `${ability.name} unavailable` : ability.mode === 'drag' ? `${ability.name}. Drag to throw.` : ability.name);
    }

    function draw() {
        const camera = getCamera();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(devicePixelRatio * camera.zoom, devicePixelRatio * camera.zoom);
        ctx.translate(-camera.x, -camera.y);

        drawArena(camera);
        drawDummies();
        remotePlayers.forEach(entity => drawPlayer(entity, true));
        drawPlayer(player, false);
        drawBullets();
        drawGrenades();
        drawImpacts();
        drawAimGuide(camera);
        drawAbilityGuide();

        ctx.restore();
    }

    function getCamera() {
        const zoom = getCameraZoom();
        const viewW = canvas.clientWidth / zoom;
        const viewH = canvas.clientHeight / zoom;
        return {
            x: clamp(player.x - viewW / 2, 0, Math.max(0, world.width - viewW)),
            y: clamp(player.y - viewH / 2, 0, Math.max(0, world.height - viewH)),
            w: viewW,
            h: viewH,
            zoom
        };
    }

    function getCameraZoom() {
        if (gameMode === 'pvp' && (player.alive === false || player.hp <= 0 || roundOver)) {
            return Math.max(0.1, Math.min(canvas.clientWidth / world.width, canvas.clientHeight / world.height) * 0.96);
        }
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const landscapePhone = window.innerWidth > window.innerHeight && window.innerHeight <= 540;
        return coarsePointer || landscapePhone ? MOBILE_CAMERA_ZOOM : 1;
    }

    function drawArena(camera) {
        ctx.fillStyle = colors.floor;
        ctx.fillRect(0, 0, world.width, world.height);

        ctx.strokeStyle = colors.grid;
        ctx.lineWidth = 1;
        const grid = 80;
        const startX = Math.floor(camera.x / grid) * grid;
        const startY = Math.floor(camera.y / grid) * grid;
        for (let x = startX; x < camera.x + camera.w + grid; x += grid) {
            ctx.beginPath();
            ctx.moveTo(x, camera.y - grid);
            ctx.lineTo(x, camera.y + camera.h + grid);
            ctx.stroke();
        }
        for (let y = startY; y < camera.y + camera.h + grid; y += grid) {
            ctx.beginPath();
            ctx.moveTo(camera.x - grid, y);
            ctx.lineTo(camera.x + camera.w + grid, y);
            ctx.stroke();
        }

        ctx.fillStyle = colors.wall;
        ctx.strokeStyle = colors.wallEdge;
        ctx.lineWidth = 5;
        for (const obstacle of obstacles) {
            roundRect(ctx, obstacle.x, obstacle.y, obstacle.w, obstacle.h, 8);
            ctx.fill();
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(255, 250, 240, 0.26)';
        ctx.lineWidth = 8;
        ctx.strokeRect(4, 4, world.width - 8, world.height - 8);
    }

    function drawDummies() {
        if (gameMode !== 'solo') return;
        const sprite = loadSprite(getComboSpritePath(selectedLoadout, 'bad'));
        for (const dummy of dummies) {
            if (dummy.hp <= 0) continue;
            ctx.fillStyle = '#ff8f70';
            ctx.strokeStyle = '#11141d';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(dummy.x, dummy.y, dummy.r, 0, Math.PI * 2);
            if (spriteReady(sprite)) {
                ctx.save();
                ctx.translate(dummy.x, dummy.y);
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(sprite, -PLAYER_SPRITE_SIZE / 2, -PLAYER_SPRITE_SIZE / 2, PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE);
                ctx.restore();
            } else {
                ctx.fill();
                ctx.stroke();
            }
            drawBar(dummy.x - 34, dummy.y - 52, 68, 8, dummy.hp / dummy.maxHp, '#ff4f5e');
        }
    }

    function drawPlayer(entity, isRemote) {
        if (isRemote && gameMode !== 'pvp') return;
        if (entity.hp <= 0) return;
        if (isRemote && entity.invisibleTimer > 0) return;
        const flicker = entity.invuln > 0 && Math.floor(entity.invuln * 18) % 2 === 0;
        if (flicker) return;

        ctx.save();
        const drawX = isRemote ? entity.visualX : entity.x;
        const drawY = isRemote ? entity.visualY : entity.y;
        ctx.translate(drawX, drawY);
        ctx.rotate(entity.aimAngle - Math.PI / 2);
        if (!isRemote && entity.invisibleTimer > 0) {
            ctx.globalAlpha = 0.38;
        }

        const team = gameMode === 'pvp' && getPlayerTeam(entity.playerId || localPlayerId) !== getPlayerTeam(localPlayerId) ? 'bad' : 'good';
        const sprite = loadSprite(getPlayerSpritePath(entity, team));
        if (spriteReady(sprite)) {
            ctx.drawImage(sprite, -PLAYER_SPRITE_SIZE / 2, -PLAYER_SPRITE_SIZE / 2, PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE);
        } else {
            ctx.rotate(Math.PI / 2);
            ctx.fillStyle = entity.color;
            ctx.strokeStyle = '#080a10';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(0, 0, entity.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fffaf0';
            roundRect(ctx, 8, -7, 32, 14, 5);
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();

        drawHealthBar(drawX - 32, drawY - 48, 64, 8, entity);
        drawAmmoBar(drawX - 32, drawY - 36, 64, 7, entity);
        drawNameTag(drawX, drawY - 62, entity, isRemote);
    }

    function drawNameTag(x, y, entity, isRemote) {
        const label = isRemote ? entity.name || 'Player' : playerName;
        if (!label) return;
        ctx.save();
        ctx.font = '800 13px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const width = Math.min(92, ctx.measureText(label).width + 16);
        ctx.fillStyle = 'rgba(5, 7, 11, 0.62)';
        roundRect(ctx, x - width / 2, y - 9, width, 18, 7);
        ctx.fill();
        ctx.fillStyle = getPlayerTeam(entity.playerId || localPlayerId) === 0 ? '#b7ffd2' : '#c9d8ff';
        ctx.fillText(label.slice(0, 14), x, y);
        ctx.restore();
    }

    function getPlayerSpritePath(entity, team) {
        if (entity.dashTimer > 0) {
            const duration = entity.dashDuration || DASH_DURATION;
            const progress = clamp(1 - entity.dashTimer / duration, 0, 0.999);
            const frame = Math.floor(progress * 3) + 1;
            return getDashSpritePath(entity.loadout, team, frame);
        }
        return getComboSpritePath(entity.loadout, team);
    }

    function drawBullets() {
        for (const bullet of bullets) {
            const sprite = loadSprite(getBulletSpritePath(bullet.remote ? 'bad' : 'good'));
            if (spriteReady(sprite)) {
                ctx.save();
                ctx.translate(bullet.x, bullet.y);
                ctx.rotate(bullet.angle - Math.PI / 2);
                ctx.drawImage(sprite, -BULLET_SPRITE_SIZE / 2, -BULLET_SPRITE_SIZE / 2, BULLET_SPRITE_SIZE, BULLET_SPRITE_SIZE);
                ctx.restore();
            } else {
                ctx.fillStyle = bullet.color;
                ctx.shadowColor = bullet.color;
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
    }

    function drawGrenades() {
        for (const grenade of grenades) {
            const sprite = loadSprite(`assets/weapons/grenade/${grenade.remote ? 'bad' : 'good'}.png`);
            ctx.save();
            ctx.translate(grenade.x, grenade.y);
            const angle = Math.atan2(grenade.endY - grenade.startY, grenade.endX - grenade.startX);
            ctx.rotate(angle - Math.PI / 2);
            const size = BULLET_SPRITE_SIZE * 0.9 * grenade.scale;
            if (spriteReady(sprite)) {
                ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
            } else {
                ctx.fillStyle = grenade.color;
                ctx.beginPath();
                ctx.arc(0, 0, 14 * grenade.scale, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function drawAbilityGuide() {
        if (!abilityDrag || abilityDrag.power <= 0.05) return;
        const startX = player.x;
        const startY = player.y;
        const target = getLiveGrenadeTarget(abilityDrag);
        const endX = target.x;
        const endY = target.y;
        const dist = Math.hypot(endX - startX, endY - startY);
        const controlX = (startX + endX) / 2;
        const controlY = (startY + endY) / 2 - clamp(dist * 0.34, 78, 150);

        ctx.save();
        ctx.strokeStyle = 'rgba(57, 200, 111, 0.84)';
        ctx.lineWidth = 5;
        ctx.setLineDash([12, 9]);
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = 'rgba(57, 200, 111, 0.34)';
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(endX, endY, GRENADE_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    function spriteReady(sprite) {
        return sprite.complete && sprite.naturalWidth > 0;
    }

    function drawImpacts() {
        for (const impact of impacts) {
            const t = impact.life / impact.maxLife;
            ctx.strokeStyle = impact.color;
            ctx.globalAlpha = t;
            ctx.lineWidth = impact.lineWidth || 4;
            ctx.beginPath();
            ctx.arc(impact.x, impact.y, (1 - t) * (impact.radius || 28), 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    function drawAimGuide(camera) {
        if (!input.aim.active || input.aim.power <= 0.08) return;
        const len = 160 + input.aim.power * 180;
        const angle = Math.atan2(input.aim.y, input.aim.x);
        ctx.strokeStyle = 'rgba(255, 200, 87, 0.82)';
        ctx.lineWidth = 5;
        ctx.setLineDash([14, 10]);
        ctx.beginPath();
        ctx.moveTo(player.x + Math.cos(angle) * 38, player.y + Math.sin(angle) * 38);
        ctx.lineTo(player.x + Math.cos(angle) * len, player.y + Math.sin(angle) * len);
        ctx.stroke();
        ctx.setLineDash([]);

        const screenX = camera.x + (input.aim.originX + input.aim.x * 78) / camera.zoom;
        const screenY = camera.y + (input.aim.originY + input.aim.y * 78) / camera.zoom;
        ctx.fillStyle = 'rgba(255, 200, 87, 0.9)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBar(x, y, width, height, pct, fill) {
        ctx.fillStyle = 'rgba(5, 7, 11, 0.72)';
        roundRect(ctx, x, y, width, height, height / 2);
        ctx.fill();
        ctx.fillStyle = fill;
        roundRect(ctx, x, y, width * clamp(pct, 0, 1), height, height / 2);
        ctx.fill();
    }

    function drawHealthBar(x, y, width, height, entity) {
        if (entity.shield > 0) {
            drawBar(x, y - height + 1, width, Math.max(5, height - 2), entity.shield / entity.maxShield, '#4db8ff');
        }
        drawBar(x, y, width, height, entity.hp / entity.maxHp, '#ff3448');
    }

    function drawAmmoBar(x, y, width, height, entity) {
        ctx.save();
        const segmentReload = usesAutoReload(entity);

        if (entity.reloading) {
            ctx.fillStyle = 'rgba(5, 7, 11, 0.72)';
            roundRect(ctx, x, y, width, height, height / 2);
            ctx.fill();
            ctx.fillStyle = '#ffc857';
            const fillPct = segmentReload
                ? clamp((entity.ammo + entity.reloadProgress) / entity.maxAmmo, 0, 1)
                : clamp(entity.reloadProgress, 0, 1);
            roundRect(ctx, x, y, width * fillPct, height, height / 2);
            ctx.fill();
            if (segmentReload) drawAmmoDividers(x, y, width, height, entity.maxAmmo);
            ctx.strokeStyle = 'rgba(255, 250, 240, 0.54)';
            ctx.lineWidth = 1.4;
            roundRect(ctx, x, y, width, height, height / 2);
            ctx.stroke();
            ctx.restore();
            return;
        }

        ctx.fillStyle = 'rgba(5, 7, 11, 0.72)';
        roundRect(ctx, x, y, width, height, height / 2);
        ctx.fill();
        ctx.fillStyle = '#ffc857';
        roundRect(ctx, x, y, width * clamp(entity.ammo / entity.maxAmmo, 0, 1), height, height / 2);
        ctx.fill();
        drawAmmoDividers(x, y, width, height, entity.maxAmmo);
        ctx.strokeStyle = 'rgba(255, 250, 240, 0.48)';
        ctx.lineWidth = 1;
        roundRect(ctx, x, y, width, height, height / 2);
        ctx.stroke();

        ctx.restore();
    }

    function drawAmmoDividers(x, y, width, height, segments) {
        ctx.save();
        ctx.beginPath();
        roundRect(ctx, x, y, width, height, height / 2);
        ctx.clip();
        ctx.strokeStyle = 'rgba(5, 7, 11, 0.76)';
        ctx.lineWidth = 1.4;
        for (let i = 1; i < segments; i++) {
            const sx = x + (width / segments) * i;
            ctx.beginPath();
            ctx.moveTo(sx, y);
            ctx.lineTo(sx, y + height);
            ctx.stroke();
        }
        ctx.restore();
    }

    function roundRect(context, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        context.beginPath();
        context.moveTo(x + r, y);
        context.arcTo(x + width, y, x + width, y + height, r);
        context.arcTo(x + width, y + height, x, y + height, r);
        context.arcTo(x, y + height, x, y, r);
        context.arcTo(x, y, x + width, y, r);
        context.closePath();
    }

    function bindJoystick(zone, stick, state, options = {}) {
        zone.addEventListener('pointerdown', event => {
            event.preventDefault();
            state.pointerId = event.pointerId;
            state.active = true;
            state.originX = event.clientX;
            state.originY = event.clientY;
            zone.setPointerCapture(event.pointerId);
            moveStickBase(stick, event.clientX, event.clientY);
            updateJoystickFromEvent(event, stick, state);
        });

        zone.addEventListener('pointermove', event => {
            if (state.pointerId !== event.pointerId) return;
            event.preventDefault();
            updateJoystickFromEvent(event, stick, state);
        });

        zone.addEventListener('pointerup', event => finishPointer(event, stick, state, options));
        zone.addEventListener('pointercancel', event => finishPointer(event, stick, state, options));
    }

    function finishPointer(event, stick, state, options) {
        if (state.pointerId !== event.pointerId) return;
        event.preventDefault();
        const hadAim = state.power > 0.12;
        const angle = hadAim ? Math.atan2(state.y, state.x) : player.aimAngle;
        if (options.fireOnRelease) fire(angle);
        state.pointerId = null;
        state.active = false;
        state.x = 0;
        state.y = 0;
        state.power = 0;
        stick.style.left = '50%';
        stick.style.top = '50%';
        updateStick(stick, 0, 0);
    }

    function updateJoystickFromEvent(event, stick, state) {
        const max = 58;
        const dx = event.clientX - state.originX;
        const dy = event.clientY - state.originY;
        const dist = Math.hypot(dx, dy);
        const limited = Math.min(dist, max);
        const nx = dist > 0 ? dx / dist : 0;
        const ny = dist > 0 ? dy / dist : 0;
        state.x = nx;
        state.y = ny;
        state.power = limited / max;
        updateStick(stick, nx * limited, ny * limited);
    }

    function moveStickBase(stick, x, y) {
        const parent = stick.parentElement.getBoundingClientRect();
        stick.style.left = `${x - parent.left}px`;
        stick.style.top = `${y - parent.top}px`;
    }

    function updateStick(stick, x, y) {
        const knob = stick.querySelector('.stick-knob');
        knob.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));
        if (canvas.width !== width) canvas.width = width;
        if (canvas.height !== height) canvas.height = height;
    }

    function scheduleViewportResize() {
        clearTimeout(resizeTimer);
        resizeCanvas();
        updateAccessGates();
        requestAnimationFrame(resizeCanvas);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
            updateAccessGates();
            resetInput();
        }, 180);
        setTimeout(() => {
            resizeCanvas();
            updateAccessGates();
        }, 420);
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function finiteNumber(value, fallback) {
        const number = Number(value);
        return Number.isFinite(number) ? number : fallback;
    }

    function lerp(from, to, t) {
        return from + (to - from) * t;
    }

    function lerpFactor(speed, dt) {
        return 1 - Math.exp(-speed * dt);
    }

    function lerpAngle(from, to, t) {
        const delta = Math.atan2(Math.sin(to - from), Math.cos(to - from));
        return from + delta * t;
    }

    function distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }

    window.__arenaDebug = {
        getState() {
            return {
                mode: gameMode,
                role: networkRole,
                player: {
                    x: player.x,
                    y: player.y,
                    hp: player.hp,
                    shield: player.shield,
                    aimAngle: player.aimAngle,
                    ammo: player.ammo,
                    maxAmmo: player.maxAmmo,
                    reloading: player.reloading,
                    reloadProgress: player.reloadProgress,
                    reloadDuration: getActiveReloadDuration(player),
                    abilityCooldown: player.abilityCooldown,
                    dashTimer: player.dashTimer,
                    dashAngle: player.dashAngle,
                    invisibleTimer: player.invisibleTimer,
                    oneShotArmed: player.oneShotArmed,
                    oneShotReloadPending: player.oneShotReloadPending,
                    ability: player.loadout.ability,
                    loadout: player.loadout
                },
                remotes: Array.from(remotePlayers.entries()).map(([id, entity]) => ({
                    id,
                    x: entity.visualX,
                    y: entity.visualY,
                    targetX: entity.x,
                    targetY: entity.y,
                    hp: entity.hp,
                    shield: entity.shield,
                    aimAngle: entity.aimAngle,
                    ammo: entity.ammo,
                    maxAmmo: entity.maxAmmo,
                    reloading: entity.reloading,
                    reloadProgress: entity.reloadProgress,
                    reloadDuration: getActiveReloadDuration(entity),
                    abilityCooldown: entity.abilityCooldown,
                    dashTimer: entity.dashTimer,
                    dashAngle: entity.dashAngle,
                    invisibleTimer: entity.invisibleTimer,
                    oneShotArmed: entity.oneShotArmed,
                    oneShotReloadPending: entity.oneShotReloadPending,
                    ability: entity.loadout.ability,
                    loadout: entity.loadout
                })),
                roster: roomPlayers,
                hostId: hostPlayerId,
                selectedLoadout,
                bullets: bullets.length,
                grenades: grenades.length,
                move: { ...input.move },
                aim: { ...input.aim },
                connected: Boolean(conn && conn.open),
                blocked: {
                    install: installBlocked,
                    orientation: orientationBlocked,
                    standalone: isStandaloneApp()
                },
                viewport: {
                    canvasWidth: canvas.width,
                    canvasHeight: canvas.height,
                    clientWidth: canvas.clientWidth,
                    clientHeight: canvas.clientHeight,
                    cameraZoom: getCameraZoom()
                }
            };
        }
    };

    buildBtn.addEventListener('click', () => {
        draftLoadout = { ...selectedLoadout };
        builderStep = 'character';
        updateBuilderUI();
        showScreen('build');
    });

    backFromBuildBtn.addEventListener('click', () => {
        draftLoadout = { ...selectedLoadout };
        showScreen('start');
    });

    saveLoadoutBtn.addEventListener('click', saveSelectedLoadout);
    builderTabButtons.forEach(button => {
        button.addEventListener('click', () => setBuilderStep(button.dataset.builderStep));
    });
    builderStepBackBtn.addEventListener('click', () => {
        setBuilderStep(builderStep === 'ability' ? 'weapon' : 'character');
    });
    builderStepNextBtn.addEventListener('click', () => {
        setBuilderStep(builderStep === 'weapon' ? 'ability' : 'weapon');
    });
    labPrevChoiceBtn.addEventListener('click', () => cycleBuilderChoice(-1));
    labNextChoiceBtn.addEventListener('click', () => cycleBuilderChoice(1));

    builderStage.addEventListener('pointerdown', event => {
        builderSwipePointer = event.pointerId;
        builderSwipeStartX = event.clientX;
        builderSwipeStartY = event.clientY;
        builderStage.setPointerCapture(event.pointerId);
    });

    builderStage.addEventListener('pointerup', event => {
        if (builderSwipePointer !== event.pointerId) return;
        const dx = event.clientX - builderSwipeStartX;
        const dy = event.clientY - builderSwipeStartY;
        builderSwipePointer = null;
        if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.25) {
            cycleBuilderChoice(dx < 0 ? 1 : -1);
        }
    });

    builderStage.addEventListener('pointercancel', event => {
        if (builderSwipePointer === event.pointerId) builderSwipePointer = null;
    });

    soloBtn.addEventListener('click', () => {
        networkRole = 'solo';
        cleanupPeer();
        startGame('solo');
    });

    startConnectBtn.addEventListener('click', () => {
        setPlayerName();
        updateQuickJoinUI();
        updateLobbyUI();
        showScreen('connect');
        roomCodeInput.focus();
    });

    settingsBtn.addEventListener('click', () => {
        setPlayerName();
        updateSettingsUI();
        showScreen('settings');
        settingsBackBtn.focus({ preventScroll: true });
    });

    settingsBackBtn.addEventListener('click', () => {
        showScreen('start');
    });

    musicToggleBtn.addEventListener('click', () => toggleMenuSetting('music'));
    soundToggleBtn.addEventListener('click', () => toggleMenuSetting('sounds'));

    customizeLayoutBtn.addEventListener('click', () => {
        showAlert('Control layout editor coming soon.');
    });

    redeemCodeInput.addEventListener('input', () => {
        redeemCodeInput.value = redeemCodeInput.value.replace(/[^a-z0-9-]/gi, '').toUpperCase().slice(0, 16);
    });

    redeemCodeInput.addEventListener('keydown', event => {
        if (event.key !== 'Enter') return;
        const code = redeemCodeInput.value.trim();
        showAlert(code ? `Code ${code} saved for later.` : 'Enter a code first.');
        redeemCodeInput.blur();
    });

    backBtn.addEventListener('click', () => {
        cleanupPeer();
        resetConnectionUI();
        showScreen('start');
    });

    hostGameBtn.addEventListener('click', () => {
        const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
        roomCodeInput.value = roomCode;
        initializeHost(roomCode);
    });

    playerCountButtons.forEach(button => {
        button.addEventListener('click', () => {
            playerCountButtons.forEach(option => {
                const selected = option === button;
                option.classList.toggle('selected', selected);
                option.setAttribute('aria-pressed', selected ? 'true' : 'false');
            });
            maxPlayers = getSelectedMaxPlayers();
            updateLobbyUI();
        });
    });

    roomMaxButtons.forEach(button => {
        button.addEventListener('click', () => setRoomMaxPlayers(button.dataset.roomMax));
    });

    [waitingRoomList, gameSettingsList].forEach(list => {
        list.addEventListener('click', event => {
            const teamButton = event.target.closest('[data-team-target]');
            if (teamButton) {
                setRoomPlayerTeam(teamButton.dataset.teamTarget, teamButton.dataset.nextTeam);
                return;
            }
            const kickButton = event.target.closest('[data-kick-target]');
            if (kickButton) kickRoomPlayer(kickButton.dataset.kickTarget);
        });
    });

    manualStartBtn.addEventListener('click', () => {
        if (!isLocalHost()) return;
        startNetworkMatch();
    });

    [waitingCopyCodeBtn, gameCopyCodeBtn, settingsCopyCodeBtn].forEach(button => {
        button.addEventListener('click', copyRoomCode);
    });

    const leaveWaitingRoom = () => leaveCurrentRoom(true);
    leaveWaitingBtn.addEventListener('click', leaveWaitingRoom);
    waitingLeaveBtn.addEventListener('click', leaveWaitingRoom);

    joinGameBtn.addEventListener('click', () => {
        const roomCode = roomCodeInput.value.trim();
        if (!/^[a-z0-9]{3,16}$/i.test(roomCode)) {
            showAlert('Enter a valid room code.');
            return;
        }
        initializeJoin(roomCode);
    });

    quickJoinBtn.addEventListener('click', () => {
        const recent = loadRecentRoom();
        if (!recent) return;
        setPlayerName();
        const joinCode = recent.joinCode || recent.roomCode || recent.sessionSecret;
        initializeJoin(joinCode, { publicCode: recent.roomCode, reconnect: true });
    });

    copyCodeBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(roomCodeInput.value).then(() => {
            copyCodeBtn.textContent = 'Copied';
            copyCodeBtn.disabled = true;
            setTimeout(() => {
                copyCodeBtn.textContent = 'Copy';
                copyCodeBtn.disabled = false;
            }, 1200);
        });
    });

    roomCodeInput.addEventListener('input', () => {
        roomCodeInput.value = roomCodeInput.value.replace(/[^a-z0-9]/gi, '').slice(0, 16);
    });

    roomCodeInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') joinGameBtn.click();
    });

    gameMenuBtn.addEventListener('click', () => openGameMenu('menu'));
    closeGameMenuBtn.addEventListener('click', closeGameMenu);
    gameSettingsBtn.addEventListener('click', () => openGameMenu('settings'));
    closeGameSettingsBtn.addEventListener('click', () => openGameMenu('menu'));
    gameLeaveBtn.addEventListener('click', () => leaveCurrentRoom(false));
    confirmHostLeaveBtn.addEventListener('click', () => leaveCurrentRoom(true));
    cancelHostLeaveBtn.addEventListener('click', () => openGameMenu('menu'));
    roundActionBtn.addEventListener('click', hostAdvanceRound);
    gameMenuOverlay.addEventListener('click', event => {
        if (event.target === gameMenuOverlay) closeGameMenu();
    });
    reloadBtn.addEventListener('pointerdown', event => {
        event.preventDefault();
        tryManualReload();
    });
    reloadBtn.addEventListener('click', event => {
        event.preventDefault();
        tryManualReload();
    });
    abilityBtn.addEventListener('pointerdown', event => {
        event.preventDefault();
        beginAbilityDrag(event);
    });
    abilityBtn.addEventListener('pointermove', event => {
        if (!abilityDrag) return;
        event.preventDefault();
        updateAbilityDrag(event);
    });
    abilityBtn.addEventListener('pointerup', event => {
        event.preventDefault();
        finishAbilityDrag(event);
    });
    abilityBtn.addEventListener('pointercancel', event => {
        event.preventDefault();
        cancelAbilityDrag(event);
    });
    abilityBtn.addEventListener('mousedown', event => {
        if (abilityDrag) return;
        event.preventDefault();
        beginAbilityDrag(event);
    });
    window.addEventListener('mousemove', event => {
        if (!abilityDrag || abilityDrag.pointerId !== 'mouse') return;
        event.preventDefault();
        updateAbilityDrag(event);
    });
    window.addEventListener('mouseup', event => {
        if (!abilityDrag || abilityDrag.pointerId !== 'mouse') return;
        event.preventDefault();
        finishAbilityDrag(event);
    });
    abilityBtn.addEventListener('click', event => event.preventDefault());
    window.addEventListener('resize', scheduleViewportResize);
    window.addEventListener('orientationchange', scheduleViewportResize);
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', scheduleViewportResize);
    }
    if (window.ResizeObserver) {
        new ResizeObserver(scheduleViewportResize).observe(canvas);
    }
    window.addEventListener('beforeunload', cleanupPeer);

    bindJoystick(moveZone, moveStick, input.move);
    bindJoystick(shootZone, shootStick, input.aim, { fireOnRelease: true });

    renderBuilderOptions();
    updateLoadoutUI();
    updateBuilderUI();
    updateSettingsUI();
    updateQuickJoinUI();
    showScreen('start');
    updateAccessGates();
});
