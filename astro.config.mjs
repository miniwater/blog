// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://blog.krjojo.com',
    base: '/',
    // trailingSlash: "always",        // always强制所有 URL 末尾带斜杠 never不带斜杠
});
