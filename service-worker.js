if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => {
            console.log('Service Worker registered.');
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

// Define the cache name.
const cacheName = 'prayer-times-cache';

// List of files to cache.
const filesToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/manifest.json',
    '/icon.png', // Add your app icon.
];

// Event listener for installing the service worker.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(filesToCache);
            })
    );
});

// Event listener for fetching requests.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
