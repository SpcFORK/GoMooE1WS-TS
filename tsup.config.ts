import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/'],
  splitting: false,
  sourcemap: false,
  clean: true,
  platform: 'node',
  outDir: 'dist',
  dts: true,
  external: ['jsdom'],
  format: ['cjs', 'esm']
})
