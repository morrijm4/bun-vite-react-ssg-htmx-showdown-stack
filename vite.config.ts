import type { UserConfig } from 'vite';

export default {
    root: './src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
} satisfies UserConfig;
