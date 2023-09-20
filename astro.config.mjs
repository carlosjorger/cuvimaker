import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import compressor from 'astro-compressor';

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
	//TODO: Remove ssr
	output: 'hybrid',
});
