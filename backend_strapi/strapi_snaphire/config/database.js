module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL') ? {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      } : false,
      schema: env('DATABASE_SCHEMA', 'public'),

    },
    pool: {
  min: 0,
  max: 5, // never go over 5 on free tier
  idleTimeoutMillis: 10000,
  acquireTimeoutMillis: 20000,
    },

  },
});
