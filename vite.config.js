import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      enforce: 'pre', // 在 Vite 核心插件之前调用该插件
      apply: 'build' // 生产环境应用
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})
