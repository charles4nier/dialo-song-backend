import type { Schema, Attribute } from '@strapi/strapi';

export interface AmbianceGameTagAmbienceGameTag extends Schema.Component {
  collectionName: 'components_ambiance_game_tag_ambience_game_tags';
  info: {
    displayName: 'Ambience Game Tag';
  };
  attributes: {
    game_ambience_tags: Attribute.Relation<
      'ambiance-game-tag.ambience-game-tag',
      'oneToMany',
      'api::game-ambience-tag.game-ambience-tag'
    >;
  };
}

export interface CategeoryGameTagCategoryGameTag extends Schema.Component {
  collectionName: 'components_categeory_game_tag_category_game_tags';
  info: {
    displayName: 'Category Game Tag';
  };
  attributes: {
    game_category_tags: Attribute.Relation<
      'categeory-game-tag.category-game-tag',
      'oneToMany',
      'api::game-category-tag.game-category-tag'
    >;
  };
}

export interface ComplexMusicMusiqueComplexe extends Schema.Component {
  collectionName: 'components_musique_complexe_musique_complexes';
  info: {
    displayName: 'complex_music';
    description: '';
  };
  attributes: {
    music: Attribute.Relation<
      'complex-music.musique-complexe',
      'oneToOne',
      'api::music.music'
    >;
    starting_time: Attribute.Decimal &
      Attribute.Required &
      Attribute.DefaultTo<0>;
  };
}

export interface PrimaryGameTagPrimaryGameTag extends Schema.Component {
  collectionName: 'components_primary_game_tag_primary_game_tags';
  info: {
    displayName: 'Primary Game Tag';
    description: '';
  };
  attributes: {
    game_tags: Attribute.Relation<
      'primary-game-tag.primary-game-tag',
      'oneToMany',
      'api::game-tag.game-tag'
    >;
  };
}

export interface SecondaryGameTagSecondaryGameTag extends Schema.Component {
  collectionName: 'components_secondary_game_tag_secondary_game_tags';
  info: {
    displayName: 'Secondary Game Tag';
    description: '';
  };
  attributes: {
    game_tags: Attribute.Relation<
      'secondary-game-tag.secondary-game-tag',
      'oneToMany',
      'api::game-tag.game-tag'
    >;
  };
}

export interface TypePlaylistTagTypePlaylistTag extends Schema.Component {
  collectionName: 'components_type_playlist_tag_type_playlist_tags';
  info: {
    displayName: 'Type Playlist Tag';
  };
  attributes: {
    playlist_type_tags: Attribute.Relation<
      'type-playlist-tag.type-playlist-tag',
      'oneToMany',
      'api::playlist-type-tag.playlist-type-tag'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'ambiance-game-tag.ambience-game-tag': AmbianceGameTagAmbienceGameTag;
      'categeory-game-tag.category-game-tag': CategeoryGameTagCategoryGameTag;
      'complex-music.musique-complexe': ComplexMusicMusiqueComplexe;
      'primary-game-tag.primary-game-tag': PrimaryGameTagPrimaryGameTag;
      'secondary-game-tag.secondary-game-tag': SecondaryGameTagSecondaryGameTag;
      'type-playlist-tag.type-playlist-tag': TypePlaylistTagTypePlaylistTag;
    }
  }
}
