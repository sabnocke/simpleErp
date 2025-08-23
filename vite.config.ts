import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true,
			ignored: ["**/node_modules/**"],
		},
		host: "0.0.0.0",
		port: 3000,
		strictPort: true,
		hmr: {
			host: "0.0.0.0",
			protocol: "ws"
		}
	}
});
