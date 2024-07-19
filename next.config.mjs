/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['old-images.hb.ru-msk.vkcs.cloud']
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })
        return config
    }
};

export default nextConfig;
