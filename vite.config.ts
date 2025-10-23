import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { LayuiVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from "path";

const excludeComponents = ['LightIcon','DarkIcon']

export default defineConfig({
  server: {
    proxy: {
      // 代理规则示例
      '/api': {
        target: 'http://localhost:9999/api', // 后端服务器地址
        changeOrigin: true, // 改变请求头中的host为目标服务器的host
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      },
      // 更多代理规则...
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src')
      }
    ]
  },
  plugins: [
    AutoImport({
      resolvers: [
        LayuiVueResolver(),
      ],
    }),
    Components({
      resolvers: [
        LayuiVueResolver({
          resolveIcons: true,
          exclude: excludeComponents
        }),
      ],
    }),
    vue(),
  ],
});