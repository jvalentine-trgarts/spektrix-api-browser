// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  icon: {
    mode: 'css',
    cssLayer: 'base'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@vueuse/nuxt', '@nuxt/icon'],
})