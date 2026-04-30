// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rifasvelez.com",
  trailingSlash: "ignore",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-CO",
        },
      },
    }),
  ],

  server: {
    host: true,
    port: 4321,
  },
});
