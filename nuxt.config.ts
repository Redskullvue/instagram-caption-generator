// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  $production: {
    devtools: { enabled: false },
  },
  $development: {
    devtools: { enabled: true },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css", "~/assets/fonts/font.css"],
  modules: ["@nuxt/icon", "@pinia/nuxt"],

  routeRules: {
    "/chat": { ssr: false },
  },
  runtimeConfig: {
    mongodbUri: "",
    jwtSecret: "",
    geminiApiKey: "",
    geminiBaseUrl: "",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "fa",
        dir: "rtl",
      },
    },
  },
});
