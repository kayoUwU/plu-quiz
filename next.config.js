/** @type {import('next').NextConfig} */
const nextConfig = { 
    // for github action
    //images: {unoptimized: true},experimental: {images: {unoptimized: true}},basePath: "",
    output: 'export',
    distDir: 'out',
};

module.exports = nextConfig;
