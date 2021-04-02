module.exports = [
  {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.PORT_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrationsTableName: 'migrations_tb',
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsRun: true,
  },
];
