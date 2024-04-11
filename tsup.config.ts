import { defineConfig } from 'tsup'

const CPR = `
// GoMooEncoder1-Webserver-TS
// Copyright (C) 2024  SpcFORK
`.trim()

export default defineConfig({
  entry: ['src/'],
  splitting: false,
  sourcemap: false,
  clean: true,
  platform: 'node',
  outDir: 'dist',
  dts: true,
  external: ['jsdom'],
  format: ['cjs', 'esm'],
  banner: {
    js: CPR,
    css: CPR,
  }
})
