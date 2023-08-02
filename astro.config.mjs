import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import compressor from 'astro-compressor';

// https://astro.build/config
export default defineConfig({
	integrations: [
		vue(),
		tailwind({
			config: {
				path: './tailwind.config.cjs',
			},
		}),
		compressor({ gzip: true }),
	],
});
