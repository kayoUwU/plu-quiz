// https://developer.chrome.com/docs/workbox/reference/workbox-build/#method-injectManifest

module.exports = {
  globDirectory: './',
  globPatterns: [
    'public/**/*.{ico,webp}',
    'public/pluData.json',
    'public/manifest.json',
    //'plu-public-img/plu_img/*.webp',
  ],
  globIgnores: [],
  swDest: 'public/sw.js',
  swSrc: './internal/workbox/sw.js',
  modifyURLPrefix: {
    'public': '',
    //'plu-public-img': '/_next/image?url='
  },
  maximumFileSizeToCacheInBytes: 9000000,
};
