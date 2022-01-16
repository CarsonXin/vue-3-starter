import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'


import packageInfo from './package.json'

const { name } = packageInfo

console.log('name', name)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    watch: {
      usePolling: true
    },
    port: 10012
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  /* 在微前端框架 qiankun 的配置： */
  /* 将项目打包成umd格式的js文件 */
  build: {
    lib: {
      name: `${name}-[name]`,
      formats: ['umd'],
    }
  }
})
