import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        menu: 'menu.html',
        cadastroUsuarios: './cadastrUsuarios.html',
        login: './login.html',
        administrador: './administrador.html',
        cadastroGeneros: './cadastroGeneros.html',
        perfil: './perfil.html',
        buscaFilme: './buscaFilmes.html',
        filme: './filme.html'
      },
    },
  },
  server: {
    open: '/index.html',
  },
})
