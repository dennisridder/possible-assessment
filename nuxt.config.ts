import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore", // import { defineStore } from 'pinia'
        ],
      },
    ],
  ],
  typescript: {
    typeCheck: true,
  },
  devtools: {
    enabled: true,
  },
  devServer: {
    host: "",
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://rickandmortyapi.com/graphql",
      },
    },
  },
});
