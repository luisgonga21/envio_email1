module.exports = {
      type: process.env.DB_CONNECTION_TYPE,
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT,
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASSWORD_DEV,
      database: process.env.DB_DATABASE_DEV,
      entities: [
            "src/entity/**.ts"
      ],
      migrations: [
            "src/migration/**.ts"
      ],
      cli: {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/migration",
            "subscribersDir": "src/subscriber"
      },
};
