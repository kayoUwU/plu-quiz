/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
// for common settings
const nextConfig = {
};

module.exports = (phase, { defaultConfig }) => {
    console.log("phase", phase);
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log("defaultConfig ", defaultConfig);
        return {
            /* development only config options here */
            env: {
                NEXT_PUBLIC_SITE_BASE_URL: 'http://localhost:3000'
            }
        }
    }

    // for production

    const config = {
        ...nextConfig,
        // no server for Image Optimization
        images: { unoptimized: true },
        experimental: { images: { unoptimized: true } },
        output: 'export',
        distDir: 'out',
    };

    // for static assets path
    const env = {};

    // for next js path
    if (process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH.trim() !== '') {
        config.basePath = process.env.NEXT_PUBLIC_BASE_PATH;
        env.NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
    }

    if (process.env.NEXT_PUBLIC_SITE_BASE_URL && process.env.NEXT_PUBLIC_SITE_BASE_URL.trim() !== '') {
        env.NEXT_PUBLIC_SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
    }

    if (Object.keys(env).length != 0) {
        config.env = env;
    }

    console.log("config ", config);
    return config;
};
