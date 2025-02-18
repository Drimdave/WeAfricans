// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt'
    ],
    runtimeConfig: {
        public: {
            unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY
        }
    },
    app: {
        head: {
            title: 'WeAfricans - African Photo Gallery',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Discover beautiful African photos powered by Unsplash' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    }
}) 