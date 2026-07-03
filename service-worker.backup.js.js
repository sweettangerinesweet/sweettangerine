// ===============================
// SWEET TANGERINE
// SERVICE WORKER
// ===============================

const CACHE_NAME = "sweet-tangerine-v1";

const ASSETS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style-v3.css",

    "./js/app.js"

];

// ===============================
// INSTALL
// ===============================

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())

    );

});

// ===============================
// ACTIVATE
// ===============================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if(key !== CACHE_NAME){

                        return caches.delete(key);

                    }

                })

            );

        })

        .then(() => self.clients.claim())

    );

});

// ===============================
// FETCH
// ===============================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});