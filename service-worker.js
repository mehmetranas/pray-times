// Define the cache name.
const cacheName = 'v1';

// List of files to cache.
const filesToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/manifest.json',
    '/icon.png',
    '/reload.png',
    '/service-worker.js',
    '/utils.js',
    '/render.js',
    '/service.js',
    '/style.css'
];

// Event listener for installing the service worker.
self.addEventListener('install', async (event) => {
    const cache = await caches.open(cacheName)
    event.waitUntil(cache.addAll(filesToCache));
});

// Event listener for fetching requests.
self.addEventListener('fetch', async (event) => {
    const response = await caches.match(event.request)
    event.respondWith(response || fetch(event.request));
});
