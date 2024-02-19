/** @type {import('next').NextConfig} */
const nextConfig = { 
    // for github action
    //images: {unoptimized: true},experimental: {images: {unoptimized: true}},basePath: "",
    output: 'export',
    distDir: 'out',
};

// for github action static assets
nextConfig.publicRuntimeConfig = {
    BASE_PATH: nextConfig.basePath || ''
};

module.exports = nextConfig;
