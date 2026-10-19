const C='reader-v21',CDN='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','logo.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'}))));for(const u of ['lib/pdf.min.js','lib/pdf.worker.min.js',CDN+'pdf.min.js',CDN+'pdf.worker.min.js'])try{await c.add(u)}catch(_){}}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
const pg=r.mode==='navigate'||/(^|\/)(index\.html)?$/.test(new URL(r.url).pathname);
if(pg){e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));return}
e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{if(res.ok&&(res.type==='basic'||r.url.startsWith(CDN))){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>Response.error())))});
