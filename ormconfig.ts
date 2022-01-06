const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'd_nest',
  entities: [],
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
