import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // Carga las variables de entorno según el modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tsconfigPaths() // para respetar alias de tsconfig
    ],

    // Prefijos de variables que Vite expondrá al cliente
    // Por defecto es ['VITE_'], aquí también incluimos 'REACT_' si lo necesitas
    envPrefix: ['VITE_'],

    // Define constantes en tiempo de compilación (opcional)
    define: {
      // Clave de sitio de reCAPTCHA accesible como __RECAPTCHA_SITE_KEY__
      __RECAPTCHA_SITE_KEY__: JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY)
      // NO incluyas la SECRET_KEY en define, para que no sea expuesta en el bundle cliente
    },

    // Configuración adicional de servidor de desarrollo
    server: {
      port: Number(env.VITE_PORT) || 3000,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5001',
          changeOrigin: true,
        }
      }
    },

    // Alias de importaciones para rutas más limpias
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  };
});
