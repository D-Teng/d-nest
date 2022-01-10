# Bugs

1. 封装获取配置文件的方法

```ts
// src\main.ts
const ENABLE_DOCUMENTATION = configService.get<string>('ENABLE_DOCUMENTATION');
if (ENABLE_DOCUMENTATION) {
  setupSwagger(app);
}
```

2. user.roles 修改为枚举数组
3. bcrtpy 加密 password
4. 事务未生效

```ts
// src\modules\user\user.service.ts
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  ...
```

5. 日志模块
