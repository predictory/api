const config = require('config');
const db = config.get('db');

module.exports = {
    type: db.type,
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.database,
    synchronize: db.synchronize,
    logging: db.logging,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrationsTableName: "custom_migration_table",
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    cli: {
        entitiesDir: "src/**/*.entity.ts",
        migrationsDir: "src/database/migrations"
    },
};
