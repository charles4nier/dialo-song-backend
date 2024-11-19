'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/game-tags/all',
      handler: 'game-tag.getAllTags',
      config: {
        auth: false,  // Permet l'accès sans authentification
      },
    },
  ],
};
