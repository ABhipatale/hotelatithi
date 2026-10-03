import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    // Pinned off Vite's default 5173 on purpose.
    //
    // A service worker is scoped to an origin — scheme, host AND port — not to
    // a project. Any other app you have ever run on localhost:5173 that
    // registered one keeps intercepting that origin afterwards, and serves its
    // own cached shell over whatever is really running there. That is why this
    // project appeared as a different site: the dev server was correct, the
    // browser never asked it.
    //
    // Giving the project its own port sidesteps every stale worker and cache
    // already parked on 5173.
    port: 5191,
    strictPort: true,
    open: true,
  },
})
