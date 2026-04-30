// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.krjojo.com',

  // trailingSlash: "always",        // always强制所有 URL 末尾带斜杠 never不带斜杠
  base: '/',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});