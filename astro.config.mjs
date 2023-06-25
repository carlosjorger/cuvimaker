import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [
        vue(),
        tailwind({
            config: { path: './tailwind.config.cjs' },
        }),
    ],
});
