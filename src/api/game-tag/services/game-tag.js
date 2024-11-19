'use strict';

/**
 * game-tag service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-tag.game-tag');
