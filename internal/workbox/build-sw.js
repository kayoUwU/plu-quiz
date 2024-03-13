const {injectManifest} = require('workbox-build');

const env = process.argv[2] || 'dev';
let config;

switch (env) {
  case 'dev':
    config = require('./workbox-config-dev');
    break;
  case 'run':
    config = require('./workbox-config-run');
    break;
  default:
    config = require('./workbox-config-dev');
    break;
}

console.log(config);

injectManifest(config).then(({ count, size }) => {
  console.log(`precaches ${count} assets totaling ${size} bytes.`);
});
