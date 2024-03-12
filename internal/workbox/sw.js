// This code executes in its own worker or thread
// scope: '/'

// import { registerRoute, Route, setDefaultHandler } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate, NetworkOnly, NetworkFirst } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// // import {offlineFallback} from 'workbox-recipes'; 
// import { warmStrategyCache } from 'workbox-recipes';
// import { matchPrecache, precacheAndRoute, precaching } from 'workbox-precaching';
// // import {BackgroundSyncPlugin} from 'workbox-background-sync'; // queue up failed requests and retry them when future sync events fire
// import { cacheNames, setCacheNameDetails } from 'workbox-core';

self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');
const { registerRoute, Route, setDefaultHandler, setCatchHandler } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate, NetworkOnly, NetworkFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { warmStrategyCache } = workbox.recipes;
const { matchPrecache, precacheAndRoute, precaching } = workbox.precaching;
const { cacheNames, setCacheNameDetails } = workbox.core;


const SW_VERSION = 'plu-quiz-1.0.0';
setCacheNameDetails({
  prefix: SW_VERSION,
});

const SEC_30DAY = 24 * 60 * 60;

const networkTimeoutSeconds_StaleWhileRevalidate = 2;
const networkTimeoutSeconds_NetworkFirst = 2;

const CACHE_SUFFIX = cacheNames.suffix;
const PAGE_CACHE_NAME = SW_VERSION.concat('_pages_');
const IMAGE_CACHE_NAME = cacheNames.precache; //SW_VERSION.concat('_images');
const STATIC_CACHE_NAME = SW_VERSION.concat('_statics_');
const OTHER_CACHE_NAME = SW_VERSION.concat('_other_');
const PRECACHE_PAGES = ['/home', '/quiz', '/revision', '/about'];
const PRECACHE_FALBACK = ['/offline','/favicon.ico'];
const FALBACK_STRATEGY = new CacheFirst();

const BASE_URL = self.registration.scope || ""; //"https://kayouwu.github.io/plu-quiz/".split("://")[1].split('/').splice(1).join('/')
console.log("Service worker scope ",self.registration.scope);

// Optional: use the injectManifest mode of one of the Workbox
// build tools to precache a list of URLs, including fallbacks.
precacheAndRoute(self.__WB_MANIFEST);

console.log("PRECACHE_FALBACK",PRECACHE_FALBACK);
// Under the hood, this strategy calls Cache.addAll in a service worker's install event.
warmStrategyCache({ urls: PRECACHE_FALBACK, strategy: FALBACK_STRATEGY });

self.addEventListener('install', (event) => {
  // succeeds parse the service worker file
  console.log('Service worker installing: ', SW_VERSION);
  console.log("PRECACHE_PAGES",PRECACHE_PAGES);

  event.waitUntil(
    caches
    .open(cacheNames.precache)
    .then((cache) =>
      cache.addAll(PRECACHE_FALBACK.map(item=>BASE_URL.concat(item)))
    )
    .catch((err) => {
      console.log('Service worker install: cant cache file', err);
    })
  )

  event.waitUntil(
    caches
      .open(PAGE_CACHE_NAME)
      .then((cache) =>
        cache.addAll(PRECACHE_PAGES.map(item=>BASE_URL.concat(item)))
      )
      .catch((err) => {
        console.log('Service worker install: cant cache file', err);
      })
  );
  // console.log("self ",self);
});

self.addEventListener('activate', (event) => {
  // the service worker is ready to control its clients
  console.log('Service worker activated');

  // migrating databases and clearing caches
  event.waitUntil(
    caches
      .keys()
      .then((keyList) =>
        Promise.all(
          keyList.map((key) => {
            if (!(key.includes(SW_VERSION))) {
              console.log('delete cache: ', key);
              return caches.delete(key);
            }
          })
        )
      )
      .then(() => {
        // Tell the active service worker to take control of the page immediately.
        clients.claim();
        console.log('update to cache: ', SW_VERSION.concat('_').concat(CACHE_SUFFIX));
        // window.location.reload();
      })
  );
});

// Communicating between the window and the service worker scope
self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});

// The messageSkipWaiting() method in workbox-window is responsible for sending this message.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // Force the waiting service worker to become the active service worker.
    console.log('message: Service worker skipWaiting');
    self.skipWaiting();
  }
});


