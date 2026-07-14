const CACHE_NAME = 'jungle-rumble-pwa-v13';
const CHARACTER_IDS = ['snake', 'croc', 'parrot'];
const WEAPON_IDS = ['pistol', 'rifle', 'shotgun'];
const TEAM_IDS = ['good', 'bad'];
const DASH_ASSETS = CHARACTER_IDS.flatMap(character =>
    WEAPON_IDS.flatMap(weapon =>
        TEAM_IDS.flatMap(team =>
            [1, 2, 3].map(frame => `./assets/${character}/dash/${weapon}/${team}/dash_${frame}.png`)
        )
    )
);
const APP_SHELL = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './assets/icons/favicon-32.png',
    './assets/icons/apple-touch-icon.png',
    './assets/icons/jungle-rumble-icon-192.png',
    './assets/icons/jungle-rumble-icon-512.png',
    './assets/icons/jungle-rumble-maskable-192.png',
    './assets/icons/jungle-rumble-maskable-512.png',
    './assets/buttons/dash.png',
    './assets/buttons/grenade.png',
    './assets/buttons/reload_button.png',
    './assets/buttons/attack_button.png',
    './assets/buttons/move_button.png',
    './assets/snake/snake_face.png',
    './assets/croc/croc_face.png',
    './assets/parrot/parrot_face.png',
    './assets/snake/pistol/good.png',
    './assets/snake/pistol/bad.png',
    './assets/snake/rifle/good.png',
    './assets/snake/rifle/bad.png',
    './assets/snake/shotgun/good.png',
    './assets/snake/shotgun/bad.png',
    './assets/croc/pistol/good.png',
    './assets/croc/pistol/bad.png',
    './assets/croc/rifle/good.png',
    './assets/croc/rifle/bad.png',
    './assets/croc/shotgun/good.png',
    './assets/croc/shotgun/bad.png',
    './assets/parrot/pistol/good.png',
    './assets/parrot/pistol/bad.png',
    './assets/parrot/rifle/good.png',
    './assets/parrot/rifle/bad.png',
    './assets/parrot/shotgun/good.png',
    './assets/parrot/shotgun/bad.png',
    './assets/weapons/pistol/good.png',
    './assets/weapons/rifle/good.png',
    './assets/weapons/shotgun/good.png',
    './assets/weapons/grenade/good.png',
    './assets/weapons/grenade/bad.png',
    './assets/weapons/bullet/good.png',
    './assets/weapons/bullet/bad.png',
    ...DASH_ASSETS
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    const request = url.origin === self.location.origin
        ? new Request(event.request, { cache: 'no-store' })
        : event.request;

    event.respondWith(
        fetch(request)
            .then(response => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
