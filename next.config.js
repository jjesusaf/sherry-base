// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
});
module.exports = {
    images: {
      domains: ['ipfs.io', 'tu-dominio.com'], // Añade aquí todos los dominios permitidos
    },
  };
  