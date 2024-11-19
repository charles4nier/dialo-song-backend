const path = require('path');

module.exports = ({ env }) => {
  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'), // Assurez-vous que DATABASE_URL est défini dans Heroku
        ssl: {
          rejectUnauthorized: true, // Mettre à true pour des raisons de sécurité en production
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client: env('NODE_ENV') === 'production' ? 'postgres' : 'sqlite',
      ...connections[env('NODE_ENV') === 'production' ? 'postgres' : 'sqlite'],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
