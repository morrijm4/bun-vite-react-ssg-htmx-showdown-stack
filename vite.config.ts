import type { UserConfig } from 'vite';

export default {
    root: './src',
    preview: {
      port: 4000,
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
} satisfies UserConfig;
