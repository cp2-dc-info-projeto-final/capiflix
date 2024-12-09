import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        home: 'home.html',
        menu: 'menu.html',
        cadastroUsuarios: './cadastroUsuarios.html',
        login: './login.html',
        administrador: './administrador.html',
        cadastroGeneros: './cadastroGeneros.html',
        perfil: './perfil.html'
      },
    },
  },
  server: {
    open: '/index.html',
  },
})
