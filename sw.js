const CACHE_NAME = 'subtly-shell-v1';
const SHELL_FILES = [
  'index.html',
  'login.html',
  'player.html',
  'style.css',
  'firebase-config.js',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(SHELL_FILES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
             .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Network-first for everything, falling back to cache when offline.
// (Video playback and auth calls need the network anyway — this only
// helps the app shell load instantly and survive brief connectivity drops.)
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, copy); });
        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
