import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/api": {
				target:
					process.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:2000", // Gunakan URL yang sesuai
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
