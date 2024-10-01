import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        cadastroUsuarios: './cadastroUsuarios.html',
        login: './login.html',
        administracao: './administracao.html'
        // cadastroUsuarios: './cadastroUsuarios.html'
      },
    },
  },
  server: {
    open: '/cadastroUsuarios.html',
  },
})
