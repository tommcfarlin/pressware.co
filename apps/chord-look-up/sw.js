// Chord Look Up service worker: precache the app, then serve from cache and refresh in the background.
// Bump CACHE to force every device to drop old files.
const CACHE='chord-look-up-v1';
const ASSETS=[
  './','./index.html','./manifest.webmanifest',
  './icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'
];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET') return;
  if(new URL(req.url).origin!==location.origin) return;
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    let hit=await cache.match(req,{ignoreSearch:true});
    if(!hit && req.mode==='navigate') hit=await cache.match('./index.html');
    const refresh=fetch(req).then(res=>{
      if(res&&res.ok) cache.put(req,res.clone());
      return res;
    }).catch(()=>null);
    if(hit){ e.waitUntil(refresh); return hit; }
    return (await refresh)||Response.error();
  })());
});
