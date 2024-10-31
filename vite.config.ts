import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { resolve } from "path";

const host = process.env.TAURI_DEV_HOST;

function getPath(path: string) {
	let filePath = new URL(".", import.meta.url).pathname;

	if (filePath.startsWith("/")) {
		filePath = filePath.slice(1);
	}

	return resolve(filePath, path);
}

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [UnoCSS(), vue()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: "ws",
					host,
					port: 1421
			  }
			: undefined,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ["**/src-tauri/**"]
		}
	},
	resolve: {
		alias: {
			"@": getPath("src"),
			"@p": getPath("package-ui"),
			vue: "vue/dist/vue.esm-bundler.js"
		}
	}
}));
