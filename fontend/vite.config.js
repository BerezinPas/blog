import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5050', // Базовый URL бэкенда
				changeOrigin: true,
				// rewrite не нужен, так как `/api` сохраняется
			},
		},
	},
});
