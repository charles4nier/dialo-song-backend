'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::playlist.playlist', {
  config: {
    // Ici, vous pouvez ajouter des configurations de sécurité, par exemple :
    findBySlug: {
      auth: false, // Rendre la route publique si nécessaire
    },
  },
  routes: [
    {
      method: 'GET',
      path: '/playlists/slug/:slug',  // Route personnalisée pour chercher par slug
      handler: 'playlist.findBySlug',  // Contrôleur associé
      config: {
        auth: false,  // Rendre la route accessible sans authentification si nécessaire
      },
    },
  ],
});
