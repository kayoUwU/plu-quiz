/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const nextConfig = {
    // for github action inject
    //images: {unoptimized: true},experimental: {images: {unoptimized: true}},basePath: "",
    output: 'export',
    distDir: 'out',
};

module.exports = (phase, {defaultConfig }) => {
    console.log("phase",phase);
    console.log("defaultConfig ",defaultConfig);
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
        }
    }
    

    const config = {
        ...nextConfig,
        // for github action static assets
        env: {
            BASE_PATH: nextConfig.basePath || '',
        }
    };

    return config;
};
