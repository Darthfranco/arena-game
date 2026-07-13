const APP_VERSION = '2026.07.13.5';

document.addEventListener('DOMContentLoaded', () => {
    setupServiceWorkerUpdates();

    const screens = {
        start: document.getElementById('start-screen'),
        build: document.getElementById('build-screen'),
        connect: document.getElementById('connection-screen'),
        game: document.getElementById('game-screen')
    };
    const installScreen = document.getElementById('install-screen');
    const rotateScreen = document.getElementById('rotate-screen');

    const playerNameInput = document.getElementById('player-name-input');
    const buildBtn = document.getElementById('build-btn');
    const soloBtn = document.getElementById('solo-btn');
    const startConnectBtn = document.getElementById('start-connect-btn');
    const backBtn = document.getElementById('back-to-menu-btn');
    const backFromBuildBtn = document.getElementById('back-from-build-btn');
    const roomCodeInput = document.getElementById('room-code-input');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const hostGameBtn = document.getElementById('host-game-btn');
    const joinGameBtn = document.getElementById('join-game-btn');
    const connectionStatus = document.getElementById('connection-status');
    const alertScreen = document.getElementById('alert-screen');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const healthLabel = document.getElementById('health-label');
    const hudHealthFill = document.getElementById('hud-health-fill');
    const exitGameBtn = document.getElementById('exit-game-btn');
    const reloadBtn = document.getElementById('reload-btn');
    const moveZone = document.getElementById('move-zone');
    const shootZone = document.getElementById('shoot-zone');
    const moveStick = document.getElementById('move-stick');
    const shootStick = document.getElementById('shoot-stick');
    const menuLoadoutTitle = document.getElementById('menu-loadout-title');
    const menuLoadoutArt = document.getElementById('menu-loadout-art');
    const characterOptions = document.getElementById('character-options');
    const weaponOptions = document.getElementById('weapon-options');
    const builderCharacterStat = document.getElementById('builder-character-stat');
    const builderWeaponStat = document.getElementById('builder-weapon-stat');
    const builderComboArt = document.getElementById('builder-combo-art');
    const builderPreviewLabel = document.getElementById('builder-preview-label');
    const builderPreviewStats = document.getElementById('builder-preview-stats');
    const builderStepEyebrow = document.getElementById('builder-step-eyebrow');
    const builderStepBackBtn = document.getElementById('builder-step-back-btn');
    const builderStepNextBtn = document.getElementById('builder-step-next-btn');
    const labPrevChoiceBtn = document.getElementById('lab-prev-choice-btn');
    const labNextChoiceBtn = document.getElementById('lab-next-choice-btn');
    const builderStage = document.getElementById('builder-stage');
    const saveLoadoutBtn = document.getElementById('save-loadout-btn');

    const peerIdPrefix = 'roomtext-v1-';
    const world = { width: 1800, height: 1200 };
    const NETWORK_SEND_INTERVAL_MS = 33;
    const REMOTE_POSITION_LERP = 10;
    const REMOTE_AIM_LERP = 14;
    const REMOTE_SNAP_DISTANCE = 420;
    const MOVE_AIM_RETURN_LERP = 7;
    const PLAYER_SPRITE_SIZE = 94;
    const BULLET_SPRITE_SIZE = 68;
    const MOBILE_CAMERA_ZOOM = 0.82;
    const LOADOUT_STORAGE_KEY = 'jungle-rumble-loadout-v1';
    const DEFAULT_LOADOUT = { character: 'snake', weapon: 'pistol', ability: 'dash' };
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
            damageLabel: 'High up close',
            rateLabel: 'Fast',
            rangeLabel: 'Short',
            art: 'assets/weapons/shotgun/good.png'
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
    let playerName = 'Ranger';
    let opponentName = 'Opponent';
    let currentRoomCode = '';
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
    let selectedLoadout = normalizeLoadout(loadSavedLoadout());
    let draftLoadout = { ...selectedLoadout };
    let builderStep = 'character';
    let builderSwipeStartX = 0;
    let builderSwipeStartY = 0;
    let builderSwipePointer = null;

    const player = createPlayer('local', world.width * 0.34, world.height * 0.5, colors.local, selectedLoadout);
    const remotePlayer = createPlayer('remote', world.width * 0.66, world.height * 0.5, colors.remote, DEFAULT_LOADOUT);
    const bullets = [];
    const impacts = [];
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
        const ability = 'dash';
        return { character, weapon, ability };
    }

    function loadSavedLoadout() {
        try {
            return JSON.parse(localStorage.getItem(LOADOUT_STORAGE_KEY)) || DEFAULT_LOADOUT;
        } catch {
            return DEFAULT_LOADOUT;
        }
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

    function loadSpritesForLoadout(loadout) {
        loadSprite(getComboSpritePath(loadout, 'good'));
        loadSprite(getComboSpritePath(loadout, 'bad'));
        loadSprite(getBulletSpritePath('good'));
        loadSprite(getBulletSpritePath('bad'));
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

    function setBuilderStep(step) {
        builderStep = step === 'weapon' ? 'weapon' : 'character';
        updateBuilderUI();
    }

    function getChoiceIds() {
        return builderStep === 'weapon' ? Object.keys(WEAPONS) : Object.keys(CHARACTERS);
    }

    function getCurrentChoiceId() {
        return builderStep === 'weapon' ? draftLoadout.weapon : draftLoadout.character;
    }

    function setCurrentChoiceId(id) {
        if (builderStep === 'weapon' && WEAPONS[id]) {
            draftLoadout.weapon = id;
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
    }

    function updateBuilderUI(animate = false) {
        draftLoadout = normalizeLoadout(draftLoadout);
        characterOptions.querySelectorAll('.option-card').forEach(button => {
            button.classList.toggle('selected', button.dataset.character === draftLoadout.character);
            button.classList.toggle('peek', button.dataset.character !== draftLoadout.character);
        });
        weaponOptions.querySelectorAll('.option-card').forEach(button => {
            button.classList.toggle('selected', button.dataset.weapon === draftLoadout.weapon);
            button.classList.toggle('peek', button.dataset.weapon !== draftLoadout.weapon);
        });

        const character = getCharacter(draftLoadout.character);
        const weapon = getWeapon(draftLoadout.weapon);
        const onWeaponStep = builderStep === 'weapon';

        characterOptions.classList.toggle('hidden', onWeaponStep);
        weaponOptions.classList.toggle('hidden', !onWeaponStep);
        builderStepBackBtn.classList.toggle('hidden', !onWeaponStep);
        builderStepNextBtn.classList.toggle('hidden', onWeaponStep);
        saveLoadoutBtn.classList.toggle('hidden', !onWeaponStep);
        builderWeaponStat.classList.toggle('hidden', !onWeaponStep);
        builderStepEyebrow.textContent = onWeaponStep ? 'Step 2 of 2' : 'Step 1 of 2';
        document.querySelectorAll('.garage-progress span').forEach((dot, index) => {
            dot.classList.toggle('active', index === (onWeaponStep ? 1 : 0));
        });

        builderCharacterStat.textContent = 'Ability coming soon';
        builderWeaponStat.textContent = weaponStatText(draftLoadout.weapon);
        builderComboArt.src = getComboSpritePath(draftLoadout, 'good');
        builderPreviewLabel.textContent = onWeaponStep ? weapon.name : character.name;
        builderPreviewStats.textContent = onWeaponStep
            ? `${weapon.rangeLabel} range · ${weapon.damageLabel} damage`
            : characterStatText(draftLoadout.character);
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
        loadSpritesForLoadout(selectedLoadout);
    }

    function createPlayer(id, x, y, color, loadout = DEFAULT_LOADOUT) {
        const normalizedLoadout = normalizeLoadout(loadout);
        const character = getCharacter(normalizedLoadout.character);
        const weapon = getWeapon(normalizedLoadout.weapon);
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
            ammo: weapon.ammo,
            maxAmmo: weapon.ammo,
            reloadDuration: weapon.reloadDuration,
            reloadTimer: 0,
            reloadProgress: 0,
            reloading: false,
            cooldown: 0,
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
        if (refill) {
            entity.ammo = weapon.ammo;
            entity.reloading = false;
            entity.reloadTimer = 0;
            entity.reloadProgress = 0;
        } else {
            entity.ammo = clamp(entity.ammo, 0, weapon.ammo);
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

    function setPlayerName() {
        playerName = playerNameInput.value.trim() || 'Ranger';
        player.name = playerName;
    }

    function resetConnectionUI() {
        connectionStatus.textContent = 'Ready to connect.';
        hostGameBtn.disabled = false;
        joinGameBtn.disabled = false;
        copyCodeBtn.classList.add('hidden');
    }

    function cleanupPeer() {
        if (conn) {
            conn.close();
            conn = null;
        }
        if (peer) {
            peer.destroy();
            peer = null;
        }
    }

    function sendData(data) {
        if (conn && conn.open) {
            conn.send(data);
        }
    }

    function initializeHost(roomCode) {
        cleanupPeer();
        setPlayerName();
        currentRoomCode = roomCode;
        networkRole = 'host';
        peer = new Peer(peerIdPrefix + roomCode);
        connectionStatus.textContent = `Room code is ${roomCode}. Waiting...`;
        copyCodeBtn.classList.remove('hidden');
        hostGameBtn.disabled = true;
        joinGameBtn.disabled = true;

        peer.on('connection', newConn => {
            if (conn && conn.open) {
                newConn.close();
                return;
            }
            conn = newConn;
            setupConnectionEvents(conn);
        });

        peer.on('error', err => {
            showAlert(err.type === 'unavailable-id' ? 'Code is in use. Try another.' : `Connection error: ${err.type}`);
            resetConnectionUI();
        });
    }

    function initializeJoin(roomCode) {
        cleanupPeer();
        setPlayerName();
        currentRoomCode = roomCode;
        networkRole = 'guest';
        peer = new Peer();
        connectionStatus.textContent = `Joining room ${roomCode}...`;
        hostGameBtn.disabled = true;
        joinGameBtn.disabled = true;

        peer.on('open', () => {
            conn = peer.connect(peerIdPrefix + roomCode, { reliable: true });
            setupConnectionEvents(conn);
        });

        peer.on('error', err => {
            showAlert(err.type === 'peer-unavailable' ? 'Room not found.' : `Connection error: ${err.type}`);
            resetConnectionUI();
        });
    }

    function setupConnectionEvents(connection) {
        connection.on('data', handleData);
        connection.on('close', () => {
            if (gameMode === 'pvp') {
                showAlert('Connection lost.');
            } else {
                resetConnectionUI();
            }
        });
        connection.on('error', () => showAlert('Connection failed.'));

        const openGame = () => {
            startGame('pvp');
            sendData({
                type: 'hello',
                name: playerName,
                x: player.x,
                y: player.y,
                color: player.color,
                hp: player.hp,
                ammo: player.ammo,
                maxAmmo: player.maxAmmo,
                reloading: player.reloading,
                reloadProgress: player.reloadProgress,
                loadout: player.loadout
            });
        };

        if (connection.open) {
            openGame();
        } else {
            connection.on('open', openGame);
        }
    }

    function handleData(data) {
        if (!data || typeof data !== 'object') return;

        if (data.type === 'hello') {
            opponentName = data.name || 'Opponent';
            remotePlayer.name = opponentName;
            applyRemoteSnapshot(data, true);
            sendData({
                type: 'hello-reply',
                name: playerName,
                x: player.x,
                y: player.y,
                hp: player.hp,
                ammo: player.ammo,
                maxAmmo: player.maxAmmo,
                reloading: player.reloading,
                reloadProgress: player.reloadProgress,
                loadout: player.loadout
            });
            showAlert(`${opponentName} joined.`);
            return;
        }

        if (data.type === 'hello-reply') {
            opponentName = data.name || 'Opponent';
            remotePlayer.name = opponentName;
            applyRemoteSnapshot(data, true);
            showAlert(`${opponentName} joined.`);
            return;
        }

        if (data.type === 'state') {
            applyRemoteSnapshot(data, false);
            return;
        }

        if (data.type === 'shot') {
            if (data.loadout) {
                applyPlayerLoadout(remotePlayer, data.loadout, false);
            }
            remotePlayer.ammo = typeof data.ammo === 'number' ? data.ammo : remotePlayer.ammo;
            remotePlayer.maxAmmo = typeof data.maxAmmo === 'number' ? data.maxAmmo : remotePlayer.maxAmmo;
            remotePlayer.reloading = Boolean(data.reloading);
            remotePlayer.reloadProgress = typeof data.reloadProgress === 'number' ? clamp(data.reloadProgress, 0, 1) : remotePlayer.reloadProgress;
            spawnWeaponBullets(remotePlayer, Number(data.angle) || remotePlayer.aimAngle, true, data.id, data.angles);
            return;
        }

        if (data.type === 'hit') {
            remotePlayer.hp = typeof data.hp === 'number'
                ? data.hp
                : Math.max(0, remotePlayer.hp - (Number(data.damage) || 12));
        }
    }

    function applyRemoteSnapshot(data, snap) {
        const nextX = finiteNumber(data.x, remotePlayer.x);
        const nextY = finiteNumber(data.y, remotePlayer.y);
        const nextAimAngle = finiteNumber(data.aimAngle, remotePlayer.targetAimAngle);

        if (data.loadout) {
            applyPlayerLoadout(remotePlayer, data.loadout, false);
        }
        remotePlayer.x = nextX;
        remotePlayer.y = nextY;
        remotePlayer.targetAimAngle = nextAimAngle;
        remotePlayer.hp = typeof data.hp === 'number' ? data.hp : remotePlayer.hp;
        remotePlayer.ammo = typeof data.ammo === 'number' ? data.ammo : remotePlayer.ammo;
        remotePlayer.maxAmmo = typeof data.maxAmmo === 'number' ? data.maxAmmo : remotePlayer.maxAmmo;
        remotePlayer.reloading = Boolean(data.reloading);
        remotePlayer.reloadProgress = typeof data.reloadProgress === 'number' ? clamp(data.reloadProgress, 0, 1) : remotePlayer.reloadProgress;
        remotePlayer.alive = data.alive !== false;
        remotePlayer.lastSeen = performance.now();

        if (snap) {
            remotePlayer.visualX = nextX;
            remotePlayer.visualY = nextY;
            remotePlayer.aimAngle = nextAimAngle;
        }
    }

    function startGame(mode) {
        updateAccessGates();
        if (playBlocked()) return;
        setPlayerName();
        gameMode = mode;
        score = 0;
        resetPlayers();
        showScreen('game');
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
        cleanupPeer();
        resetConnectionUI();
        showScreen('start');
    }

    function resetPlayers() {
        const localSpawnX = networkRole === 'guest' ? world.width * 0.68 : world.width * 0.32;
        const remoteSpawnX = networkRole === 'guest' ? world.width * 0.32 : world.width * 0.68;
        Object.assign(player, createPlayer('local', localSpawnX, world.height * 0.5, colors.local, selectedLoadout), { name: playerName });
        Object.assign(remotePlayer, createPlayer('remote', remoteSpawnX, world.height * 0.5, colors.remote, DEFAULT_LOADOUT), { name: opponentName });
        bullets.length = 0;
        impacts.length = 0;
        dummies.forEach(dummy => dummy.hp = dummy.maxHp);
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
        updateImpacts(dt);
        updateHud();

        player.visualX = player.x;
        player.visualY = player.y;

        if (gameMode === 'pvp' && now - lastNetworkSend > NETWORK_SEND_INTERVAL_MS) {
            sendData({
                type: 'state',
                x: player.x,
                y: player.y,
                aimAngle: player.aimAngle,
                hp: player.hp,
                ammo: player.ammo,
                maxAmmo: player.maxAmmo,
                reloading: player.reloading,
                reloadProgress: player.reloadProgress,
                alive: player.alive,
                loadout: player.loadout
            });
            lastNetworkSend = now;
        }
    }

    function updatePlayer(dt) {
        const move = input.move;
        player.cooldown = Math.max(0, player.cooldown - dt);
        player.invuln = Math.max(0, player.invuln - dt);
        updateReload(player, dt);

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

    function startReload(entity) {
        if (entity.reloading || entity.ammo >= entity.maxAmmo) return false;
        entity.reloading = true;
        entity.reloadTimer = 0;
        entity.reloadProgress = 0;
        return true;
    }

    function tryManualReload() {
        if (!startReload(player)) return;
        updateHud();
        sendData({
            type: 'state',
            x: player.x,
            y: player.y,
            aimAngle: player.aimAngle,
            hp: player.hp,
            ammo: player.ammo,
            maxAmmo: player.maxAmmo,
            reloading: player.reloading,
            reloadProgress: player.reloadProgress,
            alive: player.alive,
            loadout: player.loadout
        });
    }

    function updateReload(entity, dt) {
        if (!entity.reloading) {
            if (entity.ammo <= 0) startReload(entity);
            return;
        }

        entity.reloadTimer += dt;
        entity.reloadProgress = clamp(entity.reloadTimer / entity.reloadDuration, 0, 1);

        if (entity.reloadProgress >= 1) {
            entity.ammo = entity.maxAmmo;
            entity.reloading = false;
            entity.reloadTimer = 0;
            entity.reloadProgress = 0;
        }
    }

    function updateRemotePlayer(dt) {
        if (gameMode !== 'pvp') return;
        updateRemoteReload(remotePlayer, dt);

        const dx = remotePlayer.x - remotePlayer.visualX;
        const dy = remotePlayer.y - remotePlayer.visualY;
        const dist = Math.hypot(dx, dy);

        if (dist > REMOTE_SNAP_DISTANCE) {
            remotePlayer.visualX = remotePlayer.x;
            remotePlayer.visualY = remotePlayer.y;
        } else {
            const t = lerpFactor(REMOTE_POSITION_LERP, dt);
            remotePlayer.visualX = lerp(remotePlayer.visualX, remotePlayer.x, t);
            remotePlayer.visualY = lerp(remotePlayer.visualY, remotePlayer.y, t);
        }

        remotePlayer.aimAngle = lerpAngle(remotePlayer.aimAngle, remotePlayer.targetAimAngle, lerpFactor(REMOTE_AIM_LERP, dt));
    }

    function updateRemoteReload(entity, dt) {
        if (!entity.reloading) return;
        entity.reloadProgress = clamp(entity.reloadProgress + dt / entity.reloadDuration, 0, 1);
        if (entity.reloadProgress >= 1) {
            entity.ammo = entity.maxAmmo;
            entity.reloading = false;
            entity.reloadProgress = 0;
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

            if (gameMode === 'pvp' && bullet.remote === true && distance(bullet, player) < bullet.r + player.r && player.invuln <= 0) {
                player.hp = Math.max(0, player.hp - bullet.damage);
                player.invuln = 0.45;
                sendData({ type: 'hit', damage: bullet.damage, hp: player.hp });
                addImpact(bullet.x, bullet.y, colors.enemyBullet);
                bullets.splice(i, 1);
                if (player.hp <= 0) respawnPlayer(player);
            }
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

    function addImpact(x, y, color) {
        impacts.push({ x, y, color, life: 0.22, maxLife: 0.22 });
    }

    function fire(angle = player.aimAngle) {
        if (player.cooldown > 0 || player.hp <= 0 || player.reloading) return;
        if (player.ammo <= 0) {
            startReload(player);
            return;
        }

        const weapon = getWeapon(player.loadout.weapon);
        const angles = getShotAngles(angle, weapon);
        player.aimAngle = angle;
        player.cooldown = weapon.cooldown;
        player.ammo = Math.max(0, player.ammo - 1);
        if (player.ammo === 0) {
            startReload(player);
        }

        const shotId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        spawnWeaponBullets(player, angle, false, shotId, angles);
        sendData({
            type: 'shot',
            angle,
            angles,
            id: shotId,
            ammo: player.ammo,
            maxAmmo: player.maxAmmo,
            reloading: player.reloading,
            reloadProgress: player.reloadProgress,
            loadout: player.loadout
        });
    }

    function getShotAngles(angle, weapon) {
        if (weapon.pellets <= 1) return [angle];
        const start = -weapon.spread / 2;
        const step = weapon.pellets > 1 ? weapon.spread / (weapon.pellets - 1) : 0;
        return Array.from({ length: weapon.pellets }, (_, index) => angle + start + step * index);
    }

    function spawnWeaponBullets(owner, angle, remote = false, id = '', angles = null) {
        const weapon = getWeapon(owner.loadout.weapon);
        const shotAngles = Array.isArray(angles) && angles.length ? angles.map(value => finiteNumber(value, angle)) : getShotAngles(angle, weapon);
        shotAngles.forEach((shotAngle, index) => {
            spawnBullet(owner, shotAngle, remote, `${id}-${index}`, weapon);
        });
    }

    function spawnBullet(owner, angle, remote = false, id = '', weapon = getWeapon(owner.loadout.weapon)) {
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
            damage: weapon.damage,
            weapon: weapon.id,
            remote,
            color: remote ? colors.enemyBullet : colors.bullet
        });
    }

    function respawnPlayer(target) {
        target.hp = target.maxHp;
        target.invuln = 1.1;
        target.x = networkRole === 'guest' ? world.width * 0.68 : world.width * 0.32;
        target.y = world.height * 0.5;
        target.visualX = target.x;
        target.visualY = target.y;
    }

    function updateHud() {
        const healthPct = clamp(player.hp / player.maxHp, 0, 1);
        healthLabel.textContent = Math.ceil(player.hp).toString();
        hudHealthFill.style.width = `${healthPct * 100}%`;
        reloadBtn.disabled = player.ammo >= player.maxAmmo || player.reloading;
    }

    function draw() {
        const camera = getCamera();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(devicePixelRatio * camera.zoom, devicePixelRatio * camera.zoom);
        ctx.translate(-camera.x, -camera.y);

        drawArena(camera);
        drawDummies();
        drawPlayer(remotePlayer, true);
        drawPlayer(player, false);
        drawBullets();
        drawImpacts();
        drawAimGuide(camera);

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
        const flicker = entity.invuln > 0 && Math.floor(entity.invuln * 18) % 2 === 0;
        if (flicker) return;

        ctx.save();
        const drawX = isRemote ? entity.visualX : entity.x;
        const drawY = isRemote ? entity.visualY : entity.y;
        ctx.translate(drawX, drawY);
        ctx.rotate(entity.aimAngle - Math.PI / 2);

        const sprite = loadSprite(getComboSpritePath(entity.loadout, isRemote ? 'bad' : 'good'));
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

        drawBar(drawX - 32, drawY - 48, 64, 8, entity.hp / entity.maxHp, '#ff3448');
        drawAmmoBar(drawX - 32, drawY - 36, 64, 7, entity);
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

    function spriteReady(sprite) {
        return sprite.complete && sprite.naturalWidth > 0;
    }

    function drawImpacts() {
        for (const impact of impacts) {
            const t = impact.life / impact.maxLife;
            ctx.strokeStyle = impact.color;
            ctx.globalAlpha = t;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(impact.x, impact.y, (1 - t) * 28, 0, Math.PI * 2);
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

    function drawAmmoBar(x, y, width, height, entity) {
        ctx.save();

        if (entity.reloading) {
            ctx.fillStyle = 'rgba(5, 7, 11, 0.72)';
            roundRect(ctx, x, y, width, height, height / 2);
            ctx.fill();
            ctx.fillStyle = '#ffc857';
            roundRect(ctx, x, y, width * clamp(entity.reloadProgress, 0, 1), height, height / 2);
            ctx.fill();
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
                    aimAngle: player.aimAngle,
                    ammo: player.ammo,
                    maxAmmo: player.maxAmmo,
                    reloading: player.reloading,
                    reloadProgress: player.reloadProgress,
                    loadout: player.loadout
                },
                remote: {
                    x: remotePlayer.visualX,
                    y: remotePlayer.visualY,
                    targetX: remotePlayer.x,
                    targetY: remotePlayer.y,
                    hp: remotePlayer.hp,
                    aimAngle: remotePlayer.aimAngle,
                    ammo: remotePlayer.ammo,
                    maxAmmo: remotePlayer.maxAmmo,
                    reloading: remotePlayer.reloading,
                    reloadProgress: remotePlayer.reloadProgress,
                    loadout: remotePlayer.loadout
                },
                selectedLoadout,
                bullets: bullets.length,
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
    builderStepBackBtn.addEventListener('click', () => setBuilderStep('character'));
    builderStepNextBtn.addEventListener('click', () => setBuilderStep('weapon'));
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
        showScreen('connect');
        roomCodeInput.focus();
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

    joinGameBtn.addEventListener('click', () => {
        const roomCode = roomCodeInput.value.trim();
        if (roomCode.length !== 6) {
            showAlert('Code must be 6 digits.');
            return;
        }
        initializeJoin(roomCode);
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
        roomCodeInput.value = roomCodeInput.value.replace(/\D/g, '').slice(0, 6);
    });

    roomCodeInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') joinGameBtn.click();
    });

    exitGameBtn.addEventListener('click', stopGame);
    reloadBtn.addEventListener('pointerdown', event => {
        event.preventDefault();
        tryManualReload();
    });
    reloadBtn.addEventListener('click', event => {
        event.preventDefault();
        tryManualReload();
    });
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
    showScreen('start');
    updateAccessGates();
});
