//  weak
/* eslint-disable no-console */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');

workbox.setConfig({
  debug: global.ServiceWorkerGlobalScope.origin !== "https://feedcast.io"});

var assets = global.serviceWorkerOption.assets;

var assetsToCache = [
  ...assets,
  './index.html',
];
workbox.precaching.precacheAndRoute(assetsToCache);

workbox.routing.registerRoute(
  /scripts\/(.*)\.js/,
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  /\/locales\/'/,
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  /(.*)(?:png|gif|jpg)(.*)/,
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  /(.*)(?:categories|episodes|channels)(.*)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60,
        maxEntries: 10
      })
    ]
  }),
);
