'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::playlist.playlist', ({ strapi }) => ({

  // Recherche par slug
  async findBySlug(ctx) {
    const { slug } = ctx.query;

    if (!slug) {
      return ctx.badRequest('Slug is required');
    }

    try {
      // Rechercher une playlist avec le slug spécifié et peupler les relations
      const entity = await strapi.db.query('api::playlist.playlist').findOne({
        where: { slug },
        populate: {
          tags: true,
          playlist: {
            populate: {
              music: {
                populate: { source: true },
              },
            },
          },
          background_fx: true,
        },
      });

      if (!entity) {
        return ctx.notFound('Playlist non trouvée');
      }

      // Reformater la réponse pour inclure l'URL du fichier audio dans la musique
      const response = {
        ...entity,
        playlist: entity.playlist.map((item) => ({
          ...item,
          music: {
            ...item.music,
            url: item.music.source?.url || null,  // Récupérer l'URL du fichier audio
          },
        })),
      };

      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de la playlist par slug:', error);
      ctx.throw(500, 'Erreur lors de la récupération de la playlist');
    }
  },

  // Recherche par game tag (primary et secondary)
  async findPlaylistsByGameTag(ctx) {
    const { tag } = ctx.params;

    if (!tag) {
      return ctx.badRequest('Tag is required');
    }

    try {
      console.log('Recherche pour le tag:', tag);  // Log pour vérifier le tag reçu

      // Convertir le tag reçu en minuscule pour comparaison insensible à la casse
      const lowercaseTag = tag.toLowerCase();

      // Recherche des playlists en fonction des tags dans les relations avec `game_tags`
      const playlists = await strapi.db.query('api::playlist.playlist').findMany({
        where: {
          $or: [
            {
              primary_game_tags: {
                game_tags: {
                  tag_name: { $contains: lowercaseTag },  // Recherche dans le champ `tag_name` des `game_tags`
                },
              },
            },
            {
              secondary_game_tags: {
                game_tags: {
                  tag_name: { $contains: lowercaseTag },  // Recherche dans le champ `tag_name` des `game_tags`
                },
              },
            },
          ],
        },
        // Peupler toutes les relations et les composants associés
        populate: [
          'primary_game_tags.game_tags',  // Peupler les primary game tags et leurs relations
          'secondary_game_tags.game_tags',  // Peupler les secondary game tags et leurs relations
          'game_ambience_tags',  // Peupler les relations game ambience tags
          'game_category_tags',  // Peupler les relations game category tags
          'game_setting_tags',  // Peupler les relations game setting tags
        ],
      });

      // Si aucune playlist n'est trouvée, retourner un message avec `ok: false`
      if (!playlists.length) {
        console.log('Aucune playlist trouvée pour le tag:', tag);  // Log si aucune playlist trouvée
        return ctx.body = { ok: false, message: 'No playlists found for this tag.' };
      }

      console.log('Playlists trouvées:', playlists.length);  // Log pour afficher le nombre de playlists trouvées

      // Structurer la réponse avec mainTheme et secondaryTheme
      const response = {
        ok: true,  // Ajouter `ok: true` quand il y a des résultats
        mainTheme: [],
        secondaryTheme: [],
      };

      // Parcourir chaque playlist pour déterminer dans quelle catégorie elle doit aller
      playlists.forEach(playlist => {
        console.log('Analyse de la playlist:', playlist.title);  // Log pour suivre la playlist analysée

        // Vérification dans primary_game_tags
        const isPrimary = playlist.primary_game_tags.some(primaryTag => {
          if (primaryTag.game_tags && Array.isArray(primaryTag.game_tags)) {
            // Parcourir le tableau de game_tags et vérifier le tag_name (insensible à la casse)
            return primaryTag.game_tags.some(gameTag => {
              console.log('Vérification primary tag:', gameTag.tag_name);  // Log pour vérifier chaque tag_name
              return gameTag.tag_name.toLowerCase() === lowercaseTag;
            });
          }
          return false;
        });

        // Vérification dans secondary_game_tags
        const isSecondary = playlist.secondary_game_tags.some(secondaryTag => {
          if (secondaryTag.game_tags && Array.isArray(secondaryTag.game_tags)) {
            // Parcourir le tableau de game_tags et vérifier le tag_name (insensible à la casse)
            return secondaryTag.game_tags.some(gameTag => {
              console.log('Vérification secondary tag:', gameTag.tag_name);  // Log pour vérifier chaque tag_name
              return gameTag.tag_name.toLowerCase() === lowercaseTag;
            });
          }
          return false;
        });

        // Si le tag correspond à primary_game_tags, on pousse dans mainTheme
        if (isPrimary) {
          console.log('Ajouté à mainTheme:', playlist.title);
          response.mainTheme.push(playlist);
        }
        // Si le tag correspond à secondary_game_tags, on pousse dans secondaryTheme
        else if (isSecondary) {
          console.log('Ajouté à secondaryTheme:', playlist.title);
          response.secondaryTheme.push(playlist);
        }
      });

      console.log('Réponse finale:', response);  // Log pour afficher la réponse finale
      // Retourner l'objet structuré avec mainTheme, secondaryTheme, et `ok`
      ctx.body = response;
    } catch (error) {
      console.error('Erreur lors de la récupération des playlists par tag:', error);  // Log pour diagnostiquer l'erreur
      ctx.throw(500, 'Erreur lors de la récupération des playlists');
    }
  },

// Recherche par game setting tag
async findPlaylistsByGameSettingTag(ctx) {
  const { tag } = ctx.params;

  if (!tag) {
    return ctx.badRequest('Game setting tag is required');
  }

  try {
    console.log('Recherche pour le game setting tag:', tag);

    // Convertir le tag reçu en minuscule pour comparaison insensible à la casse
    const lowercaseTag = tag.toLowerCase();

    // Recherche des playlists en fonction des tags dans les relations avec `game_setting_tags`
    const playlists = await strapi.db.query('api::playlist.playlist').findMany({
      where: {
        game_setting_tags: {
          tag_name: { $contains: lowercaseTag },  // Recherche dans le champ `tag_name` des `game_setting_tags`
        },
      },
      // Peupler toutes les relations et les composants associés
      populate: [
        'primary_game_tags.game_tags',  // Peupler les primary game tags et leurs relations
        'secondary_game_tags.game_tags',  // Peupler les secondary game tags et leurs relations
        'game_ambience_tags',  // Peupler les relations game ambience tags
        'game_category_tags',  // Peupler les relations game category tags
        'game_setting_tags',  // Peupler les relations game setting tags
      ],
    });

    // Si aucune playlist n'est trouvée, retourner un message avec `ok: false`
    if (!playlists.length) {
      console.log('Aucune playlist trouvée pour le game setting tag:', tag);
      return ctx.body = { ok: false, message: 'No playlists found for this game setting tag.' };
    }

    console.log('Playlists trouvées:', playlists.length);

    // Structurer la réponse
    const response = {
      ok: true,
      playlists,  // Renvoyer toutes les playlists correspondantes
    };

    // Retourner l'objet structuré avec les playlists et `ok`
    ctx.body = response;
  } catch (error) {
    console.error('Erreur lors de la récupération des playlists par game setting tag:', error);
    ctx.throw(500, 'Erreur lors de la récupération des playlists');
  }
}


}));
