const {injectManifest} = require('workbox-build');

const env = process.argv[2] || 'prod';
let config;

switch (env) {
  case 'dev':
    config = require('./workbox-config-dev');
    break;
  default:
    config = require('./workbox-config-prod');
}

console.log(config);

injectManifest(config).then(({ count, size }) => {
  console.log(`precaches ${count} assets totaling ${size} bytes.`);
});
