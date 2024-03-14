// https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/#type-InjectManifest
const glob = require('glob');
const { InjectManifest } = require('workbox-webpack-plugin');

const excludePublic = ['sw.js'];

module.exports = (options) => {
  const { buildId, dev } = options;
  if (!dev) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    // console.log("process.env.NEXT_PUBLIC_BASE_PATH",process.env.NEXT_PUBLIC_BASE_PATH);
    console.log("workbox-webpack buildId=",buildId);
    const swConfig = {
      dontCacheBustURLsMatching: /^\/_next\/static\/.*/i,
      include: [
        ({ asset }) => {
          console.log("asset",asset.name);
          if (asset.name.startsWith('static/')) {
            console.log('asset.name', asset.name);
            return true;
          }
          return false;
        },
        new RegExp('^.*\.(html|txt)$','i'),
      ],
      exclude: [/\/_buildManifest\.js$/i, /\/_ssgManifest\.js$/i],
      additionalManifestEntries: glob
        .sync('**/*', {
          cwd: 'public',
          nodir: true,
        })
        .filter((f) => !excludePublic.includes(f))
        .map((f) => ({
          url: basePath.concat(`/${f}`),
          revision: buildId,
        })),
      swDest: 'public/sw.js',
      swSrc: './internal/workbox/sw.js',
      modifyURLPrefix: {
        //'': basePath.concat('/_next'),
        'public': basePath.concat(''),
      },
      maximumFileSizeToCacheInBytes: 3000000,
    };
    console.log('swConfig:',swConfig);

    return new InjectManifest(swConfig);
  }
  return null;
};
