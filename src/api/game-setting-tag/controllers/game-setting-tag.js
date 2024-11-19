'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game-setting-tag.game-setting-tag', ({ strapi }) => ({
  async getAllSettingsTags(ctx) {
    // Récupérer tous les tags de la collection `game_setting_tags`
    const settingsTags = await strapi.db.query('api::game-setting-tag.game-setting-tag').findMany({
      select: ['tag_name'],
    });

    // Extraire les noms des tags
    const allSettingsTags = settingsTags.map(tag => tag.tag_name);

    ctx.body = allSettingsTags;
  },
}));
