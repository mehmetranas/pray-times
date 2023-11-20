// Define the cache name.
const cacheName = 'v1';

// List of files to cache.
const filesToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/icon.png',
    '/reload.png',
    '/reload.js',
    '/utils.js',
    '/render.js',
    '/service.js',
    '/style.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
