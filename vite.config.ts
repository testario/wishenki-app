import { defineConfig, loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/

export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
    plugins: [
      vue({}),

      eslintPlugin({
        emitWarning: false,
        emitError: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@helpers': path.resolve(__dirname, './src/assets/js/helpers'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: [

          ].join('\n'),
        },
      },
    },
    server: {
      proxy: {
        '^/api/.*': {
          target: process.env.VITE_APP_API_SERVICE,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => {
          //   return path.replace('/api/', '/api/v1/')
          // },
        },
      },
    },
    base: '/',
    publicDir: '/',
    build: {
      rollupOptions: {
        treeshake:  false
      }
    },
  })
}
