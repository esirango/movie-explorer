const CACHE_NAME = "cozymovie-cache-v1";
const URLS_TO_CACHE = [
    "/", // صفحه اصلی
    "/index.html",
    "/styles.css",
    "/assets/icons/icon-192x192.png",
    "/assets/icons/icon-512x512.png",
    "/404.tsx",
    "/index.tsx",
];

// هنگام نصب سرویس ورکر، فایل‌ها کش می‌شوند
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(URLS_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys
                        .filter((key) => key !== CACHE_NAME)
                        .map((key) => caches.delete(key))
                )
            )
    );
    self.clients.claim();
});

// درخواست‌ها را رهگیری می‌کند و اول از کش جواب می‌دهد، در صورت نبود به شبکه می‌رود
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // پاسخ کش شده را برمی‌گرداند
                return cachedResponse;
            }
            // اگر نبود، درخواست را از شبکه می‌گیرد و کش می‌کند
            return fetch(event.request).then((networkResponse) => {
                // فقط پاسخ‌های موفق را کش کن
                if (
                    !networkResponse ||
                    networkResponse.status !== 200 ||
                    networkResponse.type !== "basic"
                ) {
                    return networkResponse;
                }

                // کش کردن پاسخ جدید
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });

                return networkResponse;
            });
        })
    );
});
