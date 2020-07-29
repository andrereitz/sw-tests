const cacheName = 'v3';

// Call install event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed', e);
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
        fetch(e.request)
            .then(res => {
                // Make a clone of response
                const resClone = res.clone()
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add Response to cache
                        cache.put(e.request, resClone);
                    });

                    return res;
            }).catch(err => caches.match(e.request).then(res => res))
    )
})