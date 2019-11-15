const staticCache = 'site-static';
 const assets = [
     'index.html',
     'canvas.js',
     'app.js',

 ];
 //install event
 self.addEventListener('install', evt=> {

   //console.log('service worker installed');
   evt.waitUntil(caches.open(staticCache).then(cache=>{
         console.log('cache adding');
         cache.addAll(assets);                        
       })
     );
 });

 //activate event
 self.addEventListener('activate', evt=>{
       //console.log('service worker activated');
 });

 //fetch event
 self.addEventListener('fetch', evt=>{
           //console.log('fetch event', evt);
          evt.respondWith(
              caches.match(evt.request).then(cacheRes =>{
                  return cacheRes || fetch(evt.request);
              })
          );
 }); 