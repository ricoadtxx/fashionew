import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	base: "/", // Pastikan base di-root ("/")
	server: {
		proxy: {
			"/api": {
				target: "https://fashionewbackend.vercel.app", // Sesuaikan dengan backend yang sudah dideploy
				changeOrigin: true,
				secure: true,
			},
		},
	},
});
