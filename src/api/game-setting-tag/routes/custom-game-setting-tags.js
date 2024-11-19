'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/game-setting-tags/all',  // Le chemin pour récupérer tous les game setting tags
      handler: 'game-setting-tag.getAllSettingsTags',  // Handler pour récupérer les données
      config: {
        auth: false,  // Permet l'accès sans authentification
      },
    },
  ],
};
