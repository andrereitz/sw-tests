const cacheName = 'v2';
const cacheAssets = [
    'index.html',
    'about.html',
    'src/css/style.css',
    'src/js/main.js'
]

// Call install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed', e);

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
})

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated', e);

    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then( cacheNames =>{
            console.log('cache keys', cacheNames)
            return Promise.all(
                cacheNames.map(cache => {
                    console.log('mapping');

                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching', e.request);
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})