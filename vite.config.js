import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: "8081",
    cors: true,
    // 配置跨域
    proxy: { 
      '/goforit': {
        // target: 'http://my.mcdd.top:9527/',
        target: 'http://192.168.0.191:7999/', // 根据需求替换 请求后台接口
        changeOrigin: true, // 允许跨域
        ws: true,
        rewrite: (path) => path.replace(/^\/goforit/, '') // 重写请求
      }
    }
  },
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
})
