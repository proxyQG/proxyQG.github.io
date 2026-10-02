const CACHE_NAME = 'proxyqg-v2';

// Fichiers critiques à mettre en cache dès l'installation
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/styles.css',
    './css/tooltip.css',
    './js/app.js',
    './js/engines.js',
    './js/tooltip.js',
    './js/i18n.js',
    './js/template.js',
    './js/generic.js',
    './data/agent_database.js',
    './data/mindscapes.js',
    './data/agents.js',
    './assets/Icone/logo-192.png',
    './assets/Icone/logo-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    // Ne gère que les requêtes GET provenant de ton domaine pour éviter de saturer le cache avec YouTube
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});
