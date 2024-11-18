// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
  ],
  css: [
    '~/assets/css/main.css',
    '~/assets/css/animation.css',
  ],
  app: {
    head: {
      title: "Brrrrrrr 🚀",
      meta: [
        { property: "og:title", content: "Brrrrrrr 🚀" },
        { property: "og:description", content: "Minimalist todo app 🚀" },
        { property: "og:image", content: "https://brrrrrrr.netlify.app/brrrrrrr.png" },
        { property: "og:url", content: "https://brrrrrrr.netlify.app" },
        { property: "og:type", content: "website" },
      ],
    },

  }

})
