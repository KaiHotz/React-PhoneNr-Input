/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import deletePlugin from "rollup-plugin-delete";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "fs";

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

// Extract dependencies for externalization
const peerDeps = Object.keys(packageJson.peerDependencies || {});
const deps = Object.keys(packageJson.dependencies || {});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React support with SWC
    react(),

    // TypeScript path mapping
    tsconfigPaths(),

    // Generate TypeScript declarations
    dts({
      rollupTypes: false,
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: [
        "src/**/*.test.*",
        "src/**/*.spec.*",
        "src/**/*.stories.*",
        "src/**/*.mdx",
        "setupTests.ts",
      ],
      tsconfigPath: "./tsconfig.json",
      outDir: "dist",
      copyDtsFiles: true,
      staticImport: true,
      logLevel: "info",
    }),

    // SVG as React components
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
        icon: true,
      },
    }),

    // Clean up unwanted files after build
    deletePlugin({
      targets: ["dist/temp"],
      hook: "writeBundle",
    }),
  ],

  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "dist",
    target: "ES2023",
    cssMinify: true,
    sourcemap: false,
    cssCodeSplit: false,
    reportCompressedSize: false,

    lib: {
      entry: {
        main: resolve(__dirname, "src/index.ts"),
      },
      name: "kai-ui",
      formats: ["es"],
      fileName: () => "index.js",
    },

    rollupOptions: {
      external: [...peerDeps, ...deps, "react/jsx-runtime"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: false,
        exports: "named",
        inlineDynamicImports: false,

        // Minification with terser
        plugins: [
          terser({
            compress: {
              drop_console: true,
              drop_debugger: true,
              passes: 2,
            },
            mangle: true,
            format: {
              comments: false,
            },
          }),
        ],
      },
    },
  },
});
