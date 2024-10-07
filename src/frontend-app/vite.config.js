import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        paginaHome: 'paginaHome.html',
        menu: 'menu.html',
        cadastroUsuarios: './cadastroUsuarios.html',
        login: './login.html',
        administrador: './administrador.html'
        // cadastroUsuarios: './cadastroUsuarios.html'
      },
    },
  },
  server: {
    open: '/cadastroUsuarios.html',
  },
})
