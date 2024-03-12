// https://developer.chrome.com/docs/workbox/reference/workbox-build/#method-injectManifest

module.exports = {
  globDirectory: './',
  globPatterns: [
    'public/**/*.{ico,webp,css}',
    'public/pluData.json',
    'public/manifest.json',
  ],
  globIgnores: [],
  swDest: 'public/sw.js',
  swSrc: './internal/workbox/sw.js',
  modifyURLPrefix: {
    'public': '',
  },
  maximumFileSizeToCacheInBytes: 9000000,
};
