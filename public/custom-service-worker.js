
const cacheName = 'v3';

const cacheAssets = [
];

// Call Install Event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
    );
  });
  
  //Call Fetch Event
  self.addEventListener('fetch', e => {
  ////////////////////////////////////////////////////  console.log('Service Worker: Fetching');
    e.respondWith(
      fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cahce
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
      );
    });
    
    self.addEventListener('install', function(event) {
      self.skipWaiting();
    });
    
    self.addEventListener('activate', function(event) {
      if (self.clients && clients.claim) {
        clients.claim();
      }
    });
    
    // self.addEventListener('sync', function(event) {
      //   console.log('firing: sync');
      //   if (event.tag == 'image-fetch') {
        //     console.log('sync event fired');
        //     event.waitUntil(fetchDogImage());
        //   }
        // });
        
        var syncStore = [];
       var token="";
       
        function fetch0()
        {

  
}

self.addEventListener('message', event => {
  
    if(event.data.type === 'sync') { 
 syncStore.push(event.data.data);
 token=event.data.token
  console.log(syncStore)
      }
  
})
self.addEventListener('sync', event => {

  event.waitUntil()
 console.log(syncStore)

  
})