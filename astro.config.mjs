// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://tria-website.vercel.app',
  base: process.env.BASE_PATH ?? '/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
});