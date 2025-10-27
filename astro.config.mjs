// @ts-check
import { defineConfig } from 'astro/config';
import path from "node:path";

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 👈 equivale a la raíz de /src
      },
    },
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
});