console.log(process.env);
const { DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } =
  process.env;
const config = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: ['dist/src/modules/**/entity/*.entity.js'],
  migrations: ['dist/src/database/migration/*.js'],
  cli: {
    migrationsDir: 'src/database/migration',
  },
  // migrationsRun: true,
  // 指示是否在每次应用程序启动时自动创建数据库架构。 请注意此选项，不要在生产环境中使用它，否则将丢失所有生产数据。但是此选项在调试和开发期间非常有用。作为替代方案，你可以使用 CLI 运行 schema：sync 命令。请注意，对于 MongoDB 数据库，它不会创建模式，因为 MongoDB 是无模式的。相反，它只是通过创建索引来同步。
  synchronize: true,
  // 重试连接数据库的次数（默认：10）
  // retryAttempts
  // 两次重试连接的间隔(ms)（默认：3000）
  // retryDelay
  // 如果为true,将自动加载实体(默认：false)
  // autoLoadEntities
  // 如果为true，在应用程序关闭后连接不会关闭（默认：false)
  // keepConnectionAlive
};

module.exports = config;
