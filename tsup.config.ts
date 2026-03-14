import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  injectStyle: false,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
