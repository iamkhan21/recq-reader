import adapter from '@sveltejs/adapter-netlify';
import sveltePreprocess from 'svelte-preprocess';
import { presetUno } from 'unocss';
import Unocss from 'unocss/vite';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [sveltePreprocess({ typescript: true, postcss: true })],

	kit: {
		adapter: adapter({ fallback: 'index.html' }),
		vite: {
			plugins: [
				Unocss({
					presets: [presetUno()]
				})
			]
		}
	}
};

export default config;
