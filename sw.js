const CACHE_NAME = 'lalo-ytd-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch - network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip Firebase & Gemini API calls (always network)
  if (
    event.request.url.includes('firestore.googleapis.com') ||
    event.request.url.includes('generativelanguage.googleapis.com') ||
    event.request.url.includes('firebase') ||
    event.request.url.includes('gstatic.com')
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful GET responses
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback HTML for navigation
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
