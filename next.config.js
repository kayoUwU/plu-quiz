/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const CopyPlugin = require("copy-webpack-plugin");

// for common settings
const nextConfig = {
    webpack: (config) => {
        // append the CopyPlugin to copy the file to your public dir
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              { from: "plu-public-img/plu_img", to: "public/plu_img" },
            ],
          }),
        )
    
        // Important: return the modified config
        return config
      }
};

module.exports = (phase, { defaultConfig }) => {
    console.log("phase", phase);
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log("defaultConfig ", defaultConfig);
        return {
            ...nextConfig,
            /* development only config options here */
            env: {
                NEXT_PUBLIC_BASE_PATH: '',
                NEXT_PUBLIC_SITE_BASE_URL: 'http://localhost:3000',
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
