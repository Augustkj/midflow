import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts',
        'src/runtime.ts',
        'src/*/index.ts'
    ],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: false,
    clean: true,
    splitting: false,
    outDir: 'dist'
})