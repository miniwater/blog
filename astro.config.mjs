// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.krjojo.com',

  // trailingSlash: "never",        // always强制所有 URL 末尾带斜杠 never不带斜杠
  base: '/',            // 加上前后的斜杠

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  },

  devToolbar: {
    enabled: false
  },

  redirects: {
    '/rss.xml': '/feed.xml',
    '/feed': '/feed.xml',
  },
});