// Check if ServiceWorker is available
if(navigator.serviceWorker){
    window.addEventListener('load', function(){
        navigator.serviceWorker
        // .register('sw_cache_pages.js')
        .register('sw_cache_site.js')
            .then(function(reg){
                console.log('Service Worker: Registered');
            })
            .catch(err => console.log('Service Worker error ', err))
    })
}

console.log('main.js')