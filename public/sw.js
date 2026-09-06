// Offline support (a "service worker").
//
// COPIED FROM this MDN tutorial, then edited:
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers
//
// The tutorial saves a list of files when the app is installed, then answers every
// request from the saved copy first. I kept that structure. My one change: I try
// the network first and only use the saved copy when the network fails, so that
// people get updates when they are online and still get the app when they are not.

const cacheName = "before18-v1";
const filesToCache = ["./", "./index.html", "./manifest.webmanifest"];

// 1. when the browser installs the worker, save the starting files
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(filesToCache);
    })(),
  );
  self.skipWaiting();
});

// 2. when a new version takes over, throw away old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      for (const key of keys) {
        if (key !== cacheName) await caches.delete(key);
      }
    })(),
  );
  self.clients.claim();
});

// 3. every time the app asks for a file: try the network, save what comes back,
//    and if the network is gone, answer from the saved copy
self.addEventListener("fetch", (e) => {
  const request = e.request;
  const sameSite = new URL(request.url).origin === self.location.origin;
  if (request.method !== "GET" || !sameSite) return;

  e.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(cacheName);
        cache.put(request, response.clone());
        return response;
      } catch {
        const saved = await caches.match(request);
        return saved || caches.match("./index.html");
      }
    })(),
  );
});
