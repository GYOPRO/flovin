const CACHE = "flovin-v1";
const ASSETS = [
    "/", "/flovin_order.html",
    "/manifest.webmanifest"
    // 필요하면 CSS/JS/이미지도 여기에 추가
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
    caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
    );
    self.clients.claim();
});

// 네트워크 우선, 실패 시 캐시
self.addEventListener("fetch", (e) => {
const req = e.request;
    e.respondWith(
        fetch(req).then(res => {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
            return res;
        }).catch(() => caches.match(req))
    );
});
