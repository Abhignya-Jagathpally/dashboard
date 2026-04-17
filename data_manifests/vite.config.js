import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Only prepend /dashboard/ on the production build (static hosting).
// In `npm run dev`, the site is served from the root — cleaner local dev.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/dashboard/' : '/',
}));