// Handle plu images:
const imageRoute = new Route(({ request, url }) => {
  // /_next/image?url=https%3A%2F%2Fraw.githubusercontent.com%2FkayoUwU%2Fplu-public-img%2Fmaster%2Fplu_img%2Fcabbage.webp&w=48&q=75
  return request.destination === 'image' && (url.href.includes("plu_img"));
}, new CacheFirst({
  cacheName: IMAGE_CACHE_NAME,
  plugins: [
    new ExpirationPlugin({
      maxAgeSeconds: SEC_30DAY,
    }),
  ],
  matchOptions: {
    ignoreMethod: true,
    ignoreVary: true,
    // ignoreSearch: true,
  }
}));

// Handle nextjs pages:
const webPageRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.destination === 'document';
}, new StaleWhileRevalidate({
  cacheName: PAGE_CACHE_NAME,
  networkTimeoutSeconds: networkTimeoutSeconds_StaleWhileRevalidate,
  plugins: [
    new ExpirationPlugin({
      maxEntries: 10,
    }),
    {
      handlerDidError: async () => {
        return await caches.match(FALLBACK_HTML_URL, {
          cacheName: SW_VERSION,
        }) || Response.error();
      },
    },
  ],
  matchOptions: {
    ignoreMethod: true,
    ignoreVary: true,
  }
}));

// Handle nextjs assets:
const staticAssetRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && ['script', 'style', 'font'].includes(request.destination);
}, new StaleWhileRevalidate({
  cacheName: STATIC_CACHE_NAME,
  networkTimeoutSeconds: networkTimeoutSeconds_StaleWhileRevalidate,
  plugins: [
    new ExpirationPlugin({
      maxEntries: 30,
      maxAgeSeconds: SEC_30DAY,
    })
  ],
  matchOptions: {
    ignoreMethod: true,
    ignoreVary: true,
    ignoreSearch: true,
  }
}));

// default
const defaultRoute = new Route(({ request, url, sameOrigin }) => {
  console.log("defaultRoute request", request);
  console.log("url", url);
  return sameOrigin;
}, new NetworkFirst({
  cacheName: OTHER_CACHE_NAME,
  networkTimeoutSeconds:networkTimeoutSeconds_NetworkFirst,
  plugins: [
    new ExpirationPlugin({
      maxEntries: 30,
      maxAgeSeconds: SEC_30DAY,
    })
  ],
  matchOptions: {
    ignoreSearch: true,
    ignoreMethod: true,
    ignoreVary: true,
  }
}));


// Register the new route
registerRoute(imageRoute);
registerRoute(webPageRoute);
registerRoute(staticAssetRoute);
// Use a NetworkOnly strategy to handle requests by default.
registerRoute(defaultRoute);
setDefaultHandler(NetworkOnly);
// The recipe assumes your offline fallback HTML file will be named offline.html and served from the root of your web server.
// offlineFallback();

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(async ({ request, url, sameOrigin }) => {
  console.log("setCatchHandler", url);
  // if (sameOrigin) {
    // /_next/image?url=%2Fplu_img%2Fcabbage.webp&w=640&q=75
  //   const path = url.pathname.split('?', 2);
  //   if (path.length == 2) {
  //     const query = path[1].split('=', 2);
  //     if (query.length == 2) {
  //       const image = query[1];
  //       console.log("path", path, "precaching", precaching.getCacheKeyForURL(image));
  //       if (precaching.getCacheKeyForURL(image)) {
  //         return matchPrecache(image);
  //       }
  //     }
  //   }
  // }

  // Fallback assets are precached when the service worker is installed, and are
  // served in the event of an error below. Use `event`, `request`, and `url` to
  // figure out how to respond, or use request.destination to match requests for
  // specific resource types.
  switch (request.destination) {
    case 'document':
      // FALLBACK_HTML_URL must be defined as a precached URL for this to work:
      return matchPrecache(BASE_URL.concat(FALLBACK_HTML_URL));

    case 'image':
      // FALLBACK_IMAGE_URL must be defined as a precached URL for this to work:
      return matchPrecache(BASE_URL.concat(FALLBACK_IMAGE_URL));

    default:
      // If we don't have a fallback, return an error response.
      return Response.error();
  }
});
