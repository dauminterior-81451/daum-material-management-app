self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(clients.claim()));
self.addEventListener('fetch', event => { /* 캐시 로직 추가 가능 */ });
