import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport, { VantResolve } from "vite-plugin-style-import";
// @ts-nocheck
import { svgstore } from "./src/vite_plugins/svgstore"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define: command === "build" ? { DEBUG: false } : { DEBUG: true },
    //Rollup chunk 优化
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes("echarts")) {
              return "echarts"
            }
            if (id.includes("mock") || id.includes("faker")) {
              return "mock"
            }
            if (id.includes("vant")) {
              return "vant"
            }
            if (id.includes("node_modules")) {
              return "vendor"
            }
          },
        },
      },
    },
    // base: "/quick-account-vue3/dist/",
    plugins: [
      vue(),
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      svgstore(),
      styleImport({
        resolves: [VantResolve()],
        libs: [
          {
            libraryName: "vant",
            esModule: true,
            resolveStyle: (name) => `../es/${name}/style`,
          },
        ],
      }),
    ],
    server: {
      proxy: {
        "/api/v1": {
          target: "http://121.196.236.94:3000/",
        },
      },
    },
  }
})