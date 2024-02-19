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
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log("defaultConfig ",defaultConfig);
        return {
            /* development only config options here */
        }
    }
    

    const config = {
        ...nextConfig,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
        // for github action static assets
        env: {
            NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
        }
    };
    console.log("config ",config);
    return config;
};
