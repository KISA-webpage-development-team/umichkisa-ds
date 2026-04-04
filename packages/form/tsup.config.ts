import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react-hook-form", "@umichkisa-ds/web"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
