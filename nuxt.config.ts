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
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "nuxt-api-shield",
    "@nuxt/image",
    "@nuxtjs/sitemap",
  ],
  image: {
    quality: 80,
  },
  // @ts-ignore
  sitemap: {
    // @ts-ignore
    hostname: "https://captionsaz.ir",
    gzip: true,
    routes: [
      "/",
      "/about",
      "/pricing",
      "/contact-us",
      "/login",
      "/signup",
      "/blog/تولید-کپشن-با-هوش-مصنوعی",
    ],
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
    gptApiKey: "",
    geminiBaseUrl: "",
    gatewayApiKey: "",
    gatewayRedirectUrl: "",
    mailApiKey: "",
    // This is used to return the right link in production when user wants to reset password
    mailUrl: "",
    // Used for instagram scraping 1000 reqs / month
    rapidApiHost: "",
    rapidApiKey: "",
  },

  app: {
    head: {
      titleTemplate: "%s | کپشن‌ساز",
      title: "کپشن ساز - تولید کپشن و پست شبکه های مجازی با هوش مصنوعی",
      meta: [
        { name: "charset", content: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "کپشن ساز" },
        {
          name: "description",
          content:
            "افزایش بازدید و حضور در اکسپلور به کمک هوش مصنوعی کپشن ساز - نرخ بازدید خودتون رو افزایش بدید",
        },
        { property: "og:site_name", content: "کپشن‌ساز" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "fa_IR" },
        { name: "twitter:site", content: "@captionsaz" },
      ],
      htmlAttrs: {
        lang: "fa",
        dir: "rtl",
      },
      link: [
        { rel: "canonical", href: "https://captionsaz.ir/" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
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
