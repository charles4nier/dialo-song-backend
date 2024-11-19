'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/custom-playlists',
      handler: 'playlist.findBySlug',
      config: {
        auth: false,  // Accès sans authentification
      },
    },
    {
      method: 'GET',
      path: '/playlists/by-game-tag/:tag',
      handler: 'playlist.findPlaylistsByGameTag',
      config: {
        auth: false,  // Accès sans authentification
      },
    },
    {
      method: 'GET',
      path: '/playlists/by-game-setting-tag/:tag',
      handler: 'playlist.findPlaylistsByGameSettingTag',  // Nouvelle route pour la recherche par game setting tag
      config: {
        auth: false,  // Accès sans authentification
      },
    },
  ],
};
