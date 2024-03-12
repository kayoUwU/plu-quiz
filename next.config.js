/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const CopyPlugin = require("copy-webpack-plugin");
const SW = require('./internal/workbox/workbox-webpack');

const plugins = (_options) => [
    new CopyPlugin({
        patterns: [
            { from: "plu-public-img/plu_img", to: "public/plu_img" },
        ],
    }),
    SW(_options),
];

// for common settings
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ]
    },
    webpack: (_config, _options) => {
        plugins(_options).forEach(item => {
            if (item) {
                _config.plugins.push(item);
            }
        });
        return _config;
    }
};
module.exports = (phase, { defaultConfig }) => {
    console.log("phase", phase);
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        console.log("defaultConfig ", defaultConfig);

        const config = {
            ...nextConfig,
            /* development only config options here */
        }

        if (process.env.REMOTE_IMAGE_hostname) {
            config.images = {
                remotePatterns: [
                    {
                        protocol: process.env.REMOTE_IMAGE_protocol || '',
                        hostname: process.env.REMOTE_IMAGE_hostname || '',
                        port: process.env.REMOTE_IMAGE_port || '',
                        pathname: process.env.REMOTE_IMAGE_pathname || '',
                    },
                ],
            };
        }
        console.log("config ", config);
        return config;
    }

    // for production

    const config = {
        ...nextConfig,
        // no server for Image Optimization
        images: { unoptimized: true },
        // experimental: { images: { unoptimized: true } },
        output: 'export',
        distDir: 'out',
    };

    // for static assets path
    const env = {};

    // for next js path
    if (process.env.NEXT_PUBLIC_BASE_PATH && process.env.NEXT_PUBLIC_BASE_PATH.trim() !== '') {
        config.basePath = process.env.NEXT_PUBLIC_BASE_PATH;
        // env.NEXT_PUBLIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
    }

    if (process.env.NEXT_PUBLIC_SITE_BASE_URL && process.env.NEXT_PUBLIC_SITE_BASE_URL.trim() !== '') {
        // env.NEXT_PUBLIC_SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_BASE_URL;
    }

    if (Object.keys(env).length != 0) {
        config.env = env;
    }

    console.log("config ", config);
    return config;
};
