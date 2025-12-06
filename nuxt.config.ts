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
  experimental: {
    payloadExtraction: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css", "~/assets/fonts/font.css"],
  modules: ["@nuxt/icon", "@pinia/nuxt", "nuxt-api-shield", "@nuxt/image"],
  image: {
    quality: 80,
  },
  nuxtApiShield: {
    limit: {
      max: 60,
      duration: 300,
      ban: 3600,
    },
    delayOnBan: true,
    errorMessage: " درخواست های زیاد چند دقیقه بعد تلاش کنید",
    retryAfterHeader: false,
    log: {
      path: "logs",
      attempts: 100,
    },
    routes: [
      // Specific routes limiters
      {
        path: "/api/auth/forgot",
        max: 1, // custom max requests
        duration: 120,
        ban: 3600,
      },
      {
        path: "/api/auth/sendmail",
        max: 1, // custom max requests
        duration: 120,
        ban: 3600,
      },
      {
        path: "/api/auth/signup",
        max: 2,
        duration: 120,
        ban: 3600,
      },
    ],
  },

  routeRules: {
    "/chat": { ssr: false },
  },
  runtimeConfig: {
    mongodbUri: "",
    jwtSecret: "",
    geminiApiKey: "",
    geminiBaseUrl: "",
    gatewayApiKey: "",
    gatewayRedirectUrl: "",
    mailApiKey: "",
    // This is used to return the right link in production when user wants to reset password
    mailUrl: "",
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "fa",
        dir: "rtl",
      },
      link: [
        {
          rel: "preload",
          href: "/fonts/IRANSans-web.woff",
          as: "font",
          type: "font/woff",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  nitro: {
    preset: "node-server",
    compressPublicAssets: true,
  },
});
