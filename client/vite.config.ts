import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: [
			{
				find: "@components",
				replacement: path.resolve(__dirname, "src/components"),
			},
			{
				find: "@hooks",
				replacement: path.resolve(__dirname, "src/hooks"),
			},
			{
				find: "@lib",
				replacement: path.resolve(__dirname, "src/lib"),
			},
			{
				find: "@store",
				replacement: path.resolve(__dirname, "src/store"),
			},
			{
				find: "@types",
				replacement: path.resolve(__dirname, "src/types"),
			},
			{
				find: "@constants",
				replacement: path.resolve(__dirname, "src/constants"),
			}
		]
	},
})
