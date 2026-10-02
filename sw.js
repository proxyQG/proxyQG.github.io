const CACHE_NAME = 'proxyqg-v3'; // Version 3 pour forcer la mise à jour

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './css/tooltip.css',
    './js/app.js',
    './js/engines.js',
    './js/tooltip.js',
    './js/i18n.js',
    './guides/index.js',
    './guides/template.js',
    './guides/generic.js',
    './data/agent_database.js',
    './data/mindscapes.js',
    './data/agents.js',
    './assets/Icone/logo-192.png',
    './assets/Icone/logo-512.png'
];

// Installation : mise en cache résiliente (un fichier manquant ne fait plus planter le site)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            await Promise.all(
                ASSETS_TO_CACHE.map(url => 
                    cache.add(url).catch(err => console.warn(`Fichier ignoré au cache : ${url}`, err))
                )
            );
        })
    );
    self.skipWaiting();
});

// Nettoyage des anciens caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => 
            Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))
        )
    );
    self.clients.claim();
});

// Gestion des requêtes (Network First avec secours Cache)
self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            })
            .catch(async () => {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;
                // Si la page demandée n'est pas trouvée hors-ligne, renvoie l'accueil
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            })
    );
});
