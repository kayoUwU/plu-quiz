// https://developer.chrome.com/docs/workbox/reference/workbox-webpack-plugin/#type-InjectManifest
const glob = require('glob');
const { InjectManifest } = require('workbox-webpack-plugin');

const excludePublic = ['sw.js'];

module.exports = (options) => {
  const { buildId, dev } = options;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  console.log("process.env.NEXT_PUBLIC_BASE_PATH",process.env.NEXT_PUBLIC_BASE_PATH);
  console.log("buildId=",buildId, "; dev=",dev);
  if (!dev) {
    const swConfig = {
      dontCacheBustURLsMatching: /^\/_next\/static\/.*/i,
      include: [
        ({ asset }) => {
          if (asset.name.startsWith('static/')) {
            // console.log('asset.name', asset.name);
            return true;
          }
          return false;
        },
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
      maximumFileSizeToCacheInBytes: 9000000,
    };
    console.log('swConfig:',swConfig);

    return new InjectManifest(swConfig);
  }
  return null;
};
