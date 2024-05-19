import { defineConfig } from "tsup"

const isProduction = process.env.NODE_ENV === "production"

export default defineConfig(({ watch = false }) => ({
    clean: true,
    splitting: true,
    dts: true,
    external: [],
    entry: ["src/index.ts"],
    format: ["cjs", "esm", "iife"],
    minify: isProduction,
    sourcemap: isProduction,
    bundle: isProduction,
    watch,
}))
