
const cacheName = 'v3';

const cacheAssets = [
  // './gestion_pointagee/ajouterpointage.js',
  // './gestion_pointagee/principale.js',
  // './gestion_pointagee/listepointage.js',
  // './gestion_chauffeur/ajouterchauffeur.js',
  // './gestion_pointagee/principale.js',
  // './gestion_pointagee/listechauffeur.js',
  // './gestion_privs/ajouterprivs.js',
  // './gestion_privs/principale.js',
  // './gestion_privs/listeprivs.js',
  // './gestion_Profil/ajouterprofil.js',
  // './gestion_Profil/principale.js',
  // './gestion_Profil/listeprofil.js',

  'C:/Users/toshiba/Desktop/final/pnp/public/index.html',
  'C:/Users/toshiba/Desktop/final/pnp/public/custom-service-worker.js',
  'C:/Users/toshiba/Desktop/final/pnp/public/manifest.json',
  'C:/Users/toshiba/Desktop/final/pnp/public/final.png',  
  'C:/Users/toshiba/Desktop/final/pnp/public/icon.png',
  'C:/Users/toshiba/Desktop/final/pnp/public/icon.ico',  
  'C:/Users/toshiba/Desktop/final/pnp/src/App.js',
  'C:/Users/toshiba/Desktop/final/pnp/src/index.css',
  'C:/Users/toshiba/Desktop/final/pnp/src/index.js',
  'C:/Users/toshiba/Desktop/final/pnp/src/Navbar.js',
  'C:/Users/toshiba/Desktop/final/pnp/src/logo.png',
  'C:/Users/toshiba/Desktop/final/pnp/src/serviceWorker.js',
  'C:/Users/toshiba/Desktop/final/pnp/src/Login.js'

  
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
    //mon code ////////////////////////////////////////////
	/////////////////////////////////////////////////////
	////////////////////////////////////////////////
	///////////////////////////////////////////////
	//////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
        
       var syncStore = [];
       var token="";
       
        function fetch0()
        {


 setTimeout(function() {
  
  fetch("http://localhost:8080/api/Pointage/ajouter/tab", {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json','Authorization': 'bearer '+token
    }),
    body: JSON.stringify(syncStore)
})
    .then(function(data) {
      console.log('Request successful', data);
      console.log("sync.......")
      console.log(syncStore)
      syncStore=[];
    })
    .catch(function(error) {
      console.log("Request failed vous ete online mais l'ereur de serveur", error);
      alert("Request failed vous ete online mais l'ereur de serveur", error);
    });
}, 2000);
  
}

self.addEventListener('message', event => {
  
    if(event.data.type === 'sync') { 
 syncStore.push(event.data.data);
 token=event.data.token
  console.log(syncStore)
      }
  
})
// self.addEventListener('sync', event => {

  event.waitUntil(fetch0())
 console.log(syncStore)


  
})