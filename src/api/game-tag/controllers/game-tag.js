'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game-tag.game-tag', ({ strapi }) => ({
  async getAllTags(ctx) {
    // Récupérer tous les tags de la collection `game_tags`
    const tags = await strapi.db.query('api::game-tag.game-tag').findMany({
      select: ['tag_name'],
    });

    // Extraire les noms des tags
    const allTags = tags.map(tag => tag.tag_name);

    ctx.body = allTags;
  },
}));
