import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    devtools({
      enhancedLogs: {
        enabled: false,
      },
    }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.join(process.cwd(), "src/mantine").replace(/\\/g, "/")}" as *;`,
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      pages: path.resolve(__dirname, "./src/pages"),
      assets: path.resolve(__dirname, "./src/assets"),
      components: path.resolve(__dirname, "./src/components"),
      utils: path.resolve(__dirname, "./src/utils"),
      api: path.resolve(__dirname, "./src/api"),
      routes: path.resolve(__dirname, "./src/routes"),
      queries: path.resolve(__dirname, "./src/queries"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify("v0.0.1"),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
