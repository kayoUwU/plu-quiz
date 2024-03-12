// https://developer.chrome.com/docs/workbox/reference/workbox-build/#method-injectManifest

module.exports = {
  globDirectory: './',
  globPatterns: [
    '.next/static/chunks/**/*.{ico,webp,json,js,css}',
    '.next/static/css/**',
    'public/**/*.{ico,png,css}',
    'public/pluData.json',
    'public/manifest.json',
    //'plu-public-img/plu_img/*.webp',
  ],
  globIgnores: ['.next/static/**/_buildManifest.js', '.next/static/**/_ssgManifest.js'],
  swDest: 'public/sw.js',
  swSrc: './internal/workbox/sw.js',
  modifyURLPrefix: {
    '.next': '_next',
    'public': '',
    //'plu-public-img': '/_next/image?url='
  },
  maximumFileSizeToCacheInBytes: 9000000,
};
